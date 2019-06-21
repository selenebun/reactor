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
let tiles, heat, neutrons;
let paused = false;
let thermal = false;

// Graphics buffers.
let tileLayer, thermalLayer, neutronLayer;

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

  // Set up tiles and neutrons.
  tiles = new Grid(cols, rows);
  heat = new Grid(cols, rows);
  neutrons = [];

  // Initialize graphics buffers.
  tileLayer = new TileLayer(gridWidth, gridHeight);
  tileLayer.redraw(tiles);
  thermalLayer = new ThermalLayer(gridWidth, gridHeight);
  neutronLayer = new NeutronLayer(gridWidth, gridHeight);
}

function draw() {
  background(34);

  // Update neutrons.
  neutronLayer.redraw(neutrons, n => {
    if (!paused) {
      n.update();
    }
  });

  // Draw graphics buffers.
  if (thermal) {
    thermalLayer.redraw(heat);
    thermalLayer.image(offsetX, offsetY);
  } else {
    tileLayer.image(offsetX, offsetY);
    neutronLayer.image(offsetX, offsetY);
  }

  // Draw when mouse is pressed.
  if (mouseIsPressed) {
    mouseDraw();
  }
}

function keyPressed() {
  switch (key) {
    case ' ':
      // Toggle pause state.
      paused = !paused;
      break;
    case 't':
      // Toggle thermal view.
      thermal = !thermal;
      break;
  }
}

// Draw at the current mouse position.
function mouseDraw() {
  // Adjust for the reactor offset.
  const x = mouseX - offsetX;
  const y = mouseY - offsetY;

  // Don't draw if outside the grid.
  if (x < 0 || y < 0 || x > gridWidth || y > gridHeight) {
    return;
  }

  // Spawn a neutron at the mouse position.
  neutrons.push(new Neutron(x, y));
}
