/**
 * o1110 D2 — what a picker drag costs before and while it runs.
 *
 * 1. The first colour frame of a drag is already live. `useColourLive` set its
 *    flag in a pre-flush watcher, so a reader ordered ahead of it read the
 *    first frame as settled: the root took `--accent-live` and `--accent-view`
 *    and the off-screen ramps scheduled a mint, 11 root writes per drag start.
 * 2. A readout that ticks every frame rewrites its text node in place
 *    (`v-text-in-place`); Vue's `textContent` write replaced the node, which
 *    invalidated every `:has()` rule up to the root and re-laid the text out.
 * 3. Through a drag the resting accent's referent holds (one walk, not the
 *    bisection's eighteen) while its ink keeps the pick's chroma, and the
 *    settle resolves it whole.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { computed, createApp, effectScope, h, nextTick, ref, watch, withDirectives, type Ref } from "vue";

const isDark = ref(false);
vi.mock("@mkbabb/glass-ui/dark", () => ({ useGlobalDark: () => ({ isDark }) }));

import { useColourLive } from "../../color-session/useAtmosphereFrameCoalesce";
import { vTextInPlace } from "../../shared/vTextInPlace";
import {
    resolveFieldAmbientLightness,
    resolveFieldPlateReferent,
    resolveRestingAccentReferent,
    resolveSurfaceLightness,
} from "../../color-session/ink";
import { useContrastSafeColor } from "../../color-session/useContrastSafeColor";
import { resolveAtmosphereField } from "../../app/composables/boot/atmosphere-calibration";
import { DEFAULT_AURORA_ATOMS } from "../../scenes/atmosphere/aurora-atoms";

describe("o1110 D2 · the first frame of a drag is live", () => {
    afterEach(() => window.dispatchEvent(new Event("pointerup")));

    it("a reader of the frame ordered ahead of the flag's watcher sees the drag", async () => {
        const frame = ref("oklch(0.7 0.15 30)");
        const seen: boolean[] = [];
        const scope = effectScope();
        let live: Readonly<Ref<boolean>> = ref(false);
        scope.run(() => {
            watch(frame, () => seen.push(live.value));
            live = useColourLive(frame);
        });
        window.dispatchEvent(new Event("pointerdown"));
        frame.value = "oklch(0.7 0.15 40)";
        await nextTick();
        expect(seen).toEqual([true]);
        scope.stop();
    });
});

describe("o1110 D2 · v-text-in-place", () => {
    it("rewrites the readout's text node rather than replacing it", async () => {
        const text = ref("17.1");
        const host = document.createElement("div");
        const app = createApp({ render: () => withDirectives(h("span", text.value), [[vTextInPlace]]) });
        app.mount(host);
        const span = host.querySelector("span")!;
        const node = span.firstChild;
        text.value = "17.2";
        await nextTick();
        expect(span.textContent).toBe("17.2");
        expect(span.firstChild).toBe(node);
        text.value = "18.0";
        await nextTick();
        expect(span.firstChild).toBe(node);
        expect(span.childNodes.length).toBe(1);
        app.unmount();
    });

    it("stands aside where an edit split the text, and Vue's write still lands", async () => {
        const text = ref("17.1");
        const host = document.createElement("div");
        const app = createApp({ render: () => withDirectives(h("span", text.value), [[vTextInPlace]]) });
        app.mount(host);
        const span = host.querySelector("span")!;
        span.appendChild(document.createTextNode("9"));
        text.value = "20.5";
        await nextTick();
        expect(span.textContent).toBe("20.5");
        app.unmount();
    });
});

describe("o1110 D2 · the resting referent holds through a drag", () => {
    const SEED = "oklch(73% 0.185 2)";
    const field = resolveAtmosphereField({ ...structuredClone(DEFAULT_AURORA_ATOMS), seed: SEED }).palette;
    const over = (referent: number) => resolveSurfaceLightness("resting", referent, false);
    const ambient = resolveFieldAmbientLightness(field, false);
    const plate = resolveFieldPlateReferent(field, false);

    it("a start whose ink holds the pick's chroma is kept; one that drains it is resolved whole", () => {
        const whole = resolveRestingAccentReferent(SEED, ambient, plate, over);
        expect(whole).not.toBe(ambient);
        expect(resolveRestingAccentReferent(SEED, ambient, plate, over, undefined, undefined, ambient)).toBe(ambient);
        // The plate referent's own walk drains the seed's hue (ink.test §0gz.1).
        expect(resolveRestingAccentReferent(SEED, ambient, plate, over, undefined, undefined, plate)).toBe(whole);
    });

    it("the settled accent is the whole resolution, byte-equal to a boot that never dragged", async () => {
        const pick = ref(SEED);
        const live = ref(false);
        const scope = effectScope();
        const boot = scope.run(() =>
            useContrastSafeColor(computed(() => pick.value), computed(() => ambient), computed(() => plate), live),
        )!;
        expect(boot.safeAccentCss.value).toBeTruthy();
        live.value = true;
        for (const hue of [10, 20, 30, 40]) {
            pick.value = `oklch(73% 0.185 ${hue})`;
            expect(boot.safeAccentCss.value).toBeTruthy();
        }
        live.value = false;
        const settled = boot.safeAccentCss.value;
        const fresh = effectScope();
        const never = fresh.run(() =>
            useContrastSafeColor(computed(() => pick.value), computed(() => ambient), computed(() => plate)),
        )!;
        expect(settled).toBe(never.safeAccentCss.value);
        scope.stop();
        fresh.stop();
    });
});
