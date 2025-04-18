import React from "react";
import Team from "../Components/Team";
import GoogleCalendar from "../Components/GoogleCalendar";

const Coach = () => {
  return (
    <div className="container mx-auto mt-25 p-4">
      <div className="flex mb-6">
        <div className="bg-gray-600 w-48 h-48 flex items-center justify-center text-white">
          photo
        </div>
        <div className="bg-gray-600 ml-4 flex-grow h-48 flex items-center justify-center text-white">
          Name
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Team />
        </div>
        <div className="lg:col-span-3">
          <GoogleCalendar />
        </div>
      </div>
    </div>
  );
};

export default Coach;
