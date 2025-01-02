function createGrid(rows, cols, sideLen){
    const gridContainer=document.createElement("div");
    const gridBoundary=document.createElement("div");
    gridContainer.id="grid-container";
    gridBoundary.id="grid-boundary";

    for(let i=1;i<=rows;i++){
        const temp=[];
        const row=document.createElement("div");
        row.classList.add("row-container");
        row.id=`row-container-${i}`;

        for(let j=1;j<=cols;j++){
            const square=document.createElement("div");
            square.addEventListener("mouseleave",handleHover);

            square.classList.add(`square`);
            square.id=`square-${(i-1)*16+j}`;

            square.style.width=sideLen+"px";
            square.style.height=sideLen+"px";

            temp.push(square);
            row.appendChild(square);
        }
        grid.push(temp);
        gridBoundary.appendChild(row);
    }
    gridContainer.appendChild(gridBoundary);
    return gridContainer
}

function calcSideLen(squareCount, padding, gridLen){
    return Math.floor((gridLen-padding)/squareCount)
}

function createPrompts(){
    const promptContainer=document.createElement("div");
    promptContainer.id="prompt-container";
    const promptBoundary=document.createElement("div");
    promptBoundary.id="prompt-boundary";

    const resetBtn=document.createElement("button");
    resetBtn.classList.add("btn");
    resetBtn.id="reset-btn";
    resetBtn.textContent="Reset";

    const resizeBtn=document.createElement("button");
    resizeBtn.classList.add("btn");
    resizeBtn.id="resize-btn";
    resizeBtn.textContent="Resize";

    const toggleColorModeBtn=document.createElement("button");
    toggleColorModeBtn.classList.add("btn");
    toggleColorModeBtn.id="toggle-color-btn";
    toggleColorModeBtn.textContent=colorMode;

    const toggleProgressiveModeBrn=document.createElement("button");
    toggleProgressiveModeBrn.classList.add("btn");
    toggleProgressiveModeBrn.id="toggle-progressive-btn";
    toggleProgressiveModeBrn.textContent=progressiveDark?"Progressive Darkening":"Consistent";

    const colorPicker=document.createElement("input");
    colorPicker.setAttribute("type", "color");
    colorPicker.id="color-picker";


    promptBoundary.appendChild(resetBtn);
    promptBoundary.appendChild(resizeBtn);
    promptBoundary.appendChild(toggleProgressiveModeBrn);
    promptBoundary.appendChild(toggleColorModeBtn);
    promptBoundary.appendChild(colorPicker);


    promptContainer.appendChild(promptBoundary);
    return promptContainer;
}

function handleHover(event){
    setDivColor(event);
}

function pickColor(){
    const red=Math.floor(Math.random()*255);
    const green=Math.floor(Math.random()*255);
    const blue=Math.floor(Math.random()*255);
    return `rgb(${red},${green},${blue})`
}

function setDivColor(event){
    switch(colorMode){
        case "Monochrome":
                event.target.style.backgroundColor=monoColorValue;
                break;
        case "RGB":
                event.target.style.backgroundColor=pickColor();
                break;
        default:
                console.log(`Error coloring div ${event.target.id}`);
                break;
    }
}

function reset(squareCount=16, delta=0.2){
    const gridLen=Math.min(window.innerWidth, window.innerHeight);  
    const padding=delta*gridLen;
    const sideLen=calcSideLen(squareCount, padding, gridLen);

    const mainContainer=document.createElement("div");
    mainContainer.id="main-container";
    
    const gridContainer=createGrid(squareCount, squareCount, sideLen);
    const promptContainer=createPrompts();
    mainContainer.appendChild(promptContainer);
    mainContainer.appendChild(gridContainer);

    document.body.appendChild(mainContainer);
}

function initialise(){
    colorMode="Monochrome";
    progressiveDark=false;
    monoColorValue=`rgb(${0},${0},${0})`
    reset();
}

const grid=[];
let colorMode,
    monoColorValue,
    progressiveDark;

window.addEventListener("load",initialise);
// console.log(screen.height); 