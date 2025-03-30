import './LowPage.css';
import React, { useState } from 'react';
import EqualizerBars from '../components/EqualizerBars';
import micIcon from '../assets/icons/microphone.png';
import recordingIcon from '../assets/icons/recording.png'; 

const LowPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMicClick = async () => {
    if (isRecording) return; //prevent multiple clicks when recording

    setIsRecording(true);
    setError(null)
    setNote(null)

    try {
      const response = await fetch("http://localhost:5050/run-low", {
        method: "POST",
      });

      const data = await response.json();
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
      setIsRecording(false);
    }

  };

  return (
    <div className="landing-wrapper">
      {isRecording && (<div className="recording-overlay" /> )}
      <h1 className="title-text">
      Let out your deepest ‘ooo’ – hold it for 5 seconds.
      </h1>
      <h3>Keep it going as the glow moves</h3>
      
      <div className="content-wrapper">
       <button
  className={`button ${isRecording ? 'recording-glow' : ''}`}
  onClick={handleMicClick}
>
  <img
    src={micIcon}
    alt="Mic"
    className={`button-mic ${isRecording ? 'fade-out' : 'fade-in'}`}
  />
  <img
    src={recordingIcon}
    alt="Recording"
    className={`button-mic absolute ${isRecording ? 'fade-in' : 'fade-out'}`}
  />
</button>

        <EqualizerBars />
      </div>

      {note && (
        <div className="note-result">
          Detected Note: <strong>{note}</strong>
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
