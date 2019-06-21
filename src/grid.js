'use strict';

// A 2D grid of tiles.
class Grid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.arr = new Array(cols * rows).fill(0);
  }

  // Return a list of all tiles adjacent to the current one.
  adjacent(col, row) {
    const adj = [];
    for (let dy = -1; dy < 2; dy++) {
      // Skip out-of-bounds coordinates.
      if (row + dy < 0 || row + dy >= this.rows) {
        continue;
      }

      for (let dx = -1; dx < 2; dx++) {
        // Skip out-of-bounds coordinates as well as the center.
        if (col + dx < 0 || col + dx >= this.cols || (dx === 0 && dy === 0)) {
          continue;
        }

        // Add the tile to the list.
        adj.push({
          col: col + dx,
          row: row + dy,
        });
      }
    }
    return adj;
  }

  // Reset all values to 0.
  clear() {
    this.arr.fill(0);
  }

  // Get the value at a particular row and column.
  get(col, row) {
    return this.arr[this.cols * row + col];
  }

  // Increase the value at a particular row and column.
  increase(col, row, amount) {
    this.arr[this.cols * row + col] += amount;
  }

  // Set the value at a particular row and column.
  set(col, row, value) {
    this.arr[this.cols * row + col] = value;
  }
}
