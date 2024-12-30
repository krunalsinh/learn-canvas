export default class Background{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.x = 0;
        this.y = 0;
        this.image = document.getElementById("backgroundImg");
        this.orignalWidth = 2400;
        this.orignalHeight = 720;
        this.aspectRatio = this.orignalWidth / this.orignalHeight;
        this.newHeight = this.gameHeight;
        this.newWidth = this.gameWidth * this.aspectRatio;
        this.timer = 0;
        this.drawFrameInterval = 1000/100;
        this.speed = 10;
    }
    update(deltatime){
        // console.log(this.image);
        
        if(this.timer > this.drawFrameInterval){
            this.x -= this.speed;
            this.timer = 0;
        }else{
            this.timer += deltatime;
        }
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.newWidth, this.newHeight);
        context.drawImage(this.image, this.x + this.newWidth - this.speed, this.y, this.newWidth, this.newHeight);
    }
}