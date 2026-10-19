// SERVED MODEL: claude-opus-5-5[1m]
//
// X.W6.c gate **c3** — ONE LITERAL DIALECT: authored and minted stops print in
// one grammar.
//
//   npx vite-node docs/tranches/X/gates/gate-literal-dialect.mjs
//
// Headless against the TREE (GRADSTOP-A §7, the STALE-SERVER LAW): never the
// long-running dev server, whose modules may predate the bytes under test.
//
// RED at open (W6.md c3): a stop MINTED through the model's add path printed
// `oklch(74.32% 0.15204 153.16deg)` beside the model's AUTHORED seed
// `oklch(0.65 0.18 265)` — two grammars in one copyable readout.
//
// WHAT IT CHECKS, through the model's OWN paths (never a re-implementation):
//
//   1 · The seeded (authored) stops and a stop minted through `mintStop` —
//       the path a bar press and the keyboard caret both take — share ONE
//       grammar shape: the function name and each channel's unit, numerals
//       abstracted. Minted at three ordinals, one of them inside a `steps()`
//       interval, so the mint is not a lucky terminal copy.
//   2 · The copyable readout (`simpleCSS`, what the CSS panel shows and the
//       Copy action writes) prints every one of those literals — so "one
//       readout" is measured on the readout, not on the array.
//   3 · Every model-authored literal round-trips the shipped `parseCssColor`.
//   4 · The dialect's digit policy is visible: no numeral carries more than
//       five decimal places (the policy `formatColorLiteral` states).
//   NEGATIVE CONTROL (printed every run): the shape classifier must tell the
//   adjudicated RED pair apart — if `oklch(0.65 0.18 265)` and
//   `oklch(74.32% 0.15204 153.16deg)` classify as one shape, the gate is blind
//   and exits RED on that alone.
//
// Exit 0 = GREEN. Exit 1 = RED.

import { parseCssColor } from "../../../../src/css/index.ts";
import { useGradientModel } from "../../../../demo/workbenches/gradient/composables/useGradientModel.ts";

const fails = [];

/** A literal's grammar shape: numerals abstracted to N, everything else kept. */
const shapeOf = (css) => css.replace(/-?\d+(?:\.\d+)?(?:e-?\d+)?/gi, "N");

// Negative control — the classifier must see the adjudicated two-grammar pair.
const RED_AUTHORED = "oklch(0.65 0.18 265)";
const RED_MINTED = "oklch(74.32% 0.15204 153.16deg)";
const controlDistinct = shapeOf(RED_AUTHORED) !== shapeOf(RED_MINTED);
console.log(
    `negative control: ${shapeOf(RED_AUTHORED)} vs ${shapeOf(RED_MINTED)} → ${controlDistinct ? "FAIL (two shapes — the classifier sees the RED pair)" : "BLIND"}`,
);
if (!controlDistinct)
    fails.push(
        "negative control: the shape classifier cannot tell the adjudicated RED pair apart",
    );

const m = useGradientModel();
const authored = m.stops.value.map((s) => s.cssColor);

// A steps() curve on the first interval, so one mint lands inside a curved span.
const first = m.stops.value[0];
m.setStopEasing(first.id, {
    mode: "steps",
    css: "steps(4, jump-end)",
    fn: undefined,
    points: [0, 0, 1, 1],
    steps: 4,
    term: "jump-end",
});
for (const p of [37.5, 62.5, 81.2]) m.mintStop(p);
const minted = m.stops.value
    .map((s) => s.cssColor)
    .filter((c) => !authored.includes(c));

console.log(`authored: ${authored.join("  |  ")}`);
console.log(`minted:   ${minted.join("  |  ")}`);
if (minted.length !== 3)
    fails.push(`expected 3 minted literals, read ${minted.length}`);

const shapes = new Set([...authored, ...minted].map(shapeOf));
console.log(
    `grammar shapes across authored + minted: ${[...shapes].join("  ,  ")}  (${shapes.size})`,
);
if (shapes.size !== 1)
    fails.push(`${shapes.size} grammars in one readout: ${[...shapes].join(" / ")}`);

const readout = m.simpleCSS.value;
console.log(`readout: ${readout}`);
for (const lit of [...authored, ...minted]) {
    if (!readout.includes(lit)) fails.push(`the readout does not print ${lit}`);
}

for (const lit of [...authored, ...minted]) {
    const r = parseCssColor(lit);
    if (!r.ok) fails.push(`${lit} does not parse with the shipped parseCssColor`);
    const places = Math.max(0, ...(lit.match(/\.\d+/g) ?? []).map((d) => d.length - 1));
    if (places > 5) fails.push(`${lit} prints ${places} decimal places (policy: ≤ 5)`);
}

if (fails.length) {
    console.error(
        "GATE c3 (literal dialect) — RED\n" + fails.map((f) => "  " + f).join("\n"),
    );
    process.exit(1);
}
console.log("GATE c3 (literal dialect) — GREEN");
