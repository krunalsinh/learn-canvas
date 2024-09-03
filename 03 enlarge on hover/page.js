import {fillRect, drawTriangle, drawCircle, drawStar} from '../common/common-functions.js';
import {circle} from "./elements.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const eleCount = 200;
const colors = ['#8ecae6', '#219ebc', '#ffb703', '#fb8500'];
const arr = [];
const mouse = {x : innerWidth / 2, y : innerHeight / 2};

for(let i = 0; i < eleCount; i++){
    const radius = Math.random() * 8 + 3; 
    const randX = (Math.random() * (innerWidth - radius * 4)) + radius;
    const randY = (Math.random() * (innerHeight - radius * 4)) + radius;
    const color = colors[Math.floor(Math.random() * (colors.length - 1))];

    arr.push(new circle(ctx, randX, randY, radius, color));
}

function animationFunc(){
    fillRect(ctx, 0 , 0, innerWidth, innerHeight, '#000');
    arr.forEach(e => {
        if(e.x > mouse.x - 150 && e.x < mouse.x + 150 && e.y > mouse.y - 150 && e.y < mouse.y + 150){
            if(e.radius < e.maxRadius){
                e.radius += 2;
            }
        }else{
            if(e.radius > e.minRadius){
                e.radius -= 1;
            }
        }
        e.animate();
    });
    requestAnimationFrame(animationFunc);
}

animationFunc();


window.addEventListener('mousemove',e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})