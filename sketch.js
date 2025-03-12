
//Classes

//Denne class er simpel og bestemmer x og y kordinat for hvad end den bliver brugt til. Desuden er der også en move() funktion som søger for spillerbevægelse.
class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  //Bevægelse
  move() {
    if (keyIsPressed) {
      if (key === 'w') {
        this.y --;
      }
      if (key === 's') {
        this.y ++;
      }
      if (key === 'd') {
        this.x ++;
      }
      if (key === 'a') {
        this.x --;
      }
    }
  }
}

//Objects

let TinTin = {
  type:"player",

  //Vi bruger classen position her under pos
  pos: new Position(100, 100),
  
  //Tegner og farvelægger figuren
  paint: function () {
    rect(this.pos.x, this.pos.y, 20, 40)
    fill(255, 0, 0)
  }
};


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //Bevæger og tegner TinTin
  TinTin.pos.move()
  TinTin.paint()

}