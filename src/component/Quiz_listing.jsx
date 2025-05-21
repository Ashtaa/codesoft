import React, { useEffect, useState } from 'react';
import './../style/quiz_listing.css';

function Quiz_listing() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/quizzes')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch quizzes');
        return res.json();
      })
      .then((data) => {
        setQuizzes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="quiz-loading">Loading quizzes...</p>;
  if (error) return <p className="quiz-error">Error: {error}</p>;
  if (quizzes.length === 0) return <p className="quiz-empty">No quizzes available.</p>;

  return (
    <div className="quiz-list-container">
      <h2>Available Quizzes</h2>
      <ul className="quiz-list">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="quiz-item">
            <span className="quiz-title">{quiz.quizName}</span>
            <button
              className="quiz-button"
              onClick={() => window.location.href = `/take-quiz/${quiz._id}`}
            >
              Take Quiz
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quiz_listing;
