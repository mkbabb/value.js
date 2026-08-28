# KF-W5 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 1)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W5.md` (307 lines)
**Corpus authority**: the 58 `kf-*.md` records in `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/`
**Secondary authorities consulted** (only where the spec's own AUDITED row names them): `formation/keyframes/CENSUS-2026-08-03.md`, `formation/keyframes/lane-library.md`, `audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md`, `audit/codex-provenance/intakes/lane-keyframes-b10-b21.md`, sibling specs `KF-W4.md` / `KF-W6.md` / `KF-W7.md`, `carry/KF-W6-CARRY.md`.
**Date**: 2026-08-28 · **Seat**: fresh adversarial, pass 1 · **Sole write**: this file. Zero product source opened; zero registry byte written.

**VERDICT: DEFECTIVE** — the ID-keyed census is CLEAN (0 escapes, 43/43 routed ids carried), and E-3/STATUS is CLEAN. Three MAJOR defects and eight MINOR/INFO defects sit on the invention, gate-witness, and reciprocation axes. The wave is *nearly* conformant; nothing found here impeaches its scope ruling or its provenance discipline, which are unusually strong.

---

## §1 · ID-KEYED CENSUS (the X·P terminal method)

**Method.** `grep -n 'W5'` over all 58 records (exhaustive for the string), then structured extraction of every table cell and prose bullet containing it, then per-hit adjudication of *routing* vs *ledger reference*. Two false positives struck by inspection: `kf-OrbitalDrag:82` OD-34 (`P.W5.S3` — a tranche-P ledger token in the narrated comment census) and `kf-SquareInstrument:21` (`R.W5` — a git commit's tranche label). Three records carry the string in a **routing-law preamble only** with zero rows attached (`kf-HeroAurora:32`, and the `Routing law:` lines in the 16 routing records). Cross-check for routings phrased *without* the token (`tri-fold`, `library letter`, `library arm`, `library half`, `D/L/C`) returned no additional routings.

### Records that route at least one row to KF.W5 — **16** (the true set)

`kf-AnimatedText` · `kf-App.skeleton` · `kf-CopyButton` · `kf-EasingScene` · `kf-EasingSidebar` · `kf-EasingTarget` · `kf-EditorStartScreen` · `kf-KeyframeCard` · `kf-KeyframesAddDialog` · `kf-KeyframesEditor` · `kf-KeyframesStringControls` · `kf-SpringPhysicsFacet` · `kf-SpringScene` · `kf-TimelineHoverPreview` · `kf-TimingFunctionPanel` · `kf-TypingDots`

> **Note for D-8 below**: the spec's AUDITED row names a *different* 16 — it includes `kf-SquareScene` and `kf-ChannelOptions` (`grep -c 'W5'` = **0** in both; they route nothing here and are homed by R-1's ruling, which the spec states correctly elsewhere) and omits `kf-TimelineHoverPreview` (which does route, at `:85`).

### The 43 routed row ids, id-for-id

| # | id | record : line | registry routing (verbatim fragment) | spec disposition | state |
|---|---|---|---|---|---|
| 1 | **KF-AT-8** | kf-AnimatedText:43 | "**KF.W5** (library tri-fold pre-seeded roster row)" | §Carry B-1 → G-ROLE | **BOOKED** |
| 2 | **KF-AT-9** | kf-AnimatedText:44 | "**KF.W5** — with KF-AT-8" | §Carry B-2 → G-REFUSE | **BOOKED** |
| 3 | **KF-AT-12** | kf-AnimatedText:52 | "**KF.W4** refinement fold … + KF.W5 premise" | §Carry Arm A (PREMISE row); cure NOT re-booked | **BOOKED** |
| 4 | **KF-AT-23** | kf-AnimatedText:63 | "**KF.W5** (library roster, with KF-AT-8/-9)" | §Carry B-3 → G-REVERT | **BOOKED** |
| 5 | **KF-SKEL-9** | kf-App.skeleton:44 | "**KF.W5** — folds to those components' own tri-fold rosters" | §Excluded 2 → KF.W6 (emitters are `.vue`; KF-AT-12 premise) | **BOOKED (excluded, reasoned)** |
| 6 | **KF-SKEL-16** | kf-App.skeleton:56 | "KF.W5 (folds to those components' rosters)" | §Excluded 3 → KF.W6; geometry half → KF.W7 | **BOOKED (excluded, reasoned)** |
| 7 | **KF-SKEL-20** | kf-App.skeleton:60 | "KF.W5 (EditorShell's roster)" | §Excluded 4 → KF.W6 | **BOOKED (excluded, reasoned)** |
| 8 | **KF-CB-30** | kf-CopyButton:31,:78 | "routed as a library letter (KF.W5)" | §Carry B-19; dissent preserved verbatim | **BOOKED** |
| 9 | **KF-CB-35** | kf-CopyButton:83 | "→ **KF.W5** free win" | §Carry B-20; `:182`-only split vs KF.W4's `:195` declared | **BOOKED** |
| 10 | **KF-CB-36** | kf-CopyButton:84 | "→ **KF.W5** prose sweep" | §Carry B-21 (library prose); demo half → §Excluded | **BOOKED** |
| 11 | **KF-ES-36** | kf-EasingScene:78 | "the prose sweep (KF.W5) gains both sites" | §Excluded 1 → KF.W6; G-ID-qualified (NOT Sidebar's namespace) | **BOOKED (excluded, reasoned)** |
| 12 | **KF-ES-20** | kf-EasingSidebar:61 | "→ **KF.W5** (census-truth arm, with the KF-ET-27/S-10 precedent)" | §Carry Arm A; byte cure rides KF.W6 | **BOOKED** |
| 13 | **KF-ET-1** | kf-EasingTarget:37 | "Rider letters → KF.W5: … lossless timing-function serializer twin … `easing()`'s analytic-first resolution order documented in the `.d.ts`" | §Carry B-22 — riders only, verbatim; row stays NO-WAVE-OWNER, KF-ET-2 cure-lock carried | **BOOKED** |
| 14 | **KF-ET-27** | kf-EasingTarget:69 | "C's proposed **S-10 census arm** … is ADOPTED as a KF.W5 input" | §Carry Arm A (census-truth arm) | **BOOKED** |
| 15 | **KF-ET-32** | kf-EasingTarget:77 | "**KF.W5 letter**, expose the registry off `loadAnimationEngine()`"; "→ **KF.W5** letters" | §Carry B-12 → G-CSSIDENT leg 3; BH-relay + KF.W3 arms explicitly NOT carried | **BOOKED** |
| 16 | **KF-ET-33** | kf-EasingTarget:78 | census S-2 class → KF.W5 sweep | §Excluded 1 → KF.W6 | **BOOKED (excluded, reasoned)** |
| 17 | **KF-ET-35** | kf-EasingTarget:80 | "→ **KF.W5** sweep" | §Excluded 1 → KF.W6 | **BOOKED (excluded, reasoned)** |
| 18 | **KF-EST-5** | kf-EditorStartScreen:62 | "Library arm … → **KF.W5** pre-seeded tri-fold rows" | §Carry B-4 → G-STAGGER-DOC leg 1; severance NOT un-severed | **BOOKED** |
| 19 | **KF-EST-17** | kf-EditorStartScreen:79 | "the memoized-rejection design question → **KF.W5**" | §Carry B-17; KF-SKEL-5 kinship + K2 phrasing correction carried | **BOOKED** |
| 20 | **P-8** | kf-EditorStartScreen:136 | "**P-8 · The group-rewrite viability TEST** (KF-EST-5, → KF.W5, not a browser probe)" | G-STAGGER-DOC leg 2, inside B-4; "static/unit, NOT a browser probe" carried | **BOOKED** |
| 21 | **KF-KC-27** | kf-KeyframeCard:69 | "the default-inversion letter rides **KF.W5**" | §Carry B-7; row stays NO-WAVE-OWNER; KF-CB-6 folded | **BOOKED** |
| 22 | **KAD-1** | kf-KeyframesAddDialog:42 | BLOCKER, dialog roster → W5 (per :38 taxonomy) | §Carry Arm 0 → G-XSS; S-0 front-load | **BOOKED** |
| 23 | **KAD-2** | kf-KeyframesAddDialog:46 | same sink, booked separately by design | §Carry Arm 0 → G-XSS leg 2; ids explicitly not collapsed | **BOOKED** |
| 24 | **KAD-3** | kf-KeyframesAddDialog:47 | composable/component split | §Carry Arm 0 (composable arm); component arm → KF.W6 (`KF-W6-CARRY.md:248` ✓ verified) | **BOOKED** |
| 25 | **KAD-5** | kf-KeyframesAddDialog:49 | composable/SFC split | §Carry Arm 0 (composable arm); SFC promises → §Excluded 6 | **BOOKED** |
| 26 | **KAD-13** | kf-KeyframesAddDialog:57 | record routes "KF.W7 / KF.W5" | §Excluded 5 → KF.W7 WHOLE; **reciprocated** (`KF-W7.md`, 2 hits) | **BOOKED (excluded, reasoned)** |
| 27 | **KAD-14** | kf-KeyframesAddDialog:67 | highlight-machinery cluster | §Carry Arm 0 (a,b,d,e); (c) → §Excluded 6 | **BOOKED** |
| 28 | **KAD-17** | kf-KeyframesAddDialog:70 | record routes "KF.W5/W6" | §Excluded 6 → KF.W6 WHOLE (all four sites SFC-side) | **BOOKED (excluded, reasoned)** |
| 29 | **KF-KE-10** | kf-KeyframesEditor:52 | "deserves a library letter (**KF.W5**: replace-or-document)" | §Carry B-9 → G-FROMSTRING; §0 R-3 rules severity, dissent preserved | **BOOKED** |
| 30 | **SPF-20** | kf-SpringPhysicsFacet:60 | "→ **KFED-UNIT** … + **KF.W5** (library letter …)" | §Carry B-9 as **witness ×2**, folded not re-booked | **BOOKED (fold-identity)** |
| 31 | **N-8** | kf-KeyframesStringControls:55 | "library half (publish `cssIdent`) → **KF.W5**" | §Carry B-10 → G-CSSIDENT | **BOOKED** |
| 32 | **C-8** | kf-KeyframesStringControls:55,:81 | "alongside C-8"; the four deep-path names | §Carry B-11 → G-CSSIDENT leg 2 | **BOOKED** |
| 33 | **KF-SS-4** | kf-SpringScene:43,:151 | "**KF.W5**: … KF-SS-4's typography family" | §Excluded 1 → KF.W6; **RD-3 rules the family's home**; KF-ES-8 identity preserved | **BOOKED (excluded, reasoned)** |
| 34 | **KF-SS-6** | kf-SpringScene:45,:151 | "**KF.W5**: the prose sweeps — KF-SS-6 …" | §Excluded 1 → KF.W6; token-lane pairing lock carried | **BOOKED (excluded, reasoned)** |
| 35 | **KF-SS-31** | kf-SpringScene:77,:151 | same | §Excluded 1 → KF.W6; seat census re-pin carried | **BOOKED (excluded, reasoned)** |
| 36 | **KF-SS-38** | kf-SpringScene:151 | same | §Excluded 1 → KF.W6; **POST-KILL RESIDUE ONLY** lock carried | **BOOKED (excluded, reasoned)** |
| 37 | **C-8 (Skeleton half)** | kf-TimelineHoverPreview:85 | "**C-8's Skeleton half ≡ banked kf-App.skeleton KF-SKEL-16** (KF.W5 …)" | §Excluded 3 — folded to KF-SKEL-16, witness ×2, never re-booked | **BOOKED (fold-identity)** |
| 38 | **KF-TFP-21** | kf-TimingFunctionPanel:64 | reader-2 M-2 ADMITTED → W5 roster | §Carry B-13 → G-OPTSET (ONE letter, do not split) | **BOOKED** |
| 39 | **KF-TFP-27** | kf-TimingFunctionPanel:73 | reader-2 M-3 ADMITTED, bound to -21 explicitly | §Carry B-13, bound not split; S+3 provenance carried | **BOOKED** |
| 40 | **KF-TD-1** | kf-TypingDots:57 | "**KF.W5** (the live-flip design decision + the docblock comment-truth cure)" | §Carry B-6 → G-PRM-FLIP; KF-EST-11 rider link + P-9→KF.W9 carried | **BOOKED** |
| 41 | **KF-TD-5** | kf-TypingDots:61 | "**KF.W5** — a library RULING … then the fix follows the ruling" | §Carry B-8 → G-DELAY; RULE-BEFORE-FIX carried | **BOOKED** |
| 42 | **KF-TD-8** | kf-TypingDots:64 | "the densify-cost design question rides **KF.W5**" | §Carry B-18 (design question only); magnitude → KF.W9 | **BOOKED** |
| 43 | **S★-2** | kf-TypingDots:88 | "**Lift into the KF.W5 wave record.**" (verified verbatim) | §Carry B-5 — lifted, carried beside B-4 | **BOOKED** |

Also routed at `kf-TypingDots:39` / `:46` as **witness ×2** cells for `KF-EST-5` and `KF-EST-17` (same identities as #18/#19, correctly deduped by the spec, not double-counted here).

### Non-registry routings the spec also carries (out of the 43, listed for completeness)

| id | source | routing | spec disposition | state |
|---|---|---|---|---|
| **X-4 / C-6** | `intakes/lane-keyframes-b10-b21.md:76`; `INTAKE-ADJUDICATION:114`; `§3:155-157` | "**CARRY-TO-WAVE KF.W5**"; "CONFLICT UNRESOLVED → CARRIED (KF.W5)" | Arm A + §0 R-2 → G-BASIS; verbatim ask honoured, extended to five bases | **BOOKED** |
| **B10-21** | `intakes:108`; `INTAKE-ADJUDICATION §3:155-157` | "control-coverage ratio as the shape of per-component coverage" | Arm A — ratio SHAPE adopted, Codex numbers re-measured; X-5 lock carried | **BOOKED** |
| **KF.W5-PARTIALS (S-5/S-6/S-7)** | `kf-AnimationControlsGroup:17`, `kf-ControlsPaneWrapper:6`, `kf-DemoGlobalChrome:17` | superseded `lane-frontend §10` taxonomy | Arm A **G-TAX** — annotated SUPERSEDED; ruled KF.W6's, reciprocated at `KF-W6-CARRY.md:13` ✓ | **BOOKED** |

**G-TAX independently verified**: `grep -rn 'KF.W5-PARTIALS' registry/adjudicated/` → exactly **3** hits, all header prose, **0** row hits. The spec's claim is exact.

### CENSUS RESULT

| metric | value |
|---|---|
| routed adjudicated row ids (registry, 58 records) | **43** |
| booked (as a §Carry row, a named fold-identity, or an exclusion-with-reason) | **43** |
| **escaped (in neither table)** | **0** |
| of which: §Carry rows | 30 |
| of which: §Excluded re-homes with named destination | 12 |
| of which: fold-identities (SPF-20 ≡ KF-KE-10; THP C-8 ≡ KF-SKEL-16) | 2 (counted above) |
| false-positive `W5` hits struck | 2 (OD-34 `P.W5.S3`; kf-SquareInstrument `R.W5`) |

**Axis 1 verdict: CLEAN.** No routed id escapes. Every re-home names a destination and a mechanism. The KAD family's seven-row span (which the spec re-counts against the CARRY gate's "17") is correct: KAD-1/2/3/5/13/14/17 = 7.

---

## §2 · NO INVENTION (M-25: locks, riders and dissents CARRIED, not cited)

### What holds (positively verified)

- **Arm A provenance is exact.** `intakes:76` (X-4 "CARRY-TO-WAVE KF.W5", the verbatim ask), `intakes:108` (B10-21, `26/140` → `39 + 114 = 153` leaves), `intakes:245`, `INTAKE-ADJUDICATION:114` C-6 and `§3:155-157` all read as the spec quotes them. `CENSUS-2026-08-03:34` (SCH-3) and `:38` (SCH-7, incl. the "'0 depcruise violations' does NOT refute L-1" lock) are verbatim. `§(a):194-196` names the verb and defines no axis, exactly as the spec's rubric row asserts.
- **Arm D traces whole to `lane-library.md`.** §0 headline (`145` via `find src -type f -name '*.ts' | wc -l`; 17 type-only cycles; 0 static-runtime), §3.2's seven-ring inventory (constants 2 · engine core **7, all through `engine/animation.ts`** · engine↔waapi 5 · engine↔easing↔compile · easing↔engine/css · group · sequence), §3.5's `:113`/`:160`/`:200` rule anchors and DEFECT L-2 at `:120-128`, §7.1 (9 god modules), §7.2 (fragment modules / pass-throughs), §7.3 (16 measured + 2 structural). No invented structure figure found.
- **Arm C traces to banked NO-WAVE-OWNER rows**: `kf-SquareScene:40` (L-2 BLOCKER, `useKeyframeOps.ts:66-70` / `resolveTransform` / `compile-bridge.ts:95-99`), `:53` (D-27/L-7/C-9, five throw sites, `playback.ts:110-152` — the spec's anchor is that record's own, `:9`), `:79` (L-13/C-11 singleTarget poke).
- **B-14/B-15/B-16 trace to `kf-ChannelOptions`**: `:36`/`:54`/`:109` (L·B-2 RESCOPED-BY-SUBSTRATE, framing kill CONFIRMED, dissents recorded), `:205` (KF-CO-48 verbatim, "my read `:245-275`"), `:154` (the `parseAnimationCSS` per-stop drop, R3-forwarded, severity genuinely unstated — the spec's "unstated in the record" is honest).
- **Cure-shape locks and dissents are CARRIED, not cited** — sampled and confirmed at B-1 (blocker-of-the-migration, reciprocated `KF-W6-CARRY.md:356` ✓), B-4 (severance not un-severed; kf-TypingDots ruling 3 overrule), B-6 (booking reason verbatim; K5 stays killed; L's S-3 survives scoped), B-9 (§0 R-3, BLOCKER dissent preserved), B-19 (reader-2's MINOR as dissent, verbatim), B-22 (KF-ET-2 cure-lock, "never bind `cssValue`"), C-2 (rider verbatim), D-4 (cure verbatim), §Excluded 1's KF-SS-38 POST-KILL lock and KF-ES-36's killed gate-input escalation.
- **Sibling reciprocations verified verbatim**: `KF-W7.md:56` — *"its `innerHTML` BLOCKER is KF.W5's, front-loaded, NOT gated here"* ✓ (exact); `KF-W7.md:313`/`:331` ✓; `KF-W6-CARRY.md:9`/`:12`/`:13`/`:170`/`:248`/`:319`/`:356` ✓ (all seven line cites resolve and say what the spec says they say, including the "FRONT-LOADED at W5" clause at `:356`).

### Defects on this axis

**D-4 (MINOR) — C-3 leg (iii) misattributes its proof.** The spec: *"kf-LayerConfigPanel **LP-1's rider** proves `singleTarget` **RECOMPUTES post-mount** at `group.ts:159/:201`, so both operands of the demo's weight gate are stale-by-construction."* At the bank, LP-1 (`kf-LayerConfigPanel:41`) is the **no write→render edge** row (raw layer object off a `markRaw`'d, `shallowRef`-held group; in-place `Object.assign`; reka controlled mode) and its rider (`:102`) reads *"**Caveat sustained (LP-1 rider): both operands are untracked reads** — the best line in the file is stale-by-construction."* The mechanism is **Vue untracked reads**, not a `singleTarget` recompute. The `singleTarget = animations.every(…)` (`group.ts:159-161`) derivation lives at that record's **ruling 4** (`:25`), where it is used to **SUSTAIN A KILL** of the L·M-3 zIndex leg. Two distinct registry facts are fused into a causal claim the registry does not make. The *conclusion* (stale-by-construction) is banked; the *stated cause* is not.

**D-5 (MINOR) — a missed fold-identity on this wave's own ruling surface.** `kf-CopyButton` **KF-CB-15** is the registry's on-point `singleTarget` row: *"`g.singleTarget = false` pokes derived state (bare undocumented field `:73`; ctor mis-derives `undefined === undefined → true` over target-less children `:159-161`; `setTargets` recompute `:195-204` silently reverts any future poke; waapi.ts:31-33 refusal is the unstated consequence). Cure verified against the ctor: pass each icon at construction. → **NO-WAVE-OWNER** hygiene."* C-3 declares "ONE `singleTarget` RULING serving **three** rows" and names three. KF-CB-15 is a fourth witness **on the exact bytes the ruling settles** (`group.ts:159`, `group/waapi.ts:31-33` — both in this wave's §Bounds), and the spec carries KF-CB-30/-35/-36 from that same record while carrying neither KF-CB-15 nor an exclusion for it. Not an escape (it routes NO-WAVE-OWNER, not KF.W5), but a fold the ruling would discharge for free.

**D-6 (MINOR) — an anchor with no registry provenance.** `group.ts` **`:201`** (§Bounds arm B row; C-3 "`group.ts:159/:201`") appears in **no** adjudicated record and in **no** formation lane (`grep -rn` over `registry/adjudicated/` + `formation/` → 0). The banked anchor for the `setTargets` recompute is **`:195-204`** (kf-CopyButton KF-CB-15 and SUP-2). Against the spec's own §Bounds law — *"Line anchors below are cited **from the adjudicated registry records** — this seat opened no product source"* — `:201` is either unsourced or the residue of a product read. (Every other sampled anchor traced: `view-transition.ts:197`, `play-lifecycle.ts:337-341`, `delegation.ts:53-64`, `load-engine.ts:123-124`, `compile/emit/index.ts:53`, `types.ts:182`, `backward.ts:245-275`, `densify.ts:45`, `emission.ts:35-36`, `easing.ts:41-50`, `stagger.ts:15-22`, `group/types.ts:27-30`, `split-text.test.ts:72-76`, `presets/index.ts:1-8`, `compile-bridge.ts:95-99`, `playback.ts:110-152`, `.dependency-cruiser.cjs:113/:120-128/:160/:200`.)

**D-7 (MINOR) — the "KF-W4 §11 ¶1" citation is wrong on section and on wording.** The spec cites, three times as binding authority (§0 R-1.4, §Excluded 1, RD-3), *"Census S-2's owner is therefore named: KF.W6 for prose-with-code, KF.W4 for the citation gate"* attributed to **KF-W4 §11 ¶1**. `KF-W4.md` has **no §11** (its headings are §0 · §Bounds · §Carry · §Gates · §Sequencing · §Excluded · §Cadence). The quoted string is exact at **`KF-W6-CARRY.md:12`** ✓ (so the spec's second attribution holds). KF-W4's *actual* ruling is R-1 at `:86-88` and reads **differently**: *"Census S-2's owner is **hereby** named: KF.W6 (Glass Suffusion), with **KF.W10** taking any doc-authority addenda."* — KF.W10, not KF.W4, for the second half. The substance survives (KF-W4 R-1 does take the phantom-AUTHORITY arm under G-KFW4-8), but a load-bearing citation points at a section that does not exist and quotes wording its named source does not carry.

**D-11 (INFO) — the authoring source is unlocatable.** §Provenance authors "against the **SS-1 CARRY ledger whole**", and §5 issues a BOUNDS CORRECTION against "**the CARRY table's** `docs/tranches/X/kf/waves/KF.W5.md`". No KF-W5 CARRY ledger exists in `docs/` (`find -iname '*CARRY*'` → only `KF-W6-CARRY.md`, `F-W1-CARRY.md`, `F-W4-CARRY.md`, `V/reformation/CARRY-LEDGER.md`, `registry/CARRY-CUT-LEDGER.md`; none names KF.W5). `grep -rl 'X/kf/waves/KF.W5'` → **KF-W5.md only**. The 54 / 42 / 12 accounting therefore has **no durable auditable source** — which is what makes D-1 below unrecoverable by the next seat.

---

## §3 · GATES — born-RED with a REAL witness (L-19)

**20 gates**, matching the §Gates preamble's count exactly: G-XSS · G-ROLE · G-REFUSE · G-REVERT · G-STAGGER-DOC · G-PRM-FLIP · G-DELAY · G-FROMSTRING · G-CSSIDENT · G-OPTSET · G-RAF · G-RENDERER · G-DEPCRUISE · G-RING · G-SHIM · G-STRUCT · G-BASIS · G-ID · G-TAX · G-SCOPE.

**L-19 — proof-script contrivance: CLEAN.** No gate invokes a `proof:*` script. The single `proof:structure` reference (§0 R-2) is an *obligation to read the script's own definition before quoting its figure* — the opposite of the contrivance the law forbids. The retired-idiom prohibition is honoured.

**Born-RED with a named witness: 19 of 20 hold.** Every RED cell cites a banked, record-qualified observation; nine created specs name their path with an explicit `(**create**)` marker (`test/animation/{split-text-implicit-role,split-text-refuse,split-text-revert,group-viability,prm-engagement,delay-semantics,fromstring-idempotence,public-surface,option-setter-propagation,adopt-compiled-renderer,raf-degrade}.test.ts`). G-DEPCRUISE, G-SHIM, G-BASIS run existing instruments (`depcruise`, `test -e`, `grep`, `git ls-files`). G-ID/G-TAX/G-SCOPE are grep-checkable over this file and the registry.

### Defects on this axis

**D-2 (MAJOR) — G-XSS, the wave's ONLY unconditional sequencing head, is authored on a witness path that NO gate executes.** The gate command is `npx vitest run **test/demo/**highlight-css-roundtrip.test.ts`. The banked vitest topology forbids it from being a gate:

- `kf-MatrixEditor:32` (ruling 8, K1 third firing): *"`vitest.config.ts:38-56`: library project **`exclude: ["test/demo/**"]`**; the demo project is referenced by **no script** (`test:lib` = `--project library`; `demo:correctness` = `node scripts/run-demo-roster.mjs`, not vitest — probed this session); ci.yml runs `check:lib`/`test:lib` only. `test/demo/scenes/cube-scene.test.ts` **never runs on merge or release**."*
- `kf-LayerConfigPanel` **LP-7's ADMITTED rider** states the consequence as law: *"CI runs `test:lib` only and the vitest `library` project excludes `test/demo/**` — so C-5's prescribed cure … produces a spec **no gate executes**; a `--project demo` CI step (= V.md's MR4) is a **prerequisite of the cure, not an optional extra**."*
- `kf-MatrixEditor` **ME-32** books the same as a KF.W4 row: *"wire `test:demo` into CI …"*.

The spec's **OP-6** asserts the opposite: *"Not blocking: **every gate in §Gates runs under today's `check`/`check:lib`/`vitest`/`depcruise`**, or on a `.ts` file bare `tsc` already reads"* and *"**no gate here waits on KF.W4**"*. That is true of the nineteen `src/`-side gates; it is **false of G-XSS**, the one gate the wave declares as commit 1 and the only BLOCKER gate in the file. A born-RED that cannot go GREEN under any executed project is not born-RED — it is unobservable.

**D-3 (MAJOR, same family) — the prerequisite rider is uncarried (M-25).** LP-7's rider and ME-32 are binding on this wave's only demo-side arm, and neither appears in §Carry, §Excluded, or §Sequencing. §Sequencing's *"Two riders KF.W4 owes the rows this wave hands out"* names only `noUnusedLocals` and the depcruise-over-demo arm — the `--project demo` / `test:demo` CI wiring, which is the rider **this wave's own head gate depends on**, is absent. The wave hands KF.W4 the riders it needs for *re-homed* rows and omits the one it needs for the row it keeps.

**D-9 (MINOR) — G-RING's command is not runnable as written.** `npx depcruise src --config **…** --output-type err-long` carries a literal ellipsis where the config path belongs. Every sibling gate spells its config (`--config .dependency-cruiser.cjs`). A gate command containing `…` is a sentence, not a command.

**D-10 (MINOR) — G-XSS's fixture is unmarked and unowned.** Alone among the eleven created specs, G-XSS's witness carries no `(**create**)` marker; and `test/demo/**` is unowned in §Disjointness, which gives `.a` "one demo `.ts` file" and assigns "the new `test/animation/**`" to `.c`. §Bounds arm 0 declares "`test/**` fixture for the round trip | create" — a shared-prefix glob, which is precisely the X.P.W3 §4a lesson §Disjointness cites against itself.

---

## §4 · E-3 + STATUS

| check | result |
|---|---|
| zero `VERIFIED` stamps | **PASS** — the only occurrences are the verb table's `\| VERIFIED \| NO \|` (a declaration of *not* verified) and prose describing registry re-verification at the bank. No self-stamp anywhere. |
| status `planned` everywhere | **PASS** — `:6` *"**Status**: **planned**. No product byte written; nothing opened keyframes.js source for writing; execution awaits the **owner's begin-word**."*; `:306` *"every status field `planned`"*. |
| no execution verbs in current voice | **PASS** — no `we landed/wrote/created/ran/fixed`, no `has been landed`, no `is now green`. All cure language is `lands as` / `cure =` / `the RULING lands first`. Past-tense verbs refer to upstream keyframes.js work (`the landed EE-02 cure`) or to authoring-time greps, correctly scoped. |
| the spec opens no product source | **PASS with one exception** — declared at `:68` and honoured throughout; the sole unsourced anchor is `group.ts:201` (D-6). |
| `IMPLEMENTED \| NO` | **PASS** — *"gates green + bytes landed at the named execution site stamps this"*. |

**Axis 4 verdict: CLEAN** (D-6 is booked under axis 2, not here).

---

## §5 · POSTURE AXES

| axis | binding? | finding |
|---|---|---|
| **KF.W4 is the DECLARED SEQUENCING HEAD** | YES | `KF-W4.md:193` — *"**This wave is the declared sequencing head of X·KF.** No repair packet and no UNIT may open before **G-KFW4-1** lands."* KF-W5 declares an exemption on a **stated, mechanically sound** basis (KF-AT-12 premise; `useHighlightCSS.ts` is a `.ts`, so bare `tsc` reaches it; KF.W6 and KF.W7 both reciprocate the front-load in writing). The **typecheck** half of the exemption holds. The **test** half does not — see D-2/D-3. This is the one place the posture bites and the spec does not see it. |
| **KF.W3 is GATED via PLAW-BIND (never scheduled)** | YES | **HONOURED.** §Sequencing: *"KF.W3 is gated on the parse-that release condition (PLAW-BIND → V.L1/V.L5 → packed Value release). **This wave must NOT pre-empt the 4.0.0→4.1.x repin.**"* Reinforced at B-16 ("Either way it touches KF.W3's seam"), B-12 (the `/css` static-graph arm declared a KF.W3 scoping input, not taken), §Bounds Do-NOT-touch (`css-text.ts` and `ingest/cssom.ts` **cures** are KF.W2/W3's), and D-5/G-STRUCT (`ingest/cssom.ts` boundary "declared, not taken"). No gate, bound, or cure touches the gated surface. |
| **KF.W7 carries the KF-AV-28 supersession rider** | YES | **HONOURED and correctly not absorbed.** `KF-W7.md:7` carries KF-AV-28 as *"the wave's defining lock"*; `:32` OP-6 lets the phase-1 verdict supersede its own §Carry rows. KF-W5's §Sequencing routes **KAD-13 WHOLE to KF.W7** with the anti-split reason stated, folds KF-SKEL-16's Skeleton half by reference, and claims no KF.W7 row. Both directions verified: `KF-W7.md:56` (§Bounds) and `:313`/`:331` (§Sequencing) name the `innerHTML` BLOCKER as KF.W5's, front-loaded, never gated there. `KAD-13` present in `KF-W7.md` (2 hits) ✓. |
| **KF.W6 must square with its 424-row CARRY file** | partially (W6's own axis) | **HALF-HONOURED.** Every KF-W6-CARRY line the spec cites resolves and says what it claims (`:9`,`:12`,`:13`,`:170`,`:248`,`:319`,`:356`). But see D-8 below: the twelve rows KF-W5 *hands to* KF.W6 are not carried by id at the destination. |

**D-8 (MAJOR) — ten of the twelve §Excluded re-homes are unreciprocated by id at their named destination.** §Sequencing's own law: *"Cross-wave and cross-repo edges are **declared from this end and must be reciprocated in the sibling file**."* Exact substring counts:

| id | `carry/KF-W6-CARRY.md` | `waves/KF-W6.md` | `waves/KF-W7.md` |
|---|--:|--:|--:|
| KF-SS-4 · KF-SS-6 · KF-SS-31 · KF-SS-38 | 0 · 0 · 0 · 0 | 0 · 0 · 0 · 0 | 0 |
| KF-ET-33 · KF-ET-35 · KF-ES-36 | 0 · 0 · 0 | 0 · 0 · 0 | 0 |
| KF-SKEL-9 · KF-SKEL-20 | 0 · 0 | 0 · 0 | 0 |
| KAD-17 | 0 | 0 | 0 |
| **KAD-13** | 0 | 0 | **2** ✓ |
| **KF-SKEL-16** | 0 | 0 | **2** ✓ |
| *(control)* KAD-1 · KAD-3 · KF-AT-8 | 12 · 2 · 2 | 12 · 1 · 4 | 5 · 0 · 0 |

The controls prove the counting instrument is sound: KF.W6's files *do* carry KAD and KF-AT identities. What they do not carry is any of the ten identities KF-W5 routes to them. §Excluded's closing promise — *"No CARRY row is dropped. Every row below is a re-home with a **named destination**; identities are preserved, never re-booked"* — is true as a **declaration** and unverifiable as a **landing**. The seven-row prose sweep is reciprocated only as an *ownership rule* (`KF-W6-CARRY.md:12`), never as seven rows. Ten routed BLOCKER-adjacent-to-INFO identities currently have no slot in any wave's carry table. This is the M-25 failure mode inverted: not a silent drop *here*, but a silent drop *at the receiving end*.

---

## §6 · THE ARITHMETIC (the wave's own G-BASIS class, turned on itself)

**D-1 (MAJOR) — §Carry holds 44 rows, not the 42 the spec asserts in five places.**

Enumerated by line from `## §Carry` to `## §Gates`, excluding header and separator rows:

| arm | lines | rows |
|---|---|--:|
| Arm 0 · THE FRONT-LOAD (`.a`) | 152–156 | **5** (KAD-1, KAD-2, KAD-3, KAD-14, KAD-5) |
| Arm A · THE CENSUS (`.b`) | 162–169 | **8** (X-4/C-6, B10-21, D/L/C rubric, KF-ET-27, KF-ES-20, **G-ID**, **G-TAX**, KF-AT-12) |
| Arm B · LIBRARY RULINGS AND CURES (`.c`) | 175–196 | **22** (B-1 … B-22) |
| Arm C · THE ENGINE SEAM (`.d`) | 202–204 | **3** (C-1, C-2, C-3) |
| Arm D · STRUCTURE (`.e`) | 210–215 | **6** (D-1 … D-6) |
| | | **44** |

§Excluded holds exactly **12** (7 prose sub-rows in item 1 + items 2–6), which is correct.

The spec asserts **42** at five sites — `:14` (SPECIFIED verb basis, *"42 land in §Carry"*), `:33` (R-1's G-SCOPE close condition, *"§Carry's 42 rows each carry a disposition"*), `:144` (the §Carry heading, *"the 54 rows, 42 landing here"*), `:244` (the G-SCOPE gate row), `:290` and `:306` (*"Tally: 42 carried + 12 re-homed = 54"*, *"42 + 12 = 54"*). Actual: **44 + 12 = 56**.

The delta is exactly the two seat-minted registry-defect rows **G-ID** and **G-TAX** (⟨this seat⟩), which were added to the Arm A table without being excluded from — or added to — the ledger tally. Either reading is a defect: if they are CARRY rows the tally is wrong; if they are not, their non-membership is undeclared while they sit inside the table the tally counts.

This is material, not cosmetic. **G-SCOPE's close condition is unsatisfiable as written** ("§Carry's 42 rows" — there are 44). And the file's own closing invitation makes the consequence explicit: *"The next seat that finds a row in neither table has found a defect in **this file** — file it against G-SCOPE."* The inverse case — rows *in* the table that the tally does not count — is the one that fired. In a wave whose Arm A exists to reconcile five disagreeing counting bases, and whose **G-BASIS** gate *"fails on any average, any '≈', or any figure quoted without its probe"*, the spec's own row count is quoted without a probe and is wrong by two.

---

## §7 · DEFECT REGISTER (worst first)

| # | sev | defect | receipt |
|---|---|---|---|
| **D-1** | **MAJOR** | §Carry holds **44** rows, not the **42** asserted at `:14`, `:33`, `:144`, `:244`, `:290`, `:306`; `44 + 12 = 56 ≠ 54`. G-SCOPE's close condition is unsatisfiable as written. | Arm 0 `:152-156`=5 · Arm A `:162-169`=8 · Arm B `:175-196`=22 · Arm C `:202-204`=3 · Arm D `:210-215`=6. Delta = the two ⟨this seat⟩ mints G-ID + G-TAX. |
| **D-2** | **MAJOR** | G-XSS — the wave's only unconditional sequencing head and only BLOCKER gate — names a witness at `test/demo/highlight-css-roundtrip.test.ts`, a path **no executed vitest project reaches**. OP-6's "no gate here waits on KF.W4" is false for it. | `kf-MatrixEditor:32` (library project `exclude: ["test/demo/**"]`; demo project referenced by NO script; CI = `check:lib`/`test:lib`) · `kf-LayerConfigPanel` LP-7 rider ("produces a spec **no gate executes**") · KF-W5 `:62` OP-6, `:225` G-XSS. |
| **D-3** | **MAJOR** | The prerequisite rider for D-2 is uncarried (M-25). LP-7's `--project demo` CI step (= V.md MR4) and ME-32's "wire `test:demo` into CI" appear nowhere in §Carry, §Excluded or §Sequencing. | `kf-LayerConfigPanel:52` ("**a prerequisite of the cure, not an optional extra**") · `kf-MatrixEditor:67` ME-32 · KF-W5 `:266` names only `noUnusedLocals` + depcruise-over-demo. |
| **D-8** | **MAJOR** | 10 of 12 §Excluded re-homes are unreciprocated by id at their named destination; only KAD-13 and KF-SKEL-16 (both → KF.W7) land. | Substring counts in `carry/KF-W6-CARRY.md` (424 rows) and `waves/KF-W6.md`: KF-SS-4/6/31/38, KF-ET-33/35, KF-ES-36, KF-SKEL-9/20, KAD-17 = **0/0** each; controls KAD-1=12/12, KAD-3=2/1, KF-AT-8=2/4. |
| **D-4** | MINOR | C-3 leg (iii) attributes a `singleTarget`-recompute proof to kf-LayerConfigPanel LP-1's rider, which proves **untracked reads**; the `:159-161` derivation is that record's **ruling 4**, used to sustain a KILL. | `kf-LayerConfigPanel:41` (LP-1 = no write→render edge) · `:102` ("both operands are untracked reads") · `:25` (ruling 4) · KF-W5 `:204`. |
| **D-5** | MINOR | `kf-CopyButton` **KF-CB-15** — the registry's on-point `singleTarget`-poke row — is neither carried nor excluded, though C-3's one ruling settles its exact bytes (`group.ts:159-161`, `:195-204`, `waapi.ts:31-33`), all in this wave's §Bounds. | `kf-CopyButton:60` (KF-CB-15, → NO-WAVE-OWNER hygiene) vs KF-W5 `:204` ("ONE `singleTarget` RULING serving three rows"). |
| **D-6** | MINOR | Anchor `group.ts:201` has zero provenance in `registry/adjudicated/` or `formation/`; the banked anchor is `:195-204`. Contradicts §Bounds' "cited from the adjudicated registry records — this seat opened no product source". | `grep -rn 'group.ts.\{0,12\}201'` over registry + formation → 0 · `kf-CopyButton:60`/`:117` cite `:195-204` · KF-W5 `:79`, `:204`. |
| **D-7** | MINOR | "KF-W4 §11 ¶1" cites a section that does not exist, for wording its named source does not carry. KF-W4's actual ruling (R-1, §Carry `:88`) reads *"hereby named: KF.W6 …, with **KF.W10** taking any doc-authority addenda."* The quoted wording is `KF-W6-CARRY.md:12`'s. | KF-W4 headings: §0/§Bounds/§Carry/§Gates/§Sequencing/§Excluded/§Cadence — no §11 · `KF-W4.md:88` vs `KF-W6-CARRY.md:12` · cited 3× at KF-W5 `:31`, `:283`, `:292`. |
| **D-9** | MINOR | G-RING's command carries a literal ellipsis where the config path belongs: `npx depcruise src --config … --output-type err-long`. Not runnable as written. | KF-W5 `:238`; cf. G-DEPCRUISE `:237` which spells `--config .dependency-cruiser.cjs`. |
| **D-10** | MINOR | G-XSS's fixture lacks the `(**create**)` marker its ten siblings carry, and `test/demo/**` is unowned in §Disjointness (`.a` = one demo `.ts` file; `test/animation/**` = `.c`); §Bounds declares it as the shared-prefix glob `test/**`, the exact X.P.W3 §4a hazard §Disjointness cites against itself. | KF-W5 `:124`, `:138`, `:225`. |
| **D-11** | INFO | The "SS-1 CARRY ledger" named as the authoring source, and "the CARRY table" §5 issues a bounds correction against, exist nowhere in `docs/`. The 54/42/12 accounting has no durable auditable source — which is what makes D-1 unrecoverable by the next seat. | `find docs -iname '*CARRY*'` → 5 files, none KF.W5 · `grep -rl 'X/kf/waves/KF.W5'` → KF-W5.md only. |
| **D-12** | MINOR | The AUDITED basis row mislabels its record set as "the 16 **real KF.W5-routing** records": it includes `kf-SquareScene` and `kf-ChannelOptions` (`grep -c 'W5'` = **0** in both — homed by R-1's ruling, not by routing) and omits `kf-TimelineHoverPreview`, which does route at `:85`. | KF-W5 `:13` · `grep -c W5 kf-SquareScene.md kf-ChannelOptions.md` → 0, 0 · `kf-TimelineHoverPreview:85`. |

---

## §8 · WHAT THIS SPEC DOES WELL (recorded so pass 2 does not re-litigate it)

1. **The census is airtight.** 43 routed ids, 43 carried, **0 escapes** — including the two fold-identities (SPF-20 ≡ KF-KE-10; THP C-8 ≡ KF-SKEL-16) and the KAD family's true seven-row span, which the spec re-counts against the CARRY gate's "17" and gets right (19 demo-side rows: 5 arm-0 + 12 excluded + 2 census-truth arms — arithmetic verified).
2. **R-1's scope ruling is sound and stated, not assumed.** Two genuine library BLOCKERs (G-RENDERER, G-RAF) had nowhere to land in the taxonomy; the ruling homes them, refuses to mint a KF.W5b whose bounds would be a strict subset, and names the one demo annex with three non-taste reasons — each of which independently verifies (KAD-1's unconditional head; KF-W7's §Bounds reciprocation *verbatim*; `.ts`-not-`.vue`).
3. **Provenance discipline is the strongest axis.** Every arm-A intake cite, every arm-D `lane-library` figure, every arm-C `kf-SquareScene` anchor, and all seven `KF-W6-CARRY` line cites resolve exactly. Cure-shape locks, sequencing edicts, and dissents are **carried** with their reasons, not name-dropped — M-25 is honoured almost everywhere.
4. **Two registry defects found and relayed** (RD-1 the `KF-ES-*` namespace collision + the `L-2` overload; RD-2 the taxonomy collision), both independently verified here (`KF.W5-PARTIALS` → exactly 3 header hits, 0 row hits), plus RD-3 which gives a NO-WAVE-OWNER family an owner and RD-4 which surfaces a live two-wave bounds collision on one file.
5. **The gated-wave posture is respected without exception.** Nothing in bounds, gates, or cures pre-empts KF.W3's PLAW-BIND repin, and the KF.W7/KF-AV-28 lock is left entirely to KF.W7.

---

## §9 · MINIMAL REPAIR SET (for the authoring seat, pass 2)

1. **D-1**: re-count §Carry to **44** and state the ledger as `44 (§Carry, of which 2 are ⟨this seat⟩ registry-defect mints) + 12 (§Excluded) = 56, of which 54 are CARRY-sourced`; update all six assertion sites and G-SCOPE's close condition.
2. **D-2/D-3**: either (a) relocate G-XSS's spec to a path the `library` project runs, or (b) carry LP-7's rider + ME-32 explicitly, add the `--project demo` CI step to §Sequencing's "riders KF.W4 owes", and amend OP-6 to say G-XSS's *gate observability* — not its cure — waits on that one wiring step. The front-load itself survives either way; only the claim of gate-independence has to go.
3. **D-8**: send the ten unreciprocated identities to SS-1/SS-2 as a relay so KF.W6's carry gains slots for them, or convert §Excluded item 1 from seven named rows into a declared hand-off packet with an SS-1 obligation attached.
4. **D-4/D-5/D-6/D-7**: re-anchor C-3 leg (iii) to `kf-LayerConfigPanel` ruling 4 (`:25`) for the derivation and to LP-1's rider (`:102`) for the staleness conclusion; add KF-CB-15 as C-3's fourth witness (fold, never re-book); replace `group.ts:201` with the banked `:195-204`; re-cite the S-2 ownership ruling as `KF-W4 §Carry R-1` **and** `KF-W6-CARRY.md:12`, noting KF-W4's own wording gives the addenda half to KF.W10.
5. **D-9/D-10/D-12**: spell G-RING's config path; mark G-XSS's fixture `(**create**)` and enumerate its directory in §Disjointness; re-word the AUDITED basis to "16 routing records + 2 records whose engine-seam rows are homed here by R-1".

---

**Local verdict: DEFECTIVE** (3 MAJOR, 8 MINOR, 1 INFO). No escapes; no invention of substance; no status or E-3 violation. The defects are an arithmetic slip that the wave's own G-BASIS gate exists to kill, one head-gate witness that cannot be executed under the banked instrument topology together with its uncarried prerequisite rider, and a set of re-homes the destination has never heard of.
