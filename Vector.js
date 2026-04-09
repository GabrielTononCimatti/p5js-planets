class Vector{
  constructor(Id, origemX, origemY, fimX, fimY, massa1, massa2)
  {
    this.Id=Id
    this.massa1=massa1
    this.massa2=massa2
    this.origemX=origemX
    this.origemY=origemY
    this.fimX=fimX
    this.fimY=fimY
    this.distanceX=this.fimX-this.origemX
    this.distanceY=this.fimY-this.origemY
    this.moduleCalc();
    this.dX=this.distanceX/this.module
    this.dY=this.distanceY/this.module
    this.phaseCalc();
    this.force=0.1*this.massa1*this.massa2/(this.module**2)
    this.forceX=this.force*this.dX
    this.forceY=this.force*this.dY
  }
  
  moduleCalc()
  {
    this.module=sqrt((this.distanceX)**2+(this.distanceY)**2) 
  }
  
  phaseCalc()
  {
    this.phase=0
    if((this.origemX==this.fimX && this.origemY==this.fimY))
      return
      
    this.phase+=atan((this.dY)/(this.dX))
      
    if(this.dX<=0)
        this.phase+=180
      
    if(this.dX>=0 && this.dY<=0)
        this.phase+=360
    return
  }
}