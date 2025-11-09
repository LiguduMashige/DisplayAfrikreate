import React, { useState, useEffect } from 'react';
import './CryptoNewsTicker.css';

const CryptoNewsTicker = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Simulated crypto news (in production, use CryptoPanic API or similar)
  const newsArticles = [
    {
      id: 1,
      title: "Bitcoin Surges Past $45,000 as Institutional Interest Grows",
      source: "CryptoNews",
      time: "2 hours ago",
      category: "Market"
    },
    {
      id: 2,
      title: "Ethereum 2.0 Upgrade Shows Promising Results in Network Efficiency",
      source: "BlockchainDaily",
      time: "3 hours ago",
      category: "Technology"
    },
    {
      id: 3,
      title: "Major South African Bank Announces Crypto Trading Services",
      source: "AfriCrypto",
      time: "5 hours ago",
      category: "Business"
    },
    {
      id: 4,
      title: "NFT Market Sees 200% Growth in African Art Collections",
      source: "ArtChain",
      time: "7 hours ago",
      category: "NFTs"
    },
    {
      id: 5,
      title: "DeFi Protocols Reach $100 Billion in Total Value Locked",
      source: "DeFiPulse",
      time: "9 hours ago",
      category: "DeFi"
    },
    {
      id: 6,
      title: "Solana Network Upgrade Enhances Transaction Speed by 40%",
      source: "SolanaNews",
      time: "11 hours ago",
      category: "Technology"
    },
    {
      id: 7,
      title: "Crypto Regulation Framework Proposed for African Markets",
      source: "RegTech",
      time: "13 hours ago",
      category: "Regulation"
    },
    {
      id: 8,
      title: "Web3 Gaming Platform Secures $50M in Funding",
      source: "GameFi",
      time: "15 hours ago",
      category: "Gaming"
    },
    {
      id: 9,
      title: "Layer 2 Solutions See Massive Adoption Across DeFi Ecosystem",
      source: "L2Beat",
      time: "18 hours ago",
      category: "Technology"
    },
    {
      id: 10,
      title: "Blockchain Technology Being Adopted by Major Art Galleries",
      source: "ArtTech",
      time: "20 hours ago",
      category: "Art"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsArticles.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [newsArticles.length]);

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsArticles.length);
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + newsArticles.length) % newsArticles.length);
      setIsTransitioning(false);
    }, 500);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Market: '#10b981',
      Technology: '#3b82f6',
      Business: '#f59e0b',
      NFTs: '#ec4899',
      DeFi: '#8b5cf6',
      Gaming: '#06b6d4',
      Regulation: '#ef4444',
      Art: '#a855f7'
    };
    return colors[category] || '#6b7280';
  };

  const currentArticle = newsArticles[currentNewsIndex];

  return (
    <div className="crypto-news-ticker">
      <div className="news-header">
        <h3 className="news-title">📰 Latest Crypto & Blockchain News</h3>
        <div className="news-indicators">
          {newsArticles.map((_, index) => (
            <button
              key={index}
              className={`news-indicator ${index === currentNewsIndex ? 'active' : ''}`}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentNewsIndex(index);
                  setIsTransitioning(false);
                }, 500);
              }}
              aria-label={`Go to news ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="news-content-wrapper">
        <button className="news-nav-btn prev" onClick={goToPrevious} aria-label="Previous news">
          ◀
        </button>

        <div className={`news-content ${isTransitioning ? 'transitioning' : ''}`}>
          <div className="news-card">
            <div 
              className="news-category-badge" 
              style={{ backgroundColor: getCategoryColor(currentArticle.category) }}
            >
              {currentArticle.category}
            </div>
            <h4 className="news-headline">{currentArticle.title}</h4>
            <div className="news-meta">
              <span className="news-source">🔗 {currentArticle.source}</span>
              <span className="news-time">🕒 {currentArticle.time}</span>
            </div>
          </div>
        </div>

        <button className="news-nav-btn next" onClick={goToNext} aria-label="Next news">
          ▶
        </button>
      </div>

      <div className="news-footer">
        <span className="news-counter">
          {currentNewsIndex + 1} of {newsArticles.length}
        </span>
      </div>
    </div>
  );
};

export default CryptoNewsTicker;
