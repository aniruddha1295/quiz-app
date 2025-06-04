import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizData from '../data/quizData';
import '../styles/QuizPage.css';

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the quiz with the matching id
    const quiz = quizData.find(q => q.id === parseInt(id));
    
    if (quiz) {
      setCurrentQuiz(quiz);
      // Initialize selectedAnswers with empty values
      const initialAnswers = {};
      quiz.questions.forEach(question => {
        initialAnswers[question.id] = '';
      });
      setSelectedAnswers(initialAnswers);
    }
    
    setIsLoading(false);
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  
  if (!currentQuiz) return <div>Quiz not found!</div>;

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    // Check if all questions have been answered
    const unansweredQuestions = currentQuiz.questions.filter(
      question => !selectedAnswers[question.id]
    );

    if (unansweredQuestions.length > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unansweredQuestions.length} unanswered questions. Are you sure you want to submit?`
      );
      if (!confirmSubmit) return;
    }

    // Navigate to results page with selected answers
    navigate(`/results/${id}`, { 
      state: { selectedAnswers } 
    });
  };

  return (
    <div className="quiz-container">
      <h1>{currentQuiz.title}</h1>
      
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }}
        ></div>
      </div>
      
      <div className="question-count">
        Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
      </div>
      
      <div className="question-card">
        <h2>{currentQuestion.text}</h2>
        
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <label key={index} className="option">
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option}
                checked={selectedAnswers[currentQuestion.id] === option}
                onChange={() => handleAnswerSelect(currentQuestion.id, option)}
              />
              <span className="option-text">{option}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="navigation-buttons">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="nav-button"
        >
          Previous
        </button>
        
        {currentQuestionIndex === currentQuiz.questions.length - 1 ? (
          <button onClick={handleSubmit} className="submit-button">
            Submit Quiz
          </button>
        ) : (
          <button onClick={handleNext} className="nav-button">
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizPage;