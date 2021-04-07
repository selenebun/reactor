"use strict";

// Grid dimensions.
const HORIZONTAL_MARGIN = 6;
const VERTICAL_MARGIN = 5;
const TILE_SIZE = 30;

// Fuel parameters.
const SPONTANEOUS_CHANCE = 0.002;

// Neutron parameters.
const NEUTRON_SIZE = 5;
const NEUTRON_SPEED = 3;

// DOM elements.
const tileName = document.getElementById("name");
const tileDescription = document.getElementById("description");

// Draw state.
let selectedTile;

// Simulation state.
const neutrons = [];
let tiles;

function setup() {
    // Position the canvas.
    const div = document.getElementById("sketch");
    const canvas = createCanvas(div.offsetWidth, div.offsetHeight);
    canvas.parent(div);

    // Update DOM elements.
    updateTile(Tile.FUEL);

    // Set drawing mode.
    ellipseMode(RADIUS);

    // Initialize tile grid.
    const cols = Math.floor(width / TILE_SIZE) - HORIZONTAL_MARGIN * 2;
    const rows = Math.floor(height / TILE_SIZE) - VERTICAL_MARGIN * 2;
    tiles = new Grid(cols, rows);
}

function draw() {
    background("#111");

    // Display tile grid.
    tiles.display();

    // Update neutrons.
    for (const n of neutrons) {
        n.update(tiles.width, tiles.height);
        n.display(tiles.offsetX, tiles.offsetY);
    }

    // Generate spontaneous neutrons.
    spontaneousNeutrons();

    // Remove dead neutrons.
    for (let i = neutrons.length - 1; i >= 0; --i) {
        if (neutrons[i].dead) {
            neutrons.splice(i, 1);
        }
    }

    // Draw when mouse is pressed.
    if (mouseIsPressed) {
        mouseDraw();
    }
}

function keyPressed() {
    // Select tile type to draw.
    switch (key) {
        case "1":
            updateTile(Tile.EMPTY);
            break;
        case "2":
            updateTile(Tile.FUEL);
            break;
    }
}

function mouseDraw() {
    // Adjust for tile offset.
    const x = mouseX - tiles.offsetX;
    const y = mouseY - tiles.offsetY;

    // Don't draw outside the grid.
    if (x < 0 || y < 0 || x > tiles.width || y > tiles.height) {
        return;
    }

    // Update the tile grid.
    const { col, row } = nearestTile(x, y);
    tiles.set(col, row, selectedTile);
    tiles.redraw();
}

// Find the nearest tile to a particular coordinate relative to the tile grid.
function nearestTile(x, y) {
    return {
        col: Math.floor(x / TILE_SIZE),
        row: Math.floor(y / TILE_SIZE)
    };
}

// Get random coordinates within a given tile.
function randomInsideTile(col, row) {
    return {
        x: (col + Math.random()) * TILE_SIZE,
        y: (row + Math.random()) * TILE_SIZE
    };
}

// Randomly generate spontaneous neutrons from fuel cells.
function spontaneousNeutrons() {
    for (let row = 0; row < tiles.rows; ++row) {
        for (let col = 0; col < tiles.cols; ++col) {
            const tile = tiles.get(col, row);
            if (tile === Tile.FUEL && Math.random() < SPONTANEOUS_CHANCE) {
                // Generate neutrons at random coordinates inside the tile.
                const { x, y } = randomInsideTile(col, row);
                neutrons.push(new Neutron(x, y));
            }
        }
    }
}

// Update the currently selected tile.
function updateTile(tile) {
    // Update selected tile.
    selectedTile = tile;

    // Update HTML.
    const { name, description } = tile;
    tileName.innerHTML = name;
    tileDescription.innerHTML = description;
}
