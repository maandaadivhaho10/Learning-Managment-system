import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Course.css";

function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCourses = async () => {
      try {
        // Simulated API request with a delay
        setTimeout(() => {
          const mockCourses = [
            { id: "react", title: "React Basics", description: "Learn the fundamentals of React.js." },
            { id: "javascript", title: "JavaScript Advanced", description: "Master advanced JavaScript concepts." },
            { id: "python", title: "Python for Beginners", description: "Introduction to Python programming." }
          ];
          if (!signal.aborted) {
            setCourses(mockCourses);
            setLoading(false);
          }
        }, 1000); // Simulate network delay
      } catch (err) {
        if (!signal.aborted) {
          console.error("Fetch error:", err.message);
          setError("Failed to load courses. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => controller.abort(); // Cleanup on unmount
  }, []);

  if (loading) return <p className="loading">Loading courses...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="course-container">
      <h1>Available Courses</h1>
      <p>Browse and enroll in your preferred course.</p>

      <div className="course-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <Link to={`/courses/${course.id}`} className="btn">View Course</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course;
