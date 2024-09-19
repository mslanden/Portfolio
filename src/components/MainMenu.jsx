import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { HomeIcon, CodeIcon, UserIcon, MailIcon } from 'lucide-react';

const MainMenu = ({ activeSection, scrollToSection }) => {
  const menuItems = [
    { id: 'ai-development', icon: <HomeIcon className="w-5 h-5" />, label: 'Home' },
    { id: 'projects', icon: <CodeIcon className="w-5 h-5" />, label: 'Projects' },
    { id: 'about', icon: <UserIcon className="w-5 h-5" />, label: 'About' },
    { id: 'contact', icon: <MailIcon className="w-5 h-5" />, label: 'Contact' },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-[#1a2639] bg-opacity-90 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-2">
        <ul className="flex justify-center space-x-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Button
                variant={activeSection === item.id ? "default" : "ghost"}
                className={`flex items-center space-x-2 ${
                  activeSection === item.id ? 'bg-[#c24d2c] text-white' : 'text-[#d9dad7] hover:bg-[#3e4a61]'
                }`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default MainMenu;