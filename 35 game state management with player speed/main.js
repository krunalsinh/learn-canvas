let ctx;

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;

    class Game {
        constructor() {

        }
    }
});

export { ctx };