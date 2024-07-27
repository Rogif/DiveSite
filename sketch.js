let seaback;
let divevideo;
let playing = false;
let numDepths = 5;
let fish = ["turtle.gif", "octopus.gif", "angler.gif", "lantern fish.png", "Tubeworms.png"];
let depthLabels = ["Sunlight Zone.png", "Midnight Zone.png", "Twilight Zone.png", "Abyss Zone.png", "Trenches Zone.png"];
let popups = ["Sea turtles.png", "Octuopus.png", "Anglerfish.png", "Lanternfish.png", "Tube.png"];
let seaStartHeight = 1000;
let fishScale = 0.3;
let labelScale = 0.3;
let popupDisplaying = false;
let currentPopup = 0;
let soundOnImg, soundOffImg, seaSound;
let soundPlaying = false;


function setup() {
  createCanvas(windowWidth, 6493);
  //divevideo.hide();
  //divevideo.loop();
}

function preload() {
  seaback = loadImage("seaback.png");
  //divevideo = createVideo(['divevideo.mp4']);
  fishImages = [];
  for (let i = 0; i < fish.length; i++) {
    fishImages.push(loadImage(fish[i]));
  }
  labelImages = [];
  for (let i = 0; i < depthLabels.length; i++) {
    labelImages.push(loadImage("meter/" + depthLabels[i]));
  }
  popupImages = [];
  for (let i = 0; i < popups.length; i++) {
    popupImages.push(loadImage("popups/" + popups[i]));
  }
  flashlight = loadImage("flashlightinvertedclean.png");
  gradient = loadImage("blackgradient.png");

  // Load sound and sound control images
  seaSound = loadSound("seasound.mp3");
  soundOnImg = loadImage("soundon.png");
  soundOffImg = loadImage("soundoff.png");
}

function draw() {
  background(255);
  image(seaback, 0, 0, 1920, 6493); // Draw the divevideo at the top left corner of the canvas

  for (let i = 0; i < numDepths; i++) {
    let depth = map(i, 0, numDepths, seaStartHeight, height); // Map the depth to a y-coordinate
    let fishIndex = i % fish.length; // Calculate the index of the fish to display
    image(fishImages[fishIndex], width / 2, depth, width * fishScale, (height - seaStartHeight) * fishScale, 0, 0, fishImages[fishIndex].width, fishImages[fishIndex].height, CONTAIN); // Draw the fish at the current depth
  }

  gradientcopy = createImage(gradient.width, gradient.height);
  gradientcopy.copy(gradient, 0, 0, gradient.width, gradient.height, 0, 0, gradient.width, gradient.height);
  // Torch effect
  //let opacity = map(mouseY, 0, height, 0, 255); // Map mouseY to opacity values
  //fill(255, 255, 0, opacity); // Set fill color to yellow with dynamic opacity
  //noStroke(); // No border for the circle
  //torchEllipse = ellipse(mouseX, mouseY, 273, 273); // Draw the yellow circle at the mouse position
  if (mouseY > seaStartHeight) { // Check if the mouse is within the bounds of the flashlight
    gradientcopy.blend(flashlight, 0, 0, flashlight.width, flashlight.height, (mouseX / width) * gradientcopy.width - 200, (mouseY / height) * (gradientcopy.height + seaStartHeight) - 200 - seaStartHeight, flashlight.width, flashlight.height, BLEND); // Blend the flashlight with the gradient
  }


  blendMode(DARKEST);
  image(gradientcopy, 0, seaStartHeight, width, height - seaStartHeight);
  //blend(flashlight, 0, 0, flashlight.width, flashlight.height, mouseX - 136, mouseY - 136, 273, 273, MULTIPLY); // Blend the flashlight with
  blendMode(BLEND); // Set the blend mode to normal

  for (let i = 0; i < numDepths; i++) {
    let depth = map(i, 0, numDepths, seaStartHeight, height); // Map the depth to a y-coordinate
    let fishIndex = i % fish.length; // Calculate the index of the fish to display
    image(labelImages[i], 0, depth, width * labelScale, (height - seaStartHeight) * labelScale, 0, 0, labelImages[i].width, labelImages[i].height, CONTAIN); // Draw the label at the
  }

  if (popupDisplaying) {
    depth = map(currentPopup, 0, numDepths, seaStartHeight, height);
    image(popupImages[currentPopup], 0, depth);
  }

  // Display sound control image at the bottom right
  let img = soundPlaying ? soundOnImg : soundOffImg;
  image(img, 30, 60);

}

function mousePressed() {
  if (!popupDisplaying) {
    // Check if the mouse is within the bounds of a fish, and if so, display the corresponding popup
    for (let i = 0; i < numDepths; i++) {
      let depth = map(i, 0, numDepths, seaStartHeight, height); // Map the depth to a y-coordinate
      let fishIndex = i % fish.length; // Calculate the index of the fish to display
      if (mouseX > width / 2 && mouseX < width / 2 + width * fishScale && mouseY > depth && mouseY < depth + (height - seaStartHeight) * fishScale) {
        currentPopup = i;
        popupDisplaying = true;
      }
    }
  }
  else {

    popupDisplaying = false;
  }

  //function mouseMoved() {
  //if (!playing) {
  // divevideo.loop();
  // playing = true;
  // }

  // Check if the mouse is over the sound control image
  let img = soundPlaying ? soundOnImg : soundOffImg;
  let x = 30;
  let y = 60;
  if (mouseX > x && mouseX < x + img.width && mouseY > y && mouseY < y + img.height) {
    if (soundPlaying) {
      seaSound.stop();
    } else {
      seaSound.loop();
    }
    soundPlaying = !soundPlaying;
  }
}

