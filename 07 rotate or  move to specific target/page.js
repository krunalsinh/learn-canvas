import { fillRect, drawTriangle, drawCircle, drawStar } from '../common/common-functions.js';
import { circle } from "./elements.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const colors = ['#e5989b', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
const mouse = { x: innerWidth / 2, y: innerHeight / 2 , radius : 120};

// animationFunc();


animationFunc();
function animationFunc() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, '#000');

    requestAnimationFrame(animationFunc);
}

function getDistance(x1, y1, x2, y2) {
    var xdist = x2 - x1;
    var ydist = y2 - y1;
    return Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));
}

function getAngle(x1, y1, x2, y2) { 
    var xdist = x2 - x1;
    var ydist = y2 - y1; 
  return Math.atan2(ydist, xdist) / Math.PI * 180
}

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

