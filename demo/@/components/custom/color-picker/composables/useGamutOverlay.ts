/**
 * useGamutOverlay — the wide-gamut truth line on the KEPT HSL square
 * (R.W3 Lane B / B2 + B5 + B6; spec: `docs/frontend-design/color-picker.md`
 * §"The one unforgettable moment" as amended, + `overlay-amendment.md`).
 *
 * The demo owns PAINT, never math: every coordinate comes from the engine's
 * `sampleGamutBoundary` (the JND contour of the active wide lens over the HSV
 * plate); no matrix is re-derived, no gamut mapping happens here. One seed
 * allocation on setup; every subsequent hue/lens/theme/resize frame rides the
 * zero-alloc `sampleGamutBoundaryInto` twin.
 *
 * Lens policy (B5 — Q11 RATIFIED 2026-07-03): default lens display-p3; the
 * lens follows `selectedColorSpace` only when that space is wide-RGB
 * (display-p3 / a98-rgb / prophoto-rgb / rec2020). The plate caption always
 * names the lens — an instrument states its conditions.
 *
 * Ink discipline (B1/B3): the contour hairline + clipped-margin hatch draw
 * from the four `--gamut-*` tokens (style.css :root), applied per segment by
 * the field's own luma through the SHARED `spectrumLuma` helper — the
 * dark-voiced pair over light field, the light-voiced pair over dark field,
 * the regime flipping exactly where the WatercolorDot's border flips. In the
 * light scheme that is literally "ink pair over light field, paper pair over
 * dark" (the treatment's clause); in the dark scheme the resolved voices swap
 * roles so the contrast law holds — the flip LOCATION (the shared 0.5) is the
 * invariant, never a second constant.
 *
 * PRM: the hatch PHASE (the decorative drift) freezes under
 * `prefers-reduced-motion: reduce`; the contour position still tracks hue —
 * it is user-driven state, not decoration.
 */

import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
    type ComputedRef,
    type ShallowRef,
} from "vue";
import { useMediaQuery } from "@vueuse/core";
import {
    sampleGamutBoundary,
    sampleGamutBoundaryInto,
} from "@src/units/color/boundary";
import type {
    GamutBoundary,
    GamutBoundaryTarget,
} from "@src/units/color/boundary";
import { findCusp, srgbToOKLab } from "@src/units/color/gamut";
import { hsl2rgb } from "@src/units/color/conversions/cylindrical";
import { HSLColor } from "@src/units/color";
import {
    cancelAnimationFrame,
    requestAnimationFrame,
} from "@src/utils";
import { spectrumFieldIsLight } from "../spectrumLuma";
import type { DisplayColorSpace } from "..";

const COLUMNS = 96; // the validated geometry default (boundary-api §2)
const DPR_CAP = 2;
const HATCH_PERIOD = 6; // CSS px, perpendicular — the token's 5px+1px tile
const HATCH_DRIFT_PERIODS = 2; // hatch phase periods per full hue turn
const CROSSHAIR_R = 4.5; // 9px ink crosshair (B6)

const WIDE_RGB_LENSES: ReadonlySet<string> = new Set([
    "display-p3",
    "a98-rgb",
    "prophoto-rgb",
    "rec2020",
]);

/** The detent micro-label voice: `p3 ⊣` / `rec2020 ⊣` / `a98 ⊣` (P6). */
const LENS_SHORT: Record<GamutBoundaryTarget, string> = {
    "display-p3": "p3",
    "a98-rgb": "a98",
    "prophoto-rgb": "prophoto",
    rec2020: "rec2020",
};

interface ResolvedInks {
    edgeInk: string;
    edgePaper: string;
    hatchInk: string | null; // null ⇒ gradient-stop parse failed (degraded)
    hatchPaper: string | null;
}

export interface UseGamutOverlayOptions {
    /** Plate hue in degrees [0, 360]. */
    hueDeg: ComputedRef<number>;
    selectedColorSpace: ComputedRef<DisplayColorSpace>;
    /** The spectrum square (the overlay's geometry + probe host). */
    hostRef: Readonly<ShallowRef<HTMLElement | null>>;
    canvasRef: Readonly<ShallowRef<HTMLCanvasElement | null>>;
    /** Per-draw cost hook (the perf gauge; budget < 2 ms/frame). */
    onDrawCost?: (ms: number) => void;
}

export function useGamutOverlay(opts: UseGamutOverlayOptions) {
    const prmReduce = useMediaQuery("(prefers-reduced-motion: reduce)");

    // ── The lens (B5) ────────────────────────────────────────────────────────
    const lens = computed<GamutBoundaryTarget>(() => {
        const space = opts.selectedColorSpace.value;
        return (
            WIDE_RGB_LENSES.has(space) ? space : "display-p3"
        ) as GamutBoundaryTarget;
    });
    const lensShort = computed(() => LENS_SHORT[lens.value]);

    // ── The boundary (engine geometry; seed once, Into thereafter) ──────────
    // Seeded synchronously so the caption + fallback are truthful at first
    // paint (the wave rider: contour at first paint under the ratified lens).
    const boundary: GamutBoundary = sampleGamutBoundary(
        opts.hueDeg.value,
        lens.value,
        { columns: COLUMNS },
    );
    const boundaryRev = ref(0);

    /** Bounds-safe polyline read (noUncheckedIndexedAccess): callers only
     * index `< 2·count`, so the fallback is never taken in practice. */
    const pt = (i: number): number => boundary.points[i] ?? 0;

    function resample() {
        sampleGamutBoundaryInto(opts.hueDeg.value, lens.value, boundary, {
            columns: COLUMNS,
        });
        boundaryRev.value++;
    }

    const plateClear = computed(() => {
        void boundaryRev.value;
        return boundary.count === 0;
    });

    /**
     * v of the contour at saturation `s` (piecewise-linear over the render
     * pass's own samples — zero new geometry, B4). `Infinity` ⇔ the column is
     * everywhere sRGB-faithful (left of the tip, or a clear plate).
     */
    function contourVAt(s: number): number {
        const n = boundary.count;
        if (n === 0) return Infinity;
        if (s < pt(0)) return Infinity;
        for (let i = 1; i < n; i++) {
            const s1 = pt(2 * i);
            if (s <= s1) {
                const s0 = pt(2 * (i - 1));
                const v0 = pt(2 * (i - 1) + 1);
                const v1 = pt(2 * i + 1);
                const t = s1 === s0 ? 0 : (s - s0) / (s1 - s0);
                return v0 + (v1 - v0) * t;
            }
        }
        return pt(2 * (n - 1) + 1);
    }

    const hasContour = () => boundary.count > 0;

    // ── The caption readouts (B5/B6) ─────────────────────────────────────────
    // Copy renders through `all-small-caps` (the atlas-caption register); the
    // strings are authored lowercase and read as small capitals on the plate.
    const lensCaption = computed(() => `gamut lens — ${lens.value} / srgb`);

    // The hue's sRGB cusp (B6) — the breathing numbers. Consumes the public
    // `findCusp` on the plate hue's OKLab direction (pure hue = hsl(h,1,.5));
    // the on-plate datum is the contour's INNERMOST point, never the cusp
    // (which always projects to the square's (1,1) corner).
    const cusp = computed(() => {
        const hue = opts.hueDeg.value;
        if (!Number.isFinite(hue)) return null;
        const hNorm = (((hue % 360) + 360) % 360) / 360;
        const rgb = hsl2rgb(new HSLColor(hNorm, 1, 0.5, 1));
        const [, a, b] = srgbToOKLab(rgb.r, rgb.g, rgb.b);
        const c = Math.hypot(a, b);
        if (c < 1e-9) return null;
        return findCusp(a / c, b / c);
    });

    const plateReadout = computed(() => {
        if (plateClear.value) {
            // The empty state is content, not malfunction (P7): sRGB holds
            // every color this square can name under the current lens.
            return `${lensShort.value} Δ < jnd — plate clear`;
        }
        const k = cusp.value;
        if (!k) return "";
        return `cusp l ${k.L.toFixed(3)} c ${k.C.toFixed(3)}`;
    });

    // ── Canvas plumbing ──────────────────────────────────────────────────────
    const canvasOk = ref(true);
    let ctx: CanvasRenderingContext2D | null = null;

    const isDark = ref(
        typeof document !== "undefined" &&
            document.documentElement.classList.contains("dark"),
    );

    // Token probe — the canvas resolves the four `--gamut-*` tokens via a
    // computed-style probe (treatment §COLOR clause 1); cached per scheme.
    let probeEl: HTMLSpanElement | null = null;
    let inkCache: ResolvedInks | null = null;
    let inkCacheDark: boolean | null = null;

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

    function resolveInks(host: HTMLElement): ResolvedInks {
        if (inkCache && inkCacheDark === isDark.value) return inkCache;
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
        const images = cs.backgroundImage.split(/(?=repeating-linear-gradient\()/);
        inkCache = {
            edgeInk: cs.color,
            edgePaper: cs.backgroundColor,
            hatchInk: images[0] ? extractGradientStop(images[0]) : null,
            hatchPaper: images[1] ? extractGradientStop(images[1]) : null,
        };
        inkCacheDark = isDark.value;
        return inkCache;
    }

    // ── Paint ────────────────────────────────────────────────────────────────
    const toX = (s: number, w: number) => s * w;
    const toY = (v: number, h: number) => (1 - v) * h;

    /** The visibly-clipped margin: contour → top-right corner → top edge. */
    function oogRegionPath(w: number, h: number): Path2D {
        const p = new Path2D();
        p.moveTo(toX(pt(0), w), toY(pt(1), h));
        for (let i = 1; i < boundary.count; i++) {
            p.lineTo(toX(pt(2 * i), w), toY(pt(2 * i + 1), h));
        }
        p.lineTo(w, 0);
        p.closePath();
        return p;
    }

    /**
     * The luma-flip height at saturation `s`, found by bisecting the SHARED
     * luma model (share the function, never copy the constant — B3).
     */
    function flipVAt(s: number): number {
        if (!spectrumFieldIsLight(s, 1)) return 1;
        let lo = 0;
        let hi = 1;
        for (let i = 0; i < 16; i++) {
            const mid = (lo + hi) / 2;
            if (spectrumFieldIsLight(s, mid)) hi = mid;
            else lo = mid;
        }
        return (lo + hi) / 2;
    }

    /** Light-field / dark-field regime regions, split on the shared flip. */
    function regimeRegionPath(w: number, h: number, light: boolean): Path2D {
        const p = new Path2D();
        const cols = 32;
        p.moveTo(0, toY(flipVAt(0), h));
        for (let j = 1; j <= cols; j++) {
            const s = j / cols;
            p.lineTo(toX(s, w), toY(flipVAt(s), h));
        }
        if (light) {
            p.lineTo(w, 0);
            p.lineTo(0, 0);
        } else {
            p.lineTo(w, h);
            p.lineTo(0, h);
        }
        p.closePath();
        return p;
    }

    function drawHatch(
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

    // Host size cached from the ResizeObserver — the draw path must never
    // call getBoundingClientRect (a forced reflow while a drag dirties
    // styles every frame turns a 1 ms draw into a 13 ms one, measured).
    let hostW = 0;
    let hostH = 0;

    function paint(host: HTMLElement, canvas: HTMLCanvasElement) {
        if (!ctx) return;
        const w = hostW;
        const h = hostH;
        if (w === 0 || h === 0) return;
        const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
        const W = Math.round(w * dpr);
        const H = Math.round(h * dpr);
        if (canvas.width !== W) canvas.width = W;
        if (canvas.height !== H) canvas.height = H;

        const c = ctx;
        c.setTransform(dpr, 0, 0, dpr, 0, 0);
        c.clearRect(0, 0, w, h);

        // count === 0 ⇒ the plate is clear: no stroke, no sentinel — the
        // caption alone states the fact (the blue-absence beat).
        if (boundary.count === 0) return;

        const inks = resolveInks(host);

        // Scheme-aware pairing: the dark-voiced pair contrasts on light field.
        const dark = isDark.value;
        const lightFieldEdge = dark ? inks.edgePaper : inks.edgeInk;
        const darkFieldEdge = dark ? inks.edgeInk : inks.edgePaper;
        const lightFieldHatch = dark ? inks.hatchPaper : inks.hatchInk;
        const darkFieldHatch = dark ? inks.hatchInk : inks.hatchPaper;

        const oog = oogRegionPath(w, h);
        const lightRegion = regimeRegionPath(w, h, true);
        const darkRegion = regimeRegionPath(w, h, false);

        // (c) the registered dual hatch — drawn twice, same line geometry,
        // each pass clipped to (clipped margin ∩ luma regime).
        const phase = prmReduce.value
            ? 0
            : (opts.hueDeg.value / 360) *
              HATCH_DRIFT_PERIODS *
              HATCH_PERIOD *
              Math.SQRT2;
        for (const [region, ink, edge] of [
            [lightRegion, lightFieldHatch, lightFieldEdge],
            [darkRegion, darkFieldHatch, darkFieldEdge],
        ] as const) {
            c.save();
            c.clip(oog);
            c.clip(region);
            if (ink) {
                drawHatch(c, w, h, phase, ink);
            } else {
                // Degraded probe-parse fallback: hatch in the edge ink, faint.
                c.globalAlpha = 0.35;
                drawHatch(c, w, h, phase, edge);
            }
            c.restore();
        }

        // (b) the JND contour as a device-pixel hairline, dual-ink per
        // segment by the SHARED luma regime at the segment midpoint.
        const lightPath = new Path2D();
        const darkPath = new Path2D();
        for (let i = 1; i < boundary.count; i++) {
            const s0 = pt(2 * (i - 1));
            const v0 = pt(2 * (i - 1) + 1);
            const s1 = pt(2 * i);
            const v1 = pt(2 * i + 1);
            const path = spectrumFieldIsLight((s0 + s1) / 2, (v0 + v1) / 2)
                ? lightPath
                : darkPath;
            path.moveTo(toX(s0, w), toY(v0, h));
            path.lineTo(toX(s1, w), toY(v1, h));
        }
        c.lineWidth = 1 / dpr; // a device-pixel hairline
        c.lineCap = "round";
        c.strokeStyle = lightFieldEdge;
        c.stroke(lightPath);
        c.strokeStyle = darkFieldEdge;
        c.stroke(darkPath);

        // (B6) the on-plate datum: a 9px ink crosshair at the contour's
        // innermost point (min s+v — consumer-side scan, boundary-api §9).
        let minIdx = 0;
        let minSum = Infinity;
        for (let i = 0; i < boundary.count; i++) {
            const sum = pt(2 * i) + pt(2 * i + 1);
            if (sum < minSum) {
                minSum = sum;
                minIdx = i;
            }
        }
        const dx = toX(pt(2 * minIdx), w);
        const dy = toY(pt(2 * minIdx + 1), h);
        const datum = new Path2D();
        datum.moveTo(dx - CROSSHAIR_R, dy);
        datum.lineTo(dx + CROSSHAIR_R, dy);
        datum.moveTo(dx, dy - CROSSHAIR_R);
        datum.lineTo(dx, dy + CROSSHAIR_R);
        c.lineWidth = 1;
        c.strokeStyle = spectrumFieldIsLight(pt(2 * minIdx), pt(2 * minIdx + 1))
            ? lightFieldEdge
            : darkFieldEdge;
        // Stroked twice: the datum reads a step firmer than the hairline
        // while staying inside the token's ink (no fifth token).
        c.stroke(datum);
        c.stroke(datum);
    }

    // ── The clip-path no-canvas fallback (single-ink, degraded-honest) ──────
    const fallbackStyle = computed(() => {
        void boundaryRev.value;
        if (boundary.count === 0) return { display: "none" } as const;
        const poly: string[] = [];
        for (let i = 0; i < boundary.count; i++) {
            poly.push(
                `${(pt(2 * i) * 100).toFixed(2)}% ${((1 - pt(2 * i + 1)) * 100).toFixed(2)}%`,
            );
        }
        poly.push("100% 0%");
        return { clipPath: `polygon(${poly.join(", ")})` };
    });

    // ── Scheduling: one pending frame, recompute + repaint coalesced ────────
    let rafId: ReturnType<typeof requestAnimationFrame> | null = null;

    function render() {
        const t0 = performance.now();
        resample();
        const host = opts.hostRef.value;
        const canvas = opts.canvasRef.value;
        if (host && canvas && canvasOk.value) paint(host, canvas);
        const dt = performance.now() - t0;
        opts.onDrawCost?.(dt);
        try {
            performance.clearMeasures("gamut-overlay-draw");
            performance.measure("gamut-overlay-draw", { start: t0 });
        } catch {
            // User Timing L3 options unsupported — the gauge callback stands.
        }
    }

    function schedule() {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(() => {
            rafId = null;
            render();
        });
    }

    watch([opts.hueDeg, lens, prmReduce, isDark], schedule, { flush: "post" });

    let resizeObs: ResizeObserver | null = null;
    let classObs: MutationObserver | null = null;

    onMounted(() => {
        const canvas = opts.canvasRef.value;
        ctx = canvas?.getContext("2d") ?? null;
        if (!ctx) canvasOk.value = false;

        if (opts.hostRef.value && typeof ResizeObserver !== "undefined") {
            resizeObs = new ResizeObserver((entries) => {
                const rect = entries[entries.length - 1]?.contentRect;
                if (rect) {
                    hostW = rect.width;
                    hostH = rect.height;
                }
                schedule();
            });
            // Fires once on observe with the initial size — the seed read.
            resizeObs.observe(opts.hostRef.value);
        } else if (opts.hostRef.value) {
            const rect = opts.hostRef.value.getBoundingClientRect();
            hostW = rect.width;
            hostH = rect.height;
        }
        classObs = new MutationObserver(() => {
            isDark.value = document.documentElement.classList.contains("dark");
        });
        classObs.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        render();
    });

    onBeforeUnmount(() => {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        resizeObs?.disconnect();
        classObs?.disconnect();
        probeEl?.remove();
        probeEl = null;
    });

    return {
        lens,
        lensShort,
        lensCaption,
        plateReadout,
        plateClear,
        canvasOk,
        fallbackStyle,
        contourVAt,
        hasContour,
    };
}
