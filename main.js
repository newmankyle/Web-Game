import { EvilCircle } from './EvilCircle.js';
import { MousePos } from './MousePos.js';
import { random, initializeArray, drawMap } from './util.js';

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

  const canvas = document.querySelector('canvas');
  canvas.width = global.innerWidth;
  canvas.height = global.innerHeight;

  const ctx = canvas.getContext('2d');

  const posX = document.getElementById('x'); //use these to display the ball coordinates. 
  const posY = document.getElementById('y');
  const score = document.getElementById('counter');

  let cellSize = 0;

  //GAME INITIALIZATIONS

  let counter = 0; //Game Score / Mine counter
  let bounced = false;

  const mouse = new MousePos(canvas);
  const evil = new EvilCircle(cellSize, ctx);
  evil.setControls();

  const cell = new Array();
  const count = new Array();
  const checked = new Array();
  const bombs = initializeArray(cell, count, checked);

  global.addEventListener('mousemove', (e) => mouse.updateMousePos(e), false);
  global.addEventListener('click', (e) => mouse.setStarted(e, evil), false);
  global.addEventListener('resize', function(){console.log('resized')})

  // define loop that keeps drawing the scene constantly
  function loop() {
    cellSize = drawMap(cellSize, cell, ctx);
    //drawField();
    if (mouse.isStarted()) {
      evil.draw();
      evil.checkBounds(mouse, cellSize);

      posX.textContent = "MouseX: " + evil.coordX;
      posY.textContent = "MouseY: " + evil.coordY;

      bounced = evil.changeHeight(null, cellSize);
      if (!bounced) {
        //console.log("done");
      }
      //evil.collisionDetect();
    }

    requestAnimationFrame(loop);
  }

  loop();
})(window);