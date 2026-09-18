# KF-W0 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 2)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W0.md` (445 L, repaired 2026-08-28 after a DEFECTIVE pass 1)
**Corpus authority**: the 58 `kf-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → **58**, re-run this seat)
**Sole in-tree carry read**: `X/keyframes/carry/KF-W6-CARRY.md`
**Also read**: `PASS-1/KF-W0-CHECK.md` and `PASS-1/RULINGS.md` — read **after** the independent extraction below, and used only to check that the directives addressed to KF-W0 landed. Nothing in this register is inherited; every count is this seat's own.
**Subject trees probed read-only**: `/Users/mkbabb/Programming/keyframes.js` @ `origin/master` `81a56990` and `/Users/mkbabb/Programming/glass-ui`, 2026-08-28. Zero writes outside this file.

**VERDICT (local): DEFECTIVE** — **4 MAJOR · 4 MINOR**. The repair round did what the rulings told it to do (R-1a, R-5, R-11, R-15, R-17, R-19b all land, verified by bytes below) and every RED baseline still reproduces. What it did **not** do is re-derive: three of the four MAJORs below are the *same defect class the round claims to have cured*, surviving at the altitude nobody re-measured — and one of them (G-0.7) makes a gate's GREEN condition unreachable from inside the wave's own §Bounds.

---

## §0 — Census unit and method

The unit is **one distinct banked row-id (or named ruling / dissent) whose terminal disposition names KF.W0** — directly (`→ KF.W0`, `KF.W0 §B-12`, a `**KF.W0**:` roster cell) or by a fold the record itself terminates at census F-1/SCH-1, whose cure the corpus states as KF.W0 §B-12.

Extraction, this seat: `grep -n -E 'KF\.W0|KF-W0|\bW0\b'` over all 58 records → **238 lines**; taxonomy/routing-law boilerplate (`W0 Substrate Settle · W1 Mail Cure · …`) discarded; each survivor resolved to its banked ⟨record : id⟩ pair. Each pair was then grepped against `KF-W0.md` **by bytes**, and a hit was counted **only when the id resolves to that record** — a bare `K-1` hit belonging to kf-SpringTarget does not book kf-MbabbMenu's `K-1`. That rule is the spec's own (C-1.G: *"a row whose content is carried but whose id is absent by bytes is an escape, because no later seat can grep this spec for its own row"*).

| | count |
|---|---|
| **routedTotal** (distinct routed ⟨record : id⟩ pairs, 58 records + the W6-CARRY §CrossEdges packet) | **112** |
| **booked** (carried by id, by a spelled-out fold-identity row, or by a loud exclusion) | **105** |
| **escaped** (routed at the bank, absent from the spec as an ⟨record : id⟩ pair) | **7** |
| records with **zero** KF.W0 routing | 5 of 58 — `kf-ChannelControls`, `kf-ControlsPaneWrapper`, `kf-KfPillTabs`, `kf-SpringPhysicsFacet`, `kf-TimelineTrack` (alias sweep for `B-12` / `SCH-1` / `substrate settle`: no hits). `kf-TransportDock` and `kf-TimelineHoverPreview` carry only taxonomy lines; `kf-AnimationControlsGroup` and `kf-DemoGlobalChrome` carry no literal `KF.W0` but do carry W0-owned rows (D-13, L-6, D-5/L-3/C-2) and are counted routed. |

The 34 escapes PASS-1 named are **resolved**: §2.A's seven land at **C-17.R** (13 claimants, one motion), §2.B's eleven and §2.C's thirteen at **C-1.F** (13 rows, riders verbatim) and **C-1.G** (13 index rows), §2.D's three at **C-1.R** and **C-22**. Verified id-for-id — `KF-AT-7` 1 · `KF-ET-3` 1 · `KF-ES-33` 1 · `KF-ES-15` 2 · `KF-KE-16` 1 · `KF-TFP-29` 1 · `KF-SKEL-7` 5 · `KF-AV-28` 1 · `OD-41` 1 · `K17` 2 · `C-M-1` 3 · `F1(c)` 2 · `MISS-α5` 3 · `K-BASE` 3 · `App.vue:176` / `TABS_EXTERNALLY` / `dock-margin` all present. R-1a's twelve are all in C-1.F, in order, each with its bank rider quoted.

---

## §1 — THE SEVEN ESCAPES (named by bytes)

The escapes are no longer the *classes* PASS-1 found; they are the **residue of a roster that was copied rather than re-derived**. C-1.G's stated purpose is closability — *"13 ids that a closure sweep can now resolve to a named disposition instead of to silence"* — and its membership is exactly PASS-1 §2.C's thirteen. It is not the complete set.

| # | Escaped ⟨record : id⟩ | Registry receipt (verbatim) | Byte receipt in `KF-W0.md` |
|---|---|---|---|
| E-1 | **kf-SequencePlayhead · L-13/C-9** | `:71` — *"`--radius-pill` is an import-invisible producer-token edge; **the F-1 limb stays a fold** (≡ census F-1/SCH-1 → **KF.W0 §B-12**) … **KF.W0 fold + NO-WAVE-OWNER residue.**"* | `grep -c 'L-13'` → **0** |
| E-2 | **kf-SequencePlayhead · N-11** | `:83` — *"the manifest triangulation (fold ≡ census F-1/SCH-1, **KF.W0 §B-12**) … **KF.W0 fold.**"* | `grep -c 'N-11'` → **0** |
| E-3 | **kf-CopyButton · K3** | `:91` — *"K3 (reader-2) · census F-1 'absent from package.json' — SUSTAINED IN DIRECTION … **ONE identity with census SCH-1/kf-App ruling 1 → KF.W0.**"* | `grep -c 'K3'` → **0**; `grep -c 'K-3'` → **0** |
| E-4 | **kf-EditorHeader · F2** | `:34` — *"**F2** — L-B2 / C-13 / C-18 / C-14 (phantom dep family) → census F-1 ≡ SCH-1 (**KF.W0**), per kf-App ruling 1."* | `grep -c 'F2'` → **0** (`L-B2` → 1, but that hit is C-14's EH-1 cell, a different row) |
| E-5 | **kf-EditorShell · L-2 / C-2** | `:39` — *"**L-2 / C-2 — FOLD → census SCH-1/F-1 (KF.W0)**, per kf-App ruling 1: frontier-CURED."* | `grep -c 'L-2 / C-2'` → **0**; the spec's four EditorShell rows are THE DELETION (C-3), DISSENT 3 (C-20), DISSENT 1 (C-19), L-17 (C-15) |
| E-6 | **kf-MbabbMenu · K-1** | `:128` — *"**K-1's residue ≡ census F-1/SCH-1 → KF.W0 §B-12**"*; `:170` — *"KF.W0 §B-12: K-1's residue."* | `grep -c 'MbabbMenu K-1'` → **0**; the spec's MbabbMenu rows are `ruling 2` (C-1) and `K-2` (C-19) |
| E-7 | **kf-SpringTrace · L-2** | `:129` — *"**L-2 ≡ census F-1 ≡ SCH-1 ≡ kf-AmigaScene C-1 → KF.W0 §B-12**"*; `:139` — *"KF.W0: the L-2/F-1 substrate fold (§B-12; re-measure obligation)."* | bare `L-2` present, but every hit is C-1.G row 4 = **kf-KeyframeCard**'s L-2; no SpringTrace pair |

E-1/E-2 are the sharpest: kf-SequencePlayhead is cited **once** in the whole spec (C-19's law provenance, *"the dirty-manifest law ⟨kf-SequencePlayhead, a priori⟩"*), so the record that *supplies* C-19's founding law has both of its own KF.W0 folds unindexed. C-1.G's declared denominator — *"22 + 13 + 13 + 4 + 13 = **65** addressable rows, every one greppable by its banked id"* — is therefore wrong, and the sweep it exists to make possible cannot close.

---

## §2 — DEFECTS

### D-1 · MAJOR — G-0.7's GREEN condition is unsatisfiable inside this wave's own §Bounds

G-0.7 GREEN: *"one authoritative dated gate roster in the tree … **and zero prose citations of a non-existent gate**, swept by name over all four dead names … and over D-13's seven."* Unit **KF.W0.e**'s charge repeats the verb: *"**strike** dead-gate prose over all four dead names plus D-13's seven."*

Every strike site is under `keyframes.js/demo/**`. Measured at `origin/master` this seat:

```
demo/styles/style.css:38 · demo/styles/layout.css:152                      (proof:brittleness)
demo/DESIGN.md:29 · :250 · demo/components/instrument/shell/EditorStartScreen.vue:180
demo/styles/font-roles.json:2 · :62                                        (proof:font-census)
demo/DESIGN.md:237 · :250 · EditorStartScreen.vue:159 · demo/scenes/sequence/SequenceTarget.css:212   (proof:styling-idioms)
```

§Bounds **Do NOT touch**: *"`keyframes.js/src/**`, `demo/**` (beyond the two EE-02 paths), `test/**`, `scripts/**`"*, and the Triumvirate Dispatch makes it fatal: *"any write under `/Users/mkbabb/Programming/keyframes.js/{src,demo,test,scripts}/**` beyond the two EE-02 paths … **Product bytes in a substrate wave invalidate it.**"* KF.W0.e's *Files* list (`GATE-ROSTER.md`, `REF-OF-RECORD.md`, `V8-DISPOSITION.md`, the 58 records, `INTAKE-ADJUDICATION`, `lane-docs.md`) contains none of the strike sites — the unit is charged with an act it is given no file to perform and forbidden to perform anyway. Either the GREEN is "book the roster + book the sweep as an obligation homed elsewhere", or the wave is invalid on its first strike. The spec never chooses. **Receipt**: the four-name grep above; §Bounds L105; the Dispatch at L74; the unit at L381.

### D-2 · MAJOR — the dead-gate roster is short by ~47 names at the true altitude; the D-3 cure is relocated, not applied

The round widened the roster 7 sites → 10 sites over **four** dead names, and added D-13's seven by reference. Measured surface at `origin/master`, this seat:

```
git grep -ho 'proof:[a-z0-9-]*' origin/master -- demo/ | grep -v -- '-$' | sort -u | wc -l   → 54 distinct names
of which runnable npm scripts (package.json :50/:51/:52)                                     → 1  (proof:publish)
                                                                                              → 53 DEAD names
git grep -c 'proof:' origin/master -- demo/ | (sum)   → 116 prose hits across 51 files
```

The sweep's denominator is **≤11 names**; the surface is **53**. A sweep executed exactly to GREEN leaves ~47 dead gate names and ~90 prose citations standing — which is verbatim this gate's own falsifier (*"a sweep run against the seven-site fold list leaves `DESIGN.md:237`, `EditorStartScreen.vue:159` and `SequenceTarget.css:212` alive, which is this gate's own defect reproduced by its own roster"*) at the next altitude, and the third consecutive round in which this roster is short. The gate's *title* asserts the universal — *"No prose cites a gate that does not exist"* — while its GREEN scopes to a hand-list; the universal is one grep away and the spec never runs it.

### D-3 · MAJOR — C-1.G, the index minted to make the census closable, is itself short (§1, E-1..E-7); the 65-row denominator is wrong

C-1.G states its own falsifier: *"under an id-keyed census, a row whose content is carried but whose id is absent by bytes is an escape."* Its membership is PASS-1 §2.C's thirteen, adopted unchanged — an inherited roster, not a re-derivation, in a file whose C-19 law is *"the failure is never derivation; it is an unread registry."* Seven pairs are absent by bytes (§1), two of them belonging to the record that supplies C-19's founding law. **Receipt**: `grep -c 'L-13'` 0 · `'N-11'` 0 · `'K3'` 0 · `'K-3'` 0 · `'F2'` 0 · `'L-2 / C-2'` 0 · `'MbabbMenu K-1'` 0; `grep -c 'SequencePlayhead' KF-W0.md` → **1** (C-19's provenance cell).

### D-4 · MAJOR — §6.5 is mis-homed to `CENSUS-2026-08-03.md` at three altitudes; the real home is `lane-frontend.md:462`

C-10 books *"Census §6.5's '13 PRM enforcement sites'"*; G-0.6 GREEN requires *"§6.5 and the z-index cells re-scoped in one motion"*; and §Bounds books the act as **modify-append on `CENSUS-2026-08-03.md`** — *"(SCH re-run · **§6.5 PRM re-scope** · the cascade-coupled legend column · X-2's 185)"*. **Receipt**: `grep -n '6\.5' CENSUS-2026-08-03.md` → **one hit, `:141`**, and that hit points away — *"delegation sites unverified (**FE** §6.5)"*. The roster lives at `lane-frontend.md:462` — *"### 6.5 `prefers-reduced-motion` — 13 enforcement sites across 12 files"* — with its tally at `:598` (*"| `prefers-reduced-motion` enforcement sites | 13 (10 CSS + 3 JS) |"*). This is the exact class **F-R6** already caught once in this file (S-1..S-8 mis-homed to CENSUS, re-pinned to `lane-frontend.md`) and the exact class **D-12** convicts (a bounds row naming a surface that is not there). The fold seat swept F-R6 for one census section and not for the second; the round's "altitude sweep" paragraph is falsified for this row. Harm is bounded only accidentally — unit `.d` happens to hold `lane-frontend.md` — but the wave's access contract points at the wrong file.

### D-5 · MINOR — G-0.7's GREEN is keyed to seven names nobody has ever written down

GREEN: *"swept by name over all four dead names … **and over D-13's seven**."* **Receipt**: `kf-AnimationControlsGroup.md:84` states only the count — *"seven `proof:*` gate citations resolve to zero runnable gates (two `proof:` scripts exist; one cited name matches a DEMO_ROSTER observation, prefix-less)"* — and names none of the seven; `KF-W0.md` names none either. A GREEN condition keyed to an unenumerated set is undecidable, on the one gate whose whole content is enumeration. (The record's *"two `proof:` scripts exist"* is itself a stale-worktree reading the spec correctly corrects to three — so the seven were counted on the stale tree and never re-derived.)

### D-6 · MINOR — `proof:demo-no-oversize`'s 16×13 figure is demo-scoped and the scope is never stated

**Receipt**: `git grep -c 'proof:demo-no-oversize' origin/master -- demo/` → **16 hits / 13 files** (the banked figure reproduces exactly — kf-DemoGlobalChrome L-6 is sound). Repo-wide at `origin/master`: **121 hits / 70 files**, of which **57 files under `docs/`**. The spec adopts 16×13 as the sweep denominator with no scope word, so the record's own lock — *"A fix confined to this file leaves twelve files standing; the fold owns the sweep"* — reproduces one directory up. Since `keyframes.js/docs/**` is also outside this wave's bounds, the correct disposition is a loud out-of-scope declaration; there is none.

### D-7 · MINOR — G-0.4's runtime-tier wiring claim does not reproduce for one of its two instruments

Spec: *"`node scripts/observe/demo/smoke.mjs` and `node scripts/observe/demo/live-session.mjs` (both real; `scripts/lib/console-budget.mjs` is the warn-count instrument **they** load)."* **Receipt**: all three paths exist at `origin/master` (verified) — but `git grep -n 'console-budget' origin/master -- scripts/observe/demo/smoke.mjs scripts/observe/demo/live-session.mjs` returns hits **only in `live-session.mjs`** (`:77` `import { chargeBudget, isNamedBenign } from "../../lib/console-budget.mjs"`). `smoke.mjs` does not load it. EE-03's *"watch-warn-count→0"* confirmation therefore has one instrument, not two. Same class as C-13's own conviction: a name that resolves is not an artifact that wires.

### D-8 · MINOR — the `dist/gh-pages` bounds row cites a receipt for a different fact

§Bounds: *"it is generated output, **gitignored at the frontier** (`package.json:32` `"!dist/gh-pages"`)."* **Receipt**: `package.json:30-33` is the npm **`files`** array (`"dist", "!dist/gh-pages", "!dist/_*"`) — a *publish* exclusion, not a git one. The claim is true by a different receipt: `.gitignore:10` → `dist/`. A bounds row whose citation proves a neighbouring fact is the provenance defect G-0.10 exists to kill, in the wave's own access contract.

---

## §3 — AXES THAT HOLD

**Axis 1 (census completeness)** — materially improved, not closed: 105 of 112 booked; PASS-1's 34 escapes all resolved; the residue is D-3's seven.

**Axis 2 (NO INVENTION / M-25 depth)** — **CLEAN**. Every C-1.F rider is quoted verbatim against its bank (spot-checked at kf-EasingTarget `:42`, kf-EasingSidebar `:77`, kf-EasingScene `:54`, kf-KeyframesEditor `:58`, kf-TimingFunctionPanel `:75`, kf-ChannelOptions `:149`, kf-CSSPasteDialog `:72`, kf-KeyframesAddDialog `:87`, kf-KeyframeCardList `:120`, kf-App.skeleton `:42`). Locks travel with their packets (KFED-UNIT, OPTIONS-UNIT/LP-1, MM-28, TD-1/TD-2 bundle, kf-SequenceAxis ruling-1, ARB-1, kf-SquareScene test obligations). Dissents are preserved and charged nowhere (kf-CubeAxisLines β-miss-1; B18-26 split adoption; B18-27 unresolved; Reader-B's vacated caveats kept as a dated record). No id is coined or renamed; the only mint is C-17's, in one motion, over an enumerated thirteen. **C-19's "32 records" now enumerates 32** — `sed -n '133p' | grep -o 'kf-[A-Za-z.]*' | sort -u | wc -l` → **32** (D-8 of pass 1, cured).

**Axis 3 (born-RED, real witnesses)** — **CLEAN except D-1/D-7**. Every pasted baseline re-measured at this seat reproduces byte-exactly: behind **41** / ahead **1** · `git status --short` **252** · `git diff --name-only origin/master` **325** · untracked **124** · merge-base `a59d3a22da080a8ed224e8d675112bb3bb0135b0` · src `.ts` **153** · demo `.vue` **58** · demo `.ts|.vue` **185** · EE-01 `HEAD:42 bounceInEase` / `origin:42 easeInBounce` · FE-3 `origin:11 startScalar(frames[i].start)` · EE-03 `origin:97 () => animation.templateFrames.length,` · TypingDots `diff --stat origin/master` **empty** · glass-ui `header-ribbon/` empty at producer HEAD, five files at `4bf53962^` · `lane-frontend.md` `^### S-` = **8** (S-1 `:264` … S-8 `:387`) · `lane-docs.md:380` row 16 verbatim · `lane-frontend.md:15` F-1 RED · `:612` "F-1 first" · `:194` EditorHeader roster row · `:398` "Bespoke, no glass counterpart" · archive letter `:15-19` present · 58 records, `grep -lci 'ref-of-record'` → **0**. **No phantom script survives**: `git grep 'build:gh-pages' origin/master` → **no hits**; `package.json:43` `"gh-pages": "vite build --mode gh-pages"`; the seven `npm run gh-pages` sites all read correctly (R-11 discharged). `scripts/gates/` = **9 files** over **3** `proof:*` entry points (R-17 item 5 discharged). `scripts/observe/demo/{smoke,live-session}.mjs` + `scripts/lib/console-budget.mjs` all exist. No `e2e/` at any coordinate, and the FE-3 `[object Object]` assertion is correctly declared as keyframes.js's own tranche-V W1 gate and **not** asserted here (D-4 of pass 1, cured). No proof script is authored for any gate.

**Axis 4 (E-3 + STATUS)** — **CLEAN**. `grep -n VERIFIED` → 2 hits, both negative (`| VERIFIED | **NO** |` at `:51`; *"VERIFIED is KF.W10's to stamp"* at `:440`). `**Status**: **planned**`. No execution verb in current voice; OP-1 is declared the owner's hand and every other unit writes `docs/**`. E-3's append-never-rewrite is stated at C-1.R, C-13, C-17, C-20, C-22, G-0.9, N-2 and the 58-record Bounds row, and the `build:gh-pages` correction is executed as an E-3 declaration rather than a rewrite of banked words.

**Axis 5 (posture)** — **CLEAN**.
- *KF.W4 head*: `KF-W4.md:223` — *"This wave is the declared sequencing head of X·KF. No repair packet and no UNIT may open before **G-KFW4-1** lands."* KF-W0 is neither a repair packet nor a UNIT; it makes G-0.7 W4's precondition, routes C-12's demo-typechecking arm to W4 against the single banked no-SFC-typecheck identity, and repeats *"after KF.W0 + KF.W4"* on every UNIT. No conflict.
- *KF.W3 gated, never scheduled*: carried verbatim at `:402` — *"KF.W3 is GATED on PLAW-BIND → V.L1/V.L5 → packed Value release"* — and W3 is scheduled nowhere (`grep -n 'KF\.W3'` → that one line).
- *KF-AV-28*: the rider travels on the one row it governs here — C-17.R's KF-AV-28 mint carries *"this id is KF.W7's defining supersession rider … the row's own verdict (evaluate, not swap) is KF.W7's intake, never W0's"*, matching `KF-W7.md:7`/`:96`. The other rows W0 touches on governed records (kf-SequenceScrubber C·C-13 at C-9; kf-PlaybackRibbon C-14 at C-1.G row 3) are census/substrate limbs explicitly not component-shape rows, and each names the packet that owns the shape. Correct.
- *Pass-1 rulings addressed to KF-W0, spot-checked*: **R-1a** — all twelve present in C-1.F in ruling order, riders verbatim, plus KF-SKEL-7 as row F-13 ✓. **R-5** — C-17.R enumerates 8 S-9 + 5 S-10 claimant rows, two enumerated-not-minted (SpringTrace K-6 dead, SharePopover refused), the KSM renumber demoted to a claim-input by E-3 addendum, the AmigaScene C-6 subject corrected to *"extends S-1..S-8 (the block)"* ✓. **R-11** — seven sites, all `npm run gh-pages`, banked words preserved ✓. **R-15** — §Sequencing reads the canonical **17** (15 ∪ {amiga, EDITOR-UNIT}), `transport/ribbon` named canonically, W11×9 / W12×6 / W13×2 restated ✓. **R-17** — three missing sites added and both R-8 residue families received as declared inbound edges ✓ (roster still short at the true altitude — D-2). **R-19b** — C-22 + an INBOUND row in the cross-edge table + all three corrections booked by id under G-0.9 ✓.

---

## §4 — Local verdict

**DEFECTIVE.** The measurement discipline remains the best in the program — thirty-plus baselines, every one reproducing byte-exactly at a fresh seat, and every pass-1 ruling landed. The failures are again failures of **enumeration**, and this time they are recursive: the round cured a short roster (G-0.7: 7→10 sites) without asking what the roster's own universal quantifier measures (**53 dead names**, D-2); it minted an id-index to make the census closable and populated it from the previous register instead of from the bank (**7 pairs still absent**, D-3); it re-homed one mis-filed census section and not the second (**§6.5**, D-4). Beneath those, the gate that owns the sweep cannot execute it without invalidating the wave (**D-1**) — the one defect that is not an enumeration miss but a bounds contradiction, and the one a fifth repair round must answer first.

*Written by the PASS-2 adversarial seat, 2026-08-28. Product source read-only throughout; this file is the only write.*
