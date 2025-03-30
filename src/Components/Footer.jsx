import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Add this import if missing
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import {
  containerVariants,
  itemVariants,
} from "../constants/animationVariants";

const Footer = () => {
  const [ref, controls] = useScrollAnimation(0.1);

  const borderVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.footer
      ref={ref}
      className="bg-gray-900 mt-30 text-white py-12"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={{
        willChange: "transform",
        translate: "will-change",
      }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"
        variants={borderVariants}
        style={{
          originX: 0,
          transformOrigin: "left",
        }}
      />
      <div className="container  mx-auto px-4">
        <motion.div
          className="flex flex-col items-center"
          variants={itemVariants}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-40 text-center"
            variants={itemVariants}
          >
            {/* Topsportslab Column */}
            <motion.div variants={itemVariants}>
              <motion.h3
                className="font-bold text-lg mb-6"
                variants={itemVariants}
              >
                Dashboard
              </motion.h3>
              <motion.ul className="space-y-4" variants={itemVariants}>
                <li>
                  <a href="#" className="text-orange-400 hover:underline">
                    Athlete Management System
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Doctor Management System
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Coach Management System
                  </a>
                </li>
              </motion.ul>
            </motion.div>

            {/* Legal Column */}
            <motion.div variants={itemVariants}>
              <motion.h3
                className="font-bold text-lg mb-6"
                variants={itemVariants}
              >
                Legal
              </motion.h3>
              <motion.ul className="space-y-4" variants={itemVariants}>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Conditions of use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400">
                    Privacy Statement
                  </a>
                </li>
              </motion.ul>
            </motion.div>

            {/* Contact Column */}
            <motion.div variants={itemVariants}>
              <motion.h3
                className="font-bold text-lg mb-6"
                variants={itemVariants}
              >
                Contact
              </motion.h3>
              <motion.p className="mb-2" variants={itemVariants}>
                We'd love to hear from you!
              </motion.p>
              <motion.p className="mb-6" variants={itemVariants}>
                Questions or suggestions?
              </motion.p>
              <motion.div variants={itemVariants}>
                <Link to="/aboutus">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded transition duration-300">
                    About us
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 pt-8 border-t border-slate-600 flex flex-col items-center"
            variants={itemVariants}
          >
            <motion.div className="mb-4" variants={itemVariants}>
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-white"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M15 6.5l-3 7.5-3-7.5z" />
              </svg>
            </motion.div>
            <motion.p className="text-sm text-center" variants={itemVariants}>
              All rights reserved - Google Solutions
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
