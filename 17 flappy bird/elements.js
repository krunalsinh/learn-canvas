import { drawRectangle, drawCircle } from '../common/common-functions.js';


class Bird{
    constructor(canvas, ctx, x, y, height, width, color){
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
    }
    draw(){
        drawRectangle(this.ctx, this.x, this.y, this.width, this.height, this.color);
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
    constructor(top, bottom, endY, endX, color, width){
        this.top = top;
        this.bottom = bottom;
        this.endY = endY;
        this.endX = endX;
        this.color = color;
        this.width = width;
    }
    animate(gameSpeed){

    }
}
export {Bird, Particle};