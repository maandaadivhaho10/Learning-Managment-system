import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css"; 

function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/courses/allcourses")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
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
