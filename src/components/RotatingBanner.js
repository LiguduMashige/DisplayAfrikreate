import React, { useState, useEffect } from 'react';
import './RotatingBanner.css';

const RotatingBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Curated African art, blockchain, and tech-themed images
    const timestamp = Date.now();
    const fetchedImages = [
      // African Art & Culture
      `https://images.unsplash.com/photo-1583846112902-44664aa8f9e2?w=1920&h=400&fit=crop&q=80&t=${timestamp}`, // African art
      `https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=1920&h=400&fit=crop&q=80&t=${timestamp}`, // African patterns
      // Blockchain & Tech
      `https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&h=400&fit=crop&q=80&t=${timestamp}`, // Blockchain visualization
      `https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&h=400&fit=crop&q=80&t=${timestamp}`, // Crypto/tech
      `https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1920&h=400&fit=crop&q=80&t=${timestamp}`, // Digital art/NFT
      // Mixed tech and creativity
      `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&h=400&fit=crop&q=80&t=${timestamp}`  // Abstract tech art
    ];
    
    setImages(fetchedImages);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    // Rotate images every 3 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  if (loading || images.length === 0) {
    return (
      <div className="rotating-banner skeleton-banner">
        <div className="banner-loading">Loading creative inspiration...</div>
      </div>
    );
  }

  return (
    <div className="rotating-banner">
      {images.map((image, index) => (
        <div
          key={index}
          className={`banner-image ${index === currentImageIndex ? 'active' : ''} ${
            index === (currentImageIndex - 1 + images.length) % images.length ? 'previous' : ''
          }`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="banner-overlay"></div>
        </div>
      ))}
      <div className="banner-content">
        <h1 className="banner-title">AfriKreate</h1>
        <p className="banner-tagline">Empowering South African Creativity</p>
      </div>
      <div className="banner-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingBanner;
