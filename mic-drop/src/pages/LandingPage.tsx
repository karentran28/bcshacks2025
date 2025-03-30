import './LandingPage.css';
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/low");
  }

  return (
    <div className="landing-wrapper">
      <div className="background-glow"></div>
      <h1 className="title-text">
        Welcome to MicDrop
      </h1>
      <h3 className="slogan-text">
        Analyze your voice, detect pitch, and fine-tune your vocals to get the best results
      </h3>
      <div>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
