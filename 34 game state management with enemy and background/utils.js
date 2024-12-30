import { addText } from "../common/common-functions.js";

export function drawStatusText(context, input, player) {
    addText(context, 10, 50, "20px", "Helvetica", "#fff", "Last input : "+input.lastKey, "left");
    addText(context, 10, 90, "20px", "Helvetica", "#fff", "Active State : "+player.currentState.state, "left");
    addText(context, 10, 130, "20px", "Helvetica", "#fff", "Player vy : "+player.vy, "left");
}