import { drawCircle } from "../common/common-functions.js";

class Particle{
    constructor(game){
        this.game = game;
        this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;
        if(this.size < 0.5) this.markedForDeletion = true;
    }
}

export class Dust extends Particle{
    constructor(game, x, y){
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = "rgba(0,0,0,0.2)";
    }
    draw(ctx){
        drawCircle(ctx, this.x, this.y, this.size, this.color);
    }
}

export class Splash extends Particle{
    constructor(game, x, y){
        super(game);
    }
}

export class Fire extends Particle{
    constructor(game, x, y){
        super(game);
    }
}