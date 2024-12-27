import { drawLine, getDistance, moveTo } from "../common/common-functions.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
let lastTime = 0;
let timer = 0;
let interval = 1000/60;
let cellSize = 25;
let distC = getDistance(0, 0, cellSize / 2, cellSize / 2);
const mouse = {
    x : 0,
    y: 0
}
let frameCounter = 0;

animate(0);

function animate(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if(timer > interval){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < canvas.height; y += cellSize) {
            for (let x = 0; x < canvas.width; x += cellSize) {

            const mouseAngle = Math.atan2(mouse.y - y, mouse.x - x);
            //  drawLine(ctx, x, y, x + Math.sin(frameCounter) * cellSize , y + Math.cos(frameCounter) * cellSize, 1, "#fff");
             drawLine(ctx, x, y, x + Math.sin(-mouseAngle) * cellSize , y + Math.cos(-mouseAngle) * cellSize, 1, "#fff");
            }
        }
    }else{
        timer += deltaTime; 
    }
    frameCounter += 0.01;
    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
})