const grids = document.getElementById("gameBox");
let size = 3;
grids.style.gridTemplateColumns = " repeat(" + size + ", minmax(5px, 150px))";
grids.style.gridTemplateRows = " repeat(" + size + ", minmax(5px, auto-fit))";
createNewCanvas(size);
function createNewCanvas(size){
let canvasGrids = new Array(size*size);
for (let i = 0; i < size * size; i++) {
  let cubes = document.createElement("div");
  cubes.classList.toggle("item");
  canvasGrids[i] = cubes;
  grids.appendChild(cubes);
}
createRandomTests();
}
function createRandomTests(){


}
