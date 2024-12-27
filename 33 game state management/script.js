import Player from "./player.js";
import InputHandler from "./input.js";

window.addEventListener('load', function() {
    const loading = this.document.getElementById('loading');
    loading.style.display = "none";

    const canvas = this.document.getElementById("canvas");
    canvas.height = innerHeight;
    canvas.width = this.innerWidth;
    const ctx = canvas.getContext('2d');

    const player = new Player(canvas.width, canvas.height);
    player.draw(ctx);

    const input = new InputHandler();
    console.log(input.lastKey);
    
    function animate(){
        // console.log(input.lastKey);
        requestAnimationFrame(animate);
        
    }
    animate();
    
})