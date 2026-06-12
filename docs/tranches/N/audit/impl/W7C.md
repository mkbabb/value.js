# N.W7.C — the 0.12.0 cut

**Published 2026-06-12** (`npm publish` as `mkbabb`; registry verified `@mkbabb/value.js@0.12.0`).
Gate battery at cut: vitest 1709/41 ✓ · build ✓ · lint ✓ · `npm pack` 295,294 B unpacked /
46 files (≤320KB gate) · typecheck 0 at the W2-close commit `cfb206c` (src quiescent since).

**Contents over 0.11.2** (the W7.A/W7.B/W2.C library surface):
- The 11-item keyframes next-slice: `parseLinearStops` (E1), `parseSteps` (E2),
  `light-dark()`/`currentColor` sentinels (VJ-3), `Color.toAnimationString` (B1),
  output-space emit + `COLOR_SYNTAX_FAMILY`/`COLOR_FUNCTION_FORM` (B2), wide-gamut egress
  `gamutMap(color, targetSpace)` (B4), LRU memoize (F3/VJ-F6), `PathGeometry` +
  `getTotalLength`/`getPointAtLength` (VJ-F1), `ParseDiagnostic`/`OnParseError` sink (VJ-F2),
  buffer-reusing `unflattenObjectToString` (VJ-F4), `FUNCTION_IDENTITY` +
  `functionIdentityValue` (MCI-5).
- parse-that `^0.9.0` (diagnostic offsets sharpened; the F9 console leak closed structurally).
- prettier evicted from the dist (rolldown external + optional peer; 586→295KB unpacked).
- B3 endpoint-cache fixes (layout-epoch staleness, LRU-bounded memo) + predispatch dedup.
- `parseCSSColor` root-typed (`ParsedColorUnit` at the dispatch boundary — W2.C).

**The keyframes notify (cross-repo ask, kf-owned)**: keyframes.js can now re-pin
`@mkbabb/value.js@^0.12.0` and flip its `it.fails` witnesses — notably MCI-5
(`interpolate-anything.test.ts:256/271` → route `padToLength` through
`functionIdentityValue`) and the E1/E2/VJ-3/B1/B2/B4 consume edges per
`audit/impl/W7A-recon.md`. Recorded here per N.md §8; value.js does not write kf's tree.
