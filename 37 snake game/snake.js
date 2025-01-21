import { drawRectangle, fillRect } from "../common/common-functions.js";

export default class Snake{
    constructor(game, x, y,speedX, speedY, color){
        this.game = game;
        this.x = x;
        this.y = y;
        this.speedY = speedY;
        this.speedX = speedX;
        this.width = this.game.cellSize;
        this.height = this.game.cellSize;
        this.color = color;
        this.moving = true;
    }
    update(){
        if(this.x <= 0 && this.speedX < 0 || 
            this.x >= this.game.columns - 1 && this.speedX > 0 ||
            this.y <= 0 && this.speedY < 0 ||
            this.y >= this.game.rows - 1 && this.speedY > 0){
            this.moving = false;
        }
        if(this.moving){
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
    draw(){
        drawRectangle(this.game.ctx, 
            this.x * this.game.cellSize, 
            this.y * this.game.cellSize, this.width, this.height, this.color);
    }
    turnUp(){
        this.speedX = 0;
        this.speedY = -1;
        this.moving = true;
    }
    turnDown(){
        this.speedX = 0;
        this.speedY = 1;
        this.moving = true;
    }
    turnLeft(){
        this.speedX = -1;
        this.speedY = 0;
        this.moving = true;
    }
    turnRight(){
        this.speedX = 1;
        this.speedY = 0;
        this.moving = true;
    }
}

export class Keyboard1 extends Snake{
    constructor(game, x, y,speedX, speedY, color){
        super(game, x, y,speedX, speedY, color);
        window.addEventListener('keydown', e => {
            switch(e.key){
                case 'ArrowUp':
                    this.turnUp();
                    break;
                case 'ArrowDown':
                    this.turnDown();
                    break;
                case 'ArrowLeft':
                    this.turnLeft();
                    break;
                case 'ArrowRight':
                    this.turnRight();
                    break;
            }
        });
    }
}

export class Keyboard2 extends Snake{
    constructor(game, x, y,speedX, speedY, color){
        super(game, x, y,speedX, speedY, color);
        window.addEventListener('keydown', e => {
            switch(e.key){
                case 'w':
                    this.turnUp();
                    break;
                case 's':
                    this.turnDown();
                    break;
                case 'a':
                    this.turnLeft();
                    break;
                case 'd':
                    this.turnRight();
                    break;
            }
        });
    }
}

export class ComputerAi extends Snake{
    constructor(game, x, y,speedX, speedY, color){
        super(game, x, y,speedX, speedY, color);
        this.turnTimer = 0;
        this.turnInterval = Math.floor(Math.random() * this.game.columns + 1);
    }
    update(){
        super.update();
        if(this.turnTimer < this.turnInterval){
            this.turnTimer += 1;
        }else{
            this.turnTimer = 0;
            this.turn();
            this.turnInterval = Math.floor(Math.random() * this.game.columns + 1);
        }
    }
    turn(){
        if(this.speedY === 0){
            Math.random() > 0.5 ? this.turnUp() : this.turnDown();
        }else if(this.speedX === 0){
            Math.random() > 0.5 ? this.turnLeft() : this.turnRight();
        }
    }
}