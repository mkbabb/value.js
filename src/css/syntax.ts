import type { CssValue } from "../value";
import type { ParseResult } from "./types";
import { failure, parseCssValue } from "./grammar";

const SYNTAX_COMPONENTS = new Set([
    "<angle>",
    "<color>",
    "<custom-ident>",
    "<flex>",
    "<integer>",
    "<length>",
    "<length-percentage>",
    "<number>",
    "<percentage>",
    "<resolution>",
    "<time>",
    "<transform-function>",
    "<transform-list>",
]);
const LENGTH_UNITS = new Set([
    "cap", "ch", "cm", "cqb", "cqh", "cqi", "cqmax", "cqmin", "cqw",
    "dvb", "dvh", "dvi", "dvmax", "dvmin", "dvw", "em", "ex", "ic", "in",
    "lh", "lvb", "lvh", "lvi", "lvmax", "lvmin", "lvw", "mm", "pc", "pt",
    "px", "q", "rcap", "rch", "rem", "rex", "ric", "rlh", "svb", "svh",
    "svi", "svmax", "svmin", "svw", "vb", "vh", "vi", "vmax", "vmin", "vw",
]);
const TRANSFORM_FUNCTIONS = new Set([
    "matrix", "matrix3d", "perspective", "rotate", "rotate3d", "rotatex",
    "rotatey", "rotatez", "scale", "scale3d", "scalex", "scaley", "scalez",
    "skew", "skewx", "skewy", "translate", "translate3d", "translatex",
    "translatey", "translatez",
]);

function syntaxAlternatives(syntax: string): readonly string[] | null {
    const alternatives = syntax.split("|").map((part) => part.trim());
    return alternatives.length > 0
        && alternatives.every((part) => part === "*" || SYNTAX_COMPONENTS.has(part))
        ? alternatives
        : null;
}

export function isSupportedSyntaxDescriptor(syntax: string): boolean {
    return syntaxAlternatives(syntax) !== null;
}

function numeric(value: CssValue): Readonly<{ value: number; unit: string }> | null {
    return value.kind === "scalar" && value.payload.type === "number"
        ? value.payload
        : null;
}

function isTransformCall(value: CssValue): boolean {
    return value.kind === "call" && TRANSFORM_FUNCTIONS.has(value.name.toLowerCase());
}

function matchesSyntax(value: CssValue, component: string): boolean {
    if (component === "*") return true;
    if (component === "<color>") {
        return value.kind === "scalar" && value.payload.type === "color";
    }
    if (component === "<custom-ident>") {
        return value.kind === "scalar"
            && value.payload.type === "keyword"
            && !/^(?:initial|inherit|unset|revert|revert-layer|default)$/i.test(value.payload.value);
    }
    if (component === "<transform-function>") return isTransformCall(value);
    if (component === "<transform-list>") {
        return isTransformCall(value)
            || value.kind === "list"
                && value.separator === "space"
                && value.items.length > 0
                && value.items.every(isTransformCall);
    }
    const token = numeric(value);
    if (!token) return false;
    const unit = token.unit.toLowerCase();
    switch (component) {
        case "<number>": return unit === "";
        case "<integer>": return unit === "" && Number.isInteger(token.value);
        case "<percentage>": return unit === "%";
        case "<length>": return LENGTH_UNITS.has(unit);
        case "<length-percentage>": return unit === "%" || LENGTH_UNITS.has(unit);
        case "<angle>": return ["deg", "grad", "rad", "turn"].includes(unit);
        case "<time>": return unit === "s" || unit === "ms";
        case "<resolution>": return ["dpi", "dpcm", "dppx", "x"].includes(unit);
        case "<flex>": return unit === "fr";
        default: return false;
    }
}

export function coerceToSyntax(source: string, syntax: string): ParseResult<CssValue> {
    const alternatives = syntaxAlternatives(syntax);
    if (!alternatives) {
        return failure(source, "syntax_descriptor_invalid", ["syntax descriptor"]);
    }
    const value = parseCssValue(source);
    if (!value.ok) return value;
    const matches = alternatives.some((alternative) =>
        matchesSyntax(value.value, alternative));
    return matches ? value : failure(source, "syntax_mismatch", alternatives);
}
