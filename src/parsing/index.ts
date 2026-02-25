import { Parser, all, any, regex, string, whitespace } from "@mkbabb/parse-that";
import { FunctionValue, ValueArray, ValueUnit } from "../units";

import * as utils from "./utils";
import { memoize } from "@src/utils";
import { CSSValueUnit } from "./units";

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
    // Parse var(--custom-property) or var(--prop, fallback)
    const varContent = regex(/[^)]+/);
    return string("var")
        .next(varContent.trim(whitespace).wrap(lparen, rparen))
        .map((value: string) => {
            return new ValueUnit(value, "var");
        });
};

const handleCalc = () => {
    const calcContent: Parser<string[]> = Parser.lazy(() =>
        any(
            regex(/[^()]+/),
            calcContent
                .many(1)
                .wrap(lparen, rparen)
                .map((nested: string[][]) => `(${nested.join(" ")})`),
        ).many(1),
    );

    return string("calc")
        .next(
            any(
                Parser.lazy(() => Value).trim(whitespace)
                    .wrap(lparen, rparen),
                calcContent
                    .wrap(lparen, rparen)
                    .map((parts: unknown) => (parts as string[]).join(" ")),
            ),
        )
        .map((v: any) => {
            return v instanceof ValueUnit ? v : new ValueUnit(v, "calc");
        });
};

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

        const transformObject: Record<string, any> = {};

        if (dim) {
            const newName = lowerName + dim.toUpperCase();
            transformObject[newName] = values[0];
        } else if (values.length === 1) {
            TRANSFORM_DIMENSIONS.forEach((d) => {
                const newName = makeTransformName(lowerName, d);
                transformObject[newName] = values[0];
            });
        } else {
            values.forEach((v: any, i: number) => {
                const newName = makeTransformName(lowerName, TRANSFORM_DIMENSIONS[i]);
                transformObject[newName] = v;
            });
        }

        const newValues = Object.entries(transformObject).map(([k, v]) => {
            return new FunctionValue(k, [v as any]);
        });

        return new ValueArray(...newValues);
    });
};

const gradientDirections: Record<string, string> = {
    left: "270",
    right: "90",
    top: "0",
    bottom: "180",
};

const handleGradient = () => {
    const name = any(...["linear-gradient", "radial-gradient"].map(utils.istring));
    const sideOrCorner = all(
        string("to").skip(whitespace),
        any(...["left", "right", "top", "bottom"].map(utils.istring)),
    ).map(([, direction]: [string, string]) => {
        const dir = gradientDirections[direction.toLowerCase()];
        return new ValueUnit(dir, "deg");
    });

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
        all(direction.skip(comma).opt(), colorStopList)
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

export const CSSString = regex(/[^\(\)\{\}\s,;]+/).map((x: string) => new ValueUnit(x));

const Function_: Parser<any> = any(
    handleTransform(),
    handleVar(),
    handleCalc(),
    handleGradient(),
    handleCubicBezier(),
    handleFunc().map(([name, values]: [string, any]) => {
        return new FunctionValue(name, values);
    }),
);

const Value: Parser<any> = any(CSSValueUnit.Value, Function_, CSSString).trim(whitespace);

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

const ValuesValue: Parser<any> = any(CSSValueUnit.Value, Function_, CSSJSON, CSSString).trim(whitespace);

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
