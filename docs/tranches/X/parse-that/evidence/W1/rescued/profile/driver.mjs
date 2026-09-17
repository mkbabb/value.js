// CPU-profile driver — one engine × scenario per process (clean profiles).
// Usage: node --cpu-prof --cpu-prof-interval=100 --cpu-prof-dir=out \
//          --cpu-prof-name=<tag>.cpuprofile driver.mjs <engine> <kind> <iters>
// engine: live | c14 | dep     kind: value | sheet
import {
    parseCssValue as liveValue,
    parseStylesheet as liveSheet,
} from "../live-bundle.mjs";
import {
    parseStylesheet as c14Sheet,
    parseColor as c14Color,
    parseEasing as c14Easing,
} from "../c14-bundle.mjs";
import {
    CSSValues as depValues,
    parseCSSStylesheet as depSheet,
} from "../deposed-full/deposed-bundle.mjs";

const VALUE_COMMON = ["oklch(62.8% .257 29.23 / 85%)", "cubic-bezier(0.42, 0, 0.58, 1)"];
const C14_CORPUS = [
    ".a { color: oklch(62.8% .257 29.23 / 85%); }",
    ".b:hover { animation-timing-function: cubic-bezier(.25, .1, .25, 1); }",
    ".c { color: oklch(80% .1 250); animation-timing-function: cubic-bezier(.4, 0, .2, 1); }",
];

const depCache = depSheet.cache;
const clearDep = () => { if (depCache) depCache.clear(); };

const passes = {
    "live/value": () => { for (const v of VALUE_COMMON) liveValue(v); },
    "live/sheet": () => { for (const s of C14_CORPUS) liveSheet(s); },
    "c14/value": () => { for (const v of VALUE_COMMON) (v.startsWith("cubic-bezier") ? c14Easing(v) : c14Color(v)); },
    "c14/sheet": () => { for (const s of C14_CORPUS) c14Sheet(s); },
    "dep/value": () => { for (const v of VALUE_COMMON) depValues.Value.parse(v); },
    "dep/sheet": () => { clearDep(); for (const s of C14_CORPUS) depSheet(s); },
};

const [engine, kind, itersRaw] = process.argv.slice(2);
const pass = passes[`${engine}/${kind}`];
if (!pass) { console.error(`unknown ${engine}/${kind}`); process.exit(2); }
const iters = Number(itersRaw ?? 200000);

for (let i = 0; i < 2000; i++) pass(); // warmup: tier-up before profiling window dominates
const t0 = performance.now();
for (let i = 0; i < iters; i++) pass();
const ms = performance.now() - t0;
console.error(`${engine}/${kind}: ${iters} passes in ${ms.toFixed(0)}ms (${((ms * 1e6) / iters).toFixed(0)} ns/pass)`);
