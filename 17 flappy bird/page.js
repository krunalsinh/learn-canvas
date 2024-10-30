import {getIntFromRange} from "../common/common-functions.js";
import { Bird, Particle } from "./elements.js";



const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 600;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;
const birdSize = 20;
const bird = new Bird(canvas, ctx, 150, canvas.height - 155, birdSize, birdSize, "red" );

const particleArr = [];

animationFunc();
function animationFunc(timestamp) {
    requestAnimationFrame(animationFunc);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.animate(spacePressed);
    handleParticles();
}

function handleParticles(){
    const x = bird.x;
    const y = bird.y;
    const size = Math.random() * 7 + 3;
    const speedY = Math.random() * 1 - 0.5
    particleArr.unshift(new Particle(ctx, x, y, size, speedY, gameSpeed, 'red'));

    particleArr.forEach(particle => particle.animate());

    if(particleArr.length > 200) {
        for(let i = 0; i < 20; i++){
            particleArr.pop(particleArr[i])
        }
    }
}

addEventListener('keydown', e => {
    if(e.code === "Space") spacePressed = true;
    
})

addEventListener('keyup', e => {
    if(e.code === "Space") spacePressed = false;
})