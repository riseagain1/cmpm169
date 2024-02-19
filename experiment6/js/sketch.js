let customFont;
let particles = [];
let word = "FOG";
let fontSize = 100;
let mouseProximityThreshold = 150; // How close the mouse needs to be to trigger the effect
let wordPosition;
let particleLimit = 1000; // Limit the total number of particles to control performance
let particleGenerationRate = 10; // How many particles to generate per frame when the mouse is close

function preload() {
  customFont = loadFont('Anta-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(customFont);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  wordPosition = createVector(width / 2, height / 2); // Position the word in the center
}

function draw() {
  background(0);

  let mousePosition = createVector(mouseX, mouseY);
  if (mousePosition.dist(wordPosition) < mouseProximityThreshold && particles.length < particleLimit) {
    for (let i = 0; i < particleGenerationRate; i++) {
      particles.push(new Particle(wordPosition.x + random(-50, 50), wordPosition.y + random(-50, 50)));
    }
  }

  // Efficiently update and display particles
  particles = particles.filter(particle => {
    particle.update();
    particle.show();
    return !particle.isFinished();
  });

  // Display the word conditionally
  if (particles.length < 500) {
    fill(255);
    noStroke();
    text(word, wordPosition.x, wordPosition.y);
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(1, 5));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 5;
  }

  show() {
    noStroke();
    fill(255, this.lifespan);
    ellipse(this.position.x, this.position.y, 4);
  }

  isFinished() {
    return this.lifespan < 0;
  }
}
