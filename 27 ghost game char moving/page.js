import { loadImage, fillRect, getNumFromRange } from "../common/common-functions.js";
import { Enemy } from "./elements.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const enemyArr = [];
let enemy1Img = null, enemy2Img = null, enemy3Img = null;
let frameCount = 0;

await Promise.resolve(loadImage("./images/enemy1.png"))
    .then(image => {
        enemy1Img = image;
    });

await Promise.resolve(loadImage("./images/enemy2.png"))
.then(image => {
    enemy2Img = image;
});

await Promise.resolve(loadImage("./images/enemy3.png"))
.then(image => {
    enemy3Img = image;
});


init();

// functions
function init() {
    for (let i = 0; i < 5; i++) {
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let dx = getNumFromRange(-5,5);
        let dy = getNumFromRange(-5,5);

        enemyArr.push(new Enemy(ctx, x, y, 293, 155, enemy1Img, 6, dx, dy, 1));
    }

    for (let i = 0; i < 5; i++) {
        let x = canvas.width / 2;
        let y = Math.random() * (canvas.height - 100) + 100;
        let dx = getNumFromRange(2,5);
        let dy = getNumFromRange(-5,5);

        enemyArr.push(new Enemy(ctx, x, y, 266, 188, enemy2Img, 6, dx, dy, 2));
    }

    for (let i = 0; i < 5; i++) {
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let dx = getNumFromRange(2,5);
        let dy = getNumFromRange(-5,5);

        enemyArr.push(new Enemy(ctx, x, y, 218, 177, enemy3Img, 6, dx, dy, 3));
    }

    animate();
}

function animate() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, "rgb(255,255,255)");

    for (let i = 0; i < enemyArr.length; i++) {
        enemyArr[i].update(frameCount);
    }

    frameCount += 1;
    requestAnimationFrame(animate)
}


//event


//export
export { canvas }