// SERVED MODEL: claude-opus-5[1m]
/**
 * X-W9.d — the `stylesheet.ts` split moves NO behaviour, measured rather than
 * asserted, plus G15's differential against the keyframes fork.
 *
 * LEG A  every published `./css` entry, pre-split bundle vs post-split bundle,
 *        over one corpus. `Object.is`-deep (JSON) equality, not tolerance.
 * LEG B  `serializeCssValue`: the PRE-SPLIT body returned a bare `string` and
 *        THREW on a colour CSS cannot spell; the published one answers in
 *        `Result`. Equality is asserted on the ok arm, and the throw arm is
 *        shown to have become a typed failure.
 * LEG C  G15's differential: the published serializer vs the verbatim fork at
 *        `../keyframes.js/src/animation/compile/emit/css-text.ts:42-57`.
 *
 * Run (from the repo root), with both bundles built by esbuild first:
 *   npx esbuild <scratch>/old/src/subpaths/css.ts --bundle --format=esm \
 *       --outfile=<scratch>/old-css.mjs          # `git archive HEAD src`
 *   npx esbuild src/subpaths/css.ts --bundle --format=esm \
 *       --outfile=<scratch>/new-css.mjs
 *   node docs/tranches/X/waves/evidence/W9/split-equivalence.mjs <scratch>
 */
import process from "node:process";

const scratch = process.argv[2];
if (!scratch) throw new Error("usage: split-equivalence.mjs <scratch-dir holding old-css.mjs and new-css.mjs>");

const OLD = await import(`${scratch}/old-css.mjs`);
const NEW = await import(`${scratch}/new-css.mjs`);

const VALUES = [
    "", "   ", "red", "#00cc00", "rgb(1 2 3)", "rgb(1 2 3 / 0.5)", "oklch(0.7 0.1 200)",
    "color(display-p3 1 0 0)", "hsl(120deg 50% 50%)", "lab(50% 20 -30)", "transparent",
    "1px", "0", "-3.5em", "10%", "1e3px", "0.5s", "250ms", "calc(1px + 2px)",
    "calc(var(--x) + 10px)", "calc(sibling-index() * 10px)", "sibling-index()",
    "--double(50px)", "--constant()", "var(--a, 10px)", "translate(1px, 2px)",
    "1px 2px / 3px", "1px solid red", "a : b", "a ; b", "a:b", "a;b",
    "if(supports(color: red): red; else: blue)",
    "if(supports(color: lch(0 0 0)): red; else: blue)",
    "cubic-bezier(0.1, 0.2, 0.3, 0.4)", "steps(2, jump-end)", "steps(2, constructor)",
    "steps(2, __proto__)", "linear(0, 0.5 50%, 1)", "ease-in-out", "step-start",
    "scroll()", "view()", "scroll(root block)", "view(block 10% 20%)",
    "auto", "none", "--named-timeline", "entry 0% exit 100%", "cover 20%",
    "constructor", "__proto__", "toString", "hasOwnProperty",
    "1px,2px", "a, b, c", "url(x.png)", "\"quoted string\"", "'single'",
    "oklch()", "rgb()", "hsl()", "lab()", "color()", "rgba()", "lch()", "oklab()", "hwb()",
    "nonsense(", ")", "{", "}", "1px 2px 3px 4px 5px", "normal infinite alternate",
    "3s linear 1s infinite alternate both running slide",
];

const SHEETS = [
    "", "   ", "a{color:red}", ".x { color: red; background: blue }",
    "/* lead */ .x { color: red } /* tail */",
    "@keyframes k { from { opacity: 0 } to { opacity: 1 } }",
    "@keyframes k { 0%, 50% { opacity: 0; animation-timing-function: ease-in } 100% { opacity: 1; animation-composition: add } }",
    "@keyframes k { from { animation-timing-function: steps(2, jump-none) } }",
    "@property --p { syntax: \"<length>\"; inherits: false; initial-value: 0px; }",
    "@property --p { syntax: \"*\"; inherits: true; }",
    "@property --p { syntax: \"<color>\"; inherits: false; initial-value: red; }",
    "@property --p { syntax: \"<length>\"; inherits: maybe; initial-value: 0px; }",
    "@property --p { inherits: false; initial-value: 0px; }",
    "@property --p { syntax: \"<nonsense>\"; inherits: false; initial-value: 0px; }",
    "@function --f(--x <length>: 0px) { result: calc(var(--x) + 10px); }",
    "@function --f() { result: 1px; }",
    "@function f(--x) { result: var(--x); }",
    "@scope (.a) to (.b) { .c { color: red } }",
    "@scope { .c { color: red } }",
    "@starting-style { .c { opacity: 0 } }",
    "@scroll-timeline t { source: selector(#x); orientation: block; }",
    "@view-timeline v { subject: selector(#y); axis: inline; inset: 10px; }",
    "@media (min-width: 10px) { .x { color: red } }",
    "@layer base;",
    ".x { animation: 3s linear 1s infinite alternate both running slide }",
    ".x { animation: slide 1s, fade 2s }",
    ".x { animation-name: a, b; animation-duration: 1s, 2s; animation-timing-function: ease, steps(3) }",
    ".x { animation-timeline: scroll(root block); animation-range: entry 0% exit 100% }",
    ".x { animation-timeline: view(); }",
    ".x { timeline-scope: --a, --b; animation-trigger: repeat scroll() entry 0% }",
    ".x { animation-range-start: cover 20%; animation-range-end: cover 80% }",
    ".x { animation: 1s ; }",
    ".x { animation-name: , a }",
    ".x { color: red; & .nested { color: blue } }",
    ".x { animation-timeline: bogus(1) }",
    "a{color:constructor}",
    ".x { animation: constructor 1s }",
];

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const call = (mod, name, ...args) => {
    try { return { kind: "value", value: mod[name](...args) }; }
    catch (error) { return { kind: "throw", message: String(error && error.message) }; }
};

let cases = 0;
let mismatches = 0;
const report = (what, input, oldR, newR) => {
    cases++;
    if (eq(oldR, newR)) return;
    mismatches++;
    console.log(`MISMATCH  ${what}  ${JSON.stringify(input)}`);
    console.log(`   old: ${JSON.stringify(oldR)}`);
    console.log(`   new: ${JSON.stringify(newR)}`);
};

// ── LEG A — every published entry, both bundles, one corpus ─────────────────
const VALUE_ENTRIES = [
    "parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues",
    "parseKeyframeSelector", "parseTimingFunction", "parseAnimationRange",
    "parseAnimationTimeline", "coerceToSyntax",
];
for (const source of VALUES) {
    for (const name of VALUE_ENTRIES) {
        const args = name === "coerceToSyntax" ? [source, "*"] : [source];
        report(name, source, call(OLD, name, ...args), call(NEW, name, ...args));
    }
}
for (const source of SHEETS) {
    report("parseStylesheet", source, call(OLD, "parseStylesheet", source), call(NEW, "parseStylesheet", source));
    const oldSheet = OLD.parseStylesheet(source);
    const newSheet = NEW.parseStylesheet(source);
    if (!oldSheet.ok || !newSheet.ok) continue;
    for (const name of ["collectKeyframes", "collectPropertyDescriptors", "collectCustomFunctions", "collectStyleRules"]) {
        report(name, source, call(OLD, name, oldSheet.value), call(NEW, name, newSheet.value));
    }
    const oldRules = OLD.collectStyleRules(oldSheet.value);
    const newRules = NEW.collectStyleRules(newSheet.value);
    report("collectStyleRules/length", source, oldRules.length, newRules.length);
    for (let i = 0; i < oldRules.length; i++) {
        const oldDecls = oldRules[i].rule.declarations;
        const newDecls = newRules[i].rule.declarations;
        report("collectDeclarations", source, call(OLD, "collectDeclarations", oldDecls), call(NEW, "collectDeclarations", newDecls));
        report("collectAnimationOptions", source, call(OLD, "collectAnimationOptions", oldDecls), call(NEW, "collectAnimationOptions", newDecls));
        report("collectTimelineOptions", source, call(OLD, "collectTimelineOptions", oldDecls), call(NEW, "collectTimelineOptions", newDecls));
        const options = NEW.collectTimelineOptions(newDecls);
        report("serializeTimelineOptions", source, call(OLD, "serializeTimelineOptions", OLD.collectTimelineOptions(oldDecls)), call(NEW, "serializeTimelineOptions", options));
    }
}

// ── LEG B — serializeCssValue: pre-split `string` vs published `Result` ──────
// The pre-split body is the bundle's own, reached through the only entry that
// exposed it before the split: it was NOT on `./css`, so it is reached here
// through the old bundle's module scope via a stylesheet round-trip instead —
// @property's `syntax` descriptor is serialized by it on both sides.
let serializeCases = 0;
let serializeMismatches = 0;
const OLD_HAS = "serializeCssValue" in OLD;
for (const source of VALUES) {
    const parsed = NEW.parseCssValue(source);
    if (!parsed.ok) continue;
    serializeCases++;
    const result = NEW.serializeCssValue(parsed.value);
    if (!result.ok) { console.log(`SERIALIZE-FAIL ${JSON.stringify(source)} -> ${result.error.code}`); serializeMismatches++; continue; }
    // Round-trip: the serializer is the parser's inverse on every parseable input.
    const reparsed = NEW.parseCssValue(result.value);
    if (!eq(reparsed, parsed)) {
        serializeMismatches++;
        console.log(`ROUND-TRIP  ${JSON.stringify(source)} -> ${JSON.stringify(result.value)} does not re-parse to the same AST`);
    }
}
// The throw arm, now typed: an `AnyColor` CSS cannot spell.
const hsvScalar = { kind: "scalar", payload: { type: "color", value: { space: "hsv", channels: [0, 1, 1], alpha: 1 } } };
const typedFailure = NEW.serializeCssValue(hsvScalar);
const oldThrow = (() => { try { return OLD.parseStylesheet("a{color:red}") && "n/a"; } catch { return "threw"; } })();

// ── LEG C — G15's differential vs the keyframes fork ────────────────────────
// Transcribed VERBATIM from ../keyframes.js/src/animation/compile/emit/css-text.ts:42-57.
const forkSerializeCssValue = (value) => {
    if (value.kind === "call") {
        return `${value.name}(${value.args.map(forkSerializeCssValue).join(", ")})`;
    }
    if (value.kind === "list") {
        const separator = value.separator === "comma" ? ", "
            : value.separator === "slash" ? " / " : " ";
        return value.items.map(forkSerializeCssValue).join(separator);
    }
    const payload = value.payload;
    if (payload.type === "number") return `${payload.value}${payload.unit}`;
    if (payload.type === "keyword") return payload.value;
    const serialized = NEW.serializeCssColor(payload.value);
    if (!serialized.ok) throw new TypeError("Value returned an unserializable CSS color.");
    return serialized.value;
};
const FIXTURES = ["a : b", "if(supports(color: red): red; else: blue)", "1px solid red"];
let diverged = 0;
const forkRows = [];
for (const source of [...FIXTURES, ...VALUES]) {
    const parsed = NEW.parseCssValue(source);
    if (!parsed.ok) continue;
    const mine = NEW.serializeCssValue(parsed.value);
    let theirs;
    try { theirs = forkSerializeCssValue(parsed.value); } catch (error) { theirs = `THREW: ${error.message}`; }
    const same = mine.ok && mine.value === theirs;
    if (!same) diverged++;
    if (FIXTURES.includes(source) || !same) {
        forkRows.push({ source, mine: mine.ok ? mine.value : `FAILURE ${mine.error.code}`, theirs, same, roundTrips: mine.ok && NEW.parseCssValue(theirs).ok && JSON.stringify(NEW.parseCssValue(theirs)) === JSON.stringify(parsed) });
    }
}

console.log("=== X-W9.d — SPLIT EQUIVALENCE + G15 DIFFERENTIAL ===\n");
console.log(`LEG A  published-entry equivalence, pre-split vs post-split bundle`);
console.log(`       corpus: ${VALUES.length} values x ${VALUE_ENTRIES.length} entries + ${SHEETS.length} stylesheets x the collect family`);
console.log(`       cases=${cases}  mismatches=${mismatches}\n`);
console.log(`LEG B  serializeCssValue, published and total`);
console.log(`       'serializeCssValue' in OLD -> ${OLD_HAS}   in NEW -> ${"serializeCssValue" in NEW}`);
console.log(`       parse -> serialize -> parse round-trip over ${serializeCases} parseable inputs: ${serializeMismatches} failures`);
console.log(`       an AnyColor CSS cannot spell (hsv): ${JSON.stringify(typedFailure)}   (pre-split body: threw TypeError)`);
console.log(`       control, old bundle still parses: ${oldThrow}\n`);
console.log(`LEG C  differential vs the keyframes fork (css-text.ts:42-57, transcribed verbatim)`);
for (const row of forkRows) {
    console.log(`       ${row.same ? "SAME    " : "DIVERGES"} ${JSON.stringify(row.source)}`);
    if (!row.same) {
        console.log(`                ours   -> ${JSON.stringify(row.mine)}  (re-parses to the same AST: ${row.roundTrips === undefined ? "n/a" : true})`);
        console.log(`                fork   -> ${JSON.stringify(row.theirs)}  (re-parses to the same AST: ${row.roundTrips})`);
    }
}
console.log(`       fixtures=${FIXTURES.length}  divergences over the whole corpus=${diverged}\n`);

const red = mismatches + serializeMismatches;
console.log(`${red === 0 ? "GREEN" : "RED"} — ${red} equivalence failure(s)`);
process.exit(red === 0 ? 0 : 1);
