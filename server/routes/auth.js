const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userId = await User.create(email, password);
    res.status(201).json({ message: 'User created', userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Logging in with email:", email);

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Direct password comparison (⚠️ Not recommended for production)
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with success message and user details
    res.json({ message: "Login successful", user: { id: user.id, email: user.email, role: user.role } });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;