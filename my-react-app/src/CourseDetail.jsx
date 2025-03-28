import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Import the left arrow icon from react-icons
import "./CourseDetail.css"; // Ensure you have a separate CSS file for styling

const CourseDetail = () => {
  const { courseId } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchTopics = async () => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        setError("API key is missing. Please check your .env file.");
        setLoading(false);
        return;
      }

      if (!courseId) {
        setError("Invalid course ID.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `List the main topics covered in a "${courseId}" course.` }] }],
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Gemini API Error: ${errorData?.error?.message || response.statusText}`);
        }

        const data = await response.json();
        console.log("Gemini API Response:", data);

        // Extract and clean topics from response
        const topicsText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        const topicsList = topicsText
          .split("\n")
          .map((topic) => topic.replace(/^\d+\.\s*/, "").trim()) // Remove numbering if present
          .filter((topic) => topic !== ""); // Remove empty lines

        setTopics(topicsList);
      } catch (err) {
        console.error("API Error:", err);
        setError(`Failed to load topics. ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [courseId]);

  if (!courseId) {
    return <p className="error-message">Invalid course ID. Check again.</p>;
  }

  return (
    <div className="course-detail-container">
      {/* Back arrow icon */}
      <div className="back-icon" onClick={() => navigate(-1)}>
        <FaArrowLeft size={30} />
      </div>

      <h2 className="course-title">
        <span className="highlight">{courseId}</span> - Topics
      </h2>

      {loading && <p className="loading-text">Loading topics...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && topics.length > 0 ? (
        <ul className="topic-list">
          {topics.map((topic, index) => (
            <li key={index} className="topic-item">
              {topic}
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p className="no-topics">No topics found.</p>
      )}

      {/* Back button to go back to the previous page */}
      <button onClick={() => navigate(-1)} className="back-button">
        Go Back
      </button>
    </div>
  );
};

export default CourseDetail;
