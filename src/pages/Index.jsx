import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ProfileBubble from '../components/ProfileBubble';
import AIDevelopmentSection from '../components/AIDevelopmentSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import StarryBackground from '../components/StarryBackground';

const Index = () => {
  const [activeSection, setActiveSection] = useState('ai-development');
  const sectionRefs = {
    'ai-development': useRef(null),
    'about': useRef(null),
    'projects': useRef(null),
    'contact': useRef(null),
  };

  const sections = [
    { id: 'ai-development', title: 'AI Development', component: <AIDevelopmentSection /> },
    { id: 'about', title: 'About', component: <AboutSection /> },
    { id: 'projects', title: 'Projects', component: <ProjectsSection /> },
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
    <div className="min-h-screen relative bg-[#0a0b1e]">
      <StarryBackground />
      <div className="relative z-10">
        <ProfileBubble scrollToSection={scrollToSection} />
        <main>
          {sections.map((section) => (
            <Card 
              key={section.id}
              ref={sectionRefs[section.id]}
              className="min-h-screen w-full bg-gradient-to-br from-[#0a0b1e] to-[#1a1b3a] text-[#e0e1ff] border-none shadow-lg"
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

export default Index;
