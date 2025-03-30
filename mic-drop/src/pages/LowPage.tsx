import '../index.css';
import React from 'react';
import EqualizerBars from '../components/EqualizerBars'; // Adjust path if needed

const LowPage: React.FC = () => {
  return (
    <div className="landing-container">
      <h1 className="title-text">
        Let out your deepest ‘ooo’ – like a bear growl
      </h1>
      <div className="content-wrapper">
        <button className="button">Get Started</button>
        <EqualizerBars />
      </div>
    </div>
  );
};

export default LowPage;