import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from './authSlice';
import './styles.css';

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>EduMaster</h2>
      </div>
      <div className="nav-links">
        <NavLink to="/" className="nav-item" activeclassname="active">
          Home
        </NavLink>
        {user ? (
          <>
            <NavLink to="/dashboard" className="nav-item" activeclassname="active">
              Dashboard
            </NavLink>
            <NavLink to="/quizzes" className="nav-item" activeclassname="active">
              Quizzes
            </NavLink>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="nav-item" activeclassname="active">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
