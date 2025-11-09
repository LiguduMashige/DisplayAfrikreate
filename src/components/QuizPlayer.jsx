import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import './QuizPlayer.css';

const QuizPlayer = ({ quiz, topicId, onComplete, onClose }) => {
  const { state, actions } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [timeStarted] = useState(new Date());

  // Calculate quiz score locally
  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    const passingScore = 50; // 50% to pass
    const passed = percentage >= passingScore;
    
    return {
      totalQuestions: quiz.questions.length,
      correctAnswers: correctCount,
      percentage,
      passed,
      passingScore
    };
  };

  // Auto-save progress every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!showResults) {
        localStorage.setItem(`quiz-progress-${quiz.id}`, JSON.stringify({
          currentQuestion,
          answers,
          timeStarted
        }));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [currentQuestion, answers, showResults, quiz.id, timeStarted]);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(`quiz-progress-${quiz.id}`);
    if (saved) {
      try {
        const { currentQuestion: savedQ, answers: savedA } = JSON.parse(saved);
        if (savedQ !== undefined && savedA) {
          setCurrentQuestion(savedQ);
          setAnswers(savedA);
        }
      } catch (e) {
        console.error('Failed to load quiz progress');
      }
    }
  }, [quiz.id]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    const score = calculateScore();
    setResults(score);
    setShowResults(true);

    // Clear saved progress
    localStorage.removeItem(`quiz-progress-${quiz.id}`);

    // Save certificate if passed
    if (score.passed) {
      const certificate = {
        id: `cert-${Date.now()}`,
        topicId,
        quizTitle: quiz.title || `${topicId} Quiz`,
        score: score.percentage,
        date: new Date().toISOString(),
        userName: state.user?.name || 'Creative User',
        passed: true
      };
      actions.addCertificate(certificate);
    }

    // Notify parent
    if (onComplete) {
      onComplete(score);
    }
  };

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const allAnswered = quiz.questions.every(q => answers[q.id] !== undefined);

  if (showResults) {
    return (
      <div className="quiz-results">
        <div className="results-header">
          {results.passed ? (
            <>
              <div className="success-icon">🎉</div>
              <h2>Congratulations!</h2>
              <p>You passed the quiz!</p>
            </>
          ) : (
            <>
              <div className="info-icon">📚</div>
              <h2>Keep Learning!</h2>
              <p>You didn't pass this time, but don't give up!</p>
            </>
          )}
        </div>

        <div className="results-stats">
          <div className="stat-box">
            <div className="stat-value">{results.percentage}%</div>
            <div className="stat-label">Your Score</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{results.correctAnswers}/{results.totalQuestions}</div>
            <div className="stat-label">Correct Answers</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{results.passingScore}%</div>
            <div className="stat-label">Passing Score</div>
          </div>
        </div>

        {results.passed && (
          <div className="certificate-notice">
            <p>🏆 Certificate earned! View it in your profile under "Certifications".</p>
          </div>
        )}

        <div className="results-actions">
          {!results.passed && (
            <button className="btn-retry" onClick={() => {
              setShowResults(false);
              setCurrentQuestion(0);
              setAnswers({});
              setResults(null);
            }}>
              Try Again
            </button>
          )}
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-player">
      <div className="quiz-header">
        <h2>{quiz.title || 'Knowledge Quiz'}</h2>
        <div className="quiz-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-text">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
        </div>
      </div>

      <div className="quiz-content">
        <div className="question">
          <h3>{question.question}</h3>
        </div>

        <div className="options">
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`option ${answers[question.id] === index ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                checked={answers[question.id] === index}
                onChange={() => handleAnswerSelect(question.id, index)}
              />
              <span className="option-text">{option}</span>
              <span className="checkmark"></span>
            </label>
          ))}
        </div>
      </div>

      <div className="quiz-navigation">
        <button
          className="btn-nav btn-previous"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>

        <div className="nav-center">
          <span className="auto-save-indicator">
            ✓ Progress auto-saved
          </span>
        </div>

        {currentQuestion < quiz.questions.length - 1 ? (
          <button
            className="btn-nav btn-next"
            onClick={handleNext}
            disabled={answers[question.id] === undefined}
          >
            Next →
          </button>
        ) : (
          <button
            className="btn-nav btn-submit"
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            Submit Quiz
          </button>
        )}
      </div>

      {!allAnswered && currentQuestion === quiz.questions.length - 1 && (
        <div className="warning-message">
          ⚠️ Please answer all questions before submitting
        </div>
      )}
    </div>
  );
};

export default QuizPlayer;
