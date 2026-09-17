# V·π CSS complement occurrence-first routing v2 — 2026-07-22

**Disposition: reproducible occurrence inventory and conservative routing are
GREEN; the operation denominator remains RED.** This formation repair preserves
the exact 168-source / 92-complement census, inventories parser-facing signals
in every complement source before considering maturity or exclusion, and
retains every row for dependency, experimental/non-language, historical
occurrence-diff, or unresolved review. It grants no source inclusion/exclusion,
parser, conformance, movement, package, production, or denominator credit.

## Exact subjects and authority

| subject | raw SHA-256 | bytes |
|---|---|---:|
| `denominator/source-universe.json` | `c1b823396dcc38607d23243f578e58ef08de79136edd52abd1bbdf6a64f606b7` | 75,132 |
| rejected `denominator/complement-classification.json` | `1ec512250bafc09f510194b48e3fb87f4427b83c84a6a543b58e81040ae18af2` | 149,757 |
| v1 rejection | `8434c40b73c12e946d5664e54ed5132884f803a8f17a398aa24f9fb2d6985479` | 1,124 |
| v1 challenge A | `8687bc986b96b8f9208fef12d24d96573146766f82b3e5adb0e2fe7aa64926a7` | 17,874 |
| v1 challenge B | `a89eaa7dc2e6db5d49c7944553de22b158130870577f28d904188a124df83dc3` | 16,429 |
| v1 root gestalt | `b75c3af2c71a70e8185f3125941e37c9bce1f994caa58b6af17336a71e3fbdab` | 3,076 |
| v2 tool `denominator/tools/inventory-complement-v2.mjs` | `bb174b1c921d9ccd685a3322d2f343f06f9572327426a8d353d16503d925af97` | 24,654 |
| v2 artifact `denominator/complement-occurrence-routing-v2.json` | `3b7e1e1ee40c22594049635703b3443db213f3ed8d8291e18714dda88dc2fcc9` | 3,224,120 |

The only source bytes read were the pinned offline tree at
`/private/tmp/value-pi-csswg-complement.TpPSHC`. Before inventory, the tool
reverified all 168 paths against their exact SHA-256 and byte counts. The pinned
CSSWG authority remains commit
`c7573530343759ace8e46438a1fa2c44515b5554` / tree
`75bf19c016ed98126381508073de6893c9f756f5`. Replaying the rejected v1 against
that tree was byte-identical before this repair; no current network or editor's
draft bytes were substituted.

The v2 payload digest is
`6c3e1861a5584304a6c7835096722afcdae424013652cb6c15ef380f79dbe8fb`.
It is SHA-256 over compact UTF-8 `JSON.stringify(payload)` before the digest
fields. A fresh v2 replay was byte-identical to the 3,224,120-byte artifact.

## Occurrence-first method

For each of the 92 complement sources, the serialized entry records its exact
source identity and then an `occurrence_inventory_precedes_routing` object
before its route. The inventory preserves exact source line numbers and trimmed
line facts for discoverable:

- grammar and definition carriers;
- property and descriptor definition blocks;
- at-rules;
- functions;
- selector, pseudo, and combinator signals; and
- recovery and serialization algorithms.

The assay preserved 16,022 line facts with zero line/source mismatches. Their
per-source union contains 14,141 distinct discovery lines. Category evidence
comprises 72 grammar blocks / 353 block lines, 3,653 grammar-definition carrier
lines, 392 property/descriptor blocks / 3,627 block lines, 1,209 at-rule lines,
4,644 function lines, 2,355 selector lines, and 181 recovery/serialization
lines.

These are deliberately inclusive discovery signals. Prose, host-language, and
markup false positives remain possible; a zero signal would not prove absence.
The artifact therefore claims neither a CSS parser-surface AST nor exhaustive
normative operations.

Only after inventory does v2 attach source status, dependency, history,
migration, and conflict routing. No row has `terminal_exclusion_authorized:
true`.

## Conservative routes

| route | count | consequence |
|---|---:|---|
| `DEPENDENCY_OCCURRENCE_REVIEW` | 26 | review cited/imported/delegated occurrences; no normativity or consumption credit |
| `EXPERIMENTAL_OR_NONLANGUAGE_OCCURRENCE_REVIEW` | 46 | retain syntax for owner-extension or non-language adjudication |
| `HISTORICAL_META_DISCOVERY_OCCURRENCE_DIFF_RED` | 12 | prove every occurrence non-unique or bind it to an exact owner |
| `UNRESOLVED_IDENTITY_OR_MIGRATION_RED` | 3 | resolve exact identity/migration at occurrence level |
| `UNRESOLVED_SUCCESSOR_OCCURRENCE_DIFF_RED` | 5 | bind every occurrence to exact successor evidence or retain experimentally |

The rejected v1 term “normative dependency” is gone. A citation, Bikeshed
definition import, delegation, or redirect now establishes review priority
only. Exact consuming normative occurrences must be proven later.

The owner-directed corrections are explicit:

- `css-page-template-1` and `css-preslev-1` are experimental/non-language
  occurrence-review inputs, not exclusion candidates;
- `css-shaders-1` and `css-template-1` remain successor-diff RED;
- `css-color-3` remains successor-diff RED until every Color 3 occurrence is
  mapped or retained;
- even redirect-only `css-scoping-1` and `css-shadow-parts-1` remain
  successor-diff RED until their discovered lines are joined to exact
  `css-shadow-1` occurrences; and
- all twelve historical/meta rows remain occurrence-diff RED because v2 proves
  no per-row non-uniqueness.

## RED routes

Historical/meta occurrence-diff RED (12): `css-2007`, `css-2010`, `css-2015`,
`css-2017`, `css-2018`, `css-2020`, `css-2021`, `css-2022`, `css-2023`,
`css-2024`, `css-2025`, and `indexes`.

Successor occurrence-diff RED (5): `css-color-3`, `css-scoping-1`,
`css-shaders-1`, `css-shadow-parts-1`, and `css-template-1`.

Identity/migration RED (3): `css-cascade-3`, `css-text-5`, and
`web-animations-css-integration`.

These twenty primary-RED rows are a routing queue, not an exhaustive conflict
set. The systematic secondary scan adds flags for:

- 28 dependency edges whose normativity/consumption is unproved;
- one directory/metadata level conflict;
- 12 historical/meta non-uniqueness gaps;
- 25 maturity/scope statements coexisting with discovered parser surface;
- 38 migration/successor signals requiring an occurrence diff;
- 48 multi-level sibling ownership reviews; and
- all 92 sources having non-credit parser-facing discovery lines.

The scan is explicitly `SYSTEMATIC_HEURISTIC_NON_EXHAUSTIVE_RED`. The three v1
known conflicts were retested, but neither they nor the secondary flags are
claimed complete.

## Replay and boundary

The replay validated:

- all 168 pinned hashes and byte counts;
- exact 76 + 92 partition and an ordered, duplicate-free 92-row bijection;
- exact v1 rejection identity;
- every line fact against its pinned source line;
- payload-digest recomputation;
- byte-identical regeneration; and
- zero terminal exclusions.

The next admissible step is independent challenge of this exact v2 tool,
artifact, and receipt. Even acceptance would authorize only the next
occurrence-owner/fixed-point formation stage. It would not create the final
operation denominator or authorize parser code.
