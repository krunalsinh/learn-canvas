import { fillRect } from '../common/common-functions.js';


const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerWidth;

let data = { 
    'y': canvas.height / 2,
    'wavelength': 0.01, 
    'frequency': 0.01, 
    'amplitude': 100,
    'color1': '#2a9d8f', 
    'color2': '#e9c46a', 
    'color3': '#f4a261' 
};

let strokeColor = {
    h : 255,
    s : 50,
    l : 50,
}

let backgroundColor = {
    r : 0,
    g : 0,
    b : 0,
    a : 1}

let gui = new dat.GUI();
let waveFolder = gui.addFolder('wave');
waveFolder.add(data, 'amplitude', 70, 150);
waveFolder.add(data, 'wavelength', 0.001, 0.08);
waveFolder.open();

let strokeColorFolder = gui.addFolder('strokeColor');
strokeColorFolder.add(strokeColor, 'h', 0, 255);
strokeColorFolder.add(strokeColor, 's', 0, 100);
strokeColorFolder.add(strokeColor, 'l', 0, 100);
strokeColorFolder.open();


let backgroundColorFolder = gui.addFolder('backgroundColor');
backgroundColorFolder.add(backgroundColor, 'r', 0, 255);
backgroundColorFolder.add(backgroundColor, 'g', 0, 255);
backgroundColorFolder.add(backgroundColor, 'b', 0, 255);
backgroundColorFolder.add(backgroundColor, 'a', 0.01, 1.0);
backgroundColorFolder.open();



let increment = data.frequency;

function animationFunc() {
    
    fillRect(ctx, 0, 0, innerWidth, innerHeight, `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, data.y + Math.sin(i * data.wavelength + increment) * data.amplitude * Math.sin(increment));
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = `hsl(${strokeColor.h}, ${strokeColor.s}%, ${strokeColor.l}%)`;
    ctx.stroke();
    ctx.closePath();

    increment += data.frequency;

    requestAnimationFrame(animationFunc);
}

animationFunc()