<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/VALUE-FORMATION-PACKET-2026-07-29.md
  original-mtime: 2026-08-02T05:26:10
  original-sha256: d07b6ddc5cf0d673b37d696c8e940fec974227a129d2f614f89f7b305ffb14e6
  original-bytes: 63572
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value megatranche formation packet — 2026-07-29

Status: **FORMATION ADMITTED — ORDERED EXECUTION NOT STARTED**

This packet forms the admitted Value-owned library, demo, frontend, API,
palette, and bounded-consumer work. It does not claim that any product-source
wave has landed. A wave may begin only in the admitted order after its exact
dependencies and external blockers are satisfied. P1 is terminal
DELETE/PRUNE, P2 is terminal AMEND, and P3 is terminal REJECT/FOLD. The root
has frozen placement and the narrow grounded operation-name set; record shapes
remain owned by fail-capable execution cells. Two independent clean formation
audits closed the packet conflicts. Each execution wave remains separately
gated by its born-RED cells, implementation, and evidence contract.

## 0. Evidence cut and truth rule

- Clean isolated evidence: detached `e01d0065fa6c7c80282280566af2b9a4add809bf`.
  Before formation writes it was clean and contained the committed Tranche-U
  snapshot. Product/source bytes remain at that coordinate; the current
  worktree adds untracked formation artifacts only. The snapshot is not
  represented as the latest Value truth.
- Live evidence: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, same
  committed head, 37 commits ahead of its remote and materially dirty. At the
  read-only census it had 49 tracked diff files excluding the large defect
  ledger, 23,081 insertions, 16,942 deletions, another 5,549 defect-ledger
  insertions, and 2,363 untracked files. It was never written, staged, cleaned,
  stashed, reset, normalized, or used as a product build target.
- Corpus reconciliation: the committed completeness ledger reports 10
  incomplete SFC rows. The later live-dirty ledger reports **16 incomplete
  rows, 46 unbanked axes, 218/264 exact files present, and 218/264 hash-banked**.
  The live-dirty denominator is the current evidence receiver; neither ledger
  is implementation credit.
- Session reconciliation: the frozen 111-root batch contains 3 user Codex
  roots, 97 subagent Codex roots, and 11 Claude top-level roots. Dispositions
  are 0 implemented, 16 partial, 64 formation-only, 1 rejected, 11 superseded,
  and 19 no-action. Prompts and terminal text are intent/history, not source
  proof.
- Parser boundary: parse-that owns the generic runtime, immutable UTF-16 spans,
  failure-explicit state, transactional recovery, and ordinary combinator
  composition. Value owns CSS, transform-property, motion-path, SVG path,
  explicit CSS `linear()` stop validation/construction, and serializer domain
  behavior. Keyframes owns callable sampling. No parser API widening is
  required by this packet.
- Product authority: `DECISIONS.md` D9 is binding. Value visibility is
  `private | public`; lifecycle is `active | trashed`; moderation is
  `clear | withdrawn`. The unused `unlisted` state and its direct-link
  semantics are historical drift.

Historical tranche claims are accepted only when current source, a commit,
packed bytes, or a banked artifact independently supports them. All other
claims receive a terminal disposition in the supporting ledgers.

## 1. Formation objective and terminal outcome

The objective is complete Value formation across:

1. the package DAG and every retained public subpath;
2. the sole Value-owned CSS/path grammar and inverse surface;
3. the pure numeric transform leaf;
4. all 88 Vue SFC workflows and fourteen committed route identities;
5. palette/UI CRUD and provenance states;
6. centralized API policy and per-object immutable release membership;
7. Glass consumption and total shadcn/forwarding/tooling residue removal;
8. direct consumers, especially the measured Keyframes W-01/W-02 boundary;
9. desktop, phone, short-landscape, keyboard, reduced-motion, forced-colors,
   RTL, loading, empty, error, offline, auth, Admin, and sampled-frame proof.

Formation closes when:

- every wave has exact goal, file bounds, disjointness, dependencies, born-RED
  gates, cadence, artifacts, commit plan, and completion criteria;
- every known concept and historical receiver has a terminal
  `KEEP | FOLD | MOVE | SPLIT | PRUNE` disposition;
- all three served-model passes have root-agglomerated terminal deltas;
- every external blocker is named by an exact admissible successor artifact;
- no unowned remainder is hidden in prose.

After admission, each execution wave closes separately through its stated
born-RED → implementation → evidence contract: an implementation commit within
exact file bounds, focused lint/typecheck/tests during development, package-wide
boundary gates, and a tracked artifact or ordinary test proving completion.
Formation close is not future implementation close.

## 2. Frozen architecture

### 2.1 Package capability placement

| entry | terminal responsibility | disposition |
|---|---|---|
| `/css` | CSS values, stylesheet/keyframes/animation/timing/timeline grammar, explicit CSS `linear()` stop validation/construction, CSS transform-property grammar and inverse, typed matrix construction, offset-path/distance/rotate and CSS `path()` wrapper | **KEEP; FOLD/MOVE the admitted domain families into it** |
| `/path` | SVG `d` grammar/inverse and typed, DOM-free `PathGeometry` | **SPLIT from `/transform`** |
| `/transform` | numeric matrix decompose/recompose/interpolate/slerp only; zero parsing and zero path | **KEEP PURE** |
| `/color`, `/value`, `/easing`, `/math`, `/quantize` | existing semantic leaves, retained only under declaration and consumer proof | **KEEP conditionally** |
| package root, `/parsing`, `/units`, raw-source aliases, compatibility entries | no semantic authority | **PRUNE** |

The Keyframes root and named-timing package graphs must remain free of `/css`,
`/path`, `/transform`, parse-that, color, and the heavy engine. Named timing
stays on `/easing`; authored CSS timing enters through the heavy CSS boundary.
An explicit engine load may evaluate `/css`, `/path`, and `/transform` without
an unproved within-engine micro-chunk gate. A packed graph failure in a
protected light tier causes an internal split or narrower public entry; it
never authorizes a compatibility path.

### 2.2 API object split

`PaletteVersion._id = contentHash` is retired. The target separates:

- immutable `paletteId` identity from generated `slug` locator/handle;
- a private saved `Workspace` with its own `workspaceRevision`;
- immutable palette-local `Revision` membership keyed
  `(paletteId, revisionNo)`, carrying author, ancestry, `releaseHash`, and
  `payloadHash`;
- immutable `Release` publication with a strong validator and per-release
  policy facts;
- exactly one source edge per fork child;
- an optional global immutable payload blob keyed by `payloadHash`;
- separate handle-generation, workspace-revision, and policy-revision CAS
  clocks. Immutable Revision/Release has no mutable clock.

Every external read/revert uses canonical
`/api/palettes/{slug}/revisions/{revisionNo}` identity, resolves `slug` to
`paletteId`, then proves `(paletteId,revisionNo)` membership and per-release
authorization. `releaseHash` and `payloadHash` remain distinct internal
identities, never route locators. Revert appends a new revision; it never moves
a pointer to an old row or undeletes an aggregate. Payload deduplication is an
engineering/storage choice gated by corrected Fourier F-L1 R2, not an authority
shortcut. Until R2 is admissible, `LOCAL-SNAPSHOT` is the default.

### 2.3 Frontend composition

Each route has one job, one protagonist, one persistent `<main>`, one H1, and
one focus/scroll identity. A component may own paint or interaction; it may not
silently own both merely because it is a Card. Decoration that does not clarify
state, hierarchy, material, or affordance is removable.

The visual signature is:

- **Golden Glass:** Glass primitives own interaction/material mechanics;
  Value supplies measured chroma and content, never copied producer CSS.
- **Breath of Life:** one dominant chromatic instrument or specimen, with calm
  neutral ground and real empty/error/offline states.
- **Movement of Momentum:** causal motion with visible start/settle ownership;
  reduced motion resolves to final geometry.

`GenericActionBar.vue` is terminal **DELETE**. Route commands remain with the
objects and outcomes they mutate. No replacement generic renderer or command
registry is introduced. This deletion does not close the independent
`ActionToolbar` or `ActionButton` workflows.

## 3. Wave graph

```text
V.F0 evidence freeze
  ├─> V.L1 CSS grammar/recovery ─> V.L2 canonical inverses
  │                                  ├─> V.L3 explicit CSS linear stops ─┐
  │                                  └─> V.L5 SVG path + numeric-transform split
  │                                          └─> V.L4 CSS transform/motion ─┴─> V.L6 Keyframes adoption
  ├─> V.A1 policy ─> V.A2 membership/payload ─> V.A3 API routes/tests
  └─> V.U1 app/route scenes ─> V.U2 dock/actions ─> V.U3 picker/workbenches
                               └───────────────> V.U4 palette/Admin/scenes
V.L6 + V.A3 + V.U4 ─> V.H1 residue subtraction ─> V.G1 packed/browser proof
  ─> V.Q1 clean audit ─> V.Q2 clean audit ─> release handoff
```

No wave may borrow a later wave's compatibility shim. V.L*, V.A*, and V.U*
have disjoint primary file bounds and converge only in V.H1/V.G1.

### 3.1 Global wave laws

Every named wave inherits:

- **Archaeology:** cite the exact source/session/tranche receiver that created
  or contradicted the unit; prompts/status carry no implementation credit.
- **π:** record the pre-wave semantic, graph, API, geometry, chroma, state, or
  performance coordinate that the born-RED cell reproduces.
- **DELTA:** record the post-wave change in the same units. Visual units use
  declared geometry/pixel tolerances plus semantic state; package units use
  closure/evaluation bytes and edges; API units use policy/data/latency/storage
  facts. PNG byte identity and untyped screenshot approval are inadmissible.
- **Terminality:** every touched concept ends in
  `KEEP | FOLD | MOVE | SPLIT | PRUNE`; a routed remainder names its receiving
  wave and is not hidden as future work.
- **Commit grain:** born-RED precedes implementation; feature or deletion
  clusters receive body-bearing commits with why/what/evidence/routed
  remainder; no compatibility bridge is admitted to make a wave appear green.

## 4. Complete wave specifications

### V.F0 — Evidence and authority freeze

- **Goal:** establish the exact committed/live/parser/consumer/corpus evidence
  without modifying product source.
- **File bounds:** `docs/tranches/V/megatranche/**` formation artifacts only.
- **Mechanism:** authenticate committed and live coordinates separately, join
  the component/session/parser/consumer censuses by immutable identity, and
  route every contradiction into the typed DAG and terminal receiver ledgers.
- **Sub-gate:** fail on any unreproduced hash/status/census, non-genuine served
  model receipt, implementation credit inferred from prompts, or receiver with
  no named owning wave and terminal verb.
- **π/DELTA disposition:** committed/live/parser/session π coordinates with
  reproducible identities **KEEP**; stale or unresolvable coordinates
  **PRUNE**; the reconciled formation DELTA **KEEP**, while every executable
  change **MOVE** to its owning implementation wave.
- **Disjointness:** no product source, dependency, build output, producer, or
  consumer edit; later waves own all executable changes.
- **Dependencies:** none.
- **Born RED:** committed/live status mismatch; live 16-row/46-axis ledger;
  session batch with zero implementation credit; unresolved parser Pass-1
  candidates.
- **Completion:** all evidence coordinates and stale claims have explicit
  receivers/dispositions; all three genuine served-model receipts have
  root-agglomerated terminal deltas. The earlier GenericActionBar
  requested-model label does not satisfy the separately proved P1 gate.
- **Cadence:** Markdown/link/search validation after each artifact; full packet
  cross-reference check at boundary.
- **Artifacts:** this packet, typed DAG, component matrix, API matrix,
  Keyframes contract, research/audit ledger.
- **Commit plan:** `docs(v-f0): admit the Value formation packet from reconciled live and committed evidence`
- **Terminal dispositions:** historical status prose **FOLD**; false current
  claims **PRUNE**; exact source/commit/packed evidence **KEEP**.

### V.L1 — Sole CSS grammar and recovery

- **Goal:** one source-direct, lossless, failure-explicit stylesheet/keyframes/
  animation/timing/timeline/value grammar using parse-that without copying or
  absorbing its generic runtime.
- **File bounds:** grammar/result/diagnostic modules under `src/css/**`,
  `src/subpaths/css.ts`, external `test/css/grammar/**`, and the package graph
  cells that protect `/css`.
- **Mechanism:** compose the released parse-that Result/span/recovery substrate
  into Value-owned source-direct CSS productions, immutable diagnostics, and
  external isomorphic grammar tests, with native-ESM and packed closure cells
  guarding the public `/css` entry.
- **Sub-gate:** exact UTF-16 span/recovery vectors, trailing-input refusal,
  immutable successful-recovery diagnostics, scanner/token/source-alias
  absence, and released-coordinate package reachability must all pass; the
  parser release/rebind blocker remains fail-closed.
- **π/DELTA disposition:** split/local grammar and scanner π evidence **FOLD**
  into the born-RED corpus; the generic runtime **KEEP in parse-that**; the
  sole Value CSS grammar DELTA **KEEP**; local scanners, aliases, and fallback
  paths **PRUNE**.
- **Disjointness:** canonical inverse is V.L2; sampled-linear construction is
  V.L3; transform/motion is V.L4; SVG path and numeric transform are V.L5.
- **Dependencies:** V.F0 and the canonical parse-that successor wave. Dogfood
  may consume one immutable unpublished candidate tarball by exact SHA,
  without a source alias. Final closure is **BLOCKED-ON** Value plus one named
  same-primitive non-CSS grammar receipt, the successor’s deletion/equivalent-
  output/formal-performance admission, its released immutable coordinate, and
  a Value rebind/retest against that release. The substrate must satisfy exact
  UTF-16 span, failure-explicit Result, transactional recovery,
  ordinary-composition, package, and performance gates. Rejected prototype M3
  commit `90d4ec54` is negative evidence only, never a dependency.
- **Born RED:** exact UTF-16 spans; immutable diagnostics; transactional
  recovery; successful stylesheet Result with immutable recovery diagnostics;
  strict-leaf behavior; malformed/trailing-input refusal; native-ESM and packed
  `/css` reachability; no token/scanner plane, source alias, or fallback parser.
- **Completion:** all grammar families return one failure-explicit Value Result
  family; recovered stylesheet success is representable and non-throwing;
  parsed-node/source-map spans settle against the released immutable
  parse-that successor;
  candidate dogfood evidence is followed by a clean rebind/retest against the
  released coordinate; packed `/css` resolves only released artifacts at
  closure; no parser runtime is copied into Value.
- **Cadence:** focused grammar/typecheck per family; lint every two families;
  packed reachability at boundary.
- **Artifacts:** grammar vector corpus, span/recovery snapshots, unpublished
  candidate tarball SHA, Value and named non-CSS consumer receipts, released
  parse-that tag/commit/tarball SHA, rebind receipt, `/css` closure trace.
- **Commit plan:**
  1. `test(v-l1): bind CSS grammar span recovery and package RED cells`
  2. `feat(css-grammar): form the sole lossless Value CSS grammar`
- **Terminal dispositions:** generic runtime **KEEP in parse-that**; Value-owned grammar
  **KEEP**; local scanners and aliases **PRUNE**.

### V.L2 — Canonical CSS inverses

- **Goal:** publish the smallest canonical, failure-explicit inverse family for
  values, timing functions, selectors, declarations, stylesheet items, parsed
  grammar-valid animation shorthand, and semantic ordered longhands.
- **File bounds:** serializer/inverse modules under `src/css/**`, public `/css`
  wiring, external `test/css/inverse/**`, and inverse-specific packed graph
  cells.
- **Mechanism:** fold grounded internal serializers into one Result-returning
  canonical inverse family, then prove spelling, formatting ownership,
  refusal, and parse→serialize→parse stability with external vectors and packed
  `/css` entry tests.
- **Sub-gate:** every admitted grammar family must pass canonical roundtrip and
  exact refusal cells, including shorthand/ordered-longhand separation,
  `playState`, explicit `composition: "replace"`, separator ownership, and
  parser-provenanced opaque unknowns with no public raw constructor.
- **π/DELTA disposition:** grounded serializer π implementations **FOLD** into
  the canonical family; canonical inverses and refusal contracts **KEEP** as
  DELTA; throwing emitters, raw passthrough, compatibility exports, and
  caller-forged opaque strings **PRUNE**.
- **Disjointness:** parsing/recovery stays V.L1; sampled linear V.L3; transform/
  motion V.L4; path V.L5.
- **Dependencies:** V.L1 and the root-agglomerated P2 operation/contract
  invariants; record shapes remain born-RED-derived.
- **Born RED:** parse→serialize→parse; canonical spelling; refusal for
  unsupported/non-finite/contradictory values; `playState`; nested-path inverse;
  parsed-shorthand ambiguity; explicit `composition: "replace"` emits its
  longhand; separator/indent/final-newline ownership; public issue stability;
  parser-provenanced non-forgeable opaque unknown items.
- **Completion:** no throw, empty-string substitution, raw passthrough, double
  separator, ambient formatting state, hybrid shorthand/options serializer,
  compatibility export, public raw constructor, competing opaque-node
  representation, or copied Keyframes emitter.
- **Cadence:** focused inverse/typecheck per family; lint every two families;
  packed inverse smoke at boundary.
- **Artifacts:** canonical vectors, refusal table, formatting ownership
  contract, `/css` inverse closure trace.
- **Commit plan:**
  1. `test(v-l2): bind canonical CSS inverse and refusal contracts`
  2. `feat(css-inverse): publish canonical failure-explicit CSS inverses`
- **Terminal dispositions:** grounded internal serializers **FOLD**; throwing emitters and
  caller-forged opaque strings **PRUNE**.

### V.L3 — Explicit CSS `linear()` stops

- **Goal:** construct and validate typed explicit CSS `linear()` stops while
  leaving callable sampling, density, error, and curve policy in Keyframes.
- **File bounds:** sampled-linear types/construction under `src/css/**`,
  external `test/css/linear/**`, and its `/css` reachability cell.
- **Mechanism:** derive an explicit-stop validator and typed constructor from
  standards vectors, reuse V.L1 Result diagnostics and V.L2 canonical inverse
  rules, and expose only the authored CSS stop product through `/css`.
- **Sub-gate:** arity, finite-value, position fix-up, decreasing/out-of-range,
  invalid/degenerate refusal, canonical inverse, and timing-tier graph cells
  pass while callable sampling/error/`maxStops` evidence remains Keyframes-
  owned and absent from Value.
- **π/DELTA disposition:** callable sampling and curve-policy π **KEEP in
  Keyframes**; explicit-stop validation/construction **MOVE to Value** and
  **KEEP** as DELTA; adaptive-provenance machinery **PRUNE**.
- **Disjointness:** no easing sampling algorithm, scheduler, or callable
  projection moves from Keyframes.
- **Dependencies:** V.L1–L2 Result, diagnostic, and canonical-inverse
  conventions plus the root-agglomerated P2 stop-validation boundary.
- **Born RED:** standards-derived explicit CSS-stop arity, positions, fix-up,
  decreasing/out-of-range vectors, finite values, invalid and degenerate
  refusal, canonical inverse, and timing-only package graph; Keyframes sampler
  receipt covers callable error, `maxStops`, throws, and non-finite samples.
- **Completion:** construction/validation is typed and failure-explicit;
  Value contains no adaptive-provenance brand or callable sampler; Keyframes
  still owns how samples are produced.
- **Cadence:** focused property/vector tests each rule; lint/typecheck at unit
  end; packed timing trace at boundary.
- **Artifacts:** CSS-stop vector corpus, refusal receipt, Keyframes sampling
  receipt coordinate, timing closure trace.
- **Commit plan:**
  1. `test(v-l3): bind sampled-linear provenance validation and graph RED cells`
  2. `feat(css-linear): add typed sampled linear construction and validation`
- **Terminal dispositions:** typed validation/construction **MOVE to Value**; sampling
  policy **KEEP in Keyframes**.

### V.L4 — CSS transform and motion semantics

- **Goal:** place CSS transform-list grammar/inverse, typed `matrix()`/
  `matrix3d()` construction, offset-path/distance/rotate, and CSS `path()`
  wrapper on `/css`.
- **File bounds:** CSS transform/motion modules under `src/css/**`, external
  `test/css/{transform,motion}/**`, and protecting `/css` graph cells.
- **Mechanism:** derive grammar and canonical inverse records from the full
  Webref/WPT transform/motion denominator, bind typed matrix constructors and
  offset-property cross-validation, and accept CSS `path()` only through V.L5
  typed path data.
- **Sub-gate:** all axis forms, unresolved `var()`/`calc()`, finite
  constructors, exact recovery/refusal, typed CSS `path()`, and protected light
  import tiers pass; raw offset strings, scanners, throws, eager geometry, and
  `invertCssMatrix*` exports remain absent.
- **π/DELTA disposition:** existing CSS transform/motion fragments **MOVE/FOLD
  to `/css`**; typed semantics and canonical inverse **KEEP** as DELTA; raw
  strings, copied scanners, and consumerless inverse exports **PRUNE**; DOM
  resolution and scheduling **KEEP in Keyframes**.
- **Disjointness:** SVG `d` grammar/geometry and numeric decompose/slerp are
  V.L5; DOM computed style and motion scheduling remain Keyframes.
- **Dependencies:** V.L1–L2, V.L5 typed SVG path data, and the
  root-agglomerated P2 operation/contract invariants. Record shapes derive from
  the full Webref/WPT denominator. V.L5 executes before V.L4 even though its
  numeric identifier is higher; CSS `path()` may not invent a temporary
  raw-string path type.
- **Born RED:** invalid-source Result; exact spans/recovery; canonical inverse;
  finite typed matrix constructors; full Webref/WPT translate/scale/rotate/skew
  axis forms; unresolved `var()`/`calc()` values; offset property
  cross-validation; CSS `path()` uses typed path data; timing-only `/css` does
  not evaluate SVG geometry or numeric transform; `invertCssMatrix*` exports
  are absent.
- **Completion:** no raw `OffsetPath=string`, CSS scanner, throwing parser, or
  eager heavy edge; packed graph falsifiers pass.
- **Cadence:** focused grammar/inverse/typecheck each property family; lint at
  family boundary; packed timing/motion traces at unit end.
- **Artifacts:** transform/motion corpus, typed constructor fixture, package
  traces.
- **Commit plan:**
  1. `test(v-l4): bind CSS transform motion and import-tier RED cells`
  2. `feat(css-motion): add typed CSS transform and motion semantics`
- **Terminal dispositions:** CSS transform/motion grammar **MOVE/FOLD to `/css`**; raw
  strings, copied scanners, and consumerless numerical matrix inversion
  **PRUNE**.

### V.L5 — Cohesive `/path` and numeric-only `/transform`

- **Goal:** form one SVG `d` grammar/inverse plus typed geometry capability on
  `/path`, while leaving `/transform` a zero-parsing numeric leaf.
- **File bounds:** new `src/path/**`, `src/subpaths/path.ts`, existing
  `src/transform/**`, both public entries, external `test/{path,transform}/**`,
  and their graph/type falsifiers.
- **Mechanism:** split SVG grammar/inverse and parser-produced typed geometry
  into `/path`, retain only consumer-proved numeric matrix operations on
  `/transform`, and enforce the boundary with compile-time constructor and
  native-ESM reachability tests.
- **Sub-gate:** the full SVG command/implicit-repeat corpus, empty/move-only/
  multi-subpath geometry, finite tolerance/work, non-finite sampling,
  canonical inverse, string-constructor rejection, duplicate-accessor absence,
  and zero-parsing `/transform` graph must all pass after parser release/rebind.
- **π/DELTA disposition:** path helpers and grammar π **MOVE+SPLIT** to
  `/path`; consumer-proved numeric transform operations **KEEP**; typed total
  geometry and canonical inverse **KEEP** as DELTA; string helpers,
  parse-each-call paths, duplicate accessors, and consumerless numerics
  **PRUNE**.
- **Disjointness:** CSS `path()` wrapper is V.L4; no Keyframes engine behavior
  enters either Value subpath.
- **Dependencies:** V.L1 Result/span conventions, V.L2 inverse rules, and the
  same canonical parse-that successor path: one immutable unpublished
  candidate tarball may support dogfood, but final closure is
  **BLOCKED-ON** the named non-CSS receipt, released immutable coordinate, and
  Value rebind/retest. No M3 package or source alias is admissible.
- **Born RED:** every SVG command/implicit repeat; empty SVG data contract
  (distinct from CSS offset-path `none`);
  malformed flags/numbers; exact spans/recovery; canonical inverse; total
  typed-only `PathGeometry`; empty data is origin/length zero; move-only data
  samples its move point; multiple subpath moves create no phantom connecting
  segment; finite work/tolerance; explicit NaN/±Infinity sampling;
  `new PathGeometry("M0 0")` compile rejection; duplicate
  `getTotalLength()` absence; native-ESM `/transform` closure has no parse-that,
  `/css`, `/color`, or `/path`.
- **Completion:** `/path` is cohesive and failure-explicit; no scanner/string
  constructor/dual path or duplicate length accessor; typed geometry is total
  over admitted parser-produced finite data; `/transform` retains only
  consumer-proved numeric matrix/decompose/recompose/interpolate/slerp behavior.
- **Cadence:** grammar/geometry tests each unit; numeric tests per family;
  lint/typecheck after each move; clean pack traces at boundary.
- **Artifacts:** path corpus, geometry contract, export ledger, candidate and
  released parse-that coordinates plus rebind receipt, `/path` and
  `/transform` closure traces.
- **Commit plan:**
  1. `test(v-l5): bind SVG path geometry and transform-purity RED cells`
  2. `feat(path): split SVG grammar inverse and typed geometry from transform`
  3. `refactor(transform): leave a numeric-only matrix decomposition and interpolation leaf`
- **Terminal dispositions:** path source **MOVE+SPLIT** to `/path`; numeric operations
  **KEEP**; string helpers, parse-each-call convenience, and consumerless
  numeric exports **PRUNE**.

### V.L6 — Keyframes W-01/W-02 consumer adoption

- **Goal:** let Keyframes delete its CSS/path forks without changing engine
  ownership or eager import weight.
- **File bounds:** Value packed artifacts/tests and coordination receipts only;
  Keyframes edits remain exclusively in its lane.
- **Mechanism:** classify every measured Value reference by consumer and import
  tier, prove Value public-entry packs, and require Keyframes-owned W2 deletion
  plus W3 immutable-pack receipts before closing the consumer edge.
- **Sub-gate:** the exact 53-reference/51-file bijection—including 49 imports
  and four non-import literals—must have one disposition each; W2 must prove
  adoption/deletion and W3 must prove eager/timing/engine evaluation tiers and
  exact packed bytes, with W10 Atlas retained as an open constellation edge.
- **π/DELTA disposition:** Keyframes-local serializers, scanners, and grammar π
  **MOVE/FOLD then PRUNE**; DOM resolution, progress, scheduling, composition,
  and sampling policy **KEEP in Keyframes**; packed Value adoption/deletion
  receipts **KEEP** as DELTA.
- **Disjointness:** this is the bounded consumer proof after Value capability
  waves, not another Value grammar implementation.
- **Dependencies:** V.L1–L5, clean packed Value entries, Keyframes W2 exact
  adoption/deletion receipt, and Keyframes W3 immutable tarball plus
  tier/evaluation receipt.
- **Born RED:** exactly 53 `/css` references across 51 files: 49 direct imports
  in 47 files (29 source, 7 demo, 10 test, 3 bench), plus four non-import
  literals—two `import.meta.resolve` probes and two bench HTML import-map keys;
  explicit eager `.`, CSS-free named `/easing`/`resolveEasing()`, engine, and
  Atlas evaluation tiers.
- **Completion:** every one of the 53 references has a terminal migration
  disposition, including an explicit classification for all four non-import
  literals. Keyframes can no longer merely “can” migrate: W2 proves adoption
  plus local serializer/scanner/grammar deletion and W3 proves the immutable
  pack and tiers. Eager and timing tiers remain free of `/css`, `/path`,
  `/transform`, heavy engine, and parse-that; explicit engine load may load
  `/css`, `/path`, and `/transform` without an unproved within-engine path
  micro-chunk gate. The constellation consumer edge remains open through the
  W10 Atlas MorphSVG crater even after this Value receipt closes.
- **Cadence:** packed Value smoke after each capability family; external
  isomorphic tests after each Keyframes batch; two-package clean pack at end.
- **Artifacts:** 53-reference/51-file classification map, including the 49
  direct imports and all four non-import literals; Keyframes W2 deletion
  receipt, W3 exact tarball SHA and tier traces, open W10 Atlas receiver, exact
  remainder.
- **Commit plan:** Value
  `test(v-l6): prove Keyframes CSS path and timing consumers against packed entries`;
  Keyframes commits are separately owned.
- **Terminal dispositions:** Keyframes DOM resolution, timeline progress,
  WAAPI/rAF/composition and sampling policy **KEEP**; local serializers and SVG
  scanner **MOVE/FOLD then PRUNE**.

### V.A1 — Centralized palette access policy

- **Goal:** one policy decision for detail, fork, fork-list, provenance,
  revision-list, revision-read, revision-diff, revert, and Admin operation.
- **File bounds:** `api/src/modules/palette/service/access-policy.ts`, route
  adapters, policy tests. No revision storage schema.
- **Mechanism:** implement one typed default-deny decision function over object
  policy, release policy, caller role, operation, and Admin context, and make
  every route/service adapter consume that decision rather than rederive it.
- **Sub-gate:** every operation crosses the private/public × owner/non-owner ×
  active/trashed × clear/withdrawn × visible-release matrix, including
  per-child filtering, unavailable-hop redaction, Admin audit, existence
  hiding, and transaction-time fork reauthorization.
- **π/DELTA disposition:** `unlisted` and direct-link π semantics **PRUNE**;
  historical predicates **FOLD** into the closed matrix; ad-hoc route checks
  **PRUNE**; the centralized policy and typed decisions **KEEP** as DELTA.
- **Disjointness:** V.A2 owns membership/payload; V.A3 owns repository
  migration and end-to-end route wiring.
- **Dependencies:** V.F0, D9–D13, and the absorbed vnext operation registry.
- **Born RED:** private/public × owner/non-owner × active/trashed ×
  clear/withdrawn × visible-release matrix; object authorization separated from
  per-release/list-item authorization; explicit Admin policy/audit;
  unauthorized existence hiding; child-by-child fork-list filtering;
  unavailable-hop provenance redaction without child revocation;
  transaction-time fork recheck.
- **Completion:** no route/service directly substitutes `isActivePublic`; all
  decisions are typed and default-deny; anonymous and authenticated
  non-owner denial reveal no resource existence.
- **Cadence:** policy table suite per operation; lint/typecheck after each
  adapter; API unit suite at boundary.
- **Artifacts:** matrix in `formation/API-POLICY-V-API-01-2026-07-29.md`.
- **Commit plan:** `fix(api-policy): centralize palette read fork provenance and history authorization`
- **Terminal dispositions:** `unlisted` **PRUNE**; historical predicates **FOLD** into
  the closed policy; ad-hoc route checks **PRUNE**.

### V.A2 — Per-object revision/release membership and optional payload dedup

- **Goal:** stop global content equality from erasing object membership,
  authorship, and ancestry.
- **File bounds:** palette models/repositories/migration plus focused storage
  tests; no route DTO changes.
- **Mechanism:** replace global content-addressed membership with palette-local
  `(paletteId,revisionNo)` rows carrying author/ancestry/release/payload
  identities, keep payload bytes local by default, and admit any optional blob
  split only through corrected Fourier evidence.
- **Sub-gate:** identical content across two palettes and within one palette,
  distinct authorship, cross-object refusal, unique membership, one source edge
  per child, digest-collision byte equality, rollback, migration, and corrected
  F-L1 overlap/latency/storage controls must all pass.
- **π/DELTA disposition:** the global version row and hash-membership π model
  **PRUNE**; membership/author/ancestry **SPLIT** from payload identity;
  `LOCAL-SNAPSHOT` **KEEP as default**; complex storage selection **MOVE** to
  corrected Fourier F-L1 R2 and remains blocked; palette-local membership
  **KEEP** as DELTA.
- **Disjointness:** V.A1 owns policy; V.A3 owns route/service DTO wiring; this
  unit changes storage identity only.
- **Dependencies:** V.A1 and **BLOCKED-ON corrected Fourier F-L1 R2**. The
  current F-L1 is rejected as admission evidence: it conflates `releaseHash`
  with `digest(payload)`, rejects a valid same-object identical-content
  successor, contains a vacuous `GLOBAL-BLOB-SPLIT` collision cell whose shared
  membership helper masks the wrong-answer mutant, and uses partitioning that
  reverses storage conclusions.
- **Born RED:** two palettes with identical content and distinct authors;
  repeated content inside one palette as distinct numeric revisions;
  cross-object `(slug, revisionNo)` read/revert refusal; unique
  `(paletteId,revisionNo)`; one source edge per child; parent/fork ancestry;
  digest-collision byte equality; transaction rollback.
- **Completion:** membership identity is palette-local; `payloadHash` is
  payload identity only; both objects retain their rows; no throwing
  string/global-hash constructor path.
- **Cadence:** repository tests per index/write; transaction suite each unit;
  API typecheck/lint at unit end.
- **Artifacts:** corrected deterministic F-L1 R2 receipt with distinct
  release/payload hashes, real wrong-answer control, global and per-record/
  index-aware storage models, 0/partial/100%-overlap sweeps, authorized
  read/revert p95, index plan, and migration/rehearsal receipt.
- **Commit plan:**
  1. `test(v-a2): bind per-palette revision membership and collision isolation`
  2. `refactor(api-revisions): split revision and release membership from payload identity`
- **Terminal dispositions:** global version row **PRUNE**; `LOCAL-SNAPSHOT` **KEEP as
  default**; more complex payload storage is **BLOCKED-ON corrected F-L1 R2**;
  membership/author/ancestry **SPLIT**.

### V.A3 — Route, transaction, and wire closure

- **Goal:** wire policy and membership through every CRUD/provenance route.
- **File bounds:** palette routes/services/repositories/format/schema and
  their unit/conformance tests.
- **Mechanism:** absorb the canonical vnext route/operation registry, resolve
  `slug` to immutable `paletteId`, enforce V.A1 policy plus V.A2 membership in
  transactions, and bind strong CAS/idempotency outcomes into DTO and OpenAPI
  derivation.
- **Sub-gate:** canonical revision-number routes, cross-object denial,
  owner/non-owner trashed and withdrawn states, transaction-time policy change,
  `If-Match` 428/412, database `matchedCount`, byte-equivalent idempotent
  replay, digest mismatch, private fork creation, and generated OpenAPI must
  pass with all global-hash aliases absent.
- **π/DELTA disposition:** global hash routes/reverts **PRUNE**; route-local
  authorization **FOLD** into centralized policy; canonical membership-aware
  routes, transactional CAS/idempotency, and generated wire contracts **KEEP**
  as DELTA.
- **Disjointness:** no new policy state or storage architecture; reopen V.A1
  or V.A2 if wiring exposes a missing authority/data decision.
- **Dependencies:** V.A1–A2.
- **Born RED:** canonical revision-number routes; cross-object 404; owner 410
  for trashed detail versus non-owner 404; withdrawn/private; soft-delete;
  independently readable child after hidden ancestor; in-transaction source
  policy change; strong `If-Match` 428/412; database CAS `matchedCount`;
  process-local idempotent fork/revert replay and digest mismatch; no stored
  public `forkCount`; revision DTO contains no payload-store/internal policy
  fields.
- **Completion:** `/versions/:releaseHash` and aliases are absent; the route
  slug resolves to `paletteId`; revision membership and policy are both checked;
  revert appends a new revision and returns 201; fork creates a private child
  and returns 201; process-local replay is byte-equivalent; generated OpenAPI
  derives from mounted canonical routes.
- **Cadence:** focused route file suite on each adapter; API lint/typecheck
  every two routes; full API and conformance suites at boundary.
- **Artifacts:** route matrix, OpenAPI diff, transaction coverage ledger.
- **Commit plan:** `fix(api-revisions): absorb canonical CAS-idempotent revision and fork operations`
- **Terminal dispositions:** global hash reads/reverts **PRUNE**; route-local
  authorization **FOLD**; correct transactional writes **KEEP**.

### V.U1 — App boot and route-scene identity

- **Goal:** one mounted application, persistent `<main>`, H1/focus/scroll
  identity, and a closed route inventory.
- **File bounds:** `demo/color-picker/{main.ts,App.vue,ErrorBoundary.vue,router/**}`,
  `demo/shell/{viewSchema.ts,useViewManager.ts,usePaneRouter.ts,PaneSlot.vue}`,
  `demo/shell/PaneSegmentedControl.vue`, route-scene tests.
- **Mechanism:** mount once after router readiness, drive one typed route-scene
  registry through a persistent `<main>`, and assign route arrival, H1,
  focus, scroll, transition, and error-boundary ownership to that registry.
- **Sub-gate:** all fourteen routes plus unknown-path behavior must prove one
  active subtree, one visible H1, stable focus/scroll identity, div—not body—
  mount, and 320/390/1440/short-landscape behavior with no redirect/query
  compatibility aliases.
- **π/DELTA disposition:** body mount, stub routing, zero-H1 observations, and
  parallel viewport route tables form the π corpus; stub semantics **FOLD**
  into typed scene data, parallel tables/aliases **PRUNE**, and the persistent
  route-scene identity **KEEP** as DELTA.
- **Disjointness:** route topology and lifecycle only; V.U2 owns commands and
  V.U3–U4 own feature/component presentation.
- **Dependencies:** V.F0. One immutable Glass 8 candidate pack with an exact
  complete JS/declaration/CSS/style/font manifest may support development.
  Final Value closure remains gated by the published immutable Glass 8
  artifact in the downstream packed proof wave.
- **Born RED:** current live browser has zero H1 on every sampled route;
  route arrival focus and scroll identity; 320/390/1440/short-landscape;
  unknown-route behavior; no body mount.
- **Completion:** router ready before mount, one div mount, one visible H1 per
  route, one active subtree through transitions, typed scene registry, no
  redirect/query compatibility aliases.
- **Cadence:** focused Vue tests each scene step; demo typecheck every two
  steps; lint at unit end; Browser pilot on Gradient and Mix.
- **Artifacts:** route inventory and focus/scroll screenshots/receipts.
- **Commit plan:**
  1. `fix(demo-app): establish router-ready div mount and persistent route landmark`
  2. `refactor(demo-scenes): make route identity and scene ownership explicit`
- **Terminal dispositions:** stub component routing **FOLD** into scene data; parallel
  desktop/mobile route tables **PRUNE**.

### V.U2 — Dock/action ownership and GenericActionBar deletion

- **Goal:** stable navigation chrome and route-local truthful commands.
- **File bounds:** dock files, `usePaneRouter.ts`, App mount bridge,
  `demo/picker/ColorPicker.vue` command seating, and exact
  Generate/Gradient/Mix forwarding relays named by the adjudication.
- **Mechanism:** delete the shell↔pane ref/descriptor branch and seat each
  surviving command beside the object and outcome it mutates, retaining only
  ColorPicker's independent `ActionBarLayer` and locally proved controls.
- **Sub-gate:** desktop and 390×844 Gradient `90°→337°→Reset` evidence must
  prove the local Reset, focus restoration, truthful success timing, and no
  duplicate/no-op action seat; the complete GenericActionBar/ref/relay cut
  must be absent without a replacement registry.
- **π/DELTA disposition:** the enabled-no-op Reset and mirrored descriptor/ref
  branch are π and **PRUNE**; route-local Generate/Gradient/Mix commands and
  `ActionBarLayer` **KEEP**; implicit Seed, shell Clear, `clearSelection`, and
  `MixPane.copyResult` **PRUNE**; durable local command seating **KEEP** as
  DELTA.
- **Disjointness:** command seating and the exact proxy deletion only; route
  feature behavior remains in V.U3 and palette policy remains V.A1.
- **Dependencies:** V.U1.
- **Born RED:** 390×844 Gradient `90°→337°→Reset` remains 337° after 250ms;
  enabled no-op; duplicate action seats; success pulse before operation;
  Escape focus restoration; the two live-open U2 component rows
  `ActionToolbar` and `ParseEchoReadout`. Final acceptance requires durable
  desktop and 390×844 Reset artifacts, not the text-only witness.
- **Completion:** `GenericActionBar`, `DockActionBar`, `PaneActionRefs`,
  shell↔pane refs, desktop-only mount bridge, and forward-only exposes are
  absent, together with stale PaneSlot examples. `ActionBarLayer` remains for
  ColorPicker. Generate keeps its local seats. Gradient gains local Reset and
  deletes implicit first-palette Seed. Mix keeps local Mix plus result
  Copy/Reset, and deletes `MixPane.copyResult`, shell Clear, `clearSelection`,
  and generic descriptors. No shell workaround replaces an inoperative
  descriptor path.
- **Cadence:** focused component tests after each route; lint/typecheck every
  route; desktop+mobile Browser cell at unit end.
- **Artifacts:** action-seat table and durable before/after desktop + 390×844
  keyboard/mobile Reset receipts under the π/DELTA manifest.
- **Commit plan:** `refactor(demo-actions): delete shell-mirrored workbench commands and seat outcomes locally`
- **Terminal dispositions:** generic branch **PRUNE**; route-local commands **KEEP**;
  implicit first-palette Seed, shell Clear, `clearSelection`, and
  `MixPane.copyResult` **PRUNE**; ActionToolbar/ActionButton remain independently
  open/owned.

### V.U3 — Picker and workbench workflows

- **Goal:** complete picker, Extract, Generate, Gradient, Mix, Atmosphere, and
  Blob workflows under the component matrix.
- **File bounds:** `demo/picker/**` descendants except the top-level
  `ColorPicker.vue` command seat owned by V.U2, `demo/color-session/**`,
  `demo/workbenches/**`, `demo/scenes/{atmosphere,blob,ConfigSliderPane.vue}`.
- **Mechanism:** execute one component-owned workflow at a time from the
  88-row D/L/C matrix, bind native control and state ownership in focused
  tests, and capture decisive route/state/motion frames for each feature
  cluster against the candidate Glass pack.
- **Sub-gate:** every owned row must close its route job, protagonist,
  hierarchy, responsive/container, keyboard, forced-colors, RTL, motion,
  loading/error, and async-result truth; the five named open rows, zero-color
  Mix removal, and hidden debug/pointer paths are explicit fail cells.
- **π/DELTA disposition:** pointer-only/debug production surfaces **PRUNE**;
  semantic local workflow state and honest results **KEEP**; merely
  shared-by-name helpers **FOLD or PRUNE**; component-specific tested and
  measured workflow states **KEEP** as DELTA.
- **Disjointness:** no palette/Admin components, API policy/storage, shell
  topology, or producer implementation.
- **Dependencies:** V.U1–U2, the admitted V.L1–L5 capabilities used by these
  workflows, and an exact immutable Glass 8 candidate pack for development;
  the candidate confers no final release credit.
- **Born RED:** each component's D/L/C workflow plus route job, protagonist,
  hierarchy, spacing/dividers, native control, paint/interaction ownership,
  forced-colors, RTL, motion, loading/error, and result truth. The five
  live-open U3 rows are `ConsoleRail`, `ColorComponentDisplay`,
  `DebugEventLog`, `PointerDebugOverlay`, and `GradientPane`.
- **Completion:** no pointer-only path; one keyboard owner; noninteractive
  Blob specimen; honest gamut/readout; stable gradient stop identity;
  result-aware async operations; no hidden debug production path;
  `MIN_COLORS`/`canRemoveColor` are absent and per-item Mix removal can reach
  zero.
- **Cadence:** component-focused tests each component; feature typecheck/lint
  each 2–3 components; Browser route after each feature cluster.
- **Artifacts:** 88-row matrix updates and decisive π/DELTA frames.
- **Commit plan:** one body-bearing commit per feature cluster:
  `feat(picker)`, `feat(extract)`, `feat(generate)`, `feat(gradient)`,
  `feat(mix)`, `feat(scenes)`.
- **Terminal dispositions:** PointerDebug production surface **PRUNE**; semantic local
  state **KEEP**; merely shared-by-name helpers **FOLD or PRUNE**.

### V.U4 — Palette, Admin, shared, and content workflows

- **Goal:** complete every palette/Admin/content component and all visible
  CRUD states.
- **File bounds:** `demo/palettes/**`, `demo/shared/**`,
  `demo/scenes/about/**`, palette transport/client tests.
- **Mechanism:** give every palette/Admin/content component its own route-state
  workflow, separate factual specimen paint from selection/mutation controls,
  and project canonical V.A3 policy/revision/provenance responses into typed
  client states.
- **Sub-gate:** the nine named open rows and every public/private/withdrawn/
  trashed, loading/empty/error/offline/auth/Admin, stale-expansion,
  soft-delete, reorder, swatch, and server-authority state must pass per route
  without aggregate Card interaction or UI-auth fiction.
- **π/DELTA disposition:** aggregate Card semantics and client-side
  authorization fiction **PRUNE**; factual `PaletteSpecimen` and typed content
  **KEEP**; route-local CRUD/provenance/Admin state ownership **KEEP** as DELTA;
  missing API authority/data decisions **MOVE** back to V.A1–A3.
- **Disjointness:** presentation and client state only; API authority/storage
  defects return to V.A1–A3, and shell topology remains V.U1–U2.
- **Dependencies:** V.A3, V.U1–U2, and an exact immutable Glass 8 candidate
  pack for development; final release credit remains V.G1-only. V.U3 remains
  an independent sibling branch and is not a prerequisite.
- **Born RED:** the nine live-open U4 palette rows: `AdminListItem`,
  `AdminListSkeleton`, `PaginationBar`, `ActionFeedback`, `PaletteCardMeta`,
  `PaletteRenameInput`, `PaletteCardGrid`, `TagEditPopover`, and
  `UserSortMenu`; public/private/withdrawn/trashed; loading/empty/error/offline/
  auth; stale expanded rows; soft-delete counts; immediate registry deletes;
  Admin server authority; keyboard card/reorder/swatch actions.
- **Completion:** factual `PaletteSpecimen` rendering is distinct from
  selection/mutation; no aggregate Card interaction trap; revision/fork/
  provenance states reflect policy; Admin never renders false empty while
  unauthenticated/offline; Markdown content is typed and direct.
- **Cadence:** component tests each row; demo typecheck/lint each cluster;
  Browser state grid per route.
- **Artifacts:** component workflow matrix, route-state screenshots, CRUD
  journey receipts.
- **Commit plan:** `feat(palette-specimen)`, `feat(palette-library)`,
  `feat(palette-browser)`, `feat(admin)`, `refactor(about-content)`.
- **Terminal dispositions:** aggregate Card semantics **PRUNE after migration**;
  factual specimen **KEEP**; UI-owned authorization fiction **PRUNE**.

### V.H1 — Glass/shadcn/barrel/tooling subtraction

- **Goal:** remove every forwarding, copied-style, raw-source, compatibility,
  dead-tooling, phantom dependency, and false producer-readiness path after
  consumers have semantic homes.
- **File bounds:** `demo/ui/**`, style/config/tooling files, dependency
  manifests/lock, `scripts/dev/dev.sh`, dead scripts/tests; no feature behavior.
- **Mechanism:** use the typed import/export/package DAG to move each consumer
  directly to its semantic producer, delete forwarding/style/tooling residues,
  reclassify demo-only Glass, remove the phantom Keyframes edge, and replace
  JS-mtime readiness with a complete producer-artifact receipt.
- **Sub-gate:** the exact executable Glass census (119 ESM declarations/79
  files plus two CSS imports/one file), 19 barrels, 90 imports/48 consumers,
  shadcn/tooling searches, manifest/lock graph, packed tarball, and complete
  JS/d.ts/CSS/style/font readiness set must all reconcile with zero runtime
  Glass/Keyframes edge.
- **π/DELTA disposition:** forwarding barrels, copied styles, aliases,
  shadcn/dead tooling, and phantom Keyframes edges **PRUNE**; useful debounce
  **MOVE**; direct producer primitives **KEEP**; Glass runtime classification
  **MOVE to development**; JS-only readiness **SPLIT** into the complete
  artifact-set DELTA.
- **Disjointness:** subtract/move imports, manifests, and readiness evidence
  only; no feature redesign and no Glass or Keyframes producer edit.
- **Dependencies:** V.L6 and V.U3–U4.
- **Born RED:** 19 forwarding barrels; 90 imports/48 consumers; `components.json`;
  dead `cn`/clsx/tailwind merge; copied or raw producer CSS; direct source
  aliases; phantom `@mkbabb/keyframes.js` dependency; the current
  `scripts/dev/dev.sh:165-176` false-green that treats only
  `dist/glass-ui.js` mtime advancement as sibling readiness.
- **Exact package census:** product `src` imports Glass in 0 files and
  Keyframes in 0; published non-`gh-pages` `dist` imports Glass in 0 and
  Keyframes in 0. The raw Glass-reference search returns 82 paths but includes
  `DESIGN.md` and a comment-only `animations.css`; executable authority is 119
  ESM declarations across 79 demo files plus two CSS imports in one file.
  Keyframes has zero executable or raw consumer file outside manifest/lock.
- **Completion:** direct published Glass imports; no replacement forwarding
  directory; no shadcn compatibility name; Value package has no Keyframes
  dependency; Glass moves from runtime `dependencies` to `devDependencies`
  because it is demo-only; manifest and lock contain no Keyframes edge;
  retained direct Reka use is separately justified by semantics. The JS-mtime
  ready signal is **SPLIT** into a complete artifact-set receipt covering every
  exported JS, declaration, CSS manifest, copied style, and font target after
  the existing Glass producer row lands.
- **Cadence:** search/typecheck after each barrel family; lint after each
  cluster; full build/tests at boundary.
- **Artifacts:** before/after import census, dependency graph, producer artifact
  receipt keyed to
  `coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.md`.
- **Commit plan:** semantic import moves by feature, then
  `chore(v-h1): delete forwarding UI barrels stale shadcn tooling and phantom Keyframes edge`.
- **Terminal dispositions:** forwarding/copies/aliases **PRUNE**; independently useful
  debounce **MOVE**; producer primitives **KEEP via direct demo imports**;
  Glass runtime classification **MOVE to development**; Keyframes manifest/lock
  edge **PRUNE**; JS-only readiness **SPLIT**.

### V.G1 — Packed consumer and full Browser matrix

- **Goal:** prove the result through one immutable complete Glass artifact set,
  packed Value entries, clean installs, and real UI journeys.
- **File bounds:** external isomorphic tests, E2E/browser tests, evidence
  artifacts; production changes reopen their owning wave.
- **Mechanism:** pack immutable Value and producer artifacts, install them in
  clean external consumers, trace protected import tiers, and execute the full
  route/component Browser matrix against one authenticated environment and
  exact geometry/pixel tolerances.
- **Sub-gate:** published Glass completeness, Value/Keyframes pack identities,
  root/timing/engine graph tiers, every route/workflow and required state/
  viewport/a11y/motion frame, console cleanliness, H1/focus/scroll identity,
  and PI-DELTA bounds must pass together; any product defect reopens its owner.
- **π/DELTA disposition:** unauthenticated and snapshot-only π assertions
  **PRUNE** unless semantic; authenticated pack/environment/route-state π
  coordinates and ordinary external tests **KEEP**; measured semantic,
  geometry, pixel, and graph DELTA receipts **KEEP**.
- **Disjointness:** evidence only; any product defect reopens its owning V.L*,
  V.A*, V.U*, or V.H1 wave instead of being patched here.
- **Dependencies:** all implementation waves and **BLOCKED-ON the published
  immutable Glass 8 artifact**: exact tag/commit/tarball SHA plus a complete
  JS/declaration/CSS/style/font manifest and mutation-closure receipt. An
  immutable candidate pack may support development but cannot close V.G1. A
  `vite build --watch`, mutable full build, or JS-mtime receipt is
  inadmissible because the isolated `77540ffd` reproduction emitted JS and
  `dist/styles/index.css` while leaving `dist/component-styles.css`,
  `dist/index.d.ts`, and `dist/slider.d.ts` absent.
- **Born RED:** package-tier graph cells; every route and component workflow;
  desktop/mobile/short-landscape/keyboard/reduced-motion/forced-colors/RTL;
  loading/empty/error/offline/auth/Admin; sampled 0/120/420ms frames; complete
  Glass exported-artifact manifest; immutable Keyframes W3 pack hash. Current
  Keyframes source/dist agrees with the annotated-but-unsigned `v6.0.0` tag
  object `26190755ce1e57c54cb14ef0a454ae02ed2b3da0` at commit
  `5a9183a7afe24702081a7b87c8adc7286ddce9a0`, so no producer repair is booked;
  that baseline does not substitute for W3’s exact pack SHA.
- **Completion:** no console/page errors; H1/focus/scroll identity; truthful
  states; reduced motion reaches the specified final semantic state and
  immediate final seating where required; measured geometry and pixel DELTA
  satisfy the exact bounds and environment coordinate in
  `formation/PI-DELTA-MANIFEST-2026-07-29.json`; clean packed consumers resolve
  only public entries. PNG byte identity is not a gate. The Value tarball
  proves no Glass or Keyframes runtime edge.
- **Cadence:** route cluster E2E continuously; full typecheck/lint/unit/API/E2E
  and pack exactly once at the boundary.
- **Artifacts:** `formation/PI-DELTA-MANIFEST-2026-07-29.json`, immutable
  environment manifest, published Glass 8 tag/commit/tarball SHA and complete
  artifact receipt, Keyframes W3 tarball SHA, module traces, π/DELTA frames and
  browser receipt.
- **Commit plan:** `test(v-g1): prove packed package consumer and complete frontend workflow matrix`
- **Terminal dispositions:** snapshot-only assertions **PRUNE** unless they protect
  semantics; ordinary external tests **KEEP**.

### V.Q1 — First clean execution audit

- **Goal:** independently challenge the implemented candidate from a clean
  checkout without reusing wave claims as evidence.
- **File bounds:** `AUDIT-Q1.md` and external evidence; fixes return to their
  owning waves.
- **Mechanism:** reconstruct the source/export/route/state/DI/style/test/API/
  worker/asset/consumer census from a fresh checkout, independently replay the
  packed and Browser gates, and route every contradiction back to its owning
  wave rather than repairing within Q1.
- **Sub-gate:** the complete census, 88/264 corpus, protected package graph,
  full Browser matrix, clean coordinate, tarball identities, and π/DELTA
  receipts must reproduce with no unresolved blocker/major and a terminal verb
  for every minor.
- **π/DELTA disposition:** unsupported completion claims **PRUNE**; fresh π
  reconstruction and reproduced evidence **KEEP**; observed defects and
  contradictory DELTA **MOVE** to owning waves; only a reclosed clean gate set
  **KEEP** as the Q1 DELTA.
- **Disjointness:** no implementation repair in the audit unit itself; no Q2
  conclusions or artifacts may be reused.
- **Dependencies:** V.G1.
- **Born RED:** fresh census of source/exports/routes/states/DI/styles/tests/API/
  workers/assets/consumers, 88/264 corpus, packed graph, full Browser matrix.
- **Completion:** no unresolved blocker/major; every minor has a terminal
  disposition; clean and execution coordinates agree; all gates reproduce.
- **Cadence:** complete gate set once, with focused reruns only after a routed
  owning-wave fix.
- **Artifacts:** `AUDIT-Q1.md`, exact clean head, tarball hashes, Browser
  environment and π/DELTA receipt.
- **Commit plan:** fixes use owning-wave scopes; Q1 evidence uses
  `docs(v-q1): record the first clean Value execution audit`.
- **Terminal dispositions:** unsupported completion claims **PRUNE**; reproduced evidence
  **KEEP**; defects **MOVE** to owning waves.

### V.Q2 — Independent hostile clean audit

- **Goal:** falsify Q1 from a second fresh checkout without inheriting its
  conclusions.
- **File bounds:** `AUDIT-Q2.md` and external evidence; fixes return to their
  owning waves.
- **Mechanism:** use a genuinely later fresh checkout and independently chosen
  probes to rebuild the complete gate set, challenge Q1 conclusions, and
  compare only final authenticated semantic/π/DELTA coordinates within the
  declared tolerances.
- **Sub-gate:** new clean/install/browser identities, no reused Q1 caches,
  screenshots, outputs, or intermediate conclusions, explicit contradiction
  probes, and the full census/pack/Browser gates must close with no unresolved
  blocker/major and terminal minors.
- **π/DELTA disposition:** Q1-only intermediate artifacts **PRUNE from Q2
  evidence**; independently reconstructed π and reproduced evidence **KEEP**;
  contradictions **MOVE** to owning waves; agreement of two independently
  produced final DELTA receipts **KEEP** as the release-handoff gate.
- **Disjointness:** Q2 may read the canonical packet and product, but not reuse
  Q1’s intermediate conclusions, screenshots, caches, or generated outputs.
- **Dependencies:** a green V.Q1 and any reopened-wave fixes reclosed.
- **Born RED:** repeat the full census/gate set with new clean coordinates,
  independently selected route/state/consumer probes, and explicit Q1
  contradiction attempts.
- **Completion:** no unresolved blocker/major; every minor has a terminal
  disposition; two independently produced gate and Browser receipts agree
  within declared semantic/π/DELTA tolerances.
- **Cadence:** complete gate set once, with focused reruns only after a routed
  owning-wave fix.
- **Artifacts:** `AUDIT-Q2.md`, exact clean head, independent tarball hashes,
  Browser environment and π/DELTA receipt.
- **Commit plan:** fixes use owning-wave scopes; final evidence uses
  `docs(v-q2): bank two clean Value execution audits and release handoff`.
- **Terminal dispositions:** Q1-only artifacts **do not transfer**; independently
  reproduced evidence **KEEP**; contradictions **MOVE** to owning waves.

## 5. Archaeology receivers

The 111-root batch does not create 111 waves. Its unresolved receivers fold as:

- S016/S029/S035/H101 → V.U1–U4 and V.G1 Browser/gestalt proof;
- S032/S033/S046/S052/S059/S062 → V.L1–L6/V.H1 graph and direct-import proof;
- S047/S050/S055/S084/S086/S089/S092 → V.A1–A3 and V.U4 palette truth;
- S008–S014/S019–S026/S030/S094/S096 → parser-owned runtime plus V.L1/L4/L5
  consumer grammar;
- S057–S063/S076–S080/H109/H110 → V.G1/V.Q1/V.Q2 release, packed-consumer,
  and performance truth.

The finalized GenericActionBar D/L/C adjudications close its existing corpus
row. They do not add a 265th axis; they create the exact V.U2 source delta.

## 6. Research and audit admission

The three-pass minimum is:

1. route/action ownership — genuine Luna xhigh replacement plus hostile Sol
   agglomeration CLOSED: GenericActionBar/generic ref bridge DELETE, exact local
   survivors and removals above, no replacement registry;
2. CSS/path/transform surface — true Luna xhigh seat
   `019faf94-1134-7223-b9b3-c53249f206f5`; hostile Sol terminal **AMEND**
   preserves placement and narrow operation names, resolves the exact
   ownership/geometry/sampling/timing deltas, and leaves denominator-derived
   record shapes to execution gates;
3. API policy/membership — true Luna xhigh seat
   `019faf94-687f-7340-b689-d8e71b1288f3`; hostile Sol **REJECTED** its
   invented routes/statuses and policy conflicts as formation authority, then
   **FOLDED** valid default-deny, membership, byte-payload, cross-object,
   hop-redaction, and transaction-reauthorization evidence into V.A1–A3.

All three served-model passes are agglomerated. Pass 2 is AMEND, and Pass 3 is
REJECT/FOLD; neither Luna candidate is accepted verbatim.
V.Q1/V.Q2 cannot begin until all product waves and V.G1 are green.

The two clean formation audits are:

1. `audit/formation/FORMATION-CLEAN-AUDIT-1-2026-07-29.md` — authority, source
   census, graph, and XR-18–20 dependency re-derivation;
2. `audit/formation/FORMATION-CLEAN-AUDIT-2-2026-07-29.md` — independent
   contradiction, topology, policy/storage, surface, and artifact audit.

They admit this formation packet only. They are not the future implemented
product audits V.Q1/V.Q2.

## 7. Formation verdict

The tranche is **FORMATION ADMITTED FOR ORDERED EXECUTION, with zero execution
credit**:

- placement and the narrow grounded operation-name set are frozen; record
  shapes and still-unnamed families remain owned by their born-RED
  denominator/graph cells;
- API product policy is frozen and has no owner-reserved question;
- the storage implementation keeps `LOCAL-SNAPSHOT` as default and is
  **BLOCKED-ON corrected Fourier F-L1 R2**; no complex candidate is selected;
- P1 is terminal DELETE/PRUNE, P2 is terminal AMEND, and P3 is terminal
  REJECT/FOLD;
- V.L1/V.L5 may dogfood one exact immutable unpublished parse-that candidate,
  but close only after the named non-CSS receipt, released coordinate, and
  Value rebind/retest;
- V.L6 closes only on Keyframes W2 deletion and W3 exact pack/tier receipts;
  the constellation edge remains open through the W10 Atlas crater;
- V.G1 is blocked on the published immutable Glass 8 tag/commit/tarball and
  complete JS/declaration/CSS/style/font receipt;
- both clean formation audits are green;
- product source, releases, consumer edits, V.G1, and execution audits V.Q1/Q2
  remain unclaimed.
