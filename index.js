/**@type{HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const scoreDisplay = document.getElementById("score");
  const startBtn = this.document.getElementById("startBtn");
  const ctx = canvas.getContext("2d");
  canvas.width = 1024;
  canvas.height = 576;

  let score = 0;
  let animateId;

  class Background {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.image = document.getElementById("background");
    }
    draw() {
      ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
    }
  }

  //game Timer
  let timerValue = 60;
  function decreaseTimer() {
    if (timerValue > 0) {
      setTimeout(decreaseTimer, 1000);
      timerValue--;
      document.getElementById("time").innerHTML = timerValue;
    }
  }
  decreaseTimer();
  const background = new Background(canvas.width, canvas.height);

  class Mandrake {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.image = document.getElementById("mandrake");
      this.scale = 1.3;
      this.spriteWidth = 256;
      this.spriteHeight = 256;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.x = 0;
      this.y = 0;
      this.minFrame = 113;
      this.maxFrame = 355;
      this.frame = 0;
      this.frameX = 9;
      this.frameY = 7;
      this.frameRate = 0;
    }
    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width * this.scale,
        this.height * this.scale
      );
      // context.fillStyle = "rgba(0, 0,  255, 0.5)";
      // context.fillRect(
      //   this.x + 50,
      //   this.y + 150,
      //   this.width - 100,
      //   this.height - 130
      // );
    }
    update() {
      this.frameRate++;
      if (this.frameRate % 90 == 0) {
        this.x =
          Math.random() * this.canvasWidth - (this.width * this.scale) / 2;
        this.y =
          Math.random() * this.canvasHeight - (this.height * this.scale) / 2;
        console.log(this.x);
        console.log(this.y);
      }
      this.frame = this.frame < this.maxFrame ? this.frame + 1 : this.minFrame;
      this.frameX = this.frame % 18;
      this.frameY = Math.floor(this.frame / 18);
    }
    setAnimation(newMinFrame, newMaxFrame) {
      this.minFrame = newMinFrame;
      this.maxFrame = newMaxFrame;
      this.frame = this.minFrame;
    }
  }
  const mandrake = new Mandrake(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    mandrake.draw(ctx);
    mandrake.update();

    animateId = requestAnimationFrame(animate);

    gameOver();
  }
  animate();

  function gameOver() {
    if (timerValue <= 0) {
      ctx.font = "30px  Bangers";
      ctx.fillStyle = "white";
      ctx.fillText(
        "Game Over Your Score Was:  " + score,
        canvas.width / 2 - 140,
        canvas.height / 2
      );
      ctx.fillText(
        " Click or Touch on Mandrake to Score",
        canvas.width / 2 - 200,
        canvas.height / 2 + 40
      );
      startBtn.classList.add("show");
      cancelAnimationFrame(animateId);
    }
  }

  canvas.addEventListener("pointerdown", (e) => {
    if (
      e.offsetX > mandrake.x &&
      e.offsetX < mandrake.x + mandrake.width &&
      e.offsetY > mandrake.y &&
      e.offsetY < mandrake.y + mandrake.height
    ) {
      score += 10;
      scoreDisplay.innerHTML = score;
      console.log(score);
    }
  });
  startBtn.addEventListener("pointerdown", (e) => {
    window.location.reload();
  });

  //load function end
});
