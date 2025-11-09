import React, { useState } from 'react';
import { eventsData } from '../data/eventsData';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import './EventsPage.css';

// Lazy load FullCalendar to avoid blocking
let FullCalendar, dayGridPlugin, interactionPlugin;
try {
  FullCalendar = require('@fullcalendar/react').default;
  dayGridPlugin = require('@fullcalendar/daygrid').default;
  interactionPlugin = require('@fullcalendar/interaction').default;
} catch (err) {
  console.warn('FullCalendar not available yet:', err);
}

const EventsPage = ({ onBack, onNavigateToHome, onNavigateToExplore, onNavigateToEvents, onNavigateToFeed, onNavigateToUserProfile, onLogout }) => {
  const { actions } = useAppContext();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedEvent, setConfirmedEvent] = useState(null);
  const [showRSVPConfirm, setShowRSVPConfirm] = useState(false);
  const [pendingEvent, setPendingEvent] = useState(null);

  const filteredEvents = eventsData.filter(event => {
    const matchesFilter = filter === 'all' || event.category === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['all', ...new Set(eventsData.map(e => e.category))];

  const handleRSVPClick = (event) => {
    setPendingEvent(event);
    setShowRSVPConfirm(true);
  };

  const confirmRSVP = () => {
    if (!pendingEvent) return;

    actions.addRSVP(pendingEvent);
    
    const eventDate = new Date(pendingEvent.date + ' ' + pendingEvent.time);
    const eventDetails = {
      title: pendingEvent.title,
      description: pendingEvent.description,
      location: pendingEvent.location + ', ' + pendingEvent.city,
      startDate: eventDate,
      endDate: new Date(eventDate.getTime() + 2 * 60 * 60 * 1000)
    };
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${eventDetails.endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pendingEvent.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setShowRSVPConfirm(false);
    setConfirmedEvent(pendingEvent);
    setShowConfirmation(true);
    setPendingEvent(null);
  };

  const cancelRSVP = () => {
    setShowRSVPConfirm(false);
    setPendingEvent(null);
  };

  // Helper function for event colors
  const getCategoryColor = (category) => {
    const colors = {
      'Music': '#ef4444',
      'Art Exhibition': '#8b5cf6',
      'Workshop': '#10b981',
      'Networking': '#f59e0b',
      'Tech': '#3b82f6',
      'Other': '#6b7280'
    };
    return colors[category] || colors['Other'];
  };


  return (
    <div className="events-container">
      <Navbar 
        onNavigateToHome={onNavigateToHome}
        onNavigateToExplore={onNavigateToExplore}
        onNavigateToEvents={onNavigateToEvents}
        onNavigateToFeed={onNavigateToFeed}
        onNavigateToUserProfile={onNavigateToUserProfile}
        onLogout={onLogout}
      />
      
      <header className="events-header">
        <h1>Creative Events in South Africa</h1>
        <p>Discover and attend amazing artistic events near you</p>
      </header>

      <div className="events-filters">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'All Events' : cat}
            </button>
          ))}
        </div>

      </div>

      {/* Events List */}
      <div className="events-grid">
        {filteredEvents.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image">
              <img src={event.image} alt={event.title} />
              <span className="event-category">{event.category}</span>
            </div>
            
            <div className="event-content">
              <h3>{event.title}</h3>
              <p className="event-description">{event.description}</p>
              
              <div className="event-details">
                <div className="detail-item">
                  <span className="icon">📅</span>
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <span className="icon">🕐</span>
                  <span>{event.time}</span>
                </div>
                <div className="detail-item">
                  <span className="icon">📍</span>
                  <span>{event.city}</span>
                </div>
                <div className="detail-item">
                  <span className="icon">💰</span>
                  <span>{event.price}</span>
                </div>
              </div>
              
              <button 
                className="rsvp-button"
                onClick={() => handleRSVPClick(event)}
              >
                RSVP & Add to Calendar
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* RSVP Confirmation Dialog */}
      {showRSVPConfirm && pendingEvent && (
        <div className="confirmation-modal" onClick={cancelRSVP}>
          <div className="confirmation-content rsvp-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="confirmation-header">
              <span className="confirmation-icon question">?</span>
              <h2>Confirm RSVP</h2>
            </div>
            <div className="confirmation-body">
              <p className="confirmation-question">
                Are you sure you want to RSVP for this event?
              </p>
              <h3>{pendingEvent.title}</h3>
              <p className="confirmation-detail">📅 {new Date(pendingEvent.date).toLocaleDateString()}</p>
              <p className="confirmation-detail">🕐 {pendingEvent.time}</p>
              <p className="confirmation-detail">📍 {pendingEvent.location}, {pendingEvent.city}</p>
              <p className="confirmation-detail">💰 {pendingEvent.price}</p>
            </div>
            <div className="confirmation-actions">
              <button className="confirmation-cancel" onClick={cancelRSVP}>
                Cancel
              </button>
              <button className="confirmation-confirm" onClick={confirmRSVP}>
                Confirm RSVP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Confirmation */}
      {showConfirmation && confirmedEvent && (
        <div className="confirmation-modal" onClick={() => setShowConfirmation(false)}>
          <div className="confirmation-content" onClick={(e) => e.stopPropagation()}>
            <div className="confirmation-header">
              <span className="confirmation-icon success">✓</span>
              <h2>Booking Confirmed!</h2>
            </div>
            <div className="confirmation-body">
              <h3>{confirmedEvent.title}</h3>
              <p className="confirmation-detail">📅 {new Date(confirmedEvent.date).toLocaleDateString()}</p>
              <p className="confirmation-detail">🕐 {confirmedEvent.time}</p>
              <p className="confirmation-detail">📍 {confirmedEvent.location}, {confirmedEvent.city}</p>
              <p className="confirmation-message">
                Your event has been added to your calendar and saved to your profile!
              </p>
            </div>
            <button className="confirmation-close" onClick={() => setShowConfirmation(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
