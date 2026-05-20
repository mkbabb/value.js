import { parseAnimationShorthand } from "./animation-shorthand";
import { parseCSSTime } from "./index";
import type {
    Declaration,
    KeyframeRule,
    PropertyDescriptor,
    Stylesheet,
} from "./stylesheet";

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
export const extractKeyframes = (
    s: Stylesheet,
): Map<string, KeyframeRule[]> => {
    const out = new Map<string, KeyframeRule[]>();
    for (const item of s) {
        if (item.kind !== "keyframes") continue;
        const key = item.name ?? "";
        const existing = out.get(key);
        if (existing) {
            existing.push(...item.rules);
        } else {
            out.set(key, [...item.rules]);
        }
    }
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

// ─── extractStyleRules ────────────────────────────────────────────────────

/** Return every top-level qualified rule (`.foo { ... }`). */
export const extractStyleRules = (
    s: Stylesheet,
): { selectors: string[]; declarations: Declaration[] }[] => {
    const out: { selectors: string[]; declarations: Declaration[] }[] = [];
    for (const item of s) {
        if (item.kind !== "style") continue;
        out.push({ selectors: item.selectors, declarations: item.declarations });
    }
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

/**
 * Walk the stylesheet's top-level style rules and merge every
 * recognised `animation-*` longhand into a single options object.
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
    for (const item of s) {
        if (item.kind !== "style") continue;
        for (const decl of item.declarations) {
            applyLonghand(out, decl.name, decl.value.toString());
        }
    }
    return out;
};
