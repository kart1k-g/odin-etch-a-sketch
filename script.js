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

function calcSideLen(squareCount, delta, gridLen){
    return Math.floor((gridLen-delta)/squareCount)
}

function initialise(){
    const gridLen=Math.min(window.innerWidth, window.innerHeight);
    const squareCount=16;
    const delta=0.2*gridLen;
    
    const sideLen=calcSideLen(squareCount, delta, gridLen);

    console.log(sideLen);
    const gridContainer=createGrid(squareCount, squareCount, sideLen);
    document.body.appendChild(gridContainer);
}

const grid=[];

window.addEventListener("load",initialise);
// console.log(screen.height); 