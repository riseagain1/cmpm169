let particles = [];

function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  fill(255, 25);  
  rect(0, 0, width, height);
  particles.push(new Particle(width / 2, height / 2));

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.isOffScreen()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.color = color(0, 0, 0, 150); 
    this.angle = random(TWO_PI);
    this.size = random(2, 5); 
  }

  update() {
    this.pos.add(this.vel);
    this.angle += 0.05; 
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    stroke(this.color);
    strokeWeight(this.size); 
    point(0, 0);
    pop();
  }

  isOffScreen() {
    return (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height);
  }
}
