import { fillRect, getDistance, moveTo } from '../common/common-functions.js';
import { circle } from "./elements.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const colors = ['#e5989b', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
const mouse = { x: 100 / 2, y: 100, radius: 120 };


let ball = new circle(ctx, 10, 10, 20, 'pink');
let latestCord ;
let dist;

let speed = 5;
animationFunc();
function animationFunc() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, '#000');
    
    latestCord = moveTo(ball.x, ball.y , mouse.x, mouse.y, speed);
    dist = getDistance(ball.x, ball.y , mouse.x, mouse.y);
    
    ball.x += latestCord.x;
    ball.y += latestCord.y;
    if(dist < 5){
        ball.color = 'transparent';
    }else{
        ball.color = 'red';
    }
    ball.draw();

    requestAnimationFrame(animationFunc);
}

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

