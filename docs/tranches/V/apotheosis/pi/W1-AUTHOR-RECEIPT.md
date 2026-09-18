# π.W1 VALUES — author receipt

> **Historical seal, not acceptance.** Both independent E-1 passes rejected this
> artifact. It is superseded by `W1-REPAIR-RECEIPT.md`; W1 remains unaccepted
> pending E-3/PB1 decisions and two independent repair re-audits.

model_served: `gpt-5.6-terra/high`

Sealed prototype-only W1 implementation. No production, `src/`, `vnext/`,
scripts, inbox, parse-that, BBNF, or keyframes files were touched.

## Delivered

- `mirror/grammar/value.ts` (184 LOC): parse-that `dispatch()` atom heads,
  `Parser.lazy` recursive values, typed W2 color seam, comma > slash > space,
  zero-argument calls, no-throw public entries, and R8 rejection.
- `mirror/grammar/keyframe-selector.ts` (81 LOC): D-4 dispatch, from/to,
  percent R4 range adjudication, named offsets, internal serializer.
- `mirror/test/w1-values.test.ts` (93 LOC): deterministic 50+/20+ scalar,
  value/list, and selector banks; LIVE agreement rows; R8 expected divergences;
  color seam remains RED.
- `mirror/test/door-stubs.test.ts`: exactly the four W1 exports now GREEN; all
  15 unowned runtime doors remain RED. W0 structural tests remain intact.

## Authorized activation repair

Root authorized the minimal accepted-W0 scanner repair required to honor the W1
no-feature-local-tokenizer rule: `mirror/util.ts` adds the generalized balanced
`emptyTopLevelItem` primitive (comma/slash), retains `emptyComma` as its wrapper,
and centralizes odd/even backslash escape parity. `mirror/test/scanners.test.ts`
adds nested/quoted/escaped comma/slash and parity coverage. This is +27 LOC;
the W1 grammar/test slice is +341 LOC, +368 LOC total versus W0 stubs.

## Evidence

- `npm test` — 8 files / 25 tests GREEN.
- `npm run check` — GREEN.
- `npm run dts-parity` — GREEN (`33 types + 19 runtime exports`).
- LIVE differential assertions: agreement for non-color scalar/value/value-list/
  selector rows; R8 internal-empty comma/slash forms are explicit expected
  divergences (LIVE accepts, mirror rejects). Trailing/leading empty forms reject
  on both current oracle and mirror. Color-bearing rows intentionally remain RED
  behind W2.

## Friction

The live scalar color path still throws for some unknown empty functional calls
(`fn()`); those hostile R1-class inputs are deliberately not used as W1 scalar
agreement rows. W1 public entries remain no-throw, and W2 owns the color path.

No self-audit performed; ready for the two independent E-1 audits.
