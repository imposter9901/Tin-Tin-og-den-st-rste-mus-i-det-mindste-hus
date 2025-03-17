
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

/*
//Denne class skal lave knapper men jeg starter lige med 
class Knap {
  constructor(button,x,y,text) {
    this.button = button
    this.pos = new Position (x,y)
    this.text = text
  }
  
  paint() {
    createButton(this.text)
    button.Position(this.pos)
    
  }

}
  */


//Liste af blokkene
let blokke = []
let mål = new Blok(300, 50, 20, 40, 'rgb(255, 0, 132)')
let test = new Blok(300,40,30,50,'rgb(22, 184, 221)') //fjernes når player merges ind

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

  //tegner målet
  test.paint()
  mål.paint()
  

  //undersøger om player er tæt på målet, hvis sandt så tegnes målskærmen
    if(test.pos.x <= mål.pos.x+20 && test.pos.x >= mål.pos.x-20 && test.pos.y <= mål.pos.y+20 && test.pos.y >= mål.pos.y-20){ //test erstTTES AF PLAYER
      //laver bagrunden
      image(victoryBackground, 0, 0, width, height);

      //skriver teksten
      textAlign(CENTER)
      textSize(75)
      fill('rgb(86, 11, 246)')
      text('TILLYKKE DU ER DEN STØRSTE LUS',width/2, height/2)

      //lav en knap (få den til at du evt. som class)
      let restartbtn = createButton('Tilbage til start')
      restartbtn.pos(new Position(100,100))
    }
}


//test.pos <= mål.pos+20 && test.pos >= mål.pos-20