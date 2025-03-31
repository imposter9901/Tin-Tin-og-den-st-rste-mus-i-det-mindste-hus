let x = 200;
let y = 200;
let vel = 5;
let jumpCount = 10;
let isJump = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

    //Character
    fill(255, 0, 0);
    rect(x, y, 20, 40)

    //Movement
    if (keyIsDown(LEFT_ARROW)) {
      x -= 5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      x += 5;
    }

    if (!isJump) {
      if (keyIsDown(UP_ARROW)) {
        isJump = true;
      }
    }

    else {
      if (jumpCount >= -10) {

        let neg = 1;
        if (jumpCount < 0) {
          neg = -1;
        }

        y -= (jumpCount ** 2)/2 * neg;
        jumpCount--;
      }

      else {
        isJump = false;
        jumpCount = 10;
      }
    }
  }

