/**
 * gamut-ink — the ONE home of the gamut-truth netting idiom's paint
 * primitives (S.W5-8; lifted from the picker-local `gamutOverlayPaint.ts`
 * per the "hatch painter + ink probe lift to ONE home" clause — the netting
 * idiom must never be copied per-plate).
 *
 * Two consumers today:
 * - the picker's spectrum-plate overlay (`color-picker/gamutOverlayPaint.ts`)
 * - the gradient page's perceived-space plate (`gradient/perceivedSpacePaint.ts`)
 *
 * Owns: the `--gamut-*` token probe (computed-style resolution of the four
 * netting inks, color-mix and all), the registered 45° hatch line-painter,
 * and the shared DPR cap. No reactivity, no geometry — geometry is always
 * library-owned (`@src/units/color/boundary`), scheduling is the consumer's.
 */

export const DPR_CAP = 2;
export const HATCH_PERIOD = 6; // CSS px, perpendicular — the token's 5px+1px tile

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

/** The registered 45° hatch line-painter (clip first, then hatch). */
export function drawHatch(
    c: CanvasRenderingContext2D,
    w: number,
    h: number,
    phase: number,
    style: string,
) {
    const step = HATCH_PERIOD * Math.SQRT2;
    c.strokeStyle = style;
    c.lineWidth = 1;
    c.beginPath();
    for (
        let x = -h - step + ((phase % step) + step) % step;
        x < w + step;
        x += step
    ) {
        c.moveTo(x, 0);
        c.lineTo(x + h, h);
    }
    c.stroke();
}
