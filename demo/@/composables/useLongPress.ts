/**
 * Lightweight long-press helper for touch devices.
 * Returns a factory that creates per-element pointer handlers.
 *
 * On desktop (mouse), does nothing — lets shift+click work normally.
 * On touch, fires `onLongPress(context)` after holding for `duration` ms
 * and sets a flag so the follow-up click can be suppressed.
 */
export interface LongPressFactory<T> {
    /** Create handlers for a specific context (e.g., swatch index) */
    bind: (context: T) => {
        onPointerdown: (e: PointerEvent) => void;
        onPointermove: (e: PointerEvent) => void;
        onPointerup: () => void;
        onPointercancel: () => void;
    };
    /** Check and reset the long-press flag (call at top of click handler) */
    consume: () => boolean;
}

export function createLongPress<T>(
    onLongPress: (context: T) => void,
    duration = 400,
): LongPressFactory<T> {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let startX = 0;
    let startY = 0;
    let fired = false;

    function clear() {
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
    }

    function bind(context: T) {
        return {
            onPointerdown(e: PointerEvent) {
                if (e.pointerType !== "touch") return;
                fired = false;
                startX = e.clientX;
                startY = e.clientY;
                clear();
                timer = setTimeout(() => {
                    fired = true;
                    onLongPress(context);
                    if (navigator.vibrate) navigator.vibrate(30);
                }, duration);
            },
            onPointermove(e: PointerEvent) {
                if (timer === null) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                if (dx * dx + dy * dy > 100) clear();
            },
            onPointerup() { clear(); },
            onPointercancel() { clear(); fired = false; },
        };
    }

    function consume(): boolean {
        if (fired) { fired = false; return true; }
        return false;
    }

    return { bind, consume };
}
