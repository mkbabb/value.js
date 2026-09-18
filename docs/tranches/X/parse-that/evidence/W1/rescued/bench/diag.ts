import { CSSValues, parseCSSValue } from "../deposed-full/src/parsing/index.ts";
import { parseCSSStylesheet } from "../deposed-full/src/parsing/stylesheet/index.ts";
const tryIt = (label: string, fn: () => unknown) => {
    try { const r = fn(); console.log(`  OK   ${label} ->`, JSON.stringify(r)?.slice(0,60)); }
    catch (e) { console.log(`  ERR  ${label} ->`, (e as Error).message?.slice(0,80)); }
};
console.log("=== deposed CSSValues.Value.parse (raw hot path) ===");
for (const v of ["oklch(0.7 0.15 30)","cubic-bezier(0.42, 0, 0.58, 1)","linear-gradient(to right, red, blue)","translateX(100px)","calc(100% - 2rem)","var(--color, red)","42px","blue","spring(1, 100, 10, 0)","linear(0, 0.5 50%, 1)"]) {
    tryIt(v, () => CSSValues.Value.parse(v));
}
console.log("=== deposed parseCSSValue (tryParse/throwing API) ===");
tryIt("oklch(0.7 0.15 30)", () => parseCSSValue("oklch(0.7 0.15 30)"));
console.log("=== deposed parseCSSStylesheet ===");
for (const s of [".a { color: red; }",".card { padding: 1rem; background: oklch(0.7 0.15 30); }","@media (min-width: 600px) { .grid { display: grid; } }",".a { color: oklch(62.8% .257 29.23 / 85%); }"]) {
    tryIt(s.slice(0,45), () => parseCSSStylesheet(s));
}
