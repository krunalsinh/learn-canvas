import { addText, drawLine, getDistance, loadImage, handleBoxCollision } from "../common/common-functions.js";
import { Player, Bubble, Score, Enemy } from "./elements.js";

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let swimLeftImg = null, swimRightImg = null, swimRestLeftImg = null, swimRestRightImg = null, enemyImg = null, animationFrame;
await Promise.resolve(loadImage("./images/swim_to_left_sheet.png"))
.then(image => swimLeftImg = image)

await Promise.resolve(loadImage("./images/swim_to_right_sheet.png"))
.then(image => swimRightImg = image)

await Promise.resolve(loadImage("./images/rest_to_left_sheet.png"))
.then(image => swimRestLeftImg = image)

await Promise.resolve(loadImage("./images/rest_to_right_sheet.png"))
.then(image => swimRestRightImg = image)

await Promise.resolve(loadImage("./images/enemy.png"))
.then(image => enemyImg = image)



const gameStartPopup = document.querySelector("#gameStartPopup");
const gameStartButton = document.querySelector("#gameStartButton");
const gameRestartPopup = document.querySelector("#gameRestartPopup");
const gameRestartButton = document.querySelector("#gameRestartButton");
const gameScoreEle = document.querySelector("#gameScore");
const player = new Player(ctx, canvasWidth / 2, canvasHeight - 100, 35, "red");
const score = new Score(ctx, 50, 50, 0);
const enemyImgWidth = 149, enemyImgHeight = 129, enemyWidth = enemyImgWidth / 2, enemyHeight = enemyImgHeight / 2;

let mouse = {
    x : canvasWidth / 2,
    y : canvasHeight - 100,
    mouseDown: false
};
let mouseMove = {
    x : canvasWidth / 2,
    y : canvasHeight - 100,
    mouseDown: false
};

let frameCounter = 0, gameStarted = false;

let bubbleArr = [], enemyArr = [];

let lastIntervalTimestamp = 0;

canvas.width = canvasWidth;
canvas.height = canvasHeight;





// functions
function gameInit() {
    mouse = {
        x : canvasWidth / 2,
        y : canvasHeight - 100,
        mouseDown: false
    };
    mouseMove = {
        x : canvasWidth / 2,
        y : canvasHeight - 100,
        mouseDown: false
    };
    frameCounter = 0;
    player.x = canvasWidth / 2;
    player.y = canvasHeight - 100;
    score.score = 0;
    bubbleArr = [];
    enemyArr = [];
    gameStarted = true;

    for (let i = 0; i < 10; i++) {
        spawnBubble();
    }

    animationFunc();
}

function getEnemyPos(direction){
    let enemyX = 0, enemyY = 0;
    if(direction === "down"){
        enemyX = Math.random() * (canvas.width - enemyWidth) + enemyWidth;
        enemyY = Math.random() * -400 - (enemyHeight * 2);   
        console.log(direction, ", x = ",enemyX,", y = ",enemyY);
    }else if(direction === "left"){
        enemyY = Math.random() * (canvas.height - (enemyHeight * 2)) + (enemyHeight * 2);
        enemyX = Math.random() * (canvas.width + 400) + canvas.width;   
        console.log(direction, ", x = ",enemyX,", y = ",enemyY);
    }else if(direction === "right"){
        enemyY = Math.random() * (canvas.height - (enemyHeight * 2)) + (enemyHeight * 2);
        enemyX = Math.random() * -400 - enemyWidth;    
        console.log(direction, ", x = ",enemyX,", y = ",enemyY); 
    }else if(direction === "up"){
        enemyX = Math.random() * (canvas.width - enemyWidth) + enemyWidth;
        enemyY = Math.random() * (canvas.height + 400) + canvas.height;
        console.log(direction, ", x = ",enemyX,", y = ",enemyY);
    }
    return {x : enemyX, y : enemyY};
}


function spawnBubble() {
    const size = Math.random() * 30 + 10;
    const x = Math.random() * ( canvasWidth - size * 2) + size * 2;
    const y = canvasHeight + size * 2 + Math.random() * 300;
    const speed = Math.random() * 2 + 0.3;
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`
    bubbleArr.push(new Bubble(ctx, x, y, size, color, speed))
}

function spawnEnemy(){
    const direction = ["down", "left", "right", "up"][Math.floor(Math.random() * 4)];
    let newEnemyPos = getEnemyPos(direction);
    let enemySpeed = Math.random() * 3 + 0.5;
    enemyArr.push(new Enemy(ctx, newEnemyPos.x, newEnemyPos.y, "red", direction, enemySpeed))
}

function animationFunc(now) {
    if(gameStarted){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        // spawn new enemy
        if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 2000) {
            if(lastIntervalTimestamp){
                if(enemyArr.length < 6){
                    spawnEnemy();
                }
            }
            lastIntervalTimestamp = now;
          }
        // draw player
        player.update(mouse, mouseMove, frameCounter);
    
        //bubbles
        handleBubblesArr();
        //aim line
        handleDrawLine();
        //enemies
        handleEnemies();
        //score
        score.draw();
        //other
        frameCounter++;
    
        animationFrame = requestAnimationFrame(animationFunc);
    }
}
function handleEnemies(){
    enemyArr.forEach((enemy,index) => {

        if(enemy.direction === "right" && enemy.x > canvas.width + canvas.width / 2){
            let newEnemyPos = getEnemyPos(enemy.direction);
            enemy.x = newEnemyPos.x;
            enemy.y = newEnemyPos.y;
        }
        if(enemy.direction === "left" && enemy.x + enemy.width < 0 - canvas.width / 2){
            let newEnemyPos = getEnemyPos(enemy.direction);
            enemy.x = newEnemyPos.x;
            enemy.y = newEnemyPos.y;
        }
        if(enemy.direction === "down" && enemy.y > canvas.height + canvas.height / 2){
            let newEnemyPos = getEnemyPos(enemy.direction);
            enemy.x = newEnemyPos.x;
            enemy.y = newEnemyPos.y;
        }
        if(enemy.direction === "up" && enemy.y + enemy.height < 0 - + canvas.height / 2){
            let newEnemyPos = getEnemyPos(enemy.direction);
            enemy.x = newEnemyPos.x;
            enemy.y = newEnemyPos.y;
        }

        if(handleBoxCollision(player,enemy)){
            console.log("collide =>", index);
            handleGameOver();
        }
        enemy.update(frameCounter)
    })
}
function handleGameOver(){
    bubbleArr = []; 
    enemyArr = [];
    gameStarted = false;
    cancelAnimationFrame(animationFrame);
    setTimeout(() => ctx.clearRect(0, 0, canvasWidth, canvasHeight), 0);
    gameScoreEle.innerHTML = score.score;
    gameRestartPopup.classList.add("show");
}
function handleDrawLine(){
    if(mouse.mouseDown) {
        ctx.save();
        ctx.setLineDash([5, 3])
        drawLine(ctx, mouseMove.x, mouseMove.y, player.x, player.y, 2, "rgba(255,255,255,0.2)");
        ctx.restore();
    }
}

function handleBubblesArr(){
    bubbleArr.forEach( (bubble,bubbleIndex) => {
        bubble.update();

        if(bubble.y + bubble.size < 0 ){
            bubble.x = Math.random() * ( canvasWidth - bubble.size * 2) + bubble.size * 2;
            bubble.y = canvasHeight + bubble.size * 2 + Math.random() * 300;
        }

        const distance = getDistance(bubble.x, bubble.y, player.x, player.y);

        if(distance - bubble.size - player.size < 0){
            setTimeout(() => bubbleArr.splice(bubbleIndex, 1), 0);
            score.addScore();
            spawnBubble();
        }
    })
}

//event
addEventListener("mousedown", e => {
    mouse.mouseDown = true;
})

addEventListener("mouseup", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.mouseDown = false;
})

addEventListener("mousemove", e => {
    mouseMove.x = e.clientX;
    mouseMove.y = e.clientY;
})

addEventListener("touchstart", (e) => {
    mouse.mouseDown = true;
});
  
addEventListener("touchmove", (e) => {
    mouseMove.x = e.touches[0].pageX;
    mouseMove.y = e.touches[0].pageY;
});
  
addEventListener("touchend", (e) => {
    mouse.x = e.touches[0].pageX;
    mouse.y = e.touches[0].pageY;
    mouse.mouseDown = false;
});

addEventListener("resize", (e) => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

gameStartButton.addEventListener('click', function () {
    gameStartPopup.classList.remove("show");
    gameInit();
})

gameRestartButton.addEventListener('click', function () {
    gameRestartPopup.classList.remove('show');
    gameInit();
})

export { swimLeftImg , swimRightImg, swimRestLeftImg, swimRestRightImg, enemyImg}