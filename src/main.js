'use strict';

function setup() {
  // Position canvas.
  const div = document.getElementById('sketch');
  const canvas = createCanvas(div.offsetWidth, div.offsetHeight);
  canvas.parent(div);
  resizeCanvas(div.offsetWidth, div.offsetHeight);
}
