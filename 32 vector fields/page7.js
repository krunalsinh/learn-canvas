import { drawCircle, drawLine } from "../common/common-functions.js";

let canvas;
let ctx;
let flowField;
let flowFieldAnimation = {
    animation : null
}

class Particle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        this.timer = 0;
        this.val = 0;
        this.val2 = 0;
    }
    update(deltatime){
        this.timer += deltatime;

        this.val = Math.sin(this.timer * 0.002 + this.x) * 30;
        this.val2 = Math.cos(this.timer * 0.002 + this.y) * 30;
        
    }
    draw(ctx){
        drawLine(ctx, this.x, this.y, this.x + this.val, this.y + this.val2, 1, this.color);
    }
}

window.onload = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    let particles = createParticles(canvas.height, canvas.width, 30);
    let timeToleave = 0;

   function animate(now) {
        let deltatime = now - timeToleave;
        timeToleave = now;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => particle.update(deltatime));
        particles.forEach(particle => particle.draw(ctx));
        requestAnimationFrame(animate); 
   }
   animate(0);
}

function createParticles(height, width, cellCount) {
    
    let findMax = Math.max(height, width);
    console.log(findMax);
    
    let cellSize = findMax / cellCount;
    let particleArr = [];

    for (let i = 0; i < findMax / cellSize; i++) {
       for (let j = 0; j < findMax / cellSize; j++) {
            particleArr.push(new Particle(i * cellSize, j * cellSize))
       }
    }
    return particleArr;
}




window.addEventListener('resize', e => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

