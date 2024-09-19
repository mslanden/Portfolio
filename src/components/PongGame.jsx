import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import PongCanvas from './PongCanvas';
import PongScoreboard from './PongScoreboard';
import { createParticles } from '../utils/particleUtils';

const PongGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const canvasRef = useRef(null);
  const gameStateRef = useRef({
    paddle: {
      width: 10,
      height: 100,
      player: { y: 150 },
      computer: { y: 150 },
      speed: 7,
    },
    ball: {
      x: 200,
      y: 200,
      radius: 5,
      speed: 7,
      velocityX: 5,
      velocityY: 5,
    },
    particles: [],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const updateCanvasSize = () => {
        const containerWidth = canvas.parentElement.clientWidth;
        const containerHeight = window.innerHeight * 0.6;
        canvas.width = containerWidth;
        canvas.height = containerHeight;
        gameStateRef.current.paddle.player.y = containerHeight / 2 - gameStateRef.current.paddle.height / 2;
        gameStateRef.current.paddle.computer.y = containerHeight / 2 - gameStateRef.current.paddle.height / 2;
        gameStateRef.current.ball.x = containerWidth / 2;
        gameStateRef.current.ball.y = containerHeight / 2;
      };

      updateCanvasSize();
      window.addEventListener('resize', updateCanvasSize);
      return () => window.removeEventListener('resize', updateCanvasSize);
    }
  }, []);

  useEffect(() => {
    if (!gameStarted) return;
    const intervalId = setInterval(updateGame, 1000 / 60); // 60 FPS
    return () => clearInterval(intervalId);
  }, [gameStarted]);

  const updateGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ball, paddle, particles } = gameStateRef.current;

    // Update ball position
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Wall collision
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.velocityY = -ball.velocityY;
    }

    // Paddle collision
    const playerCollision = collision(ball, paddle.player, 0);
    const computerCollision = collision(ball, paddle.computer, canvas.width - paddle.width);

    if (playerCollision || computerCollision) {
      let collidePoint = ball.y - (playerCollision ? paddle.player.y : paddle.computer.y + paddle.height / 2);
      collidePoint = collidePoint / (paddle.height / 2);
      let angleRad = (Math.PI / 4) * collidePoint;
      let direction = playerCollision ? 1 : -1;
      ball.velocityX = direction * ball.speed * Math.cos(angleRad);
      ball.velocityY = ball.speed * Math.sin(angleRad);
      ball.speed += 0.1;

      // Create particles on paddle hit
      gameStateRef.current.particles = [
        ...particles,
        ...createParticles(ball.x, ball.y, 10)
      ];
    }

    // AI paddle movement
    paddle.computer.y += (ball.y - (paddle.computer.y + paddle.height / 2)) * 0.1;
    // Prevent computer paddle from going through the sides
    paddle.computer.y = Math.max(0, Math.min(canvas.height - paddle.height, paddle.computer.y));

    // Score update
    if (ball.x - ball.radius < 0) {
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
      resetBall();
    }

    // Update particles
    gameStateRef.current.particles = particles
      .map(p => ({
        ...p,
        x: p.x + p.speedX,
        y: p.y + p.speedY,
        life: p.life - 1
      }))
      .filter(p => p.life > 0);
  };

  const resetBall = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { ball } = gameStateRef.current;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
  };

  const collision = (ball, player, paddleX) => {
    return ball.y + ball.radius > player.y &&
           ball.y - ball.radius < player.y + gameStateRef.current.paddle.height &&
           (paddleX === 0 ? ball.x - ball.radius < gameStateRef.current.paddle.width : ball.x + ball.radius > paddleX);
  };

  const handleTouchMove = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scale = canvas.height / rect.height;
    const touch = e.touches[0];
    const touchY = (touch.clientY - rect.top) * scale;
    gameStateRef.current.paddle.player.y = Math.max(0, Math.min(canvas.height - gameStateRef.current.paddle.height, touchY - gameStateRef.current.paddle.height / 2));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div 
        className="w-full max-w-lg aspect-[4/3]"
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchMove}
      >
        <PongCanvas
          ref={canvasRef}
          gameState={gameStateRef.current}
        />
      </div>
      <PongScoreboard score={score} />
      <Button
        className="px-4 py-2 bg-[#c24d2c] text-[#d9dad7] rounded hover:bg-[#d9dad7] hover:text-[#1a2639] transition-colors"
        onClick={() => setGameStarted(!gameStarted)}
      >
        {gameStarted ? 'Pause' : 'Start'}
      </Button>
    </div>
  );
};

export default PongGame;
