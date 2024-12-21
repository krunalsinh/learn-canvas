import { loadImage, fillRect, getNumFromRange } from "../common/common-functions.js";
import { Player } from "./elements.js";

const canvas = document.getElementById("canvas");
const movementActionSelect = document.getElementById("particleMovementAction");
const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);
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
    },
    {
        name : "fall",
        frames: 7
    },
    {
        name : "run",
        frames: 7
    },
    {
        name : "dizzy",
        frames: 7
    },
    {
        name : "sit",
        frames: 7
    },
    {
        name : "roll",
        frames: 7
    },
    {
        name : "bite",
        frames: 7
    },
    {
        name : "ko",
        frames: 7
    },
    {
        name : "getHit",
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

    const option = elNew("option", {
        value: state.name,
        innerHTML: state.name.toUpperCase()
    });

    movementActionSelect.append(option)
})
console.log(spriteAnimations);



await Promise.resolve(loadImage("./images/shadow_dog.png"))
    .then(image => {
        player1Img = image;
    });

init();

// functions
function init() {
    player = new Player(ctx, player1Img, animationStates[0].name);

    animate();
}

function animate() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, "#666");
    player.update(frameCount);

    frameCount += 1;
    requestAnimationFrame(animate)
}



//event
movementActionSelect.addEventListener('change', e => {
    console.log(movementActionSelect.value);
    
    player.action = movementActionSelect.value;
})

//export
export { canvas, spriteAnimations, staggerFrame}