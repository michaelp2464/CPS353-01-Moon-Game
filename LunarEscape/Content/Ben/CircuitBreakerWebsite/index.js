window.addEventListener("DOMContentLoaded", function (event) {
  //Allow the user input to be focused into the game without needing to click on it
  window.focus(); 

  let linePositions; //tracks which tiles the line is currently occupying, with the last value being the head
  let applePositions; //tracks which tiles the apple is currently occupying
  let borderPositions;
  let startTimestamp; //tracks when the game started
  let stepsTaken; //tracks how many steps have taken
  let inputs; //tracks what inputs the player has pressed that need to be fulfilled using an array
  let gameStarted = false; //tracks if the game has started or not

  let counter = 1; //if this reaches 3, it is the last level

  // Configuration
  let speed = 150; //how long it takes for a tile to be filled
  const width = 103; //width of each tile
  const height = 55; //height of each tile
  const color = "yellow"; //color of the tile

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
    content.innerHTML = i+1; //DELETE later
  }

  //Create a reference to all of the tiles that we created using an array
  const tiles = document.querySelectorAll(".grid .tile .content");

  const noteElement = document.querySelector("footer");
  resetGame();

  /*
    resetGame() resets everything to its default values
  */
  function resetGame() {
    counter = 1;
    borderPositions = [
      0,
      103,
      206,
      309,
      412,
      515,
      618,
      721,
      824,
      927,
      1030,
      1133,
      1236,
      1339,
      1442,
      1545,
      1648,
      1751,
      1854,
      1957,
      2060,
      2163,
      2266,
      2369,
      2472,
      2575,
      2678,
      2781,
      2884,
      2987,
      3090,
      3193,
      3296,
      3399,
      3502,
      3605,
      3708,
      3811,
      3914,
      4017,
      4120,
      4223,
      4326,
      4429,
      4532,
      4635,
      4738,
      4841,
      4944,
      5047,
      5150,
      5253,
      5356,
      5459,
      5562,
      102,
      205,
      308,
      411,
      514,
      617,
      720,
      823,
      926,
      1029,
      1132,
      1235,
      1338,
      1441,
      1544,
      1647,
      1750,
      1853,
      1956,
      2059,
      2162,
      2265,
      2368,
      2471,
      2574,
      2677,
      2780,
      2883,
      2986,
      3089,
      3192,
      3295,
      3398,
      3501,
      3604,
      3707,
      3810,
      3913,
      4016,
      4119,
      4222,
      4325,
      4428,
      4531,
      4634,
      4737,
      4840,
      4943,
      5046,
      5149,
      5252,
      5355,
      5458,
      5561,
      5664,
      5566,
      5567,
      5568,
      5569,
      5570,
      5571,
      5572,
      5573,
      5574,
      5575,
      5576,
      5577,
      5578,
      5579,
      5580,
      5581,
      5582,
      5583,
      5584,
      5585,
      5586,
      5587,
      5588,
      5589,
      5590,
      5591,
      5592,
      5593,
      5594,
      5595,
      5596,
      5597,
      5598,
      5599,
      5600,
      5601,
      5602,
      5603,
      5604,
      5605,
      5606,
      5607,
      5608,
      5609,
      5610,
      5611,
      5612,
      5613,
      5614,
      5615,
      5616,
      5617,
      5618,
      5619,
      5620,
      5621,
      5622,
      5623,
      5624,
      5625,
      5626,
      5627,
      5628,
      5629,
      5630,
      5631,
      5632,
      5633,
      5634,
      5635,
      5636,
      5637,
      5638,
      5639,
      5640,
      5641,
      5642,
      5643,
      5644,
      5645,
      5646,
      5647,
      5648,
      5649,
      5650,
      5651,
      5652,
      5653,
      5654,
      5655,
      5656,
      5657,
      5658,
      5659,
      5660,
      5661,
      5662,
      5663,
      5664,
      5665,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      62,
      63,
      64,
      65,
      66,
      67,
      68,
      69,
      70,
      71,
      72,
      73,
      74,
      75,
      76,
      77,
      78,
      79,
      80,
      81,
      82,
      83,
      84,
      85,
      86,
      87,
      88,
      89,
      90,
      91,
      92,
      93,
      94,
      95,
      96,
      97,
      98,
      99,
      100,
      101,
      102,
      103
  ];

  console.log(borderPositions);







    //make sure nothing overlaps in the vicinity
    startingPositions =  
     [5049,
      5050,
      5051,
      5052,
      5053,
      5054,
      5055,
      5056,
      5057,
      5058,
      ]; 
    linePositions = [5564, 5461]; 
    applePositions = []; 
    //generateBorderCollision(); //finds the border of the grid array
    for(let i = 0; i < 15; i++){
      generateCollisionRect(0);
    }   
    
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

/*
  function generateBorderCollision(){
    //left bound
    for(let i = 0; i <= 5562; i+=103){
      borderPositions.push(i);
    }
    for(let i = 102; i <= 5664; i+=103){
      borderPositions.push(i);
    }
    for(let i = 5566; i <= 5665; i++){
      borderPositions.push(i);
    }
    for(let i = 0; i <= 103; i++){
      borderPositions.push(i);
    }
    console.log(borderPositions);
  }
*/

/*
function generateCollisionRect(numOfCalls){

  if(numOfCalls > 15){
    return;
  }

  let startingPoint = Math.floor(Math.random() * 5665); //starting point, random int
  generateCollisionRect(startingPoint, numOfCalls);
}
*/


  function generateCollisionRect(numOfCalls){ //if it includes borderPositions, re-generate the collision rect

    if(numOfCalls > 15){
      return ;
    }

    let num = Math.floor(Math.random() * 5665); //starting point, random int
    let bound1 = Math.floor(Math.random() * (20 - 10 + 1) + 10);
    let bound2 = Math.floor(Math.random() * (20 - 10 + 1) + 10);
    let newRectangle = [];
    for(let i = 0; i < bound1; i++){
      newRectangle.push(num); //each column in the row
      for(let j = 0; j < bound2; j++){
        let numRow = num+103*(j+1);
        //if it intersects with anything...
        if(
          borderPositions.includes(num) || 
          borderPositions.includes(numRow) || 
          applePositions.includes(num) || 
          applePositions.includes(numRow) || 
          linePositions.includes(num) || 
          linePositions.includes(numRow) ||
          startingPositions.includes(num) ||
          startingPositions.includes(numRow)){

          generateCollisionRect(numOfCalls+1);
          return ;
          
        } else {
          newRectangle.push(numRow);
        }
      }
      //check if collisionRect was spawned in any of the borders
      num++; //switch to the next column
    }
    //concatenate array
    applePositions = applePositions.concat(newRectangle);
  }
  
  function generateRandomNum(){
    return Math.floor(Math.random() * 5665);
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
      gameOver();
      noteElement.innerHTML = `${error.message}. ${pressSpaceToStart} <div>${changeMode}</div> ${followMe}`;
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
        if (applePositions.includes(nextPosition) || borderPositions.includes(nextPosition)) {
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
        if (applePositions.includes(nextPosition) || borderPositions.includes(nextPosition)) {
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
        if (applePositions.includes(nextPosition) || borderPositions.includes(nextPosition)) {
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
        if (applePositions.includes(nextPosition) || borderPositions.includes(nextPosition)) {
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