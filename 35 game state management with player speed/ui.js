import { addText } from "../common/common-functions.js";

export default class UI{
    constructor(game){
        this.game = game;
        this.fontSize = "30px";
        this.fontFamily = 'Helvetica';
        this.color = "#fff";
        this.baseY = 50;
        this.lineGap = 40;
        this.x = 10;
    }
    draw(ctx){
        addText(ctx, this.x, this.baseY + this.lineGap * 0, this.fontSize, this.fontFamily, "#fff", "Last input : "+this.game.input.keys.toString(), "left");
        addText(ctx, this.x, this.baseY + this.lineGap * 1, this.fontSize, this.fontFamily, "#fff", "Active State : "+this.game.player.currentState.state, "left");
        addText(ctx, this.x, this.baseY + this.lineGap * 2, this.fontSize, this.fontFamily, "#fff", "Player vy : "+this.game.player.vy, "left");
        addText(ctx, this.x, this.baseY + this.lineGap * 3, this.fontSize, this.fontFamily, "#fff", "Score : "+this.game.score, "left");
    }
}