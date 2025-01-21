import { clearRect, drawRectangle, fillRect } from "../common/common-functions.js";
import Snake, { ComputerAi, Keyboard1, Keyboard2 } from "./snake.js";

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
        this.gameObjects;  

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
        this.player1 = new ComputerAi(this, 0, 0, 0, 1, "pink");
        this.player2 = new ComputerAi(this, this.columns - 1, 0, 1, 0, "skyblue");
        this.player3 = new ComputerAi(this, 0, this.rows - 1, 1, 0, "gold");
        this.player4 = new ComputerAi(this, this.columns - 1, this.rows - 1, 1, 0, "blue");

        this.gameObjects = [this.player1, this.player2, this.player3, this.player4];
        
    }
    drawGrid(){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.columns; j++){
                drawRectangle(this.ctx, j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize, 'rgba(0, 0, 0, 1)', true);
            }
        }
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