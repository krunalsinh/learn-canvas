import {drawCircle, addText} from '../common/common-functions.js';

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

class player extends circle{
    constructor(ctx,x,y,radius,color, angle, direction, centerCircle){
        super(ctx,x,y,radius,color);
        this.direction = direction;
        this.angle = angle;
        this.centerCircle = centerCircle;
        this.x = this.centerCircle.x + 50 * Math.cos(this.angle);
        this.y = this.centerCircle.y + 50 * Math.sin(this.angle);
    }

    animate(){
        this.angle += this.direction;
        this.x = this.centerCircle.x + 50 * Math.cos(this.angle);
        this.y = this.centerCircle.y + 50 * Math.sin(this.angle);
        this.draw();
    }
}

class score {
    constructor(ctx,x,y,font,fontSize, color, text){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.font = font;
        this.fontSize = fontSize;
        this.color = color;
        this.angle = 0.1;
        this.text = text;
    }

    draw(){
        addText(this.ctx, this.x, this.y, this.fontSize, this.font, this.color, this.text);
    }
}

export { circle, score, player};

