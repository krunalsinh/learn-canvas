import { fillRect } from "../common/common-functions.js";
import { canvas } from "./page.js";

class Enemy{
    constructor(ctx, x, y, width, height, img, imgFrameCount, dx, dy, type){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.img = img;
        this.width = width;
        this.height = height;
        this.randSizeRatio = Math.random() * 3 + 1;
        this.calcWidth = this.width / this.randSizeRatio;
        this.calcHeight = this.height / this.randSizeRatio;
        this.frameX = 0;
        this.imgFrameCount = imgFrameCount;
        this.dx = dx;
        this.dy = dy;
        this.type = type;
        this.incr = 0;
    }
    update(frameCount){

        if(this.type === 1){
            this.x += this.dx;
            this.y += this.dy;
    
            
            if(this.x - this.calcWidth / 2  < 0 || this.x + this.calcWidth / 2 > canvas.width){
                this.dx = -this.dx;
            }
            
            if(this.y - this.calcHeight / 2 < 0 || this.y + this.calcHeight / 2 > canvas.height){
                this.dy = -this.dy;
            }
        }
        
        if(this.type === 2){
            this.x -= this.dx;

            if(this.x + this.calcWidth / 2  < 0 ){
                this.x = canvas.width + this.width;
            }
        }

        if(this.type === 3){
            this.x = this.x + Math.sin(this.incr / this.dx) * 10;
            this.y = this.y + Math.cos(this.incr / this.dx) * 10;
        }


        if(frameCount % 2 === 0){
            if(this.frameX >= this.imgFrameCount - 1) this.frameX = 0;
            else this.frameX++;
        }

        this.incr += 0.05;

        this.draw();
    }
    draw(){
        // fillRect(this.ctx, this.x - this.calcWidth / 2, this.y - this.calcHeight / 2, this.calcWidth, this.calcHeight, "red");
        this.ctx.drawImage(
            this.img, 
            this.frameX * this.width, 
            0, 
            this.width, 
            this.height, 
            this.x - this.calcWidth / 2, 
            this.y - this.calcHeight / 2,
            this.calcWidth, 
            this.calcHeight);
            // fillRect(this.ctx, this.x, this.y, 5, 5, "blue");
    }
}

export {Enemy}