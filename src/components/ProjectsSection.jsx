import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ChessGame from './ChessGame';
import WebsiteAnalyzer from './WebsiteAnalyzer';
import PongGame from './PongGame';

const ProjectsSection = () => (
  <ScrollArea className="h-full p-8">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#c24d2c]">My Projects</h2>
      <div className="space-y-8">
        <ProjectCard 
          title="Chess Game" 
          description="A vibrant and interactive chess game built with React. Challenge yourself against an AI opponent or play with a friend. Features include move validation, check/checkmate detection, and pawn promotion."
        >
          <ChessGame />
        </ProjectCard>
        <ProjectCard 
          title="Website Analyzer" 
          description="A powerful tool to analyze websites and generate colorful insights. Get detailed reports on SEO, performance, and accessibility scores. Compare your site with competitors and receive actionable recommendations for improvement."
        >
          <WebsiteAnalyzer />
        </ProjectCard>
        <ProjectCard 
          title="Pong Game" 
          description="A classic Pong game reimagined with a splash of color and modern features. Experience smooth gameplay, particle effects, and dynamic difficulty. Challenge the AI or play with a friend in this addictive arcade-style game."
        >
          <PongGame />
        </ProjectCard>
      </div>
    </div>
  </ScrollArea>
);

const ProjectCard = ({ title, description, children }) => (
  <Card className="bg-[#d9dad7] bg-opacity-10 border-2 border-[#c24d2c] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <CardHeader>
      <CardTitle className="text-2xl font-semibold text-[#c24d2c]">{title}</CardTitle>
      <CardDescription className="text-[#d9dad7] text-base">{description}</CardDescription>
    </CardHeader>
    <CardContent className="p-6">
      {children}
    </CardContent>
  </Card>
);

export default ProjectsSection;
