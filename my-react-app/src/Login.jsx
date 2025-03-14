import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Default user credentials
  const defaultUser = {
    email: "test@example.com",
    password: "password123",
    token: "dummyToken123", // Simulated token
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email === defaultUser.email && password === defaultUser.password) {
        // Simulate token storage
        localStorage.setItem("token", defaultUser.token);
        setLoading(false);
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setLoading(false);
        setError("Invalid email or password. Please try again.");
      }
    }, 1000); // Simulating network delay
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Log in to continue your learning journey</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
