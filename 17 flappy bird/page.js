import { drawSprite } from "../common/common-functions.js";
import { Bird, Particle, Obstacle, Score, Power } from "./elements.js";


const gameStartPopup = document.querySelector("#gameStartPopup");
const gameStartButton = document.querySelector("#gameStartButton");
const gameRestartPopup = document.querySelector("#gameRestartPopup");
const gameRestartButton = document.querySelector("#gameRestartButton");
const gameScoreEle = document.querySelector("#gameScore");

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

let animationFrame, background, backgroundImg, gameStarted, spacePressed, gradientLength, gradientAngle, hue, frame, score, scoreCount, gameSpeed, birdSize, bird, birdImg, particleColorCount, particleArr = [],  obstacleArr = [], lastIntervalTimestamp, lastIntervalTimestamp1, powerEleArr, frameCount, powerActive, powerTime, rocketImg;

await Promise.resolve(loadImage("./images/background.png"))
    .then(image => {
        backgroundImg = image;
    });

await Promise.resolve(loadImage("./images/bird-spritesheet.png"))
    .then(image => {
        birdImg = image;
    });

await Promise.resolve(loadImage("./images/rocket.png"))
    .then(image => {
        rocketImg = image;
    });

function gameInit() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background = {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height
    }
    gameStarted = true;

    spacePressed = false;
    hue = 0;
    frame = 0;
    scoreCount = 0;
    score = new Score(ctx, canvas.width - 10, 25, "#fff", scoreCount);
    gameSpeed = 2;
    birdSize = {
        height: 24,
        width: 34
    };
    bird = new Bird(canvas, ctx, 150, canvas.height - 155, birdSize.height, birdSize.width, "red", birdImg);

    particleColorCount = 0;
    particleArr = [];
    
    obstacleArr = [];
    lastIntervalTimestamp = 0;
    lastIntervalTimestamp1 = 0;
    powerEleArr = [];
    frameCount = 0;
    powerActive = false;
    powerTime = 3000;
    
    gradientLength = 50, 
    gradientAngle = 90;
   
    animationFunc();
}

function animationFunc(now) {
    if (gameStarted) {
        animationFrame = requestAnimationFrame(animationFunc);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 800) {
            lastIntervalTimestamp = now;
            if (frameCount > 50) {
                addObstacle();
            }
        }

        if (!lastIntervalTimestamp1 || now - lastIntervalTimestamp1 >= 2 * (powerTime * 3)) {
            lastIntervalTimestamp1 = now;
            if (frameCount > 250) {
                powerEleArr.push(new Power(ctx, canvas.width, canvas.height / 3, 30, 48, 'red', rocketImg));
            }

        }

        handleBackground();

        obstacleArr.forEach(obstacle => {
            obstacle.animate(gameSpeed);

            if (obstacle.x + obstacle.width < 0) {
                obstacleArr.pop();
                score.scoreCount += 1;
            }

            if (bird.x + bird.width > obstacle.x &&
                bird.x + bird.width < obstacle.x + obstacle.width ||
                bird.x > obstacle.x && 
                bird.x < obstacle.x + obstacle.width) {


                if (bird.y < obstacle.top ||
                    bird.y + bird.height > obstacle.endY - obstacle.bottom
                ) {

                    console.log(`bird.x (${bird.x}) + bird.width (${bird.width}) > obstacle.x (${obstacle.x})=>`, bird.x + bird.width > obstacle.x);
                    console.log(`bird.x (${bird.x}) + bird.width (${bird.width}) < obstacle.x (${obstacle.x}) + obstacle.width (${obstacle.width})=>`, bird.x + bird.width > obstacle.x);
                    console.log(`bird.y (${bird.y}) < obstacle.top (${obstacle.top})=>`, bird.y < obstacle.top);
                    console.log(`bird.y (${bird.y}) + bird.height (${bird.height}) > obstacle.endY - obstacle.bottom (${obstacle.endY - obstacle.bottom}) =>`, bird.y + bird.height > obstacle.endY - obstacle.bottom);

                    cancelAnimationFrame(animationFrame)
                    gameStarted = false;

                    gameScoreEle.innerHTML = score.scoreCount;
                    gameRestartPopup.classList.add("show");
                }
            }
            if (powerActive) {
                // obstacle.top = Math.min(obstacle.top - 0.02, 20);
                // obstacle.bottom = Math.min(obstacle.bottom - 0.02, 20);

                obstacle.top -= 2;
                obstacle.top = Math.max(obstacle.top , 20);
                obstacle.bottom -= 2;
                obstacle.bottom = Math.max(obstacle.bottom, 20);;
                // obstacle.bottom = Math.min(obstacle.bottom - 0.02, 20);
            }


        });

        powerEleArr.forEach((e, index) => {
            const condition1 = bird.x + bird.width > e.x
                && bird.x + bird.width < e.x + e.width
                && bird.y + bird.height > e.y
                && bird.y + bird.height < e.y + e.height;

            const condition2 = e.x + e.width > bird.x
                && e.x + e.width < bird.x + bird.width
                && e.y + e.height > bird.y
                && e.y + e.height < bird.y + bird.height;

            if (condition1 || condition2) {
                powerEleArr.splice(index, 1);
                powerActive = true;
                setTimeout(() => {
                    powerActive = false;
                    gameSpeed = 2;
                }, powerTime)
            }
            e.update(gameSpeed)

            if (e.x + e.width < 0) {
                powerEleArr.splice(index, 1);
            }
        });

        if (powerActive) {
            gameSpeed = Math.min(gameSpeed + 0.2, 5);
        }

        handleParticles();

        bird.animate(spacePressed);

        score.update();
    }

    frameCount++;
    // console.log(frameCount);


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
    let top = (Math.random() * canvas.height / 2.1) + 20;
    let bottom = (Math.random() * canvas.height / 2.1) + 20;

    console.log(`top ${top} ,, and bottom ${canvas.height - bottom}`);
    console.log("diff top and bottom :", (canvas.height - bottom) - top);
    
    if((canvas.height - bottom) - top < bird.height * 4.5){
        bottom = bottom - (bird.height * 4.5 - ((canvas.height - bottom) - top) );
    }
    const endY = canvas.height;
    const x = canvas.width;
    const width = 40;
    obstacleArr.unshift(new Obstacle(ctx, x, top, bottom, endY, "red", width))

    
}

async function loadImage(src) {
    const img = new Image();
    img.src = src;
    await img.decode();
    return img;
};

function handleBackground() {
    // if(background.x1 <= -background.width + gameSpeed) background.x1 = background.width  ;
    // else background.x1 -= gameSpeed;

    // if(background.x2 <= -background.width + gameSpeed) background.x2 = background.width ;
    // else background.x2 -= gameSpeed;

    // ctx.drawImage(backgroundImg, background.x1, background.y, background.width, background.height);
    // ctx.drawImage(backgroundImg, background.x2 - 200, background.y, background.width + 200, background.height);
    if (background.x <= -background.width) {
        background.x = 0
    }
    background.x -= gameSpeed;
    ctx.drawImage(backgroundImg, background.x, background.y, background.width, background.height);

    ctx.drawImage(backgroundImg, background.x + background.width, background.y, background.width, background.height);
 

}

gameStartButton.addEventListener('click', function () {
    gameStartPopup.classList.remove("show");
    gameInit();
})

gameRestartButton.addEventListener('click', function () {
    gameRestartPopup.classList.remove('show');
    gameInit();
})

addEventListener('keydown', e => {
    if (e.code === "Space") spacePressed = true;
})

addEventListener('keyup', e => {
    if (e.code === "Space") {
        spacePressed = false;
        bird.frameX = 0;
    }
})