import React from 'react';
import { motion } from "framer-motion";

const HomeSection = () => (
  <div className="h-full flex items-center justify-center p-4 sm:p-8">
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl sm:text-6xl font-bold mb-4"
        style={{ 
          fontFamily: "'Orbitron', sans-serif",
          background: "linear-gradient(45deg, #00FFFF, #FF00FF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.5)"
        }}
      >
        Welcome to My Creative Space
      </motion.h1>
      <motion.p 
        className="text-xl sm:text-2xl text-[#d9dad7]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Explore my world of AI-driven innovations, dynamic websites, and cutting-edge games.
      </motion.p>
    </motion.div>
  </div>
);

export default HomeSection;