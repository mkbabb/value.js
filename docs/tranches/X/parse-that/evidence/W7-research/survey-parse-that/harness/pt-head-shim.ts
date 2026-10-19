// Evidence-only shim: parse-that HEAD (92d8ea7) source + the two names bbnf-lang 0.1.4 / value.js
// load.ts still reach for. regexSpan was excised at parse-that 1.0.0 (S.H2); Parser.prototype.reset
// was removed at c9338e4 (PT-WAVE-2). Both are re-supplied here with 0.8.2's observable behaviour so
// the HEAD engine can be driven by the unchanged 0.1.4 compiler. Nothing here is a proposal.
export * from "../pt-head-src/parse/index";
import { Parser, createParserContext, mergeErrorState, resetPackrat } from "../pt-head-src/parse/index";
import type { ParserState } from "../pt-head-src/parse/index";

export function regexSpan(r: RegExp) {
    const flags = r.flags.replace(/y/g, "");
    const sticky = new RegExp(r, flags + "y");
    const label = `/${r.source}/${r.flags}`;
    return new Parser((state: ParserState<any>) => {
        if (state.offset >= state.src.length) { mergeErrorState(state, label); state.isError = true; return state; }
        const saved = state.offset;
        sticky.lastIndex = saved;
        if (sticky.test(state.src)) {
            const end = sticky.lastIndex;
            state.offset = end; state.value = { start: saved, end }; state.isError = false; return state;
        }
        mergeErrorState(state, label); state.isError = true; return state;
    }, createParserContext("regex", undefined, r));
}
(Parser.prototype as any).reset = function () { resetPackrat(); };
