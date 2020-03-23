function Particle(x, y, vector, c, radius, firework) {
  this.pos = createVector(x, y)
  this.radius = radius
  this.lifespan = random(150, 350)
  this.gap = 10
  this.vel = vector


  this.c = c

  // this.vel.mult(random(2, 10))
  this.r = random(red(this.c) - this.gap, red(this.c) + this.gap)
  this.g = random(green(this.c) - this.gap, green(this.c) + this.gap)
  this.b = random(blue(this.c) - this.gap, blue(this.c) + this.gap)

  this.acc = createVector(0, 0)


  this.maxspeed = 80


  this.run = function() {
    this.applyForce(gravity)
    this.update()
    this.show()
  }

  this.show = function() {
    if (!firework) {
      strokeWeight(this.radius)
      stroke(this.r, this.g, this.b, this.lifespan)
      point(this.pos.x, this.pos.y)
    } else {
      strokeWeight(this.radius)
      stroke(255)
      point(this.pos.x, this.pos.y)
    }

  }

  this.update = function() {
    if (!firework) {
      this.vel.mult(0.9)
      this.lifespan -= 3
    }
    this.vel.add(this.acc)
    this.vel.limit(this.maxspeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  this.applyForce = function(force) {
    this.acc.add(force)
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true
    } else {
      return false
    }
  }
}
