import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatusText, handleGameover, toggleFullScreen } from "./utils.js";
import Background from "./background.js";
import {handleEnemy} from "./enemy.js";
import score from "./score.js";
import {isMobile} from "./checkMobile.js";

let ctx, restartGame;

console.log(isMobile());


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
    const toggleFulScreen = document.getElementById("toggleFulScreen");
    
    
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
    
    //Restart game
    restartGame = function() {
        if(isGameOver){
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            input.lastKey = "";
            player = new Player(canvas.width, canvas.height);
            background = new Background(canvas.width, canvas.height);
            score.score = 0;
            animate(0);
        }
    }
    
    
    // Start the animation loop
    animate(0);
    
    window.addEventListener('resize', function() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        input.lastKey = "";
        player = new Player(canvas.width, canvas.height);
        background = new Background(canvas.width, canvas.height);
        cancelAnimationFrame(canvasAnimation);
        animate(0);
    })

    toggleFulScreen.addEventListener('click', e => {
        toggleFullScreen();
    })
});

export { ctx, restartGame}