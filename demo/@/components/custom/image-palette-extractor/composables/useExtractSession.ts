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
 */

import { ref, shallowRef, computed, onBeforeUnmount } from "vue";
import type { QuantizedColor } from "@mkbabb/value.js/quantize";
import { serializeCssColor } from "@mkbabb/value.js/css";
import { useImageQuantize } from "./useImageQuantize";
import { usePaletteStore } from "@composables/palette/usePaletteStore";
import type { Palette, PaletteColor } from "@lib/palette/types";

type PresentedColor = Readonly<{
    source: QuantizedColor;
    serialized: string;
}>;

type PalettePresentation =
    | Readonly<{ ok: true; value: readonly PresentedColor[] }>
    | Readonly<{ ok: false; error: string }>;

function readAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function useExtractSession() {
    const { palette, isProcessing, error: workerError, quantizeFromFile } =
        useImageQuantize();
    const { createPalette } = usePaletteStore();

    const previewDataUrl = ref<string | null>(null);
    const colorCount = ref(5);
    const chromaWeight = ref(0.5);
    const lastFile = shallowRef<File | null>(null);
    const paletteName = ref("Extracted Palette");

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

    const kSliderGradient = computed(() => {
        const presented = presentedPalette.value;
        if (!presented.ok || presented.value.length === 0) return "var(--muted)";
        const stops = presented.value.map((entry, i) => {
            const pct =
                presented.value.length === 1
                    ? 50
                    : (i / (presented.value.length - 1)) * 100;
            return `${entry.serialized} ${pct.toFixed(0)}%`;
        });
        return `linear-gradient(to right, ${stops.join(", ")})`;
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

    function runQuantize() {
        if (lastFile.value) {
            quantizeFromFile(lastFile.value, colorCount.value, chromaWeight.value);
        }
    }

    function debouncedReQuantize() {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(runQuantize, 300);
    }

    async function onFile(file: File) {
        lastFile.value = file;
        previewDataUrl.value = await readAsDataUrl(file);
        runQuantize();
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
        if (lastFile.value) runQuantize();
    }

    function onSave(p: Palette) {
        createPalette(p.name, p.colors);
    }

    function onRename(_p: Palette, newName: string) {
        paletteName.value = newName;
    }

    onBeforeUnmount(() => {
        if (debounceTimer) clearTimeout(debounceTimer);
    });

    return {
        // quantizer state
        palette,
        isProcessing,
        quantizeError,
        // session state
        previewDataUrl,
        colorCount,
        chromaWeight,
        lastFile,
        paletteName,
        // derived
        extractedPalette,
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
    };
}
