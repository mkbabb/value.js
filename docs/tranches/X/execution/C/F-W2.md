SERVED MODEL: claude-opus-5[1m]

# F.W2 — execution record (Track C · X·F · fourier-analysis)

**Wave**: `docs/tranches/X/fourier/waves/F-W2.md` — *value.js consumption to spec: root retirement, colour routing, facility 19*
**Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`. **Sitting date 2026-09-17** (the begin-word's sitting, the convention this ledger's Track-C rows carry); **wall clock at this seat 2026-09-18** — disclosed rather than elided, per E-3.
**Authority**: the owner's begin-word 2026-09-17 (COHESION §0j), which opened execution and authorized publish/push/pull/deploy.

---

## Open

### Preconditions — verified at the bytes AND in the ledger

§1 *Opens after*: **F.W0 closed** (substrate pre-gates — hard, §6) · **F.W1 landed** for the specifier arm only (the colours arm is not so gated, fr-App C-2) · **the adjudicated registry whole**.

| conjunct | ledger reading | byte receipt | verdict |
|---|---|---|---|
| **F.W0 closed** | `LEDGER.md` row `F.W0` → **CLOSED 2026-09-17 (honest-RED: G-4 · G-5 · G-8 · G-15(d))** | ⟨cmd⟩ `ls -la /Users/mkbabb/Programming/fourier-analysis/docs/tranches/F/SUBSTRATE-LEDGER.md` → **201,985 B, 2026-09-17 15:03** — F.W0's G-11 anchor table / G-12 denominator table / G-13 pin table, the single owned authority §2b and §6b quote. F.W0's commits present in fourier: `3079a92` · `1193003` · `c429d7b` · `cddd1fa` · `8bc7736` · `9930e80` · `b3b736c` · `edee6bf` · `87ecc85` · `5842377` | **MET** |
| **F.W1 landed (specifier arm)** | `LEDGER.md` row `F.W1` → **CLOSED 2026-09-18 (honest-RED: G9 · G20(b))** | ⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis log --oneline -3` → `538db90 feat(fourier)!: the atomic tri-package uplift` · `3bac3d5 fix(fourier/viz): the --viz-* palette cure at the current pin`. Installed pins re-measured: ⟨cmd⟩ `node -p "JSON.stringify(require('…/web/package.json').dependencies)"` → `@mkbabb/glass-ui ^8.0.0` · `@mkbabb/keyframes.js ^6.0.0` · `@mkbabb/value.js ^4.0.0`; installed value.js **4.0.0**, exports `./color ./value ./css ./easing ./math ./transform ./quantize`. F-W1's own close record states it: *"the F.W1 conjunct is GREEN — the specifier arm IS the atomic transaction and it landed at `538db90`"* (`execution/C/F-W1.md`, **Successor waves** table, `F.W2` row) | **MET** |
| **adjudicated registry whole** | — | ⟨cmd⟩ `ls docs/tranches/V/megatranche/registry/adjudicated/ \| wc -l` → **232** entries (66 `fr-*.md` + `library-band.md` + the band's siblings), immutable under E-1/E-3 | **MET** |

**G10's sequencing condition is therefore satisfied**: the value.js-direct specifier arm is no longer un-landable — the pin moved inside F.W1's one atomic transaction, exactly as §6a and the runbook §1.3 edge *"F.W1 → F.W2, partially"* require.

**Worktree substrate.** fourier `538db90` on branch `m/w1-bump-migration`, **0 dirty entries** (⟨cmd⟩ `git status --porcelain \| wc -l` → `0`, double-run) — the spec's authoring-time *"28 dirty worktree entries"* is SUPERSEDED by F.W0's G-1 LAND (`1193003`) and is retained here only as the history of a superseded reading. value.js `tranche-u`; the dirty paths in the value.js tree (`demo/**` ×10 · `docs/tranches/V/reformation/CARRY-LEDGER.md` · `scripts/dev/dev.sh` · the untracked X evidence dirs and two e2e specs) are **outside this wave's writable set** and belong to sibling seats — untouched, never staged, and `scripts/dev/dev.sh` never touched at all.

### CRASH-RECOVERY sweep (standing law)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain` → **∅**. ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → 12 modified + 4 untracked, **none inside F.W2's §2a writable set**: no `docs/tranches/X/fourier/RULINGS-F.W2.md`, no `facility-19.md`, no `docs/tranches/X/coordination/value-to-*`, no `app-wave/fourier-viz-*.png`, and `docs/tranches/V/coordination/INBOX.md` is clean. **No killed predecessor seat's partial work exists on this unit.** Nothing inherited; nothing stashed; nothing restored.

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's own clock, compared against **every row** of `docs/tranches/V/coordination/INBOX.md`, classification taken from each row's own **Status cell** and never from the filename.

| # | path | entries | newest | rowed? |
|---|---|---|---|---|
| 1 | `docs/tranches/V/` + `docs/tranches/V/coordination/` | 19 + 19 (`INBOX.md` self-excluded, SELF-COUNT law) | `valuejs-outbound-2026-09-18-kfw7-bh-relay.md` (09-18 01:41) | **YES — O-28** (ours, outbound) |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` | 9 | `glass-outbound-2026-09-18-valuejs-o26-reply.md` (09-18 14:41) | **YES — I-35**, rowed 2026-09-18 at X-W1 RESUME; its Routing cell reads *"X·KF (Track B), NOT X-W1"* |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` (the SACRED checkout — read-only) | 12 | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` | **YES — our own O-21** |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | 28 | `valuejs-inbound-2026-07-27-library-band-export-delta.md` | **YES** (ours, outbound) |
| +C | the Track-C fourier mail-ledger surface (COHESION §0k.1) `../fourier-analysis/docs/tranches/F/coordination/` | 4 (`INBOX.md` + 3 letters) | `INBOX.md` 2026-09-17 13:13; no letter newer than 2026-05-29 | **YES — `M-1`…`M-4` all rowed**; M-1 → F.α, M-2 → F.W3, M-3 ANSWERED-DISCHARGED, M-4 LOGGED at `cddd1fa`. None is F.W2's |

**BK re-confirmed the newest glass-ui tranche dir** — ⟨cmd⟩ `ls -dt ../glass-ui/docs/tranches/*/ \| head -3` → `BK/` · `BJ/` · `BI/`.

**Result: 0 unrowed · 0 new `I-n` minted · I-35 remains the inbound tail · 0 UNREAD addressed to F.W2's scope.** The five rows whose status cells literally read `UNREAD` are **I-31/I-32/I-34 → X-W0 (Track A)**, **I-33 → the X formation mail seat** (whose Routing cell has that seat relay each sibling's section onward, *"fourier → X·F's mail-ledger surface"* — an obligation on the formation seat, not on this wave's units), and **I-35 → X·KF (Track B)**. `INBOX.md` is **not** edited by this seat; the wave's own E13 rows (the FN-1..FN-7 reply and the facility-19 relay) are unit `.d`'s append-only acts, per §2a.

---

## Baseline — the §5 gates, read-only, at wave open

All 20 gates are declared **born RED** by §5. Every figure below was measured at this seat's clock and **double-run**; the two runs agree byte-for-byte. Commands are literal and absolutely pathed; the fourier tree was read only (grep · `ls` · `sed` · node module read) — **no witness wrote the fourier tree.**

### R.2 — the born-RED declaration versus the measured tree

**F.W1's landing moved five of this wave's gates before F.W2 opened.** That is a finding, minuted here rather than absorbed: the spec's born-RED table was authored 2026-08-28 against the pre-uplift tree, and ESC-4 (COHESION §0o, 2026-09-18 — *"DRIFT REFUSED — no acceptance, silent or explicit"*) released to F.W1 *"the six bare-root import lines"* and *"limb 1's lockstep half"*. F.W2 inherits the landing; it does not claim the GREEN (FR-GIG-5, and §1b's own bar).

| gate | §5 born-RED | measured now | reading |
|---|---|---|---|
| **G1** every specifier resolves at the target | RED — 5 of 5 sites `ERR_PACKAGE_PATH_NOT_EXPORTED` | ⟨cmd⟩ `/usr/bin/grep -rn 'from "@mkbabb/value\.js"' /Users/mkbabb/Programming/fourier-analysis/web/src/ \| /usr/bin/wc -l` → **0**. Every value.js import in the tree is subpath-keyed: `ConvergencePlot.vue:5` · `useCurveTransition.ts:8` · `harmonics.ts:5` → `@mkbabb/value.js/easing`; `easings.ts:35` → `@mkbabb/value.js/easing`; `colors.ts:20` → `@mkbabb/value.js/color`; `colors.ts:21` → `@mkbabb/value.js/css` | **GREEN BEFORE ITS CURE** — landed at `538db90`/`3bac3d5` under ESC-4 |
| **G2** the `timingFunctions` mapping is re-derived, not transcribed | RED — leg 2 RED; both symbols 0 hits | value.js side unchanged: ⟨cmd⟩ `/usr/bin/grep -rn 'easingNames\|timingFunctions' src/ dist/ \| /usr/bin/wc -l` → **0** (the RED *input* still holds — there is nothing to transcribe). fourier side: `web/src/lib/easings.ts` now carries the re-derivation in its own docblock — *"The eight keys the producer still publishes analytically are imported from `@mkbabb/value.js/easing`; the other fourteen are DEFINED HERE, each reproducing the pre-bump 0.13.0 function EXACTLY"* — with a `cssCubicBezier` solver and eight named imports (`linear, easeInOutQuad, easeOutCubic, easeInOutCubic, easeInOutSine, easeOutExpo, easeInOutExpo, easeInOutCirc`) | **CURE LANDED, RECORD OWED** — the mapping exists; §2a still owes its recording in `RULINGS-F.W2.md` (unit `.c`) |
| **G3** the oklch/light-dark tokens resolve | RED — 5/6 → `#888888` | ⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/fourier-vizcolor-oklch.mjs` → **5/6 RED**, but the probe names `glass-ui@4.0.0 :263/:264/:265/:245/:145` while fourier now installs **8.0.0**, and it simulates the `cssVarToHex` regex path that **no longer exists** in `colors.ts`. **The reading is STALE, not a measurement** | **UNMEASURED — a D-19 finding** (see below). Green owner is F.W1's; F.W2 owns the deletion of the arms that caused it |
| **G4** the SNAPSHOT is fixed, not the parser swapped | RED — `color: VIZ_COLORS.fourier` copied into a plain object literal at module evaluation | ⟨cmd⟩ `/usr/bin/sed -n '1,40p' …/visualization/lib/basis-display.ts` → `export const basisDisplay: Record<string, BasisDisplay> = reactive({ fourier: { …, color: computed(() => VIZ_COLORS.fourier) }, … })`, with a docblock stating the cure in its own words (*"The colour is DERIVED from `VIZ_COLORS`, never copied out of it"*). No value copy survives | **GREEN BEFORE ITS CURE** — F.W1's banked D-2/BC-5/C-3 fix; F.W2 keeps only the LOCK and the green-criterion |
| **G5** the `hexToRgba` deletion lands with its join | RED — **5 call sites / 3 files** | ⟨cmd⟩ `/usr/bin/grep -rn 'hexToRgba(' /Users/mkbabb/Programming/fourier-analysis/web/src/ \| /usr/bin/grep -v 'export function'` → **5 lines**, the same five coordinates: `BasisCanvas.vue:261` · `epicycles.ts:258` · `epicycles.ts:283` · `golden-shimmer.ts:55` · `golden-shimmer.ts:58` | **RED — reproduces exactly.** The enumeration IS the figure |
| **G6** the declared hex residual has a validation arm and a deletion date | RED — zero validation exists; `colors.ts` is exactly 117 lines | ⟨cmd⟩ `/usr/bin/wc -l < …/web/src/lib/colors.ts` → **182** (the 117 is superseded by `3bac3d5`). A validation arm now EXISTS: `hexChannels()` opens `if (!HEX_COLOR.test(hex)) { throw new TypeError(…) }`, and both survivors route through it. **The deletion date is still unwritten** | **HALF-GREEN BEFORE ITS CURE** — validation landed, the RD-6/RD-7 deletion date (fourier's 4.1 adoption) is still owed |
| **G7** the charter names every hand-rolled colour authority | RED — six authorities against a charter that names one | ⟨cmd⟩ `ls docs/tranches/X/fourier/RULINGS-F.W2.md` → *No such file or directory* | **RED** — ruling gate, unit `.c` |
| **G8** the cure-seat contest is ruled before ACT(2) is authored | RED — `./dom` one of glass-ui's **80** published subpaths | ⟨cmd⟩ `node -p "…glass-ui/package.json).exports…"` → **8.0.0 · 70 keys · `./dom` present: true** (the 80 was a 4.0.0 figure; re-measured at the ADOPTED pin per D-19/G-13). ⟨cmd⟩ `ls …/glass-ui/dist/composables/dom/useTokenColor.d.ts` → present. **And the seat is already ADOPTED in the tree**: `colors.ts:20` → `import { createTokenColorCache } from "@mkbabb/glass-ui/dom"`. ⟨cmd⟩ `ls docs/tranches/X/fourier/RULINGS-F.W2.md` → absent | **RED — ruling gate**, and a finding: R-ii's *presumptive* seat shipped in the tree before F.W2 ruled it. The ruling is still owed and is not retro-fitted to the landing |
| **G9** the post-uplift parser constraint is measured, not transcribed | RED — 0 hits, both symbols deleted | ⟨cmd⟩ `/usr/bin/grep -rn 'colorUnit2\|color2' src/ dist/ \| /usr/bin/wc -l` → **0**, reproduces. The 4.0.0 `oklch()`/`light-dark()` probe of `parseCssColor` is still unrun | **RED** — the measurement is owed (unit `.d`) |
| **G10** the value.js-direct specifier arm does not attempt to land alone | RED — the pin is held from BELOW | Pins now `glass-ui ^8.0.0` · `keyframes.js ^6.0.0` · `value.js ^4.0.0`; installed value.js **4.0.0** | **DISCHARGED BY F.W1** — the atomic transaction moved the pin; the arm did not land alone |
| **G11** the denominator is colour-value-keyed, not import-keyed | RED — no such census exists | No colour-VALUE census artefact in tree. The three blindness instances re-measured live: ImageUpload's 6 `STATIC.rainbow` hexes · ContourEditorCanvas's **8** inline amber attributes · CanvasControlsDock's two `--viz-amber` reads with zero imports | **RED — reproduces** |
| **G12** the π probe pair exists | RED — no such files exist | ⟨cmd⟩ `ls docs/tranches/V/megatranche/audit/probes/app-wave/` → `BORN-RED-2026-07-27.json` · `app-shell-truth-probe.mjs` — **the four PNGs are absent** | **RED — reproduces** |
| **G13** facility 19 exists under RD-8's one-way law | RED — `facility-19.md` absent; the correspondence grep returns **1 line in 1 file** | ⟨cmd⟩ `ls docs/tranches/X/fourier/facility-19.md` → *No such file or directory*. ⟨cmd⟩ `/usr/bin/grep -rniE 'megatranche\|facility-19\|library-band' /Users/mkbabb/Programming/fourier-analysis/docs/ \| /usr/bin/wc -l` → **7** (was 1; the F.W0-era mail-ledger surface and SUBSTRATE-LEDGER added six). The figure moved; **the RED state did not** | **RED — the artefact is absent.** The 1→7 drift is minuted, not averaged |
| **G14** the substrate compiles and the anchors are re-ground | RED — 28 dirty entries; `git cat-file -t 14d83356` → not a valid object | fourier worktree **0 dirty**; F.W0 closed its own gates and published SUBSTRATE-LEDGER.md | **F.W0's gate; F.W2 states it and never closes it.** Its RED input is discharged at F.W0's end |
| **G15** the easing migration declares its curve drift in the BANKED figures | RED — `14 of 22 drift analytic→CubicBezier, of which 8/22 are MATERIAL (max Δ 0.192)` | **The banked figure is SUPERSEDED BY OWNER RULING.** ESC-4 (COHESION §0o): *"DRIFT REFUSED — no acceptance, silent or explicit … The gate is MPC-5's sampler re-run: every one of the 22 samples EQUAL (Δ = 0 at every sample point) … No CubicBezier approximation is admitted for any key."* `easings.ts`'s docblock records the execution of that ruling | **RED — RE-SHAPED BY RULING.** G15 can no longer close on a declared 14/22 divergence; it closes on the Δ = 0 re-run, recorded as a dated E-3 addendum-beside (unit `.a`). **Cite ESC-4; never re-open it** |
| **G16** `easing()` is called once, never on the render path | RED — `false`; fresh closure per call | ⟨cmd⟩ `node -e "import('./dist/subpaths/easing.js').then(m=>{…})"` → `identical: false`. Neutralized by shape: `easings.ts` builds its catalogue once at module scope | **RED as measured; neutralized by shape** — the RED input (per-invocation `easing(name)`) must not be re-armed |
| **G17** the deletion count is honest | RED — `hexToRgb` has ZERO call sites outside its own declaration | ⟨cmd⟩ `/usr/bin/grep -rn 'hexToRgb(' …/web/src/ \| /usr/bin/grep -v hexToRgba` → **1 line**, `colors.ts:180`, its own declaration. A dead export | **RED — reproduces** |
| **G18** the value.js-side reciprocal is filed, not folded into fourier's ledger | RED — the filing does not exist | No filing in tree | **RED — reproduces** |
| **G19** census closure against `CENSUS-CANONICAL.md` | RED — the difference was non-empty | ⟨cmd⟩ `/usr/bin/grep -n '^### F\.W2' docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md` → `### F.W2 — **23 rows**` *(errata round 5 → read 31; errata round 6 E6-3 → read 27; 4 killed-claims rows → TERMINAL)*. The set-difference against §8a's 23 bookings is **unrun at this open** | **RED** — the closure is owed (unit `.d`); the operand is the canonical and **nothing else** (R4-10) |
| **G20** the banked easing cluster is CITED, never re-minted; its two cure-shape locks dispositioned | RED — `RULINGS-F.W2.md` absent | ⟨cmd⟩ `ls docs/tranches/X/fourier/RULINGS-F.W2.md` → absent | **RED** — ruling gate, unit `.c`. **And R-iii is now partly overtaken**: ESC-4 ruled the easing cure-shape at F.W1's end, exactly as R-iii routed it. `.c` records the routing AND the ruling that answered it |

### Findings banked at open (not gates)

**F-1 · BOTH SPINE PROBES ARE STALE AT THE UPLIFTED TREE (D-19 / MEASURE-AT-OPEN).** §5's Denominator note rests the wave's two "live executable probe" witnesses on `fourier-value-import-drift.mjs` and `fourier-vizcolor-oklch.mjs`. Measured this seat:

- ⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/fourier-value-import-drift.mjs` — **leg 1 prints five bare-root site coordinates that no longer exist in the tree** (`easings.ts:9`, `:16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5` — every one now subpath-keyed), i.e. a frozen claim, not a reading; **leg 3 CRASHES** — `Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/mkbabb/Programming/fourier-analysis/web/node_modules/@mkbabb/value.js/dist/value.js'`, because the installed pin is now 4.0.0 and 4.0.0 publishes no `dist/value.js`. **The gate's drift leg cannot execute at all.**
- ⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/fourier-vizcolor-oklch.mjs` → `5/6 tokens collapse to the #888888 fallback`, attributed to `glass-ui@4.0.0` line anchors and to the `cssVarToHex` regex path **that `3bac3d5` deleted**.

**Consequence, stated and not worked around**: G1/G2/G15's and G3's named witnesses are **evidence of the pre-uplift tree**. The cure is a root-cause one — the probes are re-grounded at the adopted pin as part of the unit that owns the gate (`.a` for the drift probe, `.b` for the vizcolor probe), each re-grounding landing as a **dated E-3 addendum-beside**, never a patch of the dated evidence. **No gate may be read GREEN off a stale probe**, and no probe may be silenced, skipped or allowlisted to make one read GREEN.

**F-2 · G8's PRESUMPTIVE SEAT SHIPPED BEFORE THE RULING.** `createTokenColorCache` from `@mkbabb/glass-ui/dom` is live at `colors.ts:20` under `538db90`/`3bac3d5`, which is R-ii's disposition executed. The ruling record is nevertheless owed in full and is **not** to be written as a ratification of a landing: R-ii's two escalated conditions (SS-6's sanctioned-seat confirmation; SS-13's `getComputedStyle` oklch-vs-rgb serialization) stand exactly as written, and `.d`'s SS-6 relay still carries the ask.

**F-3 · G15's BANKED FIGURE IS SUPERSEDED BY ESC-4, AN OWNER-DELEGATED RULING.** The spec's G15 closes on *"a probe-pinned declared divergence row in the banked figures"* (14/22 · 8/22 material · max Δ 0.192). COHESION §0o's ESC-4 **refuses the drift** and sets the gate at Δ = 0 on all 22 keys. F.W2 **cites ESC-4 by id and never re-opens it**; the amendment lands as a dated addendum-beside to `F-W2.md` §5, per E-3 (addenda, never patches).

**F-4 · TWO §5 FIGURES MOVED WITHOUT CHANGING A GATE'S STATE** — `colors.ts` 117 → **182** lines; the G13 correspondence grep 1 → **7** lines; glass-ui's exports keyset 80 (@4.0.0) → **70** (@8.0.0). Each is re-stated at the measured value in the table above; **no superseded figure is carried forward as current** (G-12).

---

## Unit plan

**§1 Units: 4** — `.c` rulings (serial, first) → `.a` specifier+easing ∥ `.b` colours (parallel; no shared modify path) → `.d` facility 19 + the letter. **Peak concurrency 2**, inside the owner's four-workflow cap. The spec names **no** Fable, fresh-Fable, adjudicator or design-author seat → all four seats are **Opus** (M-12 TRI-FOLD: Opus solo for mechanical/challenge seats; runbook §5.1).

**Ordering law (§6a Author-before-choose)**: *"unit `.c` (R-i/R-ii/**R-iii** + the G2/G15 mapping) **before** `.b` authors ACT(2), and **R-iii before `.a` authors ACT(1)**"*. `.c` is therefore strictly first and alone. `.d` is last (its ledger and its letter consume what `.a`/`.b` land, and its G19 closure reads the settled bookings).

**Disjointness of the parallel pair** — `.a` modifies `easings.ts` · `ConvergencePlot.vue` · `useCurveTransition.ts` · `harmonics.ts`; `.b` modifies `colors.ts` · `golden-shimmer.ts` · `epicycles.ts` · `BasisCanvas.vue` · `ContourPreview.vue` · `ContourEditorCanvas.vue` + the four PNGs. **Intersection ∅.** `harmonics.ts`'s `spectrumColor` fork (`:81`) is **locked, never edited here** — its collapse is F.W3 `.d`'s and its execution half F.W4's (§X.1-v4 · `CENSUS-CANONICAL.md`).

| group | units |
|---|---|
| **1** | `.c` |
| **2** | `.a` ∥ `.b` |
| **3** | `.d` |

### Unit `.c` — the rulings record

- **Model**: opus
- **Sections**: §4 *Rulings — the three contests this wave owns* (`:229-242`) · §2a's `RULINGS-F.W2.md` create row (`:79`) · §5 gates **G7** (`:258`), **G8** (`:259`), **G20** (`:271`), **G2** (`:253`), **G15** (`:266`) · §6a *Author-before-choose* (`:292`) · §3 A2/A6 (`:134`, `:142-154`), C1 (`:192`), C2 (`:194`), B9 (`:176`)
- **Writable**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/RULINGS-F.W2.md`
- **Gates**: G7 · G8 · G20 (+ records the G2/G15 mapping re-derivation)
- **Locks**: strictly first, alone; R-iii must exist before `.a` authors ACT(1) and the whole record before `.b` authors ACT(2). One commit.

### Unit `.a` — specifier + easing

- **Model**: opus
- **Sections**: §3 Arm A A1–A7 (`:130-156`) · §2a fourier-edit rows 1–4 (`:94-97`) · §5 **G1** · **G2** · **G10** · **G15** · **G16** · §6a *Same-commit riders* (`:287`) · §2b items 3 · 7 (`:115`, `:119`) · §6b's F.W1 and X-W9 rows
- **Writable** (fourier, D-15 direct-edit grant): `web/src/lib/easings.ts` · `web/src/components/equation/ConvergencePlot.vue` · `web/src/components/equation/composables/useCurveTransition.ts` · `web/src/components/equation/lib/harmonics.ts`; plus a dated addendum-beside under `docs/tranches/X/fourier/` for the G15 re-shape and the drift-probe re-grounding
- **Gates**: G1 · G2 · G15 · G16 (G10 discharged by F.W1, re-stated not re-closed)
- **Locks**: A2's re-derived mapping + A3's `lerp` re-point travel in ONE commit with the specifier edit; anti-rename (`L/B-1 + C/B-1` is F.W1's identity, cited never re-minted); ESC-4 is RULED — cite, never re-open; `harmonics.ts:81`'s `spectrumColor` is locked, not edited

### Unit `.b` — colours

- **Model**: opus
- **Sections**: §3 Arm B B1–B13 (`:158-188`) · §2a fourier-edit rows 5–10 (`:98-103`) + the four-PNG create row (`:83`) · §5 **G3** · **G4** · **G5** · **G6** · **G11** · **G12** · **G17** · §6a *Same-commit riders* · *One cut, B1⊕B2⊕B3* · *NEVER-clause B11/K-8* · *Anti-rename law, B5* (`:287-291`) · §6b's F.W3/W4 and SS-13 rows
- **Writable** (fourier): `web/src/lib/colors.ts` · `web/src/lib/golden-shimmer.ts` · `web/src/components/visualization/lib/canvas-drawing/epicycles.ts` · `web/src/components/visualization/BasisCanvas.vue` · `web/src/components/visualization/ContourPreview.vue` · `web/src/components/visualization/ContourEditorCanvas.vue`; (value.js): `docs/tranches/V/megatranche/audit/probes/app-wave/fourier-viz-{light,dark}-{before,after}.png` (force-added past `.gitignore:34 *.png`) + a dated addendum-beside for the vizcolor-probe re-grounding
- **Gates**: G5 · G6 · G11 · G12 · G17 (G3/G4 are F.W1's GREEN — `.b` owns only the lock and the green-criterion, and claims neither)
- **Locks**: the `hexToRgba` deletion lands in ONE commit with the B7 join across **five call sites in three files** and the validated residual; the amber cut is ONE cut — **nine** sites / two files with the `--contour-stroke` mint; B2's literal is cured **by name**, never swept as collateral; CSS-expressible colour never routes through the JS resolver being deleted; ONE ramp identity `M-β1`, execution F.W4's

### Unit `.d` — facility 19 + the letter + closure

- **Model**: opus
- **Sections**: §3 Arm F F1 (`:225`) · Arm E E2 (`:221`) · §2a rows 2 · 4 · 5 · 6 (`:78`, `:80-82`) · §5 **G9** · **G13** · **G18** · **G19** · §6b's `X·V / V·π`, `GLASS-RELAY (SS-6)` and `SS-13` rows (`:303`, `:305-306`) · §7 *Excluded* (`:310-351`) · §8a–§8d (`:352-465`)
- **Writable**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/facility-19.md` · `/Users/mkbabb/Programming/value.js/docs/tranches/X/coordination/value-to-fourier-2026-09-18-fn-answers.md` · `/Users/mkbabb/Programming/value.js/docs/tranches/X/coordination/value-to-glassui-2026-09-18-token-color-seat.md` · `/Users/mkbabb/Programming/value.js/docs/tranches/V/coordination/INBOX.md` (**append-only**, no rewrite of any existing row)
- **Gates**: G9 · G13 · G18 · G19
- **Locks**: RD-8's **one-way** law, never the bidirectional schema of `API-FACILITY-ISOMORPHISM.json`; `counts` annotated as-specified **with** an as-built census and its command; FN-5 names SS-4's owner-gated G4 and **pre-empts no ruling**; FN-7 is F.W5's both-ends; the `DD` in the two filenames resolves to the **execution date, never back-dated** (the F.W6 O-27 precedent); G19's operand is `CENSUS-CANONICAL.md` §2's F.W2 roster **verbatim and nothing else** — no detector, no re-cut, no check file; a non-empty difference after two closure passes is a triumvirate halt, never a redispatch

---

## Unit receipts

*(empty at open — each unit appends its own receipt here)*

### `.c` — the rulings record

**Seat**: unit `.c`, `claude-opus-5[1m]`, sitting 2026-09-17 (wall clock 2026-09-18, 15:0x–15:5x EDT). **Writable set (hard bound)**: `docs/tranches/X/fourier/RULINGS-F.W2.md` — one path, one commit. **Strictly first and alone** (§6a *Author-before-choose*): nothing of `.a` or `.b` is authored, and no fourier byte was written — every fourier-side witness below is a read (`grep` · `sed` · `ls` · node module read).

**CRASH-RECOVERY sweep (standing law).** ⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis status --porcelain` → **∅**. ⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` → 12 modified ⊕ 4 untracked, **none inside this unit's writable set**: `RULINGS-F.W2.md` was **ABSENT** (⟨cmd⟩ `/bin/ls /Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/` → `carry` · `conformance` · `contract` · `evidence` · `waves`, no `RULINGS-F.W2.md`). **No killed predecessor seat's partial work exists on this unit; nothing inherited, nothing stashed, nothing restored.** `scripts/dev/dev.sh` untouched.

**E13 (unit-level).** Swept at this seat's clock, delta against the X-W1-resume sweep (14:2x) — ⟨cmd⟩ `/usr/bin/find <each of the four paths ⊕ `../fourier-analysis/docs/tranches/F/coordination`> -maxdepth 1 -type f -name '*.md' -newermt "2026-09-18 14:30"` → `docs/tranches/V/coordination/INBOX.md` (**self**, SELF-COUNT law) and `../glass-ui/docs/tranches/BK/coordination/glass-outbound-2026-09-18-valuejs-o26-reply.md` (**already rowed I-35**; Routing cell *"X·KF (Track B), NOT X-W1"*). **0 unrowed · 0 new `I-n` · 0 UNREAD in `.c`'s scope.** `INBOX.md` not written by this seat.

#### Acts, in order

**ACT 1 — measure before writing (D-19 / MEASURE-AT-OPEN).** Every predicate the three rulings rest on re-measured at today's bytes, each double-run:

- corpus quotations reproduced at the frozen bank — ⟨cmd⟩ (base `…/registry/adjudicated/`) `/usr/bin/sed -n '57p' fr-AdminAuditLog.md` (AA-20) · `'46p' fr-MorphPhaseConfig.md` (MPC-2) · `'58p' fr-EasingCurvePreview.md` (CENSUS-MC) · `'72p' fr-EquationView.md` (M-RTC) · `'52p' fr-EasingPicker.md` (L/B-1 + C/B-1) · `'23p'`+`'50p'` `fr-EquationPanel.md` · `'41p' fr-InfoCard.md` · `'47p' fr-ImageUpload.md` · `'55p' fr-ContourPreview.md` — **all reproduce byte-exactly**.
- the six G7 authorities enumerated live in the fourier tree at `538db90`: `actionTone` `AdminAuditLog.vue:67`/`:135` · `energyColor` `notation.ts:44` with consumers `EquationPanel.vue:6`/`:38` ⊕ `EquationView.vue:7`/`:70` · `spectrumColor` **4 declarations** (`transforms.ts:3` · `harmonics.ts:81` · `FrequencyGraph.vue:42` · `CoefficientsSpectrum.vue:55`) · the NotationPills triad `notation.ts:15-17` → `NotationPills.vue:24` → `:43-45` · ImageUpload's six hexes over seven coordinates `:150-156` ≡ `colors.ts:28-29` · the amber **1 + 8 = 9** at `ContourPreview.vue:45` ⊕ `ContourEditorCanvas.vue:261,:307,:308,:315,:319,:328,:329,:333`.
- the G8 facility at the **ADOPTED** pin: glass-ui **8.0.0**, `./dom` present, `resolveTokenColor`/`createTokenColorCache`/`useTokenColor` in `dist/dom.js`, both `composables/dom/*.d.ts` present; **the seat already ships at `colors.ts:20`** and the three regex arms are gone from the file.
- the G2/G15 mapping at both landed ends: `easing(name): Result<…>` `src/easing.ts:166`, DIRECT-then-PRESETS order, `DIRECT_EASINGS` `:94-114` **19 entries**, `./easing` **16 exports**, `bezierPresets` **30 keys**; the 22 catalogue keys partitioned **by identity** → **8 DIRECT / 14 fall-through**, enumerated; fourier's landed `easings.ts` imports exactly those **8** and defines the **14** (6 bézier-authored ⊕ 8 analytic), `EASING_FNS` exhaustive, the `as EasingFn` cast gone.

**ACT 2 — author `RULINGS-F.W2.md`.** §0 substrate · **§1 R-i** (WIDEN, the complete six-authority roster, each **widened WITH its reason**, zero exclusions, cures homed, zero minted; §1.3 answers the seventh-authority question at the bank — `TIER_INFO` folds into **M-N1**, not a new row; §1.4 records two banked-figure divergences; §1.5 records two drifted anchors) · **§2 R-ii** (producer facility = presumptive seat; ACT(2)'s `parseCssColor` route narrowed to **non-token STRINGS**; **SS-6 and SS-13 both escalated and INTACT**, measured unanswered; **§2.3 handles finding F-2** — a ruling on its own reasons, never a ratification of the landing, with G8's RED input measured *not* to have occurred) · **§3 R-iii** (MPC-2 quoted at `fr-MorphPhaseConfig.md:46` and CENSUS-MC at `fr-EasingCurvePreview.md:58`, each with **F.W1** named as home; the **§2a-rows-1–4 collision** stated; **G1's 5-of-5 `ERR_PACKAGE_PATH_NOT_EXPORTED`** on the record; **no pre-emption**; **§3.3 minutes that COHESION §0o ESC-4 has since answered it at F.W1's end**, quoted with two disclosed cuts, cited by id and never re-opened; §3.4 minutes one emphasis divergence in the dated spec as a note **beside**, never a patch) · **§4** the `easing()` mapping **re-derived at the landed bytes** · §5 gate readings · §6 residuals.

**ACT 3 — lawfulness pass over the settled bytes, double-run.** ⟨cmd⟩ `/usr/bin/grep -oE '⟨cmd⟩ `[^`]*\$[^`]*`' RULINGS-F.W2.md` → **no output** (no command consumes a shell variable) · ⟨cmd⟩ `/usr/bin/grep -o '…/[a-zA-Z@]' RULINGS-F.W2.md` → **no output** (no elided command path; two were found on the first pass, at §4.3's `sed` and §5's G7 cell, and **completed to literal absolute paths** before commit — the R3-9.1 unrunnable-machinery class, caught by the file's own law) · ⟨cmd⟩ `/usr/bin/grep -n 'grep -[a-z]*P' RULINGS-F.W2.md` → **no output** (BSD-portable; no PCRE, no lookaround) · ⟨cmd⟩ `/usr/bin/grep -noE 'F-W[0-9]+\.md:[0-9]|COHESION\.md:[0-9]' RULINGS-F.W2.md` → **no output** (no line coordinate into a live sibling; siblings cited by §-heading, gate id or row label). The §4.2 partition command was re-run **from a neutral cwd** to prove it carries no implicit base → `DIRECT 8 …` · `FALLTHROUGH 14 …`, identical both runs.

**ACT 4 — commit (one commit, pathspec on the commit itself).** `b469b989` — *docs(x-f-w2/.c): RULINGS-F.W2 — R-i WIDEN (six-authority G7 roster) · R-ii M-RTC presumptive seat · R-iii routed, ESC-4 minuted · the G2/G15 easing() mapping re-derived at the landed bytes*. ⟨cmd⟩ `git show --stat --oneline b469b989` → **1 file changed, 239 insertions(+)**, the file being `docs/tranches/X/fourier/RULINGS-F.W2.md` and nothing else — **no sibling seat's staged path swept in**.

#### Gate readings — BEFORE → AFTER

| gate | BEFORE (wave open) | AFTER (this unit) | witness |
|---|---|---|---|
| **G7** | **RED** — `/bin/ls …/RULINGS-F.W2.md` → *No such file or directory*; six authorities against a charter naming one | **GREEN** | the record's **§1**: R-i recorded with the complete six-authority roster, each **widened with its reason**, zero exclusions, cures homed at F.W4 / F.W3 / F.W3 `.d`+F.W4 / `.b`, **zero minted** |
| **G8** | **RED** — ruling absent; facility verified live (and already shipping at `colors.ts:20`, finding F-2) | **GREEN** | the record's **§2**: R-ii recorded; ACT(2) narrowed to non-token strings; **SS-6 · SS-13 intact**; the landing ruled on, not ratified; the gate's RED input (*re-implements a producer surface*) measured **false** at the landed bytes |
| **G20** | **RED** — `/bin/ls …/RULINGS-F.W2.md` → absent; the locks had no record | **GREEN** | the record's **§3**: both locks quoted at their coordinates with **F.W1** named, the §2a-rows-1–4 collision stated, **G1's 5/5** on the record, no pre-emption, ESC-4 minuted as the answer |
| **G2** | **RED** — both prescribed symbols 0 hits; the mapping had no record | **record leg GREEN**; gate closure stays `.a`'s | the record's **§4**: the mapping re-derived at both ends (8/14 by identity, resolution order, landed catalogue) |
| **G15** | **RED** — and RE-SHAPED: the banked `14/22 · 8/22 · max Δ 0.192` superseded by **ESC-4** (Δ = 0, all 22) | **record leg GREEN**; the Δ = 0 sampler re-run stays `.a`'s | **§3.3** cites ESC-4 by id and never re-opens it; **§4.2** enumerates the partition |

**No other gate is touched, and no GREEN of F.W0/F.W1/F.W3/F.W4/W.L6 is claimed** (FR-GIG-5).

#### Findings this unit adds to the record

- **F-5 · `energyColor`'s banked blast radius is 3 consumers / 2 routes; the tree has 2 / 2.** `InfoCard.vue` was DELETED under **COHESION §0j.D's `G-10`** at fourier `5842377`, so `InfoCard.vue:5/:14` is no longer part of F.W4's regression surface. **Grade, identity and cure home untouched** — a divergence recorded, never a re-grade or a re-book.
- **F-6 · `fr-ContourPreview` row 22 disagrees with itself** — its ADJUDICATED cell says *cure ten sites*, its description cell says *9 sites*, and the tree says **nine** (1 + 8). `.b` cures nine and mints no eleventh interpretation.
- **F-7 · two roster anchors drifted under `3bac3d5`** — `CoefficientsSpectrum.vue:47 → :55`, `STATIC.rainbow colors.ts:13-16 → :27-30` (hexes `:28-29`). INTENT resolves at the true bytes; **no dated spec is patched** (E-3).
- **F-8 · `TIER_INFO` is not a seventh colour authority** — the bank folds its three literals into **M-N1** with `energyColor`'s three (`fr-InfoCard.md:41`'s `:26/:32/:38 ≡ :45/:46/:47`, reproducing byte-for-byte at HEAD). The widened charter reaches them through roster member 2; **no row minted**.
- **F-9 · the dated spec's §4 R-iii renders MPC-2's parenthetical bold-and-italic where the bank sets no emphasis** — the R4-7.1 class the spec polices elsewhere. Minuted at the record's §3.4, **beside**, never propagated and never patched.

#### Residuals and escalations

**Escalations: none.** Every act the unit's sections prescribe was performed as specified, at the bytes.

Residuals carried to their owners: **SS-6** and **SS-13** remain OPEN (unit `.d`'s relay; glass-ui READ-ONLY always) · **G15's Δ = 0 sampler re-run** and **G2's cure-side reading** are `.a`'s · the **dated addenda-beside** the measurements imply (G15's ESC-4 re-shape; glass-ui 80 → 70 keys; `colors.ts` 117 → 182 lines; the two drifted anchors; `energyColor` 3 → 2 consumers) land as **addenda, never patches** · `fr-ContourPreview`'s banked *ten* stands as a banked divergence against the tree's nine.

**Ordering law discharged**: R-iii exists before `.a` authors ACT(1), and the whole record exists before `.b` authors ACT(2) — both by this commit.
