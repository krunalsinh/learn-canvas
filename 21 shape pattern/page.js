import { addText, getDistance } from "../common/common-functions.js";
import { Particle } from "./elements.js";

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

const canvas = document.getElementById("canvas");
canvas.height = canvasHeight;
canvas.width = canvasWidth;
const ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = "destination-over";


const shapeArr = [];
let lastIntervalTimestamp = 0;
let lastIntervalTimestamp1 = 0;

gameInit();
animationFunc();

// functions

function gameInit() {
    shapeArr.push(new Particle(ctx, canvas.width / 2, canvas.height / 2, 30))

}

function animationFunc(now) {
    // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 2000) {
        shapeArr.push(new Particle(ctx, Math.random() * canvas.width ,Math.random() * canvas.height, 30))
        lastIntervalTimestamp = now;
      }

      if (!lastIntervalTimestamp1 || now - lastIntervalTimestamp1 >= 2 * 12000) {
        if(lastIntervalTimestamp1){
            shapeArr.length = 0;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        }
        lastIntervalTimestamp1 = now;
      }

    shapeArr.forEach((shape, shapeIndex) => {
        shape.update()

        if(shape.size > canvas.height / 5){
            shapeArr.splice(shapeIndex, 1);
        }

        if(shape.size < 3){
            shapeArr.splice(shapeIndex, 1);
            shapeArr.push(new Particle(ctx, Math.random() * canvas.width ,Math.random() * canvas.height, 30))
        }
    });
    requestAnimationFrame(animationFunc);
}


