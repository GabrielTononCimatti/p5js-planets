class Planeta {
  constructor(listaPai, Id) {
    this.listaPai = listaPai;
    this.Id = Id;
    this.posX = Line.posXinicial;
    this.posY = Line.posYinicial;
    this.active = false
    this.radius = 10;
    this.mass = 10000;
    this.vetores = []
    this.forceX = 0
    this.forceY = 0
    this.accelX = 0
    this.accelY = 0
    this.velX = 0
    this.velY = 0
  }

  resetForce() {
    this.forceX = 0
    this.forceY = 0
  }

  move() {
    this.accelX = this.forceX / this.mass
    this.accelY = this.forceY / this.mass

    this.velX += this.accelX
    this.velY += this.accelY

    this.posX = this.posX + this.velX
    this.posY = this.posY + this.velY
  }

  draw() {
    stroke(255)
    fill(0, 0, 255)
    circle(this.posX, this.posY, 2 * this.radius)
    fill(255)
    Util.write(this.Id, this.posX + 10, this.posY + 10)
  }

  calcForces() {
    this.vetores = []
    for (let planet of this.listaPai) {
      if (planet.Id == this.Id || !planet.active)
        continue
      let idAtual = this.vetores.length
      this.vetores.push(new Vector(idAtual, this.posX, this.posY, planet.posX, planet.posY, this.mass, planet.mass, this.radius, planet.radius))
    }

    for (let vetor of this.vetores) {
      this.forceX += vetor.forceX
      this.forceY += vetor.forceY
    }
    this.vetores = []
  }

  bounce() {
    for (let planet of this.listaPai) {
      if (planet.Id == this.Id || !planet.active)
        continue

      if (this.Id < planet.Id)
        continue

      let dx = this.posX - planet.posX
      let dy = this.posY - planet.posY
      let distSq = dx ** 2 + dy ** 2
      let minDist = this.radius + planet.radius

      if (distSq === 0) {
        dx = 0.1;
        dy = 0.1;
        distSq = dx ** 2 + dy ** 2;
      }

      if (distSq <= minDist ** 2) {
        let distance = sqrt(distSq)
        let nx = dx / distance
        let ny = dy / distance

        let dvx = this.velX - planet.velX
        let dvy = this.velY - planet.velY
        let velAlongNormal = dvx * nx + dvy * ny

        if (velAlongNormal < 0) {
          let e = 0.95 // Mudei de 1 (puramente elástico) para 0.8 para ajudar a perder energia a cada batida
          let j = -(1 + e) * velAlongNormal
          j /= (1 / this.mass + 1 / planet.mass)

          let impulseX = j * nx
          let impulseY = j * ny

          this.velX += impulseX / this.mass
          this.velY += impulseY / this.mass
          planet.velX -= impulseX / planet.mass
          planet.velY -= impulseY / planet.mass
        }

        // Adiciona Atrito Tangencial para parar as esfregações e rotações frenéticas
        let dvxAfter = this.velX - planet.velX
        let dvyAfter = this.velY - planet.velY
        let tx = -ny
        let ty = nx
        let velTangential = dvxAfter * tx + dvyAfter * ty

        let frictionCoeff = 1.0 // 5% de resistência ao deslizamento lateral por frame tocado
        let jt = -velTangential * frictionCoeff
        jt /= (1 / this.mass + 1 / planet.mass)

        this.velX += (jt * tx) / this.mass
        this.velY += (jt * ty) / this.mass
        planet.velX -= (jt * tx) / planet.mass
        planet.velY -= (jt * ty) / planet.mass

        let percent = 1 // 100% de separação para evitar sobreposição (overlap) visual
        let penetration = minDist - distance
        let correctionX = (penetration / (1 / this.mass + 1 / planet.mass)) * percent * nx
        let correctionY = (penetration / (1 / this.mass + 1 / planet.mass)) * percent * ny

        this.posX += correctionX / this.mass
        this.posY += correctionY / this.mass
        planet.posX -= correctionX / planet.mass
        planet.posY -= correctionY / planet.mass
      }
    }
  }

  mouseWheel(event) {
    if (!this.atual)
      return
    if (event.deltaY > 0) {
      this.radius = this.radius + 2;
      this.mass = 100 * this.radius ** 2;
    }
    if (event.deltaY < 0) {
      this.radius = this.radius - 2;
      this.mass = 100 * this.radius ** 2;
    }
  }
}