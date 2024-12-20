import { fillRect } from "../common/common-functions.js";
import { canvas } from "./page.js";

//sprite width 6876, sprite height 5230
// col 12, row 10
//box width 6876/12 = 573, box height 5230/10 = 523, 
class Player{
    constructor(ctx, img){
        this.ctx = ctx;
        this.img = img;
        this.width = 575;
        this.height = 523;
        this.calcWidth = this.width / 3;
        this.calcHeight = this.height / 3;
        this.frameX = 0;
        this.frameY = 0;
        this.imgFrameCount = 7;
    }
    
    update(frameCount, staggerFrame){
        let position = Math.floor(frameCount / staggerFrame ) % (this.imgFrameCount - 1);
        this.frameX = this.width * position;
        this.draw();
    }
    draw(){
        // fillRect(this.ctx, this.x - this.calcWidth / 2, this.y - this.calcHeight / 2, this.calcWidth, this.calcHeight, "red");
        this.ctx.drawImage(
            this.img, 
            this.frameX , 
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