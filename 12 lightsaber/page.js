import { fillRect, moveTo } from '../common/common-functions.js';
import {circle} from "./elements.js";


const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const mouse = {x : innerWidth / 2, y : innerHeight / 2};

const particles = [];

const particleCount = 100;
const colorOffset = 255 / 100;

for (let index = 0; index < particleCount; index++) {
    const color = `hsl(${colorOffset * index},50%,50%)`;
    console.log(color);
    
    particles.push(new circle(ctx, canvas.width / 2, canvas.height / 2, 5, color,index * 2))
}

function animationFunc() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, `rgba(0,0,0,0.1)`);
   

    particles.forEach(particle => {
        const newPos = moveTo(particle.x, particle.y, mouse.x, mouse.y, particle.offset);
        particle.x = canvas.width / 2 + newPos.x;
        particle.y = canvas.height / 2 + newPos.y;
        particle.draw();
    })
    requestAnimationFrame(animationFunc);
}

animationFunc();


window.addEventListener('mousemove',e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})