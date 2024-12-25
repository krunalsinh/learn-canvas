import { drawRectangle } from "../common/common-functions.js";

class Game{
    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.enemies = [];
        this.enemyInterval = 1000;
        this.enemyTimer = 0;
    }

    update(deltaTime){
        this.enemies.filter(enemy => !enemy.markForDeletion);

        if(this.enemyTimer > this.enemyInterval){
            this.#addNewEnemy();
            this.enemyTimer = 0;
            console.log(this.enemies);
            
        }else{
            this.enemyTimer += deltaTime;
        }

        this.enemies.forEach(enemy => { enemy.update() })
    }

    draw(){
        this.enemies.forEach(enemy => { enemy.draw() })
    }

    #addNewEnemy(){
        this.enemies.push(new Worm(this))
    }
}

class Enemy{
    constructor(game){
        this.game = game;
        
        this.markForDeletion = false;
    }

    update(){
        this.x--;

        if(this.x < 0 - this.width) this.markForDeletion = true;
    }

    draw(){
        drawRectangle(this.game.ctx, this.x, this.y, this.width, this.height, "white");
    }
}

class Worm extends Enemy{
    constructor(game){
        super(game);
        this.width = 100;
        this.height = 100;
        this.x = this.game.width + this.width;
        this.y = Math.random() * this.game.height - this.height;
        this.image = wormImg;
    }
}

export { Game, Enemy}