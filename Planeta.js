class Planeta{
  constructor(listaPai, Id)
  {
    this.listaPai=listaPai;
    this.Id=Id;
    this.posX=Line.posXinicial;
    this.posY=Line.posYinicial;
    this.active=false
    this.radius=10;
    this.mass=10000;
    this.vetores=[]
    this.forceX=0
    this.forceY=0
    this.accelX=0
    this.accelY=0
    this.velX=0
    this.velY=0
  }
  
  draw()
  {
    stroke(255)
    fill(0,0,255)
    circle(this.posX, this.posY, 2*this.radius)
    fill(255)
    Util.write(this.Id, this.posX+10, this.posY+10)
    if(!this.active)
      return
    
    this.forceX=0
    this.forceY=0
    this.calcForces()
    this.bounce()
    
    //line(this.posX, this.posY, this.posX+this.forceX/10, this.posY+this.forceY/10)
    this.accelX=this.forceX/this.mass
    this.accelY=this.forceY/this.mass
    
    this.velX+=this.accelX
    this.velY+=this.accelY
    
    this.posX=this.posX+this.velX
    this.posY=this.posY+this.velY
    
  }
  
  calcForces()
  {
    this.vetores=[]
    for(let planet of this.listaPai)
    {
      if(planet.Id==this.Id || !planet.active)
        continue
      let idAtual=this.vetores.length
      this.vetores.push(new Vector(idAtual, this.posX, this.posY, planet.posX, planet.posY, this.mass, planet.mass))
    }
    
    for(let vetor of this.vetores)
    {
      this.forceX+=vetor.forceX
      this.forceY+=vetor.forceY
    }
    this.vetores=[]
  }
  
  bounce()
  {
    for(let planet of this.listaPai)
    {
      if(planet.Id==this.Id || !planet.active)
        continue
        
      if((this.posX-planet.posX)**2+(this.posY-planet.posY)**2<=(this.radius+planet.radius)**2)
      {
        this.velX=0
        this.velY=0
        planet.velX=0
        planet.velY=0
        
      }
    }
    
  }
  
  mouseWheel(event)
  {
    if(!this.atual)
      return
    if(event.deltaY > 0)
    {
      this.radius=this.radius+2;
      this.mass=100*this.radius**2;
    } 
    if (event.deltaY < 0)
    {
       this.radius=this.radius-2;
       this.mass=100*this.radius**2;
    }
  }
}