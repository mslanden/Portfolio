import React, { useRef, useEffect } from 'react';

const PongCanvas = ({ width, height, gameState, handleMouseMove }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const render = () => {
      context.fillStyle = '#1a2639';
      context.fillRect(0, 0, width, height);

      const { ball, paddle, particles } = gameState;

      // Draw paddles
      context.fillStyle = '#c24d2c';
      context.fillRect(0, paddle.player.y, paddle.width, paddle.height);
      context.fillRect(width - paddle.width, paddle.computer.y, paddle.width, paddle.height);

      // Draw ball
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
      context.fillStyle = '#d9dad7';
      context.fill();
      context.closePath();

      // Draw center line
      context.beginPath();
      context.setLineDash([5, 15]);
      context.moveTo(width / 2, 0);
      context.lineTo(width / 2, height);
      context.strokeStyle = '#3e4a61';
      context.stroke();
      context.closePath();

      // Draw particles
      particles.forEach(p => {
        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
        context.fillStyle = p.color;
        context.fill();
        context.closePath();
      });

      requestAnimationFrame(render);
    };
    render();
  }, [gameState, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      className="border-2 border-[#c24d2c]"
      style={{ width: '100%', maxWidth: `${width}px`, height: 'auto', aspectRatio: `${width} / ${height}` }}
    />
  );
};

export default PongCanvas;
