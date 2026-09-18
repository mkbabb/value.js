import { Parser } from "@mkbabb/parse-that";
import type { SourceSpan } from "./types.js";

export type AtomicMatch<T> = Readonly<{ raw: string; span: SourceSpan; value: T }>;

/** The sole generic character-matching primitive owned by the CSS grammar. */
export function atomic<T>(pattern: RegExp, project: (raw: string) => T): Parser<AtomicMatch<T>> {
    const flags = pattern.flags.replace(/g|y/g, "");
    const sticky = new RegExp(pattern.source, `${flags}y`);
    return new Parser<AtomicMatch<T>>((state) => {
        const start = state.offset;
        sticky.lastIndex = start;
        const match = sticky.exec(state.src);
        if (match === null || match.index !== start || match[0].length === 0) return state.err(undefined);
        const raw = match[0];
        return state.ok({ raw, span: { start, end: start + raw.length }, value: project(raw) }, raw.length);
    }, { name: "regex", args: [pattern] });
}

export function literalAtom<T>(literal: string, project: (raw: string) => T): Parser<AtomicMatch<T>> {
    const escaped = literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return atomic(new RegExp(escaped), project);
}

/** CSS's consume-a-url-token state machine, isolated at the token boundary. */
export const urlAtom = new Parser<AtomicMatch<{ bad: boolean; terminated: boolean; value: string }>>((state) => {
    const start = state.offset;
    const head = consumeUrlHead(state.src, start);
    if (head === undefined) return state.err(undefined);

    let cursor = head;
    while (/[\t\n\f\r ]/.test(state.src[cursor] ?? "")) cursor++;
    if (state.src[cursor] === "\"" || state.src[cursor] === "'") return state.err(undefined);

    let value = "";
    let bad = false;
    while (cursor < state.src.length) {
        const char = state.src[cursor]!;
        if (char === ")") {
            cursor++;
            const raw = state.src.slice(start, cursor);
            return state.ok({ raw, span: { start, end: cursor }, value: { bad, terminated: true, value } }, cursor - start);
        }
        if (/[\t\n\f\r ]/.test(char)) {
            while (/[\t\n\f\r ]/.test(state.src[cursor] ?? "")) cursor++;
            if (state.src[cursor] === ")") continue;
            bad = true;
            continue;
        }
        const code = char.charCodeAt(0);
        if (code === 0 || code >= 0xd800 && code <= 0xdfff) {
            if (code >= 0xd800 && code <= 0xdbff) {
                const second = state.src.charCodeAt(cursor + 1);
                if (second >= 0xdc00 && second <= 0xdfff) {
                    value += state.src.slice(cursor, cursor + 2);
                    cursor += 2;
                    continue;
                }
            }
            value += "\uFFFD";
            cursor++;
            continue;
        }
        if (char === "\"" || char === "'" || char === "(" || code < 0x20 || code === 0x7f) bad = true;
        if (char === "\\") {
            const escaped = consumeEscape(state.src, cursor);
            if (escaped === undefined) {
                bad = true;
                cursor++;
                continue;
            }
            value += escaped.value;
            cursor = escaped.end;
            continue;
        }
        value += char;
        cursor++;
    }

    const raw = state.src.slice(start, cursor);
    return state.ok({ raw, span: { start, end: cursor }, value: { bad, terminated: false, value } }, cursor - start);
}, { name: "regex", args: ["consume-url-token"] });

function consumeUrlHead(source: string, start: number): number | undefined {
    let cursor = start;
    let decoded = "";
    while (cursor < source.length) {
        const char = source[cursor]!;
        if (char === "(") return decoded.toLowerCase() === "url" ? cursor + 1 : undefined;
        if (char === "\\") {
            const escaped = consumeEscape(source, cursor);
            if (escaped === undefined) return undefined;
            decoded += escaped.value;
            cursor = escaped.end;
            continue;
        }
        const code = char.charCodeAt(0);
        if (!(char === "-" || char === "_" || code >= 0x80
            || code >= 0x30 && code <= 0x39
            || code >= 0x41 && code <= 0x5a
            || code >= 0x61 && code <= 0x7a)) return undefined;
        decoded += char;
        cursor++;
    }
    return undefined;
}

function consumeEscape(source: string, start: number): Readonly<{ value: string; end: number }> | undefined {
    if (source[start] !== "\\" || start + 1 >= source.length || source[start + 1] === "\n") return undefined;
    let cursor = start + 1;
    const hex = source.slice(cursor).match(/^[0-9a-f]{1,6}/i)?.[0];
    if (hex !== undefined) {
        cursor += hex.length;
        if (source[cursor] === "\r" && source[cursor + 1] === "\n") cursor += 2;
        else if (source[cursor] !== undefined && /[\t\n\f\r ]/.test(source[cursor]!)) cursor++;
        return { value: decodedCodePoint(Number.parseInt(hex, 16)), end: cursor };
    }
    return { value: source[cursor]!, end: cursor + 1 };
}

export function decodedCodePoint(codePoint: number): string {
    return codePoint === 0 || codePoint > 0x10ffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)
        ? "\uFFFD"
        : String.fromCodePoint(codePoint);
}
