import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const quizzes = [
  { id: 1, title: "React Basics" },
  { id: 2, title: "JavaScript Fundamentals" },
  { id: 3, title: "CSS Mastery" },
];

const Quizzes = () => {
  return (
    <div className="container">
      <h2>Available Quizzes</h2>
      <ul className="quiz-list">
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/quiz/${quiz.id}`} className="btn">
              {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quizzes;
