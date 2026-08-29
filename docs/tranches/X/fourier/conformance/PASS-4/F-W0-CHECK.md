# F-W0-CHECK — FRESH ADVERSARIAL SPEC CHECK, PASS 4 (L-18 / L-20)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W0.md` (433 lines, 184,768 B; mtime 2026-08-28 19:17:13)
**Corpus authority**: the **66** `fr-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/` (E-1 immutable). Carries citable: `carry/F-W1-CARRY.md` · `carry/F-W4-CARRY.md` ONLY — `ls carry/` returns exactly those two, and F-W0 correctly cites neither as its authority.
**Seat**: FRESH. No roster, no receipt and no gate result was inherited from `PASS-1/`, `PASS-2/`, `PASS-3/F-W0-CHECK.md`, `PASS-3/RULINGS-3.md` or `PASS-3/CLOSE-CERT.md`. Every census row, every quotation and every witness below was re-derived live by this seat against the frozen corpus, `/Users/mkbabb/Programming/fourier-analysis` and `/Users/mkbabb/Programming/glass-ui`.
**Engine disclosure** (CLOSE-CERT §1.3(iii) is real and this seat hit it): the interactive `grep` on this machine resolves to **ugrep 7.8.4**, which errored or returned false negatives on three probes before it was caught. **Every receipt below was re-run under `/usr/bin/grep` (BSD grep) explicitly.** The hazard is an operator hazard, not a claim about how the specs were authored.
**Date**: 2026-08-29
**VERDICT**: **DEFECTIVE** — census **routedTotal 84 · bookedCount 83 · escapedCount 1**; all 15 gates reproduce born-RED with real witnesses; **9 defects, 2 HIGH.** The measurement layer is again sound. Three of PASS-3's twelve cures reached two of their three sites, and the round-3 repair minted one new fabricated identity and one new drifted at-the-bytes quotation — both inside the cells R3-3.1 and R3-4.1 were written to close.

---

## 0. Method

1. **Detector, stated inline (R2-9 ⊕ R3-5's four axes).** Routing tokens for W0 in **every** spelling the corpus uses, **both** dash spellings, at **both** slash positions, over table rows ⊕ id-headed route-marked bullets ⊕ prose routings walked back to their enclosing row id. Slash and span forms expanded to member sets. The booking unit is the **(record, id) PAIR**.
2. **Measured spelling distribution, this seat.** ⟨cmd⟩ `/usr/bin/grep -hoE 'F[.·–—-]W0' fr-*.md | sort | uniq -c` → **155 `F.W0`**, and **no** en-dash or hyphen spelling exists (a measured negative kept in the probe). ⟨cmd⟩ `grep -h 'F\.W0' fr-*.md | wc -l` → **144 lines**; ⟨cmd⟩ `grep -l 'F\.W0' fr-*.md | wc -l` → **44 records**. ⟨cmd⟩ `grep -hoE '[A-Za-z]?[.·–—/-]?W0\b' fr-*.md | sort | uniq -c` → `155 F.W0` · `3 H.W0` (tranche H, not this lane) and nothing else.
3. **Slash forms, BOTH positions.** ⟨cmd⟩ `grep -hoE 'F\.W0/(F\.)?W[0-9]+' fr-*.md | sort | uniq -c` → `F.W0/F.W1` ×4 · `F.W0/W1` ×2 · `F.W0/F.W2` ×1. **⟨cmd⟩ `grep -hoE 'F\.W[0-9]+/(F\.)?W0\b' fr-*.md | sort | uniq -c` → `F.W1/F.W0` ×1** — a second-position member the spec's own published probe cannot match (defect 5). Its site, ⟨cmd⟩ `grep -nE 'F\.W1/F\.W0' fr-*.md` → `fr-ContourSettings.md:155`, is a closing-verdict tally and does not book, so the count is unaffected and the detector is not.
4. **Row extraction.** Every one of the 144 lines was read for its enclosing row id and terminal disposition. Routing-law preambles and closing-verdict tallies carry no id and do not book.
5. **Booking test.** BOOKED = the (record, id) pair carried in `F-W0.md` as a §3 row, a named fold-identity inside a §3 provenance bracket ⟨…⟩, a §4 gate operand or Owning-rows entry, a §6b cross-edge, or a §8 EXCLUDED line — the four shapes §3's head names. Each of the 84 ids was greped individually against `F-W0.md`.
6. **Receipt reality.** **38 ⟨cmd⟩ receipts re-executed by this seat** (well past the ≥15 floor), covering all 20 §3a register rows' commands, every inline note in §3/§6b/§7b, and all 15 gate witnesses. Nothing was inherited.

---

## 1. ID-KEYED CENSUS — 84 routed rows, id for id

**routedTotal = 84 · bookedCount = 83 · escapedCount = 1.**

| Record | Routed ids (banked F.W0 disposition) | n | Booked where |
|---|---|---|---|
| fr-AdminFlaggedPanel | FR-AFP-54 · FR-AFP-55 | 2 | row 10 fold list · **row 12** |
| fr-AdminUserList | FR-AUL-23 · FR-AUL-56 · FR-AUL-58 | 3 | **row 39** (OPTION) + §8 · row 10 · **row 33** / G-15(b) |
| fr-AnimationControls | M-15 | 1 | **row 37**, G-15(a) |
| fr-App | MG-θ | 1 | **row 15**, G-7 |
| fr-AppHeader | FR-AH-33 (· C-14) | 1 | **row 10**, G-6 |
| fr-BasisSelector | i-3 (= LC-missed-7) | 1 | **row 16**, G-7 |
| fr-CanvasOverlayButton | FR-COB-1 · FR-COB-2 · FR-COB-3 · FR-COB-9 · FR-COB-10 · FR-COB-15 · FR-COB-17 · FR-COB-25 · FR-COB-28 | 9 | rows 3 · **26** (id-keyed at round 3) · 26 · 26 · 4 · 26 · G-10 + §6b · 26 · **row 30** |
| fr-CoefficientsPanel | FR-CP-32 | 1 | row 15 fold list |
| fr-CollapsibleSection | F-2 (= C-5) · i-3 (= C-17) | 2 | row 10 · row 15 (+ the do-not-hand-fix rider) |
| fr-ContourSettings | C-13 · D-i1 | 2 | row 10 · **row 19**, G-9, §8 |
| fr-ConvergenceTimeline | M-6 | 1 | row 10 fold list |
| fr-EasingPicker | MISSED-D · C/m-6 | 2 | **row 21**, G-13, §8 · row 18, G-9 |
| fr-EditorControlsDock | L-7 · M-10 | 2 | **row 20**, G-13 |
| fr-EqCoefficientsPanel | FR-EQC-7 (= C-1) · C-3 | 2 | **row 9**, G-6, §6b · row 10 |
| fr-EquationModeToggle | FR-EMT-25 | 1 | **row 24**, G-1 (named exception) |
| fr-EquationPanel | M-N14 | 1 | row 15 fold list |
| fr-EquationResult | FR-EQR-24 · FR-EQR-29 · FR-EQR-30 · FR-EQR-33 | 4 | **row 35** · row 10 · **row 14** · rows 2/20 + G-13 addendum (b) |
| fr-EquationView | C·D-11 · C·D-27 | 2 | **row 13**, G-13, §6b · row 10 |
| fr-FourierMorphSvg | FM-19 · FM-21 | 2 | **row 36**, G-15(c) · **row 33** |
| fr-GalleryAdminBanner | GAB-13 | 1 | **row 2**, G-1, §5 |
| fr-GalleryCard | L·D-3 · L·D-6 | 2 | row 15 · row 16 |
| fr-GalleryFeaturedCarousel | FR-GFC-7 · FR-GFC-21 · FR-GFC-22 | 3 | **row 11**, G-6, §8 · row 10 · row 15 |
| fr-GalleryInfiniteGrid | L-8 · L-12 | 2 | row 15 · row 18, G-9 |
| fr-GalleryMarquee | GM-F6 (= L-19) | 1 | row 15 fold list |
| fr-GallerySearchBar | FR-GSB-6 · FR-GSB-31 | 2 | row 16 · row 10 |
| fr-GalleryView | FR-GV-28 · K7 | 2 | **row 34**, G-6 · row 15 |
| fr-InfoCard | FR-IC-1 · FR-IC-2 · FR-IC-8 · FR-IC-23 · FR-IC-25 | 5 | **row 4**, G-10 · **row 38** |
| fr-NotationPills | FR-NP-2 · FR-NP-4 | 2 | **row 5**, G-12 · **row 6**, G-12 |
| fr-PaperSearch | MISS-A7 · D-24 (≡ K1) | 2 | **row 7**, G-5, G-15(d) · §6b SS-13 row |
| fr-PaperSearchDropdown | C:S-2 · **FR-PSD-CB** (SS-13 residue item 1, `:114`) | 2 | **row 25**, G-1 · **NOT BOOKED — see defect 2** |
| fr-PaperSearchInput | C-3 · D-M3 · MISS-LC2 · residue 6 | 4 | row 10 · G-12 operand · **row 8**, G-6 · §6b SS-13 row |
| fr-PaperSidebar | M1 · C-m9 · M7 | 3 | **row 1** (canonical) · row 10 · rows 15/18 |
| fr-PaperView | M-15 fold (`:193`) | 1 | **row 37** |
| fr-PathPreview | PP-DEAD · PP-LEN · PP-GATE · PP-REDGATE · PP-TSSCOPE · PP-NOTEST · K7 · residue 6 | 8 | row 15 · rows 16/18 · row 15 · **row 37**/G-15(a)/§8 · **row 17** · **row 18** · row 37 · **row 27** |
| fr-SliderControl | R-3 (= D-4) · R-20 (= C-14) | 2 | **row 19**, G-9 · **row 18**, G-9 |
| fr-UserSlugBar | FR-USB-21 · FR-USB-22 | 2 | row 15 · **row 35** |

**36 records route.** ⟨cmd⟩ per-record: 44 of the 66 carry an `F.W0` token at all; 36 of those route a row; **8** carry only preambles/tallies (fr-AdminAuditLog · fr-CanvasControlsDock · fr-ConvergencePlot · fr-ContourPreview · fr-FrequencyGraph · fr-GlassTimeline · fr-HarmonicLevelGrid · fr-VisualizationView); **22 carry ZERO occurrences** (fr-BasisCanvas · fr-CoefficientsSpectrum · fr-ContourEditorCanvas · fr-ConvergenceLegend · fr-DarkModeToggle · fr-EasingCurvePreview · fr-ExportModal · fr-FourierMorphDemo · fr-FourierShapeExtractor · fr-FullscreenViewer · fr-FunctionInput · fr-GalleryCardModal · fr-GalleryDraftsSection · fr-ImageUpload · fr-MobileFloatingToc · fr-MorphPhaseConfig · fr-MorphShapePreview · fr-PaperArticleWindow · fr-PaperSearchModal · fr-SpeedSelect · fr-SvgFilters · fr-Tooltip). See defect 8.

### 1a. The 82 → 84 re-denomination, independently re-derived

R3-4.1 ordered §3/§8 re-based on the corpus. **The number 84 is CORRECT and this seat reaches it independently.** Three of the four delta rows survive re-derivation:

- **+ `fr-FourierMorphSvg FM-21`** — ⟨cmd⟩ `sed -n '99p' fr-FourierMorphSvg.md` → *"…is an F.W0-adjacent question the F.W4 ticket should pose, not answer."* ✔ real, booked at row 33.
- **+ `fr-PaperSearchInput` residue 6** — ⟨cmd⟩ `sed -n '120p' fr-PaperSearchInput.md` → item **6** of that record's SS-13 residue list, *"unmeasurable until F.W0 clears the banked MISS-A7 build break"* ✔ real, booked at §6b.
- **− `fr-NotationPills FR-NP-32`** — ⟨cmd⟩ `sed -n '35p' fr-NotationPills.md` routes **NO-WAVE-OWNER + F.W1 SEQUENCING GATE**, no F.W0 token ✔ correctly subtracted; row 1 performs the R-8 re-home and says so.
- **+ `fr-PaperSearchDropdown` SS-13 residue 12** — **THE ROW IS REAL AND THE ID IS INVENTED.** See defect 2.

### 1b. Anti-invention

Every other structured id F-W0 names resolves at its cited home: `M1` `M7` `K7` `i-3` `F-2` `C-17` `C-13` `C-3` `C-5` `L-7` `L-8` `L-12` `M-6` `M-N14` `C/m-6` `GM-F6` `L·D-3` `L·D-6` `C·D-11` `C·D-27` `C:S-2` `C-m9` `D-i1` `D-24` `K1` `LC-missed-7`, and the two legitimate numbered residues — ⟨cmd⟩ `fr-PathPreview` residue list item **6** = *"`dist/` currency at HEAD"*; `fr-CanvasOverlayButton` residue item **7** = *"Whether fourier's own build mints `@layer utilities` twins"* — both real. **One phantom: `residue 12`.**

---

## 2. GATES — all 15 born-RED, every witness re-run by this seat

| Gate | Witness re-run (this seat, `/usr/bin/grep`) | Result |
|---|---|---|
| G-1 | `git -C $F rev-parse --abbrev-ref HEAD` · `--short HEAD` · `status --porcelain \| wc -l` | `m/w1-bump-migration` · `cd26c65` · **28** (27 ` M` + 1 `??`) — **EXACT**; §2a-i's enumeration is set-identical |
| G-2 | the sole `??` row | `docs/tranches/N/valuejs-inbound-2026-07-27-facility19-migration-table.md` — **EXACT** |
| G-3 | `ls CLAUDE.md` · `ls …/F/coordination/INBOX.md` · `ls …/F/coordination/` · `head -1` ×3 | both absent; **three letters**, subjects byte-exact — **EXACT**, and the triage clause is what makes the gate satisfiable under E13 |
| G-4 | installed version · dist/src comment delimiters · `style.css:3` | **4.0.0** · dist **17/8** vs src **15/6** · `@import "@mkbabb/glass-ui/styles";` — **EXACT** |
| G-5 | `git ls-files web/dist` · `ls -ld web/dist` | **0** files; on-disk, dated **Jun 12 18:13** — **EXACT** |
| G-6 | both dep blocks · lock entries | dependency/devDependency sets byte-identical to the cell; lock `node_modules/vaul-vue` → **0**, `node_modules/@lucide/vue` → **0** — **EXACT** |
| G-7 | `compilerOptions` names/order · flag grep · `scripts` | **13** keys in the stated order; flags → **0**; `dev/build/preview/test:e2e/test:e2e:ui`, no `lint` — **EXACT** |
| G-8 | `include` · tsconfig count · `ls web/e2e/*.spec.ts` | as stated; exactly one tsconfig; **8** specs, names set-identical — **EXACT** |
| G-9 | no unit runner in `scripts`; vitest in neither block | **EXACT** |
| G-10 | F8-REACH-01/02 rows; the 8 lift anchors; `partial-prior-run.json:207-211` | both rows at `FOURIER-AUXILIARY-…:30/:31` with the stated shas; `CanvasControlsDock.vue:54/59/71/77/87` all `'is-active'`, `EditorControlsDock.vue:143/148` `'is-active'`, `ConvergenceTimeline.vue:61` `'is-playing'` — **EXACT**; the skip self-report resolves; `FullscreenViewer.vue:110` is a bare close ACTION, so K-11's correction is right |
| G-11 | drift registers; "a tree no commit holds" | **EXACT** — G-1 establishes it |
| G-12 | denominator operands | corpus-derived and live-derived, no check-file operand in the table; the 8-spec and 27/24/21/19 chains reproduce |
| G-13 | producer `package.json`; glass-ui HEAD | **8.0.0** ✔; HEAD at this seat → **`dfe6971f`**, a **twelfth** drift past the purge seat's `ac204dca`. **This is the one receipt certified non-reproducing by design and it behaved as designed** — the GREEN clause now carries no hash at all (D-9 cured) |
| G-14 | `/tmp/fourier-r4-files.sha256` · `~/.codex/worktrees` · the two attribution homes | absent ✔; **`7e28` `9167` `d0be`** ✔; `HANDOFF.md:306` and `CENSUS-2026-08-03.md:360` both carry the 74,507 B figure ✔; disposition set is set-identical to the intake's `### F.W0 · re-ground` block |
| G-15 | (a) committed lock + flag · (b) `style.css:40-50` · (c) FM-19 · (d) the two registry cells | committed lock resolves typescript **5.9.3** / vue-tsc **2.2.12** ✔; `noUncheckedSideEffectImports` → **0** ✔; both (d) cells present and mutually exclusive, and the round-3 re-quote now survives `grep -F` ✔ (PASS-3 D-5 cured) |

**15 of 15 RED, 15 of 15 witnesses real.** The G-6 peer enumeration is now complete and exact — ⟨cmd⟩ `node -e` over `web/node_modules/@mkbabb/glass-ui/package.json` → **14 peers, 7 optional / 7 required**, and the required set the spec prints (`@lucide/vue · class-variance-authority · clsx · reka-ui · tailwindcss · vaul-vue · vue`) is **set-identical** to the measured one (PASS-3 D-11 cured).

**Reachability**: 14 of 15 GREEN clauses are reachable under §7a's honest-RED relief. **G-15(d) is not** — defect 6.

---

## 3. POSTURE

| Requirement | Finding |
|---|---|
| F.W1 transaction whole at its pinned coordinate | **PASS.** ⟨cmd⟩ `grep -n 'The roster is TWELVE' F-W1.md` → `276:`, and ⟨cmd⟩ `awk 'NR>=270 && NR<=280' F-W1.md` puts `:276` at **§4 Sequencing, intra-wave step 4 — "The atomic transaction (ONE change, G6)"**, exactly the coordinate F-W0 pins. Cross-edge 1 is `F.W0 → F.W1 (HARD predecessor)` ✔. Cited by §-heading at **4** sites (§2a · §4 G-6 · §6a lock 5 · §6b · §8), never by line. `FR-EQC-7's vaul-vue gate lands INSIDE the F.W1 transaction, not before.` reproduces byte-exact. R2-5 fully applied. |
| F.W7 zero-row posture | **PASS on substance, FAIL on attestation.** F-W0 books no F.W7 registry row and mints none; F-W7's `routedTotal = 0` is stated at three of its own sites. G-F7-11 is cited by gate id and **exists** at F-W7 §6 (`:200`) ✔; G-F7-7's failure branch reproduces byte-exact ✔. **But the §11 quotation is both mis-addressed and drifted** — defects 1 and 4. |
| F.W9/W10 splice direction (R-2b) | **N/A — no violation.** §6b confines itself to the SEAT/FLOOR disjointness (R-5), declared identically at both ends. |
| SS-4 flags inline | **PASS.** §6b's SS-4 row carries the forward instruction (flag owner rulings INLINE; name TA-4 as prerequisite or re-scope explicitly). §5 flags OG-F1 and OG-V2 without deciding. |
| Twin law consumed, not re-derived | **PASS — and this is the best-executed directive in the file.** All three v4 citations verified at `F-W3.md`'s bytes: `.d` holds `fr-GalleryFeaturedCarousel` (row 11) ✔ and `fr-PathPreview` (row 15) ✔; the F.W4 negatives row carries `fr-FourierMorphSvg` **only** via its already-booked `FM-4..FM-16` band, so row 33's "NOT on v4's F.W4 default arm" is exactly right ✔. F.W0 cites and does not re-run the criterion. |
| M-25 locks by banked id | **PASS on the bands.** ⟨cmd⟩ the six P-6 ids F-W0 names (`PAW-32/38/39/45/46/56`) are **exactly** the six rows carrying *"NO-WAVE-OWNER locally"* in `fr-PaperArticleWindow.md` (`:88 :94 :95 :195 :196 :293`) — the wider *"LATEX-PAPER carry"* set (14 rows, incl. `PAW-44`) is correctly NOT claimed. `PAW-44/LAW-3`, `MPC-31`, `FR-MSP-6 ⊕ K-13` and the `FR-CP-3` anti-cure lock all route F.W3/F.W4 and none is an F.W0 row, so none is dropped. Row 30's FR-MSP-12 counterfactual reproduces at the bank (`4.43/3.76 light · 4.74/5.58 dark`) and its additions are stated **outside** the quotation ✔. |
| FR-NP-32 canonical form (R2-7.5 / R3-8) | **PARTIAL.** Row 1 states the canonical form and binds it. Three other statement sites of the corrupt-dist gate do not carry it (defect 9), and the §6b quotation **substitutes** for it inside quotation marks (defect 1). |
| Tree READ-ONLY | **PASS.** fourier porcelain **28** before and after this seat's work; glass-ui untouched; no corpus, carry, sibling-spec or ruling byte written. The only write is this file. |
| status `planned`, zero VERIFIED | **PASS.** `Status**: **planned**` at `:46`; §1a VERIFIED = **NO**; the only other `VERIFIED` tokens are `:55`'s own row and `:433`'s correct statement that VERIFIED belongs to the X·F release close. |
| RULINGS-3 applied | **R3-3.1 ✔ fully** (the three forged receipts retired at all four sites; the strike re-warranted on set-membership, which is the one form that survived). **R3-3.9 ✔ 10 of 10** (PASS-3 D-3 through D-12 all cured at the bytes, each verified above). **R3-4.1 ✗ 2 of 3 sites** — defect 3. |

---

## 4. DEFECTS — 9, ranked

### D-1 · **HIGH** · §6b's F.W7 reciprocal quotes a span "at its bytes" that fails `grep -F`, and the drift is the one substitution the canonical-form law forbids by name

§6b's F.W7 row introduces the dependency's content as *"stated by F-W7's §11 F.W0 row, **quoted here at its bytes**"* and prints:

> *"No line anchor, no HEAD figure, no \"LIVE at certified HEAD\" citation until F.W0 re-grounds: 28 dirty entries, pin `14d83356` unresolvable, corrupt glass-ui 4.0.0 `dist/styles/index.css` **(M1)**, GAB-13, F8-REACH-01/02."*

⟨cmd⟩ this seat: `grep -cF 'dist/styles/index.css` (M1), GAB-13, F8-REACH-01/02.' F-W7.md` → **0**.
⟨cmd⟩ the live bytes, `F-W7.md:218`: `grep -cF 'index.css` — **`FR-NP-32` (≡ `fr-PaperSidebar M1`)** — GAB-13, F8-REACH-01/02.' F-W7.md` → **1**.

F-W7 carries the **canonical form** at that coordinate. F-W0 replaces it, inside quotation marks presented as the sibling's own words, with a bare **`(M1)`** — and `(M1)` is the **only** occurrence of that bare form in the whole of `F-W0.md` (⟨cmd⟩ `grep -on '(M1)' F-W0.md` → `357:` and nothing else). R2-7.5, restated by R3-8 for two sibling waves, is *"cite both, **never substitute**"*; F-W0's own row 1 declares that law binding on every later wave. The file therefore **breaks its own canonical-form law inside a quotation of the file that obeys it** — and does so in the cell round 3 rewrote end-to-end under R3-3.1, four passes into a repair programme whose single subject is quotations that read better than their bytes.

The dependency's *substance* is undamaged: the halt condition, the two consumed tables and the "what crosses back: NOTHING" clause all reproduce, and G-F7-7's quote is byte-exact. What fails is the same layer that has failed four times running.

### D-2 · **HIGH** · `fr-PaperSearchDropdown residue 12` is a phantom identity — the corpus contains no such id, and the real row it stands for is booked nowhere

Row 7's provenance bracket reads ⟨`fr-PaperSearch` · banked at `fr-PaperSearchInput K12 / residue 6` · **`fr-PaperSearchDropdown residue 12`**⟩, and §3's re-denomination minute names it as one of the two additions carrying **82 → 84**.

⟨cmd⟩ this seat: `grep -rn 'residue 12' fr-*.md` → **∅ across all 66 records.**
⟨cmd⟩ `sed -n '112,120p' fr-PaperSearchDropdown.md` — the record's `## UNPROVEN-NEEDS-LIVE residue — SS-13 visual-audit inputs` section holds **exactly one** numbered item: `114:1. **FR-PSD-CB engine spread**: …; **F.W0 re-checks before any SS-13 pass is scheduled.**` The record is 120 lines long and has no twelfth residue.
⟨cmd⟩ `grep -c 'FR-PSD-CB' F-W0.md` → **0**.

So: the **routed row is real** — the F.W0 prose routing at `:114` is genuine and routedTotal stays 84 — but its banked identity is **`FR-PSD-CB`**, and F-W0 books it under an id that does not exist. Under the record-qualification axis this file declares mandatory (*"the booking unit is the (record, id) PAIR, never a bare token"*), the pair `(fr-PaperSearchDropdown, residue 12)` does not resolve, and the pair that does — `(fr-PaperSearchDropdown, FR-PSD-CB)` — is absent from the spec. **That is one id-level escape, and it is the only one.**

Two aggravations. First, the two legitimate numbered residues the file cites are correct at their bytes (`fr-PathPreview` item 6; `fr-PaperSearchInput` item 6; `fr-CanvasOverlayButton` item 7 at row 27), which is exactly what makes `residue 12` read as verified. Second, PASS-3's §1b certified *"0 phantoms, 0 renames"* and named `residue 12` in its list of ids that *"all resolve to real, record-qualified banked ids at their cited homes"* — so the invention was minted by a repair round, waved through by the check that repair was answering, and then counted as evidence for the corrected denominator.

### D-3 · **MEDIUM–HIGH** · §6a lock 11 still names a CHECK FILE as this wave's census authority — R3-4.1 landed at two of its three sites

⟨cmd⟩ `grep -o 'its census authority is[^;]*' F-W0.md` → *"its census authority is `conformance/PASS-1/F-W0-CHECK.md` §1 plus the 66 records."*

R3-4's standing law is unconditional: *"a closure/census transcript whose LHS is a count copied from any check file **FAILS BY CONSTRUCTION** — check files and rulings are measurements and cure-shapes, never quotable operands."* The masthead (`:7`) now reads *"derives its census from **ONE operand**: the 66 … records directly"*; §3's head reads *"the only lawful operand"*; §8 reads *"never against a check file"*. §6a lock 11 contradicts all three and names the **superseded 82-row roster** as half the authority. A wave whose Sequencing section licenses the operand its Carry and Closure sections outlaw has not cured the defect; it has moved it.

### D-4 · **MEDIUM** · The §6b quotation is addressed to the wrong section of F-W7

The same cell says the content is *"stated by F-W7's **§11 F.W0 row**"*. ⟨cmd⟩ `grep -nE '^#{2,3} ' F-W7.md` puts **§11 Dependencies at `:299`** and **§7c Cross-edges at `:214`**; the quoted words live at **`:218`**, inside §7c's `**F.W0** substrate pre-gates` cross-edge row. F-W7's §11 *does* have an F.W0 row, and it says something else entirely — ⟨cmd⟩ `sed -n '299,305p' F-W7.md` → *"**Depends on**: **F.W0** (hard, G-F7-7) — specifically **F-W0 §4's gate G-11, the corrected anchor table**…"*. The address resolves to a real section holding a real F.W0 row that is not the source of the quote, which is the most deceptive shape a mis-cite can take: it survives a reader who checks that the section exists. This is PASS-3 D-7's class (the phantom `§22`), one pass later, in a different cell.

### D-5 · **MEDIUM** · The published detector is one axis short, in exactly the way R3-5.1 convicted a sibling

§3's clause (ii) is *"Slash forms expanded to their member sets"* and its ⟨cmd⟩ is `grep -hoE 'F\.W0/(F\.)?W[0-9]+' fr-*.md`. That probe is anchored to **first position** and cannot match a compound whose W0 member is written second. The corpus contains one — ⟨cmd⟩ this seat: `grep -hoE 'F\.W[0-9]+/(F\.)?W0\b' fr-*.md | sort | uniq -c` → `1 F.W1/F.W0`, at `fr-ContourSettings.md:155`. R3-5's standard detector requires *"positions (a member matches whether written first or second in a compound)"*, and its own words are *"a gate stating anything narrower is **DEFECTIVE at authoring, whatever it returns**"* — the ruling under which F-W2's G19 was re-cut for the identical omission. The outcome is unaffected (the one hit is a closing-verdict tally), which is precisely why it survived: §8 names the detector as its falsifier — *"re-running §3's four axes over the 66 and differencing against the booked set"* — so the instrument a hostile seat is instructed to run is narrower than the corpus it is run over.

### D-6 · **MEDIUM** · G-15(d)'s GREEN is unreachable on the honest-RED branch and wave-invalidating on the other

⟨cmd⟩ `grep -o 'Green = after G-5[^|]*' F-W0.md` → *"Green = after G-5, `grep 'class\*=size-'` on the emitted CSS, and **the losing banked cell is corrected in the registry**…"*.

Two independent faults, and the gate's own sibling names both as forbidden shapes:

1. **Gated on an act F.W0 cannot perform, with no relief.** G-15(d) requires emitted CSS ⇒ G-5 ⇒ G-4, which is producer-owned. §7a grants honest-RED-close relief **by name to G-4 and G-5 only** (*"the wave closes with G-4/G-5 RED and says so"*). G-15 is not in that clause, so on the branch the spec itself declares likely, G-15 can never go green. G-15(a)'s own text: *"unsatisfiable-by-construction on the ABANDON branch and gated on a later wave on the LAND branch — **that shape is forbidden**."*
2. **The other half is a bounds violation.** *"the losing banked cell is corrected in the registry"* asks for an edit to a `registry/adjudicated/**` record — which §2a declares **E-1/E-3 immutable** and which §7a lists, verbatim, as a *"bounds expansion that invalidates the wave"*. Everywhere else the file is scrupulous about this (`ERRATA ADDENDUM (E-3 — never patched in place)` for CENSUS and lane-frontend, three times). Here the ruling-6 rider is quoted forward without the E-3 re-route it needs, and row 7 carries the same unqualified instruction.

### D-7 · **LOW–MEDIUM** · §7b's archaeology bullet runs two ⟨cmd⟩s under one declared base and one cannot execute from it

The bullet declares its base as *"in `value.js/docs/tranches/V/megatranche/`"* and then prints ⟨cmd⟩ `ls formation/fourier/` (resolves ✔, returns the four files as stated) beside ⟨cmd⟩ `find docs -iname '*EIGHT-HOUR*'`. From that base the second returns **`No such file or directory`** (there is no `docs/` under `megatranche/`); it resolves only from the repo root, where it returns the six coordination files including the delta. R3-9's unrunnable-machinery class, and CLOSE-CERT §9 certifies *"Every receipt in the eleven now resolves from a declared base."* The bound this receipt establishes is load-bearing — §7b's own sentence says so (*"a bounds-keyed halt condition may not rest on a path that does not exist"*) — so a reader who cannot run the command cannot check the bound.

### D-8 · **LOW** · §3's closing sentence mis-describes 22 of the 30 records it accounts for

⟨cmd⟩ `grep -o 'routedTotal = 84\*\*, from \*\*36 routing records\*\*[^.]*\.' F-W0.md` → *"…the other **30** of the 66 contribute only preambles and tallies."* Measured, this seat: **44** records carry an `F.W0` token; 36 route; **8** contribute only preambles or tallies; **22 contribute nothing at all** — `grep -l 'F\.W0'` does not name them. A record that is silent is not a record that speaks in preambles, and the difference matters to a seat re-running the detector: the sentence tells it to expect 30 non-booking hits and it will find 8.

### D-9 · **LOW** · Three statements of the corrupt-dist gate drop the canonical FR-NP-32 pair

Row 1 mints the law — *"cite-both, never substitute; canonical form **FR-NP-32 (≡ fr-PaperSidebar M1)**"* — and then: **G-4's RED witness** states the gate with a bare *"FR-NP-32's repro with the app's own toolchain"*; **G-5's GREEN** substitutes the other half, *"(fr-PaperSidebar M1 pre-gate)"*; **row 30 item (0)** carries a bare *"FR-NP-32 — the corrupt dist stylesheet"*. G-4 **is** the corrupt-dist gate, so R3-8's *"everywhere the corrupt-dist gate is stated"* reaches it. The mitigation is real and is why this sits at LOW: row 1 instructs consumers to cite the row rather than assert bare, and G-4/G-5's Owning-rows entries point at row 1. But the law as row 1 writes it admits no such exemption, and G-5's cell is a **substitution**, not an abbreviation.

---

## 5. WHAT THIS PASS DID NOT FIND

Stated because a check that only accuses is a poor instrument, and because the cured set is now large.

**Ten of PASS-3's twelve defects are cured at the bytes, verified individually**: D-3 (row 30's "verbatim" label struck and both drifted items re-quoted — ⟨cmd⟩ both `grep -o` probes return the bank's casing and comma) · D-4 (row 1's elision closed; `grep -o 'NOT a version bump[^)]*)'` returns the full parenthetical incl. *"— my reads"*) · D-5 (G-15(d)'s PSM-24 span now survives `grep -F` with the `(:68/:77 …)` parenthetical restored and un-re-punctuated) · D-6 (the narrowed `-oE` probe returns exactly the three F.W0 limbs `:52 :58 :69`, so the paste is the enumeration and no count word survives) · D-7 (the phantom `§22` replaced by `:22`, with the heading list pasted — and `grep -nE '^#{2,4} '` returns exactly the nine headings named) · D-8 (FM-21's departure now carries a full divergence minute naming what is taken and what is not) · D-9 (`207bf174` struck from the GREEN clause; **no hash is written there at all**) · D-10 (the unreproducible `19 lines` struck rather than re-numbered) · D-11 (the peer enumeration completed: 14/7/7, set-identical to `node -e` at this seat) · D-12 (FR-COB-2 given its own id-keyed disposition at row 26 with its F.W1 sizing lock attached).

**And the two structural repairs are the strongest work in the file.** R3-3.1's replacement of the forged counts with a **set-membership** receipt held: ⟨cmd⟩ `grep -rl 'Genuinely owed' waves/` → `F-W0.md` · `F-W7.md`, unchanged across two more sibling writes, while the word-output receipts round 3 substituted for the counts had already died by the time the purge seat read them. The ranking CLOSE-CERT §8 derived — **set-membership ≫ classification ≫ word-output ≫ counts** — is now confirmed by a third independent reading. The twin hand-off is consumed and not re-derived, per id, at all three touch points. No gate is fabricated, no witness is ornamental, no ∅ is re-litigated, and no byte outside this file was written.

**The pattern, stated for the fifth time and now with a measurable shape.** Every surviving defect in this file is still an *attestation* defect — but the survivors have migrated. Rounds 1–3 failed at quotations of the **corpus**; the corpus quotations are now clean (all 20 §3a rows reproduce; every `grep -F` of a frozen-record span passes). Round 4's two HIGHs are both quotations of, or identities imported from, **a moving sibling and a record's own residue list** — the two surfaces the purge seat's own transcript reached last and the census's re-denomination reached first. **The instrument that would have caught both is the one the file already owns and does not apply to itself: `grep -F` the labelled span at its named home, and resolve the (record, id) pair before counting it.** Row 26, §6b and §7b each state the first rule three times; §3's clause (iv) states the second. Neither was run against `residue 12` or against `(M1)`.

---

## 6. VERDICT

**DEFECTIVE.** `routedTotal = 84 · bookedCount = 83 · escapedCount = 1` · **9 defects (2 HIGH · 1 MEDIUM–HIGH · 3 MEDIUM · 1 LOW–MEDIUM · 2 LOW)**.

The wave remains specified to a standard that would execute correctly: bounds tree-derived and reproducible, 15 born-RED gates with 15 real witnesses, the twin partition consumed rather than re-run, every lock and dissent preserved, status `planned`, no byte touched. **The round-4 repair is three edits and one deletion**: resolve `fr-PaperSearchDropdown`'s routed row to its banked id **FR-PSD-CB** (or "SS-13 residue item 1") and strike `residue 12` from row 7 and from §3's delta minute; re-quote §6b's F.W7 span from `F-W7.md`'s live bytes with the canonical `FR-NP-32 (≡ fr-PaperSidebar M1)` intact and re-address it to **§7c**, not §11; strike the `PASS-1/F-W0-CHECK.md` operand from §6a lock 11; and add the second-position arm to §3's clause (ii). D-6 needs a ruling rather than an edit: either extend §7a's honest-RED relief to G-15(d) by name, or re-cut its GREEN as the *written ruling with its falsifier stated* — which is what G-15's own header promises — and route the registry correction to an E-3 addendum.

*Read-only everywhere except this file. No fourier byte, no glass-ui byte, no record byte, no carry byte, no sibling-spec byte and no ruling byte was written by this seat. fourier porcelain: 28 before, 28 after.*
