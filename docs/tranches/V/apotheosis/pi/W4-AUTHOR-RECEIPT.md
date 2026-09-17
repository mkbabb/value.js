# V·π W4 AUTHOR RECEIPT — ANALYSIS

2026-07-21 · status: **AUTHOR SEAT COMPLETE; CLOSE-HELD; NOT ACCEPTED**.
W4 remains dependent on adjudicated W2 and W3 acceptance, then its own two
independent E-1 adversarial passes and root adjudication. Current W2/W3 author
artifacts are real inputs, not seam stubs, but their author completion alone
does not discharge H-3.

model_served: Codex GPT-5 family (the exact backend revision is not exposed to
this seat)

No production `src/`, `vnext/`, scripts, inbox, parse-that, BBNF, keyframes, or
dependency file was changed.

## Landed prototype slice

- `mirror/stylesheet/analyze.ts` (393 LOC): freeze-stripped live tree analysis,
  shorthand expansion, option validation, cascade/component decisions, and the
  hardened R2 rules. `var()`/`env()` defer while non-substitution invalidity
  remains visible; every named math head occupies duration → delay → iteration;
  `attr()` remains outside the rule. Deferred shorthand expansion does not
  manufacture fields.
- `mirror/stylesheet/collect.ts` (172 LOC): generic nested path collection, four
  typed rule collectors, important declaration cascade, animation options, and
  timeline options. Timeline range/scope/trigger values preserve LIVE's
  serialize→re-parse route through the real W3 public timeline/range parsers.
- `mirror/syntax.ts` (106 LOC): the complete supported-syntax descriptor and
  coercion transpose, including both `syntax_*` diagnostics and hostile-runtime
  no-throw handling.
- `mirror/serialize.ts` (62 LOC total; +15 W4 LOC): W2's 47-line color
  serializer remains unchanged; W4 additively lands the verbatim
  `serializeCssValue` switch and cosmetic colon/semicolon spacing rule.
- `mirror/stylesheet/index.ts`: the seven collector doors now route to the W4
  implementation while the W5 `parseStylesheet` door remains the sole stub.
- `mirror/test/w4-analysis-prototype.test.ts` (219 LOC): 14 deterministic tests
  for both syntax codes, all supported syntax families, nested collector paths,
  important cascade, LIVE differentials, R2 accept+omit, all 21 math heads in
  first-open-slot order, `attr()` exclusion, serializer cosmetics, real W2 color
  serialization, and W3 range/timeline round trips.
- `mirror/test/door-stubs.test.ts`: all eight W4 public doors flip GREEN; only
  W5 `parseStylesheet` stays born-RED across the complete 19-door surface.

## Mechanical evidence

- `npm test` — 11 files GREEN; 59 passed; four pre-existing unratified W1 E-3
  rows remain TODO.
- `npm run check` — GREEN.
- `npm run dts-parity` — GREEN (`33 types + 19 runtime exports`).
- `npm audit --omit=dev` — zero vulnerabilities.
- Door projection — 18/19 runtime exports GREEN against LIVE; the one RED door
  is exactly W5-owned `parseStylesheet`.
- W4 hand-built differentials — nested paths, important cascade, complete
  animation option rows, timeline/range collection, and all supported syntax
  families structurally match LIVE. R2 rows are asserted expected divergences.
- K-2 grep — zero `Object.freeze` / `deepFreeze` sites in executable mirror
  source.

## Close-held dependencies and friction

The W4 brief originally described private `parseTimelineScope` and
`parseAnimationTrigger` helpers as W3 runtime. Root clarified the smallest
provenance-preserving ownership: both transpose privately with W4 from LIVE
`stylesheet.ts:44-80`, call W3's public `parseAnimationTimeline` /
`parseAnimationRange`, and add no barrel exports. The wave brief and hardening
text record that clarification for E-1 challenge.

The prototype is mechanically green on the current real W2/W3 artifacts. It
must not be called accepted or closed unless those dependencies first clear
their own holds and root adjudication, followed by W4's twice-audit edict.
