import { addText, drawCircle, drawLine, getDistance } from "../common/common-functions.js";
import { swimLeftImg , swimRightImg} from "./page.js"

class Player {
    constructor(ctx, x, y, size, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.incrVal = 0;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 256;
        this.spriteHeight = 256;
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.playerImg = swimLeftImg

        
    }
    update(mouse, mouseMove, frameCounter) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;

        console.log(dx);
        

        let moveDx = this.x - mouseMove.x;
        let moveDy = this.y - mouseMove.y;
    
        this.angle = Math.atan2(moveDy,moveDx) ;
        

        if(mouse.x !== this.x && !mouse.mouseDown){
            this.x -= dx/20;
        }

        if(mouse.y !== this.y && !mouse.mouseDown){
            this.y -= dy/20;
        }

        this.y = this.y + Math.sin(this.incrVal);

        this.incrVal += 0.01;

        if(this.angle > 1.5 || this.angle < -1.5){
            this.playerImg = swimRightImg;
        }else{
            this.playerImg = swimLeftImg;
        }
        // console.log(frameCounter);
        

        if(frameCounter % 5 === 0){

            if(this.frameX >= 5) this.frameX = 0;
            else this.frameX++;
        }
        
       
        this.draw();
    }
    draw() {
        this.ctx.save();
        this.ctx.translate( this.x , this.y );
        this.ctx.rotate(this.angle);
        drawCircle(this.ctx, 0, 0, this.size, this.color);
        drawCircle(this.ctx, 0 - 30, 0, this.size / 5, "blue");

        this.ctx.drawImage(this.playerImg, 
            this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, 
            this.spriteWidth, 
            this.spriteHeight, 
            0 - this.width  , 
            0 - this.height , 
            this.width * 2, 
            this.height * 2)
        this.ctx.restore();
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