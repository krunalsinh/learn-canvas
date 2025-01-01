import ismobileDevice from "./checkMobile.js";
import { restartGame } from "./script.js";

export default class InputHandler{
    constructor(){
        this.lastKey = "";
        this.touchY = null;
        this.touchX = null;
        this.touchThreshhold = 30;

        if(ismobileDevice){
            window.addEventListener('touchstart', e => {
                this.touchY = e.changedTouches[0].pageY; 
                this.touchX = e.changedTouches[0].pageX; 
                
            })
            window.addEventListener('touchmove', e => {
                const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
                const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
                
                if(swipeDistanceY < -this.touchThreshhold) {
                    if(this.lastKey !== "SWIPE UP RIGHT" && swipeDistanceX >= 0){
                        this.lastKey = "SWIPE UP RIGHT";
                    }else if(this.lastKey !== "SWIPE UP LEFT" && swipeDistanceX < 0){
                        this.lastKey = "SWIPE UP LEFT";
                    }
                }
                else if(swipeDistanceY > this.touchThreshhold )  {
                    if(this.lastKey !== "SWIPE DOWN RIGHT" && swipeDistanceX >= 0){
                        this.lastKey = "SWIPE DOWN RIGHT";
                    }else if(this.lastKey !== "SWIPE DOWN LEFT" && swipeDistanceX < 0){
                        this.lastKey = "SWIPE DOWN LEFT";
                    }
                }
                else if(swipeDistanceX < -this.touchThreshhold) {
                    if(this.lastKey !== "SWIPE LEFT DOWN" && swipeDistanceY >= 0){
                        this.lastKey = "SWIPE LEFT DOWN";
                    }else if(this.lastKey !== "SWIPE LEFT UP" && swipeDistanceY < 0){
                        this.lastKey = "SWIPE LEFT UP";
                    }
                }
                else if(swipeDistanceX > this.touchThreshhold) {
                    if(this.lastKey !== "SWIPE RIGHT DOWN" && swipeDistanceY >= 0){
                        this.lastKey = "SWIPE RIGHT DOWN";
                    }else if(this.lastKey !== "SWIPE RIGHT UP" && swipeDistanceY < 0){
                        this.lastKey = "SWIPE RIGHT UP";
                    }
                }
                
            })
            window.addEventListener('touchend', e => {
                
                this.lastKey = "";
            })
        }else{
            window.addEventListener('keydown', (e) => {
                if (e.ctrlKey === true && e.key === "ArrowLeft"){
                    this.lastKey = "PRESS ROLLING LEFT";
                }
                else if (e.ctrlKey === true && e.key === "ArrowRight"){
                    this.lastKey = "PRESS ROLLING RIGHT";
                }
                else if (e.ctrlKey === true && e.key === "ArrowDown"){
                    this.lastKey = "PRESS ROLLING DOWN";
                }
                else if (e.key === "ArrowLeft"){
                    this.lastKey = "PRESS LEFT";
                }
                else if (e.key === "ArrowRight"){
                    this.lastKey = "PRESS RIGHT";
                }
                // else if (e.key === "ArrowDown"){
                //     this.lastKey = "PRESS DOWN";
                // }
                else if (e.key === "ArrowUp"){
                    this.lastKey = "PRESS UP";
                }
                else if (e.key === "Enter"){
                    restartGame();
                }
                
            })
            window.addEventListener('keyup', (e) => {
                // console.log(e.key);
                if (e.key === "ArrowLeft"){
                    this.lastKey = "RELEASE LEFT";
                }
                else if (e.key === "ArrowRight"){
                    this.lastKey = "RELEASE RIGHT";
                }
                else if (e.key === "ArrowDown"){
                    this.lastKey = "RELEASE DOWN";
                }
                else if (e.key === "ArrowUp"){
                    this.lastKey = "RELEASE UP";
                }
            })
        }
    }
}