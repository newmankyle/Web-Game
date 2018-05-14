import {random} from './util.js';


function Shape() {
    this.x = random(0, window.innerWidth);
    this.y = random(0, window.innerHeight);
    this.velX = random(-7, 7);
    this.velY = random(-7, 7);
    this.exists = true;
}

//define the EvilCircle - My Code below
export  class EvilCircle {
    constructor(x, y, exists, cellSize) {
        Shape.call(this, x, y, exists);
        this.coordX = 0;
        this.coordY = 0;
        this.a = 0.1;
        this.v = 0;
        this.color = 'violet';
        this.size = cellSize / 3.5;
        this.fillSize = 0;
        this.velX = 20;
        this.velY = 20;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        //console.log(this.x, this.y, this.size, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(this.x, this.y, this.fillSize, 0, 2 * Math.PI);
        ctx.fill();
    }
    checkBounds(mouse, cellSize) {
        //First check the bounds of the circle
        if ((this.x + this.size) >= window.innerWidth) {
            this.x = window.innerWidth - this.size;
        }
        if ((this.x - this.size) <= 0) {
            this.x = this.size;
        }
        if ((this.y + this.size) >= window.innerHeight) {
            this.y = window.innerHeight - this.size;
        }
        if ((this.y - this.size) <= 0) {
            this.y = this.size;
        }
        //Update the position of the the circle
        this.x += (mouse.x - this.x) * mouse.easing;
        this.y += (mouse.y - this.y) * mouse.easing;
        //Update the square the circle is over
        this.coordX = Math.floor((this.x - 100) / cellSize);
        this.coordY = Math.floor((this.y - 100) / cellSize);
        //get rid of negative coordinates CONSIDER GETTING RID OF THIS
        if (this.coordX <= 0) {
            this.coordX = 0;
        }
        else if (this.coordX > 19) {
            this.coordX = 19;
        }
        if (this.coordY <= 0) {
            this.coordY = 0;
        }
        else if (this.coordY > 19) {
            this.coordY = 19;
        }
        //
        //if(mouse.x >=100 && mouse.x <=mapSize-100 && mouse.y >=100 && mouse.y <=mapSize-100){
        // posX.textContent = "MouseX: " + this.coordX;
        // posY.textContent = "MouseY: " + this.coordY;
        //posX.textContent = "MouseX: " + mouse.x;
        //posY.textContent = "MouseY: " + mouse.y;
        //}
    }
    setControls() {
        const _this = this;
        window.onkeydown = function (e) {
            if (e.keyCode === 65) {
                _this.x -= _this.velX;
            }
            else if (e.keyCode === 68) {
                _this.x += _this.velX;
            }
            else if (e.keyCode === 87) {
                _this.y -= _this.velY;
            }
            else if (e.keyCode === 83) {
                _this.y += _this.velY;
            }
        };
    }
    //changes the height of the ball bouncing.
    changeHeight(e, cellSize) {
        let bounce = false;
        this.v += this.a;
        this.fillSize += this.v;
        if (this.fillSize >= cellSize / 3.5) {
            this.v = -1 * this.v;
            this.fillSize = cellSize / 3.5 - 0.2;
        }
        else if (this.fillSize < 0) {
            this.v = -1 * this.v;
            this.fillSize = 0.2;
            bounce = true;
        }
        return bounce;
    }
}

  /* EvilCircle.prototype.collisionDetect = function() {
    
          let dx = this.x - ball.x;
          let dy = this.y - ball.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
    
          if (distance < this.size + ball.size) {
            ball.exists = false;
            counter--;
            score.textContent = "Ball Counter: " + counter;
          }
    
    }; */