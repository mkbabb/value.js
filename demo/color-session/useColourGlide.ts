import { computed, getCurrentScope, onScopeDispose, readonly, ref, watch, type ComputedRef, type Ref } from "vue";
import { convertColor } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";

/**
 * The page's colour travels to a new colour; it never cuts to it.
 *
 * A drag drives the atmosphere frame by frame, so its tint follows the
 * finger. A DISCRETE change (Random, Reset, a typed value, a swatch, a pasted
 * colour) used to land in one frame: the ground, the aurora, the plates'
 * tint and every accent flipped between two frames (purple to orange on a
 * typed hue). `useColourGlide` hands the atmosphere a colour that glides from
 * where it is drawn to the new one in OKLab, on `--duration-slow` with an
 * ease-out, and reports itself `gliding` meanwhile, so the atmosphere takes
 * the glide down its live path (the drag's: per-frame writes where the colour
 * is painted, the root and the settled inks once, at the end). A drag takes
 * over from wherever a glide is (the frame colour wins at once), and a new
 * discrete change mid-glide retargets from the drawn colour. The last frame
 * is the target string itself, so the settled colour is byte-equal to an
 * unglided one.
 *
 * Under reduced motion the glide stays: a colour cross-fade is a fade, never
 * motion, and a cut is what the law forbids.
 */

type Lab = [number, number, number];

/** Fallback for `--duration-slow` (glass motion tokens), in ms. */
export const GLIDE_FALLBACK_MS = 450;

function toLab(css: string): Lab | null {
    const parsed = parseCssColor(css);
    if (!parsed.ok) return null;
    const lab = convertColor(parsed.value, "oklab");
    if (!lab.ok) return null;
    const [L, a, b] = lab.value.channels;
    if (typeof L !== "number" || typeof a !== "number" || typeof b !== "number") return null;
    return [L, a, b];
}

const labCss = ([L, a, b]: Lab) => `oklab(${L.toFixed(5)} ${a.toFixed(5)} ${b.toFixed(5)})`;
const easeOut = (t: number) => 1 - (1 - t) ** 3;

function slowMs(): number {
    if (typeof document === "undefined") return GLIDE_FALLBACK_MS;
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--duration-slow").trim();
    const n = parseFloat(raw);
    if (!Number.isFinite(n) || n <= 0) return GLIDE_FALLBACK_MS;
    return raw.endsWith("ms") ? n : n * 1000;
}

export function useColourGlide(
    source: Readonly<Ref<string>>,
    live: Readonly<Ref<boolean>>,
    duration: () => number = slowMs,
): { colour: ComputedRef<string>; gliding: Readonly<Ref<boolean>> } {
    const shown = ref(source.value);
    const gliding = ref(false);
    let drawn: Lab | null = toLab(source.value);
    let frame = 0;

    const stop = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        gliding.value = false;
    };
    if (getCurrentScope()) onScopeDispose(stop);

    const land = (css: string) => {
        stop();
        shown.value = css;
        drawn = toLab(css);
    };

    watch(source, (target) => {
        const to = toLab(target);
        if (live.value || typeof requestAnimationFrame !== "function" || drawn === null || to === null) {
            land(target);
            return;
        }
        const from: Lab = drawn;
        const ms = duration();
        if (frame) cancelAnimationFrame(frame);
        gliding.value = true;
        let t0: number | null = null;
        const step = (now: number) => {
            t0 ??= now;
            const t = Math.min(1, (now - t0) / ms);
            if (t >= 1) {
                frame = 0;
                land(target);
                return;
            }
            const k = easeOut(t);
            drawn = [0, 1, 2].map((i) => from[i]! + (to[i]! - from[i]!) * k) as Lab;
            shown.value = labCss(drawn);
            frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
    });

    // A drag takes over from wherever the glide stands.
    watch(live, (on) => {
        if (on && gliding.value) land(source.value);
    }, { flush: "sync" });

    return { colour: computed(() => shown.value), gliding: readonly(gliding) };
}
