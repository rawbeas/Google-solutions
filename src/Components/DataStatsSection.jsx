import React, { useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const DataStatsSection = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const unsubscribe = smoothProgress.onChange((latest) => {
      if (latest > 0.1) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    });

    return () => unsubscribe();
  }, [controls, smoothProgress]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.8,
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
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      className="w-full bg-gradient-to-r from-orange-500 to-red-400 py-16 mt-40"
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      style={{ scrollMarginTop: "80px" }}
      willChange="transform, opacity"
    >
      <motion.div
        className="container mx-auto px-4 text-center text-white"
        variants={itemVariants}
      >
        <motion.h2 className="text-4xl font-bold mb-4" variants={itemVariants}>
          Back your decisions with data
        </motion.h2>

        <motion.p className="max-w-3xl mx-auto mb-2" variants={itemVariants}>
          Join the ranks of elite football clubs and referee federations all
          over the world.
        </motion.p>
        <motion.p className="max-w-3xl mx-auto mb-10" variants={itemVariants}>
          Monitor your athletes' performance and be part of these stats.
        </motion.p>

        <motion.div
          className="bg-white rounded-lg shadow-lg p-10 max-w-5xl mx-auto"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Total Distance Registered */}
            <motion.div
              className="flex flex-col items-center"
              variants={itemVariants}
            >
              <div className="bg-orange-500 rounded-full p-5 mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">4.5 M KM</h3>
              <p className="text-sm font-semibold text-gray-700 mt-2">
                TOTAL DISTANCE REGISTERED
              </p>
            </motion.div>

            {/* Athletes' Performance Monitored */}
            <motion.div
              className="flex flex-col items-center"
              variants={itemVariants}
            >
              <div className="bg-orange-500 rounded-full p-5 mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">23.5 K</h3>
              <p className="text-sm font-semibold text-gray-700 mt-2">
                ATHLETES' PERFORMANCE MONITORED
              </p>
            </motion.div>

            {/* Training Sessions Analysed */}
            <motion.div
              className="flex flex-col items-center"
              variants={itemVariants}
            >
              <div className="bg-orange-500 rounded-full p-5 mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">1.35 M</h3>
              <p className="text-sm font-semibold text-gray-700 mt-2">
                TRAINING SESSIONS ANALYSED
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DataStatsSection;
