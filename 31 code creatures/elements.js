import { drawRectangle } from "../common/common-functions.js";
import { canvas, ctx } from "./page.js";

class Game{
    constructor(){
        this.enemies = [];
        this.#addNewEnemy();
        console.log(this.enemies);
        
    }
    update(){
        this.enemies.forEach(enemy => enemy.update())

        this.draw();
    }
    draw(){

    }
    #addNewEnemy(){
        this.enemies.push(new Enemy())
    }
}

class Enemy{
    constructor(){
        this.x = 100;
        this.y = 100;
        this.width = 100;
        this.height = 100;
    }
    update(){
        this.x--;
    }
    draw(){
        drawRectangle(ctx, this.x, this.y, this.width, this.height, "black");
    }
}

export { Game, Enemy}