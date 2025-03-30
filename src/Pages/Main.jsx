import React from "react";
import ScrollManager from "../Components/ScrollManager";
import VideoBackground from "../Components/VideoBackground";
import AthleteManagementSection from "../Components/AthleteManagementSection";
import DataStatsSection from "../Components/DataStatsSection";
import TrainingLoadSection from "../Components/TrainingLoadSection";
import Footer from "../Components/Footer";
const Main = () => {
  return (
    <ScrollManager>
      <div className="min-h-screen">
        <VideoBackground />
        <AthleteManagementSection />
        <DataStatsSection />
        <TrainingLoadSection />
        <Footer />
      </div>
    </ScrollManager>
  );
};

export default Main;
