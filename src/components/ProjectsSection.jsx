import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import ChessGame from './ChessGame';
import WebsiteAnalyzer from './WebsiteAnalyzer';
import PongGame from './PongGame';

const ProjectsSection = () => (
  <ScrollArea className="h-full p-8">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#c24d2c]">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard title="Chess Game" description="A vibrant chess game built with React.">
          <ChessGame />
        </ProjectCard>
        <ProjectCard title="Website Analyzer" description="Analyze websites and generate colorful insights.">
          <WebsiteAnalyzer />
        </ProjectCard>
        <ProjectCard title="Pong Game" description="A classic Pong game with a splash of color.">
          <PongGame />
        </ProjectCard>
      </div>
    </div>
  </ScrollArea>
);

const ProjectCard = ({ title, description, children }) => (
  <Card className="bg-[#d9dad7] bg-opacity-10 border-2 border-[#c24d2c] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <CardContent className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-[#c24d2c]">{title}</h3>
      <p className="text-[#d9dad7] mb-4">{description}</p>
      {children}
    </CardContent>
  </Card>
);

export default ProjectsSection;