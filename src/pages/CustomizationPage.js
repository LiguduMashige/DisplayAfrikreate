import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import BackgroundAnimations from '../components/BackgroundAnimations';
import './CustomizationPage.css';

const CustomizationPage = ({ onComplete }) => {
  const { actions } = useAppContext();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const creativeCategories = [
    {
      id: 'digital-art',
      name: 'Digital Art',
      icon: '🎨',
      description: 'Digital illustrations, concept art, and digital paintings'
    },
    {
      id: 'visual-art',
      name: 'Visual Art',
      icon: '🖼️',
      description: 'Traditional paintings, drawings, and mixed media'
    },
    {
      id: 'music-sound',
      name: 'Music & Sound',
      icon: '🎵',
      description: 'Music production, sound design, and audio art'
    },
    {
      id: 'crafts-textiles',
      name: 'Crafts & Textiles',
      icon: '🧵',
      description: 'Handmade crafts, textile art, and fiber arts'
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: '📸',
      description: 'Portrait, landscape, and artistic photography'
    },
    {
      id: 'animation',
      name: 'Animation',
      icon: '🎬',
      description: '2D/3D animation, motion graphics, and video art'
    },
    {
      id: 'graphic-design',
      name: 'Graphic Design',
      icon: '✏️',
      description: 'Logo design, branding, and visual communication'
    },
    {
      id: 'sculpture',
      name: 'Sculpture',
      icon: '🗿',
      description: 'Traditional and contemporary sculptural works'
    },
    {
      id: 'writing',
      name: 'Writing & Poetry',
      icon: '✍️',
      description: 'Creative writing, poetry, and literary arts'
    },
    {
      id: 'performance',
      name: 'Performance Art',
      icon: '🎭',
      description: 'Live performances, theater, and interactive art'
    }
  ];

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else if (prev.length < 7) {
        return [...prev, categoryId];
      }
    });
  };

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      
      // Save user preferences
      actions.setUserPreferences(selectedCategories);
      
      // Simulate loading time (3 seconds)
      setTimeout(() => {
        setIsLoading(false);
        if (onComplete) {
          onComplete();
        }
      }, 3000);
      
    } catch (error) {
      console.error('Error saving preferences:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <BackgroundAnimations intensity="heavy" theme="purple" />
        <div className="loading-content">
          <img 
            src={`${process.env.PUBLIC_URL}/images/logos-img/AfriKreateLogo.png`}
            alt="AfriKreate Logo" 
            className="loading-logo"
            onError={(e) => {
              console.log('Logo failed to load from:', e.target.src);
              e.target.src = "/images/logos-img/AfriKreateLogo.png";
            }}
          />
          <div className="loading-spinner-large"></div>
          <h2 className="loading-text">AfriKreating...</h2>
          <p className="loading-subtitle">Setting up your personalized experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="customization-container">
      <BackgroundAnimations intensity="medium" theme="purple" />
      <div className="customization-content">
        <div className="header-section">
          <img 
            src={`${process.env.PUBLIC_URL}/images/logos-img/AfriKreateLogo.png`}
            alt="AfriKreate Logo" 
            className="logo"
            onError={(e) => {
              console.log('Logo failed to load from:', e.target.src);
              e.target.src = "/images/logos-img/AfriKreateLogo.png";
            }}
          />
          <h1 className="main-title">What Creative Activities are you interested in?</h1>
          <p className="subtitle">
            Select up to 7 categories to personalize your AfriKreate experience
          </p>
          <div className="selection-counter">
            <span className="count">{selectedCategories.length}</span>
            <span className="total">/7 selected</span>
          </div>
        </div>

        <div className="categories-grid">
          {creativeCategories.map((category) => (
            <div
              key={category.id}
              className={`category-card ${selectedCategories.includes(category.id) ? 'selected' : ''} ${selectedCategories.length >= 7 && !selectedCategories.includes(category.id) ? 'disabled' : ''}`}
              onClick={() => handleCategoryToggle(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              <div className="selection-indicator">
                {selectedCategories.includes(category.id) && (
                  <div className="checkmark">✓</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="action-section">
          <button 
            className="continue-btn"
            onClick={handleContinue}
            disabled={selectedCategories.length === 0}
          >
            Continue
          </button>
          <p className="help-text">
            You can always change these preferences later in your profile settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPage;
