# reactor

A simple nuclear reactor simulation made with the `p5.js` library.

You can run the simulation [here](https://rsaihe.github.io/reactor).

## Controls

| Key         | Action                                                                         |
| :---------- | :----------------------------------------------------------------------------- |
| Spacebar    | Pause the simulation.                                                          |
| Mouse       | Draw on the screen.                                                            |
| Number keys | Select what to draw. See [below](#item-types) for a more detailed description. |
| H           | Toggle neutron history visualization.                                          |
| T           | Toggle thermal view.                                                           |

### Item Types

| Key     | Description                                                                          |
| :------ | :----------------------------------------------------------------------------------- |
| 0       | **Neutrons** produce heat and react with fuel cells.                                 |
| 1       | **Empty tiles** do nothing.                                                          |
| 2       | **Moderator tiles** slow down neutrons, making them more likely to react.            |
| 3       | **Fuel cells** react with neutrons and produce large amounts of heat.                |
| 4       | **Coolant** helps to absorb excess heat.                                             |
| 5 and 6 | **Horizontal and vertical reflectors** reflect neutrons in the respective direction. |
| 7       | **Control rods** absorb neutrons only when activated.                                |
| 8       | **Neutron absorbers** absorb neutrons.                                               |
