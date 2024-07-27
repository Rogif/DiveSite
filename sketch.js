let grad;
let back;
let wave;
let divevideo;
let playing = false;
let numDepths = 5;
let fish = ["turtle.gif", "octopus.gif", "angler.gif", "lantern fish.png", "Tubeworms.png"];
let depthLabels = ["Sunlight Zone.png", "Midnight Zone.png", "Twilight Zone.png", "Abyss Zone.png", "Trenches Zone.png"];
let seaStartHeight = 1000;
let fishScale = 0.3;
let labelScale = 0.3;

function setup() {
  createCanvas(windowWidth, 6493);
  divevideo.hide();
  divevideo.loop();
}

function preload() {
  divevideo = createVideo(['divevideo.mp4']);
  fishImages = [];
  for (let i = 0; i < fish.length; i++) {
    fishImages.push(loadImage(fish[i]));
  }
  labelImages = [];
  for (let i = 0; i < depthLabels.length; i++) {
    labelImages.push(loadImage("meter/" + depthLabels[i]));
  }
}

function draw() {
  background(200); // Set the background color to black
  image(divevideo, 0, 0, width, height); // Draw the divevideo at the top left corner of the canvas

  for (let i = 0; i < numDepths; i++) {
    let depth = map(i, 0, numDepths, seaStartHeight, height); // Map the depth to a y-coordinate
    let fishIndex = i % fish.length; // Calculate the index of the fish to display
    image(fishImages[fishIndex], width / 2, depth, width * fishScale, (height - seaStartHeight) * fishScale, 0, 0, fishImages[fishIndex].width, fishImages[fishIndex].height, CONTAIN); // Draw the fish at the current depth
    image(labelImages[i], 0, depth, width * labelScale, (height - seaStartHeight) * labelScale, 0, 0, labelImages[i].width, labelImages[i].height, CONTAIN); // Draw the label at the
  }


  // Torch effect
  let opacity = map(mouseY, 0, height, 0, 255); // Map mouseY to opacity values
  fill(255, 255, 0, opacity); // Set fill color to yellow with dynamic opacity
  noStroke(); // No border for the circle
  ellipse(mouseX, mouseY, 273, 273); // Draw the yellow circle at the mouse position
}

function mousePressed() {
  divevideo.loop(); // Loop the divevideo when the mouse is pressed
}

function mouseMoved() {
  if (!playing) {
    divevideo.loop();
    playing = true;
  }
}