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
  constructor(vel, position, width, height, jumpCount) {
    this.vel = vel;
    this.position = position; // Reference the Position object
    this.width = width;
    this.height = height;
    this.isJump = false;
    this.jumpCount = jumpCount;
  }

  //Bevægelse
  move() {
    if (keyIsPressed) {
      if (key === 'd' && this.position.x < windowWidth - this.width - this.vel) {
        this.position.x += this.vel;
      }
      if (key === 'a' && this.position.x > 0) {
        this.position.x -= this.vel;
      }

      if (!this.isJump) {
        if (key === ' ') {

          console.log("Jump");

          this.isJump = true;

          console.log("isJump: " + this.isJump);
        }
      } 
      
      else {
        if (this.jumpCount >= -10) {
          let neg = 1;

          console.log("neg = 1");

          if (this.jumpCount < 0) {
            neg = -1;

            console.log("neg = -1");
          }

          this.position.y -= (this.jumpCount ** 2) / 2 * neg;
          this.jumpCount--;

          console.log("JumpCount: " + this.jumpCount);

        } else {
          this.isJump = false;
          this.jumpCount = 10;

          console.log("jumpCount reset: " + this.jumpCount);

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
  move: null,
  
  //Tegner og farvelægger figuren
  paint: function () {
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y, 20, 40);
  }
};


function setup() {
  createCanvas(windowWidth, windowHeight);
  TinTin.move = new Move(5, this.pos, 20, 40, 10);
}

function draw() {
  background(220);

  TinTin.move.move();
  TinTin.paint();
  TinTin.gravity.applyGravity(TinTin.pos, TinTin.move.isJump);
}