import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { createParticles, createExplosion } from '../utils/particleUtils';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

const PongGame = () => {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState({ player: 0, computer: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    const paddle = {
      width: 10,
      height: 100,
      player: { y: CANVAS_HEIGHT / 2 - 50 },
      computer: { y: CANVAS_HEIGHT / 2 - 50 },
      speed: 7,
    };

    const ball = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      radius: 5,
      speed: 7,
      velocityX: 5,
      velocityY: 5,
    };

    let particles = [];
    let explosions = [];

    const update = () => {
      if (!gameStarted) return;

      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      // Top and bottom walls
      if (ball.y + ball.radius > CANVAS_HEIGHT || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
      }

      // Determine which paddle is being hit
      let player = ball.x < CANVAS_WIDTH / 2 ? paddle.player : paddle.computer;

      // Check for paddle collision
      if (collision(ball, { x: ball.x < CANVAS_WIDTH / 2 ? 0 : CANVAS_WIDTH - paddle.width, y: player.y, width: paddle.width, height: paddle.height })) {
        let collidePoint = ball.y - (player.y + paddle.height / 2);
        collidePoint = collidePoint / (paddle.height / 2);
        let angleRad = (Math.PI / 4) * collidePoint;
        let direction = ball.x < CANVAS_WIDTH / 2 ? 1 : -1;

        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        ball.speed += 0.1;

        // Create particles on collision
        particles = particles.concat(createParticles(ball.x, ball.y, 20));
      }

      // Move computer paddle
      paddle.computer.y += (ball.y - (paddle.computer.y + paddle.height / 2)) * 0.1;

      // Update score and create explosion
      if (ball.x - ball.radius < 0) {
        setScore(prevScore => ({ ...prevScore, computer: prevScore.computer + 1 }));
        explosions.push(createExplosion(ball.x, ball.y));
        resetBall();
      } else if (ball.x + ball.radius > CANVAS_WIDTH) {
        setScore(prevScore => ({ ...prevScore, player: prevScore.player + 1 }));
        explosions.push(createExplosion(ball.x, ball.y));
        resetBall();
      }

      // Update particles and explosions
      particles = particles.filter(particle => particle.life > 0).map(updateParticle);
      explosions = explosions.filter(explosion => explosion.some(particle => particle.life > 0)).map(updateExplosion);
    };

    const render = () => {
      context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      context.fillStyle = '#000';
      context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      drawRect(0, paddle.player.y, paddle.width, paddle.height, '#fff');
      drawRect(CANVAS_WIDTH - paddle.width, paddle.computer.y, paddle.width, paddle.height, '#fff');
      drawCircle(ball.x, ball.y, ball.radius, '#fff');

      particles.forEach(particle => drawCircle(particle.x, particle.y, particle.size, particle.color));
      explosions.forEach(explosion => explosion.forEach(particle => drawCircle(particle.x, particle.y, particle.size, particle.color)));

      drawText(score.player, CANVAS_WIDTH / 4, CANVAS_HEIGHT / 5, '#fff');
      drawText(score.computer, 3 * CANVAS_WIDTH / 4, CANVAS_HEIGHT / 5, '#fff');
    };

    const gameLoop = () => {
      update();
      render();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scale = CANVAS_HEIGHT / rect.height;
      paddle.player.y = (e.clientY - rect.top) * scale - paddle.height / 2;
      paddle.player.y = Math.max(0, Math.min(CANVAS_HEIGHT - paddle.height, paddle.player.y));
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    if (gameStarted) {
      gameLoop();
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gameStarted, score]);

  const resetBall = () => {
    ball.x = CANVAS_WIDTH / 2;
    ball.y = CANVAS_HEIGHT / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
  };

  const drawRect = (x, y, w, h, color) => {
    const context = canvasRef.current.getContext('2d');
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
  };

  const drawCircle = (x, y, r, color) => {
    const context = canvasRef.current.getContext('2d');
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
  };

  const drawText = (text, x, y, color) => {
    const context = canvasRef.current.getContext('2d');
    context.fillStyle = color;
    context.font = '45px Arial';
    context.fillText(text, x, y);
  };

  const collision = (ball, player) => {
    return ball.y + ball.radius > player.y &&
           ball.y - ball.radius < player.y + player.height &&
           ball.x + ball.radius > player.x &&
           ball.x - ball.radius < player.x + player.width;
  };

  const updateParticle = particle => ({
    ...particle,
    x: particle.x + particle.speedX,
    y: particle.y + particle.speedY,
    life: particle.life - 1,
  });

  const updateExplosion = explosion => explosion.map(updateParticle);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border border-gray-300"
        style={{ width: '100%', maxWidth: `${CANVAS_WIDTH}px`, height: 'auto' }}
      />
      <Button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setGameStarted(!gameStarted)}
      >
        {gameStarted ? 'Pause' : 'Start'}
      </Button>
    </div>
  );
};

export default PongGame;
