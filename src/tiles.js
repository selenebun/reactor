// Spontaneous neutron generation.
const SPONT_RATE = 0.002;
const SPONT_HEAT = 4;

// Data for tiles.
const TILES = [
  {
    name: 'Empty Tile',
    desc: 'Does nothing.',
    color: 204,
    coolingRate: 0.001,
    interact(_n, col, row, heat, _neutrons) {
      heat.increase(col, row, 1);
    },
  },
  {
    name: 'Moderator',
    desc: 'Slows down neutrons.',
    color: 250,
    coolingRate: 0.03125,
    interact(n, col, row, heat, _neutrons) {
      n.slowDown();
      heat.increase(col, row, 2);
    },
  },
  {
    name: 'Fuel Cell',
    desc: 'Reacts with neutrons.',
    color: [137, 204, 20],
    coolingRate: 0.001,
    interact(n, col, row, heat, neutrons) {
      // Randomly absorb neutrons and react.
      if (Math.random() < 0.05) {
        n.kill();
        heat.increase(col, row, 40);

        // Spawn more neutrons.
        const count = randomInt(1, 2);
        for (let i = 0; i < count; i++) {
          const { x, y } = randomInsideTile(col, row);
          neutrons.push(new Neutron(x, y));
        }
      }
    },
  },
  {
    name: 'Coolant',
    desc: 'Absorbs excess heat.',
    color: [71, 207, 235],
    coolingRate: 0.125,
  },
  {
    name: 'Reflector',
    desc: 'Reflects neutrons in the horizontal direction.',
    color: [255, 213, 0],
    coolingRate: 0.02,
    interact(n, col, row, heat, _neutrons) {
      // Randomly reflect neutrons.
      const r = Math.random();
      if (r < 0.55) {
        n.vel.x *= -1;
        heat.increase(col, row, 2);
      } else if (r < 0.85) {
        n.kill();
        heat.increase(col, row, 4);
      }
    },
  },
  {
    name: 'Reflector',
    desc: 'Reflects neutrons in the vertical direction.',
    color: [230, 122, 0],
    coolingRate: 0.02,
    interact(n, col, row, heat, _neutrons) {
      // Randomly reflect neutrons.
      const r = Math.random();
      if (r < 0.55) {
        n.vel.y *= -1;
        heat.increase(col, row, 2);
      } else if (r < 0.85) {
        n.kill();
        heat.increase(col, row, 4);
      }
    },
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
    coolingRate: 0.03125,
    interact(n, col, row, heat, _neutrons) {
      // Absorb neutrons only when control rods are activated.
      if (controlRods && Math.random() < 0.5) {
        n.kill();
        heat.increase(col, row, 4);
      }
    },
  },
  {
    name: 'Absorber',
    desc: 'Absorbs neutrons.',
    color: 140,
    coolingRate: 0.002,
    interact(n, col, row, heat, _neutrons) {
      if (Math.random() < 0.8) {
        n.kill();
        heat.increase(col, row, 6);
      }
    },
  },
];
