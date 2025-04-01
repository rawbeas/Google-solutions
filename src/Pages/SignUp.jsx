import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation after signup

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Athlete',
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', formData);

      // Save JWT token to localStorage
      localStorage.setItem('token', response.data.token);

      alert(response.data.message);

      // Redirect to another page (e.g., dashboard or login)
      navigate('/Athlete'); // Change '/dashboard' to your desired route
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Failed to sign up. Please check your input or server.');
    }
  };

  return (
    <div className="h-screen bg-zinc-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 shadow-md rounded-lg p-8 w-96 transform hover:shadow-xl transition duration-300 ease-in-out"
      >
        <h2 className="text-white text-2xl font-bold text-center mb-6">Sign Up</h2>
        <label className="block text-white mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring focus:ring-purple-500 transform hover:scale-105 transition duration-300 ease-in-out"
        />
        <label className="block text-white mt-4 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring focus:ring-purple-500 transform hover:scale-105 transition duration-300 ease-in-out"
        />
        <label className="block text-white mt-4 mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring focus:ring-purple-500 transform hover:scale-105 transition duration-300 ease-in-out"
        />
        <label className="block text-white mt-4 mb-2">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring focus:ring-purple-500 transform hover:scale-105 transition duration-300 ease-in-out"
        >
          <option value="Athlete">Athlete</option>
          <option value="Doctor">Doctor</option>
          <option value="Coach">Coach</option>
        </select>
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-purple-600 text-white rounded-lg transform hover:scale-105 active:scale-95 transition duration-300 ease-in-out"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;


