
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// functions
function init() {
    
    
    
    animate();
}


function animate() {
   
    requestAnimationFrame(animate)
}


//event


//export
export { canvas }