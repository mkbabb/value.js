/**
 * The channel sliders' touch wiring: the site's touch-intent lock
 * (`demo/shared/touch-intent`) on each slider's wrapper, the pointer debug
 * log, and the iOS Safari pointer-capture leak recovery.
 *
 * The lock is the shared primitive's: a sideways touch is the slider's from
 * its first pixel, a vertical one is the page's (the sliders declare
 * `touch-action: pan-y`, ComponentSliders.vue), a tap sets the value, and a
 * mouse or a pen is never held. Each wrapper is its own install, so the app's
 * delegated install (`demo/shared/touch-intent/controls.ts`) leaves these
 * sliders to it.
 *
 * The recovery: `pointercancel` releases any capture the slider still holds,
 * and a document-level net force-releases one left behind after a cancel.
 */

import { onMounted, onUnmounted, ref, watch, nextTick, type WatchSource } from "vue";
import type { usePointerDebug } from "../../../debug/usePointerDebug";
import { attachTouchIntent } from "../../../../shared/touch-intent/touchIntent";

type PointerDebug = ReturnType<typeof usePointerDebug>;

/** One wrapper's lock and capture recovery. Returns the cleanup. */
function attachChannelSlider(el: HTMLElement, log: (e: Event, tag: string) => void): () => void {
    const detachLock = attachTouchIntent(el, { log });
    const onPointerCancel = (e: PointerEvent) => {
        try {
            (e.target as HTMLElement | null)?.releasePointerCapture?.(e.pointerId);
        } catch {
            /* not captured */
        }
    };
    const onLostPointerCapture = (e: Event) => log(e, "lostcap");
    el.addEventListener("pointercancel", onPointerCancel);
    el.addEventListener("lostpointercapture", onLostPointerCapture);
    return () => {
        detachLock();
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
            attachChannelSlider(el, (e, tag) => debug.logEvent(e as PointerEvent, `sl:${component}:${tag}`)),
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
