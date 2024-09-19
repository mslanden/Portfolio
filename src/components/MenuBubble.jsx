import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MenuIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MenuBubble = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ['Home', 'About', 'Projects', 'Contact'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const bubbleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          className="w-12 h-12 rounded-full fixed top-4 left-4 z-50 bg-[#1a2639] hover:bg-[#3e4a61] transition-all duration-300 border-2 border-[#c24d2c] opacity-85"
          size="icon"
        >
          <MenuIcon className="h-6 w-6 text-[#d9dad7]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-56 p-4 bg-transparent border-none shadow-none" 
        side="bottom" 
        align="start" 
        sideOffset={5}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mt-2"
            >
              <ul className="space-y-3">
                {menuItems.map((section, index) => (
                  <motion.li key={section} variants={bubbleVariants}>
                    <motion.button
                      onClick={() => {
                        scrollToSection(section.toLowerCase());
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 bg-[#1a2639] text-[#d9dad7] rounded-full hover:bg-[#3e4a61] transition-colors border border-[#c24d2c]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {section}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
};

export default MenuBubble;
