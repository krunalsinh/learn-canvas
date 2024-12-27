import { drawLine } from "../common/common-functions.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
let lastTime = 0;
let timer = 0;
let interval = 1000/60;
let cellSize = 20;
const mouse = {
    x : 0,
    y: 0
}

animate(0);

function animate(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if(timer > interval){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < canvas.height; y += cellSize) {
            for (let x = 0; x < canvas.width; x += cellSize) {
            const randColor = `hsl(${Math.random() * 360},50%, 50%)`
             drawLine(ctx, x, y, mouse.x, mouse.y, 1, "#666");
            }
        }
    }else{
        timer += deltaTime; 
    }
    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
})