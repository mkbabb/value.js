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
import {
    useAurora,
    resolveAtoms,
    deriveAurora,
    resolveRenderMode,
    paletteToCssGradient,
    type AuroraAtoms,
} from "@mkbabb/glass-ui/aurora";
import { AURORA_ATOMS_KEY, DEFAULT_AURORA_ATOMS } from "@components/custom/panes/keys";
import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/goo-blob";
import { deriveBlobPalette, oklchStopToHex } from "@mkbabb/glass-ui/color";

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

    useAurora(
        atmosphereCanvas,
        () => resolveAtoms(auroraAtoms),
        { onInitError: (err) => console.warn("[aurora] init failed:", err) },
        { renderMode: auroraRenderMode },
    );

    // The CSS-gradient fallback for the `"css"` substrate — the same derived
    // palette `resolveAtoms` feeds the WebGL field, rendered as a static
    // linear gradient (the `<Aurora>` placeholder idiom, glass-ui's
    // `paletteToCssGradient`). Empty on the `"webgl"` path so the canvas owns
    // the paint; on `"css"` it is the atmosphere.
    const auroraCssGradient = computed(() =>
        auroraRenderMode === "css"
            ? paletteToCssGradient(resolveAtoms(auroraAtoms).palette)
            : undefined,
    );

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

    return { auroraCssGradient };
}
