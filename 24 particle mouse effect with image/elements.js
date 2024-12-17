import { drawCircle, drawRectangle, addText } from "../common/common-functions.js";
import { canvas, mappedImage, gradient1 } from "./page.js";

const letters = "MARIYO";

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
        this.letter = letters[Math.floor(Math.random() * (letters.length - 1))];
    }
    update(movement) {
        if(mappedImage[Math.floor(this.y)] && mappedImage[Math.floor(this.y)][Math.floor(this.x)]){
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
            this.drawCircle();
        }
        if(movement === 2){
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement + Math.sin(this.incr) * 1.1;
            this.x += movement + Math.cos(this.incr) * 1.1;

            
            if(this.y >= canvas.height ){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
    
            if(this.x >= canvas.width ){
                this.x = 0;
                this.y = Math.random() * canvas.height;
            }
            this.incr += this.velocity;
            this.drawCircle();
        }

        if(movement === 3){
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement + Math.sin(this.incr) * 2;
            this.x += movement + Math.cos(this.incr) * 2;

            this.size = this.speed * 1.5;

            this.color = gradient1;

            if(this.y >= canvas.height ){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
    
            if(this.x >= canvas.width ){
                this.x = 0;
                this.y = Math.random() * canvas.height;
            }
            this.incr += this.speed / 20;
            this.drawCircle();
        }
        if(movement === 4){
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement / 2;
            this.x += movement / 2;

            this.size = Math.sin(this.speed) * 8;

            if(this.y >= canvas.height ){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
    
            if(this.x >= canvas.width ){
                this.x = 0;
                this.y = Math.random() * canvas.height;
            }
            this.drawRect();
        }
        if(movement === 5){
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement / 2;
            this.x += movement / 2;

            if(this.y >= canvas.height ){
                this.y = 0;
                this.x = Math.random() * canvas.width;
                this.letter = letters[Math.floor(Math.random() * (letters.length - 1))];
            }
    
            if(this.x >= canvas.width ){
                this.x = 0;
                this.y = Math.random() * canvas.height;
                this.letter = letters[Math.floor(Math.random() * (letters.length - 1))];
            }
            this.drawText();
        }
        if(movement === 6){
            let movement = (2.5 - this.speed) + this.velocity;
            this.y += movement / 2;
            this.x += movement / 2;

            if(this.y >= canvas.height ){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
    
            if(this.x >= canvas.width ){
                this.x = 0;
                this.y = Math.random() * canvas.height;
            }
            if( (Math.sin(this.incr) * 50) > 25){
                this.ctx.globalCompositeOperation = "hard-light";
            }else{
                this.ctx.globalCompositeOperation = "source-over";
            }
            this.incr += 0.1;
            this.drawCircle();
        }
    }
    drawCircle() {
        drawCircle(this.ctx, this.x, this.y, this.size, this.color);
    }
    drawRect() {
        drawRectangle(this.ctx, this.x, this.y, this.size , this.size , this.color, true);
    }
    drawText(){
        addText(this.ctx, this.x, this.y, "10px", "Verdana", this.color, this.letter);
    }
}

export { Particle }