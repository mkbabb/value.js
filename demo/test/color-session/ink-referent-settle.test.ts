/**
 * OD19 repair 2 (C2-V-01 · OD19-V3) — a picker drag must not re-walk the
 * surface inks on every colour frame.
 *
 * Before the cure: every certified ink the boot stamps (`--ink-primary`,
 * `--ink-muted`, the modal and destructive inks, the four gold rungs) is a
 * WCAG walk keyed on the atmosphere's ambient, and the ambient moves with the
 * picked colour, so each colour frame re-ran all of them. In light the gold
 * rungs each run the headroom bisection, the far-side bisection and the plate
 * ink (CDP profile, light-1440, 41-step drag: `certify` 1.84 s inclusive).
 *
 * The cure: the ink referent holds while the colour moves and publishes the
 * latest ambient once the input settles; a referent move with no colour move
 * (a scheme flip, the field arriving) publishes at once. The live accent
 * still tracks every frame. The settled tokens equal a fresh mint at the
 * final colour and ambient, which is what a per-frame walk lands on.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computed, createApp, defineComponent, h, nextTick, ref, shallowRef } from "vue";

const isDark = ref(false);
vi.mock("@mkbabb/glass-ui/dark", () => ({ useGlobalDark: () => ({ isDark }) }));

// The atmosphere is the ambient's producer; the test drives its output.
const ambient = ref(0.82);
vi.mock("../../app/composables/boot/useAtmosphere", async () => {
    const { computed: c, ref: r } = await import("vue");
    return {
        useAtmosphere: () => ({
            auroraCssGradient: c(() => ""),
            auroraArrived: r(true),
            derivedLightness: c(() => ambient.value),
            plateReferent: c(() => ambient.value),
        }),
    };
});

// Pass-through spies: every caller gets the real walk; the count is the cost.
vi.mock("../../color-session/ink", async (importOriginal) => {
    const real = await importOriginal<typeof import("../../color-session/ink")>();
    return {
        ...real,
        certifyIdentityInk: vi.fn(real.certifyIdentityInk),
        resolvePlateInk: vi.fn(real.resolvePlateInk),
        resolveMutedInk: vi.fn(real.resolveMutedInk),
    };
});

import {
    certifyIdentityInk,
    resolveMutedInk,
    resolvePlateInk,
} from "../../color-session/ink";
import { resolveSurfaceLightnessLive } from "../../color-session/useContrastSafeColor";
import { useAtmosphereBoot } from "../../app/composables/boot/useAtmosphereBoot";

const SURFACE_TOKENS = [
    "--ink-primary",
    "--ink-muted",
    "--ink-floating-primary",
    "--ink-floating-muted",
    "--ink-modal-primary",
    "--ink-modal-muted",
    "--ink-modal-destructive",
    "--ink-destructive",
    "--ink-gold",
    "--ink-gold-floating",
    "--ink-gold-glyph",
    "--ink-gold-floating-glyph",
    "--ink-ambient-l",
] as const;
const ALL_TOKENS = [...SURFACE_TOKENS, "--accent-live", "--accent-view"] as const;

const root = () => document.documentElement.style;
const read = (names: readonly string[]) =>
    Object.fromEntries(names.map((n) => [n, root().getPropertyValue(n)]));

function mount(colour: { value: string }) {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const app = createApp(
        defineComponent({
            setup() {
                useAtmosphereBoot(
                    shallowRef(null),
                    computed(() => colour.value),
                    computed(() => ({ accentHueShift: 0 }) as never),
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

const walks = [certifyIdentityInk, resolvePlateInk, resolveMutedInk].map((f) => vi.mocked(f));

describe("OD19 repair 2 — the surface inks leave the drag clock", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        isDark.value = false;
        ambient.value = 0.82;
    });
    afterEach(() => {
        vi.useRealTimers();
        for (const n of ALL_TOKENS) root().removeProperty(n);
    });

    for (const dark of [false, true]) {
        it(`${dark ? "dark" : "light"}: a drag re-walks no surface ink until the input settles; the live accent tracks every frame; the settled tokens equal a fresh mint`, async () => {
            const real = await vi.importActual<typeof import("../../color-session/ink")>(
                "../../color-session/ink",
            );
            isDark.value = dark;
            ambient.value = dark ? 0.3 : 0.82;
            const colour = ref("oklch(0.66 0.16 28)");
            const unmount = mount(colour);
            await nextTick();
            const before = read(SURFACE_TOKENS);
            expect(before["--ink-primary"]).not.toBe("");

            for (let step = 1; step <= 21; step++) {
                for (const w of walks) w.mockClear();
                colour.value = `oklch(0.66 0.16 ${28 + step * 12})`;
                ambient.value = (dark ? 0.3 : 0.82) + (dark ? 1 : -1) * step * 0.006;
                await nextTick();
                // Mid-drag: no surface ink is re-walked and none changes.
                for (const w of walks) expect(w).toHaveBeenCalledTimes(0);
                expect(read(SURFACE_TOKENS)).toEqual(before);
                // The live accent is the picked colour, certified on the held ground.
                const heldResting = resolveSurfaceLightnessLive("resting", +before["--ink-ambient-l"]!, dark);
                expect(root().getPropertyValue("--accent-live")).toBe(real.certifyAccentInk(colour.value, heldResting));
                vi.advanceTimersByTime(16);
            }

            vi.runAllTimers();
            await nextTick();
            const settled = read(ALL_TOKENS);
            unmount();
            for (const n of ALL_TOKENS) root().removeProperty(n);

            // A fresh mint at the final colour and ambient: the per-frame walk's end state.
            const fresh = mount({ value: colour.value });
            await nextTick();
            expect(settled).toEqual(read(ALL_TOKENS));
            expect(settled["--ink-ambient-l"]).toBe(ambient.value.toFixed(4));
            fresh();
        });
    }

    it("a referent move with no colour move (a scheme flip, the field arriving) publishes at once", async () => {
        const colour = ref("oklch(0.66 0.16 28)");
        const unmount = mount(colour);
        await nextTick();
        ambient.value = 0.7;
        await nextTick();
        expect(root().getPropertyValue("--ink-ambient-l")).toBe("0.7000");
        isDark.value = true;
        ambient.value = 0.31;
        await nextTick();
        expect(root().getPropertyValue("--ink-ambient-l")).toBe("0.3100");
        const real = await vi.importActual<typeof import("../../color-session/ink")>(
            "../../color-session/ink",
        );
        expect(root().getPropertyValue("--ink-primary")).toBe(
            real.resolvePlateInk(resolveSurfaceLightnessLive("resting", 0.31, true), true),
        );
        unmount();
    });
});
