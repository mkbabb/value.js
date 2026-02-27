import { ref, onUnmounted } from "vue";

/**
 * Per-control tap-to-activate pattern for mobile touch.
 *
 * - Desktop (no `ontouchstart`): always returns `true` — no gating.
 * - Mobile first touch: sets `isActive = true`, returns `false` (allows scroll).
 * - Mobile subsequent touch: returns `true`, caller should `preventDefault()`.
 * - After `deactivateDelayMs` of no touch, deactivates.
 * - Tapping outside the control deactivates (global `touchstart` listener).
 */
export function useTouchGate(deactivateDelayMs = 3000) {
    const isActive = ref(false);
    const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

    let deactivateTimer: ReturnType<typeof setTimeout> | null = null;
    let controlEl: HTMLElement | null = null;

    function clearTimer() {
        if (deactivateTimer !== null) {
            clearTimeout(deactivateTimer);
            deactivateTimer = null;
        }
    }

    function resetTimer() {
        clearTimer();
        deactivateTimer = setTimeout(() => {
            isActive.value = false;
        }, deactivateDelayMs);
    }

    /**
     * Call on touchstart of the gated control.
     * Returns `true` if the event should be processed (color change allowed),
     * `false` if it's the activation tap (scroll allowed).
     */
    function handleTouchStart(el: HTMLElement): boolean {
        if (!isTouchDevice) return true;

        controlEl = el;

        if (!isActive.value) {
            isActive.value = true;
            // Block scrolling on subsequent touches over this control
            el.style.touchAction = "none";
            resetTimer();
            return false; // activation tap — don't process, allow scroll
        }

        resetTimer();
        return true; // already active — process the interaction
    }

    function handleTouchMove(): boolean {
        if (!isTouchDevice) return true;
        if (!isActive.value) return false;
        resetTimer();
        return true;
    }

    function handleTouchEnd(): void {
        if (!isTouchDevice) return;
        resetTimer();
    }

    function deactivate() {
        clearTimer();
        isActive.value = false;
        if (controlEl) {
            controlEl.style.touchAction = "";
            controlEl = null;
        }
    }

    // Global listener: tap outside the control deactivates
    function onGlobalTouchStart(e: TouchEvent) {
        if (!isActive.value || !controlEl) return;
        if (!controlEl.contains(e.target as Node)) {
            deactivate();
        }
    }

    if (isTouchDevice) {
        document.addEventListener("touchstart", onGlobalTouchStart, { passive: true });
    }

    onUnmounted(() => {
        clearTimer();
        if (isTouchDevice) {
            document.removeEventListener("touchstart", onGlobalTouchStart);
        }
    });

    return {
        isActive,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        deactivate,
    };
}
