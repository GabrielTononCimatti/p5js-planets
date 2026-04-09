let screenWidth=2000, screenHeight=2000
let planets=[]
let starsX=[], starsY=[]
function setup() {
  Util.screenWidth=screenWidth
  Util.screenHeight=screenHeight
  createCanvas(screenWidth, screenHeight);
  rectMode(CORNER)
  angleMode(DEGREES)
  starsSet()
  
}

function draw()
{
  background(4,3,50)
  Util.setup()
  starsDraw()
  Line.draw()
  
  for(let planet of planets)
  {
    planet.draw()    
  }
}

function mousePressed()
{
  Line.posXinicial=Util.mX;
  Line.posYinicial=Util.mY;
  planets.push(new Planeta(planets, planets.length))
  planets[planets.length-1].atual=true
}

function mouseClicked()
{
  planet=planets[planets.length-1]
  planet.velX=(planet.posX-Util.mX)/50;
  planet.velY=(planet.posY-Util.mY)/50;
  planets[planets.length-1].atual=false
  planets[planets.length-1].active=true
}

function starsSet()
{
  for(let i=0; i<2000; i++)
  {
    starsX.push(random(0, screenWidth))
    starsY.push(random(0, screenHeight))
  }
}

function starsDraw()
{
  for(let i=0; i<2000; i++)
  {
    fill(255)
    noStroke()
    circle(starsX[i], starsY[i], 1)
  }
}

function mouseWheel(event)
{
  for(let planet of planets)
  {
    planet.mouseWheel(event)    
  }
}