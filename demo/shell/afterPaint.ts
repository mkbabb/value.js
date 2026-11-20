/**
 * Runs `run` in a task after the next frame has painted: a frame callback
 * posts a message, and the message's task follows that frame's paint (the
 * boot's own yield, App.vue). The FORTIETH order, B-2: a press is answered on
 * its own frame and the work it starts runs after that frame is on screen.
 */
export function afterPaint(run: () => void): void {
    requestAnimationFrame(() => {
        const { port1, port2 } = new MessageChannel();
        port1.onmessage = () => {
            port1.close();
            run();
        };
        port2.postMessage(null);
    });
}
