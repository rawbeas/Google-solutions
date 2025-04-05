import React, { useState } from "react";
import GeminiChatbot from "../Components/GeminiChatbot";

const Finance = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [error, setError] = useState(null);

  const financeSections = [
    {
      id: "income",
      title: "Income & Funding Overview",
      content:
        "Display income sources, funding opportunities, and financial metrics here.",
    },
    {
      id: "sponsorships",
      title: "Available Sponsorships",
      content:
        "Show available sponsorships based on current performance metrics.",
    },
  ];

  const handleSectionClick = (sectionId) => {
    try {
      setActiveSection(sectionId === activeSection ? null : sectionId);
    } catch (err) {
      setError("Failed to load section content");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-black/30 backdrop-blur-lg rounded-lg p-4 border border-gray-700">
            <h2 className="text-xl font-bold text-orange-500">
              Financial Management
            </h2>
          </div>

          <div className="h-96">
            <GeminiChatbot category="Finance" />
          </div>

          {error && (
            <div className="text-red-500 bg-red-100/10 p-4 rounded-lg mt-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {financeSections.map((section) => (
              <div
                key={section.id}
                className="bg-black/30 backdrop-blur-lg rounded-lg p-4 border border-gray-700 hover:border-orange-500 transition-all duration-300 cursor-pointer"
                onClick={() => handleSectionClick(section.id)}
              >
                <h3 className="text-lg font-semibold text-orange-500">
                  {section.title}
                </h3>
                {activeSection === section.id && (
                  <div className="mt-4 bg-gray-800/50 rounded p-3 text-gray-300">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
