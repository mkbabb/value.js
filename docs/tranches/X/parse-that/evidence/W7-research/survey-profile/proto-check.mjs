// SERVED MODEL: claude-opus-5-5
// W7-research · survey:profile — direct V8 evidence for the mapState finding: after a parse whose
// path runs parse-that's `mapState` (value.js `spanned` actions / `badTerm`), is the live ParserState
// still on the ordinary ParserState map, or has `Object.create(state)` turned it into a prototype?
//   node --allow-natives-syntax <dir>/proto-check.mjs
import { load } from "./common.mjs";
for (const which of ["candidate", "variant-noproto"]) {
    const m = await load(which);
    const rules = m.bbnf.grammar();
    const fresh = () => new m.ParserState("x");
    const probe = (rule, src) => { const s = new m.ParserState(src); rules[rule].reset(); rules[rule].call(s); return s; };
    const cases = [["valueTop", "1px solid red"], ["valueTop", "calc(1px @ 2px)"], ["ruleList", "a{b:c}"], ["colorTop", "red"]];
    for (const [rule, src] of cases) {
        const s = probe(rule, src);
        console.log(which.padEnd(16), rule.padEnd(9), JSON.stringify(src).padEnd(18), "sameMapAsFresh:", eval("%HaveSameMap(s, fresh())"), "fastProps:", eval("%HasFastProperties(s)"));
    }
}
