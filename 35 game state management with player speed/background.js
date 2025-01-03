import { ctx } from "./main.js";

export default class Background{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.x = 0;
        this.y = 0;
        this.image = document.getElementById("backgroundImg");
        this.originalWidth = 2400;
        this.originalHeight = 720;
        this.aspectRatio = this.originalWidth / this.originalHeight;
        this.newHeight = this.gameHeight;
        this.newWidth = this.gameHeight * this.aspectRatio;
        this.timer = 0;
        this.drawFrameInterval = 1000/100;
        this.speedModifier = 4;
        this.speed = 2 * this.speedModifier;
    }
    update(deltatime){
        this.speed = 2 * this.speedModifier;

        if(this.x <= -this.newWidth) this.x = 0 - this.speed;
        
        // if(this.x2 < -this.width) this.x2 = this.width + this.x - this.speed;

        this.x = Math.floor(this.x - this.speed);
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.newWidth, this.newHeight);
        ctx.drawImage(this.image, this.x + this.newWidth - this.speed , this.y, this.newWidth, this.newHeight);
    }
}