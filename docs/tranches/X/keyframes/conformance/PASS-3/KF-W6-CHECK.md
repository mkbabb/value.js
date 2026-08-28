# KF-W6 — FRESH ADVERSARIAL SPEC CHECK, PASS 3 (L-18/L-20)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W6.md` (459 L, status `planned`, repaired twice)
**Bank**: `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` — 201 `- **` rows / 366 L (the sole in-tree carry)
**Authority**: the 58 `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/`
**Prior registers** (read for repair-verification only, never inherited): `PASS-1/KF-W6-CHECK.md` · `PASS-2/KF-W6-CHECK.md` · rulings `PASS-1/RULINGS.md` · `PASS-2/RULINGS-2.md`
**Seat**: FRESH pass-3 adversarial seat. Every census unit, gate witness, anchor and figure below was **re-derived from the bytes by this seat**. No product source opened for writing; no gate run; sole write = this file.

**TREE LAW discharge.** `git rev-parse origin/master` in `/Users/mkbabb/Programming/keyframes.js` → **`81a56990736ced5b5edde0b84c527680ac7689b1`** (2026-07-18). Local `HEAD` = `8281638c0ac4ac8c54a67a018ca5bf6a9117174f`, measured **ahead 1 / behind 41** — the spec's own "41 behind and DISQUALIFIED" wording is exact on the behind-leg and silent on the ahead-leg, which is immaterial to witnessing. **No witness in this register is anchored at `8281638c`.** Every `git grep` / `git show` / `git ls-tree` below carries the explicit `origin/master` ref.

---

## §0 · Method (re-derivation, not inheritance)

1. **Corpus sweep.** All 58 records block-parsed for the six lanes the spec's binding taxonomy collapses into this wave — `KF.W6` (excluding `KF.W6-TIMELINE`, which is KF.W7's) · `KF.W2-TABS` · `KF.W3-SHIM` · `KF.W5-PARTIALS` · `KF.W7-TOKENS` · `KF.W4-PROSE`.
2. **Unit** = one routed **banked row** per record (co-id clusters such as `C:C-1 / L:D-3 / D:D-10` counted as ONE unit; the strict `(record, banked-id)` expansion is reported separately in §1 because the two readings differ and the spec's figure matches neither).
3. **Instruments**: read-only `git grep` / `git show` / `git ls-tree` at `origin/master` in keyframes.js; reads of the installed `node_modules/@mkbabb/glass-ui` 7.0.0 dist; `git cat-file -e` + `wc -l` over every §Bounds path; `grep` over the registry, the CARRY and the sibling wave specs in value.js.

---

## §1 · Corpus totals — INDEPENDENTLY RE-MEASURED

| measure | this seat | spec claim | verdict |
|---|---|---|---|
| literal `KF.W6` tokens across the 58 records | **424** (`grep -ohE 'KF[.-]W[0-9]+[A-Za-z-]*' kf-*.md \| sort \| uniq -c`) | 424 | ✔ EXACT |
| records carrying a literal `KF.W6` | **54** of 58; the four without = `kf-KfPillTabs`, `kf-OrbitalDrag`, `kf-SpringTrace`, `kf-TimingFunctionPanel` | 54 / same four | ✔ EXACT |
| explicit-zero routers | **2** — `kf-SpringTarget.md:145`, `kf-SequenceAxis.md:130` | 2, same two | ✔ EXACT |
| collapsed-lane-only routers | **2** — `kf-KfPillTabs`, `kf-SpringTrace` (`kf-OrbitalDrag` and `kf-TimingFunctionPanel` measure 0 lane hits and contribute nothing) | same | ✔ EXACT |
| contributing records | **54** = (54 − 2) + 2 | 54 | ✔ EXACT, closes by two routes |
| CARRY rows | **201** (`grep -c '^- \*\*'`) | 201 | ✔ |
| **routed units (banked rows, co-ids collapsed)** | **421** | — | see D-P3-5 |
| **strict `(record, banked-id)` pairs** | **473** | **392** | ✖ the spec's stated method does not reproduce its stated figure |
| **BOOKED** (id occurs somewhere in `KF-W6.md`) | **420** | — | 99.8 % |
| **ESCAPED** (zero occurrences in `KF-W6.md`) | **1** | 0 | §2.1 |

**CARRY→spec closure re-run**: all 201 CARRY row heads were tokenised and tested against the spec. **Every defect row lands.** The six non-landing heads are the five taxonomy-preamble bullets at `KF-W6-CARRY.md:10-15` (not defect rows; they are the "201" count's own padding) and `:66` *"KPT C:C-1 phantom-consumer riders"*, which the spec books under the R2-14 re-key as *"KPT `:4-5` phantom-consumer riders"* — a tokeniser artefact, not a gap.

**Declared-exception audit (E-3).** Each id the spec declares at 0 CARRY hits was re-measured at the CARRY bytes: `D·D-7` **0** · `KF-EST-4` **0** · `KF-SS-4` **0** · `KF-SS-31` **0** · `KF-SKEL-9` **0** · `KF-ET-35` **0** · `KF-ES-36` **0** · `KAD-17` **0** · `SquareInstrument D-20` **0** · `CubeScene D-20` **0** · `#21` **0** · `#30` **0** · `#39` **0**. **Every declaration is true.** The exception list is nonetheless INCOMPLETE — see D-P3-2.

---

## §2 · ID-KEYED CENSUS — the escapes and the dispositionless bookings

### §2.1 · D-P3-3 · `kf-EditorStartScreen` **`L-EST-12`** — ESCAPED (MAJOR)

`kf-EditorStartScreen.md:47` routes it, in the record's own fold table:

> `| **L-EST-12** | **kf-AnimatedText KF-AT-2** (`$attrs` fan-out ×N inside the aria-hidden subtree) | Nothing new; anchor corrected :37 (reader-DU's kill, sustained) | KF.W6 |`

The CARRY carries it — `KF-W6-CARRY.md:171`, in the KF-AT roster row's witness block: *"⟨kf-AnimatedText; kf-EditorStartScreen folds **L-EST-6/L-EST-12**/reader-DU 2.2.2/reader-LC `.hero-dots`; kf-TypingDots folds⟩"*.

**Receipt**: `grep -o 'L-EST-[0-9]*' waves/KF-W6.md | sort -u` → **`L-EST-2`, `L-EST-6` only**. `L-EST-12` has **zero occurrences** in the spec.

**Why it convicts.** The spec's §Carry opens an **ID ALIASES — the banked-name trail (anti-rename: ids keep their banked names for life)** block whose stated purpose is *"restored so the id-keyed trail closes"*, and it restores `L-EST-6` (as `≡ KF-AT-1`) and `L-EST-2` (in W6-G) from the **same record**, while dropping the third co-id the same CARRY row names one clause away. The closing certificate — *"the CARRY ledger whole (201 rows / 54 records — **every row landed** as a carry row, a gate, a bounds item, a homed packet arm, or an §Excluded line with reason)"* — is falsified by it.

**Aggravation.** This is the exact class the round-2 repair closed by naming `KF-CE-32`, `LP-2`/`LP-3` and `M7` at their §Excluded lines. The class is therefore **not closed by enumeration** — one record further on, for the third pass running (pass 1 → five escapes; pass 2 → `D·D-7`; pass 3 → `L-EST-12`). The defect is not that this id has no home (it folds to `KF-AT-2`, which is booked); it is that the *anti-rename trail the spec builds for itself does not reach it*, and a seat grepping the banked name finds nothing.

### §2.2 · D-P3-2 · `kf-SpringPhysicsFacet` **`SPF-10`** — booked with NO DISPOSITION and undeclared at the bank (MAJOR)

The record routes it explicitly and by mechanism:

> `kf-SpringPhysicsFacet.md:50` — *"**SPF-10 · MINOR — NET-NEW … `shape="cell"` is a no-op by erosion.** The merger drops `gap-1.5` ×2, `px-2`, `px-3.5`, `py-1.5`, `text-small`, `items-center` … The component asks for a design-system geometry variant and receives a flex-direction — **the real glass-ui-conformance defect at this site**. → **KF.W6** (the conformance sweep's correct target)."*

Measured against the two consuming documents:

| probe | result |
|---|---|
| `grep -c 'SPF-10' carry/KF-W6-CARRY.md` | **0** |
| `grep -n 'SPF-10' waves/KF-W6.md` | **1 hit — §Bounds L75 only**: *"SPF-6/SPF-10, KF-SS-9 register, prose rows, KF-SST-28/-30 consumer half"* |
| §Carry row for SPF-10 | **none** (W6-D books SPF-32; W6-I books nothing; W6-C books SPF-27) |
| §Sequencing spring-packet arm | *"SPF-6/-8/-27/-32"* — **SPF-10 omitted** |
| §Gates / §Excluded | **absent from both** |

**Two independent convictions.** (i) The spec's header law at L7 — *"Every banked id below resolves there [the CARRY] **with ONE declared exception**, and it is declared rather than glossed"*, the exception being the enumerated round-1/round-2 intake — is **FALSE for SPF-10**: it resolves at neither surface and is named in none of the five declared exception families (R-1d's six, R-6's limb, R-19a's ten, R-19e's `KF-EST-4`, R2-8's `D·D-7`), all of which I verified at 0 CARRY hits *and* found correctly declared. (ii) M-25 forbids transcription-only carriage and requires routing **by mechanism**; a bare id in a §Bounds carve list carries no severity, no cure shape, no fold identity and no bank pointer — the `shape="cell"` erosion mechanism the record calls *"the real glass-ui-conformance defect at this site"* is carried **nowhere**, in a wave whose G-W6-9 is the glass-first suffusion ledger.

### §2.3 · D-P3-4 · `kf-CubeTarget` **`#8` / `#9`** — the manifest's own set, two members left dispositionless under a "carried whole" claim (MINOR)

> `kf-CubeTarget.md:100` — *"**KF.W6**: r1 set (**#8 · #9 · #21 · #30 · #39**) **+ #58** (axis-token contrast) **+ #60** (duration-token rider)."*

Seven ids routed. The spec books five as rows (`#58`, `#60` from the original draft; `#21`, `#30`, `#39` added at repair round 1) and names `#8`/`#9` only **adjectivally, inside another row's cure text** — W6-H's `CubeTarget #58 ≡ KF-AX-3` row: *"theme-aware axis tokens with the **#8/#9 packet**"* — plus the round-2 self-description *"The spec carried `#58`/`#60` and **named** `#8`/`#9`"*. Neither receives a severity, a cure shape, a fold identity or an §Excluded line.

§Sequencing's packet homing then states: *"**CubeTarget #21/#30/#39/#58/#60 — the `:100` manifest's KF.W6 remainder, carried whole**"*. Five of the manifest's seven, described as whole. The round-2 repair cured exactly this defect for `#21/#30/#39` off exactly this manifest line and left their two siblings standing.

### §2.4 · ID-KEYED TRAIL — the three pass-2 gaps VERIFIED CLOSED

Re-executed at the registry bytes, all three round-2 closures are real and correctly anchored:

| id | spec closure | anchor re-read by this seat | verdict |
|---|---|---|---|
| `KF-CE-32` | §Excluded row names *"= banked id `KF-CE-32`"* | `kf-CSSCodeEditor.md:68` = *"KF-CE-32 · L-i4 = C-16 — FOLD, not booked here: census F-1 …"* | ✔ |
| `LP-2` / `LP-3` | §Excluded names both co-ids | `kf-LayerConfigPanel.md:95` = *"LP-2 ≡ KF-CO-1 · LP-3 ≡ KF-CO-8 …"* | ✔ |
| `M7` | §Excluded names it by id with the bidirectional G-W6-8 cross-ref | `kf-KeyframeTimeline.md:65` = *"→ KF.W7 (register misuse; cross-ref KF.W6's type-register discipline)"* | ✔ |

`D·D-7` (pass 2's escape) is likewise **CURED**: booked at W6-H with the banked body quoted, at §Bounds L78, at §Carry L96 under the KF-AV-28 rider, and at §Sequencing's sequence-packet arm; addendum (vii) declared. `kf-SequenceScrubber.md:52` and `:133` both re-read and exact.

---

## §3 · AUTHORITY REALITY — every cross-spec / cross-record receipt re-resolved at its anchor

**All anchors below were re-read at their cited line by this seat. No anchor failed.**

| receipt in `KF-W6.md` | anchor | re-read result | verdict |
|---|---|---|---|
| KF-AV-28 standing rider "banked at" ×3 | `kf-AnimationVisualizer.md:35` · `kf-PlaybackRibbon.md:36` · `kf-SequenceScrubber.md:36` | all three lines carry the id and the supersession clause verbatim (`:35` *"KF-AV-28) may supersede any behavioral cure here"*; `:36` *"KF-AV-28 rider"*; `:36` *"KF-AV-28's standing rider applies"*) | ✔ **all three** |
| R2-14 limb re-key | `kf-KfPillTabs.md:43` / `:70` / `:71` | `:43` = `C:C-1 / L:D-3 / D:D-10` (MAJOR fork-rationale-void) · `:70` = `L:D-8 / C:C-6` · `:71` = header mangle, its own row | ✔ EXACT, all three |
| R2-13 banked routing | `kf-CubeAxisLines.md:57` | *"KF.W6 (recut the z-contract block in one motion with KF-AX-11/12's prose); KF.W0 rider (gate-inventory truth)"* | ✔ verbatim |
| R2-13 three frontier sites | `git grep -n 'proof:brittleness' origin/master -- demo/ scripts/` | **exactly three**: `demo/styles/style.css:38` · `demo/styles/layout.css:152` · `scripts/lib/demo-driver.mjs:69` | ✔ EXACT, site for site |
| R-6 manifest (id-for-id intake) | `KF-W4.md`, the manifest table | **14 rows**, id-keyed; rows 7–8 carry the R2-14 label correction at the W4 end as this spec asserts | ✔ |
| W4 = sequencing head; its `check` re-cut | `KF-W4.md:195` (G-KFW4-1) | re-cut = `vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure`; live `origin/master:package.json:37` = `tsc --noEmit && tsc --noEmit -p tsconfig.test.json && npm run proof:structure` | ✔ **COMPOSES** — the substitution replaces only the type-check leg; `proof:structure` survives and resolves (`scripts/gates/structure/index.mjs` present at origin/master). `vue-tsc` is absent from `origin/master:package.json` (verified) and W4 states that absence as the gate's born-RED condition, so the re-cut is a declared cure, not a phantom |
| W10 receives this wave's carry-routed obligations | `KF-W10.md:89-91`, `:435-437` | **CARRY-C-3 / C-4 / C-5** booked at repair round 2 against `KF-W6-CARRY.md:361` (re-read: the five-item → KF.W10 edge, verbatim), plus `KF-AT-21` and `KF-HA-4` at `:100` | ✔ **closed by carriage, not omission** |
| W3 posture | `KF-W3.md:193` | *"This wave is **gate-keyed and NEVER scheduled**. It opens on `RC-P(V)` evaluated by command."* — and `KF-W6.md` schedules nothing of W3's; the `KF.W3-SHIM` lane-name collision is declared in the taxonomy block | ✔ gated-unscheduled, honoured |
| O-21 (not O-20) at W1's mint sites | `KF-W1.md` §1 cond. 7 · §3 item 6 · §4 Bounds · C-10(ii) · G-KF1-7 | **all five read `O-21` as the mint**; the residual `O-20` occurrences are the *measured ledger maximum* citations the MINT LAW requires (`O-21` = `max+1`, `O-20` at `INBOX.md:95`) — correct usage, not a stale mint | ✔ |

---

## §4 · GATES — L-19, born-RED, RE-EXECUTED AT THE FRONTIER BY THIS SEAT

14 gates, all stamped RED, none run. Every re-executable witness was re-run at `origin/master 81a56990`.

### §4.1 · Re-executions that REPRODUCE EXACTLY

| gate | command re-run at `origin/master 81a56990` | measured | verdict |
|---|---|---|---|
| **G-W6-1** | `git grep -- '--dock-margin:' -- demo/` | **0 definitions** | ✔ |
| | `git grep -n 'var(--dock-margin' -- demo/` | **10** — live `layout.css:80,92,117,135,161,166,204` + `TransportDock.vue:389,395`; prose `TransportDock.vue:379` | ✔ **9 live + 1 prose, site for site** |
| | `--shadow-glass` | 1 consumer `App.skeleton.vue:64`, 0 defs | ✔ |
| | `--dock-label-padding-inline` | 1 consumer `ChromeDock.vue:381`, 0 defs | ✔ |
| **G-W6-2** | `git grep -l KfPillTabs -- demo/ test/` | **11 files** | ✔ |
| | `git show origin/master:demo/app/App.vue \| sed -n 176p` | `provide(TABS_EXTERNALLY_MANAGED_KEY, true);` | ✔ |
| **G-W6-4** | `git grep -n 'btn-interactive' -- demo/` | **8 sites / 6 files** — `RibbonBar.vue:135` · `PlaybackRibbon.vue:55` · `CubeScene.vue:188,193` · `SequenceTarget.vue:31` · `SpringPhysicsFacet.vue:74,105` · `SpringScene.vue:167` | ✔ EXACT; and `:105` **is** the bare `<button>` SPF-6/SPF-8 name |
| | `git grep -n 'tap-floor' -- demo/` | **2 hits, both `design-idioms.css:81-82`** — its own comment + its own selector; zero adopters | ✔ EXACT |
| **G-W6-5** | `design-idioms.css:9-11` | the override-policy prose verbatim (*"OUTSIDE @layer so the demo's copy overrides glass-ui's incidental same-named tokens"*) | ✔ MISSED-H's lock is real |
| | `design-idioms.css:15-21` + producer | seven `--rainbow-*` hsl declarations; producer ships `--rainbow-*` at `dist/styles/tokens/scale-paper.css` | ✔ two-producer collision REAL |
| **G-W6-8** | `git grep -n 'max-h-24' -- demo/` | **exactly one site**, `TimelineHoverPreview.vue:20`, class string `font-mono text-admin-label text-muted-foreground max-h-24 overflow-y-auto w-full` | ✔ **character for character** as quoted |
| | `git grep -n 'tracking-normal' -- demo/` | **0** | ✔ |
| | `git grep -n 'normal-case' -- demo/` | **5** — `MbabbMenu.vue:5,:64` · `SharePopover.vue:19` · `ChannelOptions.vue:254,:265` | ✔ EXACT |
| **G-W6-9** (round-2 rewrite) | per-surface mount census | `Textarea` **0** · `NumberField` **0** · **`FadingScroll` 2 mounts** `EasingTarget.vue:42` `axis="x"` / `:76` `axis="y"`, subpath import `:137` · **`Card` 24 `<Card` mounts** · **`ToggleGroup` MOUNTED** `EasingTarget.vue:50/:56/:63/:64`, import `:139` | ✔ **the struck quantifier's replacement is TRUE on every re-measured limb** |
| **G-W6-10** (round-2 rewrite) | `git grep -c 'SpringSidebar' -- demo/` | **12 sites / 8 files** — `KeyframesEditor.vue` 2 · `KfPillTabs.vue` 1 · `SpringHeatmap.vue` 1 · `SpringPhysicsFacet.vue` 1 · `SpringScene.vue` 2 · `StartingStyleTarget.vue` 3 · `useSpringHotPath.ts` 1 · `useSpringLinearStops.ts` 1; `git ls-tree -r --name-only origin/master \| grep -i springsidebar` → **empty** | ✔ **EXACT, file for file** — the KF-SS-31 re-pin and the gate are one figure, as the PROPAGATION LOCK requires |
| | *"THE ONE WRITER"* | **5 sites / 3 files** — `useSceneMachineRouterBinding.ts:10,:86` · `ChannelControls.vue:339` · `useSelectedControlSurface.ts:42,:88` | ✔ EXACT |
| | `KfPillTabs.vue:2-5` / `:4-5` / `:41-44` / `:45-46` | header opens an unterminated code span at `` `<SegmentedTabs `` with `:aria-orientation=` dangling across the break ✔ · names `SpringSidebar` + `AnimationControls` — **both phantom** (`git ls-tree` shows no `SpringSidebar*`; only `AnimationControlsGroup.vue`) ✔ · `:41-44` promises the `.vue` type re-export keeps resolving ✔ · `:45-46` *"remains until the published Glass component can provide pill material with tablist semantics and roving focus"* ✔ | ✔ every cell |
| | `transitions.css:23-37` unresolvable cite | `KeyframeTimeline.vue:90` cites it, PRM-block cite at `:94` — both exact; **no `transitions.css` in `demo/`, and none in the installed glass-ui 7.0.0 dist; `fade-slide` = 0 hits repo-wide in the dist** | ✔ a correct NEGATIVE, and it independently confirms the `KeyframeTimeline D-1/L-1/C-3` row's *"a class set 7.0.0 does not ship"* |
| | `contractAnim` | **4** hits, all comments, zero declarations | ✔ |
| **G-W6-14** | `ls docs/tranches/X/keyframes/` (value.js) | `carry` · `conformance` · `waves` — **no `relay/`, no `KF-W6-BH-COMMUNIQUE.md`** | ✔ still RED at the tree the artifact lives in |
| | `git ls-tree --name-only origin/master docs/tranches/` (keyframes.js) | `A`…`V`, **no `X`** | ✔ the wrong-tree probe stays retired |
| **W6-AUTH-1** | installed dist | version **7.0.0** · **73** export subpaths · sole wildcard **`./fonts/*`** · `./tabs` → `SegmentedTabs` + **exactly 7 types** · root-barrel `useTabRovingFocus` = **0** · private chunk `dist/useTabRovingFocus-Dh4yBGxq.js` | ✔ **all five sub-claims TRUE, verified a third time** |
| **§Bounds** | `git cat-file -e` × 71 paths; `wc -l` × the 30 line-counted rows | **71/71 exist; 30/30 counts EXACT** (124·93·4·14·27·19·129·80·456·79·300·210·294·126·125·191·128·101·113·80·161·312·246·70·38·256·609·92·336·129) | ✔ no phantom path, no drifted count |

### §4.2 · D-P3-1 · **G-W6-3 / W6-B / §Bounds name the WRONG consumer for the F-5 shim, and the real one is OUT OF BOUNDS** — BLOCKER

The spec authorizes a **delete** on `demo/components/instrument/transport/composables/useAnimationGroupPlayback.ts` (§Bounds L29) on the strength of ACG L-5's consumer census, and names the consumer in four load-bearing cells:

- §Bounds L29 — *"**delete** | F-5; **its ONE consumer is a test (ACG L-5)**"*
- §Bounds L83 — *"`test/demo/instrument/useAnimationGroupPlayback.test.ts` | modify | **repoint** + move to the component seam (ACG L-1)"*
- §Carry W6-B, ACG L-5 — *"F-5's 'zero consumers' evidence corrected: **the one consumer is `test/demo/instrument/useAnimationGroupPlayback.test.ts`**. The repoint is this wave's"*
- §Gates G-W6-3 bound — *"fails if the ACG test is **repointed** but not MOVED to the component seam"*

**Measured at `origin/master 81a56990`:**

```
git show origin/master:demo/components/instrument/transport/composables/useAnimationGroupPlayback.ts
  export { useAnimationGroupPlayback } from "../AnimationControlsGroup/useAnimationGroupPlayback";      ← the shim, 1 line

git show origin/master:test/demo/instrument/useAnimationGroupPlayback.test.ts | sed -n 5p
  import { useAnimationGroupPlayback } from "../../../demo/components/instrument/transport/AnimationControlsGroup/useAnimationGroupPlayback";
                                                                                            ↑ THE REAL MODULE — not the shim

git grep -n 'useAnimationGroupPlayback' origin/master -- demo/ test/ src/
  …/composables/useAnimationGroupPlayback.ts:1        (the shim itself)
  test/demo/state/no-shadow-playback-authority.test.ts:21:
      import { useAnimationGroupPlayback } from "../../../demo/components/instrument/transport/composables/useAnimationGroupPlayback";
                                                                                                 ↑ THE SOLE SHIM CONSUMER
```

**The named test is not a consumer of the shim at all** — it already imports the real module, so there is nothing to repoint and G-W6-3's bound is unfalsifiable against it. **The shim's one real consumer is `test/demo/state/no-shadow-playback-authority.test.ts:21`, which appears NOWHERE in `KF-W6.md`** (`grep -rn 'no-shadow-playback' waves/ carry/` → 0 hits across the whole X·KF wave tree and the CARRY). It is not a §Bounds row, not a §Carry row, not a gate witness, not an §Excluded line.

**Consequence at execution**: §Bounds L27-29 authorizes the delete; the delete removes the module `no-shadow-playback-authority.test.ts:21` resolves; the suite breaks; and the broken file is outside the wave's declared bounds, so no seat reading this spec is told to touch it. A wave whose §Bounds tail enumerates what it must not touch cannot discover this from its own text.

**Where the error entered — and why it is this spec's, not the bank's.** The bank does **not** name a filename. `kf-AnimationControlsGroup.md:74` says, precisely: *"Verified by this seat: **the test's `:21` import string traverses `composables/useAnimationGroupPlayback`**"* — and `:21` is exactly `no-shadow-playback-authority.test.ts:21`. The **CARRY** (`KF-W6-CARRY.md:55`) substitutes a filename the bank never gave — *"the one consumer is `test/demo/instrument/useAnimationGroupPlayback.test.ts`"* — whose corresponding import lives at `:5`, not `:21`, and points elsewhere. `KF-W6.md` then propagated the CARRY's substitution into a **delete authorization**, a **modify/migrate §Bounds row**, and a **born-RED gate bound**.

**R2-5 did not reach it.** The round-2 repair re-executed the delete family's *line counts* (`4 / 14 / 27 / 19`, all of which I reproduce exactly) but never the *import graph* the delete depends on. A line count proves a file exists; it does not prove who imports it. This is the sharpest instance in the corpus of the failure L-19 exists to prevent: a gate that is RED for a reason its own witness cannot establish.

### §4.3 · D-P3-6 · §Bounds contradicts itself on `scripts/observe/demo/usability.mjs` (MINOR)

§Bounds L86 heads its final list **"Read-only witnesses (never modified)"** and then annotates that very entry *"(written by the KF.W4∥KF.W6 atomic bundle, **never by this wave alone**)"* — i.e. written by a bundle that includes this wave. §Sequencing's W4 cross-edge item (6) adds a third posture: *"never written **concurrently** by the two waves"*. The path exists at the frontier (`git cat-file -e origin/master:scripts/observe/demo/usability.mjs` → present, 410 L). Three readings, one entry; a seat cannot determine from the spec whether the file is writable in this wave.

### §4.4 · D-P3-5 · the census figure is not reproducible from the spec's own stated method (MINOR)

L12 states the figure and the method together, and explicitly forecloses the cheap route: *"**Routed census units: 392 · booked 392 · escaped 0** … the unit is the (record, banked-id) pair, re-derived by block-parsing all 58 records' terminal routing manifests. **A bolded-token closure grep is NOT sufficient**"*.

Re-derived at the registry bytes by this seat under exactly that definition: **473** strict `(record, banked-id)` pairs — because co-id clusters such as `CC-§0 / C-1 / D-3 / L-5`, `C:C-1 / L:D-3 / D:D-10`, `D:D-7 / L:D-7 / C:C-9 / C:C-10` are, by the stated definition, four / three / four pairs. Collapsing every cluster to one banked row instead gives **421**. **392 is neither bound.** The wave's headline result — *"escaped 0"* — therefore rests on a denominator no seat can reproduce from the method the same sentence declares, which is the same species of defect as a gate figure carried without its command.

---

## §5 · M-25 DEPTH — locks, riders, dissents (spot-audited, no loss found)

Carried and intact, verified against the CARRY and the banks: KPT-SUP-4's PRESERVATION SPEC (verbatim cure-shape lock) · LOCK (a)/(b) on CC-§0 (the T.G9 warm re-home before deletion) · CC-D-10's KILL LOCK on the PRM-blanket cell · MISSED-H's no-blanket-rename lock (re-read at `design-idioms.css:9-11`) · KF-SKEL-22's re-derive-at-use law · KF-SKEL-4's intended-vs-shipped radius PIN · KF-SST-30's touch-hit-area correction as an E-3 **annotation** rider · KSM R-1's LIFO/FIFO asymmetry as a relay API constraint · KF-ES-28's structurally-unspellable cure-shape lock on KF-ET-10 · MM-29's `normal-case`+`tracking-normal` transferable law · K-9's `.focus-ring`-first inversion · the S-2 real-`<button>` reshell constraint · KF-AV-28's standing supersession rider on the three governed surfaces + KF-AV-27. Dissents preserved: RR-2 on KPT D-2 (with its revival condition), both RRs on KPT D-3, reader-LC's BLOCKER on KF-HA-1, reader-DU on KF-AT-25/-17, reader-A on KAD-F4. Killed-claims ledger intact, including the four "do not re-derive / do not re-open" locks (KF-APP-6, KF-APP-48's 7-of-12, SequencePlayhead R.F8, KF-APP-26's ∅). **No lock, rider or dissent was found dropped, softened or silently re-graded.**

**Note (not a defect).** W6-A's arbiter LOCK — *"`KfPillTabs.vue:45-46`'s own contingency is MET by 7.0.0"* — survives the W6-AUTH-1 tension: `:45-46` conditions on *"pill material with tablist semantics **and roving focus**"*, and `dist/tabs.js` **imports the private `useTabRovingFocus-Dh4yBGxq.js` chunk internally**, so the mounted component supplies the roving-focus half even though the composable is unimportable. W6-AUTH-1's arm (a) already says exactly this. The lock holds.

---

## §6 · POSTURE — the five checks

| check | result |
|---|---|
| W4 head honoured; its `npm run check` re-cut composes with the live scripts | ✔ — §Sequencing declares the vue-tsc gate as the head for every typed cure; the re-cut swaps only the type-check leg and preserves `&& npm run proof:structure`, which resolves at the frontier |
| W3 gated-unscheduled | ✔ — `KF-W3.md:193` L-1 is gate-keyed and never scheduled; W6 schedules nothing of it |
| KF-AV-28 present where governed | ✔ — the standing clause at §Carry L94-96 names `AnimationVisualizer` (KF-AV-11), `PlaybackRibbon` (the `--color-progress` half), `SequenceScrubber` (KF-SCR-2 **and** `D·D-7`) and KF-AV-27; all three bank anchors re-read and exact; the §Bounds rows carry the guard; §Sequencing binding (6) names it by id |
| O-21 (not O-20) at W1's mint sites | ✔ — all five load-bearing sites read O-21; residual O-20 occurrences are the MINT LAW's measured-maximum citations |
| W10's carry-routed obligations closed by carriage | ✔ — CARRY-C-3/C-4/C-5 booked at `KF-W10.md:89-91` and `:435-437` against `KF-W6-CARRY.md:361`, with per-claimant terminal verbs; KF-AT-21 and KF-HA-4 booked at `:100` |
| §Bounds writable-surface coherence | ✖ — D-P3-6 |

---

## §7 · VERDICT

**DEFECTIVE.** 1 BLOCKER · 2 MAJOR · 3 MINOR.

The two repair rounds did real work and this seat confirms it: **every** re-executable gate witness reproduces at `origin/master 81a56990`, site for site and character for character — including both round-2 rewrites (G-W6-9's per-surface mount census and G-W6-10's 12-site/8-file `SpringSidebar` re-pin), W6-AUTH-1's five sub-claims at the installed dist, all 71 §Bounds paths and all 30 line counts, R2-13's three `proof:brittleness` sites, and all three KF-AV-28 bank anchors. Pass 2's escape (`D·D-7`) is cured; pass 2's three trail gaps are cured; every declared E-3 exception is true at the CARRY bytes.

What survives is of a different kind, and it is what a third pass is for:

1. **The one witness the repairs never re-executed is the one that authorizes a delete.** Line counts were re-run; the import graph was not. The F-5 shim's named consumer is not a consumer, and its real consumer is unbooked and out of bounds — a guaranteed execution break invisible from the spec's own text (D-P3-1, **BLOCKER**).
2. **The escape class is still open by one record per pass.** `L-EST-12` (D-P3-3) is pass 3's `D·D-7`, and `SPF-10` (D-P3-2) shows the failure's other face: an id that *is* named, in a §Bounds carve cell, with no disposition anywhere and no bank row — so the header's "one declared exception" law is false and the mechanism is lost. Enumeration has now failed to close this class three times; the cure is structural (a per-record routed-id → booking table generated from the manifests), not another sweep.
3. **The wave's own headline number cannot be rebuilt from its own stated method** (D-P3-5), which is what makes "escaped 0" unverifiable rather than merely wrong.

*Authored by the fresh pass-3 adversarial seat. Sole write = this file. No product source opened; no gate run; all probes read-only (`git grep` / `git show` / `git ls-tree` / `git cat-file` at `origin/master 81a56990`, plus reads of the installed glass-ui 7.0.0 dist and the value.js registry/CARRY/wave bytes). Nothing was inherited from PASS-1 or PASS-2; both were read only to verify that what they ordered was done.*
