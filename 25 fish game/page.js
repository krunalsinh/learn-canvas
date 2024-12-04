import { addText, drawLine, getDistance, loadImage, handleBoxCollision } from "../common/common-functions.js";
import { Player, Bubble, Score, Enemy } from "./elements.js";

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const mouse = {
    x : canvasWidth / 2,
    y : canvasHeight - 100,
    mouseDown: false
};
let angle = 0, swimLeftImg = null, swimRightImg = null, frameCounter = 0, swimRestLeftImg = null, swimRestRightImg = null, enemyImg = null;

const mouseMove = {
    x : canvasWidth / 2,
    y : canvasHeight - 100,
    mouseDown: false
};
const testX = 200,testY = 200;


const player = new Player(ctx, canvasWidth / 2, canvasHeight - 100, 35, "red");
const bubbleArr = [];
const score = new Score(ctx, 50, 50, 0);

const enemyArr = [], enemyImgWidth = 149, enemyImgHeight = 129, enemyWidth = enemyImgWidth / 2, enemyHeight = enemyImgHeight / 2;
let lastIntervalTimestamp = 0;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

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



init();
animationFunc();

// functions
function init() {

    for (let i = 0; i < 10; i++) {
        spawnBubble();
    }

    
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


function spawnBubble(now) {
    const size = Math.random() * 30 + 10;
    const x = Math.random() * ( canvasWidth - size * 2) + size * 2;
    const y = canvasHeight + size * 2 + Math.random() * 300;
    const speed = Math.random() * 2 + 0.3;
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`
    bubbleArr.push(new Bubble(ctx, x, y, size, color, speed))
}

function animationFunc(now) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 2000) {
        const direction = ["down", "left", "right", "up"][Math.floor(Math.random() * 4)];
        
        
        
        if(lastIntervalTimestamp){
            let newEnemyPos = getEnemyPos(direction);
            
            if(enemyArr.length < 10){
                enemyArr.push(new Enemy(ctx, newEnemyPos.x, newEnemyPos.y, "red", direction))
            }
        }
        lastIntervalTimestamp = now;
        
      }

    player.update(mouse, mouseMove, frameCounter);

    

    handleBubblesArr();

    handleDrawLine();

    handleEnemies();

    score.draw();

    frameCounter++;
    
    requestAnimationFrame(animationFunc);
}
function handleEnemies(){
    enemyArr.forEach((enemy,index) => {

        if(enemy.direction === "right" && enemy.x > canvas.width){
            let newEnemyPos = getEnemyPos(enemy.direction);
            enemy.x = newEnemyPos.x;
            enemy.y = newEnemyPos.y;
        }
        if(enemy.direction === "left" && enemy.x + enemy.width < 0){
            enemy.x = canvas.width;
        }
        if(enemy.direction === "down" && enemy.y > canvas.height){
            enemy.y =  0 - enemy.height;
        }
        if(enemy.direction === "up" && enemy.y + enemy.height < 0){
            enemy.y = canvas.height;
        }

        if(handleBoxCollision(player,enemy)){
            console.log("collide =>", index);


            
        }
        enemy.update(frameCounter)
    })
}

function handleDrawLine(){
    if(mouse.mouseDown) {
        drawLine(ctx, mouseMove.x, mouseMove.y, player.x, player.y, 2, "rgba(255,255,255,0.2)");
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

export { swimLeftImg , swimRightImg, swimRestLeftImg, swimRestRightImg, enemyImg}