import { loadImage, loadAudio, fillRect, addText } from "../common/common-functions.js";
import { Raven, Score, Explosion, Pointer} from "./elements.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = innerWidth;
collisionCanvas.height = innerHeight;

let lastTime = 0;
let ravenImg = null, boomImg = null, boomSound = null;
let ravens = [], timeToNextRaven = 0, timeToNextKingRaven = 0, ravenInterval = 500, ravenX = canvas.width, ravenSpriteWidth = 271, ravenSpriteHeight = 194;
let score = null;
let explosions = [];
let gameOver = false;
let pointer = null, mouse = {x : canvas.width / 2, y : canvas.height / 2};


await Promise.resolve(loadImage("./images/raven.png"))
.then(image => {
    ravenImg = image;
});

await Promise.resolve(loadImage("./images/boom.png"))
.then(image => {
    boomImg = image;
});

await Promise.resolve(loadAudio("./sounds/hit-sound.mp3"))
.then(sound => {
    boomSound = sound;
});



init();

// functions
function init() {
    score = new Score(ctx, 0, 50, 75);
    pointer = new Pointer(ctx, canvas.width / 2, canvas.height / 2);
    animate(0);
}

function animate(timestamp) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    collisionCtx.clearRect(0, 0, innerWidth, innerHeight);
  
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    timeToNextRaven += deltaTime;
    timeToNextKingRaven += deltaTime;

    if(timeToNextRaven > ravenInterval){
        handleAddRaven();
        
        timeToNextRaven = 0;

    }
    if(timeToNextKingRaven > ravenInterval * 10){
       
        handleAddRaven(true);
        timeToNextKingRaven = 0;

       
    }
    
    [...ravens, ...explosions].forEach(object => {
        object.update(deltaTime);

        if(object.x < 0 - object.width){
            gameOver = true
        }
    });
    ravens = ravens.filter(raven => !raven.markedForDeletion);
    explosions = explosions.filter(explosion => !explosion.markedForDeletion);

    score.draw();

    pointer.update(mouse);
    

    if(!gameOver){
        requestAnimationFrame(animate)
    }else{
        drawGameover();
    }
}

function handleAddRaven(kingRaven = false){
    let ravenDX = Math.random() * 5 + 3;
        let ravenDY = kingRaven ? Math.random() * 50 - 30: Math.random() * 5 - 2.5;
        let ravenY = Math.random() * (canvas.height - (ravenSpriteHeight / 2));
        
        ravens.push(new Raven(ctx, collisionCtx, ravenImg, ravenSpriteWidth, ravenSpriteHeight, ravenX, ravenY, ravenDX, ravenDY, kingRaven));

        ravens.sort((a,b) => {
            return a.width - b.width;
        })
}

function drawGameover() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    addText(ctx, canvas.width / 2, canvas.height / 2, "50", "Roboto", "#000", `Game Over, Your Score : ${score.score}`, "center");
    addText(ctx, canvas.width / 2 + 3, canvas.height / 2 + 3, "50", "Roboto", "#fff", `Game Over, Your Score : ${score.score}`, "center");
}

//event
addEventListener('click', e => {
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    const colorData = detectPixelColor.data;
    let isKingHilted = false;
    ravens.forEach(raven => {
        if(raven.randomColor[0] === colorData[0] && raven.randomColor[1] === colorData[1] && raven.randomColor[2] === colorData[2]){
            if(raven.ravenKing) isKingHilted = true;
            raven.markedForDeletion = true;
            score.increaseScore();
            explosions.push(new Explosion(ctx, boomImg, boomSound, 200, 179, raven.x, raven.y, raven.width, raven.height))
        }
    })
    if(isKingHilted){
        ravens.forEach(raven => {
            raven.markedForDeletion = true;
            score.increaseScore();
            explosions.push(new Explosion(ctx, boomImg, boomSound, 200, 179, raven.x, raven.y, raven.width, raven.height))
        })
    }
    isKingHilted = false;

})

addEventListener('mousemove', e => {
    if(!gameOver){
        mouse.x = e.x;
        mouse.y = e.y;
    }
})

//export
export { canvas}