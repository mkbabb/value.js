/**
 * useAtmosphere — the app's aurora + blob atmosphere region, lifted from
 * App.vue (R.W4 close, gate-(c) god-module cap). MUST be called during
 * component setup (it `provide`s AURORA_ATOMS_KEY + BLOB_CONFIG_KEY).
 *
 * Aurora atmosphere — THE palette made atmosphere (N.W5.B): the
 * full-viewport background ANSWERS the picker. We drive glass-ui's
 * `AuroraAtoms` door — the ≤7-knob consumer-facing surface — whose `seed`
 * atom derives the atmosphere's OKLCh palette via `deriveAurora` (glass-ui
 * composes it inside `resolveAtoms`). The live picker colour flows into
 * `auroraAtoms.seed`, so the background tracks the chosen colour instead of
 * the static cyan "Sky" default it was frozen on (CH-2 / VAL-1).
 *
 * AuroraPane (provided `AURORA_ATOMS_KEY`) tunes the SHAPE of the atmosphere
 * — harmony, colour energy, zones, noise, medium, motion — while the seed
 * stays the picker's. `resolveAtoms(atoms)` clamps every atom into a valid
 * in-range `AuroraConfig`; `useAurora` deep-watches the getter, so any atom
 * edit (slider drag OR a seed change) re-derives + re-uploads for free.
 */

import { computed, reactive, ref, watch, provide } from "vue";
import type { ComputedRef, ShallowRef } from "vue";
import { useEventListener } from "@vueuse/core";
import {
    useAurora,
    deriveAurora,
    resolveRenderMode,
    paletteToCssGradient,
    type AuroraAtoms,
    type AuroraConfig,
} from "@mkbabb/glass-ui/aurora";
import { resolveCalibratedAtmosphere } from "./atmosphere-calibration";
import { debounce } from "../../../shared/utils";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { AURORA_ATOMS_KEY, DEFAULT_AURORA_ATOMS } from "../../../scenes/atmosphere/aurora-atoms";
import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/blob";
import { cssToOklch, deriveBlobPalette, oklchStopToHex } from "@mkbabb/glass-ui/color";
import { clamp } from "@mkbabb/value.js/math";
import {
    GROUND_STORE_KEY,
    buildGroundRecord,
    normalizeGroundStops,
    type GroundRecord,
} from "./ground";

/**
 * W6-7 — the pointer-as-light strength fed to the aurora cursor model. The
 * producer default (0.8) is the studio register; the backdrop wants the subtle
 * arm — the light LEANS toward the pointer (a lerp weight, not a spotlight).
 */
const ATMOSPHERE_POINTER_STRENGTH = 0.45;

// --- T.W8 · P9-R3 / T-37 — THE DERIVE-SEAM GUARANTEE ---------------------------
// The collapsed dock's WAX SEAL is the LIVE picked colour (a WatercolorDot on
// `cssColorOpaque`); the atmosphere FIELD behind it is DERIVED from the SAME
// seed. At the owner's brick reference the two collided — wax↔field ΔL 0.004
// (WCAG 1.03:1) light / 0.016 dark — so the seal's swatch identity vanished
// into the field, carried only by the producer's collapsed-pill glass halo
// (which is strong over dark fields and DISSOLVES over light ones — the §6.4
// self-camouflage class). t33-research §6.4 named the idiomatic cure: "the
// field is DERIVED, so the demo owns a GUARANTEED delta at the derive seam —
// the atmosphere's lBand never equals the wax L". The true `lBand` atom is
// producer-gated at the consumed dist (Q2-FULL, P1-booked), so the demo owns
// the guarantee HERE, as a MATERIAL lightness offset on the derived field — a
// figure-ground standoff, NEVER a ring or rim (Q12 ABROGATE + the register law
// stand; O-15a's negative border watch stays green through this cure). The same
// closed-form floor idiom the HeroBlob ink-floor uses (bead↔plate) applied to
// the field↔wax seam: one mean, one bounded uniform shift, zero iteration.
//
// It fires ONLY when the field mean L would otherwise land within the floor of
// the wax L (most seeds derive a field whose L naturally stands off, so the
// composition is untouched); when it fires, the whole palette shifts uniformly
// AWAY from the wax (internal spread preserved), clamped to the derive domain.
const DERIVE_SEAM_FLOOR = 0.06;

function seedLightness(seed: AuroraAtoms["seed"]): number | null {
    if (typeof seed !== "string") {
        return typeof seed === "object" && seed ? seed.L : null;
    }
    try {
        return cssToOklch(seed).L;
    } catch {
        return null;
    }
}

/**
 * Guarantee |field mean L − wax L| ≥ DERIVE_SEAM_FLOOR by shifting the whole
 * derived palette uniformly away from the seed when they would collide. Pure;
 * the seed-lightness read is throw-free (an un-parseable seed skips the guard).
 */
function guaranteeSeamOffset(config: AuroraConfig, seed: AuroraAtoms["seed"]): AuroraConfig {
    const seedL = seedLightness(seed);
    const palette = config.palette;
    if (seedL == null || !palette?.length) return config;
    const meanL = palette.reduce((sum, stop) => sum + stop.L, 0) / palette.length;
    const delta = meanL - seedL;
    if (Math.abs(delta) >= DERIVE_SEAM_FLOOR) return config;
    // Push AWAY from the wax on the side the field already leans; flip if that
    // side has no headroom (closed-form — two branches, zero iteration).
    let dir = delta >= 0 ? 1 : -1;
    const need = DERIVE_SEAM_FLOOR - Math.abs(delta);
    const headroom = dir === 1 ? 0.98 - meanL : meanL - 0.02;
    if (headroom < need) dir = -dir;
    const push = dir * (DERIVE_SEAM_FLOOR - dir * delta);
    return {
        ...config,
        palette: palette.map((stop) => ({ ...stop, L: clamp(stop.L + push, 0.02, 0.98) })),
    };
}

export function useAtmosphere(
    atmosphereCanvas: Readonly<ShallowRef<HTMLCanvasElement | null>>,
    // W3-1 (S.W3): the rAF-COALESCED opaque colour (`pipeline.cssColorOpaqueFrame`),
    // NOT the synchronous `cssColorOpaque`. Both atmosphere derives below (the
    // aurora seed + the blob palette) are heavy per-change work — coalescing the
    // source to one republish per animation frame collapses a 60×/s slider drag
    // to one derive/frame (the tranche's #1 perf fix, perf-transitions P0-1).
    // The seed still tracks (S-18): the last colour of every frame wins.
    atmosphereColor: ComputedRef<string>,
) {
    // The config source MUST NOT throw inside useAurora's deep-watch: a thrown
    // getter dead-faults the reactive effect (the white-screen class inv-N-1
    // forbids). `resolveAtoms` is TOTAL for the numeric atoms, but it derives
    // the palette via `deriveAurora(seed)`, which THROWS on an un-parseable
    // seed — so the seed write below is the one validated boundary, and this
    // getter stays throw-free.
    const auroraAtoms = reactive<AuroraAtoms>(structuredClone(DEFAULT_AURORA_ATOMS));
    provide(AURORA_ATOMS_KEY, auroraAtoms);

    // --- W2-1 (T.W2) — the WRITER-ORDER half of hydration-before-derivation:
    // the seed lands in the atoms BEFORE any derived sink registers below, so
    // the boot-material sink's FIRST write (immediate watch) is already the
    // hydrated seed's material. Without this, the sink's immediate fire reads
    // the DEFAULT_AURORA_ATOMS palette for one synchronous beat and writes a
    // default-material token the pre-flush re-fire then corrects — the F-3
    // latent-flash mechanism, one paint yield from visible. App.vue hydrates
    // the model before construction (boot/hydrate), so `atmosphereColor` here
    // is the true seed at setup; this line makes the ORDER structural rather
    // than flush-timing-dependent (E-3: a transposition, not a flush patch).
    try {
        deriveAurora(atmosphereColor.value); // throws iff un-parseable
        auroraAtoms.seed = atmosphereColor.value;
    } catch {
        /* un-parseable seed — the atoms keep the default (the seed watch guards) */
    }

    // Adaptive substrate (glass-ui's `resolveRenderMode("auto")`): on a
    // low-power or SOFTWARE-WebGL device (SwiftShader / llvmpipe / MS Basic
    // Render — the GPU-blocklisted path) this resolves to `"css"`, so
    // `useAurora` NEVER arms the full-viewport WebGL2 surface. A full-viewport
    // software-rastered GL layer makes every pointer-driven composite stall
    // the renderer's input ack — the page goes unresponsive under interaction
    // (the N.W5 Defect-A hang, reproduced live). On those devices the
    // atmosphere paints via the cheap CSS-gradient placeholder instead (a
    // complete render of the same derived palette). Resolved ONCE at setup
    // (a mount-time device tier).
    const auroraRenderMode = resolveRenderMode("auto");

    // W2-5 (T.W2): the config source resolves over the CALIBRATED base —
    // the Q2-NOW knobs (breath 26 · softmaxBeta 4 · vividness = f(seedC))
    // ride `resolveAtoms(atoms, base)`; the atoms door itself is untouched
    // (AuroraPane's live tuning flows through exactly as before).
    // P9-R3: the seam guarantee wraps the calibrated derive at the ONE place
    // the field is resolved — the WebGL getter AND the resolvedPalette below
    // consume the SAME guarded config, so the painted field, the CSS fallback,
    // and the D6 ink referent all agree on the offset field lightness.
    const aurora = useAurora(
        atmosphereCanvas,
        () => guaranteeSeamOffset(resolveCalibratedAtmosphere(auroraAtoms), auroraAtoms.seed),
        { onInitError: (err) => console.warn("[aurora] init failed:", err) },
        { renderMode: auroraRenderMode },
    );

    // The resolved derived palette — ONE computed shared by the CSS-gradient
    // fallback below AND the W6-1 boot-material sink. Recomputes at most once
    // per frame under a drag (the seed is the rAF-coalesced colour), so the
    // extra resolve here stays off the per-event hot path.
    const resolvedPalette = computed(
        () =>
            guaranteeSeamOffset(resolveCalibratedAtmosphere(auroraAtoms), auroraAtoms.seed)
                .palette,
    );

    // --- M-15 (T.W2-routed cross-wave hunk; D6 THE INK-ON-TIER CONTRACT) ---
    // The atmosphere EXPOSES its live derived lightness — the mean OKLab L of
    // the resolved field palette, i.e. the page-ambient the ink actually sits
    // over. The D6 law: the contrast referent is a property of the SURFACE the
    // text sits on, never a global constant (A11Y-F1: the BG_LIGHTNESS_DARK/
    // LIGHT pair 0.15/0.97 is a FALSE referent everywhere — the measured
    // composited ambient runs 0.376–0.936). useViewAccents consumes this ref;
    // W3-5 threads it to the non-boot consumers (the same round's parallel
    // wave — the routed-hunk seam, h-wave-w2-w3 M1 ≡ h-dag D-1).
    const derivedLightness = computed(() => {
        const palette = resolvedPalette.value;
        if (!palette.length) return 0.5;
        let sum = 0;
        for (const stop of palette) sum += stop.L;
        return sum / palette.length;
    });

    // The CSS-gradient fallback for the `"css"` substrate — the same derived
    // palette `resolveAtoms` feeds the WebGL field, rendered as a static
    // linear gradient (the `<Aurora>` placeholder idiom, glass-ui's
    // `paletteToCssGradient`). Empty on the `"webgl"` path so the canvas owns
    // the paint; on `"css"` it is the atmosphere.
    const auroraCssGradient = computed(() =>
        auroraRenderMode === "css"
            ? paletteToCssGradient(resolvedPalette.value)
            : undefined,
    );

    // --- W2-2 (T.W2, supersedes W6-1's base-stop sink): THE GRADIENT GROUND.
    // The boot material is the derived-palette GRADIENT — the whole material,
    // never the deepest stop as a flat slab (t-aurora-boot F-2's dark-mud +
    // luminance leap). The sink writes the four registered per-stop properties
    // `--saved-bg-0..3` (+ `--saved-bg`, the base-stop solid fallback) on the
    // root; body's FIXED gradient template (style.css) reads them, and each
    // stop rides a 200ms OKLab transition (F-12: a discrete pick breathes into
    // the new family — the rAF re-derive under drags outruns the transition,
    // no double-animation). Persisted shape: `{stops, scheme, deriveVersion}`
    // — STOPS, never a gradient string (M-11); boot/ground.ts owns the record.
    // One writer: the atmosphere owns the boot material because it owns the
    // derived field. Scheme rides the record so the fouc-guard can refuse the
    // other band's material (F-6 dark honesty).
    const { isDark } = useGlobalDark();
    // The GROUND material is SCHEME-BANDED (F-6's cure): in dark the ground
    // derives through the producer's own shipped dark band
    // (`deriveAurora(seed, { scheme: "dark" })` — consuming a producer
    // option, never forking the derive), so a dark boot grounds in dark
    // material B0→B2 — and the first sink write for the DEFAULT seed is
    // byte-identical to the FIRST_VISIT_GROUND dark constant (same derive).
    // The FIELD itself remains light-band in dark — the atoms door ships no
    // scheme/lBand (GAP-L2, probed at this dist: seed-atom resolution
    // clobbers a base-palette override) — that half rides packet P1 and the
    // W7 re-verify; the ground meets the dark field the day the atom lands.
    const groundPalette = computed(() => {
        const fieldPalette = resolvedPalette.value; // tracks seed/atom edits
        if (!isDark.value) return fieldPalette;
        const seed = auroraAtoms.seed;
        if (typeof seed !== "string") return fieldPalette;
        try {
            return deriveAurora(seed, { scheme: "dark" });
        } catch {
            return fieldPalette;
        }
    });
    const persistGround = debounce(
        (record: GroundRecord) => {
            try {
                localStorage.setItem(GROUND_STORE_KEY, JSON.stringify(record));
            } catch {
                /* private-mode */
            }
        },
        200,
    );
    watch(
        [groundPalette, isDark],
        ([palette, dark]) => {
            if (!palette?.length) return;
            const stops = normalizeGroundStops(palette.map(oklchStopToHex));
            const root = document.documentElement.style;
            stops.forEach((stop, i) => root.setProperty(`--saved-bg-${i}`, stop));
            const base = stops[0];
            if (!base) return; // unreachable (normalized to 4) — type honesty
            // The solid base-stop fallback var (unregistered consumers +
            // the no-gradient degradation path).
            root.setProperty("--saved-bg", base);
            // W2-3 theme-color B0 sub-clause: the browser chrome rides the
            // ground's base stop, updated beside the pick transition (the
            // meta is minted pre-paint by the index.html boot script).
            document
                .querySelector('meta[name="theme-color"]')
                ?.setAttribute("content", base);
            persistGround(
                buildGroundRecord(stops, dark ? "dark" : "light"),
            );
        },
        { immediate: true },
    );

    // --- W2-3 (T.W2 · h-gaps G-4/PP-2): THE NO-FIELD HONEST TERMINAL ---
    // WebGL-unavailable (init error → isArmed never true) or CONTEXT LOSS ⇒
    // the persisted gradient ground IS the honest terminal (dark-honest by
    // W2-2's scheme banding) — the canvas rests at opacity 0 and the page
    // stands on its own material; never a blank canvas presented as a field.
    // Re-arm ONCE on context-restore (the first `webglcontextrestored`
    // re-admits the arrival signal); a second loss rests on the ground for
    // the session.
    const contextLost = ref(false);
    let restoredOnce = false;
    if (auroraRenderMode === "webgl") {
        watch(
            atmosphereCanvas,
            (canvas) => {
                if (!canvas) return;
                canvas.addEventListener("webglcontextlost", () => {
                    contextLost.value = true;
                });
                canvas.addEventListener("webglcontextrestored", () => {
                    if (!restoredOnce) {
                        restoredOnce = true;
                        contextLost.value = false;
                    }
                });
            },
            { immediate: true },
        );
    }

    // --- W6-1 entrance rider (owner ruling 2026-07-05 §1.1): the ARRIVAL is
    // designed, not a snap. The producer's own idiom (`Aurora.vue`) keys a
    // cross-fade on `isArmed`; the demo consumes the same signal — App.vue
    // eases the canvas in over the SAME-material ground once the field is
    // drawable (T.W2-3: gated at B2 = this signal ∧ dock-plate-landed, the
    // overture's predicate). On the `"css"` substrate the static gradient
    // placeholder IS a complete render, so it arrives immediately (no WebGL
    // arming to wait for). PRM honesty lives in App.vue's CSS (reduce → no
    // transition, a static state change).
    const auroraArrived = computed(
        () =>
            (auroraRenderMode === "css" || aurora.isArmed.value) &&
            !contextLost.value,
    );

    // --- W6-7 (owner ruling §1.3): pointer-reactive atmosphere, the consume
    // half of the producer's SHIPPED pointer door. `setCursor` feeds the eased
    // cursor model (continuous field swirl + the `interactivity.light`
    // cursor-as-light pull — armed in DEFAULT_AURORA_ATOMS); the velocity
    // injection adds the flick swirl-burst. ONE pointer grammar with the hero
    // blob: the pointer is a soft attractor/light — fields LEAN toward it with
    // ease and decay to rest when it lifts (the blob's own pointer choreography
    // is the same register; neither snaps). PRM is producer-gated at the
    // runtime (velocity write-path early-out + the master-tempo zero), and the
    // cursor writes are plain state the frame loop samples — no per-event
    // derive, so the W3-1 coalescing discipline holds. The `"css"` substrate
    // has no frame loop (a static placeholder): skip the listeners entirely.
    if (auroraRenderMode === "webgl" && typeof window !== "undefined") {
        let lastPointerX: number | null = null;
        let lastPointerY: number | null = null;
        useEventListener(
            window,
            "pointermove",
            (e: PointerEvent) => {
                const x = e.clientX / Math.max(window.innerWidth, 1);
                const y = e.clientY / Math.max(window.innerHeight, 1);
                aurora.setCursor(x, y, ATMOSPHERE_POINTER_STRENGTH);
                if (lastPointerX !== null && lastPointerY !== null) {
                    aurora.injectCursorVelocity(x - lastPointerX, y - lastPointerY);
                }
                lastPointerX = x;
                lastPointerY = y;
            },
            { passive: true },
        );
        useEventListener(document, "pointerleave", () => {
            aurora.clearCursor(); // decay-to-rest, never a snap
            lastPointerX = null;
            lastPointerY = null;
        });
    }

    // The picker→atmosphere seed: every (coalesced) colour change re-seeds the
    // derived palette. `atmosphereColor` is always a value.js-serialised colour,
    // so the guard never fires in practice — but a transient un-parseable string
    // must leave the LAST GOOD seed in place (never reach the getter), so the
    // atmosphere never flashes empty and the deep-watch never dead-faults
    // (mirrors the blob watch's guard).
    watch(
        atmosphereColor,
        (css) => {
            try {
                deriveAurora(css); // probe: throws iff the seed is un-parseable
                auroraAtoms.seed = css;
            } catch {
                // keep the last good seed
            }
        },
        { immediate: true },
    );

    // --- Blob config ---
    // The 8-atom nested config — structuredClone so the reactive copy owns
    // deep atoms (the aurora precedent above does the same).
    const blobConfig = reactive(structuredClone(BLOB_CONFIG_DEFAULTS));
    provide(BLOB_CONFIG_KEY, blobConfig);

    // --- Live-palette coupling — the hero blob IS the palette made flesh ---
    // The active picker color seeds a harmonious OKLCh ramp (≤4 stops) that
    // flows straight into the blob's spatial multi-stop color field. glass-ui's
    // Blob deep-watches `config.color.paletteStops`, so a colour change
    // repaints free.
    watch(
        atmosphereColor,
        (css) => {
            try {
                blobConfig.color.paletteStops = deriveBlobPalette(css, {
                    stopCount: 4,
                    harmony: "analogous",
                    chromaCeiling: 0.16,
                }).map(oklchStopToHex);
            } catch {
                // A transient un-parseable colour string leaves the last good ramp.
            }
        },
        { immediate: true },
    );

    return { auroraCssGradient, auroraArrived, derivedLightness };
}
