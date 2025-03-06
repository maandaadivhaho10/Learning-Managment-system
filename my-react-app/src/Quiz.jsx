import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

const quizData = {
  1: {
    title: "React Basics",
    questions: [
      { question: "What is JSX?", options: ["Java XML", "JavaScript XML", "JSON"], answer: "JavaScript XML" },
      { question: "What hook is used for state?", options: ["useEffect", "useState", "useReducer"], answer: "useState" }
    ],
  },
  2: {
    title: "JavaScript Fundamentals",
    questions: [
      { question: "What keyword declares a variable?", options: ["var", "define", "set"], answer: "var" },
      { question: "What is the result of `typeof []`?", options: ["array", "object", "list"], answer: "object" }
    ],
  }
};

const Quiz = () => {
  const { id } = useParams();
  const quiz = quizData[id];

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswer = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.answer) correct++;
    });
    setScore(correct);
  };

  return (
    <div className="container">
      <h2>{quiz?.title}</h2>
      {quiz ? (
        <>
          {quiz.questions.map((q, index) => (
            <div key={index} className="quiz-question">
              <p>{q.question}</p>
              {q.options.map((option) => (
                <button key={option} className="btn" onClick={() => handleAnswer(index, option)}>
                  {option}
                </button>
              ))}
            </div>
          ))}
          <button className="btn" onClick={handleSubmit}>
            Submit
          </button>
          {score !== null && <h3>Your Score: {score}/{quiz.questions.length}</h3>}
        </>
      ) : (
        <p>Quiz not found.</p>
      )}
    </div>
  );
};

export default Quiz;
