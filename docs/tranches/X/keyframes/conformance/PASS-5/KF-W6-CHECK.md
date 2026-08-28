# KF-W6 — PASS-5 FRESH ADVERSARIAL SPEC CHECK (L-18/L-20)

**Seat**: fresh pass-5 conformance seat, sub-tranche X·KF, wave KF.W6. **Subject**: `docs/tranches/X/keyframes/waves/KF-W6.md` (585 L, four repair rounds; round-4 record at `:570-583`). **Sole carry**: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` (366 L / 201 rows). **Census substrate**: the **58** `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/`, enumerated **by record at this seat's clock**. Prior register `PASS-4/KF-W6-CHECK.md`; rulings `PASS-4/RULINGS-4.md`; close-cert `PASS-4/CLOSE-CERT.md`.

**TREE LAW honoured.** `git rev-parse origin/master` at `/Users/mkbabb/Programming/keyframes.js` → `81a56990736ced5b5edde0b84c527680ac7689b1`. Every product probe read-only (`git grep` / `git show` / `git ls-tree` / `git cat-file`). Local `8281638c` cited nowhere. **Sole write = this file.** No gate ran; no product source was opened for writing; the subject spec's status is untouched (`planned`).

**No denominator below is inherited from PASS-1/2/3/4.** The diff against PASS-4's figures is reported at §1.3.

---

## §1 · ID-KEYED CENSUS, RE-ENUMERATED BY RECORD

### 1.1 Method (stated, because four passes have used three units)

A **(record, row)** pair is routed to this wave when the record disposes it by any of:

- **(i)** a pure `KF.W6` token in a routing/disposition position;
- **(ii)** a per-row `→ KF.W6` terminal disposition;
- **(iii)** a non-`KF.W6` spelling of the same routing — `KF.W6-adjacent` ×2, `KF.W6-reshell-may-absorb` ×1, and possessive routings that no id-shaped pattern matches;
- **(iv)** the **collapsed-lane** spellings the binding taxonomy reconciliation folds into this wave: `KF.W2-TABS` · `KF.W3-SHIM` · `KF.W4-PROSE` · `KF.W5-PARTIALS` · `KF.W7-TOKENS`.

The unit is the **row key in record context**; co-id clusters collapse to one banked row. `KF.W6-TIMELINE` is excluded (KF.W7's).

### 1.2 Measured figures — every command re-run at this clock

```
$ grep -ohE 'KF[.-]W[0-9]+[A-Za-z-]*' kf-*.md | sort | uniq -c | grep W6
 424 KF.W6      8 KF.W6-TIMELINE      2 KF.W6-adjacent      1 KF.W6-reshell-may-absorb
$ ls kf-*.md | wc -l                                → 58
$ grep -l 'KF\.W6' kf-*.md | wc -l                  → 54
$ grep -loE 'KF\.W6([^-A-Za-z]|$)' kf-*.md | wc -l  → 50
```

| figure | measured |
|---|---|
| records with **zero pure** `KF.W6` tokens | **8** — `kf-AnimationControlsGroup` · `kf-ChannelControls` · `kf-ControlsPaneWrapper` · `kf-DemoGlobalChrome` · `kf-KfPillTabs` · `kf-OrbitalDrag` · `kf-SpringTrace` · `kf-TimingFunctionPanel` |
| collapsed-lane row counts (`grep -cE '^- \*\*.*(KF\.W2-TABS\|KF\.W3-SHIM\|KF\.W4-PROSE\|KF\.W5-PARTIALS\|KF\.W7-TOKENS)'`) | ChannelControls **20** · KfPillTabs **23** · SpringTrace **5** · AnimationControlsGroup **5** · ControlsPaneWrapper **2** · DemoGlobalChrome **2** · OrbitalDrag **0** · TimingFunctionPanel **0** |
| explicit ZERO routings | **2** — `kf-SpringTarget.md:145` · `kf-SequenceAxis.md:130` (both re-read) |
| **CONTRIBUTING RECORDS** | **54** = (50 − 2) + 6 |
| headed routed units (record-context row keys, co-id collapsed) | **418** |
| manifest-/possessive-only units (CubeTarget `#8`/`#9`/`#21`/`#30`/`#39`; AmigaScene `MISSED-H`; CubeScene `D-20`; TransportDock `TD-36`; SequencePlayhead + SquareInstrument flat-namespace data; SequenceScene `D22`; SpringScene folds; RibbonBar's `KF-KE-36` evaluation; StartingStyleTarget `KF-SST-39`) | **15** |
| **ROUTED UNITS** | **433** |
| **BOOKED** | **422** |
| **ESCAPED** | **11** (§2.1) |

**The spec's own re-cut census (`KF-W6.md:16-31`) reproduces EXACTLY** — 424 / 8 / 2 / 1, 58 / 54 / 50, the eight pure-token-less records by name, all six collapsed-lane counts, both explicit zeros. **D-P4-3 is genuinely cured, and cured at the sentence rather than at the total.**

### 1.3 Diff against PASS-4

PASS-4 measured **431 / 426 / 5 · 54 records**. This seat measures **433 / 422 / 11 · 54 records**. The **+2** on the denominator is method (this seat counts `TD-36` and `KF-SST-39` as manifest-only units; PASS-4 did not enumerate them separately). **The +6 on escapes is NOT method**: PASS-4's five escapes are all cured (`THP D-5` → W6-H row `:335`; `THP D-11`/`D-17` → W6-D rows `:263`/`:262`; `TT m-17` → W6-I row `:364`; `ND-7 / D-C2` → §Carry ID-ALIASES `:178`) and **eleven different units escape at this clock**, three of them by a mechanism the round-4 repair itself introduced.

---

## §2 · AXIS FINDINGS

### 2.1 Axis 1 — census: **ELEVEN ESCAPES**, three of them REGRESSIONS

| # | escaped unit | record routing (verbatim) | state in the spec |
|---|---|---|---|
| **E-1** | **`EH-4`** (MAJOR) | `kf-EditorHeader.md:43` — *"`title="Toggle dark mode"` collides with DarkModeToggle's own state-aware accessible name, **live at EditorShell.vue:45**… Disposition: **KF.W6**"* | present at `:420` **as a STRUCK row**, disposition `MOOT-ON-DELETE`, on the premise *"all three limbs are hosted in `EditorHeader.vue`"* — **false at the record and at the frontier** |
| **E-2** | **`EH-5`** (MAJOR) | `:44` — *"`aspect-square w-8`… yields a 32×36 box, **live at EditorShell.vue:46**. Disposition: **KF.W6**"* | same struck row, same false premise |
| **E-3** | **`EH-8`** (MINOR) | `:47` — *"the **live ribbon's** three-control cluster is incoherent three ways… Disposition: **KF.W6** (one sizing decision with EH-5)"* | same struck row, same false premise |
| **E-4** | **`D-M5`** | `kf-EasingScene.md:70` — `KF-ES-28 · D-M5 + M-6`, folding to `KF-ET-10`'s KF.W6 routing | `grep -c 'D-M5'` → **0** spec · **0** CARRY |
| **E-5** | **`D-28`** | `kf-KeyframesEditor.md:85` — `KF-KE-40 · D-26 + D-27 + D-28` → **KF.W6** polish | **0** spec · **0** CARRY |
| **E-6** | **`L-B-2`** | `kf-SpringHeatmap.md:39` — `D-M2 ≡ L-B-2` … **MAJOR. KF.W6** | **0** spec · **0** CARRY |
| **E-7** | **`C:C-8`** | `kf-TypingDots.md:44` — `D:D-9 / L:D-11 / C:C-8` → `KF-EST-20`, **KF.W6 hygiene pass** | **0** spec · **0** CARRY |
| **E-8** | **`C-M6`** | `kf-KeyframesEditor.md:63` — `KF-KE-21 · C-M6 + reader-1 miss M-4` → KF.W6 | **0** spec (CARRY 2) |
| **E-9** | **`D-26`** | `kf-KeyframesEditor.md:85` | **0** spec (CARRY 1) |
| **E-10** | **`D-30`** | `kf-KeyframesEditor.md:87` — `KF-KE-42 · D-30` → **KF.W6** repo row | **0** spec (CARRY 1) |
| **E-11** | **`C-m1`** | `kf-KeyframesEditor.md:98` — `KF-KE-53 · C-m1` → **KF.W6** | **0** spec (CARRY 2) |

E-4..E-11 are the **exact `L-EST-12` / `ND-7` class**: the host id is booked, the **banked NAME** is not, so a seat grepping the banked name lands on nothing. Round 4 declared the trail *"now enumerated from the RECORD rather than from the rows a ruling named"* — measured, it is not: **eight further record-side co-ids on KF.W6-routed rows resolve nowhere in this spec**, four of them at neither surface. E-1..E-3 are worse than escapes: they are **booked, then dropped by a premise the record falsifies** (D-P5-1).

**M-25 depth on the §Bounds carve cells is otherwise CLEAN.** Every id in every carve cell was resolved to a §Carry row this seat — TimelineCaret (8/8), KeyframeTimeline (11/11), CSSCodeEditor (5/5), KeyframesEditor (13/13), ChannelOptions (6/6), KeyframeCardList (5/5), cube (all), easing (all), sequence (all), square (all), spring (all), THP (6/6 — cured), TimelineTrack (4/4 — cured), KeyframesStringControls (2/2), CPW, RibbonBar, DGC, ACG, animationDescriptions. **D-P4-2's cure holds at scope.**

### 2.2 Axis 2 — RECEIPT REALITY + ANCHOR STABILITY: **DEFECTIVE at the W6↔W10 seam** (D-P5-4, D-P5-6)

**Everything this wave measures reproduces.** Re-executed at `81a56990` by this seat, one-for-one:

- **All eleven LAW-A censuses A-1…A-11** — A-1 (one live import, `test/demo/state/no-shadow-playback-authority.test.ts:21`; the rest docs prose) · A-2 (`ChannelControls.vue:230`) · A-3 · A-4 · A-5 (one consumer `instrument/index.ts:24`; the six `src/animation/**` hits are same-basename siblings) · A-6 (**0** on both spellings) · A-7 (two live importers, one via `@components`) · A-8 (`ChannelControls.vue:242`) · A-9 (post-delete set = `useControlsLayout.ts:5`) · **A-10** (`design-idioms.css:7` — exactly one edge) · **A-11** (`shell/index.ts:2` sole importer, `<EditorHeader` → **0**, `header-items-max-w` → 3 hits with `EditorHeader.vue:92` the sole consumer). **Nothing mis-resolved.**
- **The pasted LAW-A scope `awk`** re-run at the post-repair bytes returns **exactly 11 rows**, matching the receipt. LAW D honoured on the numeric arm.
- **Every §Bounds path resolves and every line count reproduces** — 55 paths checked by `git cat-file -e`, **0 missing**; `4 / 14 / 27 / 1 / 19 / 129 / 80 / 456 / 79 / 300 / 210 / 294 / 124 / 93 / 111 / 156 / 410` and the per-row counts (108 · 126 · 125 · 191 · 128 · 101 · 113 · 161 · 312 · 246 · 70 · 38 · 256 · 609 · 92 · 336 · 129) all exact.
- **Every gate witness** — `max-h-24` one site (`TimelineHoverPreview.vue:20`) · `tracking-normal` **0** · `normal-case` **5** at the five named coordinates · `--dock-margin` **0** defs / **10** uses (7 `layout.css` + 3 `TransportDock.vue`) · `--shadow-glass` one consumer `App.skeleton.vue:64` · `--dock-label-padding-inline` `ChromeDock.vue:381` · `KfPillTabs` **11** files · `SpringSidebar` **12 sites / 8 files** with **0** files at any path · *"THE ONE WRITER"* **5 sites / 3 files** · `.btn-interactive` **8 sites / 6 files** · `.tap-floor` 2 hits both its own · `FadingScroll` 2 mounts + import `:137` · `Card` **24 / 13** · `ToggleGroup` mounted · `Textarea` / `NumberField` / glass `Progress` / glass `Skeleton` / `Surface` / `./canvas` all **0** · `initStrategy: 'eager'` at `HeroAurora.vue:28` · `relay/` **absent** in value.js.
- **Outbound anchors resolve at the siblings' FINAL bytes**: `KF-W10 §5 G-2` (heading `:366`, acceptance verb `ADOPTED-BY-KF.W6 (RULINGS-4 R4-1)` at `:383`, inbound declaration received at `:385`) · `KF-W10 §6.D` (`:543`) with the **KF.W12 row carrying the ANTI-RE-BOOK note received from KF.W6** (`:559`) · `KF-W10 §3.1 .a` row `§B-3` (`:162`/`:184`) · `KF-W8 §Gates G7` (`:288`, inbound-dependency form, `shell/index.ts` row **STRUCK** at `:102`) · `KF-W9 G-KFW9-6` (`:223-229`, reciprocal recorded against `waves/KF-W6.md` at `:490`). The R4-3 constraint W6 carries verbatim is byte-present in **both** `RULINGS-4 §R4-3` and `KF-W9.md`. **No drift on any anchor this wave owns.**

**What fails is the far end of the seam this wave's D-P4-4 cure created.** `KF-W10.md:202` pastes, stamped *"Receipt, re-run this seat"*:

> `grep -coE 'CH2-02|BG-5|GU-1|GU-2|subject-legible' KF-W6.md KF-W9.md` → **0 and 0**; `grep -cE 'dock contract|Glass §4' KF-W6.md KF-W9.md` → **0 and 0** — *"the row directed a close-wave verb at two specs that had never heard of its subject."*

Re-run at the FINAL bytes this seat: **10 and 22**, and **1 and 1**. `KF-W10.md` mtime **17:38:21**, `KF-W6.md` **16:59:25** — W10 wrote **39 minutes after** W6 and its receipt was already false when written. The two ends of the §B-3 seam now assert contradictory facts about each other. **The drift class is not dead** (D-P5-4).

**And this wave breaches its own LAW C(3) declaration in the same row.** `KF-W6.md:583` states *"**every** receipt naming KF.W8, KF.W9 or KF.W10 carries the stable anchor alone — §-heading + row/gate id, **no quoted prose**, no line numbers."* `:94` carries five names *"labelled a QUOTATION FROM THAT ROW"* lifted from `KF-W10 §3.1 .a`'s `§B-3` cell, and `:387` carries a full quoted sentence attributed to `KF-W9`'s `G-KFW9-6` under the words *"Inbound anchor is §-heading + gate id only, LAW C(3)."* Both quotations are accurate; the **declaration that no quotation exists is not** (D-P5-6). `PASS-4/CLOSE-CERT.md:226` certified this file as *"anchor-only by their own declaration"* without testing the declaration against the bytes.

### 2.3 Axis 3 — M-25 DEPTH + LAW-A / SCOPE RECEIPTS: **DEFECTIVE** (D-P5-2)

LAW A itself is now genuinely at scope: 11 access-column rows + 3 act-bearing bare-`modify` rows = 14 acts, 14 censuses, all re-executed true. **R4-10's first class is closed.**

**Its second class is not.** `KF-W6.md:164` claims to enumerate *"**EVERY** gate-witness symbol"*, and `:573` certifies *"the gate-witness symbols are enumerated for the first time, **across all fifteen gates**."* Measured this seat:

```
$ grep -oE '\*\*G-W6-[0-9]+\*\*' KF-W6.md | sort -u        → 15 gates (G-W6-1 … G-W6-15)
$ sed -n '164p' KF-W6.md | grep -oE 'G-W6-[0-9]+' | sort -u → 11
```

**Four gates are absent from the receipt: `G-W6-6` · `G-W6-7` · `G-W6-11` · `G-W6-12`** — and each names symbols (`.focus-ring` / `field-control` / `aria-selected`; `touch-hit-area` / `.tap-floor`; `resolveCanvasColor` / `onFlipSettled` / `fillStyle`; `--aurora-opacity-ceiling` / `.aurora-root` / `light:true` / `initStrategy`). **The four omitted are exactly the four whose witness cells read *"RED, banked-executed"*** — i.e. the only gates in the file carrying an inherited rather than a seat-executed witness, which is precisely the class `G-W6-10`'s own bound exists to police. The receipt skipped the four cells that most needed it, and then asserted fifteen.

This is the round's own transferable finding — *"a repair that cures the named instance and not the stated scope leaves the law green over its own counterexample"* — firing **at the receipt written to close it**, and the claim *"across all fifteen gates"* is a spec-voiced completeness claim of the kind **LAW B** bans.

### 2.4 Axis 4 — GATES: **DEFECTIVE** (D-P5-3, D-P5-2)

- All **15** gates are born-RED with named witnesses; every witness reproduces (§2.2); no gate mints a `proof:*` mark; `G-W6-15`'s mint is declared, not slipped in; its GREEN is reachable by construction from A-11.
- `G-W6-3`'s GREEN is falsifiable and reachable; `G-W6-14`'s RED reads off a live probe (`relay/` absent, confirmed) and its GREEN is reachable by dispatch.
- **`G-W6-4`'s GREEN is UNREACHABLE IN-GRANT** (D-P5-3). The gate asserts *"zero refs to class names with no rule in the shipped sheet"* and W6-D books the cure as *"the 8-site sweep + delete `RIBBON_BUTTON_CLASS`."* The census re-run this seat: `git grep -n 'btn-interactive' origin/master -- demo/` → **8 sites / 6 files** — `RibbonBar.vue:135` · `PlaybackRibbon.vue:55` · `CubeScene.vue:188,:193` · **`SequenceTarget.vue:31`** · `SpringPhysicsFacet.vue:74,:105` · `SpringScene.vue:167`. **`demo/scenes/sequence/SequenceTarget.vue` is NOT in §Bounds**: the sequence row (`:100`) grants `SequenceScrubber.vue · SequenceScene.vue · **SequenceTarget.css** · SequencePlayhead.vue`, and `grep -n 'SequenceTarget' KF-W6.md` returns exactly two hits, neither a `.vue` grant. One of the eight sites lives in a file the wave cannot write, and **no out-of-bounds declaration is made** — while the same spec declares out-of-bounds sites by name twice elsewhere (`KF-SS-31`'s eight files; `KF-AX-31`'s `scripts/lib/demo-driver.mjs`). The gate's green is therefore unreachable without either a silent out-of-grant edit or a declaration that does not exist.
- **Ordering anomaly, recorded not booked**: the gate table lists `G-W6-15` before `G-W6-14`.

### 2.5 Axis 5 — POSTURE: **HOLD**

| item | verdict |
|---|---|
| **W4 head** | ✓ `→ KF.W4 (the SEQUENCING HEAD)` with its six sub-items; **DH-4's single posture sentence appears exactly twice, byte-identical** (`grep -oE '<the sentence>' \| wc -l` → **2**), at §Bounds `:110` and §Sequencing `:510`(6); path present at the frontier, **410 L** |
| **W3 gated** | ✓ `grep -n 'KF\.W3' KF-W6.md` → **0 hits**. No dependency claimed, no scheduling verb aimed at W3, no W3 surface touched |
| **O-21** | ✓ `grep -oE 'O-2[01]' KF-W6.md` → one hit, and it is a **false positive inside `KF-CO-20`** (`:332`). **Zero real `O-2x` rows**; no O-row is minted or collided with. O-21 remains KF.W1's outbound / KF.W10's `OP-3`+`G-6`+`§6.C` business, exactly as `RULINGS-4 D-8` places it |
| **KF-AV-28** | ✓ carried verbatim as a standing rider, governed rows enumerated per surface (`AnimationVisualizer` KF-AV-11 · `PlaybackRibbon`'s `--color-progress` half · `SequenceScrubber` KF-SCR-2 **and** `D·D-7` · plus KF-AV-27), discharge-before-spend stated at the row and at §Sequencing |
| **W11 / W12 / W13 disposition (RULINGS-4 R4-8)** | ✓ **present and coherent at both ends.** W6 owes exactly one thing under R4-8 — the anti-re-book note at the successor register — and it is declared anchor-only at `:418`/`:516`(b), **and received**: `KF-W10 §6.D` row 2 (**KF.W12**) carries *"**ANTI-RE-BOOK, received from KF.W6 (RULINGS-4 R4-1)**: `KF-APP-41` … is `ADOPTED-BY-KF.W6`"* with the C-22 token limb beside it. The register's `9 + 6 + 2 = 17` partition, the six travelling locks and the `MINTED-UNAUTHORED` verb are W10's and are intact. W6 mints nothing into the successor set and claims no cargo from it |
| **W10's greens conditioned on artifacts that exist** | ✓ for the artifacts W6 supplies — `G-2`'s left hand loses two rows **by adoption** (declared at `:418`, `:540`, received at `KF-W10:385`); `§B-3`'s evidence now exists at this end (`:94`); `G7`'s two facts (post-strike barrel set, `HeroAurora`'s departure being W8's own move) are supplied at `:70`/`:514`. **But see D-P5-4**: `KF-W10:202`'s pasted receipt asserts the opposite of what W6's final bytes contain |

---

## §3 · DEFECTS (worst first)

### D-P5-1 · **BLOCKER** — the R4-1 cure DROPS three KF.W6-routed rows on a hosting premise the record and the frontier both falsify

`KF-W6.md:420` carries `EH-4 + EH-5 + EH-8` **struck in place** under:

> ⟨MOOT-ON-DELETE at repair round 4 (R4-1): **all three limbs are hosted in `EditorHeader.vue`**, which this wave deletes, so no cure is spent here…⟩

and `:417` generalises it: *"every EH-\* limb **HOSTED IN `EditorHeader.vue`** is MOOT-ON-DELETE."*

**The premise is false, at the bank and at the tree.**

- `kf-EditorHeader.md:43` — *"`title="Toggle dark mode"` collides with DarkModeToggle's own state-aware accessible name, **live at EditorShell.vue:45**… Disposition: **KF.W6**."*
- `kf-EditorHeader.md:44` — *"`aspect-square w-8` on DarkModeToggle is inert on the aspect and yields a 32×36 box, **live at EditorShell.vue:46**… Disposition: **KF.W6**."*
- `kf-EditorHeader.md:47` — EH-8's cluster is the **live ribbon's** three controls: the SharePopover trigger, the shortcuts `Button`, and *"DarkModeToggle per EH-5."*
- The record's own verdict, `:117`: *"the corpus's **six live escapes (EH-1..EH-5**, EH-9's SharePopover batch)… **are the real cures**."*

Re-executed at `origin/master 81a56990` by this seat:

```
$ git grep -n 'Toggle dark mode' origin/master -- demo/
demo/app/dock/MbabbMenu.vue:20
demo/components/instrument/shell/EditorHeader.vue:25
demo/components/instrument/shell/EditorShell.vue:45
$ git grep -n 'aspect-square' origin/master -- demo/ | grep -E 'EditorShell|EditorHeader|MbabbMenu'
demo/app/dock/MbabbMenu.vue:21:      class="aspect-square w-5"
demo/components/instrument/shell/EditorHeader.vue:26: class="aspect-square w-8 scale-on-hover hover:opacity-50"
demo/components/instrument/shell/EditorShell.vue:36: class="aspect-square w-8 scale-on-hover"
demo/components/instrument/shell/EditorShell.vue:46: class="aspect-square w-8 scale-on-hover"
$ git grep -n '<DarkModeToggle' origin/master -- demo/
MbabbMenu.vue:19 · EditorHeader.vue:24 · EditorShell.vue:44
```

`EditorShell.vue:45`/`:46` carry the exact bytes the two MAJOR rows convict, and `EditorShell.vue` is a **live §Bounds `modify` row of this very wave** (`:66`). A **third** live instance sits at `MbabbMenu.vue:20-21`, also a §Bounds row (`:74`). **Deleting `EditorHeader.vue` moots none of them.**

The whole reason `kf-EditorHeader` exists is that `EditorHeader.vue` is a dead fork whose defects are **live at `EditorShell.vue`**; the round-4 repair inverted that finding. It struck the clause that said so (*"live escapes EH-4/-5/-8/-9/-10 are the real cures"*) and replaced it with a disposition that reads the fork as the host. Its own MOOT-ON-DELETE enumeration is careful about co-id twins (`SP-8` · `SP-10` · `RB-5` survive) and warns *"a seat that reads 'moot' as 'dropped' ships four regressions"* — and then ships two MAJOR and one MINOR regression itself, because the enumeration was built from **co-id twins** rather than from **each row's own banked anchor**.

This is R4-1's shape recurring inside R4-1's cure: **a disposition authorized on an inherited premise, false at the frontier, taken without the census that would have refuted it** — one `git grep 'Toggle dark mode'`. **A-11 censused the file's importers and never censused the rows' anchors.**

**Cure**: strike the *"all three limbs are hosted in `EditorHeader.vue`"* premise; re-cut EH-4 / EH-5 / EH-8 as **LIVE rows spendable at `EditorShell.vue`** (and MbabbMenu's third instance) under the existing §Bounds grants, with the `EditorHeader.vue`-hosted duplicates the only moot half; state the anchor per row rather than per co-id.

### D-P5-2 · **MAJOR** — the SUBJECT-IDENTITY scope receipt covers 11 of 15 gates and certifies 15

`:164` claims *"EVERY gate-witness symbol"*; `:573` certifies *"across all fifteen gates."* Measured: 15 gates exist, **11 enumerated**; `G-W6-6`, `G-W6-7`, `G-W6-11`, `G-W6-12` omitted, each symbol-bearing, and each the holder of a **banked-executed** (inherited) witness. The certificate is a spec-voiced completeness claim (LAW B) falsified by count, in the round whose stated law was that a cure must run to the **scope**, not the instance. Cure: enumerate the four, or state the receipt's true field (`11 of 15`, with the four inherited witnesses named as the outstanding class).

### D-P5-3 · **MAJOR** — `G-W6-4`'s green is unreachable in-grant: one of the eight `.btn-interactive` sites is outside §Bounds and is not declared

`SequenceTarget.vue:31` carries site 5 of 8. §Bounds grants `SequenceTarget.css`, never the `.vue`. The wave books the 8-site sweep whole (`:252`) with no out-of-bounds declaration, while declaring exactly that kind of residue twice elsewhere. Cure: add `demo/scenes/sequence/SequenceTarget.vue` to the sequence carve row (rows `D-16/L-13/C-6` already routed here), or DECLARE the one site out of bounds and re-cut the gate's green as `7 of 8 + one declared residue`.

### D-P5-4 · **MAJOR** — the W6↔W10 dock-contract seam is two-ended and mutually contradictory; the drift class survives

`KF-W10.md:202` pastes, as *"re-run this seat"*, `→ 0 and 0` on both `CH2-02|BG-5|GU-1|GU-2|subject-legible` and `dock contract|Glass §4` over `KF-W6.md`/`KF-W9.md`, and concludes the row *"directed a close-wave verb at two specs that had never heard of its subject."* Re-run at final bytes: **10 and 22**, **1 and 1**. W10 (mtime 17:38:21) wrote after W6 (16:59:25); the receipt was false at write time. D-P4-4 closed the seam at this end while the far end's evidence sentence still says the seam does not exist. Cure is W10's (re-run and restate), but the seam is W6's obligation to see: this end should carry the reciprocal as an anchor whose far-end cell it does **not** paraphrase.

### D-P5-5 · **MAJOR** — the ID-ALIASES trail is short by EIGHT, under a round-4 claim that it is now record-derived

`:178` was rebuilt at round 4 with the stated method *"enumerated from the RECORD rather than from the rows a ruling named."* Measured across every KF.W6-routed row in the 58 records, **eight further banked co-id names resolve nowhere in this spec**: `D-M5` · `D-28` · `L-B-2` · `C:C-8` (also **0** at the CARRY) and `C-M6` · `D-26` · `D-30` · `C-m1` (present at the CARRY, absent here). Every one sits on a row whose **host id is booked** — the identical `L-EST-12` / `ND-7 / D-C2` mechanism, at a fifth and sixth site. Two of them are additionally **ambiguous corpus-wide**: `D:D-9` and `L:D-11` on `kf-TypingDots.md:44` resolve in this spec only to **`kf-KfPillTabs`'s** rows of the same string, so a grepping seat lands on the wrong record — the D-P4-2 hazard, uncured for this record. Cure: enumerate the trail by command over the 58 records rather than by hand, and record-qualify every ambiguous member.

### D-P5-6 · **MINOR** — the LAW C(3) discipline statement is falsified by the file's own bytes

`:583`: *"**every** receipt naming KF.W8, KF.W9 or KF.W10 carries the stable anchor alone — §-heading + row/gate id, **no quoted prose**, no line numbers."* `:94` quotes five names from `KF-W10 §3.1 .a`'s `§B-3` cell (self-labelled *"a QUOTATION FROM THAT ROW"*); `:387` quotes a full sentence of `KF-W9`'s `G-KFW9-6` constraint under the words *"Inbound anchor is §-heading + gate id only, LAW C(3)."* Both quotations resolve correctly at the siblings' final bytes and at `RULINGS-4 §R4-3`, so no drift is live — but the discipline claim is false about its own file, and `PASS-4/CLOSE-CERT.md:226` certified it without testing it. Cure: either state the two declared quotations as LAW C(3) exceptions with their frozen sources named (`RULINGS-4` for the R4-3 sentence), or reduce both to anchors.

### D-P5-7 · **MINOR** — gate-table ordering

`G-W6-15` is tabled between `G-W6-13` and `G-W6-14`. Cosmetic; recorded so a later seat does not read it as a missing gate.

### D-P5-8 · **MINOR** — pass-4 figure diff, reported

**433 routed / 422 booked / 11 escaped / 54 contributing records**, against PASS-4's 431 / 426 / 5 / 54. The **+2** denominator is method (two manifest-only units PASS-4 did not separate). The **+6** escapes are real: PASS-4's five are all cured, and eleven different units escape at this clock — three of them (E-1..E-3) **introduced by the round-4 repair**.

---

## §4 · VERDICT

**LOCAL VERDICT: `DEFECTIVE`** — **1 BLOCKER · 4 MAJOR · 3 MINOR**.

**What holds, and it is most of the file.** The measurement surface is now genuinely excellent: **all eleven LAW-A censuses, all fifteen gate witnesses, all fifty-five §Bounds paths and every line count, the pasted `awk` scope command, and the entire re-cut census (424 / 8 / 2 / 1 · 58 / 54 / 50 · the eight pure-token-less records · all six collapsed-lane counts · both explicit zeros) reproduce EXACTLY under a hostile fresh re-run at `origin/master 81a56990`.** D-P4-2 is cured at scope across every §Bounds carve cell. D-P4-3 is cured at the sentence, not merely at the total. D-P4-6, D-P4-7 and the LAW-A act enumeration (14 acts / 14 censuses) are cured and re-verified. Posture is clean on all five items the pass tested: W4 head, W3 (zero surface), O-21 (zero real hits), KF-AV-28, and the W11/W12/W13 register, which is present and coherent at both ends.

**What fails is the same generalisation failure, now one layer deeper.** Round 4's transferable finding was *"a repair that cures the named instance and not the stated scope leaves the law green over its own counterexample."* At this clock the finding applies to round 4's own three headline cures: **R4-1's MOOT-ON-DELETE disposition was generalised from co-id twins instead of from each row's banked anchor, and it drops two live MAJORs and a MINOR whose anchors are `EditorShell.vue:45`/`:46` — a §Bounds file of this same wave (D-P5-1)**; **R4-10's second class was executed over eleven of fifteen gates and certified over fifteen, skipping exactly the four gates with inherited witnesses (D-P5-2)**; **the ID-ALIASES trail was declared record-derived and is short by eight (D-P5-5)**. To these the fresh axes add one in-grant break (`G-W6-4`'s eighth site outside §Bounds, undeclared — D-P5-3) and one live cross-wave contradiction at the very seam D-P4-4 closed (D-P5-4).

**The transferable finding for round 5**: *a disposition is only as sound as the anchor of the row it disposes — not the anchor of the file it is filed under.* Every one of D-P5-1, D-P5-3 and D-P5-5 is the same error: the spec resolved a row by its **host** (the file it was filed against, the id it was folded into, the wave that named it) instead of by the **row's own banked anchor**. A pass-6 seat should test dispositions by re-resolving each row's stated live site, not by re-resolving its carrier.

*Status of the subject spec is unchanged by this file: `planned`. No gate ran. No product source was opened for writing. Sole write = this file.*
