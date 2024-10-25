import { drawSprite, drawCircle } from '../common/common-functions.js';

class player {
    constructor(ctx, image, x, y, width, height, frameX, frameY, speed, moving, type) {
        this.ctx = ctx;
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.frameX = frameX;
        this.frameY = frameY;
        this.speed = speed;
        this.moving = moving;
        this.type = type
    }
    animate(keys) {
        
        if (keys[38] && this.y > 100) {
            this.y -= this.speed;
            this.frameY = 3;
        }
        if (keys[40] && this.y < canvas.height - this.height) {
            this.y += this.speed;
            this.frameY = 0;
        }
        if (keys[37] && this.x > 0) {
            this.x -= this.speed;
            this.frameY = 1
        }
        if (keys[39] && this.x < canvas.width - this.width) {
            this.x += this.speed;
            this.frameY = 2
        }

        if (this.frameX < 3 && (keys[38] || keys[40] || keys[37] || keys[39])) this.frameX++
        else this.frameX = 0

        this.draw();
    }
    draw() {
        drawSprite(
            this.ctx,
            this.image,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height)
    }


}

class enemy extends player{
    constructor(ctx, image, x, y, width, height, frameX, frameY, speed, moving, type) {
        super(ctx, image, x, y, width, height, frameX, frameY, speed, moving, type);
    }
    animate(){
        
        
        this.x -= this.speed;

        if (this.frameX < 3 && this.moving) this.frameX++
        else this.frameX = 0
        
        this.draw();
    }
    draw() {
        drawSprite(
            this.ctx,
            this.image,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height)
    }

}

class ally extends player{
    constructor(ctx, image, x, y, width, height, frameX, frameY, speed, moving, type) {
        super(ctx, image, x, y, width, height, frameX, frameY, speed, moving, type);
    }
    animate(){
        
        
        this.y -= this.speed;

        if (this.frameX < 3 && this.moving) this.frameX++
        else this.frameX = 0
        
        this.draw();
    }
    draw() {
        drawSprite(
            this.ctx,
            this.image,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height)
    }
}

class particle{
    constructor(ctx, x, y, radius, color, dx, dy){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        this.opacity = 1;
    }

    animate(){
        this.x -= this.dx;
        this.y -= this.dy;
        this.opacity -= 0.08;

        this.draw();
    }

    draw(){
        this.ctx.save();
        this.ctx.globalAlpha = this.opacity;
        drawCircle(this.ctx, this.x, this.y, this.radius, this.color);
        this.ctx.restore();
    }
}


export {player, enemy,  ally, particle};