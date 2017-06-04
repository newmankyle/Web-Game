/* 
* In-browser web game using the Javascript Canvas API.
*
* Player controls a ball that follows the mouse position on screen. The game is initiated
* When the mouse is clicked, the ball will start bouncing.Each square in the grid represents an uncovered
* piece which may contain: a blank space, a mine, or one of three power-ups. The game ends when all the mines
* are uncovered.
*
* The code used is mostly by the author, but was inspired by a Mozilla tutorial on web development. Some
* parts of the tutorial may have been used.
*
* Tutorial: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features
*
* Author: Kyle Newman   Date: May 28th, 2017
*/


// WINDOW INITIALIZATIONS

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var posX = document.getElementById('x'); //use these to display the ball coordinates. 
var posY = document.getElementById('y');
var score = document.getElementById('counter');

var counter = 0; //Game Score / Mine counter

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var mapSize = 0;
var cellSize = 0;
if(width < height){ //force square dimensions for the grid.
  mapSize = width;
}else{
  mapSize = height;
}
mapSize = Math.round(mapSize/100)*100; // round to the nearest hundred
cellSize = (mapSize-200)/20; // Want a 20 x 20 grid.

// function to generate random number between n and m.

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Shape(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.velX = random(-7,7);
    this.velY = random(-7,7);
    this.exists = true;
}


//define the EvilCircle - My Code below

function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, exists);

  this.coordX = 0;
  this.coordY = 0;
  
  this.color = 'violet';
  this.size = cellSize/3.5;
  this.velX = 20;
  this.velY = 20;
}

EvilCircle.prototype.draw = function(){
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
};

EvilCircle.prototype.checkBounds = function(e) {
  //First check the bounds of the circle
  
  if((this.x + this.size) >= width) {
    this.x = width - this.size;
  }

  if((this.x - this.size) <= 0) {
    this.x = this.size;
  }

  if((this.y + this.size) >= height) {
    this.y = height - this.size;
  }

  if((this.y - this.size) <= 0) {
    this.y = this.size;
  }
  
  //Update the position of the the circle
  evil.x += (mouse.x - evil.x) * mouse.easing;
  evil.y += (mouse.y - evil.y) * mouse.easing;
  
  //Update the square the circle is over
  evil.coordX = Math.floor((evil.x-100) / cellSize);
  evil.coordY = Math.floor((evil.y-100) / cellSize);
  
  //get rid of negative coordinates CONSIDER GETTING RID OF THIS
  if(evil.coordX <= 0){
      evil.coordX = 0;
  }else if(evil.coordX > 19){
      evil.coordX = 19;
  }
  if(evil.coordY <= 0){
      evil.coordY = 0;
  }else if(evil.coordY > 19){
      evil.coordY = 19;
  }
  
  //
  //if(mouse.x >=100 && mouse.x <=mapSize-100 && mouse.y >=100 && mouse.y <=mapSize-100){
    posX.textContent = "MouseX: " + evil.coordX;
    posY.textContent = "MouseY: " + evil.coordY;
      
    //posX.textContent = "MouseX: " + mouse.x;
    //posY.textContent = "MouseY: " + mouse.y;
  //}
  
};

EvilCircle.prototype.setControls = function(){
  var _this = this;
  window.onkeydown = function(e) {
    if (e.keyCode === 65) {
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) {
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {
      _this.y += _this.velY;
    }
  }
};

/* EvilCircle.prototype.collisionDetect = function() {

      var dx = this.x - ball.x;
      var dy = this.y - ball.y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + ball.size) {
        ball.exists = false;
        counter--;
        score.textContent = "Ball Counter: " + counter;
      }

}; */

function MousePos() {
  this.x = 50;
  this.y = 50;
  
  this.easing = 0.050;
}

MousePos.prototype.updateMousePos = function(e){
    var coord = getMousePos(canvas, e);
    mouse.x = coord.x;
    mouse.y = coord.y;
    
};

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function drawMap(){
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);
  
  
  for(var i = 100; i <= mapSize-100; i+=cellSize){
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth=1;
      
      ctx.beginPath();
      ctx.moveTo(101, i);
      ctx.lineTo(mapSize-100, i);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(i, 101);
      ctx.lineTo(i, mapSize-100);
      ctx.stroke();
  }
  for(var i = 0; i < 20; i++){
        for(var j = 0; j < 20; j++){
            if(cell[i][j] === 1){// bombs
                ctx.fillStyle = 'white';                
                ctx.fillRect(i*cellSize+101, j*cellSize+101, cellSize-2, cellSize-2);
            }else if(cell[i][j] === 2){// power one
                ctx.fillStyle = 'red';                
                ctx.fillRect(i*cellSize+101, j*cellSize+101, cellSize-2, cellSize-2);
            }else if(cell[i][j] === 3){// power two
                ctx.fillStyle = 'yellow';                
                ctx.fillRect(i*cellSize+101, j*cellSize+101, cellSize-2, cellSize-2);
            }else if(cell[i][j] === 4){// power three
                ctx.fillStyle = 'blue';                
                ctx.fillRect(i*cellSize+101, j*cellSize+101, cellSize-2, cellSize-2);
            }
        }
    }
}

function initializeArray(){
    var num = 0;
    var bombs = 0;
    for(var i = 0; i < 20; i++){
        cell[i] = new Array();
        checked[i] = new Array();
        count[i] = new Array();
        
        for(var j = 0; j < 20; j++){
            num = random(0, 1000);
            if(num <= 800){ // non-bomb space
              cell[i][j] = 0;
            }else if(num > 800 && num <= 950){// bomb space
              cell[i][j] = 1;
              bombs++; //keep track of bombs created.
            }else if(num > 950 && num <= 975){// power one
              cell[i][j] = 2;
            }else if(num > 975 && num <=995){// power two
              cell[i][j] = 3;
            }else{// power three
              cell[i][j] = 4;
            }
            
            checked[i][j] = 0;
            count[i][j] = 0;
        }
    }
    return bombs;
}

//GAME INITIALIZATIONS

// define array to store balls
var mouse = new MousePos();

var evil = new EvilCircle();
evil.setControls();

var cell = new Array();
var count = new Array();
var checked = new Array();
var bombs = initializeArray();

// define loop that keeps drawing the scene constantly

window.addEventListener('mousemove', mouse.updateMousePos, false);

function loop() {
  drawMap();
  //drawField();


  evil.draw();
  evil.checkBounds();
  //evil.collisionDetect();
  
  requestAnimationFrame(loop);
}



loop();
