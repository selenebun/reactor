'use strict';

// Graphics buffer for the tile grid.
class TileLayer {
  constructor(width, height) {
    // Create graphics buffer.
    this.graphics = createGraphics(width, height);

    // Misc. draw settings.
    this.graphics.fill(204);
    this.graphics.stroke(34);
  }

  // Draw the graphics buffer.
  image(offsetX, offsetY) {
    image(this.graphics, offsetX, offsetY);
  }

  // Render tiles to graphics buffer.
  redraw(tiles) {
    for (let row = 0; row < tiles.rows; row++) {
      for (let col = 0; col < tiles.cols; col++) {
        // Draw tile at the correct location.
        const x = col * TILE_SIZE;
        const y = row * TILE_SIZE;
        this.graphics.square(x, y, TILE_SIZE);
      }
    }
  }
}

// Graphics buffer for the thermal view.
class ThermalLayer {
  constructor(width, height) {
    // Create graphics buffer.
    this.graphics = createGraphics(width, height);

    // Misc. draw settings.
    this.graphics.colorMode(HSL);
    this.graphics.noStroke();
  }

  // Draw the graphics buffer.
  image(offsetX, offsetY) {
    image(this.graphics, offsetX, offsetY);
  }

  // Render tiles to graphics buffer.
  redraw(tiles) {
    for (let row = 0; row < tiles.rows; row++) {
      for (let col = 0; col < tiles.cols; col++) {
        // Color based on heatmap.
        const value = tiles.get(col, row);
        this.graphics.fill(heatmapColor(value));

        // Draw tile at the correct location.
        const x = col * TILE_SIZE;
        const y = row * TILE_SIZE;
        this.graphics.square(x, y, TILE_SIZE);
      }
    }
  }
}

// Graphics buffer for neutrons.
class NeutronLayer {
  constructor(width, height) {
    // Create graphics buffer.
    this.width = width;
    this.height = height;
    this.graphics = createGraphics(width, height);

    // Misc. draw settings.
    this.graphics.ellipseMode(RADIUS);
    this.graphics.fill(31, 51, 153, 63);
    this.graphics.noStroke();
  }

  // Draw the graphics buffer.
  image(offsetX, offsetY) {
    image(this.graphics, offsetX, offsetY);
  }

  // Render neutrons to the graphics buffer.
  redraw(neutrons, updateCallback) {
    // Clear graphics buffer.
    this.graphics.clear();

    for (let i = neutrons.length - 1; i >= 0; i--) {
      const n = neutrons[i];

      // Update and draw neutrons.
      updateCallback(n);
      n.draw(this.graphics);

      // Kill neutron if outside bounds.
      if (n.isOutsideBounds(this.width, this.height)) {
        n.kill();
      }

      // Delete neutrons that are no longer being used.
      if (!n.inUse) {
        neutrons.splice(i, 1);
      }
    }
  }
}
