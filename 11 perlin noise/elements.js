import {drawCircle} from '../common/common-functions.js';


class circle {
    constructor(ctx,x,y,radius,color){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.sy = 5;
    }
    animate(){
        this.draw();
    }

    draw(){
        drawCircle(this.ctx, this.x , this.y , this.radius, this.color)
    }
}

export { circle};