import { fillRect, getDistance, moveTo, addText } from '../common/common-functions.js';
import { circle, score, player as hero, enemy as villain, life, particle, dispEle } from "./elements.js";

const gameStartBtn = document.querySelector("#gameStartBtn");
const gameStartPopup = document.querySelector("#gameStartPopup");
const gameRestartBtn = document.querySelector("#gameRestartBtn");
const gameEndPopup = document.querySelector("#gameEndPopup");
const textAnimation = document.querySelector("#textAnimation");
const bestScoreEle = document.querySelector("#bestScore");
const gameMusic = document.querySelector("#gameAudio");
const gameMusicPlayPauseBtn = document.querySelector("#gameMusicPlayPauseBtn");

let gameStarted = false;

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

let minV;

let centerCircle, enemyPathCircle;

let player = null, playerFire = false, playerMove = 0, playerTouched = false, playerTempX, playerTempY, playerTrailsArr = [];

let enemyArr = [];

let gameScoreCount = 0, gameScore, bestScore = 0;

let lifeCount = 50, playerLife;

let particlesArr = [];

let enemyPathCircleStrokeWidth, enemyPathCircleWidth;

let lastIntervalTimestamp = 0;
let animationFrame;

let displayAnimStarted = false;
const colors = ['#8ecae6', '#219ebc', '#ffb703', '#fb8500'];
let dispEleArr = [];
let dispanimationFrame;



startDisplayAnimFunc();
gameStartPopup.classList.add('pop-in');


function animationFunc(now) {
  if (gameStarted) {

    if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 1000) {
      lastIntervalTimestamp = now;
      enemyArr.forEach(enemy => enemy.direction = getRandDirection())
    }

    if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 150) {
      if (playerFire) {
        playerTrailsArr.push(new circle(ctx, player.x, player.y, 3, player.color));
      }
    }

    fillRect(ctx, 0, 0, innerWidth, innerHeight, 'rgba(0,0,0,1)');

    centerCircle.draw();

    enemyPathCircle.draw();

    player.draw();

    if (player.x + player.radius > innerWidth || player.x - player.radius < 0 || player.y + player.radius > innerHeight || player.y - player.radius < 0) {

      let playerAngle = Math.random() * 6.28;
      player.x = centerCircle.x + 50 * Math.cos(playerAngle);
      player.y = centerCircle.x + 50 * Math.sin(playerAngle);
      playerFire = false;

      playerLife.decreaseLife();
    }

    if (playerTouched) {

      let latestCord = moveTo(playerTempX, playerTempY, player.x, player.y, -player.fireSpeed);
      player.x += latestCord.x;
      player.y += latestCord.y;

      let distTemp = getDistance(player.x, player.y, playerTempX, playerTempY);
      if (distTemp < player.fireSpeed + 1) {
        playerTouched = false;
      }

    } else if (playerFire) {
      let latestCord = moveTo(centerCircle.x, centerCircle.y, player.x, player.y, player.fireSpeed);
      player.x += latestCord.x;
      player.y += latestCord.y;
    } else {
      player.angle += playerMove;
      player.x = centerCircle.x + 50 * Math.cos(player.angle);
      player.y = centerCircle.y + 50 * Math.sin(player.angle);
    }

    playerTrailsArr.forEach((trail, trailIndex) => {
      trail.radius -= 0.1;
      if (trail.radius < 1) {
        playerTrailsArr.splice(trailIndex, 1);
      }
      trail.draw();
    })


    enemyArr.forEach((enemy, enemyIndex) => {
      const distanceEnemyPlayer = getDistance(player.x, player.y, enemy.x, enemy.y);
      if (distanceEnemyPlayer < player.radius + enemy.radius) {

        playerFire = false;
        playerTouched = true;

        for (let particle_i = 0; particle_i < 20; particle_i++) {
          let dx = (Math.random() - 0.5) * (Math.random() * 6 + 3);
          let dy = (Math.random() - 0.5) * (Math.random() * 6 + 3);
          particlesArr.push(new particle(ctx, player.x, player.y, 2, Math.random() > 0.5 ? '#2af598' : 'yellow', dx, dy));
        }

        gameScore.updateScore();

        enemyArr.splice(enemyIndex, 1);
        setTimeout(() => spawnEnemy(1), 1500);

        playerLife.increaseLife();

      }
      enemy.animate()
    })

    gameScore.draw();


    playerLife.updateState();
    if (playerLife.life < 1) {
      bestScore = Math.max(bestScore, gameScore.score);
      bestScoreEle.innerHTML = bestScore;
      endGame();
      startDisplayAnimFunc();
    }

    particlesArr.forEach((e, i) => {

      if (e.alpha < 0.2) {
        particlesArr.splice(i, 1);
      }

      e.update();
    });

    animationFrame = requestAnimationFrame(animationFunc);

  }

}

function generateDispElements() {
  for (let i = 0; i < 25; i++) {
    const radius = Math.random() * 8 + 6;
    const randX = (Math.random() * (innerWidth - radius * 4)) + radius;
    const randY = (Math.random() * (innerHeight - radius * 4)) + radius;
    const color = colors[Math.floor(Math.random() * (colors.length - 1))];

    dispEleArr.push(new dispEle(ctx, randX, randY, radius, color));
  }
}
function dispAnimFunc(now) {
  if (displayAnimStarted) {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, 'rgba(0,0,0,0.1)');

    dispEleArr.forEach(e => {
      e.animate()
    })
 
    dispanimationFrame = requestAnimationFrame(dispAnimFunc);
  }
}
function startDisplayAnimFunc(){
  generateDispElements();
displayAnimStarted = true;
dispAnimFunc();
}
function stopDisplayAnimFunc(){
  cancelAnimationFrame(dispanimationFrame);
  displayAnimStarted = false;
  dispEleArr = [];
}

function spawnEnemy(enemyCount = 1) {
  for (let i = 0; i < enemyCount; i++) {
    const enemyAngle = Math.random() * 6.28;
    const direction = 0.02 + (Math.random() * (0.06 - 0.02));
    const enemy = new villain(ctx, enemyPathCircleStrokeWidth / 2, getRandColor(), enemyAngle, centerCircle, direction, enemyPathCircleWidth);
    enemyArr.push(enemy);
  }
}

function spawnPlayer() {
  let playerAngle = Math.random() * 6.28;
  let playerX = centerCircle.x + 50 * Math.cos(playerAngle);
  let playerY = centerCircle.y + 50 * Math.sin(playerAngle);
  player = new hero(ctx, playerX, playerY, 10, '#009efd', playerAngle, centerCircle);

}

function getRandDirection() {
  return Math.random() < 0.5 ? 0.02 + (Math.random() * (0.06 - 0.02)) : -0.02 + (Math.random() * (-0.06 + 0.02))
}


function endGame() {
  gameStarted = false;

  player = null;

  playerTrailsArr = [];

  enemyArr = [];

  particlesArr = [];

  lastIntervalTimestamp = 0;

  cancelAnimationFrame(animationFrame);
  fillRect(ctx, 0, 0, innerWidth, innerHeight, 'rgba(0,0,0,1)');

  gameEndPopup.classList.add('pop-in');

  stopGameAudio();
  gameMusicPlayPauseBtn.classList.add('paused');
}

function beginGame() {
  

  gameStartPopup.classList.remove('pop-in');
  gameStartPopup.classList.add('pop-out');

  setTimeout(() => {
    gameStartPopup.classList.remove('pop-out');
    textAnimation.classList.remove('hide')
  }, 1000);
  setTimeout(() => {
    textAnimation.classList.add('hide');

    stopDisplayAnimFunc();
    gameInit();

  }, 7000);
}

function gameInit() {

  gameMusicPlayPauseBtn.classList.remove('paused');
  playGameAudio();

  canvas.height = innerHeight;
  canvas.width = innerWidth;

  minV = Math.min(innerWidth, innerHeight);

  enemyPathCircleStrokeWidth = Math.min(60, minV / 12);
  enemyPathCircleWidth = Math.min(330, (minV - 100) / 2) - (enemyPathCircleStrokeWidth / 2);

  centerCircle = new circle(ctx, innerWidth / 2, innerHeight / 2, 20, '#fff');
  enemyPathCircle = new circle(ctx, innerWidth / 2, innerHeight / 2, enemyPathCircleWidth, '#111', true, enemyPathCircleStrokeWidth);

  playerFire = false; playerMove = 0;

  enemyArr = [];

  gameScore = new score(ctx, innerWidth - 200, 50, "sans-serif", "30px", "#fff", gameScoreCount);

  playerLife = new life(ctx, 15, 50, "sans-serif", "30px", "#fff", lifeCount);

  lastIntervalTimestamp = 0;

  spawnPlayer();

  spawnEnemy(3);

  gameStarted = true;

  animationFunc();
}

function getRandColor() {
  const colors = ["#2af598", "#ff6958", "#ffa200", "#d0ea77"];
  return colors[Math.floor(Math.random() * (colors.length - 1))]
}

function playGameAudio() {
  gameMusic.play();
}

function pauseGameAudio() {
  gameMusic.pause();
}

function stopGameAudio() {
  gameMusic.pause();
  gameMusic.currentTime = 0;
}

addEventListener('keydown', function (e) {
  if (gameStarted) {
    if (e.code === 'KeyA') playerMove = -0.1;
    if (e.code === 'KeyD') playerMove = 0.1;
    if (e.code === 'KeyW') {
      playerFire = true;
      playerTempX = player.x;
      playerTempY = player.y;
    }
  }
});

addEventListener('keyup', function (e) {
  if (gameStarted) {
    if (e.code === 'KeyA') playerMove = 0;
    if (e.code === 'KeyD') playerMove = 0;
  }
});

let ts_x = 0, tm_x = 0, touchStart = false;
addEventListener("touchstart", (e) => {
  if (gameStarted) {
    touchStart = true;
    ts_x = e.touches[0].pageX;
  }
});

addEventListener("touchmove", (e) => {
  if (gameStarted) {
    tm_x = e.touches[0].pageX;
    if (ts_x - tm_x < 0) {
      playerMove = 0.01 * (ts_x - tm_x) / 20;

    } else {
      playerMove = 0.01 * (ts_x - tm_x) / 20;
    }
  }
});

addEventListener("touchend", (e) => {
  if (gameStarted) {
    touchStart = false;
    playerMove = 0;
    playerFire = true;
    playerTempX = player.x;
    playerTempY = player.y;
  }
});

gameStartBtn.addEventListener('click', e => {
  beginGame();
})

gameRestartBtn.addEventListener('click', e => {
  gameEndPopup.classList.remove('pop-in');
  gameEndPopup.classList.add('pop-out');

  setTimeout(() => {
    gameEndPopup.classList.remove('pop-out');
  }, 1000);
  setTimeout(() => {
    gameInit();
  }, 0);
})

gameMusicPlayPauseBtn.addEventListener('click', e => {
  if(e.currentTarget.classList.contains('paused')){
    e.currentTarget.classList.remove('paused');
    playGameAudio();
  }else{
    e.currentTarget.classList.add('paused');
    pauseGameAudio();
  }
})


//1) create UI -- done
//2) move player clockwise/anticlockwise using left/right key -- done
//3) enemy animate in random direction on some interval -- done
//4) fire player -- done
//5) reset player if miss collision -- done
//6) detect collision between player and enemy -- done
//7) respawn enemy if collide with player -- done
//8) update score if collide with player -- done
//9) set life of player -- done
//10) creation spark on collision -- done
//11) create game begin popup and text animation
//12) when every life points finished game will be stopped and game over popup appear -- done
//13) player move back to its original position if it collide with enemy
//14) create trail when plyer fire
//15) display best score in game over popup
//16) add music

