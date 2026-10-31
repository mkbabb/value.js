import {
    computed,
    getCurrentInstance,
    inject,
    onMounted,
    ref,
    type ComputedRef,
    type Ref,
} from "vue";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { usePreferredContrast } from "@vueuse/core";
import { convertColor, mixColors, parseCssColor, xyz, type Color } from "@mkbabb/value.js/color";
import { parseColorIn } from "./color-utils";
import { INK_AMBIENT_KEY, INK_PLATE_REFERENT_KEY } from "./keys";
import {
    certifyAccentInk,
    certifyIdentityInk,
    GRAPHICS_CONTRAST_FLOOR,
    resolveMutedInk,
    resolvePaintedLightness,
    resolvePlateInk,
    resolveSurfaceLightness,
    type InkContrast,
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
// (color-mix, tint knob and all) to a concrete color+alpha. In non-browser
// contexts (jsdom — no resolved cascade) the resolver yields null and the static
// producer MODEL in `./ink` serves; the O-18 census enforces the live path in
// the real browser. The dock band has NO model (X.W8.d · G-13): it is probed
// off the element that actually paints it (`useChromeAccentFn`, below), and an
// unmeasurable band is a loud defect, never a silent static rung.

/** A live-probed layer: a material rung, or the modal scrim beneath one. */
type LiveLayer = InkSurface | "scrim";

const TIER_BG_TOKEN: Partial<Record<LiveLayer, string>> = {
    resting: "--glass-plate-resting",
    floating: "--glass-plate-floating",
    // V16-01: a modal's plate is glass's floating material, over the scrim.
    modal: "--glass-plate-floating",
    scrim: "--overlay-scrim",
    well: "--well-bg",
};

/**
 * The probe EPOCH — the connection-truth signal for the live instrument. A
 * consumer's first `computed` evaluation runs while Vue is still building the
 * subtree DETACHED (elements insert bottom-up on initial mount), so a
 * `document.querySelector(".dock-plate")` read at that instant misses the
 * dock band and the cached computed would carry the static-model referent
 * FOREVER (the resume-run's earned catch: the light-scheme profile trigger
 * certified against the model's 0.90 while the REAL band composited 0.75 —
 * 3.59:1 measured). Every live read tracks this ref; every consumer bumps it
 * from its own `onMounted` — Vue's "the DOM is now connected" signal — so the
 * probes re-drive through ordinary reactivity. No polling, no workaround.
 */
const probeEpoch = ref(0);
/**
 * OD19 repair 1 (C1-V-05): a probe has MISSED since the last bump — a live
 * read found no painted referent (the subtree was still detached, or no
 * cascade was mounted). The bump re-drives exactly those reads. A mount
 * whose consumers all read a referent that was already measured has nothing
 * to re-drive: the recipe is scheme-scoped (the stamps below), so bumping
 * anyway invalidated every tint memo in the app and re-ran every live-ink
 * computed inside the incoming pane's mount frame (measured on the Home →
 * Gradient switch: 60–70 ms of `useContrastSafeColor`/`ink`/colour parsing
 * in an 89–109 ms frame, ANGLE-Metal, `value/after/repair-1/v05/`).
 */
let probeMissed = true;
export function bumpProbeEpochOnMount(): void {
    // Composables may be exercised outside a component (unit probes) — the
    // epoch is a mount-truth signal, so no instance simply means no bump.
    // EXPORTED (T.W6.5-P): a component that folds `resolveSurfaceLightnessLive`
    // into its OWN computed (the ConsoleRail idiom) is a live-instrument
    // consumer like any other — it must register the mount bump from its
    // setup, or its first (possibly detached/pre-style) probe result caches
    // until some OTHER consumer happens to bump the epoch.
    if (getCurrentInstance())
        onMounted(() => {
            if (!probeMissed) return;
            probeMissed = false;
            probeEpoch.value++;
        });
}

/**
 * Resolve a computed CSS colour to sRGB (0–255) + alpha, EXACTLY: the
 * library parses the string the cascade computed (`color(srgb … / α)`,
 * `rgb()`, `oklch()` …) — the plate recipe as the browser composites it.
 *
 * X.W11.h1 (O18-712 · C-3): the former instrument re-read the colour off a
 * 1×1 canvas (dual-ground draws). Every channel came back as a byte and was
 * divided by the alpha, so a low-alpha plate was mis-read by up to 0.5/α
 * bytes per channel: glass 10's dark resting plate (α 0.18,
 * `color(srgb 0.0928 0.0504 0.0088)`) read `rgb(22.2 11.1 0)` at α 0.1804,
 * a ground darker than the one painted, and the walk certified the raw
 * ink at 5.751:1 against a plate it actually reads 5.727:1 on (the census
 * measured 5.74 under the 5.75 target). Reading the computed value removes
 * the quantization, so the walk measures the ground it paints on.
 *
 * Null when nothing is measurable: an empty or unparsable computed value
 * (jsdom resolves no `var()` cascade), where the static producer model in
 * `./ink` serves (the dock band has no model and fails loudly instead).
 */
function resolveCssColorAlpha(
    css: string,
): { r: number; g: number; b: number; alpha: number } | null {
    if (!css) return null;
    const parsed = parseCssColor(css);
    if (!parsed.ok) return null;
    const srgb = convertColor(parsed.value, "rgb");
    if (!srgb.ok) return null;
    const [r, g, b] = srgb.value.channels;
    const alpha = srgb.value.alpha;
    if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number" || typeof alpha !== "number") {
        return null;
    }
    if (alpha <= 0) return { r: 0, g: 0, b: 0, alpha: 0 };
    return { r, g, b, alpha };
}

/** The opaque OKLCh colour of an sRGB triple, memoized (library-resolved,
 *  never local math) — a live layer's colour for the sRGB composite. The
 *  key is the exact triple: rounding it to bytes would re-introduce the
 *  quantization the resolver above removes. */
const tintColorCache = new Map<string, Color<"oklch">>();
function srgbColor(r: number, g: number, b: number): Color<"oklch"> {
    const key = `${r} ${g} ${b}`;
    const hit = tintColorCache.get(key);
    if (hit !== undefined) return hit;
    const color = parseColorIn(`rgb(${key})`, "oklch");
    tintColorCache.set(key, color);
    if (tintColorCache.size > 512) tintColorCache.clear();
    return color;
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

/**
 * X.W11.p4e N-I1 (COHESION §0gt.2): one probe per distinct tier token, each
 * painting `var(<token>)` from the moment it is created. A tier's live tint
 * is read off its own probe, so reading every tier writes no style: the
 * first `getComputedStyle` of a batch pays the one style recalc, and the
 * rest read the same resolved cascade.
 */
const TOKEN_TIERS = Object.keys(TIER_BG_TOKEN) as LiveLayer[];
const tokenProbes = new Map<string, HTMLElement>();
function tokenProbeEl(token: string): HTMLElement | null {
    if (typeof document === "undefined") return null;
    let probe = tokenProbes.get(token);
    if (!probe || !probe.isConnected) {
        probe = document.createElement("div");
        probe.setAttribute("data-ink-probe", "");
        probe.style.cssText =
            "position:absolute;width:0;height:0;visibility:hidden;pointer-events:none";
        probe.style.backgroundColor = `var(${token})`;
        document.body.appendChild(probe);
        tokenProbes.set(token, probe);
    }
    return probe;
}

type PaintedColor = NonNullable<ReturnType<typeof resolveCssColorAlpha>>;

/** An element's own painted background — null when it paints nothing (α 0)
 *  or nothing can be measured (no canvas). */
function paintedColor(el: Element): PaintedColor | null {
    const c = resolveCssColorAlpha(getComputedStyle(el).backgroundColor);
    return c && c.alpha > 0 ? c : null;
}

/**
 * The dock band's LIVE tint, rooted on the element that actually paints it
 * (X.W8.d · G-13 — the veil walk below, generalised). Glass 10 paints the
 * band on a `.dock-plate` layer CHILD of the dock (`position: absolute;
 * inset: 0; z-index: -1`), never on `.glass-dock` itself (transparent), so
 * the walk climbs from the consumer's own element and, at each ancestor,
 * reads the ancestor's own paint or its plate layer's. The return is
 * NON-optional: a band that cannot be measured is a wiring defect, surfaced
 * loudly — there is no static rung for it to fall back to.
 */
function resolveDockPlateTint(from: Element): SurfaceTint {
    for (let n: Element | null = from; n && n !== document.body; n = n.parentElement) {
        const plate = n.querySelector(":scope > .dock-plate");
        const c = paintedColor(n) ?? (plate ? paintedColor(plate) : null);
        if (c) return { color: srgbColor(c.r, c.g, c.b), alpha: c.alpha };
    }
    throw new Error(
        "useChromeAccentFn: no painted dock band above the host element — the chrome referent is unmeasurable",
    );
}

/** A painted computed background as a tint — undefined when unmeasurable. */
function tintOfBackground(bg: string | undefined): SurfaceTint | undefined {
    if (!bg) return undefined;
    const resolved = resolveCssColorAlpha(bg);
    if (!resolved || resolved.alpha === 0) return undefined;
    return {
        color: srgbColor(resolved.r, resolved.g, resolved.b),
        alpha: resolved.alpha,
    };
}

/** A token tier's LIVE painted tint, read off its own probe. */
function resolveTokenTint(surface: LiveLayer): SurfaceTint | undefined {
    const token = TIER_BG_TOKEN[surface];
    const probe = token ? tokenProbeEl(token) : null;
    return probe ? tintOfBackground(getComputedStyle(probe).backgroundColor) : undefined;
}

/** Read the veil's LIVE painted tint (recipe truth) — null when unmeasurable. */
function resolveVeilTint(): SurfaceTint | undefined {
    // T.W6.5-P (T-34): the veil is an IN-PLATE fixture — TWO alpha
    // layers (the veil recipe over its host plate) sit between its ink
    // and the ambient, and BOTH recipes are SUBTREE-LOCAL (the W55
    // adaptive `--glass-tint-*` axis retunes per-card, so a body-level
    // probe reads the wrong cascade — probed live: root-context veil
    // L 0.34/α 0.60 vs the card-context 0.41/0.63). So the veil is
    // probed off the MOUNTED element itself (the dock band's
    // `.dock-plate` precedent): the Card stamps `data-surface="veil"`, its painted
    // recipe + its nearest painted ancestor (the resting plate) are
    // composited A-over-B in sRGB — the SAME alpha-composite model the
    // O-18 census measures with — into ONE effective tint. A per-layer
    // OKLab-L linear mix diverges past the certification headroom at
    // two stacked layers (probed live: 4.30:1 measured vs the 5.75
    // walked target). Pre-mount the resolver yields undefined (the
    // static model serves); the consumer's mount-epoch bump re-drives.
    const host = document.querySelector<HTMLElement>(
        '[data-surface="veil"]',
    );
    if (!host) return undefined;
    const veil = paintedColor(host);
    if (!veil) return undefined;
    let plate: PaintedColor | null = null;
    for (
        let n = host.parentElement;
        n && n !== document.body;
        n = n.parentElement
    ) {
        plate = paintedColor(n);
        if (plate) break;
    }
    if (plate) {
        const aOut = veil.alpha + plate.alpha * (1 - veil.alpha);
        const mix = (a: number, b: number) =>
            (veil.alpha * a + plate.alpha * b * (1 - veil.alpha)) / aOut;
        return {
            color: srgbColor(
                mix(veil.r, plate.r),
                mix(veil.g, plate.g),
                mix(veil.b, plate.b),
            ),
            alpha: aOut,
        };
    }
    return { color: srgbColor(veil.r, veil.g, veil.b), alpha: veil.alpha };
}

/**
 * The tint cache — the RECIPE is scheme/epoch-scoped, never per-frame. A
 * tier's painted tint changes only when the scheme class flips or the token
 * cascade changes (an epoch event); the AMBIENT is what moves per frame. An
 * uncached probe would interleave `getComputedStyle` + canvas readbacks with
 * the boot writer's per-frame root `setProperty` writes — a forced style
 * recalc EVERY drag frame (the §6.2 frame budgets are the gate this
 * protects). Validity is stamped from DOM truth (the root `.dark` class at
 * probe time), so a probe that raced a scheme flip self-corrects on the next
 * reactive recompute — same self-healing as the uncached read, ~zero cost.
 */
interface TintCacheEntry {
    darkClass: boolean;
    epoch: number;
    tint: SurfaceTint | undefined;
    /** The entry was filled for a sibling tier and no caller has read it yet. */
    unread?: boolean;
}
const liveTintCache = new Map<LiveLayer, TintCacheEntry>();
function resolveLiveTintCached(surface: LiveLayer): SurfaceTint | undefined {
    if (typeof document === "undefined" || surface === "page") return undefined;
    const darkClass = document.documentElement.classList.contains("dark");
    const epoch = probeEpoch.value;
    const hit = liveTintCache.get(surface);
    if (hit && hit.darkClass === darkClass && hit.epoch === epoch) {
        if (hit.unread) {
            hit.unread = false;
            if (hit.tint === undefined) probeMissed = true;
        }
        return hit.tint;
    }
    if (surface === "veil") {
        const tint = resolveVeilTint();
        if (tint === undefined) probeMissed = true;
        liveTintCache.set(surface, { darkClass, epoch, tint });
        return tint;
    }
    // X.W11.p4e N-I1 (COHESION §0gt.2): ONE live referent read per ink region.
    // A region certifies a run of inks across the token tiers (the root inks:
    // resting, floating, modal over its scrim), and stamps a root token
    // between each, so a tier read on first use landed after the previous
    // ink's write and forced a whole-document style recalc of its own (the
    // `.p4d` profile: 102 of the region's 189 ms). The first miss now reads
    // every token tier in one pass, with no write between the reads, and
    // caches them together under the same scheme/epoch stamp: one recalc per
    // region. A sibling tier's entry counts as a miss on its first read when
    // it measured nothing, exactly as its own read would have.
    // Every probe exists before the first read: a probe inserted between two
    // reads would dirty the style the first one resolved.
    for (const tier of TOKEN_TIERS) tokenProbeEl(TIER_BG_TOKEN[tier]!);
    let tint: SurfaceTint | undefined;
    for (const tier of TOKEN_TIERS) {
        const read = resolveTokenTint(tier);
        if (tier === surface) tint = read;
        liveTintCache.set(tier, { darkClass, epoch, tint: read, unread: tier !== surface });
    }
    if (tint === undefined) probeMissed = true;
    return tint;
}

/**
 * The certified accent, memoised per (colour, ground, floor) (OD19-V3).
 * `certifyAccentInk` is a pure WCAG walk, and one colour frame asks it the
 * same question from several consumers: the boot writer's `safeAccentCss`
 * and the Nutrition label both certify the live pick on the resting rung,
 * and the profile menu and the mobile menu both certify it on the floating
 * rung. The walk runs once per distinct question; the answer is the walk's
 * own string, so every consumer reads exactly what it read before. Bounded
 * like the tint colour cache: a drag asks new questions every frame.
 */
const certifiedCache = new Map<string, string>();
function certifyAccentInkOnce(css: string, surfaceL: number, floor?: number): string {
    const key = `${css}|${surfaceL}|${floor ?? ""}`;
    const hit = certifiedCache.get(key);
    if (hit !== undefined) return hit;
    const safe = certifyAccentInk(css, surfaceL, floor);
    if (certifiedCache.size >= 64) certifiedCache.clear();
    certifiedCache.set(key, safe);
    return safe;
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
    return resolveSurfaceLightness(
        surface,
        ambientL,
        dark,
        resolveLiveTintCached(surface),
        // The veil is an IN-PLATE fixture (T-34): its underlay referent is
        // the RESTING plate's live tint — `resolveSurfaceLightness` composes
        // plate-over-ambient first, then the veil tint over the plate. A
        // modal's underlay is the scrim (V16-01), composed the same way. The
        // well is an in-plate wash over the resting plate too (§0gv.6).
        surface === "veil" || surface === "well"
            ? resolveLiveTintCached("resting")
            : surface === "modal"
              ? resolveLiveTintCached("scrim")
              : undefined,
    );
}

/**
 * Computes a contrast-safe accent color CSS string from the live picked color,
 * certified against the RESTING PLATE rung (live-composited with the page
 * ambient). ONE app-level instance (the boot writer, `useAtmosphereBoot`)
 * provides the result via SAFE_ACCENT_KEY and mirrors it onto
 * `--accent-live`; it also carries the de-emphasis rung (`mutedInkCss` →
 * `--ink-muted`, certified against the same resting plate — the rung the
 * captions sit on).
 *
 * T.W6.5 row 7 (T-35 · t33-research §5.1a): the referent is the SURFACE RUNG,
 * never the bare page ambient. The accent-voice text population (the space
 * trigger, plate titles, chrome labels) sits on the material ladder, whose
 * rungs composite the ambient AWAY from mid-lightness — against the former
 * raw mid-ambient referent (L ≈ 0.51 at the owner URL) NO mid-chroma color
 * clears the floor and the walk degenerated to the L extreme (the cream
 * collapse). Page-rung consumers keep their own referent through
 * `useSafeAccentFn("page")`.
 *
 * @param cssColorOpaque   the rAF-coalesced live OPAQUE colour
 * @param ambientLightness the atmosphere's live derived lightness (M-15)
 * @param plateReferent    the field referent of the primary plate pair
 *                         (§0gx.2, `resolveFieldPlateReferent`)
 */
export function useContrastSafeColor(
    cssColorOpaque: ComputedRef<string>,
    ambientLightness: ComputedRef<number>,
    plateReferent: ComputedRef<number> = ambientLightness,
) {
    const { isDark } = useGlobalDark();
    bumpProbeEpochOnMount();
    // X.W11.n2 (COHESION §0gy.5, SS8-0363): `prefers-contrast: more` certifies
    // the neutral plate pairs (resting, floating, modal) at the guard's
    // ceiling, so the elevated-contrast layer never lowers a plate ink's ratio
    // (`ink.ts` `certifyFor`). Identity inks keep their hue law.
    const preferredContrast = usePreferredContrast();
    const plateContrast = computed<InkContrast>(() =>
        preferredContrast.value === "more" ? "more" : "no-preference",
    );

    const safeAccentCss = computed(() =>
        certifyAccentInkOnce(
            cssColorOpaque.value,
            surfaceLightnessNow(
                "resting",
                ambientLightness.value,
                isDark.value,
            ),
        ),
    );

    const needsAdjustment = computed(() => {
        return safeAccentCss.value !== cssColorOpaque.value;
    });

    // The resting plate over the ambient: the identity inks' ground (the
    // destructive red and the gold keep their hue on it).
    const restingL = computed(() =>
        surfaceLightnessNow("resting", ambientLightness.value, isDark.value),
    );
    // §0gx.2: the resting plate over the field's maximin referent — the ONE
    // referent both plate inks certify against, so the pair takes one polarity.
    const plateL = computed(() =>
        surfaceLightnessNow("resting", plateReferent.value, isDark.value),
    );

    // The primary plate ink (X-DS pass 4 · V4C-01): the scheme foreground,
    // certified against the plate — the ONE polarity decision. The boot
    // writer stamps it as `--ink-primary`; `shell.css` seats it as the
    // in-plate `--foreground`.
    const plateInkCss = computed(() => resolvePlateInk(plateL.value, isDark.value, plateContrast.value));

    // The de-emphasis rung (F-4): a floor-clamped step of the primary plate ink
    // (same pole, never flipped on its own) — the boot writer stamps it as
    // `--ink-muted` (the plate-caption / parse-echo voice; post-hoc opacity
    // de-emphasis is retired).
    const mutedInkCss = computed(() => resolveMutedInk(plateL.value, isDark.value, plateContrast.value));

    // X-DS pass 5 (V5C-02): the SAME certified pair, against the FLOATING
    // plate. Reka portals menus and popovers to <body>, outside the
    // `.pane-wrapper` seat, so they need their own referent: the floating
    // rung composited over the same ambient. The boot writer stamps them as
    // `--ink-floating-primary` / `--ink-floating-muted`; `shell.css` seats
    // them on glass's floating plate.
    const floatingL = computed(() =>
        surfaceLightnessNow("floating", ambientLightness.value, isDark.value),
    );
    const floatingPlateL = computed(() =>
        surfaceLightnessNow("floating", plateReferent.value, isDark.value),
    );
    const floatingInkCss = computed(() => resolvePlateInk(floatingPlateL.value, isDark.value, plateContrast.value));
    const floatingMutedInkCss = computed(() =>
        resolveMutedInk(floatingPlateL.value, isDark.value, plateContrast.value),
    );

    // X-DS pass 16 (V16-01): the SAME certified pair, against the MODAL plate.
    // A dialog is glass's floating material too, but it sits on glass's 50 %
    // ink scrim, so in light its ground is dark and the floating pair (solved
    // over the bare ambient) put dark ink on it (1.27:1 read off the frame).
    // The referent is the floating plate over the scrim over the ambient; the
    // boot writer stamps `--ink-modal-primary` / `--ink-modal-muted`, and
    // `shell.css` seats them on the modal root.
    const modalL = computed(() =>
        surfaceLightnessNow("modal", ambientLightness.value, isDark.value),
    );
    const modalInkCss = computed(() => resolvePlateInk(modalL.value, isDark.value, plateContrast.value));
    const modalMutedInkCss = computed(() => resolveMutedInk(modalL.value, isDark.value, plateContrast.value));
    // The destructive verb's red (glass `--destructive`, the scheme's arm of
    // its `light-dark()` pair) certified on the same modal ground: the hue is
    // kept and only the lightness walks (1.65:1 read off the light frame).
    const modalDestructiveInkCss = computed(() =>
        certifyAccentInk(
            schemeTokenCss("--destructive", isDark.value, "hsl(0 72% 50%)"),
            modalL.value,
        ),
    );

    // X-DS pass 18 (V18C-02): the destructive red on the RESTING plate, the
    // modal twin's sibling. The error plate's alert glyph painted glass's raw
    // red at 80 % (1.77:1 read off the light Not Found frame). The hue is kept
    // and only the lightness walks. The token also carries the plate's error
    // LINES (text-destructive inherits it through `.pane-wrapper`), so it is
    // certified at the text floor, which clears the glyph's 3:1 a fortiori.
    // The boot writer stamps `--ink-destructive`.
    const destructiveInkCss = computed(() =>
        certifyAccentInk(
            schemeTokenCss("--destructive", isDark.value, "hsl(0 72% 50%)"),
            restingL.value,
        ),
    );

    // X-DS pass 15 (V15-01): the GOLD identity ink, certified on the same
    // resting plate. Gold (`--color-gold`, luminance 0.45) can never clear a
    // floor against a light plate raw (its ceiling against white is 2.10:1),
    // so the guard keeps its hue and walks only its lightness: a bronze in
    // light, the gold itself where it already clears (dark). The gold paints a
    // GLYPH (the featured badge's mark, which carries the tier alone at phone
    // width; its words read in the plate's own ink), so its own floor is 3:1;
    // it is certified at the TEXT floor because the modelled plate reads
    // lighter than a saturated aurora patch under a card: at the graphics
    // floor the frame measured 2.64:1, at the text floor 3.45:1
    // (evidence/DS/value/pass-15/v15.json). The boot writer stamps `--ink-gold`.
    // X-DS pass 18 (V18C-01): the walk holds the hue (`certifyIdentityInk`):
    // where clearing the floor would drain gold to a pole, the far side or
    // the plate's own ink answers instead of a hueless "gold".
    const goldInkCss = computed(() =>
        certifyIdentityInk(goldIdentityCss(isDark.value), restingL.value, isDark.value),
    );
    // X-DS pass 17 (V17C-01): its floating twin. The view menu's "Admin" row
    // sits on glass's floating plate (portaled to <body>), so it certifies on
    // the floating rung, the same way the floating ink pair does; the boot
    // writer stamps `--ink-gold-floating`, and `shell.css` seats it as
    // `--ink-gold` on the floating plate.
    const floatingGoldInkCss = computed(() =>
        certifyIdentityInk(goldIdentityCss(isDark.value), floatingL.value, isDark.value),
    );
    // X-DS pass 18 (V18C-01): the GLYPH rung of both twins. A glyph keeps the
    // word's gold wherever that gold holds its chroma: these plates are
    // MODELLED, and at the 3:1 floor the featured badge's mark read 2.67:1
    // off the light frame (pass 15 read 2.64), where the word's rung reads
    // 3.45. Where the word falls back to the plate's ink, the glyph drops to
    // the graphics floor, so the mark (the badge, the menu's shield) keeps
    // the gold. The boot writer stamps `--ink-gold-glyph` /
    // `--ink-gold-floating-glyph`.
    const glyphRung = (word: string, surfaceL: number) =>
        word !== resolvePlateInk(surfaceL, isDark.value)
            ? word
            : certifyIdentityInk(goldIdentityCss(isDark.value), surfaceL, isDark.value, GRAPHICS_CONTRAST_FLOOR);
    const goldGlyphInkCss = computed(() =>
        glyphRung(goldInkCss.value, restingL.value),
    );
    const floatingGoldGlyphInkCss = computed(() =>
        glyphRung(floatingGoldInkCss.value, floatingL.value),
    );

    return {
        safeAccentCss,
        needsAdjustment,
        plateInkCss,
        mutedInkCss,
        floatingInkCss,
        floatingMutedInkCss,
        modalInkCss,
        modalMutedInkCss,
        modalDestructiveInkCss,
        destructiveInkCss,
        goldInkCss,
        floatingGoldInkCss,
        goldGlyphInkCss,
        floatingGoldGlyphInkCss,
    };
}

/** The gold identity hue as the cascade paints it in this scheme
 *  (`--color-gold`, which glass publishes as a `light-dark()` pair; the demo's
 *  `@theme` literal where no cascade is mounted). */
export function goldIdentityCss(dark: boolean): string {
    return schemeTokenCss("--color-gold", dark, "#D4AF37");
}

/** A root colour token as this scheme paints it (one arm of a `light-dark()`
 *  pair), or `fallback` where no cascade is mounted.
 *
 *  OD19-V3: these tokens are scheme constants, but their callers are colour
 *  computeds, so an unmemoised read ran `getComputedStyle` once per colour
 *  frame, after that frame's root `setProperty` writes, forcing a full style
 *  recalc (839 ms of `getPropertyValue` over one drag). The cascade is read
 *  once per token per scheme, the tint cache's idiom above: the memo is
 *  dropped when the scheme flips, stamped from DOM truth (the root `.dark`
 *  class) as well as the caller's `dark`, so a read that raced the class flip
 *  self-corrects, and by the probe epoch, so a pre-mount read re-drives. An
 *  empty read (no cascade mounted yet) is not memoised. */
const schemeTokenMemo = new Map<string, string>();
/** X.W11.cut (COHESION §0gx.3): the scheme tokens are read together. `--color-gold`
 *  is first asked for in the dock's setup, on a clean style (2 ms at 4×), and
 *  `--destructive` was first asked for in the certify task, after that task's
 *  root writes, where the read forced a recalculation of the whole document
 *  (26 ms at 4×, `close/evidence/browser/cut-2026-10-30/`). One read serves both,
 *  with the same values and the same invalidation. */
const SCHEME_TOKENS = ["--color-gold", "--destructive"];
let schemeTokenStamp = "";
function schemeTokenCss(token: string, dark: boolean, fallback: string): string {
    if (typeof document === "undefined") return fallback;
    const stamp = `${dark}|${document.documentElement.classList.contains("dark")}|${probeEpoch.value}`;
    if (stamp !== schemeTokenStamp) {
        schemeTokenMemo.clear();
        schemeTokenStamp = stamp;
    }
    let live = schemeTokenMemo.get(token);
    if (live === undefined) {
        const root = getComputedStyle(document.documentElement);
        for (const name of [token, ...SCHEME_TOKENS]) {
            const read = root.getPropertyValue(name).trim();
            if (read) schemeTokenMemo.set(name, read);
        }
        live = schemeTokenMemo.get(token) ?? "";
        if (!live) probeMissed = true;
    }
    return lightDarkArm(live, dark) || fallback;
}

/** One arm of a `light-dark(a, b)` value (the value itself when it is not one). */
function lightDarkArm(css: string, dark: boolean): string {
    const m = /^light-dark\((.*)\)$/s.exec(css);
    if (!m) return css;
    const body = m[1]!;
    let depth = 0;
    for (let i = 0; i < body.length; i++) {
        const ch = body[i];
        if (ch === "(") depth++;
        else if (ch === ")") depth--;
        else if (ch === "," && depth === 0) {
            return (dark ? body.slice(i + 1) : body.slice(0, i)).trim();
        }
    }
    return css;
}

/**
 * Reactive composable that provides a `safeCss(color)` function for
 * converting any CSS color string to a certified-ink variant against the
 * SURFACE the consumer actually sits on (D6): pass the D1 rung — `"floating"`
 * for menu chrome, `"resting"` for plate-seated ink, `"well"` for the
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

    /** @param floor optional WCAG floor override — pass
     *  `GRAPHICS_CONTRAST_FLOOR` (3) for non-text ink (WCAG 1.4.11: slider
     *  tracks, rails — the T-44a rung); defaults to the 4.5 text floor. */
    function safeCss(css: string, floor?: number): string {
        return certifyAccentInkOnce(
            css,
            surfaceLightnessNow(surface, ambient.value, isDark.value),
            floor,
        );
    }

    return { safeCss };
}

/**
 * The dock band's certified ink (X.W8.d · G-13). The band has no static
 * model, so the referent is the tint MEASURED off the element that paints the
 * band above `host` (`resolveDockPlateTint`). Before `host` mounts nothing is
 * measured and `safeCss` makes no ink claim (`undefined`: the binding drops
 * out); once mounted, the template-ref write re-drives the reactive caller.
 * The tint is cached per (host, scheme class, probe epoch) — the recipe is
 * scheme/epoch-scoped, the ambient is what moves per frame (see the tint
 * cache above).
 */
export function useChromeAccentFn(host: Readonly<Ref<Element | null>>) {
    const { isDark } = useGlobalDark();
    const ambient = inject(INK_AMBIENT_KEY)!;
    // §0gx.2: the band's voice certifies on the field's maximin referent; the
    // identity hue keeps the ambient. A host with no atmosphere has only the ambient.
    const referent = inject(INK_PLATE_REFERENT_KEY, ambient);
    bumpProbeEpochOnMount();

    let cached: { el: Element; dark: boolean; epoch: number; tint: SurfaceTint } | undefined;
    function bandTint(el: Element, dark: boolean): SurfaceTint {
        const epoch = probeEpoch.value;
        if (cached?.el !== el || cached.dark !== dark || cached.epoch !== epoch) {
            cached = { el, dark, epoch, tint: resolveDockPlateTint(el) };
        }
        return cached.tint;
    }

    function safeCss(css: string, floor?: number): string | undefined {
        const el = host.value;
        if (!el) return undefined;
        return certifyAccentInkOnce(
            css,
            resolvePaintedLightness(referent.value, bandTint(el, isDark.value)),
            floor,
        );
    }

    /** X-DS pass 18 (V18C-01): an identity hue on the band, its chroma held
     *  (`certifyIdentityInk`). */
    function identityCss(css: string, floor: number): string | undefined {
        const el = host.value;
        if (!el) return undefined;
        return certifyIdentityInk(
            css,
            resolvePaintedLightness(ambient.value, bandTint(el, isDark.value)),
            isDark.value,
            floor,
        );
    }

    /** X-DS pass 19 (V19C-02): the band's own plate ink (the one polarity
     *  decision, `resolvePlateInk`), certified on the same measured ground:
     *  the dock's plain words read it, as the gold's last rung already does. */
    function plateCss(): string | undefined {
        const el = host.value;
        if (!el) return undefined;
        return resolvePlateInk(
            resolvePaintedLightness(referent.value, bandTint(el, isDark.value)),
            isDark.value,
        );
    }

    return { safeCss, identityCss, plateCss };
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

// --- THE FLOATING PAIR OVER ITS REAL GROUND (X.W11.f1 · COHESION §0gr.2) ----
//
// `floatingL` above composites the floating rung over the BARE ambient: the
// right referent for a floater over the page field. A floater that sits over
// painted content is certified against the composite it ACTUALLY sits on
// (the §0gk.2 referent law): the live floating rung laid over every ground
// region under its text. ESC-SS8r-0039 measured the light rail tooltip over
// the channel ramps at WCAG luminance 0.09–0.16, where the bare-ambient pair
// (the dark pole, L 0.018) read 2.80–3.39:1 and only the light pole clears.

/** A CSS colour in `space`, library-parsed; a malformed ground is loud. */
function parseStrict<S extends "rgb" | "xyz" | "oklch">(css: string, space: S): Color<S> {
    const parsed = parseCssColor(css);
    if (!parsed.ok) throw new Error(`Ground colour unparseable: ${css}`);
    const out = convertColor(parsed.value, space);
    if (!out.ok) throw new Error(`Ground colour failed: ${out.error.code}`);
    return out.value;
}

/** sRGB white in XYZ — the neutral axis a luminance-equivalent grey sits on. */
let whiteXyz: readonly number[] | undefined;
function neutralLightnessOfY(Y: number): number {
    if (!whiteXyz) whiteXyz = parseStrict("white", "xyz").channels as readonly number[];
    const grey = xyz(whiteXyz[0]! * Y, Y, whiteXyz[2]! * Y, 1);
    if (!grey.ok) throw new Error(`Ground lightness failed: ${grey.error.code}`);
    const L = convertColor(grey.value, "oklch");
    if (!L.ok) throw new Error(`Ground lightness failed: ${L.error.code}`);
    return L.value.channels[0] as number;
}

/**
 * The ground a painted colour presents to ink: the OKLab L of the NEUTRAL
 * with its WCAG luminance (the achromatic stand-in the ink walk certifies
 * against; `ink.ts` `luminanceLightness` is the field-stop twin). A
 * translucent colour is first laid over `under` (source-over, sRGB — the
 * browser's paint), so an alpha ramp stop reads over the checker it shows.
 */
export function groundLightness(css: string, under?: string): number {
    let color: Color<"rgb"> = parseStrict(css, "rgb");
    if (under !== undefined && typeof color.alpha === "number" && color.alpha < 1) {
        const ground = parseStrict(under, "rgb");
        const mixed = mixColors(ground, { ...color, alpha: 1 }, color.alpha, { space: "rgb" });
        if (!mixed.ok) throw new Error(`Ground composite failed: ${mixed.error.code}`);
        color = mixed.value;
    }
    const Y = convertColor(color, "xyz");
    if (!Y.ok) throw new Error(`Ground lightness failed: ${Y.error.code}`);
    return neutralLightnessOfY(Math.max(0, Y.value.channels[1] as number));
}

/** A colour expression as the live cascade paints it (`var()`, `color-mix()`),
 *  read off the hidden tier probe; `undefined` where no cascade is mounted. */
export function resolvePaintCss(expr: string): string | undefined {
    const probe = probeEl();
    if (!probe) return undefined;
    probe.style.backgroundColor = expr;
    const css = getComputedStyle(probe).backgroundColor;
    probe.style.backgroundColor = "";
    return css || undefined;
}

/**
 * The floating pair (title + caption) certified against the real composite:
 * the live floating rung laid over each ground lightness under the floater's
 * text. ONE pair-wide polarity, chosen by the real referent and never per
 * line (§0gm.4): a light ink is worst over the LIGHTEST composited region, a
 * dark ink over the DARKEST, so each pole is certified against its own worst
 * region, and the pole that clears it wins. The scheme's own pole is kept
 * wherever it clears. Where neither pole clears every region (a ground that
 * spans the mid-luminance dead band), the scheme's pole is walked against its
 * worst region — the best the ground admits, the floor's failure left visible
 * to the census rather than hidden.
 */
export function resolveFloatingPairOver(
    grounds: readonly number[],
    dark: boolean,
): { primary: string; muted: string } {
    const composited = grounds.map((L) => surfaceLightnessNow("floating", L, dark));
    const lightest = Math.max(...composited);
    const darkest = Math.min(...composited);
    // A pole "holds" when the walk certified from its seed stays on its side
    // of its own worst region (it never had to cross to the other pole).
    const inkL = (css: string) => parseStrict(css, "oklch").channels[0] as number;
    const lightHolds = inkL(resolvePlateInk(lightest, true)) > lightest;
    const darkHolds = inkL(resolvePlateInk(darkest, false)) < darkest;
    const lightPole = dark ? lightHolds || !darkHolds : lightHolds && !darkHolds;
    const referent = lightPole ? lightest : darkest;
    return {
        primary: resolvePlateInk(referent, lightPole),
        muted: resolveMutedInk(referent, lightPole),
    };
}
