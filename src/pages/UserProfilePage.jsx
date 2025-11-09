import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import WalletConnect from '../components/WalletConnect';
import './UserProfilePage.css';

const UserProfilePage = ({ onBack, onNavigateToHome, onNavigateToExplore, onNavigateToEvents, onNavigateToFeed, onNavigateToUserProfile, onLogout }) => {
  const { state, actions } = useAppContext();
  const [activeTab, setActiveTab] = useState('calendar');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const [editForm, setEditForm] = useState({
    name: state.user?.name || 'Creative User',
    username: state.user?.username || 'user123',
    bio: state.user?.bio || 'Art enthusiast and creative supporter',
    location: state.user?.location || '',
    avatar: state.user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
    bannerColor: state.user?.bannerColor || 'gradient-purple'
  });

  const bannerOptions = [
    { id: 'gradient-purple', name: 'Purple Gradient', color: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' },
    { id: 'gradient-blue', name: 'Blue Gradient', color: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' },
    { id: 'gradient-green', name: 'Green Gradient', color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { id: 'gradient-orange', name: 'Orange Gradient', color: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' },
    { id: 'gradient-pink', name: 'Pink Gradient', color: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)' },
    { id: 'gradient-teal', name: 'Teal Gradient', color: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)' },
    { id: 'gradient-sunset', name: 'Sunset', color: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)' },
    { id: 'gradient-ocean', name: 'Ocean', color: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)' }
  ];
  
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    ethPrice: '',
    file: null,
    filePreview: null
  });

  const [avatarOptions, setAvatarOptions] = useState([]);

  useEffect(() => {
    const seeds = ['Felix', 'Aneka', 'Max', 'Jasmine', 'Oliver', 'Sophie', 'Leo', 'Emma', 'Noah', 'Ava'];
    const avatars = seeds.map(seed => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
    setAvatarOptions(avatars);
  }, []);

  const upcomingEvents = state.rsvpEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = state.rsvpEvents.filter(event => new Date(event.date) < new Date());

  const getEventsForDate = (date) => {
    const dateString = date.toDateString();
    return state.rsvpEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === dateString;
    });
  };

  const handleEditProfile = () => {
    setEditForm({
      name: state.user?.name || 'Creative User',
      username: state.user?.username || 'user123',
      bio: state.user?.bio || 'Art enthusiast and creative supporter',
      location: state.user?.location || '',
      avatar: state.user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
      bannerColor: state.user?.bannerColor || 'gradient-purple'
    });
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    actions.setUser({
      ...state.user,
      ...editForm
    });
    setShowEditModal(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadForm(prev => ({
          ...prev,
          file: file,
          filePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArtworkSubmit = () => {
    if (!uploadForm.title || !uploadForm.ethPrice || !uploadForm.file) {
      alert('Please fill in all required fields');
      return;
    }

    const newArtwork = {
      id: `artwork-${Date.now()}`,
      title: uploadForm.title,
      description: uploadForm.description,
      ethPrice: parseFloat(uploadForm.ethPrice),
      image: uploadForm.filePreview,
      fileName: uploadForm.file.name,
      uploadDate: new Date().toISOString(),
      status: 'uploaded'
    };

    actions.addArtwork(newArtwork);
    setShowUploadModal(false);
    setUploadForm({
      title: '',
      description: '',
      ethPrice: '',
      file: null,
      filePreview: null
    });
    setActiveTab('artworks');
  };

  const handleDeleteArtwork = (artworkId) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      actions.removeArtwork(artworkId);
    }
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const today = new Date();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];

    const days = [];
    
    // Empty days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const eventsOnDay = getEventsForDate(date);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today && !isToday;

      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday ? 'today' : ''} ${isPast ? 'past' : ''} ${eventsOnDay.length > 0 ? 'has-event' : ''}`}
        >
          <span className="day-number">{day}</span>
          {eventsOnDay.length > 0 && (
            <div className="event-indicators">
              {eventsOnDay.map((event, idx) => (
                <div key={idx} className="event-dot" title={event.title}>
                  <span className="event-tooltip">{event.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="calendar-wrapper">
        <div className="calendar-controls">
          <button className="month-nav-btn" onClick={handlePreviousMonth}>
            ← Previous
          </button>
          <h3 className="calendar-month">{monthNames[currentMonth]} {currentYear}</h3>
          <button className="month-nav-btn" onClick={handleNextMonth}>
            Next →
          </button>
        </div>
        
        <div className="calendar-grid">
          <div className="calendar-weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="weekday-label">{day}</div>
            ))}
          </div>
          <div className="calendar-days">
            {days}
          </div>
        </div>

        {state.rsvpEvents.length === 0 && (
          <div className="no-events-message">
            <p>📅 No events yet. RSVP to events to see them appear on your calendar!</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="user-profile-container">
      <Navbar 
        onNavigateToHome={onNavigateToHome}
        onNavigateToExplore={onNavigateToExplore}
        onNavigateToEvents={onNavigateToEvents}
        onNavigateToFeed={onNavigateToFeed}
        onNavigateToUserProfile={onNavigateToUserProfile}
        onLogout={onLogout}
      />

      <div className="profile-header">
        <div 
          className={`profile-banner banner-${state.user?.bannerColor || 'gradient-purple'}`}
        ></div>
        <div className="profile-info-container">
          <div className="profile-info">
            <button className="edit-profile-btn" onClick={handleEditProfile}>
              ✏️ Edit Profile
            </button>
            
            <div className="avatar-section">
              <img 
                src={state.user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'} 
                alt="Profile" 
                className="profile-avatar"
              />
            </div>
            <div className="profile-details">
              <h1>{state.user?.name || 'Creative User'}</h1>
              <p className="username">@{state.user?.username || 'user123'}</p>
              <p className="bio">{state.user?.bio || 'Art enthusiast and creative supporter'}</p>
              {state.user?.location && (
                <p className="location">
                  <span className="location-icon">📍</span>
                  {state.user.location}
                </p>
              )}
              
              <div className="profile-stats">
                <div className="stat">
                  <strong>{state.rsvpEvents.length}</strong>
                  <span>Events</span>
                </div>
                <div className="stat">
                  <strong>{state.userArtworks.length}</strong>
                  <span>Artworks</span>
                </div>
                <div className="stat">
                  <strong>{state.certificates.length}</strong>
                  <span>Certificates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            📅 Calendar
          </button>
          <button 
            className={`tab ${activeTab === 'artworks' ? 'active' : ''}`}
            onClick={() => setActiveTab('artworks')}
          >
            🎨 My Artworks
          </button>
          <button 
            className={`tab ${activeTab === 'bookmarks' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookmarks')}
          >
            🔖 Bookmarks
          </button>
          <button 
            className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            🏆 Achievements
          </button>
          <button 
            className={`tab ${activeTab === 'wallet' ? 'active' : ''}`}
            onClick={() => setActiveTab('wallet')}
          >
            💰 Wallet
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'calendar' && (
            <div className="calendar-section">
              <h2>My Event Calendar</h2>
              {renderCalendar()}
              
              {state.rsvpEvents.length > 0 && (
                <div className="events-list">
                  <h3>Upcoming Events</h3>
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map(event => (
                      <div key={event.id} className="event-item">
                        <div className="event-date">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="event-info">
                          <h4>{event.title}</h4>
                          <p>{event.city} • {event.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-events">No upcoming events</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'artworks' && (
            <div className="artworks-section">
              <div className="section-header">
                <h2>My Kreative Portfolio</h2>
                <button className="upload-btn" onClick={() => setShowUploadModal(true)}>
                  ⬆️ Upload Artwork
                </button>
              </div>
              
              {state.userArtworks.length > 0 ? (
                <div className="artworks-grid">
                  {state.userArtworks.map(artwork => (
                    <div key={artwork.id} className="artwork-card">
                      <div className="artwork-image">
                        <img src={artwork.image} alt={artwork.title} />
                      </div>
                      <div className="artwork-details">
                        <h3>{artwork.title}</h3>
                        <p className="artwork-description">{artwork.description}</p>
                        <div className="artwork-price">
                          <span className="price-label">Price:</span>
                          <span className="price-value">{artwork.ethPrice} ETH</span>
                        </div>
                        <div className="artwork-meta">
                          <span className="upload-date">
                            Uploaded: {new Date(artwork.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                        <button 
                          className="delete-artwork-btn"
                          onClick={() => handleDeleteArtwork(artwork.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">🎨</div>
                  <h3>No artworks yet</h3>
                  <p>Upload your first artwork to start building your portfolio!</p>
                  <button className="upload-btn-large" onClick={() => setShowUploadModal(true)}>
                    Upload Your First Artwork
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div className="bookmarks-section">
              <h2>Bookmarked Posts</h2>
              {state.bookmarkedPosts.length > 0 ? (
                <div className="bookmarks-grid">
                  {state.bookmarkedPosts.map((postId, index) => (
                    <div key={index} className="bookmark-card">
                      <div className="bookmark-icon">🔖</div>
                      <p>Bookmarked Post {index + 1}</p>
                      <button 
                        className="remove-bookmark-btn"
                        onClick={() => actions.removeBookmark(postId)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">🔖</div>
                  <h3>No bookmarks yet</h3>
                  <p>Bookmark posts from the feed to see them here!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements-section">
              <h2>🏆 My Achievements & Certificates</h2>
              {state.certificates.length > 0 ? (
                <div className="certificates-grid">
                  {state.certificates.map(cert => (
                    <div key={cert.id} className="certificate-card">
                      <div className="certificate-badge">🎓</div>
                      <h3>{cert.quizTitle}</h3>
                      <div className="certificate-details">
                        <div className="cert-score">
                          <strong>Score:</strong> {cert.score}%
                        </div>
                        <div className="cert-date">
                          <strong>Earned:</strong> {new Date(cert.date).toLocaleDateString()}
                        </div>
                        <div className="cert-name">
                          <strong>Recipient:</strong> {cert.userName}
                        </div>
                      </div>
                      <div className="certificate-status">
                        ✓ Certified
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">🏆</div>
                  <h3>No certificates yet</h3>
                  <p>Complete educational quizzes to earn certificates!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="wallet-section">
              <h2>💰 Crypto Wallet</h2>
              <WalletConnect />
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Profile</h2>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                value={editForm.username}
                onChange={(e) => setEditForm({...editForm, username: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea 
                value={editForm.bio}
                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input 
                type="text" 
                placeholder="City, Country"
                value={editForm.location}
                onChange={(e) => setEditForm({...editForm, location: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Avatar</label>
              <div className="avatar-options">
                {avatarOptions.map((avatar, idx) => (
                  <img 
                    key={idx}
                    src={avatar}
                    alt={`Avatar ${idx}`}
                    className={`avatar-option ${editForm.avatar === avatar ? 'selected' : ''}`}
                    onClick={() => setEditForm({...editForm, avatar})}
                  />
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Banner Color</label>
              <div className="banner-color-options">
                {bannerOptions.map((banner) => (
                  <div
                    key={banner.id}
                    className={`banner-color-option ${editForm.bannerColor === banner.id ? 'selected' : ''}`}
                    style={{ background: banner.color }}
                    onClick={() => setEditForm({...editForm, bannerColor: banner.id})}
                    title={banner.name}
                  >
                    {editForm.bannerColor === banner.id && <span className="check-mark">✓</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn-save" onClick={handleSaveProfile}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Artwork Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-content upload-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Upload Artwork</h2>
            <div className="form-group">
              <label>Title *</label>
              <input 
                type="text" 
                placeholder="Enter artwork title"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                placeholder="Describe your artwork..."
                value={uploadForm.description}
                onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Price (ETH) *</label>
              <input 
                type="number" 
                step="0.01"
                placeholder="0.00"
                value={uploadForm.ethPrice}
                onChange={(e) => setUploadForm({...uploadForm, ethPrice: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Artwork File (Image/PDF) *</label>
              <input 
                type="file" 
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
              />
              {uploadForm.filePreview && (
                <div className="file-preview">
                  {uploadForm.file?.type.startsWith('image/') ? (
                    <img src={uploadForm.filePreview} alt="Preview" />
                  ) : (
                    <div className="pdf-preview">📄 {uploadForm.file?.name}</div>
                  )}
                </div>
              )}
            </div>
            <div className="upload-info">
              <p>💡 Your artwork will be securely stored and protected. This is a simulated cloud storage for the prototype.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowUploadModal(false)}>Cancel</button>
              <button className="btn-save" onClick={handleArtworkSubmit}>Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
