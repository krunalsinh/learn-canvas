import { fillRect, moveTo } from '../common/common-functions.js';
import {circle2} from "./elements.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const mouse = {x : innerWidth / 2, y : innerHeight / 2};

const particles = [];

const particleCount = 200;
const colorOffset = 255 / particleCount;

for (let index = 0; index < particleCount; index++) {
    const color = `hsl(${colorOffset * index},50%,50%)`;
    const center = {x : canvas.width / 2, y : canvas.height / 2};
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    
    particles.push(new circle2(ctx, x, y, 5, color,center, index))
}

let angle = 0;
function animationFunc() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, `rgba(0,0,0,0.05)`);
   
    particles.forEach(particle => particle.animate(angle))
    requestAnimationFrame(animationFunc);
}

animationFunc();


window.addEventListener('mousemove',e => {
    gsap.to(mouse,{
        x : e.clientX - canvas.width / 2,
        y : e.clientY - canvas.height / 2,
        duration: 1
    })

    angle = Math.atan2(mouse.y, mouse.x);
})