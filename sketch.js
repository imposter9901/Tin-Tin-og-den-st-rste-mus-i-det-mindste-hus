
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
    rect(this.pos.x, this.pos.y, this.w, this. h)
    fill(this.farve)
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

  for(let i=0;i<blokke.length; i++){
    blokke[i].paint()
  }
}