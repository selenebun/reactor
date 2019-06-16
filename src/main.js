'use strict';

// Reactor position.
const COL_MARGIN = 5;
const ROW_MARGIN = 5;
const TILE_SIZE = 20;

// Heat-related constants.
const MAX_HEAT = 1000;

// Dimensions.
let gridWidth, gridHeight;
let offsetX, offsetY;

// Simulation state.
let tiles, heat;
let thermal = false;

// Graphics buffers.
let tileLayer, thermalLayer;

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
  heat = new Grid(cols, rows);

  // Initialize graphics buffers.
  tileLayer = new TileLayer(gridWidth, gridHeight);
  tileLayer.redraw(tiles);
  thermalLayer = new ThermalLayer(gridWidth, gridHeight);
}

function draw() {
  background(34);

  // Draw graphics buffers.
  if (thermal) {
    thermalLayer.redraw(heat);
    thermalLayer.image(offsetX, offsetY);
  } else {
    tileLayer.image(offsetX, offsetY);
  }
}

function keyPressed() {
  switch (key) {
    case 't':
      // Toggle thermal view.
      thermal = !thermal;
      break;
  }
}
