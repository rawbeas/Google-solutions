import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  const navigate = useNavigate();
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

      const userRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { _: Date.now() },
        }
      );

      setUser(userRes.data);

      if (userRes) {
        const [weightsRes, predictionsRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/google-fit/sync-weights`,
            {
              headers: { Authorization: `Bearer ${token}` },
              params: { refresh: forceRefresh },
            }
          ),
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/athletes/${userRes.data._id}/predictions`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        setWeights(weightsRes.data.data || []);
        setPredictions(predictionsRes.data || {});
        setIsMockData(weightsRes.data.isMock || false);
      }
    } catch (error) {
      console.error("Data fetch error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fitStatus = getItemWithExpiry("googlefit");

    if (fitStatus) {
      setGoogleFit(true);
    }
    if (params.get("fit_connected")) {
      fetchData(true);
      navigate(location.pathname, { replace: true });
    } else {
      fetchData();
    }
  }, [location.search]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-800 rounded w-1/4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {googleFit && (
          <p className="text-orange-500 mb-4">Google Fit is connected!</p>
        )}

        {user && !googleFit ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/30 backdrop-blur-lg p-6 rounded-lg shadow-md border border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-4 text-orange-500">
              Connect Google Fit
            </h2>
            <GoogleFitConnect />
            {new URLSearchParams(location.search).get("error") && (
              <p className="text-red-500 mt-2 animate-shake">
                Error: {new URLSearchParams(location.search).get("error")}
              </p>
            )}
          </motion.div>
        ) : (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-lg p-6 rounded-lg shadow-md border border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-4 text-orange-500">
                Weight Trends
              </h2>
              {weights.length > 0 ? (
                <WeightChart weights={weights} />
              ) : (
                <div className="text-gray-400 italic p-4 border border-gray-700 rounded bg-black/20">
                  {isMockData
                    ? "Connected to Google Fit but no data found. Start tracking in the Google Fit app!"
                    : "Loading weight data..."}
                </div>
              )}
            </motion.div>

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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-1 bg-black/30 backdrop-blur-lg p-6 rounded-lg shadow-md border border-gray-700"
              >
                <h2 className="text-xl font-semibold mb-4 text-orange-500">
                  Upcoming Events
                </h2>
                <GoogleCalendar />
              </motion.div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Athlete;
