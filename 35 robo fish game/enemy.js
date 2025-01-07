import { drawLine, drawRectangle } from "../common/common-functions.js";

class Enemy{
    constructor(game){
        this.game = game;
        this.markForDeletion = false;
        this.fps = 30;
        this.enemyInterval = 1000/this.fps;
        this.enemyTimer = 0;
        this.markedForDeletion = false;
    }

    update(deltaTime){
        this.x -= this.vx * deltaTime;
        if(this.x < 0 - this.width) {
            this.markedForDeletion = true;
            this.game.increaseScore();
        }

        if(this.enemyTimer > this.enemyInterval){
            this.enemyTimer = 0;

            if(this.frameX > this.maxFrame) this.frameX = 0 
            else this.frameX++

        }else{
            this.enemyTimer += deltaTime;
        }
    }

    draw(ctx){
        if(this.game.debug){
            drawRectangle(ctx, this.x, this.y, this.width, this.height, "white", true);
        }
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}


export class Enemy1 extends Enemy{
    constructor(game){
        super(game);
        this.spriteWidth = 8892/39;
        this.spriteHeight = 507/3;
        this.width = this.spriteWidth / 2 ;
        this.height = this.spriteHeight / 2;
        this.x = this.game.width + this.width;
        this.y = Math.random() * this.game.height * 0.6;
        this.frameX = 0;
        this.frameY = 0;
        this.image = document.getElementById("enemy1Img");
        this.maxFrameX = 37;
        this.vx = Math.random() * 0.2 + 0.2;
        this.angle = 0;
        this.curve = Math.random() * 3 ;
    }
    update(deltaTime){
        this.x -= this.vx * deltaTime;
        if(this.x < 0 - this.width) {
            this.markedForDeletion = true;
            this.game.increaseScore();
        }

        if(this.enemyTimer > this.enemyInterval){
            this.enemyTimer = 0;

            if(this.frameX > this.maxFrameX) this.frameX = 0 
            else this.frameX++

        }else{
            this.enemyTimer += deltaTime;
        }
    }
   
   
}


export class Enemy2 extends Enemy{
    constructor(game){
        super(game);
        this.spriteWidth = 8307/39;
        this.spriteHeight = 337/2;
        this.width = this.spriteWidth / 2 ;
        this.height = this.spriteHeight / 2;
        this.x = this.game.width + this.width;
        this.y = Math.random() * this.game.height * 0.6;
        this.frameX = 0;
        this.frameY = 0;
        this.image = document.getElementById("enemy2Img");
        this.maxFrameX = 37;
        this.vx = Math.random() * 0.2 + 0.2;
        this.angle = 0;
        this.curve = Math.random() * 3 ;
    }
    update(deltaTime){
        this.x -= this.vx * deltaTime;
        if(this.x < 0 - this.width) {
            this.markedForDeletion = true;
            this.game.increaseScore();
        }

        if(this.enemyTimer > this.enemyInterval){
            this.enemyTimer = 0;

            if(this.frameX > this.maxFrameX) this.frameX = 0 
            else this.frameX++

        }else{
            this.enemyTimer += deltaTime;
        }
    }
   
   
}


export class Enemy3 extends Enemy{
    constructor(game){
        super(game);
        this.spriteWidth = 4485/39;
        this.spriteHeight = 190/2;
        this.width = this.spriteWidth / 2 ;
        this.height = this.spriteHeight / 2;
        this.x = this.game.width + this.width;
        this.y = Math.random() * this.game.height * 0.6;
        this.frameX = 0;
        this.frameY = 0;
        this.image = document.getElementById("enemy3Img");
        this.maxFrameX = 37;
        this.vx = Math.random() * 0.2 + 0.2;
        this.angle = 0;
        this.curve = Math.random() * 3 ;
    }
    update(deltaTime){
        this.x -= this.vx * deltaTime;
        if(this.x < 0 - this.width) {
            this.markedForDeletion = true;
            this.game.increaseScore();
        }

        if(this.enemyTimer > this.enemyInterval){
            this.enemyTimer = 0;

            if(this.frameX > this.maxFrameX) this.frameX = 0 
            else this.frameX++

        }else{
            this.enemyTimer += deltaTime;
        }
    }
  
   
}

export class Enemy4 extends Enemy{
    constructor(game){
        super(game);
        this.spriteWidth = 3861/39;
        this.spriteHeight = 190/2;
        this.width = this.spriteWidth / 2 ;
        this.height = this.spriteHeight / 2;
        this.x = this.game.width + this.width;
        this.y = Math.random() * this.game.height * 0.6;
        this.frameX = 0;
        this.frameY = 0;
        this.image = document.getElementById("enemy4Img");
        this.maxFrameX = 37;
        this.vx = Math.random() * 0.2 + 0.2;
        this.angle = 0;
        this.curve = Math.random() * 3 ;
    }
    update(deltaTime){
        this.x -= this.vx * deltaTime;
        if(this.x < 0 - this.width) {
            this.markedForDeletion = true;
            this.game.increaseScore();
        }

        if(this.enemyTimer > this.enemyInterval){
            this.enemyTimer = 0;

            if(this.frameX > this.maxFrameX) this.frameX = 0 
            else this.frameX++

        }else{
            this.enemyTimer += deltaTime;
        }
    }
  
   
}
