import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import quizData from '../data/quizData';
import '../styles/ResultsPage.css';

function ResultsPage() {
  const { id } = useParams();
  const location = useLocation();
  const [quiz, setQuiz] = useState(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get selected answers from navigation state
  const selectedAnswers = location.state?.selectedAnswers || {};
  
  useEffect(() => {
    // Find the quiz with the matching id
    const currentQuiz = quizData.find(q => q.id === parseInt(id));
    
    if (currentQuiz) {
      setQuiz(currentQuiz);
      
      // Calculate score
      let correctAnswers = 0;
      currentQuiz.questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctAnswers += 1;
        }
      });
      
      setScore(correctAnswers);
    }
    
    setIsLoading(false);
  }, [id, selectedAnswers]);

  if (isLoading) return <div>Loading results...</div>;
  
  if (!quiz) return <div>Quiz not found!</div>;

  const totalQuestions = quiz.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="results-container">
      <h1>Quiz Results</h1>
      <div className="score-card">
        <h2>{quiz.title}</h2>
        <div className="score">
          <div className="score-value">{score}/{totalQuestions}</div>
          <div className="score-percentage">{percentage}%</div>
        </div>
        
        {percentage >= 70 ? (
          <p className="score-message success">Great job! You passed the quiz!</p>
        ) : (
          <p className="score-message failure">Keep practicing. You can do better!</p>
        )}
      </div>
      
      <div className="results-breakdown">
        <h3>Question Breakdown:</h3>
        {quiz.questions.map((question, index) => {
          const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
          return (
            <div 
              key={question.id} 
              className={`question-result ${isCorrect ? 'correct' : 'incorrect'}`}
            >
              <div className="question-header">
                <span className="question-number">Question {index + 1}</span>
                <span className={`badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              <p className="question-text">{question.text}</p>
              <p className="your-answer">
                Your answer: <span>{selectedAnswers[question.id] || 'Not answered'}</span>
              </p>
              {!isCorrect && (
                <p className="correct-answer">
                  Correct answer: <span>{question.correctAnswer}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="action-buttons">
        <Link to={`/quiz/${id}`} className="retry-button">
          Try Again
        </Link>
        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ResultsPage;