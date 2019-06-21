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
