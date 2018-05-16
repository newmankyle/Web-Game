

export class MousePos {
    constructor(currentCanvas) {
        this.x = 50;
        this.y = 50;
        this.easing = 0.050;
        this.started = false;
        this.canvas = currentCanvas;
    }
    updateMousePos(e) {
        const coord = getMousePos(this.canvas, e);
        this.x = coord.x;
        this.y = coord.y;
    }
    setStarted(e, evil) {
        if (!this.started) {
            const coord = getMousePos(this.canvas, e);
            evil.x = coord.x;
            evil.y = coord.y;
        }
        this.started = true;
    }
    isStarted(e) {
        return this.started;
    }

}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}