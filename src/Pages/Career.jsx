import React, { useState } from "react";
import GeminiChatbot from "../Components/GeminiChatbot";

const Career = () => {
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add this

  // Add loading handler for Find Mentor button
  const handleFindMentor = () => {
    setIsLoading(true);
    // Mentor finding logic would go here
    setTimeout(() => setIsLoading(false), 1000); // Remove this when adding real logic
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-black/30 backdrop-blur-lg rounded-lg p-4 border border-gray-700">
            <h2 className="text-xl font-bold text-orange-500">
              Career Development
            </h2>
          </div>

          <div className="h-96">
            <GeminiChatbot category="Career" />
          </div>

          <div className="bg-black/30 backdrop-blur-lg rounded-lg p-4 border border-gray-700">
            <h3 className="text-lg font-semibold text-orange-500">
              Mentorship Program
            </h3>
            <p className="text-gray-300 mt-2">
              Connect with experienced athletes for guidance
            </p>
            <button
              onClick={handleFindMentor}
              disabled={isLoading}
              className={`mt-4 ${
                isLoading ? "bg-gray-600" : "bg-orange-500 hover:bg-orange-600"
              } text-white px-4 py-2 rounded transition-all duration-300`}
            >
              {isLoading ? "Finding..." : "Find a Mentor"}
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-black/30 backdrop-blur-lg rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-orange-500">
                Career Prediction
              </h3>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-all duration-300"
                onClick={() => setShowRoadmap(!showRoadmap)}
              >
                {showRoadmap ? "Hide Roadmap" : "Show Roadmap"}
              </button>
            </div>
          </div>

          {showRoadmap && (
            <div className="bg-black/30 backdrop-blur-lg rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-orange-500 mb-4">
                Career Roadmap
              </h3>
              <div className="flex justify-between items-center relative">
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-orange-500/50"></div>
                {["Beginner", "Intermediate", "Professional", "Elite"].map(
                  (stage, index) => (
                    <div
                      key={index}
                      className="relative z-10 flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <p className="mt-2 text-gray-300 font-medium">{stage}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Career;
