import { fillRect, getDistance, moveTo, addText } from '../common/common-functions.js';
import { circle, score, player as hero } from "./elements.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const colors = ['#e5989b', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
const mouse = { x: innerWidth / 2 , y: innerHeight / 2, radius: 120 };


const arr = [];

// fillRect(ctx, 0, 0, innerWidth, innerHeight, '#000');
const centerCircle = new circle(ctx, innerWidth / 2, innerHeight / 2, 20, '#111');



const enemyPathCircle = new circle(ctx, innerWidth / 2, innerHeight / 2, 300, '#111' , true , 20);


const playerAngle = Math.random() * 6.28;
let playerMove = playerAngle;
const playerX = centerCircle.x + 50 * Math.cos(playerAngle);
const playerY = centerCircle.y + 50 * Math.sin(playerAngle);
const playerCircle = new circle(ctx, playerX, playerY, 10, '#fff');

const player = new hero(ctx, )


const enemyAngle = Math.random() * 6.28;
const enemyX = centerCircle.x + 300 * Math.cos(enemyAngle);
const enemyY = centerCircle.y + 300 * Math.sin(enemyAngle);
const enemyCircle = new circle(ctx, enemyX, enemyY, 10, 'green');



const gameScore = new score(ctx, innerWidth - 100, 50, "sans-serif", "50px", "#fff", "0");





let lastIntervalTimestamp = 0;

animationFunc();
function animationFunc(now) {
    if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 1000) {
        lastIntervalTimestamp = now;
    }
    
    fillRect(ctx, 0, 0, innerWidth, innerHeight, '#000');

    if(playerMove === 0){

    }
    
    centerCircle.draw();

    enemyPathCircle.draw();

    playerCircle.draw();

    enemyCircle.draw();
    
    gameScore.draw();

    requestAnimationFrame(animationFunc);
}

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})


addEventListener('keydown', function(e) {
    if(e.code === 'KeyA') playerMove = -0.1;
    if(e.code === 'KeyD') playerMove = 0.1;
  });
  
  addEventListener('keyup', function(e) {
    if(e.code === 'KeyA') playerMove = 0;
    if(e.code === 'KeyD') playerMove = 0;
  });

//1) create UI -- done
//2) move player clockwise/anticlockwise using left/right key

