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

    let syncing = false;

    // URL → Model: parse color from route query params
    function applyUrlToModel(): boolean {
        const space = route.query.space as string | undefined;
        const color = route.query.color as string | undefined;
        if (!space || !color) return false;

        try {
            const displaySpace = space as DisplayColorSpace;
            const parsed = parseCSSColor(color) as ValueUnit<Color<ValueUnit<number>>, "color">;
            const normalized = normalizeColorUnit(parsed);
            const converted = colorUnit2(normalized, resolveColorSpace(displaySpace), true, false, false);

            syncing = true;
            updateModel({
                selectedColorSpace: displaySpace,
                inputColor: color,
                color: converted,
            });
            syncing = false;
            return true;
        } catch (e) {
            console.warn("[useColorUrl] Invalid color in URL:", color, e);
            return false;
        }
    }

    // Model → URL: write color state to route query params (debounced)
    const syncModelToUrl = debounce(() => {
        if (syncing) return;
        const space = model.value.selectedColorSpace;

        // Check if current color matches a named color
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

        syncing = true;
        router.replace({
            query: { ...route.query, space, color },
        });
        syncing = false;
    }, 300, false);

    // Initial load: apply URL params to model
    applyUrlToModel();

    // Watch route query for back/forward navigation
    watch(
        () => route.query.color,
        () => {
            if (!syncing) applyUrlToModel();
        },
    );

    // Model → URL: watch color changes
    watch(
        [() => model.value.selectedColorSpace, () => model.value.color],
        () => {
            if (!syncing) syncModelToUrl();
        },
    );
}
