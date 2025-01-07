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
        this.colors = ["rgba(0,0,0,0.04)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.15)"];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    draw(ctx){
        drawCircle(ctx, this.x, this.y, this.size, this.color);
    }
}

export class Splash extends Particle{
    constructor(game, x, y, modifier){
        super(game);
        this.size = Math.random() * 20, 20;
        this.x = x;
        this.y = y;
        this.modifier = modifier;
        
        this.colors = [
            "rgba(255, 217, 0, 0.2)",
            "rgba(255, 217, 0, 0.5)",
            "rgba(255, 217, 0, 0.7)",
            "rgba(255, 94, 0, 0.2)",
            "rgba(255, 94, 0, 0.5)",
            "rgba(255, 94, 0, 0.8)"
        ];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        // this.color = "blue";
        this.angle = (-Math.PI ) / 30;
        this.velocity = {
            x : Math.cos(this.angle * this.modifier) * Math.random() * 8,
            y: Math.sin(this.angle * this.modifier) * Math.random() * 8
        }
    }
    update(){
        this.size *= 0.95;
        if(this.size < 0.5) this.markedForDeletion = true;

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.velocity.y += 0.06;
    }
    draw(ctx){
        drawCircle(ctx, this.x, this.y, this.size, this.color);
    }
}

export class Fire extends Particle{
    constructor(game, x, y){
        super(game);
        this.size = Math.random() * 6 + 6;
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 + 2;
        this.speedY = Math.random() * 2;
        this.colors = [
            "rgba(255, 217, 0, 0.2)",
            "rgba(255, 217, 0, 0.5)",
            "rgba(255, 217, 0, 0.7)",
            "rgba(255, 94, 0, 0.2)",
            "rgba(255, 94, 0, 0.5)",
            "rgba(255, 94, 0, 0.8)"
        ];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
    }
    update(){
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5) ;
        this.y += Math.cos(this.angle * 5) ;
    }
    draw(ctx){
        drawCircle(ctx, this.x, this.y, this.size, this.color);
    }
}