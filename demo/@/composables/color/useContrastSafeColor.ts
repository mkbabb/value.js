import {
    computed,
    getCurrentInstance,
    inject,
    onMounted,
    ref,
    type ComputedRef,
} from "vue";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { cssToRawColor } from "@lib/color-utils";
import { INK_AMBIENT_KEY } from "./keys";
import {
    certifyAccentInk,
    resolveMutedInk,
    resolveSurfaceLightness,
    type InkSurface,
    type SurfaceTint,
} from "./ink";

/**
 * The contrast guard, keyed on THE SURFACE (D6, T.W3-5 — the ink-on-tier
 * contract): the former `BG_LIGHTNESS_DARK/LIGHT` constants (0.15/0.97) are
 * RETIRED — they described `--background`, which `style.css` demotes to a
 * fallback behind the atmosphere's live `--saved-bg`, so no rendered surface
 * ever had them (t-a11y-contrast F-1: measured composited ambient
 * 0.376–0.936). The referent is now:
 *
 *   - the atmosphere's LIVE `derivedLightness` (the M-15 exposed value,
 *     threaded here by the boot writer) for page-ambient ink, and
 *   - the material ladder's per-rung composited lightness
 *     (`resolveSurfaceLightness`) for ink seated on a named tier.
 *
 * The guard itself is `certifyAccentInk` (`./ink`): the library's OKLab
 * distance guard + gamut-map + a WCAG floor walk — certified by construction
 * (the `resolveSealInk` exemplar generalized), sourced ENTIRELY from the
 * library (S.W2-2 ⊣ W1-6: the demo carries NO norm/denorm color math).
 */

// --- THE LIVE TIER-TINT INSTRUMENT (the `createInkProbe` idiom, S.W5-8,
// generalized to the material ladder) ----------------------------------------
//
// The referent is the tier's ACTUAL painted recipe, read live: a hidden probe
// in the document's own cascade resolves the rung's background token
// (color-mix, tint knob and all) to a concrete color+alpha; the dock band is
// probed off the mounted `.glass-dock` element itself (its chrome recipe is
// its own, thinner α). In non-browser contexts (jsdom — no canvas) the
// resolver yields null and the static producer MODEL in `./ink` serves; the
// O-18 census enforces the live path in the real browser.

const TIER_BG_TOKEN: Partial<Record<InkSurface, string>> = {
    resting: "--glass-bg-resting",
    floating: "--glass-bg-floating",
    well: "--well-bg",
};

/**
 * The probe EPOCH — the connection-truth signal for the live instrument. A
 * consumer's first `computed` evaluation runs while Vue is still building the
 * subtree DETACHED (elements insert bottom-up on initial mount), so a
 * `document.querySelector(".glass-dock")` read at that instant misses the
 * dock band and the cached computed would carry the static-model referent
 * FOREVER (the resume-run's earned catch: the light-scheme profile trigger
 * certified against the model's 0.90 while the REAL band composited 0.75 —
 * 3.59:1 measured). Every live read tracks this ref; every consumer bumps it
 * from its own `onMounted` — Vue's "the DOM is now connected" signal — so the
 * probes re-drive through ordinary reactivity. No polling, no workaround.
 */
const probeEpoch = ref(0);
function bumpProbeEpochOnMount(): void {
    // Composables may be exercised outside a component (unit probes) — the
    // epoch is a mount-truth signal, so no instance simply means no bump.
    if (getCurrentInstance()) onMounted(() => probeEpoch.value++);
}

let probeCtx: CanvasRenderingContext2D | null | undefined;
function canvasCtx(): CanvasRenderingContext2D | null {
    if (probeCtx === undefined) {
        try {
            const cv = document.createElement("canvas");
            cv.width = cv.height = 1;
            probeCtx = cv.getContext("2d", { willReadFrequently: true });
        } catch {
            probeCtx = null;
        }
    }
    return probeCtx ?? null;
}

/** Resolve ANY computed CSS color to sRGB + alpha via dual-ground draws. */
function resolveCssColorAlpha(
    css: string,
): { r: number; g: number; b: number; alpha: number } | null {
    const ctx = canvasCtx();
    if (!ctx || !css) return null;
    const draw = (ground: string) => {
        ctx.fillStyle = ground;
        ctx.fillRect(0, 0, 1, 1);
        ctx.fillStyle = "#000";
        ctx.fillStyle = css;
        ctx.fillRect(0, 0, 1, 1);
        return ctx.getImageData(0, 0, 1, 1).data;
    };
    const onBlack = draw("#000");
    const onWhite = draw("#fff");
    const alpha = 1 - ((onWhite[0] ?? 0) - (onBlack[0] ?? 0)) / 255;
    if (alpha <= 0.001) return { r: 0, g: 0, b: 0, alpha: 0 };
    return {
        r: (onBlack[0] ?? 0) / alpha,
        g: (onBlack[1] ?? 0) / alpha,
        b: (onBlack[2] ?? 0) / alpha,
        alpha,
    };
}

/** OKLab L of an sRGB triple, memoized (library-resolved, never local math). */
const tintLCache = new Map<string, number>();
function srgbLightness(r: number, g: number, b: number): number | null {
    const key = `${Math.round(r)},${Math.round(g)},${Math.round(b)}`;
    const hit = tintLCache.get(key);
    if (hit !== undefined) return hit;
    const parsed = cssToRawColor(`rgb(${key})`, "oklch");
    if (!parsed) return null;
    const L = parsed.l as number;
    tintLCache.set(key, L);
    if (tintLCache.size > 512) tintLCache.clear();
    return L;
}

let tierProbe: HTMLElement | null = null;
function probeEl(): HTMLElement | null {
    if (typeof document === "undefined") return null;
    if (!tierProbe || !tierProbe.isConnected) {
        tierProbe = document.createElement("div");
        tierProbe.setAttribute("data-ink-probe", "");
        tierProbe.style.cssText =
            "position:absolute;width:0;height:0;visibility:hidden;pointer-events:none";
        document.body.appendChild(tierProbe);
    }
    return tierProbe;
}

/** Read a tier's LIVE painted tint (recipe truth) — null when unmeasurable. */
function resolveLiveTint(surface: InkSurface): SurfaceTint | undefined {
    if (surface === "page") return undefined;
    let bg: string | undefined;
    if (surface === "chrome") {
        const dock = document.querySelector<HTMLElement>(".glass-dock");
        if (dock) bg = getComputedStyle(dock).backgroundColor;
    } else {
        const probe = probeEl();
        const token = TIER_BG_TOKEN[surface];
        if (probe && token) {
            probe.style.backgroundColor = `var(${token})`;
            bg = getComputedStyle(probe).backgroundColor;
        }
    }
    if (!bg) return undefined;
    const resolved = resolveCssColorAlpha(bg);
    if (!resolved || resolved.alpha === 0) return undefined;
    const L = srgbLightness(resolved.r, resolved.g, resolved.b);
    if (L === null) return undefined;
    return { L, alpha: resolved.alpha };
}

/** The surface referent, live-first: probe the painted recipe, compose with
 *  the ambient; the static model serves only where nothing can be measured.
 *  Tracks the probe epoch so a reactive caller re-drives its live read once
 *  the document is actually connected (see `probeEpoch`). */
function surfaceLightnessNow(
    surface: InkSurface,
    ambientL: number,
    dark: boolean,
): number {
    void probeEpoch.value; // reactive dep — connection-truth invalidation
    return resolveSurfaceLightness(
        surface,
        ambientL,
        dark,
        resolveLiveTint(surface),
    );
}

/**
 * Computes a contrast-safe accent color CSS string from the live picked color,
 * certified against the LIVE page ambient. ONE app-level instance (the boot
 * writer, `useAtmosphereBoot`) provides the result via SAFE_ACCENT_KEY and
 * mirrors it onto `--accent-live`; it also carries the de-emphasis rung
 * (`mutedInkCss` → `--ink-muted`, certified against the resting plate — the
 * rung the captions sit on).
 *
 * @param cssColorOpaque   the rAF-coalesced live OPAQUE colour
 * @param ambientLightness the atmosphere's live derived lightness (M-15)
 */
export function useContrastSafeColor(
    cssColorOpaque: ComputedRef<string>,
    ambientLightness: ComputedRef<number>,
) {
    const { isDark } = useGlobalDark();
    bumpProbeEpochOnMount();

    const safeAccentCss = computed(() =>
        certifyAccentInk(cssColorOpaque.value, ambientLightness.value),
    );

    const needsAdjustment = computed(() => {
        return safeAccentCss.value !== cssColorOpaque.value;
    });

    // The de-emphasis rung (F-4): floor-clamped certified ink for the resting
    // plate — the boot writer stamps it as `--ink-muted` (the plate-caption /
    // parse-echo voice; post-hoc opacity de-emphasis is retired).
    const mutedInkCss = computed(() =>
        resolveMutedInk(
            surfaceLightnessNow(
                "resting",
                ambientLightness.value,
                isDark.value,
            ),
            isDark.value,
        ),
    );

    return { safeAccentCss, needsAdjustment, mutedInkCss };
}

/**
 * Reactive composable that provides a `safeCss(color)` function for
 * converting any CSS color string to a certified-ink variant against the
 * SURFACE the consumer actually sits on (D6): pass the D1 rung — `"floating"`
 * for menu/dock chrome, `"resting"` for plate-seated ink, `"well"` for the
 * opaque tone-step — and the referent composites the live ambient through
 * that rung's alpha. Defaults to the page ambient.
 *
 * Injects the atmosphere's live derived lightness (INK_AMBIENT_KEY — provided
 * by the boot writer); a missing provider is a wiring defect, surfaced loudly.
 */
export function useSafeAccentFn(surface: InkSurface = "page") {
    const { isDark } = useGlobalDark();
    const ambient = inject(INK_AMBIENT_KEY)!;
    bumpProbeEpochOnMount();

    function safeCss(css: string): string {
        return certifyAccentInk(
            css,
            surfaceLightnessNow(surface, ambient.value, isDark.value),
        );
    }

    return { safeCss };
}

/**
 * The surface referent as a one-shot read (live-probe-first) — for
 * composables that fold the referent into their own computation
 * (`useMarkdownColors`) rather than certifying a whole color through
 * `safeCss`. Same instrument, same model degenerate.
 */
export function resolveSurfaceLightnessLive(
    surface: InkSurface,
    ambientL: number,
    dark: boolean,
): number {
    return surfaceLightnessNow(surface, ambientL, dark);
}
