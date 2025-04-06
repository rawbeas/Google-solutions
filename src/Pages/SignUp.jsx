import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Athlete",
  });

  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData
      );
      localStorage.setItem("token", response.data.token);
      alert(response.data.message);
      navigate(`/${formData.role.toLowerCase()}`);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to sign up. Please check your input or server.");
    }
  };

  const inputClasses =
    "w-full p-3 rounded-lg bg-black/30 text-white border border-gray-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transform hover:scale-105 transition duration-300 ease-in-out backdrop-blur-lg";

  return (
    <div className="min-h-screen mt-10 bg-gray-900 flex items-center justify-center p-4">
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="bg-black/30 backdrop-blur-lg shadow-xl rounded-lg p-8 w-full max-w-md border border-gray-700"
      >
        <h2 className="text-orange-500 text-3xl font-bold text-center mb-8">
          Sign Up
        </h2>

        <label className="block text-white mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputClasses}
        />

        <label className="block text-white mt-4 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClasses}
        />

        <label className="block text-white mt-4 mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className={inputClasses}
        />

        <label className="block text-white mt-4 mb-2">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="Athlete">Athlete</option>
          <option value="Doctor">Doctor</option>
          <option value="Coach">Coach</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 mt-8 bg-orange-500 text-white rounded-lg transform hover:bg-orange-600 hover:scale-105 active:scale-95 transition duration-300 ease-in-out font-semibold"
        >
          Sign Up
        </button>
      </motion.form>
    </div>
  );
};

export default SignUp;
