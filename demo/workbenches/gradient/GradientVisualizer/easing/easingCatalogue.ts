/**
 * The interval specimen catalogue (T.W6-3 / T-47 — the easing selector
 * redesigned first-principles, keyframes.js assayed DIRECTLY).
 *
 * ASSAY (owner order T-47, MANDATE §0.6): keyframes.js's easing scene —
 * the T.E6 specimen gallery (`../keyframes.js/demo/scenes/easing/
 * EasingTarget.vue`, read-only) — divides the curve surface into a
 * NAMED-CURVE SELECTION gallery of sparkline-portrait tiles and a separate
 * AUTHORING editor (the kf BG-8 division: "the gallery is the scene's, the
 * editor is EasingPicker's"). This module is the demo's transposition of
 * the gallery half at gradient-interval scale:
 *
 * - the tile catalogue IS value.js `bezierPresets` + the steps family —
 *   the SAME catalogue the glass-ui <EasingPicker>'s preset menu speaks
 *   (never a second mint);
 * - every portrait is sampled from the library's own callable (the kf
 *   `generateCurveSVGPath` idiom — ZERO re-derived curve math);
 * - parameterized entries carry honest static defaults (the kf law: "the
 *   selected curve's live parameters ride the header literal + the
 *   editor, not the tile").
 */
import {
    bezierPresets,
    CubicBezier,
    steppedEase,
} from "@mkbabb/value.js/easing";
import type {
    EasingFunction,
    JumpPosition,
} from "@mkbabb/value.js/easing";
import type {
    BezierPoints,
    EasingPickerValue,
    JumpTerm,
} from "@mkbabb/glass-ui/easing";
import type { GradientInterval } from "../../composables/useGradientModel";

// ── The literal mint law (byte-identity with the picker) ────────────────────
//
// glass-ui `useEasingPicker.readout` mints `cubic-bezier(…)` by mapping each
// coordinate through `+n.toFixed(3)` and joining with `", "`, and `steps(…)`
// as `steps(${n}, ${term})`. The interval's `css` literal is the persisted
// TRUTH (useGradientModel), so a tile-minted payload and a picker-emitted
// payload for the same curve MUST be byte-identical — the `linearInterval()`
// precedent (useGradientCSS.ts), generalized to the whole catalogue.

/** The picker's bezier literal law, mirrored byte-for-byte. */
export function bezierLiteral(quad: readonly number[]): string {
    const [x1, y1, x2, y2] = quad.map((n) => +n.toFixed(3));
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
}

/** The picker's steps literal law, mirrored byte-for-byte. */
export function stepsLiteral(n: number, term: JumpTerm): string {
    return `steps(${n}, ${term})`;
}

// ── The ONE glyph painter (kf `generateCurveSVGPath`, assayed) ──────────────

/**
 * Sample a library timing callable into a unit-box polyline path (y-flipped
 * to SVG space). ONE painter, three seats: the tile portraits, the closed
 * row's specimen head glyph, and nothing else — dense enough (48) that a
 * steps staircase reads with near-vertical risers at specimen scale.
 */
export function glyphPath(fn: EasingFunction, samples = 48): string {
    let d = "";
    for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        const y = 1 - fn(t);
        d += `${i === 0 ? "M" : " L"} ${t.toFixed(3)} ${y.toFixed(3)}`;
    }
    return d;
}

// ── The specimen tiles ──────────────────────────────────────────────────────

export interface SpecimenTile {
    /** The full curve name — the identity the head + readout speak. */
    id: string;
    /** The family eyebrow the strip groups under. */
    family: string;
    /** The compact variant label printed under the portrait. */
    label: string;
    /** The minted literal — the identity key against `interval.css`. */
    css: string;
    /** The static sparkline portrait (unit-box path). */
    glyph: string;
    /** Mint the full authored-curve payload a press selects. */
    payload: () => EasingPickerValue;
}

export interface SpecimenFamily {
    family: string;
    tiles: SpecimenTile[];
}

function easingValue(
    result: ReturnType<typeof CubicBezier>,
    source: string,
): EasingFunction {
    if (result.ok) return result.value;
    throw new Error(`Invalid easing catalogue entry "${source}": ${result.error.code}`);
}

function bezierTile(name: string, family: string, label: string): SpecimenTile {
    const quad = bezierPresets[name as keyof typeof bezierPresets];
    const points = [...quad] as BezierPoints;
    const fn = easingValue(CubicBezier(...points), name);
    const css = bezierLiteral(points);
    return {
        id: name,
        family,
        label,
        css,
        glyph: glyphPath(fn),
        // The payload mirrors the picker's own emission for this preset:
        // css rounded (the literal law), points raw, fn from the raw quad.
        payload: () => ({
            mode: "bezier",
            css,
            fn,
            points: [...points] as BezierPoints,
            steps: 4,
            term: "jump-end",
        }),
    };
}

function stepsTile(
    id: string,
    label: string,
    n: number,
    term: JumpTerm,
): SpecimenTile {
    const position = term as JumpPosition;
    const fn = easingValue(steppedEase(n, position), id);
    const css = stepsLiteral(n, term);
    return {
        id,
        family: "steps",
        label,
        css,
        glyph: glyphPath(fn),
        payload: () => ({
            mode: "steps",
            css,
            fn,
            // Neutral transient cache — steps mode never reads points.
            points: [0, 0, 1, 1],
            steps: n,
            term,
        }),
    };
}

/** family + compact label for a `bezierPresets` key (the names ARE
 *  structured: `ease-(in|out|in-out)-<family>`; the CSS keywords + the
 *  Hermite smooth-step get their own rows). */
function familyLabelFor(name: string): { family: string; label: string } {
    if (name === "linear") return { family: "css", label: "linear" };
    if (name === "ease") return { family: "css", label: "ease" };
    if (name === "ease-in") return { family: "css", label: "in" };
    if (name === "ease-out") return { family: "css", label: "out" };
    if (name === "ease-in-out") return { family: "css", label: "in-out" };
    // kf files smooth-step under Cubic (easingGroups.ts — assayed).
    if (name === "smooth-step-3") return { family: "cubic", label: "smooth" };
    const m = /^ease-(in-out|in|out)-(.+)$/.exec(name);
    return m
        ? { family: m[2]!, label: m[1]! }
        : { family: "css", label: name };
}

const FAMILY_ORDER = ["css", "sine", "quad", "cubic", "expo", "circ", "back", "steps"];

function buildFamilies(): SpecimenFamily[] {
    const byFamily = new Map<string, SpecimenTile[]>();
    for (const name of Object.keys(bezierPresets)) {
        const { family, label } = familyLabelFor(name);
        const list = byFamily.get(family) ?? [];
        list.push(bezierTile(name, family, label));
        byFamily.set(family, list);
    }
    byFamily.set("steps", [
        // The honest static default (kf: "steps" = the 4-step staircase);
        // live n/term ride the readout literal + the authoring canvas.
        stepsTile("steps", "n = 4", 4, "jump-end"),
        stepsTile("step-start", "start", 1, "jump-start"),
        stepsTile("step-end", "end", 1, "jump-end"),
    ]);
    return FAMILY_ORDER.filter((f) => byFamily.has(f)).map((family) => ({
        family,
        tiles: byFamily.get(family)!,
    }));
}

/** The strip's catalogue — family-grouped, kf gallery order. */
export const SPECIMEN_FAMILIES: SpecimenFamily[] = buildFamilies();

/** Flat tile list (identity matching walks it). */
export const SPECIMEN_TILES: SpecimenTile[] = SPECIMEN_FAMILIES.flatMap(
    (f) => f.tiles,
);

// ── Identity: which tile the interval IS ────────────────────────────────────

function isStepsInterval(interval: GradientInterval): boolean {
    return interval.mode === "steps" || interval.css.startsWith("steps(");
}

/**
 * The pressed tile for an interval, by LITERAL identity (the persisted
 * truth). A steps interval whose live (n, term) departed the tile defaults
 * presses the generic `steps` tile (the kf law: parameters ride the
 * editor, the tile is the family identity). A bezier quad matching no
 * preset presses nothing — `custom` carries no tile (kf: "Custom … is a
 * SIDEBAR concern, not a specimen — it carries no tile").
 */
export function tileIdFor(interval: GradientInterval): string | null {
    const exact = SPECIMEN_TILES.find((t) => t.css === interval.css);
    if (exact) return exact.id;
    return isStepsInterval(interval) ? "steps" : null;
}

/** The head's ONE name per state: the tile name when named, the steps
 *  family when stepped, `custom` otherwise (the one-literal law — the
 *  literal itself lives ONLY in the open row's readout). */
export function specimenNameFor(interval: GradientInterval): string {
    return tileIdFor(interval) ?? "custom";
}
