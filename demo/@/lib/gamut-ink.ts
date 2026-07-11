/**
 * gamut-ink — the ONE home of the gamut-truth netting idiom's paint
 * primitives (S.W5-8; lifted from the picker-local `gamutOverlayPaint.ts`
 * per the "hatch painter + ink probe lift to ONE home" clause — the netting
 * idiom must never be copied per-plate).
 *
 * Two consumers today:
 * - the picker's spectrum-plate overlay (`color-picker/gamutOverlayPaint.ts`)
 * - the gradient page's envelope plate (`gradient/GradientVisualizer/PerceivedSpacePlate/envelopePlatePaint.ts`)
 *
 * Owns: the `--gamut-*` token probe (computed-style resolution of the four
 * netting inks, color-mix and all), the WEBBING token table (density/angle/
 * weight — the owner-ruling §1.2 facility), the registered hatch line-painter,
 * the paper-ink SECOND net, and the shared DPR cap. No reactivity, no
 * geometry — geometry is always library-owned (`@mkbabb/value.js/color`),
 * scheduling is the consumer's.
 */

export const DPR_CAP = 2;

/**
 * The webbing token table (OWNER-RULING-2026-07-05 §1.2b): density, angle,
 * and line weight of the registered net, in ONE place. `period` and `angleDeg`
 * MUST agree with the CSS `--gamut-hatch(-paper)` tokens (the 4.75px+1.25px
 * tile at 45deg — T.W6-1's R5 recalibrated band, T-6) — the probe reads the
 * ink from CSS, the painter realizes the same lattice on canvas; they are two
 * renderings of one register. Weights are CSS px on a DPR-scaled context —
 * device-pixel-crisp at retina by construction.
 */
export const WEBBING = {
    /** Perpendicular line spacing, CSS px — the token's 4.75px+1.25px tile. */
    period: 6,
    /** Lattice angle (CSS-token register: `repeating-linear-gradient(45deg…)`). */
    angleDeg: 45,
    /** Hatch stroke weight, CSS px (lockstep with the CSS tile's 1.25px band). */
    weight: 1.25,
} as const;

/** The lattice's x-axis step (one period measured along the top edge). */
export const HATCH_STEP =
    WEBBING.period / Math.sin((WEBBING.angleDeg * Math.PI) / 180);

/**
 * The paper-ink SECOND net (OWNER-RULING §1.2b): the registered treatment for
 * sRGB-excess runs under wide interpolation spaces — a solid paper underlay
 * beneath dashed ink, one recipe for every gamut-truth surface.
 */
export const SECOND_NET = {
    /** Paper underlay weight, CSS px. */
    paperWeight: 3.5,
    /** Dashed ink overstroke weight, CSS px. */
    inkWeight: 1.5,
    /** The dash rhythm, CSS px. */
    dash: [3, 3],
} as const;

export interface ResolvedInks {
    edgeInk: string;
    edgePaper: string;
    hatchInk: string | null; // null ⇒ gradient-stop parse failed (degraded)
    hatchPaper: string | null;
}

/**
 * The token probe: a hidden span in the plate's own cascade whose computed
 * style resolves the four `--gamut-*` tokens (color-mix and all) to concrete
 * colors the canvas can ink with. Caller caches per scheme.
 */
export function createInkProbe(host: HTMLElement) {
    let probeEl: HTMLSpanElement | null = null;

    function extractGradientStop(gradient: string): string | null {
        // Computed `repeating-linear-gradient(45deg, transparent 0 5px, C 5px 6px)`
        // with C fully resolved; pick the first non-transparent color function.
        const colors = gradient.match(
            /(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\((?:[^()]|\([^()]*\))*\)/g,
        );
        if (!colors) return null;
        for (const c of colors) {
            if (/^rgba\(0,\s*0,\s*0,\s*0\)$/.test(c)) continue; // transparent
            if (/\/\s*0\)\s*$/.test(c)) continue; // `… / 0)` zero-alpha
            return c;
        }
        return null;
    }

    function resolve(): ResolvedInks {
        if (!probeEl) {
            probeEl = document.createElement("span");
            probeEl.setAttribute("aria-hidden", "true");
            probeEl.style.cssText =
                "position:absolute;visibility:hidden;pointer-events:none;width:0;height:0;";
            host.appendChild(probeEl);
        }
        probeEl.style.color = "var(--gamut-edge)";
        probeEl.style.backgroundColor = "var(--gamut-edge-paper)";
        probeEl.style.backgroundImage =
            "var(--gamut-hatch), var(--gamut-hatch-paper)";
        const cs = getComputedStyle(probeEl);
        const images = cs.backgroundImage.split(
            /(?=repeating-linear-gradient\()/,
        );
        return {
            edgeInk: cs.color,
            edgePaper: cs.backgroundColor,
            hatchInk: images[0] ? extractGradientStop(images[0]) : null,
            hatchPaper: images[1] ? extractGradientStop(images[1]) : null,
        };
    }

    function dispose() {
        probeEl?.remove();
        probeEl = null;
    }

    return { resolve, dispose };
}

/** The registered hatch line-painter (clip first, then hatch) — the lattice
 *  realizes the WEBBING tokens (period/angle/weight), never local numbers. */
export function drawHatch(
    c: CanvasRenderingContext2D,
    w: number,
    h: number,
    phase: number,
    style: string,
) {
    const step = HATCH_STEP;
    // x-run of one full-height line at the register angle (h/tan(45°) = h).
    const run = h / Math.tan((WEBBING.angleDeg * Math.PI) / 180);
    c.strokeStyle = style;
    c.lineWidth = WEBBING.weight;
    c.beginPath();
    for (
        let x = -run - step + ((phase % step) + step) % step;
        x < w + step;
        x += step
    ) {
        c.moveTo(x, 0);
        c.lineTo(x + run, h);
    }
    c.stroke();
}

/**
 * Stroke the SECOND net over a path: solid paper underlay, then dashed ink —
 * the registered pair, consumed per gamut-truth surface with zero per-surface
 * copies. `paper` may be null (degraded probe parse) — the ink alone stands.
 * Leaves the context's dash state clean.
 */
export function drawSecondNet(
    c: CanvasRenderingContext2D,
    path: Path2D,
    ink: string,
    paper: string | null,
) {
    if (paper) {
        c.strokeStyle = paper;
        c.lineWidth = SECOND_NET.paperWeight;
        c.setLineDash([]);
        c.stroke(path);
    }
    c.strokeStyle = ink;
    c.lineWidth = SECOND_NET.inkWeight;
    c.setLineDash([...SECOND_NET.dash]);
    c.stroke(path);
    c.setLineDash([]);
}
