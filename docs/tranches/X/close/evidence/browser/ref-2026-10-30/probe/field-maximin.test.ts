// SERVED MODEL: claude-opus-5-5 — X.W11.ref: the light referent per seed, field-level, before (mean) and after (maximin).
import { it } from "vitest";
import { convertColor, mapColorToGamut, mixColors, oklch, parseCssColor, type Color } from "@mkbabb/value.js/color";
import { certifyAccentInk, producerRungTint, resolveFieldPlateReferent, resolvePlateInk, resolveSurfaceLightness } from "../../../../../../../../demo/color-session/ink";
import { resolveAtmosphereField } from "../../../../../../../../demo/app/composables/boot/atmosphere-calibration";
import { DEFAULT_AURORA_ATOMS } from "../../../../../../../../demo/scenes/atmosphere/aurora-atoms";
const ok = <T,>(r: { ok: boolean; value?: T }) => { if (!r.ok) throw new Error("bad"); return r.value as T; };
const Y = (c: Color<any>) => Math.max(0, (ok(convertColor(c, "xyz")) as any).channels[1]);
const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const plate = (s: { L: number; C: number; h: number }) => {
    const g = ok(mapColorToGamut(ok(oklch(s.L, s.C, s.h, 1)) as any, "srgb"));
    const t = producerRungTint("resting", false);
    return ok(mixColors(g as any, t.color, t.alpha, { space: "rgb" }));
};
const ink = (css: string) => ok(convertColor(ok(parseCssColor(css)) as any, "oklch"));
it("seed table", () => {
    const seeds = ["oklch(73% 0.185 2)", "oklch(0.66 0.16 28)", "oklch(0.62 0.16 0)", "oklch(0.62 0.16 60)", "oklch(0.62 0.16 120)", "oklch(0.62 0.16 180)", "oklch(0.62 0.16 240)", "oklch(0.62 0.16 300)", "oklch(0.7 0.15 145)", "oklch(0.6 0.2 265)", "oklch(0.85 0.17 95)", "oklch(0.5 0.12 320)", "oklch(0.25 0.1 200)", "oklch(0.95 0.03 90)"];
    for (const seed of seeds) {
        const field = resolveAtmosphereField({ ...structuredClone(DEFAULT_AURORA_ATOMS), seed }).palette;
        const grounds = field.map((s) => Y(plate(s)));
        const mean = field.reduce((a, s) => a + s.L, 0) / field.length;
        const a = resolveFieldPlateReferent(field, false);
        const row = (amb: number) => {
            const css = resolvePlateInk(resolveSurfaceLightness("resting", amb, false), false);
            const I = Y(ink(css));
            return { L: +(ink(css) as any).channels[0].toFixed(3), worst: +Math.min(...grounds.map((g) => ratio(I, g))).toFixed(2) };
        };
        console.log(`[ref-field] ${seed} stopsL ${field.map((s) => s.L.toFixed(2)).join(",")} plateY ${grounds.map((g) => g.toFixed(3)).join(",")} mean ${mean.toFixed(3)} ${JSON.stringify(row(mean))} maximin ${a.toFixed(3)} ${JSON.stringify(row(a))} black ${ratio(0, Math.min(...grounds)).toFixed(2)} white ${ratio(1, Math.max(...grounds)).toFixed(2)}`);
    }
});
