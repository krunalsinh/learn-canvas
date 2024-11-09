import { canvasHeight, canvasWidth, keys, grid, scored} from './page.js';
import { drawCircle, drawRectangle } from '../common/common-functions.js';

class Frog {
    constructor(ctx, spriteWidth, spriteHeight){
        this.ctx = ctx;
        this.spriteWidth = spriteWidth; //250
        this.spriteHeight = spriteHeight; //250
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = canvasWidth/2 - this.width/2;
        this.y = canvasHeight - this.height - 40;
        this.moving = false;
    }

    update(){
        if(keys[38]){ // up
            if(this.moving === false){
                this.y -= grid;
                this.moving = true;
            }
        }

        if(keys[40]){ // down
            if(this.moving === false && this.y + (this.height * 2) < canvasHeight){
                this.y += grid;
                this.moving = true;
            }
        }

        if(keys[37]){ // left
            if(this.moving === false && this.x > this.width){
                this.x -= grid;
                this.moving = true;
            }
        }

        if(keys[39]){ // right
            if(this.moving === false && this.x + (this.width * 2) < canvasWidth){
                this.x += grid;
                this.moving = true;
            }
        }

        if(this.y < 0) scored();

        this.draw();
    }

    draw(){
        drawRectangle(this.ctx, this.x, this.y, this.width, this.height, "green");
    }

    jump(){
        console.log("jump");
        
    }
}

class Obstacle {
    constructor(ctx, x, y , width, height, speed, type){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
    }

    update(gameSpeed){
        this.x += this.speed * gameSpeed;

        if(this.speed > 0){
            if(this.x  > canvasWidth + this.width){
                this.x = 0 - this.width;
            }
        }else{
            if(this.x + this.width * 2 < 0){
                this.x = canvasWidth;
            }
        }
        this.draw();
        
    }

    draw(){
        drawRectangle(this.ctx, this.x, this.y, this.width, this.height, "blue")
    }

}

class Particle{
    constructor(ctx, x, y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 20 + 1;
        this.opacity = 1;
        this.directionX = Math.random() * 1 - 0.5;
        this.directionY = Math.random() * 1 - 0.5;

    }
    update(){
        this.x += this.directionX;
        this.y += this.directionY;
        
        this.draw();
    }
    draw(){
        drawCircle(this.ctx, this.x, this.y, this.radius, 'white');
    }
}
export {Frog, Obstacle}

//canvas1 = particle effects
//canvas2 = logs and turtle
//canvas3 = frog
//canvas4 = cars
//canvas5 = overlay grass and tree