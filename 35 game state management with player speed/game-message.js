import { addText } from "../common/common-functions.js";

export default class GameMessage{
    constructor(game){
        this.game = game;
        this.fontSize = "30px";
        this.fontFamily = 'Creepster';
        this.color = "#fff";
        this.baseY = 50;
        this.lineGap = 40;
        this.x = 10;
    }
    draw(ctx){
        addText(ctx, this.game.width / 2, this.game.height / 2, this.fontSize, this.fontFamily, this.color, "GAME OVER", "center");
        addText(ctx, this.game.width / 2, this.game.height / 2 + 50, this.fontSize, this.fontFamily, this.color, "Press SPACE to restart", "center");
    }
} 