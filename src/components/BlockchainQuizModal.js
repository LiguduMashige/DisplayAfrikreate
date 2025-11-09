import React, { useState } from 'react';
import './BlockchainQuizModal.css';

const BlockchainQuizModal = ({ quiz, onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const percentage = (correctAnswers / quiz.questions.length) * 100;
    setScore(percentage);
    setShowResults(true);

    // If passed (>50%), save to localStorage
    if (percentage >= 50) {
      const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
      const newCertificate = {
        id: Date.now(),
        quizId: quiz.id,
        quizTitle: quiz.title,
        score: percentage,
        date: new Date().toISOString(),
        passed: true
      };
      certificates.push(newCertificate);
      localStorage.setItem('certificates', JSON.stringify(certificates));
      onComplete(newCertificate);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="quiz-modal-overlay" onClick={onClose}>
      <div className="quiz-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="quiz-close-btn" onClick={onClose}>✕</button>

        {!showResults ? (
          <>
            <div className="quiz-header">
              <h2 className="quiz-title">{quiz.title}</h2>
              <div className="quiz-progress-bar">
                <div 
                  className="quiz-progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="quiz-progress-text">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
            </div>

            <div className="quiz-question-section">
              <h3 className="quiz-question">{question.question}</h3>
              
              <div className="quiz-answers">
                {question.answers.map((answer, index) => (
                  <button
                    key={index}
                    className={`quiz-answer-btn ${
                      selectedAnswers[currentQuestion] === index ? 'selected' : ''
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="answer-text">{answer}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="quiz-navigation">
              <button 
                className="quiz-nav-btn" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>
              <button 
                className="quiz-nav-btn primary" 
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                {currentQuestion === quiz.questions.length - 1 ? 'Submit' : 'Next →'}
              </button>
            </div>
          </>
        ) : (
          <div className="quiz-results">
            <div className={`results-icon ${score >= 50 ? 'pass' : 'fail'}`}>
              {score >= 50 ? '🎉' : '📚'}
            </div>
            <h2 className="results-title">
              {score >= 50 ? 'Congratulations!' : 'Keep Learning!'}
            </h2>
            <div className="results-score">
              <div className="score-circle">
                <span className="score-number">{score.toFixed(0)}%</span>
              </div>
            </div>
            <p className="results-message">
              {score >= 50 
                ? '🎓 You passed! A certificate has been added to your profile.' 
                : 'You need at least 50% to pass. Review the material and try again!'}
            </p>
            <div className="results-breakdown">
              <p>Correct Answers: {Object.values(selectedAnswers).filter((answer, index) => answer === quiz.questions[index].correctAnswer).length} / {quiz.questions.length}</p>
            </div>
            <div className="quiz-actions">
              <button className="quiz-action-btn" onClick={restartQuiz}>
                Try Again
              </button>
              <button className="quiz-action-btn primary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainQuizModal;
