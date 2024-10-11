import {drawCircle} from '../common/common-functions.js';


class circle {
    constructor(ctx,x,y,radius,color, offset){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.sy = 5;
        this.offset = offset;
    }
    animate(){
        this.draw();
    }

    draw(){
        drawCircle(this.ctx, this.x , this.y , this.radius, this.color)
    }
}

export { circle};