# KF-W0 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 1)

**Spec under trial**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W0.md` (320 L, authored 2026-08-28)
**Corpus authority**: the 58 `kf-*.md` records in `docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → 58, re-run this seat)
**Adjacent authorities read**: `X/keyframes/carry/KF-W6-CARRY.md` (366 L / 75 table rows) · `X/keyframes/waves/KF-W4.md` · `X/keyframes/waves/KF-W7.md` · `formation/keyframes/{CENSUS,lane-docs,lane-frontend,lane-library}.md` · `audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md`
**Subject tree probed read-only**: `/Users/mkbabb/Programming/keyframes.js` and `/Users/mkbabb/Programming/glass-ui`, 2026-08-28. Zero writes outside this file.

**VERDICT (local): DEFECTIVE** — 7 MAJOR · 5 MINOR. The spec's *measurement* is exemplary (every one of ~30 pasted RED baselines reproduces byte-exactly at this seat, §5); the spec's *enumeration* is not (§2, §3, §4).

---

## §0 — Census unit and method

The unit is **one distinct banked row-id (or named ruling / dissent) whose terminal disposition names KF.W0** — directly (`→ KF.W0`, `KF.W0 §B-12`, a roster routing cell) or by a fold the record itself terminates at census F-1/SCH-1, whose cure the whole corpus states as KF.W0 §B-12.

Extraction: every line in all 58 records matching `KF\.W0|KF-W0|\bW0\b` (238 lines), split into (a) roster last-cell routings (33), (b) explicit prose routings — `→ KF.W0`, `- **KF.W0**:`, `KF.W0 §B-12`, `routes to KF.W0` (76), (c) taxonomy/law boilerplate (discarded). Each survivor's row-id was then grepped against `KF-W0.md` **by bytes**.

| | count |
|---|---|
| **routedTotal** (distinct routed ids) | **95** |
| **booked** (carried as a row, a spelled-out fold-identity, or a loud exclusion) | **61** |
| **escaped** (routed at the registry, absent from the spec by bytes and not covered by a fold-identity the spec spells out) | **34** |
| records with **zero** KF.W0 routing | 6 of 58 (`kf-AnimationControlsGroup`, `kf-ChannelControls`, `kf-ControlsPaneWrapper`, `kf-KfPillTabs`, `kf-SpringPhysicsFacet`, `kf-TimelineTrack`) — verified by alias sweep for `B-12` / `SCH-1` / `substrate settle`: no hits |

`kf-DemoGlobalChrome` and `kf-KeyboardShortcutsModal` carry **no literal `KF.W0` string** but *do* carry KF.W0-owned census-shadow rows (§2.A) — they are counted routed, and both escape.

---

## §1 — BOOKED (61)

Carried by id, by a fold-identity the spec spells out, or by a loud exclusion-with-reason.

| # | Record · banked id | Registry receipt | Spec carry |
|---|---|---|---|
| 1 | kf-AmigaScene **C-1** | `:19`, `:145` "discharged by KF.W0 §B-12" | C-1 (named in the ≡ chain) |
| 2 | kf-AmigaScene **C-6** (S-9) | `:146` | C-17 provenance ⟨kf-AmigaScene C-6⟩ — *subject mis-described, see D-9* |
| 3 | kf-App **KF-APP-59** | `:114` "**KF.W0** substrate note + BH relay FYI" | C-16, G-0.2 |
| 4 | kf-App **ruling 1** | `:20` | C-1 ≡ chain |
| 5 | kf-ChannelOptions **L·B-2** | `:15`, `:54`, `:149` | C-4, G-0.3 |
| 6 | kf-CopyButton **D-9 / C-15 / M-6 leg 2** | "blocked on F-1" gates | C-1 "RE-SCOPED, not blocked" + Excluded |
| 7 | kf-CSSCodeEditor **KF-CE-32** | `:68`, `:133` | C-1 ≡ chain — *re-route undeclared, see D-10* |
| 8 | kf-CSSPasteDialog **corpus-integrity row (K-9)** | challenge-D evidence root | C-13, G-0.10 |
| 9–11 | kf-CubeAxisLines **KF-AX-12 · KF-AX-31 · KF-AX-32** | `:49`, `:57`, `:58` | C-11 · C-12 · C-10, G-0.6/G-0.7 |
| 12 | kf-CubeAxisLines **β-miss-1** | `--omit=optional` failure-SHAPE | Excluded (loud, "carried as narrative, booked as nothing") |
| 13–18 | kf-CubeScene **L-1 · M-1 · kill 3 · kill 4 · D-16 · L-5/C-6** | `:25`, `:26`, `:111`, `:174` | C-1 · C-2 · C-1 · Excluded · C-10 · C-17 |
| 19–22 | kf-EditorHeader **EH-1 · L-i2 · C-18 · F1(c)** | `:20`, `:34`, `:75`, `:117` | C-14 · C-15 · C-16 · C-17 |
| 23–26 | kf-EditorShell **RR-1 missed #1 ≡ RR-2 missed M1 · DISSENT 3 · DISSENT 1 · L-17** | `:27`, `:38` | C-3 · C-20 · C-19 · C-15 |
| 27–28 | kf-EditorStartScreen **L-EST-1/D-C9** · the **z-controls** cell | `:43` | C-9 · C-1 |
| 29 | kf-HeroAurora **KF-HA-6** | `:43`, `:118` | C-1 ("DISCHARGED BY, not blocking"), C-16 |
| 30 | kf-KeyframeCard **PARTIAL-CURE caveat** | fraction-for-percent / named-selector | C-6 + Excluded |
| 31 | kf-KeyframesEditor **KF-KE-21** (S-10 ask) | `:63` | C-17 "kf-KeyframesEditor asks S-10" |
| 32–35 | kf-KeyframesStringControls **L-M-9 · DISSENT 3 · DISSENT 4 · backward figures** | `:86`, tree-motion law, registry-sweep law | C-1 · C-2 · C-19 · N-2 |
| 36–37 | kf-KeyboardShortcutsModal **R-7 · R-9** | `:43`, `:45` | C-12 / G-0.7 · C-12 → KF.W4 — *provenance mis-paired, D-11* |
| 38–39 | kf-LayerConfigPanel **ruling 8** · the **FAM-01 RAIL** rider | `:29`, `:23` | C-17 · C-1 |
| 40 | kf-MatrixEditor **K1 / FAM-03 MR4** | CI test-project hole | KF.W4 cross-edge |
| 41–42 | kf-MbabbMenu **ruling 2 · K-2** | `:24`, `:106` | C-1 (8 specifiers / 5 modules) · C-19 |
| 43–44 | kf-OrbitalDrag **K15 · OD-11** | `:7`, `:161` | C-19 + C-2 (demo/utils −75 L) · C-10 |
| 45 | kf-RibbonBar **K10** | `:26` | C-1 (18 subpaths / 44 sites) |
| 46–47 | kf-SequenceAxis **L-5/C-7 · kills 8, 9** | `:52`, `:124` | C-9 (hard order) · C-19 |
| 48 | kf-SequencePlayhead **dirty-manifest law** (a priori) | `:71`, `:83` | C-19 provenance |
| 49 | kf-SequenceScene **F-1 limb + countable-cell datum** | `:145` | C-19 |
| 50 | kf-SharePopover **stripped-manifest artifact** | `:6`, `:112` | C-1 (restored at F-R5) |
| 51 | kf-SpringHeatmap **C-M-1** (S-9 `./canvas`) | `:46`, `:128` | C-17 |
| 52 | kf-SpringScene **emphasis migration observed live** | StartingStyleTarget | C-2 |
| 53 | kf-SpringTrace **re-measure rider** (L-2) | `:129` | C-1 verbatim (restored at F-R5) |
| 54–55 | kf-SquareInstrument **F-1 limb · C-11/C-12 (S-9/S-10)** | `:136`, `:140` | C-19 · C-17 |
| 56 | kf-SquareScene **comment-invariants law** | test-obligation law | NO-WAVE-OWNER cross-edge |
| 57 | kf-TimelineCaret **binding law + merge-base probes** | `:45` | C-2, G-0.1, G-0.9 |
| 58 | kf-TypingDots **KF-TD-2** | `:58` | C-21, N-4, G-0.9 |
| 59 | kf-ChannelOptions **four-subpath rider** | `:55` | C-1 |
| 60 | kf-ChromeDock **densest-consumer rider** | `:40` | C-1 (`:6-11`/`:22-28`/`:29`/`:158`) |
| 61 | kf-CubeTarget **src refactor-in-flight** | `:99` | C-2 |

---

## §2 — ESCAPED (34) — named by bytes

### §2.A — The shadow-census collision set (7 escapes) — the sharpest failure

C-17's mechanism reads: *"**Four** independent apotheoses each propose an S-9 for a **different** subject … plus a fifth record's requested S-10."* The registry holds **≥8 distinct S-9 claimants and ≥4 distinct S-10 claimants**. `grep -c` in `KF-W0.md` for each escaped record → **0**.

| # | Escaped id | Registry receipt (verbatim) |
|---|---|---|
| E-1 | **KF-AV-28 · D-18 = C-13** ⟨kf-AnimationVisualizer⟩ | `:72` "census extension **S-9**: the shadow census skipped the larger of the two rail/ball shadows … ScrubberTimeline (256 L vs the censused 162-L SequenceScrubber)". *This is the id KF.W7 carries as its own defining supersession rider (`KF-W7.md:7`).* |
| E-2 | **R-5** ⟨kf-CSSPasteDialog⟩ | `:43` "**S-9**: bespoke shadow of shipped `Textarea`, census-invisible" |
| E-3 | **D-5 / L-3 / C-2** ⟨kf-DemoGlobalChrome⟩ | `:43` "**FOLD → census S-9** (identity guard; the swap verdict is census-owned)" — the `./toast` family |
| E-4 | **C-9 → renumbered S-10** ⟨kf-KeyboardShortcutsModal⟩ | `:29` "**COLLISION — seat's own ruling: renumber to S-10**"; `:68` "C-9 `/command` shadow → census **S-10** (renumbered by this seat — see the ruled collision)". **Collides head-on with KF-KE-21's S-10 and kf-SquareInstrument C-12's S-10.** |
| E-5 | **K-6 / D-§S-9 = C-S-B** ⟨kf-SpringTrace⟩ | `:89` "**KILLED AS STATED** … `generateCurveSVGPath`" — a killed occupant of the same number |
| E-6 | **C·C-2's S-9 candidate** ⟨kf-SharePopover⟩ | `:90` "ALREADY CLOSED, TWICE … the S-9 slot is spoken for by an adjudicated booking (kf-EditorHeader.md:117). Refused per anti-rename" |
| E-7 | **KF-SKEL-7** ⟨kf-App.skeleton⟩ | `:42` routing cell = "**KF.W0** (re-anchor/re-count law: the §B-12 reconciliation adopts a cascade-level coupling arm beside the import census)". Carried **by id** in `KF-W6-CARRY.md:90`; `grep -c KF-SKEL KF-W0.md` → **0** |

C-17's own cure-shape is *"Mint every shadow row here under FRESH non-colliding ids, **in one motion**, each citing its originating record"* and *"Leaving this to a later wave is exactly what the anti-rename law forbids."* A roster short by six claimants — one of which the registry has **already** renumbered into a second collision — guarantees the next one.

### §2.B — Fold-by-reference rows whose id and rider both escape (11)

Each record terminates the row at KF.W0 and attaches a **rider the record instructs to travel with the fold**. C-1's blast-surface rider list carries only MbabbMenu / RibbonBar / ChromeDock / ChannelOptions / KSC / EditorStartScreen — so the F-1 blast surface C-9's hard order exists to scope is itself under-counted.

| # | Escaped id | Receipt · dropped rider |
|---|---|---|
| E-8 | **KF-ET-3** ⟨kf-EasingTarget:42⟩ | "FOLD by reference to SCH-1 → **KF.W0**" · rider dropped: *"4 specifiers here + 3 in the sidebar; sole consumer of `/fading-scroll` + `/toggle-group`"* |
| E-9 | **KF-ES-33** ⟨kf-EasingSidebar:77⟩ | "→ **fold to SCH-1 → KF.W0**; rider: this component's 3 subpath edges" · rider dropped |
| E-10 | **KF-ES-15** ⟨kf-EasingScene:54⟩ | "FOLD … (**KF.W0** Substrate Settle)" · rider dropped: *"this scene's exposure census (7 entry points across the closure)"* |
| E-11 | **KF-KE-16** ⟨kf-KeyframesEditor:58⟩ | "→ **FOLD to SCH-1/F-1 → KF.W0**" · rider dropped: *"the subpath-import blast radius (`/dark`, `/forms`) is real until the fork reconciles"* |
| E-12 | **KF-TFP-29** ⟨kf-TimingFunctionPanel:75⟩ | "→ fold to SCH-1 → **KF.W0**" · rider dropped: the 4.0.1-era prose `:25-31` = **KF-CO-17**, not a dependency defect |
| E-13 | **KF-AT-7** ⟨kf-AnimatedText:42⟩ | routing cell "**Declaration leg → KF.W0**" (three-way-drift evidence attached) |
| E-14 | **L·B-3 / C·B-2** ⟨kf-ChannelOptions:31,:55⟩ | "FOLD → **KF.W0 §B-12**" — the record's own KF.W0 packet (`:149`) is *"the L·B-3 discharge + the three-file disk↔master reconciliation"*; the spec carries only the second half |
| E-15 | **L/B-1** ⟨kf-ChromeDock:40⟩ | "FOLD → census SCH-1/F-1 (**KF.W0** substrate settle)" |
| E-16 | **F-1 row C-11 / L-I1** ⟨kf-CSSPasteDialog:72⟩ | "Fold by reference → the census's own F-1 row (**KF.W0**/W6 precondition). **All six of this file's component imports ride it.**" |
| E-17 | **F-1 row L-5 / C-11** ⟨kf-KeyframesAddDialog:87⟩ | "**FOLD by reference → census F-1** (KF.W0/W6 precondition). All six glass imports ride it" |
| E-18 | **L-9 = C-D-7 = C-D-9** ⟨kf-KeyframeCardList:120⟩ | F-1 fold, "identity owned by lane-frontend §10 step 1, exactly as kf-CSSCodeEditor's KF-CE-32 folded it" |

### §2.C — F-1-fold row-ids escaping by bytes (13)

Content carried by C-1's mechanism; **ids absent**. Under an ID-KEYED census these are escapes: no later seat can grep the spec for its own row.

| # | Escaped id | Receipt |
|---|---|---|
| E-19 | **K17** ⟨kf-MatrixEditor:34,:128,:170⟩ | "K17 ≡ census F-1/SCH-1 → **KF.W0 §B-12**" |
| E-20 | **OD-41** ⟨kf-OrbitalDrag:94,:124⟩ | "NO-WAVE-OWNER hygiene; I-3's residue ≡ census F-1 → **KF.W0 §B-12**" |
| E-21 | **C-14** ⟨kf-PlaybackRibbon:141,:152⟩ | "C-14 ≡ census F-1 → **KF.W0 §B-12**" |
| E-22 | **L-2** ⟨kf-KeyframeCard:24,:103⟩ | "glass-ui dependency family → census SCH-1 / kf-App ruling 1 → **KF.W0**" |
| E-23 | **K-1 / L·D-2** ⟨kf-SequenceScrubber:71,:80⟩ | "**KF.W0 fold**"; L·D-2 = the MAJOR half, dropped (see D-7) |
| E-24 | **K-1 / row 1** ⟨kf-SequenceTarget:21,:105,:154⟩ | "the K-1 fold (census F-1/SCH-1, §B-12)" |
| E-25 | **K-1** ⟨kf-SpringHeatmap:80,:117⟩ | "→ **KF.W0**; sixth-plus baseline event" |
| E-26 | **K-1** ⟨kf-SpringScene:95,:149⟩ | "**KF.W0 §B-12**: the K-1 substrate reconciliation" |
| E-27 | **B-1 / K-1 / row 11** ⟨kf-SpringTarget:29,:87,:132⟩ | "B-1 ≡ census F-1 ≡ SCH-1 ≡ kf-CubeScene M-1 residue → **KF.W0 §B-12**" |
| E-28 | **K-1 / row 7** ⟨kf-StartingStyleTarget:27,:89,:130⟩ | "K-1 ≡ census SCH-1 ≡ F-1 → **KF.W0 §B-12**" |
| E-29 | **L-20/C-7** ⟨kf-SquareScene:108,:119⟩ | "residue → **KF.W0 §B-12**" |
| E-30 | **K4/K5** ⟨kf-LayerConfigPanel:88,:97,:125⟩ | "K4/K5's manifest schism ≡ census F-1/SCH-1 → **KF.W0 §B-12**" |
| E-31 | **i-1 / F-1 / row 7** ⟨kf-RibbonBar:26,:60,:128⟩ | "**KF.W0 §B-12**: the phantom-dep substrate schism (K10 …)" |

### §2.D — Registry-correction escapes (3)

| # | Escaped id | Receipt |
|---|---|---|
| E-32 | **MISS-α5 ≡ RR-β K-BASE** ⟨kf-TimelineCaret:45⟩ | Content (hybrid tree, merge-base, untracked-but-cited) is at C-2/G-0.1; the id and one attached correction escape: *"This row also **CORRECTS the banked kf-KeyframeTimeline header's 'working tree = the audited tree' equation**"* — a G-0.9 appended-correction obligation, uncarried |
| E-33 | **`TABS_EXTERNALLY_MANAGED_KEY` @ `App.vue:176` (not the banked stale-HEAD `:169`)** ⟨`KF-W6-CARRY.md:354`, §CrossEdges "→ KF.W0"⟩ | `grep -c 'App.vue:176\|TABS_EXTERNALLY' KF-W0.md` → **0 / 0** |
| E-34 | **`--dock-margin` = 9 live unfallbacked sites + 1 prose mention** ⟨`KF-W6-CARRY.md:354`, same edge⟩ | `grep -c 'dock-margin' KF-W0.md` → **0** |

---

## §3 — DEFECTS

### D-1 · MAJOR — C-17's S-9/S-10 collision roster is short by six claimants, and one of them already collided again
Spec C-17: *"**Four** independent apotheoses … plus a fifth record's requested S-10."* Registry: ≥8 S-9 claimants, ≥4 S-10 claimants (§2.A). Un-enumerated: `kf-AnimationVisualizer:72` (S-9, ScrubberTimeline — the KF-AV-28 that is KF.W7's defining rider), `kf-CSSPasteDialog:43` (S-9, Textarea), `kf-DemoGlobalChrome:43` (S-9, `./toast`), `kf-SpringTrace:89` (S-9, killed-as-stated), `kf-SharePopover:90` (S-9, refused), and **`kf-KeyboardShortcutsModal:29` — "COLLISION — seat's own ruling: renumber to S-10"**, which lands on top of `kf-KeyframesEditor:63`'s S-10 and `kf-SquareInstrument:78`'s S-10. C-17's mandate is a single-motion mint of *every* shadow row; a short roster is the precise mechanism of the collision it exists to kill. **Receipt**: `grep -c 'AnimationVisualizer\|DemoGlobalChrome\|KeyboardShortcutsModal\|KF-AV-28' KF-W0.md` → 0/0/1(as "kf-KeyboardShortcutsModal, R-9" only)/0.

### D-2 · MAJOR — G-0.10's only positive act names a script that does not exist at any coordinate
The spec requires *"one fresh `build:gh-pages`"* (C-13, G-0.10 GREEN, the KF.W6 cross-edge, and §Cadence's sole carve-out from the no-runs rule). **Receipt**: `git grep -n 'build:gh-pages' origin/master` → no hits; `git show origin/master:package.json | grep -n gh-pages` → `43: "gh-pages": "vite build --mode gh-pages"`. Same at HEAD and in the worktree. The real invocation is `npm run gh-pages`. A substrate wave whose whole content is *"name the tree, name the command"* ships an unrunnable command in four places.

### D-3 · MAJOR — G-0.7's born-RED enumeration is short by three demo sites, on the one gate whose entire content is enumeration completeness
F-R4 claims the dead-gate surface was widened and *"measured at `origin/master` 2026-08-28"*, naming 7 sites. **Receipt**: `git grep -n 'proof:brittleness\|proof:font-census\|proof:styling-idioms' origin/master -- demo/` → **10** sites. Missing from the spec: `demo/DESIGN.md:237` (`proof:styling-idioms`), `demo/components/instrument/shell/EditorStartScreen.vue:159` (`proof:styling-idioms`), `demo/scenes/sequence/SequenceTarget.css:212` (`proof:styling-idioms`). A sweep executed against the spec's list leaves three citations alive — which is the spec's own stated falsifier (*"a sweep that strikes only the two banked citations while `DESIGN.md:250` survives"*) reproduced one level up.

### D-4 · MAJOR (L-19 / axis 3) — G-0.4's FE-3 leg has no addressable witness
GREEN: *"FE-3's `/\[object Object\]/` smoke assertion"* as the born-RED witness. **Receipt**: there is **no `e2e/` directory** in keyframes.js — `git ls-tree --name-only origin/master` lists `.changeset .claude … bench demo docs … scripts src test …`, no `e2e`; `ls -d e2e` → *No such file or directory*; `git grep -n 'object Object' origin/master -- e2e/ test/` → **zero hits**. The assertion exists only as a *planned* born-RED gate of keyframes.js's own tranche V (`origin/master:docs/tranches/V/V.md:73` "pageerror==0 + no `[object Object]`"; `PROGRESS.md:120` "BORN-RED"). The spec names neither an existing path nor a to-be-created one. EE-01's *"pageerror→0 on `/#/easing` and `/#/spring`"* and EE-03's *"watch-warn-count→0"* likewise name no command (the nearest real instruments are `scripts/observe/demo/live-session.mjs` / `scripts/capture.mjs`, uncited).

### D-5 · MAJOR (M-25) — sequencing riders dropped from six fold-by-reference rows
§2.B: KF-ET-3's `4 + 3` specifier exposure and sole-consumer-of-`/fading-scroll`+`/toggle-group` cell; KF-ES-33's 3 subpath edges; KF-ES-15's 7 entry points; KF-KE-16's `/dark`+`/forms` blast radius; KF-TFP-29's KF-CO-17 unpinned-rationale rider; the "all six imports ride it" cells at kf-CSSPasteDialog:72 and kf-KeyframesAddDialog:87. C-1's blast-surface list stops at six records. The consequence is exactly the harm C-9's hard order names: *"must land BEFORE the F-1 remediation scopes its blast radius, else the reconciliation under-counts what it can break."*

### D-6 · MAJOR (posture axis 5) — KF.W6's CARRY declares a §CrossEdge into KF.W0 that KF-W0.md does not carry
`carry/KF-W6-CARRY.md:354`, `## §CrossEdges (declared from this end)`: *"**→ KF.W0 · Substrate Settle.** … Carried corrections this seat measured: the `TABS_EXTERNALLY_MANAGED_KEY` provide site is **`App.vue:176`**, not the banked stale-HEAD `:169`; `--dock-margin` has **9 live unfallbacked sites + 1 prose mention**. §B-12 owes: … the cascade-level coupling arm beside the import census (**KF-SKEL-7**)."* **Receipt**: `grep -c` in `KF-W0.md` → `App.vue:176` 0 · `TABS_EXTERNALLY` 0 · `dock-margin` 0 · `KF-SKEL` 0. All three are G-0.9 appended-correction business; the two byte-level corrections are precisely the class C-20 names as the wave's test case. The edge is declared from W6's end and unanswered from W0's.

### D-7 · MAJOR — C-9 mis-cites its own source id and drops the MAJOR half
Spec C-9: *"≡ **kf-SequenceScrubber D-11/C-13** folded by name."* **Receipt**: the record's row is **`C·C-13 / L·D-2`** (`kf-SequenceScrubber.md:71` and `:126` — "C·C-13 ≡ banked kf-SequenceAxis L-5/C-7 legend rider → KF.W0 §B-12"). `D-11` in that record is a different family — `D·D-11` at `:57` (aria-valuenow/valuetext) and `L·D-11` at `:65` (centre-anchor, killed at K-5) — routing to KF.W7/W9, not W0. `L·D-2`, the MAJOR half that carries the cascade-coupling finding, is dropped by bytes. A wave that mis-names its own provenance cannot discharge C-19's "unread registry" law.

### D-8 · MINOR — C-19's "25 records" is unenumerated and under-counted
The row claims *"Enumerated and dated per firing"* and heads "— 25 records". Distinct record names in the cell: **24** (16 firings + 4 sibling-class + 2 law provenances + 2 anti-inheritance). At least eight further records bank their own firing and are absent: `kf-MatrixEditor` K17 (*"re-fired r3 → BOTH"*), `kf-SequenceTarget` K-1, `kf-SharePopover` (*"at least the SIXTH firing of the class"*, `:75`), `kf-SequenceScrubber` K-1 (*"the sixth one-baseline-short event"*, `:23`), `kf-LayerConfigPanel` K4/K5, `kf-CubeTarget` (*"the same event"*, `:29`), `kf-KeyframeCard` L-2 (a reader-confirmation reversal), `kf-EasingScene` (*"Fourth and fifth occurrences of frontier-blindness"*, `:54`).

### D-9 · MINOR — C-17's fourth S-9 subject is mis-described
Spec: the fourth proposal is *"an extension of S-1."* `kf-AmigaScene.md:61`/`:146` books C-6's S-9 as **`Surface` / `PaperBackdrop` / `Card` shadowed by 8 lines of bespoke CSS**, which *"extends S-1..S-8"* (the block). S-1 is `KfPillTabs → SegmentedTabs` (`lane-frontend.md:264`). Different subject.

### D-10 · MINOR — KF-CE-32's routing is silently changed
Spec KF.W12 cross-edge: *"census F-1's owning id is **KF-CE-32**, discharged at KF.W0 §B-12."* `kf-CSSCodeEditor.md:68`: *"**KF-CE-32 · L-i4 = C-16 — FOLD, not booked here** … identity owned by **lane-frontend §10 step 1** … → **FOLD → census F-1 (KF.W6-adjacent sequencing)**."* The record makes KF-CE-32 a folded index owned by the lane file and sequences it W6-adjacent; the spec makes it the owning id and W0's. Defensible as a ruling — undeclared as one (E-3 requires the correction be appended and loud).

### D-11 · MINOR — C-12's provenance tag mis-pairs the row
Spec C-12: *"+ **R-7's** dead-`proof:font-census` arm ⟨kf-KeyboardShortcutsModal, **R-9**⟩."* `kf-KeyboardShortcutsModal.md:43` = R-7 (the dead-gate row); `:45` = R-9 (no automated verification — the KF.W4 arm). The spec separates them correctly later in the same cell, so the tag is a transcription slip, but it is the exact class C-19 books.

### D-12 · MINOR — Bounds names a phantom path and omits one the wave writes
"Do NOT touch" lists `keyframes.js/e2e/**`; **no `e2e/` exists at any coordinate** (D-4 receipt). Conversely `dist/gh-pages/**`, which G-0.10's fresh build writes, appears in neither the Bounds table nor the Do-NOT-touch list — the wave's one product-byte-producing act is outside its declared bounds surface, in a spec whose Triumvirate Dispatch reads *"Product bytes in a substrate wave invalidate it."*

---

## §4 — AXES THAT PASS

**Axis 4 (E-3 + STATUS) — CLEAN.** `grep -n VERIFIED KF-W0.md` → one hit, `| VERIFIED | **NO** | stamped only at KF.W10's sub-tranche release close (R-A) |`. `**Status**: **planned**` (`:24`). No execution verb in current voice; the past-tense measurement verbs in the Fold Note describe the authoring act and are true (§5). No product source is opened by any unit: OP-1 is declared the owner's hand and every other unit writes `docs/**`. E-3's append-never-rewrite discipline is stated at C-20, G-0.9, N-2 and the Bounds row for the 58 records.

**Axis 3 (born-RED, no proof scripts) — CLEAN except D-4.** All ten gates are RED at authoring and RED *for their intended reason*. L-19 is honoured explicitly: *"No proof script is authored for any gate — every one is a `git`/`grep`/`node -p` one-liner or a named live witness"*, and §Cadence forbids inventing a green run over untouched code. G-0.5 is correctly a **negative** gate that bounds G-0.2 rather than following it. The only witness failure is G-0.4's three unaddressed oracles (D-4).

**Posture axes — CLEAN except D-6.**
- *KF.W4 as DECLARED SEQUENCING HEAD*: `KF-W4.md:193` — *"This wave is the declared sequencing head of X·KF. No repair packet and no UNIT may open before **G-KFW4-1** lands."* KF-W0 is a substrate wave, not a repair packet or UNIT; it routes the demo-typechecking arm to W4 against the single banked no-SFC-typecheck identity, makes G-0.7 W4's precondition, and repeats "after KF.W0 + KF.W4" on every UNIT. No conflict.
- *KF.W3 GATED via PLAW-BIND, never scheduled*: carried verbatim — *"**KF.W3 is GATED on PLAW-BIND → V.L1/V.L5 → packed Value release**"* — and W3 is scheduled nowhere in the file.
- *KF.W7's KF-AV-28 supersession rider*: W0 declares no KF.W7 edge, which is defensible for a substrate wave — except that KF-AV-28 is simultaneously an escaped S-9 claimant (E-1), so W0's silence is where the rider bites.
- *KF.W6 / its CARRY file*: **D-6**.

---

## §5 — WITNESS RE-MEASUREMENT (this seat, 2026-08-28, read-only)

Every pasted RED baseline was independently re-run. **All reproduce byte-exactly. Zero fabricated citations found anywhere in the file.**

| Spec claim | This seat's run | Result |
|---|---|---|
| behind 41 / ahead 1 | `git rev-list --count HEAD..origin/master` → 41 · reverse → 1 | ✓ |
| 252 · 325 · 124 | `git status --short \| wc -l` → 252 · `git diff --name-only origin/master \| wc -l` → 325 · `git ls-files --others --exclude-standard \| wc -l` → 124 | ✓ |
| merge-base / HEAD / frontier | `a59d3a22da080a8ed224e8d675112bb3bb0135b0` · `8281638c0ac4…` · `81a56990736c…` | ✓ |
| four manifest coordinates | HEAD `:71` `"6.0.0"` · origin `:77` `"7.0.0"` · worktree grep 0/0 · lock 3/3 · installed `7.0.0` · `.npmrc` = `legacy-peer-deps=true` · `ls node_modules/@mkbabb/` = glass-ui parse-that value.js (no pencil-boil) | ✓ all |
| G-0.3 stat block | 4 files, 6 insertions, 76 deletions, identical to the pasted block | ✓ |
| EE-01 | HEAD `:42` `bounceInEase` · origin `:42` `easeInBounce` · `git status --short -- CopyButton.vue` empty | ✓ |
| FE-3 | HEAD `:11` `.toString()` · origin `:11` `startScalar(frames[i].start)` | ✓ |
| EE-03 / N-3 | origin `useKeyframesParsing.ts:97` = `() => animation.templateFrames.length,` · `git grep 'templateFrames.length' HEAD -- demo/` → exactly the 2 named guard sites (`KeyframesEditor.vue:204`, `useKeyframeOps.ts:179`) | ✓ (F-R3 correct) |
| G-0.5 | glass HEAD `header-ribbon/` empty · `4bf53962^` → 5 files · `grep -c header-ribbon package.json` 0 · `origin/master:EditorShell.vue:116` imports `/header-ribbon` · `dist/header-ribbon.js` present | ✓ all |
| G-0.6 | 153 src `.ts` · 58 demo `.vue` · 185 demo `.ts\|.vue` | ✓ |
| N-4 | `git diff --stat origin/master -- TypingDots.vue` empty; vs HEAD 1 file 4+/9− | ✓ |
| N-2 | disk `emit/backward.ts` 393 L ≡ frontier `emit/backward/backward.ts` 393 L; HEAD 410 L; frontier layout `backward/{backward,color,index,walk}.ts` | ✓ |
| G-0.7 roster | origin `:37` check (no vue-tsc) · `:44` lint · `:50/:51/:52` the three real gates · `scripts/gates/` = structure surface visual | ✓ |
| G-0.9 | 58 records; `grep -lci 'ref-of-record'` → **0** · `git status --short demo/utils/` → `?? formatEditorCSS.ts`, `?? keyframeSelector.ts` | ✓ |
| G-0.10 companion | `dist/gh-pages/assets/index-CL_QYCiO.css` → **Jul 16 09:11** | ✓ |
| F-R6 | `grep -c '^### S-' lane-frontend.md` → 8; S-1 `:264` … S-8 `:387` | ✓ |
| lane-docs:380 | row 16 §B-12, verbatim *"Blocked from our side by lane law and by their sacred-checkout rule — value.js must NOT perform it"* | ✓ |
| C-18 / OG-KF1 | `INTAKE-ADJUDICATION-2026-08-03.md:232` — OG-KF1 ≡ B21-18, verbatim; §3 `### KF.W0 · Substrate Settle` = X-1 · B10-9 · B19-10(pin half) · B19-11 · B20-6 · B21-7 | ✓ |
| **`build:gh-pages`** | **absent at HEAD, origin/master and worktree** | **✗ D-2** |
| **dead-gate site roster** | **10 demo sites at origin/master, spec names 7** | **✗ D-3** |
| **FE-3 smoke assertion** | **no `e2e/`; zero `object Object` in `e2e/` or `test/`** | **✗ D-4** |

---

## §6 — Local verdict

**DEFECTIVE.** The wave's evidentiary spine is sound — the measurement discipline is the best in the program and F-R1..F-R7 are honest, dated, and reproducible. The failures are all failures of **enumeration**, and they cluster on the two rows whose entire content is enumeration: **C-17** (the shadow-census collision, short by six claimants including one already-renumbered S-10 — D-1) and **G-0.7** (the dead-gate roster, short by three sites — D-3). Beside them sit one unrunnable command (D-2), one gate leg with no addressable witness (D-4), six dropped sequencing riders (D-5), an unanswered inbound edge from KF.W6's own CARRY (D-6), and one mis-cited source id (D-7). 34 of 95 routed ids escape by bytes.

*Written by the PASS-1 adversarial seat. Product source read-only throughout; this file is the only write.*
