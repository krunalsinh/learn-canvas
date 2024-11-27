import { addText, getDistance } from "../common/common-functions.js";
import { Particle } from "./elements.js";

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let particlesArr = [];
const txtInput = document.getElementById("txtInput");
const mouse = {
    x : null,
    y : null,
    radius : 150
}
let textData, colrDeg = 0, colrDegIncr = 0, startX =0, startY = 0, endX = 0, endY = 0, offsetX = 0, offsetY = 0;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

gameInit();
animationFunc();

// functions
function gameInit() {
    colrDeg = 0;
    colrDegIncr = 0;
    txtInput.setAttribute("disabled", "true");
    particlesArr = [];
    addText(ctx, 10, 30, "30px", "Open Sans", "#fff",txtInput.value ? txtInput.value : "Text");
    
    textData = ctx.getImageData(10, 0, 100, 50);
 
    colrDegIncr = 360 / (textData.height * textData.width);

    for (let y = 0; y < textData.height; y++) {
        for (let x = 0; x < textData.width; x++) {
            colrDeg += colrDegIncr;
            if(textData.data[(y * 4 * textData.width) + (x * 4) + 3] > 128){
                let positionX = x;
                let positionY = y;
                let randX1 = Math.random() * -200;
                let randX2 = Math.random() * 200 + innerWidth;
                let randY1 = Math.random() * -200;
                let randY2 = Math.random() * 200 + innerHeight;
                let initX = Math.random() > 0.5 ? randX1 : randX2;
                let initY = Math.random() > 0.5 ? randY1 : randY2;
                particlesArr.push(new Particle(ctx, 50 + positionX * 20, 50 + positionY * 20, 7, `hsl(${colrDeg}, 60%, 60%)`, initX, initY ))
                
            }
            
        }
    }
    
    txtInput.removeAttribute("disabled");
    setTimeout(() => {

        txtInput.focus();
    }, 800)

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

txtInput.addEventListener('input', e => {
    gameInit()
})

