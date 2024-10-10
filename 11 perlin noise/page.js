import { fillRect } from '../common/common-functions.js';
import {circle} from "./elements.js";
import {noise} from "./perlin-noise.js";


const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;
const circles = [];
for (let index = 0; index < 100; index++) {

    circles.push(new circle(ctx, innerWidth/2, innerHeight/2, 5, 'red'))
    
}
console.log(circles);

let time = 0;
function animationFunc() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, `rgba(0,0,0,1)`);
    // cir.y = noise(time) * innerHeight;
    // cir.x = noise(time) * innerWidth;
    // cir.draw();

    requestAnimationFrame(animationFunc);
    time += 0.005;
}

animationFunc()