/**
 * The STYLESHEET layer of `./css`: text -> `Stylesheet`, and the collectors
 * that read a parsed sheet back.
 *
 * The block scanner, the at-rule dispatch (`@keyframes`, `@property`,
 * `@function`, `@scope`, `@starting-style`, the two timeline at-rules) and the
 * path-indexed `collect*` family. `collectTimelineOptions` sits here rather
 * than beside `collectAnimationOptions` in `./rules` for one measured reason:
 * it is the only declaration-level collector that round-trips a `CssValue`
 * back through the serializer, three times (range, scope, trigger), and the
 * declaration layer owes nothing to `./serialize`.
 *
 * Imports exactly two split siblings — `./rules` and `./serialize` — and
 * neither imports this file (the measured cycle-free seam, X-W9.d).
 */
import {
    failure,
    parseCssValue,
    parseKeyframeSelector,
    parseTimingFunction,
    splitTopLevel,
    success,
} from "./grammar";
import {
    animationCascade,
    collectDeclarations,
    parseAnimationTrigger,
    parseDeclarations,
    parseTimelineScope,
    timelineList,
} from "./rules";
import { serializeCssValue } from "./serialize";
import { coerceToSyntax, isSupportedSyntaxDescriptor } from "./syntax";
import { parseAnimationRange } from "./timeline";
import type { ColorIssue } from "../color/index";
import type { Result } from "../foundation/result";
import { ok } from "../foundation/result";
import type { CssValue } from "../value";
import type {
    AnimationRangeValue,
    CSSPropertyDescriptor,
    CSSTimelineOptions,
    CollectedRule,
    CustomFunctionDescriptor,
    CustomFunctionParameter,
    CustomFunctionRule,
    Declaration,
    KeyframeRule,
    KeyframesBlock,
    ParseResult,
    PropertyRule,
    ScrollTimelineDescriptor,
    StyleRule,
    Stylesheet,
    StylesheetItem,
    TimelineAxis,
    ViewTimelineDescriptor,
} from "./types";

type Block = Readonly<{ prelude: string; body: string | null }>;
function blocks(source: string): ParseResult<readonly Block[]> {
    const result: Block[] = [];
    let cursor = 0;
    while (cursor < source.length) {
        while (cursor < source.length) {
            while (/\s|;/.test(source[cursor] ?? "")) cursor++;
            if (!source.startsWith("/*", cursor)) break;
            const end = source.indexOf("*/", cursor + 2);
            if (end < 0) return failure(source, "css_syntax", ["closing comment"], cursor);
            cursor = end + 2;
        }
        if (cursor >= source.length) break;
        let quote = "";
        let parens = 0;
        let boundary = -1;
        for (let i = cursor; i < source.length; i++) {
            const char = source.charAt(i);
            if (quote) {
                if (char === quote && source[i - 1] !== "\\") quote = "";
                continue;
            }
            if (char === '"' || char === "'") quote = char;
            else if (char === "(") parens++;
            else if (char === ")") parens--;
            else if (parens === 0 && (char === "{" || char === ";")) { boundary = i; break; }
        }
        if (boundary < 0) return failure(source, "css_syntax", ["rule"], cursor);
        const prelude = source.slice(cursor, boundary).trim();
        if (source[boundary] === ";") {
            result.push({ prelude, body: null });
            cursor = boundary + 1;
            continue;
        }
        let depth = 1;
        quote = "";
        let end = boundary + 1;
        for (; end < source.length && depth > 0; end++) {
            const char = source.charAt(end);
            if (quote) {
                if (char === quote && source[end - 1] !== "\\") quote = "";
                continue;
            }
            if (char === '"' || char === "'") quote = char;
            else if (char === "{") depth++;
            else if (char === "}") depth--;
        }
        if (depth !== 0) return failure(source, "css_syntax", ["closing brace"], boundary);
        result.push({ prelude, body: source.slice(boundary + 1, end - 1) });
        cursor = end;
    }
    return success(result);
}

function parseKeyframes(name: string, body: string): ParseResult<KeyframesBlock> {
    const rows = blocks(body);
    if (!rows.ok) return rows as ParseResult<KeyframesBlock>;
    const rules: KeyframeRule[] = [];
    for (const row of rows.value) {
        if (row.body === null) return failure(body, "css_syntax", ["keyframe block"]);
        const selectors = [];
        for (const token of splitTopLevel(row.prelude, ",")) {
            const selector = parseKeyframeSelector(token);
            if (!selector.ok) return selector as ParseResult<KeyframesBlock>;
            selectors.push(selector.value);
        }
        const declarations = parseDeclarations(row.body);
        if (!declarations.ok) return declarations as ParseResult<KeyframesBlock>;
        // ONE map construction, read twice — the pair below used to build the
        // whole declaration map once per key.
        const collected = collectDeclarations(declarations.value);
        const timingDeclaration = collected.get("animation-timing-function");
        const compositionDeclaration = collected.get("animation-composition");
        const timingText = timingDeclaration && serializeCssValue(timingDeclaration.value);
        if (timingText && !timingText.ok) return failure(row.body, "css_syntax", ["serializable timing function"]);
        const timing = timingText?.ok ? parseTimingFunction(timingText.value) : null;
        if (timing && !timing.ok) return timing as ParseResult<KeyframesBlock>;
        const compositionResult = compositionDeclaration && serializeCssValue(compositionDeclaration.value);
        if (compositionResult && !compositionResult.ok) return failure(row.body, "css_syntax", ["serializable composition"]);
        const compositionText = compositionResult?.ok ? compositionResult.value : undefined;
        const composition = compositionText === "replace" || compositionText === "add" || compositionText === "accumulate"
            ? compositionText
            : undefined;
        const rule: {
            selectors: typeof selectors;
            declarations: readonly Declaration[];
            timingFunction?: NonNullable<typeof timing> extends { ok: true; value: infer T } ? T : never;
            composition?: "replace" | "add" | "accumulate";
        } = { selectors, declarations: declarations.value };
        if (timing?.ok) rule.timingFunction = timing.value as never;
        if (composition) rule.composition = composition;
        rules.push(rule);
    }
    return success({ kind: "keyframes", name, rules });
}

function descriptorDeclarations(body: string): ReadonlyMap<string, Declaration> | null {
    const declarations = parseDeclarations(body);
    return declarations.ok ? collectDeclarations(declarations.value) : null;
}

/**
 * An optional descriptor's text. An absent descriptor stays absent; a present
 * one that cannot be written as CSS is a failure the caller must raise, never
 * a silently dropped key.
 */
function descriptorText(declaration: Declaration | undefined): Result<string | undefined, ColorIssue> {
    return declaration === undefined ? ok(undefined) : serializeCssValue(declaration.value);
}

function parseScopePrelude(source: string): Pick<Extract<StylesheetItem, { kind: "scope" }>, "root" | "limit"> | null {
    const input = source.trim();
    if (!input) return {};
    const groups: string[] = [];
    let cursor = 0;
    while (cursor < input.length) {
        while (/\s/.test(input[cursor] ?? "")) cursor++;
        if (groups.length === 1) {
            if (input.slice(cursor, cursor + 2).toLowerCase() !== "to") return null;
            cursor += 2;
            while (/\s/.test(input[cursor] ?? "")) cursor++;
        }
        if (input[cursor] !== "(") return null;
        let depth = 1;
        let quote = "";
        const start = ++cursor;
        for (; cursor < input.length && depth > 0; cursor++) {
            const char = input.charAt(cursor);
            if (quote) {
                if (char === quote && input[cursor - 1] !== "\\") quote = "";
            } else if (char === '"' || char === "'") quote = char;
            else if (char === "(") depth++;
            else if (char === ")") depth--;
        }
        if (depth !== 0) return null;
        groups.push(input.slice(start, cursor - 1));
        if (groups.length > 2) return null;
    }
    const [root, limit] = groups;
    if (root === undefined) return null;
    return {
        root: splitTopLevel(root, ","),
        ...(limit === undefined ? {} : { limit: splitTopLevel(limit, ",") }),
    };
}

function parseStyleBody(body: string): ParseResult<Pick<StyleRule, "declarations" | "children">> {
    const plain = parseDeclarations(body);
    if (plain.ok) return success({ declarations: plain.value });
    const rows = blocks(`${body};`);
    if (!rows.ok) return rows as ParseResult<Pick<StyleRule, "declarations" | "children">>;
    const declarations: Declaration[] = [];
    const children: StylesheetItem[] = [];
    for (const row of rows.value) {
        if (row.body === null) {
            const parsed = parseDeclarations(`${row.prelude};`);
            if (!parsed.ok) return parsed as ParseResult<Pick<StyleRule, "declarations" | "children">>;
            declarations.push(...parsed.value);
            continue;
        }
        const parsed = parseItems(`${row.prelude}{${row.body}}`);
        if (!parsed.ok) return parsed as ParseResult<Pick<StyleRule, "declarations" | "children">>;
        children.push(...parsed.value);
    }
    return success({ declarations, ...(children.length === 0 ? {} : { children }) });
}

function topLevelColon(source: string): number {
    let depth = 0;
    let quote = "";
    for (let i = 0; i < source.length; i++) {
        const char = source.charAt(i);
        if (quote) {
            if (char === quote && source[i - 1] !== "\\") quote = "";
        } else if (char === '"' || char === "'") quote = char;
        else if (char === "(") depth++;
        else if (char === ")") depth--;
        else if (depth === 0 && char === ":") return i;
    }
    return -1;
}

function parseFunctionPrelude(source: string): ParseResult<Readonly<{
    name: string;
    parameters: readonly CustomFunctionParameter[];
}>> {
    const [, functionName, rawBody] = source.match(/^@function\s+(--[-\w]+)\s*\(([\s\S]*)\)$/i) ?? [];
    if (functionName === undefined || rawBody === undefined) {
        return failure(source, "css_syntax", ["custom function signature"]);
    }
    const parameters: CustomFunctionParameter[] = [];
    const body = rawBody.trim();
    for (const row of body ? splitTopLevel(body, ",") : []) {
        const colon = topLevelColon(row);
        const head = row.slice(0, colon < 0 ? undefined : colon).trim();
        const [, parameterName, syntax] = head.match(/^(--[-\w]+)(?:\s+(.+))?$/) ?? [];
        if (parameterName === undefined) return failure(row, "css_syntax", ["custom function parameter"]);
        const defaultSource = colon < 0 ? undefined : row.slice(colon + 1).trim();
        if (defaultSource === "") return failure(row, "css_syntax", ["parameter default"]);
        const parsedDefault = defaultSource === undefined ? undefined : parseCssValue(defaultSource);
        if (parsedDefault && !parsedDefault.ok) return parsedDefault as ParseResult<Readonly<{
            name: string;
            parameters: readonly CustomFunctionParameter[];
        }>>;
        parameters.push({
            name: parameterName,
            ...(syntax ? { syntax: syntax.trim() } : {}),
            ...(parsedDefault?.ok ? { default: parsedDefault.value } : {}),
        });
    }
    return success({ name: functionName, parameters });
}

function parseItems(source: string): ParseResult<Stylesheet> {
    const sourceBlocks = blocks(source);
    if (!sourceBlocks.ok) return sourceBlocks as ParseResult<Stylesheet>;
    const result: StylesheetItem[] = [];
    for (const row of sourceBlocks.value) {
        const prelude = row.prelude.trim();
        const lower = prelude.toLowerCase();
        if (lower.startsWith("@keyframes ")) {
            if (row.body === null) return failure(source, "css_syntax", ["keyframes body"]);
            const parsed = parseKeyframes(prelude.slice(11).trim(), row.body);
            if (!parsed.ok) return parsed as ParseResult<Stylesheet>;
            result.push(parsed.value);
            continue;
        }
        if (lower.startsWith("@property ")) {
            if (row.body === null) return failure(source, "css_syntax", ["property body"]);
            const declarations = descriptorDeclarations(row.body);
            if (!declarations) return failure(source);
            const name = prelude.slice(10).trim();
            if (!/^--[-_a-z][-_a-z\d]*$/i.test(name)) {
                return failure(source, "css_syntax", ["custom property name"]);
            }
            const syntaxDeclaration = declarations.get("syntax");
            const inheritsDeclaration = declarations.get("inherits");
            const initial = declarations.get("initial-value");
            if (!syntaxDeclaration || !inheritsDeclaration) {
                return failure(source, "css_syntax", ["syntax and inherits descriptors"]);
            }
            const syntaxText = serializeCssValue(syntaxDeclaration.value);
            if (!syntaxText.ok) return failure(source, "syntax_descriptor_invalid", ["syntax descriptor"]);
            const syntax = syntaxText.value.replace(/^['"]|['"]$/g, "");
            if (!isSupportedSyntaxDescriptor(syntax)) {
                return failure(source, "syntax_descriptor_invalid", ["syntax descriptor"]);
            }
            const inheritsResult = serializeCssValue(inheritsDeclaration.value);
            if (!inheritsResult.ok) return failure(source, "css_syntax", ["true or false"]);
            const inheritsText = inheritsResult.value.toLowerCase();
            if (inheritsText !== "true" && inheritsText !== "false") {
                return failure(source, "css_syntax", ["true or false"]);
            }
            if (!initial && syntax !== "*") {
                return failure(source, "css_syntax", ["initial-value descriptor"]);
            }
            if (initial) {
                const initialText = serializeCssValue(initial.value);
                if (!initialText.ok) return failure(source, "syntax_mismatch", [syntax]);
                const coerced = coerceToSyntax(initialText.value, syntax);
                if (!coerced.ok) return coerced as ParseResult<Stylesheet>;
            }
            const descriptor: CSSPropertyDescriptor = {
                syntax,
                inherits: inheritsText === "true",
                ...(initial ? { initialValue: initial.value } : {}),
            };
            result.push({ kind: "property", name, descriptor });
            continue;
        }
        if (lower.startsWith("@function ")) {
            if (row.body === null) return failure(source, "css_syntax", ["function body"]);
            const signature = parseFunctionPrelude(prelude);
            if (!signature.ok) return signature as ParseResult<Stylesheet>;
            const declarations = parseDeclarations(row.body);
            if (!declarations.ok) return declarations as ParseResult<Stylesheet>;
            const resultDeclaration = collectDeclarations(declarations.value).get("result");
            const descriptor: CustomFunctionDescriptor = {
                ...(signature.value.parameters.length > 0 ? { parameters: signature.value.parameters } : {}),
                ...(resultDeclaration ? { result: resultDeclaration.value } : {}),
                declarations: declarations.value,
            };
            result.push({ kind: "function", name: signature.value.name, descriptor });
            continue;
        }
        if (lower.startsWith("@scope") || lower === "@starting-style") {
            if (row.body === null) return failure(source, "css_syntax", ["nested body"]);
            const children = parseItems(row.body);
            if (!children.ok) return children;
            if (lower === "@starting-style") result.push({ kind: "starting-style", children: children.value });
            else {
                const parsedPrelude = parseScopePrelude(prelude.slice(6));
                if (!parsedPrelude) return failure(source, "css_syntax", ["scope prelude"]);
                result.push({ kind: "scope", ...parsedPrelude, children: children.value });
            }
            continue;
        }
        if (lower.startsWith("@scroll-timeline ") || lower.startsWith("@view-timeline ")) {
            if (row.body === null) return failure(source, "css_syntax", ["timeline body"]);
            const declarations = descriptorDeclarations(row.body);
            if (!declarations) return failure(source);
            // Each descriptor is read ONCE and narrowed, rather than looked up
            // twice and then asserted non-null (the second read is what the `!`
            // was standing in for). Same values, one map read per key.
            if (lower.startsWith("@scroll")) {
                const timelineSource = descriptorText(declarations.get("source"));
                const orientation = descriptorText(declarations.get("orientation"));
                if (!timelineSource.ok || !orientation.ok) {
                    return failure(source, "css_syntax", ["serializable timeline descriptor"]);
                }
                const descriptor: ScrollTimelineDescriptor = {
                    ...(timelineSource.value === undefined ? {} : { source: timelineSource.value }),
                    ...(orientation.value === undefined ? {} : { orientation: orientation.value as TimelineAxis }),
                };
                result.push({ kind: "scroll-timeline", name: prelude.slice(17).trim(), descriptor });
            } else {
                const subject = descriptorText(declarations.get("subject"));
                const axis = descriptorText(declarations.get("axis"));
                const inset = descriptorText(declarations.get("inset"));
                if (!subject.ok || !axis.ok || !inset.ok) {
                    return failure(source, "css_syntax", ["serializable timeline descriptor"]);
                }
                const descriptor: ViewTimelineDescriptor = {
                    ...(subject.value === undefined ? {} : { subject: subject.value }),
                    ...(axis.value === undefined ? {} : { axis: axis.value as TimelineAxis }),
                    ...(inset.value === undefined ? {} : { inset: inset.value }),
                };
                result.push({ kind: "view-timeline", name: prelude.slice(15).trim(), descriptor });
            }
            continue;
        }
        if (prelude.startsWith("@")) {
            const firstSpace = prelude.indexOf(" ");
            const parsedChildren = row.body === null ? null : parseItems(row.body);
            result.push({
                kind: "unknown",
                atName: prelude.slice(1, firstSpace < 0 ? undefined : firstSpace),
                prelude: firstSpace < 0 ? "" : prelude.slice(firstSpace + 1),
                body: row.body,
                ...(parsedChildren?.ok ? { children: parsedChildren.value } : {}),
            });
            continue;
        }
        if (row.body === null) return failure(source, "css_syntax", ["style body"]);
        const body = parseStyleBody(row.body);
        if (!body.ok) return body as ParseResult<Stylesheet>;
        result.push({ kind: "style", selectors: splitTopLevel(prelude, ","), ...body.value });
    }
    return success(result);
}

export function parseStylesheet(source: string): ParseResult<Stylesheet> {
    return parseItems(source);
}

function collect<R extends StylesheetItem>(
    stylesheet: Stylesheet,
    predicate: (item: StylesheetItem) => item is R,
): readonly CollectedRule<R>[] {
    const result: CollectedRule<R>[] = [];
    const visit = (items: Stylesheet, parent: readonly number[]) => {
        items.forEach((item, index) => {
            const path = Object.freeze([...parent, index]);
            if (predicate(item)) result.push(Object.freeze({ rule: item, path }));
            if ("children" in item && item.children) visit(item.children, path);
        });
    };
    visit(stylesheet, []);
    return Object.freeze(result);
}

export const collectKeyframes = (stylesheet: Stylesheet): readonly CollectedRule<KeyframesBlock>[] =>
    collect(stylesheet, (item): item is KeyframesBlock => item.kind === "keyframes");
export const collectPropertyDescriptors = (stylesheet: Stylesheet): readonly CollectedRule<PropertyRule>[] =>
    collect(stylesheet, (item): item is PropertyRule => item.kind === "property");
export const collectCustomFunctions = (stylesheet: Stylesheet): readonly CollectedRule<CustomFunctionRule>[] =>
    collect(stylesheet, (item): item is CustomFunctionRule => item.kind === "function");
export const collectStyleRules = (stylesheet: Stylesheet): readonly CollectedRule<StyleRule>[] =>
    collect(stylesheet, (item): item is StyleRule => item.kind === "style");

/**
 * A declared value read back through its own text. An unserializable value
 * yields no option, exactly as an unparseable one already does — this
 * collector is total and returns the options it could resolve.
 */
function valueText(value: CssValue | undefined): string | undefined {
    if (!value) return undefined;
    const text = serializeCssValue(value);
    return text.ok ? text.value : undefined;
}

function parseRangeValue(value: CssValue | undefined): AnimationRangeValue | undefined {
    const text = valueText(value);
    if (text === undefined) return undefined;
    const parsed = parseAnimationRange(text);
    return parsed.ok ? parsed.value : undefined;
}
export function collectTimelineOptions(declarations: readonly Declaration[]): CSSTimelineOptions {
    const selected = collectDeclarations(declarations);
    const timelineSource = animationCascade(declarations).selected.get("animation-timeline")?.value;
    const timelines = timelineSource ? timelineList(timelineSource) : undefined;
    const range = parseRangeValue(selected.get("animation-range")?.value);
    const start = parseRangeValue(selected.get("animation-range-start")?.value)?.start;
    const end = parseRangeValue(selected.get("animation-range-end")?.value)?.start;
    const scoped = valueText(selected.get("timeline-scope")?.value);
    const scope = scoped === undefined ? undefined : parseTimelineScope(scoped);
    const triggered = valueText(selected.get("animation-trigger")?.value);
    const trigger = triggered === undefined ? undefined : parseAnimationTrigger(triggered);
    const resolvedRange = range ?? (start || end ? { start: start ?? { phase: "normal" }, ...(end ? { end } : {}) } : undefined);
    return {
        ...(timelines?.[0] ? { timeline: timelines[0] } : {}),
        ...(timelines && timelines.length > 1 ? { timelines } : {}),
        ...(resolvedRange ? { range: resolvedRange } : {}),
        ...(scope?.ok ? { timelineScope: scope.value } : {}),
        ...(trigger?.ok ? { trigger: trigger.value } : {}),
    };
}
