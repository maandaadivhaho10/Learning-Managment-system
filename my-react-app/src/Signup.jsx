import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css"; 

function Signup() {
  // State variables to store user input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Handle errors
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    setLoading(true);

    // Basic form validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    // Simulating a server request (Replace with actual API call)
    try {
      console.log("User signed up with:", { name, email, password });

      // Simulate success (Replace this with actual API integration)
      setTimeout(() => {
        setLoading(false);
        alert("Signup successful! Redirecting...");
        navigate("/dashboard"); // Redirect to dashboard after signup
      }, 2000);
    } catch (error) {
        setLoading(false);
      
        // Check if the error response exists
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message); // Show server error message
        } else {
          setError("Signup failed. Please try again.");
        }
      }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create an Account</h2>
        <p>Join the Learning Management System today</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
