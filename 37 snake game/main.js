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

        this.player1;
        this.player2;
        this.player3;
        this.player4;
        this.food;
        this.gameObjects;  
        this.ui = new UI(this);
        this.topMargin = 2;
        this.background;

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
        this.player1 = new Keyboard1(this, 1, 1, 0, 1, "pink", "Player1");
        this.player2 = new ComputerAi(this, this.columns - 3, 2, 1, 0, "skyblue", "Snake killer");
        this.player3 = new ComputerAi(this, 2, this.rows - 2, 1, 0, "gold", "Python");
        this.player4 = new ComputerAi(this, this.columns - 3, this.rows - 3, 1, 0, "blue", "Cobra");
        this.food = new Food(this);

        this.gameObjects = [this.player1, this.player2, this.player3, this.player4, this.food];
        
    }
    drawGrid(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                drawRectangle(this.ctx, j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize, 'rgba(0, 0, 0, 1)', true);
            }
        }
    }
    drawStatusText(){
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '30px Impact';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(`Player 1: ${this.player1.score}`, 10, this.cellSize);
        this.ctx.fillText(`Player 2: ${this.player2.score}`, 10, this.cellSize * 2);
        this.ctx.fillText(`Player 3: ${this.player3.score}`, 10, this.cellSize * 3);
        this.ctx.fillText(`Player 4: ${this.player4.score}`, 10, this.cellSize * 4);
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
        if(this.eventUpdate){
            clearRect(this.ctx, 0, 0, canvas.width, canvas.height);
            this.drawGrid();
            
            this.gameObjects.forEach(obj => {
                obj.update();
                obj.draw();
            });

            this.drawStatusText();
            this.ui.update();
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