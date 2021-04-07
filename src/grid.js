"use strict";

// Types of tiles within the reactor grid.
const Tile = {
    EMPTY: {
        name: "Empty Tile",
        description: "Does nothing.",
        color: "#bbb",
    },
    FUEL: {
        name: "Fuel Cell",
        description: "Reacts with neutrons.",
        color: "#83cc14",
        interact(n, col, row) {
            // Randomly absorb neutrons.
            if (Math.random() < FUEL_ABSORB_CHANCE) {
                n.dead = true;

                // Spawn more neutrons.
                const count = Math.floor(random(
                    FUEL_MIN_NEUTRONS,
                    FUEL_MAX_NEUTRONS + 1
                ));
                for (let i = 0; i < count; ++i) {
                    const { x, y } = randomInsideTile(col, row);
                    neutrons.push(new Neutron(x, y));
                }
            }
        }
    },
};

// A 2D grid of tiles.
class Grid {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.grid = new Array(cols * rows).fill(Tile.EMPTY);

        // Calculate offset.
        this.width = cols * TILE_SIZE;
        this.height = rows * TILE_SIZE;
        this.offsetX = (width - this.width) / 2;
        this.offsetY = (height - this.height) / 2;

        // Graphics context.
        this.ctx = createGraphics(this.width, this.height);
        this.ctx.stroke('#111');
        this.redraw();
    }

    display() {
        image(this.ctx, this.offsetX, this.offsetY);
    }

    get(col, row) {
        return this.grid[row * this.cols + col];
    }

    redraw() {
        for (let row = 0; row < this.rows; ++row) {
            for (let col = 0; col < this.cols; ++col) {
                // Fill color based on tile type.
                const tile = this.get(col, row);
                this.ctx.fill(tile.color);

                // Draw the tile at the correct position.
                const x = col * TILE_SIZE;
                const y = row * TILE_SIZE;
                this.ctx.square(x, y, TILE_SIZE);
            }
        }
    }

    set(col, row, tile) {
        this.grid[row * this.cols + col] = tile;
    }
}
