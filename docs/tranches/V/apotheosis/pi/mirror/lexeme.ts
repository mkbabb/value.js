import {
    Parser,
    createParserContext,
    skipBlockComments,
    type ParserContext,
    type Span,
} from "@mkbabb/parse-that";

function leafContext(name: "regex" | "string", argument: unknown): ParserContext {
    const { parser: _undefinedParser, ...context } = createParserContext(name, undefined, argument);
    return context;
}

export function lexeme<T>(
    pattern: RegExp,
    build: (match: RegExpExecArray, start: number, end: number) => T,
): Parser<T> {
    if (!pattern.sticky) throw new TypeError("CSS lexemes require a sticky RegExp.");
    return new Parser<T>((state) => {
        const start = state.offset;
        pattern.lastIndex = start;
        const match = pattern.exec(state.src);
        if (match === null) return state.err(undefined, 0);
        const end = pattern.lastIndex;
        const output = state.ok(build(match, start, end), end - start);
        skipBlockComments(output);
        return output;
    }, leafContext("regex", pattern));
}

export function lit(text: string): Parser<string> {
    return new Parser<string>((state) => {
        if (!state.src.startsWith(text, state.offset)) return state.err(undefined, 0);
        const output = state.ok(text, text.length);
        skipBlockComments(output);
        return output;
    }, leafContext("string", text));
}

const NUM = String.raw`[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?`;

export type NumTok = Readonly<{ value: number; unit: string }>;

export const num = lexeme(new RegExp(`(${NUM})`, "y"), (match) => ({
    value: Number(match[1]),
    unit: "",
}));

export const numUnit = lexeme(new RegExp(`(${NUM})(%|[a-zA-Z-]+)?`, "y"), (match) => ({
    value: Number(match[1]),
    unit: match[2] ?? "",
}));

export const ident = lexeme(
    /(?:--(?:[a-zA-Z0-9_-]|[^\0-\x7f])*|-?(?:[a-zA-Z_]|[^\0-\x7f])(?:[a-zA-Z0-9_-]|[^\0-\x7f])*)/y,
    (match) => match[0],
);

export const fnHead = lexeme(/([a-zA-Z_-][\w-]*)\(/y, (match) => match[1]!.toLowerCase());

export const hexColor = lexeme(/#([\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})/iy, (match) => match[1]!);

const ESCAPED_CODE_POINT = String.raw`\\(?:\r\n|[\n\r\f]|[^\n\r\f])`;
export const quoted = lexeme(
    new RegExp(`"(?:${ESCAPED_CODE_POINT}|[^"\\\\\\n\\r\\f])*"|'(?:${ESCAPED_CODE_POINT}|[^'\\\\\\n\\r\\f])*'`, "y"),
    (match) => match[0],
);

const OPEN_TO_CLOSE: Readonly<Record<string, string>> = { "(": ")", "[": "]", "{": "}" };

function isEscaped(source: string, index: number): boolean {
    let backslashes = 0;
    for (let cursor = index - 1; cursor >= 0 && source[cursor] === "\\"; cursor--) backslashes++;
    return backslashes % 2 === 1;
}

export function balancedUntil(stop: string): Parser<string> {
    if (stop.length === 0) throw new TypeError("balancedUntil requires a nonempty stop token.");
    return new Parser<string>((state) => {
        const start = state.offset;
        const stack: string[] = [];
        let quote = "";
        for (let index = start; index < state.src.length; index++) {
            const char = state.src[index]!;
            if (quote) {
                if (char === quote && !isEscaped(state.src, index)) quote = "";
                continue;
            }
            if (char === '"' || char === "'") {
                quote = char;
                continue;
            }
            if (char === "/" && state.src[index + 1] === "*") {
                const close = state.src.indexOf("*/", index + 2);
                if (close < 0) return state.err(undefined, 0);
                index = close + 1;
                continue;
            }
            if (stack.length === 0 && state.src.startsWith(stop, index)) {
                return state.ok(state.src.slice(start, index).trim(), index - start);
            }
            const close = OPEN_TO_CLOSE[char];
            if (close !== undefined) {
                stack.push(close);
                continue;
            }
            if (stack.at(-1) === char) stack.pop();
        }
        return state.err(undefined, 0);
    }, leafContext("regex", stop));
}

export function runComplete<T>(grammar: Parser<T>, input: string): T | null {
    try {
        const state = grammar.parseState(input);
        return state.isError || state.offset !== input.length ? null : state.value;
    } catch {
        return null;
    }
}

export type { Span };
