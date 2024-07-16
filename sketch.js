let grad;
let back;
let wave;



function setup() {
  createCanvas(windowWidth, 6493);
}

function preload() {
  grad = loadImage('seagradient.png');
  back = loadImage('seaimage.png');
  wave = loadImage('waveimage.png');
}

function draw() {
  background(255); // Use a solid color background if needed, or remove this line if not
  image(back, 0, 0, windowWidth, 1080); // Draw 'back' covering the entire canvas
  image(grad, 0, 1050, windowWidth, height); // Draw 'grad' on top, covering the entire canvas
  blendMode(LIGHTEST); // Set blend mode to lighten
  tint(255, 200); // Apply transparency without changing color
  image(wave, 0, 500, windowWidth, 885); // Draw 'wave' on top of 'back', covering the entire canvas
  noTint(); // Remove transparency
  blendMode(BLEND); // Reset blend mode to default
}