import React, { useState, useEffect } from 'react';
import './PageTransition.css';

const PageTransition = ({ children, isActive = true, transitionKey }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Small delay to ensure smooth entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsExiting(false);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isActive, transitionKey]);

  if (!isActive && !isVisible) {
    return null;
  }

  return (
    <div className={`page-transition ${isVisible ? 'page-enter' : ''} ${isExiting ? 'page-exit' : ''}`}>
      {children}
    </div>
  );
};

export default PageTransition;
