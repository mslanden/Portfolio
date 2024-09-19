import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const AboutSection = () => (
  <ScrollArea className="h-full p-8">
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <img src="/marcelino-landen.jpg" alt="Marcelino Landen" className="w-48 h-48 rounded-full border-4 border-[#4a9ff5] shadow-lg object-cover animate-float" />
        <div>
          <h1 className="text-3xl font-bold text-[#4a9ff5] mb-2">Marcelino Landen</h1>
          <p className="text-xl mb-4">AI Explorer & Web Developer</p>
          <p className="mb-4">
            Greetings, cosmic traveler! I'm Marcelino Landen, an AI explorer and web developer charting the vast expanses of technology. 
            My mission is to bridge the gap between artificial intelligence and web development, creating stellar experiences that push the boundaries of what's possible.
          </p>
          <p>
            When I'm not coding or training neural networks, you can find me stargazing, pondering the mysteries of the universe, 
            or designing virtual worlds that blend the beauty of space with the power of AI.
          </p>
        </div>
      </div>
    </div>
  </ScrollArea>
);

export default AboutSection;
