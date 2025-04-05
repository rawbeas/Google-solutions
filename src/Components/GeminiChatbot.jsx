import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const GeminiChatbot = ({ category }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Replace with your actual Gemini API key
  const geminiApiKey = process.env.REACT_APP_GEMINI_API_KEY;

  useEffect(() => {
    // Scroll to bottom of chat whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (!geminiApiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "API key not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file.",
        },
      ]);
      return;
    }

    // Add user message to chat
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Make API call to Gemini
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful assistant for ${category} advice. ${input}`,
                },
              ],
            },
          ],
        }
      );

      // Add AI response to chat
      const aiMessage = {
        role: "assistant",
        content: response.data.candidates[0].content.parts[0].text,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-black/30 backdrop-blur-lg rounded-lg p-4 mb-4 border border-gray-700">
        <h2 className="text-xl font-bold text-orange-500">
          Gemini Chatbot - {category}
        </h2>
      </div>

      <div className="bg-black/30 backdrop-blur-lg rounded-lg p-4 border border-gray-700 flex-grow mb-4 overflow-y-auto max-h-96">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            Ask me anything about your {category.toLowerCase()}!
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-orange-500/20 border-orange-500/50 ml-12"
                    : "bg-gray-800/50 border-gray-700 mr-12"
                } border`}
              >
                <p className="text-gray-300">{msg.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="p-3 rounded-lg bg-gray-800/50 border-gray-700 border mr-12">
                <div className="flex space-x-2 justify-center items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="bg-black/30 backdrop-blur-lg rounded-lg border border-gray-700 p-2 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder={`Ask about your ${category.toLowerCase()}...`}
          className="flex-grow p-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-orange-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className={`ml-2 px-4 py-2 rounded ${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } text-white transition-colors duration-300`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GeminiChatbot;
