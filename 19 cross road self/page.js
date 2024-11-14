import { loadImage } from "../common/common-functions.js";
import { Frog, Obstacle } from "./elements.js";

const canvasWidth = 600;
const canvasHeight = 600;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const keys = [], obstaclesArr = [], logsArr = [];
let backgroundImg, backgroundImgRoad, frog, cellSize, grassImg;

await Promise.resolve(loadImage("./images/background.png"))
    .then(image => backgroundImg = image)

await Promise.resolve(loadImage("./images/background_lvl2.png"))
    .then(image => backgroundImgRoad = image)

await Promise.resolve(loadImage("./images/grass.png"))
    .then(image => grassImg = image)

gameInit();
addObstacles();
animationFunc();

// functions
function gameInit() {
    cellSize = 80;
    frog = new Frog(ctx, 250, 250);

}

function animationFunc(now) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //water
    //road
    //frog
    //obstacle
    ctx.drawImage(backgroundImg, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight)
    ctx.drawImage(backgroundImgRoad, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight)
    logsArr.forEach(log => log.update())
    frog.update(keys);
    obstaclesArr.forEach(obstacle => obstacle.update());
    ctx.drawImage(grassImg, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight)

    requestAnimationFrame(animationFunc);


}

function addObstacles() {
    //row 1
    for (let i = 0; i < 2; i++) {
        obstaclesArr.push(new Obstacle(
            ctx,
            i * 350,
            canvasHeight - cellSize * 2 - 20,
            cellSize * 2,
            cellSize, 1));
    }

    //row 2
    for (let i = 0; i < 2; i++) {
        obstaclesArr.push(new Obstacle(
            ctx,
            i * 350,
            canvasHeight - cellSize * 3 - 20,
            cellSize * 2,
            cellSize, -2));
    }

    //row 3
    for (let i = 0; i < 2; i++) {
        obstaclesArr.push(new Obstacle(
            ctx,
            i * 350,
            canvasHeight - cellSize * 4 - 20,
            cellSize * 2,
            cellSize, 2));
    }

    //row 4
    for (let i = 0; i < 2; i++) {
        logsArr.push(new Obstacle(
            ctx,
            i * 400,
            canvasHeight - cellSize * 5 - 20,
            cellSize * 2,
            cellSize, -1.5));
    }

    //row 5
    for (let i = 0; i < 3; i++) {
        logsArr.push(new Obstacle(
            ctx,
            i * 250,
            canvasHeight - cellSize * 6 - 20,
            cellSize,
            cellSize, 1));
    }
    
}

//events
addEventListener('keydown', e => {
    keys[e.keyCode] = true;
    frog.moving = false;

    // if(frog.moving === false && frog.y )
})

addEventListener('keyup', e => {
    delete keys[e.keyCode];
})

export { cellSize, canvasWidth, canvasHeight }


