import './LandingPage.css';
import React from "react";

const LandingPage: React.FC = () => {
  const handleGetStarted = () => {
    console.log("get started clicked!");
  }


  return (
    <div className="title-section">
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
