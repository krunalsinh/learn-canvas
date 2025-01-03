import { addText } from "../common/common-functions.js";
import ismobileDevice from "./checkMobile.js";
import score from "./score.js";
import { ctx } from "./script.js";

export function drawStatusText( input, player) {
    let baseY = 50, fontSize = "20px", lineGap = 40;
    if(ismobileDevice){
        baseY = 30, fontSize = "15px", lineGap = 20;
    }
    addText(ctx, 10, baseY + lineGap * 0, fontSize, "Helvetica", "#fff", "Last input : "+input.lastKey, "left");
    addText(ctx, 10, baseY + lineGap * 1, fontSize, "Helvetica", "#fff", "Active State : "+player.currentState.state, "left");
    addText(ctx, 10, baseY + lineGap * 2, fontSize, "Helvetica", "#fff", "Player vy : "+player.vy, "left");
    addText(ctx, 10, baseY + lineGap * 3, fontSize, "Helvetica", "#fff", "Score : "+score.score, "left");
}

export function handleGameover(canvas){
    if(ismobileDevice){
        let shadowGap = 1, lineGap = 30, fontSize = "20px";
        addText(ctx, canvas.width * 0.5, canvas.height * 0.5, fontSize, "Helvetica", "#000", "Game Over, Your score is: "+score.score, "center");
        addText(ctx, canvas.width * 0.5 + shadowGap, canvas.height * 0.5 + shadowGap, fontSize, "Helvetica", "#fff", "Game Over, Your score is: "+score.score, "center");
        
        addText(ctx, canvas.width * 0.5, canvas.height * 0.5 + lineGap, fontSize, "Helvetica", "#000", "Long swipe left to right for restart the game.", "center");
        addText(ctx, canvas.width * 0.5 + shadowGap, canvas.height * 0.5 + shadowGap + lineGap, fontSize, "Helvetica", "#fff", "Long swipe left to right for restart the game.", "center");
    }else{
        let shadowGap = 3, lineGap = 50, fontSize = "40px";
        addText(ctx, canvas.width * 0.5, canvas.height * 0.5, fontSize, "Helvetica", "#000", "Game Over, Your score is: "+score.score, "center");
        addText(ctx, canvas.width * 0.5 + shadowGap, canvas.height * 0.5 + shadowGap, fontSize, "Helvetica", "#fff", "Game Over, Your score is: "+score.score, "center");
        
        addText(ctx, canvas.width * 0.5, canvas.height * 0.5 + lineGap, fontSize, "Helvetica", "#000", "Please press Enter for restart the game.", "center");
        addText(ctx, canvas.width * 0.5 + shadowGap, canvas.height * 0.5 + shadowGap + lineGap, fontSize, "Helvetica", "#fff", "Please press Enter for restart the game.", "center");
    }

}

export function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }