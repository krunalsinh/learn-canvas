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
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop("0.1", "#ff5c33");
gradient.addColorStop("0.2", "#ff66b3");
gradient.addColorStop("0.4", "#ccccff");
gradient.addColorStop("0.6", "#b3ffff");
gradient.addColorStop("0.8", "#80ff80");
gradient.addColorStop("0.9", "#ffff33");

animate(0);

function animate(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if(timer > interval){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < canvas.height; y += cellSize) {
            for (let x = 0; x < canvas.width; x += cellSize) {

            const mouseAngle = Math.atan2(mouse.y - y, mouse.x - x);
            const disTance = getDistance(mouse.x, mouse.y, x, y);
            const size = cellSize / Math.max(Math.min(cellSize * (cellSize / disTance), cellSize / 2), 1);
             drawLine(ctx, x, y, x + Math.cos(mouseAngle) * size , y + Math.sin(mouseAngle) * size, 1, gradient);
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