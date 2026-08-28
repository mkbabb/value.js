# F-W3 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 2)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W3.md` (503 lines, 20 gates, 6 units, §X.1 = 59 handover rows)
**Corpus authority**: the 66 `fr-*.md` adjudicated records at `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/` · the ONLY in-tree carries `carry/F-W1-CARRY.md` + `carry/F-W4-CARRY.md` (`ls docs/tranches/X/fourier/carry/`, this seat's read 2026-08-28)
**Seat**: FRESH adversarial checker, pass 2. Re-derived from the bytes; PASS-1's counts and the RULINGS' coordinates were re-measured, never inherited. Read-only against `/Users/mkbabb/Programming/fourier-analysis` (grep / `wc` / `ls` / `git status` only). Sole write = this file.
**Verdict**: **DEFECTIVE** — the repaired spec cures PASS-1's table-row escapes but its closure roster is **format-blind**: 691 route-marked bullet rows across 36 records were never in g19's operand. True routed total **1008** across **62** records; **205 id-keyed escapes**, **103 of them homed in no X·F document at all**. Four F-W0 authority coordinates have drifted; §5a's disjointness proof is false against §1's own cluster map.

---

## §0 Method (id-keyed, format-agnostic, dash-agnostic)

1. **Detector law (both dashes, as instructed).** The routing token is matched as `F\.W3(?![0-9])` **and** as any span `F\.W([0-9])[–-]W([0-9])` covering 3 — **both U+002D and U+2013**.
   **Receipt — the en-dash arm returns ∅ for W3 and this is a finding, not an omission**: `grep -rhoE 'F\.W[0-9]+[–-]W[0-9]+' fr-*.md | sort | uniq -c` → **`120 F.W5-W8` · `72 F.W5–W8` and nothing else**. No `F.W3–W4` / `F.W1–W3` span exists in the corpus in either spelling, so the R-6 blindness class does not bite on W3 through the *dash* axis. It bites through a different axis — see D-1.
2. **Row unit.** A *row* is a markdown table row (non-separator) **or** a top-level bullet whose head is a bolded id — the two shapes the 66 records actually use. ~30 records are bullet-format for their defect rosters (`fr-App`, `fr-BasisCanvas`, `fr-ContourSettings`, `fr-CoefficientsSpectrum`, `fr-MobileFloatingToc`, `fr-SvgFilters`, …).
3. **Routed.** A table row is routed iff its **terminal (routing) cell** carries the token. A bullet row is routed iff the token appears in a routing context (`→`, `**ADJUDICATED →**`, `⇒`, `rides`, `routed`, or bold-emphasised at a disposition).
4. **Booked.** Boundary-exact `(?<![A-Za-z0-9-])ID(?![A-Za-z0-9-])` against `F-W3.md`, over ids atomised from cell 1 / bullet head (split on `/ = ≡ ⊕ ∘ , +`, grade tails and parentheticals stripped).
5. **Escaped** ids are re-tested against `F-W0/F-W1/F-W2/F-W4..F-W10` + both carries to separate *routed-away* from *nowhere in X·F*.

Reproduction: `/private/tmp/.../scratchpad/w3seat/{c1.py,c3.py}` (66-file walk, both detectors).

---

## §1 THE CENSUS (re-derived)

| measure | this seat | the spec's operand (PASS-1 §3, re-based at §0/g19/§Z) |
|---|---|---|
| routed rows — **table-terminal-cell only** | **317** across **37** records | **317 across 37** — reproduces EXACTLY |
| routed rows — **route-marked bullets** | **691** across **36** records | **0 — outside the roster by construction** |
| **routedTotal (both formats)** | **1008** across **62** records | 317 |
| booked in `F-W3.md` (boundary-exact) | **772** | 246 |
| **escaped** (id-keyed) | **205** (183 bullet · 22 table) | 71 |
| escaped **and homed in NO X·F document** | **103** | 23 |
| rows whose head yields no atomic id (untraceable either way) | 31 | — |
| dual-routed `F.W3/W4` rows in corpus | **844** | — (§X.1 names 59) |
| sole-`F.W3` rows in corpus | **164** | — |

The 317/37 reproduction is the load-bearing receipt: **PASS-1's roster is real and correctly measured — for the shape it measured.** The defect is the shape.

### §1a Escapes by record (205 / 103-with-no-home)

| record | escapes | of which nowhere in X·F |
|---|---|---|
| `fr-BasisCanvas.md` | 23 | 17 |
| `fr-ContourEditorCanvas.md` | 18 | 9 |
| `fr-FrequencyGraph.md` | 13 | 11 |
| `fr-GalleryView.md` | 13 | 6 |
| `fr-PaperSearchDropdown.md` | 13 | 9 |
| `fr-CoefficientsPanel.md` | 11 | 7 |
| `fr-GalleryCardModal.md` | 11 | 7 |
| `fr-GalleryCard.md` | 10 | 10 |
| `fr-VisualizationView.md` | 9 | 4 |
| `fr-CoefficientsSpectrum.md` | 8 | 0 |
| `fr-PaperSearchInput.md` | 8 | 3 |
| `fr-App.md` | 7 | 4 |
| `fr-ContourSettings.md` | 6 | 1 |
| `fr-PaperSearchModal.md` | 6 | 1 |
| `fr-AdminFlaggedPanel.md` | 5 | 0 |
| `fr-BasisSelector.md` | 5 | 2 |
| `fr-GallerySearchBar.md` | 5 | 1 |
| `fr-SliderControl.md` | 5 | 0 |
| `fr-GalleryDraftsSection.md` | 4 | 0 |
| `fr-MobileFloatingToc.md` | 4 | 0 |
| `fr-PaperArticleWindow.md` | 4 | 3 |
| `fr-GalleryMarquee.md` | 3 | 3 |
| `fr-PaperSearch.md` | 3 | 2 |
| `fr-SvgFilters.md` | 3 | 0 |
| `fr-EquationModeToggle.md` | 2 | 0 |
| 6 records × 1 (`fr-ConvergenceTimeline` · `fr-FullscreenViewer` · `fr-GalleryAdminBanner` · `fr-GalleryInfiniteGrid` · `fr-InfoCard` · `fr-MorphPhaseConfig`) | 6 | 3 |

---

## §2 DEFECTS (ranked)

### D-1 — CRITICAL · the closure roster is FORMAT-BLIND; 691 routed rows (36 records) were never in g19's operand

g19 names its left-hand set as *"`conformance/PASS-1/F-W3-CHECK.md` §3 — the id-keyed census of **317 F.W3-routed rows across 37 records**"*, and §0's ▲ block calls that roster *"id-keyed, boundary-exact"* and §Z calls it *"the roster of record."* PASS-1's own §0 method states the shape: *"Every line in all 66 `fr-*.md` records that is a **markdown table row** whose terminal (routing) cell names `F.W3`."*

Receipt (this seat, both detectors run over the same 66 files):

```
table-terminal-cell rows : 317   records 37     <- reproduces PASS-1 EXACTLY
route-marked bullet rows : 691   records 36     <- outside the roster entirely
routed total             : 1008  records 62
```

The bullet shape is not exotic — it is how ~30 records carry their defect rosters. Examples, verbatim tails:

- `fr-App.md:49` — `- **M-2 — MAJOR.** No skip link; <main> … **→ F.W3/W4.**`
- `fr-BasisCanvas.md:51` — `- **D-8 / BC-25 — MAJOR …** **ADJUDICATED → F.W3/W4** (copy the in-tree JS idiom…)`
- `fr-ContourEditorCanvas.md:64` — `- **D/M-4 — MAJOR.** … **ADJUDICATED → F.W3/W4** (one-word fix + a real selection channel).`
- `fr-CoefficientsSpectrum.md:64` — `- **M-12 …** **→ F.W3/W4** (the normalization decision…)`

This is the **same defect class R-6 ruled for F.W6's en-dash blindness** — a census idiom structurally blind to a spelling the corpus actually uses — transposed from the dash axis to the row-shape axis. Consequence: **g19's (→) direction can be reported GREEN while 68.5% of the corpus's F.W3-routed rows were never tested.** A gate that is only runnable over 31.5% of its subject is not a closure gate. Cure shape (by analogy to R-6): re-base g19's L1 on a **shape-agnostic** roster — table rows ⊕ id-headed bullets — and re-run the set-difference over 1008.

### D-2 — CRITICAL · 205 routed rows escape by bytes; 103 are homed in NO X·F document, refuting §X/§Z's per-id promise

§X row 405 states the promise: *"each named at its row with its trigger — **and the promise is now KEPT PER ID in §X.1**, which enumerates **every** F.W3/W4-routed banked id this spec hands over."* §Z restates it as a re-denominated closure.

By bytes it is unkept. Sampled escapes, each `grep -c` in `F-W3.md` → **0** and `grep -rl` over `waves/` + `carry/` → **NONE**:

| banked id | home record:line | routing cell (verbatim tail) |
|---|---|---|
| `MG-α` | `fr-App.md:58` | scroll position never restored — `**→ F.W3/W4.**` |
| `MG-ε` | `fr-App.md:78` | AppHeader `sticky top-` treatment — `**→ F.W3/W4.**` |
| `MG-η` | `fr-App.md:80` | `aria-current` appears nowhere — `**→ F.W3/W4.**` |
| `FR-PS-Z` | `fr-PaperSearch.md:40` | Z-token altitude error — `**F.W3/W4**` (rung assignment is spec input) |
| `FR-PS-HL` | `fr-PaperSearch.md:41` | two query sources in one render — `**F.W3/W4.**` |
| `MISS-DU1` | `fr-PaperSearchInput.md:75` | field grows / `icon-sm` swap — `**F.W3/W4.**` |
| `MISS-DU3` | `fr-PaperSearchInput.md:77` | CONTAINER-scoped overflow — `**F.W3/W4** gate design` |
| `MISS-DU4` | `fr-PaperSearchInput.md:78` | pointer-inert chrome — `**F.W3/W4.**` |
| `PSM-40` | `fr-PaperSearchModal.md:82` | enter-transition duration disagreement — `**→ F.W3/W4**` |
| `MAJ-5` | `fr-VisualizationView.md:59` | `v-model` over zero `defineEmits` — `→ **F.W3/W4**` |
| `MAJ-7` | `fr-VisualizationView.md:61` | one failed save, two toasts — `→ **F.W3/W4**` |
| `FR-IC-16` | `fr-InfoCard.md:48` | the craft tail — `MINOR — → F.W3/W4` |
| `FR-GSB-30` | `fr-GallerySearchBar.md:70` | MINOR band — `→ F.W3/W4` |

Five of the thirteen sit in files **F.W3 itself owns** (`paper/PaperSearch.vue` + `paper/search/**` are `.c`'s; `VisualizationView.vue`, `InfoCard.vue`, `GallerySearchBar.vue` are `.e`'s), so they are not F.W4 hand-offs at all — they are rows a unit will open the file for and not know exist. `L-26` (`fr-VisualizationView.md:91`) is the control: it escapes F-W3 but IS held at `F-W4.md` + `F-W4-CARRY.md`, which is what a correct hand-off looks like.

### D-3 — MAJOR · four F-W0 authority coordinates are DRIFTED at the bytes (g17 ×3, S-1 ×4, g6 ×1)

The spec's published-once quotation block (S-1) and g17/g6 cite F.W0 by line. Live bytes (this seat's `sed -n 'Np'`, 2026-08-28):

| cited as | what the byte actually is | where the authority really lives |
|---|---|---|
| `F-W0.md:199` = G-11 | **blank line** | `F-W0.md:211` — `### G-11 — ONE corrected anchor table published; every later wave quotes it` |
| `F-W0.md:204` = G-12 | `**Owning rows**: 18, 17, 19.` | `F-W0.md:216` — `### G-12 — …` |
| `F-W0.md:209` = G-13 | `**Owning rows**: 3, 4, 26.` | `F-W0.md:221` — `### G-13 — …` |
| `F-W0.md:63` = SUBSTRATE-LEDGER create-marker | the `fourier/CLAUDE.md` bounds row (*"**create** — measured ABSENT 2026-08-28"*) | `F-W0.md:65` — the `fourier/docs/tranches/F/SUBSTRATE-LEDGER.md` create row |

The **quoted words are verbatim-correct** at their true homes, so this is R-1f class (mis-keyed coordinate on a real authority), not R-1 fabrication — but it is load-bearing twice over: **g6's** RED cell instructs the opening seat to read the pin table *"from F.W0's G-13 pin table"* at `:209`, and **g17's** GREEN condition (1) is *"the corrected aggregate exists as a row of F.W0's G-12 denominator table"* at `:204`. Both send the seat to an `**Owning rows**` line. Provenance is understandable — `RULINGS.md` R-9 published those coordinates and `F-W0.md` was itself amended in repair round 1 (its amendment minute is at `F-W0.md:9`) — but R-1f's own law ("a repair seat that finds a ruling's coordinate stale **re-measures** and applies the ruling's LAW to the live bytes") was not applied.

### D-4 — MAJOR · §5a's disjointness proof is FALSE against §1's own cluster map: g9/g11 force `.e` into `.a`/`.c`/`.d` files

§5a opens *"No two units share a `modify` path"* and declares exactly **three** sequenced shares (`stores/animation.ts` `.a`→`.b`; `MorphPhaseConfig.vue` `.a`→`.b`; `e2e/**` `.a`→`.d`). §1's cluster column and the gate witnesses contradict it:

| file | §1 clusters | §5a / §5 unit | but the gate that names it |
|---|---|---|---|
| `components/paper/PaperView.vue` (`F-W3.md:96`) | **D, F** | `.c` (§5a 1c, §5c Files) | **g9** — *"1 prop binding (`PaperView.vue:344`)"*; g9 is **`.e`'s** sub-gate (§5e) |
| `components/visualization/EditorControlsDock.vue` (`:77`) | **G** (tooltip consumer) | `.a` (§5a 1, §5a Files) | **g11** — *"17 icon-only triggers (**Editor ×10** · Canvas ×6 · FunctionInput ×1)"*; g11 is **`.e`'s** |
| `components/equation/ConvergencePlot.vue` (`:88`) | **G** (10th tooltip surface) | `.d` (§5d Files) | **g11**, `.e`'s |
| `components/equation/FunctionInput.vue` (`:85`) | **F, H** (`aria-pressed`; `.is-active`) | `.d` (§5d Files) | **g9 + g11**, `.e`'s |
| `components/shared/CoefficientsSpectrum.vue` (`:92`) | **G, H, I** | `.d` (§5d Files) | **g11**, `.e`'s |

`PaperView.vue:344` is real (`:is-active="isActive"`, this seat's read), so the g9 witness is sound — which is precisely the problem: the gate is `.e`'s and the file is `.c`'s. §5a's own rationale names the failure mode it is committing (*"a shared glob is the hidden conflict the X·V W5-D1 defect taught"*) and its cure sentence (*"The partition is BY FILE, and the file list is the authority"*) does not save it, because the file lists themselves cross. Five undeclared shared files, one of them (`PaperView.vue`) flagged as dual-cluster by §1's own row.

### D-5 — MAJOR · R-9.2 applied to the gate cell only: the struck `v7.0.0` anchor survives in the row that FEEDS g6

g6 (`F-W3.md:274`) states: *"(The `v7.0.0:` spelling this cell carried was a P-4 violation and is struck…)"* — but §C.A's PD-1 row (`:135`) still reads:

> the producer's own **v7.0.0** `Slider.vue:69-78` docblock declares DEAD

`grep -o '7\.0\.0' F-W3.md | wc -l` → **22**. The same anchor is struck in the gate and retained in the carry row that supplies the gate's evidence; a seat re-deriving the cure SHAPE from §C.A (which is exactly what g6's FAIL branch instructs — *"the cure SHAPE re-derives on g6's verdict"*) reads the version string the gate forbids. R-9.2's cure is only half-landed.

### D-6 — MAJOR · `fr-NotationPills.md:23` mis-cited twice for a quote that lives at `:9` — inside the R-10.2 bounds receipt itself

`F-W3.md:54` (§1's binding ▲ block) and `F-W3.md:350` (§5a) both attribute to `:23`:

> `fr-NotationPills.md:23` *"EquationPanel.vue (live at `components/visualization/`)"*

Byte extraction: `fr-NotationPills.md:23` is the FR-NP-10 source-order-tie ruling row (`| 1 | **Is FR-NP-10's source-order tie statically decidable?** | …`) and contains neither `EquationPanel` nor `live at`. The quoted words are at **`:9`** (`… EquationPanel.vue (live at `components/visualization/`) imports NotationPills :9, mounts :96 …`). The companion cite in the same sentence — `:9` for *"live path `components/visualization/gallery/`"* — is **correct** (same line 9). So one of a matched pair drifted. It matters because this is the receipt the spec offers for R-10.2's whole path re-derivation, and §5a repeats it inside the disjointness proof.

*(Everything else in §1 verifies: all 83 bounds paths `ls`-resolve at `/Users/mkbabb/Programming/fourier-analysis` once the in-cell shorthand is expanded; `lib/types.ts:96` = `export type GalleryTier = "featured" | "saved" | "normal";`; `PaperSearch.vue:41` = `<style scoped>`; `web/index.html` exists and the repo-root `index.html` does not.)*

### D-7 — MINOR · §X.1's denominator inherits D-1: 59 handovers named against 844 dual-routed rows

`F.W3/W4` dual-routed rows in the corpus = **844** (sole-`F.W3` = 164). §X.1 names **59** (row count verified: `awk 'NR>=428 && NR<=486 && /^\|/' | wc -l` → 59, matching its own "the remaining 59"). The internal arithmetic 71 = 12 + 59 is sound; the *external* denominator is not, because it is PASS-1's 317. §X's word "**every**" cannot be true at 59/844.

### D-8 — MINOR · g10's "Policy sentence: `W3-button-ledger.md:93`" mis-describes its coordinate

`/Users/mkbabb/Programming/fourier-analysis/docs/tranches/A/audit/W3-button-ledger.md:93` is a per-file ledger **table row**:

```
| `visualization/CanvasOverlayButton.vue:8` | same | `glass` | `icon` | — | naked wrapper component forwarding `active` as `aria-pressed`; `<Button variant="glass" size="icon">` IS the surface | A.W3.b.1 |
```

Topically adjacent, but it is not a policy sentence, and the 152-line file has no wrapper-policy sentence (`grep -in 'policy'` → 0). g10's GREEN check hangs its anti-rule on a cite that does not carry a rule.

### D-9 — MINOR · g17 forbids superseded spellings that are not the bytes' spellings

g17 GREEN(2) requires *"`grep` of the close transcript … returns **0** occurrences of the superseded `~1990` / `2079`."* The bytes at `lane-frontend.md:446` are **`~1 990`** and **`≈ 2 079`** (thin-spaced), and `grep -n '1990' lane-frontend.md` → **0 hits**. The gate's own forbidden-token list cannot match the figures it is trying to forbid.

### D-10 — INFO · F.W1's eleven-limb transaction is never cited by coordinate

`F-W3.md` names it three times as *"the atomic tri-package uplift"* (`:18`, `:295`, §10) and never cites `F-W1.md:276`. R-4b did **not** list F-W3 among its targets, so this is not a ruling breach, and no restatement of the extent occurs (so the transaction is not re-fractured). But "tri-package" names three of eleven limbs, and the citation form the ruling published for every other sibling is absent here.

---

## §3 WHAT VERIFIES (the repair's real work, recorded so it is not re-litigated)

**Authority reality — every quoted registry authority checked at its coordinate, all EXACT:**

| cite in `F-W3.md` | coordinate | verdict |
|---|---|---|
| `LF-1` verbatim + routing `GLASS-RELAY + F.W3 (r1)` | `fr-GlassTimeline.md:65` | ✅ byte-exact, both limbs (§C.A carry + S-5 letter) restored |
| `L-1b` disposition *"F.W3 (dies with L-1); cheapest interim…"* | `fr-AnimationControls.md:75` | ✅ byte-exact |
| EasingPicker **L30** *"The arrival re-homes an entire F.W3 disposition…budget-moving, not color."* | `fr-EasingPicker.md:30` | ✅ byte-exact |
| `MISS-2` *"Same module, opposite polarity … same F.W3 sweep"* | `fr-MorphPhaseConfig.md:30` | ✅ byte-exact |
| `fr-EasingCurvePreview R-4` (`size` INERT; `vector-effect` rider) | `:25` | ✅ byte-exact |
| `fr-EasingCurvePreview R-9` (frame furniture; *"books as D-2's design cause"*) | `:30` | ✅ byte-exact |
| `M-δ` (`@open-auto-focus`; state-dependent first tabbable) | `fr-ExportModal.md:41` | ✅ byte-exact |
| `FR-MSP-11` · `L-15 ⊕ L-18` *"INFO — context records for F.W3"* | `fr-MorphShapePreview.md:103` / `:74` | ✅ byte-exact |
| `FR-NP-32` BLOCKER + *"NO-WAVE-OWNER (producer dist emitter) … F.W1 SEQUENCING GATE"* | `fr-NotationPills.md:35` | ✅ byte-exact; cited **with** `fr-PaperSidebar M1` at OP-5, `:18`, g18, S-1, §7 (R-8 satisfied) |
| PSM-1/R-5 *"48 rule blocks = 40 selector + 8 transition … 5 live (:43, :47, :58, :199, :204) … 43 dead"* + *"F.W3/W4's mechanical rule-move takes THIS enumerated set"* | `fr-PaperSearchModal.md:22` | ✅ byte-exact, including the five line numbers |
| MPC-31 ONE-CUT LAW *"MPC-3 ⊕ MPC-10 ⊕ MPC-13 ⊕ MPC-8 ⊕ MPC-22 land as ONE CUT, and the acceptance witness … non-boot state (or after MPC-8's re-domain)"* | `fr-MorphPhaseConfig.md:82` | ✅ byte-exact |
| FR-MSP-6 two-channel lock *"any cure must EITHER (deepen the plate to ≥3:1 … ) OR add a non-colour channel … never a single-channel edit"* | `fr-MorphShapePreview.md:98` | ✅ byte-exact; routed `ADJUDICATED → F.W4` and F-W3 correctly carries **the law only**, ceding the edit |
| `AA-45` (R-1c's surviving authority) | `fr-AdminAuditLog.md:88` | ✅ present |

**Gate witnesses — commands/paths run against the live trees (all REAL, all born-RED):**

| gate | claim | measured |
|---|---|---|
| g1 | 8 e2e specs / 0 hits on `paper-search*` | `ls web/e2e/*.spec.ts` → **8**; `grep -rl 'paper-search' web/e2e` → **0** ✅ |
| g2 | 23 declarations / 7 files | `grep -rn -- "--slider-scrub" web/src \| wc -l` → **23**; files → **7** ✅ |
| g3 | GlassTimeline 127 / ConvergenceTimeline 146; `glass-ui/timeline` → 0 | **127 / 146**; **0** ✅ |
| g7 | `.easing-preview` = 4 hits across 2 files | `grep -rno 'easing-preview' web/src \| wc -l` → **4** (EasingCurvePreview :23/:37, MorphPhaseConfig :47/:198) ✅ |
| g12 | `glass-ui/forms` → 0, `glass-ui/search` → 0, `./fading-scroll` → 0 | **0 / 0 / 0** ✅ — and the OR is CLOSED (a `NOT-ADOPTED` row in a path-named artefact, not prose) |
| g15 | `function timeAgo` → exactly 5; `startsWith("fourier")` → exactly 7 | **5** (GalleryCard, AdminUserList, GalleryCardModal, AdminFlaggedPanel, GalleryDraftsSection); **7** ✅ |
| g18 | `git status --porcelain \| wc -l` → 28 | **28** ✅ |
| g20 | `F-W3-DO-NOT-EXECUTE.md` absent; `grep -c "F.W3" INBOX.md` → 0 | **No such file**; **0** ✅ |
| §5b | `grep -n worktree .gitignore` → no match | **no match** ✅ (residue correctly declared, and the `.gitignore` row correctly ceded to F.W0) |

**Posture:** `Status: planned` at `:21` and `:494`; **zero** VERIFIED stamps (`VERIFIED | NO` at `:30`, `VERIFIED NO` at `:494`); `EXECUTION IS NOT AUTHORIZED` at `:7`; fourier tree READ-ONLY at `:7` and §1 "Do NOT touch"; owner flags inline at OP-1/OP-4 and S-6 (a) MISSED-D / (b) i-3 / (c) P-10; SS-4's obligations correctly assigned to SS-4 at S-4; `registry/adjudicated/**` out of bounds; **no `F-W3-CARRY.md` authored** (R-3 item 2 honoured; `ls carry/` → the two real carries only).

**Rulings addressed to F-W3 — spot-check:** R-2a ✅ (LF-1 §C.A + S-5 · FR-COB-5/FR-COB-22 §C.F:194 · M-δ §C.K:256 · EasingPicker L30 §C.C:154); R-2c ✅ FR-AFP-33 present, §X.1 minted; R-3 ✅ g19 re-based on path-cited operands, "the CARRY" vocabulary gone; R-8 ✅ id + §7 RED-by-construction disclosure verbatim; R-9.1 ✅ g17 re-labelled a quotation (coordinates aside — D-3); R-9.2 ⚠️ half-applied (D-5); R-10.2 ✅ paths (coordinate aside — D-6). All 12 claimed repair adoptions land in §2 by bytes.

**F.W4 interface:** F-W4's §0a NEGATIVE ROSTER is honoured — F-W3 does not grow a leaf on any §0a component or non-row; the `./confirm-dialog` non-row is respected (F-W3 mints a fourier-local confirm over `./dialog` and sends the retirement note up the SS-6 letter), `KILL-6`'s Card migration is in §X's struck list, and the Tooltip shim is explicitly **re-parameterised, NOT retired** (g11, FR-TT-24).

---

## §4 VERDICT

**DEFECTIVE.** Two CRITICALs (D-1 roster format-blindness; D-2 205 escapes / 103 with no X·F home), four MAJORs (D-3 drifted F-W0 coordinates; D-4 false disjointness; D-5 half-applied P-4; D-6 mis-keyed bounds receipt), four MINOR/INFO.

The repair's substantive work is real and, where it landed, byte-faithful — every adopted authority reproduces at its coordinate, every runnable gate witness reproduces at the tree. What did not land is the **shape** of the closure operand: the spec inherited PASS-1's table-only roster verbatim and re-based its terminal gate on it, so 691 of 1008 routed rows were never eligible to be found missing. That is a closure claim measured over a third of its subject.

*Seat's own writes: this file only. Everything else read-only.*
