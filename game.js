const grids = document.getElementById("gameBox");
const container = document.getElementById("container");
// size  of the grid
let size = 3;
// number of tests to be displayed to the user
let numberOfTests = 2;
// number of lives the user has
let lives = 3;
// score of the user
let score = 0;
// creates a new canvas
createNewCanvas(size);

function createNewCanvas(size) {
  // checks if the user has lost all their lives
  if (lives === 0) {
    setTimeout(function () {
      // displays the score of the user and a button to play again
      container.innerHTML = "you lost the game with a score of " + score + " ";
      // creates a button to play again
      const replay = document.createElement("button");
      replay.innerHTML = "Play Again";
      replay.classList.toggle("replay");
      container.appendChild(replay);
      // removes the canvas and resets the size of the canvas to 0
      grids.innerHTML = "";
      grids.style.height = "0px";
      grids.style.width = "0px";
      grids.style.padding = "0px";
      // when the user clicks on the button the page reloads
      replay.onclick = function () {
        location.reload();
      };
    }, 300);
  } else {
    // sets the grid-template-columns and grid-template-rows of the grid to a repeat of the size variable. It ensures that the grid is responsive and the grid cells are always at least 5px wide.
    grids.style.gridTemplateColumns =
      " repeat(" + size + ", minmax(5px, 150px))";
    grids.style.gridTemplateRows =
      " repeat(" + size + ", minmax(5px, auto-fit))";
    // creates a new array of divs and appends them to the grid. It also adds a class of item to each div.
    let canvasGrids = new Array(size * size);
    // adds a background color to each div. also it adds a pointerenter and pointerleave event listener to each div.
    for (let i = 0; i < size * size; i++) {
      // creates a div element and adds a class of item to it and adds it to the canvasGrids array
      let cubes = document.createElement("div");
      cubes.classList.toggle("item");
      canvasGrids[i] = cubes;
      // adds a background color and highlighter to each div
      canvasGrids[i].onpointerenter = function (e) {
        if (
          e.target.style.backgroundColor !== "white" &&
          e.target.style.backgroundColor !== "gray"
        ) {
          e.target.style.backgroundColor = "rgba(39, 39, 245, 0.503)";
        }
      };
      canvasGrids[i].onpointerleave = function (e) {
        if (
          e.target.style.backgroundColor !== "white" &&
          e.target.style.backgroundColor !== "gray"
        ) {
          e.target.style.backgroundColor = "rgba(39, 39, 245, 0.703)";
        }
      };
      // adds the div to the grid
      grids.appendChild(cubes);
    }

    createRandomTests(canvasGrids);
  }
}

function createRandomTests(canvasGrids) {
  // array of random tests to be displayed to the user
  // and the number of correct answers the user has gotten
  // and the number of tries the user get before losing a life
  let result = new Array(numberOfTests);
  let correctAnswers = 0;
  let tries = 3;

  //a for loop that creates a random number between 0 and the length of the canvasGrids
  for (let i = 0; i < numberOfTests; ) {
    let randomIndex = Math.floor(Math.random() * canvasGrids.length);
    // checks if the result query already contains the canvasgrid at the random index
    if (!result.includes(canvasGrids[randomIndex])) {
      // if it doesn't then it adds the canvasgrid at the random index to the result array
      result[i] = canvasGrids[randomIndex];
      // changes the background color of the canvasgrid at the random index to white
      setTimeout(function () {
        canvasGrids[randomIndex].style.backgroundColor = "white";
      }, 1000);
      // changes the background color of the canvasgrid at the random index to blue after 4 seconds
      setTimeout(function () {
        canvasGrids[randomIndex].style.backgroundColor =
          "rgba(39, 39, 245, 0.703)";
      }, 4000);
      i++;
    }
  }

  setTimeout(function () {
    // checks if the user has clicked on the correct canvasgrid
    grids.onpointerdown = function (e) {
      // if the user clicks on the correct canvasgrid then the background
      //color of the canvasgrid changes to white and the correctAnswers variable increases by 1
      if (
        result.includes(e.target) &&
        e.target.style.backgroundColor !== "white"
      ) {
        e.target.style.backgroundColor = "white";
        correctAnswers++;

        // if the user has clicked on all the correct canvasgrids then number of tests increases by 1
        // and if number of tests + 2 is a prime number then the size of the grid increases by 1
        if (correctAnswers === numberOfTests) {
          setTimeout(function () {
            if (isPrime(numberOfTests + 2)) size++;
            //to remove the old canvas
            grids.innerHTML = "";
            numberOfTests++;
            score++;
            document.getElementById("score").innerHTML = "Score: " + score;
            createNewCanvas(size);
          }, 600);
        }
      }
      // if the user clicks on the wrong canvasgrid then the background color of the canvasgrid changes to gray
      else if (
        e.target.style.backgroundColor !== "white" &&
        e.target.style.backgroundColor !== "gray"
      ) {
        e.target.style.backgroundColor = "gray";
        // to insure that the background color of the grids doesn't change to gray
        if (grids.style.backgroundColor !== "white") {
          grids.style.backgroundColor = "white";
        }
        // if the user clicks on the wrong canvasgrid then the tries variable decreases by 1
        tries--;
        // if the tries variable is equal to 0 then the lives variable decreases by 1
        if (tries === 0) {
          lives--;
          document.getElementById("health").innerHTML =
            "Lives remaining: " + lives;
          grids.innerHTML = "";
          createNewCanvas(size);
        }
      }
    };
  }, 1000);
}
// checks if a number is a prime number
function isPrime(numberOfTests) {
  for (let i = 2; i < numberOfTests; i++)
    if (numberOfTests % i === 0) return false;
  return numberOfTests > 1;
}
