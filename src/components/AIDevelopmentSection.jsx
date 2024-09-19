import React from 'react';
import { motion } from "framer-motion";

const AIDevelopmentSection = () => (
  <div className="h-full flex items-center justify-center p-8">
    <div className="w-full max-w-4xl">
      <motion.h2 
        className="text-5xl font-bold mb-6 text-center text-[#c24d2c]"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AI Development
      </motion.h2>
      <motion.p 
        className="text-xl text-[#1a2639] text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Exploring the frontiers of artificial intelligence and its applications in modern technology.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(194, 77, 44)" }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-xl font-semibold mb-2 text-[#c24d2c]" style={{ fontFamily: "'Orbitron', sans-serif" }}>{title}</h3>
    <p className="text-[#1a2639]">{description}</p>
  </motion.div>
);

export default AIDevelopmentSection;
