/**
 * The channel-slider touch-gate cluster (R.W3 Lane C — cohesion lift out of
 * `ComponentSliders.vue`, keeping the SFC under the 400-LoC god-module cap
 * after the C1 spectrum-slider consume).
 *
 * Owns: one `useTouchGate` per channel component across all color spaces,
 * the capture-phase wrapper listeners that intercept reka-ui's pointerdown on
 * touch devices (tap-to-activate before drag), the iOS Safari pointer-capture
 * leak recovery (`pointercancel`/`lostpointercapture`), and the document-level
 * force-release safety net. Behavior is byte-equivalent to the pre-lift block.
 */

import { onMounted, onUnmounted, ref, watch, nextTick, type WatchSource } from "vue";
import { PICKER_CHANNELS } from "../../../../../../../color-session/picker-color";
import { useTouchGate } from "@mkbabb/glass-ui";
import type { usePointerDebug } from "../../../composables/usePointerDebug";

type PointerDebug = ReturnType<typeof usePointerDebug>;

export function useSliderTouchGates(opts: {
    currentColorSpace: WatchSource<string>;
    debug: PointerDebug;
}) {
    const { currentColorSpace, debug } = opts;

    // Touch gate check — reuse the same detection as spectrum
    const isTouchDevice =
        typeof window !== "undefined" && "ontouchstart" in window;

    // Slider touch gates — one per component across all color spaces
    const ALL_COMPONENTS = new Set(
        [
            ...Object.values(PICKER_CHANNELS).flatMap((channels) => channels.map(({ key }) => key)),
            "alpha",
        ],
    );
    const sliderGates: Record<string, ReturnType<typeof useTouchGate>> = {};
    for (const comp of ALL_COMPONENTS) {
        sliderGates[comp] = useTouchGate();
    }
    const sliderWrapperEls = ref<Record<string, HTMLElement>>({});

    // Capture-phase listeners on slider wrappers to intercept reka-ui's
    // pointerdown. Only re-attach when color space changes (not on every
    // reactive tick).
    let listenerCleanups: (() => void)[] = [];

    function attachSliderListeners() {
        // Clean up old listeners first
        listenerCleanups.forEach((fn) => fn());
        listenerCleanups = [];

        for (const [component, el] of Object.entries(sliderWrapperEls.value)) {
            const gate = sliderGates[component];
            if (!gate || !el) continue;

            const onPointerDown = (e: PointerEvent) => {
                debug.logEvent(e, `sl:${component}:down`);
                debug.setGauge(`sl.${component}.gate`, gate.isActive.value);
                if (!gate.isTouchDevice) return;
                if (!gate.isActive.value) {
                    e.stopPropagation();
                    gate.handleTouchStart(el, e.clientY);
                    debug.log(`sl:${component}:gate-block`, e.pointerId, e.target, false);
                } else {
                    gate.resetTimer();
                }
            };
            const onTouchMove = (e: TouchEvent) => {
                gate.handleScrollCheck(e);
            };
            const onTouchEnd = () => {
                gate.handleTouchEnd();
            };

            const onPointerCancel = (e: PointerEvent) => {
                debug.logEvent(e, `sl:${component}:cancel`);
                const target = e.target as HTMLElement;
                const hadCapture = target?.hasPointerCapture?.(e.pointerId) ?? false;
                debug.log(`sl:${component}:cancel-release`, e.pointerId, e.target, hadCapture, hadCapture ? "released" : "no-cap");
                try { target.releasePointerCapture(e.pointerId); } catch {}
            };
            const onLostPointerCapture = (e: Event) => {
                debug.log(`sl:${component}:lostcap`, (e as PointerEvent).pointerId ?? -1, e.target, false);
                gate.resetTimer();
            };

            el.addEventListener("pointerdown", onPointerDown, { capture: true });
            el.addEventListener("touchmove", onTouchMove, { passive: true });
            el.addEventListener("touchend", onTouchEnd, { passive: true });
            el.addEventListener("pointercancel", onPointerCancel);
            el.addEventListener("lostpointercapture", onLostPointerCapture);

            listenerCleanups.push(() => {
                el.removeEventListener("pointerdown", onPointerDown, { capture: true });
                el.removeEventListener("touchmove", onTouchMove);
                el.removeEventListener("touchend", onTouchEnd);
                el.removeEventListener("pointercancel", onPointerCancel);
                el.removeEventListener("lostpointercapture", onLostPointerCapture);
            });
        }
    }

    // Re-attach listeners when color space changes (which re-renders the
    // slider list)
    watch(currentColorSpace, () => {
        nextTick(attachSliderListeners);
    }, { immediate: true });

    // Document-level safety net: force-release pointer capture on any element
    // that still holds it after pointercancel.
    function onDocPointerCancel(e: PointerEvent) {
        const t = e.target as HTMLElement;
        const hasCap = t?.hasPointerCapture?.(e.pointerId) ?? false;
        if (hasCap) {
            debug.log("doc:cancel-release", e.pointerId, e.target, true, "force-released");
            try { t.releasePointerCapture(e.pointerId); } catch {}
        } else {
            debug.logEvent(e, "doc:cancel");
        }
    }

    onMounted(() => {
        document.addEventListener("pointercancel", onDocPointerCancel);
    });
    onUnmounted(() => {
        document.removeEventListener("pointercancel", onDocPointerCancel);
        listenerCleanups.forEach((fn) => fn());
        listenerCleanups = [];
    });

    return { isTouchDevice, sliderGates, sliderWrapperEls };
}
