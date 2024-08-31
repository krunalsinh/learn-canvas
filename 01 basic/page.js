import {fillRect, drawTriangle, drawCircle} from '../common/common-functions.js';
import {box, circle, triangle} from "./elements.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const eleCount = 50;
const colors = ['red', 'green', 'blue', 'yellow'];
const arr = [];

for(let i = 0; i < eleCount; i++){
    const radius = Math.random() * 50 + 10; 
    const width = radius, height = radius;
    const randX = (Math.random() * (innerWidth - radius * 2)) + radius;
    const randY = (Math.random() * (innerHeight - radius * 2)) + radius;
    const color = colors[Math.floor(Math.random() * (colors.length - 1))];
    
    if(Math.random() < 0.75){
        arr.push(new box(ctx, randX, randY, height, width, color));
    }else if(Math.random() < 0.35){
        arr.push(new circle(ctx, randX, randY, radius, color));
    }else{
        arr.push(new triangle(ctx, randX, randY, radius, color));
    }
}

function animationFunc(){
    fillRect(ctx, 0 , 0, innerWidth, innerHeight, '#000');
    arr.forEach(e => e.animate());
    requestAnimationFrame(animationFunc);
}


// drawCircle(ctx,150,150,100, 'blue')
// drawTriangle(ctx, 50, 50, 100, 'red');

animationFunc()