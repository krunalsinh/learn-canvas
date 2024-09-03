import { fillRect, drawTriangle, drawCircle, drawStar } from '../common/common-functions.js';
import { circle } from "./elements.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const eleCount = 100;
const colors = ['#e5989b', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];
const arr = [];
const mouse = { x: innerWidth / 2, y: innerHeight / 2 , radius : 120};

generateBalls();
animationFunc();

function animationFunc() {
    fillRect(ctx, 0, 0, innerWidth, innerHeight, '#000');
    arr.forEach(e => {
        
        e.x += e.velocity.x;
        e.y += e.velocity.y;

        if (e.x + e.radius > innerWidth || e.x < e.radius) {
            e.velocity.x = -e.velocity.x;
        }

        if (e.y + e.radius > innerHeight || e.y < e.radius) {
            e.velocity.y = -e.velocity.y;
        }

        for (var i = 0; i < arr.length; i++) {
            if (getDistance(arr[i].x, arr[i].y, e.x, e.y) < arr[i].radius + e.radius) {
                resolveCollision(e, arr[i]);
            }
        }

        if(e.x < mouse.x + mouse.radius && e.x > mouse.x - mouse.radius && e.y < mouse.y + mouse.radius && e.y > mouse.y - mouse.radius){
            e.stroke = false;
            if(e.radius < e.maxRadius){
                e.radius += 2;
            }
          }else{
            e.stroke = true;
            if(e.radius > e.minRadius){
                e.radius -= 1;
            }
          }

        e.draw();
    });
    requestAnimationFrame(animationFunc);
}

function generateBalls() {
    for (let i = 0; i < eleCount; i++) {
        const radius = Math.random() * 3 + 10;
        let randX = (Math.random() * (innerWidth - radius * 2)) + radius * 2;
        let randY = (Math.random() * (innerHeight - radius * 2)) + radius * 2;
        const color = colors[Math.floor(Math.random() * (colors.length - 1))];

        for (let j = 0; j < arr.length; j++) {
            if (getDistance(arr[j].x, arr[j].y, randX, randY) < arr[j].radius + radius) {
                randX = (Math.random() * (innerWidth - radius * 2)) + radius * 2;
                randY = (Math.random() * (innerHeight - radius * 2)) + radius * 2;
                j = -1;
            }
        }
        arr.push(new circle(ctx, randX, randY, radius, color));
    }
}

function getDistance(x1, y1, x2, y2) {
    var xdist = x2 - x1;
    var ydist = y2 - y1;
    return Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));
}


window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}