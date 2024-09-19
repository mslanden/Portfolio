import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const AIDevelopmentSection = () => (
  <div className="h-full flex items-center justify-center p-4 sm:p-8">
    <Card className="w-full max-w-4xl bg-[#1a2639] bg-opacity-80 border-2 border-[#c24d2c] shadow-lg">
      <CardContent className="p-4 sm:p-8 flex flex-col sm:flex-row items-center">
        <motion.img 
          src="/marcelino-landen.jpg" 
          alt="Marcelino Landen"
          className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-[#c24d2c] shadow-lg object-cover mb-4 sm:mb-0 sm:mr-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div>
          <motion.h2 
            className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-center sm:text-left"
            style={{ 
              fontFamily: "'Orbitron', sans-serif",
              background: "linear-gradient(45deg, #00FFFF, #FF00FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.5)"
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Marcelino Landen AI-Driven Innovations
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-[#d9dad7] text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            I create AI Agents, LLMs, dynamic websites, and games—using AI to streamline processes and enhance productivity. Explore my work and see how AI can transform your vision into reality.
          </motion.p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AIDevelopmentSection;
