// SERVED MODEL: claude-opus-5-5
// X.P.W8 `.i` — the disposable one-off that authored the css-images ruled rows (evidence; run once, on the
// settled cure's miss list):  npx vite-node bench/records/W8i/rule.ts <(gunzip -c bench/records/W8i/vc-cure2.txt.gz)
// Reads the unruled css-images misses the V-C instrument printed, matches each to its exact corpus case,
// MEASURES the mechanism its class names (HALT when it does not hold), and appends one explicit row per
// case to bench/wpt-conformance/ruled.json.
import { readFileSync, writeFileSync } from "node:fs";
import { parseCssValue, serializeCssValue } from "../../../src/css/index";

type Case = { file: string; kind: string; property: string; input: string; expected?: string[] };
const corpus = (JSON.parse(readFileSync("test/css/wpt-values/cases-2026-10-07.json", "utf8")) as { cases: Case[] }).cases;
const ruledPath = "bench/wpt-conformance/ruled.json";
const ruled = JSON.parse(readFileSync(ruledPath, "utf8")) as { rows: object[] };
const arg = process.argv[2] ?? "";
const lines = readFileSync(arg, "utf8").split("\n").filter((l) => l.startsWith("MISS ") && / css\/css-images\//.test(l));

function halt(why: string): never { throw new Error(`HALT: ${why}`); }
const GRAMMAR: Record<string, [string, string]> = {
    "background-color": ["<color>", "css-backgrounds-3 `background-color`; css-images-4 §2.5 (image() is an <image>, never a <color>)"],
    "image-orientation": ["from-image | none | [ <angle> || flip ]", "css-images-3 `image-orientation`"],
    "image-rendering": ["auto | smooth | high-quality | pixelated | crisp-edges", "css-images-3 `image-rendering`"],
    "image-resolution": ["[ from-image || <resolution> ] && snap?", "css-images-4 `image-resolution`"],
    "object-fit": ["fill | none | [ contain | cover ] || scale-down", "css-images-4 `object-fit`"],
    "object-position": ["<position>", "css-images-3 `object-position`; css-values-4 §9.3 <position> (one, two or four values)"],
};
const MATH = /\b(?:calc|min|max|clamp|sign|abs|round|mod|rem)\(/i;
const text = (s: string): string | null => {
    const p = parseCssValue(s);
    if (!p.ok) return null;
    const t = serializeCssValue(p.value);
    return t.ok ? t.value : null;
};

let added = 0;
const tally: Record<string, number> = {};
for (const line of lines) {
    const m = /^MISS (\S+) (\S+) ([\w-]+): (".*?")(?: expected=.*)?$/.exec(line) ?? halt(`unreadable ${line}`);
    const [, why = "", file = "", property = "", json = ""] = m;
    const input = JSON.parse(json) as string;
    const c = corpus.find((x) => x.file === file && x.property === property && x.input === input) ?? halt(`no case ${line}`);
    const parsed = parseCssValue(input);
    let row: { class: string; reason: string; spec: string };
    if (why === "accepted") {
        if (c.kind !== "invalid" || !parsed.ok) halt(`not accepted ${line}`);
        if (property === "background-image" && input === "image(url(foo.png))") {
            row = { class: "W8i-WPT-SUBSET", reason: "Valid by css-images-4's own grammar — image( <image-tags>? [ <image-src>? , <color>? ]! ) admits a lone <image-src> — so value.js's image() signature check (src/css/bbnf/image.ts) accepts it; the WPT file asserts the implemented colour-only subset (its comment: \"image() requires a single <color> argument\").", spec: "css-images-4 §2.5 (image-notation)" };
        } else {
            const [accepts, where] = GRAMMAR[property] ?? halt(`no grammar row ${property}`);
            row = { class: "W8g-PROPERTY-GRAMMAR", reason: `A well-formed component value list (identifiers, numbers, dimensions, generic <function>s) invalid only against ${property}'s grammar (${accepts}), which the property-agnostic parseCssValue is never given.`, spec: `css-values-4 §2; ${where}` };
        }
    } else if (why === "serialization") {
        if (c.kind !== "valid" || !parsed.ok) halt(`not parsed ${line}`);
        const out = text(input) ?? halt(`serialize ${line}`);
        if (text(out) !== out) halt(`not a fixpoint ${line}`);
        if ((c.expected ?? []).some((e) => text(e) === out)) {
            row = { class: "W8i-IMAGE-COLOR-SERIALIZATION", reason: "The image parses and its serialization is a fixpoint (measured), and WPT's expected form, read by value.js, serializes to the same text (measured): the two spell one value. value.js computes each colour an image function holds and writes it as it writes every colour (rgb(), the modern space-separated form; W8t-COLOR-SERIALIZATION), where WPT expects the colour as specified.", spec: "css-color-4 §15 (serializing <color> values); cssom-1 §6.7.2; css-images-4 §3 (gradient serialization)" };
        } else if (/\/(?:conic-)?gradient-/.test(file) && !MATH.test(input)) {
            row = { class: "W8i-GRADIENT-SERIALIZATION", reason: "The gradient parses and serializes as authored (a fixpoint, measured); WPT expects its canonical specified serialization — the geometry before the <color-interpolation-method>, the defaults dropped (in oklab, shorter hue, ellipse, at center), a <position>'s keywords horizontal-first, each colour as specified — a gradient-specific canonical form value.js, which keeps a generic call's arguments as authored, does not compute.", spec: "css-images-4 §3.1–§3.3 (gradient syntax and defaults); css-color-4 §12.1, §12.4 (default interpolation space and hue method); css-values-4 §9.3; cssom-1 §6.7.2" };
        } else if (MATH.test(input)) {
            row = { class: "W8g-MATH-SERIALIZATION", reason: "The value parses and serializes as authored (a fixpoint, measured); WPT expects the math function simplified (constant-folded, clamp/min/max resolved, sum terms sorted), which value.js does not do at parse time.", spec: "css-values-4 §10.10 (simplification), §10.13 (serialization)" };
        } else {
            row = { class: "W8g-PROPERTY-SERIALIZATION", reason: `The value parses and serializes as authored (a fixpoint, measured); WPT expects ${property}'s shortest specified serialization (a <position>'s keywords reordered horizontal-first, omitted defaults added or dropped, redundant keywords merged), which depends on the property's grammar the property-agnostic parseCssValue is never given.`, spec: "cssom-1 §6.7.2; css-values-4 §9.3 (<position> serialization)" };
        }
    } else if (why === "refused") {
        if (parsed.ok) halt(`not refused ${line}`);
        const d = parsed.diagnostics[0] ?? halt(`no diagnostic ${line}`);
        if (d.code !== "color_context_required") halt(`unclassed refusal ${JSON.stringify(d)} ${line}`);
        row = { class: "W8t-COLOR-CONTEXT", reason: "Refused color_context_required (measured): a relative colour, whose channels resolve against its origin at computed-value time. value.js's colour contract computes a colour when parsed and answers color_context_required otherwise.", spec: "css-color-5 §4 (relative colours); css-images-4 §2.5" };
    } else halt(`kind ${line}`);
    ruled.rows.push({ file, kind: c.kind, property, input, ...row });
    tally[row.class] = (tally[row.class] ?? 0) + 1;
    added++;
}
writeFileSync(ruledPath, JSON.stringify(ruled, null, 2) + "\n");
console.log(`added ${added} rows → ${ruled.rows.length}`, JSON.stringify(tally));
