let sketchPad = document.getElementById("sketchPad");
let gridSizeInput = document.getElementById("gridSize");
const reset = document.getElementById("reset");

let gridSize = 16;

//Main Code

newSketchPad();

gridSizeInput.addEventListener("keydown", (e) => {
    if(gridSizeInput !== null && e.key === "Enter") {
        e.preventDefault();
        gridSize = parseInt(gridSizeInput.value);
        clearSketchPad();
        newSketchPad();
    }
});

reset.addEventListener("click", () => {
    clearSketchPad();
    newSketchPad();
});

//Mouse interaction

let squares = document.querySelectorAll(".squares");

sketchPad.addEventListener("mouseover", (e) => {
    if(e.target.classList.contains("squares")) {
        e.target.style.backgroundColor = "black";
    }
});

//Functions

function newSketchPad() {
    for (let i = 0;i < gridSize;i++) {
        let columns = document.createElement("div");
        columns.classList.add("columns");
        sketchPad.appendChild(columns);

        for(let j = 0;j < gridSize;j++){
            const squares = document.createElement("div");
            squares.classList.add("squares");
            columns.appendChild(squares);
        }
    }
}

function clearSketchPad() {
    const columns = document.getElementsByClassName("columns");
    
    while (columns.length > 0){
        columns[0].remove();
    }
}