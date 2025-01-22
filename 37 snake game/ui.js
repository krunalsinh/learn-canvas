export class UI {
    constructor(game){      
        this.game = game;
        this.scoreBoard1 = document.querySelector('#player1Score');
        this.scoreBoard2 = document.querySelector('#player2Score');
        this.scoreBoard3 = document.querySelector('#player3Score');
        this.scoreBoard4 = document.querySelector('#player4Score');
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
}