// SERVED MODEL: claude-fable-5-1
// X.P.W3.l landing probe: oracle vs candidate (js + wasm) on the at-rule / nesting / F-k2 / F-k3 / E-j2 shapes.
import { loadPublicSurfaces, SHIELD, js as jsSurface } from "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript/src/css/entry.mjs";
const oracle = await import("/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/prototypes/css-parser/cand-o/vendor/value-js-4.0.0/dist/subpaths/css.js");
const { js, wasm } = await loadPublicSurfaces();

const canon = (v) => JSON.stringify(v, (k, x) => (x && typeof x === "object" && !Array.isArray(x) ? Object.fromEntries(Object.keys(x).sort().map((key) => [key, x[key]])) : x));
const verdict = (r) => (r.ok ? "ACCEPT " + canon(r.value) : "REJECT");
const inputs = process.argv.slice(2).length ? process.argv.slice(2) : [
    "a { color: red }", "{ color: red }", "a { b { color: red } }", "a { color: red; b { x: y } }", "a { color: red; /* c */ }", "a { /* c */ color: red }", "a { /* c */ }",
    "a { b:hover { color: red } }", "a { color: red { } }", "a { x: {} }", "a, , b { }", ", { }", "a { animation-name: a,,b }", "a { animation-name: a, }", "a { x: a,,b }",
    "a { animation-name: }", "a { animation: none, none }", "a { animation-name: a, ,b }", "a { animation-duration: -1s }", "a { animation-timeline: view(x) }",
    "@keyframes k { from { color: red } to { color: blue } }", "@keyframes {}", "@keyframes  x {}", "@KEYFRAMES Foo { FROM { color: red } }", "@keyframes k { , { } }", "@keyframes k { x; }",
    "@keyframes k { from { animation-timing-function: ease, linear } }", "@keyframes k { from { animation-timing-function: ease; animation-composition: add } }", "@keyframes k { from { color: red } /* c */ }",
    "@property --x { syntax: \"<length>\"; inherits: false; initial-value: 1px }", "@property --x { syntax: \"*\"; inherits: true }", "@property x {}", "@property --x {}", "@property --x { syntax: \"<length>\"; inherits: true }",
    "@function --f(--a, --b <length>: 1px) { result: calc(var(--a)) }", "@function --f() { result: 1 }", "@function --f {}",
    "@scope (.a) to (.b) { a { color: red } }", "@scope { }", "@scoped {}", "@scope { x; }", "@SCOPE (.a) { }",
    "@starting-style { a { opacity: 0 } }", "@starting-style;", "@starting-style x {}", "@starting-style", "@Starting-Style { }",
    "@scroll-timeline --t { source: auto }", "@view-timeline --v { }", "@view-timeline --v { subject: selector(#a) }",
    "@media x { a { color: red } }", "@media { }", "@import url(x);", "@import url(x)", "@x\t {}", "@x  y  {}", "@{}", "@ media {}", "@media {{}}}", "@media x { a { b: \"}\" } }", "@font-face { src: url(\"a{b}\") }", "@media x {{}{{}}}",
    "@keyframes\tx {}", "@propertyx --x {}", "@property\t--x {}",
    "a { color: rgb(none, 6e167, 27%, 6e316) }", "a { color: rgb(.205, 65%, 8e354, 9e445) }", "a { color: rgb(1e400, 0, 0) }", "a { color: rgb(10%, 20%, 30%, 50%) }", "a { color: hsl(none, 10%, 10%) }", "a { color: hsl(10, 10%, 10%, .5) }",
    "a { color: red } b  background-color: x } b { }", "a { x { } color: red } b { }",
];
let differ = 0;
for (const input of inputs) {
    let o;
    try { o = verdict(oracle.parseStylesheet(input)); } catch (e) { o = "THROW " + e.message; }
    const j = verdict(js.parseStylesheet(input));
    const w = verdict(wasm.parseStylesheet(input));
    const same = o === j && j === w;
    if (!same) differ++;
    console.log((same ? "  ok " : "DIFF ") + JSON.stringify(input));
    if (!same) { console.log("   oracle:", o); console.log("   js    :", j); if (w !== j) console.log("   wasm  :", w); }
}
console.log(`\n${inputs.length} inputs · ${differ} differing · SHIELD.caught=${SHIELD.caught}`);
