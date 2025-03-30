import './LandingPage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import droppingMic from '../assets/icons/mic-drop.png';
import { supabase } from '../supabaseClient';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [user, setUser] = useState<any>(null);
  const capitalize = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  const handleContinue = async () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }
  
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        ...(showSignup && {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        }),
        emailRedirectTo: 'http://localhost:5177/' 
      }
    });
  
    if (error) {
      console.error('Error sending magic link:', error.message);
      alert('Something went wrong. Please try again.');
    } else {
      alert('Magic link sent! Check your inbox.');
    }
  };
  
  const handleGetStarted = () => {
    navigate('/low'); 
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <div className="landing-wrapper">
      <div className="background-glow"></div>
      <img src={droppingMic} alt="Mic Drop" className="mic-drop" />

      <div className="landing-content">
        <div className="mic-side"></div>

        <div className="text-side">
        <h1 className="title-text">
  {user ? `Hi, ${capitalize(user.user_metadata?.first_name || 'there')} 👋` : 'Welcome to MicDrop'}
</h1>


          <h3 className="slogan-text">
            Analyze your voice, detect pitch, and fine-tune your vocals to get the best results
          </h3>

          {/* Conditional Buttons */}
          {user ? (
            <>
              <button className="ready-btn" onClick={handleGetStarted}>
                Ready to Sing?
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Sign Out
              </button>
            </>
          ) : (
            !showSignup && !showLogin && (
              <>
                <button className="signup-btn" onClick={() => setShowSignup(true)}>
                  Sign Up
                </button>
                <button className="login-btn" onClick={() => setShowLogin(true)}>
                  Log In
                </button>
              </>
            )
          )}

          {/* Sign Up Form */}
          {showSignup && (
            <div className="login-form">
              <input
                type="text"
                placeholder="First Name"
                className="login-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="login-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="continue-btn" onClick={handleContinue}>
                Continue
              </button>
            </div>
          )}

          {/* Log In Form */}
          {showLogin && (
            <div className="login-form">
              <input
                type="email"
                placeholder="Email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="continue-btn" onClick={handleContinue}>
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
