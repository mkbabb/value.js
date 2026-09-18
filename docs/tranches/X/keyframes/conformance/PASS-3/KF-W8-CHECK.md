# KF-W8 — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, pass 3)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W8.md` — 359 L / 100 895 B, repaired twice (round 1 after PASS-1, round 2 after PASS-2) and then swept by a cross-spec re-anchor pass.
**Corpus authority**: the **58** `kf-*.md` records at `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → 58). Sole in-tree carry `carry/KF-W6-CARRY.md` (201 rows), consulted only for the KF.W6 reciprocity axis.
**Product tree (TREE LAW)**: `/Users/mkbabb/Programming/keyframes.js`, read-only. `git rev-parse origin/master` → **`81a56990736ced5b5edde0b84c527680ac7689b1`** — re-resolved this seat, and it still equals the ref the spec declares. Local `HEAD`/`master` = **`8281638c`** (disqualified), worktree dirty at **252** rows, merge-base `a59d3a22`, neither ref an ancestor of the other. **Every product measurement below was taken against `origin/master`**; the two places where the spec's own command reads the disqualified ref are booked as defects (D-7), not inherited.
**Seat posture**: FRESH. The census was re-enumerated from bytes, every gate re-executed, and every cross-spec receipt re-resolved at the sibling specs' **current** bytes. PASS-1/PASS-2 registers and RULINGS were read only to confirm which directives were claimed applied — **no measurement, list, or verdict was inherited from them**, and the pass-2 register's per-gate ✅ marks were re-derived rather than trusted (two of them do not survive).

**Verdict: DEFECTIVE.** The **ID-keyed census is CLEAN** — 32 routed / 32 booked / **0 escaped**, re-enumerated by bytes with the fold-transitivity sweep closed independently — and the registry-verbatim axis (M-25) holds byte-exact at every site re-read. What fails is the axis this pass was called on: **witness reality at the frontier**. Three gates carry born-RED text that does not reproduce or cannot be reached (**G8 leg (i)** under-counts the frontier by one un-bounded site; **G13**'s "named-11 check" reproduces under no reading of its stated anchor; **G10**'s entire RED condition is booked as a commit at its own declared predecessor KF.W4), one gate's literal command does not implement its predicate (**G7** leg (iii)), one gate's command is unsatisfiable against its own allowance (**G15**), one gate's oracle reads the disqualified ref (**G9**), and the §State cell that repair round 2 re-cut *specifically because its figure carried no command* still states a figure that does not reproduce. **3 HIGH · 5 MEDIUM · 5 LOW.**

---

## 1 · ID-KEYED CENSUS — full re-enumeration, escapes by bytes

### 1.1 Method (nothing inherited)

- `grep -c 'KF\.W8' kf-*.md` over all 58 records → **47** hit lines across **18** records (`grep -l 'KF\.W8' kf-*.md | wc -l` → 18). Every one of the 47 was read whole and classified as **routing-law boilerplate** (the KF.W0–W10 taxonomy paragraph), **closing-verdict summary**, or a **row-terminal routing**.
- Alternate-spelling sweep, independent of the above: `grep -nE '\bW8\b|W\.8|[Ww]ave[ -]8' kf-*.md | grep -v 'KF\.W8'` → boilerplate taxonomy lines only, plus the single non-KF token `L.W8 ED-3` (`kf-OrbitalDrag.md:82`, a *value.js* tranche-ledger cite inside OD-34, NO-WAVE-OWNER — correctly not a KF.W8 routing; the same token recurs inside the routed `KF-CE-42` at `kf-CSSCodeEditor.md:80`).
- Wave-by-name sweep: `grep -n 'Structure & Colocation\|Colocation Settle\|structure & colocation'` with `KF.W8` lines removed → **routing-law boilerplate only**. No record routes to this wave by name without the token.
- Fold-transitivity: every W8-terminal identity `grep -ln`'d across all 58 records. Three off-record occurrences opened and all three closed as non-escapes on this seat's own read: `KF-CE-12` at `kf-TimelineHoverPreview.md:112` (cited as the **negative comparator** for a clean boundary — "in a cluster banked for reaching into library-private `src/` (C-12/KF-CE-12 family)"); `KC-30` at `kf-KeyframeCard.md:75` (a **different id**, `KF-KC-30`, two dead glass `<Label>`s → NO-WAVE-OWNER); `KAD-24` at `kf-SpringPhysicsFacet.md:125` (a provenance note about RR-2's contribution, the routing itself being at `:62`).

### 1.2 Routed roster — 32 registry ids, id-for-id, each with its terminal locus and its carriage

`grep -c` for each id over `KF-W8.md` returned **≥1 for all 32**; the counts are printed so a later seat can re-run them.

| # | id | source : line | terminal routing | in KF-W8.md | booked at |
|---|---|---|---|--:|---|
| 1 | KF-CE-12 | kf-CSSCodeEditor:46 | "extirpation → **KF.W8**" | 7 | Rows 1 · unit c · G1/G2 |
| 2 | KF-CE-42 | kf-CSSCodeEditor:80 | "Body folded into KF-CE-12's routing. → **KF.W8**" | 2 | Rows 2 (identity for life) |
| 3 | KF-AV-8 | kf-AnimationVisualizer:49 | "→ **KF.W8**" | 9 | Rows 3 · unit c |
| 4 | KF-AV-9 | kf-AnimationVisualizer:50 | "→ **KF.W8** with KF-AV-8" | 5 | Rows 5 (bounding note verbatim) |
| 5 | KF-AV-18 (W8 arm) | kf-AnimationVisualizer:62 | "prose sweep rides KF-AV-8's KF.W8 decision" | 5 | Rows 6 (regex pin refused to W4) |
| 6 | KF-AV-24 | kf-AnimationVisualizer:68 | "→ **KF.W8** (seam consolidation decision)" | 4 | Rows 27 · G14 |
| 7 | KF-AV-26 | kf-AnimationVisualizer:70 | "→ **KF.W8**" | 6 | Rows 26 · unit h |
| 8 | KF-AV-35 | kf-AnimationVisualizer:82 | "Folds into KF-AV-8/KF-CE-12 → KF.W8" | 2 | Rows 4 (K-10 read-down carried) |
| 9 | C-10 ⟨CSSPasteDialog⟩ | kf-CSSPasteDialog:75 | "**→ KF.W8** (test-tree isomorphism)" | 2 | Rows 25 · unit g · G12 |
| 10 | KF-HA-14 | kf-HeroAurora:56 | "Fold-by-reference → KF-AT-26(c) → **KF.W8**" | 2 | Rows 14 |
| 11 | KF-AT-26(c) | kf-AnimatedText:71 · kf-HeroAurora:120 | "(c) **KF.W8** (colocation settle)" | 7 | Rows 13 + IDENTITY GUARD |
| 12 | L-19/C-14 | kf-KeyframeTimeline:77 | "**→ KF.W8**" | 12 / 2 | Rows 18 |
| 13 | C-12 ⟨KeyframeTimeline⟩ | kf-KeyframeTimeline:78 | "**→ KF.W8** (publish-or-relocate) + KF.W4" | 5 | Rows 9 |
| 14 | N-11 | kf-KeyframeTimeline:101 | "**→ KF.W8**" | 5 | Rows 19 · unit f · G5 |
| 15 | MISS-β2 | kf-TimelineCaret:46 | "**→ KF.W8** (publish-or-relocate, joint with banked C-12)" | 4 | Rows 10 · unit d · G3 |
| 16 | m-7 | kf-TimelineCaret:59 | "**→ KF.W8** (rename with the colocation move)" | 5 | Rows 21 (C-15 closure honored) |
| 17 | L-8 | kf-TimelineCaret:81 | "= banked N-11 (INFO, → KF.W8)" | 3 | Rows 20 |
| 18 | m-15 | kf-TimelineTrack:104 | "= banked N-11 (**→ KF.W8**)" | 3 | Rows 20 (same line) |
| 19 | R-10 ⟨KeyboardShortcutsModal⟩ | kf-KeyboardShortcutsModal:46 / :127 | "**→ KF.W8**" | 6 | Rows 24 · G10/G11 |
| 20 | KAD-24 | kf-KeyframesAddDialog:77 | "**→ KF.W8** (structure/colocation)" | 5 | Rows 15 · unit e · G4 |
| 21 | KAD zero-coverage | kf-KeyframesAddDialog:89 | "Fold identity → the twin's C-10. **→ KF.W8**" | — | inside Rows 24 |
| 22 | L-17 colocation | kf-KeyframesAddDialog:92 | "**→ KF.W8**" | 5 | Rows 23 · unit b (KF.W8-I) |
| 23 | KF-KC-42 | kf-KeyframeCard:87 | "rides the **R-7 consolidation (KF.W8)**" | 2 | Rows 30 + R-3 |
| 24 | KF-KC-45 | kf-KeyframeCard:90 | "**→ KF.W8** (adopt-or-delete)" | 2 | Rows 17 (folded into KAD-24, R-2) |
| 25 | KC-30 | kf-KeyframeCardList:66 | "→ **KF.W8** (colocation settle)" | 5 | Rows 22 · unit f · pure-move |
| 26 | KF-KE-15 | kf-KeyframesEditor:57 | "**FOLD to KF-CE-12 → KF.W8**" | 3 | Rows 7 |
| 27 | C-8 ⟨KeyframesStringControls⟩ | kf-KeyframesStringControls:81 | "**KF.W5** (surface) + **KF.W8** (colocation)" | 2 | Rows 8 + split lock ⟨see D-13⟩ |
| 28 | C-13 ⟨PlaybackRibbon⟩ | kf-PlaybackRibbon:154 (+ :57) | "**KF.W8**: C-13 ≡ KF-AV-8/-9" | 2 | Rows 11 — fold only |
| 29 | M-4 ⟨RibbonBar⟩ | kf-RibbonBar:66 / :132 | "**KF.W8** … RibbonBar-side spec input" | 6 | Rows 28 · G15 + collision guard |
| 30 | m-4 ⟨RibbonBar⟩ | kf-RibbonBar:132 | "+ the m-4 fold's directory settle" | 4 | Rows 29 — MEASURED-DIVERGENT |
| 31 | KF-CB-37 | kf-CopyButton:85 | "→ **KF.W8** … same wave as the KF-CB-7 reshell decision" | 7 | Rows 12 · unit f · G6 ACTING |
| 32 | SPF-22 | kf-SpringPhysicsFacet:62 | "FOLD ≡ KAD-24 … → **KF.W8**" | 3 | Rows 16 |

**Non-registry rows additionally carried**, declared as census-derived: `census §(a)9 + §2-flags · src/animation single-child` (unit e · G13) · `census §1 tests-row (LIB §5) · two orphaned *.measure.test.ts` (unit g · G9) · `census §3 FE §7 · colocation ratification` (unit b). All four census anchors re-resolved this seat and **EXACT**: `CENSUS-2026-08-03.md:64` (*"131 files, 1 051 cases, **0 colocated** … two bench `*.measure.test.ts` picked up by NO vitest project (LIB §5)"*), `:107` (*"16 dir/name stutters + the `src/animation` single-child; 17 type-only cycle rings"*), `:142-144` (the FE §7 ratification sentence), `:201` (*"9. **KF.W8 · Structure & Colocation Settle** — the `src/animation` single-child flatten decision"*), and the taxonomy span `:179-206`.

### 1.3 Escapes

**ZERO.** No id anywhere in the 58-record corpus carries a terminal disposition to KF.W8 and is absent from `KF-W8.md`. The four inbound sibling edges (R-19c) are each booked (ii, iii, iv) or declined-with-owner (i); none is left neither.

### 1.4 Excluded-with-reason — spot-verified at the bytes

Five rows re-read at their registry anchors, **all EXACT**: **M-L3** `kf-DemoGlobalChrome.md:70` ✅ verbatim incl. *"have zero consumers repo-wide"*, NO-WAVE-OWNER · **L-16-RESCOPED + RR-2 M4** `kf-EditorShell.md:79` ✅ incl. *"the 'route through the barrel' remedy is REFUTED"* · **KF-APP-41** `kf-App.md:91` ✅ *"EditorHeader: 0 consumers, still barrel-exported on App's import path | NO-WAVE-OWNER (delete)"*, with the fold at `kf-EditorStartScreen.md:52` ✅ · **C-22 + D-27 + RR-2 M7** `kf-EditorShell.md:95` ✅ (the shipped-token rider is carried; the elision inserts one `)` the source does not have at that position — noted, not booked) · **KF-KC-37 · SP-18 · KF-KE-53** declined with owner KF.W6, each banked exactly where named (`kf-KeyframeCard.md:82` · `kf-SharePopover.md:54` · `kf-KeyframesEditor.md:98`, all three routing → **KF.W6**) and booked as one sweep at `KF-W6 §Carry · W6-I` (`KF-W6.md:280`), whose honest-scoping verbatim *"graph width, NOT crash exposure; consistency, not bundle size"* reproduces byte-exact. **M-L2** (`kf-DemoGlobalChrome.md:69`), cited by R-1's destination law as the conviction of the single-file generic bucket, is real and correctly not annexed.

---

## 2 · AUTHORITY REALITY — every cross-spec receipt re-resolved at its anchor

| receipt as written in KF-W8 | resolves? | this seat's re-derivation |
|---|---|---|
| `KF-W5 §Carry · Arm D · row D-6` | ✅ | `KF-W5.md:235`; the verbatim of record — *"The do-not-split lock is SATISFIED by decline-whole … the rename programme (16 stutters) executes here, whole."* — reproduces **byte-exact** (`grep -c` → 1) |
| the pass-2 phantom verbatim, struck | ✅ | `grep -c 'do not split mid-cure' KF-W5.md` → **0**; `grep -c 'One rename programme'` → **0**. The strike stands |
| `KF-W5 §Gates · G-STRUCT` (leg 2) | ✅ | `KF-W5.md:262`; D-6's *lands as* cell reads "**G-STRUCT** (leg 2)". G-STRUCT now states **12 stutters**, and its own round-2 rider directs KF.W8 to "quote **12**, or quote the SET" — KF-W8 does both (prints 12 as its own re-derivation; binds by GATE ID). Compliant |
| `KF-W5 §Sequencing · "→ KF.W8" cross-edge`, legs (a)(b)(c)(d) | ✅ | `KF-W5.md:291`. Leg (c) — *"`ingest/cssom.ts`'s split disposition defers to KF.W2's façade decision; KF.W8 owns its colocation."* — **byte-exact**. Leg (d) — *"If OP-4 resolves demo-side, B-16 becomes a **shadow-name** row for KF.W8."* — **byte-exact**. Leg (b)'s "relocate half … KF-CE-42 is already banked" ✅ |
| `KF-W5 §Carry · Arm B · row B-16`, the `OP-4 · LOCUS DECLARED` cell | ✅ (ordinal wrong) | `KF-W5.md:210`; both dispositions pre-stated. **But** W5 says "arm B's fourth leg" and `G-OPTSET` (`:256`) says "ONE letter, four legs … **OP-4** decides whether B-16 is a **fifth leg**" — see D-12 |
| `KF-W6 §Sequencing · the "→ KF.W8" cross-edge` | ✅ | `KF-W6.md:417`. `grep -c 'KF-CB-37' KF-W6.md` → **1**; `grep -c 'KF-CB-37' KF-W6-CARRY.md` → **0**. The MOVE-vs-RESHELL GUARD reproduces **byte-exact**. The CARRY still bounds `demo/components/CopyButton.vue | 113 | modify | S-7 reshell` at `:317` ✅. R-1's phantom-receipt record is sound |
| `KF-W6 §Carry · W6-C · PROSE-WITH-CODE` (the "kf-SquareScene law" mint) | ✅ | `KF-W6.md:140`; both quoted strings — *"the comment is part of the defect surface — the cure commit carries the comment"* and *"comment-stated invariants are test obligations"* — **byte-exact** |
| `KF-W7 §Carry · P0 · Evaluate intake`, the SpringTrace C-3 row | ✅ | `KF-W7.md:107` (P0 spans `:99-108`). The route dissent — *"route-by-mechanism: a value.js LIBRARY export-surface decision, natural home KF.W8 / the export settle; the record's KF.W7 routing preserved verbatim, nothing silently re-homed"* — **byte-exact** (`grep -c` → 1) |
| `KF-W7 §Sequencing` cross-edges "KF.W5 (feeds/defers)" + "KF.W8 (feeds)" · `KF-W7 §Excluded` C-3 row | ✅ | `KF-W7.md:329` · `:330` · `:352` |
| `KF-W2 §Carry · F4 · The emit mirror (Tier D)`, the §4.4 lock | ✅ | `KF-W2.md:316`; the quotation *"**G-W2-8 (conditional, and now ORDERED — OP-6 / RULINGS R-16: KF.W8 precedes)**; the publish-or-relocate ACT is **KF.W8's**, joint with banked C-12"* is **byte-exact** |
| `KF-W2 §0 · OP-6` | ✅ | `KF-W2.md:41`; *"**ORDERED: KF.W8 precedes (RULINGS R-16).**"* byte-exact. Reciprocity confirmed from W2's end at `:421`, which cites `KF-W8 §Rows · MISS-β2 (unit d · G3)` and `KF-W8 §Cross-edges · → KF.W2/W3` — both present here |
| KF-W3's title heading | ✅ | `KF-W3.md:1` = *"# KF.W3 — Parser Consumption (GATED, never scheduled)"*, byte-exact |
| `R1-05-demo-colocation.md:118` | ✅ as declared | not in the value.js tree; the spec already says so and says "cite, never re-mint". Correct posture |
| precepts `README.md:127-130` / `:132-135` | ✅ | resolve as cited |
| **`KF-W5 §Carry · Arm D · row D-6` "the eleven stutters it enumerates by name"** | ❌ | **D-2 below** — D-6 enumerates **twelve**, and all twelve resolve |

**M-25 depth — locks, riders, dissents.** Every carried verbatim re-read at its **registry** source reproduces byte-exact: MISS-β2 **DISSENT 1** (`kf-TimelineCaret.md:136`) ✅ · SpringTrace **C-3** (`kf-SpringTrace.md:62`) ✅ incl. *"(my dist grep → 0)"* and the *"MINOR → KF.W7"* tail · KF-AV-9's bounding note (`kf-AnimationVisualizer.md:50`) ✅ · the **KF-AV-28 standing rider** at both banks (`kf-AnimationVisualizer.md:35` ✅ and `kf-PlaybackRibbon.md:36` ✅, the ribbon's *"'swap onto the primitive' is never sufficient as a cure"* caution carried with it) · C-22's shipped-token rider ✅. The rider's **scope-word vs mechanism** distinction (round-2's cure of pass-2 D-10) is present and correctly reasoned, and the governed set it names — KF-AV-8/-9/-18/-35 · C-13 · KF-AV-24 · KF-AV-26 — is exactly the set that touches the two S-9-evaluated surfaces. **Anti-rename holds** throughout; the kf-RibbonBar-vs-kf-ChromeDock `M-4` collision guard, the KF-AT-26 identity guard (legs (a)(b)(d)→W6, (e)→W10, matching `kf-AnimatedText.md:71` exactly), the C-15 closure on m-7, and the KC-1 E-3 posture all hold.

---

## 3 · GATES — born-RED, real witnesses, re-executed at `origin/master 81a56990`

**11 of 15 reproduce exactly.** Every command below was run by this seat; nothing is inherited.

| gate | spec's claim | this seat's re-run | |
|---|---|---|---|
| G1 cl.1 | 7 statements / 6 files / 4 library modules, enumerated | 7 lines, 6 files, byte-identical anchors (`useKeyframeOps:1` · `parseAnimationCSS:7` · `timelineEngine:1`,`:17` · `AnimationVisualizer.vue:45` · `helpers.ts:9` · `keyframeSelector.ts:5`); reached modules = `compile/emit/css-text`, `internal/helpers`, `resolve/browser`, `compile/selector` | ✅ |
| G1 cl.2 | 4 of 4 reached modules library-private; all four published entries exist | all four entry files exist; four greps, **four empty results**; `index.ts` `export *` count **0**. The round-2 restatement onto the library-**private** predicate is sound (`git grep -l '@mkbabb/value' -- src` → 47 files confirms the struck predicate was unsatisfiable) | ✅ |
| G2 | zero hits for all eight symbols; map = 2 entries; 0 `export *` | grep over all four entries → **exit 1**; exports map = `.` + `./engine` exactly; `export *` → **0** | ✅ |
| G3 | 3 bodies at `format/format.ts:20`, `css-text.ts:58`, `keyframeSelector.ts:7` | exactly 3, exactly those anchors; `format.ts` consumers **`:132/:201/:280/:313`** exact; `emit/index.ts:53` exports `cssIdent`, no serializer; `compile/selector.ts:42` + `compile/index.ts:24` confirmed | ✅ (see D-9 on "private") |
| G4 | 5 `index.ts`; umbrella `:24-27`; transport barrel 14 L / 3 async + 1 type; four clauses all RED | 5 `index.ts`; `:24` transport `:25` keyframes `:26` timeline `:27` shell; `transport/index.ts` **14 lines**, 3 `defineAsyncComponent` + `export type { TransportChannel }`; **all four greps exit 1** | ✅ |
| G5 | exactly 3 up-imports at `:31`, `:116`, `:229` | 3 hits, exactly those files/lines — the third (`ChannelControls.vue:229 → ../KfPillTabs.vue`) is real; the `font-roles.json` "T.H gated-on-publish excision" note is live at `:32` | ✅ |
| G6 | 1 loose `.vue` = `CopyButton.vue` | `git ls-tree --name-only … demo/components/` → `CopyButton.vue`, `instrument`, `playback`. R-1's destination law composes: the owner-named idiom is real (`transport/{AnimationControlsGroup,TransportDock,KfPillTabs,ControlsPaneWrapper}/` all exist as directories), and a move to `demo/components/CopyButton/CopyButton.vue` drives the non-recursive `.vue` count to 0 | ✅ |
| G7 | 8 SFCs, 4 exports, `EditorHeader` 0 component importers | 8 `.vue`; `index.ts` exports exactly EditorShell/EditorHeader/EditorStartScreen/SharePopover; `EditorHeader` outside the barrel = `demo/styles/layout.css:15` only | ⚠ **D-5** — leg (iii) is GREEN today for all four |
| G8 | leg (i) → 0, **today 1** (`App.vue:144`); leg (ii) 4 + 6; leg (iii) 4 files | legs (ii) and (iii) reproduce **exactly** (`:70/:72/:76/:77` and `:4/:5/:13/:35/:105/:127`; `instrument:10`+`:15` · `keyframes:1/:3/:4` · `timeline:2-3` · `transport:3`; `shell/index.ts` no hit). **Leg (i) returns 2, not 1** | ❌ **D-1** |
| G9 | 2 orphans; three includes verified; nothing matches `bench/*.measure.test.ts` | `vitest.config.ts` re-read whole: `library` = `test/**/*.test.ts` less `test/demo/**`; `demo` = `test/demo/**/*.test.ts`; `benchmark.include` = `bench/*.bench.ts`; the two orphans confirmed; no `plugins` key | ⚠ **D-7** (oracle ref) |
| G10 | `vitest.config.ts` declares 2 jsdom projects with **no** `@vitejs/plugin-vue`; 9 demo-lane files; plugin present as devDep; `@vue/test-utils` absent | all four confirmed (`^6.0.7` present, `@vue/test-utils` absent, vitest `^4.1.8`, vue `^3.5.35`, 9 files under `test/demo/instrument`) | ❌ **D-3** (act owned by W4) |
| G11 | `groupedShortcuts` locked at `KeyboardShortcutsModal.vue:57`; 0 test hits | `:11` consumes it, `:57` defines it; `git grep -l "KeyboardShortcuts\|groupedShortcuts" -- test` → **exit 1** | ✅ |
| G12 | 0 test hits for either dialog | `git grep -l "CSSPasteDialog\|KeyframesAddDialog" -- test` → **exit 1** | ✅ |
| G13 | `src/` one child; 8 `basename==dirname`; (i) 8-of-11; (ii) 12 token-stutters | `src/` → `src/animation` ✅. `basename==dirname` → **exactly the 8 enumerated** ✅. Token sweep → **exactly 12**, matching D-6's list item-for-item ✅. **(i) does not reproduce** | ❌ **D-2** |
| G14 | 11 lines / 10 files; `useDragScrub` zero | 11 lines / 10 files, host list exact (incl. `useMenubarMeasure.ts` DO-NOT-TOUCH); `useDragScrub` → exit 1 | ✅ |
| G15 | RibbonBar 151 L; pad `:5-9`; `ChannelControls:186/:189/:253` | 151 lines ✅; pad at `:5`/`:7` ✅; `:186` Teleport w/ `defer` ✅; `:189` `:key="storedControls.selectedControl"` ✅; `:253` hand-rolled `defineAsyncComponent` ✅. **The gate's own command returns 9, and its green (0) is unreachable** | ❌ **D-6** |

---

## 4 · POSTURE

| axis | finding |
|---|---|
| **W4 head honored** | Declared everywhere it must be — §State *"Opens after … KF.W4"*, §Bounds `package.json`/`vitest.config.ts` *"modify-carve after KF.W4"*, G10 *Boundary*, the → KF.W4 cross-edge ("KF.W8 authors no type gate"). **But the boundary sentence is refuted by W4's bytes — D-3.** |
| **npm-run-check re-cut composes with the live scripts** | ✅ **Composes.** Live `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure"`; W4's `G-KFW4-1` re-cut swaps leg 1 to `vue-tsc --noEmit -p tsconfig.json` and keeps legs 2–3. `tsconfig.json`, `tsconfig.test.json` and `"proof:structure": "node scripts/gates/structure/index.mjs"` all exist at the frontier. KF-W8 authors no script and names none — **no collision on `scripts.check`**. Its §Bounds *claim* on `scripts` is nevertheless an overreach (**D-8**). |
| **W3 gated-unscheduled** | ✅ The → KF.W2/W3 cross-edge quotes KF-W3's title heading verbatim and correctly names **KF.W2** as the schedulable receiver, keeping the `KF.W2/W3` pair-name because the bank writes it. |
| **KF-AV-28 present where governed** | ✅ The standing-rider block is present, both banked spellings are byte-exact, and the by-mechanism reach is stated and applied on all seven governed rows (KF-AV-8 · -9 · -18 · -35 · C-13 · KF-AV-24 · KF-AV-26). |
| **O-21 (not O-20) at W1's mint sites** | ✅ Vacuous here and correctly so: KF-W8 references neither `O-20` nor `O-21` and makes no claim on KF.W1's ledger. No stale mint leaks into this wave. |
| **W10's carry-routed obligations closed by carriage** | ✅ Both W10→W8 obligations are carried, not omitted: `KF-W10.md:411` routes **KF-AT-26 limb (c)** here (carried at Rows 13 with its identity guard), and `KF-W10.md:92/:148/:415/:438` hold **KF-W8-R-4-STRUCT-PAIR** as a record-only FOLD-FORWARD row with terminal verb `DECLINED-FOR-X·KF, carried forward` — reciprocated at KF-W8 R-4's *Terminus* clause and its → KF.W10 cross-edge. R-4's **trigger** (round 2's cure of pass-2 D-11) is stated as three evaluable conditions, satisfying G13's own falsifier. *(W10 still calls the denominator "the 16-stutter rename programme" at three sites while G-STRUCT now says 12 — that is W10's stale receipt, not this wave's; KF-W8 is correct to bind by gate id.)* |

---

## 5 · DEFECTS

### D-1 · HIGH — G8 leg (i) understates the frontier; the second phantom site is in no bounds row
G8 leg (i) is written *"`git grep -n 'editor-shell/' origin/master -- demo` → **0** (today: **1**, `demo/app/App.vue:144`)"*. Re-run this seat, verbatim, the command returns **two** files:

```
origin/master:demo/app/App.vue:144:// T.D13 — the home hero's Aurora backdrop (colocated in editor-shell/ beside
origin/master:demo/components/instrument/shell/EditorStartScreen.vue:102:   GONE from the title AND the dots (zero `depth-text` in editor-shell/, the
```

Both are comments; `editor-shell/` is a directory that does not exist (`shell/` is the real home) — so both are exactly G8's subject, a directory citation that resolves to nothing. `EditorStartScreen.vue` appears in **no** §Bounds row and in no §Rows cure. A seat that lands the booked act (the `App.vue:144` correction inside KF-HA-14's move edit) and then runs leg (i) gets **1**, not 0: the gate stays RED with no booked act to turn it, or the seat touches an out-of-bounds file. This is the same class the L-18 rider names for G5 ("a pass that quietly dropped the third up-import site") reproduced in G8, and it survived two repair rounds and PASS-2's ✅.

### D-2 · HIGH — G13's "named-11 check" reproduces under no reading of its stated anchor
G13 prints, as this seat's own frontier re-derivation under the R2-5 witness law: *"(i) the named-11 check — of the eleven stutters `KF-W5 §Carry · Arm D · row D-6` enumerates by name, `git cat-file -e origin/master:src/animation/<path>.ts` resolves for **8** and fails for **3** … **8 of the 11 named stutters are live**."*

- `KF-W5 §Carry · Arm D · row D-6` enumerates **twelve** paths by name, not eleven. Run against that enumeration, `git cat-file -e` resolves **12 / fails 0**.
- The eleven do not live at that anchor. The lane's actual by-name enumeration is `formation/keyframes/lane-library.md §7.3`, and it names **sixteen**. Run against it: **9 LIVE / 7 GONE** (`easing-option`, `easing-registry`, `css-animation`, `drag-2d`, `resolve-function`, `resolve-if`, `waapi-options` are gone).
- The commit attribution is also short: `1412ed8e` carries **six** of those renames (`easing-option→option`, `easing-registry→registry`, `css-animation→animation`, `resolve-if→conditional`, `resolve-function→function`, `waapi-options→options`), not the three the gate names.

No reading of the stated subject produces 11/8/3, and the stated conclusion is false at the frontier. G13's own **8** (`basename == dirname`) and the **12** of leg (ii) both reproduce exactly — the arithmetic that ties them together ("the 8 named above plus [4]") is what fails, because it rests on (i). The gate's falsifier convicts *"a subordination sentence that restates KF.W5's denominator as a literal number"*; this is the adjacent failure — a subordination **receipt** that cites a set its authority does not hold.

### D-3 · HIGH — G10's entire born-RED condition is booked as a commit at its own declared predecessor
KF-W8 R-10 states the boundary: *"W4 owns SFC **type**-checking and lands first; W8 owns SFC **runtime** loading"*, and G10 is born RED solely on *"`vitest.config.ts`'s `test.projects` block declares two jsdom projects with **no** `@vitejs/plugin-vue`"* with the cure declared to be *"wiring, not installation"*. At KF-W4's current bytes:

- §Bounds `vitest.config.ts` row claims *"the file's **absent `plugins` array** (the config declares `resolve` + `test` only — no `@vitejs/plugin-vue`)"* as W4's own modify subject;
- item 3 (**ME-32 ≡ R-10 (test lane)**) books it — *"`vitest.config.ts:48-55` … has no `@vitejs/plugin-vue`, the file having no `plugins` array at all"*;
- **commit 2** is enumerated as *"`ci(kf/merge-path)` — demo vitest project + **plugin-vue REGISTRATION** (the devDep is already present at `package.json:81`; only `vitest.config.ts` changes)"*;
- and KF-W4's own → KF.W8 cross-edge hands this wave *"KF-AV-9, KF-AV-18's prose half, and **R-10's `groupShortcuts()` extraction**"* — the extraction only, never the registration.

Since KF.W4 lands **first** by this wave's own §State, G10 is discharged before KF.W8 opens: a gate whose stated RED condition is another wave's committed act. **G11 and G12 are both "Gated on G10"**, and Rows 24 asserts *"one `vitest.config.ts` edit closes R-10 + C-10 + the KAD zero-coverage fold"* — that edit is W4's. Either the boundary sentence is wrong or W4's commit 2 is; nothing in either spec reconciles them, and neither side declares the collision.

### D-4 · MEDIUM — the §State AUDITED figure repaired *for being uncommanded* still does not reproduce
The AUDITED cell strikes round 1's `21` by name — *"no command was ever recorded for it, the same L-9 defect this file refuses by name"* — and certifies *"All four figures re-derived 2026-08-28 at the corpus's current bytes."* Re-run at the current bytes: `grep -oE 'kf-[A-Za-z0-9]+\.md' KF-W8.md | sort -u | wc -l` → **12**, not the stated **10** (the twelve: AnimationVisualizer · App · CopyButton · DemoGlobalChrome · EditorShell · EditorStartScreen · KeyframeCard · KeyframesEditor · PlaybackRibbon · SharePopover · SpringTrace · TimelineCaret). The other three figures do reproduce (58 · 18 · union 24 — the union survives because 18 routed ∪ 6 named-not-routed = 24, so the wrong summand does not propagate). A commanded figure that does not reproduce is the L-9 defect the cell was re-cut to kill, one round later.

### D-5 · MEDIUM — G7 leg (iii) does not implement G7's predicate, and is already green on the export it exists to convict
Leg (iii) is *"for each exported name `N`, `git grep -l "N" origin/master -- demo test | grep -v 'shell/index\.ts'` is non-empty."* Run for all four exports this seat: EditorShell → 8 files · EditorStartScreen → 5 · SharePopover → 4 · **EditorHeader → 1 (`demo/styles/layout.css`)**. Leg (iii) is therefore **GREEN today for every export**, including the zero-importer one, because a bare text grep counts a CSS comment as an importer. The gate's own RED-today paragraph names that exact false positive (*"its only other mention is a CSS comment in `demo/styles/layout.css:15`"*) without correcting the command, and the falsifier compounds it by claiming a barrel-line deletion would *"make leg (iii) vacuously true"* — leg (iii) is already true, non-vacuously. The gate's RED therefore rests entirely on the unmeasured second conjunct ("the exported set is exactly the directory's SFCs that have an external importer"), which has no command. This was round 2's stated cure for pass-2 D-3.

### D-6 · MEDIUM — G15's literal command cannot reach its own green, and its born-RED count is never stated
The command is `git grep -n 'controls-ribbon-target\|rainbow-gradient\|storedControls\|Teleport' origin/master -- …/RibbonBar.vue` with green **0**, and the same sentence allows *"(the pad may keep its id attribute; what must be zero is RibbonBar **reading or driving** state that lives in another tree)"*. `id="controls-ribbon-target"` is at `:7` and the Teleport comment at `:5`, so keeping the pad guarantees ≥1 hit forever: **the stated command can never return 0 under the gate's own allowance.** Re-run this seat, it returns **9 lines** (`:5, :7, :8, :13, :59, :69, :108, :113, :138`) — a count the gate never states, its *RED today* paragraph reporting only the line total and the pad anchors. This is the identical unsatisfiable-predicate class as pass-2's D-4 against G1 clause 2, which round 2 cured there and left standing here.

### D-7 · MEDIUM — G9's set-comparison oracle reads the disqualified ref
G9 compares `npx vitest list --filesOnly` against **`git ls-files '*.test.ts'`**. `git ls-files` reads the local index — `HEAD` = **`8281638c`** with a **252-row** dirty worktree, the exact pair §Provenance certifies "were never consulted". Run today it returns **122**; `git ls-tree -r --name-only origin/master | grep -c '\.test\.ts$'` returns **132**. Every other command in the file is pinned to `origin/master`; this one silently is not, and the gate is a *set* comparison, so a wrong ref is a wrong verdict rather than a wrong number.

### D-8 · MEDIUM — §Bounds' `package.json` access overreaches into two other waves' owned surfaces
The row grants *"modify-carve after KF.W4"* over **"exports · sideEffects · scripts · devDeps"**, yet §Excluded assigns *"The library surface decision itself"* to **KF.W5** (and G2 says in terms *"The gate MEASURES; KF.W5 DECIDES"*), while KF-W4's §Bounds claims `package.json` *"scripts (`check`, `check:lib`, `lint`, `test:*`)"*. The only manifest change this wave actually needs is `+@vue/test-utils` (G10's stated one new devDep). As written the bounds row licenses edits to the exports map and the scripts block that the same file forbids elsewhere.

### D-9 · LOW — G3 re-asserts a framing the sibling spec struck at the same bytes
G3's RED-today calls the demo copy *"reaching **private** `namedSelectorToFraction` at `:5`"* while its own parenthetical records *"defined `compile/selector.ts:42`, re-exported `compile/index.ts:24`"*. Verified this seat: `compile/selector.ts:42` is `export const namedSelectorToFraction`, re-exported at `compile/index.ts:24`. `KF-W2 §Carry · F4` carries a dated **E-3 precision correction** of exactly this: *"At origin/master `namedSelectorToFraction` is **exported** … The breach at `demo/utils/keyframeSelector.ts:5` is therefore the **deep-source `@src/…` import path** … not a private-symbol reach."* KF-W8 uses "private" in its own G1 sense (unpublished at the map) but never says so, and never names the sibling's strike.

### D-10 · LOW — `:410` is asserted and retired inside the same file; `:269` survives its own strike
§Sequencing R-1 and §Excluded row 1 both cite `KF-W6 §Sequencing · "→ KF.W8"` *"(at `:410` at this writing)"*, while the → KF.W6 cross-edge says *"the round-2 spelling `:410` was blank at this close and is retired, not re-issued."* Both cannot be true of one close; the live coordinate is **`KF-W6.md:417`**. Symmetrically, the → KF.W5 cross-edge strikes `:269` as *"an internal contradiction"* and then writes *"which is the row `:269(b)` names"* two clauses later.

### D-11 · LOW — the L-18 rider over-claims "15 literal commands"
The rider now certifies *"**15 gates · 15 literal commands · 15 falsifiers** — checkable by reading the §Gates block."* Falsifiers: 15/15 ✅. Commands: **13/15**. G13's green has two conjuncts and only the `ls-tree` half carries a command (*"A committed ruling names the chain, its disposition, and its trigger"* has none), and G14 explicitly declines one — *"Which lines are projectors … is unit a's enumeration — the gate binds to that enumeration, never to `11`."* The blanket was re-cut this round precisely to stop describing a suite it does not have.

### D-12 · LOW — B-16's leg ordinal contradicts its cited authority
KF-W8 books *"(i) drop in `src/` ⇒ the row is **G-OPTSET's fourth leg at KF.W5**, never here."* `KF-W5 §Carry · Arm B · row B-16` says *"it lands with **G-OPTSET** as **arm B's** fourth leg"*, and `KF-W5 §Gates · G-OPTSET` says *"**ONE letter, four legs — do not split** … **OP-4** decides whether B-16 is a **fifth leg**."* The receipt states an ordinal its authority contradicts at the gate.

### D-13 · LOW — C-8's KF.W8 half is booked to the wrong unit
`kf-KeyframesStringControls.md:81` routes *"**KF.W5** (surface decision) + **KF.W8** (colocation)"*. KF-W8 books C-8 at **unit c** (deep-import extirpation and repoint) with the split lock reading *"KF.W5 rules which symbols publish, KF.W8 **repoints**"* — the repoint, not the colocation the bank routed. Unit b (the KF.W8-I ratification) is where the banked word lands. No id is lost; the unit assignment does not match the banked disposition.

---

## 6 · WHAT HOLDS

Recorded so no later seat re-litigates settled ground: the **census is CLEAN by bytes** (32/32/0) with the fold-transitivity sweep independently closed; **eleven of fifteen gate measurements reproduce exactly**, including every one of G4's four clauses, G5's third up-import site, G13's 8 and its 12, and G14's full 10-file host list; **every registry verbatim re-read is byte-exact**, including both DISSENT carriages, the KF-AV-28 rider at both banks, and the C-22 shipped-token rider; **the KF-W5/W6/W7/W2 §-heading, gate-id and row-id anchors all resolve** at the siblings' current bytes, and the R2-7 citation idiom is genuinely applied — the file's cross-spec receipts now survive tree motion, which is what round 2 set out to buy. Pass-2's twelve local defects (D-1…D-12 there) are cured in place; pass-1's HIGHs remain cured. **The residue is measurement, not method** — four gates whose text no longer matches the frontier or their own predicate, one §State figure, and one un-declared ownership collision with KF.W4.

---

*Instruments (all read-only, zero writes to product source): `git rev-parse` · `git grep` · `git ls-tree` · `git show` · `git cat-file -e` · `git log --name-status -M` · `git status --porcelain` at `/Users/mkbabb/Programming/keyframes.js`; `grep`/`sed`/`comm` over the value.js registry, formation and wave trees. Frontier ref `origin/master 81a56990736ced5b5edde0b84c527680ac7689b1`, re-resolved at the head of this pass. No product source was opened for writing; no registry record and no wave spec was edited; the only file written by this seat is this register.*
