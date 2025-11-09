import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import PageTransition from './components/PageTransition';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CustomizationPage from './pages/CustomizationPage';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import EventsPage from './pages/EventsPage';
import UserProfilePage from './pages/UserProfilePage.jsx';
import FeedPage from './pages/FeedPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Check if user is authenticated first
    const isAuthenticated = localStorage.getItem('afrikreateIsAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      // Not authenticated - always start at landing page
      return 'landing';
    }
    
    // Authenticated - load saved page or default to home
    return localStorage.getItem('afrikreateCurrentPage') || 'home';
  });
  const [selectedArtist, setSelectedArtist] = useState(() => {
    const saved = localStorage.getItem('afrikreateSelectedArtist');
    return saved ? JSON.parse(saved) : null;
  });

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('afrikreateCurrentPage', currentPage);
  }, [currentPage]);

  // Save selected artist to localStorage whenever it changes
  useEffect(() => {
    if (selectedArtist) {
      localStorage.setItem('afrikreateSelectedArtist', JSON.stringify(selectedArtist));
    } else {
      localStorage.removeItem('afrikreateSelectedArtist');
    }
  }, [selectedArtist]);

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  const handleLogin = () => {
    setCurrentPage('customization');
  };

  const handleCustomizationComplete = () => {
    setCurrentPage('home');
  };

  const handleNavigateToExplore = () => {
    setCurrentPage('explore');
  };

  const handleNavigateToFeed = () => {
    setCurrentPage('feed');
  };

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
    setCurrentPage('profile');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedArtist(null);
  };


  const handleNavigateToEvents = () => {
    setCurrentPage('events');
  };

  const handleBackFromEvents = () => {
    setCurrentPage('home');
  };

  const handleNavigateToUserProfile = () => {
    setCurrentPage('userProfile');
  };

  const handleBackFromUserProfile = () => {
    setCurrentPage('home');
  };

  const handleBackFromFeed = () => {
    setCurrentPage('home');
  };

  const handleLogout = () => {
    // Clear all localStorage
    localStorage.clear();
    // Reset to landing page
    setCurrentPage('landing');
    setSelectedArtist(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <PageTransition isActive={true} transitionKey="landing">
            <LandingPage onGetStarted={handleGetStarted} />
          </PageTransition>
        );
      case 'login':
        return (
          <PageTransition isActive={true} transitionKey="login">
            <LoginPage onLogin={handleLogin} />
          </PageTransition>
        );
      case 'customization':
        return (
          <PageTransition isActive={true} transitionKey="customization">
            <CustomizationPage onComplete={handleCustomizationComplete} />
          </PageTransition>
        );
      case 'home':
        return (
          <PageTransition isActive={true} transitionKey="home">
            <HomePage 
              onNavigateToHome={handleBackToHome}
              onNavigateToExplore={handleNavigateToExplore} 
              onArtistClick={handleArtistClick}
              onNavigateToEvents={handleNavigateToEvents}
              onNavigateToUserProfile={handleNavigateToUserProfile}
              onNavigateToFeed={handleNavigateToFeed}
              onLogout={handleLogout}
            />
          </PageTransition>
        );
      case 'explore':
        return (
          <PageTransition isActive={true} transitionKey="explore">
            <ExplorePage 
              onBack={handleBackToHome}
              onNavigateToHome={handleBackToHome}
              onNavigateToExplore={handleNavigateToExplore}
              onNavigateToEvents={handleNavigateToEvents}
              onNavigateToFeed={handleNavigateToFeed}
              onNavigateToUserProfile={handleNavigateToUserProfile}
              onArtistClick={handleArtistClick}
              onLogout={handleLogout}
            />
          </PageTransition>
        );
      case 'profile':
        return (
          <PageTransition isActive={true} transitionKey="profile">
            <ProfilePage 
              kreative={selectedArtist}
              onBack={handleBackToHome}
              onNavigateToHome={handleBackToHome}
              onNavigateToExplore={handleNavigateToExplore}
              onNavigateToEvents={handleNavigateToEvents}
              onNavigateToFeed={handleNavigateToFeed}
              onNavigateToUserProfile={handleNavigateToUserProfile}
              onLogout={handleLogout}
            />
          </PageTransition>
        );
      case 'events':
        return (
          <PageTransition isActive={true} transitionKey="events">
            <EventsPage 
              onBack={handleBackFromEvents}
              onNavigateToHome={handleBackToHome}
              onNavigateToExplore={handleNavigateToExplore}
              onNavigateToEvents={handleNavigateToEvents}
              onNavigateToFeed={handleNavigateToFeed}
              onNavigateToUserProfile={handleNavigateToUserProfile}
              onLogout={handleLogout}
            />
          </PageTransition>
        );
      case 'userProfile':
        return (
          <PageTransition isActive={true} transitionKey="userProfile">
            <UserProfilePage 
              onBack={handleBackFromUserProfile}
              onNavigateToHome={handleBackToHome}
              onNavigateToExplore={handleNavigateToExplore}
              onNavigateToEvents={handleNavigateToEvents}
              onNavigateToFeed={handleNavigateToFeed}
              onNavigateToUserProfile={handleNavigateToUserProfile}
              onLogout={handleLogout}
            />
          </PageTransition>
        );
      case 'feed':
        return (
          <PageTransition isActive={true} transitionKey="feed">
            <FeedPage 
              onBack={handleBackFromFeed}
              onNavigateToHome={handleBackToHome}
              onNavigateToExplore={handleNavigateToExplore}
              onNavigateToEvents={handleNavigateToEvents}
              onNavigateToFeed={handleNavigateToFeed}
              onNavigateToUserProfile={handleNavigateToUserProfile}
              onLogout={handleLogout}
            />
          </PageTransition>
        );
      default:
        return (
          <PageTransition isActive={true} transitionKey="landing">
            <LandingPage onGetStarted={handleGetStarted} />
          </PageTransition>
        );
    }
  };

  return (
    <AppProvider>
      <div className="App">
        {renderCurrentPage()}
      </div>
    </AppProvider>
  );
}

export default App;
