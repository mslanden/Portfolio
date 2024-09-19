import React, { useState, useEffect } from 'react';

const SparkleEffect = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const createSparkle = () => ({
      id: Math.random(),
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      size: Math.random() * 10 + 5 + 'px',
      animationDuration: Math.random() * 2 + 1 + 's'
    });

    const interval = setInterval(() => {
      setSparkles(prevSparkles => {
        const newSparkles = [...prevSparkles, createSparkle()];
        if (newSparkles.length > 50) {
          newSparkles.shift();
        }
        return newSparkles;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute rounded-full bg-white opacity-0 animate-sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            animationDuration: sparkle.animationDuration
          }}
        />
      ))}
    </div>
  );
};

export default SparkleEffect;