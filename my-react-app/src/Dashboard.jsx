import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Dashboard</h2>
      <p>Manage your courses, view quizzes, and track your progress.</p>

      <div className="dashboard-links">
        <Link to="/courses" className="btn">View Courses</Link>
        <Link to="/quizzes" className="btn">Take a Quiz</Link>
        <Link to="/grades" className="btn">View Grades</Link>
      </div>
    </div>
  );
}

export default Dashboard;
