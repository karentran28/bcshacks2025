import './LandingPage.css';
import React from "react";
import { useNavigate } from "react-router-dom";
import droppingMic from '../assets/icons/mic-drop.png';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/low");
  }

  return (
<div className="landing-wrapper">
  <div className="background-glow"></div>

  <div className="landing-content">
    <div className="mic-side">
      <img
        src={droppingMic}
        alt="Mic Drop"
        className="mic-drop"
      />
    </div>

    <div className="text-side">
      <h1 className="title-text">
        Welcome to MicDrop
      </h1>
      <h3 className="slogan-text">
        Analyze your voice, detect pitch, and fine-tune your vocals to get the best results
      </h3>
      <button className="get-started-btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  </div>
</div>

  );
};

export default LandingPage;
