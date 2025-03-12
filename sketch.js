let DesertBackground;

function preload() {
  DesertBackground = loadImage("Billedere/DesertBackground.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  image(DesertBackground, 0, 0, width, height);
}
