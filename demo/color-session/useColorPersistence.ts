import { watch, type ShallowRef, type ComputedRef } from "vue";
import { useStorage } from "@vueuse/core";
import { debounce } from "../shared/utils";
import { serializePickerColor, type PickerColor } from "./picker-color";
import type { ColorModel } from "../@/components/custom/color-picker";
import { defaultColorModel } from "../@/components/custom/color-picker";
// The persisted color-state projection key — single-sourced (U-F48), shared
// with boot/hydrate. color→lib is a legal sideways/DOWN import (no color↔
// color-picker boundary breach — @lib is the shared lib layer).
import { COLOR_STORE_KEY } from "../palettes/constants";

/**
 * The persisted color-state projection (S.W2 W2-6). localStorage round-trips
 * SERIALIZED display strings — `inputColor` and each saved color as a parseable
 * string — never the live `ParsedColorUnit` graph. Typing the store to this
 * projection (not the runtime `ColorModel`) is the honest source-of-truth: it is
 * exactly why the store write-throughs below hand `string[]` to `savedColors`,
 * cast-free. The former `Array<ParsedColorUnit | any>` model type let the store
 * masquerade as `ColorModel` and hid this string↔unit boundary behind `as any`.
 */
interface PersistedColorState {
    inputColor: string;
    savedColors: string[];
}

/**
 * useColorPersistence — the color-state persistence collaborator lifted out of
 * the `useColorPipeline` spine (S.W2 · gate row 6). Owns the localStorage store,
 * the restore-on-load path (gated behind the pipeline's URL-hash-wins
 * precedence), the debounced write-through, and the reset-to-defaults storage
 * flush. The pipeline stays the ONE spine; this is its internal collaborator —
 * `restoreFromStorage` is re-exported through the pipeline's public surface
 * unchanged, so consumers are untouched.
 */
export function useColorPersistence(deps: {
    model: ShallowRef<ColorModel>;
    updateModel: (patch: Partial<ColorModel>) => void;
    parseAndSetColor: (css: string) => void;
    parseColor: (css: string) => PickerColor;
    cssColor: ComputedRef<string>;
}) {
    const { model, updateModel, parseAndSetColor, parseColor, cssColor } =
        deps;

    // Capture whether a persisted color-state exists BEFORE useStorage seeds the
    // default — the restore only fires for a genuine prior session (a fresh cold
    // load with no URL color keeps the default).
    let hadPersistedColor = false;
    try {
        hadPersistedColor = localStorage.getItem(COLOR_STORE_KEY) !== null;
    } catch {
        /* private-mode */
    }

    const colorStore = useStorage<PersistedColorState>(COLOR_STORE_KEY, {
        inputColor: defaultColorModel.inputColor,
        savedColors: [],
    });

    // Persistence precedence: URL-hash-wins-on-load (App applies the URL first);
    // when the hash carries no color, App calls this to restore the last session.
    // `parseAndSetColor` detects the space AND refreshes stableHue.
    const restoreFromStorage = (): boolean => {
        if (!hadPersistedColor) return false;
        let restored = false;
        const storedInput = colorStore.value.inputColor;
        if (typeof storedInput === "string" && storedInput.trim()) {
            parseAndSetColor(storedInput);
            restored = true;
        }
        const storedSaved = colorStore.value.savedColors;
        if (Array.isArray(storedSaved) && storedSaved.length) {
            const parsed = storedSaved
                .map((s) => {
                    try {
                        return parseColor(String(s));
                    } catch {
                        return null;
                    }
                })
                .filter((c): c is PickerColor => c !== null);
            if (parsed.length) updateModel({ savedColors: parsed });
        }
        return restored;
    };

    // --- Storage write-through (persist a PARSEABLE display string) ---

    const syncColorToStorage = debounce(
        () => {
            colorStore.value.inputColor = cssColor.value;
        },
        200,
    );

    watch(
        () => model.value.color,
        () => syncColorToStorage(),
    );

    watch(
        () => model.value.savedColors,
        (colors) => {
            colorStore.value.savedColors = colors.map(serializePickerColor);
        },
    );

    // The reset-to-defaults storage flush: cancel the pending write, then seed the
    // store with the fresh model's serialized projection.
    const resetStorage = (fresh: ColorModel) => {
        syncColorToStorage.cancel();
        colorStore.value.inputColor = fresh.inputColor;
        colorStore.value.savedColors = fresh.savedColors.map(serializePickerColor);
    };

    return { restoreFromStorage, resetStorage };
}
