import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PredictionCard from "../Components/PredictionCard";
import WeightChart from "../Components/WeightChart";
import GoogleFitConnect from "../Components/GoogleFitConnect";
import GoogleCalendar from "../Components/GoogleCalendar";
import axios from "axios";

const Athlete = () => {
  const [user, setUser] = useState(null);
  const [weights, setWeights] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMockData, setIsMockData] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Replaces useHistory()
  const [googleFit, setGoogleFit] = useState(false);
  const getItemWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    const item = JSON.parse(itemStr);
    if (new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };
  
  const fetchData = async (forceRefresh = false) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token")
      const userRes = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
        params: { _: Date.now() } // Cache Bypass
      });
      console.log("request")
      console.log(userRes.data)
      setUser(userRes.data);
      console.log("user")
      console.log("user is connected",userRes.data.fitConnected)
      if (userRes) {
        console.log("Request to get data")
        const [weightsRes, predictionsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/google-fit/sync-weights", {
            headers: { Authorization: `Bearer ${token}` },
            params: { refresh: forceRefresh }
          }),
          axios.get(`http://localhost:5000/api/athletes/${userRes.data._id}/predictions`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        console.log("predicted weights")

        setWeights(weightsRes.data.data || []);
        setPredictions(predictionsRes.data || {});
        setIsMockData(weightsRes.data.isMock || false);
        console.log("weights set")
      }
    } catch (error) {
      console.error("Data fetch error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login"); // Redirects to login on unauthorized error
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Check if googlefit is stored
  const fitStatus = getItemWithExpiry('googlefit');
  
  if (fitStatus) {
    setGoogleFit(true);
  }
    if (params.get('fit_connected')) {
      fetchData(true); // Force refresh after connection
      navigate(location.pathname, { replace: true }); // Clears URL params
    } else {
      fetchData();
    }
  }, [location.search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Athlete Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* add condition to check if google sign too */}
        {googleFit && (
  <p className="text-green-600 mb-4">Google Fit is connected!</p>
)}
{/* check if both user and google fit is there , then only show graphs */}
        {user&&!googleFit ? (
          <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Connect Google Fit</h2>
            <GoogleFitConnect />
            {new URLSearchParams(location.search).get('error') && (
              <p className="text-red-500 mt-2 animate-shake">
                Error: {new URLSearchParams(location.search).get('error')}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Weight Trends</h2>
              {weights.length > 0 ? (
                <WeightChart weights={weights} />
              ) : (
                <div className="text-gray-500 italic p-4 border rounded">
                  {isMockData ? (
                    "Connected to Google Fit but no data found. Start tracking in the Google Fit app!"
                  ) : (
                    "Loading weight data..."
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                <PredictionCard
                  title="Weight Prediction"
                  value={0}
                  unit="kg"
                  description="Next week's predicted weight"
                />
                <PredictionCard
                  title="Health Score"
                  value={12}
                  unit="/100"
                  description="Overall health assessment"
                />
                <PredictionCard
                  title="Experience Level"
                  value={334}
                  unit="years"
                  description="Predicted athletic experience"
                />
              </div>

              <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                <GoogleCalendar />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Athlete;
