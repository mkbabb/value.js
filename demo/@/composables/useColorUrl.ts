import type { ShallowRef } from "vue";
import { watch } from "vue";
import { useUrlSearchParams } from "@vueuse/core";
import type { ColorModel } from "@components/custom/color-picker";
import type { ColorSpace } from "@src/units/color/constants";

export function useColorUrl(options: {
    model: ShallowRef<ColorModel>;
    updateModel: (patch: Partial<ColorModel>) => void;
}) {
    const { model, updateModel } = options;

    const urlParams = useUrlSearchParams<{ space?: string; color?: string }>("hash-params");

    let syncing = false;

    const applyUrlToModel = () => {
        const space = urlParams.space as string | undefined;
        const color = urlParams.color as string | undefined;
        if (space && color) {
            syncing = true;
            updateModel({
                selectedColorSpace: space as ColorSpace,
                inputColor: color,
            });
            syncing = false;
        }
    };

    // URL → model: initial load + hashchange
    applyUrlToModel();
    watch(() => [urlParams.space, urlParams.color], () => {
        if (!syncing) applyUrlToModel();
    });

    // Model → URL
    watch(
        [() => model.value.selectedColorSpace, () => model.value.inputColor],
        ([space, color]) => {
            if (syncing) return;
            syncing = true;
            urlParams.space = space;
            urlParams.color = color;
            syncing = false;
        },
        { immediate: true },
    );
}
