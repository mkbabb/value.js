// SERVED MODEL: claude-opus-5-5
// X.P.W8 `.t` — the disposable one-off that authored the css-color / css-easing / css-transforms ruled rows
// (evidence; run once, on the settled cure's miss list):  npx vite-node bench/records/W8t/rule.ts <(gunzip -c bench/records/W8t/vc-cure2.txt.gz)
// Reads the unruled misses the V-C instrument printed for the three modules, matches each to its exact
// corpus case, MEASURES the mechanism its class names (HALT when it does not hold), and appends one
// explicit row per case to bench/wpt-conformance/ruled.json.
import { readFileSync, writeFileSync } from "node:fs";
import { parseCssColor, parseCssValue, parseTimingFunction, serializeCssValue } from "../../../src/css/index";

type Case = { file: string; kind: string; property: string; input: string; expected?: string[] };
const corpus = (JSON.parse(readFileSync("test/css/wpt-values/cases-2026-10-07.json", "utf8")) as { cases: Case[] }).cases;
const ruledPath = "bench/wpt-conformance/ruled.json";
const ruled = JSON.parse(readFileSync(ruledPath, "utf8")) as { rows: object[] };
const lines = readFileSync(process.argv[2]!, "utf8").split("\n")
    .filter((l) => l.startsWith("MISS ") && / css\/css-(color|easing|transforms)\//.test(l));

function halt(why: string): never { throw new Error(`HALT: ${why}`); }
const GRAMMAR: Record<string, [string, string]> = {
    color: ["<color>", "css-color-4 <color>, §6.1 <named-color>"],
    opacity: ["<opacity-value> = <number> | <percentage>", "css-color-4 `opacity`"],
    "animation-timing-function": ["<easing-function>#", "css-easing-2 <easing-function>; css-animations-1 `animation-timing-function`"],
    "backface-visibility": ["visible | hidden", "css-transforms-2 `backface-visibility`"],
    perspective: ["none | <length [0,∞]>", "css-transforms-2 `perspective`"],
    "perspective-origin": ["<position>", "css-transforms-2 `perspective-origin`; css-values-4 <position>"],
    rotate: ["none | <angle> | [ x | y | z | <number>{3} ] && <angle>", "css-transforms-2 `rotate` (individual transform properties)"],
    scale: ["none | [ <number> | <percentage> ]{1,3}", "css-transforms-2 `scale` (individual transform properties)"],
    translate: ["none | <length-percentage> [ <length-percentage> <length>? ]?", "css-transforms-2 `translate` (individual transform properties)"],
    "transform-box": ["content-box | border-box | fill-box | stroke-box | view-box", "css-transforms-1 `transform-box`"],
    transform: ["none | <transform-list>, each <transform-function> with its own signature", "css-transforms-1 `transform` and its two-dimensional transform functions; css-transforms-2 three-dimensional transform functions"],
    "transform-origin": ["[ left | center | right | top | bottom | <length-percentage> ] | [ … ]{2} <length>?", "css-transforms-1 `transform-origin`"],
};
const MATH = /\b(?:calc|min|max|clamp|sign|abs|round|mod|rem)\(/i;

let added = 0;
const tally: Record<string, number> = {};
for (const line of lines) {
    const m = /^MISS (\S+) (\S+) ([\w-]+): (".*?")(?: expected=.*)?$/.exec(line) ?? halt(`unreadable ${line}`);
    const [, why, file, property, json] = m;
    const input = JSON.parse(json!) as string;
    const c = corpus.find((x) => x.file === file && x.property === property && x.input === input) ?? halt(`no case ${line}`);
    const parsed = parseCssValue(input);
    let row: { class: string; reason: string; spec: string };
    if (file!.includes("color-layers")) {
        row = { class: "W8t-CSS-COLOR-6", reason: "color-layers() is defined by CSS Color 6, a module X.P.W8's corpus scope (W8.md §Scope 1: css-color-5) does not claim and value.js's colour reader does not model; read as a generic <function> it is accepted, serialized with its arguments' computed colours, or refused where an argument is a context-required relative colour.", spec: "css-color-6 #color-layers; W8.md §Scope 1" };
    } else if (why === "accepted") {
        if (c.kind !== "invalid" || !parsed.ok) halt(`not accepted ${line}`);
        const [accepts, where] = GRAMMAR[property!] ?? halt(`no grammar row ${property}`);
        let typed = "";
        if (property === "color") { if (parseCssColor(input).ok) halt(`colour reader accepts ${line}`); typed = " value.js's colour reader (parseCssColor) refuses it (measured)."; }
        if (property === "animation-timing-function") { if (parseTimingFunction(input).ok) halt(`easing reader accepts ${line}`); typed = " value.js's <easing-function> reader (parseTimingFunction) refuses it (measured)."; }
        row = { class: "W8g-PROPERTY-GRAMMAR", reason: `A well-formed component value list (identifiers, numbers, dimensions, generic <function>s) invalid only against ${property}'s grammar (${accepts}), which the property-agnostic parseCssValue is never given.${typed}`, spec: `css-values-4 §2; ${where}` };
    } else if (why === "serialization") {
        if (!parsed.ok) halt(`not parsed ${line}`);
        const text = serializeCssValue(parsed.value);
        if (!text.ok) halt(`serialize ${line}`);
        const again = parseCssValue(text.value);
        if (!again.ok) halt(`re-parse ${line}`);
        const fix = serializeCssValue(again.value);
        if (!fix.ok || fix.value !== text.value) halt(`not a fixpoint ${line}`);
        if (/css-color\//.test(file!) && property !== "opacity") {
            row = { class: "W8t-COLOR-SERIALIZATION", reason: "The colour parses and its serialization is a fixpoint (re-parsed and re-serialized identically, measured); value.js serializes the colour it computes — a named, hex or in-range color(srgb …) colour as rgb(), the modern space-separated form, a hue with its unit, alpha as a percentage, lab()/lch() lightness as a percentage, xyz-d50 and display-p3-linear as the xyz they name, an identifier as authored — and the colours inside alpha()/contrast-color() likewise; WPT expects the CSSOM's specified-value serialization of the authored colour.", spec: "css-color-4 §15 (serializing <color> values); cssom-1 §6.7.2 (serializing CSS component values)" };
        } else if (MATH.test(input) && property !== "transform-origin") {
            row = { class: "W8g-MATH-SERIALIZATION", reason: "The value parses and serializes as authored (a fixpoint, measured); WPT expects the math function simplified (constant-folded, clamp/min/max resolved, sum terms sorted), which value.js does not do at parse time.", spec: "css-values-4 §10.10 (simplification), §10.13 (serialization)" };
        } else {
            row = { class: "W8g-PROPERTY-SERIALIZATION", reason: `The value parses and serializes as authored (a fixpoint, measured); WPT expects ${property}'s shortest specified serialization (omitted defaults added or dropped, keyword order and case canonicalized, a percentage written as its number, a unitless zero angle or length given its unit), which depends on the property's grammar the property-agnostic parseCssValue is never given.`, spec: `cssom-1 §6.7.2; ${(GRAMMAR[property!] ?? halt(`no grammar row ${property}`))[1]}` };
        }
    } else if (why === "refused") {
        if (parsed.ok) halt(`not refused ${line}`);
        const d = parsed.diagnostics[0]!;
        if (d.code === "color_context_required") {
            row = { class: "W8t-COLOR-CONTEXT", reason: "Refused color_context_required (measured): its channels depend on context value.js does not hold at parse time — a relative colour (resolved against its origin at computed-value time) or a calculation over a font-relative length (sign(1em - 10px)). value.js's colour contract computes a colour when parsed and answers color_context_required otherwise.", spec: "css-color-5 §4 (relative colours); css-values-4 §6.1 (font-relative lengths), §10.9" };
        } else if (d.expected.includes("color_non_finite")) {
            row = { class: "W8t-COLOR-NON-FINITE", reason: "Refused color_non_finite (measured): a channel of calc(±infinity), which css-values-4 clamps only at computed-value time; value.js's colour model holds finite channels and computes the colour when parsed.", spec: "css-values-4 §10.7.1 (infinity), §10.9 (range clamping at computed value); css-color-4 §4.1" };
        } else if (d.expected.includes("color_missing_channel")) {
            row = { class: "W8t-COLOR-SPACE-NONE", reason: "Refused color_missing_channel (measured): color(xyz-d50 | display-p3-linear …) with a none channel. value.js's colour model has no member for these two spaces and writes each as the exact xyz colour it names, which a missing channel has no xyz channel to stay missing in (the concrete-xyz contract).", spec: "css-color-4 §4.4 (missing components), §10 color() predefined spaces" };
        } else if (d.code === "css_syntax" && /^(?:rgb|hsl|hwb|lab|lch|oklab|oklch|color)\(from (?:alpha|contrast-color)\(/i.test(input)) {
            row = { class: "W8t-COLOR-CONTEXT", reason: "A relative colour whose origin is alpha() or contrast-color() (css-color-5), which value.js's colour reader does not compute; refused css_syntax at the origin (measured). Read, it is a relative colour, which value.js's colour contract refuses color_context_required as every relative colour.", spec: "css-color-5 §4 (relative colours), #relative-alpha alpha(), #contrast-color contrast-color()" };
        } else halt(`unclassed refusal ${JSON.stringify(d)} ${line}`);
    } else halt(`kind ${line}`);
    ruled.rows.push({ file, kind: c.kind, property, input, ...row });
    tally[row.class] = (tally[row.class] ?? 0) + 1;
    added++;
}
writeFileSync(ruledPath, JSON.stringify(ruled, null, 2) + "\n");
console.log(`added ${added} rows → ${ruled.rows.length}`, JSON.stringify(tally));
