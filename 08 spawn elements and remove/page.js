import { fillRect, getDistance, moveTo } from '../common/common-functions.js';
import { circle } from "./elements.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const colors = ['#e5989b', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
const mouse = { x: innerWidth / 2 , y: innerHeight / 2, radius: 120 };


const arr = [];
let lastIntervalTimestamp = 0;

animationFunc();
function animationFunc(now) {
    if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 1000) {
        console.log(arr);
        
        lastIntervalTimestamp = now;

        const radius = Math.random() * 3 + 10;
        let randX = (Math.random() * (innerWidth - radius * 2)) + radius * 2;
        let randY = (Math.random() * (innerHeight - radius * 2)) + radius * 2;
        const color = colors[Math.floor(Math.random() * (colors.length - 1))];
        arr.push(new circle(ctx, randX, randY, radius, color));

    }
    
    fillRect(ctx, 0, 0, innerWidth, innerHeight, 'rgba(0,0,0,0.2)');
    
    for(let i = 0; i < arr.length; i++){
        arr[i].draw();

        const dist = getDistance(arr[i].x, arr[i].y , mouse.x, mouse.y);
        const speed = dist * ((Math.random() * (0.08 - 0.04)) + 0.04); // this makes movement fast to slow
        const latestCord = moveTo(arr[i].x, arr[i].y , mouse.x, mouse.y, speed);

        if(dist > arr[i].radius + speed){
            arr[i].x += latestCord.x;
            arr[i].y += latestCord.y;
        }else{
            var index = arr.indexOf(arr[i]);
            if (index > -1) {
                arr.splice(index, 1);
            }
        }
    }

    requestAnimationFrame(animationFunc);
}

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

