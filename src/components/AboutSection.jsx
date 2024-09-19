import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection = () => (
  <ScrollArea className="h-full">
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card className="max-w-4xl w-full bg-[#1a2639] bg-opacity-80 border-2 border-[#c24d2c] shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-[#c24d2c]">About Me</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-8">
          <img 
            src="/marcelino-landen.jpg" 
            alt="Marcelino Landen" 
            className="w-48 h-48 rounded-full border-4 border-[#c24d2c] shadow-lg object-cover animate-float"
          />
          <div className="text-[#d9dad7]">
            <h2 className="text-2xl font-bold text-[#c24d2c] mb-2">Marcelino Landen</h2>
            <p className="text-xl mb-4">AI-Focused Developer</p>
            <p className="mb-4">
              I'm Marcelino Landen, a developer passionate about leveraging AI to create impactful solutions. 
              With a focus on AI Agents, large language models (LLMs), web design, and game development, 
              I aim to enhance productivity and deliver cutting-edge projects.
            </p>
            <p className="mb-4">
              My work blends creativity, technology, and efficiency to build modern, forward-thinking products 
              that solve real-world problems. Based in Southern California, I'm constantly exploring how AI 
              can push boundaries and drive innovation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </ScrollArea>
);

export default AboutSection;
