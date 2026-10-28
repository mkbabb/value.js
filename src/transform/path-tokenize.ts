/**
 * The SVG path-data tokenizer behind `./path` — split from it at the
 * tokenizer/geometry seam (SS-8 Z-library-band-11, the R-T1 ratchet). Internal:
 * `@mkbabb/value.js/transform` forwards `./path` only, so nothing here is public.
 *
 * Malformed data is rejected, never truncated (SVG 1.1 §8.3); see `./path`.
 */

import type { Point } from "./path";

// ────────────────────────────────────────────────────────────────────────────
// Tokenizer — split a `d` string into positional, fully-formed segments.
// ────────────────────────────────────────────────────────────────────────────

/** The ten path commands, in their canonical (absolute) spelling. */
type Op = "M" | "L" | "H" | "V" | "C" | "S" | "Q" | "T" | "A" | "Z";
/** Every command that takes arguments — i.e. every one but `Z`. */
type DrawOp = Exclude<Op, "Z">;

/**
 * One fully-formed segment: a command and exactly the arguments that command
 * declares, named. A repeated argument run (`L 1 1 2 2`) is one segment per
 * repetition, so the flattener never indexes an argument list and never reads
 * past its end.
 */
export type Segment =
    | { readonly op: "M" | "L" | "T"; readonly rel: boolean; readonly x: number; readonly y: number }
    | { readonly op: "H" | "V"; readonly rel: boolean; readonly a: number }
    | {
          readonly op: "C"; readonly rel: boolean;
          readonly x1: number; readonly y1: number;
          readonly x2: number; readonly y2: number;
          readonly x: number; readonly y: number;
      }
    | {
          readonly op: "S"; readonly rel: boolean;
          readonly x2: number; readonly y2: number;
          readonly x: number; readonly y: number;
      }
    | {
          readonly op: "Q"; readonly rel: boolean;
          readonly qx: number; readonly qy: number;
          readonly x: number; readonly y: number;
      }
    | {
          readonly op: "A"; readonly rel: boolean;
          readonly rx: number; readonly ry: number; readonly rot: number;
          readonly largeArc: boolean; readonly sweep: boolean;
          readonly x: number; readonly y: number;
      }
    | { readonly op: "Z" };

const OPS: ReadonlySet<string> = new Set<Op>([
    "M", "L", "H", "V", "C", "S", "Q", "T", "A", "Z",
]);
const isOp = (ch: string): ch is Op => OPS.has(ch);

/** `wsp` / `comma-wsp` between tokens (SVG 1.1 §8.3.1). */
const SEPARATOR_RE = /[\s,]/;
// Number token, matched STICKILY at the cursor: optional sign,
// int/decimal/exponent. A sign is its own separator (`10-20`, `M0 0L10-5`).
const NUMBER_RE = /[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/y;

/**
 * Tokenize a path `d` string into fully-formed segments, positionally.
 *
 * Each command consumes exactly its own arity per repetition, so an arc's two
 * flags are read as single CHARACTERS — SVG 1.1 §8.3.9 `flag ::= "0" | "1"` —
 * and the compact spelling `A5 5 0 0120 10` that SVGO / Figma / Illustrator
 * emit tokenizes identically to the whitespace-delimited `A 5 5 0 0 1 20 10`.
 *
 * Malformed data is REJECTED, never truncated (SVG 1.1 §8.3): tokenizing stops
 * at the first command that does not begin the data with a `moveto`, cannot
 * complete an argument group, or is preceded by an unparsable token — and the
 * well-formed prefix is returned. A command whose repetition run ends short
 * keeps its complete repetitions and drops the partial one.
 */
export function tokenizePath(d: string): Segment[] {
    const segments: Segment[] = [];
    const n = d.length;
    let i = 0;

    const skipSeparators = (): void => {
        while (i < n && SEPARATOR_RE.test(d.charAt(i))) i += 1;
    };

    const readNumber = (): number | null => {
        skipSeparators();
        NUMBER_RE.lastIndex = i;
        const match = NUMBER_RE.exec(d);
        if (match === null) return null;
        i = NUMBER_RE.lastIndex;
        return Number(match[0]);
    };

    const readPoint = (): Point | null => {
        const x = readNumber();
        if (x === null) return null;
        const y = readNumber();
        if (y === null) return null;
        return { x, y };
    };

    /** SVG 1.1 §8.3.9: an arc flag is one character, `"0"` or `"1"`. */
    const readFlag = (): boolean | null => {
        skipSeparators();
        const ch = d.charAt(i);
        if (ch !== "0" && ch !== "1") return null;
        i += 1;
        return ch === "1";
    };

    const atNumber = (): boolean => {
        skipSeparators();
        NUMBER_RE.lastIndex = i;
        return NUMBER_RE.exec(d) !== null;
    };

    /**
     * One repetition of `op`'s argument group, or `null` when the group is
     * incomplete. `repetition > 0` on a `moveto` is an implicit `lineto`
     * (SVG 1.1 §8.3.2).
     */
    const readSegment = (op: DrawOp, rel: boolean, repetition: number): Segment | null => {
        switch (op) {
            case "M":
            case "L":
            case "T": {
                const p = readPoint();
                if (p === null) return null;
                const kind = op === "M" && repetition > 0 ? "L" : op;
                return { op: kind, rel, x: p.x, y: p.y };
            }
            case "H":
            case "V": {
                const a = readNumber();
                if (a === null) return null;
                return { op, rel, a };
            }
            case "C": {
                const c1 = readPoint();
                const c2 = readPoint();
                const p = readPoint();
                if (c1 === null || c2 === null || p === null) return null;
                return { op, rel, x1: c1.x, y1: c1.y, x2: c2.x, y2: c2.y, x: p.x, y: p.y };
            }
            case "S": {
                const c2 = readPoint();
                const p = readPoint();
                if (c2 === null || p === null) return null;
                return { op, rel, x2: c2.x, y2: c2.y, x: p.x, y: p.y };
            }
            case "Q": {
                const q = readPoint();
                const p = readPoint();
                if (q === null || p === null) return null;
                return { op, rel, qx: q.x, qy: q.y, x: p.x, y: p.y };
            }
            case "A": {
                const rx = readNumber();
                const ry = readNumber();
                const rot = readNumber();
                const largeArc = readFlag();
                const sweep = readFlag();
                const p = readPoint();
                if (
                    rx === null || ry === null || rot === null ||
                    largeArc === null || sweep === null || p === null
                ) {
                    return null;
                }
                return { op, rel, rx, ry, rot, largeArc, sweep, x: p.x, y: p.y };
            }
        }
    };

    while (i < n) {
        skipSeparators();
        if (i >= n) break;

        const code = d.charAt(i);
        const op = code.toUpperCase();
        // A stray token is the first error: stop, keep the well-formed prefix.
        if (!isOp(op)) return segments;
        // SVG 1.1 §8.3.2: path data must begin with a moveto.
        if (segments.length === 0 && op !== "M") return segments;
        i += 1;

        if (op === "Z") {
            segments.push({ op });
            continue;
        }

        const rel = code !== op;
        for (let repetition = 0; ; repetition += 1) {
            const segment = readSegment(op, rel, repetition);
            // An incomplete group is the first error: drop it and everything
            // after it, keeping the repetitions that were whole.
            if (segment === null) return segments;
            segments.push(segment);
            if (!atNumber()) break;
        }
    }

    return segments;
}
