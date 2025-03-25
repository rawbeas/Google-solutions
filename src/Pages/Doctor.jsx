import React from "react";

import GoogleCalendar from "../Components/GoogleCalendar";
import TeamDoctor from "../Components/TeamDoctor";

const Doctor = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-6">
        <div className="bg-gray-600 w-48 h-48 flex items-center justify-center text-white">
          photo
        </div>
        <div className="bg-gray-600 ml-4 flex-grow h-48 flex items-center justify-center text-white">
          Name
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="lg:col-span-5">
          <TeamDoctor />
        </div>
      </div>

      <div className="mt-30">
        <GoogleCalendar />
      </div>
    </div>
  );
};

export default Doctor;
