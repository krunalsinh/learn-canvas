import { drawRectangle, fillRect } from "../common/common-functions.js";

export default class Snake{
    constructor(game, x, y,speedX, speedY, color, name){
        this.game = game;
        this.x = x;
        this.y = y;
        this.speedY = speedY;
        this.speedX = speedX;
        this.width = this.game.cellSize;
        this.height = this.game.cellSize;
        this.baseColor = color;
        this.color = color;
        this.moving = true;
        this.score = 0;
        this.length = 3;
        this.segments = [];
        
        for (let i = 0; i < this.length; i++) {
            this.x += this.speedX;
            this.y += this.speedY;

            this.segments.unshift({x: this.x, y: this.y, frameX : 0, frameY: 0});
        }
        this.readyToTurn = true;
        this.name = name;
        this.image = document.getElementById("snakeCorgi");
        this.spriteWidth = 200;
        this.spriteHeight = 200;
      
    }
    update(){
        this.readyToTurn = true;

        if(this.game.checkCollision(this, this.game.food)){
            this.game.food.reset();
            this.score += 1;
            this.length += 1;

        }

        if(this.x <= 0 && this.speedX < 0 || 
            this.x >= this.game.columns - 1 && this.speedX > 0 ||
            this.y <= this.game.topMargin && this.speedY < 0 ||
            this.y >= this.game.rows - 1 && this.speedY > 0){
            this.moving = false;
        }

        if(this.moving){
            this.x += this.speedX;
            this.y += this.speedY;

            this.segments.unshift({x: this.x, y: this.y, frameX : 0, frameY: 0});

            if(this.segments.length > this.length){
                this.segments.pop();
            }
        }

        if(this.score >= this.game.winningScore){
            this.game.triggerGameOver();
        }
    }

    draw(){
        this.segments.forEach((segment, index) => {
            if(index === 0){
                this.color = "black";
            }else{
                this.color = this.baseColor;
            }

            if(this.game.debug){
                drawRectangle(this.game.ctx, 
                    segment.x * this.game.cellSize, 
                    segment.y * this.game.cellSize, this.width, this.height, this.color);
            }
            this.setSpriteFrame(index);
            // console.log(segment);
            
            this.game.ctx.drawImage(
                this.image,
                segment.frameX * this.spriteWidth,
                segment.frameY * this.spriteHeight,
                this.spriteWidth, 
                this.spriteHeight,
                segment.x * this.game.cellSize, 
                segment.y * this.game.cellSize, 
                this.width, 
                this.height
            )
        });
    }

    setSpriteFrame(index){
        const segment = this.segments[index];
        // console.log(index);
        
        const previousSegment = this.segments[index - 1] || 0;
        const nextSegment = this.segments[index + 1] || 0;

        if(index === 0){//head
            if(segment.y < nextSegment.y){
                segment.frameX = 1;
                segment.frameY = 2;
            }else if(segment.y > nextSegment.y){
                segment.frameX = 0;
                segment.frameY = 4;
            }else if(segment.x < nextSegment.x){
                segment.frameX = 0;
                segment.frameY = 0;
            }else if(segment.x > nextSegment.x){
                segment.frameX = 2;
                segment.frameY = 1;
            }
        }else if(index === this.segments.length - 1){//tail
            if(segment.y < previousSegment.y){
                segment.frameX = 0;
                segment.frameY = 2;
            }else if(segment.y > previousSegment.y){
                segment.frameX = 1;
                segment.frameY = 4;
            }else if(segment.x < previousSegment.x){
                segment.frameX = 0;
                segment.frameY = 1;
            }else if(segment.x > previousSegment.x){
                segment.frameX = 2;
                segment.frameY = 0;
            }
        }else{//body
            if(segment.x === nextSegment.x && 
               segment.y < nextSegment.y &&
               segment.x < previousSegment.x &&
               segment.y === previousSegment.y
            ){
                segment.frameX = 2;
                segment.frameY = 2;
            }else if(segment.x > nextSegment.x && 
                segment.y === nextSegment.y &&
                segment.x === previousSegment.x &&
                segment.y < previousSegment.y
            ){
                 segment.frameX = 3;
                 segment.frameY = 2;
            }else if(segment.x === nextSegment.x && 
                segment.y > nextSegment.y &&
                segment.x > previousSegment.x &&
                segment.y === previousSegment.y
            ){
                 segment.frameX = 3;
                 segment.frameY = 3;
            }else if(segment.x < nextSegment.x && 
                segment.y === nextSegment.y &&
                segment.x === previousSegment.x &&
                segment.y > previousSegment.y
            ){
                 segment.frameX = 2;
                 segment.frameY = 3;
            }else if(segment.x < nextSegment.x && 
                segment.y === nextSegment.y &&
                segment.x === previousSegment.x &&
                segment.y < previousSegment.y
            ){
                 segment.frameX = 3;
                 segment.frameY = 0;
            }else if(segment.x === nextSegment.x && 
                segment.y > nextSegment.y &&
                segment.x < previousSegment.x &&
                segment.y === previousSegment.y
            ){
                 segment.frameX = 3;
                 segment.frameY = 1;
            }else if(segment.x > nextSegment.x && 
                segment.y === nextSegment.y &&
                segment.x === previousSegment.x &&
                segment.y > previousSegment.y
            ){
                 segment.frameX = 4;
                 segment.frameY = 1;
            }else if(segment.x === nextSegment.x && 
                segment.y < nextSegment.y &&
                segment.x > previousSegment.x &&
                segment.y === previousSegment.y
            ){
                 segment.frameX = 4;
                 segment.frameY = 0;
            }else if(segment.y < nextSegment.y){
                segment.frameX = 1;
                segment.frameY = 3;
            }else if(segment.y > nextSegment.y){
                segment.frameX = 0;
                segment.frameY = 3;
            }else if(segment.x < nextSegment.x){
                segment.frameX = 1;
                segment.frameY = 0;
            }else if(segment.x > nextSegment.x){
                segment.frameX = 1;
                segment.frameY = 1;
            }
        }
    }

    turnUp(){
        if(this.speedY === 0 && this.y > this.game.topMargin && this.readyToTurn){
            this.speedX = 0;
            this.speedY = -1;
            this.moving = true;
            this.readyToTurn = false;
        }
    }

    turnDown(){
        if(this.speedY === 0 && this.y < this.game.rows - 1 && this.readyToTurn){
            this.speedX = 0;
            this.speedY = 1;
            this.moving = true;
            this.readyToTurn = false;
        }
    }

    turnLeft(){
        if(this.speedX === 0 && this.x > 0 && this.readyToTurn){
            this.speedX = -1;
            this.speedY = 0;
            this.moving = true;
            this.readyToTurn = false;
        }
    }

    turnRight(){
        if(this.speedX === 0 && this.x < this.game.columns - 1 && this.readyToTurn){
            this.speedX = 1;
            this.speedY = 0;
            this.moving = true;
            this.readyToTurn = false;
        }
    }
}

export class Keyboard1 extends Snake{
    constructor(game, x, y,speedX, speedY, color, name){
        super(game, x, y,speedX, speedY, color, name);
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
    constructor(game, x, y,speedX, speedY, color, name){
        super(game, x, y,speedX, speedY, color, name);
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
    constructor(game, x, y,speedX, speedY, color, name){
        super(game, x, y,speedX, speedY, color, name);
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