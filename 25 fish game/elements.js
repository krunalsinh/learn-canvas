import { addText, drawCircle, drawLine, getDistance } from "../common/common-functions.js";

class Player {
    constructor(ctx, x, y, size, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.incrVal = 0;
    }
    update(mouse) {
        if(mouse.x !== this.x && !mouse.mouseDown){
            const dystx = this.x - mouse.x;            
            this.x -= dystx/20;
        }

        if(mouse.y !== this.y && !mouse.mouseDown){
            const dysty = this.y - mouse.y;   
            this.y -= dysty/20;
        }

        this.y = this.y + Math.sin(this.incrVal);

        this.incrVal += 0.01;
        
       
        this.draw();
    }
    draw() {
        drawCircle(this.ctx, this.x, this.y, this.size, this.color);
    }
}

class Enemy extends Player{
    constructor(ctx, x, y, size, color, speed) {
        super(ctx, x, y, size, color); 
        this.speed = speed;
        this.baseX = x;
        this.xMoveSpeed = Math.random() * 150;
        this.xMovementArea = Math.random() * 100 + 50;
        this.movementSpeed = Math.random() * (0.1 - 0.01) + 0.01;
    }

    update(){
        this.y -= this.speed;
        this.x = this.baseX + Math.sin(this.xMoveSpeed) * this.xMovementArea;
        this.xMoveSpeed += 0.01;
        this.draw();
    }
    draw(){
        drawCircle(this.ctx, this.x, this.y, this.size, this.color, true);
        drawCircle(this.ctx, this.x - this.size / 2.5, this.y - this.size / 4, this.size / 6, this.color);
        drawCircle(this.ctx, this.x + this.size / 4, this.y - this.size / 4, this.size / 3.5, this.color);
    }
}

class Score {
    constructor(ctx, x, y, score){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.score = score;
    }

    addScore(){
        this.score += 1;
    }

    draw(){
        addText(this.ctx, this.x, this.y, "30px", "Open Sans", "#fff", `Score : ${this.score}`);
    }
    
}

export { Player, Enemy, Score }