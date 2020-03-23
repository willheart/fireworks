var blockWidth
var margin = 16,
  topMargin = 160
var pixColor = []
var pixNumber = 20
var w=pixNumber,h = pixNumber
var currentColor = 0
var blocks = []
var colors = []
var imgs = []
var beginExplode = false

var num = 0
var fireworks = []
var shot, explode
var gravity
var scl, s

function preload() {

  shot = loadSound('../audio/shot.mp3')
  explode = loadSound('../audio/explode.mp3')
}

function setup() {

  createCanvas(windowWidth, windowHeight)
  background(0)
  pixelDensity(2)

  gravity = createVector(0, 0.2)
  scl = width / pixNumber * 0.4

  //set color
  blockWidth = width / pixNumber
  pixColor[0] = color('#FF2F58')
  pixColor[1] = color('#F5A623')
  pixColor[2] = color('#FEE52D')
  pixColor[3] = color('#7ED321')
  pixColor[4] = color('#50E3C2')
  pixColor[5] = color('#4A90E2')
  pixColor[6] = color('#9013FE')
  pixColor[7] = color('#FFFFFF')

  rectMode(CENTER)
  for (var i = 0; i < pixNumber; i++) {
    for (var j = 0; j < pixNumber; j++) {
      blocks[i * pixNumber + j] = new Block(j * blockWidth + blockWidth / 2, i * blockWidth + topMargin + blockWidth / 2)
    }
  }

  for (var i = 0; i < 7; i++) {
    colors[i] = new Color((i + 0.5) * (blockWidth * 1.5 + 10) + margin, topMargin - 40, pixColor[i])
  }
  colors[7] = new Color(width - blockWidth * 1.5 / 2 - margin, topMargin - 40, pixColor[7])
  colors[0].choose()

}

function draw() {
  if(!beginExplode){

    background(0)
    noStroke()
    textSize(32)
    textStyle(NORMAL);
    fill(pixColor[2])
    text('绘制一个图案', width/2, 70)
    textAlign(CENTER)
    fill('#D8D8D8')
    rect(width/2,height- (height-topMargin-width)/2,width-margin*3,50,25)
    textSize(20)
    fill(20)
    textStyle(BOLD);
    text('开始燃放', width/2,height- (height-topMargin-width)/2+8)


    for (var i = 0; i < pixNumber; i++) {
      for (var j = 0; j < pixNumber; j++) {
        blocks[i * pixNumber + j].show()
      }
    }
    for (var i = 0; i < colors.length; i++) {
      colors[i].show()
    }
  }else{
    var red = num * 6
    var bright = (fireworks.length - num) * 6
    var alpha = bright / 2 + 8 + red / 3

    background(red + bright, bright, 20 + bright, alpha)

    if (random(1) < 0.02) {
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


}

function mousePressed() {

  if (mouseY > topMargin && mouseY < topMargin + width) {
    var col = floor(mouseX / blockWidth)
    var row = floor((mouseY - topMargin) / blockWidth)
    var index = row * pixNumber + col
    var c = pixColor[currentColor]
    blocks[index].changeColor(c)
  } else if (mouseY > topMargin - 40 - blockWidth * 1.5 / 2 && mouseY < topMargin - 40 + blockWidth * 1.5 / 2) {

    if (mouseX > margin && mouseX < (colors.length - 1) * (blockWidth * 1.5 + 10) + margin) {
      var index = floor((mouseX - margin + 5) / (blockWidth * 1.5 + 10))
      currentColor = index
      colors[index].choose()
      for (var i = 0; i < colors.length; i++) {
        if (i != index) colors[i].cancle()
      }
    } else if (mouseX < width - margin + 5 && mouseX > width - margin - (blockWidth * 1.5 + 5)) {
      colors[colors.length - 1].choose()
      currentColor = colors.length - 1
      for (var i = 0; i < colors.length - 1; i++) {
        colors[i].cancle()
      }
    }
  } else if(mouseY > topMargin + width + blockWidth) {

    imgs[0] = createImage(pixNumber, pixNumber)
    imgs[0].loadPixels()

    for (var y = 0; y < pixNumber - 1; y++) {
      for (var x = 0; x < pixNumber - 1; x++) {
        var index = x + y * pixNumber
        var loc = (x + y * pixNumber) * 4

        imgs[0].pixels[loc] = red(blocks[index].c)
        imgs[0].pixels[loc + 1] = green(blocks[index].c)
        imgs[0].pixels[loc + 2] = blue(blocks[index].c)
        sum = red(blocks[index].c)+green(blocks[index].c)+blue(blocks[index].c)
        if(sum/3>250){
          imgs[0].pixels[loc + 3] = 0
        } else imgs[0].pixels[loc + 3]=255

      }
    }
    beginExplode = true
  }
}

function mouseDragged() {

  if (mouseY > topMargin && mouseY < topMargin + width - blockWidth) {
    var col = floor(mouseX / blockWidth)
    var row = floor((mouseY - topMargin) / blockWidth)
    var index = row * pixNumber + col
    var c = pixColor[currentColor]
    blocks[index].changeColor(c)
  } else if (mouseY > topMargin - 40 - blockWidth * 1.5 / 2 && mouseY < topMargin - 40 + blockWidth * 1.5 / 2) {

    if (mouseX > margin && mouseX < (colors.length - 1) * (blockWidth * 1.5 + 10) + margin) {
      var index = floor((mouseX - margin + 5) / (blockWidth * 1.5 + 10))
      currentColor = index
      colors[index].choose()
      for (var i = 0; i < colors.length; i++) {
        if (i != index) colors[i].cancle()
      }
    } else if (mouseX < width - margin + 5 && mouseX > width - margin - (blockWidth * 1.5 + 5)) {
      colors[colors.length - 1].choose()
      currentColor = colors.length - 1
      for (var i = 0; i < colors.length - 1; i++) {
        colors[i].cancle()
      }
    }
  }
}
