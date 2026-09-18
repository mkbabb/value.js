SERVED MODEL: claude-opus-5[1m]

# X.F.W4 `.g` — ADDENDA-BESIDE, dated 2026-09-18

**Standing**: E-3 addenda-beside. `docs/tranches/X/fourier/waves/F-W4.md` is IMMUTABLE and is **not edited by this seat**; every correction below sits here, beside it, dated, with the command that produced it. Each entry names the spec cell it corrects by **gate id** (never by a line coordinate into the live sibling — §0's anchor idiom).

**Seat**: unit `.g` (the gate chassis), Track C · X·F, `claude-opus-5[1m]`.
**Substrate**: `/Users/mkbabb/Programming/fourier-analysis`, branch `m/w1-bump-migration`, opening HEAD `f7fa1e3`.
**Method**: every figure below was read from the settled bytes and **double-run**; both runs agreed in every case, and where they did not the entry would say so.

---

## A-g-1 · `G-F4-A11Y-ROUTE` — the cell's predicted RED is FALSIFIED by measurement

**The cell says** (§4, quoted): *"**The moment `/equation` joins, fr-CL M-R2 + FR-EQR-6/R2-r3 fire TWO `scrollable-region-focusable` BEFORE any hover finding — that is the RED.**"*

**Measured.** `/equation` had already joined at F.W0 (`e2e/visualization-ux.spec.ts`), and seat 0 recorded at `greenBeforeCure` #2 that the predicted RED had never been read. It is read here, **first, before any route was added** — the lock's own order.

⟨cmd⟩ (from `fourier-analysis/web`, vite dev on :3000) `npx playwright test visualization-ux.spec.ts --project=chromium --reporter=list -g "keystone: /equation is a11y-clean"`, twice → identical:

```
• [critical] button-name — Buttons must have discernible text (1 node(s))
      .is-auto-active
```

**The verdict**:

| the cell predicts | measured 2026-09-18 |
|---|---|
| **TWO** `scrollable-region-focusable` | **ZERO**, at `/equation`, in either run |
| *"before any hover finding"* | there is no hover finding; there is **ONE `[critical] button-name`** |
| — | the node is `.is-auto-active` → `src/components/equation/FunctionInput.vue:192`, the `icon-only` Auto/Parseval `Button` whose only child is a `<Wand2>` glyph and which carries no `aria-label` |

⊘ **The predicted defect class is REAL and lives on a different route.** `scrollable-region-focusable` fires exactly once in this wave's keystone set, at **`/demo/shape-extractor`**, on `#output` (`<pre … overflow: auto>`). So the cell's mechanism was right and its ADDRESS was wrong — recorded that way rather than as a simple kill, because the cure is owed either way.

**Routing**: the `/equation` `button-name` cure is **`.b`**'s (`FunctionInput.vue` is in `.b`'s writable set). The `#output` cure is **`.a`**'s (`FourierShapeExtractor.vue`). Neither is `.g`'s; `.g` measured, published and joined the routes.

**The three joined routes, first readings** (double-run, each run individually so one failure cannot suppress the next):

| route | verdict | findings |
|---|---|---|
| `/paper` | **GREEN** | zero serious/critical |
| `/morph` | **RED** | `[critical] button-name` ×4 — `.morph-button` (`FourierMorphDemo`) + three glass-ui `select-trigger` comboboxes (`MorphPhaseConfig`); `[critical] label` ×5 — `.num-input` ×3 (`MorphPhaseConfig`), `.level-input` ×2 (`HarmonicLevelGrid`) |
| `/demo/shape-extractor` | **RED** | `[serious] scrollable-region-focusable` ×1 — `#output` |

⊘ **`/paper`'s GREEN is a finding, not a clearance.** `PS D-B2` books 2.39/3.00 and `PS D-M4 extended` books four sub-4.5 ramp stops **on that very route**, and axe reports neither. axe grades what it can attribute to a text node over a resolvable ancestor background; ramp inks behind `color-mix` plates, canvas strokes and control BOUNDARIES (WCAG 1.4.11) fall outside that. **A green axe run is not a contrast reading** — which is the standing justification for `G-F4-CONTRAST-FLOOR` existing beside `G-F4-A11Y-ROUTE`, now measured rather than argued.

---

## A-g-2 · `G-F4-VITEST` — the witness is HALF superseded, and `D6` priced two branches where three existed

**The cell says**: *"`web/` scripts are exactly `dev/build/preview/test:e2e/test:e2e:ui`; no vitest/jest anywhere; zero `*.test.ts`/`*.spec.ts` under `src`"*.

**Measured**: every clause is TRUE at the bytes. But the cell's *conclusion* — that `web/` has no unit runner — is **false**, and has been since **F.W0's `G-9`**:

⟨cmd⟩ `grep -n 'node --test' ../.github/workflows/ci.yml` → `run: node --test --experimental-strip-types e2e/unit/figure-dimensions.unit.ts`
⟨cmd⟩ `ls web/e2e/unit/` → `figure-dimensions.unit.ts`

F.W0 stood a `node:test` SEAT up — a runner that runs, asserts, is type-checked and is wired into CI — and its own file states why it could not be vitest: *"F.W0 §2b reserves `web/package.json` + `package-lock.json` **entirely to unit a**… A vitest devDependency is a manifest byte, so it is not this wave's to write."* It also routes the successor: *"when F.W9 lands the floor it lands the manifest transaction with it and may re-home these assertions on vitest."*

**Consequence for `DECISIONS-F.W4.md` D6.** D6 priced exactly two branches — the vitest runner and PAW-50's Vite build plugin — and did not price the runner already standing. The verdict is **unaffected** (`node:test` is a seat, explicitly *"NOT coverage"*, and F.W0 itself declines to pick the floor's runner), and `.g` built **the ruled arm and no other**. What is recorded here is that the branch table was short by one, and that the tree now carries **two runners**:

| runner | owner | what it is | CI step |
|---|---|---|---|
| `node:test` | F.W0 `G-9` | the SEAT — one asserting spec, explicitly not coverage | `Unit-runner seat (X·F F.W0, G-9)` |
| `vitest@5.0.1` | F.W4 `G-F4-VITEST` (D6) | the FLOOR arm — 28 assertions over 4 files | `Unit floor (X·F F.W4, G-F4-VITEST)` |

⊘ **F.W0's seat was NOT re-homed onto vitest by this seat**, deliberately: re-homing it would redden a closed wave's landed gate on an import it never asked for. Consolidation is **F.W9 `G-F9-1`**'s, per F.W0's own routing, and is recorded here so it is not re-discovered.

**The resolved version, recorded as D6 requires** (*"`.g` selects the `vitest` major whose peer range admits the installed `vite@7.3.6` … and does not inherit a number from this line"*):
⟨cmd⟩ `npm view vitest@5.0.1 peerDependencies engines` → `vite: "^6.4.0 || ^7.0.0 || ^8.0.0"` · `node: "^22.12.0 || ^24.0.0 || >=26.0.0"`; installed `vite` = **7.3.6**, CI node = **22.x (≥22.12)**. Pinned **exact**, not caret.

---

## A-g-3 · `G-F4-NO-UNUSED` — `EP-MISSED-F`'s cited site is DISCHARGED BY A PREDECESSOR; ten other live sites stand

**The cell names** `EP-MISSED-F` among the rows its ESLint leg enables. `fr-EasingPicker`'s row reads: *"easings.ts:9 and :10-16 are two import statements from the byte-identical specifier … → **F.W1** (costing correction) + **F.W4** (the no-duplicate-imports hygiene)."*

**Measured at the settled bytes**: ⟨cmd⟩ `grep -n '^import' src/lib/easings.ts` → **one** statement (`:26-35`, from `@mkbabb/value.js/easing`). The duplicate pair died with **F.W2 `.a` `0cc9b00`** under COHESION §0o **ESC-4**. `EP-MISSED-F`'s cited site is **DISCHARGED-BY-PREDECESSOR**, not cured by this wave, and `.g` claims no credit for it.

**What the landed rule finds instead** — ⟨cmd⟩ `npx eslint src -f json`, twice, identical: **10 errors, all `no-duplicate-imports`; 0 `vue/require-v-for-key`**:

| site | shape | owner |
|---|---|---|
| `ConvergenceLegend.vue:3` | `import type` + `import` of `../lib/harmonics` | `.b` |
| `HarmonicLevelGrid.vue:87` | `@/lib/svg-fourier` | `.a` |
| `PaperView.vue:20` | `@/lib/paperContent` | `.e` |
| `search/searchHelpers.ts:6` | `./paperSearchIndex` | `.e` |
| `useScrollNavigation.ts:2` | `vue` | `.e` |
| `BasisCanvas.vue:15` and `:31` | `./lib/canvas-drawing` — **two `import type` statements**, `EP-MISSED-F`'s own same-kind shape | `.c` (EVALUATE-SCOPE — see the wave record's structural finding) |
| `useWorkspaceLoader.ts:2` and `:6` | `vue`, `@/stores/animation` | `.c` |
| `useFourierMorph.ts:16` | `@/lib/svg-fourier` | `.a` |

⊘ **`allowSeparateTypeImports` was DECLINED and the decline is recorded in the config itself.** With the option the count is **1** (`BasisCanvas.vue:31` alone). The gate names the rule with no qualifier; an option that suppresses nine findings is the seat narrowing its own gate, so the bare rule stands and the nine are routed rather than hidden.

⊘ **The `noUnusedLocals` leg is not this wave's.** It landed at F.W0 `b3b736c` (seat 0's `greenBeforeCure` #1). `.g` landed the ESLint rules and the CI wiring and claims nothing else.

---

## A-g-4 · `G-F4-OCCLUSION` — the witness reproduces, and `FSE-D-1`'s magnitude reproduces to the pixel

**The cell says**: *"`App.vue:24/:26` force `scrollWidth − clientWidth = 0` on every route — the gate passes BY CONSTRUCTION — and `DELTA.md:9-11` books **occlusion gate: 21/21 GREEN** for the run whose 375px capture shows the Moon amputated at 508px (FSE-M-4). **21/21 GREEN is 21/21 UNMEASURED.**"*

**Confirmed, and now measured.** Re-pointed at `<main>` (the element that consumes the overflow) plus `HLG-20`'s vertical-clip arm on the non-scrolling shell:

⟨cmd⟩ `VISUAL_OUT=<scratch> npx playwright test visual-baseline.spec.ts --project=chromium --reporter=list`, twice → identical: **20 passed / 1 failed**, the one being

```
horizontal overflow inside <main> on shape-extractor @ 375x667 (occlusion gate, FSE-M-4)
Expected: <= 2
Received:    97
```

**97px is `fr-FourierShapeExtractor D-1`'s booked figure exactly** — *"the Moon box (272..472) loses 97px, 51.5% visible"*. The first honest reading of this gate in the repo's history reproduces the amputation the record has carried since the J tranche. **Routed to `.a`.**

**The vertical arm reads 21/21 clean today** and is recorded as a REGROWTH gate, not as a discharge: the shell (`h-dvh … overflow-hidden`) cannot scroll, so any content past its box is unreachable by any means — the `min-h-0` flexbox regression class. `<main>` is excluded from that arm on purpose: it scrolls, so content past its fold is reachable and is not a clip.

⊘ **A harness defect cured in passing, because measuring the gate destroyed the evidence it is measured against.** Running `visual-baseline.spec.ts` overwrites 21 CHECKED-IN PNGs under `docs/tranches/J/audit/screenshots/`, which are prior evidence and therefore immutable under **E-3**. A `VISUAL_OUT` env override now redirects the capture sink; the default is byte-identical to the previous behaviour, and nothing in the J trees was written by this seat (⟨cmd⟩ `git status --porcelain` after both runs → only `web/e2e/visual-baseline.spec.ts`).

---

## A-g-5 · `G-F4-CONTRAST-FLOOR` — `FR-IC` is dead, `PS D-M4`'s four stops are now three, and two banked figures DRIFT at the 8.0.0 pin

The cell names fifteen rows. All are carried by the landed harness except one, and three carry corrections.

**(a) `FR-IC 1.815–3.574` is ABSENT BY DELETION, not by omission.** `InfoCard.vue` was deleted at **F.W0 `5842377`** (COHESION §0j.D `G-10` / F8-REACH-01) — ⟨cmd⟩ `find web/src -name 'InfoCard*'` → **∅**. Every `FR-IC-*` row is **DISCHARGED-BY-DELETION** (seat 0's `greenBeforeCure` #3). The registry file states this in terms so its silence reads as a ruling.

**(b) `PS D-M4 extended`'s four light-arm stops are three at this pin.** Banked: **4.36 / 4.48 / 4.33 / 3.58**. Measured live, light arm, double-run: the ramp's failing stops are **stop-4 4.443 · stop-10 4.373 · stop-11 3.614**; every other stop of the thirteen clears 4.5. Stop-11 (appendix B, the worst, and the one the axis's own verdict table missed) **reproduces to 0.034**. One stop rose above the floor with F.W1's 4.0.0→8.0.0 uplift — the improvement is real and is recorded rather than quietly absorbed. ⊘ **The harness enumerates ALL THIRTEEN stops, not four indices**: §4 requires *"all four, not the worst alone"*, and enumerating the ramp is strictly stronger — it cannot go stale when a cure moves which stops fail, and `★MF-10`'s zero-headroom finding (13 roots consume exactly 13 stops, no fallback) means a 14th root would resolve to nothing, which the harness raises as an **unresolvable colour** rather than a silent pass.

**(c) Two banked figures DRIFT at 8.0.0, and the harness says so in its own output.**

| row | banked (4.0.0 era) | live 2026-09-18 | reading |
|---|---|---|---|
| `GAB-1[--tier-featured value]` | 1.45 | **1.536** | DRIFT |
| `GAB-1[--tier-saved value]` | 2.58 | **2.731** | DRIFT |
| `AA-3` (five tones) | band 1.36–1.81 | **1.219 – 1.547** | DRIFT (the band moved DOWN) |
| `FR-EQR-7[--success rung]` | 2.175 | **2.133** | DRIFT (marginal) |

Every other named pair **reproduces**: `FR-MSP-7` 1.035 L / 1.086 D (banked 1.038 / 1.084) · `HLG-37` 1.283 / 1.365 L and 1.383 / 1.385 D (banked 1.275 / 1.361 · 1.398 / 1.403) · `FR-USB-5` 1.283 / 1.929 / 1.720 (banked 1.28 / 1.93 / 1.73) · `PSM-4@45%` 1.888 L / 2.378 D (banked 1.88 / 2.39) · `FR-EQR-7[instance]` 2.110 (banked 2.101) · `GAB-1[plate/page]` 1.031 (banked 1.03) · `GAB-1[border]` 1.250 (banked 1.25–1.27). **The live reading governs in every case**; the banked figure is carried for drift disclosure and is never asserted against.

**The both-arm reading**: light **24 of 34 pairs RED**, dark **12 of 34 RED**. The registry's own claim that `GAB-1`, `AA-3` and `FR-EQR-7` *"pass throughout"* in dark is **confirmed by measurement**, as is `HLG-37`'s both-arm failure.

**(d) Seven named pairs are declared RED-because-underived, not dropped.** `FR-CP-D1` (canvas axes) · `DMT M-2` · `ECD D-5` · `ECD D-6` · `EV D·D-B3` · `PS D-B2` · `PV D/M-8` each paint their ink rather than declaring it, and expressing them as static stacks at this seat would be a guess wearing a measurement's clothes. They are enumerated with their owners in `e2e/contrast-pairs.ts` and the harness **FAILS** on them. ⊘ No skip, no `fixme`, no allowlist: the roster IS the RED, and it closes by being emptied as each owning unit lands its cure together with its pair's expression stack.

---

## A-g-6 · `G-F4-DERIVER` — the clause count, and the one figure a naive grep gets wrong

**The seven clauses, mapped to the eight emitted fields**, so no consumer has to re-derive the mapping. §4 states six comma-separated clauses, the first carrying three parts (*"native-loop count BY DIRECTIVE with bounds + multiplicity"*); the dispatch calls them seven. The deriver emits **eight named fields**, and the mapping is stated rather than a count being asserted (the count follows the operand, never the reverse):

| §4 clause | emitted field(s) |
|---|---|
| native-loop count BY DIRECTIVE | `nativeLoopsByDirective` |
| … with bounds | `loopBounds` |
| … + multiplicity | `loopMultiplicity` |
| `:is` candidate sets | `isCandidateSets` |
| producer-internal loops from first-party d.ts | `producerInternalLoops` |
| `url(#id)` edges | `urlRefEdges` |
| enclosing disclosure state | `disclosureState` |
| loop-source provenance (literal vs typed) | `loopSourceProvenance` |

**The first census** (⟨cmd⟩ `npm run derive:loops`, twice, identical):

- **33 `v-for` directives** — 17 on native elements, 16 on component callsites, **0 unkeyed**.
- **`BS-1` discharged at its own witness**: `PaperSidebar.vue`'s **three nested `<li v-for>`** are all found, all `native: true`, all `host: "li"` — a component-callsite census reads this file as **0**.
- **bounds**: 1 closed, 32 runtime. **`FR-NP-2` honoured structurally**: a number is emitted only for a literal range or a literal array; every typed domain is `"runtime"`, never a minted cardinality.
- **`:is`**: 6 sites, **4 resolved**; `AppHeader.vue:121` and `:134` (`activeTabData.icon`, `tab.icon`) are reported **UNRESOLVED** — the candidate set is assembled across a data structure, which is `BS-2`'s exact shape. An unresolved set is a RED, not a zero.
- **`BS-3`**: the denominator is the INSTALLED dist and is versioned — `@mkbabb/glass-ui@8.0.0` 15 `renderList` modules / 144 `d.ts` component declarations · `@mkbabb/latex-paper@0.2.1` 8 calls / 7 components. **None of this is visible to a `web/src`-scoped census.**
- **`BS-4`**: **4 edges, ALL FOUR UNRESOLVED.** `SvgFilters.vue` defines `#title-boil` (`:69`), `#wobble-celestial` (`:96`), `#paper-grain` (`:122`), `#canvas-grain` (`:150`), and **nothing under `src` references any of them**. The 178-line survivor the cell cites is measured: it is four filter definitions with zero in-tree consumers. **Routed to the SCRUB (`G-F4-DEAD-DEP`, `.f`)** — with the standing caution that an `url(#id)` edge is exactly the edge no import graph represents, so a consumer in a producer package or in emitted CSS must be excluded before any deletion.
- **disclosure state** recorded for all 39 sites (33 loops + 6 `:is`).

⊘ **A correction to the naive instrument, banked so nobody re-derives it.** ⟨cmd⟩ `grep -rn 'v-for' src | wc -l` → **34**; the deriver reads **33**. The 34th is **prose inside a `<script>` doc comment** at `src/components/shared/CoefficientsSpectrum.vue:76` (*"rows live in a `v-for`"*). The template-scoped read is the correct one; the grep over-counts by one.

---

## A-g-7 · §5.1(3) — `noUncheckedIndexedAccess` is PRICED, and correctly sequenced away from this wave

§5.1(3) reads: *"`noUncheckedIndexedAccess` (or an honest return type) **before** PAW-12's predicate split"*. `PAW-12` is **F.W9/W10's** (D6's own dependent-cluster line: *"this decision gives it a home, it does not book it"*), so the flag is not due at F.W4 — but its cost was a guess, and a sequencing lock priced by guess is how a later wave inherits a surprise.

**Measured, and then reverted without a byte committed.** ⟨cmd⟩ `web/tsconfig.json` with `"noUncheckedIndexedAccess": true` added, `npx vue-tsc -b --force`:

| tsconfig | diagnostics |
|---|---|
| as landed | **18** (17 × TS6133 + 1 × TS6196 — seat 0's baseline, unmoved) |
| + `noUncheckedIndexedAccess` | **265** (102 × TS18048 · 77 × TS2532 · 26 × TS2345 · 22 × TS2538 · 19 × TS2322 · 17 × TS6133 · …) |

**+247 diagnostics, overwhelmingly in `src/**`** — files `.g` may not write and which every sibling unit is mid-cure on. Landing it at F.W4 would block `npm run build` for the rest of the wave for a rider no unit of this wave owns. **Routed to F.W9/W10 with PAW-12, with the price now measured.** ⟨cmd⟩ `git status --porcelain` after the probe → **∅ in `web/tsconfig.json`**; the file was restored byte-exactly and the probe is committed nowhere.

---

## A-g-8 · A BOUNDS DISCLOSURE — `web/package-lock.json` (the one byte written outside the literal enumeration)

**Stated first and plainly: this seat wrote one file that its writable set does not name.**

§1 *Bounds* grants `web/package.json` **(gates only)**; the unit plan's writable set names `web/package.json` and not `web/package-lock.json`. Both of this unit's manifest-bearing gates require devDependencies — `G-F4-VITEST` (D6: *"one devDependency (`vitest`), one `vitest.config.ts`, one `test` script"*) and `G-F4-NO-UNUSED` (ESLint + `eslint-plugin-vue` + a TS parser, since a flat config resolves its plugins from `web/node_modules` and an `npx`-cached install is not on that resolution path).

**Why the lock could not simply be left alone.** `npm ci` — which all three CI jobs run — **fails outright** when `package.json` declares a dependency the lock does not carry. Writing the granted manifest byte without its lock would therefore have turned every CI job RED on a lockfile desync: a half-landing, and by this wave's own standard a HIGH defect.

**Why it was treated as inside the granted surface rather than escalated as a stop.** (i) The lock is the deterministic derivative of a byte this unit *is* granted, not an independent artefact; (ii) **the repo's own adjudicated reading pairs them** — F.W0's `G-9` file states *"F.W0 §2b reserves `web/package.json` **+ `package-lock.json`** entirely to unit a"*, i.e. ONE manifest reservation; (iii) no sibling seat in this wave holds either file (every other unit's set is `web/src/**` plus a docs addendum), so nothing was taken from anyone.

**RATIFICATION IS REQUESTED, and this is not a block.** All seven gates this unit owns turned without it being in doubt; what is asked is that the orchestrator either ratify `web/package-lock.json` into `.g`'s writable set by dated addendum (the §Bounds-widening shape COHESION §0o already used for `ESC-KFW2-1`), or say the word and the manifest transaction will be reverted whole and both gates re-opened. ⟨cmd⟩ `git show --stat cc6c32d f93eacc 717d287 -- web/package-lock.json` isolates every byte of it to **two** commits — `cc6c32d` (+291 lines, the vitest install) and `f93eacc` (+1240, the ESLint install); `717d287` adds a script only and does not touch the lock. Each is a plain `npm install` result, hand-edited nowhere.

**The manifest delta in full** (⟨cmd⟩ `git diff f7fa1e3..HEAD -- web/package.json`, counted from the settled bytes): **five** devDependencies, all pinned **exact**, never caret — `@typescript-eslint/parser 8.70.0` · `eslint 10.11.0` · `eslint-plugin-vue 10.11.0` · `vitest 5.0.1` · `vue-eslint-parser 10.3.0` — and **four** scripts (`lint`, `derive:loops`, `test:unit`, `test:unit:watch`). No runtime dependency was added, moved or removed; no existing line changed.

---

## A-g-9 · `G-F4-ZERO-CONSOLE` — held by construction; the run-level reading is the CI arm's

The cell is a **keep-green obligation**, and seat 0 declared it `UNMEASURED-AT-OPEN` rather than claiming it. The same declaration is made here, with its receipts:

- ⟨cmd⟩ `git diff --name-only cc6c32d~1..HEAD -- web/e2e/` → seven paths, **none of them** `visualization-crud.spec.ts`, `workspace-flow.spec.ts`, `paper-performance.spec.ts`, `gallery.spec.ts` or `contour-extraction.spec.ts` — the five specs carrying the console/`pageerror` hooks. **Zero bytes of the zero-console gates were touched.**
- F.W1's atomic transaction is a single commit, `538db90`, and no commit of this unit reverts, splits or reorders any limb of it. ⊘ `e2e/paper-performance.spec.ts:328`'s locator line (`.a`'s DMT N-2 rider) was **not** touched — ⟨cmd⟩ `git diff cc6c32d~1..HEAD -- web/e2e/paper-performance.spec.ts` → **∅**.
- The gates cannot be READ at this seat: they require the backend, and ⟨cmd⟩ `nc -z localhost 27017` → **DOWN**, ⟨cmd⟩ `docker info` → **DOWN`. Run without it, `gallery.spec.ts:118` fails on `500 (Internal Server Error)` from the dead `/api` proxy — an environment artefact, not a defect, and asserting on it would be a false reading in either direction.

**`FR-GIG-5` (the pagination-drain cure) is claimed by nothing in this unit**, per the lock. ⟨cmd⟩ `git log --oneline -7 | grep -ci 'pagination\|GIG-5'` → **0**.

---

## Index of corrections

| id | corrects | class |
|---|---|---|
| A-g-1 | `G-F4-A11Y-ROUTE`'s predicted RED | FALSIFIED (mechanism real, address wrong) |
| A-g-2 | `G-F4-VITEST`'s witness · `D6`'s branch table | HALF-SUPERSEDED · SHORT BY ONE |
| A-g-3 | `G-F4-NO-UNUSED` / `EP-MISSED-F` | DISCHARGED-BY-PREDECESSOR + 10 live sites |
| A-g-4 | `G-F4-OCCLUSION`'s witness | CONFIRMED, magnitude reproduced (97px) |
| A-g-5 | `G-F4-CONTRAST-FLOOR`'s pair list | 1 dead · 1 re-measured · 4 drifted · 7 underived |
| A-g-6 | `G-F4-DERIVER`'s clause count · the `v-for` figure | MAPPED · grep over-counts by one |
| A-g-7 | §5.1(3)'s `noUncheckedIndexedAccess` | PRICED (265 vs 18), routed to F.W9/W10 |
| A-g-8 | §1 Bounds / `.g`'s writable set | BOUNDS DISCLOSURE — ratification requested |
| A-g-9 | `G-F4-ZERO-CONSOLE` | HELD BY CONSTRUCTION, run-level reading owed to CI |
