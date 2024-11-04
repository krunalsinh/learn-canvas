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

let particleColorCount = 0;
const particleArr = [];
let obstacleColorCount = 0;
const obstacleArr = [];


animationFunc();
function animationFunc(timestamp) {
    requestAnimationFrame(animationFunc);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    bird.animate(spacePressed);
}

function handleParticles(){
    const size = Math.random() * 5 + 3;
    const x = bird.x;
    const y = bird.y + bird.height / 2;
    const speedY = Math.random() * 1 - 0.5;
    const color = `hsl(${Math.sin(particleColorCount) * 360},50%,50%)`;
    
    particleArr.unshift(new Particle(ctx, x, y, size, speedY, color));

    particleArr.forEach(particle => particle.animate(gameSpeed));

    if(particleArr.length > 200) {
        for(let i = 0; i < 20; i++){
            particleArr.pop(particleArr[i])
        }
    }
    particleColorCount += 0.01;
}

function addObstacle(){
    const top = (Math.random() * canvas.height / 3) + 20;
    const bottom = (Math.random() * canvas.height / 3) + 20;
    const end = canvas.height;
    const color = `hsl(${Math.sin(obstacleColorCount) * 360},50%,50%)`;

    obstacleColorCount += 0.01;
}

addEventListener('keydown', e => {
    if(e.code === "Space") spacePressed = true;
})

addEventListener('keyup', e => {
    if(e.code === "Space") spacePressed = false;
})