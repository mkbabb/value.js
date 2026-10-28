/**
 * X.W11.p4c (COHESION §0go.2(b)) — ink certification leaves the boot task.
 *
 * On a hydrated shell, `useAtmosphereBoot` stamps no certified ink in setup:
 * the first frame paints the stylesheet's pre-certified inks, and the first
 * certification runs after that frame (its rAF, then the next idle period).
 * The certifying watchers run inside the component's own scope, so they still
 * track the colour afterwards and stop with the component. A client-rendered
 * first view certifies in setup, unchanged.
 *
 * The frame clock is stubbed so the order is read, not raced: nothing is
 * stamped when setup returns, nothing when the frame's rAF runs (that is
 * still before the paint), and every token once the idle callback runs.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computed, createApp, defineComponent, h, nextTick, ref, shallowRef } from "vue";

vi.mock("@mkbabb/glass-ui/dark", async () => {
    const { ref: r } = await import("vue");
    return { useGlobalDark: () => ({ isDark: r(false) }) };
});
vi.mock("../../app/composables/boot/useAtmosphere", async () => {
    const { computed: c, ref: r } = await import("vue");
    return {
        useAtmosphere: () => ({
            auroraCssGradient: c(() => ""),
            auroraArrived: r(true),
            derivedLightness: c(() => 0.82),
        }),
    };
});

import { useAtmosphereBoot } from "../../app/composables/boot/useAtmosphereBoot";

const TOKENS = [
    "--accent-live",
    "--ink-primary",
    "--ink-muted",
    "--ink-gold",
    "--ink-gold-glyph",
    "--ink-ambient-l",
    "--accent-view",
    "--seal-ink",
] as const;
/** The per-view accent region's tokens (useViewAccents). */
const VIEW_TOKENS: readonly string[] = ["--accent-view", "--seal-ink"];
const root = () => document.documentElement.style;
const stamped = () => TOKENS.filter((t) => root().getPropertyValue(t) !== "");

let frames: FrameRequestCallback[] = [];
let idles: IdleRequestCallback[] = [];

function mount(colour: { value: string }, certifyAfterPaint: boolean) {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const app = createApp(
        defineComponent({
            setup() {
                useAtmosphereBoot(
                    shallowRef(null),
                    computed(() => colour.value),
                    computed(() => ({ accentHueShift: 0 }) as never),
                    { certifyAfterPaint },
                );
                return () => h("div");
            },
        }),
    );
    app.mount(host);
    return () => {
        app.unmount();
        host.remove();
    };
}

describe("X.W11.p4c (b) — the first certification follows first paint", () => {
    beforeEach(() => {
        frames = [];
        idles = [];
        vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
        vi.stubGlobal("requestIdleCallback", (cb: IdleRequestCallback) => idles.push(cb));
    });
    afterEach(() => {
        vi.unstubAllGlobals();
        for (const t of TOKENS) root().removeProperty(t);
    });

    it("hydrated shell: nothing in setup, nothing at the frame's rAF, every token at idle; live after", async () => {
        const colour = ref("oklch(0.73 0.185 2)");
        const unmount = mount(colour, true);
        await nextTick();
        expect(stamped()).toEqual([]);

        const raf = frames.splice(0);
        expect(raf.length).toBeGreaterThan(0);
        raf.forEach((cb) => cb(0));
        await nextTick();
        expect(stamped()).toEqual([]);

        const idle = idles.splice(0);
        expect(idle.length).toBe(1);
        idle.forEach((cb) => cb({ didTimeout: false, timeRemaining: () => 50 }));
        await nextTick();
        // X.W11.p4d T2 (COHESION §0gs.4): one task per region. The idle task
        // certifies the root inks; the per-view accents follow in the next.
        expect(stamped()).toEqual(TOKENS.filter((t) => !VIEW_TOKENS.includes(t)));
        await new Promise((resolve) => setTimeout(resolve, 0));
        await nextTick();
        expect(stamped()).toEqual([...TOKENS]);

        // The watchers live in the component's scope: they track the colour …
        const accent = root().getPropertyValue("--accent-live");
        colour.value = "oklch(0.62 0.2 150)";
        await nextTick();
        expect(root().getPropertyValue("--accent-live")).not.toBe(accent);

        // … and stop with it.
        unmount();
        const settled = root().getPropertyValue("--accent-live");
        colour.value = "oklch(0.62 0.2 260)";
        await nextTick();
        expect(root().getPropertyValue("--accent-live")).toBe(settled);
    });

    it("an unmount before the idle period certifies nothing", async () => {
        const unmount = mount(ref("oklch(0.73 0.185 2)"), true);
        frames.splice(0).forEach((cb) => cb(0));
        unmount();
        idles.splice(0).forEach((cb) => cb({ didTimeout: true, timeRemaining: () => 0 }));
        await nextTick();
        expect(stamped()).toEqual([]);
    });

    it("client first view: certifies in setup, as before", async () => {
        const unmount = mount(ref("oklch(0.73 0.185 2)"), false);
        await nextTick();
        expect(stamped()).toEqual([...TOKENS]);
        unmount();
    });
});
