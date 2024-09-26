import {fillRect, drawTriangle, drawCircle, drawStar} from '../common/common-functions.js';
import {box, circle, triangle, star} from "./elements.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const eleCount = 50;
const colors = ['red', 'green', 'blue', 'yellow'];
const arr = [];


ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);
for (let i = 0; i < canvas.width; i++) {
    ctx.lineTo(i, i);
}
ctx.lineWidth = 1;
ctx.stroke();
ctx.closePath();
// function animationFunc(){
//     fillRect(ctx, 0 , 0, innerWidth, innerHeight, '#000');
  
//     requestAnimationFrame(animationFunc);
// }

// animationFunc()