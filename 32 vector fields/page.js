import { FlowFieldEffect } from "./elements.js";

let canvas;
let ctx;
let flowField;
let flowFieldAnimation = {
    animation : null
}
const mouse = {
    x : 0,
    y: 0
}


window.onload = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height, flowFieldAnimation);
    flowField.animate(0);
}

window.addEventListener('resize', function(){
    this.cancelAnimationFrame(flowFieldAnimation.animation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height, flowFieldAnimation);
    flowField.animate(0);
})

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
})

export {mouse}