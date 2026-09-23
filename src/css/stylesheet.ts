/**
 * The STYLESHEET layer of `./css`: text -> `Stylesheet`, and the collectors
 * that read a parsed sheet back.
 *
 * The rule list, the at-rule dispatch (`@keyframes`, `@property`,
 * `@function`, `@scope`, `@starting-style`, the two timeline at-rules) and the
 * path-indexed `collect*` family. Every CSS text this layer reads is read by
 * the BBNF grammar (`./grammar/stylesheet.bbnf`, through `./bbnf/sheet`) —
 * X.P.W6.x retired the block scanner and the prelude scanners with the hand
 * parser. `collectTimelineOptions` sits here rather
 * than beside `collectAnimationOptions` in `./rules` for one measured reason:
 * it is the only declaration-level collector that round-trips a `CssValue`
 * back through the serializer, three times (range, scope, trigger), and the
 * declaration layer owes nothing to `./serialize`.
 *
 * Imports exactly two split siblings — `./rules` and `./serialize` — and
 * neither imports this file (the measured cycle-free seam, X-W9.d).
 */
import { parseCssValue, parseKeyframeSelector, parseTimingFunction, splitTopLevel } from "./bbnf/index";
import type { RuleBlock } from "./bbnf/sheet";
import {
    atPrelude,
    functionHead,
    functionParam,
    isPropertyName,
    paramHead,
    ruleList,
    scopePrelude,
    syntaxText,
} from "./bbnf/sheet";
import { failure, success } from "./result";
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

type Block = RuleBlock;
/** A rule list's blocks, or the named fault it ends on (`stylesheet.bbnf` `ruleList`). */
function blocks(source: string): ParseResult<readonly Block[]> {
    const list = ruleList(source);
    return list.fault === undefined
        ? success(list.blocks)
        : failure(source, "css_syntax", [list.fault.expected], list.fault.start);
}

function parseKeyframes(name: string, body: string): ParseResult<KeyframesBlock> {
    const rows = blocks(body);
    if (!rows.ok) return rows as ParseResult<KeyframesBlock>;
    const rules: KeyframeRule[] = [];
    for (const row of rows.value) {
        if (row.body === null) return failure(body, "css_syntax", ["keyframe block"]);
        const selectors = [];
        const tokens = splitTopLevel(row.prelude, ",");
        if (!tokens) return failure(row.prelude, "keyframe_selector_invalid", ["keyframe selector"]);
        for (const token of tokens) {
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
    const groups = scopePrelude(source);
    if (!groups) return null;
    if (groups.root === undefined) return {};
    const roots = splitTopLevel(groups.root, ",");
    const limits = groups.limit === undefined ? undefined : splitTopLevel(groups.limit, ",");
    if (!roots || limits === null) return null;
    return {
        root: roots,
        ...(limits === undefined ? {} : { limit: limits }),
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

function parseFunctionPrelude(source: string): ParseResult<Readonly<{
    name: string;
    parameters: readonly CustomFunctionParameter[];
}>> {
    const signature = functionHead(source);
    if (signature === null) return failure(source, "css_syntax", ["custom function signature"]);
    const parameters: CustomFunctionParameter[] = [];
    const body = signature.params.trim();
    const rows = body ? splitTopLevel(body, ",") : [];
    if (!rows) return failure(source, "css_syntax", ["custom function parameter"]);
    for (const row of rows) {
        const parameter = functionParam(row);
        const head = parameter && paramHead(parameter.head);
        if (!parameter || !head) return failure(row, "css_syntax", ["custom function parameter"]);
        if (parameter.default === "") return failure(row, "css_syntax", ["parameter default"]);
        const parsedDefault = parameter.default === undefined ? undefined : parseCssValue(parameter.default);
        if (parsedDefault && !parsedDefault.ok) return parsedDefault as ParseResult<Readonly<{
            name: string;
            parameters: readonly CustomFunctionParameter[];
        }>>;
        parameters.push({
            name: head.name,
            ...(head.syntax ? { syntax: head.syntax } : {}),
            ...(parsedDefault?.ok ? { default: parsedDefault.value } : {}),
        });
    }
    return success({ name: signature.name, parameters });
}

function parseItems(source: string): ParseResult<Stylesheet> {
    const sourceBlocks = blocks(source);
    if (!sourceBlocks.ok) return sourceBlocks as ParseResult<Stylesheet>;
    const result: StylesheetItem[] = [];
    for (const row of sourceBlocks.value) {
        const prelude = row.prelude.trim();
        const at = atPrelude(prelude);
        if (at?.at === "keyframes") {
            if (row.body === null) return failure(source, "css_syntax", ["keyframes body"]);
            const parsed = parseKeyframes(at.rest, row.body);
            if (!parsed.ok) return parsed as ParseResult<Stylesheet>;
            result.push(parsed.value);
            continue;
        }
        if (at?.at === "property") {
            if (row.body === null) return failure(source, "css_syntax", ["property body"]);
            const declarations = descriptorDeclarations(row.body);
            if (!declarations) return failure(source);
            const name = at.rest;
            if (!isPropertyName(name)) {
                return failure(source, "css_syntax", ["custom property name"]);
            }
            const syntaxDeclaration = declarations.get("syntax");
            const inheritsDeclaration = declarations.get("inherits");
            const initial = declarations.get("initial-value");
            if (!syntaxDeclaration || !inheritsDeclaration) {
                return failure(source, "css_syntax", ["syntax and inherits descriptors"]);
            }
            const serializedSyntax = serializeCssValue(syntaxDeclaration.value);
            if (!serializedSyntax.ok) return failure(source, "syntax_descriptor_invalid", ["syntax descriptor"]);
            const syntax = syntaxText(serializedSyntax.value);
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
        if (at?.at === "function") {
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
        if (at?.at === "scope" || at?.at === "starting-style") {
            if (row.body === null) return failure(source, "css_syntax", ["nested body"]);
            const children = parseItems(row.body);
            if (!children.ok) return children;
            if (at.at === "starting-style") result.push({ kind: "starting-style", children: children.value });
            else {
                const parsedPrelude = parseScopePrelude(at.rest);
                if (!parsedPrelude) return failure(source, "css_syntax", ["scope prelude"]);
                result.push({ kind: "scope", ...parsedPrelude, children: children.value });
            }
            continue;
        }
        if (at?.at === "scroll-timeline" || at?.at === "view-timeline") {
            if (row.body === null) return failure(source, "css_syntax", ["timeline body"]);
            const declarations = descriptorDeclarations(row.body);
            if (!declarations) return failure(source);
            // Each descriptor is read ONCE and narrowed, rather than looked up
            // twice and then asserted non-null (the second read is what the `!`
            // was standing in for). Same values, one map read per key.
            if (at.at === "scroll-timeline") {
                const timelineSource = descriptorText(declarations.get("source"));
                const orientation = descriptorText(declarations.get("orientation"));
                if (!timelineSource.ok || !orientation.ok) {
                    return failure(source, "css_syntax", ["serializable timeline descriptor"]);
                }
                const descriptor: ScrollTimelineDescriptor = {
                    ...(timelineSource.value === undefined ? {} : { source: timelineSource.value }),
                    ...(orientation.value === undefined ? {} : { orientation: orientation.value as TimelineAxis }),
                };
                result.push({ kind: "scroll-timeline", name: at.rest, descriptor });
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
                result.push({ kind: "view-timeline", name: at.rest, descriptor });
            }
            continue;
        }
        if (at !== null) {
            const parsedChildren = row.body === null ? null : parseItems(row.body);
            result.push({
                kind: "unknown",
                atName: at.name,
                prelude: at.rest,
                body: row.body,
                ...(parsedChildren?.ok ? { children: parsedChildren.value } : {}),
            });
            continue;
        }
        if (row.body === null) return failure(source, "css_syntax", ["style body"]);
        const body = parseStyleBody(row.body);
        if (!body.ok) return body as ParseResult<Stylesheet>;
        const selectors = splitTopLevel(prelude, ",");
        if (!selectors) return failure(source, "css_syntax", ["selector list"]);
        result.push({ kind: "style", selectors, ...body.value });
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
