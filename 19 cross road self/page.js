import { addText, loadImage } from "../common/common-functions.js";
import { Frog, Obstacle, Particle, Ripple } from "./elements.js";

const canvasWidth = 600;
const canvasHeight = 600;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

const keys = [], obstaclesArr = [], logsArr = [], particlesArr = [], rippleArr = [];
let backgroundImg, backgroundImgRoad, frog, cellSize, grassImg, safe, score = 0, carsImg, frogImg, gameSpeed = 1, collisionCount = 0;

await Promise.resolve(loadImage("./images/background.png"))
    .then(image => backgroundImg = image)

await Promise.resolve(loadImage("./images/background_lvl2.png"))
    .then(image => backgroundImgRoad = image)

await Promise.resolve(loadImage("./images/grass.png"))
    .then(image => grassImg = image)

await Promise.resolve(loadImage("./images/cars.png"))
    .then(image => carsImg = image)

await Promise.resolve(loadImage("./images/frog_spritesheet.png"))
    .then(image => frogImg = image)

gameInit();
addObstacles();
animationFunc();

// functions
function gameInit() {
    cellSize = 80;
    frog = new Frog(ctx, 250, 250);

}

function animationFunc() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //water
    ctx.drawImage(backgroundImg, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight)
    //ripple
    handleRipples();
    //road
    ctx.drawImage(backgroundImgRoad, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight)
    //logs & turtles
    handlesLogs()
    //frog
    frog.update(keys);
    //obstacle
    handleObstacles();
    //dust particles
    handleParticles();
    //grass
    ctx.drawImage(grassImg, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

    addText(ctx, 10, 50, "30px", "Open Sens", "#000", "Score : " + score);
    addText(ctx, 10, 80, "30px", "Open Sens", "#000", "Game Speed : " + gameSpeed);

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
            cellSize, -1.5,
            "log"));
    }

    //row 5
    for (let i = 0; i < 3; i++) {
        logsArr.push(new Obstacle(
            ctx,
            i * 250,
            canvasHeight - cellSize * 6 - 20,
            cellSize,
            cellSize, 1,
            "turtle"));
    }
}

function addParticles() {
    for (let i = 0; i < 20; i++) {
        const radius = Math.random() * 8 + 4;
        const speed = {
            x: Math.random() * 3 - 2,
            y: Math.random() * 3 - 2
        }
        if (frog.y > 250) {
            particlesArr.push(new Particle(ctx, frog.x + frog.width / 2, frog.y + frog.height / 2, radius, speed, "#a1a1a1"))
        } else if (frog.y > 80) {
            rippleArr.push(new Ripple(ctx, frog.x + frog.width / 2, frog.y + frog.height / 2, i * i * 0.1, "#fff"))
        }
    }
}

function handleRipples() {
    rippleArr.forEach((ripple, index) => {
        ripple.update();
        if (ripple.opacity < 0.1) {
            rippleArr.splice(index, 1);
        }
    })
}

function handlesLogs() {
    safe = false;
    logsArr.forEach(log => {
        log.update(gameSpeed);

        if (detectCollision(frog, log)) {
            frog.x += log.speed;
            safe = true;
        }
    })
    if (!safe && (frog.y < 250 && frog.y > 90)) {
        resetFrogPos();
    }
}

function handleObstacles() {
    obstaclesArr.forEach(obstacle => {
        obstacle.update(gameSpeed);

        if (detectCollision(frog, obstacle)) {
            resetFrogPos();
            collisionCount++;
        }
    });
}

function handleParticles() {
    particlesArr.forEach((particle, index) => {
        particle.update();
        if (particle.opacity < 0.1) {
            particlesArr.splice(index, 1);
        }
    })
}

function detectCollision(first, second) {
    return !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
    )
}

function scored() {
    score++;
    gameSpeed += 0.05;
    resetFrogPos();
}

function resetFrogPos() {
    frog.y = canvasHeight - 90;;
}
//events
addEventListener('keydown', e => {
    keys[e.keyCode] = true;

    if (keys[38] || keys[37] || keys[40] || keys[39]) {
        if (frog.moving === false) {
            addParticles();
        }
        frog.jump();
    }
})

addEventListener('keyup', e => {
    delete keys[e.keyCode];

    if (frog.y < 0) {
        scored();
    }
    frog.moving = false;
    frog.frameX = 0;
})

export { cellSize, canvasWidth, canvasHeight, carsImg, frogImg }


