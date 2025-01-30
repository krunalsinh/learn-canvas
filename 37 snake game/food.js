import { drawRectangle } from "../common/common-functions.js";

export default class Food {
    constructor(game) {
        this.game = game;
        this.x;
        this.y;
        this.reset();
        this.image = document.getElementById("magicBerry");
    }

    reset(){
        this.x = Math.floor(Math.random() * this.game.columns);
        this.y = Math.floor(Math.random() * (this.game.rows - this.game.topMargin) + this.game.topMargin);
    }

    draw() {    
        if(this.game.debug){
            drawRectangle(this.game.ctx, this.x * this.game.cellSize, this.y * this.game.cellSize, this.game.cellSize, this.game.cellSize, '#fff');
        }
       this.game.ctx.drawImage(this.image, this.x * this.game.cellSize, this.y * this.game.cellSize, this.game.cellSize, this.game.cellSize)
    }

    update(deltaTime) {
        
    }   

    
}