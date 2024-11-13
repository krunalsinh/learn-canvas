import { canvasHeight, canvasWidth, keys, grid, scored, turtles, cars, numOfCars, log} from './page.js';
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
        this.frameX = 0;
        this.frameY = 0;
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
        // console.log("jump");
        
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
        this.frameX = 0;
        this.frameY = 0;
        this.randomise = Math.floor(Math.random() * 30 + 30);
        this.carType = Math.floor(Math.random() * numOfCars);
    }

    update(gameSpeed, frame){
        this.x += this.speed * gameSpeed;

        if(this.speed > 0){
            if(this.x  > canvasWidth + this.width){
                this.x = 0 - this.width;
                this.carType = Math.floor(Math.random() * numOfCars);
            }
        }else{
            if(this.x + this.width * 2 < 0){
                this.x = canvasWidth;
                this.carType = Math.floor(Math.random() * numOfCars);
            }
        }
        this.draw(frame);
        
    }

    draw(frame){

        drawRectangle(this.ctx, this.x, this.y, this.width, this.height, "#666");

        if(this.type === "turtle"){
            if(frame % this.randomise === 0){
                if(this.frameX >= 1) this.frameX = 0;
                else this.frameX++; 
            }
            this.ctx.drawImage(turtles, this.frameX * 70, this.frameY * 70, grid - 10, grid - 10, this.x, this.y, this.width, this.height )
        }else if(this.type === "log"){
            this.ctx.drawImage(log, this.x, this.y, this.width, this.height);
        }else{
            this.ctx.drawImage(cars, this.speed < 0 ? this.width : 0, this.carType * this.height, grid * 2, grid, this.x, this.y, this.width, this.height);
        }
    }

}

class Particle{
    constructor(ctx, x, y, type){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 20 + 1;
        this.opacity = 1;
        this.directionX = Math.random() * 1 - 0.5;
        this.directionY = Math.random() * 1 - 0.5;
        this.type = type;
        

    }
    update(){
        if(this.type === 'particle'){
            this.x += this.directionX;
            this.y += this.directionY;
            
            if(this.opacity > 0.1){
                this.opacity -= 0.9;
            }

            if(this.radius > 0.15){
                this.radius -= 0.14;
            }
        }
        if(this.type === 'ripple'){
            if(this.radius < 50){
                this.radius += 0.7;
                this.x -= 0.1;
                this.y -= 0.1;
            }

            if(this.opacity > 0){
                this.opacity -= 0.02;
            }
        }
        
        this.draw();
    }
    draw(){
        if(this.type === 'particle'){
            drawCircle(this.ctx, this.x, this.y, this.radius, `rgba(150,150,150,${this.opacity})`);
        }
        if(this.type === 'ripple'){
            drawCircle(this.ctx, this.x, this.y, this.radius, `rgba(150,150,150,${this.opacity})`, true, 1, `rgba(255,255,255,${this.opacity})`);
        }
    }
}


export {Frog, Obstacle, Particle}

//canvas5 = overlay grass and tree
//canvas4 = particle effects
//canvas3 = cars
//canvas2 = logs and turtle
//canvas1 = frog