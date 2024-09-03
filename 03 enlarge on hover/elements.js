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
        this.sx = 3 * (Math.random() - 0.5);
        this.sy = 3 * (Math.random() - 0.5);
    }
    animate(){
        this.x += this.sx;
        this.y += this.sy;
        
        if(this.x + this.radius > innerWidth || this.x < this.radius){
            this.sx = -this.sx;
        }

        if(this.y + this.radius > innerHeight || this.y < this.radius){
            this.sy = -this.sy;
        }

        this.draw();
    }

    draw(){
        drawCircle(this.ctx, this.x , this.y , this.radius, this.color)
    }
}

export { circle};

