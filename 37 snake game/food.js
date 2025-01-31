import { drawRectangle } from "../common/common-functions.js";

export default class Food {
    constructor(game) {
        this.game = game;
        this.x;
        this.y;
        this.reset();
        this.frameX = 0;
        this.spriteWidth = 200;
        this.spriteHeight = 400;
        this.frameCounter = 0;
        this.frameInterval = 1000/60;

        this.image = document.getElementById("mushroom");
    }

    reset() {
        this.x = Math.floor(Math.random() * this.game.columns);
        this.y = Math.floor(Math.random() * (this.game.rows - this.game.topMargin) + this.game.topMargin);
    }

    draw() {
        if (this.game.debug) {
            drawRectangle(this.game.ctx, this.x * this.game.cellSize, this.y * this.game.cellSize, this.game.cellSize, this.game.cellSize, '#fff');
        }
        this.game.ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            0 * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x * this.game.cellSize,
            this.y * this.game.cellSize - this.game.cellSize,
            this.game.cellSize,
            this.game.cellSize * 2
        )
    }

    update() {
        if(this.frameX < 8) this.frameX += 1;
    }


}