// SERVED MODEL: claude-opus-5-5 — X.W11.cnm: the default seed's component-name accent walk, per referent, against the measured real grounds.
import { it } from "vitest";
import { convertColor, parseCssColor } from "@mkbabb/value.js/color";
import { certifyAccentInk, resolveFieldAmbientLightness, resolveFieldPlateReferent, resolveSurfaceLightness, producerRungTint } from "../../../../../../../../demo/color-session/ink";
import { resolveAtmosphereField } from "../../../../../../../../demo/app/composables/boot/atmosphere-calibration";
import { DEFAULT_AURORA_ATOMS } from "../../../../../../../../demo/scenes/atmosphere/aurora-atoms";
const ok = <T,>(r: { ok: boolean; value?: T }) => { if (!r.ok) throw new Error("bad"); return r.value as T; };
const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const rgb8 = (css: string) => { const c = ok(convertColor(ok(parseCssColor(css)) as any, "rgb")) as any; return c.channels.slice(0, 3).map((v: number) => Math.round(Math.min(255, Math.max(0, v)))); };
const Y8 = ([r, g, b]: number[]) => 0.2126 * lin(r / 255) + 0.7152 * lin(g / 255) + 0.0722 * lin(b / 255);
const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
it("cnm accent walk", () => {
    const seed = "oklch(73% 0.185 2)";
    const field = resolveAtmosphereField({ ...structuredClone(DEFAULT_AURORA_ATOMS), seed }).palette;
    const mean = resolveFieldAmbientLightness(field, false);
    const plateRef = resolveFieldPlateReferent(field, false);
    // measured grounds (worst plate sample, light no-preference): GPU 4.08 and docker 5.02 against ink rgb(92,0,43).
    const inkY = Y8([92, 0, 43]);
    const gGPU = 4.0780 * (inkY + 0.05) - 0.05, gDocker = 5.0219 * (inkY + 0.05) - 0.05;
    console.log(`[cnm-walk] stopsL ${field.map((s) => s.L.toFixed(3)).join(",")} mean ${mean.toFixed(3)} plateRef ${plateRef.toFixed(3)} inkY ${inkY.toFixed(4)} groundY gpu ${gGPU.toFixed(4)} docker ${gDocker.toFixed(4)} restingTint ${JSON.stringify(producerRungTint("resting", false))}`);
    for (const amb of [mean, 0.76, 0.74, 0.72, 0.70, 0.68, 0.66, plateRef]) {
        const sL = resolveSurfaceLightness("resting", amb, false);
        const css = certifyAccentInk(seed, sL);
        const o = ok(convertColor(ok(parseCssColor(css)) as any, "oklch")) as any;
        const t = rgb8(css); const y = Y8(t);
        console.log(`[cnm-walk] ambient ${amb.toFixed(3)} surfaceL ${sL.toFixed(3)} -> ${css} rgb(${t}) L ${o.channels[0].toFixed(3)} C ${o.channels[1].toFixed(3)} (${(o.channels[1] / 0.185).toFixed(2)} of pick) H ${o.channels[2].toFixed(1)} | vs GPU ${ratio(y, gGPU).toFixed(3)} docker ${ratio(y, gDocker).toFixed(3)}`);
    }
});
