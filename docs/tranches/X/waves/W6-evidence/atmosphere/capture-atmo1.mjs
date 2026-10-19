// SERVED MODEL: claude-opus-5-5[1m]
//
// X.W6.i · X:ATMO-1 — the FRAME CAPTURE for gate i1. This script is the only
// writer of the frames; `e2e/smoke/oracles/o25-atmosphere-response.spec.ts` is
// the only reader, and it reads the COMMITTED bytes (it refuses a frame git
// does not track), so i1 can never be passed by a description.
//
//   npx vite --port 9002 --strictPort          # a FRESHLY started dev server
//   node docs/tranches/X/waves/W6-evidence/atmosphere/capture-atmo1.mjs
//   git add -f docs/tranches/X/waves/W6-evidence/atmosphere/atmo1-*.png
//
// One frame per seed, each on a COLD load (a fresh context: no storage, no
// ground record) of `#/?space=oklch&color=<seed>`, settled 3 s, 1440×900
// chromium — the smoke cell. Plus the unseeded reference frame (`#/`). The
// seeds share L and C and walk the hue circle, so the ONLY thing that moves
// between frames is the seed's hue: whatever the atoms do, the seed did.

import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ORIGIN = process.env.ATMO1_ORIGIN ?? "http://localhost:9002";
export const ATMO1_SEEDS = [
    ["ref", null],
    ["h030", "oklch(0.62 0.2 30)"],
    ["h120", "oklch(0.62 0.2 120)"],
    ["h210", "oklch(0.62 0.2 210)"],
    ["h300", "oklch(0.62 0.2 300)"],
];

const browser = await chromium.launch();
for (const [name, seed] of ATMO1_SEEDS) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const hash = seed ? `#/?space=oklch&color=${encodeURIComponent(seed)}` : "#/";
    await page.goto(`${ORIGIN}/${hash}`);
    await page.waitForTimeout(3000);
    await page.mouse.move(0, 0);
    const out = join(HERE, `atmo1-${name}.png`);
    writeFileSync(out, await page.screenshot());
    console.log(`${name} ${seed ?? "(unseeded)"} → ${out}`);
    await ctx.close();
}
await browser.close();
