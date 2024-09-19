import React from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const ChessMenu = ({ isMenuOpen, setIsMenuOpen, resetGame, toggleGameMode, gameMode }) => {
  const menuVariants = {
    closed: { opacity: 0, x: 0 },
    open: { opacity: 1, x: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      className="flex items-center justify-center space-x-4"
      initial="closed"
      animate={isMenuOpen ? "open" : "closed"}
      variants={menuVariants}
    >
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={itemVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <Button onClick={resetGame} className="bg-[#c24d2c] text-[#d9dad7] hover:bg-[#d9dad7] hover:text-[#1a2639]">
              Reset Game
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="bg-[#c24d2c] text-[#d9dad7] hover:bg-[#d9dad7] hover:text-[#1a2639]"
      >
        Menu
      </Button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={itemVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <Button onClick={toggleGameMode} className="bg-[#c24d2c] text-[#d9dad7] hover:bg-[#d9dad7] hover:text-[#1a2639]">
              {gameMode === 'ai' ? 'Play with Friend' : 'Play with AI'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChessMenu;