import { addText, getDistance, fillRect } from "../common/common-functions.js";
import { Particle, Box } from "./elements.js";

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

const canvas = document.getElementById("canvas");
canvas.height = canvasHeight;
canvas.width = canvasWidth;
const ctx = canvas.getContext('2d');

const particlesArr = [], boxArr = [], box = new Box(ctx, canvas.width / 2 - 100, canvas.height/2, 100, 200);

gameInit();
animationFunc();

// functions
function gameInit() {
    for (let i = 0; i < 600; i++) {
        let size = 3;
        particlesArr.push(new Particle(ctx, Math.random() * canvas.width * 2,  Math.random() * canvas.height , size))
    }
    for (let i = 0; i < 3; i++) {
        boxArr.push(new Box(ctx, 400 * i, canvas.height/2, 100, 200))
    }
}

function animationFunc() {
    fillRect(ctx, 0 , 0, innerWidth, innerHeight, 'rgba(0,0,0,0.05)');

    particlesArr.forEach(particle => {
        
        particle.update();

        if(particle.x + particle.size < 0 || particle.y  > canvas.height){
            let size = Math.random() * 10 + 1;
            particle.x = Math.random() * canvas.width * 2;
            particle.y = 0 - size;
            particle.weight = Math.random() * 1 + 1;;
        }

        boxArr.forEach(box => {
            if(particle.x < box.x + box.width &&
                particle.x + particle.size > box.x &&
                particle.y < box.y + box.height &&
                particle.y + particle.size > box.y
            ){
                particle.y -= 3;
                particle.weight *= -0.5;
            }
        })

        
    });



    boxArr.forEach(box => {
        box.update();

        if(box.x > canvas.width){
            box.x = 0 - box.width;
        }
    })
   
    requestAnimationFrame(animationFunc);
}


