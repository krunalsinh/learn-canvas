import { fillRect } from '../common/common-functions.js';
import {Circle} from './elements.js';

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;
const mouse = {x : canvas.width / 2 , y : canvas.height / 2}
const particles = [];
const particlesCount = 400;
const angle = (Math.PI * 2) / particlesCount;

animationFunc()

function animationFunc(now) {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        if(particle.opacity > 0.1 ){
            particle.animate();
        }else{
            particles.splice(1,index);
        }
    })

    requestAnimationFrame(animationFunc);
}

function generateParticles(){
    for (let i = 0; i < particlesCount; i++) {
        const color = `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`;
        particles.push(new Circle(ctx, mouse.x, mouse.y, 3, color, angle, i));
    }
}

addEventListener('click',event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    generateParticles();

    console.log(particles);
    
})
