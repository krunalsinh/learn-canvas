import { fillRect } from '../common/common-functions.js';
import {Star} from './elements.js';

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const stars = [];
const starCount = 100;
for (let i = 0; i < starCount; i++) {
    const cord = addUpdatePosition();
    stars.push(new Star(ctx, cord.x, cord.y, 5,'red'))
}
console.log(stars);


function animationFunc() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, `rgba(0,0,0,0.1)`);
    stars.forEach(star => {
        if(checkOnScreen(star)){
            star.velocity.y = -star.velocity.y * star.friction;
        }else{
            star.velocity.y += star.gravity;
        }
        star.animate()
    })
    requestAnimationFrame(animationFunc);
}
function checkOnScreen(obj){
    return obj.y + obj.radius + obj.velocity.y > canvas.height;
}

function addUpdatePosition(obj){
    const x =  Math.random() * (innerWidth - 50) + 50;
    const y = Math.random() * (innerHeight - 50) + 50;
    if(obj){
        obj.x = x;
        obj.y = y;
    }else{
        return {x,y}
    }
}
animationFunc()