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
import type { QuantizedColor } from "@src/quantize";
import { useImageQuantize } from "./useImageQuantize";
import { usePaletteStore } from "@composables/palette/usePaletteStore";
import type { Palette, PaletteColor } from "@lib/palette/types";

function readAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function useExtractSession() {
    const { palette, isProcessing, error: quantizeError, quantizeFromFile } =
        useImageQuantize();
    const { createPalette } = usePaletteStore();

    const previewDataUrl = ref<string | null>(null);
    const colorCount = ref(5);
    const chromaWeight = ref(0.5);
    const lastFile = shallowRef<File | null>(null);
    const paletteName = ref("Extracted Palette");

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const extractedPalette = computed<Palette | null>(() => {
        if (palette.value.length === 0) return null;
        const colors: PaletteColor[] = palette.value.map((c, i) => ({
            css: c.css,
            position: i / Math.max(1, palette.value.length - 1),
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
        if (palette.value.length === 0) return "var(--muted)";
        const stops = palette.value.map((c, i) => {
            const pct =
                palette.value.length === 1
                    ? 50
                    : (i / (palette.value.length - 1)) * 100;
            return `${c.css} ${pct.toFixed(0)}%`;
        });
        return `linear-gradient(to right, ${stops.join(", ")})`;
    });

    // ── T19: population / dominance (from the RETURNED palette) ──

    const totalPopulation = computed(() =>
        palette.value.reduce((sum, c) => sum + c.population, 0),
    );

    /** Max-population cluster; ties break toward the higher-chroma color. */
    const dominant = computed<QuantizedColor | null>(() => {
        let best: QuantizedColor | null = null;
        for (const c of palette.value) {
            if (
                !best ||
                c.population > best.population ||
                (c.population === best.population && c.oklch[1] > best.oklch[1])
            ) {
                best = c;
            }
        }
        return best;
    });

    /** The dominant cluster's share of the image, in [0, 1]. */
    const dominantShare = computed(() => {
        const total = totalPopulation.value;
        const d = dominant.value;
        return total > 0 && d ? d.population / total : 0;
    });

    /** Per-cluster populations, ordered like the palette (strip weights). */
    const populationWeights = computed(() =>
        palette.value.map((c) => c.population),
    );

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
        populationWeights,
        // actions
        onFile,
        onKChange,
        onChromaChange,
        onReset,
        onSave,
        onRename,
    };
}
