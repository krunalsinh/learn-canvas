import { drawRectangle } from "../common/common-functions.js";

var canvas = document.getElementById('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
var card = document.getElementById('appCard1');
var cardBtn = document.getElementById('appCard1Btn');
var ctx = canvas.getContext('2d');


appCard1Btn.addEventListener('click', function () {
  drawHTMLOnCanvas(card, ctx, 320, 180, "style1");
});

function drawHTMLOnCanvas(element, ctx, width, height, styleId) {
  // console.log(element.getBoundingClientRect());
  const eleData = element.getBoundingClientRect();
  const xPos = eleData.x;
  const yPos = eleData.y;
  // console.log(xPos, yPos);    


  const html = element.outerHTML;

  // Get all styles from the document's stylesheets
  let styles = "";
  if (styleId) {
    const sheet = document.getElementById(styleId);
    try { // Handle cross-origin stylesheets
      for (const rule of sheet.sheet.cssRules) {
        styles += rule.cssText;
      }
    } catch (e) {
      console.warn("Cannot access cross-origin stylesheet:", sheet.href);
    }
  } else {
    for (const sheet of document.styleSheets) {
      try { // Handle cross-origin stylesheets
        for (const rule of sheet.cssRules) {
          styles += rule.cssText;
        }
      } catch (e) {
        console.warn("Cannot access cross-origin stylesheet:", sheet.href);
      }
    }
  }
  // console.log(styles);

  const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <style>
          ${styles}
        </style>
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${html}
          </div>
        </foreignObject>
      </svg>
    `;

  const img = new Image();
  img.onload = () => {
    const cellCount = 30;
    const xColCell = width / cellCount;
    const yRowCell = height / cellCount;
    let cells = [];
    for (let yIndex = 0; yIndex < cellCount; yIndex++) {
      for (let xIndex = 0; xIndex < cellCount; xIndex++) {
        cells.push(new CanvasImgCell(
          xPos + (xIndex * xColCell),
          yPos + (yIndex * yRowCell),
          img,
          xColCell,
          yRowCell,
          xIndex,
          yIndex));
      }

    }
    card.style.display = 'none';

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cells.forEach(cell => {
        cell.update();
        cell.draw(ctx);
        cells = cells.filter(cell => !cell.markForDeletion);
      });
      // console.log(cells.length);
      
      requestAnimationFrame(animate);
    }

    animate();
   


  };
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function drawSimpleHTMLOnCanvas1(element, ctx, x, y) {
  document.body.appendChild(element)
  applyStyles(element)
  document.body.removeChild(element)

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = element.offsetWidth;
  tempCanvas.height = element.offsetHeight;
  const tempCtx = tempCanvas.getContext('2d');

  // Important: Add the element to the DOM (even if temporarily)
  document.body.appendChild(element);
  tempCtx.drawImage(element, 0, 0); // Draw the element onto the temporary canvas
  document.body.removeChild(element); // Remove it after drawing

  ctx.drawImage(tempCanvas, x, y);
}

function applyStyles(element) {
  if (!element || !element.style) return; // Check if element or style exists

  const computedStyle = window.getComputedStyle(element);
  if (!computedStyle) return; // Check if computed style exists

  for (const prop of computedStyle) {
    try {
      element.style[prop] = computedStyle.getPropertyValue(prop);
    } catch (e) {
      // Handle potential errors (e.g., setting read-only properties)
      console.warn(`Error setting style property ${prop}:`, e);
    }
  }

  // Recursively apply styles to child elements
  for (const child of element.children) {
    applyStyles(child);
  }
}

function getHTML(who, deep) {
  if (!who || !who.tagName) return '';
  var txt, ax, el = document.createElement("div");
  el.appendChild(who.cloneNode(false));
  txt = el.innerHTML;
  if (deep) {
    ax = txt.indexOf('>') + 1;
    txt = txt.substring(0, ax) + who.innerHTML + txt.substring(ax);
  }
  el = null;
  return txt;
}
class CanvasImgCell {
  constructor(x, y, img, cellSizeX, cellSizeY, xIndex, yIndex) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.dx = -Math.random() * 8 + 4;
    this.dy = -Math.random() * 8 - 4;
    this.alpha = 1;
    this.cellSizeX = cellSizeX;
    this.cellSizeY = cellSizeY;
    this.yIndex = yIndex;
    this.xIndex = xIndex;
    this.randomOpDecSpeed = Math.random() * 0.05 + 0.01;
    this.markForDeletion = false;
  }

  update() {
    this.dx *= 1.01;
    this.dy *= 1.01;
    if (this.alpha >= 0.10) {
      this.alpha -= this.randomOpDecSpeed;
    }else{
      this.alpha = 0;
      this.markForDeletion = true;
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(this.img,
      this.xIndex * this.cellSizeX,
      this.yIndex * this.cellSizeY,
      this.cellSizeX,
      this.cellSizeY,
      this.x,
      this.y,
      this.cellSizeX,
      this.cellSizeY
    );
    ctx.restore();
  }
}


