// R-7 · C-15 boundary sweep of the LIVE generatePalette (demo/color-session/generate-color.ts) via vite-node
// (the repo's own vite config resolves the @mkbabb/value.js self-aliases). Node-only, no browser.
import { generatePalette } from "../../../../../../../demo/color-session/generate-color.ts";
import { writeFileSync } from "node:fs";
const t = (f: () => string[]) => { try { const v = f(); return { ok: true, len: v.length, head: v.slice(0, 2) }; } catch (e: any) { return { ok: false, err: String(e.message).slice(0, 120) }; } };
const same = (a: number, b: number) => JSON.stringify(generatePalette(5, "vibrant", "golden", a)) === JSON.stringify(generatePalette(5, "vibrant", "golden", b));
const out = {
  at: new Date().toISOString(),
  count0: t(() => generatePalette(0, "vibrant", "golden", 1)),
  countNeg1: t(() => generatePalette(-1, "vibrant", "golden", 1)),
  countNaN: t(() => generatePalette(NaN, "vibrant", "golden", 1)),
  count1: t(() => generatePalette(1, "vibrant", "golden", 1)),
  count50: t(() => generatePalette(50, "vibrant", "golden", 1)),
  count51: t(() => generatePalette(51, "vibrant", "golden", 1)),
  alias_1_vs_1p5: same(1, 1.5),
  alias_0_vs_2pow32: same(0, 2 ** 32),
  alias_1_vs_2pow32plus1: same(1, 2 ** 32 + 1),
  alias_2pow31_vs_neg2pow31: same(2 ** 31, -(2 ** 31)),
  distinct_1_vs_2: !same(1, 2),
  deterministic_same_seed: same(12345, 12345),
  uiSeedDomain: "useColorGeneration.ts: Math.floor(Math.random()*0xffffffff) — integers in [0, 2^32-1); UI count slider bounds the count",
};
writeFileSync("/Users/mkbabb/Programming/value.js/docs/tranches/X/execution/SS8/evidence/B26-extract-generate-panes/r7-c15.json", JSON.stringify(out, null, 1));
console.log(JSON.stringify(out));
