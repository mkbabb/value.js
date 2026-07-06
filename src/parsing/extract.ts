import { parseAnimationShorthand } from "./animation-shorthand";
import { parseCSSTime } from "./index";
import type {
    CustomFunctionDescriptor,
    Declaration,
    KeyframeRule,
    PropertyDescriptor,
    Stylesheet,
    StylesheetItem,
} from "./stylesheet-types";

/**
 * Animation options as expressed in CSS — a CSS-spec subset shared by
 * `animation` shorthand and the individual `animation-*` longhand
 * properties. Renderer-specific options (WAAPI, color space, hue
 * method) are not represented here; consumers extend this type.
 */
export type CSSAnimationOptions = {
    name?: string;
    duration?: number; // ms
    delay?: number; // ms
    iterationCount?: number; // Infinity for "infinite"
    direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
    fillMode?: "none" | "forwards" | "backwards" | "both";
    timingFunction?: string; // identifier or full CSS source (e.g. "cubic-bezier(...)")
    composition?: "replace" | "add" | "accumulate";
};

// ─── extractKeyframes ─────────────────────────────────────────────────────

/**
 * Group every `@keyframes` block in the stylesheet by name. Unnamed
 * blocks are keyed by the empty string. When two `@keyframes` rules
 * share a name, their rule lists are concatenated (CSS cascade order).
 */
// Any item kind that carries a `children` sub-stylesheet (O.W4 S8/S10/S11/S9):
// `@layer`/`@media`/`@container`/`@supports` (kind:"unknown"), `@scope`,
// `@starting-style`, and nested `style` rules. The depth-walk recurses into
// every such container so a `@keyframes` nested at any depth is reachable —
// THE kf-critical fix (`@layer base { @keyframes fade { … } }`).
const itemChildren = (item: StylesheetItem): StylesheetItem[] | undefined => {
    switch (item.kind) {
        case "unknown":
        case "style":
            return item.children;
        case "scope":
        case "starting-style":
            return item.children;
        default:
            return undefined;
    }
};

const collectKeyframes = (
    items: Stylesheet,
    out: Map<string, KeyframeRule[]>,
): void => {
    for (const item of items) {
        if (item.kind === "keyframes") {
            const key = item.name ?? "";
            const existing = out.get(key);
            if (existing) {
                existing.push(...item.rules);
            } else {
                out.set(key, [...item.rules]);
            }
            continue;
        }
        const children = itemChildren(item);
        if (children && children.length > 0) collectKeyframes(children, out);
    }
};

export const extractKeyframes = (
    s: Stylesheet,
): Map<string, KeyframeRule[]> => {
    const out = new Map<string, KeyframeRule[]>();
    collectKeyframes(s, out);
    return out;
};

// ─── extractProperties ────────────────────────────────────────────────────

/**
 * Index every `@property` registration by its custom property name.
 * Later registrations override earlier ones.
 */
export const extractProperties = (
    s: Stylesheet,
): Map<string, PropertyDescriptor> => {
    const out = new Map<string, PropertyDescriptor>();
    for (const item of s) {
        if (item.kind !== "property") continue;
        out.set(item.name, item.descriptor);
    }
    return out;
};

// ─── extractFunctions (VJ-CSS1) ────────────────────────────────────────────

/**
 * Index every `@function --name(...) { ... }` registration (CSS Functions and
 * Mixins Level 1 — parsed at `stylesheet.ts` into `{ kind: "function" }`) by its
 * `<dashed-ident>` name. Mirrors {@link extractProperties}, but depth-walks the
 * container at-rules (`@layer` / `@media` / `@container` / `@supports`, `@scope`,
 * `@starting-style`, nested style rules) — exactly as {@link extractKeyframes}
 * does — so a `@function` nested at any depth is reachable. Later registrations
 * override earlier ones (CSS cascade order).
 */
const collectFunctions = (
    items: Stylesheet,
    out: Map<string, CustomFunctionDescriptor>,
): void => {
    for (const item of items) {
        if (item.kind === "function") {
            out.set(item.name, item.descriptor);
            continue;
        }
        const children = itemChildren(item);
        if (children && children.length > 0) collectFunctions(children, out);
    }
};

export const extractFunctions = (
    s: Stylesheet,
): Map<string, CustomFunctionDescriptor> => {
    const out = new Map<string, CustomFunctionDescriptor>();
    collectFunctions(s, out);
    return out;
};

// ─── extractStyleRules ────────────────────────────────────────────────────

/**
 * Return every qualified rule (`.foo { ... }`) in the stylesheet — depth-walking
 * the container at-rules (`@layer` / `@media` / `@container` / `@supports`,
 * `@scope`, `@starting-style`) and CSS-Nesting child rules exactly as
 * {@link extractKeyframes} / {@link extractFunctions} do (W1-3 · lib-parsing
 * F-2). Before the depth-walk this was a flat top-level scan, so a rule nested
 * in any container at-rule returned a SILENT empty — the "silent handling" shape
 * the project precepts forbid, when the correct recursion already existed one
 * function away. Rules are returned in document (traversal) order.
 */
const collectStyleRules = (
    items: Stylesheet,
    out: { selectors: string[]; declarations: Declaration[] }[],
): void => {
    for (const item of items) {
        if (item.kind === "style") {
            out.push({
                selectors: item.selectors,
                declarations: item.declarations,
            });
        }
        const children = itemChildren(item);
        if (children && children.length > 0) collectStyleRules(children, out);
    }
};

export const extractStyleRules = (
    s: Stylesheet,
): { selectors: string[]; declarations: Declaration[] }[] => {
    const out: { selectors: string[]; declarations: Declaration[] }[] = [];
    collectStyleRules(s, out);
    return out;
};

// ─── extractAnimationOptions ──────────────────────────────────────────────

const DIRECTION_VALUES = new Set([
    "normal",
    "reverse",
    "alternate",
    "alternate-reverse",
]);
const FILL_VALUES = new Set(["none", "forwards", "backwards", "both"]);
const COMPOSITION_VALUES = new Set(["replace", "add", "accumulate"]);

const tryParseTime = (text: string): number | undefined => {
    try {
        return parseCSSTime(text);
    } catch {
        return undefined;
    }
};

const tryParseIterationCount = (text: string): number | undefined => {
    const t = text.trim().toLowerCase();
    if (t === "infinite") return Infinity;
    const n = Number(t);
    return Number.isFinite(n) && n >= 0 ? n : undefined;
};

const applyLonghand = (
    out: CSSAnimationOptions,
    name: string,
    valueText: string,
): void => {
    const v = valueText.trim();
    if (name === "animation") {
        // Shorthand: parse and merge first segment. Multi-animation
        // shorthand collapses to the first animation; richer consumers
        // should call parseAnimationShorthand directly.
        const segs = parseAnimationShorthand(v);
        const first = segs[0];
        if (first != null) Object.assign(out, first);
        return;
    }
    switch (name) {
        case "animation-name":
            out.name = v;
            return;
        case "animation-duration": {
            const n = tryParseTime(v);
            if (n != null) out.duration = n;
            return;
        }
        case "animation-delay": {
            const n = tryParseTime(v);
            if (n != null) out.delay = n;
            return;
        }
        case "animation-iteration-count": {
            const n = tryParseIterationCount(v);
            if (n != null) out.iterationCount = n;
            return;
        }
        case "animation-direction": {
            const lower = v.toLowerCase();
            if (DIRECTION_VALUES.has(lower)) {
                out.direction = lower as NonNullable<
                    CSSAnimationOptions["direction"]
                >;
            }
            return;
        }
        case "animation-fill-mode": {
            const lower = v.toLowerCase();
            if (FILL_VALUES.has(lower)) {
                out.fillMode = lower as NonNullable<
                    CSSAnimationOptions["fillMode"]
                >;
            }
            return;
        }
        case "animation-timing-function":
            out.timingFunction = v;
            return;
        case "animation-composition": {
            const lower = v.toLowerCase();
            if (COMPOSITION_VALUES.has(lower)) {
                out.composition = lower as NonNullable<
                    CSSAnimationOptions["composition"]
                >;
            }
            return;
        }
    }
};

const collectAnimationLonghands = (
    items: Stylesheet,
    out: CSSAnimationOptions,
): void => {
    for (const item of items) {
        if (item.kind === "style") {
            for (const decl of item.declarations) {
                applyLonghand(out, decl.name, decl.value.toString());
            }
        }
        const children = itemChildren(item);
        if (children && children.length > 0) {
            collectAnimationLonghands(children, out);
        }
    }
};

/**
 * Walk every style rule in the stylesheet — depth-walking the container at-rules
 * and CSS-Nesting children (W1-3 · lib-parsing F-2), exactly as
 * {@link extractKeyframes} does — and merge every recognised `animation-*`
 * longhand into a single options object. Before the depth-walk a rule nested in
 * `@media` / `@layer` / a nesting parent returned a SILENT empty `{}`.
 *
 * Shorthand `animation: ...` is handled by `parseAnimationShorthand`
 * (a separate entry) — we don't re-tokenise it here. If a style rule
 * has both shorthand and longhand declarations, the consumer is
 * expected to call `parseAnimationShorthand` itself and merge.
 *
 * Longhand declarations later in the stylesheet override earlier ones
 * (CSS cascade). Cross-rule merging is intentional — most stylesheets
 * keep all `animation-*` for one animation in a single rule, but the
 * extractor stays robust either way.
 */
export const extractAnimationOptions = (
    s: Stylesheet,
): CSSAnimationOptions => {
    const out: CSSAnimationOptions = {};
    collectAnimationLonghands(s, out);
    return out;
};
