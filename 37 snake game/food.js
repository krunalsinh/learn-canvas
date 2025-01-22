import { drawRectangle } from "../common/common-functions.js";

export default class Food {
    constructor(game) {
        this.game = game;
        this.x;
        this.y;
        this.reset();
    }

    reset(){
        this.x = Math.floor(Math.random() * this.game.columns);
        this.y = Math.floor(Math.random() * this.game.rows);
    }

    draw() {    
       drawRectangle(this.game.ctx, this.x * this.game.cellSize, this.y * this.game.cellSize, this.game.cellSize, this.game.cellSize, '#fff');
    }

    update(deltaTime) {
        
    }   

    
}