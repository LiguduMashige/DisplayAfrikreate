import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './MissionStatement.css';

const MissionStatement = () => {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <section 
      ref={ref} 
      className={`mission-statement ${isVisible ? 'revealed' : ''}`}
    >
      <div className="mission-container">
        <div className="mission-icon">🎨</div>
        <h2 className="mission-title">Our Mission</h2>
        <div className="mission-text">
          <p>
            <strong>AfriKreate</strong> is a South African mobile web platform aimed at supporting South African creatives, 
            especially underprivileged and underrepresented artists, by helping them connect, showcase their work, 
            access opportunities, monetize their work and grow all in one simple platform.
          </p>
          <p>
            Rooted in blockchain technology, AfriKreate fosters transparent collaboration, exposure, and long-term 
            growth within the country's creative sector.
          </p>
          <p>
            At its core, AfriKreate addresses systemic challenges that many South African creatives face, such as 
            lack of access to resources, unfair compensation, limited visibility, and poor connectivity to markets 
            or collaborators.
          </p>
          <p className="mission-highlight">
            AfriKreate's immediate mission is to create a safe, inclusive, and interactive space where creatives 
            can thrive, learn, and be seen.
          </p>
        </div>
        <div className="mission-stats">
          <div className="stat-card">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Kreatives</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Secure</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;
