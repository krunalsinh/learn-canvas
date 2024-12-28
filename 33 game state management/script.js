import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatusText } from "./utils.js";

window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    loading.style.display = "none";

    const canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext('2d');

    const player = new Player(canvas.width, canvas.height);
    const input = new InputHandler();
    let lastTime = 0;

    // Animation loop
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw player
        player.update(input.lastKey, deltaTime);
        player.draw(ctx);

        // Draw status text
        drawStatusText(ctx, input, player);

        // Request next animation frame
        requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate(0);
});