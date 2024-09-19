import React from 'react';

const PongScoreboard = ({ score }) => (
  <div className="flex justify-center space-x-8 text-2xl font-bold text-[#d9dad7]">
    <div>Player: {score.player}</div>
    <div>Computer: {score.computer}</div>
  </div>
);

export default PongScoreboard;