import { ref, computed, inject, watch } from "vue";
import type { Ref, ShallowRef } from "vue";
import type { EditTarget } from "@components/custom/color-picker";
import { EDIT_TARGET_KEY } from "@components/custom/color-picker/keys";
import { copyToClipboard } from "@composables/useClipboard";
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
        return !!et && et.paletteId === "__current__" && et.colorIndex === index;
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

    // --- Stable keys for TransitionGroup ---
    let swatchKeyCounter = 0;
    const swatchKeyMap = new Map<string, number>();
    const swatchKeys = computed(() =>
        savedColorStrings.value.map((color, i) => {
            const mapKey = `${color}::${i}`;
            if (!swatchKeyMap.has(mapKey)) {
                swatchKeyMap.set(mapKey, swatchKeyCounter++);
            }
            return swatchKeyMap.get(mapKey)!;
        }),
    );
    watch(savedColorStrings, () => {
        const validKeys = new Set(savedColorStrings.value.map((c, i) => `${c}::${i}`));
        for (const key of swatchKeyMap.keys()) {
            if (!validKeys.has(key)) swatchKeyMap.delete(key);
        }
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
            paletteId: "__current__",
            colorIndex: index,
            originalCss: css,
        });
    }

    function onCurrentSwatchCopy(css: string) {
        closeCurrentSwatchPopover();
        copyToClipboard(css);
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
        swatchKeys,
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
