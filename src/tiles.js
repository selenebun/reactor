// Data for tiles.
const TILES = [
  {
    name: 'Empty Tile',
    desc: 'Does nothing.',
    color: 204,
  },
  {
    name: 'Moderator',
    desc: 'Slows down neutrons.',
    color: 250,
  },
  {
    name: 'Fuel Cell',
    desc: 'Reacts with neutrons.',
    color: [137, 204, 20],
  },
  {
    name: 'Coolant',
    desc: 'Absorbs excess heat.',
    color: [71, 207, 235],
  },
  {
    name: 'Reflector',
    desc: 'Reflects neutrons in the horizontal direction.',
    color: [255, 213, 0],
  },
  {
    name: 'Reflector',
    desc: 'Reflects neutrons in the vertical direction.',
    color: [230, 122, 0],
  },
  {
    name: 'Control Rod',
    desc: 'Absorbs neutrons only when activated.',
    color() {
      // Change color based on whether control rods are activated.
      if (controlRods) {
        return [102, 128, 255];
      } else {
        return [179, 102, 225];
      }
    },
  },
  {
    name: 'Absorber',
    desc: 'Absorbs neutrons.',
    color: 140,
  },
];
