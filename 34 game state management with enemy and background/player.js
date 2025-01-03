import { drawCircle } from "../common/common-functions.js";
import ismobileDevice from "./checkMobile.js";
import { ctx } from "./script.js";
import { states, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight, RollingLeft, RollingRight, MovingLeft, MovingRight, RollingDown } from "./state.js";
export default class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        

        // Define player states
        this.states = [
            new MovingLeft(this), 
            new MovingRight(this), 
            new SittingLeft(this), 
            new SittingRight(this),
            new RunningLeft(this),
            new RunningRight(this),
            new JumpingLeft(this),
            new JumpingRight(this),
            new FallingLeft(this),
            new FallingRight(this),
            new RollingLeft(this),
            new RollingRight(this),
            new RollingDown(this)
        ];
        
        // Load player image
        this.image = document.getElementById("dogImage");
        if (!this.image) {
            throw new Error("Image element with id 'dogImage' not found");
        }
        
        // Player dimensions
        this.spriteSliceWidth = 200;
        this.spriteSliceHeight = 181.83;
        this.width = this.spriteSliceWidth;
        this.height = this.spriteSliceHeight;
        
        // Initial position
        this.x = this.gameWidth / 2 - this.width / 2;
        this.y = this.gameHeight - this.height;
        
        // Animation properties
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 6;
        this.animationInterval = 1000 / 30;
        this.timer = 0;
        
        // Movement properties
        this.speed = 0;
        this.maxSpeed = 15;
        this.vy = 0;
        this.weight = 1;
        
        // Set initial state
        this.currentState = this.states[states.RUNNING_RIGHT];
        this.setState(states.RUNNING_RIGHT);

        this.radius = Math.max(this.width * 0.5, this.height * 0.5);
        
        if(ismobileDevice){
            console.log("player check mobile device : "+ ismobileDevice);
            
            this.width = this.spriteSliceWidth * 0.5;
            this.height =  this.spriteSliceHeight * 0.5;
            this.x = 0;
            this.radius = Math.max(this.width * 0.5, this.height * 0.5);
        }
        
    }

    // Draw player on canvas
    draw() {
        // drawCircle(ctx, this.x + this.width * 0.5, this.y + this.height * 0.5, this.radius, "red");
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

        if(this.x < 0) this.x = 0;
        else if(this.x + this.width > this.gameWidth) this.x = this.gameWidth - this.width;

        this.y += this.vy;
        if(!this.onGround()) {
            this.vy += this.weight;
        }else{
            this.vy = 0;
        }

        if(this.y + this.height > this.gameHeight) this.y = this.gameHeight - this.height;
        if(this.timer > this.animationInterval){

            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;

            this.timer = 0;
        }else{

            this.timer += deltaTime;
        }

    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    onGround(){
        return this.y >= this.gameHeight - this.height;
    }
    touschLeftEdage(){
        return this.x <= 0;
    }
    touschRightEdage(){
        return this.x + this.width >= this.gameWidth;
    }
}