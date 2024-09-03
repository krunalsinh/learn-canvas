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



const circle1 = new circle(ctx, innerWidth / 2, innerHeight / 2, 100, 'red');
const circle2 = new circle(ctx, 200, innerHeight / 2, 100, 'blue');
let distance ;

function animationFunc(){
    fillRect(ctx, 0 , 0, innerWidth, innerHeight, '#000');
    circle2.x = mouse.x;
    circle2.y = mouse.y;

    distance = getDistence(circle1.x, circle1.y, circle2.x, circle2.y) - circle1.radius - circle2.radius;

    if(distance < 0){
        circle1.color = "yellow";
        circle2.color = "yellow";
    }else{
        circle1.color = "red";
        circle2.color = "blue";
    }

    circle1.draw();
    circle2.draw();
    requestAnimationFrame(animationFunc);
}

animationFunc();

window.addEventListener('mousemove',e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

function getDistence(x1,y1,x2,y2){
    var xdist = x2 - x1;
    var ydist = y2 - y1;
    return Math.sqrt(Math.pow(xdist , 2) + Math.pow(ydist , 2));
}
