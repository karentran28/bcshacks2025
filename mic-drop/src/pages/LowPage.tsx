import './LowPage.css';
import React, { useState } from 'react';
import EqualizerBars from '../components/EqualizerBars';
import micIcon from '../assets/icons/microphone.png';
import recordingIcon from '../assets/icons/recording.png'; // <- Add this PNG

const LowPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleMicClick = () => {
    setIsRecording(prev => !prev);
    // Add your mic start/stop logic here later
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
    </div>
  );
};

export default LowPage;
