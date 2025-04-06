import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// utils/localStorageWithExpiry.js
const setItemWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getItemWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};

const GoogleFitConnect = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleConnect = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/google-fit/connect`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const authWindow = window.open(data.url, '_blank', 'width=500,height=600');
      setItemWithExpiry('googlefit', true, 3600000);

      const checkWindow = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(checkWindow);
          navigate('/athlete?refreshing=true');
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
