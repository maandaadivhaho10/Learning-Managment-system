import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import learningImage from './assets/learning.jpeg';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the EduMaster</h1>
      <p>Your gateway to interactive learning and self-improvement.</p>

      <div className="home-image">
        <img src={learningImage}alt="Learning" />
      </div>
    </div>
  );
}

export default Home;
