import { addText } from "../common/common-functions.js";

export function drawStatusText(context, input, player) {
    addText(context, 10, 50, "20px", "Helvetica", "#fff", "Last input : "+input.lastKey, "left");
    addText(context, 10, 90, "20px", "Helvetica", "#fff", "Active State : "+player.currentState.state, "left");
    addText(context, 10, 130, "20px", "Helvetica", "#fff", "Player vy : "+player.vy, "left");
}

export function handleGameover(canvas, context, score = 0){
    addText(context, canvas.width * 0.5, canvas.height * 0.5, "40px", "Helvetica", "#000", "Game Over, Your score is: "+score, "center");
    addText(context, canvas.width * 0.5 + 3, canvas.height * 0.5 + 3, "40px", "Helvetica", "#fff", "Game Over, Your score is: "+score, "center");

}