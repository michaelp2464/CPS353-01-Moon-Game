window.addEventListener("DOMContentLoaded", function (event) {
  //Allow the user input to be focused into the game without needing to click on it
  window.focus(); 

  let linePositions; //tracks which tiles the line is currently occupying, with the last value being the head
  let applePositions; //tracks which tiles the apple is currently occupying
  let startTimestamp; //tracks when the game started
  let stepsTaken; //tracks how many steps have taken
  let inputs; //tracks what inputs the player has pressed that need to be fulfilled using an array
  let gameStarted = false; //tracks if the game has started or not

  // Configuration
  const speed = 55; //how long it takes for a tile to be filled
  const width = 103; //width of each tile
  const height = 55; //height of each tile
  const color = "blue"; //color of the tile

  //Create a reference to grid
  const grid = document.querySelector(".grid");
  //Set up the grid with hierarchy: Grid -> Tile -> Content
  for (let i = 0; i < width * height; i++) {
    const content = document.createElement("div");
    content.setAttribute("class", "content");
    const tile = document.createElement("div");
    tile.setAttribute("class", "tile");
    tile.appendChild(content);
    grid.appendChild(tile);
  }

  //Create a reference to all of the tiles that we created using an array
  const tiles = document.querySelectorAll(".grid .tile .content");

  const noteElement = document.querySelector("footer");
  resetGame();

  /*
    resetGame() resets everything to its default values
  */
  function resetGame() {
    linePositions = [5150, 5151, 5152, 5153, 5154];
    applePositions = [];
   
    
    generateCollisionRect(); //creates collision rectangles
    generateCollisionRect();
    console.log(applePositions);
    

    
    // Reset game progress
    startTimestamp = undefined;
    stepsTaken = 0;
    inputs = [];

    //reset all the tiles in the array tiles
    for (const tile of tiles) setTile(tile); 

    // Render apple
    for(const i of applePositions){
      setTile(tiles[i], {
        "background-color": "black",
      });
    }

    // Render lines when the webpage is loaded
    for (const i of linePositions.slice(1)) {
      const linePart = tiles[i];
      linePart.style.backgroundColor = color;

      // Set up transition directions for head and tail
      if (i == linePositions[linePositions.length - 1])
        linePart.style.left = 0;
      if (i == linePositions[0]) linePart.style.right = 0;
    }

    noteElement.innerHTML = "Press Space to Start";
  }

  function generateCollisionRect(){
    let num = Math.floor(Math.random() * 5665); //starting point, random int
    let bound1 = Math.floor(Math.random() * (20 - 10 + 1) + 10);
    let bound2 = Math.floor(Math.random() * (20 - 10 + 1) + 10);
    for(let i = 0; i < bound1; i++){
      applePositions.push(num); //each column in the row
      for(let j = 0; j < bound2; j++){
        applePositions.push(num+103*(j+1)); //each row in the column
      }
      num++; //switch to the next column
    }
  }
  

  function startGame() {
    gameStarted = true;
    window.requestAnimationFrame(main);
  }

  window.addEventListener("keydown", function (event) {
    //if any of the target keys were pressed, this branch should allow entry to the rest of the eventListener
    if (!["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "].includes(event.key)) 
      return;

    //stop all default browser functions 
    event.preventDefault();
    
    //configures the spacebar to be our reset key
    if (event.key == " ") {
      resetGame();
      startGame();
      return;
    }

    /*
      Deny the user to move in the same direction it is currently moving
      Deny the user to move in the complete opposite direction it is currently moving
    */

    if (
      event.key == "ArrowLeft" &&
      inputs[inputs.length - 1] != "left" &&
      headDirection() != "right"
    ) {
      inputs.push("left");
    }
    if (
      event.key == "ArrowUp" &&
      inputs[inputs.length - 1] != "up" &&
      headDirection() != "down"
    ) {
      inputs.push("up");
    }
    if (
      event.key == "ArrowRight" &&
      inputs[inputs.length - 1] != "right" &&
      headDirection() != "left"
    ) {
      inputs.push("right");
    }
    if (
      event.key == "ArrowDown" &&
      inputs[inputs.length - 1] != "down" &&
      headDirection() != "up"
    ) {
      inputs.push("down");

    }
  });

  function main(timestamp) {
    try {
      if (startTimestamp === undefined) startTimestamp = timestamp;
      const totalElapsedTime = timestamp - startTimestamp;

      const stepsShouldHaveTaken = Math.floor(totalElapsedTime / speed);
      const percentageOfStep = (totalElapsedTime % speed) / speed;

      // if stepsTaken != stepsShouldHaveTaken, it means that a certain % of the step has already been taken
      if (stepsTaken != stepsShouldHaveTaken) {
        stepAndTransition(percentageOfStep);  
        stepsTaken++;
      } else {
        transition(percentageOfStep);
      }

      window.requestAnimationFrame(main);
    } catch (error) {
      noteElement.innerHTML = `${error.message}`;
    }
  }

  function stepAndTransition(percentageOfStep) {
    // Calculate the next position and add it to the snake
    const newHeadPosition = getNextPosition();
    console.log(`Snake stepping into tile ${newHeadPosition}`);
    linePositions.push(newHeadPosition);

    const previousTail = tiles[linePositions[0]];
    setTile(previousTail);

    const previousHead = tiles[linePositions[linePositions.length - 2]];
    setTile(previousHead, { "background-color": color });

    const head = tiles[newHeadPosition];
    const headDi = headDirection();
    const headValue = `${percentageOfStep * 100}%`;

    if (headDi == "right")
      setTile(head, {
        left: 0, // Slide in from left
        width: headValue,
        "background-color": color,
        "border-radius": 0
      });

    if (headDi == "left")
      setTile(head, {
        right: 0, // Slide in from right
        width: headValue,
        "background-color": color,
        "border-radius": 0
      });

    if (headDi == "down")
      setTile(head, {
        top: 0, // Slide in from top
        height: headValue,
        "background-color": color,
        "border-radius": 0
      });

    if (headDi == "up")
      setTile(head, {
        bottom: 0, // Slide in from bottom
        height: headValue,
        "background-color": color,
        "border-radius": 0
      });
  }

  function transition(percentageOfStep) {
    // Transition head
    const head = tiles[linePositions[linePositions.length - 1]];
    const headDi = headDirection();
    const headValue = `${percentageOfStep * 100}%`;
    if (headDi == "right" || headDi == "left") head.style.width = headValue; 
    if (headDi == "down" || headDi == "up") head.style.height = headValue;

    // Transition tail
    const tail = tiles[linePositions[0]];
    const tailDi = tailDirection();
    const tailValue = `${100 - percentageOfStep * 100}%`;
    if (tailDi == "right" || tailDi == "left") tail.style.width = tailValue;
    if (tailDi == "down" || tailDi == "up") tail.style.height = tailValue;
  }

  function getNextPosition() {
    const headPosition = linePositions[linePositions.length - 1];
    const snakeDirection = inputs.shift() || headDirection();
   
    switch (snakeDirection) {
      case "right": {
        const nextPosition = headPosition + 1;
        /*
        if (nextPosition % width == 0) throw Error("The snake hit the wall");
        // Ignore the last snake part, it'll move out as the head moves in
        */
        if (linePositions.slice(1).includes(nextPosition))
          throw Error("The snake bit itself");
        if (applePositions.includes(nextPosition)) {
          gameOver();
        }
    
        return nextPosition;
      }
      case "left": {
        const nextPosition = headPosition - 1;
        /*
        if (nextPosition % width == width - 1 || nextPosition < 0)
          throw Error("The snake hit the wall");
        // Ignore the last snake part, it'll move out as the head moves in
        */
        if (linePositions.slice(1).includes(nextPosition))
          throw Error("The snake bit itself");
        if (applePositions.includes(nextPosition)) {
          gameOver();
        }
        return nextPosition;
      }
      case "down": {
        const nextPosition = headPosition + width;
        /*
        if (nextPosition > width * height - 1)
          throw Error("The snake hit the wall");
        // Ignore the last snake part, it'll move out as the head moves in
        */
        if (linePositions.slice(1).includes(nextPosition))
          throw Error("The snake bit itself");
        if (applePositions.includes(nextPosition)) {
          gameOver();
        }
        return nextPosition;
      }
      case "up": {
        const nextPosition = headPosition - width;
        /*
        if (nextPosition < 0) throw Error("The snake hit the wall");
        // Ignore the last snake part, it'll move out as the head moves in
        */
        if (linePositions.slice(1).includes(nextPosition))
          throw Error("The snake bit itself");
        if (applePositions.includes(nextPosition)) {
          gameOver();
        }
        return nextPosition;
      }
    }
  }

  function headDirection() {
    const head = linePositions[linePositions.length - 1];
    const neck = linePositions[linePositions.length - 2];
    return getDirection(head, neck);
  }

  function tailDirection() {
    const tail1 = linePositions[0];
    const tail2 = linePositions[1];
    return getDirection(tail1, tail2);
  }

  function getDirection(first, second) {
    if (first - 1 == second) return "right";
    if (first + 1 == second) return "left";
    if (first - width == second) return "down";
    if (first + width == second) return "up";
    throw Error("the two tile are not connected");
  }

  function gameOver() {
    for(const i in linePositions){
      setTile(tiles[linePositions[i]], {
        "background-color": "black",
      });
    }
    
    throw Error("Restart?");
  }

  function createLevelRect(){
    // Find a position for the new apple that is not yet taken by the snake
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * width * height);
    } while (linePositions.includes(newPosition));

    // Set new apple
    setTile(tiles[newPosition], {
      "background-color": "red",
    });

    // Note that the apple is here
    applePositions.push(newPosition);
  }

  // Resets size and position related CSS properties
  function setTile(element, overrides = {}) {
    const defaults = {
      width: "100%",
      height: "100%",
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto",
      "background-color": "transparent"
    };
    const cssProperties = { ...defaults, ...overrides };
    element.style.cssText = Object.entries(cssProperties)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ");
  }
});