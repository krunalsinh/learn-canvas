import { drawRectangle, drawCircle, addText } from '../common/common-functions.js';


class Bird{
    constructor(canvas, ctx, x, y, height, width, color, img){
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.vy = 0;
        this.weight = 1;
        this.angle = 0;
        this.frameX = 0;
        this.img = img;
    }
    animate(spacePressed){

        // console.log(spacePressed);

        let curve = Math.sin(this.angle) * 20;
        
        if(this.y > this.canvas.height - (this.height * 3) + curve){
            this.y =  this.canvas.height - (this.height * 3) + curve;
            this.vy = 0;
        }else{
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }

        if(this.y < 0 + this.height){
            this.y = 0 + this.height;
            this.vy = 0;
        }

        if(spacePressed && this.y > this.height * 3) this.flap();

        this.angle += 0.12;

        this.draw();
    }
    flap(){
        this.vy -= 2;

        if(this.frameX >= 2) this.frameX = 0;
        else this.frameX++;
    }
    draw(){
        // drawRectangle(this.ctx, this.x, this.y, this.width, this.height, this.color);
        this.ctx.drawImage(this.img, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

class Particle{
    constructor(ctx, x, y, size, speedY, color){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedY = speedY;
        
    }
    animate(gameSpeed){
        this.x -= gameSpeed;
        this.y += this.speedY;

        this.draw();
    }
    draw(){
        drawCircle(this.ctx, this.x, this.y, this.size, this.color);
    }
}

class Obstacle{
    constructor(ctx, x, top, bottom, endY, color, width){
        this.ctx = ctx;
        this.endY = endY;
        this.top = top;
        this.bottom = bottom;
        this.x = x;
        this.color = color;
        this.width = width;
    }

    animate(gameSpeed){
        this.x -= gameSpeed;

        this.draw();
    }

    draw(){
        drawRectangle(this.ctx, this.x, 0, this.width, this.top, this.color);
        drawRectangle(this.ctx, this.x, this.endY - this.bottom, this.width, this.endY - this.bottom, this.color);
    }
}

class Score{
    constructor(ctx, x, y, color, scoreCount){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.scoreCount = scoreCount;
    }
    update(){
        this.draw();
    }
    draw(){
        addText(this.ctx, this.x, this.y, "24px", "Open Sens", this.color, "Score : "+this.scoreCount, "right")
    }
}

class Power{
    constructor(ctx, x, y, width, height, color, img){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.img = img;
        this.dy = 0;
        this.verMovementSize = this.height / 2;
        this.verMoveRatio = 0.05;
    }
    update(gameSpeed){
        this.x -= gameSpeed;
        this.dy += this.verMoveRatio;
        this.y = this.y + Math.sin(this.dy) * 3;
        
        this.draw();
    }
    draw(){
        // drawRectangle(this.ctx, this.x, this.y, this.width, this.height, this.color);
        this.ctx.drawImage(this.img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}
export {Bird, Particle, Obstacle, Score, Power};