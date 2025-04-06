import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Vineet",
    role: "Front End ",
    image: "./public/Img1.png",
    description:
      "Aspiring software developer skilled in frontend development. ",
  },
  {
    name: "Harshit",
    role: "Back End ",
    image: "./public/Img2.png",
    description: "Giving my 100%, staying chill, and coding my way to success!",
  },
  {
    name: "Naman",
    role: "Machine Learning",
    image: "./public/Img3.png",
    description:
      "Interested in AI-ML and its real world applications. Tech enthusiast.",
  },
  {
    name: "Kritika ",
    role: "TEAM MANAGER",
    image: "./public/Img4.png",
    description: "Handling operations and logistics seamlessly.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-10 mt-25">
      <h2 className="text-4xl font-bold text-center text-orange-500 mb-10 uppercase tracking-wide">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all border-2 border-orange-500"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-orange-500"
            />
            <h3 className="text-xl font-bold text-white">{member.name}</h3>
            <p className="text-orange-400 font-medium uppercase tracking-wide">
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
