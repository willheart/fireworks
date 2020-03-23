function Color(x,y,c){
  this.x = x
  this.y = y
  this.c = c
  this.choosed = false
  this.r = blockWidth*1.5

  this.show = function(){
    if(this.choosed){
      fill(c)
      stroke(220)
      strokeWeight(3)
      ellipse(this.x,this.y,this.r)
    }else{
      fill(c)
      noStroke()
      ellipse(this.x,this.y,this.r)
    }
  }

  this.choose = function(){
    this.choosed = true
  }
  this.cancle = function(){
    this.choosed = false
  }

}
