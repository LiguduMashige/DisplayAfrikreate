import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import ThemeToggle from '../components/ThemeToggle';
import useScrollReveal from '../hooks/useScrollReveal';
import './FeedPage.css';

const FeedPage = ({ onBack, onNavigateToHome, onNavigateToExplore, onNavigateToEvents, onNavigateToFeed, onNavigateToUserProfile, onLogout }) => {
  const { state, actions } = useAppContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [repostedPosts, setRepostedPosts] = useState(new Set());
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  // Simulated post data generator
  const generatePosts = () => {
    const postTypes = ['text', 'image', 'mixed'];
    const artCategories = ['Digital Art', 'Photography', 'Music', 'Design', 'Fine Art', 'Animation'];
    const sampleTexts = [
      "Just finished a new piece! What do you think? 🎨",
      "Exploring new creative directions today. Feeling inspired! ✨",
      "Collaboration opportunities open. Let's create something amazing together! 🤝",
      "New collection dropping soon. Stay tuned! 🔥",
      "Behind the scenes of my creative process 📸",
      "Grateful for all the support from this amazing community! 🙏",
      "Working on something special. Can't wait to share! 💫",
      "Art is about expressing your truth. What's yours? 🎭",
      "New techniques, new possibilities! Always learning 📚",
      "The creative journey never ends. Keep pushing! 💪"
    ];

    return Array.from({ length: 20 }, (_, i) => {
      const type = postTypes[Math.floor(Math.random() * postTypes.length)];
      const kreative = state.kreatives[Math.floor(Math.random() * state.kreatives.length)];
      
      return {
        id: `post-${i}`,
        author: kreative?.name || 'Anonymous Artist',
        authorImage: kreative?.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=artist',
        category: artCategories[Math.floor(Math.random() * artCategories.length)],
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        type,
        text: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
        image: type !== 'text' ? `https://source.unsplash.com/800x600/?${artCategories[Math.floor(Math.random() * artCategories.length)].toLowerCase().replace(' ', '-')}` : null,
        likes: Math.floor(Math.random() * 500),
        reposts: Math.floor(Math.random() * 100),
        bookmarks: Math.floor(Math.random() * 150)
      };
    });
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(generatePosts());
      setLoading(false);
    }, 1000);

    // Load saved interactions from localStorage
    const savedLikes = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]');
    const savedReposts = JSON.parse(localStorage.getItem('repostedPosts') || '[]');
    
    setLikedPosts(new Set(savedLikes));
    setBookmarkedPosts(new Set(savedBookmarks));
    setRepostedPosts(new Set(savedReposts));
  }, [state.kreatives]);

  const handleLike = (postId) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
    localStorage.setItem('likedPosts', JSON.stringify([...newLiked]));
  };

  const handleBookmark = (postId) => {
    const newBookmarked = new Set(bookmarkedPosts);
    if (newBookmarked.has(postId)) {
      newBookmarked.delete(postId);
    } else {
      newBookmarked.add(postId);
    }
    setBookmarkedPosts(newBookmarked);
    localStorage.setItem('bookmarkedPosts', JSON.stringify([...newBookmarked]));
  };

  const handleRepost = (postId) => {
    const newReposted = new Set(repostedPosts);
    if (newReposted.has(postId)) {
      newReposted.delete(postId);
    } else {
      newReposted.add(postId);
    }
    setRepostedPosts(newReposted);
    localStorage.setItem('repostedPosts', JSON.stringify([...newReposted]));
  };

  const refreshFeed = () => {
    setRefreshing(true);
    setTimeout(() => {
      const newPosts = generatePosts();
      setPosts(newPosts);
      setRefreshing(false);
    }, 1000);
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    
    const newPost = {
      id: `post-new-${Date.now()}`,
      author: state.user?.name || 'You',
      authorImage: state.user?.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
      category: 'General',
      timestamp: new Date().toISOString(),
      type: 'text',
      text: newPostText,
      image: null,
      likes: 0,
      reposts: 0,
      bookmarks: 0
    };
    
    setPosts([newPost, ...posts]);
    setNewPostText('');
    setShowCreatePost(false);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="feed-page">
      <Navbar 
        onNavigateToHome={onNavigateToHome}
        onNavigateToExplore={onNavigateToExplore}
        onNavigateToEvents={onNavigateToEvents}
        onNavigateToFeed={onNavigateToFeed}
        onNavigateToUserProfile={onNavigateToUserProfile}
        onLogout={onLogout}
      />
      
      {/* Animated Header */}
      <div className="feed-header-animated">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <header className="feed-header">
          <div className="header-content">
            <h1 className="feed-title">AfriKreate Timeline</h1>
            <p className="feed-subtitle">Connect with South African creatives</p>
          </div>
          <div className="header-actions">
            <ThemeToggle />
            <button 
              className="create-post-btn" 
              onClick={() => setShowCreatePost(!showCreatePost)}
              title="Create post"
            >
              ✏️ Create Post
            </button>
            <button 
              className={`refresh-btn ${refreshing ? 'refreshing' : ''}`}
              onClick={refreshFeed} 
              title="Refresh feed"
              disabled={refreshing}
            >
              🔄
            </button>
          </div>
        </header>
      </div>

      {/* Create Post Form */}
      {showCreatePost && (
        <div className="create-post-form">
          <textarea
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            placeholder="Share your creative journey..."
            className="post-textarea"
            rows="4"
          />
          <div className="form-actions">
            <button className="cancel-btn" onClick={() => setShowCreatePost(false)}>
              Cancel
            </button>
            <button 
              className="publish-btn" 
              onClick={handleCreatePost}
              disabled={!newPostText.trim()}
            >
              Publish
            </button>
          </div>
        </div>
      )}

      {/* Feed Content */}
      <div className="feed-container">
        {loading ? (
          <div className="feed-loading">
            <div className="loading-spinner"></div>
            <p>Loading creative content...</p>
          </div>
        ) : (
          <div className="posts-list">
            {posts.map((post) => (
              <FeedPost
                key={post.id}
                post={post}
                isLiked={likedPosts.has(post.id)}
                isBookmarked={bookmarkedPosts.has(post.id)}
                isReposted={repostedPosts.has(post.id)}
                onLike={() => handleLike(post.id)}
                onBookmark={() => handleBookmark(post.id)}
                onRepost={() => handleRepost(post.id)}
                formatTimestamp={formatTimestamp}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const FeedPost = ({ post, isLiked, isBookmarked, isReposted, onLike, onBookmark, onRepost, formatTimestamp }) => {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <article ref={ref} className={`feed-post ${isVisible ? 'revealed' : ''}`}>
      {/* Post Header */}
      <div className="post-header">
        <img src={post.authorImage} alt={post.author} className="author-avatar" />
        <div className="author-info">
          <h3 className="author-name">{post.author}</h3>
          <div className="post-meta">
            <span className="post-category">{post.category}</span>
            <span className="post-timestamp">{formatTimestamp(post.timestamp)}</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <p className="post-text">{post.text}</p>
        {post.image && (
          <div className="post-image-wrapper">
            <img src={post.image} alt="Post content" className="post-image" />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <button 
          className={`action-btn like-btn ${isLiked ? 'active' : ''}`}
          onClick={onLike}
          title="Like"
        >
          <span className="action-icon">{isLiked ? '❤️' : '🤍'}</span>
          <span className="action-count">{post.likes + (isLiked ? 1 : 0)}</span>
        </button>

        <button 
          className={`action-btn repost-btn ${isReposted ? 'active' : ''}`}
          onClick={onRepost}
          title="Repost"
        >
          <span className="action-icon">🔁</span>
          <span className="action-count">{post.reposts + (isReposted ? 1 : 0)}</span>
        </button>

        <button 
          className={`action-btn bookmark-btn ${isBookmarked ? 'active' : ''}`}
          onClick={onBookmark}
          title="Bookmark"
        >
          <span className="action-icon">{isBookmarked ? '🔖' : '📑'}</span>
          <span className="action-count">{post.bookmarks + (isBookmarked ? 1 : 0)}</span>
        </button>
      </div>
    </article>
  );
};

export default FeedPage;
