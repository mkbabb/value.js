import type { Parser } from "@mkbabb/parse-that";
import { failure, success } from "../result.js";
import type { CssLinearStop, CssTimingFunction, ParseResult } from "../types.js";
import { cssComponentDocumentGrammar, cssDeclarationValueGrammar } from "./css/l4/syntax/component-value.js";
import { preprocessCss } from "./css/l4/syntax/source.js";
import type { CssComponentValue, CssFunction, CssToken } from "./css/l4/syntax/types.js";

type TimingOutcome = ParseResult<CssTimingFunction>;

function significant(components: readonly CssComponentValue[]): readonly CssComponentValue[] {
    return components.filter(({ kind }) => kind !== "whitespace" && kind !== "comment");
}

function groups(children: readonly CssComponentValue[]): readonly (readonly CssComponentValue[])[] | undefined {
    const output: CssComponentValue[][] = [[]];
    for (const child of children) {
        if (child.kind === "comma") output.push([]);
        else if (child.kind !== "whitespace" && child.kind !== "comment") output.at(-1)!.push(child);
    }
    return output.some((group) => group.length === 0) ? undefined : output;
}

function token(component: CssComponentValue | undefined): CssToken | undefined {
    return component !== undefined && component.kind !== "function-block" && component.kind !== "simple-block"
        && component.kind !== "whitespace" && component.kind !== "comment"
        ? component as CssToken
        : undefined;
}

function finiteNumber(component: CssComponentValue | undefined): number | undefined {
    const item = token(component);
    return item?.kind === "number" && typeof item.value === "number" && Number.isFinite(item.value)
        ? item.value
        : undefined;
}

function keyword(component: CssComponentValue): CssTimingFunction | undefined {
    const item = token(component);
    if (item?.kind !== "ident") return undefined;
    const name = String(item.value).toLowerCase();
    if (name === "linear" || name === "ease" || name === "ease-in" || name === "ease-out" || name === "ease-in-out") {
        return { kind: "keyword", name };
    }
    if (name === "step-start" || name === "step-end") {
        return { kind: "steps", count: 1, position: name === "step-start" ? "jump-start" : "jump-end" };
    }
    return undefined;
}

function cubicBezier(fn: CssFunction): CssTimingFunction | undefined {
    const rows = groups(fn.value);
    if (rows === undefined || rows.length !== 4 || rows.some((row) => row.length !== 1)) return undefined;
    const values = rows.map((row) => finiteNumber(row[0]));
    if (values.some((value) => value === undefined)) return undefined;
    const [x1, y1, x2, y2] = values as [number, number, number, number];
    return x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1
        ? { kind: "cubic-bezier", x1, y1, x2, y2 }
        : undefined;
}

function steps(fn: CssFunction): CssTimingFunction | undefined {
    const rows = groups(fn.value);
    if (rows === undefined || rows.length < 1 || rows.length > 2 || rows.some((row) => row.length !== 1)) return undefined;
    const count = finiteNumber(rows[0]?.[0]);
    if (count === undefined || !Number.isInteger(count) || count <= 0) return undefined;
    const positions = {
        start: "jump-start",
        end: "jump-end",
        "jump-start": "jump-start",
        "jump-end": "jump-end",
        "jump-none": "jump-none",
        "jump-both": "jump-both",
    } as const;
    const positionToken = token(rows[1]?.[0]);
    const position = rows.length === 1
        ? "jump-end"
        : positionToken?.kind === "ident"
            ? positions[String(positionToken.value).toLowerCase() as keyof typeof positions]
            : undefined;
    return position !== undefined && !(position === "jump-none" && count < 2)
        ? { kind: "steps", count, position }
        : undefined;
}

function linearFunction(fn: CssFunction): CssTimingFunction | undefined {
    const rows = groups(fn.value);
    if (rows === undefined || rows.length < 2) return undefined;
    const stops: CssLinearStop[] = [];
    for (const row of rows) {
        if (row.length < 1 || row.length > 3) return undefined;
        const output = finiteNumber(row[0]);
        if (output === undefined) return undefined;
        const positions: number[] = [];
        for (const component of row.slice(1)) {
            const item = token(component);
            if (item?.kind !== "percentage" || typeof item.value !== "number" || !Number.isFinite(item.value)) return undefined;
            positions.push(item.value / 100);
        }
        stops.push({ output, input: positions as [] | [number] | [number, number] });
    }
    return { kind: "linear-function", stops };
}

function projectTimingFunction(components: readonly CssComponentValue[]): TimingOutcome {
    const roots = significant(components);
    if (roots.length !== 1) return failure("", "css_syntax", ["timing function"]);
    const root = roots[0]!;
    if (root.kind !== "function-block") {
        const value = keyword(root);
        return value === undefined ? failure("", "css_syntax", ["timing function"]) : success(value);
    }
    const name = root.name.toLowerCase();
    const value = name === "cubic-bezier" ? cubicBezier(root)
        : name === "steps" ? steps(root)
            : name === "linear" ? linearFunction(root)
                : undefined;
    return value === undefined
        ? failure("", "css_syntax", name === "cubic-bezier" || name === "steps" || name === "linear" ? [] : ["timing function"])
        : success(value);
}

export const timingFunctionGrammar: Parser<TimingOutcome> = cssDeclarationValueGrammar.map(projectTimingFunction);
const timingDocument = cssComponentDocumentGrammar.map(projectTimingFunction);

export function parseTimingFunction(source: string): ParseResult<CssTimingFunction> {
    const input = typeof source === "string" ? source : "";
    if (typeof source !== "string") return failure(input, "css_syntax", ["timing function"]);
    try {
        const state = timingDocument.parseState(preprocessCss(input).source);
        if (state.isError) return failure(input, "css_syntax", ["timing function"]);
        return state.value.ok
            ? state.value
            : failure(input, state.value.diagnostics[0].code, state.value.diagnostics[0].expected);
    } catch {
        return failure(input, "css_syntax", ["timing function"]);
    }
}
