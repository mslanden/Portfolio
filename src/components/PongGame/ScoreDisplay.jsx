import React from 'react';

const ScoreDisplay = ({ score }) => (
  <div className="mt-4 text-xl font-bold">
    Player: {score.player} | Computer: {score.computer}
  </div>
);

export default ScoreDisplay;