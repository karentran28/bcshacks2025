import './LowPage.css';
import React, { useState } from 'react';
import EqualizerBars from '../components/EqualizerBars';
import micIcon from '../assets/icons/microphone.png';
import recordingIcon from '../assets/icons/recording.png'; // <- Add this PNG

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
//TODO: add logic to stop button
      if (data.note) {
        setNote(data.note);
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
      <h1 className="title-text">
        Let out your deepest ‘ooo’ – like a bear growl
      </h1>
      <div className="content-wrapper">
        <button
          className={`button ${isRecording ? 'recording-glow' : ''}`}
          onClick={handleMicClick}
        >
          <img
            src={isRecording ? recordingIcon : micIcon}
            alt="Mic"
            className="button-mic"
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
