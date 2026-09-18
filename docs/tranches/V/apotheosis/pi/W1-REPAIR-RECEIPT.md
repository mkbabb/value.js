# π.W1 VALUES — focused defect-repair receipt

model_served: `gpt-5.6-terra/high`

This pass repairs only confirmed W0/W1 contract defects already inside existing
authority. It does not adjudicate or implement new E-3 correction rows and does
not touch production, Phase-B code, parse-that, BBNF, keyframes, scripts, or
inboxes.

## Repaired

- `mirror/lexeme.ts`: the shared identifier leaf now accepts exact `--`, `---`,
  `----`, `--0`, and `--1` while preserving case. The quoted leaf accepts CSS
  escaped LF/CRLF/CR/FF line continuations and rejects their unescaped forms.
- `mirror/grammar/value.ts`: recursive parsing now carries `ParseResult`
  outcomes through lists and calls. Inner `code`, `expected[]`, and `actual`
  survive `outer(fn())`, zero-argument misuse, comma arms, and deeper calls.
  Recognized non-finite numerics emit LIVE-compatible `expected: []` directly
  and when nested. The former outer diagnostic re-guess was removed.
- `mirror/grammar/keyframe-selector.ts`: named out-of-range values temporarily
  emit LIVE/Phase-A `expected: ["0%..100%"]`. This is compatibility only, not a
  ruling on named-range semantics. Canonical serialization rounds percentage
  magnitude to 12 decimal places, strips insignificant zeros, and is tested for
  stable parse/serialize/parse behavior on the currently accepted valid domain.
- `mirror/harness/differential.ts`: a W1 door is GREEN only when its complete
  gating projection (`ok` + value, or code + `expected[]`) equals LIVE on
  non-color witnesses. Independent accept bits no longer qualify. The W2 color
  seam remains explicitly RED.
- `mirror/test/{lexeme,w1-values}.test.ts`: maintained branch-diverse banks now
  assert at least 50 actual accepts and 20 actual rejects for each of the four
  public W1 doors. Coverage includes identifiers, strings, operators, numeric
  edges, separator precedence, calls, nested failures, truncation, non-string
  hostiles, exact diagnostics, R8, selector kinds, and serializer properties.

## Explicitly unresolved

Four non-gating TODO/RED rows remain visible in the W1 bank and require E-3:
comment-trivia policy, exponent percentages, unbounded named-range percentages,
and malformed percent-unit rejection. PB1 owns the uniform tokenizer/trivia
foundation before W1 can be treated as stable for L4. The temporary named-range
diagnostic above does not prejudge that decision. W2 must still activate and
re-prove color-bearing rows.

## Evidence

- `npm test` — 8 files; 30 passed; 4 explicit E-3 TODO/RED rows.
- `npm run check` — GREEN.
- `npm run dts-parity` — GREEN (`33 types + 19 runtime exports`).
- `npm audit --omit=dev` — 0 vulnerabilities.
- Grammar grep — no bare `regex()`, `.map()`, or `mapState()` in the two W1
  grammar modules; no feature-local tokenizer introduced.

## Status

Mechanical repair gates are GREEN, but **W1 is not ACCEPTED**. Close still
requires the E-3/PB1 rulings named above and two independent E-1 re-audits of
this repaired artifact. No self-audit was performed.
