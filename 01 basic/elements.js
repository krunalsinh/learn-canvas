import {drawRectangle, drawCircle, drawTriangle} from '../common/common-functions.js';
class box{
    constructor(ctx,x,y,width,height,color){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.sx = 6 * (Math.random() - 0.5);
        this.sy = 6 * (Math.random() - 0.5);
    }
    animate(){
        this.x += this.sx;
        this.y += this.sy;

        if(this.x + this.width > innerWidth || this.x < 0){
            this.sx = -this.sx;
        }
        if(this.y + this.height > innerHeight || this.y < 0){
            this.sy = -this.sy;
        }
        drawRectangle(this.ctx, this.x, this.y, this.width, this.height, this.color);
    }
}

class circle extends box{
    constructor(ctx,x,y,radius,color,width,height){
       super(ctx,x,y,width,height,color);
       this.radius = radius;
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
        drawCircle(this.ctx, this.x , this.y , this.radius, this.color)
    }
}

class triangle extends box{
    constructor(ctx,x,y,radius,color,width,height){
       super(ctx,x,y,width,height,color);
       this.radius = radius;
    }
    animate(){
        this.x += this.sx;
        this.y += this.sy;

        if(this.x + this.radius * 2 > innerWidth || this.x < 0){
            this.sx = -this.sx;
        }
        if(this.y + this.radius * 2 > innerHeight || this.y < 0){
            this.sy = -this.sy;
        }
        drawTriangle(this.ctx, this.x , this.y , this.radius, this.color)
    }
}

export {box, circle, triangle};