import React, { useState, useEffect, useRef } from 'react';
import { createParticles, createExplosion } from '../utils/particleUtils';

const PongGame = () => {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState({ player: 0, computer: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;

    const paddle = {
      width: 10,
      height: 100,
      player: { y: canvas.height / 2 - 50 },
      computer: { y: canvas.height / 2 - 50 },
      speed: 7, // For player keyboard control
    };

    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 10, // Slightly larger for effect
      speed: 7,
      velocityX: 5,
      velocityY: 5,
    };

    let particles = [];
    let explosionParticles = [];

    const drawRect = (x, y, w, h, color) => {
      context.fillStyle = color;
      context.fillRect(x, y, w, h);
    };

    const drawBall = (x, y, r, color) => {
      // Simpler ball drawing without gradients or shadow effects
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, false);
      context.closePath();
      context.fill();
    };

    const drawText = (text, x, y, color) => {
      context.fillStyle = color;
      context.font = '45px Arial';
      context.fillText(text, x, y);
    };

    const collision = (b, p) => {
      return (
        b.y + b.radius > p.y &&
        b.y - b.radius < p.y + paddle.height &&
        b.x + b.radius > p.x &&
        b.x - b.radius < p.x + paddle.width
      );
    };

    const resetBall = () => {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.velocityX = -ball.velocityX;
      ball.speed = 7;
    };

    const update = () => {
      if (!gameStarted) return;

      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      // Top and bottom walls
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
      }

      // Determine which paddle is being hit
      let player = ball.x < canvas.width / 2 ? paddle.player : paddle.computer;

      // Check for paddle collision
      if (collision(ball, { x: ball.x < canvas.width / 2 ? 0 : canvas.width - paddle.width, y: player.y })) {
        let collidePoint = ball.y - (player.y + paddle.height / 2);
        collidePoint = collidePoint / (paddle.height / 2);
        let angleRad = (Math.PI / 4) * collidePoint;
        let direction = ball.x < canvas.width / 2 ? 1 : -1;

        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        ball.speed += 0.1;

        // Create particles on collision
        particles = particles.concat(createParticles(ball.x, ball.y, 20));
      }

      // Move computer paddle with difficulty adjustments
      let computerSpeed = 0.07 + Math.random() * 0.03; // Some randomness
      paddle.computer.y += (ball.y - (paddle.computer.y + paddle.height / 2)) * computerSpeed;

      // Update score and create explosion
      if (ball.x - ball.radius < 0) {
        setScore(prevScore => ({ ...prevScore, computer: prevScore.computer + 1 }));
        explosionParticles = createExplosion(ball.x, ball.y);
        resetBall();
      } else if (ball.x + ball.radius > canvas.width) {
        setScore(prevScore => ({ ...prevScore, player: prevScore.player + 1 }));
        explosionParticles = createExplosion(ball.x, ball.y);
        resetBall();
      }

      // Update particles
      particles = particles.filter(particle => particle.life > 0).map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        life: particle.life - 1,
      }));

      // Update explosion particles
      explosionParticles = explosionParticles.filter(particle => particle.life > 0).map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        life: particle.life - 1,
      }));
    };

    const render = () => {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      drawRect(0, 0, canvas.width, canvas.height, '#000');

      // Draw paddles
      drawRect(0, paddle.player.y, paddle.width, paddle.height, '#fff');
      drawRect(canvas.width - paddle.width, paddle.computer.y, paddle.width, paddle.height, '#fff');

      // Draw ball without gradient or glow effect
      drawBall(ball.x, ball.y, ball.radius, '#00FFFF'); // Simpler ball with electric cyan color

      // Draw particles
      particles.forEach(particle => {
        drawCircle(particle.x, particle.y, particle.size, particle.color);
      });

      // Draw explosion particles
      explosionParticles.forEach(particle => {
        drawCircle(particle.x, particle.y, particle.size, particle.color);
      });

      // Draw score
      drawText(score.player, canvas.width / 4, canvas.height / 5, '#fff');
      drawText(score.computer, 3 * canvas.width / 4, canvas.height / 5, '#fff');
    };

    const gameLoop = () => {
      update();
      render();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      paddle.player.y = e.clientY - rect.top - paddle.height / 2;
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        paddle.player.y = Math.max(paddle.player.y - paddle.speed, 0);
      } else if (e.key === 'ArrowDown') {
        paddle.player.y = Math.min(paddle.player.y + paddle.speed, canvas.height - paddle.height);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('mousemove', handleMouseMove);

    if (gameStarted) {
      gameLoop();
    } else {
      cancelAnimationFrame(animationFrameId); // Stop animation when paused
      render(); // Render initial state
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted, score]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="border border-gray-300" />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setGameStarted(!gameStarted)}
      >
        {gameStarted ? 'Pause' : 'Start'}
      </button>
    </div>
  );
};

export default PongGame;
