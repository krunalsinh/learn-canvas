import { fillRect, getDistance, moveTo, addText } from '../common/common-functions.js';
import { circle, score, player as hero, enemy as villain, life, particle } from "./elements.js";

const gameStartBtn = document.querySelector("#gameStartBtn");
const gameStartPopup = document.querySelector("#gameStartPopup");
const gameRestartBtn = document.querySelector("#gameRestartBtn");
const gameEndPopup = document.querySelector("#gameEndPopup");
const textAnimation = document.querySelector("#textAnimation");

let gameStarted = false;

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

let minV;

let centerCircle, enemyPathCircle;

let playerArr = [], playerFire = false, playerMove = 0;

let enemyArr = [];

let gameScoreCount = 0, gameScore;

let lifeCount = 50, playerLife;

let particlesArr = [];

let enemyPathCircleStrokeWidth, enemyPathCircleWidth;

let playerPropArr = [];

let lastIntervalTimestamp = 0;
let animationFrame;


gameStartPopup.classList.add('pop-in');



function animationFunc(now) {
  if (gameStarted) {

    if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 1000) {
      lastIntervalTimestamp = now;
      enemyArr.forEach(enemy => enemy.direction = getRandDirection())

    }

    fillRect(ctx, 0, 0, innerWidth, innerHeight, 'rgba(0,0,0,1)');

    centerCircle.draw();

    enemyPathCircle.draw();

    playerArr.forEach((player, playerIndex) => {
      player.draw();

      if (player.x + player.radius > innerWidth || player.x - player.radius < 0 || player.y + player.radius > innerHeight || player.y - player.radius < 0) {
        playerArr.splice(playerIndex, 1);
        playerFire = false;

        spawnPlayer();

        playerLife.decreaseLife();
      }

        player.angle += playerMove;
        if (!playerFire) {
            player.x = centerCircle.x + 50 * Math.cos(player.angle);
            player.y = centerCircle.y + 50 * Math.sin(player.angle);
        } else {
            let latestCord = moveTo(centerCircle.x, centerCircle.y, player.x, player.y, player.fireSpeed);
            player.x += latestCord.x;
            player.y += latestCord.y;
        }
    });

    enemyArr.forEach((enemy, enemyIndex) => {
      if (playerArr[0]) {
        const distanceEnemyPlayer = getDistance(playerArr[0].x, playerArr[0].y, enemy.x, enemy.y);
        if (distanceEnemyPlayer < playerArr[0].radius + enemy.radius) {

          for (let particle_i = 0; particle_i < 20; particle_i++) {
            let dx = (Math.random() - 0.5) * (Math.random() * 6 + 3);
            let dy = (Math.random() - 0.5) * (Math.random() * 6 + 3);
            particlesArr.push(new particle(ctx, playerArr[0].x, playerArr[0].y, 2, Math.random() > 0.5 ? '#2af598' : 'yellow', dx, dy));
          }

          gameScore.updateScore();

          playerArr.splice(0, 1);
          playerFire = false;
          spawnPlayer();

          enemyArr.splice(enemyIndex, 1);
          setTimeout(() => spawnEnemy(1), 1500);

          playerLife.increaseLife();

        }
        enemy.animate()
      }
    })

    gameScore.draw();


    playerLife.updateState();
    if (playerLife.life < 1) {
      endGame();
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
  let player = new hero(ctx, playerX, playerY, 10, '#009efd', playerAngle, centerCircle);
  playerArr.push(player);
}

function getRandDirection() {
  return Math.random() < 0.5 ?  0.02 + (Math.random() * (0.06 - 0.02)) :  -0.02 + (Math.random() * (-0.06 + 0.02))
}


function endGame() {
  gameStarted = false;

  playerArr = [];

  enemyArr = [];

  gameScoreCount = 0;

  lifeCount = 5;

  particlesArr = [];

  lastIntervalTimestamp = 0;

  cancelAnimationFrame(animationFrame);
  fillRect(ctx, 0, 0, innerWidth, innerHeight, 'rgba(0,0,0,1)');

  gameEndPopup.classList.add('pop-in');
}

function beginGame() {
  gameStartPopup.classList.remove('pop-in');
  gameStartPopup.classList.add('pop-out');

  setTimeout(() => {
    gameStartPopup.classList.remove('pop-out');
    // textAnimation.classList.remove('hide')
  }, 1000);
  setTimeout(() => {
    // textAnimation.classList.add('hide');

    gameInit();

  }, 0);
}

function gameInit() {

  canvas.height = innerHeight;
  canvas.width = innerWidth;
  
  minV = Math.min(innerWidth, innerHeight);

  enemyPathCircleStrokeWidth = Math.min(60, minV / 12);
  enemyPathCircleWidth = Math.min(330, (minV - 100) / 2) - (enemyPathCircleStrokeWidth / 2);

  centerCircle = new circle(ctx, innerWidth / 2, innerHeight / 2, 20, '#fff');
  enemyPathCircle = new circle(ctx, innerWidth / 2, innerHeight / 2, enemyPathCircleWidth, '#111', true, enemyPathCircleStrokeWidth);

  playerArr = []; playerFire = false; playerMove = 0;
  
  enemyArr = [];

  gameScoreCount = 0;
  gameScore = new score(ctx, innerWidth - 200, 50, "sans-serif", "30px", "#fff", gameScoreCount);

  lifeCount = 50;
  playerLife = new life(ctx, 15, 50, "sans-serif", "30px", "#fff", lifeCount);

  lastIntervalTimestamp = 0;
  
  spawnPlayer();

  spawnEnemy(3);

  gameScore.score = 0;

  playerLife.life = 50;

  gameStarted = true;

  animationFunc();

}

function getRandColor() {
  const colors = ["#2af598", "#ff6958", "#ffa200", "#d0ea77"];
  return colors[Math.floor(Math.random() * (colors.length - 1))]
}

addEventListener('keydown', function (e) {
  if (e.code === 'KeyA') playerMove = -0.1;
  if (e.code === 'KeyD') playerMove = 0.1;
  if (e.code === 'KeyW') playerFire = true;
});

addEventListener('keyup', function (e) {
  if (e.code === 'KeyA') playerMove = 0;
  if (e.code === 'KeyD') playerMove = 0;
});

let ts_x = 0, tm_x = 0, touchStart = false;
addEventListener("touchstart", (e) => {
  touchStart = true;
  ts_x = e.touches[0].pageX;
});

addEventListener("touchmove", (e) => {
  tm_x = e.touches[0].pageX;
  if(ts_x - tm_x < 0 && gameStarted){
    playerMove = 0.01 * (ts_x - tm_x) / 20;
    
  }else{
    playerMove = 0.01 * (ts_x - tm_x) / 20;
  }
  console.log(playerMove);
  
});

addEventListener("touchend", (e) => {
  touchStart = false;
  if(gameStarted){ playerMove = 0; playerFire = true; }
});

gameStartBtn.addEventListener('click', e => {
  beginGame();
})

gameRestartBtn.addEventListener('click', e => {
  gameEndPopup.classList.remove('pop-in');
  gameEndPopup.classList.add('pop-out');

  setTimeout(() => {
    gameEndPopup.classList.remove('pop-out');
    // textAnimation.classList.remove('hide')
  }, 1000);
  setTimeout(() => {
    // textAnimation.classList.add('hide');
    gameInit();
  }, 0);
})


//1) create UI -- done
//2) move player clockwise/anticlockwise using left/right key -- done
//3) enemy animate in random direction on some interval -- done
//4) fire player -- done
//5) respawn player if miss collision -- done
//6) detect collision between player and enemy -- done
//7) respawn enemy if collide with player -- done
//8) update score if collide with player -- done
//9) set life of player -- done
//10) creation spark on collision -- done
//11) create game begin popup and text animation
//12) when every life points finished game will be stopped and game over popup appear -- done

