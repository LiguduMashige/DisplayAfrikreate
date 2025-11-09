import React, { useState } from 'react';
import './LearnModal.css';

const LearnModal = ({ topic, onClose, onStartQuiz }) => {
  const [activeTab, setActiveTab] = useState('content');

  if (!topic) return null;

  return (
    <div className="learn-modal-overlay" onClick={onClose}>
      <div className="learn-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="learn-modal-close" onClick={onClose}>×</button>
        
        {/* Header */}
        <div className="learn-modal-header">
          <h1>{topic.title}</h1>
          <p className="learn-summary">{topic.summary}</p>
          <div className="learn-meta">
            <span className={`difficulty-badge ${topic.difficulty}`}>
              {topic.difficulty}
            </span>
            <span className="duration">⏱️ {topic.duration}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="learn-tabs">
          <button
            className={`learn-tab ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            📚 Learn
          </button>
          <button
            className={`learn-tab ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            🎥 Videos
          </button>
        </div>

        {/* Content Area */}
        <div className="learn-modal-body">
          {activeTab === 'content' && (
            <div className="learn-content-area">
              {topic.content && typeof topic.content === 'object' ? (
                // Nested structure
                <>
                  {topic.content.introduction && (
                    <div
                      className="content-section"
                      dangerouslySetInnerHTML={{ __html: topic.content.introduction }}
                    />
                  )}
                  {topic.content.mainContent && (
                    <div
                      className="content-section"
                      dangerouslySetInnerHTML={{ __html: topic.content.mainContent }}
                    />
                  )}
                  {topic.content.practicalExample && (
                    <div className="practical-example">
                      <div
                        dangerouslySetInnerHTML={{ __html: topic.content.practicalExample }}
                      />
                    </div>
                  )}
                  {topic.content.conclusion && (
                    <div
                      className="content-section conclusion"
                      dangerouslySetInnerHTML={{ __html: topic.content.conclusion }}
                    />
                  )}
                </>
              ) : topic.content && typeof topic.content === 'string' ? (
                // String content (flat structure)
                <div
                  className="content-section"
                  dangerouslySetInnerHTML={{ __html: topic.content }}
                />
              ) : (
                // Fallback: No content available
                <div className="content-section">
                  <p>No content available for this topic.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="learn-videos-area">
              <h2>Educational Videos</h2>
              <p className="videos-intro">Watch these curated videos to deepen your understanding</p>
              
              {topic.videos && topic.videos.length > 0 ? (
                topic.videos.map((video, index) => (
                  <div key={index} className="video-container">
                    <h3>{video.title}</h3>
                    {video.description && <p className="video-description">{video.description}</p>}
                    <div className="video-embed">
                      <iframe
                        width="100%"
                        height="400"
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ))
              ) : (
                <p>No videos available for this topic.</p>
              )}
            </div>
          )}
        </div>

        {/* Footer with Quiz Button */}
        <div className="learn-modal-footer">
          <p className="quiz-prompt">
            💡 Test your knowledge and earn a certificate!
          </p>
          {topic.quiz && topic.quiz.questions ? (
            <button className="start-quiz-btn" onClick={() => onStartQuiz(topic.quiz)}>
              Take Quiz ({topic.quiz.questions.length} Questions)
            </button>
          ) : (
            <p>No quiz available for this topic.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnModal;
