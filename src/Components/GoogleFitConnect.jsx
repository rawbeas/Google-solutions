import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleFitConnect = () => {
  const navigate = useNavigate();

  const handleConnect = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/google-fit/connect');
      
      // Open auth window
      const authWindow = window.open(data.url, '_blank', 'width=500,height=600');
      
      // Check for window closure
      const checkWindow = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkWindow);
          navigate('/athlete?refreshing=true'); // Force re-render
        }
      }, 500);
      
    } catch (error) {
      console.error('Connection failed:', error);
      alert('Failed to initiate Google Fit connection. Please try again.');
    }
  };

  return (
    <button 
      onClick={handleConnect}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
    >
      Connect Google Fit
    </button>
  );
};

export default GoogleFitConnect;