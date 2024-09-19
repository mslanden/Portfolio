import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import MainMenu from '../components/MainMenu';
import AIDevelopmentSection from '../components/AIDevelopmentSection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('ai-development');
  const sectionRefs = {
    'ai-development': useRef(null),
    'projects': useRef(null),
    'about': useRef(null),
    'contact': useRef(null),
  };

  const sections = [
    { id: 'ai-development', title: 'AI-Driven Innovations', component: <AIDevelopmentSection /> },
    { id: 'projects', title: 'Projects', component: <ProjectsSection /> },
    { id: 'about', title: 'About', component: <AboutSection /> },
    { id: 'contact', title: 'Contact', component: <ContactSection /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (const section of sections) {
        const element = sectionRefs[section.id].current;
        if (element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/ai-development.jpg')" }}
      ></div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      <div className="relative z-20">
        <MainMenu activeSection={activeSection} scrollToSection={scrollToSection} />
        <main className="pt-16"> {/* Add padding-top to account for the fixed menu */}
          {sections.map((section) => (
            <div 
              key={section.id}
              ref={sectionRefs[section.id]}
              className="min-h-screen w-full snap-start snap-always"
            >
              <Card className="h-full w-full bg-transparent text-white">
                <CardContent className="p-0 h-full">
                  {section.component}
                </CardContent>
              </Card>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Index;
