import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AIDevelopmentCard = () => {
  return (
    <Card className="w-full h-full bg-cover bg-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-75"></div>
      <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-white p-6">
        <h3 className="text-4xl font-bold mb-4 text-center">AI Development</h3>
        <p className="text-lg text-center mb-6">Exploring the frontiers of artificial intelligence and machine learning</p>
        <div className="w-full h-64 bg-[url('/ai-development.jpg')] bg-cover bg-center rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"></div>
      </CardContent>
    </Card>
  );
};

export default AIDevelopmentCard;