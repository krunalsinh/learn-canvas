import {fillRect, drawTriangle, drawCircle, drawStar} from '../common/common-functions.js';
import {circle} from "./elements.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const eleCount = 50;
const colors = ['red', 'green', 'blue', 'yellow'];
const arr = [];

for(let i = 0; i < eleCount; i++){
    const radius = Math.random() * 50 + 10; 
    const randX = (Math.random() * (innerWidth - radius * 4)) + radius;
    const randY = (Math.random() * (innerHeight - radius * 4)) + radius;
    const color = colors[Math.floor(Math.random() * (colors.length - 1))];

    arr.push(new circle(ctx, randX, randY, radius, color));
}

function animationFunc(){
    fillRect(ctx, 0 , 0, innerWidth, innerHeight, '#000');
    arr.forEach(e => e.animate());
    requestAnimationFrame(animationFunc);
}

animationFunc()