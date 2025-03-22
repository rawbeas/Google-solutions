import React from "react";
import Navbar from "../Components/Navbar";
import VideoBackground from "../Components/VideoBackground";
import AthleteManagementSection from "../Components/AthleteManagementSection";
import DataStatsSection from "../Components/DataStatsSection";
import TrainingLoadSection from "../Components/TrainingLoadSection";
import Footer from "../Components/Footer";
const Main = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <VideoBackground />
      <AthleteManagementSection />

      <DataStatsSection />
      <TrainingLoadSection />
      <Footer />
    </div>
  );
};

export default Main;
