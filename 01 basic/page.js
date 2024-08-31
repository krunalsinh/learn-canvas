import {fillRect, drawTriangle, drawCircle, drawStar} from '../common/common-functions.js';
import {box, circle, triangle, star} from "./elements.js";

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
    const randX = (Math.random() * (innerWidth - radius * 4)) + radius;
    const randY = (Math.random() * (innerHeight - radius * 4)) + radius;
    const color = colors[Math.floor(Math.random() * (colors.length - 1))];
    
    const randNo = Math.random();
    console.log(randNo);
    

    if(randNo < 0.25){
        arr.push(new box(ctx, randX, randY, height, width, color));
    }else if(randNo < 0.5){
        arr.push(new circle(ctx, randX, randY, radius, color));
    }else if(randNo < 0.75){
        arr.push(new triangle(ctx, randX, randY, radius, color));
    }else{
        arr.push(new star(ctx, randX, randY, radius, color));
    }
}
console.log(arr);

function animationFunc(){
    fillRect(ctx, 0 , 0, innerWidth, innerHeight, '#000');
    arr.forEach(e => e.animate());
    requestAnimationFrame(animationFunc);
}

animationFunc()