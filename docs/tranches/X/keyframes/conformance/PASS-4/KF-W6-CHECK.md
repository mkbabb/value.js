# KF-W6 — PASS-4 FRESH ADVERSARIAL SPEC CHECK (L-18/L-20)

**Seat**: fresh pass-4 conformance seat, sub-tranche X·KF, wave KF.W6. **Subject**: `docs/tranches/X/keyframes/waves/KF-W6.md` (thrice repaired; rounds 1–3 recorded at its foot). **Sole carry**: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md`. **Census substrate**: the **58** `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/` — *the inherited nine-block partition is RETIRED; every figure below is enumerated from the records' own bytes at this seat's clock.*

**TREE LAW honoured.** Every product witness re-executed at keyframes.js `origin/master 81a56990` (verified `git rev-parse origin/master` → `81a56990736ced5b5edde0b84c527680ac7689b1`), read-only (`git grep` / `git show` / `git ls-tree`). Local `8281638c` is cited nowhere except as declared historical context. **Sole write = this file.** No gate ran; no product source was opened for writing; status of the subject spec is untouched.

**R3-5 honoured**: no denominator below is inherited from PASS-1/2/3. The diff against PASS-3's figures is reported at §1.3.

---

## §1 · ID-KEYED CENSUS, RE-ENUMERATED BY RECORD

### 1.1 Method (stated, because the two prior passes differed on the unit)

The unit is an **enumeration over each record's own terminal disposition**, never a token grep. A `(record, row)` pair is routed to this wave when the record disposes it by any of:

- **(i)** an explicit `KF.W6` routing cell or `Routing summary (M-25 agglomeration input)` manifest membership;
- **(ii)** a per-row `→ KF.W6` terminal disposition;
- **(iii)** a non-`KF.W6` spelling of the same routing — measured this seat as `KF.W6-adjacent` ×2 (`kf-CSSCodeEditor.md:68`, `kf-SequenceScrubber.md:52`) and `KF.W6-reshell-may-absorb` ×1 (`kf-CopyButton.md:142`) — plus possessive routings (`kf-SequenceScrubber.md:133`, *"D·D-7's material-register adjacency"*), which **no id-shaped pattern matches**;
- **(iv)** the **collapsed-lane** spellings the binding taxonomy reconciliation folds into this wave: `KF.W2-TABS` · `KF.W3-SHIM` · `KF.W4-PROSE` · `KF.W5-PARTIALS` · `KF.W7-TOKENS`.

Co-id clusters are collapsed to **one banked row** (`CC-§0 / C-1 / D-3 / L-5` = one unit). `KF.W6-TIMELINE` is excluded as KF.W7's, per the subject spec's own rule.

### 1.2 Measured figures

| figure | measured | command |
|---|---|---|
| pure `KF.W6` tokens across the 58 records | **424** | `grep -ohE 'KF[.-]W[0-9]+[A-Za-z-]*' kf-*.md \| sort \| uniq -c` |
| `KF.W6-TIMELINE` tokens | **8** | same run |
| `KF.W6-adjacent` / `KF.W6-reshell-may-absorb` | **2 / 1** | same run |
| records matching `grep -l 'KF\.W6'` | **54** | as spelled in the spec |
| records carrying **≥1 pure** `KF.W6` token | **50** | TIMELINE-only records excluded |
| records whose **only** hits are `KF.W6-TIMELINE` | **4** — `kf-AnimationControlsGroup` (2/2) · `kf-ChannelControls` (4/4) · `kf-ControlsPaneWrapper` (1/1) · `kf-DemoGlobalChrome` (1/1) | per-file `grep -c` pair |
| records routing an **explicit ZERO** | **2** — `kf-SpringTarget.md:145` · `kf-SequenceAxis.md:130` | read |
| collapsed-lane-only contributors | **6** — `kf-ChannelControls` (20 rows) · `kf-KfPillTabs` (23) · `kf-SpringTrace` (5) · `kf-AnimationControlsGroup` (5) · `kf-ControlsPaneWrapper` (2) · `kf-DemoGlobalChrome` (2) | `grep -cE '^- \*\*.*(KF\.W2-TABS\|KF\.W3-SHIM\|KF\.W4-PROSE\|KF\.W5-PARTIALS\|KF\.W7-TOKENS)'` |
| **CONTRIBUTING RECORDS** | **54** = (50 pure-token − 2 explicit zeros) + 6 collapsed-lane-only | derived |
| **ROUTED UNITS (co-id collapsed)** | **431** | per-record row enumeration, §1.1 (i)–(iv) |
| **BOOKED** | **426** | each unit resolved against `KF-W6.md` §Carry / §Gates / §Sequencing / §Excluded in its **record context** |
| **ESCAPED** | **5** | §2.1 |

Non-contributors: `kf-OrbitalDrag` · `kf-TimingFunctionPanel` (0 hits, 0 collapsed-lane rows).

### 1.3 Diff against PASS-3 (R3-5's required report)

PASS-3 recorded **473 strict pairs / 421 collapsed units / 420 booked / 1 escaped**. This seat measures **431 / 426 / 5**.

**The +10 on the collapsed denominator resolves to a named cause, not to noise**: `kf-AnimationControlsGroup` (6 units) + `kf-ControlsPaneWrapper` (2) + `kf-DemoGlobalChrome` (2) = **10** — the three records that carry **no pure `KF.W6` token at all** and route only through the collapsed lanes. They are reachable by mechanism (iv) and by nothing else. This is the same root cause as D-P4-3 below.

---

## §2 · AXIS FINDINGS

### 2.1 Axis 1 — census: FIVE ESCAPES

| # | escaped unit | record anchor (routing, verbatim) | state in the spec |
|---|---|---|---|
| E-1 | **THP `D-5`** | `kf-TimelineHoverPreview.md:55` — *"…the authored prop/value two-tone is perceptually null in light and INVERTED in dark… **→ KF.W6**; painted ratios → SS-13"* | bare id in the §Bounds carve cell (`KF-W6.md:69`); **no §Carry row**; `grep -c 'two-tone'` → **0** in spec **and** CARRY |
| E-2 | **THP `D-11`** | `:56` — *"one undifferentiated 6 px gap for a four-tier stack… **→ KF.W6**"* | same cell; no row; `four-tier` / `6 px gap` → **0 / 0** |
| E-3 | **THP `D-17`** | `:68` — *"three unnamed alpha one-offs… **→ KF.W6**"* | same cell; no row; `alpha one-off` → **0 / 0** |
| E-4 | **TimelineTrack `m-17`** | `kf-TimelineTrack.md:58` — *"`class="p-2 max-w-56"` on TooltipContent flattens glass-ui's designed 1.272 optical padding ratio to 1.0 … **Not banked. → KF.W6**"* | bare id in the §Bounds cell (`KF-W6.md:67`); no row; `max-w-56` → **0 / 0** |
| E-5 | **`ND-7 / D-C2`** | `kf-EditorStartScreen.md:45` — folds to `kf-AnimatedText` **KF-AT-3 + KF-AT-6**; routing cell: **`KF.W6`** | `grep -c 'ND-7'` → **0**, `grep -c 'D-C2'` → **0**, in spec **and** CARRY |

E-1..E-4 are invisible to a token check because the ids are ambiguous corpus-wide (`D-5`, `D-11`, `D-17`, `m-17` all appear in the spec under **other** records). They resolve only in record context — the same lesson the spec draws from `D·D-7`, one class over.

### 2.2 Axis 2 — ANCHOR + SUBJECT-IDENTITY: **HOLD**

Every anchor and figure re-executed at `origin/master 81a56990`, all reproducing exactly:

- `App.vue:176` `provide(TABS_EXTERNALLY_MANAGED_KEY, true)` ✓ · `ChannelControls.vue:56` `v-if="!tabsExternallyManaged"` ✓ · `:229`/`:230` ✓ · `:242`/`:398` `useTabStripScroll` ✓
- `--dock-margin`: **0** definitions; `var(--dock-margin)` → **10** occurrences = `layout.css:80,92,117,135,161,166,204` (7) + `TransportDock.vue:389,395` (2 live) + `:379` (prose) ⇒ **9 live + 1 prose**, exactly as banked ✓
- `G-W6-8`: `max-h-24` → **exactly one** site, `TimelineHoverPreview.vue:20`, on the swap-target class string ✓ · `tracking-normal` → **0** ✓ · `normal-case` → **5** at `MbabbMenu.vue:5,:64` · `SharePopover.vue:19` · `ChannelOptions.vue:254,:265` ✓
- `G-W6-9` mount census: `FadingScroll` **2 mounts** (`EasingTarget.vue:42` `axis="x"`, `:76` `axis="y"`, import `:137`) ✓ · `ToggleGroup` mounted (`:50`/`:56`/`:63`/`:64`, import `:139`) ✓ · `Card` **24 mounts / 13 files** ✓ · `Textarea` **0** ✓
- `G-W6-10`: `SpringSidebar` **12 sites / 8 files** (per-file counts reproduce one-for-one) ✓; `git ls-tree` → no `SpringSidebar*` at any path ✓ · `KfPillTabs` **11 files** ✓
- LAW-A censuses spot-re-executed: **A-1** → exactly one live import, `test/demo/state/no-shadow-playback-authority.test.ts:21` (three further hits are docs prose) ✓ · **A-2** → `ChannelControls.vue:230` ✓ · **A-6** → **0** on both spellings ✓ · **A-7** → two live imports (`useAnimationProgress.ts:5` relative, `AnimationVisualizer.vue:51` alias root), `useSquareDemo.ts:395` a comment ✓
- All **17** §Bounds line counts re-measured (`4 / 14 / 27 / 1 / 19 / 129 / 80 / 456 / 79 / 300 / 210 / 294 / 124 / 93 / 111 / 156 / 410`) — every one exact ✓
- SUBJECT-IDENTITY block: all eight subjects re-resolved at their own files — `LayerConfigPanel.vue:39-45` the `type="number"` `<Input>` ✓ · `AnimationControlsGroup.vue:6` ✓ · `animationDescriptions.ts:108/:116/:128-129` ✓ · `SpringPhysicsFacet.vue:105` bare `<button>` ✓ · `KfPillTabs.test.ts:28` alias-root import ✓
- `G-W6-14`: `docs/tranches/X/keyframes/` → `carry · conformance · waves`; **no `relay/`** at the current bytes — the gate's RED still reads off a live probe ✓

**Nothing mis-resolved.** The round-2/round-3 witness re-derivation work is real and survives a fresh hostile re-run.

### 2.3 Axis 3 — M-25 DEPTH: **DEFECTIVE** (D-P4-2)

Four uncured members of the exact class `D-P3-2` convicted at round 3 (E-1..E-4). Every other §Bounds carve id resolves to a §Carry row carrying severity + mechanism + bank pointer.

### 2.4 Axis 4 — GATES / LAW A / LAW B: **DEFECTIVE** (D-P4-1, D-P4-6)

- Gate GREENs are reachable; `G-W6-3`'s round-3 re-cut is falsifiable by construction; no gate mints a `proof:*` mark; no self-voiced closure claim survives in the spec's own voice at §Carry/§Gates (LAW B honoured **there**).
- **LAW A is breached at its own scope sentence** — one delete act outside the nine censuses, on a false inherited premise (D-P4-1); one stylesheet delete with no consumer census at all (D-P4-6).
- **LAW B is breached once, in the round-3 repair certificate** (D-P4-5): *"so all three `kf-EditorStartScreen` fold rows are trail-reachable"* — a completeness claim, falsified by counting the record (four).

### 2.5 Axis 5 — POSTURE: **DEFECTIVE** (D-P4-4)

| item | verdict |
|---|---|
| **W4 head** | ✓ `→ KF.W4 (the SEQUENCING HEAD)` declared with the six sub-items; DH-4's one posture for `scripts/observe/demo/usability.mjs` stated in identical words at §Bounds and §Sequencing (path verified present, 410 L) |
| **W3 gated** | ✓ no dependency claimed, no scheduling verb aimed at W3 |
| **KF-AV-28** | ✓ the standing rider is carried (not cited); governed rows enumerated per surface — `AnimationVisualizer` KF-AV-11 · `PlaybackRibbon` KF-AV-11's `--color-progress` half · `SequenceScrubber` KF-SCR-2 **and** `D·D-7` · plus KF-AV-27; the discharge-before-spend discipline is stated at the row and at §Sequencing |
| **O-21** | ✓ not this wave's surface — `grep -oE 'O-2[01]' KF-W6.md` → **0**; no O-row is minted or collided with here |
| **W10-seam five-edge table** | ✗ **D-P4-4** — the far end cured, this end did not |

---

## §3 · DEFECTS (worst first)

### D-P4-1 · **BLOCKER** — a delete authorized on an inherited consumer premise that is FALSE at the frontier; LAW A breached at its scope sentence

`KF-W6.md:50` grants `demo/components/instrument/shell/EditorHeader.vue` Access **`evaluate/delete`**, on the note *"banked DELETE at kf-App **KF-APP-41** (0 consumers)"*. Two independent failures:

1. **No LAW-A census exists for it.** The LAW-A block's own scope sentence reads *"**Every** delete / repoint / shim act in the table above carries its consumer census here."* A-1…A-9 cover nine other modules; `EditorHeader.vue` is absent from all nine.
2. **The inherited premise is false at the tree.** Re-executed this seat: `git grep -n 'EditorHeader' origin/master -- demo/ test/` → **`demo/components/instrument/shell/index.ts:2` — `export { default as EditorHeader } from "./EditorHeader.vue";`** (plus one prose hit at `layout.css:15`). The file has a live importer, and that importer is itself a §Bounds **modify** row (`:53`, *"barrel truth after the deletes"*) — so the delete and the barrel edit are coupled and nothing in §Sequencing's commit families couples them.
3. **Compounding — the row is not this wave's.** `kf-App.md:91` banks `KF-APP-41` as **`NO-WAVE-OWNER (delete)`**. The wave takes delete access on a row its own §Excluded line assigns to the NO-WAVE-OWNER set, and books it nowhere.

This is the identical shape RULINGS-3 **R3-1** convicted as a BLOCKER one round earlier — *"a delete authorized on an invented consumer census"* — which is the reason LAW A exists. The cure LAW A produced was applied to the nine modules the round-3 seat happened to enumerate, and not to the law's stated scope.

### D-P4-2 · **MAJOR** — M-25 transcription-only: four uncured members of the class D-P3-2 convicted

`THP D-5` · `THP D-11` · `THP D-17` (`kf-TimelineHoverPreview.md:55/:56/:68`) and `TimelineTrack m-17` (`kf-TimelineTrack.md:58`) each carry an explicit **`→ KF.W6`** terminal disposition — `m-17`'s row stamps itself *"Not banked"* — and each appears in this spec **only as a bare id inside a §Bounds carve cell** (`:69`, `:67`): no severity, no mechanism, no bank pointer, no §Carry row. Their mechanisms measure **0 hits in both the spec and the CARRY** (`two-tone` · `four-tier`/`6 px gap` · `alpha one-off` · `max-w-56`/`1.272`). D-P3-2's own words for `SPF-10` describe all four verbatim. Round 3 cured one member of the class and left four in the same §Bounds block, two table rows apart.

### D-P4-3 · **MAJOR** — the census composition is false though its total reproduces

The §header census states: *"`grep -l 'KF\.W6' kf-*.md | wc -l` → **54 of 58**, the four carrying no literal token being `kf-KfPillTabs`, `kf-OrbitalDrag`, `kf-SpringTrace`, `kf-TimingFunctionPanel`"*, and closes *"(54 − 2) + 2 = 54, closing by two independent routes."*

The pattern `KF\.W6` **matches `KF.W6-TIMELINE`** — the exact spelling the same sentence rules *"tokenize separately and are KF.W7's."* Measured this seat: **eight** records carry no pure `KF.W6` token — the four named **plus** `kf-AnimationControlsGroup` (2 hits, both TIMELINE) · `kf-ChannelControls` (4/4) · `kf-ControlsPaneWrapper` (1/1) · `kf-DemoGlobalChrome` (1/1). All **8** `KF.W6-TIMELINE` lines in the corpus live in records with zero pure tokens, so the excluded spelling is doing the entire work of four denominator members. My re-composition reaches the same **54** by different members — `(50 − 2) + 6` — which is why the error survived three passes: *the total is right and the sentence under it is not*, and both "independent routes" share the miscount. It also explains the +10 unit diff at §1.3.

### D-P4-4 · **MAJOR** — the W10-seam edge for which this wave is a SOURCE is still one-ended

`KF-W10.md:146` and `:164` re-home §B-3's *"Glass §4 dock contract re-verify"* evidence, at repair round 3 (RULINGS-3 **R3-10.4** / PASS-3 D-2), onto **"`KF.W6` §Bounds' TransportDock rows"** and **"`KF.W9` §Bounds' capture-receipt rows"** — recording its own receipt that neither target contains the evidence. Re-executed this seat against the current bytes: `grep -coE 'CH2-02|BG-5|GU-1|GU-2|subject-legible' KF-W6.md` → **0**; `grep -cE 'dock contract|Glass §4' KF-W6.md` → **0**. Worse, W6's TransportDock row is bounded to *"`--dock-margin` sites `:389`/`:395` **only**"*, so the obligation is excluded **by construction**, not merely unwritten. RULINGS-3 R3-10 ordered the five-edge class closed **bidirectionally in one motion**; W10 executed its half and W6 carries nothing.

### D-P4-5 · **MAJOR** — the ID-ALIASES trail is short by one, again, under a LAW-B-banned completeness claim

`kf-EditorStartScreen.md` carries **four** KF.W6-routed fold rows in one table: `:44` `L-EST-2 / D-C1` · `:45` **`ND-7 / D-C2`** · `:46` `L-EST-6 / D-C6 / ND-10` · `:47` `L-EST-12`. The round-3 certificate (`D-P3-3`) reads *"`L-EST-2 ≡ KF-AT-22` added in the same motion so **all three** `kf-EditorStartScreen` fold rows are trail-reachable"* — a spec-voiced completeness claim of exactly the kind LAW B bans, and false by count. `ND-7` and `D-C2` measure **0 hits** in the spec and **0** in the CARRY. Their host ids (`KF-AT-3`, `KF-AT-6`) are booked, so what escaped is the **name** — precisely what D-P3-3 identified as the thing a grepping seat needs. The defect the repair cured recurred one table row above the row it cured.

### D-P4-6 · **MINOR** — LAW-A scope gap on the wave's only stylesheet delete

`demo/styles/tab-idiom.css` carries Access **`modify/delete`** (`:39`) with no consumer census. Its graph is one edge, measured this seat: `git grep -n 'tab-idiom' origin/master -- demo/` → **`demo/styles/design-idioms.css:7` — `@import "./tab-idiom.css";`** (sole hit). No §Bounds cell, commit family or gate names that `@import` removal, and `design-idioms.css`'s own §Bounds note (`:40`) enumerates tokens and classes, not the import. A-1…A-9 are all module-graph censuses; the one CSS delete in the wave has none.

### D-P4-7 · **MINOR** — a delete gated on an unhomed decision

`KF-W6.md:39`: *"panel-enter animation stays until **C-14** decided."* `C-14` is banked **NO-WAVE-OWNER** (`kf-ChannelControls.md:70`, the global `[data-state="active"][role="tabpanel"]` enter animation re-firing over the force-mounted Monaco subtree) and appears in this spec **exactly once** — in that cell. No §Carry row, no §Excluded line, no named owner, while §Excluded opens *"Nothing dropped silently. Each exclusion names its home."* The S-1 commit family requires `tab-idiom.css`'s corpse in the delete, so a commit family's completeness depends on a decision the spec neither takes nor homes.

### D-P4-8 · **MINOR** — pass-3 figure diff, reported per R3-5

**431 routed / 426 booked / 5 escaped / 54 contributing records**, against PASS-3's **421 / 420 / 1**. The +10 is fully accounted for by the three collapsed-lane-only records unreachable to a token-anchored enumeration (`kf-AnimationControlsGroup` 6 · `kf-ControlsPaneWrapper` 2 · `kf-DemoGlobalChrome` 2). The +4 escapes are E-1..E-4; the fifth (E-5) is a name-level escape of the `L-EST-12` class.

---

## §4 · VERDICT

**LOCAL VERDICT: `DEFECTIVE`** — 1 BLOCKER · 4 MAJOR · 3 MINOR.

**What holds, stated because it is most of the file**: the witness surface is genuinely sound. Every anchor, every gate witness, every §Bounds line count, all four spot-re-executed LAW-A censuses and all eight SUBJECT-IDENTITY subjects reproduce **exactly** at `origin/master 81a56990` under a hostile fresh re-run. Rounds 2 and 3 did real measurement work and it survives.

**What fails is generalisation, not measurement.** Each of the four highest-severity findings is the *same defect the previous round cured, uncured at a second site*: R3-1's delete-on-an-inherited-census at `EditorHeader.vue` (D-P4-1); D-P3-2's transcription-only carriage at four §Bounds ids (D-P4-2); D-P3-3's short alias trail at `ND-7 / D-C2` (D-P4-5); R3-10.4's one-ended W10 edge at this end of it (D-P4-4). A fifth, D-P4-3, is the census sentence's own tokenizing rule applied to every figure except the one that measures the denominator. **The transferable finding for round 4: a repair that cures the named instance and not the stated scope leaves the law green over its own counterexample** — which is what LAW A, LAW B and R3-5 were each written to prevent, and what a fifth pass should test by scope rather than by instance.

*Status of the subject spec is unchanged by this file: `planned`. No gate ran. No product source was opened for writing. Sole write = this file.*
