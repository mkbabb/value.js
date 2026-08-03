<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md
  original-mtime: 2026-07-30T20:12:10
  original-sha256: 244c448a90059002be1194e6a512191c96881a9413ceb021f3b8fe7b62b504a7
  original-bytes: 30242
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value parser-law convergence matrix — 2026-07-30

Date: 2026-07-30
Status: FORMATION-ONLY; VALUE EXECUTION CLOSED
Scope: Value-facing reconciliation of the constellation parser
performance-law amendment

## 1. Bound authority and truth rule

This matrix binds the live-root, read-only amendment:

```text
1317ab01af574bc0d310fdef3435b7239c255b9f18e4ea3f658d432aa1595a61  CONSTELLATION-CONVERGENCE-LOOP-AND-PERFORMANCE-LAW-AMENDMENT-2026-07-30.md
920a618a8eef005e218db76ee1055d51e1d01f2f26ddd16c65194313c0bfce57  input loop
```

The parser owner has now banked the corresponding round-zero portfolio:

```text
ef20a98                                                          parse-that commit
codex/css-totality-combinators-20260729                           parse-that branch
f58442ede34e190d7260385001abd2e958c1aaea39bc20a4ed1939939a8bf9c2  PERFORMANCE-LAW-AMENDMENT-PORTFOLIO-2026-07-30.md
```

That authority preserves the same historical-law boundary and opens
`PL-3X`, `PL-2X`, and `PL-BE` as formation-only families. It binds this Value
matrix and the Value status document only as V.L1/V.L5 dependency inputs. The
direction is not reversible: parser round zero, dispatch, or later research
cannot satisfy a Value wave, select a runtime, or grant Value credit.

The amendment reopens parser performance-law research in a strict `2x`,
strict `3x`, and measured break-even portfolio. It does not:

- rewrite P1–P6, P6-A3, or post-P6 evidence produced under the historical
  `10x` law;
- select a parser runtime or public API;
- reopen Value formation admission;
- authorize Value, parser, CSS, API, package, consumer, release, or Browser
  execution; or
- grant product, visual, release, migration, or constellation-close credit.

The admitted eighteen-wave Value packet remains the local formation authority.
This matrix is a supplemental cross-repository gate, not a nineteenth product
wave and not a competing packet.

## 2. Exact law arithmetic

Let:

```text
T_M2       = 1,870,633 us
T_native   =   311,883 us
B(k)       = T_M2 / k
H(k)       = B(k) - T_native
```

Then:

| law | exact complete-work budget | exact headroom after native matching and required products | present disposition |
|---|---:|---:|---|
| historical `10x` | `187,063.3 us` | `-124,819.7 us` | KEEP as immutable old-law negative evidence |
| strict `3x` | `623,544.333… us` | `311,661.333… us` | OPEN research family |
| strict `2x` | `935,316.5 us` | `623,433.5 us` | OPEN research family |
| measured break-even | workload-derived | workload-derived | OPEN research family |

The rounded figures in the amendment are receipts, not replacements for these
exact divisions. P6-A3's seven correctness-admissible ratios,
`0.9207681564329404x–1.0389571550178254x`, remain terminal KILL/PRUNE evidence
under the historical `10x` law only. They neither pass `2x` nor `3x` and do
not select the measured break-even family.

### 2.1 Complete-product timing variables

For workload family `w`, binding scale `s`, candidate `c`, and bootstrap
sample `i`, the measured candidate cost is:

```text
T_complete(c,w,s,i)
  = T_match
  + T_runtime
  + T_immutable_product
  + T_allocation_and_GC
  + T_rollback_recovery_diagnostics
  + T_public_projection
```

The control uses the same fixture bytes, fixture order distribution, host,
process isolation, warmup truth, immutable products, diagnostics, and public
projection. The strict law gate is:

```text
CI95_low(T_complete(M2,w,s) / T_complete(c,w,s)) >= k
```

for `k = 2` or `k = 3` at every binding scale and on each required plane:
live JSON, lossless nested records, and representative Value CSS. An aggregate
ratio cannot hide a failing plane. Any unequal product, missing EOF case,
fixed-order bias, false warmup, typed-fault drift, offset drift, recovery
drift, or diagnostic drift makes that row inadmissible rather than slow.

### 2.2 Break-even variables

For a declared horizon `H`, the break-even family must publish:

```text
N_json(H)       live JSON invocation count and size distribution
N_nested(H)     nested-record invocation count and size distribution
N_css(H)        Value CSS invocation count and size distribution
N_boot(H)       cold process/package bootstrap count
N_install(H)    install/load/evaluation count by protected package tier

C_run           complete-product runtime from section 2.1
C_boot          cold build/import/bootstrap cost
C_pack          measured install, parse, and evaluation cost of package bytes
C_migrate       one-time Value and Keyframes migration/rebind cost
C_audit         one-time proof, clean-audit, and release-rebind cost
```

All time terms must be measured in the same unit. Package bytes enter the
equation only through measured install/parse/evaluation time; raw bytes and
source lines are reported separately and are not assigned invented time value.

```text
C_current(H)
  = Σ N_w(H) * C_run(current,w)
  + N_boot(H) * C_boot(current)
  + N_install(H) * C_pack(current)

C_candidate(H)
  = Σ N_w(H) * C_run(candidate,w)
  + N_boot(H) * C_boot(candidate)
  + N_install(H) * C_pack(candidate)
  + C_migrate
  + C_audit

BreakEvenDelta(H) = C_current(H) - C_candidate(H)
```

The family passes only when the independently bootstrapped
`CI95_low(BreakEvenDelta(H)) > 0` for every declared binding horizon, all
correctness products are equal, protected package tiers remain within their
graph budgets, and the deletion contract below is complete. Workload
frequency, horizon, hardware/runtime coordinate, sample arrays, confidence
method, and uncertainty stay explicit. A maintenance or aesthetic claim
cannot be converted into runtime credit without its own measured conversion.

### 2.3 Product and deletion variables

The selected-law packet must carry these non-substitutable ledgers:

| variable | exact Value-facing content | acceptance rule |
|---|---|---|
| `P_css` | 1,717 raw Webref rows; 1,653 active rows | no denominator narrowing |
| `P_pft` | 1,503 raw and 1,439 active property/function/type rows | no alias laundering |
| `P_values5` | 60 CSS Values 5 overlay rows | complete, independently addressed |
| `P_manual` | 109 manual rows | no replacement by Webref count |
| `P_kf` | 53 references/51 files = 49 imports/47 files + 2 `import.meta.resolve` + 2 bench HTML import-map keys | every literal classified |
| `P_result` | failure-explicit Result, exact UTF-16 offsets/spans, immutable diagnostics, transactional recovery, public offset/frontier equality | byte/field-equal products |
| `P_opaque` | parser-provenanced non-forgeable opaque unknowns | no public raw constructor |
| `P_inverse` | canonical value/timing/selector/declaration/stylesheet inverses and explicit refusal | no throw, passthrough, or empty substitution |
| `D_value` | current Value CSS splitters/scanners and duplicate grammar paths | exact function/export/file ledger; FOLD then PRUNE |
| `D_keyframes` | local CSS AST/value/timing/selector/animation emitters and SVG path scanner transferred by W2 | exact W2 deletions; callable sampling remains |
| `D_manifest` | phantom Value→Keyframes manifest/lock edge | PRUNE in V.H1 |
| `D_compat` | raw-source aliases, compatibility exports, copied CSS, forwarding barrels, wrapper/parser dual paths | zero survivor under packed search |

Deletion value is credited only from exact before/after files, functions,
exports, source bytes, packed bytes, consumers, and reachability. Planned
deletion, duplicated prose, or a moved fork still reachable under a different
name earns zero.

## 3. Three-pass evidence contract

The strict `3x`, strict `2x`, and measured break-even families remain
incompatible and live through Pass 1 and Pass 2. No researcher is told to
make one the winner.

| pass | Sol research/synthesis | Luna bounded prototype/measurement | Sol critique/agglomeration | terminal output |
|---|---|---|---|---|
| 1 | derive orthogonal law predictions, equal-product gates, and fatal assays | execute sealed greenfield plans outside product roots | challenge genealogy, products, arithmetic, selection bias, and durability | immutable three-family registry and gap ledger |
| 2 | bind Pass-1 registry/hash and design only genuinely distinct deltas | execute all surviving families on fresh isolated coordinates | retire circular or unequal-product routes; preserve all negatives | immutable successor registry and gap ledger |
| 3 | bind Pass-2 registry/hash and synthesize the surviving selection/no-selection case | execute the bounded selected-law or explicit no-runtime assay | adjudicate the whole Value-facing cost/product/deletion contract | immutable final law packet |

Every pass covers research → synthesis → prototype → critique →
agglomeration. Prototype bytes remain outside product roots and carry typed
false for execution, product, API, visual, release, migration, and admission
credit.

After Pass 3, two genuinely later non-author audits must independently
reproduce the same immutable packet. Clean A and Clean B:

- rehash every evidence reference in every state;
- replay exact inputs, outputs, modes, chronology, protected-root identity,
  residue, and hostile controls;
- reproduce law arithmetic and raw sample arrays;
- prove the complete Value denominator and no language/product narrowing;
- prove every wave and cross-repository binding below;
- reject secondary-receipt replay and prose-only credit; and
- remain distinct from future product execution audits V.Q1 and V.Q2.

No threshold becomes binding before both audits are clean and owner/root
intake binds their exact bytes.

## 4. Reconciliation with all eighteen Value waves

No existing wave identity, file bound, disjointness rule, or dependency order
changes. `PLAW-BIND` is a cross-cutting external prerequisite, not an
execution wave:

```text
three law passes
  -> law Clean A
  -> genuinely later law Clean B
  -> selected law + admitted generic runtime, or audited no-runtime decision
  -> exact parser candidate/release contract
  -> Value released-coordinate rebind
```

| wave | amended parser-boundary disposition |
|---|---|
| V.F0 | KEEP admitted evidence freeze; bind this amendment as later supplemental authority without repaying P1/P2/P3 |
| V.L1 | BLOCKED on `PLAW-BIND`, an admitted parser family, the existing candidate/non-CSS/release gates, and exact released-coordinate rebind; no source work starts |
| V.L2 | unchanged; transitively blocked on V.L1 and retains canonical inverse/refusal/opaque contracts |
| V.L3 | unchanged; depends on V.L2 and keeps explicit CSS-stop validation while Keyframes owns callable sampling |
| V.L5 | BLOCKED on the same parser-law/release/rebind boundary as V.L1; `/path` and numeric-only `/transform` placement stays frozen |
| V.L4 | unchanged `V.L1 → V.L2 → V.L5 → V.L4`; full Webref/WPT transform/motion denominator remains |
| V.L6 | unchanged: only V.L3 and V.L4 feed adoption; direct V.L5→V.L6 remains forbidden; W2 deletion, W3 immutable pack/tier proof, and W10 Atlas receiver remain |
| V.A1 | policy matrix unchanged; no parser dependency is invented |
| V.A2 | remains BLOCKED on corrected Fourier admission, canonical post-retirement `payloadHash`, and storage selection; parser-law research grants no storage credit |
| V.A3 | unchanged and blocked transitively on V.A2; no route/API rebind occurs |
| V.U1 | route/scene contract unchanged; global execution authorization remains closed; Glass candidate remains development-only |
| V.U2 | command/deletion contract unchanged; `ParseEchoReadout` and `ColorInput` cannot claim V.L1 behavior before the released rebind |
| V.U3 | component/workbench bounds unchanged; V.L1–V.L5 consumers remain blocked and no Browser workflow executes |
| V.U4 | palette/Admin/content bounds and V.A3 dependency unchanged; no UI authorization fiction or API bypass |
| V.H1 | unchanged after V.L6 and V.U3–U4; all parser/serializer/scanner/alias/dependency deletions need exact before/after reachability |
| V.G1 | unchanged evidence-only boundary; still requires all waves, published immutable Glass 8, Keyframes W3, packed Value, and full Browser matrix |
| V.Q1 | unchanged future clean product execution audit; it cannot substitute for law Clean A |
| V.Q2 | unchanged genuinely later hostile product execution audit; it cannot substitute for law Clean B |

The canonical library order remains:

```text
V.L1 -> V.L2 -> V.L5 -> V.L4
           \-> V.L3
V.L3 + V.L4 -> V.L6
```

## 5. Component, Browser, API, and typed-DAG reconciliation

### 5.1 Components and Browser

The physical corpus remains 88 SFCs and 264 D/L/C axes. Current formation
evidence remains 72/88 component rows and 218/264 axes banked, with 16
incomplete rows and 46 open axes. The amendment banks no component axis and
does not change a receiver.

Every future component workflow still owns desktop, 390×844, short landscape,
keyboard, reduced motion, forced colors, RTL, loading, empty, error, offline,
auth/Admin, and sampled animation-frame evidence. Route job, protagonist,
hierarchy, cards, spacing, dividers, controls, paint-versus-interaction
ownership, removable decoration, and measured-chroma signature remain judged
under Golden Glass, Breath of Life, and Movement of Momentum.

No in-app Browser run is admissible in this formation-only amendment. The two
law audits check that the Browser obligations and receiver map remain complete;
they do not grant visual or product credit and do not replace V.G1/V.Q1/V.Q2.

### 5.2 API and provenance

V.A1–V.A3 retain their centralized default-deny policy, immutable
`paletteId`, numeric revision route, per-object membership, release/payload
identity split, transaction-time reauthorization, CAS/idempotency, and
provenance-redaction contracts. `LOCAL-SNAPSHOT` remains the correctness
default. `GLOBAL-BLOB-SPLIT`, `PERSISTENT-TRIE`, and `BOUNDED-DELTA` remain
unselected.

The current live Value hash is legacy/diagnostic because it ignores color
display names. No palette workload receives storage-selection credit until
the intended post-retirement canonical `payloadHash` algorithm is
source-frozen and Fourier selection evidence uses that identity. Parser-law
research neither repairs nor bypasses this blocker.

### 5.3 Typed DAG

The existing source/test/component/style/route/state/DI/API/worker/asset/
package-export/consumer DAG remains authoritative. The amended parser edge is:

```text
selected law packet
  -> admitted generic parse-that runtime
  -> exact candidate/release
  -> Value /css and /path rebind
  -> packed Value public entries
  -> Keyframes W2/W3 adoption evidence
```

Forbidden edges remain:

```text
/transform -> parse-that | /css | /color | /path
Value package -> Keyframes package
Keyframes eager root or /easing -> /css | /path | /transform | parse-that
Value tests/consumers -> raw parse-that or Value source alias
```

Every retained export still requires semantic authority plus measured consumer
evidence. Goldilocks grain, module-child filename de-duplication, external
isomorphic tests, and terminal `KEEP | FOLD | MOVE | SPLIT | PRUNE`
dispositions remain unchanged.

## 6. Cross-repository bindings

| owner | exact binding still required | Value effect |
|---|---|---|
| parse-that | three-pass law packet, two clean audits, selected law or audited no-runtime decision, admitted runtime, immutable release, ABI/package proof | blocks V.L1/V.L5 and released-coordinate rebind |
| Value | complete CSS products and denominators, 18-wave packet, two Value-facing law audits, later product V.G1/Q1/Q2 evidence | owns sole CSS grammar/consumer/UI and no generic runtime fork |
| Keyframes | 53/51 classification, W2 adoption/deletion, W3 immutable pack/tier receipt, 13-wave law reconciliation, W10 Atlas remainder | blocks V.L6 and consumer close |
| Fourier | admitted typed graph/provenance, source-frozen canonical `payloadHash`, selected storage policy, N.P1–N.P3 plus two clean audits | blocks V.A2; `LOCAL-SNAPSHOT` remains default |
| Glass | candidate pack for development only; published immutable Glass 8 with complete JS/declaration/CSS/style/font receipt for final proof | blocks V.G1 |
| Atlas | Q formation boundary remains zero-credit; later R-owned execution input and W10 consumer crater remain | no Value formation reopen; prevents constellation close |
| root | immutable cross-repo DAG, all-state evidence rehash, exact positive/nonpositive edges, two clean final-union audits, durable handoff | keeps execution authorization false until the union closes |

Keyframes formation reconvergence is bound only to the existing consumer
formation receiver:

```text
864565973972120780c1343e6688ea2a87320a610da77471afa418a4ecc8f7f6  FINAL
f182b2009231a558cad8b453b548ba2be03c847200fcf22a09feb2c412c6cfc6  corpus manifest
3700683fe9974945bf38b56a4af83a3251b47d0a9dd0f061e99cc71d028e7dcd  validator
acf0edf3f75430270875695cd6f416431980e665e984aa9a6d2c57c2fe500c31  replacement Clean A
76d14724130ae41399b4452d6bebf3fc659aba649356b3a3499bdd91f13fae6a  genuinely later Clean B
ecc5419a14487d1828fd7ddd6bcf886bb05b019e38f243e1837a8ff15147a7b7  post-freeze dependency
```

Its status is `FORMATION_RECONVERGED_ZERO_EXECUTION`: 13 waves, 138
workflows, three passes, 36 terminal carries, 40/40 hostile mutants, P0=P1=0,
and overlay convergence 100%. Original Clean A `5f4f980d…` is superseded
zero-credit chronology.

This closes no additional cell in the 34-cell Value parser-law matrix. A07
already owns the Value/parse-that/Keyframes contract and V06 already owns the
cross-repository receiver; neither may be counted twice. All Keyframes
W1–W13 product execution, Browser, package, release, and law-selection
receipts remain pending with credit zero. In particular, formation
reconvergence is not the W2 adoption/deletion receipt, W3 immutable pack/tier
receipt, or W10 Atlas remainder required by V.L6/V.G1. It creates no Value
release, parser rebind, CSS/path ABI freeze, or product edge.

Fourier's precepts-complete formation specification is bound at this join
only and supersedes the earlier frontend-spec coordination bytes:

```text
ac82b1dd2d70e4592d0ddff0cbfb7d824f870c32297ef905f911c57f4efa219b  TERMINAL-LEDGER
e1a6734b53280763b9250cf791e49acd1fe92d5a387ac5c9e2284640a9b49058  owner precepts-completeness audit
a0136fbcfebe6278d4d5d2e3a70150b758bf9c938138b08bf30c0199a46a30e5  Fourier WAVE-SPECS
574eb17547ab7a69ed4b09ff1ba5bda8403d5512401993dc84c1bcfc1c02c522  N.md
3f055ca3…                                                        admission
02ac8c4a…                                                        progress
79f79ee20790a7703b47b8e379a7669a1f82f7c6e65ad749554010468a40be6d  handoff
229e928f…                                                        parser overlay Markdown
196cc813…                                                        parser overlay JSON
90e9e06a13f7256ad6e18689108a95bcab0a65e2ad731777b17ab57a4006afe6  prior Value matrix coordinate observed by overlay
20e60c96cf8e84571c588a76a4118a23fdeef6fadf67c3d313bcb713a005d176  prior Value status coordinate observed by overlay
```

Earlier audit `4c35f669…` and handoff `6254045f…`, plus intermediate ledger
`23f53051…`, audit `872b8866…`, and handoff `1593e44b…`, are provisional
chronology only.

The packet has 14 named specifications, 72 units, zero missing required
sections, 14 π/DELTA sections, 158 unique rows, zero duplicate IDs, and zero
bare wave references. N.W1 visible replacements and N.W5–N.W10 require one
subject-specific two-pass design brief, independent per-`N.Cxx` in-app Browser
receipts, exact copy and state language, explicit responsive/container
ownership, one semantic motion owner,
generic-default/removable-decoration critique, and explicit Golden Glass,
Breath of Life, and Movement of Momentum appraisal. Fourier W10 fails on any
missing or stale receipt. Nonvisual N.W3, N.W4, and N.W11 carry honest N/A
rather than fabricated Browser evidence.

These are sibling formation obligations, not reusable evidence. A Fourier
`N.Cxx` receipt cannot bank a Value `VC-###` workflow or D/L/C axis, and a
Value Browser receipt cannot satisfy Fourier. Fourier remains 14 waves, 72
units, and 158 rows; Value remains 18 waves, 88 SFCs, and 264 axes. Fourier
source authority and N.P1–N.P3 remain 0/3, and its Clean A/B remain 0/2. Both
sides retain zero product, Browser, storage, release, and admission credit
from this coordination boundary. Parser family states and the A10h-R2
terminal lineage remain unchanged. The final read-only coordinate audit found
60 N Markdown files, zero obvious malformed table rows, and the `str\|int`
cell correctly escaped.

No rejected prototype or historical receipt creates a positive edge.

## 7. Exact convergence ledger

`SATISFIED` means the cell is a durable input or this matrix closes its
formation-only reconciliation. `OPEN` means work may proceed in the owning
research lane. `BLOCKED` means a predecessor is absent. A prose plan does not
satisfy an evidence cell.

| cell | requirement | status |
|---|---|---|
| A01 | amendment bytes match `1317ab01…` | SATISFIED |
| A02 | input-loop identity matches `920a618a…` | SATISFIED |
| A03 | historical `10x` and P1–P6/P6-A3 evidence remains immutable and law-scoped | SATISFIED |
| A04 | Value R2 formation admission remains intact | SATISFIED |
| A05 | Value execution/product/visual/API/release credit remains zero | SATISFIED |
| A06 | 1,717/1,653, 1,503/1,439, 109, and Values5 60 denominators are bound | SATISFIED |
| A07 | Value/parse-that/Keyframes CSS ownership and product contracts are bound | SATISFIED |
| A08 | all eighteen Value waves retain exact order, bounds, and amended gate receiver | SATISFIED |
| P01 | Pass-1 Sol registry for all three law families | OPEN |
| P02 | Pass-1 Luna bounded prototype/measurement | BLOCKED on P01 |
| P03 | Pass-1 Sol critique/agglomeration | BLOCKED on P02 |
| P04 | Pass-2 Sol registry bound to Pass-1 bytes with all three families still live | BLOCKED on P03 |
| P05 | Pass-2 Luna bounded prototype/measurement | BLOCKED on P04 |
| P06 | Pass-2 Sol critique/agglomeration | BLOCKED on P05 |
| P07 | Pass-3 Sol synthesis bound to Pass-2 bytes | BLOCKED on P06 |
| P08 | Pass-3 Luna bounded selected/no-runtime assay | BLOCKED on P07 |
| P09 | Pass-3 Sol terminal adjudication and immutable law packet | BLOCKED on P08 |
| C01 | equal live-JSON complete products and exact-bootstrap CIs | BLOCKED on P01 |
| C02 | equal nested-record complete products and exact-bootstrap CIs | BLOCKED on P01 |
| C03 | representative CSS measurement projected to the complete Value denominator | BLOCKED on P01 |
| C04 | allocation, GC, rollback, recovery, diagnostic, offset, and public-product costs | BLOCKED on P01 |
| C05 | cold build/import/bootstrap and protected package-tier costs | BLOCKED on P01 |
| C06 | exact Value and Keyframes deletion/reachability ledger | BLOCKED on P09 |
| C07 | declared break-even workload, horizon, sample arrays, uncertainty, and positive lower bound | BLOCKED on P09 |
| C08 | selected-law/no-runtime Value admission and released-coordinate rebind contract | BLOCKED on P09 |
| V01 | V.L1–V.L6 library/path/transform/consumer obligations reconciled | SATISFIED |
| V02 | V.A1–V.A3 API/policy/storage/provenance obligations reconciled | SATISFIED |
| V03 | V.U1–V.U4 88-SFC/264-axis and full Browser obligations reconciled | SATISFIED |
| V04 | V.H1/V.G1 package, Glass, deletion, packed, and visual obligations reconciled | SATISFIED |
| V05 | typed DAG, Goldilocks, filename, export, and external-test obligations reconciled | SATISFIED |
| V06 | parser/Keyframes/Fourier/Glass/Atlas/root joins have one owner and effect | SATISFIED |
| Q01 | first fresh non-author law audit over the final immutable packet | BLOCKED on P09/C01–C08 |
| Q02 | genuinely later second clean non-author law audit | BLOCKED on Q01 |
| Q03 | owner/root intake, final cross-repo rehash, and durable no-execution handoff | BLOCKED on Q02 |

Exact amended-boundary convergence is:

```text
14 SATISFIED / 34 total = 41.176470588…% = 41.18%
20 OPEN-or-BLOCKED / 34 total = 58.82% remaining
```

This percentage measures Value-facing parser-law formation only. Existing
Value formation admission remains 100% under its R2 boundary, Value product
execution remains 0%, and constellation convergence remains open.

Each live law family also reports against the same five terminal milestones:
Pass 1 complete, Pass 2 complete, Pass 3 complete, its complete
cost/product/deletion case complete, and inclusion in both clean audits.

| law family | satisfied milestones | convergence | exact open milestones |
|---|---:|---:|---|
| strict `3x` | 0/5 | 0% | Passes 1–3, complete case, Clean A/B inclusion |
| strict `2x` | 0/5 | 0% | Passes 1–3, complete case, Clean A/B inclusion |
| measured break-even | 0/5 | 0% | Passes 1–3, complete case, Clean A/B inclusion |

The historical `10x` family is immutable scoped evidence, not a live amended
family, so assigning it a current convergence percentage would relabel old-law
results and is inadmissible.

## 8. Remaining gaps and terminal delta

The exact remaining gaps are P01–P09, C01–C08, and Q01–Q03. No other Value
wave, component, API, Browser, or typed-DAG receiver is unowned by this
amendment.

Terminal dispositions:

- historical `10x` law and P6-A3 result: **KEEP** as immutable scoped negative
  evidence;
- strict `3x`, strict `2x`, measured break-even: **KEEP OPEN** through Pass 2;
- parser-law selection: **BLOCKED** through P09 and two clean audits;
- Value wave identities/order/file bounds: **KEEP**;
- parser-law gate: **SPLIT** as `PLAW-BIND`, outside the eighteen product waves;
- full CSS denominator and Value ownership: **KEEP**;
- current splitters/scanners and Keyframes forks: **FOLD then PRUNE** only
  after a selected runtime, released rebind, and exact consumer migration;
- product execution, API rebind, package/release work, Browser credit, and
  constellation close: **PRUNE any present-tense claim**.

No additional Value research seat is created by this matrix. The missing
three-pass mechanism/law work belongs to the parser-owned research lane; Value
has supplied its complete denominator, economics variables, consumer
obligations, and fail-closed receiving gates without duplicating that owner.

Parser Pass-L1 Sol research and common synthesis have reached this
coordination boundary:

```text
74b849e4e3d05ccbac44c6438fc9ccf18234eb4369a5ced14f3baad2044dd887  PL-3X manifest
566384ae1c857c3df176362ac72647bd7bd8992b356e2f1d906b11f2ec26a8ef  PL-2X manifest
464710e38acce7022c86de6f1a55570d6bc3be32cf7413219831254093494e1f  PL-BE manifest
06de222cb5202d9e2da167c170dae4d18b2cebc166f808f28983123fd6101a84  common exact-four-file synthesis manifest
9f7a2b3c…                                                        synthesis
2c89e0e4…                                                        registry
56297f0c…                                                        Luna dispatch
```

The family dispositions are `PL-3X KEEP_RED`, `PL-2X KEEP_RED`,
`PL-BE KEEP_NUMERICALLY_BLOCKED`, and historical `PL-10X-H`. Median,
geometric mean, and unit-bearing `NetBenefit` remain distinct and may not be
substituted for one another.

The neutral M2/M2 plus M2/rebuilt-M2 Luna harness then ran, but parser owner
agglomeration is terminal **AMEND**:

```text
ca0a8edc973f3f4cfee74720290a4d09972898d3  parser HEAD
84539b143ba77bad662a8c854e17df3f26bea201dadd6612e5a6cde4b2753f8e  Pass-L1 owner amendment
980d7781c2912c2501247978b3153d7f1fee486b4bff51820b55c5fdeb221e27  original Luna manifest
565148af55f71ce2973094f73149808371aed2f7916bd04c3a2919fbd803c438  original Luna raw
3cd94feeaa1550d3294fce55cd9754ff0d97e34ec962f96f4afa1283243c8da4  fresh-Sol manifest
```

The original Luna packet remains immutable neutral-arithmetic evidence:
2,757 coordinates, 119 internally equal cold groups, eleven aggregate
counters, 48 reproduced ratios, and 158,120,256 bootstrap tuples. It does not
prove semantic harness mechanics or a law.

Fresh Sol AMENDs mechanics acceptance for hardcoded mutants, a self/self
generic executor, unreachable JSON composition, label-only fault/rollback/
alternating rows, missing fixtures, schema drift, and false or incomplete cost
labels. Median, geometric mean, and unit-bearing `NetBenefit` remain distinct.

P01 remains OPEN and each family remains 0/5. The previously recorded Luna
correction-only A1 activity is now historical chronology: parser development
is paused and there is no active writer.
The amendment's observed Value matrix `5167f163…` and status `90e895dd…` are
chronology only after this intake and are not rewritten into any sealed parser
packet. This boundary grants zero law, family, parser, CSS, product, package,
formation, release, rebind, consumer, or Value credit.

## 9. Parser-paused non-parser overlay

The user paused parser development and separately closed every independent
Value frontend/library/API/DAG specification:

```text
760007f63a783a72e2d1438ba4fa33e2a7f03f48c43da90f57644ad844adf822  VALUE-NON-PARSER-CONVERGENCE-MATRIX-2026-07-30.md
11/11                                                            non-parser specification cells
```

This overlay changes no row in section 7. The parser-law result remains
exactly `14/34 = 41.18%`; P01–P09, C01–C08, and Q01–Q03 remain open or
blocked. Non-parser 100% is specification coverage only and grants zero
parser, product, API, Browser, package, consumer, storage, release, or
constellation-close credit.

## 10. Cross-session external dependency AMEND

The read-only cross-session corpus
`43c4806214452c0fce4967be26952186c6435bafae519a6836db097f1da1efb5`
confirms that Keyframes v4 is owner-AMEND/non-admissible and Fourier v4k/v4l
remain AMEND/partial. Those are consumer and storage dependency facts, not
parser-law cells. They do not alter any section-7 numerator or denominator.

Parser status is `PAUSED_DEPENDENCY` with no active writer. The exact result
therefore remains `14/34 = 41.18%` as formation chronology only. No parser
selection, CSS candidate, Value rebind, product execution, package, Browser,
consumer, storage, release, or constellation-close credit follows.
