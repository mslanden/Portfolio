export const createParticles = (x, y, count) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  return Array.from({ length: count }, () => ({
    x,
    y,
    size: Math.random() * 8 + 5, // Increased size range
    speedX: Math.random() * 6 - 3,
    speedY: Math.random() * 6 - 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 80 // Increased life for longer-lasting particles
  }));
};

export const createExplosion = (x, y) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  return Array.from({ length: 50 }, () => ({
    x,
    y,
    size: Math.random() * 12 + 8, // Larger explosion particles
    speedX: (Math.random() - 0.5) * 20,
    speedY: (Math.random() - 0.5) * 20,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 120
  }));
};
