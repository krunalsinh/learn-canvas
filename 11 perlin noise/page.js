import { fillRect } from '../common/common-functions.js';
import {circle} from "./elements.js";
import {noise} from "./perlin-noise.js";


const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;
const circles = [];
for (let index = 0; index < 100; index++) {
    const color = `hsl(${Math.random() * 255},50%, 50%)`;
    circles.push(new circle(ctx, innerWidth/2, innerHeight/2, 15, color, index * 0.01))
    
}

const circles2 = [];
for (let index = 0; index < 100; index++) {
    const color = `hsl(100,50%, 50%)`;
    circles2.push(new circle(ctx, innerWidth/2, innerHeight/2, 15, color, 20 + index * 0.01))
    
}

let time = 0;
function animationFunc() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, `rgba(0,0,0,0.1)`);
    // cir.y = noise(time) * innerHeight;
    // cir.x = noise(time) * innerWidth;
    // cir.draw();
    circles.forEach(cir => {
        cir.y = noise(time + cir.offset * 1.2) * innerHeight;
        cir.x = noise(time + cir.offset) * innerWidth;
        cir.draw();
    })

    circles2.forEach(cir => {
        cir.y = noise(time + cir.offset + 20) * innerHeight;
        cir.x = noise(time + cir.offset) * innerWidth;
        cir.draw();
    })


    requestAnimationFrame(animationFunc);
    time += 0.005;
}

animationFunc()