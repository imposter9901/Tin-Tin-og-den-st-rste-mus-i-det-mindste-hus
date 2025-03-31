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

        this.isJump = true;

      }
    } 
    
    else {
      if (this.jumpCount >= -10) {
        let neg = 1;

        if (this.jumpCount < 0) {
          neg = -1;

        }

        this.position.y -= (this.jumpCount ** 2) / 2 * neg;
        this.jumpCount--;

      } else {
        this.isJump = false;
        this.jumpCount = 10;

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
    fill(this.farve)
    rect(this.pos.x, this.pos.y, this.w, this. h)
  }
}

//Functions
function slutskærm (){
  //laver bagrunden
  image(victoryBackground, 0, 0, width, height);

  //skriver teksten
  textAlign(CENTER);
  textSize(75);
  fill('rgb(86, 11, 246)');
  text('TILLYKKE DU ER DEN STØRSTE LUS',width/2, height/2);

  let restartButton = createButton('Genstart Spillet');
  restartButton.position(width/2-100, height/2+50);
  restartButton.size(200, 50);
  
  //funktion der genstarter spillet
  restartButton.mousePressed(restartGame);
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
  color: [255, 0, 0],
  width: 20,
  height: 40,
  
  //Tegner og farvelægger figuren
  paint: function () {
    fill(this.color);
    rect(this.move.position.x, this.move.position.y, this.width, this.height);
  }
}

//Functions
function boxCollison(blok, player) {
  
  if(
    blok.pos.x + blok.w >= player.move.position.x &&
    blok.pos.x <= player.move.position.x + player.width &&
    blok.pos.y + blok.h >= player.move.position.y &&
    blok.pos.y <= player.move.position.y + player.height
  )
  return true
}

//Init variabler
let blokke = [];
let collisionDetected = false;
let mål = new Blok(300, 500, 20, 40, 'rgb(255, 0, 132)')
let test = new Blok(300,40,30,50,'rgb(22, 184, 221)') //fjernes når player merges ind

function setup() {
  createCanvas(windowWidth, windowHeight);

  //blokkene kan skrives her og pushes så op i listen blokke
  blokke.push(new Blok((windowWidth/2), (windowHeight - 10), 10, 10, 'rgb(255, 255, 0)'))
  blokke.push(new Blok((windowWidth/3), (windowHeight - 10), 10, 10, 'rgb(255, 255, 0)'))
}

let victoryBackground

function preload() {
  victoryBackground = loadImage("dupont-y-dupond.jpeg")
}

function draw() {
  background(220);

  TinTin.move.move();
  TinTin.paint();
  TinTin.gravity.applyGravity(TinTin.move.position, TinTin.move.isJump);
  
  for(let i = 0; i < blokke.length; i ++){
  //forløkke der gør igennem blokke listen og kalder paint funktionen som tegner dem
  for(let i=0;i<blokke.length; i++){
    blokke[i].paint()
  }

  for (let i = 0; i < blokke.length; i ++) {
    collisionDetected = boxCollison(blokke[i], TinTin);

    if (collisionDetected) {
      console.log("collison");
    }
  }
  }

  //tegner målet
  mål.paint()

  //undersøger om player er tæt på målet, hvis sandt så tegnes målskærmen
    if(TinTin.move.position.x <= mål.pos.x+20 && TinTin.move.position.x >= mål.pos.x-20 && TinTin.move.position.y <= mål.pos.y+20 && TinTin.move.position.y >= mål.pos.y-20){ //test erstTTES AF PLAYER
      slutskærm()
    }
}