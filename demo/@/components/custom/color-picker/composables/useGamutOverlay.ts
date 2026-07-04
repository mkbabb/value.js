/**
 * useGamutOverlay — the wide-gamut truth line on the KEPT HSL square
 * (R.W3 Lane B / B2 + B5 + B6; spec: `docs/frontend-design/color-picker.md`
 * §"The one unforgettable moment" as amended, + `overlay-amendment.md`).
 *
 * The demo owns PAINT, never math: every coordinate comes from the engine's
 * `sampleGamutBoundary` (the JND contour of the active wide lens over the HSV
 * plate); no matrix is re-derived, no gamut mapping happens here. One seed
 * allocation on setup; every subsequent hue/lens/theme/resize frame rides the
 * zero-alloc `sampleGamutBoundaryInto` twin. The canvas work itself lives in
 * `../gamutOverlayPaint.ts` — this composable owns the lens, the boundary
 * lifecycle, the caption readouts, and WHEN to draw.
 *
 * Lens policy (B5 — Q11 RATIFIED 2026-07-03): default lens display-p3; the
 * lens follows `selectedColorSpace` only when that space is wide-RGB
 * (display-p3 / a98-rgb / prophoto-rgb / rec2020). The plate caption always
 * names the lens — an instrument states its conditions.
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
import { cancelAnimationFrame, requestAnimationFrame } from "@src/utils";
import {
    createInkProbe,
    paintGamutBoundary,
    type ResolvedInks,
} from "../gamutOverlayPaint";
import type { DisplayColorSpace } from "..";

const COLUMNS = 96; // the validated geometry default (boundary-api §2)

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

    // The ink probe (gamutOverlayPaint) — resolved colors cached per scheme.
    let probe: ReturnType<typeof createInkProbe> | null = null;
    let inkCache: ResolvedInks | null = null;
    let inkCacheDark: boolean | null = null;

    function inks(host: HTMLElement): ResolvedInks {
        if (inkCache && inkCacheDark === isDark.value) return inkCache;
        probe ??= createInkProbe(host);
        inkCache = probe.resolve();
        inkCacheDark = isDark.value;
        return inkCache;
    }

    // Host size cached from the ResizeObserver — the draw path must never
    // call getBoundingClientRect (a forced reflow while a drag dirties
    // styles every frame turns a 1 ms draw into a 13 ms one, measured).
    let hostW = 0;
    let hostH = 0;

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
        if (host && canvas && ctx && canvasOk.value) {
            paintGamutBoundary(ctx, canvas, boundary, {
                width: hostW,
                height: hostH,
                inks: inks(host),
                isDark: isDark.value,
                hueDeg: opts.hueDeg.value,
                reduceMotion: prmReduce.value,
            });
        }
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
        probe?.dispose();
        probe = null;
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
