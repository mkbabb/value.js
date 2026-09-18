<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/NON-PARSER-LIBRARY-API-DAG-CLOSURE-2026-07-30.md
  original-mtime: 2026-07-30T14:40:02
  original-sha256: d51e0d3056ec4b3bdebc1bad2119d453de291189dadfce8e9dd2e2bcc5ae8eff
  original-bytes: 20243
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value non-parser library, API, and typed-DAG specification closure

Date: 2026-07-30
Status: FORMATION SPECIFICATION COMPLETE; EXECUTION AND RELEASE CLOSED
Scope: parser-independent ownership, public surfaces, consumer/deletion
contracts, palette API policy/storage receivers, and typed graph laws

## 1. Truth boundary

This packet closes eight library offering specifications, nine API policy
operation classes, and the parser-independent graph/package/test contract.
It implements none of them.

```text
library offerings specified                  8 / 8 = 100%
API policy operation classes specified       9 / 9 = 100%
typed DAG planes specified                  13 / 13 = 100%
current public entries built diagnostically  7 / 7 = 100% of the old surface
future /path entry executed                   0 / 1 = 0%
product/API/package/release credit                         0
```

The temporary build and API test run described below are baseline diagnostics,
not satisfaction of a born-RED or future-wave gate.

## 2. Complete public offering matrix

All retained surfaces are literal package subpaths. No broad root, forwarding
barrel, raw-source alias, compatibility path, or copied implementation exists
in the target.

| Offering | Sole semantic job and allowed positive edges | Required refusals / inverse | Consumer evidence required | Terminal disposition / execution gate |
|---|---|---|---|---|
| `/css` | Value-owned lossless CSS grammar, exact recovery, value/timing/selector/declaration/stylesheet inverses, CSS transform-list and motion-path semantics; may consume `/value`, `/color`, `/easing` types, and released parse-that runtime | `Result` for invalid source; immutable UTF-16 diagnostics; parser-provenanced opaque unknowns only; canonical spelling; declaration semicolon and stylesheet indentation ownership explicit; no throw or raw constructor | Value demo authored inputs; Keyframes exact 53/51 receiver; packed external tests | **KEEP/SPLIT** by grammar/inverse/motion responsibility; execution BLOCKED on paused parser selection/release/rebind |
| `/path` | SVG `d` grammar/inverse plus typed-only `PathGeometry`; may consume released parse-that runtime and numeric math | invalid source `Result`; inverse refusal explicit; typed geometry total; empty=origin/0, move-only=move point, multi-subpath moves add no phantom segment; no string constructor | Keyframes heavy morph engine and direct Value path consumers; packed entry and graph tests | **MOVE/SPLIT** current scanner/geometry from `/transform`, then **PRUNE** scanner and dual paths; execution BLOCKED on paused parser |
| `/transform` | zero-parsing numeric matrix/decompose/recompose/interpolate/slerp leaf | no strings, CSS, path parsing, color, parse-that, or `invertCssMatrix*`; typed `PathGeometry` cannot be constructed from a string | direct numeric consumers and Keyframes heavy engine only | **KEEP** numeric leaf; package reachability born-RED proves a light import stays light |
| `/color` | immutable color models, anchors, conversion, gamut, measured chroma | failure-explicit for invalid external values; no CSS parser duplication or UI paint ownership | Value UI, Glass exact packed consumer, other measured consumers | **KEEP** only evidence-backed exports; **FOLD** duplicate color helpers |
| `/value` | immutable typed CSS value representation shared by `/css` and semantic consumers | no parsing side effect, raw unvalidated string, or serializer fork | `/css` plus direct semantic consumers proved by import census | **KEEP** minimal value atoms; **PRUNE** convenience exports without a second real consumer |
| `/easing` | CSS-free named timing functions and typed evaluation | authored CSS timing is not accepted here; no CSS/path/transform/parse-that reach | Value timing UI and Keyframes `resolveEasing()` timing tier | **KEEP** pure leaf; authored grammar stays `/css` |
| `/math` | smallest pure scalar/vector/matrix helpers | no color/CSS/path/package side effects | Value internals and separately proved light Keyframes eager tier only | **KEEP** evidence-backed atoms; split only on distinct responsibility |
| `/quantize` | deterministic palette quantization and worker-safe typed messages | explicit invalid/cancelled/result outcomes; no hidden DOM or service worker | Extract worker plus external packed test | **KEEP** one worker protocol; **PRUNE** unused worker/assets and fallback implementation |

### 2.1 Full denominator retained

```text
Webref raw                                        1,717
Webref active                                     1,653
property/function/type raw                        1,503
property/function/type active                     1,439
at-rule/selector active                             214
explicit alias PRUNEs                                64
manual rows                                         109
CSS Values 5 overlay                                 60
Keyframes references/files                        53/51
  import declarations/files                      49/47
  import.meta.resolve literals                       2
  bench HTML import-map keys                         2
```

No parser pause narrows these numbers. Standard color spaces include `ictcp`,
`jzazbz`, and `jzczhz`; the only extensions are `hsv` and `kelvin`.

### 2.2 Serializer ownership

- parsed shorthand inverse preserves the grammar's authored meaning;
- semantic animation projection emits ordered longhand declarations;
- explicit `composition: replace` emits when the semantic projection owns it;
- `serializeDeclaration` returns `property: value` without a semicolon;
- a declaration-list or stylesheet-item serializer owns separators,
  semicolons, line endings, and indentation;
- opaque unknown preservation is available only on a node carrying immutable
  parser provenance; no public constructor accepts raw bytes;
- every serializer returns a value or an explicit refusal `Result`; it does not
  throw, return an empty string, silently omit an unsupported node, or preserve
  an unproven raw fragment;
- Value validates explicit CSS `linear()` stops; Keyframes owns callable
  sampling, error tolerance, `maxStops`, thrown/nonfinite receipts, and curve
  sampling policy.

These signatures remain formation contracts until the parser boundary and
public-surface born-RED cells pass. This file does not freeze TypeScript names
that depend on that execution evidence.

## 3. Consumer and deletion matrix

| Consumer tier | Allowed positive reach | Required negative reach | Closing evidence |
|---|---|---|---|
| Value demo | smallest semantic Value subpath; Glass only through published entries/styles | Value source aliases, raw parse-that, copied Glass CSS, Keyframes package | exact import census, packed tarball, route/component tests |
| Keyframes eager `.` | separately proved `/math` only | `/css`, `/path`, `/transform`, parse-that, color, heavy engine | native-ESM root pack graph |
| Keyframes named `resolveEasing()` | `/easing` | authored `/css`, `/path`, `/transform`, parse-that, heavy engine | timing-only import graph |
| Keyframes explicit engine | `/css`, `/path`, `/transform` only when causally loaded | eager contamination and local replacement parser/serializer/scanner | W2 exact deletion plus W3 immutable pack/tier receipts |
| Glass | exact packed `/color`, `/css`, `/easing` use only where producer evidence exists | Value root/source alias/fallback parser | published immutable Glass receipt |
| Atlas | explicit Keyframes engine and downstream Value capability | eager root contamination | W10 consumer crater |
| other first-party/external | smallest public subpath | package root, source, internal file, copied behavior | external isomorphic packed test |

Deletion closes in the same execution wave as the replacement:

```text
Value CSS splitters/scanners/dual paths                 FOLD then PRUNE
Keyframes CSS AST/value/timing/selector/animation emit  MOVE/FOLD then PRUNE
Keyframes SVG path scanner                              MOVE/FOLD then PRUNE
Value -> Keyframes manifest/lock edge                   PRUNE
Glass runtime dependency classification                 MOVE to devDependency
forwarding barrels / copied CSS / shadcn / cn tooling   PRUNE
raw-source aliases / compatibility exports              PRUNE
```

There is no Value→Keyframes runtime package edge. The forward consumer
relationship is Keyframes→specific Value capabilities after W2/W3.

## 4. Package, tool, and external-test specification

The retained package surface is generated from literal `package.json#exports`
and must contain eight entries after `/path` forms. TypeScript, Vite, tests,
and packing consume the same generated map.

Born-RED package cells:

1. import every entry from an installed tarball in native ESM;
2. compile an external TypeScript consumer against declarations only;
3. compare runtime and declaration entry sets byte-for-byte;
4. reject missing `/css` or `/value` mappings and phantom root, `/parsing`, or
   `/units` mappings;
5. prove `/transform` imports no parse-that, CSS, color, or path module;
6. prove `/easing` imports no authored CSS/parser/path/transform module;
7. prove Value's published tarball contains neither Glass nor Keyframes as a
   runtime edge;
8. prove no product/test specifier reaches `src`, sibling raw source,
   `dist/styles`, or a compatibility alias;
9. prove copied CSS/shadcn/barrels/tooling have zero packed survivors; and
10. record exact file, declaration, CSS, font, mode, and package hashes.

The current `scripts/dev/dev.sh` JS-mtime signal is insufficient. Development
readiness requires the complete declared Glass artifact set; final closure
requires a published immutable Glass 8 pack, not `build:watch` freshness.

## 5. Palette/API receiver specification

### 5.1 Nine policy operation classes

| Class | Canonical identity | Required authority and result contract |
|---|---|---|
| detail | `GET /api/palettes/{slug}` | resolve slug→immutable `paletteId`; centralized object policy; hidden target `404`; owner-visible trashed lifecycle `410` only after authorization |
| fork create | `POST /api/palettes/{slug}/forks` | authenticated; source readable/forkable before work and again in transaction; required process-local `Idempotency-Key`; private child; 201 |
| fork list | `GET /api/palettes/{slug}/forks` | source policy, then every child independently filtered; no stored public `forkCount` authority |
| provenance | `GET /api/palettes/{slug}/provenance` | target policy first; independently hidden hops redacted without hiding a still-readable child |
| revision list | `GET /api/palettes/{slug}/revisions` | object policy plus per-release authorization for every item; 200 |
| revision detail | `GET /api/palettes/{slug}/revisions/{revisionNo}` | `(paletteId,revisionNo)` local membership plus per-release policy; 200 |
| revision diff | `GET /api/palettes/{slug}/revisions/{fromRevisionNo}/diff/{toRevisionNo}` | both local memberships and both release policies; 200 |
| revision revert | `POST /api/palettes/{slug}/revisions/{revisionNo}/revert` | owner, active target, local membership, strong `If-Match`, process-local idempotency; append revision; 201 |
| Admin policy | explicit operation-specific Admin routes | audited policy branch; never object ownership impersonation or repository bypass |

The policy dimensions remain:

```text
visibility   private | public
lifecycle    active | trashed
moderation   clear | withdrawn
caller       anonymous | owner | authenticated non-owner | administrator
release      visible immutable release | independently hidden release
```

`unlisted`, `/versions`, hash-keyed public reads, a `200` revert arm, global
membership lookup, and route-local Admin bypass are terminal **PRUNE**.

### 5.2 Identity, membership, CAS, and replay

- `paletteId` is immutable identity; slug is a locator and has its own
  generation clock.
- workspace, handle, and policy clocks are separate.
- revision membership key is `(paletteId, revisionNo)`; `releaseHash`
  identifies the release event, not just bytes.
- one child palette has exactly one source edge.
- same-object/same-content successors and two objects with identical content
  retain distinct memberships, authors, ancestry, and release hashes.
- payload lookup occurs only after object, membership, and release policy.
- conditional database writes carry their predicate into the write and prove
  `matchedCount === 1`; read-then-write comparison is not CAS.
- missing `If-Match` is 428; mismatch is 412.
- same idempotency key plus same request digest replays byte-equivalent status,
  headers, and body; same key plus different digest refuses without mutation.
- digest collisions compare complete canonical payload bytes before sharing or
  refusing storage.

### 5.3 Canonical `payloadHash` receiver

The receiver is specification-complete while the algorithm remains
source-freeze RED.

`payloadHash` is:

```text
lowerhex(
  SHA-256(
    ASCII("value.js/palette-revision-payload/v1")
    || 0x00
    || uint64be(byteLength(canonicalPayloadBytes))
    || canonicalPayloadBytes
  )
)
```

`canonicalPayloadBytes` must be one source-frozen, closed, versioned canonical
encoding of every revision-semantic field:

- normalized palette display name;
- ordered color atoms, including every color display name;
- exact canonical color model/components/alpha and stable position/order;
- complete canonical tag projections required by the revision/release
  contract; and
- any later field explicitly classified as revision content.

It excludes `paletteId`, slug, author, timestamps, ancestry, visibility,
moderation, membership number, policy/handle/workspace clocks, and storage
location. Those belong to the release envelope and make `releaseHash`
event-specific.

The execution wave must freeze:

1. exact schema/atom union and unknown-field refusal;
2. Unicode normalization and scalar/byte limits;
3. numeric domains and canonical spelling;
4. ordered versus set semantics for colors and tags;
5. domain separator, length prefix, and digest;
6. cross-engine test vectors; and
7. collision byte-equality behavior.

Born-RED vectors change exactly one display name, color name, channel, alpha,
position/order, tag projection, and excluded membership/policy field. Every
included-field mutation changes canonical bytes; excluded-field mutations do
not. Current API `computeContentHash` is diagnostic legacy identity: it ignores
color display names and cannot satisfy this receiver. Existing export
`contentDigest` is useful canonical-byte evidence but is not silently promoted
to revision `payloadHash`, because its closed field set is narrower.

### 5.4 Storage policy

| Stable semantic ID | Formation disposition |
|---|---|
| `CURRENT-GLOBAL-MEMBERSHIP` | **PRUNE** |
| `LOCAL-SNAPSHOT` | **KEEP** as correctness baseline and default |
| `GLOBAL-BLOB-SPLIT` | unselected; BLOCKED on corrected/admitted Fourier evidence and source-frozen `payloadHash` |
| `PERSISTENT-TRIE` | unselected; same blocker |
| `BOUNDED-DELTA` | unselected; same blocker |
| `OBJECT-LOCAL-BLOB` | bounded non-F-L1 backend fallback only; not a compatibility path |

The selected implementation will have one read path and one write path. No
complex candidate receives credit from the current Fourier corpus.

## 6. Typed DAG closure

### 6.1 Thirteen planes

| Plane | Positive owner edge | Required negative edge |
|---|---|---|
| source | semantic module→direct dependencies | no raw sibling/source alias |
| tests | public surface→external isomorphic tests | no helper reimplementation |
| components | parent→distinct physical child workflow | no generic row substituting for a child |
| styles | Glass mechanics + Value subject layout/chroma | no copied producer CSS or dead feature style |
| routes | route→typed scene→H1/focus/scroll/actions | no stub/out-of-band command graph |
| state | one typed state owner→consumers | no mobile/desktop fork or UI authorization fiction |
| DI | typed provider→proved consumer | no default-null masking or debug provider |
| API routes | wire operation→policy→service | no repository bypass |
| API state/repository | immutable identity/membership→payload after authorization | no global hash membership |
| workers | measured job→typed message protocol | no filename-only promotion/service-worker fork |
| assets | exact producer/input/hash→consumer | no unresolved/deep alias or stale generated file |
| package exports | literal subpath→runtime+d.ts | no broad root/compatibility/barrel |
| consumers | smallest public entry→measured consumer | no reverse Value→Keyframes edge |

### 6.2 Canonical positive order

```text
parser law/release/rebind
  -> V.L1 /css grammar
  -> V.L2 inverses
  -> V.L5 /path + numeric /transform split
  -> V.L4 CSS transform/motion

V.L2 -> V.L3 explicit sampled linear()
V.L3 + V.L4 -> V.L6 Keyframes adoption/deletion/pack

V.A1 policy -> V.A2 membership/payload/storage -> V.A3 routes/services
V.U1 scenes -> V.U2 shell -> V.U3 local tools -> V.U4 palette/Admin
library + API + UI -> V.H1 deletion/package -> V.G1 -> V.Q1 -> V.Q2
```

Direct V.L5→V.L6 is forbidden. Candidate parse-that and Glass coordinates may
support bounded development only; final edges bind published immutable
artifacts.

### 6.3 Goldilocks, filenames, and tests

- colocate a leaf with its sole semantic owner;
- promote only after two real consumers share the same semantics;
- split on responsibility/branch complexity, never an arbitrary line count;
- do not repeat the parent concept in a child filename unless ambiguity exists
  outside the parent;
- forwarding-only files and re-export-only folders are not module boundaries;
- every public export needs semantic authority and a measured consumer;
- pure tests mirror module ownership; cross-module tests live at the nearest
  real integration boundary; external package tests import only packed public
  entries; and
- every concept terminates in `KEEP | FOLD | MOVE | SPLIT | PRUNE`; `BUILD` is
  an owning-wave action, not a disposition.

## 7. Reversible diagnostic evidence

### 7.1 Library build

An exact `git archive` copy of `e01d0065…` in
`/tmp/value-np.7Wea3r` borrowed dependency bytes into the disposable root and
ran `npm run build`. Vite 8.0.16 built the seven current entries and generated
declarations successfully. This confirms only that the historical seven-entry
surface builds at that copied coordinate. It does not form `/path`, prove
future graph weights, or satisfy V.H1/V.G1.

### 7.2 API baseline

The same disposable copy borrowed `api/node_modules` and ran:

```text
npm test -- --run
  src/modules/palette/__tests__/palette-versions.test.ts
  src/modules/palette/__tests__/palettes-forks.test.ts
  src/modules/palette/__tests__/palettes-ownership.test.ts
  src/modules/palette/__tests__/palettes-publish.test.ts
  test/conformance/idempotency.test.ts
```

Result: 5/5 files and 36/36 existing tests passed in 2.68 s against the
suite-owned ephemeral Mongo memory replica set. This is current-baseline
evidence only. The existing tests do not prove the future private/public ×
owner/non-owner × lifecycle/moderation/release matrix, per-object membership,
cross-object refusal, canonical numeric routes, canonical `payloadHash`, or
storage selection.

Docker was inspected read-only before the run. Existing containers and volumes
were not used, started, stopped, mutated, or queried for secrets. No new Docker
object was necessary.

## 8. Completion and remaining blockers

The parser-independent library/API/DAG specifications are complete. Execution
remains blocked as follows:

- `/css` and `/path`: paused parser law, candidate, release, and exact rebind;
- Keyframes consumer close: W2 deletion, W3 immutable pack/tier, and W10;
- API storage: admitted Fourier evidence and source-frozen `payloadHash`;
- final package/UI: published immutable Glass 8 and complete artifact receipt;
- all product waves: born-RED, implementation, packed/API/Browser evidence;
- final close: V.G1, genuinely later V.Q1/V.Q2, and root constellation union.

Product, API, database, package, consumer, Browser, release, and
constellation-close credit remain zero.
