let checkerboard;
let bgImage;

function preload() {
  bgImage = loadImage('../img/board.png');
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
   generateCheckerboard(200, 10);
}

function draw() {
  background(220);
  
  ambientLight(60);
  const lx = map(mouseX, 0, width, -1, 1);
  const ly = map(mouseY, 0, height, -1, 1);
  directionalLight(255, 255, 255, lx, ly, -0.5);
  push(); 
  translate(-width / 2, -height / 2, -500); 
  imageMode(CORNER); 
  image(bgImage, 0, 0, width, height);
  pop(); 
  push();
  rotateY(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  texture(checkerboard);
  box(100);
  pop();
  drawShadow(lx, ly);
}


function drawShadow(lx, ly) {
  push();
  noStroke();
  fill(0, 75); 
  translate(0, 150, 0); 
  rotateX(HALF_PI);
  ellipse(lx * 50, ly * 50, 200 - ly * 50, 100 - lx * 50);
  pop();
}

function generateCheckerboard(size, squares) {
  checkerboard = createGraphics(size, size); 
  checkerboard.noStroke();
  for (let i = 0; i < squares; i++) {
    for (let j = 0; j < squares; j++) {
      checkerboard.fill((i + j) % 2 == 0 ? 255 : 0);
      checkerboard.rect(i * size / squares, j * size / squares, size / squares, size / squares);
    }
  }
}

//Attribution: Code above is partially created by ChatGPT