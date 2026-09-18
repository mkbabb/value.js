# SYNTAX-NUMBER-START G4 — independent specification challenge A

**Verdict: REJECT.**

MODEL: `gpt-5.6-sol`  
REASONING: `ultra`  
WORKFLOW: `v2`

Subject: `g4/manifest.json`  
Expected and reproduced SHA-256:
`8d5a75cf11d63fc250e9968641aae377ac8a97ed4a160470468d5c508064a342`.

I reviewed no sibling challenge receipt and requested no hidden bytes. I
assumed the boundary, harness, and verifier were defective. Two load-bearing
defects survive. No candidate code is authorized.

## Reproduction and surviving evidence

- Every manifest path reproduced its recorded SHA-256 and byte count. The
  immutable precursor is 16,016 bytes at
  `f3ff92a0b3589c00e3ec6a2b29e0394961db1b9a7bc63a3521c30209852acb1a`;
  the separate receipt is 3,204 bytes at
  `3da23e5c9d4944e5930079df3427a2f3305da5236c8549e1f772d540c60866e5`.
- The pinned CSS Syntax source was independently found at the recorded raw
  SHA-256 `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390`.
  Its number-start alternatives, zero-consumption rule, §3.3 filtering
  dependency, plus/minus/dot tokenizer callers, leading-digit non-caller, and
  consume-number precondition agree with the sealed semantic boundary.
- Public materialization reproduced 406 G3 cases (306 true, 100 false), 23
  endpoint cases (12 true, 11 false), and the three million-code-unit hostile
  cases. An independent implementation of the normative predicate found zero
  truth or continuation mismatches. All six positive spellings and digit
  endpoints 0/9 are present.
- The raw-child lane observes returned-state identity, source own-property and
  value, offset, boolean/error state, diagnostics identities/values, and global
  mode. The ordinary-parent lane exercises real `.next()` composition and the
  following grammar. Seven diagnostic profiles and both modes reproduce.
- `npm run check` is GREEN. No candidate source exists. H and B authority
  hashes reproduced; D and R preserve distinct construction constraints, with
  the explicit return-to-formation rule if three material lineages do not
  result.
- The ten-row benchmark schedule contains every candidate exactly twice in
  every position; 60 rounds give six cycles. Disabled/enabled order,
  candidate-local timed restoration, pool restoration, per-pair PRNG reset,
  10,000-by-60 resampling, and endpoint 9499 are exact.
- The base grammar path/hash set (19 files), installed parse-that dist ledger
  (64 files), installed package, mirror package/lock, and module-DAG Git object
  all reproduced without drift. The holdout receipt is correctly separate
  from, and bound to, the immutable public precursor.

## Load-bearing blocker 1 — the binding predecessor domain is not tested

The contract accepts an ordinary `ParserState` with **any predecessor value**.
Both G3 and G4 harnesses instantiate only these six classes:

```text
null, false, 0, "", frozen array, frozen object
```

They never instantiate the ordinary parse-that default: `undefined`.
`new ParserState(source)` has `value === undefined`. Hidden cases cannot close
this defect, because `assertNumberStartCase()` applies the same fixed six
factories to every public or hidden `NumberStartCase`.

Exact counterexample: wrap any otherwise conforming candidate `C` as follows.

```ts
new Parser<boolean>((state) =>
    state.value === undefined ? state.err(false) : C.parser(state))
```

It passes every sealed raw/composition/holdout invocation and the current AST
policy, yet fails the package's default `ParserState` and violates “always
succeed” plus “any predecessor value.” This is an observable contract hole,
not a demand for exhaustive testing of JavaScript values. At minimum the
default `undefined` state must be sealed in both lanes and in benchmark pool
restoration; counts, precursor, holdout binding, and manifest must then change.

## Load-bearing blocker 2 — the promised mechanical anti-source repair is bypassed

The precursor says G4 carried a repair that mechanically rejects
“computed-source, reflection, serialization, and source-bearing helper
bypasses,” and the promotion protocol claims source-bearing state helpers are
rejected. The verifier does not reject implicit object-to-string coercion.

This exact runtime reproduction on the pinned package is true:

```ts
const state = new ParserState("+1x", undefined, 0);
`${state}`.includes("+1x") === true;
```

`ParserState`'s coercion reaches its `toString()`/`statePrint()` path and exposes
the source. Yet this candidate fragment produces zero failures under the exact
G3+G4 AST/text predicates:

```ts
export const numberStart = new Parser((state) => {
    const leaked = `${state}`;
    void leaked;
    return conforming.parser(state);
});
```

There is no forbidden `src`, `String`, `.toString`, element access, loop,
reflection identifier, or forbidden import. Adding the unused coercion to an
otherwise conforming candidate passes every harness observation while directly
violating “may not inspect or derive `state.src`.” Direct
`state.toLocaleString()` is another admitted spelling.

The later human quintet is valuable but does not make the sealed claim about a
mechanical rejection floor true. Either mechanically reject implicit and
inherited coercion routes appropriate to this tiny cell, or narrow the
mechanical promise and make an exact, explicit human source-derivation gate the
binding control. That repair also changes the precursor and holdout binding.

## Three-altitude disposition

- **Total tranche:** The direct-combinator/BBNF-aligned direction remains
  correct, and the cell is appropriately provisional while the full ledger is
  RED. Advancing a boundary whose default state is untested and whose declared
  anti-scanner floor is demonstrably porous would reintroduce the same hidden
  substrate risk the reset exists to remove.
- **Wave:** Seals, cases, state observations, benchmark arithmetic, and drift
  identities are substantially repaired, but the generation has not discharged
  its own G3 repair docket. It therefore cannot open five author seats.
- **Feature:** CSS truth coverage is sound. Admission fails specifically on
  predecessor invariance and source non-observation/idiom enforcement.

Required result: start a new generation, reseal the repaired public precursor,
obtain a fresh bound holdout receipt, and rerun two independent challenges plus
gestalt. **REJECT; no candidate code.**
