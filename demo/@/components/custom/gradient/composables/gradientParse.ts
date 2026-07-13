/**
 * gradientParse — the STRICT CSS-gradient parser (S.W5-11 / P0-1, its own
 * module after the cap-check lift; the serializers stay in useGradientCSS).
 *
 * Model-or-reject: `parseGradientCSS` returns a COMPLETE model or an explicit
 * `{ ok: false, reason }` verdict — never a partial. Every token must be
 * consumed as direction / color / % position; anything the model cannot
 * represent (radial geometry, interpolation hints, corner `to` keywords,
 * non-% positions) REJECTS with a one-line reason instead of silently
 * dropping.
 *
 * Segmentation is textual (top-level commas, then top-level whitespace)
 * because the library's flat `FunctionValue` token stream loses the comma
 * grouping — `red 30%, blue` and `red, 30%, blue` (an interpolation hint)
 * parse to identical flat streams. Each token is then validated by the
 * LIBRARY's own parsers (`parseCSSColor` / `parseCSSValue` — the validity
 * oracles; the demo never hand-validates a color). A welcome corollary:
 * `stops[].cssColor` keeps the AUTHORED literal (`red` stays `red`, P2-15).
 */

import { parseCSSValue } from "@mkbabb/value.js/parsing";
import { parseCSSColor } from "@mkbabb/value.js/parsing";
import { ValueUnit } from "@mkbabb/value.js/units";
import { convertToDegrees } from "@mkbabb/value.js/units";
import { linearInterval } from "./useGradientCSS";
import type {
    GradientType,
    GradientStop,
    GradientInterval,
} from "./useGradientModel";


/** UID generator for parsed stops. */
let nextParseId = 0;
function uid(): string {
    return `stop-${++nextParseId}-${Date.now().toString(36)}`;
}

/** A COMPLETE parsed gradient — every field present, ≥2 stops. */
export interface ParsedGradientModel {
    type: GradientType;
    direction: number;
    stops: GradientStop[];
    intervals: GradientInterval[];
}

/** Model-or-reject: the whole model, or a one-line reason. Never a partial. */
export type GradientParseResult =
    | { ok: true; model: ParsedGradientModel }
    | { ok: false; reason: string };

const reject = (reason: string): GradientParseResult => ({ ok: false, reason });

/** Split at `,` on paren depth 0 (color functions carry inner commas). */
function splitTopLevelCommas(s: string): string[] {
    const out: string[] = [];
    let depth = 0;
    let start = 0;
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === "(") depth++;
        else if (ch === ")") depth--;
        else if (ch === "," && depth === 0) {
            out.push(s.slice(start, i));
            start = i + 1;
        }
    }
    out.push(s.slice(start));
    return out.map((seg) => seg.trim());
}

/** Split at whitespace on paren depth 0 (`rgb(255 0 0)` is ONE token). */
function tokenizeTopLevel(s: string): string[] {
    const out: string[] = [];
    let depth = 0;
    let start = -1;
    for (let i = 0; i < s.length; i++) {
        const ch = s[i]!;
        if (ch === "(") depth++;
        else if (ch === ")") depth--;
        if (/\s/.test(ch) && depth === 0) {
            if (start >= 0) {
                out.push(s.slice(start, i));
                start = -1;
            }
        } else if (start < 0) {
            start = i;
        }
    }
    if (start >= 0) out.push(s.slice(start));
    return out;
}

/** Library-oracle color check (parse-that throws on junk). */
function isColorToken(token: string): boolean {
    try {
        const parsed = parseCSSColor(token);
        return parsed instanceof ValueUnit;
    } catch {
        return false;
    }
}

/** Library-oracle angle → degrees; null when the token isn't an angle. */
function angleToDegrees(token: string): number | null {
    try {
        const v = parseCSSValue(token);
        if (
            v instanceof ValueUnit &&
            typeof v.value === "number" &&
            v.superType?.includes("angle")
        ) {
            return convertToDegrees(
                v.value,
                v.unit as Parameters<typeof convertToDegrees>[1],
            );
        }
    } catch {
        /* not an angle */
    }
    return null;
}

/** Library-oracle percentage; null when the token isn't a `%` value. */
function percentValue(token: string): number | null {
    try {
        const v = parseCSSValue(token);
        if (v instanceof ValueUnit && typeof v.value === "number" && v.unit === "%") {
            return v.value;
        }
    } catch {
        /* not a percentage */
    }
    return null;
}

/** `to <side>` → exact degrees; corner keywords are box-dependent → null. */
const TO_SIDE_DEGREES: Record<string, number> = {
    top: 0,
    right: 90,
    bottom: 180,
    left: 270,
};

interface Preamble {
    direction: number;
    error?: string;
}

/** Parse segment 0 as a direction preamble; null ⇒ segment 0 is a stop. */
function parsePreamble(seg: string, type: GradientType): Preamble | null {
    const tokens = tokenizeTopLevel(seg);
    if (tokens.length === 0) return { direction: 0, error: "empty first argument" };
    const first = tokens[0]!.toLowerCase();

    if (type === "linear") {
        if (first === "to") {
            if (tokens.length === 2) {
                const deg = TO_SIDE_DEGREES[tokens[1]!.toLowerCase()];
                if (deg !== undefined) return { direction: deg };
            }
            return {
                direction: 0,
                error: `corner "to" keywords are box-dependent — use an angle (e.g. 45deg)`,
            };
        }
        if (tokens.length === 1) {
            const deg = angleToDegrees(tokens[0]!);
            if (deg !== null) return { direction: deg };
        }
        return null; // not a preamble — treat as a stop segment
    }

    if (type === "conic") {
        if (first === "from") {
            const deg = tokens.length === 2 ? angleToDegrees(tokens[1]!) : null;
            if (deg !== null && tokens.length === 2) return { direction: deg };
            return {
                direction: 0,
                error: `conic position ("${seg}") isn't modeled — only \`from <angle>\``,
            };
        }
        if (first === "at" || tokens.some((t) => t.toLowerCase() === "at")) {
            return {
                direction: 0,
                error: `conic position ("${seg}") isn't modeled — only \`from <angle>\``,
            };
        }
        return null;
    }

    // radial: the model has NO shape/size/position — any non-stop preamble is
    // unrepresentable. Silent-drop is forbidden (P2-17) → explicit reject.
    if (!isColorToken(tokens[0]!)) {
        return {
            direction: 0,
            error: `radial geometry ("${seg}") isn't modeled — use radial-gradient(<color>, <color>, …)`,
        };
    }
    return null;
}

/**
 * Parse a CSS gradient string into a COMPLETE gradient model, or reject with
 * a one-line reason (the editor's Fira verdict). See the module header for
 * the model-or-reject boundary.
 */
export function parseGradientCSS(css: string): GradientParseResult {
    const src = css.trim();

    const head = src.match(/^([a-z-]+)\(/i);
    if (!head || !src.endsWith(")")) {
        return reject("not a <type>-gradient(…) function");
    }
    const name = head[1]!.toLowerCase();
    if (name.startsWith("repeating-")) {
        return reject("repeating gradients aren't modeled");
    }
    let type: GradientType;
    if (name === "linear-gradient") type = "linear";
    else if (name === "radial-gradient") type = "radial";
    else if (name === "conic-gradient") type = "conic";
    else return reject(`"${name}" isn't a gradient function`);

    const inner = src.slice(head[0].length, -1);
    const segments = splitTopLevelCommas(inner);
    if (segments.some((s) => s.length === 0)) {
        return reject("empty argument (doubled or trailing comma)");
    }

    let direction = type === "linear" ? 180 : 0;
    let startIdx = 0;

    const preamble = segments.length > 0 ? parsePreamble(segments[0]!, type) : null;
    if (preamble) {
        if (preamble.error) return reject(preamble.error);
        direction = preamble.direction;
        startIdx = 1;
    }

    // ── Stop segments: `<color> [<percent>]{0,2}` — anything else rejects ──
    const stops: GradientStop[] = [];
    for (let i = startIdx; i < segments.length; i++) {
        const tokens = tokenizeTopLevel(segments[i]!);
        const colorToken = tokens[0]!;

        if (!isColorToken(colorToken)) {
            if (percentValue(colorToken) !== null && tokens.length === 1) {
                return reject(
                    `interpolation hints (bare ${colorToken}) aren't modeled`,
                );
            }
            return reject(`unparseable color "${colorToken}"`);
        }

        const positions: number[] = [];
        for (const tok of tokens.slice(1)) {
            const pct = percentValue(tok);
            if (pct === null) {
                return reject(`stop positions must be percentages ("${tok}")`);
            }
            positions.push(pct);
        }
        if (positions.length > 2) {
            return reject(`a stop takes at most 2 positions ("${segments[i]}")`);
        }

        if (positions.length === 0) {
            stops.push({ id: uid(), cssColor: colorToken, position: -1 });
        } else {
            // Double positions are CSS shorthand for two coincident-color stops.
            for (const p of positions) {
                stops.push({ id: uid(), cssColor: colorToken, position: p });
            }
        }
    }

    if (stops.length < 2) {
        return reject("a gradient needs at least 2 color stops");
    }

    // ── Position auto-fill (CSS spec behavior), then the model invariants ──
    if (stops[0]!.position < 0) stops[0]!.position = 0;
    if (stops[stops.length - 1]!.position < 0) {
        stops[stops.length - 1]!.position = 100;
    }
    for (let j = 1; j < stops.length - 1; j++) {
        if (stops[j]!.position < 0) {
            let nextIdx = j + 1;
            while (nextIdx < stops.length && stops[nextIdx]!.position < 0) nextIdx++;
            const prevPos = stops[j - 1]!.position;
            const nextPos = stops[nextIdx]?.position ?? 100;
            const span = nextIdx - (j - 1);
            stops[j]!.position = prevPos + (nextPos - prevPos) / span;
        }
    }

    for (const s of stops) {
        s.position = Math.min(100, Math.max(0, s.position));
    }
    for (let j = 1; j < stops.length; j++) {
        if (stops[j]!.position < stops[j - 1]!.position) {
            return reject(
                "stop positions must be non-decreasing (hard-stop reordering isn't modeled)",
            );
        }
    }

    // Every parsed interval seeds the `linear` preset (easing-disposition
    // §1.6: no persisted artifact names an easing; the catalogue is a
    // live-editing affordance).
    const intervals: GradientInterval[] = [];
    for (let j = 0; j < stops.length - 1; j++) {
        intervals.push(linearInterval());
    }

    return { ok: true, model: { type, direction, stops, intervals } };
}

