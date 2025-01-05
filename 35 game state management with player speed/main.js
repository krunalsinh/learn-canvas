import { handleBoxCollision } from "../common/common-functions.js";
import Background from "./background.js";
import { Ghost, Spider, Worm } from "./enemy.js";
import Explosion from "./explosion.js";
import InputHandler from "./input.js";
import Player from "./player.js";
import { states } from "./state.js";
import UI from "./ui.js";

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas');
    const loading = document.getElementById('loading');
    loading.style.display = "none";
    let ctx = canvas.getContext('2d');
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;

    class Game {
        constructor(height, width) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.speed = 3;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.background = new Background(this);
            this.ui = new UI(this);
            this.enemies = [];
            this.enemyInterval = 1000;
            this.enemyTimer = 0;
            this.enemyTypes = [ 'ghost', 'spider'];
            this.particles = [];
            this.debug = true;
            this.score = 0;
            this.player.setState(states.SITTING, 0);
            this.explosions = [];
        }
        update(deltaTime){
            this.enemyTimer += deltaTime;
            if(this.enemyTimer > this.enemyInterval){
                this.enemyTimer = 0;
                this.addNewEnemy();
            }
            this.background.update(deltaTime);
            this.checkCollision();
            this.player.update(this.input.keys, deltaTime)
            this.enemies.forEach((enemy, enemyIndex) => {
                enemy.update(deltaTime)
                if(enemy.markedForDeletion) this.enemies.splice(enemyIndex, 1);
            });
            this.particles.forEach((particle, particleIndex) => {
                particle.update(deltaTime)
                if(particle.markedForDeletion) this.particles.splice(particleIndex, 1);
            });

            this.explosions.forEach((explosion, explosionIndex) => {
                explosion.update(deltaTime)
                if(explosion.markedForDeletion) this.explosions.splice(explosionIndex, 1);
            });
            // console.log("particles ",this.particles.length);
            
        }
        draw(ctx){
            
            this.background.draw(ctx);
            this.enemies.forEach(enemy => enemy.draw(ctx));
            this.player.draw(ctx);
            this.particles.forEach(particle => particle.draw(ctx));
            this.explosions.forEach(explosion => explosion.draw(ctx));
            this.ui.draw(ctx);
        }
        addNewEnemy(){
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            if(randomEnemy === "ghost") this.enemies.push(new Ghost(this));
            else if(randomEnemy === "spider") this.enemies.push(new Spider(this));
            
            this.enemies.sort((a,b) => a.y - b.y);

            // console.log(this.enemies.length);
            
        }
        increaseScore(){
            this.score++;
        }
        checkCollision(){
            this.enemies.forEach(enemy => {
                if(handleBoxCollision(this.player, enemy)){
                    if(this.player.currentState.state === "JUMPING" || 
                    this.player.currentState.state === "FALLING" ||
                    this.player.currentState.state === "RUNNING" ||
                    this.player.currentState.state === "HIT") {
                        this.player.setState(states.HIT, 0);
                    }else{
                        this.explosions.push(new Explosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
                        enemy.markedForDeletion = true;
                        this.increaseScore();
                        console.log(this.explosions);
                        
                    }
                }
            });
        }
    }

    const game = new Game(canvas.height, canvas.width);

    let lastTime = 0;
    function animate(timestamp){
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});
