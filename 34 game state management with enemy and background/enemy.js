export default class Enemy {
    constructor(ctx, gameWidth, gameHeight) {
        //960 119
        this.ctx = ctx;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.img = document.getElementById("enemyImg");
        this.maxFrame = 6;
        this.spriteSliceWidth = 960 / this.maxFrame;
        this.spriteSliceHeight = 119;
        this.width = this.spriteSliceWidth / 2;
        this.height = this.spriteSliceHeight / 2;
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height;
        this.speed = 5;
        this.frameX = 0;
        this.frameY = 0;
    }

    update() {
        this.x -= gameSpeed + this.speed;
        if (this.x < -this.img.width) this.x = canvas.width;
        this.draw();
    }

    draw() {
        this.ctx.drawImage(
            this.img, 
            this.frameX * this.spriteSliceWidth,
            this.frameY * this.spriteSliceHeight,
            this.spriteSliceWidth,
            this.spriteSliceHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

export function handleEnemies(enemyArr, deltaTime) {

    let lastTime = 0;

    
    if (frame % 50 === 0) {
        enemies.push(new Enemy(ctx, canvas.width, canvas.height));
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
    }
    if (enemies.length > 10) {
        enemies.pop();
    }
}