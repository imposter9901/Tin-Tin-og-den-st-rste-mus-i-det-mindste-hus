
//Classes

//Denne class er simpel og bestemmer x og y kordinat for hvad end den bliver brugt til. Desuden er der også en move() funktion som søger for spillerbevægelse.
class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
let mål = new Blok(300, 50, 20, 40, 'rgb(255, 0, 132)')

function setup() {
  createCanvas(windowWidth, windowHeight);

  //blokkene kan skrives her og pushes så op i listen blokke
  blokke.push(new Blok(90, 110, 10, 10, 'rgb(50,200,60)'))
  blokke.push(new Blok(300, 200, 10, 40,'rgb(50, 70, 200)'))
}


let victoryBackground

function preload() {
  victoryBackground = loadImage("dupont-y-dupond.jpeg")
}

function draw() {
  background(220);

  //forløkke der gør igennem blokke listen og kalder paint funktionen som tegner dem
  for(let i=0;i<blokke.length; i++){
    blokke[i].paint()
  }

  mål.paint()

  //sæt evt de to pos til x og y
  if(player.pos == mål.pos){
    image(victoryBackground, 0, 0, width, height);

    textAlign(CENTER)
    text('Tilykke du er den største lus',width/2, height/2)
  }

}