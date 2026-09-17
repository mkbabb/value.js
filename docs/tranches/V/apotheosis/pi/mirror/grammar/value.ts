import type { Parser } from "@mkbabb/parse-that";
import type { CssList, CssScalar, CssValue } from "../deps/value-types.js";
import { failure, success } from "../result.js";
import type { ParseResult } from "../types.js";
import { cssComponentDocumentGrammar, cssDeclarationValueGrammar } from "./css/l4/syntax/component-value.js";
import { originalOffset, preprocessCss } from "./css/l4/syntax/source.js";
import { projectComponents } from "./css/l4/values/project.js";
import type { CssComponentValue, CssToken } from "./css/l4/syntax/types.js";

type ValueOutcome = ParseResult<CssValue>;

/** Composable CST-backed grammar; callers own the following delimiter. */
export const cssValueGrammar: Parser<ValueOutcome> = cssDeclarationValueGrammar.map(projectComponents);

export const cssScalarGrammar: Parser<ValueOutcome> = cssValueGrammar.map((result) =>
    result.ok && result.value.kind !== "scalar"
        ? failure("", "css_syntax", ["scalar"])
        : result);

const valueDocument = cssComponentDocumentGrammar.map(projectComponents);

function remapFailure<T>(source: string, processed: ReturnType<typeof preprocessCss>, result: ParseResult<T>): ParseResult<T> {
    if (result.ok) return result;
    const issue = result.diagnostics[0];
    return failure(
        source,
        issue.code,
        issue.expected,
        originalOffset(processed, issue.start),
        originalOffset(processed, issue.end),
    );
}

export function parseCssValue(source: string): ParseResult<CssValue> {
    if (typeof source !== "string") return failure("");
    try {
        const processed = preprocessCss(source);
        const state = valueDocument.parseState(processed.source);
        if (state.isError) {
            const offset = originalOffset(processed, state.furthest >= 0 ? state.furthest : state.offset);
            return failure(source, "css_syntax", ["scalar"], offset, Math.min(source.length, offset + 1));
        }
        return remapFailure(source, processed, state.value);
    } catch {
        return failure(source);
    }
}

export function parseCssScalar(source: string): ParseResult<CssScalar> {
    if (typeof source !== "string") return failure("");
    try {
        const processed = preprocessCss(source);
        const state = cssComponentDocumentGrammar.parseState(processed.source);
        if (state.isError) {
            const offset = originalOffset(processed, state.furthest >= 0 ? state.furthest : state.offset);
            return failure(source, "css_syntax", ["scalar"], offset, Math.min(source.length, offset + 1));
        }
        if (!isScalarComponent(state.value)) return failure(source, "css_syntax", ["scalar"]);
        const projected = projectComponents(state.value);
        if (!projected.ok) return remapFailure(source, processed, projected);
        return projected.value.kind === "scalar"
            ? success(projected.value)
            : failure(source, "css_syntax", ["scalar"]);
    } catch {
        return failure(source);
    }
}

function isScalarComponent(components: readonly CssComponentValue[]): boolean {
    const roots = components.filter(({ kind }) => kind !== "whitespace" && kind !== "comment");
    if (roots.length === 2) {
        const operator = roots.map((component) => component.kind === "delim" ? component.raw : "").join("");
        return new Set(["<=", ">=", "==", "!="]).has(operator);
    }
    if (roots.length !== 1) return false;
    const root = roots[0]!;
    if (root.kind === "function-block") {
        return new Set(["rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "color"])
            .has(root.name.toLowerCase());
    }
    if (root.kind === "simple-block") return false;
    const token = root as CssToken;
    if (token.kind === "hash") return /^(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(String(token.value));
    if (["number", "percentage", "dimension", "ident", "string", "colon", "semicolon"].includes(token.kind)) {
        return true;
    }
    return token.kind === "delim" && new Set(["+", "*", "-", "<", ">", "="]).has(token.raw);
}

export function parseCssValues(source: string): ParseResult<CssList> {
    const parsed = parseCssValue(source);
    if (!parsed.ok) return parsed;
    return parsed.value.kind === "list"
        ? success(parsed.value)
        : success({ kind: "list", separator: "space", items: [parsed.value] });
}
