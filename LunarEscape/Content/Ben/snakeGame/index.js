window.addEventListener('DOMContentLoaded', () => {

  const playButton = document.querySelector('.button');
  const game = document.querySelector('.game');
  playButton.addEventListener('click', () => makeGameVisible()); 
  
  function makeGameVisible(){
    playButton.style.visibility = "hidden";
    game.style.visibility = "visible";
  }

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  
  class SnakePart {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  
  let speed = 4;
  let tileCount =20;
  let tileSize = canvas.width / tileCount - 2;
  
  let headX = 16;
  let headY = 18;
  const snakeParts = [];
  let tailLength = 5;
  
  let boxX = 5;
  let boxY = 5;
  
  let inputsXVelocity = 0;
  let inputsYVelocity = 0;
  
  let xVelocity = 0;
  let yVelocity = 0;
  let squareNum = 1;
  
  window.focus(); 
  drawGame();
  
  //game loop
  function drawGame() {
    xVelocity = inputsXVelocity;
    yVelocity = inputsYVelocity;
  
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
      return;
    }
  
    clearScreen();
    checkboxCollision();
    drawbox();
    drawSnake();
  
    setTimeout(drawGame, 1000 / speed);
  }
  
  function isGameOver() {
    let gameOver = false;
  
    if (yVelocity === 0 && xVelocity === 0) {
      return false;
    }
  
    //walls
    if (headX < 0) {
      gameOver = true;
    } else if (headX === tileCount) {
      gameOver = true;
    } else if (headY < 0) {
      gameOver = true;
    } else if (headY === tileCount) {
      gameOver = true;
    }
  
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      if (part.x === headX && part.y === headY) {
        gameOver = true;
        break;
      }
    }
  
    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "50px Arial";
      ctx.fillText("Error. Reboot.", canvas.width / 6.5, canvas.height / 2);
    }
  
    return gameOver;
  }
  
  function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  function drawSnake() {
    ctx.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
  
    snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
    while (snakeParts.length > tailLength) {
      snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
    }
  
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
  }
  
  function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
  }
  
  function drawbox() {
    ctx.fillStyle = "#002800";
    ctx.fillRect(boxX * tileCount, boxY * tileCount, tileSize*2, tileSize*2);
  }
  
  function checkboxCollision() {
    if(squareNum == 1){
      if (boxX === headX && boxY == headY) { //box x and y position equal to head
        console.log("boxX is " + boxX + " and boxY is " + boxY);
        boxX = Math.floor(Math.random() * ((tileCount-5) - 5) + 5); //choose a new, random location
        boxY = Math.floor(Math.random() * ((tileCount-5) - 5) + 5); 
        squareNum+=1;
        speed+=1;
        console.log(squareNum + "1");
        return squareNum;
      }
    } else if(squareNum == 2){
      if (boxX === headX && boxY+1 == headY) { //change the square's collision 
        console.log("boxX is " + boxX + " and boxY is " + boxY);
        boxX = Math.floor(Math.random() * ((tileCount-5) - 5) + 5); //choose a new, random location
        boxY = Math.floor(Math.random() * ((tileCount-5) - 5) + 5); 
        squareNum+=1;
        speed+=1;
        console.log(squareNum + "2");
      }
    } else if(squareNum == 3){
      if (boxX+1 === headX && boxY == headY) {
        console.log("boxX is " + boxX + " and boxY is " + boxY); 
        boxX = Math.floor(Math.random() * ((tileCount-5) - 5) + 5); //choose a new, random location
        boxY = Math.floor(Math.random() * ((tileCount-5) - 5) + 5); 
        squareNum+=1;
        speed+=1;
        console.log(squareNum + "3");
      }
    } else if(squareNum == 4){
      if (boxX+1 === headX && boxY+1 == headY) { //box x and y position equal to head
        boxX = Math.floor(Math.random() * ((tileCount-5) - 5) + 5); //choose a new, random location
        boxY = Math.floor(Math.random() * ((tileCount-5) - 5) + 5); 
        squareNum=1; //reset the sequence
        speed+=1;
        console.log(squareNum + "4");
      }
    }
    console.log(squareNum + "END");
   
  }
  
  document.body.addEventListener("keydown", keyDown);
  
  function keyDown(event) {
    //up
    if (event.keyCode == 38 || event.keyCode == 87) {
      //87 is w
      if (inputsYVelocity == 1) return;
      inputsYVelocity = -1;
      inputsXVelocity = 0;
    }
  
    //down
    if (event.keyCode == 40 || event.keyCode == 83) {
      // 83 is s
      if (inputsYVelocity == -1) return;
      inputsYVelocity = 1;
      inputsXVelocity = 0;
    }
  
    //left
    if (event.keyCode == 37 || event.keyCode == 65) {
      // 65 is a
      if (inputsXVelocity == 1) return;
      inputsYVelocity = 0;
      inputsXVelocity = -1;
    }
  
    //right
    if (event.keyCode == 39 || event.keyCode == 68) {
      //68 is d
      if (inputsXVelocity == -1) return;
      inputsYVelocity = 0;
      inputsXVelocity = 1;
    }
  }
  
  
}, false);


