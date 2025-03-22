import React from "react";

const DataStatsSection = () => {
  return (
    <div className="w-full bg-gradient-to-r from-orange-500 to-red-400 py-16 mt-40">
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">
          Back your decisions with data
        </h2>

        <p className="max-w-3xl mx-auto mb-2">
          Join the ranks of elite football clubs and referee federations all
          over the world.
        </p>
        <p className="max-w-3xl mx-auto mb-10">
          Monitor your athletes' performance and be part of these stats.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Total Distance Registered */}
            <div className="flex flex-col items-center">
              <div className="bg-orange-500 rounded-full p-5 mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">4.5 M KM</h3>
              <p className="text-sm font-semibold text-gray-700 mt-2">
                TOTAL DISTANCE REGISTERED
              </p>
            </div>

            {/* Athletes' Performance Monitored */}
            <div className="flex flex-col items-center">
              <div className="bg-orange-500 rounded-full p-5 mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">23.5 K</h3>
              <p className="text-sm font-semibold text-gray-700 mt-2">
                ATHLETES' PERFORMANCE MONITORED
              </p>
            </div>

            {/* Training Sessions Analysed */}
            <div className="flex flex-col items-center">
              <div className="bg-orange-500 rounded-full p-5 mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">1.35 M</h3>
              <p className="text-sm font-semibold text-gray-700 mt-2">
                TRAINING SESSIONS ANALYSED
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStatsSection;
