import React from "react";
import { Link } from "react-router-dom";
import "./Quizzes.css";

const quizzes = [
  { id: 1, title: "React Basics" },
  { id: 2, title: "JavaScript Fundamentals" },
  { id: 3, title: "CSS Mastery" },
];

const Quizzes = () => {
  return (
    <div className="quizzes-container">
      <h2>Available Quizzes</h2>
      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card">
            <Link to={`/quiz/${quiz.id}`} className="quiz-link">
              {quiz.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
