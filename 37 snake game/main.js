import { clearRect, drawRectangle, fillRect } from "../common/common-functions.js";
import Background from "./background.js";
import Food from "./food.js";
import Snake, { ComputerAi, Keyboard1, Keyboard2 } from "./snake.js";
import { UI } from "./ui.js";

class Game{
    constructor(canvas, context){
        this.canvas = canvas;
        this.ctx = context;
        this.width;
        this.height;
        this.cellSize = 50;
        this.columns;
        this.rows;
        this.eventTimer = 0;
        this.eventInterval = 200;
        this.eventUpdate = false;

        this.gameOver = true;
        this.winningScore = 3;

        this.player1;
        this.player2;
        this.player3;
        this.player4;
        this.food;
        this.gameObjects;  
        this.debug = false;
        this.ui = new UI(this);
        this.topMargin = 2;
        this.background;
        window.addEventListener('keyup', e => {
            if(e.ctrlKey === true && e.key === 'q'){
                this.debug = !this.debug;
            }
            
            
        })
        window.addEventListener('resize', e => {
            this.resize( e.currentTarget.innerWidth, e.currentTarget.innerHeight);
        })
        this.resize(window.innerWidth, window.innerHeight);
    }
    resize(width, height){
        this.canvas.width = width - width % this.cellSize;  
        this.canvas.height = height - height % this.cellSize; 
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.columns = Math.floor(this.width / this.cellSize);
        this.rows = Math.floor(this.height / this.cellSize);
        this.background = new Background(this);
      
        
    }

    player1Init(){
        const playerName = this.ui.player1Name.value;
        const image = document.getElementById(this.ui.playerType1.value);

        
        if(this.ui.playerControl1.value === "keyboard"){
            this.player1 = new Keyboard1(this, 4, this.topMargin, 1, 0, "pink", playerName, image);
        }else{
            this.player1 = new ComputerAi(this, 4, this.topMargin, 1, 0, "pink", playerName, image);
        }
    }

    player2Init(){
        const playerName = this.ui.player2Name.value;
        const image = document.getElementById(this.ui.playerType2.value);

        if(this.ui.playerControl2.value === "wsad"){
            this.player2 = new Keyboard2(this, 0, this.topMargin + 4, 0, 1, "blue", playerName, image);
        }else{
            this.player2 = new ComputerAi(this, 0, this.topMargin + 4, 0, 1, "blue", playerName, image);
        }
    }

    player3Init(){
        const playerName = this.ui.player3Name.value;
        const image = document.getElementById(this.ui.playerType3.value);

        this.player3 = new ComputerAi(this, 4, this.rows - 1, 1, 0, "skyblue", playerName, image);
    }

    player4Init(){
        const playerName = this.ui.player4Name.value;
        const image = document.getElementById(this.ui.playerType4.value);

        this.player4 = new ComputerAi(this, this.columns - 1, 4, 0, 1, "gold", playerName, image);
    }

    start(){
        if(!this.gameOver){
            this.triggerGameOver();
        }else{

            this.gameOver = false;
            this.ui.gamePlayUI();
            this.player1Init();
            this.player2Init();
            this.player3Init();
            this.player4Init();

            this.food = new Food(this);
    
            this.gameObjects = [
                this.player1, 
                this.player2, 
                this.player3, 
                this.player4,
                this.food
            ];

            this.ctx.clearRect(0, 0, this.width, this.height);
        }
       
    }
    drawGrid(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                drawRectangle(this.ctx, j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize, 'rgba(0, 0, 0, 1)', true);
            }
        }
    }
    drawStatusText(){
        this.ctx.font = '30px Impact';
        this.ctx.textBaseline = 'top';
        this.drawText(`Player 1: ${this.player1.score}`, 10, this.cellSize);
        this.drawText(`Player 2: ${this.player2.score}`, 10, this.cellSize * 2);
        this.drawText(`Player 3: ${this.player3.score}`, 10, this.cellSize * 3);
        this.drawText(`Player 4: ${this.player4.score}`, 10, this.cellSize * 4);
    }
    drawText(text, x, y){
        this.ctx.fillStyle = '#000';
        this.ctx.fillText(text, x + 3, y + 3);
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(text, x, y);
    }
    checkCollision(a, b){
        return a.x === b.x && a.y === b.y;
    }
    handlePeriodicEvent(deltaTime){
        if(this.eventTimer < this.eventInterval){
            this.eventTimer += deltaTime;
            this.eventUpdate = false;
        }else{
            this.eventTimer = 0;
            this.eventUpdate = true;
        }

    }
    render(deltaTime){
        this.handlePeriodicEvent(deltaTime);
        if(this.eventUpdate && !this.gameOver){
            clearRect(this.ctx, 0, 0, canvas.width, canvas.height);

            this.background.draw();
            this.debug && this.drawGrid();
            
            this.gameObjects.forEach(obj => {
                obj.update();
                obj.draw();
            });

            this.drawStatusText();
            this.ui.update();
        }
    }
    triggerGameOver(winner){
        this.gameOver = true;
        this.ui.gameOverUI();
        if(winner){
            this.ui.message1.innerText = winner.name + " wins!";
            this.ui.message2.innerText = "Winning Score " + winner.score;
        }else{
            this.ui.message1.innerText = "Welcome to battle arena!";
            this.ui.message2.innerText = "Choose your fighters!";
        }
    }
    toggleFullScreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
}

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const game = new Game(canvas, ctx);
    
    let lastTime = 0;
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        game.render(deltaTime);
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
});