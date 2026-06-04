const sketchPad = document.getElementById("sketchPad");
let gridSizeInput = document.getElementById("gridSize");
const reset = document.getElementById("reset");
const rgb = document.getElementById("rgb");
const gradient = document.getElementById("gradient");


//Initial state

let gridSize = 16;
newSketchPad();

//User grid size input

//Only allows numeric input

gridSizeInput.addEventListener("beforeinput", function(e) {
    const nextVal = 
      e.target.value.substring(0, e.target.selectionStart) +
      (e.data ?? '') +
      e.target.value.substring(e.target.selectionEnd);
    if(!/^(\d{0,7}|\d{3}-?\d{0,4}|)$/.test(nextVal)) {
        e.preventDefault();
    }
    return;
});


//Passes the value of GridSizeInput as an int and draws a new sketchPad

gridSizeInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        e.preventDefault();
        
        const newGridSize = parseInt(gridSizeInput.value, 10);

        if (newGridSize > 0 && newGridSize <= 100) {
            gridSize = newGridSize;
            clearSketchPad();
            newSketchPad();
        } else {
            window.alert("Number must be between 1 and 100!")
        }
    }
});

reset.addEventListener("click", () => {
    clearSketchPad();
    newSketchPad();
});

//Mouse interaction

sketchPad.addEventListener("mouseover", (e) => {
    const target = e.target;
    // guard clause
    if (!target.classList.contains("square")) return;

    if (!rgb.checked && !gradient.checked) {
        target.style.backgroundColor = "black";        
    } else if (rgb.checked && !gradient.checked) {
        target.style.backgroundColor = randomColor();        
    } else if (gradient.checked) {
        const currentOpacity = parseFloat(target.dataset.opacity) || 0;
        const newOpacity = Math.min(currentOpacity + 0.1, 1);
        
        target.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
        target.dataset.opacity = newOpacity;
    }   
});

//Functions

function newSketchPad() {
    for (let i = 0;i < gridSize;i++) {
        let columns = document.createElement("div");
        columns.classList.add("columns");
        sketchPad.appendChild(columns);

        for(let j = 0;j < gridSize;j++){
            const square = document.createElement("div");
            square.classList.add("square");
            columns.appendChild(square);
        }
    }
}

function clearSketchPad() {
    sketchPad.innerHTML = "";
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r},${g},${b})`;
}