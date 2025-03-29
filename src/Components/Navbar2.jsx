import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  const [menu, setMenu] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  const items = [
    { id: 1, text: "Home", to: "/" },
    { id: 2, text: "Services", to: "/services" },
    { id: 3, text: "Work", to: "/work" },
    { id: 4, text: "About Us", to: "/aboutus" },
  ];

  return (
    <header className="bg-transparent absolute w-full top-0 left-0 z-50">
      {/* Desktop Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto hidden md:flex justify-between items-center py-5 px-7 backdrop-blur-lg bg-black/30 border-b border-gray-700 rounded-b-lg"
      >
        {/* Logo */}
        <div className="text-xl lg:text-2xl font-bold flex items-center gap-1">
          <Link
            to={"/"}
            className="text-white hover:text-purple-400 transition"
          >
            <span>Google</span>
            <span className="text-purple-400">Solutions</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6 list-none lg:text-base">
          {items.map(({ id, text, to }) => (
            <li
              key={id}
              className="hover:text-purple-400 transition cursor-pointer"
            >
              <Link to={to} className="text-white">
                {text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sign Up Button */}
        <Link
          to="/signup"
          className="md:text-base lg:text-lg bg-purple-500 hover:bg-purple-400 transition px-4 py-2 rounded text-white"
        >
          Sign Up
        </Link>
      </motion.div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden justify-between px-5 py-4 backdrop-blur-lg bg-black/30 border-b border-gray-700 rounded-b-lg">
        {/* Mobile Logo */}
        <motion.div
          initial={{ opacity: 0, x: 100, y: -100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold flex items-center gap-2"
        >
          <span className="text-white">Google</span>
          <span className="text-purple-400">Solutions</span>
        </motion.div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenu((prev) => !prev)} className="text-white">
          {menu ? <IoCloseSharp size={30} /> : <AiOutlineMenu size={30} />}
        </button>

        {/* Mobile Menu */}
        <motion.div
          animate={menu ? "open" : "closed"}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          style={{ display: menu ? "block" : "none" }}
        >
          <motion.div
            variants={variants}
            className="bg-gray-900 w-2/3 h-screen text-white fixed top-0 right-0 z-50 shadow-xl"
          >
            <div className="px-7 py-6 flex justify-between items-center">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setMenu((prev) => !prev)}>
                <IoCloseSharp size={30} className="text-white" />
              </button>
            </div>
            {menu && (
              <div className="flex flex-col justify-center items-center space-y-6 mt-10">
                <ul className="text-white text-lg space-y-6">
                  {items.map(({ id, text, to }) => (
                    <li
                      key={id}
                      className="hover:text-purple-400 transition cursor-pointer"
                    >
                      <Link to={to}>{text}</Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="mt-6 text-lg bg-purple-500 hover:bg-purple-400 transition px-4 py-2 rounded text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar2;
