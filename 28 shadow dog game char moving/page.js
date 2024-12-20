import { loadImage, fillRect, getNumFromRange } from "../common/common-functions.js";
import { Player } from "./elements.js";

const canvas = document.getElementById("canvas");
const movementActionSelect = document.getElementById("particleMovementAction");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

let player = null;
let player1Img = null;
let frameCount = 0;
let staggerFrame = 5;
let spriteWidth = 575, spriteHeight = 523;

const spriteAnimations = [];
const animationStates = [
    {
        name : "idle",
        frames: 7
    },
    {
        name : "jump",
        frames: 7
    }
];
animationStates.forEach((state,index) => {
    let frames = {
        loc : [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x : positionX, y : positionY})
    }
    spriteAnimations[state.name] = frames;
})



await Promise.resolve(loadImage("./images/shadow_dog.png"))
    .then(image => {
        player1Img = image;
    });

init();

// functions
function init() {
    player = new Player(ctx, player1Img);

    animate();
}

function animate() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, "rgb(255,255,255)");
    player.update(frameCount, staggerFrame);

    frameCount += 1;
    requestAnimationFrame(animate)
}

function setPlayerFrameCount(actionType) {
    switch (actionType) {
        case 0:
            player.frameY = 0;
            player.imgFrameCount = 7;
            break;
        case 1:
            player.frameY = 1;
            player.imgFrameCount = 7;
            break;
        case 2:
            player.frameY = 2;
            player.imgFrameCount = 7;
            break;
        case 3:
            player.frameY = 3;
            player.imgFrameCount = 9;
            break;
        case 4:
            player.frameY = 4;
            player.imgFrameCount = 11;
            break;
        case 5:
            player.frameY = 5;
            player.imgFrameCount = 5;
            break;
        case 6:
            player.frameY = 6;
            player.imgFrameCount = 7;
            break;
        case 7:
            player.frameY = 7;
            player.imgFrameCount = 7;
            break;
        case 8:
            player.frameY = 8;
            player.imgFrameCount = 12;
            break;
        case 9:
            player.frameY = 9;
            player.imgFrameCount = 4;
            break;
        default:
            player.frameY = 0;
            player.imgFrameCount = 7;
    }
}

//event
movementActionSelect.addEventListener('change', e => {
    setPlayerFrameCount(Number(movementActionSelect.value));
})

//export
export { canvas }