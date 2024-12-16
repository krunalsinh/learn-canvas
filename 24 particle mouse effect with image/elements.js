import { drawCircle } from "../common/common-functions.js";
import { canvas, mappedImage } from "./page.js";

class Particle {
    constructor(ctx, x, y, size, speed, velocity, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.velocity = velocity;
        this.color = color;
        this.incr = 0;
    }
    update(movement) {
        if(mappedImage[Math.floor(this.y)][Math.floor(this.x)]){
            this.speed = mappedImage[Math.floor(this.y)][Math.floor(this.x)][0];
            this.color = mappedImage[Math.floor(this.y)][Math.floor(this.x)][1];
        }
        
        if(movement === 1){
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement;
            this.x += movement;
    
            if(this.y >= canvas.height ){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
    
            if(this.x >= canvas.width ){
                this.x = 0;
                this.y = Math.random() * canvas.height;
            }
            this.incr += 0.01;
            this.draw();
        }
        if(movement === 2){
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement;
            this.x += movement;

            this.x = this.x * Math.sin(this.incr) * 10;
            this.y = this.y * Math.cos(this.incr) * 10;
    
            if(this.y >= canvas.height ){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
    
            if(this.x >= canvas.width ){
                this.x = 0;
                this.y = Math.random() * canvas.height;
            }
            this.incr += 0.01;
            this.draw();
        }
    }
    draw() {
        drawCircle(this.ctx, this.x, this.y, this.size, this.color);
    }
}

export { Particle }