import type { Parser } from "@mkbabb/parse-that";
import type { ColorIssue } from "../deps/color-model.js";
import type { Result } from "../deps/foundation.js";
import { failure } from "../result.js";
import type { CssColor, ParseResult } from "../types.js";
import { cssComponentDocumentGrammar, cssDeclarationValueGrammar } from "./css/l4/syntax/component-value.js";
import { originalOffset, preprocessCss } from "./css/l4/syntax/source.js";
import { projectCssColor } from "./css/l4/color/project.js";

/** Composable CST-backed color grammar; callers own the following delimiter. */
export const cssColorGrammar: Parser<Result<CssColor, ColorIssue>> = cssDeclarationValueGrammar.map((components) => {
    const projected = projectCssColor(components);
    return projected.ok
        ? { ok: true, value: projected.value }
        : { ok: false, error: { code: "color_invalid_input" } };
});

const colorDocument = cssComponentDocumentGrammar.map(projectCssColor);

export { projectCssColor } from "./css/l4/color/project.js";

export function parseCssColor(source: string): ParseResult<CssColor> {
    if (typeof source !== "string") return failure("");
    try {
        const processed = preprocessCss(source);
        const state = colorDocument.parseState(processed.source);
        if (state.isError) {
            const offset = originalOffset(processed, state.furthest >= 0 ? state.furthest : state.offset);
            return failure(source, "css_syntax", ["color"], offset, Math.min(source.length, offset + 1));
        }
        if (state.value.ok) return state.value;
        const issue = state.value.diagnostics[0];
        return failure(
            source,
            issue.code,
            issue.expected,
            originalOffset(processed, issue.start),
            originalOffset(processed, issue.end),
        );
    } catch {
        return failure(source);
    }
}
