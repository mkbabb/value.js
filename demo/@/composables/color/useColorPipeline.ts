import { computed, ref, watch, type ShallowRef } from "vue";
import { copyToClipboard } from "@mkbabb/glass-ui";
import { debounce } from "@utils/utils";
import type { ParsedColorUnit } from "@mkbabb/value.js/parsing";
import { ValueUnit } from "@mkbabb/value.js/units";
import type { ColorSpace } from "@mkbabb/value.js/color";
import { COLOR_SPACE_RANGES } from "@mkbabb/value.js/color";
import {
    colorUnit2,
    normalizeColorUnit,
    normalizeColorUnitComponent,
} from "@mkbabb/value.js/color";
import { clampColorToSpaceDomain } from "./valueDomain";
import type { ColorModel } from "@components/custom/color-picker";
import {
    createDefaultColorModel,
    toCSSColorString,
    colorToHexString,
    CSS_NATIVE_SPACES,
    resolveColorSpace,
} from "@components/custom/color-picker";
import { useColorParsing } from "./useColorParsing";
import { useSliderGradients } from "./useSliderGradients";
import { useColorNameResolution } from "./useColorNameResolution";
import { useColorPersistence } from "./useColorPersistence";
import { useAtmosphereFrameCoalesce } from "./useAtmosphereFrameCoalesce";

const DIGITS = 2;

/**
 * useColorPipeline — the ONE color-state spine (S.W2 · W2-1). Merges the former
 * App.vue→useAppColorModel + ColorPicker→useColorModel graph onto ONE composable
 * owning: ONE model (the App-owned ShallowRef, consumed directly — the picker's
 * second shallowRef copy + its defineModel round-trip are GONE, the picker
 * INJECTS this); ONE derivation set (cssColor / cssColorOpaque / the canonical
 * per-space savedColorStrings — seed rider 4, twins deleted); the stableHue
 * invariant preserved bit-for-bit; and declared persistence precedence
 * (URL-hash-wins-on-load, else the localStorage→model restore below, gated
 * behind URL-wins). The boot-material sink (`--saved-bg-*`/the
 * `color-picker-ground` record since T.W2-2) moved to useAtmosphere at W6-1
 * — it carries the DERIVED field material, which only the atmosphere owns.
 */
export function useColorPipeline(model: ShallowRef<ColorModel>) {
    // T-33a (T.W6.5-P) — the BORN value enters the domain law too: the model
    // arrives HYDRATED (boot/hydrate.ts seeds URL/storage/default before the
    // pipeline exists — W2-1's ordering law), so a deep-linked
    // `lab(40% 999 47)` would otherwise live in the model unclamped until
    // the first gated write. Clamp before the first derivation (initHsv
    // below reads it).
    if (model.value.color) clampColorToSpaceDomain(model.value.color);

    // The sentinel — NOT a copy — distinguishes a self-originated write (slider/
    // component edit, which carries hue explicitly) from an external one (URL
    // load, palette apply, reset, which must refresh the stable hue).
    let lastWrittenModel: ColorModel | null = null;

    const updateModel = (patch: Partial<ColorModel>) => {
        // T-33a (T.W6.5-P) — the ONE write gate: every color landing on the
        // model enters its space's value domain here (the dynamic-max law —
        // `./valueDomain`), so `lab(40% 999 47)` inks the space max and the
        // readout reservation's worst case is true by construction.
        if (patch.color) clampColorToSpaceDomain(patch.color);
        const next = { ...model.value, ...patch };
        lastWrittenModel = next;
        model.value = next; // the ONE ref — synchronous; derivations recompute now
    };

    // Stable HSV hue: oklch→HSV loses hue at low chroma (atan2(0,0)=0). stableHue
    // is the hue source-of-truth; refreshed only on external color changes.
    const initHsv = colorUnit2(model.value.color, "hsv", true, false, false);
    const stableHue = ref(initHsv.value.h.value);

    watch(
        () => model.value,
        (m) => {
            if (m === lastWrittenModel) return; // skip self-originated writes
            if (!m.color) return;
            // T-33a — the EXTERNAL-write seam: the App's URL live-sync writes
            // `model.value` directly BY DESIGN (`patchModelExternal` — an
            // updateModel write would be marked self-originated and skip this
            // very watch's stableHue refresh), so the domain law binds here
            // for that origin class; pre-flush, so render reads clamped truth.
            clampColorToSpaceDomain(m.color);
            try {
                const hsv = colorUnit2(m.color, "hsv", true, false, false);
                const s = hsv.value.s.value;
                const v = hsv.value.v.value;
                if (s * v > 0.01) stableHue.value = hsv.value.h.value;
            } catch {
                /* ignore */
            }
        },
    );

    // --- Derived colors (ONE set) ---
    const denormalizedCurrentColor = computed(() =>
        normalizeColorUnit(model.value.color, true, false),
    );

    const cssColor = computed(() => {
        if (CSS_NATIVE_SPACES.has(model.value.color.value.colorSpace)) {
            return denormalizedCurrentColor.value.value.toFormattedString(DIGITS);
        }
        return toCSSColorString(model.value.color);
    });

    const cssColorOpaque = computed(() => {
        if (CSS_NATIVE_SPACES.has(model.value.color.value.colorSpace)) {
            const denorm = denormalizedCurrentColor.value;
            const c = denorm.clone() as typeof denorm;
            c.value.alpha.value = 100;
            return c.value.toFormattedString(DIGITS);
        }
        const c = model.value.color.clone();
        c.value.alpha.value = 1;
        return toCSSColorString(c);
    });

    const HSVCurrentColor = computed(() => {
        const hsv = colorUnit2(model.value.color, "hsv", true, false, false);
        hsv.value.h.value = stableHue.value;
        return hsv;
    });

    const currentColorOpaque = computed(() => {
        const denorm = denormalizedCurrentColor.value;
        const color = denorm.clone() as typeof denorm;
        color.value.alpha.value = 100;
        return color;
    });

    const currentColorSpace = computed(() =>
        resolveColorSpace(model.value.selectedColorSpace),
    );

    const colorComponents = computed(() => {
        if (model.value.selectedColorSpace === "hex") {
            return [["hex", 0]] as [string, any][];
        }
        return Object.entries(COLOR_SPACE_RANGES[currentColorSpace.value]).filter(
            ([key]) => key !== "alpha",
        );
    });
    // --- Delegated composables (identical wiring to the former useColorModel) ---
    const {
        parseAndNormalizeColor,
        setCurrentColor,
        parseAndSetColor,
        parseAndSetColorDebounced,
        parseError,
        generateRandomColor,
        astEcho,
        gamutVerdict,
    } = useColorParsing({ model, updateModel, stableHue, currentColorSpace });

    // Persistence collaborator (S.W2 gate row 6): localStorage store + restore +
    // write-through, lifted to a sibling to hold the spine ≤ 400 LoC. The
    // pipeline stays the ONE spine; `restoreFromStorage` re-exports unchanged.
    const { restoreFromStorage, resetStorage } = useColorPersistence({
        model,
        updateModel,
        parseAndSetColor,
        parseAndNormalizeColor,
        cssColor,
    });

    const {
        componentsSlidersStyle,
        currentColorComponentsFormatted,
        currentColorRanges,
    } = useSliderGradients({
        model,
        currentColorOpaque,
        currentColorSpace,
        stableHue,
        denormalizedCurrentColor,
    });

    const {
        formattedCurrentColor,
        savedColorLabel,
        currentColorMeta,
        crownKey,
        canProposeName,
    } = useColorNameResolution({ model, denormalizedCurrentColor, currentColorSpace });
    // --- Saved colors (canonical: the picker's per-space formatted twin) ---
    const savedColorStrings = computed(() =>
        model.value.savedColors
            .filter((c) => c instanceof ValueUnit)
            .map((c) => {
                const normalized = CSS_NATIVE_SPACES.has(c.value.colorSpace)
                    ? normalizeColorUnit(c, true, false)
                    : colorUnit2(c, "oklch", true, true, false);
                return normalized.value.toFormattedString(DIGITS);
            }),
    );
    // --- Component / space mutation ---
    const updateToColorSpace = (to: ColorSpace) => {
        const color = colorUnit2(model.value.color, to, true, false, false);
        setCurrentColor(color, model.value.selectedColorSpace);
    };

    const formatForSelectedDisplaySpace = (color: ParsedColorUnit) => {
        if (model.value.selectedColorSpace === "hex") {
            return colorToHexString(color);
        }
        return normalizeColorUnit(color, true, false).value.toFormattedString(DIGITS);
    };

    const applyExternalColor = (cssColor: string) => {
        const parsed = parseAndNormalizeColor(cssColor);
        const resolved = resolveColorSpace(model.value.selectedColorSpace);
        const converted = colorUnit2(parsed, resolved, true, false, false);
        setCurrentColor(parsed, model.value.selectedColorSpace);
        updateModel({ inputColor: formatForSelectedDisplaySpace(converted) });
    };

    const updateColorComponent = (
        value: number,
        component: string,
        normalized: boolean = false,
    ) => {
        if (Number.isNaN(value) || !Number.isFinite(value)) return;
        const color = model.value.color.clone();
        if (normalized) {
            color.value[component].value = value;
        } else {
            const normalizedValue = normalizeColorUnitComponent(
                value,
                denormalizedCurrentColor.value.value[component].unit,
                currentColorSpace.value,
                component,
                false,
            );
            color.value[component].value = normalizedValue.value;
        }
        updateModel({ color });

        if (component === "h" || component === "hue") {
            const hsv = colorUnit2(color, "hsv", true, false, false);
            stableHue.value = hsv.value.h.value;
        }
    };

    const updateColorComponentDebounced = debounce(updateColorComponent, 500);
    // --- Palette handlers ---

    function onPaletteAddColor(cssColor: string) {
        const savedColors = [...model.value.savedColors];
        const currentStr = toCSSColorString(model.value.color);
        const alreadyExists = savedColors.some(
            (c) => c instanceof ValueUnit && toCSSColorString(c) === currentStr,
        );
        if (alreadyExists) return;
        try {
            savedColors.push(parseAndNormalizeColor(cssColor));
            updateModel({ savedColors });
        } catch {
            /* ignore */
        }
    }

    function onPaletteApply(colors: string[]) {
        const parsed = colors
            .map((css) => {
                try {
                    return parseAndNormalizeColor(css);
                } catch {
                    return null;
                }
            })
            .filter((c): c is ParsedColorUnit => c !== null);
        updateModel({ savedColors: parsed });
    }
    // --- App-level entry points (folded from useAppColorModel) ---

    const resetToDefaults = () => {
        const fresh = createDefaultColorModel();
        model.value = fresh; // external-origin: stableHue watch refreshes from it
        resetStorage(fresh); // cancel pending write + seed the fresh projection
    };

    const applyColorString = (css: string) => {
        try {
            const parsed = parseAndNormalizeColor(css);
            const resolved = resolveColorSpace(model.value.selectedColorSpace);
            const color = colorUnit2(parsed, resolved, true, false, false);
            const inputColor = formatForSelectedDisplaySpace(color);
            updateModel({ color, inputColor });
        } catch {
            /* ignore parse errors */
        }
    };

    // W6-1 (S.W6): the former applyTokens sink is GONE from the pipeline. It
    // persisted the RAW opaque pick — the boot↔field material mismatch behind
    // the load darkening/lightening snap (the ground painted the pick, the
    // first aurora frame painted the derived field). The boot material is now
    // owned by useAtmosphere: the `--saved-bg-0..3` per-stop tokens + the
    // `color-picker-ground` record (T.W2-2) carry the derived GRADIENT, so
    // boot → first frame is ONE material. The inline-background clears died
    // with the index.html boot script's inline writes (the fouc-guard
    // gradient template is the one pre-hydration ground now). (--accent-live
    // and the W7-4 per-view accent tokens stay App-scoped — they read
    // contrast/view state, seed rider 1.)

    // --- W3-1 (S.W3): rAF-coalesce the colour → atmosphere fan-out ---
    // The coalesced projection the atmosphere fan-out consumes (aurora seed +
    // blob palette + `--accent-live`): AT MOST ONE derive per animation frame
    // under a slider drag, S-18 last-of-frame-wins preserved bit-for-bit. Lifted
    // to `useAtmosphereFrameCoalesce` at T.W6.5 close (the PP-8 cohesion cure) —
    // the perf concern + its rAF lifecycle + the full rationale travel whole into
    // the named composable; the picker's own instant surfaces keep synchronous
    // `cssColorOpaque`, only the atmosphere coalesces.
    const cssColorOpaqueFrame = useAtmosphereFrameCoalesce(cssColorOpaque);

    return {
        // Model
        model,
        updateModel,
        // Derived colors (ONE set)
        denormalizedCurrentColor,
        cssColor,
        cssColorOpaque,
        // W3-1: the rAF-coalesced opaque colour the atmosphere fan-out consumes
        // (aurora seed + blob palette + --accent-live) — one derive per frame.
        cssColorOpaqueFrame,
        HSVCurrentColor,
        stableHue,
        currentColorOpaque,
        currentColorSpace,
        colorComponents,
        // Name resolution
        formattedCurrentColor,
        savedColorLabel,
        currentColorMeta,
        crownKey,
        canProposeName,
        // Saved colors
        savedColorStrings,
        onPaletteAddColor,
        onPaletteApply,
        // Parsing / setting
        parseAndNormalizeColor,
        setCurrentColor,
        parseAndSetColor,
        parseAndSetColorDebounced,
        parseError,
        applyExternalColor,
        applyColorString,
        astEcho,
        gamutVerdict,
        // Random
        generateRandomColor,
        // Slider styles
        componentsSlidersStyle,
        currentColorComponentsFormatted,
        currentColorRanges,
        // Component updates
        updateToColorSpace,
        updateColorComponent,
        updateColorComponentDebounced,
        // App-level entry points
        resetToDefaults,
        restoreFromStorage,
        // Clipboard
        copyToClipboard,
        // Constants
        DIGITS,
    };
}

export type UseColorPipelineReturn = ReturnType<typeof useColorPipeline>;
