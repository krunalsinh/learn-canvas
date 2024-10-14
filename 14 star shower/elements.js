import {drawCircle} from '../common/common-functions.js';


class Star {
    constructor(ctx,x,y,radius,color){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x : 0,
            y: 3
        };
        this.gravity = 1;
        this.friction = 0.8;
    }
    animate(){
        this.y += this.velocity.y;
        this.x += this.velocity.x;
        this.draw();
    }

    draw(){
        drawCircle(this.ctx, this.x , this.y , this.radius, this.color)
    }
}

export { Star};