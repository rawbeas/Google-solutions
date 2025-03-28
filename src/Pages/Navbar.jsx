import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
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
    <header className="bg-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-sm text-white relative z-50">
      {/* Desktop Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto hidden md:flex justify-between items-center py-5"
      >
        {/* Logo */}
        <div className="text-xl lg:text-2xl font-bold flex pl-7 items-center gap-1">
          <Link to={"/"}>
            <span className="text-white">Google</span>
            <span className="text-violet-500">Solutions</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6 list-none lg:text-base">
          {items.map(({ id, text, to }) => (
            <li key={id} className="hover:text-violet-500 cursor-pointer">
              <Link to={to}>{text}</Link>
            </li>
          ))}
        </ul>

        {/* Download CV Button */}
        <Link
          to="/signup"
          className="md:text-base lg:text-lg bg-violet-500 mr-10 hover:bg-violet-400 px-4 py-2 rounded"
        >
          Sign Up
        </Link>
      </motion.div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden justify-between">
        {/* Mobile Logo */}
        <motion.div
          initial={{ opacity: 0, x: 100, y: -100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold flex items-center gap-2 py-6 px-4"
        >
          <span className="text-white">Google</span>
          <span className="text-violet-500">Solutions</span>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="flex justify-end ml-64 px-7 py-8">
          <button onClick={() => setMenu((prev) => !prev)}>
            {menu ? <IoCloseSharp size={30} /> : <AiOutlineMenu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          animate={menu ? "open" : "closed"}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          style={{ display: menu ? "block" : "none" }}
        >
          <motion.div
            variants={variants}
            className="bg-white w-2/3 h-screen text-black fixed top-0 right-0 z-50"
          >
            <div className="px-7 py-6">
              <button onClick={() => setMenu((prev) => !prev)}>
                <IoCloseSharp size={30} />
              </button>
            </div>
            {menu && (
              <div className="flex flex-col justify-center items-center">
                <ul className="space-y-6 text-black text-lg">
                  {items.map(({ id, text, to }) => (
                    <li
                      key={id}
                      className="hover:text-violet-500 duration-200 cursor-pointer"
                    >
                      <Link to={to}>{text}</Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="mt-6 text-lg bg-violet-500 hover:bg-violet-400 px-4 py-2 rounded text-white"
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

export default Navbar;
