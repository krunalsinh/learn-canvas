import { addText, getDistance } from "../common/common-functions.js";
import { Particle } from "./elements.js";
import imgData from "./image-data.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let width = 714 / 1.5;
let height = 952 / 1.5;

canvas.width = width ;
canvas.height = height ;
canvas.style = `width: ${width}px ; height: ${height}px`;
const mouse = {
    x: null,
    y: null,
    radius: 150
}
// step1 (take image object to draw)
let image = new Image();
image.src = imgData;

const particlesArr = [], particlesCounts = 3500;
let cellBrightness = null, mappedImage = [];


// functions
function init() {
    
    // step2 (draw image on canvas)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // step3 (get image data)
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // step4 (generate particles with own values and particle movement speed logic)
    for (let i = 0; i < particlesCounts; i++) {
        let x = Math.random() * canvas.width;
        let y = 0;
        let speed = 0;
        let velocity = Math.random() * 0.7;
        let size = Math.random() * 2 + 0.1;
        let color = `white` ;

        particlesArr.push(new Particle(ctx, x, y, size, speed, velocity, color));
    }

    // step5 (set brightness data with Relative Brightness formula)
    mappedImage = [];
    for (let y = 0; y < canvas.height; y++) {
        let row = [];
        for (let x = 0; x < canvas.width; x++) {
            const red = scannedImage.data[(y * 4 * scannedImage.width) + (x * 4)]
            const green = scannedImage.data[(y * 4 * scannedImage.width) + (x * 4 + 1)]
            const blue = scannedImage.data[(y * 4 * scannedImage.width) + (x * 4 + 2)]
            const brightness = calculateRelativeBrightness(red, green, blue);
           
            row.push(brightness);
        }
        mappedImage.push(row)
    }
    
    animate();
}

function calculateRelativeBrightness(red, green, blue) {
    return Math.sqrt(
        (red * red) * 0.299 +
        (green * green) * 0.587 +
        (blue * blue) * 0.114
    )/100 ;
}
// step6 (set canvas opacity level for particle fade effect)
function animate() {
    // ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.04;
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.2;

    for (let i = 0; i < particlesArr.length; i++) {
        ctx.globalAlpha = particlesArr[i].speed * 0.3;
        particlesArr[i].update();
    }
    requestAnimationFrame(animate)
}


//event
addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

image.addEventListener("load", init);

//export
export { canvas , mappedImage}