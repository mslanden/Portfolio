import React from 'react';
import { motion } from "framer-motion";

const AIDevelopmentSection = () => (
  <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-[#1a2639] to-[#3e4a61]">
    <div className="w-full max-w-4xl">
      <motion.h2 
        className="text-4xl sm:text-5xl font-bold mb-6 text-center text-[#c24d2c] drop-shadow-lg"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AI Development
      </motion.h2>
      <motion.p 
        className="text-lg sm:text-xl text-gray-200 text-center mb-8 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Exploring the frontiers of artificial intelligence and its applications in modern technology.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FuturisticBox title="Machine Learning" description="Advanced algorithms that learn and improve from experience" />
        <FuturisticBox title="Neural Networks" description="Simulating human brain function for complex problem-solving" />
        <FuturisticBox title="Computer Vision" description="Enabling machines to interpret and understand visual information" />
        <FuturisticBox title="Natural Language Processing" description="Bridging the gap between human communication and computer understanding" />
      </div>
    </div>
  </div>
);

const FuturisticBox = ({ title, description }) => (
  <motion.div 
    className="bg-[#d9dad7] bg-opacity-10 p-4 rounded-lg border border-[#c24d2c] shadow-md"
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(194, 77, 44, 0.5)" }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#c24d2c]" style={{ fontFamily: "'Orbitron', sans-serif" }}>{title}</h3>
    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{description}</p>
  </motion.div>
);

export default AIDevelopmentSection;
