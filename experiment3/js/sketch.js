let rectangles = [];
let numRectangles = 5; // Total number of rectangles

function preload() {
  // Load images for some rectangles
  for (let i = 0; i < numRectangles / 2; i++) {
    let img = loadImage('image' + i + '.png'); // Load your images
    rectangles.push(new SpinningRectangle(width / (numRectangles + 1) * (i + 1), height / 2, 100, 100, img));
  }
}

function setup() {
  createCanvas(800, 600);
  // Create additional rectangles with static designs
  for (let i = Math.floor(numRectangles / 2); i < numRectangles; i++) {
    rectangles.push(new SpinningRectangle(width / (numRectangles + 1) * (i + 1), height / 2, 100, 100));
  }
}

function draw() {
  background(255);
  for (let rect of rectangles) {
    rect.update();
    rect.display();
  }
}
