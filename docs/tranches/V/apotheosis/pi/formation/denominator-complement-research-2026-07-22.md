# V·π CSS source-complement research — 2026-07-22

**Disposition: all 92 sources outside the proposed 76-root seed now have one
research classification, but the CSS operation denominator remains RED.** This
receipt routes pinned sources to the next occurrence-level review. It neither
ratifies an inclusion/exclusion nor grants parser, conformance, movement, or
production credit.

## Exact authority and artifacts

- CSSWG commit: `c7573530343759ace8e46438a1fa2c44515b5554`
- CSSWG tree: `75bf19c016ed98126381508073de6893c9f756f5`
- root-seed manifest raw SHA-256:
  `769ceff80ecc9f25dbef30ddb3f3dbb04ecdbd2b7f704ed733f29f4ab16fbb32`
- 168-source universe raw SHA-256:
  `c1b823396dcc38607d23243f578e58ef08de79136edd52abd1bbdf6a64f606b7`
- complement classification raw SHA-256:
  `1ec512250bafc09f510194b48e3fb87f4427b83c84a6a543b58e81040ae18af2`
- complement classification payload digest:
  `16f1f186732ed7e91af57df4126a0f87a2e4868f8899278905cfa3aa58d97a6b`
- offline classifier raw SHA-256:
  `5afd7968039089fb86aa454ac84ad4431747b075979662ccb01853a0c586d254`

The classifier read all 168 exact `Overview` sources from a temporary pinned
tree. Every byte count and SHA-256 matched `source-universe.json`; no current
editor's draft or network-current source was substituted. It then required a
bijection between the 92 complement rows and its classification map. The
machine artifact records each source's existing path, Git blob OID, SHA-256,
byte count, pinned metadata, non-credit language signals, classification,
reason, and line-addressed evidence.

## Research classification

| disposition | count | consequence |
|---|---:|---|
| historical snapshot or meta index | 12 | retain provenance/discovery; do not extract operations from the aggregation itself |
| candidate exclude: superseded, obsolete, redirect, template, or non-CSS language | 13 | challenge the exact exclusion reason before terminal exclusion |
| normative dependency candidate | 26 | inspect the cited/imported/redirected production or algorithm occurrences |
| later-level or experimental language candidate | 38 | include in experimental/later-level occurrence review; no automatic inclusion |
| genuinely unresolved RED | 3 | resolve identity or migration conflict before terminal routing |

The 26 dependency candidates are deliberately inclusive. They arise from
seeded normative citations, Bikeshed `spec:` imports, explicit cross-module
delegation, or the `css-scoping-1` redirect chain into `css-shadow-1`. A
dependency-candidate classification does not mean the entire source becomes
an operation source: the next pass must identify the exact production,
algorithm, property, descriptor, value, selector, or serialization occurrence
that the seeded source consumes.

The 38 later/experimental candidates expose mechanical parser-surface markers
and have no terminal exclusion fact in their pinned bytes. Marker counts are
discovery signals only. They are not claims of normative coverage, maturity,
or parser responsibility.

## Unresolved RED list

1. `css-cascade-3/Overview.bs`: seeded sources cite Level 3 normatively while
   the seed also contains Cascade Levels 4 and 5. No exact occurrence-level
   supersession rule has been sealed.
2. `css-text-5/Overview.bs`: directory and title identify Level 5, while the
   pinned `Level:` metadata says `4`. The source identity/level route is
   internally inconsistent.
3. `web-animations-css-integration/Overview.src.html`: the source says its
   content is intended for incorporation into Animations and Transitions Level
   2, but the pinned bytes do not establish that incorporation as complete.

## Remaining denominator work

This closes only the top-level complement-disposition gap identified by the
state audit. It does not close normative-reference fixed points, supersession
at operation granularity, operation occurrences, owner experiments,
diagnostics/recovery/serialization obligations, WPT and browser witnesses,
or export/consumer joins. The next admissible step is a content-addressed
occurrence extractor plus per-source semantic review across the 26 dependency
candidates and 38 later/experimental candidates, followed by explicit
resolution of the three RED rows and independent denominator challenges.
