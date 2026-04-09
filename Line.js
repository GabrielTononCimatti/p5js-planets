class Line{
  
  static posXinicial;
  static posYinicial;
  
  static draw()
  {
    if(mouseIsPressed)
    {
      stroke(255)
      line(Util.mX, Util.mY, this.posXinicial, this.posYinicial);
    }
  }
  
}