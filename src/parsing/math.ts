/**
 * CSS Math Functions — parsing and evaluation.
 *
 * Supports: calc(), min(), max(), clamp(), round(), mod(), rem(),
 *           abs(), sign(), sin(), cos(), tan(), asin(), acos(), atan(), atan2(),
 *           pow(), sqrt(), hypot(), log(), exp()
 *
 * Design:
 *  - All math functions parse into FunctionValue with properly typed arguments.
 *  - `evaluateMathFunction()` resolves a FunctionValue to a numeric ValueUnit
 *    when all arguments are resolvable (no var(), no unresolvable calc()).
 *  - calc() is parsed into a nested structure of CalcOperator nodes so that
 *    `+`, `-`, `*`, `/` can be evaluated.
 */

import { Parser, all, any, regex, string, whitespace } from "@mkbabb/parse-that";
import { FunctionValue, ValueUnit } from "../units";
import { convertToDegrees } from "../units/utils";

// ────────────────────────────────────────────────────────────────
// Calc expression AST
// ────────────────────────────────────────────────────────────────

/**
 * Represents a binary operator in a calc expression.
 * Stored as a FunctionValue with name="+" | "-" | "*" | "/"
 * and values=[left, right].
 */

// ────────────────────────────────────────────────────────────────
// Parser combinators
// ────────────────────────────────────────────────────────────────

const lparen = string("(");
const rparen = string(")");
const comma = string(",");

/**
 * Parse a calc() expression into a proper AST.
 *
 * Grammar (CSS Values L4 §10):
 *   <calc-sum>     = <calc-product> [ ['+' | '-'] <calc-product> ]*
 *   <calc-product> = <calc-value>   [ ['*' | '/'] <calc-value>   ]*
 *   <calc-value>   = <number> | <dimension> | <percentage> | '(' <calc-sum> ')' | <math-function>
 */
export function createCalcParser(valueParser: Parser<any>, mathFunctionParser: Parser<any>): Parser<any> {
    const calcValue: Parser<any> = Parser.lazy(() =>
        any(
            // Nested parenthesized expression
            calcSum.trim(whitespace).wrap(lparen, rparen),
            // Math function (min, max, etc.) — must come before plain value
            mathFunctionParser,
            // Plain value (number, dimension, percentage)
            valueParser,
        ).trim(whitespace),
    );

    // Handle unary minus/plus
    const unaryCalcValue: Parser<any> = Parser.lazy(() =>
        any(
            all(string("-").trim(whitespace), calcValue).map(
                ([, val]: [string, any]) => new FunctionValue("*", [new ValueUnit(-1), val]),
            ),
            all(string("+").trim(whitespace), calcValue).map(([, val]: [string, any]) => val),
            calcValue,
        ),
    );

    const mulOp = any(string("*"), string("/")).trim(whitespace);
    const addOp = any(string("+"), string("-")).trim(whitespace);

    const calcProduct: Parser<any> = all(
        unaryCalcValue,
        all(mulOp, unaryCalcValue).many(),
    ).map(([first, rest]: [any, [string, any][]]) => {
        let result = first;
        for (const [op, right] of rest) {
            result = new FunctionValue(op, [result, right]);
        }
        return result;
    });

    const calcSum: Parser<any> = all(
        calcProduct,
        // CSS spec requires whitespace around + and - in calc
        all(addOp, calcProduct).many(),
    ).map(([first, rest]: [any, [string, any][]]) => {
        let result = first;
        for (const [op, right] of rest) {
            result = new FunctionValue(op, [result, right]);
        }
        return result;
    });

    return calcSum;
}

/**
 * Create the complete math function parser.
 * Returns a parser that handles calc(), min(), max(), clamp(), etc.
 */
export function createMathFunctionParsers(valueParser: Parser<any>) {
    // Forward declaration for recursive math functions in calc
    const mathFunction: Parser<any> = Parser.lazy(() => allMathFunctions);

    const calcSum = createCalcParser(valueParser, mathFunction);

    // calc() — full expression parser
    const calcFn = string("calc")
        .next(calcSum.trim(whitespace).wrap(lparen, rparen))
        .map((expr: any) => new FunctionValue("calc", [expr]));

    // Comma-separated calc expressions (for multi-arg functions)
    const calcArg = calcSum.trim(whitespace);
    const calcArgList = calcArg.sepBy(comma.trim(whitespace));

    // min(), max() — variadic
    const minFn = string("min")
        .next(calcArgList.wrap(lparen, rparen))
        .map((args: any[]) => new FunctionValue("min", args));

    const maxFn = string("max")
        .next(calcArgList.wrap(lparen, rparen))
        .map((args: any[]) => new FunctionValue("max", args));

    // clamp(min, val, max)
    const clampFn = string("clamp")
        .next(calcArgList.wrap(lparen, rparen))
        .map((args: any[]) => {
            if (args.length !== 3) throw new Error("clamp() requires exactly 3 arguments");
            return new FunctionValue("clamp", args);
        });

    // round(strategy?, A, B)
    const roundStrategy = any(
        string("nearest"),
        string("up"),
        string("down"),
        string("to-zero"),
    ).trim(whitespace);

    const roundFn = string("round")
        .next(
            all(
                roundStrategy.skip(comma.trim(whitespace)).opt(),
                calcArgList,
            ).wrap(lparen, rparen),
        )
        .map(([strategy, args]: [string | null, any[]]) => {
            const strategyVal = new ValueUnit(strategy ?? "nearest", "string");
            return new FunctionValue("round", [strategyVal, ...args]);
        });

    // mod(A, B), rem(A, B)
    const twoArgFn = (name: string) =>
        string(name)
            .next(calcArgList.wrap(lparen, rparen))
            .map((args: any[]) => {
                if (args.length !== 2) throw new Error(`${name}() requires exactly 2 arguments`);
                return new FunctionValue(name, args);
            });

    // Single-arg functions: abs, sign, sin, cos, tan, asin, acos, atan, sqrt, exp
    const singleArgFn = (name: string) =>
        string(name)
            .next(calcArg.trim(whitespace).wrap(lparen, rparen))
            .map((arg: any) => new FunctionValue(name, [arg]));

    // pow(base, exponent), atan2(y, x), log(value, base?)
    const powFn = twoArgFn("pow");
    const atan2Fn = twoArgFn("atan2");

    // hypot() — variadic
    const hypotFn = string("hypot")
        .next(calcArgList.wrap(lparen, rparen))
        .map((args: any[]) => new FunctionValue("hypot", args));

    // log(value) or log(value, base)
    const logFn = string("log")
        .next(calcArgList.wrap(lparen, rparen))
        .map((args: any[]) => {
            if (args.length < 1 || args.length > 2) throw new Error("log() requires 1 or 2 arguments");
            return new FunctionValue("log", args);
        });

    // CSS constants: e, pi, infinity, -infinity, NaN
    const cssConstants = any(
        string("infinity").map(() => new ValueUnit(Infinity)),
        string("-infinity").map(() => new ValueUnit(-Infinity)),
        string("NaN").map(() => new ValueUnit(NaN)),
        string("pi").map(() => new ValueUnit(Math.PI)),
        string("e").map(() => new ValueUnit(Math.E)),
    );

    const allMathFunctions: Parser<any> = any(
        calcFn,
        minFn,
        maxFn,
        clampFn,
        roundFn,
        twoArgFn("mod"),
        twoArgFn("rem"),
        singleArgFn("abs"),
        singleArgFn("sign"),
        singleArgFn("sin"),
        singleArgFn("cos"),
        singleArgFn("tan"),
        singleArgFn("asin"),
        singleArgFn("acos"),
        singleArgFn("atan"),
        atan2Fn,
        powFn,
        singleArgFn("sqrt"),
        hypotFn,
        logFn,
        singleArgFn("exp"),
        cssConstants,
    );

    return {
        calcFn,
        mathFunction: allMathFunctions,
        calcSum,
    };
}

// ────────────────────────────────────────────────────────────────
// Evaluation
// ────────────────────────────────────────────────────────────────

/**
 * Try to resolve a parsed value to a plain number.
 * Returns null if the value can't be resolved (contains var(), etc.)
 */
function resolveToNumber(node: any): number | null {
    if (node instanceof ValueUnit) {
        if (node.unit === "var" || node.unit === "calc") {
            return null; // can't resolve at parse time
        }
        if (typeof node.value === "number") {
            return node.value;
        }
        return null;
    }

    if (node instanceof FunctionValue) {
        return evaluateMathFunctionInternal(node);
    }

    if (typeof node === "number") {
        return node;
    }

    return null;
}

/**
 * For trig functions, resolve the argument to radians.
 * CSS trig functions accept angles (deg, rad, grad, turn) or plain numbers (treated as radians).
 */
function resolveToRadians(node: any): number | null {
    if (node instanceof ValueUnit) {
        if (typeof node.value !== "number") return null;
        if (node.unit && node.superType?.[0] === "angle") {
            // Convert to degrees first, then to radians
            const deg = convertToDegrees(node.value, node.unit as any);
            return (deg * Math.PI) / 180;
        }
        // Unitless = radians
        return node.value;
    }
    if (node instanceof FunctionValue) {
        const val = evaluateMathFunctionInternal(node);
        return val; // result of nested math is unitless/radians
    }
    return null;
}

function evaluateMathFunctionInternal(fn: FunctionValue): number | null {
    const name = fn.name;
    const args = fn.values;

    switch (name) {
        // Arithmetic operators (from calc AST)
        case "+": {
            const l = resolveToNumber(args[0]);
            const r = resolveToNumber(args[1]);
            if (l == null || r == null) return null;
            return l + r;
        }
        case "-": {
            const l = resolveToNumber(args[0]);
            const r = resolveToNumber(args[1]);
            if (l == null || r == null) return null;
            return l - r;
        }
        case "*": {
            const l = resolveToNumber(args[0]);
            const r = resolveToNumber(args[1]);
            if (l == null || r == null) return null;
            return l * r;
        }
        case "/": {
            const l = resolveToNumber(args[0]);
            const r = resolveToNumber(args[1]);
            if (l == null || r == null || r === 0) return null;
            return l / r;
        }

        // calc() wrapper
        case "calc": {
            return resolveToNumber(args[0]);
        }

        // Comparison functions
        case "min": {
            const vals = args.map(resolveToNumber);
            if (vals.some((v) => v == null)) return null;
            return Math.min(...(vals as number[]));
        }
        case "max": {
            const vals = args.map(resolveToNumber);
            if (vals.some((v) => v == null)) return null;
            return Math.max(...(vals as number[]));
        }
        case "clamp": {
            if (args.length !== 3) return null;
            const [lo, val, hi] = args.map(resolveToNumber);
            if (lo == null || val == null || hi == null) return null;
            return Math.max(lo, Math.min(val, hi));
        }

        // Stepped value functions
        case "round": {
            // args[0] is strategy (ValueUnit<string>), args[1] is A, args[2] is B
            if (args.length < 3) return null;
            const strategy = args[0] instanceof ValueUnit ? String(args[0].value) : "nearest";
            const a = resolveToNumber(args[1]);
            const b = resolveToNumber(args[2]);
            if (a == null || b == null || b === 0) return null;
            switch (strategy) {
                case "nearest":
                    return Math.round(a / b) * b;
                case "up":
                    return Math.ceil(a / b) * b;
                case "down":
                    return Math.floor(a / b) * b;
                case "to-zero":
                    return Math.trunc(a / b) * b;
                default:
                    return null;
            }
        }
        case "mod": {
            const a = resolveToNumber(args[0]);
            const b = resolveToNumber(args[1]);
            if (a == null || b == null || b === 0) return null;
            // CSS mod: result has sign of divisor
            return ((a % b) + b) % b;
        }
        case "rem": {
            const a = resolveToNumber(args[0]);
            const b = resolveToNumber(args[1]);
            if (a == null || b == null || b === 0) return null;
            // CSS rem: result has sign of dividend (same as JS %)
            return a % b;
        }

        // Sign-related
        case "abs": {
            const v = resolveToNumber(args[0]);
            if (v == null) return null;
            return Math.abs(v);
        }
        case "sign": {
            const v = resolveToNumber(args[0]);
            if (v == null) return null;
            return Math.sign(v);
        }

        // Trigonometric (input in angle units → converted to radians)
        case "sin": {
            const v = resolveToRadians(args[0]);
            if (v == null) return null;
            return Math.sin(v);
        }
        case "cos": {
            const v = resolveToRadians(args[0]);
            if (v == null) return null;
            return Math.cos(v);
        }
        case "tan": {
            const v = resolveToRadians(args[0]);
            if (v == null) return null;
            return Math.tan(v);
        }
        case "asin": {
            const v = resolveToNumber(args[0]);
            if (v == null) return null;
            return Math.asin(v); // returns radians
        }
        case "acos": {
            const v = resolveToNumber(args[0]);
            if (v == null) return null;
            return Math.acos(v);
        }
        case "atan": {
            const v = resolveToNumber(args[0]);
            if (v == null) return null;
            return Math.atan(v);
        }
        case "atan2": {
            const y = resolveToNumber(args[0]);
            const x = resolveToNumber(args[1]);
            if (y == null || x == null) return null;
            return Math.atan2(y, x);
        }

        // Exponential
        case "pow": {
            const base = resolveToNumber(args[0]);
            const exp = resolveToNumber(args[1]);
            if (base == null || exp == null) return null;
            return Math.pow(base, exp);
        }
        case "sqrt": {
            const v = resolveToNumber(args[0]);
            if (v == null) return null;
            return Math.sqrt(v);
        }
        case "hypot": {
            const vals = args.map(resolveToNumber);
            if (vals.some((v) => v == null)) return null;
            return Math.hypot(...(vals as number[]));
        }
        case "log": {
            const v = resolveToNumber(args[0]);
            if (v == null) return null;
            if (args.length === 2) {
                const base = resolveToNumber(args[1]);
                if (base == null) return null;
                return Math.log(v) / Math.log(base);
            }
            return Math.log(v); // natural log
        }
        case "exp": {
            const v = resolveToNumber(args[0]);
            if (v == null) return null;
            return Math.exp(v);
        }

        default:
            return null;
    }
}

/**
 * Evaluate a math FunctionValue to a numeric ValueUnit.
 * Returns null if the expression can't be fully resolved.
 *
 * The result unit is determined by the first resolvable argument's unit,
 * since CSS requires type-compatible arguments.
 */
export function evaluateMathFunction(fn: FunctionValue): ValueUnit | null {
    const result = evaluateMathFunctionInternal(fn);
    if (result == null) return null;

    // Determine the result unit from the arguments
    const unit = inferResultUnit(fn);

    return new ValueUnit(result, unit?.unit, unit?.superType);
}

/**
 * Walk the AST to find the first unit-bearing ValueUnit.
 * CSS math functions require type-compatible arguments,
 * so the first unit found represents the result type.
 */
function inferResultUnit(node: any): { unit?: string; superType?: string[] } | undefined {
    if (node instanceof ValueUnit) {
        if (node.unit && node.unit !== "string" && typeof node.value === "number") {
            return { unit: node.unit as string, superType: node.superType };
        }
        return undefined;
    }
    if (node instanceof FunctionValue) {
        // For trig inverse functions, result is in radians
        if (["asin", "acos", "atan", "atan2"].includes(node.name)) {
            return { unit: "rad", superType: ["angle"] };
        }
        // For sign/abs, inherit from argument
        for (const arg of node.values) {
            const u = inferResultUnit(arg);
            if (u) return u;
        }
    }
    return undefined;
}
