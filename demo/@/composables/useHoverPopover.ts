import { ref, reactive, nextTick } from "vue";

const CAN_HOVER = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

/**
 * Shared hover-timer + floating-panel positioning pattern.
 * Used by PaletteDialog (current swatches) and PaletteCard (expanded swatches).
 */
export function useHoverPopover(options?: { canHover?: boolean }) {
    const canHover = options?.canHover ?? CAN_HOVER;

    const openIndex = ref<number | null>(null);
    const style = reactive({ top: "0px", left: "0px" });
    let hoverTimer: ReturnType<typeof setTimeout> | null = null;

    function positionPanel(swatchEl: Element, offsetY = -42) {
        const rect = swatchEl.getBoundingClientRect();
        style.top = `${rect.top + offsetY}px`;
        style.left = `${rect.left + rect.width / 2}px`;
    }

    function onHover(index: number, e: PointerEvent) {
        if (!canHover || e.pointerType === "touch") return;
        cancelLeave();
        openIndex.value = index;
        nextTick(() => positionPanel(e.currentTarget as Element));
    }

    function onLeave() {
        if (!canHover) return;
        hoverTimer = setTimeout(() => {
            openIndex.value = null;
        }, 250);
    }

    function cancelLeave() {
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            hoverTimer = null;
        }
    }

    function close() {
        cancelLeave();
        openIndex.value = null;
    }

    function onPopoverUpdateTouch(open: boolean, index: number) {
        openIndex.value = open ? index : null;
    }

    function onSwatchClick(index: number) {
        cancelLeave();
        openIndex.value = openIndex.value === index ? null : index;
    }

    return {
        canHover,
        openIndex,
        style,
        onHover,
        onLeave,
        cancelLeave,
        close,
        onPopoverUpdateTouch,
        onSwatchClick,
    };
}
