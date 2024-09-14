export const createParticles = (x, y, count) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  return Array.from({ length: count }, () => ({
    x,
    y,
    size: Math.random() * 6 + 3, // Increased size range
    speedX: Math.random() * 6 - 3,
    speedY: Math.random() * 6 - 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 60 // Increased life for longer-lasting particles
  }));
};

export const createExplosion = (x, y) => {
  return Array.from({ length: 50 }, () => ({
    x,
    y,
    size: Math.random() * 8 + 4,
    speedX: (Math.random() - 0.5) * 15,
    speedY: (Math.random() - 0.5) * 15,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    life: 120
  }));
};
