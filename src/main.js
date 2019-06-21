'use strict';

// Reactor position.
const COL_MARGIN = 5;
const ROW_MARGIN = 5;
const TILE_SIZE = 20;

// Heat-related constants.
const MAX_HEAT = 1000;

// History graph.
const MAX_HISTORY_ENTRIES = 320;

// Dimensions.
let gridWidth, gridHeight;
let offsetX, offsetY;

// Simulation state.
let tiles, heat, neutrons;
let selected = 2;
let controlRods = false;
let history = true;
let paused = false;
let thermal = false;

// Graphics buffers.
let tileLayer, thermalLayer, neutronLayer, historyLayer;

// DOM elements.
let itemName, itemDesc;

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
  historyLayer = new HistoryLayer(MAX_HISTORY_ENTRIES, 180);

  // Cache DOM elements.
  itemName = document.getElementById('item-name');
  itemDesc = document.getElementById('item-desc');

  // Update selected item indicator on the sidebar.
  updateItemInfo();
}

function draw() {
  background(34);

  // Update neutrons.
  neutronLayer.redraw(neutrons, n => {
    if (!paused) {
      // Update position.
      n.update();

      // Interact with nearest tile.
      const { col, row } = n.nearestTile();
      const value = tiles.get(col, row);
      const tileType = TILES[value];
      if (tileType && typeof tileType.interact === 'function') {
        tileType.interact(n, col, row, heat, neutrons);
      }
    }
  });

  if (!paused) {
    // Spontaneously generate neutrons.
    spontaneousNeutrons();

    // Update history.
    historyLayer.add(neutrons.length);
  }

  // Draw graphics buffers.
  if (thermal) {
    thermalLayer.redraw(heat);
    thermalLayer.image(offsetX, offsetY);
  } else {
    tileLayer.image(offsetX, offsetY);
    neutronLayer.image(offsetX, offsetY);
  }
  if (history) {
    historyLayer.redraw();
    historyLayer.image(0, 0);
  }

  // Draw when mouse is pressed.
  if (mouseIsPressed) {
    mouseDraw();
  }
}

function keyPressed() {
  // Select neutron or tile type to draw.
  const num = parseInt(key) - 1;
  if (!isNaN(num) && num < TILES.length) {
    selected = num;
    updateItemInfo();
  } else {
    switch (key) {
      case ' ':
        // Toggle pause state.
        paused = !paused;
        break;
      case 'h':
        // Toggle neutron history visualization.
        history = !history;
        break;
      case 'q':
        // Toggle control rods.
        controlRods = !controlRods;
        tileLayer.redraw(tiles);
        break;
      case 'r':
        // Completely reset the simulation.
        reset();
        break;
      case 't':
        // Toggle thermal view.
        thermal = !thermal;
        break;
      case 'z':
        // Reset neutrons and heat and clear history.
        resetHeat();
        break;
    }
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

  // Check if drawing a neutron or tile.
  if (selected < 0) {
    // Spawn a neutron at the mouse position.
    neutrons.push(new Neutron(x, y));
  } else {
    // Update tile grid.
    const { col, row } = nearestTile(x, y);
    tiles.set(col, row, selected);
    tileLayer.redraw(tiles);
  }
}

// Completely reset the simulation.
function reset() {
  tiles.clear();
  tileLayer.redraw(tiles);
  resetHeat();
  paused = false;
  thermal = false;
}

// Reset heat, kill all neutrons, and clear neutron history.
function resetHeat() {
  heat.clear();
  neutrons = [];
  historyLayer.clear();
}

// Randomly generate neutrons from fuel cells.
function spontaneousNeutrons() {
  for (let row = 0; row < tiles.rows; row++) {
    for (let col = 0; col < tiles.cols; col++) {
      const tileType = tiles.get(col, row);
      if (tileType === 2 && Math.random() < SPONT_RATE) {
        // Generate neutron at random coordinate inside the tile.
        const { x, y } = randomInsideTile(col, row);
        neutrons.push(new Neutron(x, y));

        // Increase heat at tile.
        heat.increase(col, row, SPONT_HEAT);
      }
    }
  }
}

// Update the selected item indicator on the sidebar.
function updateItemInfo() {
  let name, desc;
  if (selected < 0) {
    name = 'Neutron';
    desc = 'Reacts with fuel cells.';
  } else {
    const tileType = TILES[selected];
    name = tileType.name;
    desc = tileType.desc;
  }

  // Update DOM elements.
  itemName.innerHTML = name;
  itemDesc.innerHTML = desc;
}
