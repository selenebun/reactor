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

// Graphics buffer for neutron history visualization.
class HistoryLayer {
  constructor(width, height) {
    // Create graphics buffer.
    this.width = width;
    this.height = height;
    this.graphics = createGraphics(width, height);

    // Initialize history entries.
    this.clear();

    // Misc. draw settings.
    this.graphics.noFill();
    this.graphics.strokeWeight(2);
  }

  // Add new neutron population entry.
  add(population) {
    // Cap number of history entries.
    if (this.total.length === this.width) {
      this.total.shift();
      this.average.shift();
    }

    // Add new data and recalculate average.
    this.total.push(population);
    this.average.push(this.total.reduce((a, b) => a + b) / this.total.length);

    // Update maximum value if the new value is greater.
    this.maximum = max(population, this.maximum);
  }

  // Clear all history entries.
  clear() {
    this.total = [];
    this.average = [];
    this.maximum = this.height / 5;
  }

  // Draw the graphics buffer.
  image(offsetX, offsetY) {
    image(this.graphics, offsetX, offsetY);
  }

  // Plot an array of history entries as a line graph.
  plot(entries) {
    this.graphics.beginShape();
    for (let i = 0; i < entries.length; i++) {
      const y = map(entries[i], 0, this.maximum, this.height, 0);
      this.graphics.vertex(this.width - entries.length + i, y);
    }
    this.graphics.endShape();
  }

  // Render neutrons to the graphics buffer.
  redraw(neutrons, updateCallback) {
    // Clear graphics buffer.
    this.graphics.clear();
    this.graphics.background(51, 127);

    // Plot the average and total neutron populations as a line graph.
    this.graphics.stroke(0, 213, 255);
    this.plot(this.average);
    this.graphics.stroke(255, 170, 0);
    this.plot(this.total);

    // Draw lines at borders.
    this.graphics.stroke(85);
    this.graphics.line(0, this.height, this.width, this.height);
    this.graphics.line(this.width, 0, this.width, this.height);
  }
}
