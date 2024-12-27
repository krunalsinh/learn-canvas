export default class InputHandler{
    constructor(){
        this.lastKey = "";
        window.addEventListener('keydown', (e) => {
            // console.log(e.key);
            switch(e.key){
                case "ArrowLeft":
                    this.lastKey = "Press ArrowLeft";
                    break;
                case "ArrowRight":
                    this.lastKey = "Press ArrowRight";
                    break;
            }
        })
        window.addEventListener('keyup', (e) => {
            // console.log(e.key);
            switch(e.key){
                case "ArrowLeft":
                    this.lastKey = "Release ArrowLeft";
                    break;
                case "ArrowRight":
                    this.lastKey = "Release ArrowRight";
                    break;
            }
        })
    }
}