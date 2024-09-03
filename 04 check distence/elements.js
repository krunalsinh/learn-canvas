import {drawCircle} from '../common/common-functions.js';

const mouse = {x : innerWidth / 2, y : innerHeight / 2};

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

        if(this.x > mouse.x - 150 && this.x < mouse.x + 150 && this.y > mouse.y - 150 && this.y < mouse.y + 150){
            
            if(this.radius < this.maxRadius){
                this.radius += 2;
            }
        }else{
            if(this.radius > this.minRadius){
                this.radius -= 1;
            }
        }
        this.draw();
    }

    draw(){
        drawCircle(this.ctx, this.x , this.y , this.radius, this.color)
    }
}

export { circle};

window.addEventListener('mousemove',e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})