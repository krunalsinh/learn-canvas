import { addText, fillRect } from "../common/common-functions.js";
import { canvas } from "./page.js";


class Raven{
    constructor(ctx, ctx2, image, spriteWidth, spriteHeight, x, y, dx, dy){
        this.ctx = ctx;
        this.ctx2 = ctx2;
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
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColor = [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)]
        this.color = `rgb(${this.randomColor[0]}, ${this.randomColor[1]}, ${this.randomColor[2]})`;
    }

    update(deltaTime){
        this.x -= this.dx;
        if(this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }

        this.y += this.dy;
        if(this.y < 0 || this.y > canvas.height - this.height){
            this.dy = -this.dy;
        }
        this.timeSinceFlap += deltaTime;
        if(this.timeSinceFlap > this.flapInterval){
           this.timeSinceFlap = 0;
            if(this.frameX > this.maxFrameX) this.frameX = 0;
            else this.frameX++;
        }

        this.draw();
    }
    draw(){
        fillRect(this.ctx2, this.x, this.y, this.width, this.height, this.color);
        this.ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

class Score{
    constructor(ctx, score, x, y){
        this.ctx = ctx;
        this.score = score;
        this.x = x;
        this.y = y;
    }
    increaseScore(){
        this.score += 1;
    }
    decreaseScore(){
        this.score -= 1;
    }   
    draw(){
        addText(this.ctx, this.x, this.y, "50px", "Roboto", "black", `Score: ${this.score}`);
        addText(this.ctx, this.x + 3, this.y + 3, "50px", "Roboto", "white", `Score: ${this.score}`);
    }
}

class Explosion{
    constructor(ctx, image, audio, spriteWidth, spriteHeight, ravenX, ravenY, ravenWidth, ravenHeight){
        this.ctx = ctx;
        this.image = image;
        this.audio = audio;
        this.x = ravenX + ravenWidth / 2;
        this.y = ravenY + ravenHeight / 2;;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = spriteWidth / 2;
        this.height = spriteHeight / 2;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.markedForDeletion = false;
    }
    
    update(deltatime){
        this.timeSinceLastFrame += deltatime;

        if(this.frameX === 0) this.audio.play();

        if(this.timeSinceLastFrame > this.frameInterval) {
            this.frameX++;

            if(this.frameX > 5){
                this.markedForDeletion = true;
            }
        }

        this.draw();
    }

    draw(){
        this.ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    }
}

export {Raven, Score, Explosion}