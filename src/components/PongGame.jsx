import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import PongCanvas from './PongCanvas';
import PongScoreboard from './PongScoreboard';
import { createParticles } from '../utils/particleUtils';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

const PongGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const gameStateRef = useRef({
    paddle: {
      width: 10,
      height: 100,
      player: { y: CANVAS_HEIGHT / 2 - 50 },
      computer: { y: CANVAS_HEIGHT / 2 - 50 },
      speed: 7,
    },
    ball: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      radius: 5,
      speed: 7,
      velocityX: 5,
      velocityY: 5,
    },
    particles: [],
  });

  useEffect(() => {
    if (!gameStarted) return;
    const intervalId = setInterval(updateGame, 1000 / 60); // 60 FPS
    return () => clearInterval(intervalId);
  }, [gameStarted]);

  const updateGame = () => {
    const { ball, paddle, particles } = gameStateRef.current;

    // Update ball position
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Wall collision
    if (ball.y + ball.radius > CANVAS_HEIGHT || ball.y - ball.radius < 0) {
      ball.velocityY = -ball.velocityY;
    }

    // Paddle collision
    let player = ball.x < CANVAS_WIDTH / 2 ? paddle.player : paddle.computer;
    if (collision(ball, player)) {
      let collidePoint = ball.y - (player.y + paddle.height / 2);
      collidePoint = collidePoint / (paddle.height / 2);
      let angleRad = (Math.PI / 4) * collidePoint;
      let direction = ball.x < CANVAS_WIDTH / 2 ? 1 : -1;
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
    paddle.computer.y = Math.max(0, Math.min(CANVAS_HEIGHT - paddle.height, paddle.computer.y));

    // Score update
    if (ball.x - ball.radius < 0) {
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      resetBall();
    } else if (ball.x + ball.radius > CANVAS_WIDTH) {
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
    const { ball } = gameStateRef.current;
    ball.x = CANVAS_WIDTH / 2;
    ball.y = CANVAS_HEIGHT / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
  };

  const collision = (ball, player) => {
    const { paddle } = gameStateRef.current;
    return ball.y + ball.radius > player.y &&
           ball.y - ball.radius < player.y + paddle.height &&
           (ball.x < CANVAS_WIDTH / 2 ? ball.x - ball.radius < paddle.width : ball.x + ball.radius > CANVAS_WIDTH - paddle.width);
  };

  const handleMouseMove = (e) => {
    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();
    const scale = CANVAS_HEIGHT / rect.height;
    const mouseY = (e.clientY - rect.top) * scale;
    gameStateRef.current.paddle.player.y = Math.max(0, Math.min(CANVAS_HEIGHT - gameStateRef.current.paddle.height, mouseY - gameStateRef.current.paddle.height / 2));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <PongCanvas
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        gameState={gameStateRef.current}
        handleMouseMove={handleMouseMove}
      />
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
