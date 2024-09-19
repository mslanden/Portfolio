import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import ChessGame from '../components/ChessGame';
import WebsiteAnalyzer from '../components/WebsiteAnalyzer';
import PongGame from '../components/PongGame';

const Index = () => {
  const [activeSection, setActiveSection] = useState('ai-development');

  const sections = [
    { id: 'ai-development', title: 'AI Development', component: <AIDevelopmentSection /> },
    { id: 'about', title: 'About', component: <AboutSection /> },
    { id: 'projects', title: 'Projects', component: <ProjectsSection /> },
    { id: 'contact', title: 'Contact', component: <ContactSection /> },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat blur-3xl opacity-50"
        style={{ backgroundImage: "url('/ai-development.jpg')" }}
      ></div>
      <div className="relative z-10">
        <ProfileBubble setActiveSection={setActiveSection} />
        <main>
          {sections.map((section) => (
            <Card 
              key={section.id}
              className={`min-h-screen w-full absolute top-0 left-0 transition-opacity duration-500 ${
                activeSection === section.id ? 'opacity-100 z-20' : 'opacity-0 z-10'
              } bg-gradient-to-br from-[#1a2639] to-[#3e4a61] text-[#d9dad7]`}
            >
              <CardContent className="p-0 h-full">
                {section.component}
              </CardContent>
            </Card>
          ))}
        </main>
      </div>
    </div>
  );
};

const ProfileBubble = ({ setActiveSection }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Avatar className="w-16 h-16 fixed top-4 left-4 z-50 cursor-pointer hover:ring-2 hover:ring-[#c24d2c] transition-all duration-300">
        <AvatarImage src="/marcelino-landen.jpg" alt="Marcelino Landen" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
    </PopoverTrigger>
    <PopoverContent className="w-48 bg-[#1a2639] border-[#c24d2c] text-[#d9dad7]">
      <nav>
        <ul className="space-y-2">
          {['AI Development', 'About', 'Projects', 'Contact'].map((section) => (
            <li key={section}>
              <button
                onClick={() => setActiveSection(section.toLowerCase().replace(' ', '-'))}
                className="w-full text-left px-2 py-1 hover:bg-[#3e4a61] rounded transition-colors"
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </PopoverContent>
  </Popover>
);

const AIDevelopmentSection = () => (
  <div className="h-full flex items-center justify-center">
    <img src="/ai-development.jpg" alt="AI Development" className="max-w-full max-h-full object-cover" />
  </div>
);

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

const ContactSection = () => (
  <ScrollArea className="h-full flex items-center justify-center p-8">
    <div className="max-w-4xl w-full">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#c24d2c]">Get in Touch</h2>
      <p className="text-xl mb-6 text-center">I'm always open to new opportunities and collaborations.</p>
      <div className="flex justify-center space-x-4">
        <Button variant="outline" size="icon" className="bg-transparent border-[#c24d2c] text-[#c24d2c] hover:bg-[#c24d2c] hover:text-[#1a2639] transition-colors">
          <GithubIcon className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="bg-transparent border-[#c24d2c] text-[#c24d2c] hover:bg-[#c24d2c] hover:text-[#1a2639] transition-colors">
          <LinkedinIcon className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="bg-transparent border-[#c24d2c] text-[#c24d2c] hover:bg-[#c24d2c] hover:text-[#1a2639] transition-colors">
          <MailIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  </ScrollArea>
);

export default Index;
