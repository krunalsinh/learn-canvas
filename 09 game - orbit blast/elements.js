import {drawCircle, addText, moveTo} from '../common/common-functions.js';

class circle {
    constructor(ctx,x,y,radius,color, stroke, strokeSize){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.angle = 0.1;
        this.stroke = stroke || false;
        this.strokeSize = strokeSize || 0;
        this.dx = 2;
        this.dy = 2;
    }

    draw(){
        drawCircle(this.ctx, this.x , this.y , this.radius, this.color, this.stroke, this.strokeSize);
    }
}

class enemy extends circle{
    constructor(ctx,x,y,radius,color, angle, centerCircle){
        super(ctx,x,y,radius,color);
        this.direction = 0;
        this.angle = angle;
        this.centerCircle = centerCircle;
        this.x = this.centerCircle.x + 300 * Math.cos(this.angle);
        this.y = this.centerCircle.y + 300 * Math.sin(this.angle);
    }
    animate(enemyMove){
        this.direction = enemyMove;
        this.angle += this.direction;
        this.x = this.centerCircle.x + 300 * Math.cos(this.angle);
        this.y = this.centerCircle.y + 300 * Math.sin(this.angle);
        this.draw();
    }
}

class player extends circle{
    constructor(ctx,x,y,radius,color, angle, centerCircle){
        super(ctx,x,y,radius,color);
        this.direction = 0;
        this.angle = angle;
        this.centerCircle = centerCircle;
        this.x = this.centerCircle.x + 50 * Math.cos(this.angle);
        this.y = this.centerCircle.y + 50 * Math.sin(this.angle);
        this.fire = false;
        this.fireSpeed = 20;
    }

    animate(playerMove, playerFire){
        this.fire = playerFire;
        this.direction = playerMove;
        this.angle += this.direction;
        if(!this.fire){
            this.x = this.centerCircle.x + 50 * Math.cos(this.angle);
            this.y = this.centerCircle.y + 50 * Math.sin(this.angle);
        }else{
            let latestCord = moveTo(this.centerCircle.x, this.centerCircle.y , this.x, this.y, this.fireSpeed);
            this.x += latestCord.x;
            this.y += latestCord.y;
        }
        this.draw();
    }
}

class score {
    constructor(ctx,x,y,font,fontSize, color, score){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fontSize = fontSize;
        this.color = color;
        this.angle = 0.1;
        this.score = score;
    }

    updateScore(){
        this.score += 1;
    }

    draw(){
        addText(this.ctx, this.x, this.y, this.fontSize, this.font, this.color, `Score : ${this.score}`);
    }
}

export { circle, score, player, enemy};

