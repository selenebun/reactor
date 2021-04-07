// Types of tiles within the reactor grid.
const Tile = {
    EMPTY: {
        color: "#bbb"
    }
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
    }

    display() {
        for (let row = 0; row < this.rows; ++row) {
            for (let col = 0; col < this.cols; ++col) {
                // Fill color based on tile type.
                const tile = this.get(col, row);
                fill(tile.color);

                // Draw the tile at the correct position.
                const x = col * TILE_SIZE;
                const y = row * TILE_SIZE;
                square(this.offsetX + x, this.offsetY + y, TILE_SIZE);
            }
        }
    }

    get(col, row) {
        return this.grid[row * this.cols + col];
    }

    set(col, row, tile) {
        this.grid[row * this.cols + col] = tile;
    }
}
