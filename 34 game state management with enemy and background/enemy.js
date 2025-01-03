import { drawCircle, handleCircleCollision } from "../common/common-functions.js";
import ismobileDevice from "./checkMobile.js";
import Explosion from "./explosion.js";
import score from "./score.js";
import { ctx } from "./script.js";

export default class Enemy {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.img = document.getElementById("enemyImg");
        this.maxFrame = 6;
        this.spriteSliceWidth = 960 / this.maxFrame;
        this.spriteSliceHeight = 119;
        this.width = this.spriteSliceWidth * 0.5;
        this.height = this.spriteSliceHeight * 0.5;
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height;
        this.speed = 5;
        this.frameX = 0;
        this.frameY = 0;
        this.markForDeletion = false;
        this.animationInterval = 1000 / 30;
        this.timer = 0;
        this.radius = Math.max(this.width * 0.5, this.height * 0.5);
        if(ismobileDevice){
            this.width = this.spriteSliceWidth * 0.25;
            this.height = this.spriteSliceHeight * 0.25;
            this.y = this.gameHeight - this.height;
            this.radius = Math.max(this.width * 0.5, this.height * 0.5);
        }
    }

    update(deltaTime) {
        this.x -= this.speed;

        if(this.timer > this.animationInterval){

            if(this.frameX < this.maxFrame - 1) {this.frameX++;}
            else {this.frameX = 0;}

            this.timer = 0;
        }else{

            this.timer += deltaTime;
        }
        
        if (this.x < -this.width) {
            this.markForDeletion = true;
            score.incrementScore();
        }
    }

    draw() {
        // drawCircle(ctx, this.x + this.width * 0.5, this.y + this.height * 0.5, this.radius , "blue");
        
        ctx.drawImage(
            this.img, 
            this.frameX * this.spriteSliceWidth,
            this.frameY * this.spriteSliceHeight,
            this.spriteSliceWidth,
            this.spriteSliceHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

let enemyTimer = 0
let enemyArr = [], explosionArr = [];

export function handleEnemy(canvas, player, deltaTime){
        let isGameOver = false, isCollide = false;
        const randEnemyInterval = Math.random() * 10000 + 2000;

        if(enemyTimer > randEnemyInterval){
            enemyTimer = 0;
            enemyArr.push(new Enemy(canvas.width, canvas.height));
        }else{
            enemyTimer += deltaTime;
        }

        enemyArr.forEach(enemy => {
            enemy.update(deltaTime);
            enemy.draw();

            isCollide = handleCircleCollision(
                {x : player.x + player.width * 0.5, y : player.y + player.height * 0.5, radius : player.radius},
                {x : enemy.x + enemy.width * 0.5, y : enemy.y + enemy.height * 0.5, radius : enemy.radius},
            )

            if(isCollide && (player.currentState.state === "ROLLING LEFT" || player.currentState.state === "ROLLING RIGHT" || player.currentState.state === "ROLLING DOWN") ){
                enemy.markForDeletion = true;
                score.incrementScore();
                explosionArr.push(new Explosion(200, 179, enemy.x, enemy.y, enemy.width, enemy.height));
            }else if(isCollide){
                isGameOver = true;
                enemyTimer = 0;
                enemyArr = []; 
                explosionArr = [];
            }

        })

        explosionArr.forEach(explosion => {
            explosion.update(deltaTime);
        })


        enemyArr = enemyArr.filter(enemy => !enemy.markForDeletion);
        explosionArr = explosionArr.filter(explosion => !explosion.markedForDeletion);

        return isGameOver;

    }