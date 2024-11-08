import { Frog } from "./elements.js";

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
let keys, score, collisionsCount, frame, gameSpeed, frog;


gameInit();


// functions
function gameInit() {
    keys = [], score = 0, collisionsCount = 0, frame = 0, gameSpeed = 1;
    frog = new Frog(ctx3, 250, 250);
    
    animationFunc();
}

function animationFunc(now) {
    ctx3.clearRect(0, 0, canvasWidth, canvasHeight);
    frog.update();
    requestAnimationFrame(animationFunc);
}

function scored(){
    console.log("scored");
    score++;
    gameSpeed += 0.05;

    frog.x = canvasWidth/2 - frog.width/2;
    frog.y = canvasHeight - frog.height - 40;
    
}

//events
addEventListener('keydown', function(e){
    keys = [];
    keys[e.keyCode] = true;
    if(keys[37] || keys[38] || keys[39] || keys[40]){
        frog.jump();
    }
})
addEventListener('keyup', function(e){
    delete keys[e.keyCode] ;
    frog.moving = false;
})

export {canvasWidth, canvasHeight, keys, grid, scored}