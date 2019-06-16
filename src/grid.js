'use strict';

// A 2D grid of tiles.
class Grid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.arr = new Array(cols * rows).fill(0);
  }

  // Reset all values to 0.
  clear() {
    this.arr.fill(0);
  }

  // Get the value at a particular row and column.
  get(col, row) {
    return this.arr[this.cols * row + col];
  }

  // Set the value at a particular row and column.
  set(col, row, value) {
    this.arr[this.cols * row + col] = value;
  }
}
