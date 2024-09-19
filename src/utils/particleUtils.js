export const createParticles = (x, y, count) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  return Array.from({ length: count }, () => ({
    x,
    y,
    size: Math.random() * 3 + 1,
    speedX: Math.random() * 4 - 2,
    speedY: Math.random() * 4 - 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 30
  }));
};
