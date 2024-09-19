import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MenuIcon } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const MenuBubble = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ['Home', 'About', 'Projects', 'Contact'];

  const bubbleVariants = {
    initial: { scale: 0.8, rotate: -180 },
    animate: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 20 } },
    tap: { scale: 0.95, rotate: 15 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 100 }
    }),
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.div
          variants={bubbleVariants}
          initial="initial"
          animate="animate"
          whileTap="tap"
        >
          <Button 
            className="w-14 h-14 rounded-full fixed top-4 left-4 z-50 bg-gradient-to-r from-[#1a2639] to-[#3e4a61] hover:from-[#3e4a61] hover:to-[#1a2639] transition-all duration-300 shadow-lg hover:shadow-xl"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuIcon className="h-6 w-6 text-[#d9dad7]" />
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent className="w-48 bg-[#1a2639] border-[#c24d2c] text-[#d9dad7] rounded-lg shadow-xl p-2">
        <nav>
          <AnimatePresence>
            {isOpen && (
              <motion.ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    custom={index}
                  >
                    <Button
                      onClick={() => {
                        scrollToSection(item.toLowerCase());
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#3e4a61] rounded transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span className="text-[#c24d2c] font-bold">{index + 1}.</span>
                      <span>{item}</span>
                    </Button>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      </PopoverContent>
    </Popover>
  );
};

export default MenuBubble;
