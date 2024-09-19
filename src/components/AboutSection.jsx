import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const AboutSection = () => (
  <ScrollArea className="h-full p-8">
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <img src="/marcelino-landen.jpg" alt="Marcelino Landen" className="w-48 h-48 rounded-full border-4 border-[#c24d2c] shadow-lg object-cover animate-float" />
        <div>
          <h1 className="text-3xl font-bold text-[#c24d2c] mb-2">Marcelino Landen</h1>
          <p className="text-xl mb-4">Web Developer</p>
          <p className="mb-4">
            Hello! I'm Marcelino Landen, a web developer with a passion for creating beautiful and functional websites. 
            I specialize in React, Node.js, and modern web technologies, bringing a splash of creativity to every project.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
            or experimenting with digital art to fuel my creative spirit.
          </p>
        </div>
      </div>
    </div>
  </ScrollArea>
);

export default AboutSection;