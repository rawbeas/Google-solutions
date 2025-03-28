import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamCards = [
    {
      id: 1,
      name: "krrish",
      photo: "kr",
      score: "80%",
      details: "stress:60",
    },
    {
      id: 2,
      name: "kirmada",
      photo: "k",
      score: "69%",
      details: "stress:100",
    },
  ];

  return (
    <div className="mt-4 relative">
      <h2 className="text-xl font-bold mb-4">Team:</h2>
      <div className="grid grid-cols-1 gap-4">
        {teamCards.map((member) => (
          <div
            key={member.id}
            className="bg-gray-600 rounded-lg p-6 h-32 flex items-center justify-between text-white cursor-pointer hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 overflow-hidden relative"
          >
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gray-500 flex items-center justify-center mr-4 text-xl font-bold">
                {member.photo}
              </div>
              <span className="text-lg font-medium">{member.name}</span>
            </div>
            <div className="flex items-center">
              <button
                className="rounded-full bg-white text-black w-10 h-10 flex items-center justify-center mr-2 cursor-pointer hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                onClick={() => setSelectedMember(member)}
              >
                +
              </button>
              <span className="text-lg font-bold">{member.score}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center  bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-xl w-96 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                onClick={() => setSelectedMember(null)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-2">{selectedMember.name}</h2>
              <p className="text-gray-700">{selectedMember.details}</p>
              <p className="text-lg font-bold mt-2">
                Score: {selectedMember.score}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;
