import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import ChessGame from './ChessGame';
import WebsiteAnalyzer from './WebsiteAnalyzer';
import PongGame from './PongGame';

const ProjectsSection = () => (
  <ScrollArea className="h-full p-8">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#4a9ff5]">Cosmic Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard title="Nebula Chess" description="A chess game powered by cosmic AI.">
          <ChessGame />
        </ProjectCard>
        <ProjectCard title="Stellar Site Analyzer" description="Analyze websites across the digital universe.">
          <WebsiteAnalyzer />
        </ProjectCard>
        <ProjectCard title="Asteroid Pong" description="A space-themed twist on the classic game.">
          <PongGame />
        </ProjectCard>
      </div>
    </div>
  </ScrollArea>
);

const ProjectCard = ({ title, description, children }) => (
  <Card className="bg-[#1a1b3a] bg-opacity-50 border-2 border-[#4a9ff5] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <CardContent className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-[#4a9ff5]">{title}</h3>
      <p className="text-[#e0e1ff] mb-4">{description}</p>
      {children}
    </CardContent>
  </Card>
);

export default ProjectsSection;
