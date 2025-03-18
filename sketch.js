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
    if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && this.position.x < windowWidth - this.width - this.vel) { // 68 is the key code for 'd'
      this.position.x += this.vel;
    }
    if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && this.position.x > 0) {
      this.position.x -= this.vel;
    }

    if (!this.isJump) {
      if (keyIsDown(32) || keyIsDown(87) || keyIsDown(UP_ARROW)) { 

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

//Denne class skal give blokke størrelser og farver
class Blok {
  constructor(x, y, w, h, farve) {
    this.pos = new Position (x,y)
    this. w = w
    this. h = h
    this. farve = farve
  }

  paint() {
    rect(this.pos.x, this.pos.y, this.w, this. h)
    fill(this.farve)
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
  gravity: new Gravity(2),
  move: new Move(5, new Position(100, 100), 20, 40, 10),
  
  //Tegner og farvelægger figuren
  paint: function () {
    fill(255, 0, 0);
    rect(this.move.position.x, this.move.position.y, 20, 40);
  }
}

//Liste af blokkene
let blokke = []

function setup() {
  createCanvas(windowWidth, windowHeight);

  //blokkene kan skrives her og pushes så op i listen blokke
  blokke.push(new Blok(90, 110, 10, 10, 'rgb(50,200,60)'))
  blokke.push(new Blok(300, 200, 10, 40,'rgb(50, 70, 200)'))
}

function draw() {
  background(220);

  TinTin.move.move();
  TinTin.paint();
  TinTin.gravity.applyGravity(TinTin.move.position, TinTin.move.isJump);
  
  for(let i=0;i<blokke.length; i++){
    blokke[i].paint()
  }
}