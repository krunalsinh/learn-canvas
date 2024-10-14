import { fillRect } from '../common/common-functions.js';
import {circle} from "./elements.js";
import {noise} from "./perlin-noise.js";


const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;
const particles = [];
const particleCount = 300;
for (let index = 0; index < particleCount; index++) {
    const color = `hsl(${Math.random() * 255},50%, 50%)`;
    const x = Math.random() * (innerWidth - 50) + 50;
    const y = Math.random() * (innerHeight - 50) + 50;
    particles.push(new circle(ctx, x, y, 1, color, index * 0.01))
    
}



let time = 0;
let noiseScale = 0.01;
function animationFunc() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, `rgba(0,0,0,0.01)`);
    // cir.y = noise(time) * innerHeight;
    // cir.x = noise(time) * innerWidth;
    // cir.draw();
    let temp = 0;
    particles.forEach(cir => {
        let n = noise(cir.x * noiseScale,  cir.y * noiseScale);
        // let a = (Math.PI * (Math.sin(temp) * 4)) * n;
        let a = (Math.PI * 2) * n;
        cir.x += Math.cos(a); 
        cir.y += Math.sin(a); 
        if(!checkOnScreen(cir)){
            cir.x = Math.random() * (innerWidth - 50) + 50;
            cir.y = Math.random() * (innerHeight - 50) + 50;
        }
        cir.draw();
        temp += 0.01;
    })


    requestAnimationFrame(animationFunc);
    time += 0.005;
}

function checkOnScreen(obj){
    return obj.x < canvas.width && obj.x >= 0 && obj.y < canvas.height && obj.y >= 0;
}

animationFunc()