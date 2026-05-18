// usePaletteManagerWiring — extracts the ~72-line usePaletteManager callback
// bundle from App.vue (Ae-2). Called from App.vue setup; the composable
// receives every dependency it closes over as explicit arguments.
//
// HARDEN-4 §1.2 note: `colorPickerRef` is passed as the REF OBJECT (not
// `.value`) because the emitAddColor / emitStartEdit retry loops read
// `colorPickerRef.value` after mount, not at call time.

import type { Ref, ShallowRef } from "vue";
import type { ColorModel } from "@components/custom/color-picker";
import type { ColorPicker } from "@components/custom/color-picker";
import type { ViewManager } from "@composables/useViewManager";
import { normalizeColorUnit } from "@src/units/color/normalize";
import { parseCSSColor } from "@src/parsing/color";
import { usePaletteManager } from "./usePaletteManager";

export function usePaletteManagerWiring(
    colorPickerRef: Ref<InstanceType<typeof ColorPicker> | null>,
    viewManager: ViewManager,
    model: ShallowRef<ColorModel>,
    applyColorString: (css: string) => void,
    savedColorStrings: Ref<string[]>,
) {
    return usePaletteManager({
        currentView: viewManager.currentView,
        switchView: viewManager.switchView,
        savedColorStrings,

        emitApply: (colors: string[]) => {
            if (colorPickerRef.value) {
                colorPickerRef.value.onPaletteApply(colors);
            } else {
                if (colors.length === 0) return;
                applyColorString(colors[0]);
            }
        },

        emitAddColor: (css: string) => {
            const cfg = viewManager.currentConfig.value;
            if (cfg.right !== "palettes") {
                viewManager.switchView("palettes");
            }
            try {
                const parsed = parseCSSColor(css);
                if (!parsed) return;
                const normalized = normalizeColorUnit(parsed);
                const newStr = normalizeColorUnit(normalized, true, false).value.toFormattedString(2);

                const savedColors = [...model.value.savedColors];
                const existingIdx = savedColors.findIndex((c: any) => {
                    try {
                        return normalizeColorUnit(c, true, false).value.toFormattedString(2) === newStr;
                    } catch { return false; }
                });

                if (existingIdx >= 0) {
                    if (existingIdx > 0) {
                        const [existing] = savedColors.splice(existingIdx, 1);
                        savedColors.unshift(existing);
                        model.value = { ...model.value, savedColors };
                    }
                } else {
                    savedColors.unshift(normalized);
                    model.value = { ...model.value, savedColors };
                }
            } catch {
                const tryAdd = () => {
                    if (colorPickerRef.value) {
                        colorPickerRef.value.onPaletteAddColor(css);
                    } else {
                        setTimeout(tryAdd, 50);
                    }
                };
                tryAdd();
            }
        },

        emitStartEdit: (target: { paletteId: string; colorIndex: number; originalCss: string }) => {
            const cur = viewManager.currentView.value;
            if (cur !== "picker" && cur !== "palettes") {
                viewManager.switchView("palettes");
            }
            viewManager.mobilePaneIndex.value = 0;
            const tryStartEdit = () => {
                if (colorPickerRef.value) {
                    colorPickerRef.value.onStartEdit(target);
                } else {
                    setTimeout(tryStartEdit, 50);
                }
            };
            setTimeout(tryStartEdit, 50);
        },

        emitSetCurrentColor: (css: string) => {
            if (colorPickerRef.value?.applyExternalColor) {
                colorPickerRef.value.applyExternalColor(css);
            } else {
                applyColorString(css);
            }
        },
    });
}
