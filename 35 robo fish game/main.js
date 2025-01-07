import { handleBoxCollision } from "../common/common-functions.js";
import Background, { Layer } from "./background.js";
import { Enemy1, Enemy2, Enemy3, Enemy4 } from "./enemy.js";
import Explosion from "./explosion.js";
import GameMessage from "./game-message.js";
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
            this.enemyTypes = [ 'enemy1', 'enemy2', 'enemy3', 'enemy4'];
            this.particles = [];
            this.debug = true;
            this.score = 0;
            this.player.setState(states.STATE1, 5);
            this.explosions = [];
            this.gameOver = false;
            this.backgroundLayers = [
                new Layer(this, this.width, this.height, 0.1, "layer1"),
                new Layer(this, this.width, this.height, 0.2, "layer2"),
                new Layer(this, this.width, this.height, 0.4, "layer3"),
                new Layer(this, this.width, this.height, 0.6, "layer4"),
            ]
        }
        update(deltaTime){
            this.enemyTimer += deltaTime;
            if(this.enemyTimer > this.enemyInterval){
                this.enemyTimer = 0;
                this.addNewEnemy();
            }
            this.backgroundLayers.forEach(layer => layer.update(deltaTime));
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
            
            
        }
        draw(ctx){
            
            this.background.draw(ctx);
            this.backgroundLayers[0].draw(ctx);
            this.backgroundLayers[1].draw(ctx);
            this.backgroundLayers[2].draw(ctx);
            this.enemies.forEach(enemy => enemy.draw(ctx));
            this.player.draw(ctx);
            this.backgroundLayers[3].draw(ctx);
            this.particles.forEach(particle => particle.draw(ctx));
            this.explosions.forEach(explosion => explosion.draw(ctx));
            this.ui.draw(ctx);
        }
        addNewEnemy(){
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            if(randomEnemy === "enemy1") this.enemies.push(new Enemy1(this));
            else if(randomEnemy === "enemy2") this.enemies.push(new Enemy2(this));
            else if(randomEnemy === "enemy3") this.enemies.push(new Enemy3(this));
            else if(randomEnemy === "enemy4") this.enemies.push(new Enemy4(this));
            
            this.enemies.sort((a,b) => a.y - b.y);

            // console.log(this.enemies.length);
            
        }
        increaseScore(){
            this.score++;
        }
        checkCollision(){
            this.enemies.forEach(enemy => {
                if(handleBoxCollision(this.player, enemy)){
                    this.explosions.push(new Explosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
                    enemy.markedForDeletion = true;

                    if(this.player.currentState.state === "JUMPING" || 
                    this.player.currentState.state === "FALLING" ||
                    this.player.currentState.state === "RUNNING" ||
                    this.player.currentState.state === "HIT") {
                        this.player.setState(states.HIT, 5);
                    }else{
                        this.increaseScore();
                    }

                    if(this.player.life <= 0){
                        this.gameOver = true;
                    }
                }
            });
        }
        restart(){
            this.player = new Player(this);
            this.background = new Background(this);
            this.ui = new UI(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.particles = [];
            this.debug = true;
            this.score = 0;
            this.player.setState(states.SITTING, 0);
            this.explosions = [];
            this.gameOver = false;
            animate(0);
        }
    }

    const game = new Game(canvas.height, canvas.width);
    const gameMessage = new GameMessage(game);

    let lastTime = 0;
    function animate(timestamp){
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver) {
            requestAnimationFrame(animate);
        }else{
            gameMessage.draw(ctx);
        }
    }
    animate(0);
});
