import { fillRect, getDistance } from '../common/common-functions.js';
import { circle } from "./elements.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const colors = ['#e5989b', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
const mouse = { x: innerWidth / 2, y: innerHeight / 2 , radius : 120};

// animationFunc();

const ball1 = new circle(ctx, 300, 100, 20, 'red');
const ball1Child = new circle(ctx, 200, 200, 20, 'pink');
const ballMiddle = new circle(ctx, innerWidth / 2, innerHeight / 2, 20, 'blue');

let target = ball1;
animationFunc();
function animationFunc() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, '#000');

    ball1.x = mouse.x;
    ball1.y = mouse.y;

    ball1Child.angle += 0.1;
    ball1Child.x = target.x + 100 * Math.sin(ball1Child.angle);
    ball1Child.y = target.y + 100 * Math.cos(ball1Child.angle);

    if (getDistance(ball1.x, ball1.y, ballMiddle.x, ballMiddle.y) < ball1.radius + ballMiddle.radius + 100) {
        target = ballMiddle
    }else{
        target = ball1
    }

    ball1.draw();
    ball1Child.draw();
    ballMiddle.draw();
   
    requestAnimationFrame(animationFunc);
}



window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

