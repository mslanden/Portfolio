import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const MenuBubble = ({ scrollToSection }) => {
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
    hidden: { y: -20, opacity: 0 },
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
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 flex justify-around items-center p-4 bg-[#1a2639] bg-opacity-85"
    >
      {menuItems.map((section) => (
        <motion.div key={section} variants={bubbleVariants}>
          <Button
            onClick={() => scrollToSection(section.toLowerCase())}
            className="px-4 py-2 bg-[#1a2639] text-[#d9dad7] rounded-full hover:bg-[#3e4a61] transition-colors border border-[#c24d2c]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {section}
          </Button>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default MenuBubble;
