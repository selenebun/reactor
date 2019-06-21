'use strict';

// A neutron particle.
class Neutron {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(3);
    this.radius = 4;
    this.inUse = true;
  }

  // Draw neutron to a graphics context.
  draw(ctx) {
    ctx.circle(this.pos.x, this.pos.y, this.radius);
  }

  // Check if neutron is out of bounds.
  isOutsideBounds(width, height) {
    return (
      this.pos.x + this.radius < 0 ||
      this.pos.y + this.radius < 0 ||
      this.pos.x - this.radius > width ||
      this.pos.y - this.radius > height
    );
  }

  // Kill neutron.
  kill() {
    this.inUse = false;
  }

  // Update current position.
  update() {
    this.pos.add(this.vel);
  }
}
