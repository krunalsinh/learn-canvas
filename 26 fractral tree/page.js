
const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

const canvas = document.getElementById("canvas");
canvas.height = canvasHeight;
canvas.width = canvasWidth;
const ctx = canvas.getContext('2d');

init();

// functions
function init() {
    const x1 = canvas.width  - 300;
    const y1 = canvas.height * 0.95;

    drawTree1([x1,y1], 150, 0, 20);

    const x2 = 300;
    const y2 = canvas.height * 0.95;

    drawTree2([x2,y2], 150, 0, 20);
   
}

function drawTree1(start, len, angle, branchWidth){
    ctx.beginPath();
    ctx.save();
    ctx.lineWidth = branchWidth;
    ctx.translate(...start);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0,0);
    ctx.lineTo(0, -len);
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    if(len > 5){
        drawTree1([0, -len], len * 0.5, -35, branchWidth * 0.7)
        drawTree1([0, -len], len * 0.5, 35, branchWidth * 0.7)
        drawTree1([0, -len], len * 0.8, 0, branchWidth * 0.7)
    }
    ctx.restore();
}

function drawTree2(start, len, angle, branchWidth){
    ctx.beginPath();
    ctx.save();
    ctx.lineWidth = branchWidth;
    ctx.translate(...start);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0,0);
    ctx.lineTo(0, -len);
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    if(len > 5){
        drawTree2([0, -len], len * 0.7, -35, branchWidth * 0.7)
        drawTree2([0, -len], len * 0.7, 35, branchWidth * 0.7)
    }
    ctx.restore();
}



