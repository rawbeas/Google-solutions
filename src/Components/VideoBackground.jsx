import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const VideoBackground = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  // Adjusted spring configuration for smoother scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50, // Reduced from 100 for less resistance
    damping: 20, // Reduced from 30 for less dampening
    restDelta: 0.0005,
    mass: 0.8,
  });

  const videoHeight = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["100vh", "50vh", "100vh"]
  );
  const videoOpacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1, 0.5, 0.5, 0.5, 1]
  );

  useEffect(() => {
    const video = document.getElementById("bgVideo");
    if (video) {
      const handleLoad = () => setIsVideoLoaded(true);
      video.addEventListener("loadeddata", handleLoad);
      return () => video.removeEventListener("loadeddata", handleLoad);
    }
  }, []);

  return (
    <motion.div
      className="relative w-full overflow-hidden"
      style={{ height: videoHeight }}
    >
      <motion.video
        id="bgVideo"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ opacity: videoOpacity }}
      >
        <source src="" type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      <motion.div
        className="absolute inset-0 bg-black"
        style={{
          opacity: useTransform(
            smoothProgress,
            [0, 0.25, 0.5, 0.75, 1],
            [0.3, 0.5, 0.7, 0.5, 0.3]
          ),
        }}
      />

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to My Site
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover amazing content
        </motion.p>
      </div>
    </motion.div>
  );
};

export default VideoBackground;
