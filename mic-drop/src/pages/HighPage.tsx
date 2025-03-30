import './LowPage.css';
import React, { useState } from 'react';
import EqualizerBars from '../components/EqualizerBars';
import micIcon from '../assets/icons/microphone.png';
import recordingIcon from '../assets/icons/recording.png'; // <- Add this PNG

const HighPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleMicClick = () => {
    setIsRecording(prev => !prev);
    // Add your mic start/stop logic here later
  };

  return (
    <div className="landing-wrapper">
      {isRecording && (<div className="recording-overlay" /> )}
      
      <h1 className="title-text">
        Let out your deepest ‘ooo’ – 
      </h1>
      
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
    </div>
  );
};

export default HighPage;
