import React from "react";
import { useState } from "react";

const TeamDoctor = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const teamCards = [
    {
      id: 1,
      name: "Name",
      photo: "photo",
      data: "This is player 1's detailed information. ",
    },
    {
      id: 2,
      name: "Name",
      photo: "photo",
      data: "This is player 2's detailed information.",
    },
  ];

  const handlePlayerSelect = (playerId) => {
    setSelectedPlayer(playerId);
  };

  return (
    <div className="flex">
      {/* Left side - Team list */}
      <div className="w-2/5 pr-4">
        <h2 className="text-xl font-bold mb-4">Team:</h2>
        <div className="grid grid-cols-1 gap-4">
          {teamCards.map((member) => (
            <div
              key={member.id}
              className="bg-gray-600 rounded-lg p-6 h-32 flex items-center justify-between text-white cursor-pointer hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="flex items-center">
                <div className="w-20 h-20 bg-gray-500 flex items-center justify-center mr-4">
                  {member.photo}
                </div>
                <span className="text-lg font-medium">{member.name}</span>
              </div>
              <div className="flex items-center">
                <button
                  className="rounded-full bg-white text-black w-10 h-10 flex items-center justify-center mr-2 cursor-pointer hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  onClick={() => handlePlayerSelect(member.id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Player data */}
      <div className="w-3/5 pl-4">
        <div className="bg-white rounded-lg shadow-md p-6 h-full">
          {selectedPlayer ? (
            <div>
              <h2 className="text-xl font-bold mb-4">
                Player {selectedPlayer} Information
              </h2>
              <p>
                {teamCards.find((player) => player.id === selectedPlayer)?.data}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a player to view their information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDoctor;
