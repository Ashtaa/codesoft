import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './../style/quiz_taking.css';

function Quiz_taking() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/quizzes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Quiz not found');
        return res.json();
      })
      .then(data => {
        setQuiz(data);
        setSelectedAnswers(Array(data.questions.length).fill(null));
      })
      .catch(err => {
        console.error(err);
        alert('Error loading quiz');
      });
  }, [id]);

  if (!quiz) return <p className="loading">Loading quiz...</p>;

  const question = quiz.questions[currentQ];

  const handleAnswerSelect = (optionIndex) => {
    const updated = [...selectedAnswers];
    updated[currentQ] = optionIndex;
    setSelectedAnswers(updated);
  };

  const nextQuestion = () => {
    if (selectedAnswers[currentQ] === null) {
      alert('Please select an answer');
      return;
    }

    if (currentQ + 1 < quiz.questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return quiz.questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="quiz-container">
        <h2>Quiz Results</h2>
        <p>Your score: {score} / {quiz.questions.length}</p>

        <div className="review">
          {quiz.questions.map((q, i) => (
            <div key={i} className="review-question">
              <p><strong>Q{i + 1}: {q.questionText}</strong></p>
              <ul>
                {q.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[i] === idx;
                  const isCorrect = q.correctAnswer === idx;
                  return (
                    <li
                      key={idx}
                      className={
                        isCorrect ? 'correct' :
                        isSelected ? 'incorrect' : ''
                      }
                    >
                      {opt}
                      {isCorrect && ' (Correct Answer)'}
                      {isSelected && !isCorrect && ' (Your choice)'}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{quiz.quizName}</h2>
      <p>Question {currentQ + 1} of {quiz.questions.length}</p>
      <p className="question"><strong>{question.questionText}</strong></p>

      <ul className="options">
        {question.options.map((opt, idx) => (
          <li key={idx}>
            <label>
              <input
                type="radio"
                name={`question-${currentQ}`}
                checked={selectedAnswers[currentQ] === idx}
                onChange={() => handleAnswerSelect(idx)}
              />
              {opt}
            </label>
          </li>
        ))}
      </ul>

      <button onClick={nextQuestion} className="next-btn">
        {currentQ + 1 === quiz.questions.length ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
}

export default Quiz_taking;
