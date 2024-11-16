
import {cellSize, canvasWidth, canvasHeight, carsImg, frogImg} from "./page.js";
import { drawCircle, drawRectangle } from "../common/common-functions.js";

class Frog{
    constructor(ctx, spriteWidth, spriteHeight){
        this.ctx = ctx;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;

        this.width = spriteWidth / 5;
        this.height = spriteHeight / 5;
        this.y = canvasHeight - this.height - 40;
        this.x = canvasWidth / 2 - this.width / 2;
        this.moving = true;
        this.color = "green";
        this.frameX = 0;
        this.frameY = 0;
    }
    update(keys){
        
        if(keys[38] && this.moving === false){
            this.y -= cellSize;
            this.moving = true;
            this.frameY = 0;
        }
        if(keys[40] && this.moving === false){
            if(this.y < canvasHeight - this.height * 2 )
            this.y += cellSize;
            this.moving = true;
            this.frameY = 3;
        }
        if(keys[37] && this.moving === false){
            if(this.x > -this.width){
                this.x -= cellSize;
            }
            this.moving = true;
            this.frameY = 2;
        }
        if(keys[39] && this.moving === false){
            if(this.x < canvasWidth + this.width){
                this.x += cellSize;
            }
            this.moving = true;
            this.frameY = 1;
        }
        this.draw();
    }
    draw(){
        // drawRectangle(this.ctx, this.x, this.y, this.width, this.height, this.color);
        this.ctx.drawImage(frogImg, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - this.width / 2 , this.y - this.height / 2, this.width * 2, this.height * 2)

    }
    jump(){
        if(this.moving === false) this.frameX = 1
        else if(this.frameX === 1) this.frameX = 0;
    }
}

class Obstacle{
    constructor(ctx, x, y, width, height, speed, type){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.y = y;
        this.x = x;
        this.speed = speed;
        this.type = type;
    }
    update(gameSpeed){
        
        this.x += this.speed ;
        if(this.speed < 0){
            if(this.x + this.width < 0 ){
                this.x = canvasWidth + this.width
            }
        }else{
            if(this.x + this.width > canvasWidth + this.width ){
                this.x = 0 - this.width * 2
            }
        }
        this.draw();
    }
    draw(){
        drawRectangle(this.ctx, this.x, this.y, this.width, this.height, "#666")
    }
}

class Particle{
    constructor(ctx, x, y, radius,speed, color){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.opacity = 0.5;
        this.speed = speed
    }
    update(){
        this.x += this.speed.x;
        this.y += this.speed.y;

        this.opacity -= 0.02;
        this.draw();
    }
    draw(){
        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;
        drawCircle(this.ctx, this.x, this.y, this.radius, this.color)
        this.ctx.restore();
    }
}

class Ripple{
    constructor(ctx, x, y, radius, color){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.opacity = 0.7;
    }
    update(){
        this.radius += 1;
        this.opacity -= 0.02;
        this.draw();
    }
    draw(){
        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;
        drawCircle(this.ctx, this.x, this.y, this.radius, this.color, true, 1, this.color)
        this.ctx.restore();
    }

}

export { Frog , Obstacle, Particle, Ripple}