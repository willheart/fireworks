function Block(x, y) {
  this.x = x
  this.y = y
  this.c = color(255)

   this.show = function() {
     strokeWeight(1)
     stroke(200)
     fill(this.c)
     rect(x,y,blockWidth,blockWidth)
   }

   this.changeColor = function(c){
     this.c = c
   }
}
