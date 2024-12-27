import { drawLine, getDistance, moveTo } from "../common/common-functions.js";




const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
let lastTime = 0;
let timer = 0;
let interval = 1000 / 60;
let cellSize = 15;
let distC = getDistance(0, 0, cellSize / 2, cellSize / 2);
const mouse = {
    x: 0,
    y: 0
}
let frameCounter = 0;
let frameCounterIncr = 0.00001;
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop("0.1", "#ff5c33");
gradient.addColorStop("0.2", "#ff66b3");
gradient.addColorStop("0.4", "#ccccff");
gradient.addColorStop("0.6", "#b3ffff");
gradient.addColorStop("0.8", "#80ff80");
gradient.addColorStop("0.9", "#ffff33");


let data = { 
    'cellSize': 15, 
    'patternZoom': 15, 
    'arrowSize': 25, 
    'lineWidth': 2, 
    
   
};

let gui = new dat.GUI();
gui.add(data, 'cellSize', 10, 50);
gui.add(data, 'patternZoom', 15, 50);
gui.add(data, 'arrowSize', 2, 50);
gui.add(data, 'lineWidth', 1, 10);


animate(0);

function animate(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if (timer > interval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < canvas.height; y += data.cellSize) {
            for (let x = 0; x < canvas.width; x += data.cellSize) {

                const angle = (Math.cos(x * frameCounter) + Math.sin(y * frameCounter)) * data.patternZoom;
                drawLine(ctx,
                    x,
                    y,
                    x + Math.cos(angle) * data.arrowSize,
                    y + Math.sin(angle) * data.arrowSize,
                    data.lineWidth,
                    gradient);
            }
        }
        frameCounter += frameCounterIncr;

        if (frameCounter > 0.01 || frameCounter < -0.001) frameCounterIncr = -frameCounterIncr;
        console.log(frameCounter);
    } else {
        timer += deltaTime;
    }

    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
})