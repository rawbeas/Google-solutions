import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "John Doe",
    role: "Head Coach",
    image: "https://via.placeholder.com/150",
    description: "Experienced leader guiding the team to victory.",
  },
  {
    name: "Jane Smith",
    role: "Sports Analyst",
    image: "https://via.placeholder.com/150",
    description: "Data-driven strategist optimizing performance.",
  },
  {
    name: "Michael Johnson",
    role: "Fitness Trainer",
    image: "https://via.placeholder.com/150",
    description: "Ensuring peak physical performance for all players.",
  },
  {
    name: "Emily Davis",
    role: "Team Manager",
    image: "https://via.placeholder.com/150",
    description: "Handling operations and logistics seamlessly.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">
      <h2 className="text-4xl font-bold text-center text-yellow-500 mb-10 uppercase tracking-wide">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all border-2 border-yellow-500"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-yellow-500"
            />
            <h3 className="text-xl font-bold text-white">{member.name}</h3>
            <p className="text-yellow-400 font-medium uppercase tracking-wide">
              {member.role}
            </p>
            <p className="text-gray-300 mt-2 text-sm">{member.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
