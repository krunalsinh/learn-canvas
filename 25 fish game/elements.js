import { addText, drawCircle, fillRect} from "../common/common-functions.js";
import { swimLeftImg , swimRightImg, swimRestLeftImg, swimRestRightImg, enemyImg} from "./page.js"

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

        let moveDx = this.x - mouseMove.x;
        let moveDy = this.y - mouseMove.y;
       
        this.angle = Math.atan2(moveDy,moveDx);

        if(mouse.x !== this.x && !mouse.mouseDown){
            this.x -= dx/20;
        }

        if(mouse.y !== this.y && !mouse.mouseDown){
            this.y -= dy/20;
        }
        if(!mouse.mouseDown){
          this.y = this.y + Math.sin(this.incrVal);
        }

        this.incrVal += 0.01;
        if(dx < 20 && dy < 20){
            if(this.angle > 1.5 || this.angle < -1.5){
                this.playerImg = swimRestRightImg;
            }else{
                this.playerImg = swimRestLeftImg;
            }
        }else{
            
            if(this.angle > 1.5 || this.angle < -1.5){
                this.playerImg = swimRightImg;
            }else{
                this.playerImg = swimLeftImg;
            }
        }

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
        
        // fillRect(this.ctx, 0 - this.width / 2, 0 - this.height / 2, this.width, this.height, "blue");
        
        // drawCircle(this.ctx, 0, 0, this.size, this.color);

        this.ctx.drawImage(this.playerImg, 
            this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, 
            this.spriteWidth, 
            this.spriteHeight, 
            0 - this.width   , 
            0 - this.height , 
            this.width * 2, 
            this.height * 2)
      
      // this.ctx.drawImage(this.playerImg,0,0, this.spriteWidth, this.spriteHeight);
      // this.ctx.drawImage(this.playerImg, 0, 0, 100, 100, 0, 0, 256, 256)
        this.ctx.restore();
    }
}

class Bubble extends Player{
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
        drawCircle(this.ctx, this.x, this.y, this.size, "rgba(255,255,255,0.05)");
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

class Enemy {
    constructor(ctx, x, y, color, direction, enemySpeed) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.incrVal = 0;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 149;
        this.spriteHeight = 129;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.playerImg = enemyImg;
        this.direction = direction || "down";
        this.speed = enemySpeed;

        if(direction === "down"){
            this.frameY = 0;
        }else if(direction === "left"){
            this.frameY = 1;
        }else if(direction === "right"){
            this.frameY = 2;
        }else if(direction === "up"){
            this.frameY = 3;
        }
    }

    update( frameCounter) {
        
        if(this.direction === "down"){
            this.y += this.speed;
        }else if(this.direction === "left"){
            this.x -= this.speed;
        }else if(this.direction === "right"){
            this.x += this.speed;
        }else if(this.direction === "up"){
            this.y -= this.speed;
        }
       
        if(frameCounter % (10 - Math.floor(this.speed)) === 0){
            if(this.frameX >= 3) this.frameX = 0;
            else this.frameX++;
        }
        this.draw();
    }
    draw() {
       

        // fillRect(this.ctx, this.x, this.y, this.width, this.height, "green");
        this.ctx.drawImage(this.playerImg, 
            this.frameX * this.spriteWidth, 
            this.frameY * this.spriteHeight, 
            this.spriteWidth, 
            this.spriteHeight, 
            this.x, 
            this.y -  this.height / 3 , 
            this.width , 
            this.height * 1.5);
    }
}


export { Player, Bubble, Score, Enemy }