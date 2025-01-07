


export class Layer{
    constructor(game, width, height, speedModifier, imageId, fullSize = true){
        this.game = game;
        this.aspectRatio = width / height;
        this.height = this.game.height;
        this.width = this.game.height * this.aspectRatio;
        this.speedModifier = speedModifier;
        this.image = document.getElementById(imageId);
        this.x = 0;
        this.y = 0;
        
        if(!fullSize){
            this.width = width;
            this.height = height;
            this.y = this.game.height - this.height;
        }
    }
    update(deltaTime){

        this.x -= this.game.speed * this.speedModifier;
        if(this.x < -this.width) this.x = 0 - this.game.speed * this.speedModifier;

    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width - this.game.speed * this.speedModifier, this.y, this.width, this.height);
    }
}

export default class Background{
    constructor(game){
       this.game = game;
       this.width = 1667;
       this.height = 500;
       this.layer1image = document.getElementById('layer1');
       this.layer2image = document.getElementById('layer2');
       this.layer3image = document.getElementById('layer3');
       this.layer4image = document.getElementById('layer4');
       this.layer1 = new Layer(this.game, this.width, this.height, 0.1, "layer1");
       this.layer2 = new Layer(this.game, this.width, this.height, 0.2, "layer2");
       this.layer3 = new Layer(this.game, this.width, this.height, 0.4, "layer3");
       this.layer4 = new Layer(this.game, this.width, this.height, 0.6, "layer4");
       this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4];  
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update();
        });
    }
    draw(context){
        
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    }
   
}