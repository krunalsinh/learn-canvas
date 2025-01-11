import { drawRectangle } from "../common/common-functions.js";

// var canvas = document.getElementById('canvas');
// canvas.width = innerWidth;
// canvas.height = innerHeight;
var card = document.getElementById('appCard1');
var cardBtn = document.getElementById('appCard1Btn');

const deleteParticleBtns = document.querySelectorAll("[particleDeleteBtn]");
deleteParticleBtns.forEach(btn => {
  btn.addEventListener("click", btnE => {
    const targetId = btnE.currentTarget.getAttribute("targetId");
    console.log(targetId);
    
    drawHTMLOnCanvas(targetId);
  });
});

function drawHTMLOnCanvas(elementId) {
  let canvas = document.getElementById("deleteParticleEffectCanvas");
  if(!canvas){
    canvas = document.createElement("canvas");
    canvas.id = "deleteParticleEffectCanvas";
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.style.cssText = "position: fixed; left: 0; top: 0; height: 100vh; width: 100vw; z-index: 1000; pointer-events: none;";
    document.body.appendChild(canvas);
  }
  
  let ctx = canvas.getContext('2d');
  

  // const canvas = document.createElement("canvas");
  const element = document.getElementById(elementId);
  const eleData = element.getBoundingClientRect();
  console.log(eleData);
  
  const xPos = eleData.x;
  const yPos = eleData.y;
  html2canvas(element).then(htmCanvas => {
    const img = new Image();
    img.onload = () => {
      const cellCount = 30;
      const xColCell = eleData.width / cellCount;
      const yRowCell = eleData.height / cellCount;
      let cells = [], cellAnimation;
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
      element.style.opacity = 0;


      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        cells.forEach(cell => {
          cell.update();
          cell.draw(ctx);
          cells = cells.filter(cell => !cell.markForDeletion);
        });
        if(cells.length > 0){
          cellAnimation = requestAnimationFrame(animate);
        }else{
          element.style.display = "none";
          cancelAnimationFrame(cellAnimation);
        }
      }
      animate();
    };
    img.src = htmCanvas.toDataURL();
  });
}
//------------------------------------------------------------


class CanvasImgCell {
  constructor(x, y, img, cellSizeX, cellSizeY, xIndex, yIndex) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.img = img;
    this.dx = -Math.random() * 2 + 1;
    this.dy = -Math.random() * 2 - 1;
    this.alpha = 1;
    this.cellSizeX = cellSizeX;
    this.cellSizeY = cellSizeY;
    this.yIndex = yIndex;
    this.xIndex = xIndex;
    this.randomOpDecSpeed = Math.random() * 0.05 + 0.01;
    this.randomOpDecSpeed1 = Math.random() * 0.05;
    this.markForDeletion = false;
    this.counter = 0;
  }

  update() {
   
    if (this.alpha >= 0.10) {
      this.alpha -= this.randomOpDecSpeed;
    }else{
      this.alpha = 0;
      this.markForDeletion = true;
    }

    this.baseX += this.dx;
    this.x = this.baseX + Math.sin(this.counter) * 5;
    this.y += this.dy;
    
    this.counter += this.randomOpDecSpeed1;
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


