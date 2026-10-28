// SS-8 · B19 probe F (2026-10-20) — C-9 fuzz v2: the full AuroraAtoms shape (DEFAULT_AURORA_ATOMS
// spread, as AuroraPane passes it) with seed / colorEnergy / zone count / arrangement / noise varied,
// through the LIVE `auroraHarmonyStops`. A stop is bad if it carries NaN/Infinity/undefined or the
// UA refuses it as a <color> (CSS.supports) — the "data-stops asserts a color the paint drops" arm.
import { launch, cell, save, go } from "./lib.mjs";

const FS = "/@fs/Users/mkbabb/Programming/value.js/demo";
const browser = await launch();
let out;
try {
    out = await cell(browser, {}, async (page) => {
        await go(page, "atmosphere");
        return page.evaluate(async (FS) => {
            const A = await import(`${FS}/scenes/atmosphere/aurora-harmony-stops.ts`);
            const D = (await import(`${FS}/scenes/atmosphere/aurora-atoms.ts`)).DEFAULT_AURORA_ATOMS;
            const H = ["analogous", "complementary", "split-complementary", "triad", "tetradic", "monochrome"];
            const seeds = ["#808080", "#ffffff", "#000000", "oklch(0.63 0 0)", "oklch(0.63 0 none)", "oklch(0 0 0)", "oklch(1 0 0)", "oklch(0.63 0.4 360)"];
            let r = 7;
            const rnd = () => ((r = (r * 1103515245 + 12345) % 2147483648) / 2147483648);
            for (let i = 0; i < 300; i++) seeds.push(`oklch(${rnd().toFixed(3)} ${(rnd() * 0.4).toFixed(3)} ${(rnd() * 360).toFixed(1)})`);
            let calls = 0, threw = 0;
            const bad = [];
            for (const seed of seeds) for (const h of H) for (const colorEnergy of [0, 0.5, 1]) for (const count of [1, 3, 6, 9]) for (const arrangement of ["scattered", "composed", "centred"]) {
                calls++;
                const atoms = { ...D, seed, colorEnergy, noise: rnd(), zones: { count, arrangement } };
                try {
                    const st = A.auroraHarmonyStops(atoms, h);
                    const nan = st.filter((s) => /NaN|Infinity|undefined/.test(s));
                    const unpaint = st.filter((s) => !CSS.supports("color", s));
                    if (nan.length || unpaint.length || st.length === 0) bad.push({ seed, h, colorEnergy, count, arrangement, nan: nan.slice(0, 2), unpaint: unpaint.slice(0, 2), n: st.length });
                } catch (e) { threw++; if (bad.length < 20) bad.push({ seed, h, count, err: String(e).slice(0, 120) }); }
            }
            return { calls, threw, badN: bad.length, bad: bad.slice(0, 20), defaultKeys: Object.keys(D) };
        }, FS);
    });
} finally {
    await browser.close();
}
save("probe-f.json", out);
console.log(JSON.stringify(out).slice(0, 600));
