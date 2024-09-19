import React, { useEffect, useRef } from 'react';

const MeteorEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Meteor {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
        this.tail = [];
        this.tailLength = Math.floor(Math.random() * 10) + 5;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        this.tail.unshift({ x: this.x, y: this.y });
        if (this.tail.length > this.tailLength) {
          this.tail.pop();
        }

        if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        for (let i = 0; i < this.tail.length; i++) {
          const point = this.tail[i];
          ctx.lineTo(point.x, point.y);
        }
        ctx.strokeStyle = this.color;
        ctx.stroke();
      }
    }

    const meteors = Array(20).fill().map(() => new Meteor());

    const animate = () => {
      ctx.fillStyle = 'rgba(26, 38, 57, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      meteors.forEach(meteor => {
        meteor.update();
        meteor.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10 pointer-events-none"
    />
  );
};

export default MeteorEffect;