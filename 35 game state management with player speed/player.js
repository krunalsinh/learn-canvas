import { drawCircle, drawRectangle } from "../common/common-functions.js";
import ismobileDevice from "./checkMobile.js";
import { states, Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from "./state.js";
export default class Player {
    constructor(game) {
        this.game = game;

        console.log(this.game.groundMargin);
        
        
        // Define player states
        this.states = [
            new Sitting(this.game),
            new Running(this.game),
            new Jumping(this.game),
            new Falling(this.game),
            new Rolling(this.game),
            new Diving(this.game),
            new Hit(this.game)
        ];
        
        // Load player image
        this.image = document.getElementById("dogImage");
        if (!this.image) {
            throw new Error("Image element with id 'dogImage' not found");
        }
        
        // Player dimensions
        this.spriteSliceWidth = 6876/12;
        this.spriteSliceHeight = 5230/10;
        this.width = this.spriteSliceWidth / 5;
        this.height = this.spriteSliceHeight / 5;
        this.radius = Math.max(this.width * 0.5, this.height * 0.5);
        
        // Initial position
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height - this.height - this.game.groundMargin;
        
        // Animation properties
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 6;
        this.fps = 30;
        this.animationInterval = 1000 / this.fps;
        this.timer = 0;
        
        // Movement properties
        this.speed = 0;
        this.maxSpeed = 15;
        this.vy = 0;
        this.weight = 1;
        
        // Set initial state
        // this.currentState = this.states[states.SITTING];
        // this.currentState.enter();
        // this.setState(states.SITTING, 0);
    }

    // Draw player on canvas
    draw(ctx) {
        if(this.game.debug){

            drawRectangle(ctx, this.x, this.y, this.width, this.height, "white", true);
        }
        ctx.drawImage(
            this.image, 
            this.frameX * this.spriteSliceWidth, 
            this.frameY * this.spriteSliceHeight, 
            this.spriteSliceWidth, 
            this.spriteSliceHeight, 
            this.x, 
            this.y, 
            this.width, 
            this.height
        );
    }

    // Update player state
    update(input, deltaTime) {
        
        this.currentState.handleInput(input);
        // Additional update logic here
        this.x += this.speed;

        if(input.includes("ArrowRight")) this.speed = this.maxSpeed;
        else if(input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
        else this.speed = 0;

        if(this.x < 0) this.x = 0;
        else if(this.x + this.width > this.game.width) this.x = this.game.width - this.width;

        this.y += this.vy;
        if(!this.onGround()) {
            this.vy += this.weight;
        }else{
            this.vy = 0;
        }

        if(this.y + this.height > this.game.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;
        if(this.timer > this.animationInterval){

            if(this.frameX < this.maxFrame - 1) this.frameX++;
            else this.frameX = 0;

            this.timer = 0;
        }else{

            this.timer += deltaTime;
        }

    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.currentState.enter();
        this.game.speed = speed;
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;

    }
}