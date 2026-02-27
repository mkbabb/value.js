import { Parser, all, any, regex, string, whitespace } from "@mkbabb/parse-that";
import { FunctionValue, ValueArray, ValueUnit } from "../units";

import * as utils from "./utils";
import { memoize } from "@src/utils";
import { CSSValueUnit } from "./units";
import { createMathFunctionParsers, evaluateMathFunction } from "./math";

const lparen = string("(");
const rparen = string(")");
const comma = string(",");

const FunctionArgs: Parser<ValueArray> = Parser.lazy(() =>
    Value.sepBy(any(comma, whitespace))
        .trim(whitespace)
        .map((v: ValueUnit[]) => new ValueArray(...v)),
);

const handleFunc = (name?: Parser<any>) => {
    return all(
        name ? name : utils.identifier,
        FunctionArgs.wrap(lparen, rparen),
    );
};

const handleVar = () => {
    // Parse var(--custom-property) or var(--prop, fallback) with nested parens
    const varContent: Parser<any> = Parser.lazy(() =>
        any(
            regex(/[^()]+/),
            varContent
                .many(1)
                .wrap(lparen, rparen)
                .map((nested: any[]) => `(${nested.flat().join("")})`),
        ).many(1),
    );

    return string("var")
        .next(
            varContent
                .trim(whitespace)
                .wrap(lparen, rparen)
                .map((parts: any[]) => [parts].flat(Infinity).join("")),
        )
        .map((value: string) => {
            return new ValueUnit(value, "var");
        });
};

// CSS math functions: calc(), min(), max(), clamp(), round(), mod(), rem(),
// abs(), sign(), sin(), cos(), tan(), asin(), acos(), atan(), atan2(),
// pow(), sqrt(), hypot(), log(), exp()
const { mathFunction: MathFunction, calcFn: CalcFunction } = createMathFunctionParsers(CSSValueUnit.Value);

const TRANSFORM_FUNCTIONS = ["translate", "scale", "rotate", "skew"];
const TRANSFORM_DIMENSIONS = ["x", "y", "z"];

const transformDimensions = TRANSFORM_DIMENSIONS.map(utils.istring);
const transformFunctions = TRANSFORM_FUNCTIONS.map(utils.istring);

const handleTransform = () => {
    const nameParser = all(
        any(...transformFunctions),
        any(...transformDimensions, string("")),
    );

    const makeTransformName = (name: string, dim: string) => {
        return name + dim.toUpperCase();
    };

    const p = handleFunc(nameParser);

    return p.map(([[name, dim], values]: any) => {
        const lowerName = name.toLowerCase();

        // CSS has no skewZ() — skew only has X and Y axes
        const dimensions =
            lowerName === "skew"
                ? TRANSFORM_DIMENSIONS.filter((d) => d !== "z")
                : TRANSFORM_DIMENSIONS;

        const transformObject: Record<string, any> = {};

        if (dim) {
            const newName = lowerName + dim.toUpperCase();
            transformObject[newName] = values[0];
        } else if (values.length === 1) {
            dimensions.forEach((d) => {
                const newName = makeTransformName(lowerName, d);
                transformObject[newName] = values[0];
            });
        } else {
            values.forEach((v: any, i: number) => {
                const newName = makeTransformName(lowerName, dimensions[i]!);
                transformObject[newName] = v;
            });
        }

        const newValues = Object.entries(transformObject).map(([k, v]) => {
            return new FunctionValue(k, [v as any]);
        });

        return new ValueArray(...newValues);
    });
};

const gradientDirections: Record<string, number> = {
    left: 270,
    right: 90,
    top: 0,
    bottom: 180,
};

const twoKeywordCorners: Record<string, number> = {
    "top left": 315,
    "left top": 315,
    "top right": 45,
    "right top": 45,
    "bottom right": 135,
    "right bottom": 135,
    "bottom left": 225,
    "left bottom": 225,
};

const handleGradient = () => {
    const gradientNames = [
        "linear-gradient",
        "radial-gradient",
        "conic-gradient",
        "repeating-linear-gradient",
        "repeating-radial-gradient",
        "repeating-conic-gradient",
    ];
    const name = any(...gradientNames.map(utils.istring));

    const sideKeyword = any(...["left", "right", "top", "bottom"].map(utils.istring));

    // Two-keyword corner: "to top left", "to bottom right", etc.
    const twoKeywordCorner = all(
        string("to").skip(whitespace),
        sideKeyword.skip(whitespace),
        sideKeyword,
    ).map(([, d1, d2]: [string, string, string]) => {
        const key = `${d1.toLowerCase()} ${d2.toLowerCase()}`;
        const deg = twoKeywordCorners[key];
        if (deg == null) throw new Error(`Invalid gradient corner: to ${d1} ${d2}`);
        return new ValueUnit(deg, "deg");
    });

    // Single side: "to left", "to bottom", etc.
    const singleSide = all(
        string("to").skip(whitespace),
        sideKeyword,
    ).map(([, direction]: [string, string]) => {
        return new ValueUnit(gradientDirections[direction.toLowerCase()], "deg");
    });

    const sideOrCorner = any(twoKeywordCorner, singleSide);

    // Conic "from <angle>" prefix
    const fromAngle = all(
        utils.istring("from").skip(whitespace),
        CSSValueUnit.Angle,
    ).map(([, angle]: [string, any]) => angle);

    const direction = any(CSSValueUnit.Angle, sideOrCorner);

    const lengthPercentage = any(CSSValueUnit.Length, CSSValueUnit.Percentage);

    const linearColorStop = all(
        CSSValueUnit.Color,
        lengthPercentage.sepBy(whitespace),
    ).map(([color, stops]: [any, any]) => {
        if (!stops || stops.length === 0) {
            return [color];
        } else {
            return [color, ...stops];
        }
    });

    const colorStopList = all(
        linearColorStop,
        comma.trim(whitespace).next(any(linearColorStop, lengthPercentage)).many(),
    ).map(([first, rest]: [any, any[]]) => {
        return [first, ...rest];
    });

    const linearGradient = all(
        name,
        all(
            any(fromAngle, direction).skip(comma).opt(),
            colorStopList,
        )
            .trim(whitespace)
            .wrap(lparen, rparen)
            .map(([dir, stops]: [any, any]) => {
                if (!dir) {
                    return [stops];
                } else {
                    return [dir, ...stops].flat();
                }
            }),
    ).map(([name, values]: [string, any[]]) => {
        return new FunctionValue(name, values as any[]);
    });

    return linearGradient;
};

const handleCubicBezier = () => {
    return handleFunc(string("cubic-bezier")).map((v: any) => {
        return new FunctionValue("cubic-bezier", v[1]);
    });
};

export const CSS_WIDE_KEYWORDS = ["inherit", "initial", "unset", "revert", "revert-layer"] as const;

const CSSWideKeyword: Parser<ValueUnit> = any(
    ...CSS_WIDE_KEYWORDS.map(utils.istring),
).map((keyword: string) => new ValueUnit(keyword.toLowerCase(), "string", ["keyword"]));

export const CSSString = regex(/[^\(\)\{\}\s,;]+/).map((x: string) => new ValueUnit(x));

const Function_: Parser<any> = any(
    handleTransform(),
    handleVar(),
    MathFunction,
    handleGradient(),
    handleCubicBezier(),
    handleFunc().map(([name, values]: [string, any]) => {
        return new FunctionValue(name, values);
    }),
);

const Value: Parser<any> = any(CSSWideKeyword, CSSValueUnit.Value, Function_, CSSString).trim(whitespace);

export const CSSFunction = {
    Function: Function_,
    Value,
    FunctionArgs,
};

export const CSSJSON = all(string("{"), regex(/[^{}]+/), string("}")).map(
    (x: string[]) => {
        const s = x.join("\n");
        let obj = JSON.parse(s);
        return new ValueUnit(obj, "json");
    },
);

const ValuesValue: Parser<any> = any(MathFunction, CSSValueUnit.Value, Function_, CSSJSON, CSSString).trim(whitespace);

export const CSSValues = {
    Value: ValuesValue,
    Values: ValuesValue.sepBy(whitespace),
};

export const parseCSSValue = memoize((input: string): ValueUnit | FunctionValue => {
    return utils.tryParse(ValuesValue, input);
});

export const parseCSSPercent = memoize((input: string | number): number =>
    utils.tryParse(CSSValueUnit.Percentage, String(input)).valueOf(),
);

export const parseCSSTime = memoize((input: string) => {
    return utils.tryParse(
        CSSValueUnit.Time.map((v: ValueUnit) => {
            if (v.unit === "ms") {
                return v.value;
            } else if (v.unit === "s") {
                return v.value * 1000;
            } else {
                return v.value;
            }
        }),
        input,
    ) as number;
});
