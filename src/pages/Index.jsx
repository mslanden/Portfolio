import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import ProfileBubble from '../components/ProfileBubble';
import AIDevelopmentSection from '../components/AIDevelopmentSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';

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

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/ai-development.jpg')" }}
      ></div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      <div className="relative z-20">
        <ProfileBubble scrollToSection={scrollToSection} />
        <main>
          {sections.map((section) => (
            <motion.div
              key={section.id}
              ref={sectionRefs[section.id]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Card className="min-h-screen w-full bg-transparent text-white">
                <CardContent className="p-0 h-full">
                  {section.component}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Index;
