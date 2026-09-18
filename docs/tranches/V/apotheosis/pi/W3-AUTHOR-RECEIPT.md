# V·π W3 AUTHOR RECEIPT — EASING + TIMELINE

2026-07-21 · status: **AUTHOR SEAT COMPLETE; NOT ACCEPTED**. Acceptance remains
behind the two independent E-1 adversarial passes and root adjudication.

## Landed prototype slice

- `mirror/grammar/easing.ts`: D-3 first-byte dispatch; all four frozen
  `CssTimingFunction` kinds; the five keywords; step aliases;
  `cubic-bezier()` x-coordinate bounds; `steps()` integer/alias/
  `jump-none >= 2` guards; and `linear()`'s 2+ stops / 0..2 positions.
- `mirror/timeline.ts`: D-5 timeline dispatch; `auto` / `none` / dashed-name /
  `scroll()` / `view()`; range-boundary grammar with LIVE's 2/1 split; the
  `timeline_option_invalid` decisions; and the verbatim, no-freeze timeline
  option serializer.
- `mirror/test/w3-easing-timeline.test.ts`: maintained differential banks,
  R10/R11 witnesses, serializer/property round trips, and hostile runtime
  no-throw probes.

No production path, `vnext/`, dev script, inbox, parse-that, BBNF, keyframes, or
dependency was changed. No trigger/scope parser or `spring()` arm was added.

## Door evidence

| door | accepts | actual rejects | result |
|---|---:|---:|---|
| `parseTimingFunction` | 61 | 33 | GREEN vs LIVE; four kinds enumerated |
| `parseAnimationTimeline` | 64 | 32 | GREEN vs LIVE outside R10/R11 |
| `parseAnimationRange` | 57 | 28 | GREEN vs LIVE outside R11 |
| `serializeTimelineOptions` | 13 structural cases | n/a | exact LIVE output + public-field round trips |

The gate compares success trees structurally and failure `{code, expected}`
exactly. Public failures retain the original source for LIVE-equivalent recorded
spans/`actual`. All four exports are no-throw on the hostile runtime bank. The
shared door-state harness now reports W1+W2+W3 only as GREEN; the remaining
Phase-A doors remain born-RED.

Expected divergences are explicit:

- **R10:** every comma-bearing `scroll()` / `view()` spelling is rejected with
  its function-specific `timeline_option_invalid` diagnostic.
- **R11:** a non-zero unitless view inset or animation-range offset is rejected;
  signed/spelled zero remains accepted.

## Verification

- `npm test`: **10 files; 45 passed; 4 pre-existing W1 E-3 todo**.
- `npm run check`: GREEN.
- `npm run dts-parity`: **33 types + 19 runtime exports GREEN**.
- `npm audit --omit=dev`: **0 vulnerabilities**.
- Deterministic generated differential probe over timing numeric matrices,
  scroll/view argument products, and range-boundary products: **0 unexpected
  gating differences**.
- Chromium `CSS.supports` third witness: accepts `linear(0,1)`,
  `scroll(root x)`, `animation-range: entry 5px`, and unit-bearing view inset;
  rejects the R10 comma form and the R11 non-zero unitless forms.

Implementation LOC: 122 (`grammar/easing.ts`) + 230 (`timeline.ts`), of which
the latter includes the frozen serializer/type cluster. Test LOC: 238. Parsing
uses the published `@mkbabb/parse-that@1.0.0`, fused lexemes, dispatch, and the
already-transposed balanced/top-level scanners; it adds no parser-level
`regex()`, `.map()`, `.mapState()`, freeze, or speculative abstraction.

## Routed refinement — not patched ad hoc

The browser witness exposes one cross-wave spec gap that is outside W3's closed
R10/R11 correction ownership. LIVE and this exact Phase-A mirror accept empty /
trailing easing-list members (`steps(2,)`, `steps(,2)`,
`cubic-bezier(0,,0,1,1)`, `linear(0,,1)`) and an extra `steps` argument
(`steps(2,start,end)`), while Chromium rejects them. The empty-item family looks
like R8's “everywhere” language leaking beyond R8's W1/W5 home; the extra-arity
case is a new semantic row. These witnesses are retained and surfaced for E-3
formation/gestalt adjudication rather than silently expanding the closed W3
ledger.

model_served: Codex GPT-5 family (the exact backend revision is not exposed to
this seat)
