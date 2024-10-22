import { player as hero, enemy, ally } from "./elements.js";

const alliesCount = 17, alliesImgUrl = [], allyObjs = [], spawnedAllies = [], enemyCount = 17, enemyImgUrl = [], enemyObjs = [], spawnedEnemies = [];

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = 500;
canvas.width = 800;


for (let i = 1; i <= alliesCount; i++) {
    alliesImgUrl.push(`./images/ally/ally-${i}.png`);
}

for (let i = 1; i <= enemyCount; i++) {
    enemyImgUrl.push(`./images/enemy/enemy-${i}.png`);
}

await Promise.all(alliesImgUrl.map(loadImage))
    .then(images => {
        images.forEach((image, i) => {
            allyObjs.push({
                image: image,
                x: (Math.random() * 100) + 40,
                y: canvas.height - 72,
                width: 32,
                height: 48,
                frameX: 1,
                frameY: 3,
                speed: (Math.random() * 3) + 1,
                moving: true
            });
        });
        console.log("allies loaded");

    })
    .catch(err => console.error(err));

await Promise.all(enemyImgUrl.map(loadImage))
    .then(images => {
        images.forEach((image, i) => {
            enemyObjs.push({
                image: image,
                x: 200,
                y: 100,
                width: 40,
                height: 72,
                frameX: 3,
                frameY: 0,
                speed: 0.1,
                moving: false
            });
        });
    })
    .catch(err => console.error(err));

// console.log(allyObjs);
// console.log(enemyObjs);

const keys = [];
let fpsInterval, startTime, now, then, elapsed;

let player;
await Promise.resolve(loadImage("./images/game-char.png"))
    .then(image => {
        player = new hero(
            ctx,
            image,
            200,
            100,
            40,
            72,
            3,
            0,
            9,
            false
        );
    });

let background;
let lastIntervalTimestamp = 0;
await Promise.resolve(loadImage("./images/game-background.png"))
    .then(image => {
        background = image;
        startAnimation(24);
    });

function animationFunc(timestamp) {
    requestAnimationFrame(animationFunc);

    if (!lastIntervalTimestamp || timestamp - lastIntervalTimestamp >= 2 * 1500) {
        lastIntervalTimestamp = timestamp;
        const allyObj = allyObjs[Math.floor(Math.random() * (allyObjs.length - 1))];
        spawnedAllies.push(new ally(ctx, allyObj.image, allyObj.x, allyObj.y, allyObj.width, allyObj.height, allyObj.frameX, allyObj.frameY, allyObj.speed, allyObj.moving));
        // console.log(spawnedAllies);
        
      }

    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval)

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        player.animate(keys);

        spawnedAllies.sort((a, b) => a.y - b.y);
        
        spawnedAllies.forEach((ally, index) => {
            // console.log(ally.y);
            if(ally.y < 145){
                spawnedAllies.splice(index, 1);
                // console.log(spawnedAllies, index);
            }
            ally.animate()
        });
    }
}

function startAnimation(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animationFunc()
}

async function loadImage(src) {
    const img = new Image();
    img.src = src;
    await img.decode();
    return img;
};

addEventListener('keydown', e => {
    keys[e.keyCode] = true;
    player.moving = true;
})

addEventListener('keyup', e => {
    delete keys[e.keyCode];
    player.moving = false;
})