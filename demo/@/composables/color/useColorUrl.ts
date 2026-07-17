import type { ShallowRef } from "vue";
import { watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { ColorModel } from "@components/custom/color-picker";
import type { DisplayColorSpace } from "@components/custom/color-picker";
import { toCSSColorString, resolveColorSpace, colorToHexString } from "@components/custom/color-picker";
import { convertPickerColor, parsePickerColor, serializePickerColor } from "@lib/picker-color";
import { debounce } from "@utils/utils";

export function useColorUrl(options: {
    model: ShallowRef<ColorModel>;
    updateModel: (patch: Partial<ColorModel>) => void;
}) {
    const { model, updateModel } = options;
    const router = useRouter();
    const route = useRoute();

    // Monotonic generation counter — replaces fragile boolean syncing guard.
    // When URL→Model writes (applyUrlToModel), it increments the generation.
    // The Model→URL debounced writer captures the generation at call time and
    // no-ops if it changed (meaning someone else wrote in the interim).
    let syncGen = 0;

    // URL → Model
    function applyUrlToModel(): boolean {
        const space = route.query.space as string | undefined;
        const color = route.query.color as string | undefined;
        if (!space || !color) return false;

        try {
            const displaySpace = space as DisplayColorSpace;
            const converted = convertPickerColor(
                parsePickerColor(color),
                resolveColorSpace(displaySpace),
            );

            syncGen++;
            updateModel({
                selectedColorSpace: displaySpace,
                inputColor: color,
                color: converted,
            });
            return true;
        } catch (e) {
            console.warn("[useColorUrl] Invalid color in URL:", color, e);
            return false;
        }
    }

    // Model → URL (debounced, generation-guarded)
    const syncModelToUrl = debounce(() => {
        const gen = syncGen;
        const space = model.value.selectedColorSpace;

        const color = space === "hex"
              ? colorToHexString(model.value.color)
              : serializePickerColor(model.value.color);

        // If generation changed since debounce was scheduled, URL→Model wrote
        // in the interim — skip to avoid circular update
        if (gen !== syncGen) return;

        syncGen++;
        router.replace({ query: { ...route.query, space, color } });
    }, 300);

    // Initial load — URL-hash-wins-on-load. The result declares the persistence
    // precedence to the caller: when the hash carries no color, the caller falls
    // back to the localStorage→model restore (S.W2 · W2-1).
    const appliedFromUrl = applyUrlToModel();

    // Back/forward navigation
    watch(
        () => route.query.color,
        () => applyUrlToModel(),
    );

    // Model → URL
    watch(
        [() => model.value.selectedColorSpace, () => model.value.color],
        () => syncModelToUrl(),
    );

    return { appliedFromUrl };
}
