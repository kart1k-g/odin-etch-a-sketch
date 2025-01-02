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

function createPrompts(){
    const promptContainer=document.createElement("div");
    promptContainer.id="prompt-container";
    const promptBoundary=document.createElement("div");
    promptBoundary.id="prompt-boundary";

    const clearBtn=document.createElement("button");
    clearBtn.classList.add("btn");
    clearBtn.id="clear-btn";
    clearBtn.textContent="Clear";
    clearBtn.addEventListener("click", clearClicked);
    
    const resizeBtn=document.createElement("button");
    resizeBtn.classList.add("btn");
    resizeBtn.id="resize-btn";
    resizeBtn.textContent="Resize";
    resizeBtn.addEventListener("click", resizeGridClicked);

    const toggleColorModeBtn=document.createElement("button");
    toggleColorModeBtn.classList.add("btn");
    toggleColorModeBtn.id="toggle-color-btn";
    toggleColorModeBtn.textContent=colorMode;
    toggleColorModeBtn.addEventListener("click", toggleColorModeClicked);

    const toggleProgressiveModeBtn=document.createElement("button");
    toggleProgressiveModeBtn.classList.add("btn");
    toggleProgressiveModeBtn.id="toggle-progressive-btn";
    toggleProgressiveModeBtn.textContent=progressiveDark?"Progressive Darkening":"Consistent Color";
    toggleProgressiveModeBtn.addEventListener("click", toggleProgressiveModeClicked);

    const colorPicker=document.createElement("input");
    colorPicker.setAttribute("type", "color");
    colorPicker.id="color-picker";


    promptBoundary.appendChild(resizeBtn);
    promptBoundary.appendChild(clearBtn);
    promptBoundary.appendChild(toggleProgressiveModeBtn);
    promptBoundary.appendChild(toggleColorModeBtn);
    promptBoundary.appendChild(colorPicker);


    promptContainer.appendChild(promptBoundary);
    return promptContainer;
}

function handleHover(event){
    setDivColor(event);
    updateOpacity(event);
}

function updateOpacity(event){
    const divOpacity=event.target.style.opacity;
    if(divOpacity==="")
        event.target.style.opacity=0.9;
    else if(Number(divOpacity)>0)
        event.target.style.opacity=Number(divOpacity)-0.1;
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

function pickColor(){
    const red=Math.floor(Math.random()*255);
    const green=Math.floor(Math.random()*255);
    const blue=Math.floor(Math.random()*255);
    return `rgb(${red},${green},${blue})`
}

function calcSideLen(squareCount, padding, gridLen){
    return Math.floor((gridLen-padding)/squareCount)
}

function clearClicked(){
    const btns=document.querySelectorAll(".square");
    btns.forEach(element => {
        element.style.backgroundColor="white";
    });
}

function resizeGridClicked(){
    newSquareCount=getGridSize();
    if(newSquareCount===0)
        return;

    document.querySelector("#main-container").remove();
    reset(newSquareCount);    
}

function getGridSize(){
    let newSquareCount=prompt("Enter grid blocks (1-100)");
    if(newSquareCount===null)
        return 0;
    newSquareCount=Number(newSquareCount);

    while(newSquareCount<0 || !newSquareCount || newSquareCount>100){
        newSquareCount=prompt("Enter a valid number(1-100) or cancel!");
        if(newSquareCount===null)
            return 0;
        newSquareCount=Number(newSquareCount);
    }
    return newSquareCount;
}

function toggleColorModeClicked(){
    const btn=document.querySelector("#toggle-color-btn");
    const colorPicker=document.querySelector("#color-picker");

    if(colorMode==="Monochrome"){
        colorMode="RGB";
        colorPicker.style.display="None";
        btn.textContent="RGB";
    }else if(colorMode==="RGB"){
        colorMode="Monochrome";
        btn.textContent="Monochrome";
        colorPicker.style.display="inline";
    }else{
        console.log("Error toggling color mode");
    }
}

function toggleProgressiveModeClicked(event){
    if(progressiveDark){
        event.target.textContent="Consistent Color";
    }else{
        event.target.textContent="Progressive Darkening";
    }
    progressiveDark=!progressiveDark;
}

function reset(squareCount=16){
    const gridLen=Math.min(window.innerWidth, window.innerHeight);  
    const padding=delta*gridLen;
    const sideLen=calcSideLen(squareCount, padding, gridLen);

    const mainContainer=document.createElement("div");
    mainContainer.id="main-container";
    
    const gridContainer=createGrid(squareCount, squareCount, sideLen);
    const promptContainer=createPrompts();
    const prevMainContainer=document.getElementById("main-container");
    if(prevMainContainer)
        prevMainContainer.remove();
    mainContainer.appendChild(promptContainer);
    mainContainer.appendChild(gridContainer);

    document.body.appendChild(mainContainer);
}

function initialise(){
    colorMode="Monochrome";
    progressiveDark=false;
    monoColorValue=`rgb(${0},${0},${0})`;
    delta=0.2;
    reset();
}

const grid=[];
let colorMode,
    monoColorValue,
    progressiveDark,
    delta;

window.addEventListener("load",initialise);