import React, { useState, useEffect } from 'react';
import './TopNFTArtworks.css';

const TopNFTArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopNFTs = async () => {
      try {
        setLoading(true);
        
        // Simulated top NFT artworks data (representing expensive NFTs)
        // In production, this would be from an NFT marketplace API
        // Top 10 Most Expensive NFT Sales from OpenSea
        const mockTopNFTs = [
          {
            id: 1,
            title: "The Merge",
            artist: "Pak",
            price: "91.8M",
            currency: "USD",
            openseaUrl: "https://opensea.io/collection/merge",
            blockchain: "Ethereum",
            category: "Conceptual Art"
          },
          {
            id: 2,
            title: "Everydays: The First 5000 Days",
            artist: "Beeple",
            price: "69.3M",
            currency: "USD",
            openseaUrl: "https://opensea.io/collection/beeple-everydays-the-first-5000-days",
            blockchain: "Ethereum",
            category: "Digital Collage"
          },
          {
            id: 3,
            title: "Clock",
            artist: "Pak",
            price: "52.7M",
            currency: "USD",
            openseaUrl: "https://opensea.io/assets/ethereum/0x5e56a5e89b38e0dd0e482fbb7ac93f070b61a9b1/1",
            blockchain: "Ethereum",
            category: "Conceptual Art"
          },
          {
            id: 4,
            title: "HUMAN ONE",
            artist: "Beeple",
            price: "28.9M",
            currency: "USD",
            openseaUrl: "https://opensea.io/collection/beeple-human-one",
            blockchain: "Ethereum",
            category: "Hybrid Physical"
          },
          {
            id: 5,
            title: "CryptoPunk #5822",
            artist: "Larva Labs",
            price: "23.7M",
            currency: "USD",
            openseaUrl: "https://opensea.io/assets/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/5822",
            blockchain: "Ethereum",
            category: "Pixel Art"
          },
          {
            id: 6,
            title: "CryptoPunk #7523",
            artist: "Larva Labs",
            price: "11.8M",
            currency: "USD",
            openseaUrl: "https://opensea.io/assets/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/7523",
            blockchain: "Ethereum",
            category: "Pixel Art"
          },
          {
            id: 7,
            title: "CryptoPunk #4156",
            artist: "Larva Labs",
            price: "10.26M",
            currency: "USD",
            openseaUrl: "https://opensea.io/assets/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/4156",
            blockchain: "Ethereum",
            category: "Pixel Art"
          },
          {
            id: 8,
            title: "CryptoPunk #3100",
            artist: "Larva Labs",
            price: "7.58M",
            currency: "USD",
            openseaUrl: "https://opensea.io/assets/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/3100",
            blockchain: "Ethereum",
            category: "Pixel Art"
          },
          {
            id: 9,
            title: "CryptoPunk #7804",
            artist: "Larva Labs",
            price: "7.57M",
            currency: "USD",
            openseaUrl: "https://opensea.io/assets/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/7804",
            blockchain: "Ethereum",
            category: "Pixel Art"
          },
          {
            id: 10,
            title: "Ringers #109",
            artist: "Dmitri Cherniak",
            price: "7.12M",
            currency: "USD",
            openseaUrl: "https://opensea.io/assets/ethereum/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270/13000109",
            blockchain: "Ethereum",
            category: "Generative Art"
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setArtworks(mockTopNFTs);
        setError(null);
      } catch (err) {
        console.error('Error fetching NFT artworks:', err);
        setError('Failed to load NFT artworks');
      } finally {
        setLoading(false);
      }
    };

    fetchTopNFTs();
  }, []);

  if (loading) {
    return (
      <section className="top-nft-artworks">
        <div className="section-header">
          <h2>🏆 Top 10 Most Expensive NFT Artworks</h2>
          <p>Explore the most valuable digital art pieces in blockchain history</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading top NFT artworks...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="top-nft-artworks">
        <div className="section-header">
          <h2>🏆 Top 10 Most Expensive NFT Artworks</h2>
          <p>Explore the most valuable digital art pieces in blockchain history</p>
        </div>
        <div className="error-container">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="top-nft-artworks">
      <div className="section-header">
        <h2>🏆 Top 10 Most Expensive NFT Artworks</h2>
        <p>Explore the most valuable digital art pieces in blockchain history</p>
      </div>
      
      <div className="nft-grid">
        {artworks.map((artwork, index) => (
          <div key={artwork.id} className="nft-card">
            <div className="nft-rank">#{index + 1}</div>
            <div className="nft-icon-wrapper">
              <div className="nft-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="nft-blockchain-badge">{artwork.blockchain}</div>
            </div>
            
            <div className="nft-info">
              <h3 className="nft-title">{artwork.title}</h3>
              <p className="nft-artist">by {artwork.artist}</p>
              <p className="nft-category">{artwork.category}</p>
              
              <div className="nft-price">
                <span className="price-label">Sale Price</span>
                <span className="price-amount">
                  ${artwork.price}
                </span>
              </div>

              <a 
                href={artwork.openseaUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="opensea-btn"
              >
                <span className="opensea-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0L0 8L8 16L16 8L8 0ZM8 12L4 8L8 4L12 8L8 12Z"/>
                  </svg>
                </span>
                View on OpenSea
                <span className="external-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="nft-disclaimer">
        <p>💡 <strong>Note:</strong> These represent historic NFT sales showcasing the potential of digital art on blockchain. Click "View on OpenSea" to securely explore each artwork on the official marketplace. AfriKreate empowers South African artists to participate in this revolutionary market.</p>
      </div>
    </section>
  );
};

export default TopNFTArtworks;
