import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const AthleteManagementSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.1,
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-8"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
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
          The Topsportslab platform is an easy-to-use and customisable Athlete
          Management System. Our platform is based on years of scientific
          research and feedback from professionals on the field.
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

        <Link to="/login">
          <motion.button
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log In
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
