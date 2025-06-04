import { Link } from 'react-router-dom';
import quizData from '../data/quizData';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Quiz Master</h1>
      <p className="subtitle">Select a quiz to begin:</p>
      
      <div className="quiz-list">
        {quizData.map((quiz) => (
          <div key={quiz.id} className="quiz-card">
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <p className="questions-count">{quiz.questions.length} Questions</p>
            <Link to={`/quiz/${quiz.id}`} className="start-button">
              Start Quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;