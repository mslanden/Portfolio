import React, { forwardRef } from 'react';

const GameCanvas = forwardRef((props, ref) => (
  <canvas ref={ref} width={700} height={400} className="border border-gray-300" />
));

GameCanvas.displayName = 'GameCanvas';

export default GameCanvas;