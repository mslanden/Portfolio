import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import ChessGame from '../components/ChessGame';
import WebsiteAnalyzer from '../components/WebsiteAnalyzer';
import PongGame from '../components/PongGame';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-teal-100 animate-gradient-x p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <ProfileSection />
            <NavCards />
          </aside>
          <main className="md:w-3/4">
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ProfileSection = () => (
  <Card className="mb-6">
    <CardContent className="p-6">
      <img src="/marcelino-landen.jpg" alt="Marcelino Landen" className="w-full h-auto rounded-full mb-4 border-4 border-orange-500 shadow-lg object-cover animate-float" />
      <h1 className="text-2xl font-bold text-orange-600 text-center">Marcelino Landen</h1>
      <p className="text-teal-600 text-center">Web Developer</p>
    </CardContent>
  </Card>
);

const NavCards = () => (
  <div className="space-y-4">
    {['About', 'Projects', 'Contact'].map((section) => (
      <Card key={section} className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <a href={`#${section.toLowerCase()}`} className="text-teal-600 hover:text-orange-500 transition-colors">
            {section}
          </a>
        </CardContent>
      </Card>
    ))}
  </div>
);

const AboutSection = () => (
  <Card id="about" className="mb-8">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-teal-700">About Me</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-teal-800 mb-4">
        Hello! I'm Marcelino Landen, a web developer with a passion for creating beautiful and functional websites. 
        I specialize in React, Node.js, and modern web technologies, bringing a splash of creativity to every project.
      </p>
      <p className="text-teal-800">
        When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
        or experimenting with digital art to fuel my creative spirit.
      </p>
    </CardContent>
  </Card>
);

const ProjectsSection = () => (
  <Card id="projects" className="mb-8">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-teal-700">My Projects</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4 snap-x snap-mandatory">
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </CardContent>
  </Card>
);

const ProjectCard = ({ title, description, children }) => (
  <Card className="bg-white bg-opacity-80 border-2 border-orange-300 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 w-[300px] flex-shrink-0 snap-start">
    <CardContent className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-teal-600">{title}</h3>
      <p className="text-orange-700 mb-4">{description}</p>
      {children}
    </CardContent>
  </Card>
);

const ContactSection = () => (
  <Card id="contact" className="mb-8">
    <CardHeader>
      <CardTitle className="text-3xl font-bold text-teal-700">Get in Touch</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-xl mb-6 text-orange-700">I'm always open to new opportunities and collaborations.</p>
      <div className="flex justify-center space-x-4">
        <Button variant="outline" size="icon" className="bg-white border-teal-500 text-teal-500 hover:bg-teal-100 hover:scale-110 transition-transform">
          <GithubIcon className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="bg-white border-orange-500 text-orange-500 hover:bg-orange-100 hover:scale-110 transition-transform">
          <LinkedinIcon className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="bg-white border-teal-500 text-teal-500 hover:bg-teal-100 hover:scale-110 transition-transform">
          <MailIcon className="h-5 w-5" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const Footer = () => (
  <footer className="bg-gradient-to-r from-orange-600 to-teal-600 text-white py-4 mt-8 rounded-lg">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; 2024 Marcelino Landen. All rights reserved.</p>
    </div>
  </footer>
);

export default Index;
