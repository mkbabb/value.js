# Producer row: bbnf-lang's TypeScript emitter, and the size cost of recursive text-mode rules
**Filed 2026-10-15 under COHESION §0fe.2.** It does not block value.js.

**Who:** from value.js X.P.W8 (`.cust`) to bbnf-lang, at emitter pin `f0059db14` on branch `x-p-w7-typescript`.

## What we measured
The record is `bench/records/W8cust/e6.txt`. Sizes are `esbuild --minify | gzip | wc -c`.
- A recursive rule pair that nests three bracket kinds costs about **430 B gz** in the emitted module (`customBlk` + `blockRun`; variant J: 14,635 → 15,168).
- Adding one trivial alternative to an existing rule costs **107 B gz** (probe H).
- Text mode over a structured term set emits a recognize twin of the whole value grammar: **18,881 B gz** against 14,635 (variant A).

## Ask
1. Make the per-rule and per-alternative emission smaller: shared combinator helpers instead of inlined wrappers, and interned name strings.
2. In text or recognize mode, do not duplicate rules that the parse-mode grammar already emits.
3. Have a size regression in the emitter's own test suite.

value.js re-measures E-6 when a new emitter lands, and lowers the ceiling to match (COHESION §0fe.2).
