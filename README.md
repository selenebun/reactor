# reactor

A simple, unscientific nuclear reactor simulation.

## Controls

| Key         | Action               |
| :---------- | :------------------- |
| Mouse       | Draw tile.           |
| Spacebar    | Reset grid.          |
| Number keys | Select tile to draw. |
| Q           | Toggle control rods. |
| Z           | Clear all neutrons.  |

## Tile Types

| Tile    | Description                                                |
| :------ | :--------------------------------------------------------- |
| 1       | **Empty tiles** do nothing.                                |
| 2       | **Fuel cells** react with neutrons.                        |
| 3       | **Moderator** tiles slow down neutrons.                    |
| 4       | **Shielding** absorbs neutrons.                            |
| 5 and 6 | **Reflectors** reflect neutrons in a particular direction. |
| 7       | **Control rods** absorb neutrons only when toggled.        |
