import {drawCircle, getIntFromRange} from '../common/common-functions.js';


class Circle {
    constructor(ctx,x,y,radius,color,angle,index){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.angle = angle;
        this.index = index;
        this.opacity = 1;
        this.velocity = {
            x : Math.cos(this.angle * this.index) * Math.random() * 8,
            y: Math.sin(this.angle * this.index) * Math.random() * 8
        }
       
    }
    animate(){
     
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.velocity.y += 0.06;

        this.opacity -= 0.008;
        this.draw();
    }

    draw(){
        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;
        drawCircle(this.ctx, this.x , this.y , this.radius, this.color);
        this.ctx.restore();

    }
}


export { Circle};