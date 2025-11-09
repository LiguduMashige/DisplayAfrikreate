import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import './ProfilePage.css';

const ProfilePage = ({ kreative, onBack, onNavigateToHome, onNavigateToExplore, onNavigateToEvents, onNavigateToFeed, onNavigateToUserProfile, onLogout }) => {
  const { state, actions } = useAppContext();
  const [activeTab, setActiveTab] = useState('creations');
  const [artworks, setArtworks] = useState([]);
  const [loadingArtworks, setLoadingArtworks] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [connectForm, setConnectForm] = useState({
    name: '',
    surname: '',
    location: '',
    collaborationType: [],
    message: ''
  });

  // Check if user is following this kreative
  useEffect(() => {
    if (state.following && kreative) {
      setIsFollowing(state.following.includes(kreative.id));
    }
  }, [state.following, kreative]);

  // Fetch dynamic artwork images based on artist category
  useEffect(() => {
    if (!kreative) return;
    
    const fetchArtworks = async () => {
      setLoadingArtworks(true);
      const timestamp = Date.now();
      const categoryMap = {
        'digital artist': 'digital-art',
        'fine artist': 'painting',
        'photographer': 'photography',
        'animator': 'animation',
        'designer': 'graphic-design',
        'musician': 'music'
      };
      
      const searchTerm = categoryMap[kreative.category.toLowerCase()] || 'art';
      
      // Generate artwork data with dynamic images
      const dynamicArtworks = kreative.artworks?.map((artwork, index) => ({
        ...artwork,
        image: `https://source.unsplash.com/800x800/?${searchTerm}&sig=${timestamp + index}`,
        price: (Math.random() * 5 + 0.5).toFixed(2) // Random price between 0.5 and 5.5 ETH
      })) || [];
      
      setArtworks(dynamicArtworks);
      setLoadingArtworks(false);
    };

    fetchArtworks();
  }, [kreative]);

  if (!kreative) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <h2>Artist not found</h2>
          <button className="back-button" onClick={onBack}>← Back</button>
        </div>
      </div>
    );
  }

  // Calculate floor price (average of all artworks)
  const calculateFloorPrice = () => {
    if (!artworks || artworks.length === 0) return '0.00';
    const total = artworks.reduce((sum, artwork) => sum + parseFloat(artwork.price || 0), 0);
    return (total / artworks.length).toFixed(2);
  };

  // Extract city and province from location
  const getDisplayLocation = () => {
    if (!kreative.location) return 'Location not specified';
    const parts = kreative.location.split(',');
    if (parts.length >= 3) {
      const city = parts[parts.length - 3].trim();
      const province = parts[parts.length - 2].trim();
      return `${city}, ${province}`;
    }
    return kreative.location;
  };

  const handleFollow = () => {
    if (isFollowing) {
      actions.removeFollowing(kreative.id);
    } else {
      actions.addFollowing(kreative.id);
    }
    setIsFollowing(!isFollowing);
  };

  const handleConnectSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the connection request
    alert(`Connection request sent to ${kreative.name}!`);
    setShowConnectModal(false);
    setConnectForm({
      name: '',
      surname: '',
      location: '',
      collaborationType: [],
      collaborationMessage: ''
    });
  };

  const handleCollaborationTypeChange = (type) => {
    if (connectForm.collaborationType.includes(type)) {
      setConnectForm({
        ...connectForm,
        collaborationType: connectForm.collaborationType.filter(t => t !== type)
      });
    } else {
      setConnectForm({
        ...connectForm,
        collaborationType: [...connectForm.collaborationType, type]
      });
    }
  };

  return (
    <div className="profile-container">
      <Navbar 
        onNavigateToHome={onNavigateToHome}
        onNavigateToExplore={onNavigateToExplore}
        onNavigateToEvents={onNavigateToEvents}
        onNavigateToFeed={onNavigateToFeed}
        onNavigateToUserProfile={onNavigateToUserProfile}
        onLogout={onLogout}
      />
      
      {/* Header with Back Button */}
      <button className="profile-back-button" onClick={onBack}>
        ←
      </button>

      {/* Artist Profile Header */}
      <div className="profile-header">
        <div className="profile-image-container">
          <img 
            src={kreative.image} 
            alt={kreative.name} 
            className="profile-image"
          />
        </div>
        
        <h1 className="profile-name">{kreative.name}</h1>
        <p className="profile-category">{kreative.category}</p>
        
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{kreative.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{calculateFloorPrice()} ETH</span>
            <span className="stat-label">Floor Price</span>
          </div>
        </div>

        <div className="profile-actions">
          <button 
            className={`follow-button ${isFollowing ? 'following' : ''}`}
            onClick={handleFollow}
          >
            {isFollowing ? '✓ Following' : '+ Follow'}
          </button>
          <button 
            className="connect-button"
            onClick={() => setShowConnectModal(true)}
          >
            🤝 Connect
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'creations' ? 'active' : ''}`}
          onClick={() => setActiveTab('creations')}
        >
          Creations
        </button>
        <button 
          className={`tab-button ${activeTab === 'participation' ? 'active' : ''}`}
          onClick={() => setActiveTab('participation')}
        >
          Participation
        </button>
        <button 
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Stats
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'creations' && (
          <div className="artworks-grid">
            {loadingArtworks ? (
              <div className="loading-artworks">
                <div className="spinner"></div>
                <p>Loading artworks...</p>
              </div>
            ) : artworks && artworks.length > 0 ? (
              artworks.map((artwork) => (
                <div 
                  key={artwork.artwork_id} 
                  className="artwork-card"
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <div className="artwork-image-container">
                    <img 
                      src={artwork.image} 
                      alt={artwork.title} 
                      className="artwork-image"
                    />
                    <div className="artwork-overlay">
                      <span className="artwork-price">💎 {artwork.price} ETH</span>
                    </div>
                  </div>
                  <div className="artwork-info">
                    <h4 className="artwork-title">{artwork.title}</h4>
                    <p className="artwork-details">{artwork.size} • {artwork.medium}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-artworks">
                <p>No artworks available</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'participation' && (
          <div className="participation-content">
            <div className="info-section">
              <h3>About {kreative.name}</h3>
              <p className="artist-description">{kreative.description}</p>
            </div>
            <div className="info-section">
              <h3>Location</h3>
              <p className="artist-location">📍 {getDisplayLocation()}</p>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-content">
            <div className="stat-card">
              <h3>Total Artworks</h3>
              <p className="stat-number">{kreative.artworks ? kreative.artworks.length : 0}</p>
            </div>
            <div className="stat-card">
              <h3>Followers</h3>
              <p className="stat-number">{kreative.followers}</p>
            </div>
            <div className="stat-card">
              <h3>Category</h3>
              <p className="stat-text">{kreative.category}</p>
            </div>
          </div>
        )}
      </div>

      {/* Artwork Detail Modal */}
      {selectedArtwork && (
        <div className="artwork-modal" onClick={() => setSelectedArtwork(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedArtwork(null)}>✕</button>
            <img src={selectedArtwork.image} alt={selectedArtwork.title} className="modal-image" />
            <div className="modal-details">
              <h2>{selectedArtwork.title}</h2>
              <p className="modal-description">{selectedArtwork.description}</p>
              <div className="modal-info">
                <span><strong>Size:</strong> {selectedArtwork.size}</span>
                <span><strong>Medium:</strong> {selectedArtwork.medium}</span>
                <span><strong>Price:</strong> 💎 {selectedArtwork.price} ETH</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Modal */}
      {showConnectModal && (
        <div className="connect-modal" onClick={() => setShowConnectModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowConnectModal(false)}>✕</button>
            <h2>Connect with {kreative.name}</h2>
            <form onSubmit={handleConnectSubmit} className="connect-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Name *"
                  value={connectForm.name}
                  onChange={(e) => setConnectForm({ ...connectForm, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Surname *"
                  value={connectForm.surname}
                  onChange={(e) => setConnectForm({ ...connectForm, surname: e.target.value })}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Location (optional)"
                value={connectForm.location}
                onChange={(e) => setConnectForm({ ...connectForm, location: e.target.value })}
              />
              <div className="collaboration-types">
                <label>Type of Collaboration *</label>
                <div className="checkbox-group">
                  {['Digital Art', 'Photography', 'Music', 'Design', 'Animation', 'Other'].map(type => (
                    <label key={type} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={connectForm.collaborationType.includes(type)}
                        onChange={() => handleCollaborationTypeChange(type)}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Message (max 750 characters) *"
                value={connectForm.message}
                onChange={(e) => setConnectForm({ ...connectForm, message: e.target.value.slice(0, 750) })}
                maxLength={750}
                rows={5}
                required
              />
              <div className="character-count">{connectForm.message.length}/750</div>
              <button type="submit" className="submit-btn" disabled={connectForm.collaborationType.length === 0}>
                Send Connection Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
