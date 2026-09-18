import { any, Parser } from "@mkbabb/parse-that";
import { failure, success } from "../result.js";
import type { KeyframeSelector, ParseResult } from "../types.js";
import { select } from "./combinators.js";
import { preprocessCss } from "./css/l4/syntax/source.js";
import { identToken, percentageToken, triviaToken } from "./css/l4/syntax/tokens.js";

const gap = triviaToken.many(1);
const trivia = triviaToken.many();

const percentValue = select(percentageToken, (token) => {
    const value = typeof token.value === "number" ? token.value : Number.NaN;
    return Number.isFinite(value) ? value : undefined;
});

const boundedPercent = select(percentValue, (value): KeyframeSelector | undefined =>
    value >= 0 && value <= 100 ? { kind: "percent", value: value / 100 } : undefined);

const keyword = select(identToken, (token): KeyframeSelector | undefined => {
    const name = String(token.value).toLowerCase();
    if (name === "from") return { kind: "percent", value: 0 };
    if (name === "to") return { kind: "percent", value: 1 };
    return undefined;
});

const named = select(identToken, (token) => {
    const name = String(token.value).toLowerCase();
    return name === "entry" || name === "exit" || name === "cover" || name === "contain" ? name : undefined;
}).then(gap.next(percentValue).opt()).chain(([name, offset]) => {
    if (offset !== undefined && (offset < 0 || offset > 100)) return new Parser<KeyframeSelector>((state) => state.err(undefined));
    return new Parser<KeyframeSelector>((state) => state.ok({
        kind: "named",
        name,
        ...(offset === undefined ? {} : { offset: offset / 100 }),
    }));
});

export const keyframeSelectorGrammar: Parser<KeyframeSelector> = any(keyword, boundedPercent, named);
const selectorDocument = trivia.next(keyframeSelectorGrammar).skip(trivia).eof();
const rawPercentDocument = trivia.next(percentValue).skip(trivia).eof();
const rawNamedDocument = trivia.next(
    select(identToken, (token) => {
        const name = String(token.value).toLowerCase();
        return name === "entry" || name === "exit" || name === "cover" || name === "contain" ? name : undefined;
    }).skip(gap).then(percentValue),
).skip(trivia).eof();

export function parseKeyframeSelector(source: string): ParseResult<KeyframeSelector> {
    const input = typeof source === "string" ? source : "";
    if (typeof source !== "string") return failure(input, "keyframe_selector_invalid", ["keyframe selector"]);
    try {
        const processed = preprocessCss(input).source;
        const state = selectorDocument.parseState(processed);
        if (!state.isError) return success(state.value);

        const percentState = rawPercentDocument.parseState(processed);
        const namedState = rawNamedDocument.parseState(processed);
        const outOfRange = !percentState.isError && (percentState.value < 0 || percentState.value > 100)
            || !namedState.isError && (namedState.value[1] < 0 || namedState.value[1] > 100);
        return outOfRange
            ? failure(input, "keyframe_selector_invalid", ["0%..100%"])
            : failure(input, "keyframe_selector_invalid", ["keyframe selector"]);
    } catch {
        return failure(input, "keyframe_selector_invalid", ["keyframe selector"]);
    }
}

function format(value: number): string {
    return Number(value.toFixed(12)).toString();
}

export function serializeKeyframeSelector(selector: KeyframeSelector): string {
    if (selector.kind === "percent") return `${format(selector.value * 100)}%`;
    return selector.offset === undefined ? selector.name : `${selector.name} ${format(selector.offset * 100)}%`;
}
