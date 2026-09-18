# VALUE-PERCENTAGE-LITERAL G0

**Scope:** prototype one direct parse-that grammar production for a literal
CSS `<percentage>`. This is prototype evidence, not production execution or
feature acceptance.

## Fixed authority

- CSS Values and Units Level 4, `#percentages`: a literal percentage is a
  `<number>` immediately followed by `%` and corresponds to a CSS Syntax
  `<percentage-token>`.
- The accepted numeric owner is
  `../../../apotheosis/grammar/css/l4/value-unit/numeric.ts`, exact source
  SHA-256 `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`.
- The candidate must import and compose `consumeNumber`; it may not duplicate
  the number regex or create a lexer, token object, CST, cursor, scanner, raw
  remainder capture, or per-call parser.
- Only published `@mkbabb/parse-that@1.0.0` public exports may be used.

## Candidate interface

Each candidate exports exactly one parser named `percentageLiteral`. A success
has this grammar-shaped value:

```ts
{
    kind: "percentage";
    number: {
        sign: "+" | "-" | null;
        type: "integer" | "number";
        value: number;
    };
}
```

The parser is prefix-consuming: `12%tail` succeeds at offset 3. Whitespace or
comments between the number and `%` are forbidden. Contextual bounds such as
keyframes' `[0,100]` restriction do not belong to this literal production.

On failure, the operation must not throw and must not consume input past its
entry offset. In parse-that 1.0.0 a failed aggregate can retain an intermediate
`state.value`; that value is non-authoritative while `isError === true` and is
not part of this feature contract. A construction that fails after advancing
the offset is ineligible.

## Public observations

Successes: `0%`, `+12%`, `-.5%`, `1.25e2%`, `12%tail`.

Failures at entry offset: `%`, `x%`, `12 %`, `12x`, `1e+%`, `1.2.3%`.

The exact result keys are `kind, number`; numeric keys remain
`sign, type, value`. The parser object is constructed once and remains stable
over repeated calls.

## Orthogonal author seats

- H: method-composition topology centered on `skip`.
- B: fused sequencing topology centered on `all`.
- S: guarded/alternative public-combinator topology, without `chain` offset
  leakage.
- D (only if needed): a fourth direct topology that still imports the accepted
  numeric owner.

All seats are judged on correctness, idiomaticity, readability, import
ownership, allocation/dispatch cost, and source economy. No seat is preferred
in advance.
