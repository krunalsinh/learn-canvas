import { fillRect } from '../common/common-functions.js';
import {Star, MiniStar} from './elements.js';

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

let stars = [];
let starCount = 1;
let miniStars = [];
let miniStarsCount = 7;
let backgroundStars = [];
let backgroundStarsCount = 300;
let lastIntervalTimestamp = 0;
const groundHeight = 100;
function init(){
    stars = [];
    miniStars = [];
    backgroundStars = [];
    for (let i = 0; i < starCount; i++) {
        const cord = addUpdatePosition();
        stars.push(new Star(ctx, cord.x, cord.y, 12,'#e3eaef'))
    }

    for (let i = 0; i < backgroundStarsCount; i++) {
        const cord = addUpdatePosition();
        const radius = Math.random() * 3;
        backgroundStars.push(new Star(ctx, cord.x, cord.y, radius,'white'))
    }
}

const backgroundGradient = ctx.createLinearGradient(0,0,0,canvas.height);
backgroundGradient.addColorStop(0, '#162029');
backgroundGradient.addColorStop(1, '#293b4d');

init();
animationFunc()
function animationFunc(now) {

    if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 2 * 600) {
        lastIntervalTimestamp = now;
        const cord = addUpdatePosition();
        stars.push(new Star(ctx, cord.x, 100, 12,'#e3eaef'));
    }

    // fillRect(ctx, 0, 0, innerWidth, innerHeight, backgroundGradient);
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    backgroundStars.forEach(star => star.draw());

    createMountainRanges(1, canvas.height - 50, "#384551");
    createMountainRanges(2, canvas.height - 100, "#283843");
    createMountainRanges(3, canvas.height - 300, "#26333E");

    createGround();
    stars.forEach((star,index) => {
        
        if(star.x + star.radius > canvas.width || star.x - star.radius < 0){
            star.velocity.x = -star.velocity.x;
            star.shatter();
        }

        if(checkOnScreen(star)){
            star.velocity.y = -star.velocity.y * star.friction;
            star.shatter();
        }else{
            star.velocity.y += star.gravity;
        }

        if(star.radius <= 3){
            stars.splice(index, 1);
        }

        star.animate()
    })

    miniStars.forEach( (miniStar,index) => {
        if(checkOnScreen(miniStar)){
            miniStar.velocity.y = -miniStar.velocity.y * miniStar.friction;
        }else{
            miniStar.velocity.y += miniStar.gravity;
        }
        if(miniStar.ttl < 1 ){
            miniStars.splice(index, 1);
        }
        miniStar.animate()
    })
    requestAnimationFrame(animationFunc);
}
function checkOnScreen(obj){
    return obj.y + obj.radius + obj.velocity.y > canvas.height - groundHeight;
}

function addUpdatePosition(obj){
    const x =  Math.max(50,Math.random() * (canvas.width - 50));
    const y = Math.max(50,Math.random() * (canvas.height - 50));
    if(obj){
        obj.x = x;
        obj.y = y;
    }else{
        return {x,y}
    }
}

Star.prototype.shatter = function(){
    this.radius -= 3;
    for (let i = 0; i < miniStarsCount; i++) {
        miniStars.push(new MiniStar(ctx, this.x, this.y, 2,'white'))
    }
}

function createMountainRanges(mountainAmount, height, color){
    const mountainWidth = canvas.width / mountainAmount;
    for (let i = 0; i < mountainAmount; i++) {
        
        ctx.beginPath();
        ctx.moveTo( i * mountainWidth, canvas.height);
        ctx.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
        ctx.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
        ctx.lineTo( i * mountainWidth - 325, canvas.height);
        ctx.fillStyle = color;
        ctx.fill();

    }
}


function createGround(){
    ctx.fillStyle = "#16212e"
    ctx.fillRect(0 , canvas.height - groundHeight , canvas.width, groundHeight);
}