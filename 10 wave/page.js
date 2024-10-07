import dat from "./dat.gui.min.js";
// const gui = new dat.GUI();
console.log(dat);


// let value1 = 1;
// const cubeFolder = gui.addFolder('Cube')
// cubeFolder.add(value1, 'x', 0, Math.PI * 2)
// cubeFolder.add(value1, 'y', 0, Math.PI * 2)
// cubeFolder.add(value1, 'z', 0, Math.PI * 2)
// cubeFolder.open()

// let value2 = 1;
// const cameraFolder = gui.addFolder('Camera')
// cameraFolder.add(value2, 'z', 0, 10)
// cameraFolder.open()

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

const eleCount = 50;
const colors = ['red', 'green', 'blue', 'yellow'];
const arr = [];


ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);
for (let i = 0; i < canvas.width; i++) {
    ctx.lineTo(i, canvas.height / 2 + (Math.sin(i * 0.005) * 100));
}
ctx.lineWidth = 1;
ctx.strokeStyle = 'red';
ctx.stroke();
ctx.closePath();
// function animationFunc(){
//     fillRect(ctx, 0 , 0, innerWidth, innerHeight, '#000');
  
//     requestAnimationFrame(animationFunc);
// }

// animationFunc()