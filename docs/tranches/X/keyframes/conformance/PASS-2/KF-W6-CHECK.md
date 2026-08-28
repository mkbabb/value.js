# KF-W6 — FRESH ADVERSARIAL SPEC CHECK, PASS 2 (L-18/L-20)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W6.md` (449 L, status `planned`, repaired after a DEFECTIVE pass 1)
**Bank**: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` — **201 rows / 54 records** (the sole in-tree carry)
**Authority**: the 58 `kf-*.md` records under `docs/tranches/V/megatranche/registry/adjudicated/`
**Pass-1 register** (read for repair-verification only, never inherited): `PASS-1/KF-W6-CHECK.md` · **cross-wave rulings**: `PASS-1/RULINGS.md`
**Seat**: FRESH pass-2 adversarial seat. Every census unit, every gate witness and every anchor below was **re-derived from the bytes by this seat**. No product source opened for writing; no gate run; sole write = this file.
**Substrate**: keyframes.js `origin/master` = `81a56990736ced5b5edde0b84c527680ac7689b1` — **re-resolved by this seat**, matches the spec's ref of record exactly.

---

## §0 · Method (re-derivation, not inheritance)

1. **Corpus sweep.** All 58 records block-parsed. Routing tokens counted as routing INTO this wave, per the spec's own binding taxonomy (L10) and the CARRY's TAXONOMY RECONCILIATION: `KF.W6` (**not** `KF.W6-TIMELINE` = KF.W7 old numbering) · `KF.W2-TABS` · `KF.W3-SHIM` · `KF.W5-PARTIALS` · `KF.W7-TOKENS` · `KF.W4-PROSE` **non-`proof:*` limbs only**, and for those only where `KF-W4.md`'s R-6 manifest names the id (verified present: `KF-W4.md:95-109`, a 14-row id-for-id table).
2. **Census unit** = the (record, banked-id) pair; ids are record-scoped.
3. **Instruments**: `git grep` / `git show` at `origin/master` in `/Users/mkbabb/Programming/keyframes.js`; reads of the installed `node_modules/@mkbabb/glass-ui` 7.0.0 dist; `git cat-file -e` existence probes over every §Bounds path. Read-only throughout.

---

## §1 · Corpus totals — INDEPENDENTLY RECONCILED

| measure | this seat's measurement | spec/CARRY claim | verdict |
|---|---|---|---|
| literal `KF.W6` tokens across the 58 records | **424** (`grep -ohE 'KF[.-]W[0-9]+[A-Za-z-]*' kf-*.md \| sort \| uniq -c` → `424 KF.W6`; the 8 `KF.W6-TIMELINE` hits tokenize separately) | 424 | ✔ **EXACT** |
| files carrying a `KF.W6` token | **54** of 58 (zero: `kf-KfPillTabs`, `kf-SpringTrace`, `kf-OrbitalDrag`, `kf-TimingFunctionPanel`) | — | — |
| records routing **explicit zero** | **2** — `kf-SequenceAxis:130` (*"KF.W6/W7: no axis-owned rows"*) · `kf-SpringTarget:145` (*"KF.W6: no axis-owned material-register rows"*) | — | — |
| records routing in via a COLLAPSED lane only | **2** — `kf-KfPillTabs` (KF.W2-TABS/KF.W3-SHIM/KF.W4-PROSE) · `kf-SpringTrace` (KF.W4-PROSE, 3 limbs) | — | — |
| **contributing records** | **54** = (54 − 2 explicit-zero) + 2 collapsed-lane-only | 54 | ✔ **EXACT, and the arithmetic closes by two independent routes** |
| CARRY rows | **201** (`grep -c '^- \*\*'`) | 201 | ✔ |
| **routed census units** | **392** | — | pass-1 measured 390 on the same unit definition; the delta is pass-1's own miss at `kf-SequenceScrubber` (§2.1) |
| **BOOKED** | **391** | — | 99.7 % |
| **ESCAPED** | **1** | — | §2.1 |

> **CARRY `:7` gloss** — *"the **50** assigned slugs plus [five named]"* = 55, against the true 54. The spec **declares this** as owed addendum (vi) at L358 and **does not re-cut the row bank to fit the sentence**. E-3-correct; not a defect of this spec.

---

## §2 · ID-KEYED CENSUS — the escapes, named by bytes

Every record's W6-routed id set was re-derived and tested against `KF-W6.md` (rows · fold-identities · §Bounds carve-rows · homed packet arms · gate witnesses · §Excluded lines with a named home) and against the CARRY. **The five pass-1 escapes and the five alias drops are all CURED** (§4). One escape survives, and it is one pass 1 never saw.

### §2.1 · E-P2-1 · `kf-SequenceScrubber` **`D·D-7`** — ESCAPED (MAJOR)

The record's bolded terminal routing manifest routes **two** items into this wave:

> `kf-SequenceScrubber.md:133` — `- **KF.W6**: **KF-SCR-2** (the italic/synthesis decision — declare, ship, or retire; + the glass-ui BH relay per the owner edict) · **D·D-7's material-register adjacency**.`

and the row body is adjudicated with a *derived, independently re-derived* figure:

> `kf-SequenceScrubber.md:52` — `- **D·D-7** *(B's 4.606:1 derivation adopted — ruling 8)* — a dark-substrate phosphor `text-shadow` ships ungated into a light-default theme (`color-scheme: light`), blurring 12-16px tabular figures at ~4.6:1 (AA on thin headroom). Chain verified to `--accent-kf`'s `light-dark()`. Percept → SS-13`

**Receipt**: `grep -n 'D·D-7\|phosphor\|text-shadow' waves/KF-W6.md carry/KF-W6-CARRY.md` → **0 hits in both**. `KF-SCR-2` is booked (W6-G L213, §Bounds L74, §Carry L92 as a KF-AV-28 governed row); `D·D-7` is booked nowhere — not a row, not a fold, not a §Sequencing packet member, not an §Excluded line. `SequenceScrubber.vue` **is** in §Bounds (L74) and the wave owns the material-register class (W6-H), so the cure site was never the obstacle — the booking was. This is exactly the shape of pass-1's cured E-3/E-4/E-5, one record further on.

**Aggravation**: pass 1 recorded this record as *"kf-SequenceScrubber — 0 routed ids (no W6-routed ids)"* (`PASS-1/KF-W6-CHECK.md:218`), so no ruling was written and the repair round never saw it. The class of defect the repair round closed is therefore **not** closed by enumeration.

**Sequel obligation**: the row is banked under a **KF-AV-28 governed surface** (`kf-SequenceScrubber.md:36`), so whatever books it inherits the standing supersession rider the spec already carries verbatim at L90.

### §2.2 · ID-KEYED TRAIL GAPS — disposed by CLASS, never by ID (MINOR, ×3)

Not escapes (each has a real home in the spec's §Excluded), but the id-keyed trail does not close on them:

| routed id | registry byte | spec disposition | gap |
|---|---|---|---|
| `KF-CE-32` (kf-CSSCodeEditor) | `:68` — *"FOLD, not booked here: census **F-1** … identity owned by lane-frontend §10 step 1"* | §Excluded row 5 names *"Census F-1 … → KF.W0"* | the **id** is never named; a seat grepping `KF-CE-32` finds nothing |
| `LP-2` (kf-LayerConfigPanel) | `:95` — ≡ `KF-CO-1` | §Excluded names *"KF-CO-1 / KF-CO-8"* with the LP-1 lock | same — `LP-2` unresolvable by id |
| `M7` (kf-KeyframeTimeline) | `:65` — *"**→ KF.W7** (register misuse; cross-ref KF.W6's type-register discipline)"* | §Excluded routes *"All timeline STRUCTURE"* to KF.W7 | `M7` is a **register** row, not structure; it falls between the §Excluded line's words |

### §2.3 · LIMB-LABEL CROSSING with KF-W4's R-6 manifest (INFO)

`KF-W4.md:101-103` (manifest rows 7–8) assigns **`C:C-1` = the header mangle** and **`L:D-8` = the `:4-5` non-existent consumers**. `KF-W6.md:145-146` books **"KPT header mangle"** as its own line (which is the bank's own id, `kf-KfPillTabs.md:71`) and attributes **"phantom-consumer riders"** to `C:C-1` — whose banked body (`kf-KfPillTabs.md:43`) is the **MAJOR fork-rationale-void** row folding to CC `C-6`, already booked at W6-A L102. All three ids are booked at W6; only the limb labels disagree across the two specs. R-6's *"id-for-id"* is satisfied; its *"limb-for-limb"* is not.

---

## §3 · GATES — L-19, born-RED with LIVE witnesses · **RE-EXECUTED BY THIS SEAT**

14 gates, all stamped RED, none run. **This seat re-executed every re-executable witness. Two carry false cells.**

### §3.1 · Re-executions that REPRODUCE EXACTLY

| gate | command re-run at `origin/master 81a56990` | result | spec's claim | verdict |
|---|---|---|---|---|
| **G-W6-1** | `git grep -- '--dock-margin:' -- demo/` | **0 definitions** | 0 defs | ✔ |
| | `git grep -n 'var(--dock-margin' -- demo/` | **10** — `layout.css:80,92,117,135,161,166,204` + `TransportDock.vue:389,395` live, `TransportDock.vue:379` prose | 9 live + 1 prose at `:379` | ✔ **exact, site for site** |
| | `--shadow-glass` | 1 consumer `App.skeleton.vue:64`, 0 defs | same | ✔ |
| | `--dock-label-padding-inline` | 1 consumer `ChromeDock.vue:381`, 0 defs | same | ✔ |
| **G-W6-2** | `git grep -l KfPillTabs -- demo/ test/` | **11 files** | 11 files | ✔ |
| | `git show origin/master:demo/app/App.vue \| sed -n 176p` | `provide(TABS_EXTERNALLY_MANAGED_KEY, true);` | the unconditional provide at `:176` | ✔ |
| **G-W6-3** | existence + `wc -l` on the whole delete family | `composables/useKfPillTabs.ts` **4** · `transport/index.ts` **14** · `instrument/index.ts` **27** · `useRafLoop.ts` **19** · `useAnimationGroupPlayback.ts` + its test present | same | ✔ |
| **G-W6-4** | `git grep -n 'btn-interactive' -- demo/` | **8 sites / 6 files** | 8 sites/6 files | ✔ |
| | `git grep -n 'tap-floor' -- demo/` | **2 hits, both `design-idioms.css:81-82`** (its own comment + its own selector) → zero adopters | zero adopters, "its 2 grep hits are its own comment + selector" | ✔ **exact** |
| | `scripts/proof-phantom-classes.mjs` | **ABSENT** at origin/master | "named-but-absent" | ✔ a correct **negative** claim |
| **G-W6-5** | `design-idioms.css:9-11` + `:15-21` | the override-policy prose verbatim, then the `--rainbow-*` six + `--amiga-red: var(--rainbow-red)` in an **unlayered `:root`** | MISSED-H's lock, quoted | ✔ **exact** |
| **G-W6-8** (pass-1 D-G1, repaired) | `git grep -n 'max-h-24' -- demo/` | **exactly one site**: `TimelineHoverPreview.vue:20`, class string `font-mono text-admin-label text-muted-foreground max-h-24 overflow-y-auto w-full` | quoted **character for character** in the spec | ✔ **the "RED by construction" derivation is now a real executed witness** |
| | `git grep -n 'tracking-normal' -- demo/` | **0** | 0 | ✔ |
| | `git grep -n 'normal-case' -- demo/` | **5** — `MbabbMenu.vue:5,:64` · `SharePopover.vue:19` · `ChannelOptions.vue:254,:265` | same five, same lines | ✔ **exact** |
| **W6-AUTH-1** (the spec's riskiest net-new) | installed dist | version **7.0.0**; **73** export subpaths; sole wildcard `./fonts/*`; `./tabs` → `export * from "./components/tabs"` → **`SegmentedTabs` + exactly 7 types**; root barrel `useTabRovingFocus` = **0**; the composable exists only as the hashed private chunk `dist/useTabRovingFocus-Dh4yBGxq.js` | all five sub-claims | ✔ **TRUE on every limb, verified independently** |
| **§Bounds** | `git cat-file -e` × **46 paths**; `wc -l` × **30 line-counted rows** | **46/46 exist; 30/30 line counts EXACT** (124/93/4/14/27/19/129/80/456/79/300/210/294/126/125/191/128/101/113/80/161/312/246/70/38/256/609/92/336/129) | — | ✔ **no phantom path, no drifted count** |

### §3.2 · D-P2-G1 · **G-W6-9's witness carries a FALSE UNIVERSAL** — MAJOR

> `KF-W6.md:376` — `**RED, banked-executed — all at zero mounts**: `Textarea` (`./forms` ✓), **`FadingScroll`** (`./fading-scroll` ✓, named while hand-rolled), `NumberField` …, `Surface`/`PaperBackdrop`/**Card-family** (declined at 4 sites), …, **`ToggleGroup`** (28 chips; used 30 lines up), …`

Measured at the wave's own ref of record:

```
git grep -n 'FadingScroll' origin/master -- demo/
  demo/scenes/easing/EasingTarget.vue:42    <FadingScroll axis="x" class="family-filter">
  demo/scenes/easing/EasingTarget.vue:76    <FadingScroll axis="y" class="specimen-drawer min-h-0 w-full flex-1">
  demo/scenes/easing/EasingTarget.vue:137   import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";
git grep -o '<Card' origin/master -- demo/ | wc -l          → 24
git grep -n 'ToggleGroup' origin/master -- demo/            → EasingTarget.vue:50/:56/:63/:64 + import :139
```

**`FadingScroll` is CONSUMED on both axes, with the real subpath import, in `EasingTarget.vue` — a file this wave already owns (§Bounds L73).** `Card` has 24 mounts. `ToggleGroup` is mounted (the same cell says so in its own parenthesis, *"used 30 lines up"*, and contradicts the universal three words earlier). So **three of the nine enumerated surfaces are not at zero mounts**, and the witness's quantifier is false at the tree it names. The CARRY carries the sharper false form — `KF-W6-CARRY.md:273`, *"`FadingScroll` (0 while `ChannelControls.vue:51-54` names it)"* — so the spec inherited it rather than re-derived it.

**Why it is load-bearing, not cosmetic**: §Sequencing item 8 makes *"one FadingScroll decision (CC-N-2 + KSM R-2..R-22)"* a ONE-decision register, and W6-I's KSM cure is *"`FadingScroll axis="y"` as the named tabbable port"*. The demo **already has** a two-axis adoption precedent inside §Bounds, and neither the gate, W6-A's CC-N-2, W6-I's KSM cluster, nor §Sequencing mentions it. A wave-wide decision authored against "zero mounts" is authored against the wrong tree. `grep -n 'EasingTarget' waves/KF-W6.md` shows the file only in §Bounds L73 and W6-G/W6-I rows — never as the FadingScroll precedent.

### §3.3 · D-P2-G2 · **G-W6-10 carries a witness cell the spec itself declares STALE** — MAJOR

> `KF-W6.md:377` (G-W6-10 witness) — `**RED, banked-executed**: `KfPillTabs.vue:2-5` broken header; `:4-5` non-existent consumers; `:41-44` impossible re-export; `:45-46` contingency MET by 7.0.0; **`SpringSidebar` in 3 live files**; "THE ONE WRITER"; `tab-idiom.css` header; `transitions.css:23-37` unresolvable cite`

> `KF-W6.md:349` (W6-N, KF-SS-31) — *"**SEAT CENSUS RE-PIN (binding, and it CORRECTS this spec's own figure): `SpringSidebar` = 12 comment sites / 8 files** … and **G-W6-10's witness cell "`SpringSidebar` in 3 live files" is stale against it**"*

The spec **names its own gate witness as stale in §Carry and leaves the gate cell unedited**. Measured by this seat:

```
git grep -c 'SpringSidebar' origin/master -- demo/
  KeyframesEditor.vue:2 · KfPillTabs.vue:1 · SpringHeatmap.vue:1 · SpringPhysicsFacet.vue:1
  SpringScene.vue:2 · StartingStyleTarget.vue:3 · useSpringHotPath.ts:1 · useSpringLinearStops.ts:1
  → 12 hits / 8 files          (the re-pin is EXACT; "3 live files" is off by 5 files and 9 sites)
```

L-19 admits a witness *"carried verbatim from a bank that executed it"* — it does not admit a witness the carrying document has already ruled false. A born-RED gate whose witness column contains a known-false cell is the precise failure L-19 exists to prevent, and the repair round wrote the correction into one section without propagating it 28 lines down.

### §3.4 · D-P2-G3 · **G-W6-14's born-RED witness names the wrong tree** — MINOR

> `KF-W6.md:381` — `**RED, no relay sent**: the path above does not exist at `origin/master`` — the path being `docs/tranches/X/keyframes/relay/KF-W6-BH-COMMUNIQUE.md`.

The spec's `origin/master` is defined in its own header as **keyframes.js `81a56990`**; the communiqué path is a **value.js** docs path (X·KF's tranche tree). Probed both: `git cat-file -e origin/master:docs/tranches/X/keyframes/relay/KF-W6-BH-COMMUNIQUE.md` in keyframes.js → **absent** (keyframes.js `docs/` has no `tranches/`); `ls value.js/docs/tranches/X/keyframes/relay` → **No such file or directory**. The gate is genuinely **RED either way**, and pass-1's D-G2 (no path at all) is cured — but the witness cites a tree in which the artifact could never live. One clause fixes it.

### §3.5 · L-19 posture otherwise — CLEAN

No `proof:*` mark is minted (the house law is stated at L6, L364, L377 and turned into anti-contrivance bounds: G-W6-4 *"fails if `proof-phantom-classes.mjs` is re-minted as a grep gate"*). Every gate carries an anti-contrivance bound; several are genuinely adversarial (G-W6-1 *"fails if 'fixed' by per-site fallback"*; G-W6-2 *"fails on a private-dist deep import"*; G-W6-9 *"fails if any radius cure is computed against glass's detuned shipped values"*). **No phantom script is cited anywhere in the spec.**

---

## §4 · REPAIR VERIFICATION — pass-1 defects and the rulings addressed to KF-W6

### §4.1 · The 13 pass-1 defects

| pass-1 id | cure required | landed? | this seat's receipt |
|---|---|---|---|
| **E-1** CubeTarget `#21`/`#30`/`#39` | book as rows, carry the `:100` manifest + `:38` carriage clause verbatim | ✔ | W6-H L238 books all three as **THE r1 SET, CARRIED WHOLE**, quotes `:100` and `:38` verbatim, carries `#30`'s `@property` rider and `#39`'s token-hygiene rider; §Sequencing L400 now enumerates **five** cube ids, not two |
| **E-2** ChannelControls `D-7/L-4` | book the rationale limb, manifest head | ✔ | W6-C L139, headed *"THE COUNTERFACTUAL RATIONALE LIMB"*, with the NO-WAVE-OWNER branch-delete half explicitly **not** spent |
| **E-3** SquareInstrument `D-20` | book + add the BG-6 relay ask to G-W6-14 and the §Sequencing relay list | ✔ | W6-G L215 (with the `--type-tracking-display` sharpening); G-W6-14 L381 relay inventory; §Sequencing L413 relay list — all three |
| **E-4** CubeScene `D-20` | book under W6-C's stale-vendor-premise class | ✔ | W6-C L140, *"This wave IS a touching wave"*, + §Sequencing L400 cube arm |
| **E-5** SequencePlayhead flat-namespace datum | book beside the material register | ✔ | W6-D L178, distinguished from `KF-AX-25`'s pair **and** from SquareScene D-23 |
| **E-6** 5 alias drops | alias lines | ✔ | §Carry L94 **ID ALIASES** block: `C-7 / L-m7` · `D-M3 / L-M-3 / C-B-1` · `L-EST-6 / D-C6 / ND-10` |
| **D-INV-1** `KF-SP-3` minted id | re-key to the banked `C-3` | ✔ | L94 + L177 + §Bounds L74 + §Gates + §Sequencing all re-keyed; `grep -rc 'KF-SP-3' registry/adjudicated/kf-*.md` → **0** re-verified by this seat |
| **D-INV-2** `W6-AUTH-1` unbanked | registry round-trip owed | ✔ | declared as owed addendum (iii) at L358; the claim itself re-verified TRUE by this seat (§3.1) |
| **D-G1** G-W6-8 "RED by construction" | a named live witness | ✔ | re-cut to an **executed** grep pair; both re-run here and exact (§3.1) |
| **D-G2** G-W6-14 unpathed | name the artifact path | ✔ (with §3.4) | path named at L381 and L394 and L413, *"to-be-created, L-19's admitted witness form"* |
| **D-P1** KF-AV-28 not declared | the standing clause verbatim + governed-row enumeration | ✔ | §Carry L90 — **byte-identical** to `RULINGS.md` R-10 (748 chars, diffed by this seat); governed rows enumerated L92; guards inline at L61/L62/L74/L213; §Sequencing binding (6) at L408 |
| **D-B1** §Bounds `only` vs §Carry | amend the carve list | ✔ | §Bounds L54 now `…-23/-**24 (TOKEN-decision rider only)**/-30/-31/-**32**/…`, matching R-2's prescribed text |
| **§1 CARRY gloss** 50+5=55 vs 54 | name which term is off, never re-cut the bank | ✔ | owed addendum (vi) L358 |

### §4.2 · The 8 rulings addressed to KF-W6 (`RULINGS.md` §END)

**R-1d** ✔ (all six, + the alias lines) · **R-2** ✔ (verbatim) · **R-5** ✔ (L266 — *"CENSUS ID PENDING THE KF.W0 C-17 MINT … the 'S-10' spelling here is a CLAIM-INPUT, not a slot"*) · **R-6** ✔ (L10 annotated *"limbs travel BY MANIFEST, not by class-claim"*; L138 manifest receipt with D-7/L-4 first; W4's reciprocal manifest verified to exist at `KF-W4.md:95-109`) · **R-10** ✔ (verbatim, diffed) · **R-13** ✔ (L410 — *"`CopyButton.vue`'s MOVE is KF.W8's (KF-CB-37); this wave's KF-CB-7 reshell MODIFIES IN PLACE"*, and the phantom reciprocal is named as never authored) · **R-19a** ✔ (**W6-N**, all ten ids booked as ids: `KF-SS-4` · `KF-SS-6` · `KF-SS-31` · `KF-SS-38` · `KF-ET-33` · `KF-ET-35` · `KF-ES-36` · `KF-SKEL-9` · `KF-SKEL-20` · `KAD-17`, + CARRY mirror declared owed) · **R-19e** ✔ (`KF-EST-4` addendum owed, L358(ii); `KF-EST-4` confirmed **0 hits** in the CARRY by this seat).

### §4.3 · W6-N's new anchors — SPOT-CHECKED AT THE BYTES (the repair round's highest-risk surface)

| booked claim | this seat's re-derivation | verdict |
|---|---|---|
| `KF-SKEL-9`: `AnimationControlsGroup.vue:6` emits `controls-layout--stage-${stageMode}` | `git show origin/master:…/AnimationControlsGroup.vue \| sed -n 6p` → `` `controls-layout--stage-${stageMode}`, `` | ✔ exact |
| `KF-ET-35`: two dead `const` tables at `:108`/`:116`, imports at `:128-129`, file 129 L | `:108` `COLOR_SPACE_DESCRIPTIONS`, `:116` `HUE_METHOD_DESCRIPTIONS`, `:128-129` the two value.js imports, `wc -l` = **129** | ✔ exact |
| `KF-ET-33`: the stale *"ToggleChip"* name has **two** sites | `EasingTarget.css:169` (*"ToggleChip's data-state…"*) **and** `EasingTarget.vue:70` (*"a glass-ui ToggleChip cell"*) | ✔ exact |
| `KF-SS-6`: only violet is true — `style.css:163 → :130`, oklch hue 295/305 | `:163` `--color-progress: var(--accent-kf)`; `:130` `--accent-kf: light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))` | ✔ exact |
| `KF-SS-31`: `SpringSidebar` = 12 sites / 8 files | 12 / 8 (§3.3) | ✔ exact — **and it convicts G-W6-10** |
| `KF-SKEL-20`: prose vs fallbacks 5%/12% vs declared 3%/11% | `layout.css:33-35` → `3%` / `11%`; `EditorShell.vue:241/:246` → `5%` / `12%` fallbacks, under `:234`'s self-described *"hard-gate clause-g legibility assertion"* | ✔ exact |
| `CC-L-15` rider: repoint `ChannelControls.vue:230` at `../KfPillTabs/useKfPillTabs`, **not** the `.vue` | `:230` = `import type { KfPillTabOption } from "../composables/useKfPillTabs";` | ✔ the rider names the right line and the right target |
| `.tap-floor` premise correction: *"the shipping 32px answer (`SharePopover.vue:31-39`)"* | `:31-39` = glass `<Button size="sm" emphasis="quiet" class="h-8 w-8 p-0">` | ✔ exact |
| CPD R-6 **KILL-SHOT**: *"`KeyframeCard.vue:45-49` does it right on the IDENTICAL idiom"* | `:45` `class="focus-ring hljs css …"`, `:47` `role="textbox"`, `:48` `aria-multiline`, `:49` `:aria-label` | ✔ exact |
| KSM R-6/R-7 **KILL-SHOT**: `design-idioms.css:222-231`'s `.status-badge` | `:224-228` — *"A status WORD is a UI label, not data … this un-layered rule out-cascades that utility's mono family bind"* | ✔ exact |
| `KF-CO-19` cure = ONE token at `design-idioms.css:36` | `:36` `--color-gold: hsl(43 74% 49%);` | ✔ exact |

---

## §5 · E-3 + STATUS — CLEAN

| axis | result |
|---|---|
| **VERIFIED stamps** | **ZERO**. `grep -n 'VERIFIED' waves/KF-W6.md` → **0 hits** (the repair introduced none). Lower-case past-tense witness language only (`verified twice at the installed dist`, `re-verified in the INSTALLED dist`). |
| **status `planned` everywhere** | ✔ L3 `**status: `planned`**` · L4 *"every status field stays `planned`"* · L364 *"Status at authoring: **ALL RED**"* · L448 *"Status: **planned**. … no gate has run"* |
| **no product source opened** | ✔ every instrument is `git show origin/master:<f>` / `git grep` / installed-dist read; `scripts/dev/dev.sh` ring-fenced *"unowned, either repo, **NEVER touch**"* (L82); `node_modules/**` and the shipped bundle listed read-only |
| **execution voice** | ✔ imperative-future throughout (`Cure: DELETE the branch whole`, `resolves BEFORE`, `must not split`). The repair's new sections (W6-N, the alias block, the R-6 receipt) are in the same voice — *"booked"*, *"declared"*, *"owed"*, never *"done"*. |
| **E-3 addenda-not-patch** | ✔ and **strengthened**: L358 now enumerates **six** owed bank writes (i)–(vi) under original ids, each explicitly *"flagged upward, never patched"*, including the one that corrects the CARRY's own arithmetic without re-cutting the row bank. `KF-SST-30`'s corrections stay *"annotated, not rewritten — E-3"* (L164); `KF-KE-30` stays *"a census §6.3 E-3 addendum … never a rewrite"* (L173). |

---

## §6 · POSTURE

| axis | verdict | receipt |
|---|---|---|
| **KF.W4 = declared SEQUENCING HEAD** | ✔ HOLDS | L406 `→ KF.W4 (the SEQUENCING HEAD)` with six enumerated bindings incl. two ATOMIC BUNDLEs (KF-AT-4 ∥ KF-AT-3; KF-AT-10) and the `scripts/observe/demo/usability.mjs` non-concurrency lock (file verified to exist) |
| **KF.W3 GATED, never scheduled** | ✔ HOLDS | `grep -c 'KF\.W3' waves/KF-W6.md` → **0**; `grep -c 'PLAW'` → **0**. The only W3-shaped token is the superseded lane name `W3-SHIM` in the taxonomy line |
| **KF-AV-28 rider present wherever governed rows are cured** | ✔ HOLDS | clause byte-identical to R-10 (L90); governed rows enumerated (L92: `KF-AV-11` · the `--color-progress` half · `KF-SCR-2` · `KF-AV-27`); inline guards at §Bounds L61/L62/L74 and W6-G L213; §Sequencing binding (6) L408. **Caveat**: the escaped `D·D-7` (§2.1) is banked under the same governed surface — when it is booked, it inherits the rider |
| **pass-1 rulings faithfully applied** | ✔ 8 of 8 (§4.2) | R-10 and R-2 verified **verbatim**; R-6's reciprocity verified at the far end (`KF-W4.md:95-109`) |
| **squares with the CARRY** | ✔ 201/54 both re-measured | the only spec-vs-CARRY divergences are the **declared** ones (the repair-round-1 intake, enumerated at L358(v) with `0 hits` measured per id) |

---

## §7 · VERDICT — **DEFECTIVE**

**What holds, and it is most of it.** 391 of 392 routed census units booked (99.7 %). The 54-record figure closes by two independent routes; the 424-token figure reproduces exactly. **Every one of the 13 pass-1 defects is cured, and eight of eight rulings addressed to this wave are executed — two of them (R-2, R-10) verbatim.** Every re-executable gate witness reproduces **exactly**, several character-for-character; 46 of 46 §Bounds paths exist and 30 of 30 line counts are exact; `scripts/proof-phantom-classes.mjs`'s absence is a correct negative; `W6-AUTH-1` is TRUE on all five limbs at the installed dist; eleven load-bearing anchors sampled from the repair round's own new prose all land on the byte. **No phantom script, no phantom path, no drifted count, no VERIFIED stamp, no execution voice, no product-source opening.** M-25 is satisfied on substance — locks, riders, kill-locks and dissents are carried, not cited.

**What fails.** Two **born-RED gate witnesses are false at the tree they name** — G-W6-9's *"all at zero mounts"* (`FadingScroll` has two live mounts and a real subpath import in a §Bounds file; `Card` 24; `ToggleGroup` mounted and self-contradicted inside its own cell), and G-W6-10's *"`SpringSidebar` in 3 live files"* (measured **12 sites / 8 files** — a cell the spec's own W6-N declares stale and then leaves standing 28 lines away). One **census escape survives with explicit bolded registry markup** — `kf-SequenceScrubber` `D·D-7`, which pass 1 never saw because it recorded that record as routing nothing. Then one MINOR witness-tree error, three MINOR id-keyed trail gaps, and one INFO limb-label crossing with KF-W4's manifest.

**Pass-2 disposition**: **3 MAJOR · 4 MINOR · 1 INFO.** None impugns the substrate, the taxonomy ruling, the E-3 posture or the status posture — but two of the three MAJORs are *gate* defects, and a gate that asserts a false measurement cannot be born RED for its intended reason.

*Written by the fresh pass-2 adversarial spec-check seat, L-18/L-20. Every figure above re-derived from the bytes by this seat. No product source opened for writing; no gate run; sole write = this file.*
