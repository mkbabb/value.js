/**
 * useAtmosphereBoot — the demo's atmosphere + accent-token boot region, lifted
 * from App.vue at S.W5 (row-8 god-module cap: App.vue had grown past 400 LoC
 * with the W6 atmosphere/entrance work). MUST be called during component setup:
 * it `provide`s SAFE_ACCENT_KEY (and, via useAtmosphere, AURORA_ATOMS_KEY +
 * BLOB_CONFIG_KEY) and installs the root-document token watchers — so App.vue
 * keeps only the canvas mount + the picker's synchronous CSS_COLOR_KEY provide.
 *
 * It owns the three atmosphere/entrance side-effects that write the document
 * root:
 *
 *   1. THE ACCENT AXIS (R.W3 Lane A / A2) — the contrast-guarded live colour is
 *      mirrored onto the `--accent-live` root token (the SAME library
 *      `safeAccentColor` computation SAFE_ACCENT_KEY provides — ONE
 *      color-resolution path, inv-N-3; no bespoke resolver). style.css re-points
 *      `--primary` and the glass frost's `--glass-tint-source` onto it, so the
 *      interactive layer and the plate temperature speak the picked colour.
 *      W3-1 (S.W3): the contrast solve runs off the rAF-coalesced colour (one
 *      solve/frame under a drag); the picker keeps the synchronous
 *      `cssColorOpaque` via CSS_COLOR_KEY, provided by App.
 *      T.W3-5 (D6, the M-15 thread): the solve's referent is the atmosphere's
 *      LIVE `derivedLightness` (provided onward via INK_AMBIENT_KEY), and the
 *      same instance stamps `--ink-muted` — the floor-clamped plate
 *      de-emphasis rung (the BG_LIGHTNESS constants are retired everywhere).
 *
 *   2. THE PER-VIEW ACCENT (S.W7 · W7-4, superseding R.W4 B2's CSS
 *      relative-color derivation) — `useViewAccents` resolves each view's
 *      accent THROUGH THE LIBRARY (rotate hue → low-C floor → gamut-map to
 *      the cusp → L re-guard → WCAG ≥3:1) and writes it as static root
 *      tokens: `--accent-view-<id>` × 9 + the current `--accent-view`
 *      (`--primary` rides it) + `--seal-ink`. The `--view-hue-shift`
 *      relative-color path and its `:root` transition tax are retired
 *      (the W3-7 mechanism decision, consumed here).
 *
 *   3. THE ATMOSPHERE (N.W5.B) — delegated to useAtmosphere (atoms, render-mode
 *      tiering, seed guards, blob ramp); seeded by the same rAF-coalesced colour
 *      so the aurora seed + blob palette derives fire once per frame, not 60×/s
 *      under a slider drag. `auroraArrived` keys the W6-1 canvas derive-in.
 *
 *      W7-3 (luma truth): the atmosphere canvas carries glass-ui's ONE
 *      field-canvas convention stamp `data-glass-field-canvas` (declared in
 *      App's template — attributes are template truth). Every backdrop-
 *      luminance sampler (GlassDock's default-on observer today, any future
 *      glass surface) auto-discovers THIS canvas as its `backgroundCanvas` and
 *      samples the live field; an unreadable/unpainted WebGL readback falls to
 *      the static stack-walk via the producer's L4 alpha-floor cure (glass-ui
 *      `9db65db7`), never a luma-0 lie. One stamp threads the canvas
 *      consistently for every present and future sampling surface.
 */

import { computed, getCurrentScope, onScopeDispose, provide, ref, watch } from "vue";
import type { ComputedRef, Ref, ShallowRef } from "vue";

import { INK_AMBIENT_KEY, SAFE_ACCENT_KEY } from "../../../color-session/keys";
import type { PaneConfig } from "../../../shell/useViewManager";
import { useContrastSafeColor } from "../../../color-session/useContrastSafeColor";
import { useViewAccents } from "./useViewAccents";
import { useAtmosphere } from "./useAtmosphere";

/** OD19 repair 2 (C2-V-01): the quiet interval after the last colour frame
 *  before the ink referent re-publishes (the same interval as the Palettes
 *  ramps' settle, `useViewAccents` RAMP_SETTLE_MS). */
const INK_SETTLE_MS = 120;

/** X.W11.p4c: the longest the first certification waits for an idle period
 *  after first paint (useOverture's B4 open uses the same bound). */
const CERTIFY_IDLE_TIMEOUT_MS = 500;

/** Mirror a certified ink onto its root token, live. */
function stampRootToken(token: string, ink: Readonly<Ref<string>>) {
    watch(
        ink,
        (css) => {
            document.documentElement.style.setProperty(token, css);
        },
        { immediate: true },
    );
}

export function useAtmosphereBoot(
    atmosphereCanvas: Readonly<ShallowRef<HTMLCanvasElement | null>>,
    // W3-1 (S.W3): the rAF-COALESCED opaque colour (`pipeline.cssColorOpaqueFrame`),
    // the seed for BOTH the accent axis and the aurora/blob derives.
    atmosphereColor: ComputedRef<string>,
    // The active view's config — its schema-declared accentHueShift drives the
    // per-view accent token.
    currentConfig: ComputedRef<PaneConfig>,
    // X.W11.p4c (COHESION §0go.2(b)): true when this visit hydrates the
    // prerendered shell (App's `HYDRATES_SHELL`, client side). Its first frame
    // paints the stylesheet's pre-certified inks, so the certification leaves
    // the boot task (see `certifyInks` below).
    { certifyAfterPaint = false }: { certifyAfterPaint?: boolean } = {},
) {
    // X.W11.p4c (COHESION §0go.2(b)) — INK CERTIFICATION LEAVES THE BOOT TASK.
    // Every root ink token below (and the per-view accents) is a WCAG walk;
    // stamped in setup, the walks ran inside the hydration task (the measured
    // ~100 ms of a 239 ms mount at 4× CPU, `.p4b` act 8). When the shell is
    // hydrated, the first frame paints the inks the stylesheet already carries
    // for the shell's default seed, scheme and ground (foundation.css — the
    // pre-certified values, which hold the floors as SS-8 measured them), and
    // the first certification runs after that frame: the frame's rAF, then the
    // next idle period (bounded by a timeout, so a busy boot still certifies
    // promptly). The watchers start inside this component's own scope, so they
    // stop with it. A client-rendered first view (a seeded or stored colour, a
    // non-home route, reduced motion) has no pre-certified shell: it certifies
    // in setup, as before, so its first frame is never painted with another
    // seed's inks. Repeated asks are served by `ink.ts`'s certify memo.
    const scope = getCurrentScope();
    const pending: (() => void)[] = [];
    const certifyInks = (start: () => void) => {
        if (!certifyAfterPaint || !scope) {
            start();
            return;
        }
        // Every certifying region (this one and the per-view accents) starts
        // in the same idle callback, after the same frame.
        pending.push(start);
        if (pending.length > 1) return;
        requestAnimationFrame(() => {
            const run = () => {
                const starts = pending.splice(0);
                if (scope.active) scope.run(() => starts.forEach((s) => s()));
            };
            if ("requestIdleCallback" in window) {
                window.requestIdleCallback(run, { timeout: CERTIFY_IDLE_TIMEOUT_MS });
            } else {
                setTimeout(run, 0);
            }
        });
    };

    // 1 — the atmosphere: aurora + hero-blob palette coupling (provides
    //     AURORA_ATOMS_KEY + BLOB_CONFIG_KEY on the caller's scope). Ordered
    //     FIRST since M-15: the atmosphere exposes the live `derivedLightness`
    //     (the D6 page-ambient referent) BOTH accent resolvers consume.
    const { auroraCssGradient, auroraArrived, derivedLightness: liveLightness } = useAtmosphere(
        atmosphereCanvas,
        atmosphereColor,
    );

    // OD19 repair 2 (C2-V-01 · OD19-V3): THE INK REFERENT SETTLES OFF THE DRAG
    // CLOCK. Every certified ink below is a WCAG walk keyed on this ambient,
    // and the ambient moves with the picked colour, so a picker drag re-walked
    // all of them on every colour frame: the plate, muted, modal, destructive
    // and four gold rungs here, the dock band's gold and plate inks, and every
    // `safeCss` consumer (CDP profile of a 41-step light drag: `certify` 1.84 s
    // inclusive, `certifyIdentityInk` 0.82 s of it). Light paid ~10x dark: on a
    // pale ground the gold cannot hold its chroma at the headroom, so each gold
    // rung runs the headroom bisection, then the 16-step far-side bisection,
    // then the plate ink. The referent now holds while the COLOUR moves and
    // publishes the latest ambient once the input settles (the Palettes ramps'
    // P2 idiom, same interval), so the settled inks are the ones a per-frame
    // walk lands on. Anything else that moves the ambient (a scheme flip, the
    // field arriving) publishes at once. The picked colour's own inks (the live
    // accent, the label and menu inks) still certify every frame, against the
    // held ground.
    const heldLightness = ref(liveLightness.value);
    let inkSettle: ReturnType<typeof setTimeout> | undefined;
    const publishInkAmbient = () => {
        inkSettle = undefined;
        heldLightness.value = liveLightness.value;
    };
    watch([liveLightness, atmosphereColor], ([l, colour], old) => {
        if (!old || colour === old[1]) {
            clearTimeout(inkSettle);
            inkSettle = undefined;
            heldLightness.value = l;
            return;
        }
        if (inkSettle === undefined && l === heldLightness.value) return;
        clearTimeout(inkSettle);
        inkSettle = setTimeout(publishInkAmbient, INK_SETTLE_MS);
    });
    onScopeDispose(() => clearTimeout(inkSettle));
    const derivedLightness = computed(() => heldLightness.value);

    // 2 — the accent axis (W3-5 threads the M-15 exposed value): the live
    //     colour certified against the LIVE ambient — never the retired
    //     BG_LIGHTNESS constants — mirrored onto `--accent-live` and provided
    //     via SAFE_ACCENT_KEY. The ambient referent itself is provided
    //     (INK_AMBIENT_KEY) so tier-seated consumers (`useSafeAccentFn`,
    //     `useMarkdownColors`) key their own rung's composited lightness off
    //     the ONE source. The de-emphasis rung rides the same instance:
    //     `--ink-muted` is the floor-clamped certified plate ink (D6/F-4 —
    //     the plate-caption + parse-echo voice; post-hoc opacity died).
    const {
        safeAccentCss,
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
    } = useContrastSafeColor(
        atmosphereColor,
        derivedLightness,
    );
    provide(SAFE_ACCENT_KEY, safeAccentCss);
    provide(INK_AMBIENT_KEY, derivedLightness);
    certifyInks(() => {
        stampRootToken("--accent-live", safeAccentCss);
        // X-DS pass 4 (V4C-01): the PRIMARY plate ink rides the same instance
        // and the same referent, so the page makes ONE polarity decision per
        // plate. `--ink-muted` is a step of this pole, never an independent flip.
        stampRootToken("--ink-primary", plateInkCss);
        stampRootToken("--ink-muted", mutedInkCss);
        // X-DS pass 5 (V5C-02): the floating plate's pair, the same
        // certification against the floating rung (menus and popovers are
        // portaled to <body>).
        stampRootToken("--ink-floating-primary", floatingInkCss);
        stampRootToken("--ink-floating-muted", floatingMutedInkCss);
        // X-DS pass 16 (V16-01): the modal plate's pair — the floating rung
        // over glass's scrim (a dialog's ground), seated on the modal root.
        stampRootToken("--ink-modal-primary", modalInkCss);
        stampRootToken("--ink-modal-muted", modalMutedInkCss);
        stampRootToken("--ink-modal-destructive", modalDestructiveInkCss);
        // X-DS pass 18 (V18C-02): the resting plate's destructive red.
        stampRootToken("--ink-destructive", destructiveInkCss);
        // X-DS pass 15 (V15-01): the certified gold identity ink, same referent.
        stampRootToken("--ink-gold", goldInkCss);
        // X-DS pass 17 (V17C-01): its floating twin (the menu rows' gold).
        stampRootToken("--ink-gold-floating", floatingGoldInkCss);
        // X-DS pass 18 (V18C-01): the glyph rung of both (the 3:1 graphics floor).
        stampRootToken("--ink-gold-glyph", goldGlyphInkCss);
        stampRootToken("--ink-gold-floating-glyph", floatingGoldGlyphInkCss);
        // The PUBLISHED page-ambient referent (the D6 "tiers publish effective
        // lightness" stake, executed demo-side for the page tier): the exact
        // number every certified ink keyed on, stamped so consumers + the O-18
        // census read the SAME referent the guard used — never a
        // re-derivation. It is stamped with the inks it keyed, never before.
        stampRootToken(
            "--ink-ambient-l",
            computed(() => derivedLightness.value.toFixed(4)),
        );
    });

    // 3 — the per-view accent (W7-4): the library-resolved static tokens —
    //     `--accent-view-<id>` × 9 + `--accent-view` + `--seal-ink` — written
    //     per accent change on the same rAF-coalesced clock. M-15: the WCAG
    //     referent is the atmosphere's live derived lightness, never the
    //     BG_LIGHTNESS constants (retired from this path).
    useViewAccents({
        cssColorOpaque: atmosphereColor,
        safeAccentCss,
        currentConfig,
        derivedLightness,
        certifyInks,
    });

    return { auroraCssGradient, auroraArrived };
}
