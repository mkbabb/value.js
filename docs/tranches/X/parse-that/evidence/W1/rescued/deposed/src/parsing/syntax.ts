/**
 * CSS `<syntax>` validation + coercion (CSS Properties & Values L1; consumed by
 * CSS Functions & Mixins L1 `@function` typed-arg coercion).
 *
 * VJ-Q6 (1.2.0) S2 — value.js OWNS the `<syntax>` grammar (it parses + stores
 * the `@property`/`@function` `syntax` descriptor as a verbatim string). This
 * module EXPOSES the matching VALIDATOR on the resolve path so a consumer (the
 * keyframes.js `@function` call-inlining) can coerce each bound call-argument
 * through the parameter's registered `<syntax>` WITHOUT hand-rolling a parallel
 * realm-foreign checker (inv-16).
 *
 * Scope: the CSS Properties & Values L1 component-value names + the `*`
 * universal + `|` alternation + the `<custom-ident>` keyword form. The `+`/`#`
 * list multipliers are recognized at the type level (a list syntax accepts a
 * single component of that type, validated against the base) — a single-value
 * coercion, which is exactly what `@function` arg-binding needs.
 */

import { ValueUnit, FunctionValue } from "../units";
import { parseCSSValue } from "./index";

/** The CSS Properties & Values L1 named component types this validator knows. */
export type SyntaxComponentName =
    | "length"
    | "number"
    | "percentage"
    | "length-percentage"
    | "color"
    | "image"
    | "url"
    | "integer"
    | "angle"
    | "time"
    | "resolution"
    | "transform-function"
    | "transform-list"
    | "custom-ident";

const KNOWN_COMPONENTS = new Set<SyntaxComponentName>([
    "length",
    "number",
    "percentage",
    "length-percentage",
    "color",
    "image",
    "url",
    "integer",
    "angle",
    "time",
    "resolution",
    "transform-function",
    "transform-list",
    "custom-ident",
]);

/** A single parsed `<syntax>` alternative: a component type, or a literal keyword. */
type SyntaxTerm =
    | { kind: "universal" }
    | { kind: "component"; name: SyntaxComponentName }
    | { kind: "keyword"; ident: string };

/**
 * Parse a `<syntax>` descriptor string into its ordered list of alternatives
 * (`|`-separated). Strips per-term list multipliers (`+`, `#`) — a list syntax
 * validates a single component of its base type. `*` is the universal syntax.
 *
 * Returns `null` for an EMPTY syntax (a malformed descriptor) so callers can
 * distinguish "no constraint declared" from "universal".
 */
export function parseSyntaxDescriptor(syntax: string): SyntaxTerm[] | null {
    const trimmed = syntax.trim();
    if (trimmed === "") return null;
    if (trimmed === "*") return [{ kind: "universal" }];

    const terms: SyntaxTerm[] = [];
    for (const rawAlt of trimmed.split("|")) {
        let alt = rawAlt.trim();
        if (alt === "") continue;
        // Strip a trailing list multiplier (`<length>+`, `<color>#`).
        alt = alt.replace(/[+#]\s*$/, "").trim();

        const m = /^<\s*([a-zA-Z-]+)\s*>$/.exec(alt);
        if (m) {
            const name = m[1]!.toLowerCase() as SyntaxComponentName;
            if (KNOWN_COMPONENTS.has(name)) {
                terms.push({ kind: "component", name });
            } else {
                // An unknown `<...>` component — treat as universal-permissive
                // (do not reject a value against a type this build does not model).
                terms.push({ kind: "universal" });
            }
        } else {
            // A literal keyword alternative (e.g. `auto`, `none`).
            terms.push({ kind: "keyword", ident: alt.toLowerCase() });
        }
    }
    return terms.length > 0 ? terms : null;
}

/** Does a parsed `ValueUnit` satisfy a single component-type term? */
function matchesComponent(v: ValueUnit, name: SyntaxComponentName): boolean {
    const superType = v.superType ?? [];
    const unit = v.unit;

    switch (name) {
        case "length":
            return superType.includes("length");
        case "angle":
            return superType.includes("angle");
        case "time":
            return superType.includes("time");
        case "resolution":
            return superType.includes("resolution");
        case "percentage":
            return unit === "%";
        case "length-percentage":
            return superType.includes("length") || unit === "%";
        case "color":
            return unit === "color" || unit === "color-keyword";
        case "image":
        case "url":
            // images/gradients/url() are FunctionValues — handled by the caller's
            // FunctionValue branch; a bare ValueUnit is not an image.
            return false;
        case "number":
            return (
                (unit == null || unit === "string") &&
                typeof v.value === "number" &&
                !Number.isNaN(v.value)
            );
        case "integer":
            return (
                (unit == null || unit === "string") &&
                typeof v.value === "number" &&
                Number.isInteger(v.value)
            );
        case "custom-ident":
            return (
                (unit == null || unit === "string") &&
                typeof v.value === "string"
            );
        case "transform-function":
        case "transform-list":
            return false; // FunctionValue territory — see the caller branch.
        default:
            return false;
    }
}

/**
 * Validate a CSS value string against a `<syntax>` descriptor. Returns `true`
 * iff the value parses AND matches at least one alternative of the syntax (or
 * the syntax is universal `*`). An empty/malformed syntax descriptor matches
 * permissively (`true`) — the caller treats "no declared syntax" as universal.
 */
export function validateSyntax(valueText: string, syntax: string): boolean {
    const terms = parseSyntaxDescriptor(syntax);
    if (terms === null) return true; // no declared constraint → accept
    if (terms.some((t) => t.kind === "universal")) return true;

    let parsed: ValueUnit | FunctionValue;
    try {
        parsed = parseCSSValue(valueText);
    } catch {
        return false;
    }

    for (const term of terms) {
        if (term.kind === "keyword") {
            if (
                parsed instanceof ValueUnit &&
                typeof parsed.value === "string" &&
                parsed.value.toLowerCase() === term.ident
            ) {
                return true;
            }
            continue;
        }
        if (term.kind === "component") {
            // `<image>`/`<transform-function>`/`<transform-list>` are
            // FunctionValue-shaped (gradients, transforms).
            if (parsed instanceof FunctionValue) {
                if (
                    term.name === "image" ||
                    term.name === "transform-function" ||
                    term.name === "transform-list" ||
                    term.name === "url"
                ) {
                    return true;
                }
                continue;
            }
            if (matchesComponent(parsed, term.name)) return true;
        }
    }
    return false;
}

/**
 * Coerce a CSS value string against a `<syntax>` descriptor for `@function`
 * typed-arg binding (CSS Functions & Mixins L1). Returns the parsed
 * `ValueUnit`/`FunctionValue` if it satisfies the syntax, or `null` if it does
 * not (the caller substitutes as-parsed or rejects, per its KILL fork).
 *
 * This is the public resolve-path entry the keyframes.js `@function` inlining
 * consumes — it coerces each bound argument through the parameter's registered
 * `<syntax>` WITHOUT a re-authored foreign-realm checker (inv-16).
 */
export function coerceToSyntax(
    valueText: string,
    syntax: string,
): ValueUnit | FunctionValue | null {
    if (!validateSyntax(valueText, syntax)) return null;
    try {
        return parseCSSValue(valueText);
    } catch {
        return null;
    }
}
