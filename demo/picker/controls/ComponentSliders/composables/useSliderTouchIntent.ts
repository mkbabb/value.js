/**
 * The channel sliders' touch gesture: the direction decides, from the first
 * pixels of the touch, whether the slider or the page takes it.
 *
 * A touch that lands on a slider can mean two things: a horizontal drag of
 * the thumb, or a vertical swipe that scrolls the page past the console. The
 * sliders declare `touch-action: pan-y` (ComponentSliders.vue), so the
 * browser itself takes a vertical pan and hands the slider a
 * `pointercancel`; what is left to decide is the press. A slider (reka's
 * SliderImpl) moves its thumb to the finger on `pointerdown`, before the
 * direction is known, so a swipe that began on a track used to change the
 * value. The touch's press is therefore held at the wrapper and replayed to
 * the slider once the touch has gone `SLOP_PX` sideways (a drag, which then
 * tracks from where the finger first landed) or lifts without travelling (a
 * tap, which sets the value where it landed). A touch that goes vertical
 * first is the page's: its press, moves and release never reach the slider.
 * A mouse or a pen is never held.
 *
 * This replaces a tap-to-arm gate, whose first drag moved nothing and whose
 * armed state let a vertical swipe move the thumb and block the scroll.
 *
 * The iOS Safari pointer-capture leak recovery stays: `pointercancel` and
 * `lostpointercapture` release any capture the slider still holds, and a
 * document-level net force-releases one left behind after a cancel.
 */

import { onMounted, onUnmounted, ref, watch, nextTick, type WatchSource } from "vue";
import type { usePointerDebug } from "../../../debug/usePointerDebug";

type PointerDebug = ReturnType<typeof usePointerDebug>;

/** Travel, in CSS px, before a touch's direction is read. */
export const SLOP_PX = 6;

type HeldPress = { id: number; x: number; y: number; target: EventTarget; init: PointerEventInit };

/**
 * Install the direction lock on one slider wrapper. Exported for the unit
 * test; the component uses `useSliderTouchIntent`. Returns the cleanup.
 */
export function attachSliderTouchIntent(
    el: HTMLElement,
    log: (e: Event, tag: string) => void = () => {},
): () => void {
    const replayed = new WeakSet<Event>();
    let held: HeldPress | null = null;
    let refused: number | null = null;

    const release = (press: HeldPress) => {
        const down = new PointerEvent("pointerdown", {
            ...press.init,
            bubbles: true,
            cancelable: true,
            composed: true,
        });
        replayed.add(down);
        press.target.dispatchEvent(down);
    };

    const onPointerDown = (e: PointerEvent) => {
        log(e, "down");
        if (replayed.has(e) || e.pointerType !== "touch") return;
        e.stopPropagation();
        refused = null;
        held = {
            id: e.pointerId,
            x: e.clientX,
            y: e.clientY,
            target: e.target ?? el,
            init: {
                pointerId: e.pointerId,
                pointerType: e.pointerType,
                isPrimary: e.isPrimary,
                clientX: e.clientX,
                clientY: e.clientY,
                screenX: e.screenX,
                screenY: e.screenY,
                button: e.button,
                buttons: e.buttons,
                width: e.width,
                height: e.height,
                pressure: e.pressure,
            },
        };
    };

    const onPointerMove = (e: PointerEvent) => {
        if (e.pointerId === refused) {
            e.stopPropagation();
            return;
        }
        if (held === null || e.pointerId !== held.id) return;
        const dx = Math.abs(e.clientX - held.x);
        const dy = Math.abs(e.clientY - held.y);
        if (Math.max(dx, dy) < SLOP_PX) {
            e.stopPropagation();
            return;
        }
        const press = held;
        held = null;
        if (dx > dy) {
            // A drag: the slider takes the press where the finger landed, then
            // this move, so the thumb tracks from the first pixel.
            log(e, "drag");
            release(press);
            return;
        }
        // A swipe: the page's. The browser pans (pan-y) and cancels the pointer.
        log(e, "swipe");
        refused = e.pointerId;
        e.stopPropagation();
    };

    const onPointerUp = (e: PointerEvent) => {
        if (e.pointerId === refused) {
            refused = null;
            e.stopPropagation();
            return;
        }
        if (held === null || e.pointerId !== held.id) return;
        // A tap: the press lands where it was made, then the release.
        const press = held;
        held = null;
        release(press);
    };

    const onPointerCancel = (e: PointerEvent) => {
        if (held?.id === e.pointerId) held = null;
        if (refused === e.pointerId) refused = null;
        log(e, "cancel");
        const target = e.target as HTMLElement | null;
        try {
            target?.releasePointerCapture?.(e.pointerId);
        } catch {
            /* not captured */
        }
    };
    const onLostPointerCapture = (e: Event) => log(e, "lostcap");

    const capture = { capture: true } as const;
    el.addEventListener("pointerdown", onPointerDown, capture);
    el.addEventListener("pointermove", onPointerMove, capture);
    el.addEventListener("pointerup", onPointerUp, capture);
    el.addEventListener("pointercancel", onPointerCancel);
    el.addEventListener("lostpointercapture", onLostPointerCapture);
    return () => {
        el.removeEventListener("pointerdown", onPointerDown, capture);
        el.removeEventListener("pointermove", onPointerMove, capture);
        el.removeEventListener("pointerup", onPointerUp, capture);
        el.removeEventListener("pointercancel", onPointerCancel);
        el.removeEventListener("lostpointercapture", onLostPointerCapture);
    };
}

export function useSliderTouchIntent(opts: {
    currentColorSpace: WatchSource<string>;
    debug: PointerDebug;
}) {
    const { currentColorSpace, debug } = opts;
    const sliderWrapperEls = ref<Record<string, HTMLElement>>({});
    let cleanups: (() => void)[] = [];

    // Re-attached when the colour space changes (the rows re-render), never
    // per reactive tick.
    function attach() {
        cleanups.forEach((fn) => fn());
        cleanups = Object.entries(sliderWrapperEls.value).map(([component, el]) =>
            attachSliderTouchIntent(el, (e, tag) => debug.logEvent(e as PointerEvent, `sl:${component}:${tag}`)),
        );
    }
    watch(currentColorSpace, () => nextTick(attach), { immediate: true });

    // Document-level safety net: force-release pointer capture on any element
    // that still holds it after pointercancel.
    function onDocPointerCancel(e: PointerEvent) {
        const t = e.target as HTMLElement;
        if (t?.hasPointerCapture?.(e.pointerId)) {
            debug.log("doc:cancel-release", e.pointerId, e.target, true, "force-released");
            try {
                t.releasePointerCapture(e.pointerId);
            } catch {
                /* already released */
            }
        } else {
            debug.logEvent(e, "doc:cancel");
        }
    }

    onMounted(() => document.addEventListener("pointercancel", onDocPointerCancel));
    onUnmounted(() => {
        document.removeEventListener("pointercancel", onDocPointerCancel);
        cleanups.forEach((fn) => fn());
        cleanups = [];
    });

    return { sliderWrapperEls };
}
