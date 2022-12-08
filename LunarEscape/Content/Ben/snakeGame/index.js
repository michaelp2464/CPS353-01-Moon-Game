window.addEventListener('DOMContentLoaded', () => { //Wait till the DOM is fully loaded before we execute any JS

  //create a reference to CSS items
  const playButton = document.querySelector('.button'); 
  const game = document.querySelector('.game');

  //make the game visible if the play button is pressed
  playButton.addEventListener('click', () => makeGameVisible()); 
  
  function makeGameVisible(){
    playButton.style.visibility = "hidden";
    game.style.visibility = "visible";
  }

  //SnakePart object allows us to keep track of the X and Y value of each snake part in one object
  class SnakePart {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  
  //get references to canvas, ctx
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");


  let speed = 4;
  let tileCount = 20; //store how many tiles there will be
  let tileSize = canvas.width / tileCount - 2; //store the height and width of the rectangle
  
  //position of the head
  let headX = 16; 
  let headY = 18;
  //store all of the snake parts in a SnakePart array
  const snakeParts = [];
  //we need to store how long the tail is to see, later, if the tail is too long 
  let tailLength = 5;
  
  //where the first box should be, X and Y coordinates
  let boxX = 5;
  let boxY = 5;
  
  //the initial inputted direction of the snake
  let inputsXVelocity = 0;
  let inputsYVelocity = 0;

  //the initial direction of the snake
  let xVelocity = 0;
  let yVelocity = 0;]

  //initialize the collision box sequence
  let squareNum = 1;
  
  window.focus(); //make sure that the player is focusing on the window, with no need for a first click
  drawGame(); //draw the game
  
  //game loop
  function drawGame() {
    xVelocity = inputsXVelocity; //the direction should be the initially inputted direction
    yVelocity = inputsYVelocity;
  
    //the new position should be the current position + the velocity
    changeSnakePosition();
    //check to see if the game is over
    let result = isGameOver();
    if (result) {
      return;
    }
    
    clearScreen();
    //did the Snake collide with anything?
    checkboxCollision();
    //update the snake & box graphics 
    drawbox();
    drawSnake();
    //call the game loop 
    setTimeout(drawGame, 1000 / speed);
  }
  
  function isGameOver() {
    let gameOver = false;
  
    if (yVelocity === 0 && xVelocity === 0) {
      return false;
    }
  
    //if snake head intersects with a tile, end the game
    if (headX < 0) {
      gameOver = true;
    } else if (headX === tileCount) {
      gameOver = true;
    } else if (headY < 0) {
      gameOver = true;
    } else if (headY === tileCount) {
      gameOver = true;
    }
    
    //if snake head intersects with itself, end game
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      if (part.x === headX && part.y === headY) {
        gameOver = true;
        break;
      }
    }
  
    //if the game ended, we should display a losing screen
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
  
  //draw the snake on the screen given the corresponding size and location
  function drawSnake() {
    ctx.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
  
    //add new snake parts
    snakeParts.push(new SnakePart(headX, headY)); 
    //if the snake length is greater than the tail length, it is too long so we must remove a part of the snake
    while (snakeParts.length > tailLength) {
      snakeParts.shift(); 
    }
  
    //make sure the head is orange
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
  }
  
  //update the snake head position according to the velocity
  function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
  }

  //draw box
  function drawbox() {
    ctx.fillStyle = "#002800";
    ctx.fillRect(boxX * tileCount, boxY * tileCount, tileSize*2, tileSize*2);
  }
  
  function checkboxCollision() {
    if(squareNum == 1){ //first state in the sequence
      if (boxX === headX && boxY == headY) { //box x and y position equal to head
        console.log("boxX is " + boxX + " and boxY is " + boxY);
        boxX = Math.floor(Math.random() * ((tileCount-5) - 5) + 5); //choose a new, random location
        boxY = Math.floor(Math.random() * ((tileCount-5) - 5) + 5); 
        squareNum+=1; //advance the state 
        speed+=1; //make the snake faster
        console.log(squareNum + "1"); //for debugging purposes
        return squareNum;
      }
    } else if(squareNum == 2){ //second state in the sequence
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
        speed-=3; //set the speed back to what it was before
        console.log(squareNum + "4");
      }
    }
    console.log(squareNum + "END");
   
  }
  
  //look out for key presses
  document.body.addEventListener("keydown", keyDown);
  
  //based on what the player has pressed, change the velocity 
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


