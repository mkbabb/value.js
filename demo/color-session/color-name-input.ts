/**
 * OD-7 (COHESION §0hh): an approved custom name typed into the colour field.
 *
 * The field's parse reads CSS first (`readPickerColor`: CSS syntax + the CSS
 * keywords). Only on a CSS miss does it look the text up here, as an approved
 * name. CSS therefore wins every collision — the same rule the display snap
 * (`nearestNamedColor`) applies on an exact tie, so input and display agree.
 *
 * Input and display read ONE registry (`useCustomColorNames`): the display
 * projects each approved `css` into OKLab; the input parses the same `css`.
 */
import { watch } from "vue";
import { readPickerColor, type PickerColor } from "./picker-color";
import { CSS_NAMED_COLOR_ENTRIES } from "./named-color-snap";
import { useCustomColorNames } from "./useCustomColorNames";

/** The API's name schema (`api/src/modules/color/schema.ts`): `/^[a-z][a-z0-9-]*$/`. */
export const COLOR_NAME_KEY = /^[a-z][a-z0-9-]*$/;

/**
 * Typed text → the registry's key form: "Daraksha Sage", " daraksha_sage "
 * and "Daraksha-Sage" all read `daraksha-sage`.
 */
export function normalizeColorNameKey(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export interface ApprovedNameResolution {
    /** The approved css (what `inputColor` stores — boot re-parses it before the registry loads). */
    css: string;
    color: PickerColor;
}

export function useColorNameInput() {
    const names = useCustomColorNames();

    /** The approved colour for a normalized key, or `undefined`. */
    function resolveName(key: string): ApprovedNameResolution | undefined {
        if (!COLOR_NAME_KEY.test(key)) return undefined;
        const entry = names.getMetadata(key);
        if (!entry) return undefined;
        const result = readPickerColor(entry.css);
        return result.ok ? { css: entry.css, color: result.value } : undefined;
    }

    /**
     * Resolves when the registry read in flight settles; `null` when none is.
     * The parse path never starts a read itself.
     */
    function pending(): Promise<void> | null {
        if (!names.loading.value) return null;
        return new Promise<void>((resolve) => {
            const stop = watch(names.loading, (loading) => {
                if (loading) return;
                stop();
                resolve();
            });
        });
    }

    /** True while `key` is a strict prefix of an approved name or a CSS keyword. */
    function isNamePrefix(key: string): boolean {
        if (!COLOR_NAME_KEY.test(key)) return false;
        const strict = (name: string) => name !== key && name.startsWith(key);
        return CSS_NAMED_COLOR_ENTRIES.some((e) => strict(e.name))
            || names.customNameEntries.value.some((e) => strict(e.name));
    }

    return { resolveName, pending, isNamePrefix };
}
