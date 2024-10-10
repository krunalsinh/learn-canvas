import { fillRect } from '../common/common-functions.js';

let data = { 
    'frequency': 0.001, 
    'wavelength': 253, 
    'speed1': 0.008, 
    'speed2': 0.005, 
    'speed3': 0.0108, 
    'opacity': 0.042, 
    'color1': '#2a9d8f', 
    'color2': '#e9c46a', 
    'color3': '#f4a261' 
};

let gui = new dat.GUI();
gui.add(data, 'frequency', 0.001, 0.099);
gui.add(data, 'wavelength', 10, 500);
gui.add(data, 'speed1', 0.001, 0.5);
gui.add(data, 'speed2', 0.001, 0.5);
gui.add(data, 'speed3', 0.001, 0.5);
gui.add(data, 'opacity', 0.001, 1);
gui.addColor(data, 'color1', 0.001, 1);
gui.addColor(data, 'color2', 0.001, 1);
gui.addColor(data, 'color3', 0.001, 1);


const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

let temp1 = 1, temp2 = 1, temp3 = 1;

function animationFunc() {
    temp1 += data.speed1;
    temp2 += data.speed2;
    temp3 += data.speed3;
    fillRect(ctx, 0, 0, innerWidth, innerHeight, `rgba(0,0,0,${data.opacity})`);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, canvas.height / 2 + (Math.sin(i * data.frequency + temp1) * data.wavelength * Math.sin(temp1)));
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = data.color1;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, canvas.height / 2 + (Math.sin(i * data.frequency + temp2) * -data.wavelength * Math.sin(temp2)));
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = data.color2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, canvas.height / 2 + (Math.sin(i * data.frequency + temp3) * -data.wavelength * Math.sin(temp3)));
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = data.color3;
    ctx.stroke();
    ctx.closePath();

    requestAnimationFrame(animationFunc);
}

animationFunc()