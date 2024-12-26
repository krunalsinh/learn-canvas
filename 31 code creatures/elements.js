import { drawLine, drawRectangle } from "../common/common-functions.js";

class Game{
    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.enemies = [];
        this.enemyInterval = 500;
        this.enemyTimer = 0;
        this.enemyTypes = ['worm','ghost','spider'];
    }

    update(deltaTime){
        
        this.enemies = this.enemies.filter(enemy => !enemy.markForDeletion);

        if(this.enemyTimer > this.enemyInterval){
            this.#addNewEnemy();
            this.enemyTimer = 0;
            
        }else{
            this.enemyTimer += deltaTime;
        }

        this.enemies.forEach(enemy => { enemy.update(deltaTime) })
    }

    draw(){
        this.enemies.forEach(enemy => { enemy.draw(this.ctx) })
    }

    #addNewEnemy(){
        const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
        if(randomEnemy === "ghost") this.enemies.push(new Ghost(this));
        else if(randomEnemy === "worm") this.enemies.push(new Worm(this));
        else if(randomEnemy === "spider") this.enemies.push(new Spider(this));
        
        this.enemies.sort((a,b) => a.y - b.y);
    }
}

class Enemy{
    constructor(game){
        this.game = game;
        this.markForDeletion = false;
        this.enemyInterval = 50;
        this.enemyTimer = 0;
    }

    update(deltaTime){
        this.x -= this.vx * deltaTime;
        if(this.x < 0 - this.width) this.markForDeletion = true;

        if(this.enemyTimer > this.enemyInterval){
            this.enemyTimer = 0;

            if(this.frameX > this.maxFrame) this.frameX = 0 
            else this.frameX++

        }else{
            this.enemyTimer += deltaTime;
        }
    }

    draw(ctx){
        // drawRectangle(this.game.ctx, this.x, this.y, this.width, this.height, "white");
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class Worm extends Enemy{
    constructor(game){
        super(game);
        this.spriteWidth = 229;
        this.spriteHeight = 171;
        this.width = this.spriteWidth / 2 ;
        this.height = this.spriteHeight / 2;
        this.x = this.game.width + this.width;
        this.y = this.game.height - this.height;
        this.frameX = 0;
        this.frameY = 0;
        this.image = wormImg;
        this.maxFrame = 4;
        this.vx = Math.random() * 0.1 + 0.05;
    }
   
}
class Ghost extends Enemy{
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
        this.image = ghostImg;
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
class Spider extends Enemy{
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
        this.image = spiderImg;
        this.maxFrame = 4;
        this.vx = 0;
        this.vy = Math.random() * 0.1 + 0.1;
        this.maxLength = Math.random() * this.game.height;
    }
    update(deltaTime){
        super.update(deltaTime);

        this.y += this.vy * deltaTime;

        if(this.y > this.maxLength) this.vy = -this.vy;

        if(this.y < 0 - (this.height*2)) this.markForDeletion = true;
    }
    draw(ctx){
        drawLine(ctx, this.x + this.width / 2, 0, this.x + this.width / 2, this.y + 5, 1, "#000");
        super.draw(ctx);

    }
   
}
export { Game, Enemy}