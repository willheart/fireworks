var fireworks = []
var margin = 20
var gravity
var source = [], imgs = []
var imgNumber = 22
var fireIndex
var randomMode = false

var w,
  h
var scl, s
var num = 0

var shot, explode

function preload() {
  fireIndex = GetQueryString("id")
  if (fireIndex) {
    source[0] = loadImage('images/' + fireIndex + '.png')
  }else{
    print('Random mode is running')
    randomMode = true
    for(var i=0;i<imgNumber;i++){
      source[i] = loadImage('images/' + i + '.png')
    }

  }
  shot = loadSound('../audio/shot.mp3')
  explode = loadSound('../audio/explode.mp3')
}

function setup() {

  createCanvas(windowWidth, windowHeight)
  background(245)
  pixelDensity(2)
  w = 30
  h = 30
  // frameRate(1)
  scl = (width < height ? width : height) / w * 0.4

  gravity = createVector(0, 0.2)

  var max
  if (!randomMode) {
    max = 1
  } else max = imgNumber

  for (var i = 0; i < max; i++) {

    image(source[i], 0, 0)
    imgs[i] = createImage(w, h)

    loadPixels()
    imgs[i].loadPixels()

    for (var y = 0; y < h - 1; y++) {
      for (var x = 0; x < w - 1; x++) {
        var index = (x * pixelDensity() + y * pow(pixelDensity(), 2) * width) * 4
        var loc = (x + y * w) * 4

        imgs[i].pixels[loc] = pixels[index]
        imgs[i].pixels[loc + 1] = pixels[index + 1]
        imgs[i].pixels[loc + 2] = pixels[index + 2]
        imgs[i].pixels[loc + 3] = pixels[index + 3]

        var sum = pixels[index] + pixels[index + 1] + pixels[index + 2]

        if (sum / 3 > 250 || sum / 3 < 15) {
          imgs[i].pixels[loc + 3] = 0
        } else {
          imgs[i].pixels[loc + 3] = pixels[index + 3]
        }
      }
    }
    background(0)
  }

  // noLoop()
}

function draw() {


  var red = num * 6
  var bright = (fireworks.length - num) * 6
  var alpha = bright / 2 + 8 + red / 3

  background(red + bright, bright, 20 + bright, alpha)

  if (random(1) < 0.015) {
    shot.setVolume(random(0.005, 0.01))
    shot.play()
    fireworks.push(new Firework())
  }
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].run()

    if (fireworks[i].done()) {
      fireworks.splice(i, 1)
      num--
    }
  }
}

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
