import React, { useState } from "react";
import axios from "axios";
import "./newChatBoard.css";

function Chatboard() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return; // Ignore empty input

    const userMessage = { text: input, sender: "You" };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Get API key from .env file

      // Ensure API key is available
      if (!apiKey) {
        throw new Error("API key is missing.");
      }

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${apiKey}`, // Include API key in the URL
        {
          contents: [{ parts: [{ text: input }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = {
        text: response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.",
        sender: "Bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = {
        text: "Sorry, there was an issue getting the response. Please try again later.",
        sender: "Bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }

    setInput(""); // Reset input field after message is sent
  };

  return (
    <div className="chatboard">
      <h3 className="chatboard-heading">Chat with Adi</h3>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender.toLowerCase()}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div className="chat-message bot">Bot is typing...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  );
}

export default Chatboard;
