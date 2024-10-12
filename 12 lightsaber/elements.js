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

class circle2 {
    constructor(ctx,x,y,radius,color, center, distFromCenter){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.sy = 5;
        this.center = center;
        this.distFromCenter  = distFromCenter
    }
    animate(angle){
        this.x = this.center.x + this.distFromCenter * Math.cos(angle);
        this.y = this.center.y + this.distFromCenter * Math.sin(angle);
        this.draw();
    }

    draw(){
        drawCircle(this.ctx, this.x , this.y , this.radius, this.color)
    }
}

export { circle, circle2};