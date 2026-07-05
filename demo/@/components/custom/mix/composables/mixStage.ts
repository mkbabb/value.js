/**
 * The mix convergence STAGE — the choreography model (S.W3-6 / Q10).
 *
 * Pure geometry + pigment: stage collection (measuring the real DOM — chips
 * are the springs, the ghost well is the sea), the per-elapsed draw
 * functions, and the timeline constants. No lifecycle, no clock — the clock
 * lives in `useMixingAnimation` (the ONE clock), which calls these with an
 * explicit `elapsed`.
 *
 * SAFARI-TRUE BY CONSTRUCTION: radial-gradient soft discs + default
 * source-over compositing only. No `ctx.filter` (never shipped in WebKit),
 * no engine-conditional path — one implementation, every engine.
 */

import { lerp, clamp } from "@src/math";
import { easeInOutCubic, easeOutCubic, easeInQuad } from "@src/easing";
import { sampleColorRamp } from "@src/units/color/mix";
import type { HueInterpolationMethod } from "@src/units/color/mix";
import { color2 } from "@src/units/color/dispatch";
import type { Color } from "@src/units/color";
import type { ColorSpace } from "@src/units/color/constants";
import { cssToRawColor, cssToRgb255 } from "@lib/color-utils";

/** All drops arrive at the well together — the convergence chord. */
export const MIX_ARRIVE_MS = 700;
/** Pool settled; the completion event (`onSettled`) fires here. */
export const MIX_CONVERGE_MS = 900;
/** The landed pool dissolves over the inking plate (canvas-only tail). */
export const MIX_EPILOGUE_MS = 300;

const RAMP_STOPS = 16;
const MAX_DROPS = 12;

export type RGB = [number, number, number];

export interface Drop {
    /** Quadratic Bézier: origin → control → the well. */
    x0: number;
    y0: number;
    cx: number;
    cy: number;
    /** Lift-off radius (from the chip's own size). */
    r0: number;
    /** Stagger on departure only — arrival is shared. */
    delay: number;
    /** Perceptual pigment ramp: own color → the true mixed result. */
    ramp: RGB[];
}

export interface Stage {
    drops: Drop[];
    tx: number;
    ty: number;
    tr: number;
    /** The true result pigment (the last ramp stop of every drop). */
    pool: RGB;
}

function rgba([r, g, b]: RGB, a: number): string {
    return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

function quadBezier(p0: number, p1: number, p2: number, t: number): number {
    const u = 1 - t;
    return u * u * p0 + 2 * u * t * p1 + t * t * p2;
}

/**
 * Layout-space center of `el` relative to `root` (the canvas's parent — the
 * pane Card). Walks the offsetParent chain, so in-flight enter transforms
 * (the plate's vj-morph) and ancestor pane transitions don't skew the
 * measurement: the canvas shares those transforms, layout coords are the one
 * consistent frame.
 */
function layoutCenter(el: HTMLElement, root: HTMLElement) {
    let x = 0;
    let y = 0;
    let node: HTMLElement | null = el;
    while (node && node !== root) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
    }
    return {
        x: x + el.offsetWidth / 2,
        y: y + el.offsetHeight / 2,
        r: Math.min(el.offsetWidth, el.offsetHeight) / 2,
    };
}

/** A Color (any space, normalized [0,1]) → drawable 8-bit sRGB triple. */
function toRgb255(color: Color<number>): RGB {
    const rgb = color2(color, "rgb") as Color<number>;
    const to255 = (v: number) => Math.round(clamp(v, 0, 1) * 255);
    return [
        to255(rgb.r as number),
        to255(rgb.g as number),
        to255(rgb.b as number),
    ];
}

/**
 * The perceptual pigment ramp for one drop: its own color → the mixed result,
 * sampled in the SAME space + hue method the mix ran (gamut-mapped per stop by
 * `sampleColorRamp`, so every frame draws a real sRGB pigment).
 */
function pigmentRamp(
    fromCss: string,
    toCss: string,
    space: ColorSpace,
    hueMethod: HueInterpolationMethod,
): RGB[] {
    const from = cssToRawColor(fromCss, space);
    const to = cssToRawColor(toCss, space);
    if (!from || !to) {
        const flat = cssToRgb255(toCss);
        return Array.from({ length: RAMP_STOPS }, () => flat);
    }
    return sampleColorRamp(from, to, RAMP_STOPS, { space, hueMethod }).map(
        (stop) => toRgb255(stop as Color<number>),
    );
}

/** Measure the real DOM: chips are the springs, the ghost well is the sea. */
export function collectStage(
    canvas: HTMLCanvasElement,
    poolCss: string,
    space: ColorSpace,
    hueMethod: HueInterpolationMethod,
): Stage | null {
    const root = canvas.parentElement;
    if (!root) return null;

    const targetEl = root.querySelector<HTMLElement>("[data-mix-target]");
    const target = targetEl
        ? layoutCenter(targetEl, root)
        : { x: root.clientWidth / 2, y: root.scrollHeight * 0.7, r: 28 };

    // Sources: color chips carry data-mix-color; selected palette cards
    // carry data-mix-colors (a JSON list — several pigments per card).
    const sourceEls = Array.from(
        root.querySelectorAll<HTMLElement>("[data-mix-source]"),
    );
    const origins: { x: number; y: number; r: number; css: string }[] = [];
    for (const el of sourceEls) {
        const at = layoutCenter(el, root);
        const one = el.dataset.mixColor;
        if (one) {
            origins.push({ ...at, css: one });
            continue;
        }
        try {
            const many = JSON.parse(el.dataset.mixColors ?? "[]") as string[];
            many.forEach((css, i) => {
                // Fan a card's pigments across its strip width.
                const spread = (i + 0.5) / many.length - 0.5;
                origins.push({
                    x: at.x + spread * el.offsetWidth * 0.7,
                    y: at.y,
                    r: Math.min(at.r, 18),
                    css,
                });
            });
        } catch {
            /* unstamped source — skip */
        }
    }
    if (origins.length === 0) return null;

    const picked = origins.slice(0, MAX_DROPS);
    const stagger = Math.min(60, 240 / picked.length);
    const drops: Drop[] = picked.map((o, i) => {
        const mx = (o.x + target.x) / 2;
        const my = (o.y + target.y) / 2;
        const dx = target.x - o.x;
        const dy = target.y - o.y;
        const dist = Math.hypot(dx, dy) || 1;
        // Perpendicular bow, alternating sides — organic convergence.
        const bow =
            clamp(dist * 0.22, 24, 96) *
            (i % 2 === 0 ? 1 : -1) *
            (1 + ((i * 0.37) % 0.4));
        return {
            x0: o.x,
            y0: o.y,
            cx: mx + (-dy / dist) * bow,
            cy: my + (dx / dist) * bow,
            r0: Math.max(o.r * 0.55, 8),
            delay: i * stagger,
            ramp: pigmentRamp(o.css, poolCss, space, hueMethod),
        };
    });

    return {
        drops,
        tx: target.x,
        ty: target.y,
        tr: Math.max(target.r, 14),
        pool: drops[0]!.ramp[RAMP_STOPS - 1]!,
    };
}

function drawDisc(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    color: RGB,
    alpha: number,
) {
    if (r <= 0 || alpha <= 0) return;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(color, alpha));
    g.addColorStop(0.55, rgba(color, alpha * 0.85));
    g.addColorStop(1, rgba(color, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function drawDrop(
    ctx: CanvasRenderingContext2D,
    d: Drop,
    s: Stage,
    elapsed: number,
) {
    if (elapsed <= d.delay) return;
    const p = clamp((elapsed - d.delay) / (MIX_ARRIVE_MS - d.delay), 0, 1);
    const e = easeInOutCubic(p);
    const colorAt = (t: number) =>
        d.ramp[Math.round(clamp((t - 0.3) / 0.7, 0, 1) * (RAMP_STOPS - 1))]!;
    const posAt = (t: number) => ({
        x: quadBezier(d.x0, d.cx, s.tx, t),
        y: quadBezier(d.y0, d.cy, s.ty, t),
    });

    // Wet trail: pigment bleeding close behind the drop — a comet, not
    // detached bubbles.
    for (const [back, fade] of [
        [0.1, 0.16],
        [0.05, 0.32],
    ] as const) {
        const tb = e - back;
        if (tb <= 0 || p >= 1) continue;
        const { x, y } = posAt(tb);
        drawDisc(ctx, x, y, lerp(d.r0, s.tr, tb) * 0.75, colorAt(tb), 0.92 * fade);
    }

    const { x, y } = posAt(e);
    const swell = 1 + 0.22 * Math.sin(Math.PI * e);
    const liftOff = clamp(p * 4, 0, 1);
    drawDisc(ctx, x, y, lerp(d.r0, s.tr, e) * swell, colorAt(e), 0.92 * liftOff);
}

function drawPool(ctx: CanvasRenderingContext2D, s: Stage, elapsed: number) {
    const q = clamp(
        (elapsed - MIX_ARRIVE_MS) / (MIX_CONVERGE_MS - MIX_ARRIVE_MS),
        0,
        1,
    );
    const settle = easeOutCubic(q);
    const dissolve =
        elapsed <= MIX_CONVERGE_MS
            ? 0
            : easeInQuad(clamp((elapsed - MIX_CONVERGE_MS) / MIX_EPILOGUE_MS, 0, 1));
    const alpha = 0.95 * (1 - dissolve);
    const r = s.tr * (1 + 0.18 * Math.sin(Math.PI * settle));

    // Wet halo beneath the pool, then the pool itself.
    drawDisc(ctx, s.tx, s.ty, r * 1.7, s.pool, alpha * 0.18);
    drawDisc(ctx, s.tx, s.ty, r, s.pool, alpha);

    // One settling ripple.
    if (settle > 0 && settle < 1) {
        ctx.strokeStyle = rgba(s.pool, 0.35 * (1 - settle));
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(s.tx, s.ty, s.tr * (1 + 1.1 * settle), 0, Math.PI * 2);
        ctx.stroke();
    }
}

/** Draw the whole stage at `elapsed` (the clock's single paint call). */
export function drawStage(
    ctx: CanvasRenderingContext2D,
    s: Stage,
    elapsed: number,
) {
    if (elapsed < MIX_ARRIVE_MS) {
        for (const d of s.drops) drawDrop(ctx, d, s, elapsed);
    } else {
        drawPool(ctx, s, elapsed);
    }
}
