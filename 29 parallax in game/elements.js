import { fillRect } from "../common/common-functions.js";
import { canvas} from "./page.js";


class BgImg{
    constructor(ctx, img, speedModifier, gameSpeed){
        this.ctx = ctx;
        this.img = img;
        this.width = 2400;
        this.height = 700;
        this.x = 0;
        this.y = 0;
        this.x2 = this.width;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    
    update(gameSpeed){

        this.speed = gameSpeed * this.speedModifier;

        if(this.x < -this.width) this.x = this.width + this.x2 - this.speed;
        
        if(this.x2 < -this.width) this.x2 = this.width + this.x - this.speed;

        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
       
        this.draw();
    }
    draw(){
        // fillRect(this.ctx, this.x - this.calcWidth / 2, this.y - this.calcHeight / 2, this.calcWidth, this.calcHeight, "red");
        this.ctx.drawImage( this.img, this.x, this.y, this.width, this.height );
        this.ctx.drawImage( this.img, this.x2, this.y, this.width, this.height );
            // fillRect(this.ctx, this.x, this.y, 5, 5, "blue");
    }
}

export {BgImg}