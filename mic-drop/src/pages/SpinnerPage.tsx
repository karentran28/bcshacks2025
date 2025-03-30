import './SpinnerPage.css';
import React from "react";
import { supabase } from "../supabaseClient";

const SpinnerPage: React.FC = () => {
    const lowNote = localStorage.getItem("lowNote");
    const highNote = localStorage.getItem("lowNote");





  return (
    <div className="landing-wrapper">
        <h1 className="spinner-title">Creating a list of suggested songs based on your vocal range</h1>
        <div className="loading-spinner"></div>
    </div>
  );
};

export default SpinnerPage;
