//When the DOM has fully loaded, call this function
window.addEventListener("DOMContentLoaded", function(event) { 
    this.window.focus(); //when the player enters the website, keys should be captured immediately
    let currPos; //a number denoting what tile the head of the line is in

    let startTime;
    let prevTime;
    //inputs keeps track of all the directions the line needs to fulfill
    let inputs; 
    let gameStarted = false;

    //grid height/width
    const width = 60;
    const height = 30; 
    //how fast it takes the line to travel across the grid, in milliseconds
    const speed = 200; 

    //Set up an array of grids
    //Hierarchy: Grid -> Tile -> Content
    for(let i = 0; i < height * width; i++){
        //create content
        const content = document.createElement("div");
        content.setAttribute("class", "content");
        //create tile
        const tile = document.createElement("div");
        content.setAttribute("class", "tile");
        //set content child of tile
        tile.appendChild(content);
        //set tile child of grid
        grid.appendChild(tile);
    }

    //reference to the array of tiles
    const tiles = document.querySelectorAll(".grid .tile .content");
    initializeGame();
    
    function initializeGame(){
        currPos = 600;
        startTime = undefined;
        endTime = undefined;
    }

    window.addEventListener("keydown", function (event) {
        //if anything but ArrowLeft, ArrowUp, ArrowRight, or ArrowDown is pressed, do nothing
        if (!["ArrowLeft","ArrowUp","ArrowRight","ArrowDown"].includes(event.key))
          return;
    
        //preventDefault() acts to prevent any unwanted scrolling from pressing the arrow keys
        event.preventDefault();
        
        //When an arrow key is pressed, the line's direction should change to the respective key
        //Line's direction will be stored in var inputs
        /*
            A number won't be appended to var inputs if: 
            1) The same arrow key was pressed twice
            2) A full turn was requested
        */

    //If ArrowLeft was pressed and the line isn't moving left or right
      if (
        event.key == "ArrowLeft" &&
        inputs[inputs.length - 1] != "left" &&
        inputs[inputs.length - 1] != "right"
      ) {
    //Update direction to left by adding it to the end of inputs
        inputs.push("left");
    //If the game didn't start, start it
        if (!gameStarted) startGame();
        return;
      }
      if (
        event.key == "ArrowUp" &&
        inputs[inputs.length - 1] != "up" &&
        inputs[inputs.length - 1] != "down"
      ) {
        inputs.push("up");
        if (!gameStarted) startGame();
        return;
      }
      if (
        event.key == "ArrowRight" &&
        inputs[inputs.length - 1] != "right" &&
        inputs[inputs.length - 1] != "left"
      ) {
        inputs.push("right");
        if (!gameStarted) startGame();
        return;
      }
      if (
        event.key == "ArrowDown" &&
        inputs[inputs.length - 1] != "down" &&
        inputs[inputs.length - 1] != "up"
      ) {
        inputs.push("down");
        if (!gameStarted) startGame();
        return;
      }
    });

    function getNextPosition(){
        //shift() method removes the first element from an array and returns that removed element
        const direction = inputs.shift(); 
        switch(direction){
            case "right": {
                return currPos+1;
            }
            case "left": {
                return currPos-1;
            }
            case "up": {
                return currPos-width;
            }
            case "down": {
                return currPos+width;    
            }
        }
    }

    function startGame() {
        gameStarted = true;
        noteElement.style.opacity = 0;
        window.requestAnimationFrame(main);
    }

    function main(){

    }

    //To do: main(); the game loop
    //setTile(); this function will draw the line on the tile
    //stepAndTransition();this function will help make the line drawing look seamless
    //Transition(); a complementary to StepAndTransition();









}