import { Frog, Obstacle, Particle } from "./elements.js";
import { loadImage, drawRectangle, drawStar } from "../common/common-functions.js"

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

const grid = 80, maxParticles = 300, particleArr = [], ripplesArr = [], carsArr = [], logsArr = [];
let keys, score, collisionsCount, frame, gameSpeed, frog, background_lvl2, grass, turtles, cars, numOfCars, log, safe, frogImg;

await Promise.resolve(loadImage("./images/background_lvl2.png"))
.then(image => {
    background_lvl2 = image;
});

await Promise.resolve(loadImage("./images/grass.png"))
.then(image => {
    grass = image;
});

await Promise.resolve(loadImage("./images/turtles.png"))
.then(image => {
    turtles = image;
});

await Promise.resolve(loadImage("./images/log.png"))
.then(image => {
    log = image;
});

await Promise.resolve(loadImage("./images/cars.png"))
.then(image => {
    cars = image;
});

await Promise.resolve(loadImage("./images/frog_spritesheet.png"))
.then(image => {
    frogImg = image;
});

gameInit();
addObstacles()
animationFunc();

// functions
function gameInit() {
    keys = []; score = 0; collisionsCount = 0; frame = 0; gameSpeed = 1; numOfCars = 3; safe = false;
    frog = new Frog(ctx2, 250, 250);
}

function animationFunc(now) {
    ctx1.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx2.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx3.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx4.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx5.clearRect(0, 0, canvasWidth, canvasHeight);

    handleRipple();
    ctx5.drawImage(background_lvl2, 0, 0, canvasWidth, canvasHeight )
    frog.update();
    handleObstacles();
    handleParticles();
    handleScoreBoard();
    ctx1.drawImage(grass, 0, 0, canvasWidth, canvasHeight )
    frame++;
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
        logsArr.push(new Obstacle(ctx4, x, y, grid * 2, grid, -2, 'log' ));
    }
    //lane 4
    for (let i = 0; i < 3; i++) {
        let x = i * 200;
        let y = canvasHeight - grid * 6 - 20;
        logsArr.push(new Obstacle(ctx4, x, y, grid, grid, 1, 'turtle' ));
    }
}

function handleObstacles() {
    
    carsArr.forEach(car => {
        car.update(gameSpeed)
        
        // collision with car
        if(handleCollision(frog, car)){
            drawStar(ctx1, frog.x - frog.width / 2 , frog.y - frog.width / 2, frog.width,"red");
            resetGame();
        }
    });
    
    logsArr.forEach(log => {
        log.update(gameSpeed, frame);
    });
    
    if(frog.y < 250 && frog.y > 100){
        
        safe = false;
        logsArr.forEach(log => {
            if(handleCollision(frog, log)){
                frog.x += log.speed;
                safe = true;
            }
        })
        if(!safe){
            for (let i = 0; i < 20; i++) {
                ripplesArr.unshift(new Particle(ctx4, frog.x + frog.width / 2, frog.y + frog.height / 2, 'ripple'))
            }
            resetGame()
        }
    }
}

function handleParticles(){
    
    for (let i = 0; i < particleArr.length; i++) {
        particleArr[i].update();
        
    }
    if(particleArr.length > maxParticles){
        for (let i = 0; i < 30; i++) {
            particleArr.pop();
        }
    }
    if( (keys[37] || keys[38] || keys[39] || keys[40]) && frog.y > 250 && particleArr.length < maxParticles + 10){
        for (let i = 0; i < 10; i++) {
            particleArr.unshift(new Particle(ctx3, frog.x + frog.width / 2, frog.y + frog.height / 2, 'particle'))
            
        }
    }
    
}

function handleRipple() {
    for (let i = 0; i < ripplesArr.length; i++) {
        ripplesArr[i].update();
    }

    if(ripplesArr.length > 20){
        for (let i = 0; i < 5; i++) {
            ripplesArr.pop();
        }
    }

    if( (keys[37] || keys[38] || keys[39] || keys[40]) && frog.y < 250 && frog.y > 100 ){
        for (let i = 0; i < 20; i++) {
            ripplesArr.unshift(new Particle(ctx4, frog.x + frog.width / 2, frog.y + frog.height / 2, 'ripple'))
        }
    }
}

function handleScoreBoard(){
    ctx1.fillStyle = "black";
    ctx1.strokeStyle = "black";
    ctx1.font = "15px Verdana";
    ctx1.strokeText("Score", 265, 15);
    ctx1.font = "60px Verdana";
    ctx1.fillText(score, 270, 65);

    ctx1.font = "15px Verdana";
    ctx1.strokeText("Collision: " + collisionsCount, 10, 175);

    ctx1.font = "15px Verdana";
    ctx1.strokeText("Game Speed: " + gameSpeed, 10, 199);
}

function handleCollision(first, second){
    return !(first.x > second.x + second.width ||
             first.x + first.width < second.x ||
             first.y > second.y + second.height ||
             first.y + first.height < second.y);
}

function resetGame() {
    frog.x = canvasWidth / 2 - (frog.width / 2);
    frog.y = canvasHeight - frog.height - 40;;
    score = 0;
    collisionsCount++;
    gameSpeed = 1;
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
    frog.frameX = 0;
})

export { canvasWidth, canvasHeight, keys, grid, scored, turtles, cars, numOfCars, log, frogImg }