# KF-W7 — FRESH ADVERSARIAL SPEC CHECK · PASS 3 (L-18/L-20)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W7.md` (367 L, repaired twice: round 1 per `PASS-1/RULINGS.md`, round 2 per `PASS-2/RULINGS-2.md`).
**Seat**: FRESH. Nothing inherited from `PASS-1/KF-W7-CHECK.md`, `PASS-2/KF-W7-CHECK.md`, either RULINGS file, or the spec's own prose. Every census row re-enumerated from the 58 `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/`; every witness re-executed read-only.
**Tree law honoured**: witnesses verify at the keyframes.js frontier — `origin/master` `81a56990736ced5b5edde0b84c527680ac7689b1`. Local `master` = `8281638c0ac4ac8c54a67a018ca5bf6a9117174f`, merge-base `a59d3a22` — DISQUALIFIED as witness substrate; each anchor below states which ref it was resolved at.
**Sole write** = this file. No product source opened for writing. No registry byte touched. No gate stamped.

---

## §0 Verdict

**DEFECTIVE.**

| axis | finding |
|---|---|
| **1 · ID-keyed census** | **CLEAN at the row level.** 138 routed · 138 booked · **0 escaped by bytes**. Every registry row carrying a `KF.W7` disposition resolves to a carried row, an §Excluded bullet, or a named precondition. — **but the spec's stated census of record (150 · 144+6 · 0) is not re-derivable from any rule the spec states** (D5). |
| **2 · Authority reality** | **DEFECTIVE.** The §Sequencing taxonomy-reconciliation receipt does not return what it claims (D7); `PR-CAUTION` is a paraphrase labelled "(verbatim)" (D8). All other cross-spec coordinates resolve. |
| **3 · M-25 depth** | **HOLDS.** Locks, riders, kill-locks and dissents carried at depth across all four core records; sampled against the bank's own DISSENT and killed-claims sections — no lock dropped, no rung silently re-graded, no id renamed. |
| **4 · Gates born-RED, real witnesses at the frontier** | **DEFECTIVE.** 15 gates, all born-RED, none stamped. G1/G2/G3/G4/G6/G7/G9/G11/G12/G13/G14/G15 witnesses re-executed and EXACT at `81a56990`. **G5's witness resolves at no ref** (D2). G10 carries an unresolved placeholder (D9). G11's cost model is false at the frontier (D1). |
| **5 · Posture** | **DEFECTIVE.** W4 head honoured and its `check` re-cut COMPOSES ✓; W3 gated-unscheduled ✓; KF-AV-28 present at all three governed surfaces ✓; O-20/O-21 not cited here (W1's concern) ✓. **But: the shared-path law is applied to one neighbour out of four** (D3), **`package.json` / `vitest.config.ts` collide across three-to-four waves undeclared** (D6), and **W10's carry-routed obligations are closed by omission, not carriage** (D4). |

---

## §1 Census — re-derived at the bytes, ID-keyed

**Method.** Every `kf-*.md` record's adjudicated-defect roster was parsed mechanically; a row counts as routed to this wave iff its own disposition text names `KF.W7` (bare, or in a `KF.Wn/W7` dual-home). Held OUT by mechanism, then re-admitted separately: `KF.W7-TOKENS` (the naming-schism namespace — a different subject, booked at §Excluded), and `KF.W6-TIMELINE` dispositions (the schism's other direction — these ARE this wave and are counted). Dual-homed rows count ONCE. Non-roster routings (FOLDS lines, routing-summary tails, §BLOCKER blocks) enumerated by hand.

### 1a · Roster-routed (explicit `KF.W7` disposition)

| record | rows | booked in KF-W7.md |
|---|---|---|
| `kf-KeyframeTimeline.md` | 40 | 40 |
| `kf-TimelineTrack.md` | 30 | 30 |
| `kf-TimelineHoverPreview.md` | 17 | 17 |
| `kf-TimelineCaret.md` | 14 | 14 |
| `kf-KeyframesAddDialog.md` | 9 | 9 (6 carried · 3 §Excluded → KF.W6) |
| `kf-CSSPasteDialog.md` | 8 | 8 |
| `kf-AnimationVisualizer.md` | 5 | 5 |
| `kf-KeyframeCard.md` | 2 | 2 |
| `kf-SpringTarget.md` | 2 | 2 |
| `kf-CSSCodeEditor.md` | 1 | 1 |
| `kf-RibbonBar.md` | 1 | 1 |
| `kf-SequenceScrubber.md` | 1 | 1 |
| `kf-SpringTrace.md` | 1 | 1 |
| **subtotal** | **131** | **131** |

### 1b · Non-roster and schism-routed

| coordinate | id | disposition in KF-W7.md |
|---|---|---|
| `kf-AnimationControlsGroup.md:40-42` | **D-1** (portal BLOCKER) | **OP-0** — carried ✓ |
| `kf-ChannelControls.md:40` | **L-2/C-2** (`:key` remount) | **OP-1** — carried ✓ |
| `kf-ChannelControls.md:52` | **C-8/D-6** | expanded-timeline settlement, §Sequencing 8 ✓ |
| `kf-SequencePlayhead.md:143` | **C-§4 ≡ C-15 fold** | carried inside P0's C-15 row ✓ |
| `kf-AnimationControlsGroup.md:83` | **D-12** → `KF.W7-TOKENS` | §Excluded, naming-schism ✓ |
| `kf-DemoGlobalChrome.md:62` | **M-4** → `KF.W7-TOKENS` | §Excluded, naming-schism ✓ |
| `kf-ControlsPaneWrapper.md:72` | **D-m3** → `KF.W7-TOKENS` | §Excluded, naming-schism ✓ |
| **subtotal** | **7** | **7** |

### 1c · Totals

| | |
|---|---|
| **routed (re-derived)** | **138** |
| **booked** (carried + excluded-with-named-owner + precondition) | **138** |
| **escaped by bytes** | **0** |

**Exhaustiveness proof for the schism arm.** `grep -rn 'KF.W6-TIMELINE' adjudicated/*.md` → 7 hits over 4 records; four are routing-law preambles, three are dispositions: `kf-ChannelControls:40` (L-2/C-2), `kf-ChannelControls:52` (C-8/D-6), `kf-AnimationControlsGroup:42` (D-1). All three booked. `grep -rln 'timeline-cluster'` → exactly those two records. **No fourth record carries a timeline-cluster ordering lock.**

**Ten apparent id-misses were manually resolved as extraction artefacts, not escapes** — the spec carries each under a disambiguated banked header: `M2 ≡ RR-B-7` · `M5 ≡ RR-B-3` · `L-20/L-21` (inside the KT INFO group) · `D-25-D-26-D-28` hygiene cells · `L-D4/C-4(b) (THP)` · `L-D8/C-4(a) (THP)` · `D-12/C-12/i-2 (TimelineTrack, merged)` · `C-10/C-11/D-m6/m-1/D-m5 (TimelineTrack, merged)` · `m-9/m-11/m-12 (TimelineTrack, merged)` · `m-7/m-8 (TimelineTrack, merged)`.

**One apparent routing was a false positive and is correctly NOT carried as a W7 row**: `kf-SpringTrace.md:48` **C-2 = L-3** is `NO-WAVE-OWNER`; the `→ KF.W7` in its text belongs to the sibling **C-3**, which the spec does carry.

---

## §2 Witness re-execution at the frontier (`81a56990`)

### 2a · Verified EXACT — no correction owed

| receipt | result |
|---|---|
| §Bounds line counts (18 product files) | **all 18 exact**: KeyframeTimeline 312 · TimelineTrack 246 · TimelineCaret 70 · THP 38 · useTimeline 129 · useTimelineBuild 200 · useTimelineOps 88 · useZoomPan 110 · timelineTypes 41 · index 8 · timelineEngine **102** · snapshotCapture 66 · flattenVars 33 · CSSPasteDialog 80 · KeyframesAddDialog 161 · SequenceScrubber 162 · AnimationVisualizer 256 · keyframeSelector 31 |
| `git ls-tree -r --name-only origin/master -- test/demo/instrument` | **nine**, exactly the nine named |
| **G1** — `ls glass-ui/dist/components/timeline/` | **nine files**; `index.d.ts` **2 lines** (`GlassTimeline` + 3 types); **seven** shipped-but-not-re-exported, incl. `ContinuousTimeline.vue.d.ts` and `types.d.ts` ✓ |
| **G1** — `SliderVariant` | `"standard" \| "spectrum"` — no `"timeline"` ✓; installed glass-ui **7.0.0** ✓ |
| **G2** — `grep -n scrub KeyframeTimeline.vue` | hits **78 · 83 · 197 · 202 · 224**; bare `scrub` in none; the `:194-210` destructure is **15 members** and omits it; `useTimeline.ts:117` returns `scrub` ✓ |
| **G3** — `TimelineTrack.vue:192-196` / `:174-178` | `onMarkerPointerDown` records no offset; pointermove emits the absolute percent ✓ |
| **G4** — `useTimelineOps.ts:56-62` | `moveKeyframe` → unconditional `rebuild()` at `:61`, no zero-delta early-out ✓; `buildAnimationFromTimeline` docblock `:22-23` "ASYNC because the engine constructor is HEAVY" ✓ |
| **G6/N-8** — `snapshotCapture.ts:16-21` | the `none`/`auto`/`""` filter ✓; `captureNonDefaultSnapshot` unexported at `:34` ✓ |
| **G7** — `TimelineCaret.vue:22` / `:58-65` | `@blur="commitEdit"` at `:22` ✓; `commitEdit` spans `:58-65` with the re-entrancy guard at **`:59`** (MISS-α4) and the clamp at **`:62`** (L-9/m-8's protection lock) ✓; `useTimelineOps.ts:60` fresh `percentSelector` object ✓ |
| **G8** — `TimelineTrack.vue:203-214` | `onMarkerKeydown` exact; `next` computed only for arrows/Home/End; `emit("select")` only paired with `moveKeyframe` ✓; `useTimelineOps.ts:28` `percent ?? scrubT.value * 100` ✓ |
| **G9** — reka `TooltipContentImpl.js:87` | `computed(() => props.ariaLabel \|\| currentElement.value?.textContent)` — **exact at :87** ✓; `TimelineTrack.vue:86` passes `side`/`side-offset`/`class` only — `ariaLabel` unpassed ✓ |
| **G11 leg (i)** — `git grep … -- test/` | **0** ✓ |
| **G11 leg (ii)** — `git grep … -- demo/` | **13**, at exactly the 13 enumerated sites ✓ |
| **G12** | `master` `8281638c` / `origin/master` `81a56990` / merge-base `a59d3a22` ✓ |
| **G13** — `useZoomPan.ts` | `:50` the zoom factor · `:59` `event.deltaY * 0.1` · `deltaX` **0 occurrences** · `:5` nullable signature vs `:46` `trackEl.value!` · `clamp` imported `:3` · the `:51` indentation break ✓ |
| **G14** — `useTimelineBuild.ts:47-50` | the sole non-toasting failure (`console.error` + `animation.value = null`) ✓; toasts at **:121 · :133 · :137 · :148 · :155 · :157** ✓ |
| **G15** — `initialText` | **four** in-file hits `:49 · :53 · :59 · :67`; both `<CSSPasteDialog>` mounts at `KeyframeTimeline.vue:135-152` pass `v-model:open`/`title`/`description`/`button-label`/`:button-icon`/`@submit` — `:initial-text` at neither ✓ |
| **G15** — N-2's two commands | `git grep '\.label' -- timeline/` → **1** (`KeyframeTimeline.vue:106`); `timelineTypes.ts:11 label?: string` → the second ✓ |
| **OP-2** — `package.json:37` | `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure"` — **verbatim as OP-2 states**, incl. the `proof:structure` leg the bank's quotation omitted ✓ |
| **SS-13 refresh** — `package.json:43` | `"gh-pages": "vite build --mode gh-pages"`; `build:gh-pages` → **0 hits** ✓ (R2-5(f) correctly applied) |
| `demo/env.d.ts:3-7` | `declare module "*.vue"` → `DefineComponent<{}, {}, any>` ✓ |
| `useTimeline.ts` | `isPlaying` declared `:31`, returned `:109` ✓; `useRefHistory` `capacity: 50` at `:86` ✓ |
| Banked coordinates | `kf-PlaybackRibbon.md:36` (the §7 caution) ✓ · `kf-KeyframeTimeline.md:125` (K-8, the kill that protects live code) ✓ · `kf-AnimationControlsGroup.md:40/:42` (D-1 head + terminal disposition, quoted **verbatim and correctly**) ✓ · `KF-W6.md:272` + `KF-W6-CARRY.md:178` (`S-10 · KF-KE-21` row header, both ends) ✓ · `KF-W6.md:342` + `KF-W6-CARRY.md:248` (the nine-id KAD group row header, both ends) ✓ |

**The stable-anchor re-cut of round 2 (R2-7) is holding**: both KF-W6 receipts resolve by row header at both ends, and the retired numeric coordinates are not re-issued.

### 2b · Witnesses that FAIL at the frontier

See **D1**, **D2**, **D9** below.

---

## §3 Defect register

### D1 · MAJOR — `@vitejs/plugin-vue` is already a devDependency; OP-4, §Bounds and G11 all cost it as an add, contradicting KF-W4's own round-2 correction at the same ref

**Spec text.** OP-4: *"G11 is not 'write a test' — it is 'add `@vitejs/plugin-vue` + `@vue/test-utils`, wire a `vitest.config.ts` `plugins` line, then write a test': origin/master's `vitest.config.ts` declares `resolve.alias` + test config and NO `plugins` — **no Vue-SFC plugin exists**."* §Bounds: *"`vitest.config.ts` … bounds reconciliation (OP-4): **no Vue-SFC plugin at origin/master**; G11's THP mount is impossible without `@vitejs/plugin-vue`."* G11: *"the gate costs a dependency **AND a Vue-SFC plugin**, both bounded in §Bounds."*

**Measured, this seat, at `81a56990`.**
```
git show origin/master:package.json | sed -n '81p'
        "@vitejs/plugin-vue": "^6.0.7",
ls -d node_modules/@vitejs/plugin-vue   → PRESENT
git show origin/master:package.json | grep -c 'test-utils'   → 0
git show origin/master:vitest.config.ts | grep -n plugins    → (none)
```
`@vue/test-utils` is genuinely absent — that half stands. **`@vitejs/plugin-vue` is present in the manifest at `:81` and installed.** The true residue is registration only: `vitest.config.ts` declares no `plugins` key.

**Why this is MAJOR, not clerical.** `KF-W4.md:46` already ruled this at round 2 under the same WITNESS RE-DERIVATION LAW: *"**`@vitejs/plugin-vue` is ALREADY a devDependency at `:81` (`^6.0.7`) — the '+`@vitejs/plugin-vue`' add is STRUCK as a no-op**, and the real cure is its *registration* in `vitest.config.ts`."* `KF-W8.md:244` independently states the correctly-scoped form (*"`vitest.config.ts`'s `test.projects` block declares two jsdom projects with no `@vitejs/plugin-vue` (verified — no plugin key exists)"*). KF-W7 is the outlier of three, and the error propagates into the wave's cost model for the gate that gates ten other gates. The `package.json` bounds row survives on `@vue/test-utils`; its stated justification does not.

**Sub-cell.** OP-4's `ls node_modules/@vue/*` reading — *"compiler/reactivity/runtime only"* — under-enumerates: the tree also carries `server-renderer` and `shared`. The conclusion holds; the enumeration does not.

### D2 · MAJOR — G5's witness anchors resolve at NO ref; the same defective pair is repeated twice in §Carry, once with the two coordinates swapped

**Spec text.** G5 Witness: *"`timelineEngine.ts:40-48` keys on `selectorText(kf.selector)`, merge admitted in the `:42` comment, feeding build `:51-53` + export `:62-72`."* §Carry **N-6**: *"timelineEngine `:40-48`, the `:42` comment admitting it."* §Carry **MISS-β1**: *"merge admitted timelineEngine `:42`, **keyed `:40`**, feeding build `:51-53` and export `:62-72`."*

**Measured at `origin/master` (`git show origin/master:…/timelineEngine.ts | nl -ba`):**
```
37     for (const kf of sorted) {
38         const key = selectorText(kf.selector);      ← the keying
39
40         // Merge vars into keyframe (multiple keyframes at same percent get merged)   ← the admission
41         const existing = keyframesMap[key] ?? {};
42         for (const [prop, value] of Object.entries(kf.vars)) {                        ← NOT the comment
…
49     const anim = new CSSKeyframesAnimation(options, ...targets).fromKeyframes(        ← the build
50         keyframesMap as Record<string, Record<string, string>>,
51     );
52     anim.name = state.animationName;
```
- the keying is at **`:38`** — *outside* the cited `:40-48` span;
- the merge-admitting comment is at **`:40`**, never `:42`; `:42` is the property loop;
- the build call is **`:49-51`**, not `:51-53`.

**And it is not a stale-HEAD artefact either.** At the disqualified `8281638c` the comment sits at **`:37`** (the file is 100 L there, 102 at origin/master, 104 dirty in the worktree). **The cited `:42` is the comment at no ref this program recognises.** MISS-β1's form is worse than G5's: it reports *"merge admitted `:42`, keyed `:40`"* — the two coordinates transposed relative to reality at both refs.

**Weight.** G5 is the gate governing the collision decision — the one §Bounds marks **serial-only** because it writes the two shared files. Its witness is the spec's proof that UI and artifact can disagree, and the round-2 footer asserts *"every witness, anchor and gate this seat touched was re-executed at the substrate of record … Nothing was inherited from the rulings' prose, the check's prose, or this spec's own prior text."* These three anchors were inherited from `kf-KeyframeTimeline.md:80` and never re-run.

### D3 · MAJOR — the R2-12 shared-directory law is applied to one neighbour out of four; KF.W8 claims write access over the nine files this wave declares READ-ONLY WITNESSES

**Spec text.** §Bounds: *"**The NINE files already tracked there are READ-ONLY WITNESSES, by name** … Two of them are this spec's own cited witnesses and **must not be edited to make a gate pass**: `timeline-undo.test.ts` … and `resize-tracks.test.ts`."* §Disjointness / §Sequencing: *"KF.W5's `.a` seat creates exactly one file in this same directory … **Neither wave owns the directory; each owns exactly its named files**."*

**Measured across the wave set.**

| wave | footprint in `test/demo/instrument/` |
|---|---|
| KF.W7 | 4 creates (named) |
| KF.W5 | 1 create (`highlight-css-roundtrip.test.ts`) — **reciprocity honoured**, `KF-W5.md:152` names all four of this wave's filenames ✓ |
| **KF.W4** | **2 creates** (`typing-dots-engine-seam.test.ts`, `aurora-opacity-ceiling.test.ts`) **+ `resize-tracks.test.ts` as a bounds row** (`KF-W4.md:66/:74/:75`) |
| **KF.W8** | **`test/demo/instrument/**` (9 files) — `modify-carve`** (`KF-W8.md:72`), **`resize-tracks.test.ts` — `modify-carve`** (`:73`), **+ 4 creates** (`:92`–`:94`) |

Four waves write the directory. The spec's *"Neither wave owns the directory"* is a **two-party statement over a four-party surface**, and `KF-W8.md:72-73` asserts `modify-carve` over precisely the nine files this wave declares read-only — including `resize-tracks.test.ts`, which this wave names as a protected witness. Neither KF.W4 nor KF.W8 appears anywhere in KF-W7's declaration.

**This is the exact failure R2-9 convicted in the other direction** — *"Round 1 applied the rule to the first record only … so the corpus's other restored BLOCKER escaped by bytes."* Here the rule was applied to the first *neighbour* only.

**Compounding cell.** `KF-W8.md:94` authors its `CSSPasteDialog.test.ts` / `KeyframesAddDialog.test.ts` pair *"against **whichever shape KF.W7 rules**"* — a hard dependency on **G15**. KF-W7's KF.W8 cross-edge lists only *"L-19/C-14 dead barrel, C-12 private-`src/` reach, N-11 colocation, caret m-7 rename, MISS-β2, KF-AV-24"*. The G15 dependency is undeclared from this end.

### D4 · MAJOR — W10's carry-routed obligations are closed by omission: KF-W7 contains zero `KF.W10` references

**Measured.** `grep -o 'KF\.W1[0-3]' KF-W7.md` → `KF.W11` ×5, `KF.W13` ×6, **`KF.W10` ×0**. Sibling declaration counts: KF-W4 **5**, KF-W5 **8**, KF-W6 **5**, KF-W8 **6**.

**What W10 asserts about this wave.**
- `KF-W10.md:162` — *"**KF-AV-28 · STANDING SUPERSESSION RIDER (KF.W7's defining lock) — carried, not cited.** Banked at `kf-AnimationVisualizer.md:35`, `kf-PlaybackRibbon.md:36`, `kf-SequenceScrubber.md:36`"* (all three coordinates verified by this seat ✓).
- `KF-W10.md:164` — the rider binds at W10 *"as a **SWEEP INPUT to G-2**. The rider governs every NO-WAVE-OWNER row banked under the three evaluated surfaces."*
- `KF-W10.md:271` — **Acceptance**: *"every row LANDED / KILLED-with-rationale / **`DISCHARGED by KF.W7 SWAP verdict <surface>, <date>`** / carried."*

**The gap is executable, not decorative.** W10's terminal table needs a discharge record in the form `<surface>, <date>`. KF-W7 §Verdict Protocol obliges only: *"each discharge named in the verdict table — silent discharge is a silent drop."* No surface-plus-date form, no W10 handoff, no reciprocal edge. W10's close cannot be assembled from what this wave obliges its seat to write, and the spec's own §Sequencing header — *"Cross-edges (declared from this end)"* — is the standard it fails.

### D5 · MAJOR — the census of record (150 · 144+6 · 0) is not re-derivable from any rule the spec states

The spec states **one** counting rule (dual-homed rows count once, `KF.W6/W7` split by mechanism) and no others. It states **no granularity rule** (does `m-9/m-11/m-12 (merged)` count 1 or 3? does `C-10/C-11/D-m6/m-1/D-m5 (merged)` count 1 or 5?) and **no record-set boundary** (roster rows only? plus FOLDS lines? plus routing-summary tails? plus `NO-WAVE-OWNER` rows the KF-AV-28 rider *governs* without carrying?).

This seat's re-derivation under a stated, reproducible rule (§1) yields **138**. Under the alternative granularity (expanding every merged multi-id header) the figure overshoots 150; under the strictest (roster-explicit only) it is 131. **150 sits between two rules and matches neither**, and the same is true of the split (144 + 6): this seat counts **7** non-roster/schism routings, of which **3** are §Excluded-with-named-owner and **3** carried as preconditions/settlements, plus the **3** KAD exclusions — i.e. **6 exclusions** matches, but only by a composition the spec does not state.

The figure may well be right. **It is not checkable**, which is the precise failure R-12 and R2-9 were written to end — and the round-2 footer's own words are *"the arithmetic closes against the bullets rather than asserting past them."* It does not close against a stated procedure.

### D6 · MAJOR — `package.json` and `vitest.config.ts` are bounds rows in three-to-four waves with no cross-wave declaration from this end

**Measured** (`^| \`package.json\`` / `^| \`vitest.config.ts\`` as bounds rows):

| file | waves claiming it |
|---|---|
| `package.json` | **KF.W3 · KF.W4 · KF.W7 · KF.W8** |
| `vitest.config.ts` | **KF.W4 · KF.W7 · KF.W8** |

KF-W7 carves both (`devDependencies` only; `plugins` only). KF-W4's rows are broader — `package.json` scripts **and** devDeps, `vitest.config.ts` `projects` at `:38-56`. **No sequencing, disjointness or ownership statement exists in KF-W7 for either file**, and its KF.W4 cross-edge is scoped *"depends-on, for VERIFICATION not authoring"* — which is false the moment this wave writes `vitest.config.ts`. A spec that spends two paragraphs and a ruling on a shared *directory* leaves two shared *files* undeclared.

### D7 · MAJOR — the §Sequencing taxonomy receipt does not return what it claims

**Spec text.** *"Re-derived this seat over the corpus: `grep -rn "before \*\*KF.W6-TIMELINE\*\*\|before KF.W6-TIMELINE" registry/adjudicated/*.md` returns **exactly three** disposition rows in **two** records — `kf-ChannelControls` **L-2/C-2** … and **C-8/D-6** …, and `kf-AnimationControlsGroup` **D-1** (**now booked at OP-0**)."*

**Executed verbatim by this seat:**
```
adjudicated/kf-ChannelControls.md:40
adjudicated/kf-ChannelControls.md:52
adjudicated/kf-ChannelControls.md:155
→ 3 hits, ONE record
```
- **kf-AnimationControlsGroup does not match the stated pattern.** Its literal is `must be settled **before** KF.W6-TIMELINE` — the bold markers sit *between* `before` and `KF`, so neither alternation can reach it.
- The third hit, `:155`, is the record's **closing-verdict tally line**, not a disposition row.

**The conclusion is independently true** — this seat's exhaustive sweep (`grep -rn 'KF.W6-TIMELINE'` → 7 hits / 4 records; 3 dispositions / 2 records) confirms exactly the three rows the spec names, and all three are booked. **The receipt is false.** Under R2-7's own law — *"a receipt that returns a different row is not a receipt"* — a seat re-running this command lands on one record and would conclude ACG D-1 escaped again, which is the very event OP-0 exists to prevent.

### D8 · MINOR — `PR-CAUTION` is labelled "(verbatim)" and is a paraphrase

**Bank**, `kf-PlaybackRibbon.md:36` (verified): *"note the C axis's own §7 caution rides with it — **this ribbon** is the NON-bespoke case (it consumes the real `Slider`) and carries BLOCKERs anyway, **so** "swap onto the primitive" **is never sufficient** as a cure."*

**Spec header**, marked **(verbatim)**: *"**kf-PlaybackRibbon** is the NON-bespoke case (it consumes the real `Slider`) and carries BLOCKERs anyway **—** "swap onto the primitive" **is NEVER SUFFICIENT** as a cure."*

Subject substituted (`this ribbon` → `kf-PlaybackRibbon`), the conjunction dropped for an em-dash, emphasis added. The substance is unchanged and the lock is intact — but this is the same class R2-7 struck at §Sequencing item 2 (*"a PARAPHRASE presented as the bank's own words"*), and the label "(verbatim)" is doing exactly the work the ruling forbade.

### D9 · MINOR — G10's witness carries an unresolved placeholder

**Spec text.** G10 Witness: *"`previewCache` keyed on mutation-stable ids; `grep -n "delete" <cache module>` → none."*

`<cache module>` names no coordinate. The cache is declared at `KeyframeTimeline.vue:217` (`const previewCache = reactive(...)`, verified at `81a56990`), and the claim **holds** — `git show origin/master:…/KeyframeTimeline.vue | grep -n delete` → 0 hits. But L-19's standard is *"no gate exists here without a **named live witness**"*, and every other gate in this file names its file. G10 locks the entire ghost/cache family (11 carried rows); its witness is not executable as written.

### D10 · MINOR — the two spec-local labels remain keyed to raw line coordinates after R2-7 retired that idiom

`PR-CAUTION ≡ kf-PlaybackRibbon.md:36` and `L-15-PROTECTED ≡ kf-KeyframeTimeline.md:125` are bound by line number, in the same file where round 2 retired the `KF-W6.md:250`/`:320`/`:265`/`:335` coordinates in favour of stable row headers *because they drifted*. Both resolve today (verified). The registry is more stable than the wave specs, so the risk is lower — but the file now carries two anchor idioms for the same job, and the §Carry preamble instructs downstream sweeps to *"sweep the two coordinates, not the two labels."*

---

## §4 What is NOT defective — recorded so the repair does not over-reach

1. **Zero escapes by bytes.** The id-keyed census is clean at 138/138. Both restored BLOCKERs (ACG D-1, CC L-2/C-2) are booked as hard preconditions; the three KAD dual-homes and three `KF.W7-TOKENS` schism hits are booked as exclusions-with-named-owner; the dual-homed MISSED-3 is carried whole at P7's head with its box-resize law.
2. **The R2-12 filename disjointness holds with KF.W5, at both ends** — `KF-W5.md:152` names all four G11 fixtures reciprocally. The defect at D3 is the *unnamed* neighbours, not this pair.
3. **The R2-6.5 G11 two-leg re-cut is exact** — `test/` → 0, `demo/` → 13 at the 13 enumerated sites. The gate's claim and its enumeration are correctly separated.
4. **The R2-5(f) `npm run gh-pages` correction is exact** — `package.json:43`, and `build:gh-pages` → 0 hits.
5. **The R2-7 stable-anchor re-cut of the two KF.W6 receipts holds at all four ends** (wave + CARRY, both rows).
6. **Every §Bounds line count is right at the frontier**, including the two the spec corrected against the bank (KeyframeTimeline 312-not-313; timelineEngine 102-not-104).
7. **M-25 depth is real.** Sampled against the four core records' own DISSENT sections: RR-A's C-1 BLOCKER (KT dissent 1), the D-16/D-13 co-visibility reopening (2), DISSENT-4's verbatim-element law (4), the L-9/K-7 duplicated verdict (5); TT's D-4/M-7 MAJOR dissents with reopening conditions (1), the L-m-5 citation-inheritance event (2), the M-3/C-4 inverted reopening (3), the F-1 per-baseline re-rule (5); the caret's RR-α integer-feeder dissent; THP's D-2/D-3/C-5 reopening conditions (1) — **all carried, none re-graded, no id renamed.** The two spec-local labels are disclosed as such.
8. **Posture items that pass**: W4's head is honoured at OP-2 and its `check` citation composes with `KF-W4.md:195`'s redefinition (both retain the live `&& npm run proof:structure` tail); W3 is referenced only as a routing target, never scheduled (`KF-W3.md` remains `RC-P(V)`-gated); KF-AV-28 is present at the header, P0, §Verdict and G1 and at all three banked coordinates; O-20/O-21 are W1's and are correctly absent here.
9. **No gate is stamped; all fifteen remain born-RED; status stays `planned`; no product source was opened.**

---

## §5 Directives owed (for the ruling seat)

| # | target | directive |
|---|---|---|
| 1 | OP-4 · §Bounds `vitest.config.ts` · G11 | Strike the `@vitejs/plugin-vue` **add**; re-cut to *registration in `vitest.config.ts`* (present at `package.json:81`, `^6.0.7`, installed). Align with `KF-W4.md:46`. Correct the `ls node_modules/@vue/*` enumeration. |
| 2 | G5 · §Carry N-6 · §Carry MISS-β1 | Re-anchor at `81a56990`: key `:38`, merge comment `:40`, property loop `:42`, build `:49-51`. Say the HEAD form (`:37`) so the transposition cannot re-enter. |
| 3 | §Bounds · §Disjointness · §Sequencing KF.W5 edge | Extend the shared-directory declaration to **KF.W4 and KF.W8** by filename; reconcile `KF-W8.md:72-73`'s `modify-carve` over the nine tracked files against this wave's READ-ONLY-WITNESS declaration; declare KF.W8's G15 dependency (`KF-W8.md:94`) from this end. |
| 4 | §Sequencing cross-edges | Add the **KF.W10** edge; adopt W10's acceptance form `DISCHARGED by KF.W7 SWAP verdict <surface>, <date>` into §Verdict Protocol's rider mechanics. |
| 5 | verb table · §Excluded opener · footers | State the census's granularity rule and record-set boundary, then re-derive the denominator against it — or adopt a re-derivable figure. |
| 6 | §Bounds | Declare the `package.json` and `vitest.config.ts` collisions with KF.W3/KF.W4/KF.W8 and their sequencing. |
| 7 | §Sequencing taxonomy reconciliation | Replace the false grep with one that returns the three rows (e.g. `grep -rn 'KF.W6-TIMELINE' … ` filtered to disposition lines), or cite the three coordinates directly. |
| 8 | header PR-CAUTION | Quote `kf-PlaybackRibbon.md:36` exactly, or drop the "(verbatim)" label. |
| 9 | G10 | Name the cache module (`KeyframeTimeline.vue`, `previewCache` at `:217`). |
| 10 | §Carry preamble | Re-cut the two spec-local labels to stable headers, or state why registry line anchors are exempt from R2-7. |

---

*PASS-3 fresh adversarial check, X·KF L-20/L-18, 2026-08-28. Sole write = this file. Census re-enumerated from the 58-record registry at the bytes; every witness re-executed read-only at keyframes.js `origin/master` `81a56990` (`git show` / `git grep` / `git ls-tree` only — no working-tree file opened, no install, no browser tooling). Nothing inherited from PASS-1, PASS-2, either RULINGS file, or the spec's own prose. **138 routed · 138 booked · 0 escaped · 10 defects (7 MAJOR · 3 MINOR) · verdict DEFECTIVE.***
