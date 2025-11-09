import React, { useState, useRef, useEffect } from 'react';
import './TopPerformingCarousel.css';

const TopPerformingCarousel = ({ kreatives, onArtistClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const carouselRef = useRef(null);

  // Responsive cards per view
  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsToShow(1);
      else if (width < 768) setCardsToShow(2);
      else if (width < 1024) setCardsToShow(3);
      else setCardsToShow(4);
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const maxIndex = Math.max(0, kreatives.length - cardsToShow);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrevious();
  };

  return (
    <div 
      className="top-performing-carousel" 
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="region"
      aria-label="Top Performing Kreatives Carousel"
    >
      <div className="carousel-header">
        <h2 className="carousel-title">Top Performing Kreatives</h2>
        <p className="carousel-subtitle">
          Discover the most followed and celebrated South African artists
        </p>
      </div>

      <div className="carousel-container">
        {/* Previous Button */}
        <button
          className="carousel-nav-btn carousel-nav-prev"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          aria-label="Previous kreatives"
          title="Previous"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Carousel Track */}
        <div
          ref={carouselRef}
          className="carousel-track"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
          }}
        >
          {kreatives.map((kreative, index) => (
            <div
              key={kreative.id}
              className="carousel-card"
              style={{ flex: `0 0 ${100 / cardsToShow}%` }}
              onClick={() => onArtistClick(kreative)}
              role="button"
              tabIndex="0"
              onKeyPress={(e) => e.key === 'Enter' && onArtistClick(kreative)}
            >
              <div className="carousel-card-inner">
                <div className="rank-badge">#{index + 1}</div>
                
                {/* Profile Image */}
                <div className="carousel-card-image">
                  <img 
                    src={kreative.image} 
                    alt={kreative.name}
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <button className="view-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      View Profile
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="carousel-card-content">
                  <h3 className="carousel-card-title">{kreative.name}</h3>
                  <p className="carousel-card-category">{kreative.category}</p>
                  
                  <div className="carousel-card-stats">
                    <div className="stat-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span>{kreative.followers}</span>
                    </div>
                    <div className="stat-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{(() => {
                        // Extract city, province, country from full address
                        if (!kreative.location) return 'South Africa';
                        const parts = kreative.location.split(',').map(p => p.trim());
                        if (parts.length >= 3) {
                          const city = parts[parts.length - 3];
                          const province = parts[parts.length - 2];
                          const country = parts[parts.length - 1];
                          return `${city}, ${province}, ${country}`;
                        }
                        return kreative.location;
                      })()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          className="carousel-nav-btn carousel-nav-next"
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          aria-label="Next kreatives"
          title="Next"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="carousel-indicators">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to page ${idx + 1}`}
            title={`Page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TopPerformingCarousel;
