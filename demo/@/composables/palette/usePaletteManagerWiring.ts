// usePaletteManagerWiring — App.vue → usePaletteManager bridge.
//
// Two responsibilities:
//   1. Adapt App.vue's color-picker / view-manager handles into the
//      `usePaletteManager` deps shape (the original purpose; HARDEN-4 §1.2).
//   2. Cross-module orchestration watchers (E.W2 Lane D — lifted from
//      usePaletteManager.ts §195–232 per AUD-5.14). These bridge
//      auth ↔ view-router ↔ browse ↔ admin ↔ colorQueue and are *wiring*,
//      not facade-internal coherence.
//
// HARDEN-4 §1.2 note: `colorPickerRef` is passed as the REF OBJECT (not
// `.value`) because the emitAddColor / emitStartEdit retry loops read
// `colorPickerRef.value` after mount, not at call time.

import { watch } from "vue";
import type { Ref, ShallowRef } from "vue";
import type { ColorModel } from "@components/custom/color-picker";
import type { ColorPicker } from "@components/custom/color-picker";
import type { ViewManager } from "@composables/useViewManager";
import { normalizeColorUnit } from "@src/units/color/normalize";
import { parseCSSColor } from "@src/parsing/color";
import { usePaletteManager, type PaletteManager } from "./usePaletteManager";

export function usePaletteManagerWiring(
    colorPickerRef: Ref<InstanceType<typeof ColorPicker> | null>,
    viewManager: ViewManager,
    model: ShallowRef<ColorModel>,
    applyColorString: (css: string) => void,
    savedColorStrings: Ref<string[]>,
): PaletteManager {
    const manager = usePaletteManager({
        currentView: viewManager.currentView,
        switchView: viewManager.switchView,
        savedColorStrings,

        emitApply: (colors: string[]) => {
            if (colorPickerRef.value) {
                colorPickerRef.value.onPaletteApply(colors);
            } else {
                const first = colors[0];
                if (first === undefined) return;
                applyColorString(first);
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

    // --- Cross-module orchestration watchers (E.W2 Lane D / AUD-5.14) ---
    //
    // Lifted from usePaletteManager.ts §195–232. These four watchers bridge
    // distinct sub-composables (auth ↔ view-router ↔ browse ↔ admin ↔
    // colorQueue) and belong in the wiring layer, not the facade.

    // (1) Reload browse palettes when slug changes (always reload if on browse tab)
    watch(manager.userSlug, () => {
        if (viewManager.currentView.value === "browse") {
            manager.loadRemotePalettes();
        }
    });

    // (2) Load data when switching to a view (immediate: run on mount too)
    watch(viewManager.currentView, (view) => {
        if (view === "browse") {
            manager.loadRemotePalettes();
        }
        if (view === "admin-users" && manager.adminUsers.value.length === 0) {
            manager.loadAdminUsers();
        }
        if (view === "admin-names") {
            if (manager.adminColorQueue.value.length === 0) manager.loadColorQueue();
            if (!manager.approvedLoaded.value) manager.loadApprovedColors();
        }
    }, { immediate: true });

    // (3) Debounced server-side search: reload browse when search query changes
    let searchDebounce: ReturnType<typeof setTimeout>;
    watch(manager.searchQuery, () => {
        if (viewManager.currentView.value === "browse") {
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(() => manager.loadRemotePalettes(true), 400);
        }
    });

    // (4) Hide admin views when admin logs out
    watch(manager.isAdminAuthenticated, (auth) => {
        if (!auth && viewManager.currentView.value.startsWith("admin-")) {
            viewManager.switchView("picker");
        }
    });

    return manager;
}
