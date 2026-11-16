/**
 * The gradient's stops in the address (`urlState.ts`): `color@position`, plus
 * the interval's easing when it is not linear — `~b:x1,y1,x2,y2` for a bezier,
 * `~s:n,term` for steps — joined by `|`.
 *
 *   oklch(0.75 0.15 145)@0~b:0.42,0,0.58,1|oklch(0.65 0.18 265)@100
 */

import { CubicBezier, jumpTerms, steppedEase, type JumpPosition } from "@mkbabb/value.js/easing";
import type { BezierPoints, JumpTerm } from "@mkbabb/glass-ui/easing";

import { cssColorCodec, formatNumber, listCodec, type UrlCodec } from "../../../shell/urlState";
import { linearInterval } from "../composables/useGradientCSS";
import { bezierLiteral, stepsLiteral } from "../GradientVisualizer/easing/easingCatalogue";
import type { GradientInterval, GradientStop } from "./types";

let nextId = 0;

function isLinear(e: GradientInterval): boolean {
    return e.mode === "bezier" && e.points.every((n, i) => n === [0, 0, 1, 1][i]);
}

function formatEasing(e: GradientInterval): string {
    if (isLinear(e)) return "";
    if (e.mode === "steps") return `~s:${e.steps},${e.term}`;
    return `~b:${e.points.map((n) => formatNumber(n, 3)).join(",")}`;
}

function parseEasing(raw: string): GradientInterval | undefined {
    if (raw === "") return linearInterval();
    const [kind, args = ""] = raw.split(":");
    if (kind === "b") {
        const points = args.split(",").map(Number);
        if (points.length !== 4 || !points.every(Number.isFinite)) return undefined;
        const [x1, y1, x2, y2] = points as BezierPoints;
        if (x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) return undefined;
        const fn = CubicBezier(x1, y1, x2, y2);
        if (!fn.ok) return undefined;
        return { mode: "bezier", css: bezierLiteral(points), fn: fn.value, points: [x1, y1, x2, y2], steps: 4, term: "jump-end" };
    }
    if (kind === "s") {
        const [n, term] = args.split(",");
        const steps = Number(n);
        if (!Number.isInteger(steps) || steps < 1 || steps > 64) return undefined;
        if (!(jumpTerms as readonly string[]).includes(term ?? "")) return undefined;
        const fn = steppedEase(steps, term as JumpPosition);
        if (!fn.ok) return undefined;
        return { mode: "steps", css: stepsLiteral(steps, term as JumpTerm), fn: fn.value, points: [0, 0, 1, 1], steps, term: term as JumpTerm };
    }
    return undefined;
}

const stopCodec: UrlCodec<GradientStop> = {
    parse(raw) {
        const tilde = raw.indexOf("~");
        const head = tilde < 0 ? raw : raw.slice(0, tilde);
        const at = head.lastIndexOf("@");
        if (at < 0) return undefined;
        const cssColor = cssColorCodec.parse(head.slice(0, at));
        const position = Number(head.slice(at + 1));
        if (cssColor === undefined || !Number.isFinite(position)) return undefined;
        const easing = parseEasing(tilde < 0 ? "" : raw.slice(tilde + 1));
        if (!easing) return undefined;
        return {
            id: `stop-url-${++nextId}`,
            cssColor,
            position: Math.round(Math.min(100, Math.max(0, position)) * 10) / 10,
            easing,
        };
    },
    format: (s) => `${s.cssColor}@${formatNumber(s.position, 1)}${formatEasing(s.easing)}`,
};

/** A gradient's stops: two at least, in position order. */
export const stopsCodec: UrlCodec<GradientStop[]> = (() => {
    const list = listCodec(stopCodec, "|", 32);
    return {
        parse(raw) {
            const stops = list.parse(raw);
            if (!stops || stops.length < 2) return undefined;
            return [...stops].sort((a, b) => a.position - b.position);
        },
        format: list.format,
    };
})();

/** Adding or removing a stop is a step Back can undo; moving one is not. */
export function stopsHistory(before: string | undefined, after: string | undefined): "push" | "replace" {
    const count = (s: string | undefined) => (s === undefined ? 2 : s.split("|").length);
    return count(before) === count(after) ? "replace" : "push";
}
