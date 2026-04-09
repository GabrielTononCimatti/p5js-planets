class Util{
  static mX
  static mY
  static screenHeight
  static screenWidth
  
  static setup()
  {
    translate(0, this.screenHeight)
    scale(1, -1)
    this.mX=mouseX
    this.mY=this.screenHeight-mouseY
  }
  
  static distance(x1, y1, x2, y2)
  {
    return sqrt((x1-x2)**2+(y1-y2)**2)    
  }
  
  static write(palavra, posX, posY)
  {
    translate(0, this.screenHeight)
    scale(1, -1)
    text(palavra, posX, this.screenHeight-posY)
    translate(0, this.screenHeight)
    scale(1, -1)
  }
}