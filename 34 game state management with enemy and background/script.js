import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatusText, handleGameover } from "./utils.js";
import Background from "./background.js";
import {handleEnemy} from "./enemy.js";

let ctx;

window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    loading.style.display = "none";

    const canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx = canvas.getContext('2d');
    let canvasAnimation;

    let player = new Player(canvas.width, canvas.height);
    let background = new Background(canvas.width, canvas.height);
    const input = new InputHandler();
    let isGameOver = false;
    
    
    // Animation loop
    let lastTime = 0;
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // update and draw background
        background.update(deltaTime);
        background.draw();
        
        // update and draw enemies
        isGameOver = handleEnemy(canvas, player, deltaTime);
        if(isGameOver){
            cancelAnimationFrame(canvasAnimation);
            handleGameover(canvas, 0);
        }
        
        // Update and draw player
        player.update(input.lastKey, deltaTime);
        player.draw();

        // Draw status text
        drawStatusText( input, player);
        
        // Request next animation frame
        if(!isGameOver)
        requestAnimationFrame(animate);
    }
    
 
    
    
    // Start the animation loop
    animate(0);
    
    window.addEventListener('resize', function() {
        console.log("eve");
        
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        player = new Player(canvas.width, canvas.height);
        background = new Background(canvas.width, canvas.height);
        cancelAnimationFrame(canvasAnimation);
        animate(0);
    })
});

export { ctx}