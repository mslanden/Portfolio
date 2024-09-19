import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const AIDevelopmentSection = () => (
  <div className="h-full flex items-center justify-center p-4 sm:p-8">
    <Card className="w-full max-w-4xl bg-[#1a2639] bg-opacity-80 border-2 border-[#c24d2c] shadow-lg">
      <CardContent className="p-4 sm:p-8">
        <motion.h2 
          className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-center text-[#c24d2c]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI Development
        </motion.h2>
        <motion.p 
          className="text-lg sm:text-xl text-[#d9dad7] text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Exploring the frontiers of artificial intelligence and its applications in modern technology.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <FuturisticBox title="Machine Learning" description="Advanced algorithms that learn and improve from experience" />
          <FuturisticBox title="Neural Networks" description="Simulating human brain function for complex problem-solving" />
          <FuturisticBox title="Computer Vision" description="Enabling machines to interpret and understand visual information" />
          <FuturisticBox title="Natural Language Processing" description="Bridging the gap between human communication and computer understanding" />
        </div>
      </CardContent>
    </Card>
  </div>
);

const FuturisticBox = ({ title, description }) => (
  <motion.div 
    className="bg-[#3e4a61] bg-opacity-50 p-3 sm:p-4 rounded-lg border border-[#c24d2c] shadow-md"
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(194, 77, 44)" }}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#c24d2c]" style={{ fontFamily: "'Orbitron', sans-serif" }}>{title}</h3>
    <p className="text-sm sm:text-base text-[#d9dad7]">{description}</p>
  </motion.div>
);

export default AIDevelopmentSection;
