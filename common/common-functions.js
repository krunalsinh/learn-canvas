// drawRectangle(ctx, 100, 100, 400, 500, 'red');
// drawRectangle(ctx);
// drawCircle(ctx, 100, 100, 100,  'blue');
// drawCircle(ctx);
// drawLine(ctx,10,10,500,500, 3, 'red');
//addText(ctx, 100, 100, "200px", 'sans-serif', 'red', 'Loream Ipsum');

function drawRectangle(context, x = 0, y = 0 , width = 50, height = 50, color = "#666"){
    context.beginPath();
    context.rect( x, y, width, height);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function drawCircle(context, x = 0, y = 0, radius = 50, color = "#666", stroke = false, strokeSize = 1){
    context.beginPath();
    context.arc(x , y , radius, 0, Math.PI * 2, false);
    if(!stroke){
        context.fillStyle = color;
        context.fill();
    }else{
        context.strokeStyle = color;
        context.lineWidth = strokeSize;
        context.stroke();
    }
    context.closePath();
}

function drawLine(context, x1 = 0, y1 = 0 , x2 = 0, y2 = 0, strokeWidth = 1, color = "#666"){
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = strokeWidth;
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
}

function addText(context,x,y, fontSize = '10px', fontFamily = "sans-serif", color = "#666", text = ""){
    context.font = `${fontSize}  ${fontFamily}`;
    context.fillStyle = color;
    context.fillText(text, x, y);
}

function fillRect(context, x = 0, y = 0 , width = 50, height = 50, color = "#666"){
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(x, y, width, height)
    context.closePath();
}


function drawTriangle(context, x = 0, y = 0, radius = 50, color = "#666"){
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + radius * 2, y + radius * 2);
    context.lineTo(x , y + radius * 2);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}
function drawStar(context, x = 0, y = 0, radius = 50, color = "#666"){
    const l = radius * 2; 
    context.beginPath();
    context.moveTo(x + l * 0.5 , y );
    context.lineTo(x + l * 0.64, y + l * 0.34 );
    context.lineTo(x + l , y + l * 0.37 );
    context.lineTo(x + l * 0.72, y + l * 0.61 );
    context.lineTo(x + l * 0.80, y + l );
    context.lineTo(x + l * 0.50, y + l * 0.77 );
    context.lineTo(x + l * 0.19, y + l );
    context.lineTo(x + l * 0.27, y + l * 0.61 );
    context.lineTo(x , y + l * 0.37 );
    context.lineTo(x + l * 0.36, y + l * 0.34 );
    
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function getDistance(x1, y1, x2, y2) {
    const xdist = x2 - x1;
    const ydist = y2 - y1;
    return Math.hypot(xdist, ydist);
}

function moveTo(x1, y1, x2, y2, speed) {
    const calc = (Math.atan2(y2 - y1, x2 - x1) / Math.PI * 180) * Math.PI / 180;
    return {
        x: speed * Math.cos(calc),
        y: speed * Math.sin(calc)
    };
}

export {drawRectangle, drawCircle, drawTriangle, drawStar, drawLine, addText, fillRect ,getDistance, moveTo };