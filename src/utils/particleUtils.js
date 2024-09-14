export class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = color;
    this.life = 30;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function createParticles(x, y, color, count) {
  return Array.from({ length: count }, () => new Particle(x, y, color));
}