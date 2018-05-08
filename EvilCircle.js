

class Shape {
    constructor() {
        this.x = Math.random(0, width);
        this.y = Math.random(0, height);
        this.velX = Math.random(-7, 7);
        this.velY = Math.random(-7, 7);
        this.exists = true;
    }
}

//define the EvilCircle - My Code below
class EvilCircle extends Shape {
    constructor(x, y, exists) {
        super(x, y, exists);
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
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(this.x, this.y, this.fillSize, 0, 2 * Math.PI);
        ctx.fill();
    }
    checkBounds(e) {
        //First check the bounds of the circle
        if ((this.x + this.size) >= width) {
            this.x = width - this.size;
        }
        if ((this.x - this.size) <= 0) {
            this.x = this.size;
        }
        if ((this.y + this.size) >= height) {
            this.y = height - this.size;
        }
        if ((this.y - this.size) <= 0) {
            this.y = this.size;
        }
        //Update the position of the the circle
        evil.x += (mouse.x - evil.x) * mouse.easing;
        evil.y += (mouse.y - evil.y) * mouse.easing;
        //Update the square the circle is over
        evil.coordX = Math.floor((evil.x - 100) / cellSize);
        evil.coordY = Math.floor((evil.y - 100) / cellSize);
        //get rid of negative coordinates CONSIDER GETTING RID OF THIS
        if (evil.coordX <= 0) {
            evil.coordX = 0;
        }
        else if (evil.coordX > 19) {
            evil.coordX = 19;
        }
        if (evil.coordY <= 0) {
            evil.coordY = 0;
        }
        else if (evil.coordY > 19) {
            evil.coordY = 19;
        }
        //
        //if(mouse.x >=100 && mouse.x <=mapSize-100 && mouse.y >=100 && mouse.y <=mapSize-100){
        posX.textContent = "MouseX: " + evil.coordX;
        posY.textContent = "MouseY: " + evil.coordY;
        //posX.textContent = "MouseX: " + mouse.x;
        //posY.textContent = "MouseY: " + mouse.y;
        //}
    }
    setControls() {
        var _this = this;
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
    changeHeight(e) {
        var bounce = false;
        evil.v += evil.a;
        evil.fillSize += evil.v;
        if (evil.fillSize >= cellSize / 3.5) {
            evil.v = -1 * evil.v;
            evil.fillSize = cellSize / 3.5 - 0.2;
        }
        else if (evil.fillSize < 0) {
            evil.v = -1 * evil.v;
            evil.fillSize = 0.2;
            bounce = true;
        }
        return bounce;
    }
}
