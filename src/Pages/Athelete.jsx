import React from "react";
import ProfileCard from "../Components/ProfileCard";
import ActionCards from "../Components/ActionCards";
import GoogleCalendar from "../Components/GoogleCalendar";

const Athelete = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile and Action Cards */}
          <div className="lg:col-span-2">
            <ProfileCard />
            <ActionCards />
          </div>

          {/* Right Column - Google Calendar */}
          <div className="lg:col-span-2">
            <GoogleCalendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Athelete;
