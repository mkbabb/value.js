# KF-W9-CHECK — PASS-3 (fresh adversarial spec check, L-18/L-20)

**Subject** `docs/tranches/X/keyframes/waves/KF-W9.md` (326 L, X.KF.W9 — Safari Visual Audit, frontend half)
**Seat** FRESH. Nothing inherited: not PASS-1's ten-id escape list, not PASS-2's 147-pair enumeration, not either RULINGS register, not the spec's own prior text. Every figure below was re-derived at the bytes this session by this seat's own scripts.
**Substrate** keyframes.js `origin/master` **`81a56990`** (re-derived: `git rev-parse origin/master` exact). Local HEAD `8281638c` consulted ONLY to date drift — **TREE LAW: a witness that resolves only at `8281638c` convicts.** value.js at current tree bytes.
**Corpus** the 58 `registry/adjudicated/kf-*.md` records (`ls kf-*.md | wc -l` → **58**). Sole carry `carry/KF-W6-CARRY.md`.
**Verdict** **DEFECTIVE** — 8 defects (3 HIGH · 3 MEDIUM · 2 LOW). Axis 1 (census) is **CLEAN**; the convictions are on axes 2, 4 and 5.

---

## §1 · Axis 1 — ID-KEYED CENSUS (full re-enumeration; escapes by bytes)

### Method (reproducible, stated so pass 4 can re-run it and disagree)

Two extraction passes over all 58 records, **both** required because the corpus mixes roster idioms:

1. **Roster rows** — every `## …roster…` row whose text names `KF.W9`, in **both** shapes: bullet rows (`- **ID …`) and **table rows** (`| **ID** | … | disposition |`). *PASS-1/PASS-2-era bullet-only extraction silently misses kf-App (14), kf-HeroAurora (7), kf-TypingDots (6), kf-EditorStartScreen (6), kf-OrbitalDrag (2), kf-RibbonBar (1), kf-CubeAxisLines (1), kf-App.skeleton (1) — 38 pairs, all table-shaped.* → **126 pairs over 39 records**.
2. **Routing-summary lines** — the `**KF.W9**:` segment in each record's routing section (**23 records carry one; 35 route only per-row**), differenced against (1). → **13 further pairs**: kf-AmigaScene MISSED-A · MISSED-B · kf-CubeTarget #8/#9/#10/#11/#32 · kf-MatrixEditor K10/K26 · kf-SequenceScene D17/D18 · kf-PlaybackRibbon D-12 · kf-SequenceScrubber "the AT churn row".

**routedTotal = 139 distinct (record, id) pairs.**

*On the denominator's shape.* PASS-1 reported 167 roster-level ids, PASS-2 reported 147 record-scoped pairs, this seat reports 139. The three are granularity variants (fold-limb splitting, combined-id treatment), not rival truths. **139 is this pass's enumeration of record and the discharge below is keyed to it.** The spec's own §Carry-head statement — "**79 is the bullet count, never a claim that 147 = 79 or that 167 = 79**" — survives this pass unchanged and is CORRECT as stated.

### Discharge — the four lawful mechanisms

| route | mechanism | count |
|---|---|---|
| (a) | §Carry bullet by id | 79 bullets (re-derived by script: **A 18 · B 5 · C 1 · D 8 · E 7 · F 13 · G 19 · H 8 = 79** — the spec's §Carry-head figure reproduces exactly) |
| (b) | named fold identity inside a §Carry bullet | the KF-CE-13 fold list, the D-16 sequence-family list, the D-15 RTL list, the KF-APP-5/-6/-33 folds, the D-8+M-7 MatrixEditor folds, MISSED-F's witness list |
| (c) | §Excluded row with a named receiving owner | 9 routes |
| (d) | line-item inside the record's OWN `UNPROVEN-NEEDS-LIVE` residue, **record attribution enforced** | the balance |

**bookedCount = 139 · escapedCount = 0.**

### The eleven machine-flagged candidates, each adjudicated at the bytes

The mechanical sweep (id-token ∈ a §Carry bullet that also names the record) flagged 11. **All eleven discharge on manual adjudication; none is a hard escape.** Recorded so pass 4 does not re-book them:

| candidate | resolution |
|---|---|
| kf-AnimationVisualizer **KF-AV-20** | route (b) — `KF-AV-20/D-9` in §B KF-CE-13's fold list |
| kf-CopyButton **KF-CB-32** | route (b) — `KF-CB-32/D-19`, same list |
| kf-KeyframesEditor **KF-KE-43** | route (b) — `KF-KE-43/D-31`, same list |
| kf-SpringPhysicsFacet **SPF-28** | route (b) — `SPF-28`, same list |
| kf-SpringScene **KF-SS-36** | route (b) — `KF-SS-36/D-25` in §C's RTL fold list |
| kf-OrbitalDrag **OD-35** | route (b) — "OD-35's stage-wide trap" in §D MISSED-F's witness list |
| kf-TypingDots **D:D-1** | route (b) — the bank folds it to **KF-EST-11** (`kf-TypingDots.md:37`), carried at §A with D's MAJOR preserved as dissent |
| kf-TypingDots **D:D-3** | route (d) — that record's residue **U-2** (`:99`), attributed *"KF-EST-5 residue, banked"* |
| kf-ChromeDock **D-2-RESCOPED** | route (d) — that record's residue **#7** (`:135`), attributed *"**D-2-residue**: base-arm divergence … visibility over the aurora"* |
| kf-SpringTarget **D-8** | route (d) — that record's residue **#4**; the bank itself routes it there (*"Near-threshold rows → SS-13 #4"*, `:57`) |
| kf-SequenceScrubber **"the AT churn row"** | route (d) — that record's residue **#5** (`:112`), *"AT announcement churn — does a screen reader announce the 60-120 Hz `aria-valuenow` writes…"* |

**One false-positive routed pair identified and struck from the routed set's substance** (kept in the total, discharged by (b)): **kf-TimelineTrack D-8** routes **→ KF.W7**, not KF.W9 (`kf-TimelineTrack.md:45`); only its *forced-colors-coverage arm* folds to banked **D-21 → KF.W9**, and D-21 is carried at §B. A pass that books D-8 as a W9 escape has mis-read the row.

**AXIS 1 VERDICT: CLEAN.** Two repair rounds have closed this axis. PASS-2's R2-10 bookings (AmigaScene D-2, MISSED-A; HeroAurora KF-HA-10) are the class's last members; this seat's independent class sweep — per-record `**KF.W9**:` routing lines + per-row dispositions, differenced against the spec and against each record's own residue — surfaces **no fourth escape**.

### Counting family, re-derived (never inherited)

| cell | spec claims | this seat measures | |
|---|---|---|---|
| §Carry bullets | 79 (18·5·1·8·7·13·19·8) | **79** (same per-section split) | ✅ |
| live gates | 13 (`-1..-9`, `-11..-14`; `-10` struck, id retained) | **14 ids present, 13 live**, `G-KFW9-10` struck-in-place | ✅ |
| §Bounds rows | 16 | **16** | ✅ |
| escalation triggers | 13 armed over 12 records | **13** ` · `-separated armed triggers | ✅ |
| negative register | 6 records · 11 probes · 4 traps | **6 · 11 · 4** | ✅ |
| dissents | 11 row-level + 1 wave-level = 12 | **11** `Dissent preserved` inside §Carry bullets + S-12/OP-7 | ✅ |
| round-1 ledger dispositions | 17 CURED · 1 DECLINED · 1 NO-DEFECT = 19 | **17 / 1 / 1** in the table (the 18th `**CURED**` token is the head's own quoted token, as the correction says) | ✅ |
| S-11 packet roster | 17 | **17** | ✅ |
| prose-carried residue | 9 + 8 + 8 = 25 | anchors resolve exactly: `kf-CubeAxisLines.md:104` *"r1's nine-item queue carries with three sharpenings"* · `kf-TransportDock.md:122` *"1–8 **carried from r1**"* · `kf-CubeTarget.md:83` *"Carried: r1 items 1–4 and 6–8 unchanged"* | ✅ |
| enumerated residue | 565 | **565 — the FIGURE stands**, but see **D3-6**: the *published command* yields 563 | ⚠ |

---

## §2 · Axis 2 — AUTHORITY REALITY (every cross-spec receipt at its anchor)

**Resolved (re-executed this session):**

- **KF-W4 §Sequencing**, head-law paragraph — `KF-W4.md:232` (§) / `:234` (*"This wave is the declared sequencing head of X·KF. No repair packet and no UNIT may open before **G-KFW4-1** lands"*) ✅ — the round-2 strike of the numeric convenience was correct and the §-anchor holds.
- **KF-W0 §Sequencing**, packet-roster row — `KF-W0.md:429` (§) / `:447`; the "verbatim" quotation resolves **exactly** (*"this file previously enumerated **15**; the canonical roster is **17** = W0's 15 ∪ {**amiga**, **EDITOR-UNIT**} (KF.W9 S-11's adds)"*) ✅. W0's own homing cell (*"Homing is discharged by KF.W4's lists, not by this wave"*) **agrees** with W9 S-11's "Homing is KF.W4's act" — no sibling contradiction.
- **KF-HA-10's sibling booking** — `KF-W6.md:314` (§Carry, *"AN OWNER RULING QUESTION, not a fix order … Frame cost → KF.W9"*) **and** `KF-W6-CARRY.md:220` ✅. R2-10's conditional sibling correction is correctly reported as NOT triggered.
- **KF-W7 G15** — `KF-W7.md:302` ✅ (documentary gate, does not wait on G11 — consistent with W9's use).
- **G-KFW4-1 / -9 / -12** — `KF-W4.md:195 / :220 / :204` ✅.
- **B18-26** — `intakes/lane-keyframes-b10-b21.md:151` is exactly the B18-26 row ✅; `INTAKE-ADJUDICATION-2026-08-03.md:138` is §3 ✅ and `:161` carries *"…73,568 Kronecker denominator**; KF.W9 scopes its own surface list"* ✅. Arithmetic re-executed: `152×11×4×11 = 73568` ✅; `46816 + 26752 = 73568` ✅.
- **G-KFW9-5's census witness** — `lane-frontend.md:462` = `### 6.5 prefers-reduced-motion — 13 enforcement sites across 12 files` ✅ verbatim, and it IS §6.5's heading.
- **X.W11 §G8** — `X/waves/W11.md:26 / :70 / :95` ✅ (separate cells; shared `safari-real-matrix.js`, execute-no-write).
- **The KF-AV-28 rider at all three banked coordinates** — `kf-AnimationVisualizer.md:35` · `kf-PlaybackRibbon.md:36` · `kf-SequenceScrubber.md:36` ✅, each carrying its own reach exactly as the round-2 widening states.
- **kf-RibbonBar** `:57` (D-15's routing) · `:65` (RB-1, `design-idioms.css:76-79`) · `:133` (KF.W9 summary) ✅ — the round-2 anti-rename trail is sound, and the two `D-15`s (RibbonBar forced-colors fold vs SequencePlayhead RTL) are genuinely distinct banked ids.
- **`package.json:43`** at the frontier = `"gh-pages": "vite build --mode gh-pages"` ✅ — **R-11's repair is CORRECT and the command exists**; `build:gh-pages` exists at no coordinate ✅.

**Convicted:** D3-1 · D3-4 · D3-7 (below).

---

## §3 · Axis 3 — M-25 DEPTH (locks, riders, dissents)

Spot-audited at the banks, verbatim:

- **D-14 + N-4 one-binding lock** — `kf-SpringTarget.md:63` closes *"NO-WAVE-OWNER + KF.W9 (one binding, with N-4).**"* and `:76` closes *"NO-WAVE-OWNER + KF.W9 (with D-14).**"* ✅ — the spec's restoration is verbatim, and the "never split" gloss is a faithful reading, not an invention.
- **D-B3 lattice lock** — `kf-SpringHeatmap.md:37`: *"any `aria-valuetext` must wait on the packet's lattice decision (L-M-1) — there is no honest cell to announce until the two input modes share one"* ✅ verbatim, carried twice (D-B3 and D-m8) as the bank requires.
- **S-14's N-1 time-domain lock** — routed at `kf-SequenceScene.md:153` and **entered in §Sequencing**, not merely mentioned in §Carry ✅ (round-1 D-12's cure holds). Its scope statement (D-12's uppercase limb and SpringTarget N-4 explicitly NOT governed) is correct against both banks.
- **kf-AmigaScene D-2 / MISSED-A** — `:42` / `:54` quoted verbatim ✅; the cure-shape lock (*"a **shared subject-a11y idiom for cube AND amiga**"*) is carried, not cited ✅; route-(d) unavailability is correctly demonstrated against that record's own twelve-item residue.
- **Dissents** — 11 row-level instances counted inside §Carry bullets, matching the roster; the three R-1e-era additions (SpringTarget D-5, SpringTarget D-6, PlaybackRibbon D-12) are present and named; the three round-2 rows correctly carry none.

**AXIS 3 VERDICT: CLEAN.** No lock paraphrased, no rider cited-instead-of-carried, no dissent dropped.

---

## §4 · Axis 4 — GATES born-RED with real witnesses AT THE FRONTIER

**Re-executed and TRUE at `origin/master 81a56990`:**

- **G-KFW9-1** — `git ls-files …/audit/visual/safari-real/` → **4** tracked (`MATRIX-SAFARI.md`, `ROUTE-MATRIX.json`, `STATE-MATRIX.json`, `picker-safari26.4-light.png`) vs **31** on disk; `shots/` **0 tracked / 11 on disk** ✅ exact. Born-RED and real.
- **G-KFW9-8** — `git grep -c forced-colors origin/master -- demo/` → **0 files** ✅; PRM sites in `demo/` → **16 files** (≥ the claimed 13+) ✅. The re-worded gate (demo-side count stays 0 and THAT is the result) is sound.
- **G-KFW9-9** — `design-idioms.css:76` `.focus-ring:focus-visible` (`:78` its `outline: none`, `:76-79` the rule) **and** `playback-idiom.css:72` `.btn-playback:focus-visible` ✅ — two different selectors, both unlayered, both `outline: none`. The D-19 elision repair and the D-10 pinpoint correction are both CORRECT at the frontier.
- **G-KFW9-10's surviving measurement** — `SequenceTarget.vue:97` = `class="seq-handle"` ✅; `SequenceTarget.css:163-167` = the forked `.seq-handle:focus-visible` rule ✅; **and the fork's justification is confirmed void** — `proof:sequence-rows-draggable` appears at the frontier ONLY in `SequenceTarget.css` (the comment) and in `docs/tranches/H/**` prose; **no script, no package.json entry** ✅. The spec's *"a gate that exists in a CSS comment and old prose ONLY"* is measured true.
- **G-KFW9-14** — both shas re-derived exact ✅.
- **§Bounds PRM surface** — `AmigaScene.vue:58` (`usePreferredReducedMotion()`) · `:107-112` (the reduce branch) · `useSequenceDemo.ts:126-132` (the flagless `CSSKeyframesAnimation` construction) · `SquareScene.css:136` · `SquareInstrument.vue:207` · `EasingTarget.css:48` · `App.skeleton.vue:95` · `AnimatedText.vue:121` · `…/controls-pane/ControlsPaneWrapper.css:144` · `index.html:6` (viewport meta with **no** `viewport-fit=cover` — D-25's witness) — **all resolve at the frontier** ✅.
- **Library reference** — `index.ts:50` (`reducedMotionScale`, inside the cited `:36-52`) ✅ · `group/group.ts:57` (`respectReducedMotion = false`) ✅ · `constants/defaults.ts:87` (`respectReducedMotion: false`) ✅ · `numeric.ts:82-89` (the constructor accepting the flag) ✅.

**Convicted:** D3-1 (stale-ref witness family) · D3-2 (a gate witness falsified at both baselines) · D3-8.

---

## §5 · Axis 5 — POSTURE

| clause | finding |
|---|---|
| **W4 head honored** | ✅ OP-6's construction argument holds: R-9a moved every cure arm out (two-deletion act → KF.W13; ST-1's edit → KF.W11; five kf write grants struck), so a pure measurement wave lawfully escapes the KF-W4 head law. §Bounds carries **zero** kf write grants; `S-13`'s triumvirate fence is never armed by this wave's own gates. |
| **W4's npm-run-check re-cut COMPOSES with the live scripts** | ✅ `KF-W4.md:195` re-cuts **`npm run check`** → `vue-tsc --noEmit -p tsconfig.json && tsc --noEmit …`; the live frontier script is `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure"`. W9 invokes **`npm run gh-pages`** only — a disjoint script, unaffected by W4's redefinition and present at `package.json:43`. **No collision; the two re-cuts compose.** |
| **W3 gated-unscheduled** | ✅ `KF-W3.md:1` = *"Parser Consumption (GATED, never scheduled)"*; KF-W9 contains **0** references to KF.W3 and schedules nothing against it. |
| **KF-AV-28 present where governed** | ✅ carried whole at §H with the governed set re-derived from all three banked coordinates (R-10's four + the ribbon's three, RB-1 governed by identity, D-24 named as a not-yet-governed datum). The rider binds here as a witness-ordering obligation only, which is correct for a wave that spends no cure. |
| **O-21 (not O-20) at W1's mint sites** | ✅ **not this wave's surface, and correctly untouched**: KF-W9 has 0 references to O-20/O-21. Verified at the sibling instead — `KF-W1.md:79 / :136 / :191 / :194 / :315` all read **O-21** with the C-10 mint law; no stale `O-20` mint survives at W1's five load-bearing sites. |
| **W10's carry-routed obligations closed by carriage** | ❌ **CONVICTED — see D3-3.** |

---

## §6 · DEFECT REGISTER — 8 booked

### D3-1 · HIGH — the `play-lifecycle.ts` witness family resolves ONLY at the DISQUALIFIED `8281638c`

`KF-W9.md:69` (§Bounds library reference), `:107` (KF-KE-8), `:110` (KF-TD-1), `:218` (**G-KFW9-6**), `:219` (**G-KFW9-7**) all cite `play-lifecycle.ts:214 / :337-341 / :376`.

Measured this session:
- `git cat-file -e origin/master:src/animation/play-lifecycle.ts` → **fails**. `git cat-file -e origin/master:src/animation/engine/play-lifecycle.ts` → **fails**. At the frontier the module is a **directory**: `src/animation/engine/play-lifecycle/{events,frame,index,strategies,transport}.ts`.
- At `8281638c` the single file **exists** (`src/animation/engine/play-lifecycle.ts`) and its `:214` / `:337-341` / `:376` hold the cited content **verbatim** — `const flipped = withReducedMotion(`, the `snapToReducedMotion` docblock (*"…a live flip on a WAAPI animation cancels the compositor handles before settling"*), and `return beginPlay(anim._playback, () => withReducedMotion(`.
- The frontier homes are `engine/play-lifecycle/frame.ts:131` (the flip), `engine/play-lifecycle/strategies.ts:76` (the `snapToReducedMotion` declaration + docblock) and `:109` (the final-frame `beginPlay`).

This is precisely the fault the wave exists to police. It convicts under **TREE LAW**, under the preamble's own universal (*"All anchors re-resolve at keyframes.js `origin/master 81a56990`"*), under §H's **witness-substrate law** (*"Every witness runs against `origin/master` or later"*), and under **R2-5**. It is load-bearing on **two born-RED gates** (G-KFW9-6's final-frame hazard, G-KFW9-7's two-direction pair) and on the **KF-TD-1 SUBSTRATE INVERSION** row — the one row whose entire point is that the lane flips between the two refs.

**Cure**: re-anchor all five sites to `engine/play-lifecycle/frame.ts:131` and `engine/play-lifecycle/strategies.ts:76` / `:109` under the R2-7 idiom (§-free source anchors: file + symbol, line parenthetical); state the split as a frontier fact so KF.W5's docblock cure lands in the right file.

### D3-2 · HIGH — G-KFW9-6's witness asserts `reducedMotionScale` is "used by nothing"; it has three live consumers at BOTH baselines

`KF-W9.md:218` (**G-KFW9-6**, born-RED witness) and `:98` (§A **THE ANCHOR ROW**) both assert `reducedMotionScale` is *"on the LIGHT barrel, used by nothing"*.

Measured: `git grep -n reducedMotionScale origin/master -- src` →
- `src/animation/index.ts:50` (the export),
- `src/animation/internal/reduced-motion.ts:125` (the definition),
- **`src/animation/physics/spring/progress.ts:2` (import) + `:153` + `:232` + `:385`** — three call sites, each assigning `this.amplitudeScale = reducedMotionScale(this.options.respectReducedMotion)`.

The same three sites exist at `8281638c` (`:154 / :233 / :386`), so **the claim was never true at either baseline**. Demo consumers are indeed zero (`git grep -c reducedMotionScale origin/master -- demo/` → 0) — but "used by nothing" is the spec's own wording, not the bank's: `kf-AmigaScene.md:47` says only *"`reducedMotionScale` numeric-intensity resolver exported on the LIGHT barrel — index.ts:36–52 read by this seat"*. The escalation from "exported" to "used by nothing" is an unbanked amplification that a live grep refutes.

Material consequence, not cosmetic: the wave's central adjudicated cure is the **intensity form**, and the intensity resolver is already the shipped mechanism behind `SpringProgress.amplitudeScale`. The unification therefore has an **in-tree precedent the spec does not name**, and G-KFW9-6's RED overstates the gap it is measuring. `docs/published-surface.md:35` calls the export "manifest-only" — the likely inheritance source, and exactly the citation-inheritance failure this corpus convicts elsewhere.

**Cure**: restate as *"zero **demo** consumers; three library consumers (`physics/spring/progress.ts:153/:232/:385`)"* at both sites, and carry the spring lane as the intensity form's in-tree precedent.

### D3-3 · HIGH — KF.W10's hard inbound dependency on this wave is closed by OMISSION, not carriage

`KF-W10.md` declares KF.W9 a **hard opening precondition** at five sites:
- `:20` *"**Opens after**: … **X.KF.W9/SS-13** (the OD-V3 capture packet and the OD-V5 390 at-rest observation)"*
- `:60` **OP-4** — *"**KF.W9/SS-13's capture packet exists** — both transport homes (in-panel card, floating pill) on all four duplicating scenes at **390 AND 1280**, real Glass 7, both options mocked or annotated; plus the 390 at-rest observation"*
- `:371` *"**PACKET-FIRST (OD-V3)**: KF.W9/SS-13 produces the 390+1280 captures against real Glass 7 **before** the ask is assembled. Never proxied."*
- `:386` *"**D. → KF.W9 (Safari Visual Audit) / SS-13 — W10 depends.**"*
- `:125` / `:127` — two coordination rows routed to *"**KF.W9** surface receipt"* and to *"**KF.W6 + KF.W9** | both waves' bounds blocks"*

`KF-W9.md` contains **zero** occurrences of `OD-V3`, `OD-V5`, `KF.W10`, `W10`, `V-A95`, `GF-AURORA`, or `duplicating`. §S-10 — headed **"Cross-edges (declared from this end)"** — names only KF.W5, KF.W4, KF.W7, the SS-6 relay, X-W11 G8 and SS-13. §S-8's family (iii) is *"the 390×844 + 375×667 mobile pass"* — **no 1280 arm**, and no enumeration of the four duplicating scenes or the two transport homes. §Bounds has no row for the receipt W10 says lives in *"both waves' bounds blocks"*.

Under **M-25** (*nothing lost, head, tail, or interval*) an inbound hard dependency is exactly a "head" the receiving spec must carry. The asymmetry also breaks W10's **OP-4** by construction: W10 cannot check a packet W9 never undertakes to produce, and no gate here closes on 1280 or on transport-home coverage.

**Cure**: add the KF.W10 cross-edge at S-10 (type: **PRECEDES — W10 depends**), enter the OD-V3 capture packet and the OD-V5 390 at-rest observation as a named shared-capture family at S-8 with the 390 **and** 1280 arms and the four duplicating scenes enumerated, and add the surface-receipt row to §Bounds so both ends' bounds blocks agree.

### D3-4 · MEDIUM — R2-5's universal re-derivation claim is false for the library-reference family

Preamble `:7`: *"**R2-5 (the witness re-derivation law) binds this seat**: every figure, witness and anchor touched below was RE-EXECUTED this session — keyframes.js at `origin/master 81a56990` … never inherited from a ruling's prose, a check's register, or this spec's own prior text."*

The round-2 receipt block (`:301`) enumerates what was actually re-derived. **The entire `kf library reference` row (`:69`) is absent from it**: `play-lifecycle.ts`, `group/group.ts`, `delegation.ts`, `constants/defaults.ts`, `index.ts`. D3-1 proves the claim cannot hold for at least one member — the cited file does not exist at the named ref, so no re-execution at that ref produced those coordinates.

This is the same fault class R2-15 struck one round earlier (a headline universal asserted rather than enumerated), reproduced in the very paragraph that announces the cure. The spec's own remedy applies: **state the scope, or enumerate the members.**

### D3-5 · MEDIUM — "13 cross-edges declared" is the one figure in the provenance quartet with no enumeration and no reproducing command

Asserted twice — preamble `:3` (*"13 gates born-RED; **13 cross-edges declared**"*) and provenance `:326` (*"**79 rows · 13 gates · 16 bounds rows · 13 cross-edges**"*). Its three siblings all re-derive at the bytes this session (79 ✅ · 13 ✅ · 16 ✅). **"Cross-edges" is enumerated nowhere.** §S-10 names 6; §Excluded routes 9; S-1/S-2/S-9/S-11/S-15 add KF.W0, KF.W13, KF.W6, KF.W11, KF.W12. No reading of the file lands on 13, and (per D3-3) the one edge a sibling declares hard is missing entirely.

A file whose signature repair act across two rounds was curing exactly this fault — round-2 check D-5, D-6, D-7, D-10, D-11, D-12 are all "three numbers, one enumeration" cures — may not leave one such figure unaudited. **Cure**: enumerate the cross-edge set at S-10 and restate the count at its enumeration, or strike the numeral.

### D3-6 · MEDIUM — the residue recount's published reproducing command yields 563, not 565

§Surface-list protocol 2 (`:78`) publishes the command as *"per record, count `- ` / `N. ` top-level items inside every `## UNPROVEN…` / `## SS-13…` section, excluding identity-guard sections"* and warrants the figure by reproduction: *"The PASS-2 check's independent recount returned the same **565** — two seats, two scripts, one figure."*

Executed literally at the bytes this session (two variants — strict top-level, and indent-tolerant): **563 over 57 records** — the struck round-1 figure. The missing two are `kf-ChannelOptions.md:223-225`, items **11** and **12** under `### G. SS-13 additions (append to the standing list)` — an **h3** section nested inside `## ADDENDUM R2`. 563 + 2 = 565.

**The figure of record (565, hence ≈590) is CORRECT and stands.** What fails is the warrant: the command as published specifies `##` sections and therefore cannot reproduce it. This is live, not cosmetic — **S-13** arms a triumvirate trigger on *"a material divergence from **565+25**"*, and an executing seat running the published command will measure 563 and face a 2-count divergence manufactured by the command, not by the corpus.

**Cure**: amend the command to *"every `##` **or `###`** heading matching `UNPROVEN` / `SS-13`, excluding identity-guard sections"*, and name the kf-ChannelOptions addendum section as the one h3 member so the delta cannot regrow.

### D3-7 · LOW — `⟨X-W6 §MATRIX⟩` does not resolve to a §-heading, gate id or banked id

§H's I-20 row (`:199`) anchors the cell-separation law at *"⟨X-W6 §MATRIX + X.W11 §G8⟩"*. The sibling half resolves (`X/waves/W11.md:26/:70/:95`). `X/waves/W6.md` has **no §MATRIX**: its headings are numbered (`## 8. Verification Artefacts`), and "MATRIX" is a **bolded inline label at `W6.md:367`** inside §8's π-obligations paragraph. Under **R2-7** — which this spec declares binding on *"every cross-spec receipt this seat touched"* — the destination's §-heading, gate id or banked id is the anchor; an inline bold label is none of the three. The substance is present, so the grade is LOW; the anchor shape is not.

### D3-8 · LOW — two §Bounds paths do not resolve under the row's own shorthand base, against the row's "Paths re-resolve at origin/master" universal

- `:68` PRM-surface row establishes its shorthand base as `demo/scenes/` (opens with `demo/scenes/amiga/AmigaScene.vue`, then `cube/useCubeDemo.ts`), then cites **`cube/OrbitalDrag.vue`**. At **both** refs the file is `demo/scenes/cube/**orbital-drag/**OrbitalDrag.vue`. The row closes *"Paths re-resolve at `origin/master 81a56990` per KF.W0 §B-12"* — a universal this member falsifies.
- `:69` library row establishes base `src/animation/` (`group/group.ts:57` ✅, `constants/defaults.ts:87` ✅), then cites **`delegation.ts:50/:54/:64`**. The file is `src/animation/**waapi/**delegation.ts`; its `:54` (`const shadowTick`) and `:64` (`animation.playback.loop(shadowTick)`) do resolve there, so the offsets are sound and only the path is short.

Not stale-ref (both are stable across the two refs) — a shorthand-base failure. **Cure**: write the two paths in full, or state the shorthand base per member.

---

## §7 · WHAT THIS PASS DECLINES TO BOOK

Recorded so pass 4 does not manufacture them:

1. **No census escape.** Axis 1 is clean at 139/139. Any pass that books a hard escape must first defeat the eleven adjudications in §1.
2. **kf-TimelineTrack D-8 is not a W9 escape** — it routes → KF.W7; only its forced-colors arm folds to D-21, which is carried.
3. **The 565 / ≈590 denominator is not wrong** — only its published command is. Do not re-open the figure.
4. **R-11's `npm run gh-pages` repair is correct** — verified at `package.json:43` at the frontier. Do not re-file D-1.
5. **The round-1 decline (D-14, KF-EST-4's missing KF.W6 counterparty) stands** on R-19e; nothing in this pass disturbs it.
6. **G-KFW9-14's form** ("RED at authoring, re-stamped at open") is now consistent with the preamble; the round-1 D-13 cure holds.
7. **The two `D-15`s are distinct banked ids** (kf-RibbonBar forced-colors fold vs kf-SequencePlayhead RTL posture) — the round-2 anti-rename trail is correct and must not be merged.
8. **O-20/O-21 is not this wave's surface.** W9 is correctly silent; W1 carries O-21 at all five mint sites.

---

## §8 · VERDICT

**DEFECTIVE** — but narrowly, and on axes the two prior rounds did not reach.

The census axis, which consumed both prior repair rounds, is **closed**: 139 routed pairs, 139 discharged, zero escapes, and the whole counting family reproduces at the bytes. The M-25 depth axis is **clean** — every lock verbatim, every rider carried, every dissent present.

What survives twice-repairing is a different class. **Three HIGH defects are all failures of the wave's own central discipline turned inward**: a witness family anchored at the ref this wave exists to disqualify (D3-1); a born-RED gate witness that a one-line grep at either baseline refutes (D3-2); and a sibling's hard inbound dependency closed by silence in the very section headed *"declared from this end"* (D3-3). The three MEDIUMs are the same shape at lower stakes: a universal asserted rather than enumerated (D3-4), a count with no enumeration (D3-5), and a reproducing command that does not reproduce (D3-6).

None of the eight touches the wave's posture: it still measures, holds zero kf write grants, keeps status `planned`, keeps its gate ids un-renumbered, and spends no cure on any governed row. **All eight are repairable inside this spec, and none re-opens a ruling.**
