import React from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const ChessMenu = ({ isMenuOpen, setIsMenuOpen, resetGame, toggleGameMode, gameMode }) => {
  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto', transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="bg-[#c24d2c] text-[#d9dad7] hover:bg-[#d9dad7] hover:text-[#1a2639] transition-colors duration-300"
      >
        {isMenuOpen ? 'Close Menu' : 'Open Menu'}
      </Button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="flex flex-col items-center space-y-2"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div variants={itemVariants}>
              <Button onClick={resetGame} className="bg-[#c24d2c] text-[#d9dad7] hover:bg-[#d9dad7] hover:text-[#1a2639] transition-colors duration-300">
                Reset Game
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button onClick={toggleGameMode} className="bg-[#c24d2c] text-[#d9dad7] hover:bg-[#d9dad7] hover:text-[#1a2639] transition-colors duration-300">
                {gameMode === 'ai' ? 'Play with Friend' : 'Play with AI'}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChessMenu;
