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

function drawCircle(context, x = 0, y = 0, radius = 50, color = "#666"){
    context.beginPath();
    context.arc(x , y , radius, 0, Math.PI * 2, false);
    context.fillStyle = color;
    context.fill();
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

export {drawRectangle, drawCircle, drawTriangle, drawLine, addText, fillRect };