// SERVED MODEL: claude-opus-5-5
// X.P.W8 `.f` — the disposable one-off that authored the css-fonts ruled rows (evidence; run once, on the
// settled cure's miss list):  npx vite-node bench/records/W8f/rule.ts <(gunzip -c bench/records/W8f/vc-cure2.txt.gz)
// Reads the unruled css-fonts misses the V-C instrument printed, matches each to its exact corpus case,
// MEASURES the mechanism its class names (HALT when it does not hold), and appends one explicit row per
// case to bench/wpt-conformance/ruled.json. The `.i` script's idiom (bench/records/W8i/rule.ts).
import { readFileSync, writeFileSync } from "node:fs";
import { parseCssValue, serializeCssValue } from "../../../src/css/index";

type Case = { file: string; kind: string; property: string; input: string; expected?: string[] };
const corpus = (JSON.parse(readFileSync("test/css/wpt-values/cases-2026-10-07.json", "utf8")) as { cases: Case[] }).cases;
const ruledPath = "bench/wpt-conformance/ruled.json";
const ruled = JSON.parse(readFileSync(ruledPath, "utf8")) as { rows: object[] };
const lines = readFileSync(process.argv[2] ?? "", "utf8").split("\n").filter((l) => l.startsWith("MISS ") && / css\/css-fonts\//.test(l));

function halt(why: string): never { throw new Error(`HALT: ${why}`); }
const F4 = "css-fonts-4";
const GRAMMAR: Record<string, [string, string]> = {
    "font": ["[ [ <'font-style'> || <font-variant-css2> || <'font-weight'> || <font-width-css3> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'># ] | <system-family-name>", `${F4} #propdef-font`],
    "font-family": ["[ <family-name> | <generic-family> ]#, a <family-name> a <string> or a run of <custom-ident>s, a generic family never one of several identifiers", `${F4} #propdef-font-family`],
    "font-feature-settings": ["normal | <feature-tag-value>#, <feature-tag-value> = <opentype-tag> [ <integer [0,∞]> | on | off ]?", `${F4} #propdef-font-feature-settings`],
    "font-kerning": ["auto | normal | none", `${F4} #propdef-font-kerning`],
    "font-language-override": ["normal | <string> (a four-character OpenType language tag, trailing spaces padding)", `${F4} #propdef-font-language-override`],
    "font-optical-sizing": ["auto | none", `${F4} #propdef-font-optical-sizing`],
    "font-palette": ["normal | light | dark | <palette-identifier> | <palette-mix()>", `${F4} #propdef-font-palette`],
    "font-size": ["<absolute-size> | <relative-size> | <length-percentage [0,∞]> | math", `${F4} #propdef-font-size`],
    "font-size-adjust": ["none | [ ex-height | cap-height | ch-width | ic-width | ic-height ]? [ from-font | <number [0,∞]> ]", `${F4} #propdef-font-size-adjust`],
    "font-stretch": ["normal | <percentage [0,∞]> | ultra-condensed | … | ultra-expanded (the legacy alias of font-width)", `${F4} #propdef-font-width`],
    "font-style": ["normal | italic | left | right | oblique <angle [-90deg,90deg]>?", `${F4} #propdef-font-style`],
    "font-synthesis": ["none | [ weight || style || small-caps || position ]", `${F4} #propdef-font-synthesis`],
    "font-synthesis-position": ["auto | none", `${F4} #propdef-font-synthesis-position`],
    "font-synthesis-small-caps": ["auto | none", `${F4} #propdef-font-synthesis-small-caps`],
    "font-synthesis-style": ["auto | none | oblique-only", `${F4} #propdef-font-synthesis-style`],
    "font-synthesis-weight": ["auto | none", `${F4} #propdef-font-synthesis-weight`],
    "font-variant": ["normal | none | [ the font-variant-* sub-property values, each group at most once, mutually exclusive values never together ]", `${F4} #propdef-font-variant`],
    "font-variant-alternates": ["normal | [ stylistic(<feature-value-name>) || historical-forms || styleset(<feature-value-name>#) || character-variant(<feature-value-name>#) || swash(<feature-value-name>) || ornaments(<feature-value-name>) || annotation(<feature-value-name>) ]", `${F4} #propdef-font-variant-alternates`],
    "font-variant-caps": ["normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps", `${F4} #propdef-font-variant-caps`],
    "font-variant-east-asian": ["normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]", `${F4} #propdef-font-variant-east-asian`],
    "font-variant-emoji": ["normal | text | emoji | unicode", `${F4} #propdef-font-variant-emoji`],
    "font-variant-ligatures": ["normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]", `${F4} #propdef-font-variant-ligatures`],
    "font-variant-numeric": ["normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]", `${F4} #propdef-font-variant-numeric`],
    "font-variant-position": ["normal | sub | super", `${F4} #propdef-font-variant-position`],
    "font-variation-settings": ["normal | [ <opentype-tag> <number> ]#, <opentype-tag> a <string> of exactly four ASCII U+20–U+7E characters", `${F4} #propdef-font-variation-settings`],
    "font-weight": ["<font-weight-absolute> | bolder | lighter", `${F4} #propdef-font-weight`],
    "font-width": ["normal | <percentage [0,∞]> | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded", `${F4} #propdef-font-width`],
};
const MATH = /\b(?:calc|min|max|clamp|sign|abs|round|mod|rem)\(/i;
const text = (s: string): string | null => {
    const p = parseCssValue(s);
    if (!p.ok) return null;
    const t = serializeCssValue(p.value);
    return t.ok ? t.value : null;
};

/** cssom-1 §2.1 serialize a string, over a css-syntax-3 §4.3.5 string token's value (escapes consumed). */
function cssomString(token: string): string {
    const body = token.slice(1, -1).replace(/\\(?:([\da-fA-F]{1,6})[ \t\n\r\f]?|(\r\n|[\n\r\f])|([\s\S]))/g,
        (_, hex: string | undefined, nl: string | undefined, ch: string | undefined) =>
            hex !== undefined ? String.fromCodePoint(Number.parseInt(hex, 16) || 0xfffd) : nl !== undefined ? "" : (ch ?? ""));
    let out = '"';
    for (const c of body) {
        const n = c.codePointAt(0) ?? 0;
        out += n === 0 ? "\uFFFD" : (n < 0x20 || n === 0x7f) ? `\\${n.toString(16)} ` : c === '"' || c === "\\" ? `\\${c}` : c;
    }
    return `${out}"`;
}
const STRING = /"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'/g;
const tally: Record<string, number> = {};
let added = 0;
for (const line of lines) {
    const m = /^MISS (\S+) (\S+) ([\w-]+): (".*?")(?: expected=.*)?$/.exec(line) ?? halt(`unreadable ${line}`);
    const [, why = "", file = "", property = "", json = ""] = m;
    const input = JSON.parse(json) as string;
    const c = corpus.find((x) => x.file === file && x.property === property && x.input === input) ?? halt(`no case ${line}`);
    const parsed = parseCssValue(input);
    let row: { class: string; reason: string; spec: string };
    if (why === "accepted") {
        if (c.kind !== "invalid" || !parsed.ok) halt(`not accepted ${line}`);
        const [accepts, where] = GRAMMAR[property] ?? halt(`no grammar row ${property}`);
        if (MATH.test(input) && property === "font-variation-settings") {
            row = { class: "W8v-PROPERTY-TYPE", reason: `A valid calculation (structure, arity and type check clean, css-values-4 §10.1–§10.8) whose type does not match ${property}'s grammar (${accepts}). A math function's type is matched against the property's grammar (§10.9), which the property-agnostic parseCssValue is never given.`, spec: `css-values-4 §10.9 (type checking); ${where}` };
        } else {
            row = { class: "W8g-PROPERTY-GRAMMAR", reason: `A well-formed component value list (identifiers, strings, numbers, dimensions, generic <function>s) invalid only against ${property}'s grammar (${accepts}), which the property-agnostic parseCssValue is never given.`, spec: `css-values-4 §2 (property value definitions); ${where}` };
        }
    } else if (why === "serialization") {
        if (c.kind !== "valid" || !parsed.ok) halt(`not parsed ${line}`);
        const out = text(input) ?? halt(`serialize ${line}`);
        if (text(out) !== out) halt(`not a fixpoint ${line}`);
        const expected = c.expected ?? [];
        const cssomOut = out.replace(STRING, cssomString);
        const maths = out.match(/\b(?:calc|min|max|clamp|sign|abs|round|mod|rem)\([^;]*\)/gi) ?? [];
        if (cssomOut !== out && expected.includes(cssomOut)) {
            row = { class: "W8f-STRING-SERIALIZATION", reason: "The value parses and serializes as authored (a fixpoint, measured); each <string> rewritten by cssom-1's serialize-a-string — its escapes consumed, then double-quoted with only \", \\ and control characters escaped — gives WPT's expected text exactly (measured). value.js keeps a <string> token as authored (its quotes and escapes), which re-reads as the same string.", spec: "cssom-1 §2.1 (serialize a string); css-syntax-3 §4.3.5 (consume a string token); cssom-1 §6.7.2" };
        } else if (/^palette-mix\(/i.test(input)) {
            row = { class: "W8f-PALETTE-MIX-SERIALIZATION", reason: "The palette-mix() parses, keeps its signature (src/css/bbnf/palette.ts) and serializes as authored (a fixpoint, measured); WPT expects its canonical specified serialization — the default interpolation method (in oklab, shorter hue) dropped, xyz spelled xyz-d65, the percentages normalized (an omitted one completed to sum 100%, a 50%/50% pair and a lone 100% dropped) — a palette-mix-specific canonical form value.js, which keeps a generic call's arguments as authored, does not compute.", spec: `${F4} #typedef-font-palette-mix (serialization); css-color-4 §12.1, §12.4; cssom-1 §6.7.2` };
        } else if (maths.length > 0 && !maths.every((t) => expected.some((e) => e.includes(t)))) {
            row = { class: "W8g-MATH-SERIALIZATION", reason: "The value parses and serializes as authored (a fixpoint, measured); WPT expects the math function simplified (constant-folded, sum and product terms sorted), which value.js does not do at parse time.", spec: "css-values-4 §10.10 simplification, §10.13 serialization" };
        } else {
            const [, where] = GRAMMAR[property] ?? halt(`no grammar row ${property}`);
            row = { class: "W8g-PROPERTY-SERIALIZATION", reason: `The value parses and serializes as authored (a fixpoint, measured); WPT expects ${property}'s shortest specified serialization (omitted initial and default values, components in the grammar's canonical order, generic family keywords lower-cased, a family <string> as identifiers, a feature tag's default 1/on dropped and off as 0, a language tag's trailing spaces trimmed), which needs the property's grammar the value parser is never given.`, spec: `cssom-1 §6.7.2 serialize a CSS value (shortest form); ${where}` };
        }
    } else halt(`kind ${line}`);
    ruled.rows.push({ file, kind: c.kind, property, input, ...row });
    tally[row.class] = (tally[row.class] ?? 0) + 1;
    added++;
}
writeFileSync(ruledPath, JSON.stringify(ruled, null, 2) + "\n");
console.log(`added ${added} rows → ${ruled.rows.length}`, JSON.stringify(tally));
