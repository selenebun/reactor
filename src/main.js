// Grid dimensions.
const HORIZONTAL_MARGIN = 6;
const VERTICAL_MARGIN = 5;
const TILE_SIZE = 30;

// Simulation state.
let tiles;

function setup() {
    // Position the canvas.
    const div = document.getElementById("sketch");
    const canvas = createCanvas(div.offsetWidth, div.offsetHeight);
    canvas.parent(div);

    // Initialize tile grid.
    const cols = Math.floor(width / TILE_SIZE) - HORIZONTAL_MARGIN * 2;
    const rows = Math.floor(height / TILE_SIZE) - VERTICAL_MARGIN * 2;
    tiles = new Grid(cols, rows);
}

function draw() {
    background("#111");

    // Display tile grid.
    tiles.display();
}
