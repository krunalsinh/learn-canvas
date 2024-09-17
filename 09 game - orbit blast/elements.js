import { drawCircle, addText, moveTo } from '../common/common-functions.js';

class circle {
    constructor(ctx, x, y, radius, color, stroke, strokeSize) {
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

    draw() {
        drawCircle(this.ctx, this.x, this.y, this.radius, this.color, this.stroke, this.strokeSize);
    }
}

class enemy extends circle {
    constructor(ctx, radius, color, angle, centerCircle, direction, enemyPathCircleWidth) {
        super(ctx, 0, 0, radius, color);
        
        this.direction = direction;
        this.angle = angle;
        this.centerCircle = centerCircle;
        this.distFromCenter = enemyPathCircleWidth;
        this.x = this.centerCircle.x + this.distFromCenter * Math.cos(this.angle);
        this.y = this.centerCircle.y + this.distFromCenter * Math.sin(this.angle);
    }
    animate() {
        this.angle += this.direction;
        this.x = this.centerCircle.x + this.distFromCenter * Math.cos(this.angle);
        this.y = this.centerCircle.y + this.distFromCenter * Math.sin(this.angle);
        this.draw();
    }
}

class player extends circle {
    constructor(ctx, x, y, radius, color, angle, centerCircle) {
        super(ctx, x, y, radius, color);
        this.direction = 0;
        this.angle = angle;
        this.centerCircle = centerCircle;
        this.x = this.centerCircle.x + 50 * Math.cos(this.angle);
        this.y = this.centerCircle.y + 50 * Math.sin(this.angle);
        this.fireSpeed = 20;
    }
}



class score {
    constructor(ctx, x, y, font, fontSize, color, score) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fontSize = fontSize;
        this.color = color;
        this.angle = 0.1;
        this.score = score;
    }

    updateScore() {
        this.score += 1;
    }

    draw() {
        addText(this.ctx, this.x, this.y, this.fontSize, this.font, this.color, `Score : ${this.score}`);
    }
}


class life extends score {
    constructor(ctx, x, y, font, fontSize, color, life) {
        super(ctx, x, y, font, fontSize, color);
        this.life = life;
    }

    decreaseLife() {
        this.life -= 1;
    }

    increaseLife() {
        this.life += 1;
    }
    
    updateState(){
        if (this.life < 16) {
            this.color = "red";
        } else if (this.life < 32) {
            this.color = "yellow";
        }
        this.draw();
    }

    draw() {
        addText(this.ctx, this.x, this.y, this.fontSize, this.font, this.color, `Life : ${Math.max(this.life, 0)}`);
    }
}

class particle extends circle {
    constructor(ctx, x, y, radius, color, dx, dy) {
        super(ctx, x, y, radius, color);
        this.dx = dx;
        this.dy = dy;
        this.alpha = 1;
        this.friction = 0.99;
    }

    update() {
        this.dx *= this.friction;
        this.dy *= this.friction;
        this.x += this.dx;
        this.y += this.dy;

        this.alpha -= 0.02;

        this.ctx.save();
        this.ctx.globalAlpha = this.alpha;
        this.draw();
        this.ctx.restore();
    }
}

class dispEle extends circle {
    constructor(ctx, x, y, radius, color) {
        super(ctx, x, y, radius, color);
        this.sx = 7 * (Math.random() - 0.5) + 5;
        this.sy = 7 * (Math.random() - 0.5) + 5;
    }

    animate(){
        this.x += this.sx;
        this.y += this.sy;
        
        if(this.x + this.radius > innerWidth || this.x < this.radius){
            this.sx = -this.sx;
        }

        if(this.y + this.radius > innerHeight || this.y < this.radius){
            this.sy = -this.sy;
        }

        this.draw();
    }

}


export { circle, score, player, enemy, life, particle, dispEle };

