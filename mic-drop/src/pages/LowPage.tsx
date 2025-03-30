import './LowPage.css';
import React, { useState } from 'react';
import EqualizerBars from '../components/EqualizerBars';
import micIcon from '../assets/icons/microphone.png';
import recordingIcon from '../assets/icons/recording.png';
import { useNavigate } from 'react-router-dom';

const LowPage: React.FC<{ setIsRecording: (v: boolean) => void }> = ({ setIsRecording }) => {
  const [isRecordingLocal, setIsRecordingLocal] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMicClick = async () => {
    if (isRecordingLocal) return;

    setIsRecordingLocal(true);
    setIsRecording(true);
    setError(null);
    setNote(null);

    try {
      const response = await fetch("http://localhost:5050/run-low", {
        method: "POST",
      });

      const data = await response.json();
      console.log("Backend response:", data);


      if (data.note) {
        setNote(data.note);
        localStorage.setItem("lowNote", data.note);
        localStorage.setItem("lowFreq", data.frequency.toString());
      } else {
        setError(data.error || 'Pitch could not be detected.');
      }
    } catch (err) {
      setError('Failed to connect to the backend.');
      console.error(err);
    } finally {
      setIsRecordingLocal(false);
      setIsRecording(false);
    }
  };

  return (
    <div className="landing-wrapper">
      {isRecordingLocal && <div className="recording-overlay" />}

      <h1 className="title-text">
        Let out your deepest ‘ooo’ – hold it for 5 seconds.
      </h1>
      <h3>Keep it going as the glow moves</h3>

      <div className="content-wrapper">
        <button
          className={`button ${isRecordingLocal ? 'recording-glow' : ''}`}
          onClick={handleMicClick}
        >
          <img
            src={micIcon}
            alt="Mic"
            className={`button-mic ${isRecordingLocal ? 'fade-out' : 'fade-in'}`}
          />
          <img
            src={recordingIcon}
            alt="Recording"
            className={`button-mic absolute ${isRecordingLocal ? 'fade-in' : 'fade-out'}`}
          />
        </button>

        <EqualizerBars />
      </div>

      {note && (
        <div className="note-display-wrapper">
          <h2 className="note-label">Your lowest note is:</h2>
          <div className="note-value">{note}</div>

          <button className="next-button" onClick={() => navigate('/high')}>
            Next: Find Your High Note →
          </button>
        </div>
      )}

      {error && (
        <div className="error-text">
          {error}
        </div>
      )}
    </div>
  );
};

export default LowPage;
