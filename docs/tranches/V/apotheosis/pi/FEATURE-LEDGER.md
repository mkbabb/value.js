# V·π idiomatic CSS feature ledger

**Status: ACTIVE / denominator incomplete (2026-07-22).** This ledger is the
admission boundary required by `ADDENDA-07`. It does not claim full CSS closure
yet. The acknowledged BBNF families below are a decomposition seed; the pinned
July-2026 specification corpus and owner experimental facilities remain the
denominator authority.

One internal operation is accepted: `SYNTAX-CONSUME-NUMBER`, promoted exactly
as `mirror/apotheosis/grammar/css/l4/value-unit/numeric.ts`. Every other row and
the full denominator remain RED. The first attempted pilot,
`KF-SELECTOR-G0`, received two independent boundary REJECT verdicts. It was
too broad, depended on unsettled foundation productions, and conflated the
normative grammar, selector-list composition, and public compatibility. It is
retained below as a failed formation generation, not as a selected feature.

## 1. Module-family closure queue

| family | acknowledged BBNF state | TypeScript target | closure status |
|---|---|---|---|
| `tokens` | 3 terminal productions; root-reachable | `grammar/css/l4/tokens.ts` | RED: must be grammar leaves only, never a token runtime |
| `value-unit` | canonical numeric/unit base; root-reachable | `grammar/css/l4/value-unit.ts` | RED: units/spec closure and context contracts incomplete |
| `color` | root-reachable; Color-4 subset | `grammar/css/l4/color.ts` | RED: full Color 4/5 + experimental inventory not closed |
| `func-body` | root-reachable; duplicates `values` math/functions | adjudicated between `values.ts` and a thin shared production module | RED: ownership and permissive fallbacks defective |
| `gradients` | disconnected from stylesheet root | `grammar/css/l4/gradients.ts` | RED |
| `easing` | disconnected from stylesheet root | `grammar/css/l4/easing.ts` | RED |
| `filters` | disconnected; permissive drop-shadow tail | `grammar/css/l4/filters.ts` | RED |
| `keyframes` | disconnected and duplicated in stylesheet | `grammar/css/l4/keyframes.ts` | RED: rejected G0 decomposes into singular selector, list, and public-compatibility rows after foundation closure |
| `keywords` | root-reachable; limited property enums | `grammar/css/l4/keywords.ts` | RED |
| `media` | root-reachable; stated real-world subset only | `grammar/css/l4/media.ts` | RED: full media/container/supports/conditions closure required |
| `properties` | root-reachable; permissive typed dispatch | `grammar/css/l4/properties.ts` | RED: exact property/descriptor/cascade ownership absent |
| `selectors` | root-reachable; Selectors-4 subset | `grammar/css/l4/selectors.ts` | RED |
| `transforms` | disconnected from stylesheet root | `grammar/css/l4/transforms.ts` | RED: transforms/motion/path closure required |
| `values` | disconnected; duplicates `func-body` | `grammar/css/l4/values.ts` | RED: full Values 4/5, substitution, typed math required |
| `stylesheet` | registered root reaches only 9/15 families | `grammar/css/l4/stylesheet.ts` | RED: all claimed roots and at-rule families must be reachable |

Normative families missing or materially underrepresented by that seed include
CSS Syntax preprocessing/recovery/source preservation as direct productions;
cascade, layers, scope, nesting, and conditional rules; custom properties and
registered properties; container/style queries; images beyond gradients;
fonts, counters, shapes/path/motion, animation/transition/timelines/triggers;
descriptors and the full at-rule inventory; unknown/vendor forward-compatible
constructs; and the owner's experimental functions/spaces. Each becomes one or
more atomic rows only after its exact production/result/diagnostic/benchmark
boundary is pinned.

## 2. Rejected formation generation — `KF-SELECTOR-G0`

The exact CSS grammar finding survives the rejection:

```text
keyframe-selector = from
                  | to
                  | <percentage [0,100]>
                  | <timeline-range-name> <percentage>

timeline-range-name = cover | contain | entry | exit
                    | entry-crossing | exit-crossing | scroll
```

The named-range percentage is mandatory and unbounded; the bare percentage is
bounded to 0–100; a selector list is a nonempty comma-list above this singular
production. The current mirror and current BBNF bytes are both evidence and
both are wrong on material parts of that boundary.

Two independent challenges rejected G0. Their receipts are
`formation/kf-selector-boundary-challenge-a.md` and
`formation/kf-selector-boundary-challenge-b.md`. Confirmed blockers are:

1. CSS preprocessing/source mapping, trivia/comments, escapes/identifiers,
   number and percentage literals, percentage-valued math, and timeline-range
   names are unsettled direct-production dependencies.
2. The normative result and diagnostic observation contracts were not frozen:
   alias preservation, lossless numeric representation, typed math, spans/raw
   spelling, expected categories, and original-source offsets remain open.
3. Singular selector, nonempty selector list, and public compatibility are
   three distinct operations with different inputs, results, and benchmark
   doors.
4. The existing four-name/optional-offset public type flows through the entire
   keyframe/stylesheet result graph. A one-door adapter cannot carry the seven
   names or mandatory offset without an explicit surface-evolution decision.
5. The live regex peer is comparable only on a declared common-domain lane;
   it cannot receive corrected-domain or full-CSS credit.
6. H/B independence is not established. A fourth clean-room candidate is
   mandatory unless an affirmative genealogy proof closes that question.

No candidate source was authored. G0 has no implementation, benchmark, or
acceptance credit.

## 2.1 Dependency-first formation queue

These are proposed ledger rows, not sealed features. Each must receive exact
normative occurrences, an observation/diagnostic contract, born-RED fixtures,
two boundary challenges, and gestalt acceptance before its ≥3 candidate
generation may begin.

| proposed row | owner | independent operation | downstream use |
|---|---|---|---|
| `SYNTAX-SOURCE-MAP` | `tokens` foundation | CSS input preprocessing with mapping back to original UTF-16 source offsets; no token stream | every diagnostic/span door |
| `SYNTAX-WHITESPACE` | `tokens` | one nonempty maximal CSS whitespace run with preprocessing projection | parents that permit whitespace |
| `SYNTAX-COMMENTS` | `tokens` | CSS Syntax §4.3.2 one-or-more adjacent comments with final-EOF recovery; never conflated with whitespace | parents that invoke the plural consume-comments operation |
| `SYNTAX-ESCAPE` | `tokens` | one CSS escape/code-point semantic leaf with source extent | identifiers, strings, URLs |
| `SYNTAX-IDENT` | `tokens` | one maximal identifier sequence with escape recovery; ASCII-insensitive keyword matching belongs to consuming parents | names and keywords |
| `SYNTAX-STRING` | `tokens` | one quoted CSS string production with escaped-code-point reuse and newline/EOF recovery | strings, URLs, descriptors and functions |
| `SYNTAX-NUMBER-START` | `value-unit` | **RETIRED AS A STANDALONE FEATURE:** the six CSS Syntax §4.3.10 truth arms are subordinate fixtures/branches inside consuming numeric productions, never an exported zero-width `Parser<boolean>` | evidence for consume-number; no dependency or acceptance credit |
| `SYNTAX-CONSUME-NUMBER` | `value-unit` | prefix-consuming CSS Syntax §4.3.13 as one operation, returning only the semantic `{ value, type, sign }` leaf; exact same-input spelling/extent are harness observations, not a lexical result layer | dimensions, percentages, math |
| `VALUE-PERCENTAGE-LITERAL` | `value-unit` | accepted number value plus `%`, preserving the literal/domain before contextual bounds | keyframes and all percentage doors |
| `VALUE-PERCENTAGE-MATH` | `func-body` | percentage-valued `calc()`/`min()`/`max()`/`clamp()` grammar-shaped result | every `<percentage>` position that admits typed math |
| `TIMELINE-RANGE-NAME` | `values/timeline-range` | seven-name semantic production using accepted identifier behavior | properties and keyframes |
| `KF-SELECTOR-STANDARD` | `keyframes` | one complete singular normative selector over accepted dependencies | selector-list grammar |
| `KF-SELECTOR-LIST` | `keyframes` | nonempty comma-separated list of singular selectors | keyframe blocks/CSSOM `keyText` |
| `KF-SELECTOR-PUBLIC-COMPAT` | compatibility seam | explicit adaptation across `KeyframeSelector`, rule/block/stylesheet types, parsing, collection, and serialization | frozen 52-export/37-consumer proof |

No separate lexer follows from this ordering. `tokens` is only the BBNF-aligned
namespace for direct primitive grammar productions. Accepted dependencies are
ordinary parse-that parsers returning semantic leaves; there is no token tape,
atom algebra, component-value aggregate, CST, or imperative scanner.

## 2.2 Next pilot selection rule

The next pilot is chosen from the first independently closable foundation row,
not from `KF-SELECTOR-STANDARD`. Formation should prefer the smallest row whose
result can remain stable when imported by later grammar modules.

`cells/syntax-number-repr/` records a failed attempt: generation 0 was rejected
twice because it conflated number-start, consume-number, and an EOF observation
wrapper. `mirror/cells/syntax-number-start/` then explored seven generations of
a standalone non-consuming predicate. No candidate source was authored. Its
terminal G7 challenges established that the zero-width predicate was itself an
unidiomatic lexical seam: direct consuming combinator productions should own
the six §4.3.10 truth arms as ordinary branch evidence. G7 rejection SHA-256
is `45318a954e312c1f85fa666ef320033b2ebba4b217e2d564616e9c6b96465b04`.

The active pilot is therefore `SYNTAX-CONSUME-NUMBER`, owning §4.3.13 as a
whole. G1–G7 were rejected before candidate code. G7 attempted to bind the
clean base, four isolated author seats, hostile limits, composition, holdout,
benchmark, five-skeptic, and three-adjudicator gates, but the mechanism did not
match the prose. Both independent challenges and root gestalt confirmed:

1. the boundary manifest required `path` while later exact-comparing the same
   receipt row against a pathless identity;
2. the author receipt participated in the candidate-tree hash that was to be
   written into that receipt, creating a self-reference;
3. failure-state, predecessor, diagnostic, parent-composition, hostile scaling,
   and holdout-coverage matrices were incomplete;
4. peer lineage material leaked through the common precursor, so author
   isolation was not proved;
5. reachable helper/receiver indirection could bypass the direct-combinator
   topology assay;
6. call quotas were contrived proxies for idiom and orthogonality;
7. benchmark peers were nominal rather than byte-resolved and no executable
   five-skeptic/three-adjudicator terminal gate existed.

G7's root gestalt SHA-256 is
`986f3890522361536b25bb7c283e80323b924bce680eb85e7df8a444d67b2d82`;
terminal rejection SHA-256 is
`26c964c3ac29bba9f9741aa89cc4208be793edfdd15ac4ddf68963c50f4d63f3`.
Its plaintext, key, and generator were never revealed and were destroyed under
receipt SHA-256
`e946ce86e6342d8d5d362664282fa393608f4b93af87cee196d563f770e26a66`.

G8 was then frozen and sealed, but both fresh challenges and root rejected it
before authors. Its actual CLI authenticated file bytes without authenticating
what the review/root bytes reviewed: a foreign formation and three minimal
ACCEPT objects could open the gate. The one manifest also required future
review/root hashes while claiming to predate them; actor identities were not
carried forward; strict replay rejected legitimate lifecycle artifacts; and
opaque benchmark samples could satisfy the mechanical close. Root SHA-256 is
`3a0a048d8b5e1466de7fb2339529022ac184782f5b9dc0e07e5de64c29f52da1`;
terminal rejection SHA-256 is
`2b4c7d38a48a4d850f5dd9fde2e3ab821404675c5155ad103c601bccdc524b24`.
Its plaintext, key, generator, and hidden cases were never revealed and are no
longer recoverable; destruction SHA-256 is
`30862497e808cfc0795f73f80c98c8f2788e98e8b54d48f94369f19653d3dece`.

G9 removed much of the god-gate, preserved the sound narrow semantic boundary,
and correctly moved candidate correctness, executable benchmarks, holdout
reveal, five skeptics, three adjudicators, and selection after candidate close.
It nevertheless failed before authors. Challenge A directly observed its
public holdout receipt mutate after the exact subject freeze and then return to
the earlier bytes. Challenge B independently proved the frozen roster did not
name its necessary B2 replacement, while both challenges confirmed forgeable
actor/review claims, unproved author isolation and material topology,
incomplete candidate census, stale custody liveness, unbound runtime and
comparators, and contradictory G8 authority. Root terminally rejected G9 at
`84a1826fac44505ba2ae3fbcc918b7684b0e94104b5d05421c1b385f4df1e412`;
the unrevealed secret was destroyed at
`32dab18505059a4dd73005f3695ab6aaa054f2baee30e964bcabdfb35be2eada`;
terminal rejection is
`5c0a532b45a3f44c59f28a4fea5e058dadeea19a3d9608fd6d5632b442e90ae4`.
No candidate was authored. The next generation must bind final immutable
public bytes, a generation-consistent row, the installed runtime and exact
peers, materially different construction topologies, exact author tasks, a
complete executable-source/symlink census, live custody, and a killable common
harness—without expanding back into a future-acceptance god gate. A
complete-input public diagnostic wrapper remains a separate cell around the
prefix parser; it is never the imported grammar production.

G10 made those repairs in part: it froze all 65 installed parse-that files,
four materially different topology assignments, exact peer source identities,
a 39-row executable-source census, a SIGKILL subprocess rail, and a fresh
240-case read-only holdout. Its exact twelve-row formation replayed from a
disposable shadow. Both independent boundary reviews still rejected author
admission. A six-success smoke harness accepted an intentionally incomplete
parser; B could mutate predecessor state on aggregate failure; S named a
nonexistent `guard` API; the adapters copied peer regexes rather than executing
the exact live, historical, and C14 implementations; `tsx`, extensionless
imports, actual author-task receipts, current custody, and the lawful post-
holdout phase join were not closed. Root rejection is
`7b645062395fd5bf4fd4b0fa25b501d88be50c0e3b627e068dc16e92a05f78aa`;
terminal rejection is
`2035b70e853605e9381e8a45daa9d180a615c0d11359420658ec88457a8c76f5`.
The holdout was never revealed and is unrecoverable under destruction receipt
`d843ffa3ad5e015ce17597fd245d707aabc689a166aa3afec4278f5d050939c8`.
G11 repaired the executable mechanics but still did not earn author admission.
Its 30-row formation is `5db00f55de4a125a2710b4cf63114fbf5f34dd83c382b973d54652e8f0278ca2`.
Independent reviews `f9c6b0b4fa8612decdf607a990a9e9b5049f4755e063a91244e08070d2bfa3a0`
and `b01c87c5a0e4f91cbd4e22309c2b8a3004b018178d4c5d5965ddd28c01b499c1`
both REJECTED it. The feature row delayed holdout sealing until after candidate
close while admission required a holdout with every candidate absent; locally
asserted review/task strings could manufacture the join; the author self-test
read every topology probe; candidate mode accepted an arbitrary unclosed path;
a reproduced incomplete signed-exponent grammar passed; and a finite timing
ratio changed disposition without byte drift. Root terminal rejection is
`662ce74e987a53e39f3a7db8b10acd2229f21c3c6f46e8a8783adf151be97b92`.
G11 created no holdout and no candidate. G12 must repair exactly those defects
and reach authors without enlarging into another future-acceptance protocol.

G12 preserved the small public-review-first chronology and repaired the exact
runtime, peer, author-input, candidate-path, signed-exponent, subprocess, and
timing-gate defects. Its subject is
`56598281f4e1f0206f3ce034d443b7a1c2fefcce79b79db5695e385f254ba05a`.
Independent reviews `07687017ce0f7068f2cac7547a5bcd281453fb4c37c0464e36e8ede5ba922933`
and `4cdee4d24e38e2eccedd56d993959cd7120b8e759573e8225b21487ac4972874`
both REJECTED it: the candidate checker inferred topology and capabilities from
raw-text regexes that comments, constructed recognizers, and computed global/
state access could evade; exact candidate-facing cases omitted incomplete
decimal and malformed exponent prefixes, nonzero failure transactions, and
enumerable descriptors. Root terminal rejection is
`517f605f0a295927a027e6eb5022159991d5228f6a762d7d5dd7576743a15656`.
G12 created no custodian, holdout, candidate, or author. G13 may replace only
that textual policy with a narrow TypeScript-AST allowlist and add the exact
missing observations; it must not become a generalized sandbox.

G13 has frozen that bounded correction. Its public preauthor receipt is
`51e8f1e46c62c2aae047179ac417fb763a10da4395602436b4793508d9549572`
and its 33-row closure is
`53c79dd64ae4cc93ab497ae712e6d06b601c8c61fbaae49b5277d117c2f4c73c`.
Workspace and `/tmp` validators emit identical
`41c254be53acf3d043deb5775c5344e286af2ed9f5558f963186913be560774c`
output. The rail contains 77 exact successes, seven guarded incomplete
suffixes, 336 failure transactions over zero/nonzero offsets, exact result
descriptors, four positive H/B/S/D assays, and six negative AST-policy
controls. Independent reviews `663dc9ab…be70` and `e7ab6509…b4fe` ACCEPTED
complementary topology and semantic/closure axes. Root accepted only the
preauthor boundary at
`38383e09cfc2d788d6399cf06d0422af61e91efed72a26e88ecadfb23beaec09`.
An independent custodian then sealed 172 cases at receipt
`9d6e210c…4c47e` and ciphertext `4e6a09fa…48671`. Four isolated author tasks
produced immutable H/B/S/D candidates `d1e98dfe…c8a0`, `00d6bf2f…33f1`,
`f2f379b0…606d`, and `552389f9…b4e1`; root independently closed their exact
source/import/bundle/AST identities before reveal `47823ab2…b1acb8`. All four
passed the public and 172-case holdout rails, but all five skeptics rejected
the exact set at root receipt `f3a76fea…a0945`; S had a repeated-fraction
semantic defect, the frozen-result contract was unproved, and the benchmark
was not a qualifying comparable door. No synthesis ran.

G14 then repaired the public result contract, repeated-fraction language, and
hostile corpus over four new exact H/B/S/D candidates. All four pass 88 public
success, 336 transactional-failure, ten parent, ten hostile, and 61 fresh
hidden cases. The complete quintetto still rejected the exact generation at
`f6410454bcc6d734d421454a0d076abde1eed3cf82fb510fbb8373a9ffbc1f9a`.
H is the retained idiomatic whole-terminal baseline and D the retained engine-
native comparator; B/S expose non-printable custom Parser wrappers, and S's
runtime parser construction deterministically exhausts the global safe Parser-
ID budget. The benchmark double-constructs candidate leaves, grants deposed
oracle sign/type fields, compares broader LIVE/C14 doors, and persisted only an
unpredeclared third timing capture. It grants zero qualification. G15 must use
a fresh preauthor holdout, immutable CSSWG source commit, truthful provenance,
printable static candidates, and a create-once operation-equivalent benchmark.
There is still no synthesis, benchmark-win, feature, or parser credit.

G15 then authored four fresh exact H/B/S/D candidates and selected the
scanner-free 17-line H2 terminal/map after direct correctness and peer
measurement. G15 itself was rejected because its H2 replay was not executable
from the bound evaluator and its benchmark pseudoreplicated schedule rows.
G16 retained exact H2, replayed 180/180 sealed cases plus 65,024 independent
oracle transactions, and ran one fresh 30-process confirmatory benchmark. Its
first subject was rejected only for an omitted alternative-candidate binding
and four false descriptive median/MAD fields. The corrected subject changed no
candidate, corpus, timing, or inference bytes; five fresh skeptics ACCEPTED,
then three independent adjudicators unanimously nominated exact H2
`8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`.
The byte-identical active promotion, strict TypeScript, and 4/4 integration
tests are GREEN under `g16/acceptance.json`. This closes only the internal
consume-number operation and its exact deposed-peer performance lane; literal
percentage, dimension, timeline-range, keyframes, public adapters, and the
full parser remain separate RED rows.

Once foundation winners exist, later candidates import their accepted exact
hashes. Moving a candidate from duplicated local terminals onto a shared
foundation after review changes bytes and starts a new generation; the ledger
must never call that a mechanical integration.

## 3. Ledger closure rules

The 76-root Snapshot/owner seed is an authentic, reconstructible proposed
source selection, not this denominator. As recorded in
`formation/denominator-state-audit-2026-07-22.md`, it currently yields zero
materialized normative-closure objects, zero operation-atomic occurrences, and
zero sealed feature rows. Source-lock fixed-point closure, the complete
include/exclude complement, owner-experiment identities, occurrence extraction,
52/37 compatibility joins, and a bidirectional validator precede ledger freeze.

`denominator/source-universe.json` is the first mechanical source-lock
artifact: raw SHA-256
`c1b823396dcc38607d23243f578e58ef08de79136edd52abd1bbdf6a64f606b7`,
canonical payload digest
`8cabb03dd4d88f4e90d67d5ecce4de1f1a181cc747b6073ab8c7a067fad6ce5f`.
It enumerates all 168 top-level authoritative Overview sources at the pinned
tree, retaining 76 seed roots and marking the 92-source complement
`UNCLASSIFIED_RED`. This closes enumeration only, not complement disposition,
normative fixed-point closure, or any operation row.

Occurrence-owner V8 also remains zero-credit. Its exact reconstruction and 168
source identities passed, but two independent challenges found fenced/raw/code
false structure, opaque-state delimiter swallowing, 3,427 href intervals with
contradictory dispositions, an excluded relative CSSWG link, inherited rather
than re-extracted carriers, regex-fabricated definition joins, same-line
ownership collapse, a throwing draft-root URL, heuristic operation omissions,
a non-independent semantic oracle, and unsealed launcher/resource evidence.
Root gestalt SHA-256 is
`d27225314682318d98c5bfde5abcfd4831949fa8d2d4ee9ac777fd8ff7e94f11`;
terminal rejection SHA-256 is
`1b34b1e557d8131a0d63647da2bb7418ea1347e9d9fd9e6d8c27b7eb09c634f5`.
V9 must use one byte-positioned, source-ordered, work-bounded state model for
the **corpus analyzer**, with state-bounded delimiters, parsed attributes, one
disposition per interval, byte-position ownership, a normative operation
ledger, and a genuinely independent oracle. That analyzer is research tooling
only; it is not permission to introduce a lexer or scanner into the direct
parse-that grammar prototype.

The first executable V9 research prototype now exists at
`denominator/tools/occurrence-owner-v9/`. On its exact frozen bytes it replays
18/18 V9 hostile fixtures, the 29-case inherited V8 regression module, all 13
declared stream states, 512 deterministic no-throw cases totaling 82,055 bytes,
seven malformed scale points under `8*N+64`, and 15/15 independently checked
mutation rejections. The analyzer is
`8d31d5189599f03be502aab450b5f17a9615d499c29dabc9a657eda4e69323da`;
the separately implemented oracle is
`19c9dd905990129d48a37eeb7d8667482cf61f8fec9b95e2574ddacdbd659ec2`.
This is bounded GREEN research evidence only. It has not run the 168-source
corpus and owns no complete normative-operation ledger or shards. Two
independent challenges reproduced wrong raw/escape boundaries, empty href and
excluded-reference semantics, mid-line and omitted headings, same-name nesting
errors, sequence-fabricated operations, truncation-silent IDs, an oracle that
accepts omissions/fabrications/state and source-base substitutions, and a
transition count that hides measured superlinear work. Root rejected the exact
subject at
`1a94d50fb15566691f0cea5b8430d64e9c78d89a08337a5186e73ebf853f238d`.
Two correction generations retained those exact regressions and repaired the
reported coordinate, heading, ledger-join, collision, and repeated-scan paths,
but neither earned acceptance. Repair2's exact analyzer `919af7db…107cd`,
oracle `899cf3d2…a881e`, and test `6c4da446…75ebb` replayed deterministic stdout
`ec77c14f…87861` from both workspace and `/tmp`. Fresh independent reviews
`bd1c979b…b9f98c` and `0cbb4a42…656d4e6` then reproduced bibliographic
admission inversions, stale same-name tag openings, false ordinary-`pre` and
Bikeshed-datablock activation, missing manual autolinks/heading carriers/
inherited definition attributes, undecoded attribute entities, rejected
ledger-row admission, non-container-aware ownership, Setext underline reuse,
throwing option objects, oracle common modes, and uncounted verifier scans.
Root terminal rejection is
`c1cd26a4285f79be04b3da3c7af820cf595eaff5bf770e9a5442e13a95df7b8c`.
Repair3 reduced the subject, added a declarative contract, and replayed 14,316
identical bytes from the workspace and `/tmp`. Independent reviews
`d15a1b10…1a6499` and `b6e99ebf…c6a740` nevertheless reproduced omitted
default manual autolinks and valid definition/bibliographic forms, false
`pre`/`l`/datablock states, undecoded definition text, Setext reuse,
revoked-proxy throws, a nineteen-source table that accepts erased non-witness
semantics, fabricated admitted-operation owners, and suppressible/unaccounted
work. Root terminal rejection is
`088034e31ccda4bea02a7ade8bce6d4b14879198ebb7332eec81b2765d5c8a0b`.
Repair4 may address only those root laws and must earn two fresh ACCEPT
challenges before operation-ledger formation or a 168-source run. Real
launcher/resource/publication-fault proof also remains absent. Every
denominator and parser credit remains zero.

- A family label is not a feature row.
- A BBNF declaration count is not normative coverage.
- A public export may own several feature rows; several public exports may
  share one operation only when the ledger proves the identity.
- Named constants/tables are fixtures within a row unless their parsing or
  serialization contract is independently variable.
- No row closes through a generic fallback that silently absorbs another
  normative production.
- The full denominator is closed only by a bidirectional mapping between
  pinned normative operations and ledger rows, with all exclusions explicit.
