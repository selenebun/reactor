"use strict";

class Neutron {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(NEUTRON_SPEED);
        this.dead = false;
    }

    display(offsetX, offsetY) {
        fill("#1f33995f");
        noStroke();
        circle(this.pos.x + offsetX, this.pos.y + offsetY, NEUTRON_SIZE);
    }

    update(maxWidth, maxHeight) {
        // Update position.
        this.pos.add(this.vel);

        // Kill if outside bounds.
        if (
            this.pos.x + NEUTRON_SIZE < 0 ||
            this.pos.y + NEUTRON_SIZE < 0 ||
            this.pos.x - NEUTRON_SIZE > maxWidth ||
            this.pos.y - NEUTRON_SIZE > maxHeight
        ) {
            this.dead = true;
        }
    }
}
