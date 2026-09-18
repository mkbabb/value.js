# π.W2 COLOR — author receipt

model_served: `gpt-5.6-terra/high`

Sealed the prototype-only W2 color implementation. No production `src/`,
`vnext/`, scripts, inbox, parse-that, BBNF, or keyframes file was changed. This
is an author receipt, not an E-1 audit or an acceptance verdict.

## Delivered

- `mirror/grammar/color.ts` (313 LOC): no-throw `parseCssColor`; one `fnHead`
  lex followed by a name-keyed parser record; channel grammars over the shared
  `numUnit`/`ident` leaves; all 13 `CssColorSpace` outputs; named, transparent,
  3/4/6/8-digit hex, direct functions, and `color()` including srgb→rgb and
  xyz-d50→D65 adaptation. RGB/HSL use distinct all-comma legacy and
  comma-free modern arms. H-8 none channels and context/native guards are
  covered. No result or color is frozen.
- `mirror/serialize.ts` (47 LOC): the guarded live serializer transpose,
  including the 12-decimal format policy, angle/percent scaling, alpha suffix,
  all typed color spaces, and canonical `color(xyz …)`.
- `mirror/lexeme.ts`: one shared sticky `hexColor` leaf, ordered longest-first
  so complete-input parsing admits exactly 3/4/6/8 digits.
- `mirror/test/w2-color.test.ts` (217 LOC): explicit 13-space
  modern/none/applicable-legacy matrix; all listed `color()` spaces; D50 numeric
  witness; dynamic source-table parity and exhaustive round-trip over every
  current `NAMED_COLORS` key (148 discovered at run time, never hard-coded);
  branch-diverse 50+ accept and 20+ actual-reject banks; exact guards;
  serializer arms and invalid inputs; R1/R3/R6/R9 expected divergences.
- `mirror/test/{w1-values,door-stubs}.test.ts`: the proven W2 seam flips W1's
  color scalar/value/value-list rows and the two W2 public doors GREEN. The
  shared door list also preserves the concurrently authored W3 doors.

## Correction boundaries

- **R1:** empty functional colors and hostile non-string entries return a clean
  failure instead of throwing.
- **R3:** a top-level trailing alpha slash fails with `expected: ["alpha"]`.
- **R6:** raw numeric HSL saturation/lightness and HWB whiteness/blackness are
  divided by 100; percentages retain the same normalized result.
- **R9:** RGB/HSL legacy forms are all-comma (including comma alpha), modern
  forms are comma-free with slash alpha, and every mixed form is rejected.
  Modern-only `hwb`/Lab/LCH/OKLab/OKLCH/`color()` comma spellings are rejected.

Relative colors, `color-mix()`, `light-dark()`, and `contrast-color()` remain
outside Phase-A W2 and were not recognized as typed colors.
The unratified PB1 comment-token re-anchor was likewise not pulled forward;
representative comment-bearing color spellings retain LIVE rejection.

## Evidence

- `npm test` — 10 files GREEN; 45 passed; the four pre-existing unratified W1
  E-3 rows remain explicit TODOs.
- `npm run check` — GREEN.
- `npm run dts-parity` — GREEN (`33 types + 19 runtime exports`).
- `npm audit --omit=dev` — 0 vulnerabilities.
- Deterministic oracle sweep — 4,158 direct-function combinations; every
  success-bit or value-tree difference routed only to R3, R6, or R9 (R1 throw
  cases excluded from comparison); zero unrouted differences.
- Grammar guard grep — no bare `regex()`, parser `.map()`, `mapState()`, freeze,
  or deferred Phase-B color-function spelling in the W2 implementation.

## Status

The W2 author gate is mechanically GREEN and the W1 color seam is active. W2
still requires the two independent three-altitude E-1 adversarial passes and
root adjudication before acceptance. W1 itself remains unaccepted pending its
separate ADDENDA-03/PB1 decisions; this wave did not implement any of its four
unratified rows.
