import ismobileDevice from "./checkMobile.js";

export default class InputHandler{
    constructor(game){
        this.game = game;
        this.keys = [];
        this.touchY = '';
        this.touchThreshold = 30;

        window.addEventListener('keydown', e => {
            if( (e.key === "ArrowDown" || 
                 e.key === "ArrowUp" || 
                 e.key === "ArrowLeft" || 
                 e.key === "ArrowRight" ||
                 e.key === "Enter"
            ) && !this.keys.includes(e.key)){
                this.keys.push(e.key);
            }
            // console.log(e.key, this.keys);
            
        });

        window.addEventListener('keyup', e => {
            if(e.key === "ArrowDown" || 
                e.key === "ArrowUp" || 
                e.key === "ArrowLeft" || 
                e.key === "ArrowRight" ||
                e.key === "Enter"){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            else if(e.key === "d") this.game.debug = !this.game.debug;
        });

        window.addEventListener('touchstart', e => {
            this.touchY = e.changedTouches[0].pageY;
        })

        window.addEventListener('touchmove', e => {
            const swipeDistance = e.changedTouches[0].pageY - this.touchY;
            if(swipeDistance < -this.touchThreshold && !this.keys.includes("swipe up")){
                this.keys.push("swipe up");
            }
            else if(swipeDistance > this.touchThreshold && !this.keys.includes("swipe down")){
                this.keys.push("swipe down");
            }
        })
        
        window.addEventListener('touchend', e => {
            // console.log(this.keys);
            this.keys.splice(this.keys.indexOf("swipe up"), 1);
            this.keys.splice(this.keys.indexOf("swipe down"), 1);
            
        })
    }
}