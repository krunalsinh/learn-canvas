import { drawCircle } from "../common/common-functions.js";

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
class Particle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.radius = 5;
        this.baseRadius = 5;
        this.color = '#666';
        this.timer = 0;
        this.val = 0;
        this.val2 = 0;
    }
    update(deltatime){

        this.timer += deltatime;

        this.val = (Math.cos(this.x * (this.timer * 0.000005))  *  Math.sin(this.y * (this.timer * 0.000005) )) * 2 ;
        // console.log(this.val);
        // this.x = this.baseX + 100 * Math.sin(this.timer * 0.001);
        // this.y = this.baseY + 100 * Math.cos(this.timer * 0.001);
        this.radius = this.baseRadius + this.val;
        

        // console.log(deltatime);
        
    }
    draw(ctx){
        drawCircle(ctx, this.x, this.y, this.radius, this.color);
    }
}

window.onload = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    let particles = createParticles(canvas.height, canvas.width, 50);
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

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
})

export {mouse}