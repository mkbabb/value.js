// SERVED MODEL: claude-opus-5-5
// X.P.W8 `.v` — the disposable one-off that authored the css-values ruled rows (evidence; run once):
//   node bench/records/W8v/rule.mjs bench/records/W8v/all-step6.txt
// Reads the unruled css-values misses the V-C instrument printed, matches each to its exact corpus case,
// and appends one explicit row per case to bench/wpt-conformance/ruled.json.
import { readFileSync, writeFileSync } from "node:fs";
const corpus = JSON.parse(readFileSync("test/css/wpt-values/cases-2026-10-07.json", "utf8")).cases;
const ruledPath = "bench/wpt-conformance/ruled.json";
const ruled = JSON.parse(readFileSync(ruledPath, "utf8"));
const lines = readFileSync(process.argv[2], "utf8").split("\n").filter((l) => l.startsWith("MISS ") && l.includes(" css/css-values/"));
const ACCEPTS = {
    opacity: ["<opacity-value> = <number> | <percentage>", "css-color-4 `opacity`"],
    "transition-delay": ["<time>#", "css-transitions-1 `transition-delay`"],
    "margin-left": ["<length-percentage> | auto", "css-box-4 `margin-left`"],
    "border-left-width": ["<line-width> = <length [0,∞]> | thin | medium | thick", "css-backgrounds-3 `border-left-width`"],
    transform: ["rotate( [ <angle> | <zero> ] )", "css-transforms-1 `rotate()`"],
    "font-weight": ["<number [1,1000]> | normal | bold | bolder | lighter", "css-fonts-4 `font-weight`"],
    "tab-size": ["<number [0,∞]> | <length [0,∞]>", "css-text-3 `tab-size`"],
    "outline-offset": ["<length>", "css-ui-4 `outline-offset`"],
    "background-image": ["<bg-image># = [ <image> | none ]#", "css-backgrounds-3 `background-image`"],
};
let added = 0;
for (const line of lines) {
    const m = /^MISS (\S+) (\S+) ([\w-]+): (".*")$/.exec(line);
    if (!m) throw new Error(`HALT: unreadable miss line ${line}`);
    const [, why, file, property, json] = m;
    const input = JSON.parse(json);
    const c = corpus.find((x) => x.file === file && x.property === property && x.input === input);
    if (!c || why !== "accepted" || c.kind !== "invalid") throw new Error(`HALT: ${line}`);
    const [accepts, where] = ACCEPTS[property] ?? (() => { throw new Error(`HALT: no property row for ${property}`); })();
    const row = /^"/.test(input) || /\s\*\s/.test(input.split("(")[0] ?? "")
        ? {
            class: "W8v-PROPERTY-GRAMMAR",
            reason: /^"/.test(input)
                ? `A <string> followed by a function is a well-formed component value list (no url() wraps the string, so its modifiers are plain functions); its refusal is ${property}'s grammar (${accepts}), which the property-agnostic parseCssValue is never given.`
                : `Outside a math function a \`*\` is a delimiter token, so the input is a well-formed component value list; its refusal is ${property}'s grammar (${accepts}), which the property-agnostic parseCssValue is never given.`,
            spec: /^"/.test(input) ? `css-values-4 §4.5 <url>; ${where}` : `css-values-4 §10.1 (operators only inside a math function); ${where}`,
        }
        : {
            class: "W8v-PROPERTY-TYPE",
            reason: `A valid calculation (structure, arity and type check clean, css-values-4 §10.1–§10.8) whose type — or whose percentage, resolvable only against a base type the property names — does not match ${property} (${accepts}). A math function's type is matched against the property's grammar (§10.9), which the property-agnostic parseCssValue is never given.`,
            spec: `css-values-4 §10.8.1 (percent hint), §10.9 (type checking); ${where}`,
        };
    ruled.rows.push({ file, kind: c.kind, property, input, ...row });
    added++;
}
writeFileSync(ruledPath, JSON.stringify(ruled, null, 2) + "\n");
console.log(`added ${added} rows → ${ruled.rows.length}`);
