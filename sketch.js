let DesertBackground;
let victoryBackground;
let gameOverBackground;
let doorImage;
let AllanImage;

//Screen width and height
let screenWidth = 1500;
let screenHeight = 650;

//Button initialize
let restartButton;

function preload() {
  DesertBackground = loadImage("Billedere/DesertBackground.jpg");
  victoryBackground = loadImage("dupont-y-dupond.jpeg");
  gameOverBackground = loadImage("Billedere/gameOver.jpg");
  doorImage = loadImage("Billedere/door.png");
  AllanImage = loadImage("Billedere/Allan.webp");

}

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
    fill(this.farve)
    rect(this.pos.x, this.pos.y, this.w, this. h)
  }
}

class Gravity {
  constructor(gravity) {
    this.gravity = gravity;
  }

  applyGravity(position, isJump) {
    if (!isJump && position.y < screenHeight - 40) {
      position.y += this.gravity;
    }
  }
}

//Objects

let TinTin = {
  type: "player",

  //Vi bruger classen position her under pos
  gravity: new Gravity(12),
  move: new Move(5, new Position(20, screenHeight - 40), 20, 40, 10),
  color: [255, 0, 0],
  width: 20,
  height: 40,
  
  //Tegner og farvelægger figuren
  paint: function () {
    fill(this.color);
    rect(this.move.position.x, this.move.position.y, this.width, this.height);
  }
}

let mål = {
  type: "mål",
  pos: new Position(1440, screenHeight - 570),
  width: 70,
  height: 70,
  paint: function () {
    image(doorImage, this.pos.x, this.pos.y, this.width, this.height);
  }
}

let Allan = {
  type: "Enemy",
  width: 60,
  height: 60,
  move: new Move(5, new Position(1200, screenHeight - 60), 20, 40, 10),
  direction: 1, // 1 for right, -1 for left

  paint: function () {
    image(AllanImage, this.move.position.x, this.move.position.y, this.width, this.height);
  },

  bevægelse: function () {
    this.move.position.x += this.move.vel * this.direction;

    // Reverse direction if Allan hits the screen edges
    if (this.move.position.x <= 0 || this.move.position.x + this.width >= screenWidth) {
      this.direction *= -1;
    }
  },

  restart: function () {
    this.move.position.x = 1200;
    this.move.position.y = screenHeight - 60;
  },

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

  restartButton = createButton('Genstart Spillet');
  restartButton.position(width/2-100, height/2+50);
  restartButton.size(200, 50);
  
  //Restart when restart button is pressed
  restartButton.mousePressed(() => {
    
    TinTin.move.position.x = 20;
    TinTin.move.position.y = screenHeight - 40

    Allan.restart();

    restartButton.remove()
    isGameOver = false;
  });

}

function gameOver() {
  //Laver bagrunden
  image(gameOverBackground, 0, 0, width, height);

  //Skriver teksten
  textAlign(CENTER);
  textSize(75);
  fill('rgb(86, 11, 246)');
  text('Du er blevet fanget af Allan', width / 2, height / 2);

  text('Prøv igen', width / 2, height / 2 + 100);

  restartButton = createButton('Genstart Spillet');
  restartButton.position(width / 2 - 100, height / 2 + 150);
  restartButton.size(200, 50);

  //Restart when restart button is pressed
  restartButton.mousePressed(() => {
    TinTin.move.position.x = 20;
    TinTin.move.position.y = screenHeight - 40

    Allan.restart();

    restartButton.remove()
    isGameOver = false;
  });
}
  


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
let blokke;
let collisionDetected;
let test;
let onPlatform = false;
let isGameOver = false;

function setup() {
  createCanvas(screenWidth, screenHeight);

  blokke = [];
  collisionDetected = false;

  //Platforme
  blokke.push(new Blok(200, screenHeight - 100, 100, 20, 'rgb(0, 255, 0)')); // Platform 1
  blokke.push(new Blok(400, screenHeight - 200, 150, 20, 'rgb(0, 255, 0)')); // Platform 2
  blokke.push(new Blok(600, screenHeight - 300, 200, 20, 'rgb(0, 255, 0)')); // Platform 3
  blokke.push(new Blok(1000, screenHeight - 150, 150, 20, 'rgb(0, 255, 0)')); // Platform 4
  blokke.push(new Blok(1000, screenHeight - 350, 150, 20, 'rgb(0, 255, 0)')); // Platform 5
  blokke.push(new Blok(1300, screenHeight - 500, 250, 20, 'rgb(0, 255, 0)')); // Platform 6
  
}

function draw() {
  
  // Hvis ikke denne if function er her vil spillet blive ved i baggrunden og skabe problemer
  if (!isGameOver) {
  
    image(DesertBackground, 0, 0, width, height);


    //Tegner Spilleren
    TinTin.move.move();
    TinTin.paint();
    TinTin.gravity.applyGravity(TinTin.move.position, TinTin.move.isJump);

    //Tegner Allan
    Allan.paint();
    Allan.bevægelse();
    
    for(let i = 0; i < blokke.length; i ++){
    //forløkke der gør igennem blokke listen og kalder paint funktionen som tegner dem
    for(let i=0;i<blokke.length; i++){
      blokke[i].paint()
    }

    onPlatform = false;
    for (let i = 0; i < blokke.length; i ++) {
      
      collisionDetected = boxCollison(blokke[i], TinTin);

      if (collisionDetected) {
        onPlatform = true;
        TinTin.move.position.y = blokke[i].pos.y - TinTin.height; // Placer spilleren oven på platformen
      }
    }
    }

    //tegner målet
    mål.paint();

    //undersøger om player er tæt på målet, hvis sandt så tegnes målskærmen
      if (
        TinTin.move.position.x + TinTin.width >= mål.pos.x &&
        TinTin.move.position.x <= mål.pos.x + mål.width &&
        TinTin.move.position.y + TinTin.height >= mål.pos.y &&
        TinTin.move.position.y <= mål.pos.y + mål.height
      ) {
        isGameOver = true;
        slutskærm();
        
      }

      //Hvis spilleren rammer Allan, så tegnes game over skærmen
      if (
        TinTin.move.position.x + TinTin.width >= Allan.move.position.x &&
        TinTin.move.position.x <= Allan.move.position.x + Allan.width &&
        TinTin.move.position.y + TinTin.height >= Allan.move.position.y &&
        TinTin.move.position.y <= Allan.move.position.y + Allan.height
      ) {
        isGameOver = true;
        gameOver();
        
      }
  }
}