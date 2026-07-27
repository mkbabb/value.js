import { describe, it } from "vitest";
import { certifyAccentInk, resolveSurfaceLightness } from "/Users/mkbabb/Programming/value.js/demo/color-session/ink";
// measured composited ambient range from t-a11y-contrast F-1 (cited in
// useContrastSafeColor.ts:26): 0.376 (dark) .. 0.936 (light)
describe("CHALLENGE-D · raw-pick ink certification sweep", () => {
    it("fraction of representative picks the guard MOVES (= uncertified raw pick is wrong)", () => {
        for (const [tier, dark, ambientL] of [
            ["floating", false, 0.936], ["floating", true, 0.376],
            ["resting", false, 0.936], ["resting", true, 0.376],
        ] as const) {
            const L = resolveSurfaceLightness(tier as any, ambientL, dark);
            let moved = 0, total = 0; const samples: string[] = [];
            for (let h = 0; h < 360; h += 15)
                for (const l of [0.45, 0.6, 0.75, 0.9])
                    for (const c of [0.05, 0.15, 0.25]) {
                        const css = `oklch(${l} ${c} ${h})`; total++;
                        const out = certifyAccentInk(css, L);
                        if (out !== css) { moved++; if (samples.length < 2) samples.push(`${css} -> ${out}`); }
                    }
            console.log(`[INK] tier=${tier} scheme=${dark?"dark":"light"} ambientL=${ambientL} surfaceL=${L.toFixed(4)} MOVED=${moved}/${total} (${(100*moved/total).toFixed(1)}%)`);
            samples.forEach(s => console.log(`       e.g. ${s}`));
        }
    });
});
