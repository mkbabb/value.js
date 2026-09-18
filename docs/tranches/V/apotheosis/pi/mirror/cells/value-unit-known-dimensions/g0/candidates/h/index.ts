import { regex } from "@mkbabb/parse-that/core";
import { consumeNumber } from "../../../../syntax-consume-number/g15/optimization/h2/index.js";

type Family = "length" | "angle" | "time" | "frequency" | "resolution" | "flex";

type Dimension = {
    kind: "dimension";
    family: Family;
    number: {
        sign: "+" | "-" | null;
        type: "integer" | "number";
        value: number;
    };
    unit: string;
};

const units = {
    length: [
        "px", "cm", "mm", "q", "in", "pc", "pt", "em", "rem", "ex", "rex", "cap", "rcap",
        "ch", "rch", "ic", "ric", "lh", "rlh", "vw", "vh", "vi", "vb", "vmin", "vmax",
        "svw", "svh", "svi", "svb", "svmin", "svmax", "lvw", "lvh", "lvi", "lvb", "lvmin",
        "lvmax", "dvw", "dvh", "dvi", "dvb", "dvmin", "dvmax", "cqw", "cqh", "cqi", "cqb",
        "cqmin", "cqmax",
    ],
    angle: ["deg", "grad", "rad", "turn"],
    time: ["s", "ms"],
    frequency: ["hz", "khz"],
    resolution: ["dpi", "dpcm", "dppx", "x"],
    flex: ["fr"],
} as const satisfies Record<Family, readonly string[]>;

const families = new Map<string, Family>(
    (Object.entries(units) as [Family, readonly string[]][])
        .flatMap(([family, values]) => values.map((unit) => [unit, family] as const)),
);

const unit = regex(new RegExp(
    `(?:${[...families.keys()].sort((a, b) => b.length - a.length).join("|")})`
        + String.raw`(?![-_a-z0-9]|[^\0-\x7f]|\\(?:[0-9a-f]|[^\n\f\r]))`,
    "i",
)).map((representation) => representation.toLowerCase());

export const knownDimension = consumeNumber.then(unit).map(([number, canonicalUnit]): Dimension => ({
    kind: "dimension",
    family: families.get(canonicalUnit)!,
    number,
    unit: canonicalUnit,
}));
