import { fillRect, getDistance, moveTo, addText } from '../common/common-functions.js';
import { circle, score, player as hero, enemy as villain } from "./elements.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const colors = ['#e5989b', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
const mouse = { x: innerWidth / 2, y: innerHeight / 2, radius: 120 };


const centerCircle = new circle(ctx, innerWidth / 2, innerHeight / 2, 20, '#111');
const enemyPathCircle = new circle(ctx, innerWidth / 2, innerHeight / 2, 300, '#111', true, 60);

const playerArr = [];
let playerMove = 0;
let playerFire = false;
spawnPlayer();

const enemyArr = [];
let enemyDirection = 0.02;
spawnEnemy();


let gameScoreCount = 0;
const gameScore = new score(ctx, innerWidth - 200, 50, "sans-serif", "30px", "#fff", gameScoreCount);
let lastIntervalTimestamp = 0;

animationFunc();

function animationFunc(now) {
  if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 1000) {
    lastIntervalTimestamp = now;

    Math.random() < 0.5 ? enemyDirection = 0.02 + (Math.random() * (0.06 - 0.02)) : enemyDirection = -0.02 + (Math.random() * (-0.06 + 0.02));
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
      // enemyArr.splice(0, 1);
    }

    if(enemyArr[0]){
      const distanceEnemyPlayer = getDistance(player.x, player.y, enemyArr[0].x, enemyArr[0].y);
      // console.log("collision done", distanceEnemyPlayer  - (player.radius + enemyArr[0].radius));
      if (distanceEnemyPlayer < player.radius + enemyArr[0].radius ) {
        gameScore.updateScore();

        playerArr.splice(playerIndex, 1);
        playerFire = false;
        spawnPlayer();
  
        enemyArr.splice(0, 1);
        // spawnEnemy();
        setTimeout(spawnEnemy, 1500);
  
      }
    }


  });

  enemyArr.forEach(enemy => enemy.animate(enemyDirection));

  gameScore.draw();

  requestAnimationFrame(animationFunc);
}

function spawnEnemy() {
  const enemyAngle = Math.random() * 6.28;
  const enemyX = centerCircle.x + 300 * Math.cos(enemyAngle);
  const enemyY = centerCircle.y + 300 * Math.sin(enemyAngle);
  const enemy = new villain(ctx, enemyX, enemyY, 30, 'green', enemyAngle, centerCircle);
  enemyArr.push(enemy);
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

//1) create UI -- done
//2) move player clockwise/anticlockwise using left/right key -- done
//3) enemy animate in random direction on some interval -- done
//4) fire player -- done
//5) respawn player if miss collision -- done
//6) detect collision between player and enemy -- done
//7) respawn enemy if collide with player -- done
//8) update score if collide with player
//9) set life of of player
