import { drawCircle, drawRectangle } from "../common/common-functions.js";

class Particle {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y,
        this.size = Math.random() * 10 + 1;
        this.weight = Math.random() * 1 + 1;
        this.directionX = -2;
        this.color = `hsl(${Math.floor(Math.random() * 360)},50%,50%)`;
    }

    update() {
        this.weight += 0.05;
        this.y += this.weight;
        this.x += this.directionX;
        this.draw();
    }

    draw() {
        drawCircle(this.ctx, this.x, this.y, this.size, this.color);
    }
}

class Box {
    constructor(ctx, x, y, height, width){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = `hsl(${Math.floor(Math.random() * 360)},50%,50%)`;
    }

    update(){
        this.x += 1;
        this.draw();
    }

    draw(){
        drawRectangle(this.ctx, this.x, this.y, this.width, this.height, this.color);
    }
}


export { Particle, Box }