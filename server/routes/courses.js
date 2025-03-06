
const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Import your database connection

// Fetch all courses
router.get("/allcourses", async (req, res) => {
  try {
    const [courses] = await db.query("SELECT id, title, description FROM courses");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

module.exports = router;

