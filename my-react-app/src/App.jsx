import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import Course from './Course';
import Quizzes from './Quizzes';
import Quiz from './Quiz';
import Signup from "./Signup";
import './styles.css'; // Import global styles

function App() {
   // Check if we're on the dashboard route
   
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Course />} /> {/* Ensure this is here */}
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quiz/:id" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
