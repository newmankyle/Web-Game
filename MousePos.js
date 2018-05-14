

export class MousePos {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.easing = 0.050;
        this.started = false;
    }
    updateMousePos(e, canvas) {
        const coord = getMousePos(canvas, e);
        this.x = coord.x;
        this.y = coord.y;
    }
    setStarted(e, canvas, evil) {
        if (!this.started) {
            const coord = getMousePos(canvas, e);
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