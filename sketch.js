
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

//Liste af blokkene
let blokke = []

function setup() {
  createCanvas(1500, 650);

  //blokkene kan skrives her og pushes så op i listen blokke
  blokke.push(new Blok(500, 550, 80, 15, 'rgb(200, 50, 50)'))
  blokke.push(new Blok(300, 200, 80, 15,'rgb(50, 70, 200)'))
}

function draw() {
  background(220);

  for(let i=0;i<blokke.length; i++){
    blokke[i].paint()
  }
}