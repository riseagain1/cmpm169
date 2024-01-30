let particles = [];

function setup() {
  createCanvas(1000, 1000);
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
  }
}


class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.color = color(0, 0, 0, 150);
    this.angle = random(TWO_PI);
    this.size = random(2, 5);
    this.edgeDistance = 100; // Distance from edge to start applying force
  }

  update() {
    // Bounce off the edges
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }

    let edgeLeft = this.pos.x < this.edgeDistance;
    let edgeRight = this.pos.x > width - this.edgeDistance;
    let edgeTop = this.pos.y < this.edgeDistance;
    let edgeBottom = this.pos.y > height - this.edgeDistance;

    if (edgeLeft || edgeRight || edgeTop || edgeBottom) {
      let force = p5.Vector.sub(this.pos, createVector(width / 2, height / 2));
      force.rotate(HALF_PI); 
      force.setMag(0.2); 
      this.vel.add(force); 
    }

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
}


//Attribution: This code is partially created by ChatGPT
