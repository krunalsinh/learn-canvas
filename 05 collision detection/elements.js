import {drawCircle} from '../common/common-functions.js';

class circle {
    constructor(ctx,x,y,radius,color){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.minRadius = radius;
        this.radius = radius;
        this.maxRadius = 80;
        this.color = color;
        this.velocity = {
            x : 3 * (Math.random() - 0.5),
            y : 3 * (Math.random() - 0.5)
        }
        this.mass = 1;
        this.stroke = true;
    }

    draw(){
        drawCircle(this.ctx, this.x , this.y , this.radius, this.color, this.stroke)
    }
}

export { circle};

