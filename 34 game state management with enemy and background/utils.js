import { addText } from "../common/common-functions.js";
import score from "./score.js";
import { ctx } from "./script.js";

export function drawStatusText( input, player) {
    addText(ctx, 10, 50, "20px", "Helvetica", "#fff", "Last input : "+input.lastKey, "left");
    addText(ctx, 10, 90, "20px", "Helvetica", "#fff", "Active State : "+player.currentState.state, "left");
    addText(ctx, 10, 130, "20px", "Helvetica", "#fff", "Player vy : "+player.vy, "left");
    addText(ctx, 10, 170, "20px", "Helvetica", "#fff", "Score : "+score.score, "left");
}

export function handleGameover(canvas){
    addText(ctx, canvas.width * 0.5, canvas.height * 0.5, "40px", "Helvetica", "#000", "Game Over, Your score is: "+score.score, "center");
    addText(ctx, canvas.width * 0.5 + 3, canvas.height * 0.5 + 3, "40px", "Helvetica", "#fff", "Game Over, Your score is: "+score.score, "center");

}