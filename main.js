import { EvilCircle } from './EvilCircle.js';
import { MousePos } from './MousePos.js';
import { random } from './util.js';

/** 
* In-browser web game using the Javascript Canvas API.
*
* Player controls a ball that follows the mouse position on screen. The game is initiated
* When the mouse is clicked, the ball will start bouncing.Each square in the grid represents an uncovered
* piece which may contain: a blank space, a mine, or one of three power-ups. The game ends when all the mines
* are uncovered.
* Author: Kyle Newman   Date: May 28th, 2017
*/
// global INITIALIZATIONS
(function (global) {
  'use strict';


  let canvas = document.querySelector('canvas');
  canvas.width = global.innerWidth;
  canvas.height = global.innerHeight;

  let ctx = canvas.getContext('2d');

  let posX = document.getElementById('x'); //use these to display the ball coordinates. 
  let posY = document.getElementById('y');
  let score = document.getElementById('counter');

  let mapSize = 0;
  let cellSize = 0;

  function drawMap() {

    if (global.innerWidth < global.innerHeight) { //force square dimensions for the grid.
      mapSize = global.innerWidth;
    } else {
      mapSize = global.innerHeight;
    }
    mapSize = Math.round(mapSize / 100) * 100; // round to the nearest hundred
    cellSize = (mapSize - 200) / 20; // Want a 20 x 20 grid.

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, global.innerWidth, global.innerHeight);


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
  }

  function initializeArray(cellArray, countArray, checkedArray) {
    let num = 0;
    let bombs = 0;
    for (let i = 0; i < 20; i++) {
      cellArray[i] = new Array();
      checkedArray[i] = new Array();
      countArray[i] = new Array();

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

  //GAME INITIALIZATIONS

  let counter = 0; //Game Score / Mine counter
  let bounced = false;

  const mouse = new MousePos();

  const evil = new EvilCircle();
  evil.setControls();

  const cell = new Array();
  const count = new Array();
  const checked = new Array();
  const bombs = initializeArray(cell, count, checked);





  global.addEventListener('mousemove', (e) => {
    mouse.updateMousePos(e, canvas)
  }, false);
  global.addEventListener('click', (e) => {
    mouse.setStarted(e, canvas, evil)
  }, false);
  //global.addEventListener('resize', )

  // define loop that keeps drawing the scene constantly
  function loop() {
    drawMap();
    //drawField();
    if (mouse.isStarted()) {
      evil.draw(ctx);
      evil.checkBounds(mouse, cellSize);

      posX.textContent = "MouseX: " + evil.coordX;
      posY.textContent = "MouseY: " + evil.coordY;

      bounced = evil.changeHeight(null, cellSize);
      if (!bounced) {
        console.log("done");
      }
      //evil.collisionDetect();
    }

    requestAnimationFrame(loop);
  }

  loop();
})(window);