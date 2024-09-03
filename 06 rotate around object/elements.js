import {drawCircle} from '../common/common-functions.js';

class circle {
    constructor(ctx,x,y,radius,color){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.angle = 0.1;
        this.stroke = false;
        this.dx = 2;
        this.dy = 2;
    }

    draw(){
        drawCircle(this.ctx, this.x , this.y , this.radius, this.color, this.stroke)
    }
}

export { circle};

