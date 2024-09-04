import { fillRect, drawTriangle, drawCircle, drawStar } from '../common/common-functions.js';
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

function getDistance(x1, y1, x2, y2) {
    var xdist = x2 - x1;
    var ydist = y2 - y1;
    return Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));
}

function moveTo(x1, y1, x2, y2, speed) {
    const calc = (Math.atan2(y2 - y1, x2 - x1) / Math.PI * 180) * Math.PI / 180;
    return {
        x: speed * Math.cos(calc),
        y: speed * Math.sin(calc)
    };
}
window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

