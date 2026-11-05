// usePaletteWiring — App.vue → palette-ports bridge (RF-15 §b 6: the old
// usePaletteManager god facade is dissolved into five narrow ports; this file
// adapts the root handles into the ports' deps and owns the cross-module
// orchestration watchers).
//
// Two responsibilities:
//   1. Adapt App.vue's color-picker / view-manager handles into the
//      `providePalettePorts` deps shape (the original purpose; HARDEN-4 §1.2).
//   2. Cross-module orchestration watchers (E.W2 Lane D — lifted from
//      the former facade §195–232 per AUD-5.14). These bridge
//      auth ↔ view-router ↔ browse ↔ admin ↔ colorQueue and are *wiring*,
//      not port-internal coherence.
//
// HARDEN-4 §1.2 note: `colorPickerRef` is passed as the REF OBJECT (not
// `.value`) because the emitAddColor / emitStartEdit waits watch the ref and
// read the picker when it mounts, not at call time.

import { nextTick, watch } from "vue";
import type { Ref, ShallowRef } from "vue";
import type { ColorModel } from "../../color-session/color-model";
import type { ColorPicker } from "../../picker";
import type { ViewManager } from "../../shell/useViewManager";
import { parsePickerColor, serializePickerColor } from "../../color-session/picker-color";
import { debounce } from "../../shared/debounce";
import { providePalettePorts, type PalettePorts } from "../../palettes/usePalettePorts";

// MT-REGISTER C-2 ≡ D-1 (X realization §0hw.2): a palette → picker intent waits
// on the picker REF, not on a clock. The S.W2 poll (40 × 50 ms, then give up)
// dropped any intent whose picker mounted after ~2 s; this wait has no timer, so
// a slow mount still receives it and an absent picker costs nothing. One intent
// is pending per label: a newer one replaces the older (latest wins), so a
// late mount never replays stale gestures.
const pending = new Map<string, () => void>();
export function whenRefReady<T>(
    target: Ref<T | null>,
    run: (value: T) => void,
    label: string,
): void {
    pending.get(label)?.();
    pending.delete(label);
    if (target.value) {
        run(target.value);
        return;
    }
    const stop = watch(target, (value) => {
        if (!value) return;
        stop();
        pending.delete(label);
        run(value);
    });
    pending.set(label, stop);
}

export function usePaletteWiring(
    colorPickerRef: Ref<InstanceType<typeof ColorPicker> | null>,
    viewManager: ViewManager,
    model: ShallowRef<ColorModel>,
    applyColorString: (css: string) => void,
    savedColorStrings: Ref<string[]>,
): PalettePorts {
    const whenColorPickerReady = (
        run: (picker: InstanceType<typeof ColorPicker>) => void,
        label: string,
    ): void => whenRefReady(colorPickerRef, run, label);

    const ports = providePalettePorts({
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
            // X.W5.c — the question is "does this scene already seat the
            // palettes pane", which the retired `cfg.right !== "palettes"`
            // could only ask about ONE physical side. A scene's regions answer
            // it wherever the pane sits.
            const cfg = viewManager.currentConfig.value;
            if (!cfg.regions.some((region) => region.pane === "palettes")) {
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
            // X.W5.c — the mobile pane-index write that used to open this
            // deferred tick is GONE with the index. It made the picker visible
            // for the edit by hiding the palettes pane the edit came FROM; both
            // regions are on screen now, so the edit no longer costs the user
            // sight of its own subject. The wait reads after the switch's
            // render flush, so a picker the switch unmounts is not targeted.
            void nextTick(() => {
                whenColorPickerReady((picker) => picker.onStartEdit(target), "startEdit");
            });
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
    // Lifted from the former facade §195–232. These four watchers bridge
    // distinct ports (session ↔ view-router ↔ browse ↔ admin) and belong in the
    // wiring layer, not inside any single port.

    // (1) Reload browse palettes when slug changes (always reload if on browse tab)
    watch(ports.session.userSlug, () => {
        if (viewManager.currentView.value === "browse") {
            ports.browse.loadRemotePalettes();
        }
    });

    // (2) Load data when switching to a view (immediate: run on mount too)
    watch(viewManager.currentView, (view) => {
        if (view === "browse") {
            ports.browse.loadRemotePalettes();
        }
        if (view === "admin-users" && ports.admin.adminUsers.value.length === 0) {
            ports.admin.loadAdminUsers();
        }
        if (view === "admin-names") {
            if (ports.admin.adminColorQueue.value.length === 0) ports.admin.loadColorQueue();
            if (!ports.admin.approvedLoaded.value) ports.admin.loadApprovedColors();
        }
    }, { immediate: true });

    // (3) Debounced server-side search: reload browse when search query changes
    const reloadBrowse = debounce(() => ports.browse.loadRemotePalettes(true), 400);
    watch(ports.browse.searchQuery, () => {
        if (viewManager.currentView.value === "browse") reloadBrowse();
    });

    // (4) Hide admin views when admin logs out
    watch(ports.session.isAdminAuthenticated, (auth) => {
        if (!auth && viewManager.currentView.value.startsWith("admin-")) {
            viewManager.switchView("picker");
        }
    });

    return ports;
}
