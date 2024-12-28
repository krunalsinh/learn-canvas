import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatusText } from "./utils.js";

window.addEventListener('load', function() {
    const loading = this.document.getElementById('loading');
    loading.style.display = "none";

    const canvas = this.document.getElementById("canvas");
    canvas.height = innerHeight;
    canvas.width = this.innerWidth;
    const ctx = canvas.getContext('2d');

    const player = new Player(canvas.width, canvas.height);
    const input = new InputHandler();
    let lastTime = 0;
    
    function animate(timestamp){

        const deltaTime = timestamp - lastTime;

        lastTime = timestamp;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        player.update(input.lastKey, deltaTime);
        player.draw(ctx);
        drawStatusText(ctx, input, player);
        requestAnimationFrame(animate);
        
    }
    animate(0);
    
})