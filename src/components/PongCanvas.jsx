import React, { forwardRef, useEffect } from 'react';

const PongCanvas = forwardRef(({ gameState }, ref) => {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const render = () => {
      if (!canvas) return;
      context.fillStyle = '#1a2639';
      context.fillRect(0, 0, canvas.width, canvas.height);

      const { ball, paddle, particles } = gameState;

      // Draw paddles
      context.fillStyle = '#c24d2c';
      context.fillRect(0, paddle.player.y, paddle.width, paddle.height);
      context.fillRect(canvas.width - paddle.width, paddle.computer.y, paddle.width, paddle.height);

      // Draw ball
      context.beginPath();
      context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
      context.fillStyle = '#d9dad7';
      context.fill();
      context.closePath();

      // Draw center line
      context.beginPath();
      context.setLineDash([5, 15]);
      context.moveTo(canvas.width / 2, 0);
      context.lineTo(canvas.width / 2, canvas.height);
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
  }, [gameState, ref]);

  return (
    <canvas
      ref={ref}
      className="w-full h-full border-2 border-[#c24d2c]"
    />
  );
});

PongCanvas.displayName = 'PongCanvas';

export default PongCanvas;
