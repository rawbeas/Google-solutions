import React from "react";

const Team = () => {
  const teamCards = [
    {
      name: "Name",
      photo: "photo",
      score: "80%",
    },
    {
      name: "Name",
      photo: "photo",
      score: "69%",
    },
  ];

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Team:</h2>
      <div className="grid grid-cols-1 gap-4">
        {teamCards.map((member, index) => (
          <div
            key={index}
            className="bg-gray-600 rounded-lg p-6 h-32 flex items-center justify-between text-white cursor-pointer hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 overflow-hidden"
          >
            <div className="flex items-center">
              <div className="w-20 h-20 bg-gray-500 flex items-center justify-center mr-4">
                {member.photo}
              </div>
              <span className="text-lg font-medium">{member.name}</span>
            </div>
            <div className="flex items-center">
              <button className="rounded-full bg-white text-black w-10 h-10 flex items-center justify-center mr-2 cursor-pointer hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 overflow-hidden">
                +
              </button>
              <span className="text-lg font-bold">{member.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
