import type { ShallowRef } from "vue";
import { watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { ColorModel } from "@components/custom/color-picker";
import type { DisplayColorSpace } from "@components/custom/color-picker";
import { toCSSColorString, resolveColorSpace, colorToHexString } from "@components/custom/color-picker";
import { parseCSSColor } from "@src/parsing/color";
import { ValueUnit } from "@src/units";
import type { Color } from "@src/units/color";
import { colorUnit2, normalizeColorUnit } from "@src/units/color/normalize";
import { debounce } from "@src/utils";
import { NORMALIZED_COLOR_NAMES } from "./useColorModel";

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
            const parsed = parseCSSColor(color) as ValueUnit<Color<ValueUnit<number>>, "color">;
            const normalized = normalizeColorUnit(parsed);
            const converted = colorUnit2(normalized, resolveColorSpace(displaySpace), true, false, false);

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

        const xyz = colorUnit2(model.value.color, "xyz", true, false, false);
        const xyzStr = xyz.value.toFormattedString(2);
        const namedColor = Object.entries(NORMALIZED_COLOR_NAMES).find(
            ([, v]) => v === xyzStr,
        );

        const color = namedColor
            ? namedColor[0]
            : space === "hex"
              ? colorToHexString(model.value.color)
              : toCSSColorString(model.value.color);

        // If generation changed since debounce was scheduled, URL→Model wrote
        // in the interim — skip to avoid circular update
        if (gen !== syncGen) return;

        syncGen++;
        router.replace({ query: { ...route.query, space, color } });
    }, 300, false);

    // Initial load
    applyUrlToModel();

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
}
