import React, { useState, useEffect, useRef } from 'react';
import { createParticles } from '../utils/particleUtils';

const PongGame = () => {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    const paddle = {
      width: 10,
      height: 100,
      player: { y: 150 },
      computer: { y: 150 },
    };

    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 5,
      speed: 7,
      velocityX: 5,
      velocityY: 5,
    };

    const drawRect = (x, y, w, h, color) => {
      context.fillStyle = color;
      context.fillRect(x, y, w, h);
    };

    const drawCircle = (x, y, r, color) => {
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

    const render = () => {
      drawRect(0, 0, canvas.width, canvas.height, '#000');
      drawRect(0, paddle.player.y, paddle.width, paddle.height, '#fff');
      drawRect(canvas.width - paddle.width, paddle.computer.y, paddle.width, paddle.height, '#fff');
      drawCircle(ball.x, ball.y, ball.radius, '#fff');
      drawText(score.player, canvas.width / 4, canvas.height / 5, '#fff');
      drawText(score.computer, 3 * canvas.width / 4, canvas.height / 5, '#fff');

      particles.forEach(particle => {
        drawCircle(particle.x, particle.y, particle.size, particle.color);
      });
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
      if (gameStarted) {
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;

        // Top and bottom walls
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
          ball.velocityY = -ball.velocityY;
        }

        // Determine which paddle is being hit
        let player = (ball.x < canvas.width / 2) ? paddle.player : paddle.computer;

        // Check for paddle collision
        if (collision(ball, {
          x: (ball.x < canvas.width / 2) ? 0 : canvas.width - paddle.width,
          y: player.y,
        })) {
          let collidePoint = ball.y - (player.y + paddle.height / 2);
          collidePoint = collidePoint / (paddle.height / 2);
          
          let angleRad = (Math.PI / 4) * collidePoint;
          let direction = (ball.x < canvas.width / 2) ? 1 : -1;
          
          ball.velocityX = direction * ball.speed * Math.cos(angleRad);
          ball.velocityY = ball.speed * Math.sin(angleRad);
          
          ball.speed += 0.1;

          // Create particles on collision
          const newParticles = createParticles(ball.x, ball.y, '#fff', 20);
          setParticles(prevParticles => [...prevParticles, ...newParticles]);
        }

        // Move computer paddle
        paddle.computer.y += (ball.y - (paddle.computer.y + paddle.height / 2)) * 0.1;

        // Update score
        if (ball.x - ball.radius < 0) {
          setScore(prevScore => ({ ...prevScore, computer: prevScore.computer + 1 }));
          resetBall();
        } else if (ball.x + ball.radius > canvas.width) {
          setScore(prevScore => ({ ...prevScore, player: prevScore.player + 1 }));
          resetBall();
        }

        // Update particles
        setParticles(prevParticles => 
          prevParticles
            .map(particle => ({
              ...particle,
              x: particle.x + particle.speedX,
              y: particle.y + particle.speedY,
              life: particle.life - 1
            }))
            .filter(particle => particle.life > 0)
        );
      }
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

    canvas.addEventListener('mousemove', handleMouseMove);

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gameStarted, score, particles]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={700} height={400} className="border border-gray-300" />
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
