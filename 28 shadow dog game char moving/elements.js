import { fillRect } from "../common/common-functions.js";
import { canvas } from "./page.js";

//sprite width 6876, sprite height 5230
// col 12, row 10
//box width 6876/12 = 573, box height 6876/12 = 523, 
class Player{
    constructor(ctx, img){
        this.ctx = ctx;
        this.img = img;
        this.width = 573;
        this.height = 523;
        this.calcWidth = this.width / 3;
        this.calcHeight = this.height / 3;
        this.frameX = 0;
        this.frameY = 0;
        this.imgFrameCount = 7;
        this.setInitImageFrameCount();
    }
    setInitImageFrameCount(){
        console.log(this.imgFrameCount);
        
    }
    update(frameCount){
        
        if(frameCount % 2 === 0){
            if(this.frameX >= this.imgFrameCount - 1) this.frameX = 0;
            else this.frameX++;
        }

        this.draw();
    }
    draw(){
        // fillRect(this.ctx, this.x - this.calcWidth / 2, this.y - this.calcHeight / 2, this.calcWidth, this.calcHeight, "red");
        this.ctx.drawImage(
            this.img, 
            this.frameX * this.width, 
            this.frameY * this.height,
            this.width, 
            this.height, 
            canvas.width / 2 - this.calcWidth / 2, 
            canvas.height / 2 - this.calcHeight / 2,
            this.calcWidth, 
            this.calcHeight);
            // fillRect(this.ctx, this.x, this.y, 5, 5, "blue");
    }
}

export {Player}