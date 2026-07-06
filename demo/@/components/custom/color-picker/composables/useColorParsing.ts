import { computed, ref, type ShallowRef, type Ref, type ComputedRef } from "vue";
import { debounce } from "@src/utils";
// S.W5-6 · F15: the generation engine lives in its own feature tree
// (`custom/generate/composables/`); the picker consumes the one pure helper.
import { generateSingleColor } from "@components/custom/generate/composables/useColorGeneration";
import { parseCSSColor } from "@src/parsing/color";
import type { ParsedColorUnit } from "@src/parsing/color";
import type { ColorSpace } from "@src/units/color/constants";
import { COLOR_SPACE_RANGES } from "@src/units/color/constants";
import { colorUnit2, normalizeColorUnit } from "@src/units/color/normalize";
import { deltaEOK, gamutMapOKLab, DELTA_E_OK_JND } from "@src/units/color/gamut";
import type { ColorModel } from "@components/custom/color-picker";
import type { DisplayColorSpace } from "@components/custom/color-picker";
import { resolveColorSpace } from "@components/custom/color-picker";

const DEFAULT_COLOR = "lavendi";

export function useColorParsing(deps: {
    model: ShallowRef<ColorModel>;
    updateModel: (patch: Partial<ColorModel>) => void;
    stableHue: Ref<number>;
    currentColorSpace: ComputedRef<ColorSpace>;
}) {
    const { model, updateModel, stableHue, currentColorSpace } = deps;

    const getColorSpace = (color: ParsedColorUnit) => {
        return color.value.colorSpace as ColorSpace;
    };

    const parseAndNormalizeColor = (value: string) => {
        let color: ParsedColorUnit;
        try {
            value = value.trim().toLowerCase();
            color = parseCSSColor(value);
        } catch (e) {
            console.warn("[useColorModel] Invalid color:", value, e);
            color = parseCSSColor(DEFAULT_COLOR);
        }
        return normalizeColorUnit(color);
    };

    const setCurrentColor = (
        color: ParsedColorUnit,
        colorSpace?: DisplayColorSpace,
        fromSpectrum?: boolean,
    ) => {
        const resolved = resolveColorSpace(colorSpace ?? getColorSpace(color));
        const converted = colorUnit2(
            color,
            resolved,
            true,
            false,
            false,
        );
        // Preserve the display space (e.g. "hex") rather than replacing with "rgb"
        updateModel({
            color: converted,
            selectedColorSpace: colorSpace ?? converted.value.colorSpace,
        });
        // When called from spectrum, hue is already stable -- don't overwrite
        // from the lossy roundtrip. All other callers update stableHue.
        if (!fromSpectrum) {
            const hsv = colorUnit2(converted, "hsv", true, false, false);
            const s = hsv.value.s.value;
            const v = hsv.value.v.value;
            if (s * v > 0.01) {
                stableHue.value = hsv.value.h.value;
            }
        }
    };

    let prevInvalidParsedValue = "";
    let isInitialParse = true;

    // --- Parse error feedback ---
    const parseError = ref(false);
    let parseErrorTimer: ReturnType<typeof setTimeout> | undefined;

    const flashParseError = () => {
        parseError.value = true;
        clearTimeout(parseErrorTimer);
        parseErrorTimer = setTimeout(() => { parseError.value = false; }, 2000);
    };

    const parseAndSetColor = (newVal: string) => {
        try {
            newVal = newVal.trim().toLowerCase();
            if (!newVal || newVal === prevInvalidParsedValue) return;

            // Parse directly -- throws on invalid input (no silent fallback)
            const parsed = parseCSSColor(newVal);
            const normalized = normalizeColorUnit(parsed);

            if (normalized?.value?.toString() === model?.value?.color?.value?.toString()) {
                parseError.value = false;
                return;
            }

            const converted = colorUnit2(
                normalized,
                getColorSpace(normalized),
                true,
                false,
                false,
            );

            parseError.value = false;
            prevInvalidParsedValue = "";

            // If input is a hex string, select "hex" display mode rather than "rgb"
            const detectedSpace: DisplayColorSpace =
                converted.value.colorSpace === "rgb" && newVal.startsWith("#")
                    ? "hex"
                    : converted.value.colorSpace;

            updateModel({
                inputColor: newVal,
                color: converted,
                selectedColorSpace: detectedSpace,
            });

            // Update stableHue from parsed color
            const parsedHsv = colorUnit2(converted, "hsv", true, false, false);
            const ps = parsedHsv.value.s.value;
            const pv = parsedHsv.value.v.value;
            if (ps * pv > 0.01) {
                stableHue.value = parsedHsv.value.h.value;
            }

        } catch (e) {
            prevInvalidParsedValue = newVal;
            if (!isInitialParse) {
                flashParseError();
            }
        } finally {
            isInitialParse = false;
        }
    };

    const parseAndSetColorDebounced = debounce(parseAndSetColor, 2000, false);

    // ── The Parse-Lab echo (R.W4 Lane E / E4 — Q10 RATIFIED 2026-07-03) ──
    //
    // The input's AST echo + gamut-verdict echo. The verdict runs the SAME
    // deltaEOK / gamutMapOKLab / DELTA_E_OK_JND computation the R.W3 plate
    // overlay draws (`useGamutOverlay` → `sampleGamutBoundary`'s `jnd` mode),
    // so the drawn contour and the typed verdict can never disagree about
    // what "visible clipping" means. Zero new library exports — all three
    // are public since O.W2.

    /** The parsed structure: space + per-channel readout (the AST echo). */
    const astEcho = computed<{ space: string; parts: string[] } | null>(() => {
        const color = model.value.color;
        if (!color?.value) return null;
        try {
            const space = color.value.colorSpace as ColorSpace;
            // Denormalize (inverse) for human-readable channel numbers; the
            // model color itself is normalized and stays untouched (clone).
            const denorm = colorUnit2(color, space, true, true, false);
            const c = denorm.value as unknown as Record<
                string,
                { value: unknown; unit?: unknown } | undefined
            > & { channels: readonly string[]; alpha?: { value?: unknown } | number };
            const parts = c.channels.map((key) => {
                const vu = c[key];
                const v = vu?.value;
                const unit =
                    vu?.unit && vu.unit !== "number" ? String(vu.unit) : "";
                const num =
                    typeof v === "number" ? Number(v.toFixed(3)) : String(v);
                return `${key} ${num}${unit}`;
            });
            const alphaRaw =
                typeof c.alpha === "number" ? c.alpha : c.alpha?.value;
            if (typeof alphaRaw === "number" && alphaRaw < 1) {
                parts.push(`α ${Number(alphaRaw.toFixed(3))}`);
            }
            return { space, parts };
        } catch {
            return null;
        }
    });

    /** The typed gamut verdict — Δ of the sRGB gamut-mapped twin vs the JND. */
    const gamutVerdict = computed<{
        delta: number;
        jndRatio: number;
        clips: boolean;
    } | null>(() => {
        const color = model.value.color;
        if (!color?.value) return null;
        try {
            // Normalized [0,1] channels → RAW OKLab via the library's own
            // number ranges (the gamut functions take raw OKLab; the display
            // denorm would hand back l as a 0–100 percentage).
            const ok = colorUnit2(color, "oklab", true, false, false);
            const { l: lr, a: ar, b: br } = COLOR_SPACE_RANGES.oklab;
            const raw = (n: number, r: { min: number; max: number }) =>
                r.min + n * (r.max - r.min);
            const L = raw(ok.value.l.value, lr.number);
            const a = raw(ok.value.a.value, ar.number);
            const b = raw(ok.value.b.value, br.number);
            if (![L, a, b].every((v) => Number.isFinite(v))) return null;
            const [mL, mA, mB] = gamutMapOKLab(L, a, b);
            const delta = deltaEOK(L, a, b, mL, mA, mB);
            return {
                delta,
                jndRatio: delta / DELTA_E_OK_JND,
                clips: delta > DELTA_E_OK_JND,
            };
        } catch {
            return null;
        }
    });

    // --- Random color ---

    const generateRandomColor = (
        colorSpace: DisplayColorSpace,
    ): ParsedColorUnit => {
        // Generate a pleasing random color using OKLCh-constrained generation
        const css = generateSingleColor("vibrant");
        const parsed = parseAndNormalizeColor(css);
        const color = colorUnit2(
            parsed,
            resolveColorSpace(colorSpace),
            true,
            false,
            true,
        );
        color.value.alpha = model.value.color.value.alpha;
        return color;
    };

    return {
        parseAndNormalizeColor,
        setCurrentColor,
        parseAndSetColor,
        parseAndSetColorDebounced,
        parseError,
        generateRandomColor,
        astEcho,
        gamutVerdict,
    };
}
