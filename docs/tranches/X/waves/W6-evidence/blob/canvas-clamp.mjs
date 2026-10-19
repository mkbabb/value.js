// SERVED MODEL: claude-opus-5[1m]
//
// X.W6.h · the ONE browser reading the h2 census carries — the 1×1-canvas 2D
// resolver `W6.md:284` names as candidate stripper 1.
//
//   node docs/tranches/X/waves/W6-evidence/blob/canvas-clamp.mjs
//
// It runs on `about:blank`, NOT against the app: the thing under measurement is
// a browser primitive (`fillStyle` + `fillRect(0,0,1,1)` + `getImageData`), and
// mounting the product around it would only add a dev server this reading does
// not need (STALE-SERVER law, `W6.md:148` — a headless cell is the authority).
//
// The draw is copied line-for-line from `useContrastSafeColor.ts:99-110`,
// including the dual-ground alpha recovery, so what is measured here is the
// consumer's own operator and not a paraphrase of it.
//
// The census rules this candidate OFF the blob's chroma path — `HeroBlob.vue`
// reaches the module only through `resolveSurfaceLightnessLive`, whose sole
// consumer `floorStops` writes `L` alone. This transcript exists so the RULING
// rests on a measurement rather than on a reading: the clamp is real, it is
// large, and it is simply not on this path.
import { chromium } from "playwright";
import { cssToOklch } from "@mkbabb/glass-ui/color";

const SEEDS = [
    "lab(92% 88.8 20)",
    "oklch(0.65 0.30 150)",
    "color(display-p3 0 1 0)",
    "oklch(0.55 0.37 328)",
];

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("about:blank");
const rows = await page.evaluate((seeds) => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    const draw = (ground, css) => {
        ctx.fillStyle = ground;
        ctx.fillRect(0, 0, 1, 1);
        ctx.fillStyle = "#000";
        ctx.fillStyle = css;
        ctx.fillRect(0, 0, 1, 1);
        return ctx.getImageData(0, 0, 1, 1).data;
    };
    return seeds.map((css) => {
        const onBlack = draw("#000", css);
        const onWhite = draw("#fff", css);
        const alpha = 1 - ((onWhite[0] ?? 0) - (onBlack[0] ?? 0)) / 255;
        return {
            css,
            alpha,
            r: (onBlack[0] ?? 0) / alpha,
            g: (onBlack[1] ?? 0) / alpha,
            b: (onBlack[2] ?? 0) / alpha,
        };
    });
}, SEEDS);
await browser.close();

console.log("X.W6.h — the 1×1-canvas 2D resolver, chromium, about:blank");
console.log(
    "draw copied from useContrastSafeColor.ts:99-110 (dual-ground alpha recovery)",
);
for (const row of rows) {
    const seed = cssToOklch(row.css);
    const after = cssToOklch(`rgb(${row.r} ${row.g} ${row.b})`);
    console.log(
        `  ${row.css.padEnd(24)} seed C ${seed.C.toFixed(5)} h ${seed.h.toFixed(2).padStart(6)}` +
            `  →  rgb(${row.r.toFixed(0)} ${row.g.toFixed(0)} ${row.b.toFixed(0)})` +
            `  C ${after.C.toFixed(5)} h ${after.h.toFixed(2).padStart(6)}` +
            `  ΔC ${(((seed.C - after.C) / seed.C) * -100).toFixed(1)}%`,
    );
}
console.log(
    "\nRULING (census §2): this clamp is REAL and LARGE and is NOT on the blob's chroma path.\n" +
        "The producer's own defaultBlobColorResolver = oklchToGammaRgb ∘ cssToOklch performs the\n" +
        "numerically identical clip on the path that IS the blob's — see the census §2 closing note.",
);
