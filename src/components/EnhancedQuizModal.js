import React, { useState, useEffect } from 'react';
import './EnhancedQuizModal.css';

let html2canvas, jsPDF;
try {
  html2canvas = require('html2canvas').default || require('html2canvas');
  jsPDF = require('jspdf').jsPDF;
} catch (err) {
  console.warn('Certificate generation libraries not available:', err);
}

const EnhancedQuizModal = ({ quiz, onClose, onComplete, userName = 'Kreative User' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  // Timer
  useEffect(() => {
    if (!isPaused && !showResults) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPaused, showResults]);

  // Auto-save progress to localStorage
  useEffect(() => {
    if (answers.length > 0) {
      localStorage.setItem(`quiz_${quiz.id}_progress`, JSON.stringify({
        currentQuestion,
        answers,
        timeSpent
      }));
    }
  }, [answers, currentQuestion, timeSpent, quiz.id]);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(`quiz_${quiz.id}_progress`);
    if (saved) {
      const { currentQuestion: savedQ, answers: savedA, timeSpent: savedT } = JSON.parse(saved);
      const shouldResume = window.confirm('Resume previous quiz session?');
      if (shouldResume) {
        setCurrentQuestion(savedQ);
        setAnswers(savedA);
        setTimeSpent(savedT);
      }
    }
  }, [quiz.id]);

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quiz.questions[currentQuestion].correctAnswer;
    const newAnswers = [...answers, { questionIndex: currentQuestion, selectedAnswer, isCorrect }];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz complete
      const finalScore = Math.round((newAnswers.filter(a => a.isCorrect).length / quiz.questions.length) * 100);
      setScore(finalScore);
      setShowResults(true);
      localStorage.removeItem(`quiz_${quiz.id}_progress`);
    }
  };

  const generateCertificate = async () => {
    setShowCertificate(true);
    
    // Check if libraries are available
    if (!html2canvas || !jsPDF) {
      alert('Certificate generation libraries are still loading. Please refresh the page and try again.');
      
      // Still call onComplete to store the achievement
      if (onComplete) {
        onComplete({
          quizId: quiz.id,
          title: quiz.title,
          score,
          date: new Date().toISOString(),
          certificateUrl: null
        });
      }
      return;
    }
    
    // Wait for certificate to render
    setTimeout(async () => {
      try {
        const certificateElement = document.getElementById('certificate');
        if (!certificateElement) return;

        // Generate canvas
        const canvas = await html2canvas(certificateElement, {
          scale: 2,
          backgroundColor: '#1a1a2e'
        });

        // Convert to PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`AfriKreate_Certificate_${quiz.title.replace(/\s+/g, '_')}.pdf`);

        // Store in context/backend
        if (onComplete) {
          onComplete({
            quizId: quiz.id,
            title: quiz.title,
            score,
            date: new Date().toISOString(),
            certificateUrl: imgData
          });
        }
      } catch (err) {
        console.error('Certificate generation error:', err);
        alert('Error generating certificate. Your achievement has been saved.');
      }
    }, 100);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const passed = score >= (quiz.passingScore || 50);

  return (
    <div className="enhanced-quiz-modal-overlay" onClick={onClose}>
      <div className="enhanced-quiz-modal" onClick={(e) => e.stopPropagation()}>
        {!showResults && !showCertificate && (
          <>
            <div className="quiz-header">
              <div className="quiz-info">
                <h2>{quiz.title}</h2>
                <div className="quiz-progress">
                  <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
                  <span>Time: {formatTime(timeSpent)}</span>
                </div>
              </div>
              <div className="quiz-actions">
                <button 
                  className="pause-btn"
                  onClick={() => setIsPaused(!isPaused)}
                >
                  {isPaused ? '▶️ Resume' : '⏸️ Pause'}
                </button>
                <button className="close-btn" onClick={onClose}>×</button>
              </div>
            </div>

            {isPaused ? (
              <div className="quiz-paused">
                <h3>⏸️ Quiz Paused</h3>
                <p>Take your time. Your progress is saved.</p>
                <button className="resume-btn" onClick={() => setIsPaused(false)}>
                  Resume Quiz
                </button>
              </div>
            ) : (
              <>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                  />
                </div>

                <div className="question-container">
                  <h3 className="question-text">
                    {quiz.questions[currentQuestion].question}
                  </h3>

                  <div className="options-list">
                    {quiz.questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        className={`option-btn ${selectedAnswer === index ? 'selected' : ''}`}
                        onClick={() => setSelectedAnswer(index)}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                        <span className="option-text">{option}</span>
                      </button>
                    ))}
                  </div>

                  <button 
                    className="submit-answer-btn"
                    onClick={handleAnswer}
                    disabled={selectedAnswer === null}
                  >
                    {currentQuestion === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question →'}
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {showResults && !showCertificate && (
          <div className="quiz-results">
            <div className={`result-icon ${passed ? 'passed' : 'failed'}`}>
              {passed ? '🎉' : '📚'}
            </div>
            <h2>{passed ? 'Congratulations!' : 'Keep Learning!'}</h2>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-number">{score}%</span>
              </div>
            </div>
            <p className="result-message">
              {passed 
                ? `You scored ${score}% and passed the quiz! Well done!`
                : `You scored ${score}%. You need ${quiz.passingScore || 50}% to pass. Try again!`
              }
            </p>

            <div className="result-stats">
              <div className="stat">
                <span className="stat-label">Correct Answers</span>
                <span className="stat-value">{answers.filter(a => a.isCorrect).length} / {quiz.questions.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Time Taken</span>
                <span className="stat-value">{formatTime(timeSpent)}</span>
              </div>
            </div>

            <div className="result-actions">
              {passed && (
                <button className="certificate-btn" onClick={generateCertificate}>
                  📜 Download Certificate
                </button>
              )}
              <button className="close-btn-alt" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}

        {showCertificate && (
          <div className="certificate-container">
            <div id="certificate" className="certificate">
              <div className="certificate-border">
                <div className="certificate-content">
                  <div className="certificate-logo">🎨 AfriKreate</div>
                  <h1 className="certificate-title">Certificate of Completion</h1>
                  <p className="certificate-subtitle">This certifies that</p>
                  <h2 className="certificate-name">{userName}</h2>
                  <p className="certificate-text">
                    has successfully completed the quiz
                  </p>
                  <h3 className="certificate-quiz-title">{quiz.title}</h3>
                  <p className="certificate-score">with a score of <strong>{score}%</strong></p>
                  <div className="certificate-footer">
                    <div className="certificate-date">
                      <p>Date: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="certificate-signature">
                      <p>_________________</p>
                      <p>AfriKreate Team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="back-btn" onClick={() => setShowCertificate(false)}>
              ← Back to Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedQuizModal;
