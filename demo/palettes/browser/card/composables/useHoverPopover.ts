import { ref } from "vue";

/**
 * Which swatch's action popover is open, for a row of swatches.
 * Used by CurrentPaletteEditor (current swatches) and PaletteInspector (a card's swatches).
 *
 * X.W12.u1 (UIA-V-25): hover intent, the leave timer and the panel position are glass's
 * — each swatch rides `<Popover trigger="hover">`, which opens a hover card on fine
 * pointers and a click popover on coarse ones and reports every change through
 * `update:open`. This holds only the one-open-at-a-time index.
 */
export function useHoverPopover() {
    const openIndex = ref<number | null>(null);

    function onOpenChange(open: boolean, index: number) {
        if (open) openIndex.value = index;
        else if (openIndex.value === index) openIndex.value = null;
    }

    function close() {
        openIndex.value = null;
    }

    return { openIndex, onOpenChange, close };
}
