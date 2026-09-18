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

const unitFamilies = {
    length: [
        "px", "cm", "mm", "q", "in", "pc", "pt",
        "em", "rem", "ex", "rex", "cap", "rcap", "ch", "rch", "ic", "ric", "lh", "rlh",
        "vw", "vh", "vi", "vb", "vmin", "vmax",
        "lvw", "lvh", "lvi", "lvb", "lvmin", "lvmax",
        "svw", "svh", "svi", "svb", "svmin", "svmax",
        "dvw", "dvh", "dvi", "dvb", "dvmin", "dvmax",
        "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax",
    ],
    angle: ["deg", "grad", "rad", "turn"],
    time: ["s", "ms"],
    frequency: ["hz", "khz"],
    resolution: ["dpi", "dpcm", "dppx", "x"],
    flex: ["fr"],
} as const;

const knownUnits = new Map<string, KnownCssUnit>();
for (const family of Object.keys(unitFamilies) as Exclude<CssUnitFamily, null>[]) {
    for (const unit of unitFamilies[family]) knownUnits.set(unit, { unit, family });
}

function asciiLower(value: string): string {
    return value.replace(/[A-Z]/gu, (letter) => letter.toLowerCase());
}

export function classifyCssUnit(unit: string): KnownCssUnit | null {
    return knownUnits.get(asciiLower(unit)) ?? null;
}

export const cssDimension = consumeNumber.then(cssIdentifier).map(([number, decodedUnit]): CssDimension => {
    const known = classifyCssUnit(decodedUnit);
    return {
        kind: "dimension",
        number,
        unit: known?.unit ?? decodedUnit,
        family: known?.family ?? null,
    };
});
