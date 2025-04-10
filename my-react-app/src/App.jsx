import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import Course from './Course';
import Quizzes from './Quizzes';
import Quiz from './Quiz';
import Signup from "./Signup";
import CourseDetail from "./CourseDetail";
import Chatboard from "./Chatboard"; 
import './styles.css';

function AppWrapper() {
  const location = useLocation();
  const showNavbar = ['/login', '/signup', '/'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="container">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Course />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/quiz/:id" element={<Quiz />} />
        </Routes>
      </div>
      <Chatboard />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
