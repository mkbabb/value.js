// E.W4 Lane E: bespoke height-transition durations (no exact glass-ui canon match
// — 350ms sits between `--duration-normal` 300ms and `--duration-slow` 450ms;
// 250ms sits between `--duration-fast` 200ms and `--duration-normal` 300ms).
// Both values were tuned by hand at B-tranche for the palette-card expand/collapse
// rhythm; kept as JS-runtime constants because `useHeightTransition.ts` writes
// inline `style.transition` strings that need numeric ms units.
const DEFAULT_EXPAND_DURATION = 350;
const DEFAULT_COLLAPSE_DURATION = 250;
const EXPAND_EASING = "cubic-bezier(0.16, 1, 0.3, 1)"; // matches --ease-out-expo
const COLLAPSE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)"; // matches --ease-standard

/**
 * Resolve a height morph's `done` from the transition the engine ACTUALLY runs.
 *
 * X.W7.c (fold N-13 · PC-1 ≡ PS-4): `done` used to wait on a `height`
 * `transitionend` — but under `prefers-reduced-motion` the central guard
 * rewrites the transition set without `height` (author-`!important` beats the
 * inline shorthand), so no height transition ever starts, the event never
 * fires, and Vue waits on the 2-arity hook forever: the collapse never
 * completes and the subtree is never unmounted. The cure reads the engine's own
 * record: if a `height` CSSTransition is running, `done` rides its `finished`
 * (settled either way — a cancelled morph also ends); if none started, the
 * morph is already at its end state and `done` runs now.
 */
function settleHeight(el: HTMLElement, done: () => void): void {
    const morph = el
        .getAnimations()
        .find((a) => a instanceof CSSTransition && a.transitionProperty === "height");
    if (!morph) {
        done();
        return;
    }
    morph.finished.then(done, done);
}

export function useHeightTransition(options?: {
    expandDuration?: number;
    collapseDuration?: number;
    onBeforeCollapse?: () => void;
    onAfterExpand?: () => void;
}) {
    const expandDuration = options?.expandDuration ?? DEFAULT_EXPAND_DURATION;
    const collapseDuration = options?.collapseDuration ?? DEFAULT_COLLAPSE_DURATION;

    function onBeforeEnter(el: Element) {
        const htmlEl = el as HTMLElement;
        htmlEl.style.height = "0";
        htmlEl.style.opacity = "0";
    }

    function onEnter(el: Element, done: () => void) {
        const htmlEl = el as HTMLElement;
        const targetHeight = htmlEl.scrollHeight;
        htmlEl.style.transition = `height ${expandDuration}ms ${EXPAND_EASING}, opacity ${expandDuration}ms ease`;
        // Force reflow
        void htmlEl.offsetHeight;
        htmlEl.style.height = `${targetHeight}px`;
        htmlEl.style.opacity = "1";
        settleHeight(htmlEl, done);
    }

    function onAfterEnter(el: Element) {
        const htmlEl = el as HTMLElement;
        htmlEl.style.height = "";
        htmlEl.style.transition = "";
        htmlEl.style.opacity = "";
        options?.onAfterExpand?.();
        htmlEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function onBeforeLeave(el: Element) {
        const htmlEl = el as HTMLElement;
        options?.onBeforeCollapse?.();
        htmlEl.style.height = `${htmlEl.scrollHeight}px`;
        // Force reflow
        void htmlEl.offsetHeight;
    }

    function onLeave(el: Element, done: () => void) {
        const htmlEl = el as HTMLElement;
        htmlEl.style.transition = `height ${collapseDuration}ms ${COLLAPSE_EASING}, opacity ${collapseDuration}ms ease`;
        // Force reflow
        void htmlEl.offsetHeight;
        htmlEl.style.height = "0";
        htmlEl.style.opacity = "0";
        settleHeight(htmlEl, done);
    }

    function onAfterLeave(el: Element) {
        const htmlEl = el as HTMLElement;
        htmlEl.style.height = "";
        htmlEl.style.transition = "";
        htmlEl.style.opacity = "";
    }

    return {
        onBeforeEnter,
        onEnter,
        onAfterEnter,
        onBeforeLeave,
        onLeave,
        onAfterLeave,
    };
}
