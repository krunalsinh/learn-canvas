import { Game } from "./elements.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
let lastTime = 0;
let game = null;

//functions
function init() {
    game = new Game(ctx, canvas.width, canvas.height);
    animate(0);
}
function animate(timeStamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    
    game.update(deltaTime);
    game.draw();

    requestAnimationFrame(animate);
}
//events

addEventListener('load', function() {
    init();
})
//export
export { canvas, ctx}