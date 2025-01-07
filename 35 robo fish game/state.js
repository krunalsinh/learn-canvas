import { Dust, Fire, Splash } from "./particle.js";

export const states = {
    STATE1: 0,
    STATE2: 1,
    
}

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class State1 extends State {
    constructor(game) {
        super("STATE 1", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 0;
        this.game.player.maxFrame = 39;
    }
    handleInput(input) {
        
    }
}

export class State2 extends State {
    constructor(game) {
        super("STATE 2", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 1;
        this.game.player.maxFrame = 39;
    }
    handleInput(input) {
        
    }
}









