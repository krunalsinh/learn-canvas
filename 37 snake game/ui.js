export class UI {
    constructor(game){      
        this.game = game;
        this.scoreBoard1 = document.querySelector('#player1Score');
        this.scoreBoard2 = document.querySelector('#player2Score');
        this.scoreBoard3 = document.querySelector('#player3Score');
        this.scoreBoard4 = document.querySelector('#player4Score');

        this.startButton = document.getElementById("startButton");
        this.startButton.addEventListener('click', e => {
            this.game.start();
        })
        this.debugButton = document.getElementById("debugButton");
        this.debugButton.addEventListener('click', e => {
            this.game.debug = !this.game.debug;
        })
        this.fullscreenButton = document.getElementById("fullscreenButton");
        this.fullscreenButton.addEventListener('click', e => {
            this.game.toggleFullScreen();
        })
        this.playerControls = document.getElementById("playerControls");

        this.gameOverScreen = document.getElementById("gameOverScreen");

        this.playerControl1 = document.getElementById("playerControl1");
        this.playerControl2 = document.getElementById("playerControl2");
        this.playerControl3 = document.getElementById("playerControl3");
        this.playerControl4 = document.getElementById("playerControl4");

        this.player1Name = document.getElementById("player1Name");
        this.player2Name = document.getElementById("player2Name");
        this.player3Name = document.getElementById("player3Name");
        this.player4Name = document.getElementById("player4Name");
    }
    
    update(){
        this.scoreBoard1.innerHTML = this.game.player1.name+" : " + this.game.player1.score;
        this.scoreBoard1.style.color = this.game.player1.color;

        this.scoreBoard2.innerHTML = this.game.player2.name+" : " + this.game.player2.score;
        this.scoreBoard2.style.color = this.game.player2.color;

        this.scoreBoard3.innerHTML = this.game.player3.name+" : " + this.game.player3.score;
        this.scoreBoard3.style.color = this.game.player3.color;

        this.scoreBoard4.innerHTML = this.game.player4.name+" : " + this.game.player4.score;
        this.scoreBoard4.style.color = this.game.player4.color;
    }

    gamePlayUI(){
        this.playerControls.style.display = "none";
        this.startButton.innerText = "Restart";
        this.gameOverScreen.style.display = "none";
    }

    gameOverUI(){
        this.playerControls.style.display = "block";
        this.startButton.innerText = "Start";
        this.gameOverScreen.style.display = "block";
    }
}