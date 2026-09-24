// SERVED MODEL: claude-opus-5-5
//
// route-ts-compiler · facade.ts — a compiled rule as an ordinary parse-that (HEAD 2.x) `Parser`, so it
// composes with hand-written combinators (`.sepBy`, `.map`, `all(…)`) and answers `.parse()`. The
// kernel runs inside; parse-that sees one leaf that moves the offset and sets the value.

import { Parser, createParserContext } from "../vendor/parse-that-head/index.js";
import type { ParserState } from "../vendor/parse-that-head/index.js";
import type { K } from "./kernel.js";

export function toParser<T>(k: K, value: () => unknown, name = "bbnf"): Parser<T> {
    const leaf = (state: ParserState<T>): ParserState<T> => {
        const end = k(state.src, state.offset);
        if (end < 0) { state.isError = true; return state; }
        state.offset = end;
        state.value = value() as T;
        state.isError = false;
        return state;
    };
    const p = new Parser<T>(leaf, createParserContext("regex", undefined, name));
    return p;
}
