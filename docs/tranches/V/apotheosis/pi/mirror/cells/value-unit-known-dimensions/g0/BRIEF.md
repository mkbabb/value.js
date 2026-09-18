# VALUE-UNIT-KNOWN-DIMENSIONS G0

## Boundary

Build the direct parse-that production for a CSS number immediately followed
by one of the known CSS unit identifiers. This is one coherent `value-unit`
feature, not one feature per unit. It imports the accepted `consumeNumber`
parser; it must not copy or fuse the numeric regex.

The production is prefix-consuming and returns exactly:

```ts
{
  kind: "dimension";
  family: "length" | "angle" | "time" | "frequency" | "resolution" | "flex";
  number: { sign: "+" | "-" | null; type: "integer" | "number"; value: number };
  unit: string; // canonical ASCII lowercase
}
```

Unit identifiers are ASCII case-insensitive and canonicalize to lowercase.
The known inventory is:

- length: `px cm mm q in pc pt em rem ex rex cap rcap ch rch ic ric lh rlh`,
  `vw vh vi vb vmin vmax`, every `sv`/`lv`/`dv` variant of those six viewport
  suffixes, and `cqw cqh cqi cqb cqmin cqmax`;
- angle: `deg grad rad turn`;
- time: `s ms`;
- frequency: `hz khz`;
- resolution: `dpi dpcm dppx x`;
- flex: `fr`.

This is 62 units: 49 length, four angle, two time, two frequency, four
resolution, and one flex.

## Required semantics

- Longest/specific unit spellings must not be shadowed by shorter ones.
- A known unit succeeds only at the end of its complete CSS identifier.
  Examples such as `1pxrest`, `1px-rest`, `1px_`, `1px\\78`, and `1pxé`
  must not be accepted as `1px`; they belong to a later generic-dimension or
  invalid typed-value decision.
- A delimiter after a complete unit remains for the parent: `1px,` consumes
  through `px` only.
- Do not impose contextual numeric ranges here. In particular, negative
  resolution or flex spelling remains a syntactically recognized dimension;
  typed parents own range validity.
- Failure restores the entry offset while retaining parse-that diagnostic
  progress.
- Construction occurs once at module initialization.

## Architecture

Use only published `@mkbabb/parse-that@1.0.0` combinators. No lexer, scanner,
manual source cursor, token/CST object, balanced-source helper, broad remainder
capture, per-call parser construction, or duplicated number recognizer.

Each candidate is independently authored in its assigned directory and may
choose a materially different unit-production topology. Shared source helpers
between candidates are forbidden. The active BBNF `value-unit` module is the
family/ownership guide, but its bytes are not semantic authority where they
diverge from the CSSWG specifications.

## Normative sources

- CSS Values and Units Level 4, number/dimension/percentage and unit families:
  `https://drafts.csswg.org/css-values-4/`
- CSS Conditional Rules Level 5, container query length units:
  `https://drafts.csswg.org/css-conditional-5/#container-lengths`

The complete July-2026 parser will separately cover generic dimensions,
escaped identifiers, math types, source preservation, and public adapters.
