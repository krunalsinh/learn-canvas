import { addText } from "../common/common-functions.js";

export default class UI{
    constructor(game){
        this.game = game;
        this.fontSize = "30px";
        this.fontFamily = 'Creepster';
        this.color = "#fff";
        this.baseY = 50;
        this.lineGap = 40;
        this.x = 10;
        this.life = {
            img : document.getElementById("lifeImg"),
            imgSize : 15
        }
        
    }
    draw(ctx){
        for(let i = 0; i < this.game.player.life; i++){
            ctx.drawImage(this.life.img, this.x + (i * this.life.imgSize * 2), this.baseY + this.lineGap * 0, this.life.imgSize * 2, this.life.imgSize * 2);
        }
        addText(ctx, this.x, this.baseY + this.lineGap * 2, this.fontSize, this.fontFamily, "#fff", "Last input : "+this.game.input.keys.toString(), "left");
        addText(ctx, this.x, this.baseY + this.lineGap * 3, this.fontSize, this.fontFamily, "#fff", "Active State : "+this.game.player.currentState.state, "left");
        addText(ctx, this.x, this.baseY + this.lineGap * 4, this.fontSize, this.fontFamily, "#fff", "Player vy : "+this.game.player.vy, "left");
        addText(ctx, this.x, this.baseY + this.lineGap * 5, this.fontSize, this.fontFamily, "#fff", "Score : "+this.game.score, "left");
    }
}