import { ctx } from "./script.js";

export default class Explosion{
    constructor(spriteWidth, spriteHeight, objectX, objectY, objectWidth, objectHeight){
        this.image = document.getElementById("explosionImg");
        this.audio = document.getElementById("explosionAudio");
        this.x = objectX + objectWidth / 2;
        this.y = objectY + objectHeight / 2;;
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
    
    update(deltaTime){
        this.timeSinceLastFrame += deltaTime;

        // if(this.frameX === 0) this.audio.play();

        if(this.timeSinceLastFrame > this.frameInterval) {
            this.frameX++;

            if(this.frameX > 5){
                this.markedForDeletion = true;
            }
        }

        this.draw();
    }

    draw(){
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    }
}