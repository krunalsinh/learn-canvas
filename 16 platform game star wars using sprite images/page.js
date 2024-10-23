import { player as hero, enemy, ally } from "./elements.js";

const alliesCount = 17, alliesImgUrl = [], allyObjs = [], enemyCount = 17, enemyImgUrl = [], enemyObjs = [], allChars = [];

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
                moving: true,
                type: 'ally'
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
                x: canvas.width,
                y: 200 + (Math.random() * 100),
                width: 32,
                height: 48,
                frameX: 3,
                frameY: 1,
                speed: (Math.random() * 3) + 1,
                moving: true,
                type: 'enemy'
            });
        });
    })
    .catch(err => console.error(err));

// console.log(allyObjs);
// console.log(enemyObjs);

const keys = [];
let fpsInterval, startTime, now, then, elapsed;

await Promise.resolve(loadImage("./images/game-char.png"))
    .then(image => {
        allChars.push(
            new hero(
                ctx,
                image,
                200,
                200,
                40,
                72,
                3,
                0,
                9,
                false,
                'player'
            ));
    });

let background;
let lastIntervalTimestamp = 0;
await Promise.resolve(loadImage("./images/game-background.png"))
    .then(image => {
        background = image;
        startAnimation(24);
    });
let player;
function animationFunc(timestamp) {
    requestAnimationFrame(animationFunc);

    if (!lastIntervalTimestamp || timestamp - lastIntervalTimestamp >= 2 * 1500) {
        lastIntervalTimestamp = timestamp;
        const allyObj = allyObjs[Math.floor(Math.random() * (allyObjs.length - 1))];
        allChars.push(new ally(ctx, allyObj.image, allyObj.x, allyObj.y, allyObj.width, allyObj.height, allyObj.frameX, allyObj.frameY, allyObj.speed, allyObj.moving, allyObj.type));

        const enemyObj = enemyObjs[Math.floor(Math.random() * (enemyObjs.length - 1))];
        allChars.push(new enemy(ctx, enemyObj.image, enemyObj.x, enemyObj.y, enemyObj.width, enemyObj.height, enemyObj.frameX, enemyObj.frameY, enemyObj.speed, enemyObj.moving, enemyObj.type));

        // console.log(allChars);

    }

    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval)

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        allChars.sort((a, b) => a.y - b.y);
        for (let i = 0; i < allChars.length; i++) {

            if (allChars[i].y < 145 && allChars[i].type !== "player" && allChars[i].type !== "enemy") {
                allChars.splice(i, 1);
            }
        }

        for (let i = 0; i < allChars.length; i++) {

            if (allChars[i].x + allChars[i].width < 0 && allChars[i].type !== "player" && allChars[i].type !== "ally") {
                allChars.splice(i, 1);
            }
        }
        for (let i = 0; i < allChars.length - 1; i++) {
            for (let k = 0; k < allChars.length; k++) {
                if (allChars[i].type === "player" && allChars[k].type === "enemy") {
                    if (allChars[i]) {
                        allChars.splice(k, 1);
                    }
                }
            }
        }

        for (let i = 0; i < allChars.length - 1; i++) {
            for (let j = 0; j < allChars.length; j++) {
                if (allChars[i].type === "enemy" && allChars[j].type === "ally") {
                    if (allChars[j].x + allChars[j].width < allChars[i].x 
                        && allChars[j].y + allChars[j].height < allChars[i].y
                        && allChars[j].y > allChars[i].y) {
                        allChars.splice(j, 1);
                    }
                }
            }


            allChars[i].animate(keys);
        }



        // player = allChars.filter(char => char.type === 'player')


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
})

addEventListener('keyup', e => {
    delete keys[e.keyCode];
})