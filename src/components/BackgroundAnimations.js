import React from 'react';
import './BackgroundAnimations.css';

const BackgroundAnimations = ({ intensity = 'medium', theme = 'purple' }) => {
  const getParticleCount = () => {
    switch (intensity) {
      case 'light': return 6;
      case 'medium': return 10;
      case 'heavy': return 15;
      default: return 10;
    }
  };

  const getShapeCount = () => {
    switch (intensity) {
      case 'light': return 2;
      case 'medium': return 3;
      case 'heavy': return 5;
      default: return 3;
    }
  };

  return (
    <div className={`bg-animations bg-animations-${theme}`}>
      {/* Floating Shapes */}
      <div className="bg-shapes">
        {[...Array(getShapeCount())].map((_, i) => (
          <div 
            key={`shape-${i}`} 
            className={`shape shape-${i + 1}`}
            style={{
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(getParticleCount())].map((_, i) => (
          <div 
            key={`particle-${i}`} 
            className={`particle particle-${(i % 6) + 1}`} 
            style={{
              animationDelay: `${i * 0.6}s`,
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="gradient-orbs">
        {[...Array(3)].map((_, i) => (
          <div 
            key={`orb-${i}`} 
            className={`gradient-orb orb-${i + 1}`}
            style={{
              animationDelay: `${i * 3}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundAnimations;
