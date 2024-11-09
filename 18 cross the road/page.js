import { Frog, Obstacle } from "./elements.js";
import { loadImage } from "../common/common-functions.js"

const canvasWidth = 600;
const canvasHeight = 600;

const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext('2d');
canvas1.width = canvasWidth;
canvas1.height = canvasHeight;

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext('2d');
canvas2.width = canvasWidth;
canvas2.height = canvasHeight;

const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext('2d');
canvas3.width = canvasWidth;
canvas3.height = canvasHeight;

const canvas4 = document.getElementById("canvas4");
const ctx4 = canvas4.getContext('2d');
canvas4.width = canvasWidth;
canvas4.height = canvasHeight;

const canvas5 = document.getElementById("canvas5");
const ctx5 = canvas5.getContext('2d');
canvas5.width = canvasWidth;
canvas5.height = canvasHeight;

// global variables

const grid = 80, particleArr = [], maxParticles = 300, ripplesArr = [], carsArr = [], logsArr = [];
let keys, score, collisionsCount, frame, gameSpeed, frog, background_lvl2, grass;

await Promise.resolve(loadImage("./images/background_lvl2.png"))
.then(image => {
    background_lvl2 = image;
});

await Promise.resolve(loadImage("./images/grass.png"))
.then(image => {
    grass = image;
});

gameInit();


// functions
function gameInit() {
    keys = [], score = 0, collisionsCount = 0, frame = 0, gameSpeed = 1;
    frog = new Frog(ctx3, 250, 250);
    addObstacles()
    animationFunc();
}

function animationFunc(now) {
    ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx3.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx1.drawImage(background_lvl2, 0, 0, canvasWidth, canvasHeight )
    carsArr.forEach(car => car.update(gameSpeed));
    logsArr.forEach(log => log.update(gameSpeed));
    frog.update();
    ctx4.drawImage(grass, 0, 0, canvasWidth, canvasHeight )

    requestAnimationFrame(animationFunc);
}

function scored() {
    console.log("scored");
    score++;
    gameSpeed += 0.05;

    frog.x = canvasWidth / 2 - frog.width / 2;
    frog.y = canvasHeight - frog.height - 40;

}

function addObstacles() {
    //lane 1
    for (let i = 0; i < 2; i++) {
        let x = i * 350;
        let y = canvasHeight - grid * 2 - 20;
        carsArr.push(new Obstacle(ctx2, x, y, grid * 2, grid, 1, 'car' ));
    }
    //lane 2
    for (let i = 0; i < 2; i++) {
        let x = i * 300;
        let y = canvasHeight - grid * 3 - 20;
        carsArr.push(new Obstacle(ctx2, x, y, grid * 2, grid, -2, 'car' ));
    }
    //lane 3
    for (let i = 0; i < 2; i++) {
        let x = i * 400;
        let y = canvasHeight - grid * 4 - 20;
        carsArr.push(new Obstacle(ctx2, x, y, grid * 2, grid, 2, 'car' ));
    }
    //lane 4
    for (let i = 0; i < 2; i++) {
        let x = i * 400;
        let y = canvasHeight - grid * 5 - 20;
        logsArr.push(new Obstacle(ctx2, x, y, grid * 2, grid, -2, 'log' ));
    }
    //lane 4
    for (let i = 0; i < 2; i++) {
        let x = i * 200;
        let y = canvasHeight - grid * 6 - 20;
        logsArr.push(new Obstacle(ctx2, x, y, grid, grid, 1, 'turtle' ));
    }
}

//events
addEventListener('keydown', function (e) {
    keys = [];
    keys[e.keyCode] = true;
    if (keys[37] || keys[38] || keys[39] || keys[40]) {
        frog.jump();
    }
})
addEventListener('keyup', function (e) {
    delete keys[e.keyCode];
    frog.moving = false;
})

export { canvasWidth, canvasHeight, keys, grid, scored }