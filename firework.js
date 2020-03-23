function Firework(x, y) {
  var ratio = height / 1334
  var value = -map(ratio, 1, 2, 1, 1.5) * 21

  this.radius = random(4,6)
  this.vel = createVector(0, random(value, value + 4))
  this.firework = new Particle(random(width), height, this.vel, color('#ffffff'), this.radius,true)
  this.exploded = false
  this.particles = []


  this.done = function() {
    if (this.exploded && this.particles.length === 0) {
      return true
    } else {
      return false
    }
  }

  this.run = function() {
    if (!this.exploded) {
      this.firework.applyForce(gravity)
      this.firework.update()
      this.firework.show()
      if (this.firework.vel.y >= 0) {
        explode.setVolume(random(0.05,0.1))
        explode.play()
        this.exploded = true
        this.explode()
      }
    } else {
      for (var i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(gravity)
        this.particles[i].update()
        this.particles[i].show()
        if (this.particles[i].done()) {
          this.particles.splice(i, 1)
        }
      }
    }

  }

  this.explode = function() {
    num++
    var img
    if(imgs.length>1){
      var index = floor(noise(frameCount/10000)*100)%imgs.length
      img = imgs[index]
    }else{
      img = imgs[0]
    }

    if (img) {
      var scl0 = scl * random(0.08, 0.25)
      var scl1 = scl0
      var scl2 = scl1 * 0.1
      for (var x = 0; x < w; x++)
        for (var y = 0; y < h; y++) {
          var index = (x + y * w) * 4

          var c = img.get(x, y)

          var br = (red(c) + green(c) + blue(c)) / 3
          let value = hue(c)
          value = abs(value-180)
          var s = map(value,0,180,1.4,1.6)
          scl1 = scl0*s
          var destination = createVector(this.firework.pos.x + (x - w / 2) * scl1, this.firework.pos.y + (y - h / 2) * scl1)
          var location = createVector(this.firework.pos.x + (x - w / 2) * scl2, this.firework.pos.y + (y - h / 2) * scl2)

          var velocity = p5.Vector.sub(destination, location)

          if (alpha(c) > 0) {

            var p = new Particle(location.x, location.y, velocity, c,this.radius*0.5)
            this.particles.push(p)
          }
        }

    } else {
      //default explode
      for (var i = 0; i < 400; i++) {
        var p = new Particle(this.firework.pos.x, this.firework.pos.y)
        this.particles.push(p)
      }
    }

  }
}
