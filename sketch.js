let grad;
let back;
let wave;
let divevideo;

function setup() {
  createCanvas(windowWidth, 6493);
  divevideo = createVideo(['divevideo.mp4']);
  divevideo.loop(); // Loop the divevideo once when the program starts
}

function preload() {
  // No need to load the video here since it's already loaded in setup
}

function draw() {
  background(255); // Use a solid color background if needed, or remove this line if not
  image(divevideo, 0, 0, windowWidth, 6493); // Display the divevideo

  // Torch effect
  let opacity = map(mouseY, 0, height, 0, 255); // Map mouseY to opacity values
  fill(255, 255, 0, opacity); // Set fill color to yellow with dynamic opacity
  noStroke(); // No border for the circle
  ellipse(mouseX, mouseY, 273, 273); // Draw the yellow circle at the mouse position
}