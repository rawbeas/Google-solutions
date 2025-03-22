import React, { useEffect } from "react";
import {
  motion,
  useAnimation,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const TrainingLoadSection = () => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
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

  const containerVariants = {
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
      ref={ref}
      className="container mt-40 mx-auto px-4 py-16"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={{ scrollMarginTop: "80px" }}
      willChange="transform, opacity"
    >
      <motion.h2
        className="text-3xl text-center font-bold text-gray-800 mb-10"
        variants={itemVariants}
      >
        Monitor the training load of your athletes
      </motion.h2>

      <motion.p
        className="text-gray-600 text-center mb-10 max-w-4xl mx-auto items-center justify-center"
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
