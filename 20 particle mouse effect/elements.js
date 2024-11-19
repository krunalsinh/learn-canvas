import { drawCircle } from "../common/common-functions.js";

class Particle{
    constructor(ctx, x, y, size, color){
        this.ctx = ctx;
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.dencity = Math.random() * 30 + 1;
    }
    update(mouse){
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        let forceDirX = dx / dist;
        let forceDirY = dy / dist;
        let maxDist = mouse.radius;

        let force = (maxDist - dist) / maxDist

        // console.log(forceDirX, forceDirY);
        let dirX = forceDirX * force * this.dencity; 
        let dirY = forceDirY * force * this.dencity; 
        // console.log(force);

        if(dist < maxDist){
            this.x += dirX;
            this.y += dirY;
        }else{
            
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }

            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }

        this.draw();
    }
    draw(){
        drawCircle(this.ctx, this.x, this.y, this.size, this.color);
    }
}

export {Particle}