import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const AIDevelopmentSection = () => (
  <ScrollArea className="h-full p-8">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-[#4a9ff5]">AI Development</h2>
      <div className="space-y-6">
        <p className="text-lg">
          Exploring the frontiers of artificial intelligence, we're pioneering new technologies that push the boundaries of what's possible in machine learning and cognitive computing.
        </p>
        <p className="text-lg">
          Our focus areas include:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Neural network architectures</li>
          <li>Natural language processing</li>
          <li>Computer vision and image recognition</li>
          <li>Reinforcement learning</li>
          <li>Quantum machine learning</li>
        </ul>
        <p className="text-lg">
          Join us on this cosmic journey as we navigate the vast universe of AI, charting new territories and unlocking the potential of intelligent systems.
        </p>
      </div>
    </div>
  </ScrollArea>
);

export default AIDevelopmentSection;
