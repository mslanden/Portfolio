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
          Marcelino Landen's AI-Driven Innovations
        </motion.h2>
        <motion.p 
          className="text-lg sm:text-xl text-[#d9dad7] text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          I create AI Agents, LLMs, dynamic websites, and games—using AI to streamline processes and enhance productivity. Explore my work and see how AI can transform your vision into reality.
        </motion.p>
      </CardContent>
    </Card>
  </div>
);

export default AIDevelopmentSection;
