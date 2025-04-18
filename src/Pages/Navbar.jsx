import React, { useState, useMemo } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link,Navigate } from "react-router-dom";
import { scrollToSection } from "../constants/scrollAnimation";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Navbar = ({ userRole }) => {
  const [menu, setMenu] = useState(false);
const [user,setuser]=useState();
const location = useLocation(); // current path info
useEffect(()=>{
  const token = localStorage.getItem("token");
  const token2 = localStorage.getItem("googlefit");
    if (token) {
      try {
        // Optionally decode or fetch user role from token
      
        setuser(token);
      } catch (err) {
        console.error("Invalid token format", err);
        setuser(null);
      }
    } else {
      setuser(null);
    }
},[location.pathname]);
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  const handleNavigation = (to, scroll) => {
    if (scroll && to === "/services") {
      scrollToSection("services");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("googlefit");
    window.location.reload();
  };

  const items = useMemo(() => {
    switch (userRole) {
      case "athlete":
        return [
          { id: 1, text: "Dashboard", to: "/athlete" },
          { id: 2, text: "Training", to: "/athlete/training" },
          { id: 3, text: "Schedule", to: "/athlete/schedule" },
          { id: 4, text: "Progress", to: "/athlete/progress" },
        ];
      case "doctor":
        return [
          { id: 1, text: "Dashboard", to: "/doctor" },
          { id: 2, text: "Patients", to: "/doctor/patients" },
          { id: 3, text: "Appointments", to: "/doctor/appointments" },
          { id: 4, text: "Reports", to: "/doctor/reports" },
        ];
      case "coach":
        return [
          { id: 1, text: "Dashboard", to: "/coach" },
          { id: 2, text: "Athletes", to: "/coach/athletes" },
          { id: 3, text: "Training Plans", to: "/coach/plans" },
          { id: 4, text: "Performance", to: "/coach/performance" },
        ];
      default:
        return [
          { id: 1, text: "Home", to: "/" },
          { id: 2, text: "Services", to: "/services", scroll: true },
          { id: 3, text: "About Us", to: "/aboutus" },
        ];
    }
  }, [userRole]);

  const logo = useMemo(() => {
    const logos = {
      athlete: "Athlete Portal",
      doctor: "Doctor Portal",
      coach: "Coach Portal",
      default: "GoogleSolutions",
    };
    return logos[userRole] || logos.default;
  }, [userRole]);

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
        <div className="text-xl lg:text-2xl font-bold flex-1">
          <Link to={userRole ? `/${userRole}` : "/"} className="text-white hover:text-orange-500 transition">
            <span className="text-orange-500">{logo}</span>
          </Link>
        </div>

        {/* Nav Links */}
        <ul className="md:flex items-center justify-center space-x-6 list-none lg:text-base flex-1">
          {items.map(({ id, text, to, scroll }) => (
            <li key={id} className="hover:text-orange-500 transition cursor-pointer">
              {scroll ? (
                <button
                  onClick={() => handleNavigation(to, scroll)}
                  className="text-white hover:text-orange-500 transition"
                >
                  {text}
                </button>
              ) : (
                <Link to={to} className="text-white hover:text-orange-500 transition">
                  {text}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Auth Section */}
        <div className="flex-1 flex justify-end">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to={`/${userRole}/profile`} className="text-white hover:text-orange-500 transition">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="md:text-base lg:text-lg bg-orange-500 hover:text-orange-300 transition px-4 py-2 rounded text-white"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/signup"
              className="md:text-base lg:text-lg bg-orange-500 hover:text-orange-300 transition px-4 py-2 rounded text-white"
            >
              Sign Up
            </Link>
          )}
        </div>
      </motion.div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden justify-between px-5 py-4 backdrop-blur-lg bg-black/30 border-b border-gray-700 rounded-b-lg">
        <motion.div
          initial={{ opacity: 0, x: 100, y: -100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold flex items-center gap-2"
        >
          <span className="text-orange-500">{logo}</span>
        </motion.div>

        <button onClick={() => setMenu((prev) => !prev)} className="text-white">
          {menu ? <IoCloseSharp size={30} /> : <AiOutlineMenu size={30} />}
        </button>

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
              <button onClick={() => setMenu(false)}>
                <IoCloseSharp size={30} className="text-white" />
              </button>
            </div>
            {menu && (
              <div className="flex flex-col justify-center items-center space-y-6 mt-10">
                <ul className="text-white text-lg space-y-6">
                  {items.map(({ id, text, to, scroll }) => (
                    <li key={id} className="hover:text-orange-500 transition cursor-pointer">
                      {scroll ? (
                        <button
                          onClick={() => {
                            handleNavigation(to, scroll);
                            setMenu(false);
                          }}
                          className="text-white hover:text-orange-500 transition"
                        >
                          {text}
                        </button>
                      ) : (
                        <Link to={to} onClick={() => setMenu(false)}>{text}</Link>
                      )}
                    </li>
                  ))}
                </ul>
                {user ? (
                  <div className="flex flex-col items-center gap-4">
                    <Link
                      to={`/${userRole}/profile`}
                      onClick={() => setMenu(false)}
                      className="text-white hover:text-orange-500 transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenu(false);
                      }}
                      className="text-lg bg-orange-500 hover:text-orange-300 transition px-4 py-2 rounded text-white"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/signup"
                    onClick={() => setMenu(false)}
                    className="mt-6 text-lg bg-orange-500 hover:text-orange-300 transition px-4 py-2 rounded text-white"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
