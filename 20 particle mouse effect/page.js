import { Particle } from "./elements.js";

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const particlesArr = [];
const mouse = {
    x : null,
    y : null,
    radius : 150
}

canvas.width = canvasWidth;
canvas.height = canvasHeight;

gameInit();
animationFunc();

// functions
function gameInit() {
    for (let i = 0; i < 500; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        particlesArr.push(new Particle(ctx, x, y, 3, "red"));
        
    }
}

function animationFunc() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    particlesArr.forEach(particle => particle.update() )
    
    requestAnimationFrame(animationFunc);

}

//event
addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})


