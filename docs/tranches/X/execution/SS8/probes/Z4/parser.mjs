// SS-8 · Z4 — parser-band + library-band witness against a BUILT dist/subpaths of HEAD.
//   ~/.claude/guard/guarded --light --timeout 5 -- node parser.mjs <path-to-export-root> > out.json
// Executes the published-surface functions the records name; prints one JSON document.
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { inspect } from "node:util";

const ROOT = resolve(process.argv[2] ?? ".");
const sub = (n) => import(pathToFileURL(resolve(ROOT, "dist/subpaths", `${n}.js`)).href);
const css = await sub("css");
const easingMod = await sub("easing");

const short = (v) => inspect(v, { depth: 6, breakLength: Infinity, maxArrayLength: 8 }).slice(0, 260);
function run(fn, input) {
    try {
        const r = fn(input);
        return { threw: false, ok: r?.ok, value: r && "value" in r ? short(r.value) : undefined, error: r?.ok === false ? short(r.error ?? r) : undefined };
    } catch (e) { return { threw: true, msg: String(e).split("\n")[0].slice(0, 160) }; }
}

// R1 totality — the exact corpus of audit/probes/r1-published-totality.mjs
const FNS = ["parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues", "parseKeyframeSelector",
    "parseStylesheet", "parseTimingFunction", "parseAnimationTimeline", "parseAnimationRange"];
const NAMES = ["rgb", "rgba", "hsl", "hsla", "lab", "lch", "oklab", "oklch", "color", "hwb",
    "scroll", "view", "cubic-bezier", "steps", "linear", "var", "calc", "translate"];
const BODIES = ["()", "( )", "(/)", "(,)", "(/ )", "( / )", "(,,)", "(/ / )", "( ,)"];
const corpus = new Set(["", "  ", "/", ",", "()", "(", ")", "null", "undefined", "NaN"]);
for (const n of NAMES) for (const b of BODIES) corpus.add(n + b);
const NONSTR = [undefined, null, 0, NaN, {}, [], true];
const totality = {};
for (const f of FNS) {
    const fn = css[f];
    if (typeof fn !== "function") { totality[f] = "NOT EXPORTED"; continue; }
    let t = 0, ns = 0; const modes = new Set();
    for (const i of corpus) { const r = run(fn, i); if (r.threw) { t++; modes.add(r.msg); } }
    for (const i of NONSTR) { const r = run(fn, i); if (r.threw) { ns++; modes.add(r.msg); } }
    totality[f] = { corpus: corpus.size, throws: t, nonStringThrows: `${ns}/${NONSTR.length}`, modes: [...modes].slice(0, 3) };
}

// The parser-band "published-parser defects" table, re-run on HEAD's parseCssColor.
const TABLE = ["rgba(1, 2, 3, 0.5)", "hsla(120, 50%, 50%, 0.5)", "rgb(1,2,3,)", "rgb(1 2 3 / )", "rgb(1, 2 3)",
    "hsl(120%, 50%, 50%)", "lch(50% 50% 50%)", "rgb(300 -20 3)", "rgb(1 2 3 / 1.5)", "hsl(120 50 50)",
    "hsl(120 50% 50%)", "rgb(1. 2 3)", "hwb(120, 30%, 40%)", "currentcolor", "lab(50 1e400 0)",
    "hsl(480 50% 50%)", "hsl(-120 50% 50%)", "oklch()", "color(xyz-d50 0.2 0.3 0.4)",
    "rgb(50%20%30%)", "rgb(1.5.5 3)", "hsl(120 50%50%)", "color(constructor 0 0 0)", "color(__proto__ 0 0 0)"];
const table = Object.fromEntries(TABLE.map((i) => [i, run(css.parseCssColor, i)]));

// library-band §1: prototype-reachable lookups
const PROTO = ["constructor", "__proto__", "toString", "hasOwnProperty", "valueOf"];
const proto = {
    parseCssColor: Object.fromEntries(PROTO.slice(0, 2).map((k) => [k, run(css.parseCssColor, k)])),
    parseStylesheet: run(css.parseStylesheet, "a{color:constructor}"),
    parseTimingFunction: (() => { try { const r = css.parseTimingFunction("steps(2, constructor)"); return { threw: false, ok: r?.ok, positionType: typeof r?.value?.position, value: short(r?.value ?? r?.error) }; } catch (e) { return { threw: true, msg: String(e).slice(0, 160) }; } })(),
    easing: Object.fromEntries(PROTO.map((k) => [k, run(easingMod.easing, k)])),
    easingControl: { ease: run(easingMod.easing, "ease"), unknown: run(easingMod.easing, "not-a-name") },
};
const stable = Object.fromEntries(["ease", "ease-in", "ease-out", "ease-in-out"].map((n) => { try { const u = (r) => (r && typeof r === "object" && "value" in r ? r.value : r); const a = u(easingMod.easing(n)), b = u(easingMod.easing(n)); return [n, { sameReference: a === b, type: typeof a }]; } catch (e) { return [n, "throw " + String(e).slice(0, 80)]; } }));
const exportsList = { css: Object.keys(css).sort(), easing: Object.keys(easingMod).sort() };

console.log(JSON.stringify({ root: ROOT, totality, table, proto, easingReferenceStable: stable, exportsList }, null, 2));
