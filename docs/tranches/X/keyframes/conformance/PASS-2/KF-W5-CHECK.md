# KF-W5 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 2)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W5.md` (313 lines)
**Corpus authority**: the 58 `kf-*.md` records in `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → **58** ✓)
**Sole in-tree carry**: `carry/KF-W6-CARRY.md` (201 rows / 54 records per RULINGS §Authority)
**Rulings under trial**: `PASS-1/RULINGS.md` §END gives KF-W5 exactly **three** directives — **R-9b · R-12 · R-14**
**Date**: 2026-08-28 · **Seat**: fresh adversarial, pass 2, **re-derived not inherited** · **Sole write**: this file. Zero product-source writes; product read READ-ONLY at `git show 81a56990:…` for gate-witness verification (a check seat must verify that a cited path exists — the spec's own no-product-read law binds the *author*, not the auditor).

**VERDICT: DEFECTIVE** — 6 MAJOR · 6 MINOR · 1 INFO.

The pass-1 defect set is **genuinely cured**: the census recount lands at a machine-verified 46, the three assigned rulings are applied verbatim, and pass-1's own D-4/D-6 (the `group.ts:201` provenance charge) are **REFUTED by the bank** — `kf-LayerConfigPanel.md:41` carries the exact conjunction the spec quotes. Axes 1 (census), 4 (E-3/STATUS) and 5 (posture) are CLEAN.

**Axis 3 fails, hard, on ground pass 1 never tested.** Pass 1 verified that Arm D *traces* to `lane-library.md`; it never asked whether Arm D is *true at the declared ref of record*. It is not. `lane-library.md:6` declares its substrate to be HEAD **`8281638c`** — the exact ref `KF-W5.md:8` **DISQUALIFIES as witness substrate** — and in the 41 commits between that ref and `origin/master 81a56990` the frontier landed the presets-shim delete, the stutter renames, and the play-lifecycle carve. Five of Arm D's six rows are stale or already discharged at the ref the wave pins; **two gates are born GREEN**; a third gate's oracle is inverted; and **G-BASIS's own B0 probe returns `0` when run**.

---

## §1 · ID-KEYED CENSUS — re-derived from the 58 records

**Method (independent).** `grep -c 'W5'` over all 58 records → 22 records carry the token, 84 hits total. Every hit windowed (±70/170 chars) by script and adjudicated *routing vs preamble vs false-positive*. Cross-check for routings phrased **without** the token (`tri-fold`, `library letter`, `library arm`, `library half`, `D/L/C`, `pre-seeded roster`) returned no additional routing.

**Struck as false positives (2)**: `kf-OrbitalDrag:82` (`P.W5.S3` — a tranche-P ledger token inside a narrated comment census) · `kf-SquareInstrument:7,:21` (`R.W5` — a git commit's tranche label).
**Struck as preamble-only (routing-law lines with zero rows attached)**: `kf-AnimatedText:30` · `kf-App.skeleton:30` · `kf-CopyButton:36` · `kf-EasingScene:33` · `kf-EasingSidebar:32` · `kf-EasingTarget:33` · `kf-EditorStartScreen:32` · `kf-HeroAurora:32` · `kf-KeyframeCard:36` · `kf-KeyframesAddDialog:38` · `kf-KeyframesEditor:36` · `kf-KeyframesStringControls:17` · `kf-TimelineHoverPreview:17` · `kf-TimingFunctionPanel:34` · `kf-TypingDots:31`, plus the three **KF.W5-PARTIALS** headers (`kf-AnimationControlsGroup:17` · `kf-ControlsPaneWrapper:6` · `kf-DemoGlobalChrome:17`).
**Struck as terminal-manifest class references** (no id, cannot hide an id-keyed escape): the 14 `ADJUDICATED …` tail lines that read "structural folds to KF.W0/W4/W5/W6".
**Deduped re-routings of an already-counted identity (3)**: `kf-EditorStartScreen:24` (ruling 5's `AnimationGroupInput` leg ≡ KF-EST-5) · `kf-TypingDots:39`/`:46` (witness ×2 for KF-EST-5 / KF-EST-17) · `kf-TypingDots:73` (K3's `stagger.ts` clause ≡ KF-EST-5).

### The record set — **16 routing records**, independently derived

`kf-AnimatedText` · `kf-App.skeleton` · `kf-CopyButton` · `kf-EasingScene` · `kf-EasingSidebar` · `kf-EasingTarget` · `kf-EditorStartScreen` · `kf-KeyframeCard` · `kf-KeyframesAddDialog` · `kf-KeyframesEditor` · `kf-KeyframesStringControls` · `kf-SpringPhysicsFacet` · `kf-SpringScene` · `kf-TimelineHoverPreview` · `kf-TimingFunctionPanel` · `kf-TypingDots`

**This is the set the spec's AUDITED row now names** (`:13`) — pass-1's D-12 is **CURED**: `kf-TimelineHoverPreview` is in, and `kf-SquareScene` / `kf-ChannelOptions` are correctly re-labelled *"route NOTHING here by token"* (`grep -c 'W5'` → **0** in both, re-run ✓), homed by §0 R-1. The two R-9b prerequisite records (`kf-LayerConfigPanel`, `kf-MatrixEditor`) likewise carry 0 `W5` tokens and are correctly declared as prerequisite carries, not routings.

### The 43 routed ids — id for id, with disposition

| # | id | record : line | spec disposition | state |
|---|---|---|---|---|
| 1 | KF-AT-8 | kf-AnimatedText:43 | §Carry B-1 → G-ROLE | BOOKED |
| 2 | KF-AT-9 | :44 | B-2 → G-REFUSE | BOOKED |
| 3 | KF-AT-12 | :52 | Arm A, PREMISE row (cure = KF.W4's, not re-booked) | BOOKED |
| 4 | KF-AT-23 | :63 | B-3 → G-REVERT | BOOKED |
| 5 | KF-SKEL-9 | kf-App.skeleton:44 | §Excluded 2 → KF.W6 | BOOKED (excluded) |
| 6 | KF-SKEL-16 | :56 | §Excluded 3 → KF.W6 (geometry half → KF.W7) | BOOKED (excluded) |
| 7 | KF-SKEL-20 | :60 | §Excluded 4 → KF.W6 | BOOKED (excluded) |
| 8 | KF-CB-30 | kf-CopyButton:31,:78 | B-19, reader-2 MINOR dissent preserved | BOOKED |
| 9 | KF-CB-35 | :83 | B-20 (`:182` only; `:195` declared KF.W4's) | BOOKED |
| 10 | KF-CB-36 | :84 | B-21 (library prose); demo half → §Excluded | BOOKED |
| 11 | KF-ES-36 | kf-EasingScene:78 | §Excluded 1 → KF.W6, G-ID-qualified | BOOKED (excluded) |
| 12 | KF-ES-20 | kf-EasingSidebar:61 | Arm A census-truth arm; bytes ride KF.W6 | BOOKED |
| 13 | KF-ET-1 | kf-EasingTarget:37 | B-22 — **riders only**; row stays NO-WAVE-OWNER, KF-ET-2 cure-lock carried | BOOKED |
| 14 | KF-ET-27 | :69 | Arm A census-truth arm (S-10) | BOOKED |
| 15 | KF-ET-32 | :77 | B-12 → G-CSSIDENT leg 3; BH-relay + KF.W3 arms explicitly NOT taken | BOOKED |
| 16 | KF-ET-33 | :78 | §Excluded 1 → KF.W6 | BOOKED (excluded) |
| 17 | KF-ET-35 | :80 | §Excluded 1 → KF.W6 | BOOKED (excluded) |
| 18 | KF-EST-5 | kf-EditorStartScreen:62 (+ :24, +TD:39, +TD:73) | B-4 → G-STAGGER-DOC leg 1; severance not un-severed | BOOKED |
| 19 | KF-EST-17 | :79 (+TD:46) | B-17; K2 phrasing correction carried | BOOKED |
| 20 | P-8 | :136 | B-4 leg 2 — "static/unit, NOT a browser probe" carried | BOOKED |
| 21 | KF-KC-27 | kf-KeyframeCard:69 | B-7; row stays NO-WAVE-OWNER; KF-CB-6 folded | BOOKED |
| 22 | KAD-1 | kf-KeyframesAddDialog:42 | Arm 0 → G-XSS · S-0 front-load | BOOKED |
| 23 | KAD-2 | :46 | Arm 0, G-XSS leg 2, ids not collapsed | BOOKED |
| 24 | KAD-3 | :47 | Arm 0 (composable arm); component arm → KF.W6 | BOOKED |
| 25 | KAD-5 | :49 | Arm 0 (composable arm); SFC promises → §Excluded 6 | BOOKED |
| 26 | KAD-13 | :57 | §Excluded 5 → KF.W7 WHOLE (reciprocated ×2 ✓) | BOOKED (excluded) |
| 27 | KAD-14 | :67 | Arm 0 (a,b,d,e); (c) → §Excluded 6 | BOOKED |
| 28 | KAD-17 | :70 | §Excluded 6 → KF.W6 WHOLE | BOOKED (excluded) |
| 29 | KF-KE-10 | kf-KeyframesEditor:52 | B-9 → G-FROMSTRING; §0 R-3 severity, BLOCKER dissent preserved | BOOKED |
| 30 | SPF-20 | kf-SpringPhysicsFacet:60 | B-9 as witness ×2, folded not re-booked | BOOKED (fold) |
| 31 | N-8 | kf-KeyframesStringControls:55 | B-10 → G-CSSIDENT | BOOKED |
| 32 | C-8 | :81 | B-11 → G-CSSIDENT leg 2 | BOOKED |
| 33 | KF-SS-4 | kf-SpringScene:43,:151 | §Excluded 1 → KF.W6; RD-3 rules the family's home | BOOKED (excluded) |
| 34 | KF-SS-6 | :45,:151 | §Excluded 1 → KF.W6; token-lane pairing lock carried | BOOKED (excluded) |
| 35 | KF-SS-31 | :77,:151 | §Excluded 1 → KF.W6 | BOOKED (excluded) |
| 36 | KF-SS-38 | :151 | §Excluded 1 → KF.W6; POST-KILL-RESIDUE lock carried | BOOKED (excluded) |
| 37 | C-8 (Skeleton half) | kf-TimelineHoverPreview:85 | §Excluded 3, folded ≡ KF-SKEL-16, never re-booked | BOOKED (fold) |
| 38 | KF-TFP-21 | kf-TimingFunctionPanel:64 | B-13 → G-OPTSET (ONE letter, not split) | BOOKED |
| 39 | KF-TFP-27 | :73 | B-13, bound not split | BOOKED |
| 40 | KF-TD-1 | kf-TypingDots:57 (+:21) | B-6 → G-PRM-FLIP | BOOKED |
| 41 | KF-TD-5 | :61 | B-8 → G-DELAY, RULE-BEFORE-FIX carried | BOOKED |
| 42 | KF-TD-8 | :64 | B-18 (design question only); magnitude → KF.W9 | BOOKED |
| 43 | S★-2 | :88 | B-5 — lifted per the record's explicit instruction | BOOKED |

### Census arithmetic — re-run by machine, not asserted

| metric | value | probe |
|---|--:|---|
| adjudicated records | **58** | `ls kf-*.md \| wc -l` |
| routed adjudicated ids | **43** | the table above |
| booked (§Carry row · named fold · exclusion-with-destination) | **43** | id-for-id |
| **escaped (in neither table)** | **0** | — |
| §Carry rows | **46** | scripted table-row count: Arm 0 `:154-160`=**7** · A `:166-173`=**8** · B `:179-200`=**22** · C `:206-208`=**3** · D `:214-219`=**6** |
| §Excluded rows | **12** | 7 prose sub-rows + items 2–6 |
| registry ids in §Carry / §Excluded | **30 / 13** | 30+13 = 43 ✓; the 30 sit on 27 rows (B-13 carries two; SPF-20 and THP C-8 are folds) |

**Pass-1 D-1 is CURED and the recount is EXACT.** The machine count of `§Carry` returns 46, matching the spec's printed enumeration `7 · 8 · 22 · 3 · 6 = 46` at every one of its assertion sites (`:14`, `:33`, `:144`, `:148`, `:248`, `:294`, `:312`). No residual `42`/`54` accounting survives. The divergence from RULINGS R-12's literal *"44+12=56"* is **declared and arithmetically shown** (`:33`: the two ⟨this seat⟩ mints + the two R-9b prerequisite carries = 42 + 2 + 2 = 46) — R-12's figure predates the rows R-9b itself orders carried.

**Axis 1 verdict: CLEAN. 43 routed · 43 booked · 0 escaped.**

---

## §2 · NO INVENTION / M-25 DEPTH

### Positively verified this seat (re-derived, not inherited)

- **Pass-1 D-4 and D-6 are REFUTED at the bank.** `kf-LayerConfigPanel.md:41` reads, verbatim: *"**Rider (both readers' late finds, merged)**: `blendAvailable` = `animationGroup.singleTarget` (AnimationControlsGroup.vue:21) is the SAME untracked-read class, and `singleTarget` recomputes post-mount at group.ts:159/:201 — so **both operands** of the `:49` weight gate are stale-by-construction"*. The conjunction the spec quotes at C-3 leg (iii) **is** the bank's own, and `group.ts:201` **is** banked. The spec's re-probe note in §Bounds is correct and its separate citation of ruling 4 (`:25`) for the `:159-161` derivation is the right discipline. Both anchors additionally verify against product: at `81a56990`, `group.ts:159` = `this.singleTarget = animations.every(` and `group.ts:201` = `this.singleTarget = entries.every(` — exact.
- **Pass-1 D-5 is cured**: `KF-CB-15` is carried as C-3's fourth witness, verbatim, folded and never re-booked (`kf-CopyButton:60` ✓).
- **The R-9b prerequisite carries are verbatim.** `kf-LayerConfigPanel.md:52` (LP-7's ADMITTED rider) and `kf-MatrixEditor.md:67` (ME-32) read exactly as Arm 0 quotes them ✓.
- **G-TAX verifies exactly**: `grep -rn 'KF.W5-PARTIALS' registry/adjudicated/` → exactly **3** hits, all status-verb header prose (`kf-DemoGlobalChrome:17`, `kf-AnimationControlsGroup:17`, `kf-ControlsPaneWrapper:6`), **0** row hits ✓. Reciprocation at `KF-W6-CARRY.md:13` (*"KF.W5-PARTIALS ⇒ THIS WAVE (S-5 / S-6 / S-7, each re-homed by its bank)"*) ✓ verbatim.
- **`KF-W6-CARRY.md:12`** carries the quoted sentence verbatim ✓. **`KF-W7.md:56`** carries *"its `innerHTML` BLOCKER is KF.W5's, front-loaded, NOT gated here"* ✓ verbatim.
- **Library witnesses that ARE born-RED at the ref of record** (verified against `81a56990`, read-only): B-1 `applyA11y` guards `hasAttribute("role")` at `:216-217`, defaults `role = "img"` at `:237` ✓ · B-2 `el.replaceChildren(...)` `:166` **before** the `isLaidOut` check `:169` ✓ · B-3 unguarded `el.removeAttribute("aria-label")` `:323` ✓ · B-4 the docblock example passes `options: { delay }` while `AnimationGroupInput` `:27-30` offers only `layer?` ✓ · B-7 `respectReducedMotion = true` at `view-transition.ts:197` ✓ exact · B-10 `cssIdent` → 1 hit in `compile/emit/index.ts`, **0** in `public.ts`/`index.ts`/`load-engine.ts` ✓ · B-17 `enginePromise ??= import("./public")` ✓ · B-20 `export type InputAnimationOptions = Partial<{` at `types.ts:182` ✓ exact · B-21 the three `./scheduler` rot sites live at `entries.ts:16`, `group.ts:170`, `group.ts:264` ✓ exact (and `group.ts:27` already names `./yield-batch`, so **three** is the right cardinality) · C-1 `adoptCompiled` transplants the compiler and copies `anim.unflatten = source.unflatten` ✓ · C-2 `const result = step(now)` with no try/catch inside `_run` ✓ · D-1 all four LIGHT allowlist paths still dead ✓.
- **Vitest topology verified**: `81a56990:vitest.config.ts` declares projects `library` (`exclude: ["test/demo/**"]`) and `demo` (`include: ["test/demo/**/*.test.ts"]`); `package.json` has `test:lib = vitest run --project library`, `demo:correctness = node scripts/run-demo-roster.mjs`. The banked K1 mechanism is true, so **G-XSS's declared observability rider is honest** and its command shape is runnable. `test/demo/instrument/` already exists at the frontier ✓ — the R-9b-narrowed fixture directory is real.

### Defects on this axis

**D-7 (MINOR) — the repaired KF-W4 citation is still wrong, and it was inherited rather than re-derived.** The spec strikes *"KF-W4 §11 ¶1"* and replaces it with **`KF-W4.md:86-88`**, cited 3× (`:31`, `:287`, `:298`). Measured: `KF-W4.md` `:86` is blank, `:87` is `## §Carry`, `:88` is blank. R-1's heading is at **`:91`**; the quoted sentence — *"Census S-2's owner is hereby named: KF.W6 (Glass Suffusion), with KF.W10 taking any doc-authority addenda."* — is at **`:114`**. The wording is exact at `:114` ✓ and at `KF-W6-CARRY.md:12` ✓, so the substance holds; only the anchor is false. `:86-88` is the line range **pass-1's own D-7 asserted** — the repair seat carried a wrong anchor forward instead of re-deriving it, in the very sentence that lectures a predecessor for citing a section that does not exist.

**D-9 (MINOR) — two depcruise anchors have no authority, and one is wrong at the ref.** §Bounds Arm D cites `.dependency-cruiser.cjs` `:216-230` and `:233-248`. Neither appears in any adjudicated record nor in `formation/keyframes/lane-library.md` (which anchors only `:56-79`, `:82-85`, `:113`, `:120-128`, `:160`, `:200`) nor in `CENSUS-2026-08-03.md`. Against §Bounds' own law — *"Line anchors below are cited from the adjudicated registry records — this seat opened no product source"* — these two are unsourced, the exact class pass-1 charged at `group.ts:201` and which the bank there refuted. Worse, G-RING states *"the `no-cycle` comment states the real mechanism (`viaOnly.dependencyTypesNot` exempts type-only edges)"* and pins it at `:216-230`: at `81a56990`, `viaOnly` lives at **`:148-149`**; `:227` is a different rule's (`light-barrel-no-engine`) `dependencyTypesNot`.

**D-10 (MINOR) — the spec fails its own G-ID gate.** G-ID's printed command run against the spec returns **6 bare `KF-ES-n` occurrences** with no record qualifier in the cell — `:128` (*"the `control-label` role — KF-ES-20's witness"*), `:138`, `:169` (*"One motion with KF-ES-20"*), `:199`, `:271`, `:296` — plus **2 bare `L-2`** (`:3` *"the depcruise L-1/L-2 pair"*, `:241` *"L-2: `.dependency-cruiser-known-violations.json` …"*). Arm A's row asserts *"every id in this file is record-qualified"* and the gate's falsifier reads *"Fails on any bare `KF-ES-n` or bare `L-2`"*. Context disambiguates every site, which is why this is MINOR and not MAJOR — but a gate the file fails on its own probe is not a gate the file may cite as satisfied.

---

## §3 · GATES — born-RED with a REAL witness (L-19) — **THE FAILING AXIS**

**Twenty gates**, matching the preamble ✓. **L-19 proof-script contrivance: CLEAN** — no gate invokes a `proof:*` script; the single `proof:structure` mention (§0 R-2) is an obligation to *read the script's definition before quoting its figure*. Verified real at the frontier: `tsconfig.lib.json` ✓, `.dependency-cruiser.cjs` ✓, `.dependency-cruiser-known-violations.json` **absent** ✓, projects `library`/`demo` ✓, scripts `check`/`check:lib`/`lint`/`test:lib`/`build` ✓. **Pass-1 D-9 cured** (G-RING now spells `--config .dependency-cruiser.cjs`), **D-10 cured** (fixture marked `(**create**)`, `test/demo/instrument/` enumerated in §Disjointness), **D-2/D-3 cured** (LP-7 + ME-32 carried; OP-6 amended verbatim; the third rider declared — and **reciprocated at both ends**, verified at `KF-W4.md:144` row 3 and `KF-W4.md:190` G-KFW4-2 *"`npx vitest run --project demo` … as blocking steps of the CI merge job"*).

### The substrate finding — Arm D is authored on the ref the wave disqualifies

`KF-W5.md:8`: *"Local HEAD `8281638c` … is **DISQUALIFIED as witness substrate**."*
`formation/keyframes/lane-library.md:6`: *"**Substrate** branch `master`, HEAD `8281638c` …"*

Arm D (D-1…D-6) and G-RING/G-SHIM/G-STRUCT are authored **wholly** from `lane-library.md` — i.e. wholly from the disqualified ref. `git rev-list --count 8281638c..81a56990` = **41**. Three of those 41 commits are structural:

- `7e9ddf49 refactor(lib/structure): presets shim fold + isObject delete (W4, LT-09/LT-13 Batch 2)` — **deletes** `presets/{classic,spring,taxonomy}.ts`
- `1412ed8e refactor(lib/structure): stutter renames + kebab/transport-core fold (W4, LT-03/LT-10 Batch 1)`
- `53b907c5 refactor(lib/engine): carve engine/play-lifecycle — the 24 free functions module`

**D-1 (MAJOR) — Arm D is stale at the declared ref of record: 5 of its 6 rows.** D-1 (dead LIGHT allowlist) is the only row verified still RED at `81a56990`. D-2, D-4 are cured upstream; D-3, D-5, D-6 carry denominators the frontier has already moved. The spec's guards (*"Every anchor re-resolves at `origin/master` `81a56990` before any cure"*, SCH-7's *"re-verify at HEAD before speccing"*, G-BASIS's *"a count authored against `8281638c` is void"*) are the right instinct — but they are applied to the **counts**, not to the **existence of the defects**, and the wave demonstrates elsewhere that it knows how to do this correctly (B-14 books L·B-2 as *"both halves CURED at HEAD … design residue MAJOR"*). Arm D received no such treatment.

**D-2 (MAJOR) — G-SHIM is born GREEN.** Its command *is* its own pass condition and the condition already holds:
- `git ls-tree -r 81a56990 -- src/animation/presets` → **`catalog.ts`, `classic-data.ts`, `index.ts`** only. `classic.ts` / `spring.ts` / `taxonomy.ts` do **not exist** (`test -e … → absent ×3` is the gate's GREEN cell — already true).
- `git grep -c 'split by kind' 81a56990 -- src/` → **0 hits** (the gate's second GREEN cell — already true). The frontier docblock now reads *"The substance is `catalog.ts` … This barrel re-exports the full preset surface by name."*
- The cure verbatim — *"Delete the three shims, export from `catalog.ts` directly in `presets/index.ts`"* — has no bytes to delete. §Bounds' `modify + **delete ×3**` names three nonexistent files.

**D-3 (MAJOR) — G-DEPCRUISE's L-2 leg is cured upstream, and its oracle is inverted.** At `8281638c:.dependency-cruiser.cjs:120-128` the false comment is exactly as banked (*"…are recorded in the known-violations BASELINE (.dependency-cruiser-known-violations.json) so this rule greens on today's tree…"*). At `81a56990` that comment reads: *"There is **NO known-violations baseline**: the historical `.dependency-cruiser-known-violations.json` ratchet was never created and is not wired (`lint` is a bare `depcruise src`, no `--known-violations` flag). The invariant is a true acyclic runtime graph, **not a grandfathered floor**."* — which is, verbatim, D-2's own prescribed cure (*"the honest cure is deletion plus an explicit note that the rule greens on a real property, not a ratchet"*). The gate's GREEN condition is nevertheless `grep -c 'known-violations' .dependency-cruiser.cjs` → **0**; measured at the frontier it returns **3**, because the honest sentence must *name* the file to deny it. A seat driving this gate to GREEN deletes a true statement — the opposite of the row's cure. (D-1's leg survives untouched and RED ✓.)

**D-4 (MAJOR) — G-BASIS's B0 probe returns `0`.** Run as written at the keyframes repo:
```
$ git ls-files -z -- 'src/**/*.ts' | tr -d '\0' | wc -l
0
$ git ls-files -z -- 'src/**/*.ts' | tr '\0' '\n' | grep -c .
139
```
`tr -d '\0'` **deletes** the separators, collapsing the list into one unterminated line; `wc -l` then counts zero. The correct probe yields **139** — which is precisely the figure R-2's reconciliation table demotes as X-4's *"stale checkout, probe unstated"*, while `find src -type f -name '*.ts' | wc -l` yields **145**, the lane's figure. The wave's flagship gate — *"Fails on any average, any '≈', or **any figure quoted without its probe**"* — is the one place a figure is quoted with a probe that cannot produce it, and the two rivals it exists to reconcile differ by exactly the tracked-vs-untracked delta the broken probe was meant to settle.

**D-5 (MAJOR) — five §Bounds/§Disjointness paths do not exist at the ref of record; one exists at no ref.** Verified by `git cat-file -e 81a56990:<path>`:

| §Bounds path | at `81a56990` | frontier reality |
|---|---|---|
| `src/animation/engine/play-lifecycle.ts` (`modify-carve`, 482 L god module, `:337-341`) | **MISSING** | now a directory: `play-lifecycle/{events,frame,index,strategies,transport}.ts` (carved at `53b907c5`) |
| `src/animation/compile/emit/backward.ts` (`modify-carve`, `:245-275`, `:352-`) | **MISSING** | `compile/emit/backward/backward.ts` |
| `src/animation/compile/emit/backward-walk.ts` (`read`, `:131`/`:145`) | **MISSING** | `compile/emit/backward/walk.ts` |
| `src/animation/engine/css/css-animation.ts` (`modify-carve`) | **MISSING** | `engine/css/animation.ts` (`usesDefaultRenderer` + `resolveTransform` both live there ✓) |
| `src/animation/internal/yield-batch.ts` (`read`) | **MISSING at both refs** | the module is `src/animation/group/yield-batch.ts`; a *different*, real `internal/scheduler.ts` exists |

The fourth is not a stray: **§Disjointness gives `.d` "exactly three files"** — `compile-bridge.ts`, `engine/css/css-animation.ts`, `physics/playback.ts` — and one of the three is a path that does not exist. The fifth is worse than stale: `internal/yield-batch.ts` is a coordinate invented by this spec (the bank says only *"the module is `yield-batch.ts`"*), and B-21's cure is to rewrite three comments to name it — i.e. the cure as pathed would re-commit the defect it repairs, while `internal/scheduler.ts` genuinely exists to be confused with it.

**D-6 (MAJOR) — G-STRUCT's two denominators are stale at the ref of record.** Of the 11 stutter paths §Bounds names, **3 are already renamed** at `81a56990` (`compile/easing/easing-option` → `easing/option.ts`; `engine/css/css-animation` → `css/animation.ts`; `waapi/waapi-options` → `waapi/options.ts`, all at `1412ed8e`); the other 8 verify present ✓. Of the 9 god modules, **2 do not exist** (`play-lifecycle.ts`, `frame-compiler.ts` → `compile/frame/`); the other 7 verify **exactly**: `progress.ts` 484 · `animation.ts` 478 · `draggable.ts` 470 · `cssom.ts` 466 · `entry.ts` 459 · `classic-data.ts` 458 · `group.ts` 437. G-STRUCT declares *"**Fails on a 16-of-18 predicate**"* and *"this gate's denominator is the 16, entire and this wave's"* — and RULINGS **R-14** subordinates KF.W8's G13 to that 16 as a cross-wave ruling. The subordination is now founded on a count the frontier has already reduced. (Related, unmeasured but implied: G-RING's *"17 rings · engine core 7, all through `engine/animation.ts`"* is a graph measurement of an engine zone that `53b907c5` and `eb4379ca` restructured.)

**D-11 (MINOR) — a residual shared-prefix glob in Arm B, and nine specs homed off-tree.** §Bounds Arm B still carries `test/**/split-text.test.ts` · `split-a11y-oracle.test.ts` — the exact X.P.W3 §4a hazard §Disjointness cites against itself and which R-9b item 4 cured for Arm 0 only. The real paths are enumerable: `test/orchestration/split-text.test.ts` and `test/orchestration/split-a11y-oracle.test.ts` (verified at `81a56990`). Separately, all nine created specs are homed at **`test/animation/**`**, a directory that exists in no ref of a test tree that mirrors the src zones (`test/orchestration/`, `test/group/`, `test/engine/`, `test/physics/`, `test/compile/`, `test/waapi/`, …); G-ROLE/G-REFUSE/G-REVERT's subjects belong beside the specs they extend.

---

## §4 · E-3 + STATUS

| check | result |
|---|---|
| zero `VERIFIED` stamps | **PASS** — the only occurrences are `\| VERIFIED \| NO \|` (`:16`, a declaration of *not* verified) and `RE-VERIFIED`/`verified` describing bank-side or authoring-time probes |
| status `planned` everywhere | **PASS** — `:6` *"**Status**: **planned**. No product byte written; nothing opened keyframes.js source for writing; execution awaits the owner's begin-word"*; `:312` closes on *"every status field `planned`"* |
| `IMPLEMENTED \| NO` | **PASS** |
| no execution verbs in current voice | **PASS** — all cure language is `lands as` / `cure =` / `the RULING lands first`; past tense refers only to upstream keyframes.js work or to authoring-time greps |
| E-3 (registry amended only by addenda) | **PASS** — the spec writes no registry byte; RD-1…RD-4 are relayed to SS-1/SS-2, not applied |
| no product source written | **PASS** — though two anchors (D-9) are sourced from neither the registry nor the lanes |

**Axis 4 verdict: CLEAN.**

---

## §5 · POSTURE

| axis | finding |
|---|---|
| **KF.W4 declared sequencing head** | **HONOURED.** The exemption is narrow, stated and now *true*: nineteen `src/`-side gates run under today's instruments; the twentieth (G-XSS) declares its observability dependency verbatim per R-9b and the edge is reciprocated at the far end (`KF-W4.md:144` row 3 ≡ ME-32 ≡ LP-7 rider; `KF-W4.md:190` G-KFW4-2 = `npx vitest run --project demo` as a blocking merge step). Pass-1's D-2/D-3 are fully discharged. |
| **KF.W3 GATED, never scheduled** | **HONOURED.** §Sequencing declares FORWARD-ONLY with *"This wave must NOT pre-empt the 4.0.0→4.1.x repin"*; B-12 declares the `/css` static-graph arm a KF.W3 **scoping input, not taken**; B-16 pre-declares both OP-4 dispositions so the row cannot be lost either way; Do-NOT-touch reserves `css-text.ts` and `ingest/cssom.ts` **cures** to KF.W2/W3; G-STRUCT restates the `cssom.ts` boundary as *"declared, not taken"*. No gate, bound or cure touches the gated surface. |
| **KF-AV-28 standing rider** | **NOT REQUIRED, correctly absent.** RULINGS R-10 names six specs that carry governed rows and drop the rider — KF-W2/W3/W4/W6/W9/W10 — and **KF-W5 is not among them**. Independently confirmed: `grep -c 'AnimationVisualizer\|PlaybackRibbon\|SequenceScrubber'` over `KF-W5.md` → **0**; no row this wave cures is banked under a KF.W7-evaluated surface (the one adjacent citation, LP-1's `AnimationControlsGroup.vue:21`, belongs to OPTIONS-UNIT and is routed away). The KF.W7 edge is otherwise clean: KAD-13 goes WHOLE to KF.W7 (reciprocated ×2 ✓) and KF-SKEL-16's Skeleton half is folded, not re-booked. |
| **pass-1 rulings addressed to KF-W5** | **R-9b: APPLIED, all four items** (LP-7 + ME-32 carried as Arm 0 rows with the banked text verbatim; the third rider declared at §Sequencing and reciprocated; OP-6 amended with R-9b item 3's sentence **word-for-word**; the fixture marked `(**create**)`, `test/demo/instrument/` enumerated, the `test/**` glob narrowed). **R-12: APPLIED** (the SS-1 CARRY ledger and the `X/kf/waves/KF.W5.md` target struck; provenance re-founded on the 58-record registry; the recount landed — at 46, with the +2 over R-12's literal 44 shown as arithmetic). **R-14: APPLIED** (D-6's addendum sentence is verbatim; §Sequencing's KF.W8 edge restated as decline-whole; G-STRUCT's denominator declared — see D-6 for the count problem, which is not a ruling breach). |

**D-8 (MINOR) — the §Excluded reciprocation figure is false on re-run.** `:296` prints: *"The **ten** routed to KF.W6 … **return 0 hits in both `waves/KF-W6.md` and `carry/KF-W6-CARRY.md`** (substring-counted 2026-08-28; controls KAD-1 = 12/12, KAD-3 = 2/1, KF-AT-8 = 2/4 prove the instrument sound)."* Re-run today (`grep -o | wc -l`): all ten now return **1–3 occurrences in `waves/KF-W6.md`** — KF-SS-4=2 · KF-SS-6=1 · KF-SS-31=1 · KF-SS-38=1 · KF-ET-33=2 · KF-ET-35=2 · KF-ES-36=2 · KF-SKEL-9=3 · KF-SKEL-20=1 · KAD-17=1 — and 0 in the CARRY. Controls drift too: KAD-1 = 12 CARRY / **16** spec (printed 12/12), KF-AT-8 = 2 / **5** (printed 2/4). R-19a's receiving-end cure has landed in KF-W6's spec and not yet in the CARRY; the printed figure now **understates** the seam's health. The mechanism worked exactly as the spec designed it (a probe printed so the next seat can re-run it) — but the sentence as it stands is false, and it is the sentence a reader would use to judge the seam.

**D-12 (MINOR) — the bounds-correction's own enumeration is wrong by three.** `:5` prints the waves directory as holding *"`KF-W0.md`, `KF-W2.md`, `KF-W3.md`, `KF-W4.md`, `KF-W7.md`, `KF-W8.md`, `KF-W10.md` — plus `carry/KF-W6-CARRY.md`"*. `ls` returns eleven specs: the list omits **`KF-W1.md`, `KF-W6.md`, `KF-W9.md`** — and the spec itself substring-counts `waves/KF-W6.md` at `:296`. A bounds correction that stands *"on its own measurement"* prints a directory listing that is short by three.

**D-13 (INFO) — R-15 drift, no directive owed.** §Sequencing `:280` still reads *"cube + square at the proposed **KF.W11**; dock-menu at the proposed **KF.W13** — **SS-1/SS-2 must mint W11 and W13**"*. RULINGS R-15 homes the minting at **KF-W4** (§Sequencing, *"minting KF.W13 explicitly"*) over a canonical **17**-packet roster. No W5-side directive was issued and the substance is unchanged; recorded so the next seat does not re-file it as an escape.

---

## §6 · DEFECT REGISTER (worst first)

| # | sev | defect | receipt |
|---|---|---|---|
| **D-1** | **MAJOR** | Arm D is authored wholly on `8281638c` — the ref `:8` **disqualifies as witness substrate** — and 5 of its 6 rows are stale or discharged at the pinned `81a56990`. | `lane-library.md:6` substrate = `8281638c` vs `KF-W5.md:8` DISQUALIFIED · `git rev-list --count 8281638c..81a56990` = **41** · `7e9ddf49` (shim delete) · `1412ed8e` (stutter renames) · `53b907c5` (play-lifecycle carve). Only D-1's four dead LIGHT paths verify still RED. |
| **D-2** | **MAJOR** | **G-SHIM is born GREEN**: both of its own pass conditions already hold at the ref of record, and the cure has no bytes to delete. | `git ls-tree -r 81a56990 -- src/animation/presets` → catalog · classic-data · index **only** · `git grep -c 'split by kind' 81a56990 -- src/` → **0** · §Bounds `:113` names `delete ×3` over three nonexistent files. |
| **D-3** | **MAJOR** | G-DEPCRUISE's L-2 leg is cured upstream **verbatim as prescribed**, and its GREEN oracle is inverted — the honest comment must name the file to deny it. | `81a56990:.dependency-cruiser.cjs:124-131` *"There is NO known-violations baseline … not a grandfathered floor"* vs `8281638c:120-128` (the banked false text) · gate demands `grep -c 'known-violations' → 0`; measured → **3**. |
| **D-4** | **MAJOR** | **G-BASIS's B0 probe returns `0`.** `tr -d '\0'` strips separators into one unterminated line. | measured: `git ls-files -z -- 'src/**/*.ts' \| tr -d '\0' \| wc -l` → **0**; `tr '\0' '\n'` → **139**; `find src -type f -name '*.ts' \| wc -l` → **145**. KF-W5 `:37`, `:245`. |
| **D-5** | **MAJOR** | Five §Bounds paths missing at the ref of record — incl. one of `.d`'s "exactly three" (`engine/css/css-animation.ts`) — and `internal/yield-batch.ts`, which exists at **no** ref. | `git cat-file -e 81a56990:…` → MISSING ×5 (`play-lifecycle.ts` · `emit/backward.ts` · `emit/backward-walk.ts` · `css/css-animation.ts` · `internal/yield-batch.ts`); real homes `play-lifecycle/`, `emit/backward/{backward,walk}.ts`, `css/animation.ts`, `group/yield-batch.ts`. KF-W5 `:79-104`, `:138`. |
| **D-6** | **MAJOR** | G-STRUCT's denominators are stale: **3 of 11** named stutters already renamed, **2 of 9** god modules nonexistent — and R-14 subordinates KF.W8's G13 to that 16. | MISSING at `81a56990`: `compile/easing/easing-option`, `engine/css/css-animation`, `waapi/waapi-options` (`1412ed8e`); `play-lifecycle.ts`, `frame-compiler.ts`. The other 7 line counts verify exactly (484/478/470/466/459/458/437). |
| **D-7** | MINOR | The repaired KF-W4 citation `:86-88` is still wrong — and was inherited from pass-1 rather than re-derived. R-1's heading is `:91`; the quoted sentence is `:114`. | `sed -n '86,88p' KF-W4.md` → blank / `## §Carry` / blank · `grep -n '\*\*R-1' KF-W4.md` → `:91` · sentence at `:114` ✓ verbatim · cited 3× at KF-W5 `:31`, `:287`, `:298`. |
| **D-8** | MINOR | The §Excluded reciprocation figure is false on same-day re-run: the ten now return 1–3 hits each in `waves/KF-W6.md` (0 only in the CARRY); controls drift 12/12→12/16 and 2/4→2/5. | `grep -o \| wc -l` over `waves/KF-W6.md`: KF-SS-4=2 · KF-SS-6=1 · KF-SS-31=1 · KF-SS-38=1 · KF-ET-33=2 · KF-ET-35=2 · KF-ES-36=2 · KF-SKEL-9=3 · KF-SKEL-20=1 · KAD-17=1. KF-W5 `:296`. |
| **D-9** | MINOR | `.dependency-cruiser.cjs:216-230` and `:233-248` have zero provenance in the registry or the lanes, against §Bounds' own citation law; and `viaOnly` is at `:148-149`, not `:216-230`. | `grep -rn ':216\|:233' lane-library.md CENSUS-2026-08-03.md` → 0 · `81a56990:.dependency-cruiser.cjs` `viaOnly` at `:148` · KF-W5 `:111`, `:242`. |
| **D-10** | MINOR | The spec fails its own G-ID gate: 6 bare `KF-ES-n` + 2 bare `L-2` against *"every id in this file is record-qualified"*. | KF-W5 `:128`, `:138`, `:169`, `:199`, `:271`, `:296` (bare `KF-ES-20`/`KF-ES-36`); `:3`, `:241` (bare `L-2`); gate at `:246`. |
| **D-11** | MINOR | Residual shared-prefix glob `test/**/split-text.test.ts` in Arm B (R-9b cured only Arm 0's), and nine created specs homed at `test/animation/**`, a directory in no ref of a zone-mirroring test tree. | `git ls-tree 81a56990 -- test/` → `orchestration/`, `group/`, `engine/`, `physics/`, `compile/`, `waapi/`, … (no `animation/`); real files `test/orchestration/split-text.test.ts`, `…/split-a11y-oracle.test.ts`. KF-W5 `:76`, `:97`, `:138`. |
| **D-12** | MINOR | The bounds correction's own directory enumeration omits `KF-W1.md`, `KF-W6.md`, `KF-W9.md` — three of eleven — while the file substring-counts `waves/KF-W6.md` elsewhere. | `ls waves/` → 11 specs · KF-W5 `:5` lists 7 · KF-W5 `:296` cites `waves/KF-W6.md`. |
| **D-13** | INFO | R-15 drift: *"SS-1/SS-2 must mint W11 and W13"* while R-15 homes the minting at KF-W4 over a canonical 17-packet roster. No W5-side directive owed. | KF-W5 `:280` vs `RULINGS.md` R-15. |

---

## §7 · WHAT PASS 2 CONFIRMS (so pass 3 does not re-litigate it)

1. **The census is airtight, twice.** 43 routed ids re-derived independently from the 58 records; 43 booked; **0 escapes**. The 30/13 split, the 27-rows-carry-30-ids fold arithmetic, and the 46-row §Carry count all verify by machine.
2. **Pass 1's three MAJORs are cured, and two of its MINORs are refuted by the bank.** D-1 (the 42/44 slip) is recounted with a re-runnable probe; D-2/D-3 (G-XSS observability + the uncarried rider) are discharged verbatim per R-9b with the edge declared at **both** ends; D-8's ruling is executed at the receiving end. D-4 and D-6 were wrong: `kf-LayerConfigPanel.md:41` banks the conjunction *and* `group.ts:201`, and both anchors verify against product bytes.
3. **The library arm (Arm B) and the engine seam (Arm C) are genuinely born-RED at the ref of record.** Twelve witnesses spot-checked against `81a56990` bytes, twelve confirmed — including the three that matter most (`cssIdent` unpublished; `replaceChildren` before the refusal; `step(now)` untried/uncaught).
4. **The gated-wave posture is exemplary.** Nothing pre-empts KF.W3's PLAW-BIND repin; the KF-AV-28 rider is correctly absent (no governed row is cured here, and R-10 does not name this wave).
5. **The failure is one axis, one substrate.** Every MAJOR in this pass traces to a single root: the structural arm inherited its facts from a lane that measured the ref this wave itself disqualifies, and no row re-asked *"is this still true at `81a56990`?"* The cure is mechanical — re-run Arm D's six rows and G-BASIS's probe at the pinned ref before a byte is written — and the wave already contains the discipline it needs (B-14's *"CURED at HEAD … design residue MAJOR"* is the template).

---

## §8 · MINIMAL REPAIR SET (for the authoring seat, pass 3)

1. **D-1/D-2/D-3/D-6**: re-run Arm D at `81a56990`. Book D-4 as **CURED-AT-FRONTIER** (`7e9ddf49`) and strike G-SHIM or re-cut it as a regression floor; book D-2's comment leg as **CURED-AT-FRONTIER** and replace G-DEPCRUISE's inverted `grep 'known-violations' → 0` with an assertion that the comment's claim matches the config (no `knownViolations` key ∧ no `--known-violations` flag); re-measure the stutter and god-module denominators and restate G-STRUCT's number (and tell R-14's subordination clause the new figure). D-1's four dead LIGHT paths survive unchanged — say so with the receipt.
2. **D-4**: fix the probe — `git ls-files -z -- 'src/**/*.ts' | tr '\0' '\n' | grep -c .` (or drop `-z` entirely) — and re-run the five-basis reconciliation against the corrected B0; note that the corrected tracked count reproduces **139**, and that `145 − 139` is the untracked delta the table was built to explain.
3. **D-5/D-11**: re-path §Bounds and §Disjointness at the ref of record — `engine/play-lifecycle/**`, `compile/emit/backward/{backward,walk}.ts`, `engine/css/animation.ts` (the `.d` triple), `group/yield-batch.ts` (never `internal/`); enumerate `test/orchestration/{split-text,split-a11y-oracle}.test.ts` and home the created specs in the zone directories the tree actually uses.
4. **D-7/D-9/D-10/D-12**: re-cite KF-W4's R-1 as `KF-W4.md:91` (text at `:114`); source or strike `.dependency-cruiser.cjs:216-230`/`:233-248` and re-anchor `viaOnly` at `:148-149`; record-qualify the six bare `KF-ES-n` and two bare `L-2` sites; print the waves directory whole.
5. **D-8**: re-run the reciprocation probe at repair time and print the new counts — the ten are now booked in `waves/KF-W6.md` and remain absent from the CARRY, which is the state R-19a's second half still owes.

---

**Local verdict: DEFECTIVE** (6 MAJOR · 6 MINOR · 1 INFO). Census CLEAN (43/43/0). E-3, STATUS and posture CLEAN. All three assigned rulings applied, two of them verbatim. The wave now knows exactly which rows it carries and why; what it does not yet know is which of them the frontier already fixed.

*Pass-2 adversarial seat, 2026-08-28. Sole write = this file. Nothing here stamps any wave; no product byte written; no registry byte written.*
