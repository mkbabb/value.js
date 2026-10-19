import { computed, shallowRef, watch, type ShallowRef, type ComputedRef } from "vue";
import { debounce } from "../shared/debounce";
import { serializePickerColor, type PickerColor, type PickerSpace } from "./picker-color";
import { useCustomColorNames } from "./useCustomColorNames";
import type { ColorModel } from "./color-model";
import type { DisplayColorSpace } from "./color-model";
import { colorToHexString } from "./color-model";
import {
    CSS_NAMED_COLOR_ENTRIES,
    nearestNamedColor,
    type NamedColorEntry,
    type NamedColorMatch,
} from "./named-color-snap";

/**
 * A resolved name as the main pane shows it: a CSS keyword as written
 * (`hotpink`), an approved name as words (`daraksha-rose` → `Daraksha Rose`;
 * the API stores names as lowercase hyphenated keys).
 */
export function displayColorName(entry: NamedColorEntry): string {
    if (entry.source === "css") return entry.name;
    return entry.name
        .split("-")
        .filter(Boolean)
        .map((word) => word[0]!.toUpperCase() + word.slice(1))
        .join(" ");
}

export function useColorNameResolution(deps: {
    model: ShallowRef<ColorModel>;
    currentPhysicalColor: ComputedRef<PickerColor>;
    currentColorSpace: ComputedRef<PickerSpace>;
}) {
    const { model, currentPhysicalColor } = deps;
    const selectedDisplaySpace = computed<DisplayColorSpace>(() => model.value.selectedColorSpace);
    const { customNameEntries, getMetadata } = useCustomColorNames();

    // The named snap's whole candidate set: the CSS names (projected once, at
    // module load) first, then the approved names — so on an exact tie the CSS
    // keyword wins, the order the pre-v4 resolver checked them in.
    const namedEntries = computed<readonly NamedColorEntry[]>(() => [
        ...CSS_NAMED_COLOR_ENTRIES,
        ...(customNameEntries.value as readonly NamedColorEntry[]),
    ]);

    // --- The current colour's name, resolved off the drag path (debounced) ---
    const currentMatch = shallowRef<NamedColorMatch | undefined>(undefined);

    const recomputeMatch = debounce(() => {
        currentMatch.value = nearestNamedColor(model.value.color, namedEntries.value);
    }, 100);

    watch(() => model.value.color, () => recomputeMatch(), { immediate: true });
    // The approved names arrive asynchronously: re-resolve when they land.
    watch(namedEntries, () => recomputeMatch());

    /** The main pane's name — the display form, or `null` when the colour has none. */
    const currentColorName = computed<string | null>(() =>
        currentMatch.value ? displayColorName(currentMatch.value.entry) : null,
    );

    const formattedCurrentColor = computed(() => {
        const match = currentMatch.value;
        if (match) return match.entry.name;

        // Hex display format
        if (selectedDisplaySpace.value === "hex") {
            return colorToHexString(model.value.color);
        }

        return serializePickerColor(currentPhysicalColor.value);
    });

    function savedColorLabel(color: PickerColor): string {
        const match = nearestNamedColor(color, namedEntries.value);
        if (match) return match.entry.name;
        return serializePickerColor(color);
    }

    const currentColorMeta = computed(() => {
        const match = currentMatch.value;
        if (!match || match.entry.source !== "custom") return null;
        return getMetadata(match.entry.name) ?? null;
    });

    const crownKey = computed(() => currentColorMeta.value?.name ?? "");

    // A colour that already resolves to a name (within the margin) is named.
    const canProposeName = computed(() => !currentMatch.value);

    return {
        currentColorName,
        formattedCurrentColor,
        savedColorLabel,
        currentColorMeta,
        crownKey,
        canProposeName,
    };
}
