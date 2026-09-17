# V·π complement occurrence routing v2 — independent challenge A

**VERDICT: REJECT, including as the occurrence-inventory/routing stage.** The
artifact is byte-reproducible, its source census and routes are conservative,
and it authorizes zero exclusions. However, its grammar-block extractor accepts
only quoted `class` attributes. It consequently misses 53 ordinary pinned
Bikeshed `<pre class=prod>` / `<pre class=railroad>` blocks across 20 complement
sources. Of the 260 nonblank lines in those blocks, 179 are absent from every
recorded inventory category. This is a systematic parser-facing false-negative
branch in the very assay that is meant to precede occurrence ownership. The
operation denominator remains RED; no source exclusion, parser, conformance,
movement, package, production, or denominator credit follows.

## Seat and independence

- model served: `gpt-5.6-sol`
- reasoning effort: `ultra`
- workflow: `v2`, independent adversarial challenge A
- posture: assume the tool, artifact, routing, and receipt are faulty until
  reproduced from the pinned bytes
- independence: no sibling challenge or sibling output was read, queried, or
  contacted
- writes: this challenge only; no `HANDOFF`, `FEATURE-LEDGER`, `mirror`,
  `INBOX`, or production mutation

## Exact subjects and replay

| subject | verified SHA-256 | bytes |
|---|---|---:|
| `denominator/tools/inventory-complement-v2.mjs` | `bb174b1c921d9ccd685a3322d2f343f06f9572327426a8d353d16503d925af97` | 24,654 |
| `denominator/complement-occurrence-routing-v2.json` | `3b7e1e1ee40c22594049635703b3443db213f3ed8d8291e18714dda88dc2fcc9` | 3,224,120 |
| `formation/denominator-complement-occurrence-v2-2026-07-22.md` | `ecbc09be5cf01eff998041cc294fb4b56d7cad549a0f99a9828e245615b39a77` | 6,899 |

The supplied tool replayed against only
`/private/tmp/value-pi-csswg-complement.TpPSHC` and regenerated the artifact
byte-for-byte at SHA-256 `3b7e1e1e...dcc9`. Recomputing compact
`JSON.stringify(payload)` after removing the two appended digest fields yielded
the recorded payload digest
`6c3e1861a5584304a6c7835096722afcdae424013652cb6c15ef380f79dbe8fb`.

Independent mechanical checks established:

- all 168 exact source hashes and byte counts pass; the partition is exactly
  76 seed + 92 complement rows;
- the 92 artifact directories are unique, byte-sorted, and form an exact
  bijection with the complement;
- all copied paths are contained below the supplied source root; all 92 are
  regular files and none is a symlink;
- all 92 per-entry inventory digests recompute;
- all 16,022 serialized category facts resolve to the claimed pinned source
  and line, with exact `trim()` canonicalization and zero mismatches;
- the seven category totals are 353 grammar-block lines, 3,653 definition-
  carrier lines, 3,627 property/descriptor-block lines, 1,209 at-rule lines,
  4,644 function lines, 2,355 selector lines, and 181 recovery/serialization
  lines; their per-source unions total the recorded 14,141 distinct lines;
- route counts reproduce as `26 / 46 / 12 / 3 / 5`; all 20 declared primary-
  RED rows are present, all route derivations match the declared v1 mapping
  plus exact overrides, and all 92 `terminal_exclusion_authorized` values are
  false;
- a nesting-aware check of all 72 captured grammar blocks and 392 captured
  property/descriptor blocks found no actual start/end discrepancy;
- no stateful-regex drift was observed: predicates do not use global regexes,
  `matchAll` operates through its iterator semantics, per-entry inventory
  hashes are stable, and repeated complete replays are byte-identical.

The tool does not explicitly realpath-and-containment-check each input path.
That is a hardening opportunity, but not a blocker for this exact subject: the
source-universe bytes are hash-pinned, every recorded path is relative and
contained, and the examined pinned tree has no symlinks at those paths.

## Altitude 1 — total-tranche / gestalt

The repaired routing direction is materially better than v1. Every complement
source is retained, maturity and dependency evidence grants no normativity,
historical and successor claims remain occurrence-diff RED, and zero source is
eligible for terminal exclusion. The four v1 loss counterexamples are no
longer routed away. This is the correct conservative source-level posture.

But this stage is explicitly *occurrence-first*. Its next consumer is supposed
to bind parser-facing occurrences to exact owners and then compute a fixed
point. A known syntax-shape hole in the occurrence extractor cannot be excused
merely because the artifact also says its heuristic is non-exhaustive. That
caveat correctly limits conformance claims and tolerates residual discovery
misses; it cannot make a deterministic failure on the standard unquoted
Bikeshed class form an acceptable foundation for occurrence ownership.

The optimal repair is small: accept quoted and unquoted class attributes for
the `prod`, `grammar`, and `railroad` block markers and definition-carrier line
predicate; regenerate; and add pinned regressions proving the block bodies are
present. This does not require changing the source universe, routes, or RED
laws.

## Altitude 2 — tool and artifact challenge

### GREEN findings retained

1. Source, artifact, payload, ordering, count, and line-address identities are
   exact and reproducible.
2. Route precedence now performs an inventory attempt before attaching the
   route in every serialized entry.
3. Dependency rows have the conservative `DEPENDENCY_OCCURRENCE_REVIEW` name;
   citations and imports receive no normative or consuming-operation credit.
4. Historical/meta rows remain non-uniqueness RED. Successor, redirect, and
   migration rows require occurrence joins. Experimental/non-language rows
   remain review inputs.
5. False positives such as prose words or host-language calls in the function
   category are real, but expressly non-credit and therefore non-blocking at
   this stage.

### F-1 — unquoted grammar-carrier branch is absent (blocking)

Both grammar matchers require a quote immediately after `class=`:

```text
class\s*=\s*["'][^"']*\b(?:prod|grammar|railroad)\b
```

Pinned Bikeshed sources commonly use the valid form `<pre class=prod>` (and
one complement source uses `<pre class=railroad>`). The property/descriptor
matcher does not share this defect because it only searches the opening tag
for the `propdef` / `descdef` word.

An independent union audit found 53 missed unquoted grammar blocks, containing
260 nonblank lines. Although 81 lines happen to be captured by another broad
category, 179 lines have no representation anywhere in the artifact. These are
not merely opening and closing tags: omitted bodies include literal grammar
alternatives.

| complement source | missed unquoted blocks | nonblank lines absent from every category |
|---|---:|---:|
| `css-anchor-position-1` | 7 | 44 |
| `css-anchor-position-2` | 1 | 27 |
| `css-backgrounds-4` | 7 | 12 |
| `css-borders-4` | 4 | 3 |
| `css-content-3` | 2 | 3 |
| `css-forms-1` | 2 | 4 |
| `css-grid-3` | 1 | 2 |
| `css-inline-3` | 2 | 9 |
| `css-link-params-1` | 2 | 2 |
| `css-page-3` | 1 | 3 |
| `css-pseudo-4` | 1 | 20 |
| `css-shadow-1` | 3 | 2 |
| `css-shapes-2` | 1 | 2 |
| `css-template-1` | 2 | 5 |
| `css-text-4` | 2 | 6 |
| `css-transitions-2` | 1 | 0 |
| `css-ui-4` | 4 | 13 |
| `css-view-transitions-2` | 6 | 14 |
| `fill-stroke-3` | 2 | 4 |
| `selectors-5` | 2 | 4 |

Concrete omitted bodies include `css-anchor-position-2:244` onward (`left |
center | right | span-left | ...`), all nine nonblank lines of the two
`css-inline-3` grammar blocks beginning at lines 660 and 1063, all twenty lines
of the `css-pseudo-4` railroad block beginning at line 477, and
`css-text-4:10516-10517` (`[ ideograph-alpha || ... ] || [ insert | replace
]`). A dependency or experimental route does not recover those lost occurrence
facts.

### Non-blocking boundary observations

- Line facts are intentionally trimmed, not byte-preserving excerpts. Their
  claimed line-address identity is exact.
- The captured blocks have correct boundaries for these pinned bytes. The
  simple closing-tag search is not nesting-aware in the abstract, but no
  captured block in this exact artifact contains a divergent same-tag nesting
  boundary.
- The secondary conflict scan remains heuristic and misses semantic conflicts
  that do not match its narrow phrases or numeric-sibling naming rule. The
  artifact labels the scan non-exhaustive, keeps every row, and therefore makes
  no false closure claim here.

## Altitude 3 — route and source findings

The five route families were independently spot-checked, including all v1
counterexamples and all 20 primary-RED rows:

- **Experimental/non-language review:** `css-page-template-1` now retains 44
  inventory hits mentioning `@template` / `@slot`; `css-preslev-1` retains the
  `presentation-level` property block at lines 153–188, including its value
  grammar. These repair the v1 source-routing loss.
- **Unresolved successor RED:** `css-shaders-1` retains 29 facts mentioning
  `custom()` / `filter-margin-*`; `css-template-1` retains 44 facts mentioning
  `@region` / `grid-template-*`; `css-color-3`, `css-scoping-1`, and
  `css-shadow-parts-1` also remain RED. This route is conservative.
- **Historical/meta RED:** all twelve rows remain non-uniqueness RED;
  `css-2010` has 218 distinct discovered lines and is not treated as an
  aggregation-only exclusion.
- **Identity/migration RED:** `css-cascade-3`, `css-text-5`, and
  `web-animations-css-integration` retain their exact primary routes;
  `css-text-5` also carries the directory/metadata level conflict.
- **Dependency review:** all 26 rows remain non-credit. However, this family
  also demonstrates F-1 directly: `css-inline-3` and `css-pseudo-4` are queued
  for review while their standard unquoted grammar blocks are missing from the
  supposed occurrence inventory.

Thus route membership itself has no confirmed loss defect in v2. The rejection
is narrower and load-bearing: the artifact cannot be accepted as an occurrence
inventory while a routine carrier form deterministically discards grammar
body lines.

## Required repair and re-challenge

1. Extend both grammar-carrier regexes to recognize quoted and unquoted class
   attributes without weakening the tag boundary.
2. Regenerate the artifact and receipt from the same pinned tree and reprove
   source, payload, count, order, line, route, and zero-exclusion identities.
3. Add exact regressions for at least `css-inline-3:660`,
   `css-pseudo-4:477`, `css-anchor-position-2:242`, and a quoted carrier, so the
   repair cannot invert the already-GREEN branch.
4. Twice-challenge and root-adjudicate the new exact bytes before any
   occurrence-owner/fixed-point work. Even an accepted repair remains only a
   conservative routing/inventory stage, never the operation denominator.
