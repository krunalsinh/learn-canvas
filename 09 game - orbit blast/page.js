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

const colors = ['#e5989b', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
const mouse = { x: innerWidth / 2, y: innerHeight / 2, radius: 120 };


const centerCircle = new circle(ctx, innerWidth / 2, innerHeight / 2, 20, '#111');
const enemyPathCircle = new circle(ctx, innerWidth / 2, innerHeight / 2, 300, '#111', true, 60);

let playerArr = [];
let playerFire = false;
let playerMove = 0;

let enemyArr = [];
let enemyDirection = 0.02;

let gameScoreCount = 0;
let gameScore = new score(ctx, innerWidth - 200, 50, "sans-serif", "30px", "#fff", gameScoreCount);

let lifeCount = 50;
let playerLife = new life(ctx, 15, 50, "sans-serif", "30px", "#fff", lifeCount);

let particlesArr = [];

let lastIntervalTimestamp = 0;
let animationFrame;


gameStartPopup.classList.add('pop-in');

function animationFunc(now) {
  if (gameStarted) {

    if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 1000) {
      lastIntervalTimestamp = now;
      enemyArr.forEach(enemy => Math.random() < 0.5 ? enemy.direction = 0.02 + (Math.random() * (0.06 - 0.02)) : enemy.direction = -0.02 + (Math.random() * (-0.06 + 0.02)))

    }

    fillRect(ctx, 0, 0, innerWidth, innerHeight, 'rgba(0,0,0,0.5)');

    centerCircle.draw();

    enemyPathCircle.draw();

    playerArr.forEach((player, playerIndex) => {
      player.animate(playerMove, playerFire);

      if (player.x + player.radius > innerWidth || player.x - player.radius < 0 || player.y + player.radius > innerHeight || player.y - player.radius < 0) {
        playerArr.splice(playerIndex, 1);
        playerFire = false;

        spawnPlayer();

        playerLife.decreaseLife();
      }
    });

    enemyArr.forEach((enemy,enemyIndex) => {
      if (playerArr[0]) {
        const distanceEnemyPlayer = getDistance(playerArr[0].x, playerArr[0].y, enemy.x, enemy.y);
        if (distanceEnemyPlayer < playerArr[0].radius + enemy.radius) {

          for (let particle_i = 0; particle_i < 20; particle_i++) {
            // let color = `hsl(${randomIntFromRange(0,360)},70%,50%)`;
            let dx = (Math.random() - 0.5) * (Math.random() * 6 + 3);
            let dy = (Math.random() - 0.5) * (Math.random() * 6 + 3);
            particlesArr.push(new particle(ctx, playerArr[0].x, playerArr[0].y, 2, Math.random() > 0.5 ? 'green' : 'yellow', dx, dy));
          }

          gameScore.updateScore();

          playerArr.splice(0, 1);
          playerFire = false;
          spawnPlayer();

          enemyArr.splice(enemyIndex, 1);
          setTimeout(spawnEnemy, 1500);

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
      console.log(e.x, e.y);

      if (e.alpha < 0.2) {
        particlesArr.splice(i, 1);
      }

      e.update();
    });

    animationFrame = requestAnimationFrame(animationFunc);
    console.log("hello");

  }
}

function spawnEnemy(enemyCount = 1) {
  for (let i = 0; i < enemyCount; i++) {
    const enemyAngle = Math.random() * 6.28;
    const enemyX = centerCircle.x + 300 * Math.cos(enemyAngle);
    const enemyY = centerCircle.y + 300 * Math.sin(enemyAngle);
    const enemy = new villain(ctx, enemyX, enemyY, 30, 'green', enemyAngle, centerCircle);
    enemyArr.push(enemy);
    console.log("spawnEnemy called");
    
  }
}

function spawnPlayer() {
  let playerAngle = Math.random() * 6.28;
  let playerX = centerCircle.x + 50 * Math.cos(playerAngle);
  let playerY = centerCircle.y + 50 * Math.sin(playerAngle);
  let player = new hero(ctx, playerX, playerY, 10, '#fff', playerAngle, centerCircle);
  playerArr.push(player);
}

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
})


addEventListener('keydown', function (e) {
  if (e.code === 'KeyA') playerMove = -0.1;
  if (e.code === 'KeyD') playerMove = 0.1;
  if (e.code === 'KeyW') playerFire = true;
});

addEventListener('keyup', function (e) {
  if (e.code === 'KeyA') playerMove = 0;
  if (e.code === 'KeyD') playerMove = 0;
});



gameStartBtn.addEventListener('click', e => {
  beginGame();
})

gameRestartBtn.addEventListener('click', e => {
  gameEndPopup.classList.remove('pop-in');
  gameEndPopup.classList.add('pop-out');

  setTimeout(() => {
    gameEndPopup.classList.remove('pop-out');
    textAnimation.classList.remove('hide')
  }, 1000);
  setTimeout(() => {
    textAnimation.classList.add('hide');
    gameInit();
  }, 7000);


})

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
    textAnimation.classList.remove('hide')
  }, 1000);
  setTimeout(() => {
    textAnimation.classList.add('hide');

    gameInit();

  }, 7000);
}

function gameInit() {

  spawnPlayer();

  spawnEnemy(3);

  gameScore.score = 0;

  playerLife.life = 50;

  gameStarted = true;

  animationFunc();

}

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

