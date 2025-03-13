/*
Problemer: Der er problemer med spillerens position. Umeldbart er det på grund af at classen Move og classen position ikke kan snakke sammen.
Når vi ændre på vores postition i move, så ændre det ikke på vores position i vores player da det ikke ændres i classen position.
*/

//Classes

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Move {
  constructor(vel, x, y, width, height) {
    this.vel = vel;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  //Bevægelse
  move() {
    if (keyIsPressed) {
      if (key === ' ') {
        
      }
      if (key === 'd' && this.x < windowWidth - this.width) {
        this.x + this.vel;
      }
      if (key === 'a' && this.x > 0) {
        this.x - this.vel;
      }
    }
  }
}

class Gravity {
  constructor(gravity) {
    this.gravity = gravity;
  }

  applyGravity(position) {
    if (position.y < windowHeight - 40) {
      position.y += this.gravity;
    }
  }
}

//Objects

let TinTin = {
  type: "player",

  //Vi bruger classen position her under pos
  pos: new Position(100, 100),
  gravity: new Gravity(2),
  move: new Move(20, this.pos.x, this.pos.y, 20, 40), // Use initial position values directly
  
  //Tegner og farvelægger figuren
  paint: function () {
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y, 20, 40);
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //Bevæger og tegner TinTin
  
  TinTin.gravity.applyGravity(TinTin.pos);
  TinTin.move.move();
  TinTin.paint();
}