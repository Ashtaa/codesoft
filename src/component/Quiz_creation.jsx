import React, { useState } from 'react';
import './../style/quiz_creation.css';

function Quiz_creation() {
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = parseInt(value);
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    if (!quizName || questions.length === 0) {
      alert('Please enter a quiz name and at least one question.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizName, questions }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Quiz created successfully!');
        setQuizName('');
        setQuestions([]);
      } else {
        alert(result.message || 'Failed to save quiz.');
      }
    } catch (error) {
      console.error(error);
      alert('Server error. Try again later.');
    }
  };

  return (
    <div className="quiz-creation-container">
      <h2>Create a New Quiz</h2>

      <div>
        <label>Quiz Name:</label>
        <input
          type="text"
          className="quiz-name-input"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          placeholder="Enter quiz title"
        />
      </div>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="question-block">
          <label>Question {qIndex + 1}:</label>
          <input
            type="text"
            className="question-input"
            value={q.questionText}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            placeholder="Enter your question"
          />

          {q.options.map((opt, i) => (
            <div key={i}>
              <input
                type="text"
                className="option-input"
                value={opt}
                onChange={(e) => handleOptionChange(qIndex, i, e.target.value)}
                placeholder={`Option ${i + 1}`}
              />
            </div>
          ))}

          <label>Select Correct Answer:</label>
          <select
            className="correct-answer-select"
            value={q.correctAnswer}
            onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
          >
            {q.options.map((opt, i) => (
              <option key={i} value={i}>
                {opt || `Option ${i + 1}`}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={addQuestion} className="add-question-btn">
        + Add Question
      </button>

      <button onClick={handleSubmit} className="submit-btn">
        ✅ Complete Quiz
      </button>
    </div>
  );
}

export default Quiz_creation;
