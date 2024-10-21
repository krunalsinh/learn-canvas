const alliesCount = 19, alliesImgUrl = [], allyObjs = [], enemyCount = 17, enemyImgUrl = [], enemyObjs = [];

for (let i = 1; i <= alliesCount; i++) {
    alliesImgUrl.push(`./images/ally/ally-${i}.png`);
}

for (let i = 1; i <= enemyCount; i++) {
    enemyImgUrl.push(`./images/enemy/enemy-${i}.png`);
}

const loadImage = async src => {
    const img = new Image();
    img.src = src;
    await img.decode();
    return img;
};

await Promise.all(alliesImgUrl.map(loadImage))
    .then(images => {
        images.forEach((image, i) => {
            allyObjs.push({
                image: image,
                x: 200,
                y: 100,
                width: 40,
                height: 72,
                frameX: 3,
                frameY: 0,
                speed: 9,
                moving: false
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
                speed: 9,
                moving: false
            });
        });
        console.log("enemies loaded");
    })
    .catch(err => console.error(err));

// console.log(allyObjs);
// console.log(enemyObjs);

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = 500;
canvas.width = 800;

const keys = [];
const player = {
    x: 200,
    y: 100,
    width: 40,
    height: 72,
    frameX: 3,
    frameY: 0,
    speed: 9,
    moving: false
};

const ally1 = {

}

const playerSprite = new Image();
playerSprite.src = "./images/game-char.png";

const background = new Image();
background.src = "./images/game-background.png";

let fps, fpsInterval, startTime, now, then, elapsed;

startAnimation(24);
function animationFunc() {
    requestAnimationFrame(animationFunc);

    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval)

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(
            playerSprite,
            player.width * player.frameX,
            player.height * player.frameY,
            player.width,
            player.height,
            player.x,
            player.y,
            player.width,
            player.height)
        movePlayer();
        handlePlayerFrame();
    }
}

function startAnimation(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animationFunc()
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function movePlayer() {
    if (keys[38] && player.y > 100) {
        player.y -= player.speed;
        player.frameY = 3;
    }
    if (keys[40] && player.y < canvas.height - player.height) {
        player.y += player.speed;
        player.frameY = 0;
    }
    if (keys[37] && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1
    }
    if (keys[39] && player.x < canvas.width - player.width) {
        player.x += player.speed;
        player.frameY = 2
    }
}

function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0
}

addEventListener('keydown', e => {
    keys[e.keyCode] = true;
    player.moving = true;
})

addEventListener('keyup', e => {
    delete keys[e.keyCode];
    player.moving = false;
})