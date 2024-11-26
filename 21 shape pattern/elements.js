import { drawCircle } from "../common/common-functions.js";

class Particle {
    constructor(ctx, x, y, size) {
        this.ctx = ctx;
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y,
        this.size = size;
        this.color = `hsl(${Math.floor(Math.random() * 360)},50%,50%)`;
       this.number = 0;
       this.scale = Math.random() * 20;
       this.randVal = Math.random() ? Math.random() * (0.5 - 0.01) + 0.01 : Math.random() * 5;
    }
    update() {
        let angle = this.number * this.randVal;
        let radius = this.scale * Math.sqrt(this.number);
        let positionX = radius * Math.sin(angle);
        let positionY = radius * Math.cos(angle);
        // if(this.randVal > 0.5){
        //     this.size += 0.01;
        // }else{
        //     this.size += 0.01;
        // }

        this.size = this.size - Math.sin(this.number / 10000) * 50;

        this.number++;
        this.draw(positionX, positionY);
    }
    draw(positionX, positionY) {
        drawCircle(this.ctx, this.baseX + positionX, this.baseY + positionY, this.size, this.color, true, 1, "#fff");
        drawCircle(this.ctx, this.baseX + positionX, this.baseY + positionY, this.size, this.color);
    }
}
class Particle2 {
    constructor(ctx, x, y, size) {
        this.ctx = ctx;
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y,
        this.size = size;
        this.color = `hsl(${Math.floor(Math.random() * 360)},50%,50%)`;
        this.angleVal = 0;
        this.angleIncrVal = Math.random();
        this.distVal = 0;
        this.distIncrVal = Math.random();
        this.scale = 0;
        this.scaleIncrVal = Math.random() * (0.001- 0.0001) + 0.0001;
        this.randVal = Math.random();
    }
    update() {
        this.x = this.baseX + Math.sin(this.angleVal) * this.distVal;
        this.y = this.baseY + Math.cos(this.angleVal) * this.distVal;
        this.size += this.scale;
        
        this.angleVal += this.angleIncrVal;
        this.distVal += this.distIncrVal;
        this.scale += this.scaleIncrVal;

        this.draw();
    }
    draw() {
        drawCircle(this.ctx, this.x, this.y, this.size, this.color, true, 2, "#fff");
        drawCircle(this.ctx, this.x, this.y, this.size, this.color);
    }
}

export { Particle }