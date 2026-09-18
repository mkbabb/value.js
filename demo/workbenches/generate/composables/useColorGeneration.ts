/**
 * useColorGeneration — the generate panel's reactive wrapper over the pure
 * OKLCh color-generation core.
 *
 * U.W-DEMO · U-F47: the pure generation math (preset ranges, harmony
 * algorithms, `generateSingleColor`, `generatePalette`) RELOCATED DOWN to the
 * shared color layer (`@composables/color/generate-color`) — the shared spine
 * consumes `generateSingleColor`, so it belongs in the lower layer. This
 * feature composable is the reactive (Vue-ref) wrapper, importing the pure
 * generators UP-FROM-SHARED (feature → shared, the correct direction).
 */

import { ref, computed } from "vue";
import { generatePalette } from "../../../color-session/generate-color";
import type {
    PresetName,
    HarmonyName,
} from "../../../color-session/generate-color";

export function useColorGeneration() {
    const preset = ref<PresetName>("vibrant");
    const harmony = ref<HarmonyName>("golden");
    const count = ref(5);
    const seed = ref(Math.floor(Math.random() * 0xffffffff));

    const palette = computed(() =>
        generatePalette(count.value, preset.value, harmony.value, seed.value),
    );

    function regenerate() {
        seed.value = Math.floor(Math.random() * 0xffffffff);
    }

    return {
        preset,
        harmony,
        count,
        seed,
        palette,
        regenerate,
    };
}
