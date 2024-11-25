import { drawCircle } from "../common/common-functions.js";

class Particle {
    constructor(ctx, x, y, size, color, initX, initY) {
        this.ctx = ctx;
        this.baseX = x;
        this.baseY = y;
        this.x = initX;
        this.y = initY;
        this.initX = initX;
        this.initY = initY;
        this.size = size;
        this.color = color;
        this.dencity = Math.random() * 30 + 1;
        this.initAnim = true;
    }
    update(mouse) {

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        let forceDirX = dx / dist;
        let forceDirY = dy / dist;
        let maxDist = mouse.radius;

        let force = (maxDist - dist) / maxDist

        let dirX = forceDirX * force * this.dencity;
        let dirY = forceDirY * force * this.dencity;

        if (!this.initAnim) {

            if (dist < maxDist) {
                this.x -= dirX;
                this.y -= dirY;
            } else {

                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }

                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }

        } else {
            if (this.baseX !== this.initX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }

            if (this.baseY !== this.initY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
            if (
                (Math.floor(this.baseX) - Math.floor(this.x) <= 1 &&
                    Math.floor(this.baseX) - Math.floor(this.x) >= -1) &&
                (Math.floor(this.baseY) - Math.floor(this.y) <= 1 &&
                    Math.floor(this.baseY) - Math.floor(this.y) >= -1)
            ) {
                this.initAnim = false;
            }
        }


        this.draw();
    }
    draw() {
        drawCircle(this.ctx, this.x, this.y, this.size, this.color);
    }
}

export { Particle }