import { ref, computed, inject } from "vue";
import type { Ref, ShallowRef } from "vue";
import type { EditTarget } from "../../../../color-session/color-model";
import { EDIT_TARGET_KEY } from "../../../../color-session/keys";
import { writeClipboard } from "@mkbabb/glass-ui";
import { CURRENT_PALETTE_ID } from "../../../constants";
import { useHoverPopover } from "./useHoverPopover";

export interface SwatchActionsDeps {
    savedColorStrings: Ref<string[]>;
    cssColorOpaque: Ref<string>;
    emit: {
        (e: "apply", colors: string[]): void;
        (e: "addColor", css: string): void;
        (e: "startEdit", target: { paletteId: string; colorIndex: number; originalCss: string }): void;
    };
}

export function useSwatchActions(deps: SwatchActionsDeps) {
    const { savedColorStrings, cssColorOpaque, emit } = deps;

    // --- Edit target from parent (for dashed outline on editing swatch) ---
    const activeEditTarget = inject(EDIT_TARGET_KEY, ref(null) as ShallowRef<EditTarget | null>);
    function isSwatchEditing(index: number): boolean {
        const et = activeEditTarget.value;
        return !!et && et.paletteId === CURRENT_PALETTE_ID && et.colorIndex === index;
    }

    // --- Hover popover for current swatches ---
    const {
        canHover,
        openIndex: currentSwatchPopoverIndex,
        style: currentFloatingStyle,
        onHover: onCurrentSwatchHover,
        onLeave: onCurrentSwatchLeave,
        cancelLeave: cancelCurrentSwatchLeave,
        close: closeCurrentSwatchPopover,
        onPopoverUpdateTouch: onCurrentSwatchPopoverUpdateTouch,
        onSwatchClick: onCurrentSwatchClick,
    } = useHoverPopover();

    // --- Identity keys for TransitionGroup ---
    // X.W7.c (fold N-5 · C-9 ≡ MSS-3 ≡ SH-7): a swatch's key is its IDENTITY,
    // never its index. The retired colour-plus-index key map re-minted every
    // survivor's key on any non-tail removal (every index after the cut
    // shifts), so Vue replaced nodes that had not changed and the move
    // transition was unreachable by construction. Here each new list is
    // matched against the previous one BY VALUE, in order (a repeated colour
    // pairs with its earliest unclaimed predecessor): a survivor keeps its key
    // wherever it lands, and only a genuinely new colour mints one.
    let nextKey = 0;
    let previous: { color: string; key: number }[] = [];
    const swatches = computed<{ color: string; key: number }[]>(() => {
        const unclaimed = new Map<string, number[]>();
        for (const { color, key } of previous) {
            const keys = unclaimed.get(color);
            if (keys) keys.push(key);
            else unclaimed.set(color, [key]);
        }
        const next = savedColorStrings.value.map((color) => ({
            color,
            key: unclaimed.get(color)?.shift() ?? nextKey++,
        }));
        previous = next;
        return next;
    });

    // --- Swatch actions ---
    function addCurrentColor() {
        const existingIdx = savedColorStrings.value.indexOf(cssColorOpaque.value);
        if (existingIdx !== -1 && savedColorStrings.value.length > 1) {
            const reordered = savedColorStrings.value.filter((_, i) => i !== existingIdx);
            reordered.push(cssColorOpaque.value);
            emit("apply", reordered);
            return;
        }
        if (existingIdx !== -1) {
            return;
        }
        emit("addColor", cssColorOpaque.value);
    }

    function onCurrentSwatchEdit(css: string, index: number) {
        closeCurrentSwatchPopover();
        emit("startEdit", {
            paletteId: CURRENT_PALETTE_ID,
            colorIndex: index,
            originalCss: css,
        });
    }

    function onCurrentSwatchCopy(css: string) {
        closeCurrentSwatchPopover();
        void writeClipboard(css);
    }

    function onCurrentSwatchRemove(css: string, index: number) {
        closeCurrentSwatchPopover();
        const updated = savedColorStrings.value.filter((_, i) => i !== index);
        emit("apply", updated);
    }

    return {
        // State
        canHover,
        currentSwatchPopoverIndex,
        currentFloatingStyle,
        swatches,
        // Hover/popover handlers
        onCurrentSwatchHover,
        onCurrentSwatchLeave,
        cancelCurrentSwatchLeave,
        onCurrentSwatchPopoverUpdateTouch,
        onCurrentSwatchClick,
        // Swatch state checks
        isSwatchEditing,
        // Actions
        addCurrentColor,
        onCurrentSwatchEdit,
        onCurrentSwatchCopy,
        onCurrentSwatchRemove,
    };
}
