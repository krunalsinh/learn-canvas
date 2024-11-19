import { addText, getDistance } from "../common/common-functions.js";
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
let particle = new Particle(ctx, innerWidth / 2, innerHeight / 2, 5, "#888");
let textData;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

gameInit();
animationFunc();

// functions
function gameInit() {
    addText(ctx, 10, 30, "30px", "Open Sans", "#fff","A");

    textData = ctx.getImageData(0, 0, 100, 100);
    // console.log(textData);
    // for (let i = 0; i < 800; i++) {
    //     const x = Math.random() * canvas.width;
    //     const y = Math.random() * canvas.height;
    //     particlesArr.push(new Particle(ctx, x, y, 2, "red"));
    // }

    for (let y = 0; y < textData.height; y++) {
        for (let x = 0; x < textData.width; x++) {
            if(textData.data[(y * 4 * textData.width) + (x * 4) + 3] > 128){
                let positionX = x;
                let positionY = y;
                particlesArr.push(new Particle(ctx, positionX * 10, positionY * 10, 2, "white" ))
            }
        }
    }
    // console.log(particlesArr);
    
}

function animationFunc() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    particlesArr.forEach(particle => particle.update(mouse) )
    
    requestAnimationFrame(animationFunc);
}

//event
addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})


