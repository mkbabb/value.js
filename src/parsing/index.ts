import P from "parsimmon";
import { FunctionValue, ValueArray, ValueUnit } from "../units";

import * as utils from "./utils";
import { memoize } from "@src/utils";
import { CSSValueUnit } from "./units";

const handleFunc = (r: P.Language, name?: P.Parser<any>) => {
    return P.seq(
        name ? name : utils.identifier,
        r.FunctionArgs.wrap(r.lparen, r.rparen),
    );
};

const handleVar = (r: P.Language) => {
    return P.string("var")
        .then(r.String.trim(r.ws).wrap(r.lparen, r.rparen))
        .map((value) => {
            return new ValueUnit(value, "var");
        });
};

const handleCalc = (r: P.Language) => {
    const calcContent: P.Parser<string[]> = P.lazy(() =>
        P.alt(
            P.regexp(/[^()]+/),
            calcContent
                .atLeast(1)
                .wrap(r.lparen, r.rparen)
                .map((nested: string[][]) => `(${nested.join(" ")})`),
        ).atLeast(1),
    );

    return P.string("calc")
        .then(
            P.alt(
                r.Value.trim(r.ws)
                    .wrap(r.lparen, r.rparen)
                    .map((v) => v),
                calcContent
                    .wrap(r.lparen, r.rparen)
                    .map((parts: unknown) => (parts as string[]).join(" ")),
            ),
        )
        .map((v) => {
            return v instanceof ValueUnit ? v : new ValueUnit(v, "calc");
        });
};

const TRANSFORM_FUNCTIONS = ["translate", "scale", "rotate", "skew"];
const TRANSFORM_DIMENSIONS = ["x", "y", "z"];

const transformDimensions = TRANSFORM_DIMENSIONS.map(utils.istring);
const transformFunctions = TRANSFORM_FUNCTIONS.map(utils.istring);

const handleTransform = (r: P.Language) => {
    const nameParser = P.seq(
        P.alt(...transformFunctions),
        P.alt(...transformDimensions, P.string("")),
    );

    const makeTransformName = (name: string, dim: string) => {
        return name + dim.toUpperCase();
    };

    const p = handleFunc(r, nameParser);

    return p.map(([[name, dim], values]: [string[], ValueUnit[]]) => {
        name = name.toLowerCase();

        const transformObject: Record<string, any> = {};

        if (dim) {
            const newName = name + dim.toUpperCase();
            transformObject[newName] = values[0];
        } else if (values.length === 1) {
            TRANSFORM_DIMENSIONS.forEach((d, i) => {
                const newName = makeTransformName(name, d);
                transformObject[newName] = values[0];
            });
        } else {
            values.forEach((v, i) => {
                const newName = makeTransformName(name, TRANSFORM_DIMENSIONS[i]);
                transformObject[newName] = v;
            });
        }

        const newValues = Object.entries(transformObject).map(([k, v]) => {
            return new FunctionValue(k, [v as any]);
        });

        return new ValueArray(...newValues);
    });
};

const gradientDirections = {
    left: "270",
    right: "90",
    top: "0",
    bottom: "180",
};

const handleGradient = (r: P.Language) => {
    const name = P.alt(...["linear-gradient", "radial-gradient"].map(utils.istring));
    const sideOrCorner = P.seq(
        P.string("to").skip(r.ws),
        P.alt(...["left", "right", "top", "bottom"].map(utils.istring)),
    ).map(([to, direction]) => {
        direction = (gradientDirections as Record<string, string>)[direction.toLowerCase()];
        return new ValueUnit(direction, "deg");
    });

    const direction = P.alt(CSSValueUnit.Angle, sideOrCorner);

    const lengthPercentage = P.alt(CSSValueUnit.Length, CSSValueUnit.Percentage);

    const linearColorStop = P.seq(
        CSSValueUnit.Color,
        P.sepBy(lengthPercentage, r.ws),
    ).map(([color, stops]: [any, any]) => {
        if (!stops) {
            return [color];
        } else {
            return [color, ...stops];
        }
    });

    const colorStopList = P.seq(
        linearColorStop,
        r.comma.trim(r.ws).then(linearColorStop.or(lengthPercentage)).many(),
    ).map(([first, rest]) => {
        return [first, ...rest];
    });

    const linearGradient = P.seq(
        name,
        P.seq(utils.opt(direction.skip(r.comma)), colorStopList)
            .trim(r.ws)
            .wrap(r.lparen, r.rparen)
            .map(([direction, stops]) => {
                if (!direction) {
                    return [stops];
                } else {
                    return [direction, ...stops].flat();
                }
            }),
    ).map(([name, values]) => {
        return new FunctionValue(name, values as any[]);
    });

    return linearGradient;
};

const handleCubicBezier = (r: P.Language) => {
    return handleFunc(r, P.string("cubic-bezier")).map((v) => {
        return new FunctionValue("cubic-bezier", v[1]);
    });
};

export const CSSString = P.regexp(/[^\(\)\{\}\s,;]+/).map((x) => new ValueUnit(x));

export const CSSFunction = P.createLanguage({
    ws: () => P.optWhitespace,
    lparen: () => P.string("("),
    rparen: () => P.string(")"),
    comma: () => P.string(","),

    FunctionArgs: (r) =>
        r.Value.sepBy(P.string(",").or(r.ws))
            .trim(r.ws)
            .map((v) => new ValueArray(...v)),

    Function: (r) =>
        P.alt(
            handleTransform(r),
            handleVar(r),
            handleCalc(r),
            handleGradient(r),
            handleCubicBezier(r),
            handleFunc(r).map(([name, values]) => {
                return new FunctionValue(name, values);
            }),
        ),

    Value: (r) => P.alt(CSSValueUnit.Value, r.Function, CSSString).trim(r.ws),
});

export const CSSJSON = P.seq(P.string("{"), P.regexp(/[^{}]+/), P.string("}")).map(
    (x) => {
        const s = x.join("\n");
        let obj = eval("(" + s + ")");
        return new ValueUnit(obj, "json");
    },
);

export const CSSValues = P.createLanguage({
    ws: () => P.optWhitespace,

    Value: () =>
        P.alt(CSSValueUnit.Value, CSSFunction.Function, CSSJSON, CSSString).trim(
            P.optWhitespace,
        ),

    Values: (r) => r.Value.sepBy(r.ws),
});

export const parseCSSValue = memoize((input: string): ValueUnit | FunctionValue => {
    return CSSValues.Value.tryParse(input);
});

export const parseCSSPercent = memoize((input: string | number): number =>
    CSSValueUnit.Percentage.tryParse(String(input)).valueOf(),
);

export const parseCSSTime = memoize((input: string) => {
    return CSSValueUnit.Time.map((v: ValueUnit) => {
        if (v.unit === "ms") {
            return v.value;
        } else if (v.unit === "s") {
            return v.value * 1000;
        } else {
            return v.value;
        }
    }).tryParse(input) as number;
});
