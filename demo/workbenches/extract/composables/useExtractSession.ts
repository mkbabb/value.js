/**
 * useExtractSession — the ONE extract-workbench session (R.W4 Lane E / T20).
 *
 * The former ExtractPane ↔ ImagePaletteExtractor twins duplicated ~90% of
 * this state; both shells now consume this session through ExtractWorkbench.
 *
 * T19 — the quantizer's perceptual story, threaded end-to-end: `population`
 * survives the consumer boundary here (dominant = max-population with a
 * chroma tiebreak, derived from the RETURNED palette — never a second worker
 * call; the library's `dominantColor()` re-quantizes and is the wrong tool).
 *
 * X.W7.g3 (EY-12 — the altitude row): the session lives ABOVE any one mount.
 * The shell swaps a pane between regions when the viewport crosses a
 * breakpoint, which remounts the workbench; state held in setup scope died
 * with it (image, palette, k, overlay). The state is created once, in a
 * detached effect scope, and every mount is a HOLDER of it: the lifecycle
 * releases (debounce, worker) run only when the last holder parks or leaves.
 *
 * EY-23 / R-24: the preview is an object URL of the user's own File — no
 * base64 re-encode crossing four seams — revoked when replaced or cleared.
 */

import {
    ref,
    shallowRef,
    computed,
    effectScope,
    onActivated,
    onBeforeUnmount,
    onDeactivated,
    onMounted,
} from "vue";
import type { QuantizedColor } from "@mkbabb/value.js/quantize";
import { serializeCssColor } from "@mkbabb/value.js/css";
import { useImageQuantize, type QuantizeOutcome } from "./useImageQuantize";
import { usePaletteStore } from "../../../palettes/usePaletteStore";
import type { Palette, PaletteColor } from "../../../palettes/types";
import { paletteRail } from "../../../color-session/palette-rail";

type PresentedColor = Readonly<{
    source: QuantizedColor;
    serialized: string;
}>;

type PalettePresentation =
    | Readonly<{ ok: true; value: readonly PresentedColor[] }>
    | Readonly<{ ok: false; error: string }>;

function createExtractSession() {
    const { palette, isProcessing, error: workerError, quantizeFromFile, releaseWorker } =
        useImageQuantize();
    const { createPalette } = usePaletteStore();

    /** An object URL of the current file; the one retained representation besides the decode. */
    const previewUrl = ref<string | null>(null);
    /** The eyedropper overlay is open (session state: it survives a remount). */
    const eyedropperOpen = ref(false);
    const colorCount = ref(5);
    const chromaWeight = ref(0.5);
    const lastFile = shallowRef<File | null>(null);
    const paletteName = ref("Extracted Palette");
    /** XW-22: the latest run developed, and found no opaque pixel to sample. */
    const barren = ref(false);

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const presentedPalette = computed<PalettePresentation>(() => {
        const value: PresentedColor[] = [];
        for (const source of palette.value) {
            const serialized = serializeCssColor(source.color);
            if (!serialized.ok) {
                return {
                    ok: false,
                    error: `Palette color serialization failed: ${serialized.error.code}`,
                };
            }
            value.push({ source, serialized: serialized.value });
        }
        return { ok: true, value };
    });

    const quantizeError = computed<string | null>({
        get: () =>
            workerError.value ??
            (presentedPalette.value.ok ? null : presentedPalette.value.error),
        set: (value) => {
            workerError.value = value;
        },
    });

    const extractedPalette = computed<Palette | null>(() => {
        const presented = presentedPalette.value;
        if (!presented.ok || presented.value.length === 0) return null;
        // S.W5-6 · F7: the population story rides ON the palette — each
        // swatch carries its normalized share, so the card's OWN strip is
        // population-proportional (ONE strip; the standalone twin died).
        const total = presented.value.reduce(
            (sum, entry) => sum + entry.source.population,
            0,
        );
        const colors: PaletteColor[] = presented.value.map((entry, i) => ({
            css: entry.serialized,
            position: i / Math.max(1, presented.value.length - 1),
            ...(total > 0 ? { weight: entry.source.population / total } : {}),
        }));
        return {
            id: "__extracted__",
            name: paletteName.value,
            slug: "extracted",
            colors,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isLocal: true,
        };
    });

    /** EC-9: how many colours actually came back (null until a run develops). */
    const foundCount = computed<number | null>(() => {
        const presented = presentedPalette.value;
        return presented.ok && presented.value.length > 0 ? presented.value.length : null;
    });

    /** EC-25: the rail IMAGE, or null — never a colour token in a gradient slot.
     *  EC-10: the image is the returned palette as hard bands (`paletteRail`),
     *  never an interpolation between the k-means results. */
    const kSliderGradient = computed<string | null>(() => {
        const presented = presentedPalette.value;
        if (!presented.ok || presented.value.length === 0) return null;
        return paletteRail(presented.value.map((entry) => entry.serialized));
    });

    // ── T19: population / dominance (from the RETURNED palette) ──

    const totalPopulation = computed(() =>
        palette.value.reduce((sum, c) => sum + c.population, 0),
    );

    /** Max-population cluster; ties break toward the higher-chroma color. */
    const dominant = computed<PresentedColor | null>(() => {
        const presented = presentedPalette.value;
        if (!presented.ok) return null;
        let best: PresentedColor | null = null;
        for (const entry of presented.value) {
            if (!best) {
                best = entry;
                continue;
            }
            const candidateChroma = entry.source.color.channels[1];
            const bestChroma = best.source.color.channels[1];
            if (
                entry.source.population > best.source.population ||
                (entry.source.population === best.source.population &&
                    candidateChroma !== "none" &&
                    (bestChroma === "none" || candidateChroma > bestChroma))
            ) {
                best = entry;
            }
        }
        return best;
    });

    /** The dominant cluster's share of the image, in [0, 1]. */
    const dominantShare = computed(() => {
        const total = totalPopulation.value;
        const d = dominant.value;
        return total > 0 && d ? d.source.population / total : 0;
    });

    // ── Quantize orchestration ──

    // X-W7 Repair 1 (D-6 · XP-EXTRACT): every dispatch goes through here and
    // first cancels the pending debounce (EC-34: one intent, one worker job).
    // The quantizer settles a typed outcome and writes its own state (only the
    // latest request may), so nothing here floats a rejection.
    async function runQuantize(): Promise<QuantizeOutcome | null> {
        cancelPendingQuantize();
        const file = lastFile.value;
        if (!file) return null;
        barren.value = false;
        const outcome = await quantizeFromFile(file, colorCount.value, chromaWeight.value);
        // XW-22: a success with zero opaque pixels is its own state, never
        // the pre-image ghost beside the image just fed.
        if (outcome.kind === "developed") barren.value = outcome.palette.length === 0;
        return outcome;
    }

    function debouncedReQuantize() {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => void runQuantize(), 300);
    }

    // XW-19: an intake is identified; a slower earlier read can never
    // overwrite the preview of a later file, so preview and palette always
    // describe the same image. The palette is dispatched from the same act.
    let intake = 0;
    function setPreview(url: string | null) {
        if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
        previewUrl.value = url;
        if (!url) eyedropperOpen.value = false;
    }
    async function onFile(file: File) {
        const id = ++intake;
        lastFile.value = file;
        const outcome = await runQuantize();
        if (id !== intake) return;
        // An undecodable file leaves no half-state: no preview, the words only.
        setPreview(outcome?.kind === "failed" ? null : URL.createObjectURL(file));
    }

    function onKChange(k: number) {
        colorCount.value = k;
        debouncedReQuantize();
    }

    function onChromaChange(v: number) {
        chromaWeight.value = v;
        debouncedReQuantize();
    }

    function onReset() {
        colorCount.value = 5;
        chromaWeight.value = 0.5;
        void runQuantize();
    }

    function onSave(p: Palette) {
        createPalette(p.name, p.colors);
    }

    function onRename(_p: Palette, newName: string) {
        paletteName.value = newName;
    }

    // X.W5.a · gate N1 — the DEACTIVATION contract (see PaneSlot's header).
    // A pending re-quantize must not fire into a parked pane.
    function cancelPendingQuantize() {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = null;
    }

    /** The last holder parked or left: nothing runs into an unseen pane. */
    function release() {
        cancelPendingQuantize();
        releaseWorker();
    }

    return {
        // quantizer state
        palette,
        isProcessing,
        quantizeError,
        barren,
        // session state
        previewUrl,
        eyedropperOpen,
        colorCount,
        chromaWeight,
        lastFile,
        paletteName,
        // derived
        extractedPalette,
        foundCount,
        kSliderGradient,
        totalPopulation,
        dominant,
        dominantShare,
        // actions
        onFile,
        onKChange,
        onChromaChange,
        onReset,
        onSave,
        onRename,
        release,
    };
}

export type ExtractSession = ReturnType<typeof createExtractSession>;

let session: ExtractSession | null = null;
/** Mounted, active holders of the session. */
let holders = 0;

/**
 * The ONE extract session, held by the calling component. A remount (the
 * region swap at a breakpoint crossing) re-attaches to the same state.
 */
export function useExtractSession(): ExtractSession {
    session ??= effectScope(true).run(createExtractSession)!;
    const held = session;
    let holding = false;
    const hold = () => {
        if (holding) return;
        holding = true;
        holders += 1;
    };
    const letGo = () => {
        if (!holding) return;
        holding = false;
        holders -= 1;
        if (holders === 0) held.release();
    };
    onMounted(hold);
    onActivated(hold);
    onDeactivated(letGo);
    onBeforeUnmount(letGo);
    return held;
}
