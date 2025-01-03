import Background from "./background.js";
import InputHandler from "./input.js";
import Player from "./player.js";

let ctx;

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;

    class Game {
        constructor(height, width) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.speed = 3;
            this.player = new Player(this);
            this.input = new InputHandler();
            this.background = new Background(this);
        }
        update(deltaTime){
            this.background.update(deltaTime);
            this.player.update(this.input.keys, deltaTime)
        }
        draw(ctx){
            
            
            this.background.draw(ctx);
            this.player.draw(ctx);
        }
    }

    const game = new Game(canvas.height, canvas.width);

    let lastTime = 0;
    function animate(timestamp){
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});

export { ctx };