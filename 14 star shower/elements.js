import {drawCircle, getIntFromRange} from '../common/common-functions.js';


class Star {
    constructor(ctx,x,y,radius,color){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x :  (Math.random() - 0.5) * 8,
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
        this.ctx.save();
        this.ctx.shadowColor = "#e3eaef";
        this.ctx.shadowBlur = 20;
        drawCircle(this.ctx, this.x , this.y , this.radius, this.color);
        this.ctx.restore();
    }
}


class MiniStar extends Star{
    constructor(ctx,x,y,radius,color){
        super(ctx,x,y,radius,color);
        this.gravity = 0.1;
        this.velocity = {
            x: getIntFromRange(-5, 5),
            y: getIntFromRange(-15, 15)
        }
        this.ttl = 100;
        this.opacity = 1;
    }
    animate(){
        this.y += this.velocity.y;
        this.x += this.velocity.x;
        this.ttl -= 1;
        this.opacity -= 1 / this.ttl;
        this.draw();
    }
    draw(){
        this.ctx.save();
        this.ctx.shadowColor = "#e3eaef";
        this.ctx.shadowBlur = 20;

        drawCircle(this.ctx, this.x , this.y , this.radius, `rgba(227,234,239,${this.opacity})`)
        this.ctx.restore();
    }
}
export { Star, MiniStar};