import { computed, ref, type ShallowRef, type Ref, type ComputedRef } from "vue";
import { debounce } from "../shared/debounce";
import { generateSingleColor } from "./generate-color";
import {
    PICKER_CHANNELS,
    alphaIsMissing,
    channelIsMissing,
    channelNumber,
    convertPickerColor,
    mapPickerOklabToSrgb,
    parsePickerColor,
    readPickerColor,
    serializePickerColor,
    withAlpha,
    type PickerColor,
    type PickerSpace,
} from "./picker-color";
import type { ColorModel, DisplayColorSpace } from "./color-model";
import { resolveColorSpace } from "./color-model";
import { COLOR_NAME_KEY, normalizeColorNameKey, useColorNameInput } from "./color-name-input";

export function useColorParsing(deps: {
    model: ShallowRef<ColorModel>;
    updateModel: (patch: Partial<ColorModel>) => void;
    stableHue: Ref<number>;
    currentColorSpace: ComputedRef<PickerSpace>;
}) {
    const { model, updateModel, stableHue } = deps;

    const parseColor = (source: string): PickerColor => parsePickerColor(source.trim().toLowerCase());

    const setCurrentColor = (
        color: PickerColor,
        colorSpace?: DisplayColorSpace,
        fromSpectrum = false,
    ) => {
        const converted = convertPickerColor(color, resolveColorSpace(colorSpace ?? color.space));
        updateModel({
            color: converted,
            selectedColorSpace: colorSpace ?? converted.space,
        });
        if (fromSpectrum) return;
        try {
            const hsv = convertPickerColor(converted, "hsv");
            const saturation = channelNumber(hsv, "s");
            const value = channelNumber(hsv, "v");
            if (saturation * value > 0.01) stableHue.value = channelNumber(hsv, "h");
        } catch {
            // Powerless colors have no numeric hue; retain the last deliberate hue.
        }
    };

    // UIA-V-13: the invalid state is a fact about the CURRENT text, not a
    // timed flash. It holds for as long as the text it was parsed from stays in
    // the field (no 2 s auto-clear under unchanged bad text), a repeated Enter
    // re-parses and re-states it (no swallow-guard), and it is withdrawn only
    // when the text changes — `clearParseError`, called by the field on edit
    // and on its blur snap-back — or a parse succeeds.
    let initialParse = true;
    const parseError = ref(false);
    // OD-7: a name typed while the registry read is in flight resolves late.
    // Every parse and every text change takes a new token; a late answer for a
    // superseded token is dropped — it never overwrites newer text and never
    // raises a badge on text that is no longer there.
    let parseSeq = 0;
    const clearParseError = () => {
        parseSeq++;
        parseError.value = false;
    };

    const { resolveName, pending, isNamePrefix } = useColorNameInput();

    const applyParsed = (parsed: PickerColor, inputColor: string, selected: DisplayColorSpace) => {
        const converted = convertPickerColor(parsed, resolveColorSpace(selected));
        parseError.value = false;
        if (serializePickerColor(converted) === serializePickerColor(model.value.color)) return;
        updateModel({ inputColor, color: converted, selectedColorSpace: selected });
        try {
            const hsv = convertPickerColor(converted, "hsv");
            if (channelNumber(hsv, "s") * channelNumber(hsv, "v") > 0.01) {
                stableHue.value = channelNumber(hsv, "h");
            }
        } catch {
            // Preserve stable hue for powerless colors.
        }
    };

    /** The approved-name half of the parse: `true` when `key` named a colour and it was set. */
    const applyApprovedName = (key: string): boolean => {
        const resolved = resolveName(key);
        if (!resolved) return false;
        // `inputColor` stores the approved css, not the key: boot hydration
        // re-parses it before the registry has loaded.
        applyParsed(resolved.color, resolved.css, resolved.color.space);
        return true;
    };

    // SS-8 Z-ColorInput-1 (BANK-1 fired): the library parse is total, so the
    // field reads its Result — an invalid parse raises the badge, and nothing
    // else does. The bare catch that turned ANY throw into "not a valid color"
    // is gone: an internal fault after a good parse propagates, loud.
    //
    // OD-7 (COHESION §0hh): ONE name→colour path for input and display. CSS is
    // read first (syntax + the CSS keywords), so CSS wins every collision —
    // the display snap's tie rule. On a CSS miss the text is looked up as an
    // approved name (`color-name-input.ts`: "Daraksha Sage" = `daraksha-sage`).
    // While the registry read is in flight the lookup waits for it; a settled
    // registry answers synchronously. `provisional` is the debounced parse of
    // text still being typed: a strict prefix of a name ("Dara") is withheld,
    // not reported — Enter / Apply commit and report it.
    const parseAndSetColor = (
        source: string,
        opts: { provisional?: boolean } = {},
    ): void | Promise<void> => {
        const input = source.trim().toLowerCase();
        if (!input) return;
        const seq = ++parseSeq;
        const boot = initialParse;
        initialParse = false;

        const result = readPickerColor(input);
        if (result.ok) {
            const parsed = result.value;
            const selected: DisplayColorSpace = parsed.space === "rgb" && input.startsWith("#")
                ? "hex"
                : parsed.space;
            applyParsed(parsed, input, selected);
            return;
        }

        const key = normalizeColorNameKey(input);
        if (applyApprovedName(key)) return;

        const verdict = () => {
            if (opts.provisional && isNamePrefix(key)) return;
            if (!boot) parseError.value = true;
        };
        const loading = COLOR_NAME_KEY.test(key) ? pending() : null;
        if (!loading) {
            verdict();
            return;
        }
        return loading.then(() => {
            if (seq !== parseSeq) return;
            if (!applyApprovedName(key)) verdict();
        });
    };

    const parseAndSetColorDebounced = debounce(
        (source: string) => parseAndSetColor(source, { provisional: true }),
        2000,
    );

    // X.W5.a · gate N4 + ⟨shell-dock-parseechoreadout A-7⟩ — the echo tells the
    // truth about a MISSING component. The readers beneath it are now total
    // (CSS Color 4 §4.2 resolves `none` to zero so nothing throws mid-render),
    // which is exactly why the echo must carry the distinction the resolution
    // erases: `oklch(0.6 0.2 30 / none)` used to render identically to alpha 1,
    // and a `none` channel used to render as a confident `0`.
    const astEcho = computed<{ space: string; parts: string[] }>(() => {
        const color = model.value.color;
        const parts = PICKER_CHANNELS[color.space].map((meta) => {
            if (channelIsMissing(color, meta.key)) return `${meta.key} none`;
            const value = channelNumber(color, meta.key);
            const display = meta.unit === "%" && meta.max <= 1 ? value * 100 : value;
            return `${meta.key} ${Number(display.toFixed(3))}${meta.unit}`;
        });
        if (alphaIsMissing(color)) {
            parts.push("α none");
        } else if (typeof color.alpha === "number" && color.alpha < 1) {
            parts.push(`α ${Number(color.alpha.toFixed(3))}`);
        }
        return { space: color.space, parts };
    });

    const gamutVerdict = computed<{ clips: boolean }>(() => {
        const original = convertPickerColor(model.value.color, "oklab");
        const mapped = mapPickerOklabToSrgb(original);
        const clips = original.channels.some((value, index) => {
            const mappedValue = mapped.channels[index];
            return typeof value === "number"
                && typeof mappedValue === "number"
                && Math.abs(value - mappedValue) > 1e-6;
        });
        return { clips };
    });

    const generateRandomColor = (colorSpace: DisplayColorSpace): PickerColor => {
        const parsed = parseColor(generateSingleColor("vibrant"));
        return withAlpha(
            convertPickerColor(parsed, resolveColorSpace(colorSpace)),
            model.value.color.alpha,
        );
    };

    return {
        parseColor,
        setCurrentColor,
        parseAndSetColor,
        parseAndSetColorDebounced,
        parseError,
        clearParseError,
        generateRandomColor,
        astEcho,
        gamutVerdict,
    };
}
