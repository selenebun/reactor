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
