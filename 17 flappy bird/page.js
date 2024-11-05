import { getIntFromRange } from "../common/common-functions.js";
import { Bird, Particle, Obstacle, Score } from "./elements.js";


const gameStartPopup = document.querySelector("#gameStartPopup");
const gameStartButton = document.querySelector("#gameStartButton");
const gameRestartPopup = document.querySelector("#gameRestartPopup");
const gameRestartButton = document.querySelector("#gameRestartButton");
const gameScoreEle = document.querySelector("#gameScore");

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 600;

let background, backgroundImg, gameStarted, spacePressed, angle, hue, frame, score, scoreCount, gameSpeed, birdSize, bird, birdImg, particleColorCount, particleArr = [], obstacleColorCount, obstacleArr = [], lastIntervalTimestamp;

background = {
    x1 : 0,
}

await Promise.resolve(loadImage("./images/background.png"))
.then(image => {
    backgroundImg = image;
});

await Promise.resolve(loadImage("./images/bird-spritesheet.png"))
.then(image => {
    birdImg = image;
});



function gameInit() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameStarted = true;

    spacePressed = false;
    angle = 0;
    hue = 0;
    frame = 0;
    scoreCount = 0;
    score = new Score(ctx, canvas.width - 10, 25, "#fff", scoreCount);
    gameSpeed = 2;
    birdSize = 20;
    bird = new Bird(canvas, ctx, 150, canvas.height - 155, birdSize, birdSize, "red");

    particleColorCount = 0;
    particleArr = [];
    obstacleColorCount = 0;
    obstacleArr = [];
    lastIntervalTimestamp = 0;
    animationFunc();
}
function animationFunc(now) {
    if (gameStarted) {
        requestAnimationFrame(animationFunc);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 300) {
            lastIntervalTimestamp = now;
            addObstacle();
        }
        obstacleArr.forEach(obstacle => {
            obstacle.animate(gameSpeed)

            if (obstacle.x + obstacle.width < 0) {
                obstacleArr.pop();
                score.scoreCount += 1;
            }

            if (bird.x + bird.width > obstacle.x &&
                bird.x + bird.width < obstacle.x + obstacle.width) {

                if (bird.y < obstacle.top ||
                    bird.y + bird.height > obstacle.bottomY
                ) {

                    console.log(`bird.x (${bird.x}) + bird.width (${bird.width}) > obstacle.x (${obstacle.x})=>`, bird.x + bird.width > obstacle.x);
                    console.log(`bird.x (${bird.x}) + bird.width (${bird.width}) < obstacle.x (${obstacle.x}) + obstacle.width (${obstacle.width})=>`, bird.x + bird.width > obstacle.x);
                    console.log(`bird.y (${bird.y}) < obstacle.top (${obstacle.top})=>`, bird.y < obstacle.top);
                    console.log(`bird.y (${bird.y}) + bird.height (${bird.height}) > obstacle.bottomY (${obstacle.bottomY}) =>`, bird.y + bird.height > obstacle.bottomY);

                    gameStarted = false;

                    gameScoreEle.innerHTML = score.scoreCount;
                    gameRestartPopup.classList.add("show");
                }
            }


        });
        handleParticles();
        bird.animate(spacePressed);

        score.update();
    }


}

function handleParticles() {
    const size = Math.random() * 5 + 3;
    const x = bird.x;
    const y = bird.y + bird.height / 2;
    const speedY = Math.random() * 1 - 0.5;
    const color = `hsl(${Math.sin(particleColorCount) * 360},50%,50%)`;

    particleArr.unshift(new Particle(ctx, x, y, size, speedY, color));

    particleArr.forEach(particle => particle.animate(gameSpeed));

    if (particleArr.length > 200) {
        for (let i = 0; i < 20; i++) {
            particleArr.pop(particleArr[i])
        }
    }
    particleColorCount += 0.01;
}

function addObstacle() {
    const top = (Math.random() * canvas.height / 3) + 20;
    const bottom = (Math.random() * canvas.height / 3) + 20;
    const endY = canvas.height;
    const color = `hsl(${Math.sin(obstacleColorCount) * 360},50%,50%)`;
    const x = canvas.width;
    const width = 20;
    obstacleArr.unshift(new Obstacle(ctx, x, top, bottom, endY, color, width))

    obstacleColorCount += 0.1;
}

async function loadImage(src) {
    const img = new Image();
    img.src = src;
    await img.decode();
    return img;
};

gameStartButton.addEventListener('click', function(){
    gameStartPopup.classList.remove("show");
    gameInit();
})

gameRestartButton.addEventListener('click', function(){
    gameRestartPopup.classList.remove('show');  
    gameInit();
})

addEventListener('keydown', e => {
    if (e.code === "Space") spacePressed = true;
})

addEventListener('keyup', e => {
    if (e.code === "Space") spacePressed = false;
})