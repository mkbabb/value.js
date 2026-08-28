# F-W4-CHECK — FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, PASS 1)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W4.md` (208 lines, 107,419 B)
**Corpus authority**: the 66 `fr-*.md` at `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/`
**In-tree carries admitted**: `X/fourier/carry/F-W4-CARRY.md` (559 lines) · `X/fourier/carry/F-W1-CARRY.md` (247 lines). No other carry ledger exists in the tree (`ls X/fourier/carry/` = exactly these two) — a spec citing any other would cite a phantom. **F-W4 cites only F-W4-CARRY. Clean on this axis.**
**Method**: id-keyed enumeration (X·P terminal method). Every row head in all 66 records was extracted (table `| **id** |` form AND prose-bullet `- **id**` form), its terminal disposition cell/sentence scanned for `F.W4`, and the resulting id set diffed against the spec bytes with a **shorthand-aware** expander (the spec books in dotted/elided forms — `FR-AH-19 · -23 · -25 · … · -39..-43`, `EV-L·m-1 ⊕ m-2 ⊕ m-3 ⊕ m-5`, `EV-D·D-M13/m2/C·D-13` — a naive exact matcher manufactures ~70 false escapes and this pass discarded three such drafts before the numbers below).
**Ordering**: `UTF8_BYTEWISE_CODEPOINT`.

---

## §A — CENSUS TOTALS

| quantity | value |
|---|---|
| adjudicated row heads across the 66 records whose terminal disposition routes to **F.W4** (all markups) | **963** |
| of those, carrying a globally-prefixed canonical id (`PREFIX-N`) | 405 |
| of those, keyed by record-local axis ids (`D-1`, `L·m-2`, `C·C-3`, `D:D-21`) resolved via the carry's prefixed forms | 533 |
| of those, `fr-ContourPreview`'s numbered-row scheme (`| N |` → spec `CP-N`) | 25 |
| **BOOKED** by the spec (as a row, a fold whose target is booked, a gate, a bounds item, a decision, a cross-edge, or a §6 Excluded line) | **910** |
| **ESCAPED** | **53** |

### CARRY→SPEC closure (the spec's own G-F4-CARRY-CLOSURE direction)

`F-W4-CARRY.md §Rows` = **421** bullet-ids — the spec's headline count is **exact**.
Set-difference CARRY→spec by id token: **421 / 421 resolve**. The three that survive only as prose descriptors were hand-cleared:

- `⊘ EV reader-unattacked carry (4, flagged)` → spec: `unattacked carry ×4` ✔
- `EP-C/m-6 + LC-zero-coverage` → spec: `EP-C/m-6 (un-fixme + picker test; stale-build fact → F.W0)` + `zero-coverage note → F.W9/W10` ✔
- `⊘ FR-EQR-27 / r2-K7 NORMALIZE-UP SWEEP` → spec: `r2-K7 (SP-12 normalize-UP)` ✔

**The CARRY→spec direction is CLEAN.** Every escape below is a REGISTRY→spec escape — i.e. the loss happened at the CARRY, and the spec inherited it. That is the defect this program exists to kill, and it is invisible to the spec's own closure gate as written.

---

## §B — ESCAPES, ID-FOR-ID (53)

### B.1 · HARD ESCAPES — terminal `F.W4`, no fold, id absent from spec AND both carries (26)

| # | id | record:line | terminal disposition (bytes) |
|---|---|---|---|
| 1 | `FR-EQR-20` | fr-EquationResult:58 | `**→ F.W4.**` — MINOR; the authored +28.6% type ramp delivers +14.3% (root font drops 18→16px at the identical breakpoint) |
| 2 | `FR-EQR-22` | fr-EquationResult:60 | `**→ F.W4** (sweep; the :70-75 block otherwise keeps its superlative)` — the `!important` at `:74` is unearned |
| 3 | `FR-EQR-23` | fr-EquationResult:61 | `**→ F.W4.**` — `scrollbar-width: thin` is the entire overflow affordance; `./fading-scroll` live at the pin |
| 4 | `FR-EQR-18` | fr-EquationResult:56 | `**→ F.W4**` — residue = one comment at `:23` naming `\htmlClass` load-bearing. Folds → EV `I-3`, **itself escaped (#23)** |
| 5 | `FR-EQR-28` | fr-EquationResult:69 | `**→ F.W4** (cohort sweep, one row)` — 9-of-35 `@reference`-less cohort. Folds → `FR-CS i-5(d)` + `ECD C-23`; **`ECD-C-23` grep in spec = 0** |
| 6 | `★MF-4` | fr-PaperView:110 | `**F.W4**.` — U+2131 ℱ display glyph in the sole `<h1>` + 4 sibling sites, no text alternative; record states this is a NEW mechanism the FR-AH-2 font cluster does not cover |
| 7 | `★MF-5` | fr-PaperView:111 | `**F.W4** — folds into B-1's blast radius; the mobile consequence named` (iOS auto-zoom; fourier sets no `.ios` class, seat grep 0) |
| 8 | `★MF-6` | fr-PaperView:112 | `**F.W4** sweep` — `.sidebar-link` transitions `font-weight` (reflow + synthesized-weight snapping) |
| 9 | `INFO-3` | fr-EditorControlsDock:97 | `**F.W4** — the separator cure should take the whole family, not the hairline alone` (`DockLayerGroup`/`DockLayer` ship at 4.0.0 unconsumed; adoption discharges D-18 + D-26 in the same edit as D-9) |
| 10–20 | `FM-4` `FM-5` `FM-6` `FM-7` `FM-8` `FM-9` `FM-10` `FM-11` `FM-13` `FM-14` `FM-15` | fr-FourierMorphSvg:39 | the `**FM-4..FM-16**` band, `13 MINOR`, `**F.W4** (FM-14 → F.W3/W4)`. The spec's whole `FM-` roster is `FM-1 2 3 12 16 17 19 20 21 22 23 24` — **11 of the 13 banded ids are nowhere**, and `FM-14`'s F.W3/W4 split is lost with them |
| 21 | `FR-USB-18` | fr-UserSlugBar:58 | `**→ F.W4 + F.W1**` — no in-flight state or busy affordance on logout (`:62-65`, `:103-111`, no `:disabled`). The **F.W1 half is in F-W1-CARRY; the F.W4 leg is in neither F-W4-CARRY nor the spec** |
| 22 | `FR-IC-17` | fr-InfoCard:49 | `INFO, DISCHARGED-BY-UPLIFT` — an exclusion-with-reason in the record; §6 names no such line |
| 23 | `M-ZM` | fr-EquationView:108 | `**F.W4**` — seat-ratified NEW missed row; `.info-hovercard` at `--z-modal` (140) where `--z-hovercard` (120) exists; `R2-r2` folds → banked `M-ZM`. SP-6's "two-way z-rung pass" **is this row's content carried under another id** — mechanism survives, identity does not (anti-rename) |
| 24 | `I-3` | fr-EquationView:125 | `**F.W4**` — the trust cure-constraint (`trust: true` at EquationResult is LOAD-BEARING; backend authors `\htmlClass` at `latex_rendering :159/:175-176/:216/:248`). §6.1 carries the *conclusion* (`FR-EQR-15's trust:false/naive handler (deletes the feature)`) but not the id or its `:248` extension |
| 25 | `I-4` | fr-EquationView:126 | rides intake R5-7's standing F.W4 carry; mechanism lives in §0 BS-1, id absent |
| 26 | `CP-33` | fr-ContourPreview:66 | `ADJUDICATED → **F.W4** (row 40's extraction)` — the ONE ContourPreview row of 25 whose id resolves nowhere; its fold target `CP-ROW-40` **is** booked, so the cure lands |

### B.2 · CARRY→SPEC DROPS — in the ledger the spec declares it consumes WHOLE, absent from the spec (3)

| # | id | record:line | what was lost |
|---|---|---|---|
| 27 | `FR-AH-24` | fr-AppHeader:82 | `**F.W1 fold** … — the colocation re-export can die in F.W4 independently`. The F.W4 leg is covered *by mechanism* inside `FR-AH-7`'s ⊘ CURE-COMPLETENESS (`strike :21-27 AND the :29 barrel re-export`) but the id is gone |
| 28 | `SS-C-7` | fr-SpeedSelect:24 | carried in F-W4-CARRY as `AC-C-2 ⟨AnimationControls C-2; corroborated fr-SpeedSelect SS-C-7⟩`. The spec books `AC-C-2` and **drops the corroborating witness id** — M-25 requires a row banked in N records to appear ONCE *citing all witnesses* |
| 29 | `FR-USB-19` | fr-UserSlugBar:59 | carried in F-W4-CARRY as `FR-AUL-41 … **Cohort: FR-AFP-34, FR-USB-19, D/m-17**`. Spec books `FR-AUL-41 (divergent title/aria doubling)` and **drops the whole cohort list** |

### B.3 · FOLD-IDENTITY ESCAPES — target booked, but neither the source id nor the fold is named anywhere in the spec (24)

The task's permitted third form is a *named* fold-identity. These 24 are unnamed. The cure lands (every target is booked), so severity is bounded — but §6.4 declares the fold register complete at **"(12)"**, and the true count for this wave is **≥36**. The register is materially incomplete against its own claim.

| record | escaped source ids | fold target (booked in spec?) |
|---|---|---|
| fr-HarmonicLevelGrid | `HLG-1` `HLG-4` `HLG-10` `HLG-14` `HLG-17` `HLG-19` `HLG-21` `HLG-22` `HLG-23` `HLG-27` `HLG-28` `HLG-30` | `FMD-1`✔ `FMD-17`✔ `FMD-10/FM-3`✔ `FMD-25`✔ `FMD-31`✔ `FMD-29`✔ `FMD-33`✔ `FMD-N6`✔ `N-14/N-15/FR-AH-1`✔ `N-15 via FMD-24`✔ `FMD-26→FR-AH-53`✔ `FMD-22 + FR-COB-12`✔ |
| fr-MorphPhaseConfig | `MPC-1` `MPC-4` `MPC-6` `MPC-12` `MPC-15` `MPC-18` `MPC-20` | `FMD-4`✔ `FMD-14`✔ `FMD-19`✔ `FMD-25`✔ `FMD-31`✔ `FMD-26+FMD-33`✔ `FMD-8`✔ |
| fr-FourierMorphDemo | `FMD-20` `FMD-24` | `FR-AH-7`✔ · `N-14+N-15+FR-AH-1`✔ |
| fr-GalleryCardModal | `GCM-19` | `FR-AH-2`✔ |
| fr-GalleryFeaturedCarousel | `FOLD-1` | `FR-AH-2`✔ |
| fr-GallerySearchBar | `FR-GSB-11f` | `AA-21`✔ |

**Note (identity discipline, contra-evidence for the defence)**: §6.4 *does* name 12 folds of exactly this class (`AA-48`, `FR-AFP-39 = AA-29`, `FR-AUL-54 → §0 BS-1`, `FR-AUL-57 = AA-38`, `HLG-36 → DMT N-16`, `HLG-38 → AA-39`, `HLG-39 → PV C-08`, `HLG-44 → SP-19`, `EXM-N-16-instance`, `GIG-D-1-residue`, `FR-CS-i1`, `FR-AFP-50`). Four of them are HLG rows. Naming four HLG folds and omitting twelve more from the same record is an inconsistency, not a policy.

### B.4 · FALSE-ESCAPE REGISTER (dismissed after byte-verification — recorded so pass 2 does not re-file them)

`FR-AH-25/-27/-28/-32/-34/-35/-36/-39..-43/-46/-48/-51/-52/-54` (16) — booked by §2.F's **dotted elision** `FR-AH-19 · -23 · -25 · -26 · -27 · -28 · -32 · -34 · -35 · -36 · -39..-43 · -46 · -48 · -49 · -51 · -52 · -54 (MINOR/INFO sweep as booked…)`, each with its own parenthetical cure. · `EV L·m-2/-3/-5/-7/-11/-12/-13` + `D·D-m2` (8) — booked by `EV-L·m-1 ⊕ m-2 ⊕ m-3 ⊕ m-5 ⊕ m-7 ⊕ m-10 ⊕ m-11 ⊕ m-12 ⊕ m-13 ⊕ I-1 ⊕ I-6` and `EV-D·D-M13/m2/C·D-13`. · `SS-L-05/-07/-09`, `SS-D-01..-08` — booked; my first expander normalised the zero-pad away. · `SS-C-1` — terminal routing is `**F.W5-W8**`, NOT F.W4; excluded from the denominator. · `HLG-1` appears twice in the record (row + `r2-LC severity label`); counted once. · `CP-2..CP-42` (24 of 25) — booked under the record's `CP-N` scheme. · `FR-NP-32` — **booked** at §2.H (`fresh-build repro BLOCKED behind FR-NP-32`); the corrupt-dist gate itself is at §5.1(1) under `fr-PaperSidebar M1`.

---

## §C — AXIS 2 · NO INVENTION / M-25 DEPTH

**Anti-rename**: every one of the 910 booked rows traces to a banked id. **Zero inventions found** — no id in the spec fails to resolve to a registry or carry row. Spot-audited the six spine sections and all ten §3 decisions.

**Named locks, where their rows land — all CARRIED, not merely cited:**

| lock | required | found | verdict |
|---|---|---|---|
| fr-PaperSearchModal same-commit riders | PSM-4/-12/-13 inseparable from PSM-1 | §5.1(3) `PSM-1 ⇢ PSM-13 + PSM-4 + PSM-12 (none schedulable apart from the colocation commit)`; SP-3 `PSM-4+PSM-12 (⊘ same-commit riders on PSM-1)`; SP-5 `PSM-13 (⊘ same-commit rider on PSM-1 — the repair arms the defect)` | **CARRIED ×3** |
| PAW-44 / LAW-3 | verbatim sequencing | §3 D4 (`⊘ LAW-3 verbatim: overflow-x: clip … BUT restoration lands WITH-OR-AFTER PAW-1's header-background cure + PAW-30's bleed handling, NEVER before`) + §5.1(3) restatement + the design dissent held OPEN under BOTH outcomes | **CARRIED, verbatim, with the dissent** |
| MPC-31 one-cut law | verbatim | SP-3 `MPC-31 (see §5 ONE-CUT)`; §5.1(3) `MPC-31 one-cut (MPC-3⊕10⊕13⊕8⊕22; witness at a non-boot state)`; §5.1(2) `MPC-31's one-cut spans F.W1+F.W4`; §6.1 kills the rename-only token cure | **CARRIED ×4** |
| FR-MSP-6 two-channel lock | void-cure | §5.1(3) `FR-MSP-6 two-channel lock`; §6.1 `FR-MSP-6's prescribed plate-promotion (void, net regression)`; §0a `MorphPhaseConfig plate-only D-2 cure KILLED — see FR-MSP-6 lock (K-13)` | **CARRIED ×3** |
| FR-NP-32 corrupt-dist sequencing gate | blocks the FR-NP-8 repro; F.W1 opens on a red build | §2.H `**the missing @reference: 19 unguarded color-mix across 7 SFCs — fresh-build repro BLOCKED behind FR-NP-32**`; §5.1(1) puts the corrupt `dist/styles/index.css` under **F.W0 FIRST** | **CARRIED** — but attributed at §5.1(1) to `fr-PaperSidebar M1`, not to FR-NP-32, which is the record's own ★NEW BLOCKER reproduced with the app's own toolchain (LOW anti-rename smell; identity survives via §2.H) |
| F.W3's four named anti-cures | not contradicted here | §6.1's 19 ⊘ dead cure shapes include the F.W3-adjacent ones (`AA-40 HoverCard trap`, `FR-AFP-58 [data-allow-motion]`, `CP KILL-6`); §5.2 →F.W3 carries the naming leg explicitly | **NO CONTRADICTION** |
| F.W4 derivation-law preamble | binding, before any count | §0 BS-1..BS-4 + loop-source provenance + disclosure-state gate + corrected denominators + repair-unit sizing + evidence standard + strike-at-agglomeration; `no percentage publishes before this`; §5.1(1) `F.W4 quotes NO census percentage until these land` | **PRESENT and load-bearing** |
| F.W4 NEGATIVE ROSTER | proven negatives cited not re-derived | §0a, 22 rows, each with a witness; enforced by `G-F4-NEG-ROSTER`; re-stated at §6.2 | **PRESENT, gated** |

**Dissents carried (sampled, all found)**: `FR-EQR DISSENT-1` (§0 repair-unit sizing, with the ESCALATE trigger) · `AA-3` w2 MAJOR demotion (SP-3) · `GV-L-5` DEMOTED-MINOR with both readers' MAJOR in DISSENT (SP-1) · `AC-D-2` LC BLOCKER dissent (SP-3) · `FR-AH-5` reader-2 BLOCKER dissent (SP-3) · `FR-AFP-5` reader-α BLOCKER dissent (SP-5) · `FR-AUL-33` LC MAJOR dissent (SP-7) · `MPC-12` reader-2 MAJOR preserved · D1/D2 minority positions (§3).

---

## §D — AXIS 3 · GATES (18, all born-RED, witnesses verified against the live trees)

Every witness was independently re-derived. **Every command and path resolves.** Receipts:

| gate | witness claim | verification |
|---|---|---|
| G-F4-VITEST | `web/` scripts are exactly `dev/build/preview/test:e2e/test:e2e:ui`; no vitest/jest; zero `*.test.ts`/`*.spec.ts` under `src` | `web/package.json` scripts = **exactly those five**; `grep -c 'vitest\|jest'` = **0**; `find web/src -name '*.test.ts' -o -name '*.spec.ts'` = **0** ✔ |
| G-F4-NO-UNUSED | tsconfig has 13 compilerOptions keys, no `noUnusedLocals`; no ESLint config anywhere in `web/` | **13 keys**, `noUnusedLocals` **absent**; `ls web/ | grep -i eslint` = **0** ✔ |
| G-F4-ADMIN-AXE | `grep -rln "admin" web/e2e/` → **zero files** | reproduced: **0** ✔ |
| G-F4-A11Y-ROUTE | axe drives `/visualize` + `/v/{slug}` ONLY — 7 checkA11y sites; AxeBuilder ×2 | **exactly 7** invocations (4 in `visualization-ux.spec.ts` :114/:146/:163/:201 + 3 in `visualization-crud.spec.ts` :529/:636/:659), **exactly 2** `new AxeBuilder({ page })` (both inside local helpers) ✔ |
| G-F4-OCCLUSION | `App.vue:24/:26` force `scrollWidth − clientWidth = 0` | `:24` = `h-dvh flex flex-col … overflow-hidden`; `:26` = `<main class="flex-1 min-h-0 flex flex-col overflow-y-auto">` ✔ |
| G-F4-DEAD-DEP | `search/index.ts` zero consumers; `CanvasOverlayButton.vue` zero consumers (**delete AFTER restoration, never before**) | both files exist (`web/src/components/paper/search/index.ts`, `web/src/components/visualization/CanvasOverlayButton.vue`) ✔ |
| G-F4-VUE-TSC-CLEAN | `npm run build` already runs `vue-tsc -b`, so the witness exists without new tooling | `build` = `vue-tsc -b && vite build` ✔ |
| G-F4-CENSUS-CELLS | `raw-findings.json:1393` (DMT PRM-compliant — false) · `:2968` (`is-active` no backing paint — false) · `lane-frontend.md:617` (smooth-scroll opt-out — false) | `:1393` = the no-`prefers-reduced-motion` grep cell ✔ · `:2968` = the `DockIconButton` no-selected-register cell ✔ · `lane-frontend.md:617` = `| JS gate | paper/PaperView.vue:176 | window.matchMedia?.(…) — smooth-scroll opt-out |` ✔ |
| G-F4-DECISIONS | `DECISIONS-F.W4.md` — *"None exist today"* | `find docs -name 'DECISIONS-F*'` = **empty**. Correctly declared as to-be-created, with a path. ✔ |
| G-F4-CARRY-CLOSURE | 421 rows in the CARRY | **421** bullet-ids counted ✔ |
| G-F4-KATEX-QUIET | `strict` defaults `"warn"`; `\html*` calls `reportNonstrict("htmlExtension")` before the trust check | claim is self-labelled "confirmed by execution in node" — an execution receipt, not a script shipped as proof. Not re-run this pass; no contrivance surface. ✔ |

**L-19 (proof-scripts presumed contrivance)**: no gate ships a bespoke proof script. The two closest — `G-F4-CARRY-CLOSURE` (an id set-difference) and `G-F4-CONTRAST-FLOOR` (an executable re-derivation harness) — are *doc-conformance* and *measurement* instruments respectively, both stated as to-be-built with their RED state named today. **No convictable contrivance.** `G-F4-CONTRAST-FLOOR`'s witness list is 15 thrice-derived ratio pairs, every one traceable to a banked row.

**Anchor/authority path defect (see §F, D-3)**: the §Authority line reads `docs/tranches/X/COHESION.md …` then, unrooted, `formation/fourier/CENSUS-2026-08-03.md:193-195` and `audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md`. Resolved under the X root just established, **both are phantoms** — `docs/tranches/X/formation/` does not exist. Both files live under `docs/tranches/V/megatranche/`. Content verified correct once re-rooted: `:193-195` is verbatim the F.W4 charter item; `:362` is the F.W4 exhaustiveness row the spec cites at §0 and G-F4-CENSUS-CELLS.

---

## §E — AXIS 4 · E-3 + STATUS

| requirement | measurement | verdict |
|---|---|---|
| zero VERIFIED stamps | `grep -oc 'VERIFIED'` = **0** | **PASS** |
| status planned everywhere | header `**Status: planned**`; `(all \`planned\`)` at §2; `All \`planned\`.` at §3; `all born-RED` at §4; footer `every unit, decision, and gate above is \`planned\`` | **PASS** |
| no execution verbs in current voice | regex over `we (landed\|shipped\|fixed\|added\|deleted\|ran)`, `has been (fixed\|landed\|cured)`, `now (passes\|green)`, `is (now) (GREEN\|fixed)` = **0 hits** | **PASS** |
| the spec opens no product source | no edit is described as taken; §1 is explicitly `declared surface, not an edit list` | **PASS** |
| fourier tree READ-ONLY in every witness | 3 assertions: header (`READ-ONLY until the owner's begin-word`), §1 (`tree READ-ONLY at this stage`), footer (`stays READ-ONLY; the wave awaits the owner's begin-word`). This pass's own probes of `/Users/mkbabb/Programming/fourier-analysis` were reads only | **PASS** |

**E-3 (addenda-not-patch) is clean.** The `⟨M-23 twice-authored; draft-A structure carried whole; draft-B grafts: …⟩` provenance line is an addendum record, exactly the required shape.

---

## §F — AXIS 5 · POSTURE

| axis | finding |
|---|---|
| **F.W1 ONE atomic land-or-lose transaction** | **DEFECTIVE — see D-1.** F-W4 defines F.W1's atomic set **twice**, identically, as exactly three limbs (`producer bump + 162-site prop rewrite + copied→status triple`) — at §5.1(2) and inside `G-F4-ZERO-CONSOLE`. F-W1's own headline puts **more** inside the same transaction: `+ the lucide-vue-next→@lucide/vue rename + the pencil-boil floor correction`, plus the **vaul-vue manifest gate** (5 hits in F-W1), the **RE-PIN act at the adopted commit hash** (4 hits), and the **P0 CSS-class census** (2 hits). F-W4 mentions **none** of those five: `grep -oE 'vaul-vue\|RE-PIN\|CSS-class census' F-W4.md` = **0**. A downstream spec that twice enumerates the atomic set short licenses the omitted limbs to land separately. |
| **F.W1 pin presumption** | **DEFECTIVE — see D-2.** F-W1 is `glass-ui 4→7(→8, **G1-gated**)`, opening only `after … ESC-1 ruled (G1)`. F-W4 asserts 8.0.0 behaviour as settled substrate **8 times** (`8.0.0 CURES`, `dead at 8.0.0`, `LabeledSelect removed at 8.0.0`, `re-author against the 8.0.0 single register`, `the 8.0.0 loading posture is the seat`, `8.0.0 compact`, …) and mentions `ESC-1`/`G1` **zero times**. Cures whose *shape* depends on an unruled escalation (SP-9's `SS-D-01/SS-L-04` "fix CANNOT be `size` props — dead at 8.0.0"; `MPC-32`; the GAB abbreviating formatter) are written as decided. |
| **F.W0 pre-gates precede everything** | **PASS.** §5.1(1) `F.W0 FIRST` enumerates eight substrate pre-gates and closes with the binding `**F.W4 quotes NO census percentage until these land.**` §0 marks `⟨FR-NP-2, F.W0-owned, binding here⟩`. |
| **F.W0's anchor re-resolution table is what later waves quote** | **SOFT MISS.** F-W4 owns `G-F4-ANCHORS` and §0's D-19 rule with its own five anchor kills, but never points at F.W0's table (F-W0 carries an `ANCHOR`/re-resolve block at `:124`). The two anchor authorities are stated in parallel rather than one quoting the other — a divergence risk, not a drop. |
| **SS-4 waves (F.W5..F.W8) flag owner rulings INLINE, never presume them** | **PASS, and exemplary where it binds.** §3 `D9 · PS-L-4 (+M6) — **OWNER-GATED**, escalated at F.W1 … ⊘ F.W4 EXECUTES the collapse … ONLY after the ruling. **Unauthorable unruled.**` §5.2 →F.W5–W8 carries `⊘ **SS-4 FLAGS its owner rulings INLINE (trie-vs-KISS et al.) and NAMES the TA-4 value-side atomdiff restoration as prerequisite or re-scopes explicitly.**` §3's preamble: `A cluster that depends on a decision does not open until it is ruled`. |
| **F.W10's SPLIT gate stays honestly split** | **PASS.** §5.2 →F.W9/W10: `⊘ harness before rider, flag before split (PAW-49/PAW-50)`; `G-F4-VITEST` carries `⊘ PAW-50: harness lands BEFORE PAW-12's rider has anywhere to live`. No F.W10 work is claimed here. |
| **Glass-producer rows never become frontend hacks** | **PASS.** §5.1(6) states the law; §5.2's GLASS-RELAY edge routes 25 producer asks to the standing BH inbox. |

---

## §G — DEFECT REGISTER (ranked)

- **D-1 · HIGH · Posture (F.W1 atomicity).** F-W4 twice defines F.W1's land-or-lose transaction as three limbs, omitting the lucide rename, the pencil-boil floor correction, the vaul-vue manifest gate, the RE-PIN-at-adopted-commit act, and the P0 CSS-class census. Receipt: `grep -oE 'vaul-vue|RE-PIN|CSS-class census' F-W4.md` → **0**, against 5/4/2 hits in `F-W1.md`; F-W4 §5.1(2) and G-F4-ZERO-CONSOLE both read `producer bump + 162-site prop rewrite + copied→status triple`.
- **D-2 · HIGH · Posture (unruled-escalation presumption).** 8.0.0 asserted as binding substrate 8× with `ESC-1`/`G1` mentioned 0×, while F-W1 opens only `after … ESC-1 ruled (G1)` and pins `4→7(→8, G1-gated)`.
- **D-3 · HIGH · Census (registry→spec escapes, 26 hard).** `FR-EQR-18/-20/-22/-23/-28`, `★MF-4/-5/-6`, `INFO-3`, `FM-4..FM-11/-13/-14/-15` (11), `FR-USB-18`'s F.W4 leg, `FR-IC-17`, `M-ZM`, `I-3`, `I-4`, `CP-33` — terminal `F.W4` in the registry, absent from the spec and from both in-tree carries. Sharpest: **`FM-4..FM-16` — 13 adjudicated MINORs banded into one registry row; the spec's entire `FM-` roster carries only `FM-12` and `FM-16` of them, and `FM-14`'s `F.W3/W4` split dies with the other ten.**
- **D-4 · HIGH · Gate blindness (the closure gate cannot see its own defect class).** `G-F4-CARRY-CLOSURE` diffs **CARRY→spec** only ("set-difference empty in the CARRY→spec direction"). That direction is **421/421 CLEAN** — and every one of the 53 escapes is in the **registry→CARRY** direction, which no gate in §4 measures. The gate is green on a wave that dropped 53 rows.
- **D-5 · MEDIUM · §6 exclusion register incomplete against its own count.** §6.4 declares `Folds recorded, never re-booked — identity discipline **(12)**`. This pass found **≥36** F.W4-routed folds of that exact class; 24 are unnamed anywhere in the spec (12 HLG · 7 MPC · `FMD-20` · `FMD-24` · `GCM-19` · `FOLD-1` · `FR-GSB-11f`). Four HLG folds *are* named (`HLG-36/-38/-39/-44`), which makes the omission an inconsistency rather than a policy.
- **D-6 · MEDIUM · Carry→spec drops (3) despite "consumed WHOLE".** `FR-AH-24` (F.W4 colocation-re-export leg; mechanism survives inside FR-AH-7, id does not) · `SS-C-7` (AC-C-2's corroborating witness id dropped — M-25 requires all witnesses cited) · `FR-USB-19` (FR-AUL-41's cohort list `FR-AFP-34, FR-USB-19, D/m-17` dropped whole).
- **D-7 · LOW · Authority paths resolve to phantoms as written.** `formation/fourier/CENSUS-2026-08-03.md:193-195` and `audit/codex-provenance/INTAKE-ADJUDICATION-2026-08-03.md` are unrooted after an `docs/tranches/X/…` citation; `docs/tranches/X/formation/` does not exist. Both live under `docs/tranches/V/megatranche/`. Content verified correct once re-rooted.
- **D-8 · LOW · Anti-rename smell at the corrupt-dist gate.** §5.1(1) attributes glass-ui 4.0.0's syntactically corrupt `dist/styles/index.css` to `fr-PaperSidebar M1`; the record that reproduced it with the app's own toolchain and books it BLOCKER is `FR-NP-32` (`F.W1 SEQUENCING GATE`). FR-NP-32 is named at §2.H, so identity survives — but the gate itself is cited under the other id.
- **D-9 · LOW · F.W0 anchor authority not quoted.** F-W4 states its own D-19 anchor law and `G-F4-ANCHORS` in parallel with F-W0's re-resolution block rather than quoting it, per the posture axis's "its anchor re-resolution table is what later waves quote".

---

## §H — WHAT THE SPEC DOES WELL (recorded so pass 2 does not regress it)

The CARRY→spec direction is **421/421** — genuinely whole, including the ⊘ locks, the ⇢ same-commit riders, the preserved dissents, and the prose-named laws (`CS-i-7` tally law, `SC-L-§R` scope law, `PAW-44/LAW-3`, `MPC-31` one-cut, `FR-MSP-6` two-channel, `FSE-L-B1` DO-NOT-REGENERATE). All 18 gates carry witnesses that this pass independently reproduced against the live trees — **zero phantom scripts, zero phantom paths, zero fabricated counts** (the 7-checkA11y / 2-AxeBuilder / 13-tsconfig-key / five-script figures are exact to the byte). E-3 and the status axis are clean without qualification. §3's D9 is a model of the owner-ruling posture. **The wave's defect is not invention or contrivance — it is a one-directional closure gate that cannot see the direction in which its own rows were lost.**

---

**VERDICT (local): DEFECTIVE.** 963 routed · 910 booked · **53 escaped** · 9 defects (4 HIGH · 2 MEDIUM · 3 LOW).
**Minimum repair for pass 2**: (a) re-run the closure diff in the **registry→spec** direction and home the 26 hard escapes; (b) restate F.W1's atomic set completely, or cite F-W1 §State rather than re-enumerate; (c) gate every 8.0.0 assertion on ESC-1/G1; (d) correct §6.4's fold count and name the 24; (e) restore the three carry drops; (f) re-root the two Authority paths.
