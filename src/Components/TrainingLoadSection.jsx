import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { containerVariants, itemVariants } from "../constants/animation";

const TrainingLoadSection = () => {
  const [ref, controls] = useScrollAnimation(0.1);

  return (
    <motion.div
      ref={ref}
      className="container mt-40 mx-auto px-4 py-16"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={{
        willChange: "transform",
        translate: "will-change",
      }}
    >
      <motion.h2
        className="text-3xl text-center font-bold text-orange-400 mb-10"
        variants={itemVariants}
      >
        Monitor the training load of your athletes
      </motion.h2>

      <motion.p
        className="text-white text-center mb-10 max-w-4xl mx-auto items-center justify-center"
        variants={itemVariants}
      >
        Use our Performance Management tools to track key athlete metrics
        including weight trends, predicted weight, overall health score, and
        experience level. Get dynamic insights with features like weekly weight
        predictions, health assessments, and athletic experience analysis—all
        backed by smart algorithms. Integrate with Google Calendar to stay
        updated on upcoming events and plan efficiently.
      </motion.p>

      <motion.div
        className="w-full max-w-4xl mx-auto flex justify-center mb-8"
        variants={itemVariants}
      >
        <motion.img
          src="AthleteImg.png"
          alt="Training Load Management"
          className="w-full  h-full object-cover rounded-lg shadow-xl"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        />
      </motion.div>
    </motion.div>
  );
};

export default TrainingLoadSection;
