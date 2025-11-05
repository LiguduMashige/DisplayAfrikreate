import React, { useState, useEffect } from 'react';
import BackgroundAnimations from '../components/BackgroundAnimations';
import './LandingPage.css';

const LandingPage = ({ onGetStarted }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    setIsExiting(true);
    // Delay navigation to allow exit animation
    setTimeout(() => {
      onGetStarted();
    }, 800);
  };

  return (
    <div className={`landing-container ${isLoaded ? 'loaded' : ''} ${isExiting ? 'exiting' : ''}`}>
      <BackgroundAnimations intensity="heavy" theme="purple" />
      <div className="landing-content">

        {/* Main Content */}
        <div className="main-content">
          <div className="title-section">
            <div className="logo-wrapper">
              <img 
                src={`${process.env.PUBLIC_URL}/images/logo-new/Afrikreate Logo Transparant.png`}
                alt="AfriKreate Logo" 
                className="landing-logo"
                onError={(e) => {
                  console.log('Logo failed to load from:', e.target.src);
                  // Try alternative path
                  e.target.src = "/images/logo-new/Afrikreate Logo Transparant.png";
                }}
                onLoad={() => console.log('Logo loaded successfully')}
              />
              <div className="logo-glow"></div>
            </div>
            <div className="tagline">
              <span className="tagline-text">Empowering African Creativity</span>
              <span className="tagline-subtext">Through Blockchain Innovation</span>
            </div>
          </div>

          <div className="cta-section">
            <button 
              className="get-started-btn"
              onClick={handleGetStarted}
            >
              <span className="btn-text">Get Started</span>
              <div className="btn-ripple"></div>
            </button>
            
            <p className="welcome-text">
              Discover, support, and invest in South Africa's most talented kreatives
            </p>
          </div>
        </div>

        {/* Chain Link Animation (inspired by the screenshot) */}
        <div className="chain-animation">
          <div className="chain-link link-1">
            <div className="link-inner"></div>
          </div>
          <div className="chain-link link-2">
            <div className="link-inner"></div>
          </div>
          <div className="chain-link link-3">
            <div className="link-inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
