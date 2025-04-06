import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { containerVariants, itemVariants } from "../constants/animation";

const AthleteManagementSection = () => {
  const [ref, controls] = useScrollAnimation(0.1);

  return (
    <motion.div
      id="services"
      ref={ref}
      className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-8 scroll-mt-20"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={{
        willChange: "transform",
        translate: "will-change",
      }}
    >
      {/* Left Content */}
      <motion.div className="md:w-1/2 space-y-6" variants={itemVariants}>
        <motion.h2
          className="text-4xl font-bold text-orange-400"
          variants={itemVariants}
        >
          What does our Athlete Management System offer?
        </motion.h2>

        <motion.p
          className="text-white leading-relaxed"
          variants={itemVariants}
        >
          The platform is an easy-to-use and customisable Athlete Management
          System. Our platform is based on years of scientific research and
          feedback from professionals on the field.
        </motion.p>

        <motion.p
          className="text-white leading-relaxed"
          variants={itemVariants}
        >
          Our system can be used to centralise all health and performance data
          within your organisation, facilitate communication between staff and
          players, optimise your workflow and give you insights to support your
          decision-making.
        </motion.p>

        <Link to="/signup">
          <motion.button
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </Link>
      </motion.div>

      <motion.div className="md:w-1/2 mt-8 md:mt-0" variants={itemVariants}>
        <motion.img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa5j1op87bfgaxIMtNkNuHYfJ0eylJQZl3uA&s"
          alt="Athlete Management System Dashboard"
          className="w-full rounded-lg shadow-lg"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        />
      </motion.div>
    </motion.div>
  );
};

export default AthleteManagementSection;
