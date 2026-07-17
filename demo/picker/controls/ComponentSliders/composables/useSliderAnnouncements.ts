/**
 * The `aria-valuetext` delivery leg (U.W-A11Y · U-F27; BR-4).
 *
 * The channel sliders are the glass-ui `Slider` (spectrum variant), which
 * forwards only `aria-label` to its reka thumb — it exposes no
 * `aria-valuetext` prop, so the demo cannot pass the formatted announcement
 * through the component API (that clean prop-through is the recorded producer
 * RELAY). The mount-safe interim: set `aria-valuetext` directly on each
 * rendered `[role="slider"]` thumb, reactively, keyed to the same formatted
 * cell the console meter reads (ONE voice). Vue's patch never manages this
 * attribute, so the manual write survives re-renders; the watchers keep it in
 * lockstep with the value (`aria-valuenow`, which reka owns, updates in the
 * same reactive tick).
 */
import {
    watch,
    nextTick,
    toValue,
    type Ref,
    type MaybeRefOrGetter,
    type WatchSource,
} from "vue";
import { sliderValueText } from "./sliderAnnouncement";

export function useSliderAnnouncements(opts: {
    /** The per-component wrapper els (each hosts one `<Slider>` → one thumb). */
    wrapperEls: Ref<Record<string, HTMLElement>>;
    /** The active color space (re-keys the rows → thumbs re-mount). */
    currentColorSpace: MaybeRefOrGetter<string>;
    /** The console meter's formatted, unit-aware cell for a component. */
    valueText: (component: string) => string;
    /** A reactive trigger that changes on every value edit (the formatted map). */
    reactiveKey: WatchSource<unknown>;
}) {
    function apply() {
        const space = toValue(opts.currentColorSpace);
        for (const [component, el] of Object.entries(opts.wrapperEls.value)) {
            const thumb = el?.querySelector('[role="slider"]');
            if (!thumb) continue;
            thumb.setAttribute(
                "aria-valuetext",
                sliderValueText(space, component, opts.valueText(component)),
            );
        }
    }

    // Space change re-mounts the thumbs → re-apply after render (immediate seeds
    // the first paint). Value edits re-run through the formatted-map trigger.
    watch(() => toValue(opts.currentColorSpace), () => nextTick(apply), {
        immediate: true,
        flush: "post",
    });
    watch(opts.reactiveKey, () => nextTick(apply), { flush: "post" });

    return { apply };
}
