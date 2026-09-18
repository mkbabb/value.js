// P2 — the STRIP-vs-FIELD seam. Re-implements, VERBATIM, the two demo functions
// under test (they are TS; this is a byte-faithful JS transcription, cited below):
//   · resolveCalibratedAtmosphere  — demo/color-picker/composables/boot/atmosphere-calibration.ts:95-103
//   · guaranteeSeamOffset          — demo/color-picker/composables/boot/useAtmosphere.ts:92-110
// Run: node <this file>
import { resolveAtoms, DEFAULT_AURORA_CONFIG } from "@mkbabb/glass-ui/aurora";
import { cssToOklch } from "@mkbabb/glass-ui/color";

const CALIBRATED_BREATH_PERIOD = 26;
const CALIBRATED_SOFTMAX_BETA = 4;
const VIVIDNESS_C_LO = 0.02, VIVIDNESS_C_HI = 0.1;
const smoothstep = (lo, hi, x) => { const t = Math.min(1, Math.max(0, (x - lo) / (hi - lo))); return t * t * (3 - 2 * t); };
const seedChroma = (seed) => { if (typeof seed !== "string") return seed?.C ?? VIVIDNESS_C_HI; try { return cssToOklch(seed).C; } catch { return VIVIDNESS_C_HI; } };
function resolveCalibratedAtmosphere(atoms) {
    const base = { ...DEFAULT_AURORA_CONFIG, breathPeriod: CALIBRATED_BREATH_PERIOD, softmaxBeta: CALIBRATED_SOFTMAX_BETA, vividness: smoothstep(VIVIDNESS_C_LO, VIVIDNESS_C_HI, seedChroma(atoms.seed)) };
    return resolveAtoms(atoms, base);
}
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const DERIVE_SEAM_FLOOR = 0.06;
const seedLightness = (seed) => { if (typeof seed !== "string") return (typeof seed === "object" && seed) ? seed.L : null; try { return cssToOklch(seed).L; } catch { return null; } };
function guaranteeSeamOffset(config, seed) {
    const seedL = seedLightness(seed);
    const palette = config.palette;
    if (seedL == null || !palette?.length) return config;
    const meanL = palette.reduce((s, st) => s + st.L, 0) / palette.length;
    const delta = meanL - seedL;
    if (Math.abs(delta) >= DERIVE_SEAM_FLOOR) return config;
    let dir = delta >= 0 ? 1 : -1;
    const need = DERIVE_SEAM_FLOOR - Math.abs(delta);
    const headroom = dir === 1 ? 0.98 - meanL : meanL - 0.02;
    if (headroom < need) dir = -dir;
    const push = dir * (DERIVE_SEAM_FLOOR - dir * delta);
    return { ...config, palette: palette.map((st) => ({ ...st, L: clamp(st.L + push, 0.02, 0.98) })) };
}

// The pane's live atoms (DEFAULT_AURORA_ATOMS, aurora-atoms.ts:53-71)
const ATOMS = { harmony: "analogous", colorEnergy: 0.76, zones: { count: 6, arrangement: "scattered" }, noise: 0.5, medium: { kind: "smooth" }, motion: "drifting", interactivity: { swirl: true } };
const HARMONIES = ["analogous","complementary","split-complementary","triad","tetradic","monochrome"];

// What the strip shows (aurora-harmony-stops.ts:38) vs what the field paints (useAtmosphere.ts:170)
const fmt = (v) => v.toFixed(4).replace(/\.?0+$/, "");
const strip = (atoms, h) => resolveCalibratedAtmosphere({ ...atoms, harmony: h }).palette.map((s) => `oklch(${fmt(s.L)} ${fmt(s.C)} ${fmt(s.h)})`);
const field = (atoms, h) => { const a = { ...atoms, harmony: h }; return guaranteeSeamOffset(resolveCalibratedAtmosphere(a), a.seed).palette.map((s) => `oklch(${fmt(s.L)} ${fmt(s.C)} ${fmt(s.h)})`); };

console.log("=== A · O-14 truth law: strip === field?  (seed grid x harmony) ===");
let total = 0, diverged = 0, maxDL = 0;
const rows = [];
for (let L = 0.10; L <= 0.95; L += 0.05) {
    for (const C of [0.0, 0.05, 0.12, 0.2, 0.28]) {
        for (const h of HARMONIES) {
            const seed = `oklch(${L.toFixed(2)} ${C} 25)`;
            const atoms = { ...ATOMS, seed };
            const s = strip(atoms, h), f = field(atoms, h);
            total++;
            if (JSON.stringify(s) !== JSON.stringify(f)) {
                diverged++;
                const sl = resolveCalibratedAtmosphere({ ...atoms, harmony: h }).palette.map((x) => x.L);
                const fl = guaranteeSeamOffset(resolveCalibratedAtmosphere({ ...atoms, harmony: h }), seed).palette.map((x) => x.L);
                const dl = Math.max(...sl.map((v, i) => Math.abs(v - fl[i])));
                maxDL = Math.max(maxDL, dl);
                rows.push({ seed, h, dl: +dl.toFixed(4) });
            }
        }
    }
}
console.log(`  strip != field in ${diverged} / ${total} (seed x harmony) cases;  max |dL| = ${maxDL.toFixed(4)}`);
console.log("  first 4 divergent rows:", JSON.stringify(rows.slice(0, 4)));
const appDefault = { ...ATOMS, seed: "oklch(0.6 0.15 25)" };
console.log(`  at a mid seed oklch(0.6 0.15 25): strip===field ? ${JSON.stringify(strip(appDefault,"analogous")) === JSON.stringify(field(appDefault,"analogous"))}`);

console.log("\n=== B · does guaranteeSeamOffset actually deliver its own guarantee? ===");
// The law it states (useAtmosphere.ts:88-90): |field mean L - wax L| >= 0.06.
// The headroom test uses the MEAN's headroom; the clamp is applied PER STOP.
let checked = 0, broken = 0; const bad = [];
for (let L = 0.02; L <= 0.99; L += 0.01) {
    for (const C of [0.0, 0.04, 0.1, 0.18, 0.28]) {
        for (const h of HARMONIES) {
            const seed = `oklch(${L.toFixed(2)} ${C} 25)`;
            const atoms = { ...ATOMS, seed, harmony: h };
            const cfg = resolveCalibratedAtmosphere(atoms);
            const out = guaranteeSeamOffset(cfg, seed);
            const seedL = cssToOklch(seed).L;
            const meanBefore = cfg.palette.reduce((s, x) => s + x.L, 0) / cfg.palette.length;
            if (Math.abs(meanBefore - seedL) >= DERIVE_SEAM_FLOOR) continue; // guard did not fire
            checked++;
            const meanAfter = out.palette.reduce((s, x) => s + x.L, 0) / out.palette.length;
            const got = Math.abs(meanAfter - seedL);
            if (got < DERIVE_SEAM_FLOOR - 1e-9) { broken++; if (bad.length < 6) bad.push({ seed, h, want: DERIVE_SEAM_FLOOR, got: +got.toFixed(4) }); }
        }
    }
}
console.log(`  guard FIRED in ${checked} cases; guarantee BROKEN in ${broken} of them`);
if (bad.length) console.log("  examples:", JSON.stringify(bad, null, 1));

console.log("\n=== C · does the shift preserve the palette's internal spread, as claimed? ===");
let spreadChecked = 0, spreadCrushed = 0; const crush = [];
for (let L = 0.02; L <= 0.99; L += 0.01) {
    for (const C of [0.0, 0.1, 0.28]) {
        const seed = `oklch(${L.toFixed(2)} ${C} 25)`;
        const atoms = { ...ATOMS, seed };
        const cfg = resolveCalibratedAtmosphere(atoms);
        const before = cfg.palette.map((s) => s.L);
        const meanBefore = before.reduce((a, b) => a + b, 0) / before.length;
        if (Math.abs(meanBefore - cssToOklch(seed).L) >= DERIVE_SEAM_FLOOR) continue;
        spreadChecked++;
        const after = guaranteeSeamOffset(cfg, seed).palette.map((s) => s.L);
        const sb = Math.max(...before) - Math.min(...before), sa = Math.max(...after) - Math.min(...after);
        if (Math.abs(sa - sb) > 1e-9) { spreadCrushed++; if (crush.length < 5) crush.push({ seed, spreadBefore: +sb.toFixed(4), spreadAfter: +sa.toFixed(4) }); }
    }
}
console.log(`  guard fired ${spreadChecked} times; internal L-spread CHANGED in ${spreadCrushed}`);
if (crush.length) console.log("  examples:", JSON.stringify(crush, null, 1));
