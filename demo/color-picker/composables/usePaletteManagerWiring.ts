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
import type { ColorModel } from "../../@/components/custom/color-picker";
import type { ColorPicker } from "../../@/components/custom/color-picker";
import type { ViewManager } from "../../shell/useViewManager";
import { parsePickerColor, serializePickerColor } from "../../color-session/picker-color";
import { usePaletteManager, type PaletteManager } from "../../@/composables/palette/usePaletteManager";

export function usePaletteManagerWiring(
    colorPickerRef: Ref<InstanceType<typeof ColorPicker> | null>,
    viewManager: ViewManager,
    model: ShallowRef<ColorModel>,
    applyColorString: (css: string) => void,
    savedColorStrings: Ref<string[]>,
): PaletteManager {
    // S.W2 W2-6: a BOUNDED retry for the "colorPickerRef not yet mounted" race.
    // The former self-rescheduling 50ms polls had no cap, deadline, or give-up
    // path — a permanently-absent picker (a future layout, a ref regression) left
    // a closure looping forever. Cap at a ~2s deadline, then log once and stop.
    const PICKER_WAIT_ATTEMPTS = 40; // 40 × 50ms ≈ 2s
    function whenColorPickerReady(
        run: (picker: NonNullable<typeof colorPickerRef.value>) => void,
        label: string,
    ): void {
        let attempts = 0;
        const poll = () => {
            const picker = colorPickerRef.value;
            if (picker) {
                run(picker);
                return;
            }
            if (attempts++ >= PICKER_WAIT_ATTEMPTS) {
                console.warn(
                    `[usePaletteManagerWiring] gave up waiting for the color picker to mount (${label}).`,
                );
                return;
            }
            setTimeout(poll, 50);
        };
        poll();
    }

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
                const parsed = parsePickerColor(css);
                const newStr = serializePickerColor(parsed);

                const savedColors = [...model.value.savedColors];
                const existingIdx = savedColors.findIndex((c) => {
                    try {
                        return serializePickerColor(c) === newStr;
                    } catch { return false; }
                });

                if (existingIdx >= 0) {
                    if (existingIdx > 0) {
                        const [existing] = savedColors.splice(existingIdx, 1);
                        if (existing) savedColors.unshift(existing);
                        model.value = { ...model.value, savedColors };
                    }
                } else {
                    savedColors.unshift(parsed);
                    model.value = { ...model.value, savedColors };
                }
            } catch {
                whenColorPickerReady((picker) => picker.onPaletteAddColor(css), "addColor");
            }
        },

        emitStartEdit: (target: { paletteId: string; colorIndex: number; originalCss: string }) => {
            const cur = viewManager.currentView.value;
            if (cur !== "picker" && cur !== "palettes") {
                viewManager.switchView("palettes");
            }
            // Show the picker (left pane) for the edit. The pane override is
            // route-view-tagged (MOB-2), so it must be applied AFTER the switch
            // settles `currentView` to the destination — set it in the same
            // deferred tick that waits for the picker to mount.
            setTimeout(() => {
                viewManager.mobilePaneIndex.value = 0;
                whenColorPickerReady((picker) => picker.onStartEdit(target), "startEdit");
            }, 50);
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
