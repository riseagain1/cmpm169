class SpinningRectangle {
  constructor(x, y, w, h, img = null) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = img;
    this.angle = 0;
    this.speed = 0;
    this.maxSpeed = 5; // Speed at which the content is shown
  }

  update() {
    if (mouseIsPressed && this.isMouseOver()) {
      this.speed += 0.1; // Acceleration
    } else {
      this.speed -= 0.2; // Deceleration
    }
    this.speed = constrain(this.speed, 0, 10); // Constrain the speed
    this.angle += this.speed;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.angle));
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);

    if (this.speed >= this.maxSpeed) {
      if (this.image) {
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
      } else {
        this.drawDesign();
      }
    }
    pop();
  }

  drawDesign() {
    // Draw a static design
    line(-this.width / 2, 0, this.width / 2, 0);
    line(0, -this.height / 2, 0, this.height / 2);
  }

  isMouseOver() {
    return mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 &&
           mouseY > this.y - this.height / 2 && mouseY < this.y + this.height / 2;
  }
}
