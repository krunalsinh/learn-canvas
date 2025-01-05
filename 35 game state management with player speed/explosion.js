
export default class Explosion{
    constructor(x, y){
        this.image = document.getElementById('explosionImg');
        this.x = x;
        this.y = y;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 1000/5;
        this.spriteHeight = 179;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.markedForDeletion = false;
    }
    
    update(deltaTime){
        this.timeSinceLastFrame += deltaTime;


        if(this.timeSinceLastFrame > this.frameInterval) {
            this.frameX++;

            if(this.frameX > 5){
                this.markedForDeletion = true;
            }
        }

    }

    draw(ctx){
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    }
}