
import {cellSize, canvasWidth, canvasHeight} from "./page.js";
import { drawRectangle } from "../common/common-functions.js";

class Frog{
    constructor(ctx, spriteWidth, spriteHeight){
        this.ctx = ctx;
        this.width = spriteWidth / 5;
        this.height = spriteHeight / 5;
        this.y = canvasHeight - this.height - 40;
        this.x = canvasWidth / 2 - this.width / 2;
        this.moving = true;
    }
    update(keys){
        
        if(keys[38] && this.moving === false){
            if(this.height)
            this.y -= cellSize;
            this.moving = true;
        }
        if(keys[40] && this.moving === false){
            if(this.y < canvasHeight - this.height * 2 )
            this.y += cellSize;
            this.moving = true;
        }
        if(keys[37] && this.moving === false){
            if(this.x > -this.width){
                this.x -= cellSize;
            }
            this.moving = true;
        }
        if(keys[39] && this.moving === false){
            if(this.x < canvasWidth + this.width){
                this.x += cellSize;
            }
            this.moving = true;
        }
        this.draw();
    }
    draw(){
        drawRectangle(this.ctx, this.x, this.y, this.width, this.height, "green")
    }
}

class Obstacle{
    constructor(ctx, x, y, width, height, speed){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.y = y;
        this.x = x;
        this.speed = speed;
    }
    update(){
        this.x += this.speed;
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


export { Frog , Obstacle}