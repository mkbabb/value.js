/**
 * OD19-V3 (P2) — the picker colour frame must not pay for scheme constants or
 * off-screen ramps.
 *
 * Before the cure: `schemeTokenCss` read `getComputedStyle(:root)` for a
 * scheme-constant token (`--color-gold`, `--destructive`) on every colour
 * frame, after that frame's `setProperty` writes, forcing a style recalc
 * (profile: `getPropertyValue` 839 ms self over one 41-step drag), and
 * `useViewAccents` re-minted the two `resolvePalettesRamp` ramps (a WCAG
 * bisection per stop) on every frame although neither ramp is on screen
 * during a picker drag.
 *
 * The cure: the token is read once per scheme; `--accent-view` still tracks
 * every frame; the ramps mint once the input settles, and at once on a view
 * or scheme change. Settled tokens are byte-equal to a direct mint.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computed, createApp, effectScope, nextTick, ref } from "vue";

const isDark = ref(true);
vi.mock("@mkbabb/glass-ui/dark", () => ({ useGlobalDark: () => ({ isDark }) }));
// A pass-through spy: every caller gets the real walk; the count is the cost.
vi.mock("../../color-session/ink", async (importOriginal) => {
    const real = await importOriginal<typeof import("../../color-session/ink")>();
    return { ...real, certifyAccentInk: vi.fn(real.certifyAccentInk) };
});

import { certifyAccentInk } from "../../color-session/ink";
import { INK_AMBIENT_KEY } from "../../color-session/keys";
import {
    goldIdentityCss,
    useContrastSafeColor,
    useSafeAccentFn,
} from "../../color-session/useContrastSafeColor";
import {
    resolvePalettesRamp,
    RAMP_LARGE_TEXT_CONTRAST_FLOOR,
    RAMP_TEXT_CONTRAST_FLOOR,
} from "../../color-session/palettes-ramp";
import { resolveSurfaceLightnessLive } from "../../color-session/useContrastSafeColor";
import { resolveViewAccent } from "../../color-session/view-accent";
import { useViewAccents } from "../../app/composables/boot/useViewAccents";

const rootStyle = () => document.documentElement.style;
const token = (name: string) => rootStyle().getPropertyValue(name);
const ramp = (prefix: string) => [0, 1, 2].map((i) => token(`${prefix}-${i}`));

describe("OD19-V3 — scheme-constant tokens are read once per scheme", () => {
    afterEach(() => vi.restoreAllMocks());

    it("a run of colour frames reads --color-gold from the cascade once, and again only on a scheme flip", () => {
        rootStyle().setProperty("--color-gold", "light-dark(#a07a10, #d4af37)");
        const spy = vi.spyOn(window, "getComputedStyle");
        // Prime the scheme once on each side so the count below is the
        // per-frame cost, not the first read.
        goldIdentityCss(false);
        goldIdentityCss(true);
        spy.mockClear();

        for (let frame = 0; frame < 40; frame++) expect(goldIdentityCss(true)).toBe("#d4af37");
        expect(spy).toHaveBeenCalledTimes(0);

        expect(goldIdentityCss(false)).toBe("#a07a10");
        expect(spy.mock.calls.length).toBeLessThanOrEqual(1);
        rootStyle().removeProperty("--color-gold");
    });
});

describe("OD19-V3 — the Palettes ramps leave the drag clock", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => {
        vi.useRealTimers();
        isDark.value = true;
    });

    function mount() {
        const accent = ref("oklch(0.7 0.15 30)");
        const shift = ref(0);
        const ambient = ref(0.5);
        const scope = effectScope();
        scope.run(() =>
            useViewAccents({
                cssColorOpaque: computed(() => accent.value),
                safeAccentCss: computed(() => accent.value),
                currentConfig: computed(() => ({ accentHueShift: shift.value }) as never),
                derivedLightness: computed(() => ambient.value),
            }),
        );
        return { accent, shift, ambient, scope };
    }

    const expected = (css: string, ambient: number) => {
        const surfL = resolveSurfaceLightnessLive("resting", ambient, isDark.value);
        return {
            accent: resolveViewAccent(css, 0, surfL),
            menu: resolvePalettesRamp(css, surfL, RAMP_TEXT_CONTRAST_FLOOR),
            title: resolvePalettesRamp(css, surfL, RAMP_LARGE_TEXT_CONTRAST_FLOOR),
        };
    };

    it("a drag writes --accent-view every frame but mints no ramp until the input settles; the settled ramp is byte-equal to a direct mint", async () => {
        const { accent, ambient, scope } = mount();
        const first = ramp("--palettes-ramp");
        expect(first.every((s) => s !== "")).toBe(true);

        for (let hue = 40; hue <= 200; hue += 8) {
            accent.value = `oklch(0.7 0.15 ${hue})`;
            ambient.value = 0.5 + hue / 2000;
            await nextTick();
            expect(token("--accent-view")).toBe(expected(accent.value, ambient.value).accent);
            // Mid-drag: the ramps still carry the pre-drag mint.
            expect(ramp("--palettes-ramp")).toEqual(first);
            vi.advanceTimersByTime(16);
        }

        vi.runAllTimers();
        const want = expected(accent.value, ambient.value);
        expect(ramp("--palettes-ramp")).toEqual(want.menu);
        expect(ramp("--palettes-ramp-title")).toEqual(want.title);
        scope.stop();
    });

    it("a view change re-mints the ramps at once (no settle wait)", async () => {
        const { accent, shift, scope } = mount();
        accent.value = "oklch(0.6 0.2 250)";
        await nextTick();
        shift.value = 30;
        await nextTick();
        const want = expected(accent.value, 0.5);
        expect(ramp("--palettes-ramp")).toEqual(want.menu);
        expect(ramp("--palettes-ramp-title")).toEqual(want.title);
        scope.stop();
    });

    it("a scheme flip re-mints the ramps at once against the new scheme's surface", async () => {
        const { scope } = mount();
        isDark.value = false;
        await nextTick();
        const want = expected("oklch(0.7 0.15 30)", 0.5);
        expect(ramp("--palettes-ramp")).toEqual(want.menu);
        expect(ramp("--palettes-ramp-title")).toEqual(want.title);
        scope.stop();
    });
});

describe("OD19-V3 — one colour frame certifies each question once", () => {
    it("the boot accent, the Nutrition label and two floating menus cost one walk per rung per frame, with unchanged answers", async () => {
        const real = (await vi.importActual<typeof import("../../color-session/ink")>(
            "../../color-session/ink",
        )).certifyAccentInk;
        const walk = vi.mocked(certifyAccentInk);
        const pick = ref("oklch(0.62 0.18 12)");
        const ambient = ref(0.42);
        const ambientC = computed(() => ambient.value);
        const app = createApp({});
        app.provide(INK_AMBIENT_KEY, ambientC);
        const scope = effectScope();
        const reads = app.runWithContext(() =>
            scope.run(() => {
                const boot = useContrastSafeColor(computed(() => pick.value), ambientC);
                const label = useSafeAccentFn("resting");
                const menuA = useSafeAccentFn("floating");
                const menuB = useSafeAccentFn("floating");
                return [
                    computed(() => boot.safeAccentCss.value),
                    computed(() => label.safeCss(pick.value)),
                    computed(() => menuA.safeCss(pick.value)),
                    computed(() => menuB.safeCss(pick.value)),
                ];
            }),
        )!;

        for (let hue = 12; hue <= 330; hue += 18) {
            pick.value = `oklch(0.62 0.18 ${hue})`;
            ambient.value = 0.42 + hue / 4000;
            walk.mockClear();
            const got = reads.map((r) => r.value);
            // Two rungs (resting, floating): two walks, not four.
            expect(walk).toHaveBeenCalledTimes(2);
            const restingL = resolveSurfaceLightnessLive("resting", ambient.value, isDark.value);
            const floatingL = resolveSurfaceLightnessLive("floating", ambient.value, isDark.value);
            expect(got).toEqual([
                real(pick.value, restingL),
                real(pick.value, restingL),
                real(pick.value, floatingL),
                real(pick.value, floatingL),
            ]);
        }
        scope.stop();
    });
});
