export default class InputHandler{
    constructor(){
        this.lastKey = "";
        window.addEventListener('keydown', (e) => {
            
            if (e.ctrlKey === true && e.key === "ArrowLeft"){
                this.lastKey = "PRESS ROLLING LEFT";
            }
            else if (e.ctrlKey === true && e.key === "ArrowRight"){
                this.lastKey = "PRESS ROLLING RIGHT";
            }
            else if (e.ctrlKey === true && e.key === "ArrowDown"){
                this.lastKey = "PRESS ROLLING DOWN";
            }
            else if (e.key === "ArrowLeft"){
                this.lastKey = "PRESS LEFT";
            }
            else if (e.key === "ArrowRight"){
                this.lastKey = "PRESS RIGHT";
            }
            // else if (e.key === "ArrowDown"){
            //     this.lastKey = "PRESS DOWN";
            // }
            else if (e.key === "ArrowUp"){
                this.lastKey = "PRESS UP";
            }
            
        })
        window.addEventListener('keyup', (e) => {
            // console.log(e.key);
            if (e.key === "ArrowLeft"){
                this.lastKey = "RELEASE LEFT";
            }
            else if (e.key === "ArrowRight"){
                this.lastKey = "RELEASE RIGHT";
            }
            else if (e.key === "ArrowDown"){
                this.lastKey = "RELEASE DOWN";
            }
            else if (e.key === "ArrowUp"){
                this.lastKey = "RELEASE UP";
            }
        })
    }
}