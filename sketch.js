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
  constructor(vel, position, width, height) {
    this.vel = vel;
    this.position = position;
    this.width = width;
    this.height = height;
    this.isJump = false;
    this.jumpCount = 10;
  }

  //Bevægelse
  move() {
    if (keyIsPressed) {
      if (key === 'd' && this.position.x < windowWidth - this.width) {
        this.position.x += this.vel;
      }
      if (key === 'a' && this.position.x > 0) {
        this.position.x -= this.vel;
      }

      if (!this.isJump) {
        if (key === ' ') {
          this.isJump = true;
        }
      }

      if (this.isJump) {
        if (this.jumpCount > 0) {
          this.position.y -= this.jumpCount * 1.5; //Hop op
        }

        else {
          this.position.y += Math.abs(this.jumpCount) * 1.5 - 40; //Falder ned
        }

        this.jumpCount -= 1;

        if (this.jumpCount < -10) {
          this.isJump = false;
          this.jumpCount = 10;
        } 

      }
    }
  }
}

class Gravity {
  constructor(gravity) {
    this.gravity = gravity;
  }

  applyGravity(position, isJump) {
    if (!isJump && position.y < windowHeight - 40) {
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
  move: null, //Midlertidigt null, vi sætter det senere
  
  //Tegner og farvelægger figuren
  paint: function () {
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y, 20, 40);
  }
};

//Initialiser Move med referencen til TinTins position
TinTin.move = new Move(5, TinTin.pos, 20, 40);

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //Bevæger og tegner TinTin
  
  TinTin.gravity.applyGravity(TinTin.pos, TinTin.move.isJump);
  TinTin.move.move();
  TinTin.paint();
}