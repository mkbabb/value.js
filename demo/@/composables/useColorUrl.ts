import type { ShallowRef } from "vue";
import { onUnmounted, watch } from "vue";
import type { ColorModel } from "@components/custom/color-picker";
import { toCSSColorString } from "@components/custom/color-picker";
import type { ColorSpace } from "@src/units/color/constants";
import { parseCSSColor } from "@src/parsing/color";
import { ValueUnit } from "@src/units";
import type { Color } from "@src/units/color";
import { colorUnit2, normalizeColorUnit } from "@src/units/color/normalize";
import { debounce } from "@src/utils";
import { NORMALIZED_COLOR_NAMES } from "./useColorModel";

function readHashParams(): { space?: string; color?: string } {
    const hash = window.location.hash.slice(1);
    if (!hash) return {};
    const params = new URLSearchParams(hash);
    return {
        space: params.get("space") ?? undefined,
        color: params.get("color") ?? undefined,
    };
}

function writeHashParams(space: string, color: string) {
    const params = new URLSearchParams();
    params.set("space", space);
    params.set("color", color);
    window.history.replaceState(null, "", `#${params.toString()}`);
}

export function useColorUrl(options: {
    model: ShallowRef<ColorModel>;
    updateModel: (patch: Partial<ColorModel>) => void;
}) {
    const { model, updateModel } = options;

    let syncing = false;

    // URL → Model: parse the color string into a real Color object
    function applyUrlToModel(): boolean {
        const { space, color } = readHashParams();
        if (!space || !color) return false;

        try {
            const parsed = parseCSSColor(color) as ValueUnit<Color<ValueUnit<number>>, "color">;
            const normalized = normalizeColorUnit(parsed);
            const converted = colorUnit2(normalized, space as ColorSpace, true, false, false);

            syncing = true;
            updateModel({
                selectedColorSpace: space as ColorSpace,
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

    // Model → URL: prefer named color, fall back to CSS string (debounced)
    const syncModelToUrl = debounce(() => {
        if (syncing) return;
        const space = model.value.selectedColorSpace;

        // Check if current color matches a named color
        const xyz = colorUnit2(model.value.color, "xyz", true, false, false);
        const xyzStr = xyz.value.toFormattedString(2);
        const namedColor = Object.entries(NORMALIZED_COLOR_NAMES).find(
            ([, v]) => v === xyzStr,
        );

        const color = namedColor ? namedColor[0] : toCSSColorString(model.value.color);
        syncing = true;
        writeHashParams(space, color);
        syncing = false;
    }, 300, false);

    // Initial load
    applyUrlToModel();

    // hashchange — back/forward navigation, manual URL edits
    const onHashChange = () => {
        if (!syncing) applyUrlToModel();
    };
    window.addEventListener("hashchange", onHashChange);

    onUnmounted(() => {
        window.removeEventListener("hashchange", onHashChange);
    });

    // Model → URL: watch actual color and space
    watch(
        [() => model.value.selectedColorSpace, () => model.value.color],
        () => {
            if (!syncing) syncModelToUrl();
        },
    );
}
