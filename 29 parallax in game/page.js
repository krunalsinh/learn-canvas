import { loadImage, fillRect } from "../common/common-functions.js";
import { BgImg } from "./elements.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 700;

let bgImg1 = null, bgImg2 = null, bgImg3 = null, bgImg4 = null, bgImg5 = null;
let x = 0, x2 = 2400, gameSpeed = 10;

await Promise.resolve(loadImage("./images/layer-1.png"))
.then(image => {
    bgImg1 = image;
});
await Promise.resolve(loadImage("./images/layer-2.png"))
.then(image => {
    bgImg2 = image;
});
await Promise.resolve(loadImage("./images/layer-3.png"))
.then(image => {
    bgImg3 = image;
});
await Promise.resolve(loadImage("./images/layer-4.png"))
.then(image => {
    bgImg4 = image;
});
await Promise.resolve(loadImage("./images/layer-5.png"))
.then(image => {
    bgImg5 = image;
});

init();

// functions
function init() {
    animate();
}

function animate() {
    fillRect(ctx, 0, 0, canvas.width, canvas.height, "#000");
    
    ctx.drawImage(bgImg4, x, 0);
    ctx.drawImage(bgImg4, x2, 0);

    if(x < -2400) x = 2400 + x2 - gameSpeed;
    else x -= gameSpeed;

    if(x2 < -2400) x2 = 2400 + x - gameSpeed;
    else x2 -= gameSpeed;

    requestAnimationFrame(animate)
}

//export
export { canvas}