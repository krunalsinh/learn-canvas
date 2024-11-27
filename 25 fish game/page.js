import { addText, drawLine, getDistance } from "../common/common-functions.js";
import { Player, Enemy, Score } from "./elements.js";

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const mouse = {
    x : canvasWidth / 2,
    y : canvasHeight - 100,
    mouseDown: false
};

const mouseMove = {
    x : canvasWidth / 2,
    y : canvasHeight - 100,
    mouseDown: false
};


const player = new Player(ctx, canvasWidth / 2, canvasHeight - 100, 35, "red");
const enemyArr = [];
const score = new Score(ctx, 50, 50, 0);

canvas.width = canvasWidth;
canvas.height = canvasHeight;

init();
animationFunc();

// functions
function init() {
    for (let i = 0; i < 10; i++) {
        spawnEnemy();
    }

}

function spawnEnemy() {
    const size = Math.random() * 30 + 10;
    const x = Math.random() * ( canvasWidth - size * 2) + size * 2;
    const y = canvasHeight + size * 2 + Math.random() * 300;
    const speed = Math.random() * 2 + 0.3;
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`
    enemyArr.push(new Enemy(ctx, x, y, size, color, speed))
}

function animationFunc() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    player.update(mouse);

    enemyArr.forEach( (enemy,enemyIndex) => {
        enemy.update();

        if(enemy.y + enemy.size < 0 ){
            enemy.x = Math.random() * ( canvasWidth - enemy.size * 2) + enemy.size * 2;
            enemy.y = canvasHeight + enemy.size * 2 + Math.random() * 300;
        }

        const distance = getDistance(enemy.x, enemy.y, player.x, player.y);

        if(distance - enemy.size - player.size < 0){
            setTimeout(() => enemyArr.splice(enemyIndex, 1), 0);
            score.addScore();
            spawnEnemy();
        }

        
    })

    if(mouse.mouseDown) {
        drawLine(ctx, mouseMove.x, mouseMove.y, player.x, player.y, 2, "rgba(255,255,255,0.2)");
    }

    score.draw();
    
    requestAnimationFrame(animationFunc);
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

