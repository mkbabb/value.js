import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const EXPECTED = Object.freeze({
    universe: "c1b823396dcc38607d23243f578e58ef08de79136edd52abd1bbdf6a64f606b7",
    complementV3: "e84fd664badd815754337bff733dc796caa073314d40481c21442f9f22598bd2",
    complementAcceptance: "1d9d9b7e51296c76cf64a2d44070145790e7b555a5a10d7e7c7541ea1a391531",
    complementChallengeA: "bc1f62007df6f6457e58fa7314d2699ed41f479f536792ea377bb0564e3504c4",
    complementChallengeB: "e1fbfd9f4a0650f085a82c7446ca7b971afe6e4b18196d7f1e1bf5cbd90e51f7",
    complementGestalt: "9af9072b8b14b60ce0fd4bd5f358c1f31bc1caf4df53fa799e6f53a64915bb3a",
    seed: "769ceff80ecc9f25dbef30ddb3f3dbb04ecdbd2b7f704ed733f29f4ab16fbb32",
    moduleDag: "291e51451d84f2fd41adb8b9a31b3c33cf1503b6f47019a06e16702c98daca8f",
    pi: "fa83ca19532ba0fce9ff5e7ea3a75b0b1b82f1354b6c752bcb153ced2f25404d",
    coverage: "0cbee9461be998e01f3903a383f2419bbcd8abe57649e8b9cf879c2d610d95da",
    addenda01: "416f04aa433286d2199b3cfb1aa8f016273868a3fe0a506f4f0dd8e75357dca5",
    addenda02: "c50355e44ca0950619af8772eb3e93cb7955491680503358bed2f4139ab3021d",
    addenda07: "78a5bdb753fec5efb61311db570930bc2af80757531054b9ee3c415e98ee26d5",
});
const PIN = Object.freeze({
    commit: "c7573530343759ace8e46438a1fa2c44515b5554",
    tree: "75bf19c016ed98126381508073de6893c9f756f5",
});

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const byteSort = (left, right) => Buffer.from(left).compare(Buffer.from(right));
const normalized = (value) => value
    .replace(/<[^>]*>/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
const slug = (value) => normalized(value)
    .toLowerCase()
    .replace(/[^a-z0-9@+.-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "unnamed";

function argumentsFrom(argv) {
    const result = new Map();
    for (let index = 0; index < argv.length; index += 2) {
        const flag = argv[index];
        const value = argv[index + 1];
        if (!flag?.startsWith("--") || value === undefined) {
            throw new Error("usage: occurrence-owner-formation-v1.mjs --source-root <pinned-tree> --universe <json> --complement-v3 <json> --complement-acceptance <json> --complement-challenge-a <md> --complement-challenge-b <md> --complement-gestalt <md> --seed <json> --module-dag <md> --pi <md> --coverage <md> --addenda-01 <md> --addenda-02 <md> --addenda-07 <md>");
        }
        result.set(flag.slice(2), value);
    }
    return result;
}

function exactInput(path, expected, label) {
    const absolute = resolve(path ?? "");
    const bytes = readFileSync(absolute);
    const actual = sha256(bytes);
    if (actual !== expected) throw new Error(`${label} raw hash mismatch: ${actual}`);
    return { absolute, bytes, sha256: actual, size: bytes.length };
}

function splitLines(bytes) {
    const lines = [];
    let start = 0;
    for (let cursor = 0; cursor < bytes.length; cursor += 1) {
        if (bytes[cursor] !== 0x0a) continue;
        const contentEnd = cursor > start && bytes[cursor - 1] === 0x0d ? cursor - 1 : cursor;
        lines.push({
            line: lines.length + 1,
            start,
            content_end: contentEnd,
            end: cursor + 1,
            text: bytes.subarray(start, contentEnd).toString("utf8"),
        });
        start = cursor + 1;
    }
    if (start < bytes.length || bytes.length === 0) {
        lines.push({
            line: lines.length + 1,
            start,
            content_end: bytes.length,
            end: bytes.length,
            text: bytes.subarray(start).toString("utf8"),
        });
    }
    return lines;
}

function attribute(opening, name) {
    const match = new RegExp(`\\b${name}\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s>]+))`, "i").exec(opening);
    return match?.[1] ?? match?.[2] ?? match?.[3];
}

function classes(opening) {
    return new Set((attribute(opening, "class") ?? "").split(/\s+/).filter(Boolean).map((item) => item.toLowerCase()));
}

function blockEnd(lines, startIndex, tag) {
    let depth = 0;
    const open = new RegExp(`<${tag}\\b`, "ig");
    const close = new RegExp(`</${tag}>`, "ig");
    for (let cursor = startIndex; cursor < lines.length; cursor += 1) {
        const text = lines[cursor].text;
        depth += [...text.matchAll(open)].length;
        depth -= [...text.matchAll(close)].length;
        if (depth <= 0 && cursor > startIndex || depth === 0 && close.test(text)) return cursor;
    }
    return lines.length - 1;
}

function headings(lines) {
    const result = [];
    for (let index = 0; index < lines.length; index += 1) {
        const text = lines[index].text;
        const html = /<h([1-6])\b([^>]*)>([\s\S]*)/i.exec(text);
        if (html !== null) {
            let end = index;
            let body = html[3];
            while (!new RegExp(`</h${html[1]}>`, "i").test(body) && end + 1 < lines.length && end < index + 8) {
                end += 1;
                body += `\n${lines[end].text}`;
            }
            result.push({
                start: index,
                end,
                level: Number(html[1]),
                anchor: attribute(html[2], "id"),
                title: normalized(body.replace(new RegExp(`</h${html[1]}>[\\s\\S]*$`, "i"), "")),
            });
            index = end;
            continue;
        }
        if (index + 1 >= lines.length || !/^\s*(?:=+|-+)\s*$/.test(lines[index + 1].text)) continue;
        const anchor = /\{#([^}]+)\}/.exec(text)?.[1];
        result.push({
            start: index,
            end: index + 1,
            level: lines[index + 1].text.includes("=") ? 2 : 3,
            anchor,
            title: normalized(text.replace(/\s*\{#[^}]+\}\s*$/, "")),
        });
        index += 1;
    }
    for (let index = 0; index < result.length; index += 1) {
        const current = result[index];
        const next = result.slice(index + 1).find((candidate) => candidate.level <= current.level);
        current.section_end = (next?.start ?? lines.length) - 1;
    }
    return result;
}

function enclosingParagraph(lines, index) {
    let start = index;
    let end = index;
    const boundary = (text) => /^\s*$/.test(text)
        || /^\s*(?:=+|-+)\s*$/.test(text)
        || /^\s*<\/?(?:h[1-6]|pre|table|div|dl|ol|ul|li|dt|dd|p|section|wpt|xmp|style|script|figure)\b/i.test(text);
    while (start > 0 && !boundary(lines[start - 1].text)) start -= 1;
    while (end + 1 < lines.length && !boundary(lines[end + 1].text)) end += 1;
    return { start, end };
}

function extractNames(raw, kind, fallback) {
    const result = new Set();
    for (const match of raw.matchAll(/<dfn\b[^>]*>([\s\S]*?)<\/dfn>/gi)) {
        const name = normalized(match[1]);
        if (name) result.add(name);
    }
    for (const match of raw.matchAll(/^\s*Name:\s*(.+)$/gim)) {
        for (const name of normalized(match[1]).split(/\s*,\s*/)) if (name) result.add(name);
    }
    if (result.size === 0 && fallback) result.add(fallback);
    if (result.size === 0 && kind === "grammar_production") {
        const production = /(?:&lt;|<)<<?([^>\n]+)>?(?:&gt;|>)\s*=/.exec(raw)?.[1];
        if (production) result.add(normalized(production));
    }
    return [...result].sort(byteSort);
}

function extractAnchor(raw, fallback) {
    return attribute(raw.slice(0, Math.min(raw.length, 2048)), "id") ?? fallback ?? null;
}

function semanticReferences(raw) {
    const refs = new Map();
    const add = (kind, value, normative = null) => {
        const clean = normalized(value);
        if (!clean) return;
        refs.set(`${kind}\0${clean}\0${normative}`, { kind, value: clean, normative });
    };
    for (const match of raw.matchAll(/\[\[(!?)([A-Za-z0-9_.-]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g)) {
        add("bibliographic", match[2], match[1] === "!" ? true : null);
    }
    for (const match of raw.matchAll(/https?:\/\/(?:drafts\.csswg\.org|www\.w3\.org\/TR)\/([A-Za-z0-9_.-]+)\/?/g)) {
        add("spec_url", match[1], null);
    }
    for (const match of raw.matchAll(/<<([^>]+)>>/g)) add("production", match[1], null);
    for (const match of raw.matchAll(/\[=([^\]]+)=\]/g)) add("definition", match[1].replace(/^[^/]+\//, ""), null);
    for (const match of raw.matchAll(/\{\{([^}]+)\}\}/g)) add("idl_or_property", match[1], null);
    for (const match of raw.matchAll(/''(@?[A-Za-z0-9_-]+(?:\(\))?)''/g)) add("css_term", match[1], null);
    return [...refs.values()].sort((left, right) => byteSort(`${left.kind}:${left.value}`, `${right.kind}:${right.value}`));
}

const DOMAIN_RULES = Object.freeze([
    ["tokens", /tokeniz|token stream|component value|code point|whitespace|comment|escape|identifier|string|css syntax|preprocess/i],
    ["value-unit", /(?:^|\W)(?:number|integer|dimension|percentage|angle|frequency|resolution|flex|unit)(?:\W|$)/i],
    ["color", /color|rgb\(|hsl\(|hwb\(|lab\(|lch\(|oklab|oklch|color-mix|light-dark|contrast-color/i],
    ["easing", /easing|cubic-bezier|steps\(|spring\(|linear easing/i],
    ["gradients", /gradient|image\(|image-set|cross-fade/i],
    ["transforms", /transform|translate|rotate|scale\(|motion path|offset-path/i],
    ["filters", /filter|blur\(|brightness\(|drop-shadow|opacity\(/i],
    ["keyframes", /keyframe|animation|timeline|timeline-range|view progress|scroll progress|trigger/i],
    ["media", /media quer|container quer|supports condition|style quer|@media|@supports|@container/i],
    ["selectors", /selector|pseudo-|:is\(|:where\(|:has\(|::part|part mapping/i],
    ["func-body", /calc\(|min\(|max\(|clamp\(|var\(|env\(|attr\(|url\(|custom function|substitution/i],
    ["properties", /property|descriptor|declaration|computed value|initial value|applies to/i],
    ["stylesheet", /stylesheet|at-rule|qualified rule|style rule|cascade|layer|nesting|scope/i],
    ["keywords", /keyword/i],
]);

function ownerJoin(kind, names, raw) {
    const first = names[0] ?? "unnamed";
    if (kind === "property_definition") return { status: "JOINED_PROVISIONAL", family: "properties", owner: `properties/${slug(first)}`, candidates: [] };
    if (kind === "descriptor_definition") {
        const context = normalized(/^\s*For:\s*(.+)$/im.exec(raw)?.[1] ?? "unresolved-context");
        return { status: "JOINED_PROVISIONAL", family: "properties", owner: `descriptors/${slug(context)}/${slug(first)}`, candidates: [], red_flags: context === "unresolved-context" ? ["DESCRIPTOR_CONTEXT_RED"] : [] };
    }
    if (kind === "at_rule_definition") return { status: "JOINED_PROVISIONAL", family: "stylesheet", owner: `at-rules/${slug(first)}`, candidates: [] };
    if (kind === "selector_definition") return { status: "JOINED_PROVISIONAL", family: "selectors", owner: `selectors/${slug(first)}`, candidates: [] };
    if (kind === "function_definition") {
        const candidates = DOMAIN_RULES.filter(([family, pattern]) => pattern.test(raw)).map(([family]) => family);
        const specific = candidates.find((candidate) => ["color", "easing", "gradients", "transforms", "filters"].includes(candidate));
        const family = specific ?? "func-body";
        return { status: "JOINED_PROVISIONAL", family, owner: `${family}/${slug(first)}`, candidates: [...new Set(candidates)] };
    }
    const candidates = [...new Set(DOMAIN_RULES.filter(([, pattern]) => pattern.test(raw)).map(([family]) => family))];
    if (candidates.length === 1) return { status: "JOINED_PROVISIONAL", family: candidates[0], owner: `${candidates[0]}/${slug(first)}`, candidates };
    if (candidates.length === 0) return { status: "RED_UNJOINED", family: null, owner: null, candidates: [] };
    return { status: "RED_AMBIGUOUS", family: null, owner: null, candidates };
}

function normativity(raw) {
    if (/\b(?:non-normative|informative|example)\b/i.test(raw)) return "RED_CONTEXT_OR_INFORMATIVE";
    return "PROVISIONAL_NORMATIVE_CANDIDATE";
}

function carrierFactory(source, sourceBytes, lines, sourceHeadings) {
    const rows = [];
    const keys = new Set();
    const add = (kind, startIndex, endIndex, extraction, options = {}) => {
        if (startIndex < 0 || endIndex < startIndex || endIndex >= lines.length) throw new Error(`${source.exact_path}: invalid carrier range`);
        const start = lines[startIndex].start;
        const end = lines[endIndex].end;
        const rawBytes = sourceBytes.subarray(start, end);
        const raw = rawBytes.toString("utf8");
        const sliceSha = sha256(rawBytes);
        const key = `${kind}:${start}:${end}:${sliceSha}`;
        if (keys.has(key)) return rows.find((row) => row._key === key);
        keys.add(key);
        const nearestHeading = [...sourceHeadings].reverse().find((heading) => heading.start <= startIndex);
        const names = extractNames(raw, kind, options.name ?? nearestHeading?.title);
        const anchor = extractAnchor(raw, options.anchor ?? nearestHeading?.anchor);
        const join = ownerJoin(kind, names, raw);
        const id = `occ-${sha256(Buffer.from(`${source.exact_path}\0${kind}\0${start}\0${end}\0${sliceSha}`, "utf8")).slice(0, 24)}`;
        const flags = [];
        if (names.length === 0) flags.push("NAME_RED");
        if (anchor === null) flags.push("ANCHOR_RED");
        if (join.status !== "JOINED_PROVISIONAL") flags.push(join.status);
        if (kind.includes("algorithm") && !/(?:\b1\.|<li\b|<ol\b|\breturn\b|\bconsume\b|\bparse\b)/i.test(raw)) flags.push("ALGORITHM_COMPLETENESS_RED");
        if (normativity(raw) !== "PROVISIONAL_NORMATIVE_CANDIDATE") flags.push("NORMATIVITY_CONTEXT_RED");
        for (const flag of join.red_flags ?? []) flags.push(flag);
        const row = {
            id,
            source_path: source.exact_path,
            source_sha256: source.sha256_raw_source,
            root_seed_membership: source.root_seed_membership,
            owner_extension_root: options.ownerExtensionRoot ?? false,
            kind,
            extraction,
            anchor,
            names,
            start_line: startIndex + 1,
            end_line: endIndex + 1,
            start_offset: start,
            end_offset_exclusive: end,
            raw_slice_sha256: sliceSha,
            raw_slice_bytes: rawBytes.length,
            normativity: normativity(raw),
            semantic_references: semanticReferences(raw),
            owner_join: join,
            red_flags: [...new Set(flags)].sort(byteSort),
            _key: key,
            _raw: raw,
        };
        rows.push(row);
        return row;
    };
    return { rows, add };
}

function definitionKind(opening, raw) {
    const classSet = classes(opening);
    if (classSet.has("propdef")) return "property_definition";
    if (classSet.has("descdef")) return "descriptor_definition";
    if (["prod", "grammar", "railroad"].some((name) => classSet.has(name))) return "grammar_production";
    if (/\bat-rule\b/i.test(opening) || /<dfn[^>]*>\s*@/i.test(raw)) return "at_rule_definition";
    if (/\bselector\b/i.test(opening)) return "selector_definition";
    if (/\bfunction\b/i.test(opening) || /<dfn[^>]*>[^<]*\(\)/i.test(raw)) return "function_definition";
    return "semantic_definition";
}

function extractSourceCarriers(source, bytes, ownerExtensionRoot) {
    const lines = splitLines(bytes);
    const sourceHeadings = headings(lines);
    const factory = carrierFactory(source, bytes, lines, sourceHeadings);
    const { rows, add } = factory;

    for (let index = 0; index < lines.length; index += 1) {
        const openingMatch = /<(pre|table|div|dl|ol)\b[^>]*>/i.exec(lines[index].text);
        if (openingMatch !== null) {
            const opening = openingMatch[0];
            const classSet = classes(opening);
            const relevant = ["propdef", "descdef", "prod", "grammar", "railroad", "algorithm"].some((name) => classSet.has(name))
                || /\b(?:algorithm|at-rule|selector|function)(?:\s*=|\s|>)/i.test(opening);
            if (relevant) {
                const end = blockEnd(lines, index, openingMatch[1].toLowerCase());
                const raw = bytes.subarray(lines[index].start, lines[end].end).toString("utf8");
                const kind = /\balgorithm(?:\s*=|\s|>)/i.test(opening) || classSet.has("algorithm")
                    ? "algorithm_block"
                    : definitionKind(opening, raw);
                add(kind, index, end, "STRUCTURAL_MARKUP_BLOCK", { ownerExtensionRoot });
            }
        }
        if (/<dfn\b/i.test(lines[index].text)) {
            const paragraph = enclosingParagraph(lines, index);
            const raw = bytes.subarray(lines[paragraph.start].start, lines[paragraph.end].end).toString("utf8");
            const kind = definitionKind(lines[index].text, raw);
            add(kind, paragraph.start, paragraph.end, "DFN_PARAGRAPH", { ownerExtensionRoot });
        }
    }

    for (const heading of sourceHeadings) {
        if (/parse|parsing|tokeniz|consume|component value|recover|invalid|serializ|canonical|source.?preserv/i.test(`${heading.title} ${heading.anchor ?? ""}`)) {
            const alreadyHasAlgorithm = rows.some((row) => row.kind === "algorithm_block" && row.start_line - 1 >= heading.start && row.end_line - 1 <= heading.section_end);
            const kind = /serializ|canonical|source.?preserv/i.test(`${heading.title} ${heading.anchor ?? ""}`)
                ? "serialization_section"
                : "algorithm_section";
            if (!alreadyHasAlgorithm || kind === "serialization_section") {
                add(kind, heading.start, heading.section_end, "HEADING_SECTION", {
                    name: heading.title,
                    anchor: heading.anchor,
                    ownerExtensionRoot,
                });
            }
        }
    }

    const paragraphSeen = new Set();
    for (let index = 0; index < lines.length; index += 1) {
        const text = lines[index].text;
        const isInvalidity = /parse error|syntax error|invalid|invalidity|recover|recovery|diagnostic|discard|ignored?|unterminated|bad-string|bad-url/i.test(text);
        const isSerialization = /serializ|canonical|source.?preserv|round.?trip/i.test(text);
        if (!isInvalidity && !isSerialization) continue;
        const paragraph = enclosingParagraph(lines, index);
        const key = `${paragraph.start}:${paragraph.end}`;
        if (paragraphSeen.has(key)) continue;
        paragraphSeen.add(key);
        add(isSerialization ? "serialization_rule" : "invalidity_recovery_rule", paragraph.start, paragraph.end, "SEMANTIC_PARAGRAPH", { ownerExtensionRoot });
    }

    const refLineSeen = new Set();
    for (let index = 0; index < lines.length; index += 1) {
        if (!/\[\[!?[A-Za-z0-9_.-]+|https?:\/\/(?:drafts\.csswg\.org|www\.w3\.org\/TR)\//i.test(lines[index].text)) continue;
        const paragraph = enclosingParagraph(lines, index);
        const key = `${paragraph.start}:${paragraph.end}`;
        if (refLineSeen.has(key)) continue;
        refLineSeen.add(key);
        add("normative_reference", paragraph.start, paragraph.end, "FULL_SOURCE_REFERENCE_SCAN", { ownerExtensionRoot });
    }

    return { lines, headings: sourceHeadings, rows, add };
}

function requireLineRange(sourceMap, path, startLine, endLine, requirement, requiredText) {
    const source = sourceMap.get(path);
    if (source === undefined) throw new Error(`required counterexample source absent: ${path}`);
    const raw = source.bytes.subarray(source.lines[startLine - 1].start, source.lines[endLine - 1].end).toString("utf8");
    for (const text of requiredText) if (!raw.includes(text)) throw new Error(`${requirement}: required text absent: ${text}`);
    const row = source.factory.add("required_algorithm_counterexample", startLine - 1, endLine - 1, "EXACT_REQUIRED_LINE_RANGE", {
        name: requirement,
        ownerExtensionRoot: source.ownerExtensionRoot,
    });
    return { requirement, carrier_id: row.id, source_path: path, start_line: startLine, end_line: endLine };
}

const LEGACY_RUNTIME_EXPORTS = Object.freeze([
    "parseCssColor", "parseCssScalar", "parseCssValue", "parseCssValues", "parseKeyframeSelector", "parseTimingFunction",
    "serializeCssColor", "coerceToSyntax", "parseAnimationRange", "parseAnimationTimeline", "serializeTimelineOptions",
    "collectAnimationOptions", "collectCustomFunctions", "collectDeclarations", "collectKeyframes", "collectPropertyDescriptors",
    "collectStyleRules", "collectTimelineOptions", "parseStylesheet",
]);
const LEGACY_TYPE_EXPORTS = Object.freeze([
    "CssColorSpace", "CssColor", "CssLinearStop", "CssTimingFunction", "Declaration", "KeyframeSelector", "KeyframeRule",
    "CSSPropertyDescriptor", "PropertyRule", "CustomFunctionParameter", "CustomFunctionDescriptor", "CustomFunctionRule",
    "CSSAnimationOptions", "AnimationTimelineValue", "ScrollerKeyword", "TimelineAxis", "ViewInset", "RangePhase",
    "RangeBoundary", "AnimationRangeValue", "TimelineScopeValue", "TriggerType", "AnimationTriggerValue", "CSSTimelineOptions",
    "ScrollTimelineDescriptor", "ViewTimelineDescriptor", "StyleRule", "KeyframesBlock", "StylesheetItem", "Stylesheet",
    "CollectedRule", "ParseIssue", "ParseResult",
]);
const KEYFRAMES_CONSUMER_SYMBOLS = Object.freeze([
    "KeyframeSelector", "KeyframeRule", "CSSTimelineOptions", "AnimationRangeValue", "AnimationTimelineValue",
    "AnimationTriggerValue", "RangeBoundary", "RangePhase", "TriggerType", "CSSAnimationOptions", "CSSPropertyDescriptor",
    "CustomFunctionDescriptor", "CustomFunctionParameter", "Stylesheet", "StylesheetItem", "CssColor",
    "CssLinearStop", "CssTimingFunction", "Declaration", "ParseIssue", "ParseResult", "parseCssScalar", "parseCssValues",
    "parseKeyframeSelector", "parseTimingFunction", "parseAnimationRange", "parseAnimationTimeline", "serializeTimelineOptions",
    "serializeCssColor", "coerceToSyntax", "collectAnimationOptions", "collectCustomFunctions", "collectPropertyDescriptors",
    "collectKeyframes", "collectStyleRules", "collectTimelineOptions", "parseStylesheet",
]);

function compatibilityOwner(symbol) {
    if (/Color/.test(symbol)) return "color";
    if (/Timing|Timeline|Range|Trigger|Keyframe/.test(symbol)) return "keyframes";
    if (/Selector/.test(symbol)) return "selectors";
    if (/Property|Declaration|CustomFunction/.test(symbol)) return "properties";
    if (/Stylesheet|StyleRule|CollectedRule/.test(symbol)) return "stylesheet";
    if (/Issue|Result/.test(symbol)) return "tokens";
    if (/CssScalar|CssValue|CssValues|Syntax/.test(symbol)) return "values";
    if (/collect/.test(symbol)) return "stylesheet";
    return "RED_UNJOINED";
}

const DAG_EDGES = Object.freeze([
    ["value-unit", "tokens"], ["keywords", "tokens"], ["func-body", "tokens"], ["func-body", "value-unit"],
    ["timeline-range", "tokens"], ["timeline-range", "value-unit"], ["color", "tokens"], ["color", "value-unit"],
    ["color", "func-body"], ["easing", "tokens"], ["easing", "value-unit"], ["gradients", "tokens"],
    ["gradients", "value-unit"], ["gradients", "color"], ["gradients", "func-body"], ["transforms", "tokens"],
    ["transforms", "value-unit"], ["transforms", "func-body"], ["filters", "tokens"], ["filters", "value-unit"],
    ["filters", "color"], ["filters", "func-body"], ["values", "tokens"], ["values", "value-unit"],
    ["values", "keywords"], ["values", "func-body"], ["values", "color"], ["values", "easing"],
    ["values", "gradients"], ["values", "transforms"], ["values", "filters"], ["values", "timeline-range"],
    ["properties", "tokens"], ["properties", "keywords"], ["properties", "values"], ["selectors", "tokens"],
    ["media", "tokens"], ["media", "value-unit"], ["media", "func-body"], ["keyframes", "tokens"],
    ["keyframes", "properties"], ["keyframes", "timeline-range"], ["stylesheet", "properties"],
    ["stylesheet", "selectors"], ["stylesheet", "media"], ["stylesheet", "keyframes"],
]);

function validateDag() {
    const nodes = new Set(DAG_EDGES.flat());
    const visiting = new Set();
    const visited = new Set();
    const visit = (node) => {
        if (visiting.has(node)) throw new Error(`DAG cycle at ${node}`);
        if (visited.has(node)) return;
        visiting.add(node);
        for (const [, dependency] of DAG_EDGES.filter(([from]) => from === node)) visit(dependency);
        visiting.delete(node);
        visited.add(node);
    };
    visit("stylesheet");
    if (![...nodes].every((node) => visited.has(node))) throw new Error("DAG root does not reach every declared node");
    return [...nodes].sort(byteSort);
}

const OWNER_SCOPE_INPUTS = Object.freeze([
    ["owner-color-growth", ["relative color", "color-mix", "light-dark", "contrast-color"]],
    ["owner-easing-spring", ["spring()"]],
    ["owner-filter-url-shape-shadow", ["filter", "url()", "shape", "shadow"]],
    ["owner-calc-math", ["calc()", "min()", "max()", "clamp()"]],
    ["owner-gradients-image", ["gradient", "<image>"]],
    ["owner-keyframes-timeline-trigger", ["keyframe", "timeline", "trigger"]],
    ["owner-media-container-supports", ["media", "container", "supports"]],
    ["owner-typed-declarations", ["typed declaration", "value matcher"]],
    ["owner-typed-selectors", ["selector"]],
    ["owner-at-rule-recovery", ["at-rule", "recovery"]],
    ["owner-css-syntax", ["tokenizer", "component value"]],
    ["owner-transform-motion", ["transform", "motion path"]],
    ["owner-unit-algebra", ["unit", "dimension"]],
    ["owner-substitution", ["var()", "env()", "attr()"]],
]);

const args = argumentsFrom(process.argv.slice(2));
const input = {
    universe: exactInput(args.get("universe"), EXPECTED.universe, "source universe"),
    complementV3: exactInput(args.get("complement-v3"), EXPECTED.complementV3, "complement v3"),
    complementAcceptance: exactInput(args.get("complement-acceptance"), EXPECTED.complementAcceptance, "complement acceptance"),
    complementChallengeA: exactInput(args.get("complement-challenge-a"), EXPECTED.complementChallengeA, "complement challenge A"),
    complementChallengeB: exactInput(args.get("complement-challenge-b"), EXPECTED.complementChallengeB, "complement challenge B"),
    complementGestalt: exactInput(args.get("complement-gestalt"), EXPECTED.complementGestalt, "complement root gestalt"),
    seed: exactInput(args.get("seed"), EXPECTED.seed, "root seed"),
    moduleDag: exactInput(args.get("module-dag"), EXPECTED.moduleDag, "module DAG"),
    pi: exactInput(args.get("pi"), EXPECTED.pi, "PI wave sheet"),
    coverage: exactInput(args.get("coverage"), EXPECTED.coverage, "parser-proof coverage census"),
    addenda01: exactInput(args.get("addenda-01"), EXPECTED.addenda01, "ADDENDA-01"),
    addenda02: exactInput(args.get("addenda-02"), EXPECTED.addenda02, "ADDENDA-02"),
    addenda07: exactInput(args.get("addenda-07"), EXPECTED.addenda07, "ADDENDA-07"),
};
const universe = JSON.parse(input.universe.bytes.toString("utf8"));
const complementV3 = JSON.parse(input.complementV3.bytes.toString("utf8"));
const complementAcceptance = JSON.parse(input.complementAcceptance.bytes.toString("utf8"));
const seed = JSON.parse(input.seed.bytes.toString("utf8"));
if (universe.verified_commit !== PIN.commit || universe.verified_commit_tree !== PIN.tree) throw new Error("universe pin mismatch");
if (seed.verified_commit !== PIN.commit || seed.verified_commit_tree !== PIN.tree) throw new Error("seed pin mismatch");
if (complementAcceptance.status !== "ACCEPTED_NEUTRAL_DISCOVERY_ROUTING_ONLY") throw new Error("complement routing not accepted");
if (complementAcceptance.subject.artifact_sha256 !== EXPECTED.complementV3) throw new Error("complement acceptance subject mismatch");
if (complementAcceptance.challenges?.[0]?.sha256 !== EXPECTED.complementChallengeA
    || complementAcceptance.challenges?.[1]?.sha256 !== EXPECTED.complementChallengeB) {
    throw new Error("complement acceptance challenge identities mismatch");
}
for (const identity of [EXPECTED.complementV3, EXPECTED.complementChallengeA, EXPECTED.complementChallengeB]) {
    if (!input.complementGestalt.bytes.includes(Buffer.from(identity, "utf8"))) throw new Error(`complement gestalt does not bind ${identity}`);
}
if (complementV3.entries.length !== 92 || complementV3.entries.some((entry) => entry.terminal_exclusion_authorized !== false)) {
    throw new Error("complement v3 is not the exact neutral 92-source queue");
}

const sourceRoot = resolve(args.get("source-root") ?? "");
const ownerExtensionPaths = new Set(seed.roots
    .filter((root) => root.scope_roles.includes("explicit_later_or_experimental_extension"))
    .map((root) => root.exact_path));
const sourceMap = new Map();
let bytesRead = 0;
for (const source of universe.sources) {
    const path = resolve(sourceRoot, source.exact_path);
    const bytes = readFileSync(path);
    if (statSync(path).size !== source.raw_source_bytes || bytes.length !== source.raw_source_bytes || sha256(bytes) !== source.sha256_raw_source) {
        throw new Error(`pinned source mismatch: ${source.exact_path}`);
    }
    bytesRead += bytes.length;
    const ownerExtensionRoot = ownerExtensionPaths.has(source.exact_path);
    const extracted = extractSourceCarriers(source, bytes, ownerExtensionRoot);
    sourceMap.set(source.exact_path, {
        source,
        bytes,
        lines: extracted.lines,
        headings: extracted.headings,
        factory: { rows: extracted.rows, add: extracted.add },
        ownerExtensionRoot,
    });
}
if (sourceMap.size !== 168 || bytesRead !== universe.sources.reduce((sum, source) => sum + source.raw_source_bytes, 0)) {
    throw new Error("full 168-source byte closure failed");
}

const requiredCounterexamples = [
    requireLineRange(sourceMap, "css-shadow-1/Overview.bs", 1475, 1531, "css-shadow-part-mapping-parser", ["Rules for parsing part mappings", "Rules for parsing a list of part mappings", "parsing part mappings"]),
    requireLineRange(sourceMap, "css-mixins-1/Overview.bs", 198, 318, "css-mixins-function-parse-token-rules", ["&lt;@function>", "function-token", "[=CSS/parse=]", "invalid and ignored"]),
    requireLineRange(sourceMap, "css-mixins-1/Overview.bs", 406, 478, "css-mixins-dashed-function-token-rules", ["equivalent token sequence", "valid at parse time", "<div algorithm>"]),
    requireLineRange(sourceMap, "css-2026/Overview.bs", 736, 756, "snapshot-forward-compatible-parsing", ["forward-compatible parsing rules", "<em>must</em> treat as invalid", "entire declaration be ignored"]),
    requireLineRange(sourceMap, "css-syntax-3/Overview.bs", 276, 297, "css-syntax-parse-error-recovery-policy", ["Tokenizing and Parsing CSS", "recover from parse errors", "same way as user agents"]),
    requireLineRange(sourceMap, "css-syntax-3/Overview.bs", 437, 460, "css-syntax-input-preprocessing", ["Preprocessing the input stream", "Replace", "U+FFFD REPLACEMENT CHARACTER"]),
    requireLineRange(sourceMap, "css-syntax-3/Overview.bs", 463, 490, "css-syntax-tokenize-entry", ["tokenize", "consume a token", "&lt;dimension-token>"]),
    requireLineRange(sourceMap, "css-syntax-3/Overview.bs", 2454, 2519, "css-syntax-component-value-parse-entries", ["Parse a component value", "Parse a list of component values", "syntax error"]),
    requireLineRange(sourceMap, "css-syntax-3/Overview.bs", 3069, 3179, "css-syntax-component-value-block-function-consumption", ["Consume a list of component values", "Consume a simple block", "Consume a function"]),
    requireLineRange(sourceMap, "css-syntax-3/Overview.bs", 3698, 3749, "css-syntax-round-trip-serialization", ["Serialization", "round-trip", "preserved comment"]),
];

const carriersWithRaw = [...sourceMap.values()].flatMap((source) => source.factory.rows);
const carrierIds = new Set(carriersWithRaw.map((carrier) => carrier.id));
if (carrierIds.size !== carriersWithRaw.length) throw new Error("carrier stable IDs are not unique");
for (const carrier of carriersWithRaw) {
    const source = sourceMap.get(carrier.source_path);
    const slice = source.bytes.subarray(carrier.start_offset, carrier.end_offset_exclusive);
    if (slice.length !== carrier.raw_slice_bytes || sha256(slice) !== carrier.raw_slice_sha256) throw new Error(`carrier slice replay failed: ${carrier.id}`);
    if (source.lines[carrier.start_line - 1].start !== carrier.start_offset || source.lines[carrier.end_line - 1].end !== carrier.end_offset_exclusive) {
        throw new Error(`carrier line/offset replay failed: ${carrier.id}`);
    }
}

const directoryByNormalized = new Map();
for (const source of universe.sources) {
    const keys = new Set([
        source.directory.toLowerCase(),
        source.directory.toLowerCase().replace(/-/g, ""),
        source.directory.toLowerCase().replace(/-(?:1|2|3|4|5)$/, ""),
    ]);
    for (const key of keys) {
        const values = directoryByNormalized.get(key) ?? [];
        values.push(source.directory);
        directoryByNormalized.set(key, values);
    }
}
const referenceEdgesMap = new Map();
for (const carrier of carriersWithRaw) {
    for (const reference of carrier.semantic_references.filter((item) => ["bibliographic", "spec_url"].includes(item.kind))) {
        const key = reference.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
        const exactCandidates = directoryByNormalized.get(key) ?? [];
        const compactCandidates = directoryByNormalized.get(key.replace(/-/g, "")) ?? [];
        const familyCandidates = directoryByNormalized.get(key.replace(/-(?:1|2|3|4|5)$/, "")) ?? [];
        const candidates = [...new Set(exactCandidates.length > 0
            ? exactCandidates
            : compactCandidates.length > 0
                ? compactCandidates
                : familyCandidates)].sort(byteSort);
        const edgeKey = `${carrier.source_path}\0${reference.kind}\0${reference.value}\0${candidates.join(",")}`;
        const edge = referenceEdgesMap.get(edgeKey) ?? {
            id: `ref-${sha256(Buffer.from(edgeKey, "utf8")).slice(0, 24)}`,
            source_path: carrier.source_path,
            reference_kind: reference.kind,
            reference_value: reference.value,
            explicit_normative_marker: reference.normative,
            target_source_directories: candidates,
            resolution: candidates.length === 1 ? "RESOLVED_IN_168" : candidates.length === 0 ? "RED_EXTERNAL_OR_UNRESOLVED" : "RED_AMBIGUOUS_TARGET",
            evidence_carrier_ids: [],
        };
        edge.evidence_carrier_ids.push(carrier.id);
        referenceEdgesMap.set(edgeKey, edge);
    }
}
const referenceEdges = [...referenceEdgesMap.values()]
    .map((edge) => ({ ...edge, evidence_carrier_ids: [...new Set(edge.evidence_carrier_ids)].sort(byteSort) }))
    .sort((left, right) => byteSort(left.id, right.id));
if (new Set(referenceEdges.map((edge) => edge.id)).size !== referenceEdges.length) throw new Error("reference IDs are not unique");

const definitionOwnerBySymbol = new Map();
for (const carrier of carriersWithRaw) {
    if (carrier.owner_join.status !== "JOINED_PROVISIONAL") continue;
    for (const name of carrier.names) {
        const key = slug(name);
        const owners = definitionOwnerBySymbol.get(key) ?? new Map();
        owners.set(carrier.owner_join.owner, [...(owners.get(carrier.owner_join.owner) ?? []), carrier.id]);
        definitionOwnerBySymbol.set(key, owners);
    }
}
const semanticOwnerEdgesMap = new Map();
const unjoinedSemanticReferences = [];
for (const carrier of carriersWithRaw) {
    if (carrier.owner_join.status !== "JOINED_PROVISIONAL") continue;
    for (const reference of carrier.semantic_references.filter((item) => !["bibliographic", "spec_url"].includes(item.kind))) {
        const targets = definitionOwnerBySymbol.get(slug(reference.value));
        if (targets === undefined) {
            unjoinedSemanticReferences.push({ carrier_id: carrier.id, reference_kind: reference.kind, reference_value: reference.value });
            continue;
        }
        const targetOwners = [...targets.keys()].sort(byteSort);
        if (targetOwners.length !== 1) {
            unjoinedSemanticReferences.push({ carrier_id: carrier.id, reference_kind: reference.kind, reference_value: reference.value, candidate_owners: targetOwners });
            continue;
        }
        const targetOwner = targetOwners[0];
        if (targetOwner === carrier.owner_join.owner) continue;
        const key = `${carrier.owner_join.owner}\0${targetOwner}`;
        const edge = semanticOwnerEdgesMap.get(key) ?? {
            id: `owner-edge-${sha256(Buffer.from(key, "utf8")).slice(0, 20)}`,
            from_owner: carrier.owner_join.owner,
            to_owner: targetOwner,
            status: "PROVISIONAL_EXACT_SYMBOL_REFERENCE_JOIN",
            evidence: [],
        };
        edge.evidence.push({ carrier_id: carrier.id, reference_kind: reference.kind, reference_value: reference.value });
        semanticOwnerEdgesMap.set(key, edge);
    }
}
const semanticOwnerEdges = [...semanticOwnerEdgesMap.values()]
    .map((edge) => ({ ...edge, evidence: edge.evidence.sort((a, b) => byteSort(`${a.carrier_id}:${a.reference_value}`, `${b.carrier_id}:${b.reference_value}`)) }))
    .sort((a, b) => byteSort(a.id, b.id));

const scopeInputLines = input.addenda01.bytes.toString("utf8").split(/\r?\n/);
const ownerScopeInputs = OWNER_SCOPE_INPUTS.map(([id, searchTerms]) => {
    const inputLines = [];
    for (let index = 0; index < scopeInputLines.length; index += 1) {
        if (searchTerms.some((term) => scopeInputLines[index].toLowerCase().includes(term.toLowerCase()))) inputLines.push(index + 1);
    }
    const carrierIdsForTerms = carriersWithRaw
        .filter((carrier) => searchTerms.some((term) => carrier._raw.toLowerCase().includes(term.toLowerCase())))
        .map((carrier) => carrier.id)
        .sort(byteSort);
    return {
        id,
        input_source: "ADDENDA-01.md",
        input_source_sha256: input.addenda01.sha256,
        input_lines: inputLines,
        search_terms: searchTerms,
        occurrence_carrier_ids: carrierIdsForTerms,
        status: carrierIdsForTerms.length === 0 ? "RED_NO_EXACT_CARRIER" : "PROVISIONAL_OCCURRENCE_JOIN",
    };
});

const dagNodes = validateDag();
const allCompatibility = [...LEGACY_RUNTIME_EXPORTS, ...LEGACY_TYPE_EXPORTS];
if (allCompatibility.length !== 52 || new Set(allCompatibility).size !== 52) throw new Error("52-export compatibility census mismatch");
if (KEYFRAMES_CONSUMER_SYMBOLS.length !== 37 || new Set(KEYFRAMES_CONSUMER_SYMBOLS).size !== 37) throw new Error("37-symbol consumer census mismatch");
for (const symbol of allCompatibility) if (!input.pi.bytes.includes(Buffer.from(`\`${symbol}\``))) throw new Error(`PI missing 52-export symbol: ${symbol}`);
for (const symbol of KEYFRAMES_CONSUMER_SYMBOLS) if (!input.coverage.bytes.includes(Buffer.from(`\`${symbol}\``))) throw new Error(`coverage census missing 37-consumer symbol: ${symbol}`);
const compatibilityRows = allCompatibility.map((symbol) => {
    const family = compatibilityOwner(symbol);
    return {
        symbol,
        surface: LEGACY_RUNTIME_EXPORTS.includes(symbol) ? "LEGACY_RUNTIME_EXPORT" : "LEGACY_TYPE_EXPORT",
        keyframes_consumer_seam: KEYFRAMES_CONSUMER_SYMBOLS.includes(symbol),
        provisional_owner_family: family,
        dag_join: dagNodes.includes(family) ? "DAG_NODE" : family === "values" ? "DAG_NODE" : "RED_NO_DAG_NODE",
    };
});

const sourceRows = universe.sources.map((source) => {
    const extracted = sourceMap.get(source.exact_path);
    const sourceCarriers = extracted.factory.rows;
    const byKind = {};
    for (const carrier of sourceCarriers) byKind[carrier.kind] = (byKind[carrier.kind] ?? 0) + 1;
    return {
        exact_path: source.exact_path,
        source_format: source.source_format,
        git_blob_oid_sha1: source.git_blob_oid_sha1,
        sha256_raw_source: source.sha256_raw_source,
        raw_source_bytes: source.raw_source_bytes,
        raw_source_lines: extracted.lines.length,
        root_seed_membership: source.root_seed_membership,
        complement_route: source.root_seed_membership ? "ROOT_SEED_MEMBER_PENDING_OWNER_JOIN" : "OCCURRENCE_OWNER_REVIEW_RED",
        owner_extension_root: extracted.ownerExtensionRoot,
        carrier_count: sourceCarriers.length,
        carrier_counts_by_kind: Object.fromEntries(Object.entries(byKind).sort(([a], [b]) => byteSort(a, b))),
        red_flags: sourceCarriers.length === 0 ? ["NO_STRUCTURAL_CARRIER_DETECTED_RED"] : [],
        full_bytes_read_and_hash_verified: true,
    };
});

const kindWeights = Object.freeze({
    grammar_production: 3,
    property_definition: 2,
    descriptor_definition: 2,
    at_rule_definition: 3,
    selector_definition: 3,
    function_definition: 3,
    semantic_definition: 1,
    algorithm_block: 5,
    algorithm_section: 5,
    required_algorithm_counterexample: 5,
    invalidity_recovery_rule: 2,
    serialization_section: 4,
    serialization_rule: 2,
    normative_reference: 1,
});
const ownerAggregateMap = new Map();
for (const carrier of carriersWithRaw) {
    const family = carrier.owner_join.family ?? carrier.owner_join.status;
    const aggregate = ownerAggregateMap.get(family) ?? {
        owner_family: family,
        joined_carriers: 0,
        raw_slice_bytes_sum_non_union: 0,
        weighted_occurrence_units: 0,
        kind_counts: {},
        source_paths: new Set(),
        red_carriers: 0,
    };
    aggregate.joined_carriers += 1;
    aggregate.raw_slice_bytes_sum_non_union += carrier.raw_slice_bytes;
    aggregate.weighted_occurrence_units += kindWeights[carrier.kind] ?? 1;
    aggregate.kind_counts[carrier.kind] = (aggregate.kind_counts[carrier.kind] ?? 0) + 1;
    aggregate.source_paths.add(carrier.source_path);
    if (carrier.red_flags.length > 0) aggregate.red_carriers += 1;
    ownerAggregateMap.set(family, aggregate);
}
const ownerFamilyLattice = [...ownerAggregateMap.values()]
    .map((row) => ({
        ...row,
        source_paths: [...row.source_paths].sort(byteSort),
        kind_counts: Object.fromEntries(Object.entries(row.kind_counts).sort(([a], [b]) => byteSort(a, b))),
        cost_grade: row.weighted_occurrence_units >= 500 ? "XL" : row.weighted_occurrence_units >= 200 ? "L" : row.weighted_occurrence_units >= 80 ? "M" : "S",
        cost_rule: "weighted occurrence units: algorithm/required-algorithm 5; serialization section 4; grammar/at-rule/function/selector 3; property/descriptor/invalidity/serialization rule 2; other/reference 1",
        status: row.owner_family.startsWith("RED_") || row.red_carriers > 0 ? "RED_PROVISIONAL" : "PROVISIONAL_JOINED",
    }))
    .sort((a, b) => byteSort(a.owner_family, b.owner_family));

const carriers = carriersWithRaw
    .map(({ _key, _raw, semantic_references, source_sha256, root_seed_membership, owner_extension_root, ...carrier }) => carrier)
    .sort((a, b) => byteSort(a.id, b.id));
const redCounts = {
    source_rows_without_detected_carriers: sourceRows.filter((row) => row.carrier_count === 0).length,
    carriers_with_any_red_flag: carriers.filter((carrier) => carrier.red_flags.length > 0).length,
    owner_unjoined: carriers.filter((carrier) => carrier.owner_join.status === "RED_UNJOINED").length,
    owner_ambiguous: carriers.filter((carrier) => carrier.owner_join.status === "RED_AMBIGUOUS").length,
    reference_edges_external_or_unresolved: referenceEdges.filter((edge) => edge.resolution === "RED_EXTERNAL_OR_UNRESOLVED").length,
    reference_edges_ambiguous: referenceEdges.filter((edge) => edge.resolution === "RED_AMBIGUOUS_TARGET").length,
    semantic_references_unjoined_or_ambiguous: unjoinedSemanticReferences.length,
    owner_scope_inputs_without_carrier: ownerScopeInputs.filter((row) => row.status === "RED_NO_EXACT_CARRIER").length,
};

const payload = {
    schema_version: "value.pi.full-source-occurrence-owner-formation/v1",
    authority_status: "PROVISIONAL_FORMATION_AWAITING_TWO_CHALLENGES_AND_GESTALT_NO_DENOMINATOR_CREDIT",
    governing_rule: "Every one of the 168 pinned sources was byte-read and authenticated. Structural carriers are content-addressed candidates, never terminal omissions or a heuristic-line denominator. Unjoined, ambiguous, external, contextual, and algorithm-completeness questions remain RED.",
    verified_commit: PIN.commit,
    verified_commit_tree: PIN.tree,
    input_identities: Object.fromEntries(Object.entries(input).map(([name, value]) => [name, { sha256: value.sha256, bytes: value.size, repo_relative_path: value.absolute.includes("/docs/") ? value.absolute.slice(value.absolute.indexOf("docs/")) : null }])),
    source_closure: {
        source_count: sourceRows.length,
        seed_count: sourceRows.filter((row) => row.root_seed_membership).length,
        complement_count: sourceRows.filter((row) => !row.root_seed_membership).length,
        exact_raw_source_bytes_read: bytesRead,
        full_bytes_read_and_hash_verified: true,
        no_terminal_exclusion_applied: true,
        sources: sourceRows,
    },
    occurrence_carriers: {
        count: carriers.length,
        stable_id_uniqueness_verified: true,
        raw_slice_hash_and_line_offset_replay_verified: true,
        rows: carriers,
    },
    required_algorithmic_counterexamples: requiredCounterexamples,
    fixed_point_reference_queue: {
        status: redCounts.reference_edges_external_or_unresolved === 0 && redCounts.reference_edges_ambiguous === 0
            ? "INTERNAL_AND_EXTERNAL_FIXED_POINT_PROVISIONAL"
            : "INTERNAL_168_CLOSURE_READ_EXTERNAL_OR_AMBIGUOUS_REFERENCES_RED",
        initial_queue: "all 168 authenticated top-level authoritative Overview sources; no route/status omission",
        resolved_targets_inside_168: referenceEdges.filter((edge) => edge.resolution === "RESOLVED_IN_168").length,
        external_or_unresolved_targets_red: redCounts.reference_edges_external_or_unresolved,
        ambiguous_targets_red: redCounts.reference_edges_ambiguous,
        edges: referenceEdges,
    },
    owner_join: {
        module_dag_subject_sha256: EXPECTED.moduleDag,
        module_dag_status: "TERMINAL_SHARED_BOUNDARY_ACK_PROPOSAL_ONLY",
        module_dag_nodes: dagNodes,
        module_dag_edges: DAG_EDGES.map(([from, dependency]) => ({ from, dependency })),
        semantic_reference_owner_edges: semanticOwnerEdges,
        semantic_references_unjoined_or_ambiguous_red: unjoinedSemanticReferences.sort((a, b) => byteSort(`${a.carrier_id}:${a.reference_value}`, `${b.carrier_id}:${b.reference_value}`)),
        provisional_owner_family_lattice_and_cost: ownerFamilyLattice,
        derivation: "Families and costs derive only from exact carrier joins and exact symbol-reference joins. Source directory/module title is never a semantic-owner classifier. Module-DAG edges remain the separately content-addressed acknowledged proposal.",
    },
    owner_scope_inputs: {
        exact_owner_extension_root_count: ownerExtensionPaths.size,
        exact_owner_extension_roots: [...ownerExtensionPaths].sort(byteSort),
        addenda_01_scope_rows: ownerScopeInputs,
        caveat: "These are separately flagged owner inputs. A search join is discovery only; zero matches remain RED and matches confer neither normativity nor feature credit. spring() is expected to remain RED absent a pinned carrier.",
    },
    compatibility_obligations: {
        source: {
            phase_a_path: "docs/tranches/V/apotheosis/pi/PI.md",
            phase_a_sha256: input.pi.sha256,
            exact_consumer_census_path: "docs/tranches/V/apotheosis/parser-proof/coverage.md",
            exact_consumer_census_sha256: input.coverage.sha256,
        },
        legacy_runtime_export_count: LEGACY_RUNTIME_EXPORTS.length,
        legacy_type_export_count: LEGACY_TYPE_EXPORTS.length,
        total_legacy_export_count: allCompatibility.length,
        keyframes_consumer_symbol_count: KEYFRAMES_CONSUMER_SYMBOLS.length,
        exact_37_symbols: KEYFRAMES_CONSUMER_SYMBOLS,
        rows: compatibilityRows,
        status: "PROVISIONAL_SYMBOL_TO_OWNER_FAMILY_JOIN_NO_COMPATIBILITY_CREDIT",
    },
    validation: {
        unique_source_paths: new Set(sourceRows.map((row) => row.exact_path)).size === 168,
        exact_76_seed_plus_92_complement: sourceRows.filter((row) => row.root_seed_membership).length === 76 && sourceRows.filter((row) => !row.root_seed_membership).length === 92,
        all_168_source_hashes_and_bytes_verified: true,
        every_source_byte_read: true,
        carrier_ids_unique: carrierIds.size === carriers.length,
        every_carrier_slice_hash_replayed: true,
        every_carrier_line_offset_replayed: true,
        module_dag_acyclic_and_root_reachable: true,
        exact_52_export_census: allCompatibility.length === 52,
        exact_37_consumer_symbol_census: KEYFRAMES_CONSUMER_SYMBOLS.length === 37,
        required_counterexamples_present: requiredCounterexamples.length === 10,
        payload_replay_command_required: true,
    },
    red_gaps: {
        counts: redCounts,
        blockers: [
            "This structural carrier assay is not a complete normative operation denominator; no absence or exclusion is inferred from a missing structural match.",
            "Every RED_UNJOINED or RED_AMBIGUOUS carrier requires reviewed semantic ownership without collapsing contextually distinct productions by spelling.",
            "External and ambiguous reference targets remain on the fixed-point queue; no status- or route-based terminal omission is authorized.",
            "Algorithm sections and semantic paragraphs require human review for exact operation boundaries, normativity, recovery, diagnostics, and serialization completeness.",
            "Owner experimental scope rows, especially spring(), require exact pinned carriers or explicit owner-authored experimental grammar identities.",
            "The 52/37 compatibility mapping is a symbol-family join only; consumer behavior, signatures, and occurrence obligations remain unproved.",
            "The owner-family lattice and weighted cost are provisional formation outputs, not Gate-2 waves or estimates in days.",
            "Two independent hostile challenges and root gestalt must accept the exact artifact hash before any denominator credit.",
        ],
    },
};
const payloadDigest = sha256(Buffer.from(JSON.stringify(payload), "utf8"));
const artifact = {
    ...payload,
    content_digest_sha256: payloadDigest,
    content_digest_method: "SHA-256 of compact UTF-8 JSON.stringify(payload) before the two digest fields are appended",
    replay: {
        tool: "docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-formation-v1.mjs",
        source_root_requirement: "exact authenticated pinned tree; absolute path is intentionally not serialized",
        output_format: "compact JSON.stringify(artifact) plus one trailing LF",
    },
};
process.stdout.write(`${JSON.stringify(artifact)}\n`);
