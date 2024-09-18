import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import ChessGame from '../components/ChessGame';
import WebsiteAnalyzer from '../components/WebsiteAnalyzer';
import PongGame from '../components/PongGame';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-teal-100">
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

const Header = () => (
  <header className="bg-white bg-opacity-80 shadow-sm">
    <div className="container mx-auto px-4 py-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-orange-600">Marcelino Landen</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#about" className="text-teal-600 hover:text-orange-500 transition-colors">About</a></li>
          <li><a href="#projects" className="text-teal-600 hover:text-orange-500 transition-colors">Projects</a></li>
          <li><a href="#contact" className="text-teal-600 hover:text-orange-500 transition-colors">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="bg-gradient-to-r from-orange-500 to-teal-500 text-white py-20">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-4">Welcome to My Creative Space</h2>
      <p className="text-xl mb-8">I'm Marcelino Landen, a passionate developer crafting vibrant web experiences</p>
      <Button variant="secondary" size="lg" className="bg-white text-orange-500 hover:bg-orange-100">View My Work</Button>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-teal-700">About Me</h2>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <img src="/marcelino-landen.JPG" alt="Marcelino Landen" className="w-64 h-64 rounded-full mb-8 md:mb-0 md:mr-8 border-4 border-orange-500 shadow-lg mx-auto object-cover" />
        <div className="max-w-md">
          <p className="text-teal-800 mb-4">
            Hello! I'm Marcelino Landen, a web developer with a passion for creating beautiful and functional websites. 
            I specialize in React, Node.js, and modern web technologies, bringing a splash of creativity to every project.
          </p>
          <p className="text-teal-800">
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
            or experimenting with digital art to fuel my creative spirit.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => (
  <section id="projects" className="bg-gradient-to-br from-orange-200 to-teal-200 py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-teal-700">My Projects</h2>
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
  </section>
);

const ProjectCard = ({ title, description, children }) => (
  <Card className="bg-white bg-opacity-80 border-2 border-orange-300 shadow-lg">
    <CardContent className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-teal-600">{title}</h3>
      <p className="text-orange-700 mb-4">{description}</p>
      {children}
    </CardContent>
  </Card>
);

const ContactSection = () => (
  <section id="contact" className="py-20 bg-gradient-to-br from-teal-100 to-orange-100">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-8 text-teal-700">Get in Touch</h2>
      <p className="text-xl mb-8 text-orange-700">I'm always open to new opportunities and collaborations.</p>
      <div className="flex justify-center space-x-4">
        <Button variant="outline" size="icon" className="bg-white border-teal-500 text-teal-500 hover:bg-teal-100">
          <GithubIcon className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="bg-white border-orange-500 text-orange-500 hover:bg-orange-100">
          <LinkedinIcon className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="bg-white border-teal-500 text-teal-500 hover:bg-teal-100">
          <MailIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gradient-to-r from-orange-600 to-teal-600 text-white py-8">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; 2024 Marcelino Landen. All rights reserved.</p>
    </div>
  </footer>
);

export default Index;
