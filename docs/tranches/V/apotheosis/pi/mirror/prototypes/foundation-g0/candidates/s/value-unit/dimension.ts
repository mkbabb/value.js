import { consumeNumber } from "../../../../../apotheosis/grammar/css/l4/value-unit/numeric.js";
import { cssIdentifier } from "../tokens/identifier.js";
import type { CssNumber } from "./percentage.js";

export type CssUnitFamily = "length" | "angle" | "time" | "frequency" | "resolution" | "flex" | null;
export type KnownCssUnit = { unit: string; family: Exclude<CssUnitFamily, null> };
export type CssDimension = {
    kind: "dimension";
    number: CssNumber;
    unit: string;
    family: CssUnitFamily;
};

const lengthUnits = new Set([
    "cm", "mm", "q", "in", "pc", "pt", "px",
    "em", "rem", "ex", "rex", "cap", "rcap", "ch", "rch", "ic", "ric", "lh", "rlh",
    "vw", "vh", "vi", "vb", "vmin", "vmax",
    "svw", "svh", "svi", "svb", "svmin", "svmax",
    "lvw", "lvh", "lvi", "lvb", "lvmin", "lvmax",
    "dvw", "dvh", "dvi", "dvb", "dvmin", "dvmax",
    "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax",
]);
const angleUnits = new Set(["deg", "grad", "rad", "turn"]);
const timeUnits = new Set(["s", "ms"]);
const frequencyUnits = new Set(["hz", "khz"]);
const resolutionUnits = new Set(["dpi", "dpcm", "dppx", "x"]);

export const classifyCssUnit = (unit: string): KnownCssUnit | null => {
    const canonical = unit.replace(/[A-Z]/g, (letter) => letter.toLowerCase());
    const family = lengthUnits.has(canonical) ? "length"
        : angleUnits.has(canonical) ? "angle"
        : timeUnits.has(canonical) ? "time"
        : frequencyUnits.has(canonical) ? "frequency"
        : resolutionUnits.has(canonical) ? "resolution"
        : canonical === "fr" ? "flex"
        : null;
    return family === null ? null : { unit: canonical, family };
};

export const cssDimension = consumeNumber
    .then(cssIdentifier)
    .map(([number, decodedUnit]): CssDimension => {
        const known = classifyCssUnit(decodedUnit);
        return {
            kind: "dimension",
            number,
            unit: known?.unit ?? decodedUnit,
            family: known?.family ?? null,
        };
    });
