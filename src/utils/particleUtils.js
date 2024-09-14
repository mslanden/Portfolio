export const createParticles = (x, y, count) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  return Array.from({ length: count }, () => ({
    x,
    y,
    size: Math.random() * 10 + 8, // Increased size range
    speedX: Math.random() * 8 - 4,
    speedY: Math.random() * 8 - 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 100 // Increased life for longer-lasting particles
  }));
};

export const createExplosion = (x, y) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  return Array.from({ length: 60 }, () => ({
    x,
    y,
    size: Math.random() * 15 + 10, // Larger explosion particles
    speedX: (Math.random() - 0.5) * 25,
    speedY: (Math.random() - 0.5) * 25,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 150
  }));
};
