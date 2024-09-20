import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';

const MenuBubble = ({ scrollToSection }) => {
  const menuItems = ['Home', 'About', 'Projects', 'Contact'];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center p-2 sm:p-4"
    >
      <Card className="bg-[#1a2639] bg-opacity-85 border-[#c24d2c] shadow-lg w-full max-w-screen-lg">
        <motion.div className="flex flex-wrap justify-center sm:justify-around items-center p-1 sm:p-2 gap-2">
          {menuItems.map((section) => (
            <motion.div key={section} variants={itemVariants} className="w-1/2 sm:w-auto">
              <Button
                onClick={() => scrollToSection(section.toLowerCase())}
                className="w-full sm:w-auto px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-[#3e4a61] text-[#d9dad7] rounded-md hover:bg-[#c24d2c] transition-colors border border-[#c24d2c]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </Card>
    </motion.nav>
  );
};

export default MenuBubble;
