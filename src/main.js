'use strict';

// Reactor position.
const COL_MARGIN = 5;
const ROW_MARGIN = 5;
const TILE_SIZE = 20;

// Dimensions.
let gridWidth, gridHeight;
let offsetX, offsetY;

// Simulation state.
let tiles;

// Graphics buffers.
let tileLayer;

function setup() {
  // Position canvas.
  const div = document.getElementById('sketch');
  const canvas = createCanvas(div.offsetWidth, div.offsetHeight);
  canvas.parent(div);
  resizeCanvas(div.offsetWidth, div.offsetHeight, true);

  // Calculate dimensions.
  const cols = Math.floor(width / TILE_SIZE) - COL_MARGIN * 2;
  const rows = Math.floor(height / TILE_SIZE) - ROW_MARGIN * 2;
  gridWidth = cols * TILE_SIZE;
  gridHeight = rows * TILE_SIZE;
  offsetX = (width - gridWidth) / 2;
  offsetY = (height - gridHeight) / 2;

  // Set up tiles.
  tiles = new Grid(cols, rows);

  // Initialize graphics buffers.
  tileLayer = new TileLayer(gridWidth, gridHeight);
  tileLayer.redraw(tiles);
}

function draw() {
  background(34);

  // Draw graphics buffers.
  tileLayer.image(offsetX, offsetY);
}
