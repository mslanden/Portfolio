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
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <header className="fixed top-0 left-0 w-full bg-[#1a2639] bg-opacity-80 z-50 p-4">
        <nav>
          <ul className="flex justify-center space-x-4">
            {['AI Development', 'About', 'Projects', 'Contact'].map((section) => (
              <li key={section}>
                <a href={`#${section.toLowerCase().replace(' ', '-')}`} className="text-[#c24d2c] hover:text-[#d9dad7] transition-colors">
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>
        <AIDevelopmentSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

const AIDevelopmentSection = () => (
  <section id="ai-development" className="min-h-screen flex items-center justify-center snap-start">
    <Card className="w-full h-full max-w-none mx-auto overflow-hidden">
      <CardContent className="p-0 relative h-screen">
        <img 
          src="/ai-development.jpg"  
          className="w-full h-full object-cover"
          alt="AI Development"
        />
      </CardContent>
    </Card>
  </section>
);

const AboutSection = () => (
  <section id="about" className="min-h-screen flex items-center justify-center snap-start bg-gradient-to-br from-[#1a2639] to-[#3e4a61] p-8">
    <div className="max-w-4xl">
      <Card className="mb-8 bg-[#d9dad7] bg-opacity-90">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#1a2639]">About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src="/marcelino-landen.jpg" alt="Marcelino Landen" className="w-48 h-48 rounded-full mb-4 border-4 border-[#c24d2c] shadow-lg object-cover animate-float" />
            <div>
              <h1 className="text-2xl font-bold text-[#c24d2c] mb-2">Marcelino Landen</h1>
              <p className="text-[#3e4a61] mb-4">Web Developer</p>
              <p className="text-[#1a2639] mb-4">
                Hello! I'm Marcelino Landen, a web developer with a passion for creating beautiful and functional websites. 
                I specialize in React, Node.js, and modern web technologies, bringing a splash of creativity to every project.
              </p>
              <p className="text-[#1a2639]">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or experimenting with digital art to fuel my creative spirit.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);

const ProjectsSection = () => (
  <section id="projects" className="min-h-screen flex items-center justify-center snap-start bg-gradient-to-br from-[#3e4a61] to-[#1a2639] p-8">
    <Card className="w-full max-w-4xl bg-[#d9dad7] bg-opacity-90">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-[#1a2639]">My Projects</CardTitle>
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
  </section>
);

const ProjectCard = ({ title, description, children }) => (
  <Card className="bg-[#d9dad7] bg-opacity-80 border-2 border-[#c24d2c] shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 w-[300px] flex-shrink-0 snap-start">
    <CardContent className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-[#1a2639]">{title}</h3>
      <p className="text-[#c24d2c] mb-4">{description}</p>
      {children}
    </CardContent>
  </Card>
);

const ContactSection = () => (
  <section id="contact" className="min-h-screen flex items-center justify-center snap-start bg-gradient-to-br from-[#1a2639] to-[#3e4a61] p-8">
    <Card className="max-w-4xl bg-[#d9dad7] bg-opacity-90">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-[#1a2639]">Get in Touch</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl mb-6 text-[#c24d2c]">I'm always open to new opportunities and collaborations.</p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="icon" className="bg-[#d9dad7] border-[#1a2639] text-[#1a2639] hover:bg-[#3e4a61] hover:text-[#d9dad7] hover:scale-110 transition-transform">
            <GithubIcon className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="bg-[#d9dad7] border-[#c24d2c] text-[#c24d2c] hover:bg-[#3e4a61] hover:text-[#d9dad7] hover:scale-110 transition-transform">
            <LinkedinIcon className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="bg-[#d9dad7] border-[#1a2639] text-[#1a2639] hover:bg-[#3e4a61] hover:text-[#d9dad7] hover:scale-110 transition-transform">
            <MailIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </section>
);

const Footer = () => (
  <footer className="bg-gradient-to-r from-[#c24d2c] to-[#1a2639] text-[#d9dad7] py-4 mt-8 rounded-lg">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; 2024 Marcelino Landen. All rights reserved.</p>
    </div>
  </footer>
);

export default Index;
