// SS-8 · Z4 — parser-band G7 three-leg bench, HEAD dist vs the published 4.0.0 artifact
// (the sha-pinned copy in prototypes/css-parser/node_modules, css.js sha256 8b5381…).
// Cells interleaved per round, 40 rounds, first 10 discarded, median ns/parse, printed sink.
//   ~/.claude/guard/guarded --light --cpu-cores 0 --timeout 5 -- node bench.mjs <head-root>
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const HEAD = resolve(process.argv[2] ?? ".");
const PUB = process.env.PUB ?? resolve(HEAD, "docs/tranches/V/megatranche/prototypes/css-parser/node_modules/@mkbabb/value.js");
const head = await import(pathToFileURL(resolve(HEAD, "dist/subpaths/css.js")).href);
const pub = await import(pathToFileURL(resolve(PUB, "dist/subpaths/css.js")).href);

const SHARED = ["#fff", "#000", "#f0f0f0", "#1a2b3c", "#ff000080", "#abcd", "red", "white", "black", "transparent",
    "rebeccapurple", "cornflowerblue", "rgb(255,0,0)", "rgb(17, 34, 51)", "rgb(0,0,0)", "rgb(255 0 0)",
    "rgb(17 34 51 / 0.5)", "rgb(50% 25% 75%)", "hsl(120 50% 50%)", "hsl(210, 100%, 50%)",
    "hsl(0.5turn 50% 50% / 0.25)", "hwb(120 20% 30%)", "lab(50% 40 30)", "lch(50 30 40deg)",
    "oklab(0.5 0.1 -0.1)", "oklch(0.7 0.15 200)", "oklch(70% 50% 200deg / 0.5)", "color(srgb 1 0 0)",
    "color(display-p3 0.5 0.5 0.5 / 0.8)", "color(xyz-d50 0.2 0.3 0.4)"];
const REJECT = ["notacolor", "#gg0000", "#12345", "rgb(1 2)", "rgb(1px 2 3)", "hsv(120 50% 50%)", "var(--brand)", "currentColor", "1px", ""];
const R1 = ["oklch()", "rgb()", "hsl( )", "lab(/)", "lch(,)", "oklab(/ )", "color( / )", "hwb(,,)", "rgba()", "hsla( ,)"];

const safe = (f) => (s) => { try { return f(s).ok ? 1 : 0; } catch { return 0; } };
const throws = (f, s) => { try { f(s); return false; } catch { return true; } };
const okBoth = SHARED.filter((s) => safe(head.parseCssColor)(s) && safe(pub.parseCssColor)(s));
const rejBoth = REJECT.filter((s) => !throws(pub.parseCssColor, s) && !throws(head.parseCssColor, s) && !safe(head.parseCssColor)(s) && !safe(pub.parseCssColor)(s));
const r1 = R1.filter((s) => throws(pub.parseCssColor, s));
const CELLS = [["HEAD parseCssColor", safe(head.parseCssColor)], ["published 4.0.0 (+catch)", safe(pub.parseCssColor)]];
const REPS = 400, ROUNDS = 40, DISCARD = 10;
let sink = 0;
function leg(corpus) {
    const t = CELLS.map(() => []);
    for (let r = 0; r < ROUNDS; r++) {
        const order = r % 2 ? [1, 0] : [0, 1];
        for (const i of order) {
            const f = CELLS[i][1];
            const s0 = process.hrtime.bigint();
            for (let k = 0; k < REPS; k++) for (const s of corpus) sink += f(s);
            if (r >= DISCARD) t[i].push(Number(process.hrtime.bigint() - s0) / (REPS * corpus.length));
        }
    }
    const med = (a) => { const b = [...a].sort((x, y) => x - y); return b[b.length >> 1]; };
    const m = t.map(med);
    return { n: corpus.length, cells: CELLS.map(([name], i) => ({ name, medianNs: Math.round(m[i]), min: Math.round(Math.min(...t[i])), max: Math.round(Math.max(...t[i])) })), headSpeedupVsPublished: +(m[1] / m[0]).toFixed(2) };
}
const out = { head: HEAD, sharedAccepted: leg(okBoth), reject: leg(rejBoth), r1Class: leg(r1), corpora: { sharedDropped: SHARED.filter((s) => !okBoth.includes(s)), rejBoth, r1 } };
out.sink = sink;
console.log(JSON.stringify(out, null, 2));
