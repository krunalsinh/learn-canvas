import { loadImage, fillRect } from "../common/common-functions.js";
import { Raven } from "./elements.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
let lastTime = 0;

let ravenImg = null, boomImg = null;
let ravens = [], timeToNextRaven = 0, ravenInterval = 500, ravenX = canvas.width, ravenSpriteWidth = 271, ravenSpriteHeight = 194;



await Promise.resolve(loadImage("./images/raven.png"))
.then(image => {
    ravenImg = image;
});

await Promise.resolve(loadImage("./images/boom.png"))
.then(image => {
    boomImg = image;
});



init();

// functions
function init() {
   
    
   
    animate(0);
}
function animate(timestamp) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

  
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    timeToNextRaven += deltaTime;

    if(timeToNextRaven > ravenInterval){
       
        let ravenDX = Math.random() * 5 + 3;
        let ravenDY = Math.random() * 5 - 2.5;
        let ravenY = Math.random() * (canvas.height - (ravenSpriteHeight / 2));
        
        ravens.push(new Raven(ctx,ravenImg, ravenSpriteWidth, ravenSpriteHeight, ravenX, ravenY, ravenDX, ravenDY));

        timeToNextRaven = 0;
    }
    
    [...ravens].forEach(raven => raven.update(deltaTime));
    ravens = ravens.filter(raven => !raven.markedForDeletion);

    console.log(ravens);
    

    requestAnimationFrame(animate)
}
//event


//export
export { canvas}