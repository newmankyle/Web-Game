
// function to generate random number between n and m.

export function random(min, max) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

export function initializeArray(cellArray, countArray, checkedArray) {
    let num = 0;
    let bombs = 0;
    for (let i = 0; i < 20; i++) {
        cellArray[i] = new Array();
        checkedArray[i] = new Array();
        countArray[i] = new Array();

        /**
         * Randomly generate 20 values between 0 and 1000
         * normal space: 80% chance
         * bomb space: 15% chance
         * first power: 2.5% chance
         * second power: 2.0% chance
         * third power: 0.5% chance
         */
        for (let j = 0; j < 20; j++) {
            num = random(0, 1000);
            if (num <= 800) { // non-bomb space
                cellArray[i][j] = 0;
            } else if (num > 800 && num <= 950) {// bomb space
                cellArray[i][j] = 1;
                bombs++; //keep track of bombs created.
            } else if (num > 950 && num <= 975) {// power one
                cellArray[i][j] = 2;
            } else if (num > 975 && num <= 995) {// power two
                cellArray[i][j] = 3;
            } else {// power three
                cellArray[i][j] = 4;
            }

            checkedArray[i][j] = 0;
            countArray[i][j] = 0;
        }
    }
    return bombs;
}

export function drawMap(cellSize, cell, ctx) {
    let mapSize = 0;

    if (window.innerWidth < window.innerHeight) { //force square dimensions for the grid.
        mapSize = window.innerWidth;
    } else {
        mapSize = window.innerHeight;
    }
    mapSize = Math.round(mapSize / 100) * 100; // round to the nearest hundred
    cellSize = (mapSize - 200) / 20; // Want a 20 x 20 grid.

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);


    for (let i = 100; i <= mapSize - 100; i += cellSize) {
        ctx.strokeStyle = 'rgba(255,255,255,0.25)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(101, i);
        ctx.lineTo(mapSize - 100, i);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i, 101);
        ctx.lineTo(i, mapSize - 100);
        ctx.stroke();
    }
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            if (cell[i][j] === 1) {// bombs
                ctx.fillStyle = 'white';
                ctx.fillRect(i * cellSize + 101, j * cellSize + 101, cellSize - 2, cellSize - 2);
            } else if (cell[i][j] === 2) {// power one
                ctx.fillStyle = 'red';
                ctx.fillRect(i * cellSize + 101, j * cellSize + 101, cellSize - 2, cellSize - 2);
            } else if (cell[i][j] === 3) {// power two
                ctx.fillStyle = 'yellow';
                ctx.fillRect(i * cellSize + 101, j * cellSize + 101, cellSize - 2, cellSize - 2);
            } else if (cell[i][j] === 4) {// power three
                ctx.fillStyle = 'blue';
                ctx.fillRect(i * cellSize + 101, j * cellSize + 101, cellSize - 2, cellSize - 2);
            }
        }
    }
    return cellSize;
}