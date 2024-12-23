import { fillRect } from "../common/common-functions.js";
import { canvas } from "./page.js";


class Raven{
    constructor(ctx, image, spriteWidth, spriteHeight, x, y, dx, dy){
        this.ctx = ctx;
        this.image = image;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = spriteWidth * this.sizeModifier;
        this.height = spriteHeight * this.sizeModifier;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.markedForDeletion = false;
        this.frameX = 0;
        this.maxFrameX = 4;
        this.frameY = 0;
        this.timeSinceFlap = 0;
        this.flapInterval = 50;
    }

    update(deltaTime){
        this.x -= this.dx;

        this.timeSinceFlap += deltaTime;
        if(this.timeSinceFlap > this.flapInterval){
           this.timeSinceFlap = 0;
            if(this.frameX > this.maxFrameX) this.frameX = 0;
            else this.frameX++;
        }

        if(this.x < 0 - this.width) {this.markedForDeletion = true;}

        this.draw();
    }
    draw(){
        fillRect(this.ctx, this.x, this.y, this.width, this.height, "#fff");
        this.ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

export {Raven}