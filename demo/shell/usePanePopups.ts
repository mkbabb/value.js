/**
 * A2-VA-L2-11 — a popup never outlives its pane.
 *
 * Every pane is kept alive (`PaneSlot`'s `<KeepAlive>`), so a route change
 * DEACTIVATES the pane rather than unmounting it. A Select, Popover or
 * DropdownMenu left open kept its open state, and its teleported content
 * floated over the next scene with no anchor (measured at 360×780: the
 * Gradient "Linear / Radial" listbox survived `#/gradient → #/` and sat over
 * the dock's view trigger). The law: every popup inside a pane closes when its
 * pane deactivates.
 *
 * - An UNCONTROLLED popup root takes `v-bind="popups.bind('<key>')"`: the
 *   component holds one open key (two popups of one component are never open
 *   together), and the key clears on deactivate.
 * - A CONTROLLED popup (its open state already lives in a ref, a model or a
 *   parent) closes that state in its own `onDeactivated`, citing this row.
 */
import { onDeactivated, ref } from "vue";

export function usePanePopups() {
    const openKey = ref<string | null>(null);
    onDeactivated(() => {
        openKey.value = null;
    });
    const bind = (key: string) => ({
        open: openKey.value === key,
        "onUpdate:open": (open: boolean) => {
            if (open) openKey.value = key;
            else if (openKey.value === key) openKey.value = null;
        },
    });
    return { bind };
}
