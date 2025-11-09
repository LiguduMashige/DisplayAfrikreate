import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import BlogModal from '../components/BlogModal';
import BackgroundAnimations from '../components/BackgroundAnimations';
import Navbar from '../components/Navbar';
import RotatingBanner from '../components/RotatingBanner';
import MissionStatement from '../components/MissionStatement';
import CryptoMarket from '../components/CryptoMarket';
import CryptoNewsTicker from '../components/CryptoNewsTicker';
import QuizPlayer from '../components/QuizPlayer';
import LearnModal from '../components/LearnModal';
import TopPerformingCarousel from '../components/TopPerformingCarousel';
import TopNFTArtworks from '../components/TopNFTArtworks';
import useScrollReveal from '../hooks/useScrollReveal';
import { blogContent } from '../data/blogContent';
import { learnTopics } from '../data/learnContent';
import './HomePage.css';

const HomePage = ({ onNavigateToExplore, onArtistClick, onNavigateToEvents, onNavigateToUserProfile, onNavigateToFeed, onNavigateToHome, onLogout }) => {
  const { state, actions } = useAppContext();
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedLearnTopic, setSelectedLearnTopic] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedQuizTopic, setSelectedQuizTopic] = useState(null);
  const [showCertificateToast, setShowCertificateToast] = useState(false);

  // Scroll to top and prevent body scroll when modal opens
  useEffect(() => {
    if (selectedLearnTopic || selectedQuiz || selectedBlog) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedLearnTopic, selectedQuiz, selectedBlog]);

  useEffect(() => {
    // Organize all kreatives by categories (no filtering by preferences)
    if (state.kreatives.length > 0) {
      // Group all kreatives by category
      const categoryGroups = {
        'Fine Artists': state.kreatives.filter(k => k.category === 'fine artist'),
        'Digital Artists': state.kreatives.filter(k => k.category === 'digital artist'),
        'Photographers': state.kreatives.filter(k => k.category === 'photographer'),
        'Animators': state.kreatives.filter(k => k.category === 'animator'),
        'Designers': state.kreatives.filter(k => k.category === 'designer'),
        'Musicians': state.kreatives.filter(k => k.category === 'musician')
      };
      
      setCategories(Object.entries(categoryGroups).filter(([_, kreatives]) => kreatives.length > 0));
    }
  }, [state.kreatives]);

  // Get recommended kreatives based on user preferences
  const getRecommendedKreatives = () => {
    if (!state.userPreferences || state.userPreferences.length === 0) {
      return [];
    }

    // Category mapping from customization IDs to kreatives.json categories
    const categoryMapping = {
      'digital-art': ['digital artist'],
      'visual-art': ['fine artist'],
      'music-sound': ['musician'],
      'photography': ['photographer'],
      'animation': ['animator'],
      'graphic-design': ['designer'],
      'crafts-textiles': ['fine artist'],
      'sculpture': ['fine artist'],
      'writing': ['writer'],
      'performance': ['performer']
    };

    const preferredCategories = state.userPreferences.flatMap(pref => 
      categoryMapping[pref] || []
    );

    return state.kreatives.filter(kreative => 
      preferredCategories.includes(kreative.category.toLowerCase())
    );
  };

  const recommendedKreatives = getRecommendedKreatives();

  // Get top 10 performing kreatives by followers
  const getTopKreatives = () => {
    const parseFollowerCount = (followers) => {
      if (typeof followers === 'string') {
        const num = parseFloat(followers.replace('k', '').replace('K', ''));
        return num * 1000;
      }
      return followers;
    };

    return [...state.kreatives]
      .sort((a, b) => parseFollowerCount(b.followers) - parseFollowerCount(a.followers))
      .slice(0, 10);
  };

  const topKreatives = getTopKreatives();

  const handleFavorite = (kreative) => {
    const isFavorited = state.favorites.some(fav => fav.id === kreative.id);
    if (isFavorited) {
      actions.removeFavorite(kreative.id);
    } else {
      actions.addFavorite(kreative);
    }
  };

  const handleQuizComplete = (certificate) => {
    setShowCertificateToast(true);
    setTimeout(() => setShowCertificateToast(false), 5000);
  };

  return (
    <div className="home-container">
      <BackgroundAnimations intensity="light" theme="purple" />
      
      {/* Navigation Bar */}
      <Navbar 
        onNavigateToHome={onNavigateToHome}
        onNavigateToExplore={onNavigateToExplore}
        onNavigateToEvents={onNavigateToEvents}
        onNavigateToFeed={onNavigateToFeed}
        onNavigateToUserProfile={onNavigateToUserProfile}
        onLogout={onLogout}
      />

      {/* Rotating Banner */}
      <RotatingBanner />

      {/* Mission Statement */}
      <MissionStatement />

      {/* Hero Section with Featured Kreatives */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Discover South Africa's Creative Talent</h2>
          <p className="hero-subtitle">Connect with artists, support creativity, and invest in the future of African art</p>
          
          <div className="featured-profiles">
            <h3 className="section-title">
              {recommendedKreatives.length > 0 ? 'Recommended For You' : 'Featured AfriKreatives'}
            </h3>
            {(recommendedKreatives.length > 0 ? recommendedKreatives : state.kreatives).length > 0 ? (
              <>
                <div className="carousel-wrapper">
                  <button 
                    className="carousel-arrow carousel-arrow-left"
                    onClick={() => setCurrentCarouselIndex((prev) => {
                      const displayKreatives = recommendedKreatives.length > 0 ? recommendedKreatives : state.kreatives;
                      return (prev - 1 + displayKreatives.length) % displayKreatives.length;
                    })}
                    aria-label="Previous kreative"
                  >
                    ◀
                  </button>
                  <div className="carousel-items">
                    {[-1, 0, 1].map((offset) => {
                      const displayKreatives = recommendedKreatives.length > 0 ? recommendedKreatives : state.kreatives;
                      const index = (currentCarouselIndex + offset + displayKreatives.length) % displayKreatives.length;
                      const kreative = displayKreatives[index];
                      const isActive = offset === 0;
                      
                      return (
                        <div
                          key={`carousel-${index}-${offset}`}
                          className={`carousel-profile-card ${isActive ? 'active' : 'side'}`}
                          onClick={() => isActive && onArtistClick(kreative)}
                          style={{
                            transform: isActive 
                              ? 'scale(1)' 
                              : `scale(0.7) translateX(${offset * 10}px)`,
                            opacity: isActive ? 1 : 0.4,
                            zIndex: isActive ? 10 : 1
                          }}
                        >
                          <div className="carousel-image-wrapper">
                            <img src={kreative.image} alt={kreative.name} className="carousel-profile-image" />
                          </div>
                          <h4 className="carousel-profile-name">{kreative.name}</h4>
                          <p className="carousel-profile-description">
                            {kreative.description.length > 120
                              ? kreative.description.substring(0, 120) + '...'
                              : kreative.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <button 
                    className="carousel-arrow carousel-arrow-right"
                    onClick={() => setCurrentCarouselIndex((prev) => {
                      const displayKreatives = recommendedKreatives.length > 0 ? recommendedKreatives : state.kreatives;
                      return (prev + 1) % displayKreatives.length;
                    })}
                    aria-label="Next kreative"
                  >
                    ▶
                  </button>
                  <div className="carousel-dots">
                    {state.kreatives.map((_, index) => (
                      <button
                        key={index}
                        className={`carousel-dot ${index === currentCarouselIndex ? 'active' : ''}`}
                        onClick={() => setCurrentCarouselIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <button className="explore-btn" onClick={onNavigateToExplore}>Explore All Kreatives</button>
              </>
            ) : (
              <div className="no-results">
                <p>No artists available</p>
                <button className="explore-btn" onClick={onNavigateToExplore}>Explore All Kreatives</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Top Performing Kreatives Carousel */}
      <TopPerformingCarousel 
        kreatives={topKreatives}
        onArtistClick={onArtistClick}
      />

      {/* All AfriKreatives Section */}
      <section className="categories-section">
        <div className="category-row">
          <div className="category-header">
            <h3 className="category-title">All AfriKreatives</h3>
            <p className="category-description">
              Browse through our diverse community of South African kreatives and connect with artists that inspire you.
            </p>
            <button className="view-all-btn" onClick={onNavigateToExplore}>Explore All</button>
          </div>
          
          <div className="kreatives-scroll">
            {state.kreatives.map((kreative) => (
                <div key={kreative.id} className="kreative-card" onClick={() => onArtistClick(kreative)}>
                  <div className="kreative-image">
                    <img src={kreative.image} alt={kreative.name} />
                    <div className="kreative-overlay">
                      <button className="view-profile-btn" onClick={(e) => {
                        e.stopPropagation();
                        onArtistClick(kreative);
                      }}>View Profile</button>
                    </div>
                  </div>
                  <div className="kreative-info">
                    <h4 className="kreative-name">{kreative.name}</h4>
                    <p className="kreative-description">{kreative.description.substring(0, 100)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* Crypto Market Section */}
      <section className="crypto-market-section">
        <CryptoMarket />
      </section>

      {/* Crypto News Ticker */}
      <section className="crypto-news-section">
        <CryptoNewsTicker />
      </section>

      {/* Top 10 NFT Artworks */}
      <TopNFTArtworks />

      {/* Educational Resources Section */}
      <section className="education-section">
        <div className="education-content">
          <h3 className="section-title">Learn About Blockchain & Art</h3>
          <p className="section-subtitle">Educational resources and interactive quizzes to help you understand the future of creative investment</p>
          
          <div className="education-grid">
            <article className="education-card">
              <div className="education-image">
                <div className="placeholder-image">📚</div>
              </div>
              <div className="education-content-text">
                <h4>{learnTopics[0].title}</h4>
                <p>{learnTopics[0].summary}</p>
                <div className="education-actions">
                  <button 
                    className="read-more-btn"
                    onClick={() => setSelectedLearnTopic(learnTopics[0])}
                  >
                    📖 Learn & Watch Videos
                  </button>
                  <button 
                    className="quiz-btn"
                    onClick={() => {
                      setSelectedQuizTopic(learnTopics[0]);
                      setSelectedQuiz(learnTopics[0].quiz);
                    }}
                  >
                    🎓 Take Quiz
                  </button>
                </div>
                <span className="duration-badge">⏱️ {learnTopics[0].duration}</span>
              </div>
            </article>
            
            <article className="education-card">
              <div className="education-image">
                <div className="placeholder-image">💎</div>
              </div>
              <div className="education-content-text">
                <h4>{learnTopics[1].title}</h4>
                <p>{learnTopics[1].summary}</p>
                <div className="education-actions">
                  <button 
                    className="read-more-btn"
                    onClick={() => setSelectedLearnTopic(learnTopics[1])}
                  >
                    📖 Learn & Watch Videos
                  </button>
                  <button 
                    className="quiz-btn"
                    onClick={() => {
                      setSelectedQuizTopic(learnTopics[1]);
                      setSelectedQuiz(learnTopics[1].quiz);
                    }}
                  >
                    🎓 Take Quiz
                  </button>
                </div>
                <span className="duration-badge">⏱️ {learnTopics[1].duration}</span>
              </div>
            </article>
            
            <article className="education-card">
              <div className="education-image">
                <div className="placeholder-image">📜</div>
              </div>
              <div className="education-content-text">
                <h4>{learnTopics[2].title}</h4>
                <p>{learnTopics[2].summary}</p>
                <div className="education-actions">
                  <button 
                    className="read-more-btn"
                    onClick={() => setSelectedLearnTopic(learnTopics[2])}
                  >
                    📖 Learn & Watch Videos
                  </button>
                  <button 
                    className="quiz-btn"
                    onClick={() => {
                      setSelectedQuizTopic(learnTopics[2]);
                      setSelectedQuiz(learnTopics[2].quiz);
                    }}
                  >
                    🎓 Take Quiz
                  </button>
                </div>
                <span className="duration-badge">⏱️ {learnTopics[2].duration}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content-centered">
          <p className="footer-text">Empowering South African creativity through blockchain technology</p>
          <p className="footer-copyright">© 2025, AfriKreate – Powered by Ligoody2Shoes</p>
        </div>
      </footer>

      {/* Blog Modal */}
      {selectedBlog && (
        <BlogModal 
          blog={selectedBlog} 
          onClose={() => setSelectedBlog(null)} 
        />
      )}

      {/* Learn Modal */}
      {selectedLearnTopic && (
        <LearnModal
          topic={selectedLearnTopic}
          onClose={() => setSelectedLearnTopic(null)}
          onStartQuiz={(quiz) => {
            setSelectedQuizTopic(selectedLearnTopic);
            setSelectedQuiz(quiz);
            setSelectedLearnTopic(null);
          }}
        />
      )}

      {/* Quiz Modal */}
      {selectedQuiz && (
        <div className="quiz-modal-overlay" onClick={() => {
          setSelectedQuiz(null);
          setSelectedQuizTopic(null);
        }}>
          <div onClick={(e) => e.stopPropagation()}>
            <QuizPlayer
              quiz={selectedQuiz}
              topicId={selectedQuizTopic?.id || 'general'}
              onComplete={handleQuizComplete}
              onClose={() => {
                setSelectedQuiz(null);
                setSelectedQuizTopic(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Certificate Toast */}
      {showCertificateToast && (
        <div className="certificate-toast">
          🎉 Certificate earned! Check your profile to view it.
        </div>
      )}
    </div>
  );
};

export default HomePage;
