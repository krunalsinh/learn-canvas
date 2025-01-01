import ismobileDevice from "./checkMobile.js";

export const states = {
    MOVING_LEFT: 0,
    MOVING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    RUNNING_LEFT: 4,
    RUNNING_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7,
    FALLING_LEFT: 8,
    FALLING_RIGHT: 9,
    ROLLING_LEFT: 10,
    ROLLING_RIGHT: 11,
    ROLLING_DOWN: 12,
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class MovingLeft extends State {
    constructor(player) {
        super("Moving LEFT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 7;
        this.player.speed = -this.player.maxSpeed;

        this.player.maxFrame = 6;
    }
    handleInput(input) {
        if(ismobileDevice){
            
        }else{
            if (input === "PRESS RIGHT") this.player.setState(states.RUNNING_RIGHT);
            else if (input === "RELEASE LEFT") this.player.setState(states.RUNNING_RIGHT);
            else if (input === "PRESS DOWN") this.player.setState(states.SITTING_LEFT);
            else if (input === "PRESS UP") this.player.setState(states.JUMPING_LEFT);
        }

    }
}

export class MovingRight extends State {
    constructor(player) {
        super("Moving RIGHT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 6;
        this.player.speed = this.player.maxSpeed;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        if(ismobileDevice){
            
        }else{
            if (input === "PRESS LEFT") this.player.setState(states.RUNNING_LEFT);
            else if (input === "RELEASE RIGHT") this.player.setState(states.RUNNING_RIGHT);
            else if (input === "PRESS DOWN") this.player.setState(states.SITTING_RIGHT);
            else if (input === "PRESS UP") this.player.setState(states.JUMPING_RIGHT);
        }

    }
}

export class RunningLeft extends State {
    constructor(player) {
        super("RUNNING LEFT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 7;
        this.player.speed = 0;
        this.player.maxFrame = 8;
    }
    handleInput(input) {
        if(ismobileDevice){
            
        }else{

            if (input === "PRESS ROLLING LEFT") this.player.setState(states.ROLLING_LEFT);
            else if (input === "PRESS ROLLING RIGHT") this.player.setState(states.ROLLING_RIGHT);
            else if (input === "PRESS RIGHT") this.player.setState(states.MOVING_RIGHT);
            else if (input === "PRESS LEFT") this.player.setState(states.MOVING_LEFT);
            else if (input === "PRESS DOWN") this.player.setState(states.SITTING_LEFT);
            else if (input === "PRESS UP") this.player.setState(states.JUMPING_LEFT);
        }
    }
}

export class RunningRight extends State {
    constructor(player) {
        super("RUNNING RIGHT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 6;
        this.player.speed = 0;
        this.player.maxFrame = 8;
    }
    handleInput(input) {
        if(ismobileDevice){
            if (input === "SWIPE DOWN LEFT") this.player.setState(states.ROLLING_LEFT);
            else if (input === "SWIPE DOWN RIGHT") this.player.setState(states.ROLLING_RIGHT);
            else if (input === "SWIPE UP LEFT") this.player.setState(states.JUMPING_LEFT);
            else if (input === "SWIPE UP RIGHT") this.player.setState(states.JUMPING_RIGHT);
            else if (input === "SWIPE LEFT UP" || input === "SWIPE LEFT DOWN") this.player.setState(states.MOVING_LEFT);
            else if (input === "SWIPE RIGHT UP" || input === "SWIPE RIGHT DOWN") this.player.setState(states.MOVING_RIGHT);
        }else{

            if (input === "PRESS ROLLING LEFT") this.player.setState(states.ROLLING_LEFT);
            else if (input === "PRESS ROLLING RIGHT") this.player.setState(states.ROLLING_RIGHT);
            else if (input === "PRESS LEFT") this.player.setState(states.MOVING_LEFT);
            else if (input === "PRESS RIGHT") this.player.setState(states.MOVING_RIGHT);
            else if (input === "PRESS DOWN") this.player.setState(states.SITTING_RIGHT);
            else if (input === "PRESS UP") this.player.setState(states.JUMPING_RIGHT);
        }
    }
}

export class JumpingLeft extends State {
    constructor(player) {
        super("JUMPING LEFT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 3;
        this.player.maxFrame = 6;
        if(ismobileDevice){
            if (this.player.onGround()) this.player.vy -= 20;
            this.player.speed = -this.player.maxSpeed * 0.2;
        }else{
            if (this.player.onGround()) this.player.vy -= 20;
            this.player.speed = -this.player.maxSpeed * 0.2;
        }
    }
    handleInput(input) {
        if(ismobileDevice){
            if (input === "SWIPE DOWN") this.player.setState(states.ROLLING_DOWN);
            else if (input === "SWIPE RIGHT") this.player.setState(states.JUMPING_RIGHT);
            else if (this.player.onGround()) this.player.setState(states.RUNNING_LEFT);
            else if (this.player.vy > 0) this.player.setState(states.FALLING_LEFT);
        }else{
            if (input === "PRESS ROLLING DOWN") this.player.setState(states.ROLLING_DOWN);
            else if (input === "PRESS RIGHT") this.player.setState(states.JUMPING_RIGHT);
            else if (this.player.onGround()) this.player.setState(states.RUNNING_LEFT);
            else if (this.player.vy > 0) this.player.setState(states.FALLING_LEFT);
        }
    }
}

export class JumpingRight extends State {
    constructor(player) {
        super("JUMPING RIGHT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 2;
        this.player.maxFrame = 6;
        if(ismobileDevice){
            if (this.player.onGround()) this.player.vy -= 20;
            this.player.speed = this.player.maxSpeed * 0.2;
        }else{
            if (this.player.onGround()) this.player.vy -= 40;
            this.player.speed = this.player.maxSpeed * 0.2;
        }
    }
    handleInput(input) {
        if(ismobileDevice){
            if (input === "SWIPE DOWN") this.player.setState(states.ROLLING_DOWN);
            else if (input === "SWIPE LEFT") this.player.setState(states.JUMPING_LEFT);
            else if (this.player.onGround()) this.player.setState(states.RUNNING_RIGHT);
            else if (this.player.vy > 0) this.player.setState(states.FALLING_RIGHT);
        }else{

            if (input === "PRESS ROLLING DOWN") this.player.setState(states.ROLLING_DOWN);
            else if (input === "PRESS LEFT") this.player.setState(states.JUMPING_LEFT);
            else if (this.player.onGround()) this.player.setState(states.RUNNING_RIGHT);
            else if (this.player.vy > 0) this.player.setState(states.FALLING_RIGHT);
        }
    }
}

export class FallingLeft extends State {
    constructor(player) {
        super("FALLING LEFT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 5;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        if(ismobileDevice){
            if (input === "SWIPE DOWN") this.player.setState(states.ROLLING_DOWN);
            else if (input === "SWIPE RIGHT") this.player.setState(states.FALLING_RIGHT);
            else if (this.player.onGround()) this.player.setState(states.RUNNING_RIGHT);
        }else{
            if (input === "PRESS ROLLING DOWN") this.player.setState(states.ROLLING_DOWN);
            else if (input === "PRESS RIGHT") this.player.setState(states.FALLING_RIGHT);
            else if (this.player.onGround()) this.player.setState(states.RUNNING_RIGHT);
        }
    }
}

export class FallingRight extends State {
    constructor(player) {
        super("FALLING RIGHT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 4;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        if(ismobileDevice){
            if (input === "SWIPE DOWN") this.player.setState(states.ROLLING_DOWN);
            else if (input === "SWIPE LEFT") this.player.setState(states.FALLING_LEFT);
            else if (this.player.onGround()) this.player.setState(states.RUNNING_RIGHT);
        }else{
            if (input === "PRESS ROLLING DOWN") this.player.setState(states.ROLLING_DOWN);
            else if (input === "PRESS LEFT") this.player.setState(states.FALLING_LEFT);
            else if (this.player.onGround()) this.player.setState(states.RUNNING_RIGHT);
        }
    }
}

export class RollingLeft extends State {
    constructor(player) {
        super("ROLLING LEFT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 11;
        this.player.maxFrame = 6;
        this.player.speed = -this.player.maxSpeed * 2;
    }
    handleInput(input) {
        if(ismobileDevice){
            
        }else{
            if (input === "PRESS RIGHT ROLLING") this.player.setState(states.ROLLING_RIGHT);
            else if (input === "RELEASE LEFT") this.player.setState(states.RUNNING_RIGHT);
            else if (input === "RELEASE RIGHT") this.player.setState(states.RUNNING_RIGHT);
        }
    }
}


export class RollingRight extends State {
    constructor(player) {
        super("ROLLING RIGHT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 10;
        this.player.maxFrame = 6;
        this.player.speed = this.player.maxSpeed * 2;
    }
    handleInput(input) {
        if(ismobileDevice){
            
        }else{
            
            if (input === "PRESS LEFT ROLLING") this.player.setState(states.ROLLING_LEFT);
            else if (input === "RELEASE LEFT") this.player.setState(states.RUNNING_RIGHT);
            else if (input === "RELEASE RIGHT") this.player.setState(states.RUNNING_RIGHT);
        }
    }
}

export class RollingDown extends State {
    constructor(player) {
        super("ROLLING DOWN");
        this.player = player;
    }
    enter() {
        this.player.frameY = 10;
        this.player.maxFrame = 6;
        this.player.speed = 0;
        this.player.vy += 20;
    }
    handleInput(input) {
        if(ismobileDevice){
            
        }else{

            if (input === "RELEASE DOWN") this.player.setState(states.RUNNING_RIGHT);
        }
    }
}

export class SittingLeft extends State {
    constructor(player) {
        super("SITTING LEFT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 9;
        this.player.speed = 0;
        this.player.maxFrame = 4;
    }
    handleInput(input) {
        if(ismobileDevice){
            
        }else{

            if (input === "PRESS RIGHT") this.player.setState(states.SITTING_RIGHT);
            else if (input === "RELEASE DOWN") this.player.setState(states.RUNNING_LEFT);
        }
    }
}

export class SittingRight extends State {
    constructor(player) {
        super("SITTING RIGHT");
        this.player = player;
    }
    enter() {
        this.player.frameY = 8;
        this.player.speed = 0;
        this.player.maxFrame = 4;
    }
    handleInput(input) {
        if(ismobileDevice){
            
        }else{

            if (input === "PRESS LEFT") this.player.setState(states.SITTING_LEFT);
            else if (input === "RELEASE DOWN") this.player.setState(states.RUNNING_RIGHT);
        }
    }
}
