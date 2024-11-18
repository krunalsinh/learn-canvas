import { drawCircle } from "../common/common-functions.js";

class Particle{
    constructor(ctx, x, y, size, color){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
    update(){
        this.draw();
    }
    draw(){
        drawCircle(this.ctx, this.x, this.y, this.size, this.color);
    }
}

export {Particle}