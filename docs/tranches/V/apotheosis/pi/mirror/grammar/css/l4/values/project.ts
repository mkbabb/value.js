import type { CssCall, CssList, CssScalar, CssValue } from "../../../../deps/value-types.js";
import { failure, success } from "../../../../result.js";
import type { ParseResult } from "../../../../types.js";
import { projectCssColor } from "../color/project.js";
import { preprocessCss } from "../syntax/source.js";
import type { CssComponentValue, CssToken } from "../syntax/types.js";

const COLOR_FUNCTIONS = new Set([
    "rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "color",
]);
const ZERO_ARGUMENT_FUNCTIONS = new Set(["sibling-index", "sibling-count"]);

const scalar = (payload: CssScalar["payload"]): CssScalar => ({ kind: "scalar", payload });

export function componentRaw(component: CssComponentValue): string {
    if (component.kind === "function-block") {
        return component.head.raw + component.value.map(componentRaw).join("") + (component.close?.raw ?? "");
    }
    if (component.kind === "simple-block") {
        return component.open.raw + component.value.map(componentRaw).join("") + (component.close?.raw ?? "");
    }
    return component.raw;
}

function componentProjectedText(component: CssComponentValue): string {
    if (component.kind === "function-block") {
            return preprocessCss(component.head.raw).source
                + component.value.map(componentProjectedText).join("")
                + preprocessCss(component.close?.raw ?? "").source;
    }
    if (component.kind === "simple-block") {
            return preprocessCss(component.open.raw).source
                + component.value.map(componentProjectedText).join("")
                + preprocessCss(component.close?.raw ?? "").source;
    }
    return preprocessCss(component.raw).source;
}

function list(separator: CssList["separator"], values: readonly CssValue[]): CssValue {
    return values.length === 1 ? values[0]! : { kind: "list", separator, items: values };
}

function invalid(components: readonly CssComponentValue[], expected: readonly string[]): ParseResult<CssValue> {
    const significant = components.filter(({ kind }) => kind !== "whitespace" && kind !== "comment");
    const first = significant[0] ?? components[0];
    const last = significant.at(-1) ?? components.at(-1);
    return failure(
        " ".repeat(first?.span.start ?? 0) + components.map(componentRaw).join(""),
        "css_syntax",
        expected,
        first?.span.start ?? 0,
        last?.span.end,
    );
}

function tokenFailure(token: CssToken, expected: readonly string[]): ParseResult<CssValue> {
    return failure(" ".repeat(token.span.start) + token.raw, "css_syntax", expected, token.span.start, token.span.end);
}

function split(
    components: readonly CssComponentValue[],
    separator: (component: CssComponentValue) => boolean,
): readonly (readonly CssComponentValue[])[] | undefined {
    const groups: CssComponentValue[][] = [[]];
    for (const component of components) {
        if (separator(component)) groups.push([]);
        else groups.at(-1)!.push(component);
    }
    return groups.some((group) => group.every(({ kind }) => kind === "whitespace" || kind === "comment"))
        ? undefined
        : groups;
}

function projectToken(token: CssToken): ParseResult<CssValue> {
    if (token.terminated === false) return tokenFailure(token, ["scalar"]);
    switch (token.kind) {
        case "number":
        case "percentage":
        case "dimension": {
            const value = Number(token.value);
            if (!Number.isFinite(value)) return tokenFailure(token, []);
            return success(scalar({
                type: "number",
                value,
                unit: token.kind === "percentage" ? "%" : token.unit ?? "",
            }));
        }
        case "bad-string":
        case "bad-url":
            return tokenFailure(token, ["scalar"]);
        case "ident":
        case "hash": {
            const color = projectCssColor([token]);
            if (color.ok) return success(scalar({ type: "color", value: color.value }));
            return success(scalar({
                type: "keyword",
                value: token.kind === "ident" ? String(token.value) : preprocessCss(token.raw).source,
            }));
        }
        case "string":
            return success(scalar({ type: "keyword", value: preprocessCss(token.raw).source }));
        case "delim":
            return success(scalar({ type: "keyword", value: String(token.value ?? token.raw) }));
        default:
            return success(scalar({ type: "keyword", value: preprocessCss(token.raw).source }));
    }
}

function projectAtom(component: CssComponentValue): ParseResult<CssValue> {
    if (component.kind === "whitespace" || component.kind === "comment") {
        return failure(" ".repeat(component.span.start) + component.raw, "css_syntax", ["component value"], component.span.start, component.span.end);
    }
    if (component.kind === "simple-block") {
        return success(scalar({ type: "keyword", value: componentProjectedText(component) }));
    }
    if (component.kind === "function-block") {
        if (COLOR_FUNCTIONS.has(component.name.toLowerCase())) {
            const color = projectCssColor([component]);
            return color.ok
                ? success(scalar({ type: "color", value: color.value }))
                : invalid([component], ["CSS color"]);
        }
        const meaningful = component.value.some(({ kind }) => kind !== "whitespace" && kind !== "comment");
        if (ZERO_ARGUMENT_FUNCTIONS.has(component.name.toLowerCase()) && meaningful) {
            return invalid([component], ["zero-argument function"]);
        }
        if (!meaningful) return success({ kind: "call", name: component.name, args: [] } satisfies CssCall);
        const body = projectComponents(component.value);
        if (!body.ok) return body;
        return success({
            kind: "call",
            name: component.name,
            args: body.value.kind === "list" && body.value.separator === "comma"
                ? body.value.items
                : [body.value],
        } satisfies CssCall);
    }
    return projectToken(component as CssToken);
}

function projectSpaceGroup(components: readonly CssComponentValue[]): ParseResult<CssValue> {
    const values: CssValue[] = [];
    const operators = new Set(["<=", ">=", "==", "!="]);
    for (let index = 0; index < components.length; index++) {
        const component = components[index]!;
        if (component.kind === "whitespace" || component.kind === "comment") continue;
        const next = components[index + 1];
        if (component.kind === "delim" && next?.kind === "delim" && operators.has(component.raw + next.raw)) {
            values.push(scalar({ type: "keyword", value: component.raw + next.raw }));
            index++;
            continue;
        }
        const value = projectAtom(component);
        if (!value.ok) return value;
        values.push(value.value);
    }
    return values.length === 0 ? invalid(components, ["component value"]) : success(list("space", values));
}

function projectSlashGroup(components: readonly CssComponentValue[]): ParseResult<CssValue> {
    const groups = split(components, (component) => component.kind === "delim" && component.raw === "/");
    if (groups === undefined) return invalid(components, ["scalar"]);
    const values: CssValue[] = [];
    for (const group of groups) {
        const value = projectSpaceGroup(group);
        if (!value.ok) return value;
        values.push(value.value);
    }
    return success(list("slash", values));
}

/** Pure semantic projection from lossless CST; it never scans or splits raw source. */
export function projectComponents(components: readonly CssComponentValue[]): ParseResult<CssValue> {
    const unterminatedComment = components.find((component) =>
        component.kind === "comment" && !component.terminated);
    if (unterminatedComment !== undefined) return invalid([unterminatedComment], ["terminated comment"]);
    const groups = split(components, (component) => component.kind === "comma");
    if (groups === undefined) return invalid(components, ["scalar"]);
    const values: CssValue[] = [];
    for (const group of groups) {
        const value = projectSlashGroup(group);
        if (!value.ok) return value;
        values.push(value.value);
    }
    return success(list("comma", values));
}
