import { canvasHeight, canvasWidth, keys, grid, scored} from './page.js';
import { drawRectangle, drawCircle, addText } from '../common/common-functions.js';

class Frog {
    constructor(ctx, spriteWidth, spriteHeight){
        this.ctx = ctx;
        this.spriteWidth = spriteWidth; //250
        this.spriteHeight = spriteHeight; //250
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = canvasWidth/2 - this.width/2;
        this.y = canvasHeight - this.height - 40;
        this.moving = false;
    }

    update(){
        if(keys[38]){ // up
            if(this.moving === false){
                this.y -= grid;
                this.moving = true;
            }
        }

        if(keys[40]){ // down
            if(this.moving === false && this.y + (this.height * 2) < canvasHeight){
                this.y += grid;
                this.moving = true;
            }
        }

        if(keys[37]){ // left
            if(this.moving === false && this.x > this.width){
                this.x -= grid;
                this.moving = true;
            }
        }

        if(keys[39]){ // right
            if(this.moving === false && this.x + (this.width * 2) < canvasWidth){
                this.x += grid;
                this.moving = true;
            }
        }

        if(this.y < 0) scored();

        this.draw();
    }

    draw(){
        drawRectangle(this.ctx, this.x, this.y, this.width, this.height, "green");
    }

    jump(){
        console.log("jump");
        
    }
}

export {Frog}

//canvas1 = particle effects
//canvas2 = logs and turtle
//canvas3 = frog
//canvas4 = cars
//canvas5 = overlay grass and tree