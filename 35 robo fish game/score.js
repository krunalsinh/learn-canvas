export class Score{
    constructor(score){
        this.score = score;
    }
    incrementScore(){
        this.score++;
    }
    decrementScore(){
        this.score--;
    }
}
const score = new Score(0);
export default score;