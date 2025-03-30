import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import {
  containerVariants,
  itemVariants,
} from "../constants/animationVariants";

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
        Use our Performance Management tools to monitor the training load of
        your athletes. Our indicators are a mix of proprietary algorithms as
        well as practice-based algorithm to help you gain insights. Process your
        training and game data and use tools like{" "}
        <span className="text-red-500">RPE analysis</span>, A:C Ratio, overuse
        indicators and workload periodisation to assist you in your decision
        making.
      </motion.p>

      <motion.div
        className="w-full flex justify-center mb-8"
        variants={itemVariants}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mIf7kB5aMzt6mcFimcVXyuHBhuAJoCUnd_Rv-Gyjm4V4HXObnAfQYdys6_6aph6BATo&usqp=CAU"
          alt="Training Load Management"
          className="max-w-2xl w-full rounded-lg shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
};

export default TrainingLoadSection;
