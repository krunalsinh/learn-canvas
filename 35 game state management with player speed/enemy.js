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

export class Worm extends Enemy{
    constructor(game){
        super(game);
        this.spriteWidth = 229;
        this.spriteHeight = 171;
        this.width = this.spriteWidth / 2 ;
        this.height = this.spriteHeight / 2;
        this.x = this.game.width + this.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.frameX = 0;
        this.frameY = 0;
        this.image = document.getElementById("enemyWorm");
        this.maxFrame = 4;
        this.vx = Math.random() * 0.1 + 0.05;
    }
   
}
export class Ghost extends Enemy{
    constructor(game){
        super(game);
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.width = this.spriteWidth / 2 ;
        this.height = this.spriteHeight / 2;
        this.x = this.game.width + this.width;
        this.y = Math.random() * this.game.height * 0.6;
        this.frameX = 0;
        this.frameY = 0;
        this.image = document.getElementById("enemyGhost");;
        this.maxFrame = 4;
        this.vx = Math.random() * 0.2 + 0.2;
        this.angle = 0;
        this.curve = Math.random() * 3 ;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.y += Math.sin(this.angle) * this.curve;
        this.angle += 0.05;
    }
    draw(ctx){
        ctx.save();
        ctx.globalAlpha = 0.7;
        super.draw(ctx);
        ctx.globalAlpha = 1;
        ctx.restore();

    }
   
}
export class Spider extends Enemy{
    constructor(game){
        super(game);
        this.spriteWidth = 310;
        this.spriteHeight = 175;
        this.width = this.spriteWidth / 2 ;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (this.game.width - this.width);
        this.y = 0 - this.height;
        this.frameX = 0;
        this.frameY = 0;
        this.image = document.getElementById("enemySpider");;
        this.maxFrame = 4;
        this.vx = 0;
        this.vy = Math.random() * 0.1 + 0.1;
        this.maxLength = Math.random() * (this.game.height - this.game.groundMargin * 1.5) + this.game.groundMargin ;
        this.maxLengthTouched = false;
    }
    update(deltaTime){
        super.update(deltaTime);

       
        this.y += this.vy * deltaTime;

        if(this.y > this.maxLength && !this.maxLengthTouched){ 
            this.maxLengthTouched = true;
            this.vy = -this.vy;
        }

        if(this.y < 0 - (this.height*2) || this.y > this.game.height) this.markedForDeletion = true;
        // console.log( "y : ",this.y, ", vy : ",this.vy, ", max length : ", this.maxLength, ", deleted : ", this.markForDeletion);
        
    }
    draw(ctx){
        drawLine(ctx, this.x + this.width / 2, 0, this.x + this.width / 2, this.y + 5, 1, "#000");
        super.draw(ctx);

    }
   
}
