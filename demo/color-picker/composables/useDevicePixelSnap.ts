/**
 * useDevicePixelSnap — integer-snap the pane centering (S.W5-10, the
 * 2026-07-05 card-lighting-forensics rider, artifact 4).
 *
 * The `.app-layout` flex centering + per-wrapper `justify-center` leave the
 * pane cards on FRACTIONAL device pixels (picker card measured live at
 * y = 230.4453125; the About card at y = 115.5 — layout centering
 * remainders). Every rounded edge then rasterizes off the pixel grid,
 * splitting the AA ramp asymmetrically — under Chromium's coarser
 * backdrop-filter rounded-clip AA the 4 nearly-coincident corner arcs read
 * stepped/crunchy.
 *
 * The cure: measure each `.pane-wrapper`'s first element child (the pane
 * card root) and nudge the WRAPPER by the sub-pixel remainder via
 * `position: relative; top` — a paint-only offset that
 *   (a) does NOT affect layout (no feedback loop with the flex centering),
 *   (b) does NOT promote a compositing layer (a `transform` would — the
 *       exact trap this same wave item audits against).
 *
 * Re-syncs on: element/container resizes, window resize (dpr change rides
 * it), pane swaps (childList), and transition/animation settle (the pane
 * spring translates mid-flight; rects are only trusted at rest).
 */

import { onBeforeUnmount, onMounted } from "vue";
import type { Ref } from "vue";

const EPSILON = 0.01; // px — below this the correction is churn, not cure

export function useDevicePixelSnap(container: Ref<HTMLElement | null>) {
    const applied = new WeakMap<HTMLElement, number>();
    let rafId: number | null = null;
    let ro: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;

    function sync() {
        rafId = null;
        const host = container.value;
        if (!host) return;
        const dpr = window.devicePixelRatio || 1;

        for (const wrapper of host.querySelectorAll<HTMLElement>(".pane-wrapper")) {
            const child = wrapper.firstElementChild;
            if (!child) continue;

            const prev = applied.get(wrapper) ?? 0;
            const rawTop = child.getBoundingClientRect().top - prev;
            const corr = Math.round(rawTop * dpr) / dpr - rawTop;

            if (Math.abs(corr - prev) < EPSILON) continue;
            if (wrapper.style.position !== "relative") {
                wrapper.style.position = "relative";
            }
            wrapper.style.top = Math.abs(corr) < EPSILON ? "" : `${corr}px`;
            applied.set(wrapper, corr);
        }
    }

    function schedule() {
        rafId ??= requestAnimationFrame(sync);
    }

    function onSettle(event: Event) {
        // Only re-measure when something inside the pane column settled.
        if (event.target instanceof Node && container.value?.contains(event.target)) {
            schedule();
        }
    }

    onMounted(() => {
        const host = container.value;
        if (!host) return;

        ro = new ResizeObserver(schedule);
        ro.observe(host);
        for (const wrapper of host.querySelectorAll<HTMLElement>(".pane-wrapper")) {
            ro.observe(wrapper);
        }

        mo = new MutationObserver(schedule);
        mo.observe(host, { childList: true, subtree: true });

        window.addEventListener("resize", schedule, { passive: true });
        document.addEventListener("transitionend", onSettle, true);
        document.addEventListener("animationend", onSettle, true);

        schedule();
    });

    onBeforeUnmount(() => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        ro?.disconnect();
        mo?.disconnect();
        window.removeEventListener("resize", schedule);
        document.removeEventListener("transitionend", onSettle, true);
        document.removeEventListener("animationend", onSettle, true);
    });
}
