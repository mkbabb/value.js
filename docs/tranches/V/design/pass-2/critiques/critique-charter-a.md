# V · pass-2 · CRITIQUE — CHARTER A (the WHAT-tree, F1 ∘ F3 fused)

**Critic**: pass-2 FRESH critic (NON-author — did not write `charter-a.md` / the AGGLOMERATION §3
charter it executed / `spec-f3` / the retro-critiques). **Mode**: RAN — every load-bearing number
re-measured against `tranche-u` HEAD (`d365053`; the charter committed at `bd67b12`, one below), the
`_proto/*.mjs` instruments read READ-ONLY in the isolated worktree, sibling trees READ-ONLY. Nothing
merged; nothing in `docs/tranches/U/**` or the pinned glass-ui worktree touched.

**Verdict up front: EARNED CONVERGENCE 58% for the composed F1∘F3 thesis.** Charter A is the pass's
most-material advance: it dissolves the exact retro-f3 G4 blocker (the RED-baseline / no-smoke debt) by
running the general colocation against a **genuinely GREEN demo** — typecheck 0 → 0, build 0, smoke 2/2 —
and it CONFIRMS the retro-f3 G2 prediction that "the other 15 → color-picker" is refuted by the consumer
set. Those are real, re-verified wins. But three defects hold it below convergence, and a fresh
re-measurement adds a **factual error the charter did not disclose**: (1) the flagship "17/18 PROMOTE, 1
COLOCATES" headline rests on a **single colocation that manufactures the exact cross-tree edge CC-5 was
built to forbid** — and applied consistently, CC-5 promotes it too (18/18); (2) §1.3's universal "**ZERO**
of the promoted files are consumed by the color-picker FEATURE tree" is **FALSE on disk** — two promoted
kernel files (`ink`, `useContrastSafeColor`) are imported by color-picker feature components; (3) the CC-5
instrument the whole fold banks on is **still not ground-truth-validated** (retro-f3 G3's explicit
precondition), and the one placement it produced end-to-end (generate-color) is the very case that proves
why validation was demanded. The green gates prove the move RESOLVES; they are blind to whether it is
PLACED right — and on the two placement questions I can check by hand, the map has a hole.

---

## What HOLDS (re-verified on HEAD — measurement earns, elegance earns nothing)

- **The demo now BUILDS GREEN — the retro-f3 G4 blocker is genuinely gone.** The pass-1 "12 goo-blob
  module-resolution errors / unbuildable demo" baseline is fixed at HEAD (charter-b item 5 corroborates
  the goo-blob→blob swap). This is the single most valuable advance over pass-1: F3's D1 "executed" claim
  was previously a zero-delta on a RED, non-building typecheck with no runtime; charter A re-runs it
  against a real green baseline with a smoke observation. CREDIT — this is the material closer.
- **The kernel DI counts reproduce EXACTLY.** `PALETTE_MANAGER_KEY` = **21** sites, `VIEW_MANAGER_KEY` =
  **4**, `usePaletteManager` = **22** importers, `useViewManager` = **8** — all four match the §2 table to
  the file. `keys` = 25 specifier-importers + 1 sibling = **26** (matches). `ink` = **6** importers
  (matches). The kernel is small, earned, and its consumer arithmetic is honest.
- **api item 4 verifies first-hand.** `api/src/modules/` = **5** vertical capsules (`admin color meta
  palette session`); `grep -rnE "from ['\"].*repositor" api/src/modules/*/routes/` = **0** real
  route→repository imports (the 2 hits are comments). The boundary is domain-vertical, gate-clean; both
  poles of the vocabulary fork are held for the owner, not pre-decided. CREDIT (shared/low-marginal, as
  retro-f3 G7 already docked).
- **The clean-break cut is genuinely ATOMIC.** The item-1 codemod is `git mv` + rewrite in one pass,
  bucket → empty, no `@composables/color/*` alias left resolving. §3's reconciliation (value.js's physical
  `@` is heavier than glass-ui's alias-only `@glass`, so a straddle window has nothing to straddle) is
  sound and correctly makes the leak-ban gate a POST-cut completion invariant, not a during-cut crutch. No
  alias, no shim, no dual path. The owner's clean-break law holds **for atomicity** (see G5 for where it
  frays on cross-tree coupling).
- **The refutation direction is RIGHT.** The spec's "15 single-consumers → color-picker capsule" does not
  survive; most of the bucket promotes to kernel/app-root, not into a feature. Charter A confirms retro-f3
  G2 with a running instrument instead of a hand-count. That confirmation is real even though the exact
  "17/1" arithmetic is flawed (G1).
- **`proof:subpath-budget` is a real gate on HEAD** (in `test:dist`, `scripts/gates/proof-subpath-budget.mjs`),
  and the current-tree floor is a legitimate verify — the "directory ≠ export map" FRAME is correct.

Everything below is the distance between those RAN results and "the composed thesis, converged."

---

## OPEN GAPS (enumerated, most-severe first)

### G1 — the flagship "17/18 PROMOTE, **1 colocates**" is the charter's headline, and the ONE colocation manufactures the cross-tree edge CC-5 exists to forbid (and, applied consistently, promotes)
The verdict table and §1.3 sell "**Exactly ONE of 18** files (`generate-color.ts`) … truly colocates. **17
of 18 PROMOTE.**" I traced `generate-color` on HEAD. Its real consumers are:
`{ useColorParsing.ts (bucket sibling → the charter sends it to **app-cluster**),
useColorGeneration.ts (generate feature), GenerateControls.vue (generate feature) }`, and
`useColorParsing.ts:7` **runtime-imports** `generateSingleColor` from it.
- The charter classified `generate-color` **COLOCATE→feature** by labelling its consumer set "generate
  (**1**, both externals)" — i.e. it **discounted `useColorParsing`** as a bucket sibling. But the move
  itself sends `useColorParsing` to `demo/color-picker/composables/color/` (app-cluster) while sending
  `generate-color` to `custom/generate/composables/` (feature). Post-move that pre-move "sibling" is a
  **cross-tree runtime edge**: app-cluster → generate feature. This is **precisely** the manufacture §1.1
  says the design must prevent ("else the move manufactures a cross-directory edge") — the rule it correctly
  applied to `ink-walk → ink` and silently violated here.
- By CC-5's OWN predicate (§1.1: promote iff consumers span ≥2 feature-roots OR include an app-root
  consumer), `generate-color`'s set includes an app-root-cluster consumer (`useColorParsing`) → CC-5 says
  **PROMOTE**, not colocate. Applied consistently the count is **18/18 promote, 0 clean feature-colocation**
  — which is a *stronger* refutation of the feature-capsule thesis than the charter claims, and it means the
  general bucket contains **zero feature-capsule content** (all kernel + app-root). The charter's "17/1"
  framing over-states colocation to preserve one clean-looking example that isn't clean.
- **What closes it**: re-run CC-5 counting post-move destinations (not pre-move sibling relationships);
  report `generate-color` as PROMOTE (making it 18/18) OR co-move `useColorParsing` with it; either way,
  retire "1 colocates" — the honest result is the bucket does not colocate into a feature at all.

### G2 — §1.3's universal "ZERO of the promoted files are consumed by the color-picker FEATURE tree" is FALSE on disk (an undisclosed factual error in a load-bearing refutation paragraph)
§1.3 bullet 2 asserts, verbatim: "**ZERO** of the promoted files are consumed by the `color-picker`
FEATURE component tree (`components/custom/color-picker/`)." Re-measured:
- `ink.ts` (PROMOTE→kernel) is imported by `components/custom/color-picker/controls/ComponentSliders/ConsoleRail.vue`
  and `components/custom/color-picker/display/ColorNutritionLabel.vue`.
- `useContrastSafeColor.ts` (PROMOTE→kernel) is imported by those two **plus**
  `components/custom/color-picker/visual/HeroBlob.vue`.

So **multiple promoted files ARE consumed by the color-picker feature tree.** The claim is true only for
the *app-cluster* subset (`useColorPipeline` et al.), but it is written as a universal over all 17
promoted files, and it is false. The intended point (the app-cluster is app-root, not color-picker-feature)
survives on other grounds — but a fresh critic must dock the overstatement, because the charter uses this
false universal as evidence and the error was not disclosed.
- **What closes it**: scope the sentence to the app-cluster subset ("zero of the **app-cluster** promoted
  files …"); the kernel-promoted files are cross-feature and several land IN the color-picker feature —
  which is exactly *why* they are kernel, not a contradiction, but it must be stated correctly.

### G3 — CC-5 is BUILT + RUN but STILL NOT ground-truth-validated; retro-f3 G3's precondition is only 2/3 met, and G1 is the failure it reserved against
Retro-f3 G3's closer was explicit and tripartite: "**BUILD** the CC-5 predicate as a committed,
`@`-alias-and-`.vue`-resolving instrument, **validate it against a hand-checked ground truth** (the
`ComponentSliders`-class test), and **RUN it** end-to-end." Charter A did (i) build+commit (`_proto/census.mjs`,
153 lines, persists in the worktree — a real advance over F3's throwaway scripts) and (iii) run end-to-end.
It did **not** do (ii): `census.mjs` contains **no assertion / ground-truth / ComponentSliders harness**
(`grep -niE 'assert|validate|ground.?truth|ComponentSliders|expect'` → 0 hits), and the charter's §1.1
"closes retro-f3 G3" claim silently drops the validation leg. This is not pedantry: retro-f3 G3 docked F3
for inheriting "the exact debt F2 was DOCKED for" (an un-validated demo scanner), and **G1 above is that
debt materializing** — the instrument produced a placement (`generate-color` colocate) that typechecks
green but is wrong under the instrument's own predicate. An un-validated census that misplaces one file the
green gates can't catch is precisely the failure mode the ground-truth test was demanded to catch.
- **What closes it**: add the hand-checked ground-truth harness to `census.mjs` (the `ComponentSliders`
  live-control case + at least the `generate-color`/`useColorParsing` cross-tree pair) and re-run; treat
  retro-f3 G3 as OPEN until the validation leg exists, not closed.

### G4 — the src color-MERGE (item 6's load-bearing coexistence proof) was NOT re-run on HEAD, and is MIS-ATTRIBUTED to a Charter B item that runs a different carve
Item 6's centerpiece is the "directory ≠ export map" coexistence — retro-f3 called it F3's "best-earned
result." Charter A §6 verifies the `proof:subpath-budget` **floor on the current (un-merged) tree** and
then cites F3's pass-1 merged-tree result (11→0 edges, 11/11 GREEN) for the merge itself, with the
parenthetical: "the actual re-RUN of the merge on HEAD is **Charter B's `units/index.ts`-class carve
item** — deferred there." I checked: Charter B item 3 is the **`units/index.ts` value-model carve** (a
barrel-into-siblings split), and item 4 is the **order-independent registry** (F2's SCC severance) —
**neither is the `parsing/color → units/color` directory MERGE**. So the color merge was re-run by
**no** pass-2 lane; its coexistence proof remains inherited from the `6abef80` proto, on a tree two
drift-generations stale — against a campaign whose explicit pass-2 mandate (Charter B item 5) is "re-derive
against HEAD (protos ran at `6abef80`; ~5% blast-drift)." The mis-attribution creates a false impression
that the merge IS covered somewhere in pass-2.
- **Bearing**: retro-f3 G3 also flagged the merge's headline edge count as **unstable across runs**
  (`parsing/color→units/color` = 15 research vs 11 proto — a ±27% swing); charter A cites the "11" without
  reconciling it. So the item-6 coexistence rests on an un-re-run merge over a disputed edge count.
- **What closes it**: either RUN the `git mv parsing/color → units/color/parse` on HEAD and re-measure
  `subpath-budget` + the esbuild `/color` trace, or state honestly that the merge is UN-re-run in pass-2
  and route it to Charter B/execution with the 15-vs-11 count reconciled first. Delete the false
  attribution to Charter B item 3.

### G5 — the "app-cluster" THIRD tier RELOCATES the bucket to a new `composables/color/` and its PLACEMENT DESIGN is asserted, not validated (the green gates are blind to it)
The move sends 12 files to `demo/color-picker/composables/color/` — a directory that does not exist today
(the current `demo/color-picker/composables/` holds `boot/`, `useDevicePixelSnap.ts`,
`usePaletteManagerWiring.ts`) — i.e. it **re-creates a 12-file `color/` sub-bucket one level down.** The
owner's edict is "long running dirs must and always be broken into common modules and encapsulated," and
composables that are "truly module-/global-level … can be found within a `composables/` dir therein, but
otherwise they're to be **COLOCATED**." Relocating a bucket to a new bucket is not obviously "broken into
common modules"; whether these 12 are "truly app-level" (→ the composables/ home is right) or should
colocate further into components is a **placement-design** question. The charter's evidence — typecheck 0,
build 0, smoke 2/2 — proves the move RESOLVES; it is **structurally blind to whether the placement is
correct** (the identical gates would be green if all 18 promoted to the kernel, or if the app-cluster
dissolved into components). This is retro-f6 F6-3 verbatim: "the oracle proves resolution, blind to
placement DESIGN." The charter discloses the tier as friction #3 and flags the alias as an owner call — but
it presents the app-cluster HOME as a settled result when the green gates cannot validate it, and it did
not surface the "re-bucket vs. further-colocate" choice as a design fork.
- **What closes it**: state that the app-cluster placement is validated only for RESOLUTION, not design;
  surface "app-root `composables/color/` sub-bucket vs. further colocation into components" as an explicit
  owner/design fork; and note the kernel→app-root type inversion (friction #1) + the G1 cross-tree runtime
  edge are two *couplings the move introduces*, so the tier is not coupling-free.

### G6 — [minor] `aurora-atoms` "2 consumers" undercounts to 3, and the promote is app-cluster-dominant, not "cross-boundary → kernel"
§1.2/§2 promote `aurora-atoms` to kernel as "**2** consumers … panes (feature) + app-root boot." Measured:
**3** importers — `demo/color-picker/composables/boot/atmosphere-calibration.ts`,
`.../boot/useAtmosphere.ts` (both app-cluster/boot), and `custom/panes/AuroraPane.vue` (panes). Two of
three are in the app-cluster boot area; the spread is {app-cluster, panes}, making "promote to KERNEL" the
weaker read (app-cluster with one panes consumer is at least as defensible). The charter honestly labels it
"the borderline 6th," so this is a low-severity numeric slip, not a thesis issue — but the count is wrong
and the promote-to-kernel disposition is softer than stated.
- **What closes it**: correct to 3 importers; note the app-cluster-dominant spread and route the
  aurora-atoms home as a borderline owner call (as the charter half-does).

### G7 — [provenance] the item-1 RAN evidence is thin: the two typecheck artifacts are 0-byte files that record no exit code
`_proto/baseline-typecheck.txt` and `_proto/postmove-typecheck.txt` are both **0 bytes**. An empty file is
*consistent* with silent-green `vue-tsc` (it prints only on error), so this does not contradict the "exit 0,
Δ0" claim — but a zero-byte file records neither the exit code nor a timestamp of success, so the strongest
item-1 number ("typecheck 0 before AND after") has no durable provenance beyond the author's assertion, and
the move was `git reset --hard` so it cannot be re-derived. Low severity (the claim is plausible and the
build+smoke are independent corroboration), but a fresh critic notes the evidence floor is thinner than the
charter's confident "GREEN→GREEN, Δ0" implies.
- **What closes it**: capture `echo "exit=$?"` into the evidence files, or re-run on a fresh worktree and
  record the exit codes; keep the smoke/ build as the load-bearing runtime evidence (they are real).

---

## Did every MUST-RUN item actually RUN? (the charter mandate, item by item)

| Charter A item (AGGLOMERATION §3) | mandated mode | what charter A did | verdict |
|---|---|---|---|
| 1 · general demo colocation | **RUN** (worktree; report typecheck + consumers + provide/inject survival) | census.mjs + move.mjs RAN; typecheck 0/0, build 0, smoke 2/2; DI-order observed | **RAN** — the material advance (but instrument un-validated G3; flagship count flawed G1; §1.3 error G2) |
| 2 · demo kernel, ratified | census/table | RAN census; counts reproduce (verified) | **RAN** (aurora-atoms count slip G6) |
| 3 · clean-break, ASSERTED | **ASSERT** (decision) | decision-record, backed by item-1 cut | **MET** — asserting was the mandate; the cut is genuinely atomic |
| 4 · api owner-fork, surfaced | present measured evidence | RAN glass-ui's gate GREEN; 5 capsules / 0 route→repo (verified) | **RAN**; both poles held (shared/low-marginal) |
| 5 · referent-stability audit | recover #4-5 + state F1 exposure | recovered 2 strongest divergences; reframed "no canonical ledger" | **MET** (doc recovery; the "#4-5 exist" premise was itself false, honestly converted to a finding) |
| 6 · src DOMAIN-capsule set | **ratify** + coexistence | ratified; verified subpath floor on current tree; **CITED** F3's stale-tree merge, did NOT re-run it | **PARTIAL** — the coexistence PROOF is un-re-run on HEAD and mis-attributed to Charter B (**G4**) |

**Reading**: items 1/2/4 RAN and re-verify; item 3 was an assert and is met; item 5 is a legitimate doc
recovery. **Item 6 is the SPEC-ONLY-where-RUN-was-implied gap** — the load-bearing color-merge coexistence
is inherited from `6abef80`, not re-run, and is mis-routed to a Charter B item that carves something else.

## Owner-reserved forks — any quietly pre-decided?

- **api vocabulary** (`routes/service/repository` vs `api/model/lib`): **routed OUT correctly.** §4 holds
  both poles, states "F1 measured POLE B" but explicitly "does NOT ratify that." Clean.
- **`@`-ban idiom** (eslint `no-restricted-imports` vs `proof:*` never-ESLint): **routed OUT correctly.**
  §3's atomic cut is idiom-agnostic; the choice is left to the owner. Clean.
- **COUPLED OWNER EVENT** (U-ratify + T-close): untouched; the charter authors, does not land. Clean.
- **NEW un-routed fork introduced by the charter (G5)**: the "app-root `composables/color/` re-bucket vs.
  further colocation into components" placement-design choice was **resolved unilaterally by running one
  option**, not surfaced as a fork. Not on the campaign's declared owner-reserved list, but it is a design
  decision the green gates cannot adjudicate — it should be surfaced, not asserted.

## Clean-break law — does it hold end-to-end?

**Atomicity: YES.** The cut is `git mv` + one-pass rewrite, bucket → empty, no alias window, no shim, no
dual path; §3's transposition of the leak-ban gate to a POST-cut invariant is the clean-break-compatible
reading. **No-new-cross-tree-coupling: PARTIAL.** The move introduces a kernel→app-root *type* import
(friction #1, disclosed) AND a `useColorParsing` (app-cluster) → `generate-color` (feature) *runtime* edge
(G1, **undisclosed**). Neither is a legacy shim, so the owner's literal "no aliases/dual paths" law is not
violated — but a clean colocation should not manufacture cross-tree edges, and the flagship colocation does.
The law holds on its letter; the placement leaves two couplings, one of them unflagged.

## Failure-mode checklist

| # | hook | verdict on charter A |
|---|---|---|
| 1 | vacuous convergence (gate passes, owner edict unmet) | **PARTIAL** — the RUN is real and green (not vacuous), but "17/18, 1 colocates" over-states colocation (G1) and §1.3 misstates the consumer set (G2); the owner's *colocate-into-components* edict is met as *relocate-to-app-root-bucket* (G5). |
| 2 | gates that cannot fail | **PRESENT (structural)** — typecheck/build/smoke prove RESOLUTION, are blind to PLACEMENT DESIGN (G5); they would be green for any resolvable partition, so they cannot fail on a wrong home. |
| 3 | elegant-reduction / "and then the hard part" | **PRESENT** — the color-merge coexistence (the src hard part) is cited stale + mis-attributed, not re-run (G4); CC-5 validation (the instrument hard part) is skipped (G3). |
| 4 | dual paths / masked fallbacks / aliases | **CLEAN** — the cut is atomic, no alias/shim/dual-path (real credit). One coupling smell, not a fallback (G1/G5). |
| 5 | unverified gestalt | **PRESENT** — "17/18, 1 colocates" and "ZERO promoted → color-picker" are asserted and both fail hand-measurement (G1/G2); the app-cluster home is asserted, gate-blind (G5). |
| 6 | consumer-less substrate | **INVERTED** — CC-5 HAS a consumer (Charter B / the F6-unblock); the failure is the mirror: it is presented as *validated* when the ground-truth leg is missing and its one end-to-end placement is wrong (G3/G1). |
| — | owner "grand recursive colocation" D1 edict | **ADVANCED, not landed** — the general bucket RAN green (real); but it promotes/relocates rather than colocates-into-components, and the flagship colocation is flawed. |
| — | glass-ui referent | **direction holds** — atomic `@`-abrogation + leak-ban-as-completion-invariant is the correct transposition; api = glass-ui grammar GREEN (measured). |

## EARNED CONVERGENCE: **58%** (composed F1∘F3 thesis)

| Surface | State | weight |
|---|---|---|
| D1 general colocation — RAN green (typecheck 0/0 · build 0 · smoke 2/2), retro-f3 G4 blocker dissolved | **the material advance** — real, re-verified | carries most of the 58 |
| D1 refutation of "15 → color-picker" | **direction CONFIRMED** by a running instrument | credits |
| D1 flagship "17/18, 1 colocates" | **flawed** — the 1 colocation manufactures a cross-tree edge; CC-5 promotes it (G1); §1.3 universal false (G2) | drag |
| CC-5 instrument | **built + run, NOT ground-truth-validated** (G3); its one end-to-end placement is wrong | drag |
| Demo kernel + DI counts | **SOUND, reproduce exactly** (aurora slip G6) | credits |
| api item 4 ratify | **measured clean** — shared/low-marginal, vocab owner-forked | credits, low marginal |
| Clean-break atomic cut | **genuinely atomic**, no alias window | credits |
| src item 6 coexistence | **floor verified; MERGE un-re-run on HEAD + mis-attributed** (G4) | drag |
| app-cluster tier | **asserted, gate-blind placement design** (G5) | drag |

**Why this high (vs retro-f3's 40% for F3-alone)**: charter A closes the debt that capped F3 — it runs the
general colocation against a **real green baseline** with a smoke + build observation, dissolving retro-f3
G4, and it CONFIRMS the retro-f3 G2 refutation with a committed instrument instead of a hand-count. The
kernel, api, and clean-break cut all re-verify. That is a genuine pass-2 material advance, not a re-assert.

**Why not higher**: the placement DESIGN half — which the whole "WHAT-tree" thesis is *about* — is proven
only to RESOLVE, never to be CORRECT (G5, the retro-f6 F6-3 limit), and on the two placement questions a
fresh critic can hand-check, the map fails: the flagship "1 clean colocation" manufactures the cross-tree
edge CC-5 forbids (G1) and §1.3's consumer claim is false on disk (G2). The instrument the fold banks on to
unblock F6/Charter B is still un-validated (G3, retro-f3 G3 only 2/3 met), and the src coexistence proof —
F3's best-earned result — is un-re-run on HEAD and mis-attributed (G4).

**Why not BLOCKED**: no missing primitive is as hard as the original problem. The demo move RAN and lands
green; the gaps are (a) a consistent re-run of CC-5 with the ground-truth harness (G1/G3), (b) two
corrections to written claims (G2/G4), (c) a re-run or honest deferral of the color merge (G4), and (d)
surfacing the app-cluster placement as design-not-proven (G5). All enumerated, all completable in pass-3.

**Recommendation to the pass-2 agglomerator**: ADVANCE charter A as the WHAT-tree LEAD at **58%** — the
green D1 RUN is the pass's material advance and must anchor pass-3 — but do NOT trust its per-file placement
map as load-bearing until: CC-5 is ground-truth-validated and re-run counting post-move destinations (kills
the false "17/1"); §1.3 is corrected to the app-cluster subset; the color merge is re-run on HEAD (not
cited from `6abef80`, not mis-routed to Charter B's units carve) with the 15-vs-11 count reconciled; and
the app-cluster tier is surfaced as a placement-DESIGN fork the green gates cannot adjudicate. Composed with
Charter B's validated scanner + registry and Charter C's D3 gates, F1∘F3 is the real shape — but its
placement outputs are not yet the ratifiable manifest the owner's D1 edict needs.
