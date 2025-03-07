import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error2, setError2] = useState("");

  useEffect(() => {
    let isMounted = true; // Track component mount status

    const fetchCourses = async () => {
      try {
        // Simulated data fetch
        const mockCourses = [
          { id: "react", title: "React Basics", description: "Learn the fundamentals of React.js." },
          { id: "javascript", title: "JavaScript Advanced", description: "Master advanced JavaScript concepts." },
          { id: "python", title: "Python for Beginners", description: "Introduction to Python programming." }
        ];

        // Only update state if the component is still mounted
        if (isMounted) {
          setCourses(mockCourses);
          setLoading(false);
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        if (isMounted) {
          setError2("Failed to load courses.");
          setLoading(false);
        }
      }
    };

    fetchCourses();

    // Cleanup function to avoid state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p className="loading">Loading courses...</p>;
  if (error2) return <p className="error-message">{error2}</p>;

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
