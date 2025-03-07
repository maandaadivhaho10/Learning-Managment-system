import { useState, useEffect } from "react";

const CourseDetail = ({ courseId }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      console.log("API Key:", import.meta.env.VITE_OPENAI_API_KEY);

      if (!import.meta.env.VITE_OPENAI_API_KEY) {
        setError("API key is missing. Please check your .env file.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo", // Change if needed
            messages: [
              { role: "system", content: "You are an expert course instructor." },
              { role: "user", content: `List the main topics covered in a "${courseId}" course.` }
            ],
            max_tokens: 100
          }),
        });

        console.log("Raw Response:", response); // Debug response

        if (!response.ok) {
          const errorData = await response.json();
          console.error("OpenAI API Error:", errorData);
          throw new Error(`OpenAI API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log("OpenAI Response Data:", data);

        if (!data.choices || data.choices.length === 0) {
          throw new Error("Unexpected API response structure.");
        }

        const topicsList = data.choices[0].message.content
          .split("\n")
          .filter(topic => topic.trim() !== "");

        setTopics(topicsList);
      } catch (err) {
        console.error("API Error:", err);
        setError(`Failed to load topics. Error: ${err.message}`);
      }

      setLoading(false);
    };

    fetchTopics();
  }, [courseId]);

  if (loading) return <p>Loading topics...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Topics for {courseId}</h2>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetail;
