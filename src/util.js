'use strict';

// Convert a heatmap value into an HSL color.
function heatmapColor(value) {
  return [(1 - value / MAX_HEAT) * 240, 100, 50];
}

// Find the nearest tile to a particular coordinate. This is relative to the
// tile grid, so an offset must be applied if using global coordinates.
function nearestTile(x, y) {
  return {
    col: Math.floor(x / TILE_SIZE),
    row: Math.floor(y / TILE_SIZE),
  };
}

// Get a random coordinate inside a tile.
function randomInsideTile(col, row) {
  return {
    x: (col + Math.random()) * TILE_SIZE,
    y: (row + Math.random()) * TILE_SIZE,
  };
}

// Get a random integer between two values, inclusive.
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min;
}
