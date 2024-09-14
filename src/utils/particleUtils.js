export const createParticles = (x, y, color, count) => {
  return Array.from({ length: count }, () => ({
    x,
    y,
    size: Math.random() * 3 + 1,
    speedX: Math.random() * 3 - 1.5,
    speedY: Math.random() * 3 - 1.5,
    color,
    life: 30
  }));
};
