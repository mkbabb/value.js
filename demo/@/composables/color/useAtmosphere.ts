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

import { computed, reactive, watch, provide } from "vue";
import type { ComputedRef, ShallowRef } from "vue";
import { useEventListener } from "@vueuse/core";
import {
    useAurora,
    resolveAtoms,
    deriveAurora,
    resolveRenderMode,
    paletteToCssGradient,
    type AuroraAtoms,
} from "@mkbabb/glass-ui/aurora";
import { debounce } from "@src/utils";
import { AURORA_ATOMS_KEY, DEFAULT_AURORA_ATOMS } from "@components/custom/panes/keys";
import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/goo-blob";
import { deriveBlobPalette, oklchStopToHex } from "@mkbabb/glass-ui/color";

/**
 * W6-7 — the pointer-as-light strength fed to the aurora cursor model. The
 * producer default (0.8) is the studio register; the backdrop wants the subtle
 * arm — the light LEANS toward the pointer (a lerp weight, not a spotlight).
 */
const ATMOSPHERE_POINTER_STRENGTH = 0.45;

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

    const aurora = useAurora(
        atmosphereCanvas,
        () => resolveAtoms(auroraAtoms),
        { onInitError: (err) => console.warn("[aurora] init failed:", err) },
        { renderMode: auroraRenderMode },
    );

    // The resolved derived palette — ONE computed shared by the CSS-gradient
    // fallback below AND the W6-1 boot-material sink. Recomputes at most once
    // per frame under a drag (the seed is the rAF-coalesced colour), so the
    // extra `resolveAtoms` here stays off the per-event hot path.
    const resolvedPalette = computed(() => resolveAtoms(auroraAtoms).palette);

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

    // --- W6-1 (S.W6 · S-18): the boot-material sink — `--saved-bg` IS the
    // derived BASE stop, never the raw picked colour. The pre-hydration ground
    // (index.html's fouc-guard + style.css's body rule) and the field's own
    // deepest stop are then ONE material: boot background → first aurora frame
    // reads as the field texturing in over its own base, not a colour snap.
    // Ownership note: this sink MOVED here from useColorPipeline's applyTokens
    // (which persisted the raw opaque pick — the boot↔field material mismatch
    // the owner saw as the load darkening). One writer: the atmosphere owns
    // the boot material because it owns the derived field.
    const persistBootMaterial = debounce(
        (css: string) => {
            try {
                localStorage.setItem("color-picker-bg", css);
            } catch {
                /* private-mode */
            }
        },
        200,
        false,
    );
    watch(
        () => resolvedPalette.value[0],
        (base) => {
            if (!base) return;
            const css = oklchStopToHex(base);
            // Live var first (the body ground tracks the field in-session),
            // then the debounced cold-boot persistence (mirrors the colour
            // store's 200ms write-through cadence).
            document.documentElement.style.setProperty("--saved-bg", css);
            persistBootMaterial(css);
        },
        { immediate: true },
    );

    // --- W6-1 entrance rider (owner ruling 2026-07-05 §1.1): the ARRIVAL is
    // designed, not a snap. The producer's own idiom (`Aurora.vue`) keys a
    // cross-fade on `isArmed`; the demo consumes the same signal — App.vue
    // eases the canvas in over the SAME-material ground once the field is
    // drawable. On the `"css"` substrate the static gradient placeholder IS
    // a complete render, so it arrives immediately (no WebGL arming to wait
    // for). PRM honesty lives in App.vue's CSS (reduce → no transition, a
    // static state change).
    const auroraArrived = computed(
        () => auroraRenderMode === "css" || aurora.isArmed.value,
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
    // GooBlob deep-watches `config.color.paletteStops`, so a colour change
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

    return { auroraCssGradient, auroraArrived };
}
