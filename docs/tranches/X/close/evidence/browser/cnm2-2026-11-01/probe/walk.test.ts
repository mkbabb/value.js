// SERVED MODEL: claude-opus-5-5 — X.W11.cnm2: the shipped hue-bounded resting walk at the default seed, against cnm's measured grounds and the model's darkest stop.
import { it } from "vitest";
import { convertColor, parseCssColor } from "@mkbabb/value.js/color";
import { certifyAccentInk, resolveRestingAccentReferent, resolveFieldAmbientLightness, resolveFieldPlateReferent, resolveSurfaceLightness } from "../../../../../../../../demo/color-session/ink";
import { resolveAtmosphereField } from "../../../../../../../../demo/app/composables/boot/atmosphere-calibration";
import { DEFAULT_AURORA_ATOMS } from "../../../../../../../../demo/scenes/atmosphere/aurora-atoms";
const ok = <T,>(r: { ok: boolean; value?: T }) => { if (!r.ok) throw new Error("bad"); return r.value as T; };
const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const rgb8 = (css: string) => { const c = ok(convertColor(ok(parseCssColor(css)) as any, "rgb")) as any; return c.channels.slice(0, 3).map((v: number) => Math.round(Math.min(255, Math.max(0, v)))); };
const Y8 = ([r, g, b]: number[]) => 0.2126 * lin(r / 255) + 0.7152 * lin(g / 255) + 0.0722 * lin(b / 255);
const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
it("cnm2 walk", () => {
    const seed = "oklch(73% 0.185 2)";
    const field = resolveAtmosphereField({ ...structuredClone(DEFAULT_AURORA_ATOMS), seed }).palette;
    const over = (r: number) => resolveSurfaceLightness("resting", r, false);
    const mean = resolveFieldAmbientLightness(field, false), plate = resolveFieldPlateReferent(field, false);
    const meanY = Y8([92, 0, 43]);
    const gGPU = 4.0780 * (meanY + 0.05) - 0.05, gDocker = 5.0219 * (meanY + 0.05) - 0.05;
    const darkestY = 0.182;
    for (const [name, css] of [["mean (HEAD)", certifyAccentInk(seed, over(mean))], ["hue-bounded (cnm2)", certifyAccentInk(seed, over(resolveRestingAccentReferent(seed, mean, plate, over)))], ["plate (refused)", certifyAccentInk(seed, over(plate))]] as const) {
        const o = ok(convertColor(ok(parseCssColor(css)) as any, "oklch")) as any; const t = rgb8(css); const y = Y8(t);
        console.log(`[cnm2-walk] ${name}: ${css} rgb(${t}) C ${o.channels[1].toFixed(4)} (${(o.channels[1] / 0.185).toFixed(3)} of pick) | GPU ${ratio(y, gGPU).toFixed(3)} docker ${ratio(y, gDocker).toFixed(3)} darkest-stop ${ratio(y, darkestY).toFixed(3)}`);
    }
    // The model's per-stop grounds: the resting plate over each stop's luminance lightness (a one-stop field's dark ambient is that stop's luminance L).
    const neutralY = (L: number) => Y8(rgb8(`oklch(${L} 0 0)`));
    const stopGrounds = field.map((s) => over(resolveFieldAmbientLightness([s], true)));
    for (const [name, css] of [["mean (HEAD)", certifyAccentInk(seed, over(mean))], ["hue-bounded (cnm2)", certifyAccentInk(seed, over(resolveRestingAccentReferent(seed, mean, plate, over)))]] as const) {
        const y = Y8(rgb8(css));
        console.log(`[cnm2-model] ${name}: per-stop resting-plate ratio ${stopGrounds.map((g) => ratio(y, neutralY(g)).toFixed(3)).join(" / ")} (stops L ${field.map((s) => s.L.toFixed(3)).join(",")})`);
    }
    console.log(`[cnm2-walk] mean ${mean.toFixed(4)} plate ${plate.toFixed(4)}`);
});
