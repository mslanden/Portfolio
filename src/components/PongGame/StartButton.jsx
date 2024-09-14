import React from 'react';
import { Button } from "@/components/ui/button";

const StartButton = ({ onStart, gameStarted }) => (
  <Button
    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    onClick={onStart}
    disabled={gameStarted}
  >
    {gameStarted ? 'Game In Progress' : 'Start Game'}
  </Button>
);

export default StartButton;