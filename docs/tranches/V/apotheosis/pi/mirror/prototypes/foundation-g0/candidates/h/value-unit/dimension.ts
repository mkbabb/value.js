import { consumeNumber } from "../../../../../apotheosis/grammar/css/l4/value-unit/numeric.js";
import { cssIdentifier } from "../tokens/identifier.js";
import type { CssNumber } from "./percentage.js";

export type CssUnitFamily =
    | "length"
    | "angle"
    | "time"
    | "frequency"
    | "resolution"
    | "flex"
    | null;

export type KnownCssUnit = {
    unit: string;
    family: Exclude<CssUnitFamily, null>;
};

export type CssDimension = {
    kind: "dimension";
    number: CssNumber;
    unit: string;
    family: CssUnitFamily;
};

const families = {
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
for (const [family, units] of Object.entries(families)) {
    for (const unit of units) {
        knownUnits.set(unit, { unit, family: family as KnownCssUnit["family"] });
    }
}

const asciiLowercase = (unit: string): string => unit.replace(/[A-Z]/g, (letter) =>
    String.fromCharCode(letter.charCodeAt(0) + 0x20),
);

export const classifyCssUnit = (unit: string): KnownCssUnit | null =>
    knownUnits.get(asciiLowercase(unit)) ?? null;

export const cssDimension = consumeNumber.then(cssIdentifier)
    .map(([number, decodedUnit]): CssDimension => {
        const known = classifyCssUnit(decodedUnit);
        return {
            kind: "dimension",
            number,
            unit: known?.unit ?? decodedUnit,
            family: known?.family ?? null,
        };
    });
