import React from 'react';
import { Button } from "@/components/ui/button";

const DifficultyMenu = ({ difficulty, onDifficultyChange }) => {
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <div className="flex space-x-2">
      {difficulties.map((level) => (
        <Button
          key={level}
          onClick={() => onDifficultyChange(level)}
          className={`px-4 py-2 rounded transition-colors ${
            difficulty === level
              ? 'bg-[#c24d2c] text-[#d9dad7]'
              : 'bg-[#3e4a61] text-[#d9dad7] hover:bg-[#c24d2c]'
          }`}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export default DifficultyMenu;