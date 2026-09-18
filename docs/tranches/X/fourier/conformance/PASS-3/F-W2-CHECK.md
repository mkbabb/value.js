# PASS-3 · F-W2 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, pass 3)

**Seat**: fresh, 2026-08-28. **No roster inherited.** Every id below re-derived from the 66 `fr-*.md` at
`docs/tranches/V/megatranche/registry/adjudicated/` + `library-band.md` + the declared inbound P-9 export.
PASS-1/PASS-2 registers and RULINGS/RULINGS-2 were read **only** to confirm whether a finding is new or repeat —
no operand, no figure and no quotation below is taken from them.

**Target**: `docs/tranches/X/fourier/waves/F-W2.md` (392 lines, repair round 3).
**Real carries in tree**: `carry/F-W1-CARRY.md`, `carry/F-W4-CARRY.md` — ⟨cmd⟩ `ls docs/tranches/X/fourier/carry/`. No `F-W2-CARRY.md`. ✓ (R-3 holds.)

**VERDICT: DEFECTIVE.** Routed **57** · booked **54** · escaped **3** · 10 defects (2 high, 5 medium, 3 low).

---

## 0. What reproduced (the large majority)

Every load-bearing figure and every stable anchor in F-W2 was re-run from scratch this seat. **All of them
reproduce.** This is stated first because the defects below are narrow and the spec is otherwise measurement-true.

| claim | ⟨cmd⟩ | returns |
|---|---|---|
| `hexToRgba` 5 sites / 3 files | `grep -rn 'hexToRgba(' /Users/…/fourier-analysis/web/src/ \| grep -v 'export function'` | 5 — `golden-shimmer.ts:55`,`:58` · `epicycles.ts:258`,`:283` · `BasisCanvas.vue:261` ✓ |
| `hexToRgb` zero call sites (G17) | same grep, `\| grep -v hexToRgba` | declaration only, `colors.ts:111` ✓ |
| `colors.ts` = 117 lines | `wc -l < …/web/src/lib/colors.ts` | 117 ✓ |
| amber cut = 9 sites / 2 files | `grep -c 'hsl(40' …/ContourPreview.vue …/ContourEditorCanvas.vue` | 1 + 8 = 9 ✓ |
| `spectrumColor` ×4 decls / 8 files | `grep -rn 'const spectrumColor\|function spectrumColor'` ; `grep -rl` | `transforms.ts:3` · `harmonics.ts:81` · `FrequencyGraph.vue:42` · `CoefficientsSpectrum.vue:47`; 8 files ✓ |
| `equation/convergence/` = two SFCs | `ls …/equation/convergence/` | `ConvergenceLegend.vue`, `ConvergenceTimeline.vue` ✓ |
| `ConvergencePlot.vue` not under `convergence/` | `find web/src -name 'ConvergencePlot.vue'` | `equation/ConvergencePlot.vue` ✓ |
| one hand-rolled `lerp`, re-point mandatory (§2b item 7) | `grep -rn 'function lerp'` + `grep -n lerp ConvergencePlot.vue` | decl `useCurveTransition.ts:85`; `ConvergencePlot.vue:11` imports it ✓ |
| `basis-display.ts` literal `:3`→`:7` (banked `:1-7`) | `sed -n '1,9p'` | opens `:3`, closes `:7` ✓ |
| `DIRECT_EASINGS` 19 @ `:94-114` | `grep -n 'Object.freeze' src/easing.ts` · `^});` · `sed -n '95,113p' \| grep -c ','` | `:94` / `:114` / 19 ✓ — **10 shorthand + 9 hyphenated; `linear` has no alias** (F-W2's A2 is right; RULINGS-2 R2-4.2's "9 camelCase + 10 hyphenated" is the loose one) |
| `CubicBezier` `:116-129`, `steppedEase` `:131+` | `grep -n 'function CubicBezier\|steppedEase'` | `:116`, `:131` ✓ |
| `easing` exports 16 · `bezierPresets` 30 | node import of `dist/subpaths/easing.js` | 16 / 30 ✓ |
| `easing():Result` at `src/easing.ts:166` | `sed -n '166p'` | `export function easing(name: string): Result<EasingFunction, EasingIssue>` ✓ |
| 7 subpaths, **no `"."`** | `node -p Object.keys(exports)` | `./color ./value ./css ./easing ./math ./transform ./quantize` ✓ |
| `colorUnit2`/`color2` · `sampleColorRamp`/`mixColorsN` · `easingNames`/`timingFunctions` all deleted | 3 greps over `src/ dist/` | 0 / 0 / 0 ✓ |
| `parseCssColor` @ `src/subpaths/css.ts:47` | `grep -n` | ✓ |
| glass-ui 4.0.0 exports **80**, `./dom` present, `./package.json` absent | `node -p` on installed manifest | 80 / true / false ✓ |
| fourier pin `value.js ^0.13.0` · 28 dirty · `14d83356` unresolvable | manifest read · `git status --porcelain \| wc -l` · `git cat-file -t` | `^0.13.0` / 28 / *not a valid object name* ✓ |
| G13 witness **1 line / 1 file, `-o` → 2** | `grep -rniE 'megatranche\|facility-19\|library-band' …/fourier-analysis/docs/` | 1 line; `-o` → 2 ✓ |
| G16 born-RED | `easing('ease-in-out').value === easing('ease-in-out').value` | `false` ✓ |
| `facility-19.md` / `RULINGS-F.W2.md` absent (G13/G20) | `ls` | both *No such file or directory* ✓ |
| anchor-idiom self-receipt | `grep -noE 'F-W[0-9]+\.md:[0-9-]+\|W9\.md:[0-9]+' F-W2.md` | **∅** ✓ (R2-2 holds; no line cite into any live sibling, carry or COHESION) |
| 20 gates, all born RED, status `planned`, VERIFIED **NO** | table scan + greps | 20 / 20 / ✓ / ✓ |

**Cross-spec stable anchors — all resolve at their targets:**
`F-W0 §4` gates `G-11`/`G-12`/`G-13` (headings verbatim as F-W2 quotes them) · `F-W0 §2a`'s `SUBSTRATE-LEDGER.md`
create row (names the three tables) · `F-W0 §3` carry row 1 `FR-NP-32 ≡ fr-PaperSidebar M1`, **R-column = `G-4`, relay item 0** ·
`grep -on 'F.W0 additionally owns the pre-gate (G-4) + relay item 0' F-W0.md` → **one hit, :117** ·
`grep -c 'NO-WAVE-OWNER (producer emitter)' F-W0.md` → **0** (round-3's strike of the fabricated quotation is correct) ·
`F-W1 §2 WU-K`'s `L/B-1 + C/B-1` row · `§2 WU-R`'s `ESC-4` row (*"14/22 analytic→CubicBezier; 8/22 material, max Δ 0.192"*) ·
`§3` gate `G12` (*EASING RE-POINT VERIFIED BY EXECUTION*) · `§4 step 4` — **`grep -c 'The roster is ELEVEN'` → 0**,
**`grep -n 'The roster is TWELVE'` → one hit inside §4 step 4**, **`grep -c 'vaul-vue'` → 8** spanning exactly the eight
sites F-W2 enumerates (`§2 WU-L` FR-EQC-7 · `§3 G13` · `§4` steps 2 and 4 · `§4` cross-edge 1 · `§2·R1` and `§2·R2`
placement notes · `§E-3·R2` errata) — **the round-3 6→8 correction is right** ·
`F-W5 §4`'s `F.W5 → F.W2` edge row (act cell *"exports zero-cells (P-9)"*) · `F-W5 §5`'s `P-9` row ·
**`grep -c 'zero-cells' F-W5.md` → 2** (round-3's three→two correction is right) ·
`X-W9 §Hard Gate` `G21` (SCI-1) / `G23` (easing reference stability) / `G24` (restored analytic arms, drift leg) / `G33` (5 packets + 5 INBOX rows + `npm ls`).

**Corpus quotations verified byte-for-byte** (each `sed`/`grep` re-run this seat): `fr-NotationPills.md:35` ·
`fr-EasingPicker.md:52`,`:89` · `fr-MorphPhaseConfig.md:46` · `fr-EasingCurvePreview.md:58` · `fr-FourierMorphSvg.md:46` ·
`fr-HarmonicLevelGrid.md:113` · `fr-GalleryFeaturedCarousel.md:39` · `fr-GalleryInfiniteGrid.md:49` ·
`fr-BasisCanvas.md:94` · `fr-App.md:75` · `fr-App.md:25` (R-1's *"7 files, all under `components/visualization/`"*) ·
`fr-ConvergenceTimeline.md:123` · `fr-ImageUpload.md:47` · `fr-AdminAuditLog.md:57` · `fr-EquationPanel.md:23` ·
`fr-CollapsibleSection.md:27` · `fr-PaperSearch.md:57` · `fr-PaperSearchInput.md:107` · `fr-PaperSearchDropdown.md:77` ·
`fr-FunctionInput.md:112` · `fr-InfoCard.md:50` · `fr-CanvasControlsDock.md:96` · `fr-PaperArticleWindow.md:303` ·
`fr-AnimationControls.md:120`,`:192` · `fr-GalleryView.md:118` · `fr-EquationView.md:69` · `library-band.md:114-117` (RD-7,
*"Booking"* opens `:115`, closes `:116` — correct) · `library-band.md:295-296` (the 3-leg probe — correct).
**Three fail**; see D-2, D-6, D-8.

**M-25 depth — the anti-over-booking arm is CLEAN.** `PAW-44`/`LAW-3` (sticky-stack inertness + its sequencing law),
`MPC-31` (the cure conjunction), `FR-MSP-6` (the void-cure lock) are **correctly absent** from F-W2: none routes to F.W2
(⟨cmd⟩ `fr-PaperArticleWindow.md` has exactly one F.W2 row, `:303` K-24 · `fr-MorphPhaseConfig.md` has zero literal F.W2
rows · `fr-MorphShapePreview.md` has exactly one, `:138` C·S-2). F-W2 takes C·S-2 and K-24 and leaves the rest with their
homes. Same-commit riders (§6a: A2+A1's five-site edit · A3's `lerp` re-point · ACT(2)+B7 join over **five** call sites ·
the validated residual) are all sized at the re-measured figures. Anti-cures (§7's "one import edge" KILL, derive-from-
`VIZ_COLORS` KILL, tokenisation-is-not-the-cure, theming-arm KILL, the absolutization kill) are all carried with their
killing authority named.

**RULINGS-2 application.** The four directives addressed to F-W2 (`RULINGS-2.md:221`) are **R2-4 · R2-5 · R2-9 · R2-1-LAW**.
R2-4 (all five sub-items) and R2-5 (TWELVE ×2 by ⟨cmd⟩) are **fully landed and correct**. R2-1-LAW is landed except at the
three quotation sites below. **R2-9 is landed in form and broken in substance** — see D-1.

---

## 1. ID-KEYED CENSUS — fresh enumeration

**Detector, stated before it is run** (R2-9's law, applied without inheritance): SHAPES = table rows ⊕ id-headed
route-marked bullets ⊕ prose routings walked back to their enclosing banked row id. SPELLINGS = `F`,`.`,`·`,`-`,`–`
separators **and the zero-separator form**. EXPANSION = every slash/span form expanded to its member set **in both
positions** — a member is a member whether it is written first or second.

**Literal probe** ⟨cmd⟩ `grep -nE 'F[.·–-]?W2' fr-*.md` → **68 occurrences / 57 lines / 25 records**; ⟨cmd⟩
`grep -hoE 'F[.·–-]?W2[^0-9]' \| sort \| uniq -c` → sole form `F.W2` (44 bare · 15 `**`-adjacent · 3 `/` · 2 `.` · 2 `)` ·
1 `,` · 1 `'`). En-dash arm ∅. **This reproduces F-W2's own figure exactly — and it is the wrong probe.**

**Second-position probe (the one F-W2 never runs)** ⟨cmd⟩ `grep -noE '[FW][.·–-]?W?[0-9]+[/–-]W2' fr-*.md library-band.md` →
**5 hits, all `fr-PathPreview.md` : `:50` (×2) · `:80` · `:107` · `:114`, form `F.W1/W2`.**

**Non-literal probe**: `library-band.md` §W.L5 ACT1/ACT2/ACT3 (0 literal `F.W2`) ⊕ the declared inbound P-9 export at
`F-W5 §4`'s `F.W5 → F.W2` edge row ⊕ the five easing-cluster records + `fr-InfoCard` + `fr-AnimationControls` +
`fr-CollapsibleSection` + the three PaperSearch records (all zero-literal, all reachable only by their banked homes).

### 1a. Booked — 54 of 54 in F-W2 §8a land

All 54 rows of §8a re-resolved id-for-id against the corpus. **Every one is real, correctly record-qualified, and
correctly homed.** The 12 `⟳` rows (PASS-1's E-1..E-12) are all present and all cite rather than re-book, which is right
under FR-GIG-5 / R-5. The ten members of F-W5's real P-9 export (App C-12 · MobileFloatingToc · CollapsibleSection ·
PaperSearch · PaperSearchInput · PaperSearchDropdown · MorphShapePreview · CanvasControlsDock · AnimationControls ·
UserSlugBar) are **all** carried at D1/D3/D4 — **no export member is dropped**. No id in §8a is fabricated; no id is
double-booked; the §3 ledger head (29) and §8b's enumeration (29 = A1–A7 · B1–B13 · C1–C2 · D1–D4 · E1–E2 · F1) agree.

### 1b. ESCAPED — 3

| # | id | corpus receipt | why it is an escape |
|---|---|---|---|
| **E3-1** | `fr-PathPreview PP-REDGATE` (roster item 15, L-2 re-adjudicated) | `sed -n '50p' fr-PathPreview.md` → *"**MAJOR → F.W1/W2 + M-25 errata**. … The cure … lands WITH the toolchain bump, **owned by F.W1/W2** — NOT as an F.W0 precondition."* ; re-affirmed `:80` (*"The fact survives as PP-REDGATE, re-routed F.W1/W2"*) and `:107` (*"F.W1/W2 should confirm at execution"*) | Slash form; F.W2 is a member. `grep -c 'PathPreview\|PP-REDGATE' F-W2.md` → **0** — not booked, not cited, not excluded-with-reason |
| **E3-2** | `fr-PathPreview` roster item 7 (the committed substrate's gate under its own toolchain) | `sed -n '107p'` → *"…F.W1/W2 should confirm at execution."* ; the record's own tally `:114` → *"29 rows routed (F.W0 ×4 · **F.W1/W2 ×2** · F.W3/W4 ×15 …)"* — the record itself declares **two** rows on this route | Same. The record's ADJUDICATED tally is the arithmetic proof that the pair is two rows, not one |
| **E3-3** | `fr-GalleryInfiniteGrid C-6` | `sed -n '48p'` → *"C-6 — MAJOR here · FOLDS BY REFERENCE to banked fr-BasisCanvas D-1/BC-1/C-1 via fr-App B-1 + GCM-20 (→ F.W1). Do NOT re-book.* … **Rides banked FR-GFC-8's F.W2 wave-lock.**" | A literal-`F.W2` row in a record F-W2 already opens twice (C-5 at §8a 30, FR-GIG-17 at 31). §7 row 1 excludes the *identity* (fr-BasisCanvas D-1/BC-1/C-1) but never this **id**; excluded-without-reason does not count as carried (G19) |

**Escape arithmetic**: routed **57** = 54 booked + 3 escaped. Booked share 94.7%.

**This is a NEW escape class, not an uncured repeat**: `grep -c 'PathPreview\|PP-REDGATE\|F.W1/W2'` →
`PASS-1/F-W2-CHECK.md` **0** · `PASS-2/F-W2-CHECK.md` **0**. Two prior passes ran the same first-position-only probe and
inherited its blind spot; the fresh-seat rule is what surfaced it.

**Aggravating**: F-W1's own §4 step 4 books **"PP-REDGATE ambient declaration"** as one of the TWELVE limbs of the atomic
transaction — the very sentence F-W2 cites twice as its extent authority. F-W2 quotes the charter that contains the id and
does not notice the id.

---

## 2. Defects

### D-1 · HIGH · Census escape: the G19 detector is spelling-restricted in the exact way R2-9 forbids

**Claim.** G19's operand — and §8's 54-id roster, and the masthead's re-verified *"census detector 68 occurrences / 57
lines / 25 records, sole form `F.W2`, en-dash arm ∅"* — is produced by `grep -nE 'F[.·–-]?W2'`, which **cannot match a
slash form whose second member is `W2`**. `fr-PathPreview.md` routes two rows to `F.W1/W2` and is invisible to all three
operands.

**Receipt.** ⟨cmd⟩ `grep -noE '[FW][.·–-]?W?[0-9]+[/–-]W2' fr-*.md` → 5 hits, all `fr-PathPreview.md` (`:50` ×2, `:80`,
`:107`, `:114`). ⟨cmd⟩ `grep -c 'PathPreview\|PP-REDGATE' F-W2.md` → **0**. ⟨cmd⟩ `grep -n 'The roster is TWELVE' F-W1.md`
→ the same step-4 sentence F-W2 cites twice names *"PP-REDGATE ambient declaration"* as a limb.

**Law convicted.** G19's own EXPANSION clause: *"every slash form expanded to its member set"* — stated, then applied only
to first-position members (`F.W3/W4`, `F.W5–W8`). And `RULINGS-2.md` **R2-9**, applied to F-W2 by name: *"every slash form
expanded to its member set. A gate that states a shape- or spelling-restricted operand is **DEFECTIVE at authoring,
whatever its result**."* The gate reproduced its number and reproduced its blindness with it. G19's RED-input cell —
*"Drop a row silently. This is the defect class the program exists to kill (M-25)"* — is self-describing here.

**Cure shape (not performed).** Widen the detector to `(F[.·–-]?W[0-9]+[/–-])?W2` in both dash spellings; re-run the
set-difference; home `PP-REDGATE` and roster item 7 — most plainly as an §7 exclusion row (*F.W1 owns both inside the
atomic transaction; F-W1 §4 step 4 books the ambient declaration as a limb*), which under G19 counts as carried.

### D-2 · HIGH · A "PRESERVATION obligation … verbatim" quotation does not byte-match its own ⟨cmd⟩ — round 3's convicted class, re-committed

**Claim.** D3 renders `fr-MorphShapePreview C·S-2` as *"dodging `lib/colors.ts`'s broken oklch path by staying in CSS —
**preserve verbatim through F.W2**"* under the label *"Two clauses are PRESERVATION obligations"*, with ⟨cmd⟩
`sed -n '138p' fr-MorphShapePreview.md` in the row's provenance bracket; §8a row 36 repeats the label
(*"D3 (preservation, verbatim)"*) and §6b repeats it again (*"MorphShapePreview's CSS dodge, verbatim"*).

**Receipt.** ⟨cmd⟩ `sed -n '138p' fr-MorphShapePreview.md` returns:
`3. **C·S-2 — dodging `lib/colors.ts`'s broken oklch path by staying in CSS — carried.** Preserve verbatim through F.W2.`
Two divergences: the word **`carried.`** is dropped with **no ellipsis**, and **`Preserve` is lower-cased to `preserve`**,
which also silently converts a standalone imperative sentence into a subordinate clause of the previous one.

**Law convicted.** R2-1-LAW.2 (*a "verbatim" label may only carry the cited file's own bytes*) — and the round-3 masthead's
own defects **(6)** (*"elided `(B5)` without an ellipsis — restored"*) and **(7)** (*"Two casing misquotes inside verbatim
labels"*). Round 3 declares eight ⟨cmd⟩ notes cured as *"one class: a ⟨cmd⟩ note reporting what the seat expected instead
of what the command returned"* — and this is a ninth of that class, at a clause the spec three times calls a preservation
obligation.

### D-3 · MEDIUM · G12's four artefacts are outside §2a's File Bounds, at a path that does not resolve, under a note that asserts the opposite

**Claim.** G12 goes GREEN only by creating `audit/probes/app-wave/fourier-viz-{light,dark}-{before,after}.png`. §2a's File
Bounds table declares **create** for exactly five paths (this spec · `facility-19.md` · `RULINGS-F.W2.md` · the two
letters). The PNGs appear nowhere in it.

**Receipt.** ⟨cmd⟩ `grep -c 'app-wave' F-W2.md` → **1** (G12's cell alone). ⟨cmd⟩ `ls audit` from the declared cwd
`/Users/mkbabb/Programming/value.js` → *No such file or directory*; the directory that exists is
`docs/tranches/V/megatranche/audit/probes/app-wave/` (⟨cmd⟩ `ls` → `BORN-RED-2026-07-27.json`, `app-shell-truth-probe.mjs`).
§5's Denominator note nevertheless states: *"the four to-be-created paths (`facility-19.md`, `RULINGS-F.W2.md`, the two
letters) **and the four PNGs each carry an explicit create marker with its path**."* Both halves are false — no create
marker exists, and the path as written does not resolve. (The `.gitignore:34 *.png` half **is** correct — that is
value.js's own ignore file, ⟨cmd⟩ `sed -n '34p' .gitignore` → `*.png`, and §5's preamble roots unrooted commands here.)

**Consequence.** A gate whose GREEN requires writing four files the wave has no bounds authority to write — the same
phantom-witness class R-10.6 cured for G5/G8/G11/G13/G17, left standing one row away from that cure.

### D-4 · MEDIUM · Two §5 gate commands are elision-pathed and cannot execute as written

**Claim.** §5's preamble says *"Commands are literal"*; its Denominator note (R-10.6) says *"every command above executes
as written from the declared cwd"*. Two gate cells carry `…`-elided paths.

**Receipt.** G4: ⟨cmd⟩ `sed -n '1,9p' …/lib/basis-display.ts`. G8: ⟨cmd⟩
`node -p "Object.keys(require('…/@mkbabb/glass-ui/package.json').exports).length"`. Neither is a path; neither runs.
(Both **figures** reproduce when rooted — literal opens `:3` closes `:7`; 80 keys — so this is an address defect, not a
measurement defect, and it is exactly the distinction §2b/R2-2 were written to police.)

### D-5 · MEDIUM · One quotation is given two different spans inside one file, and the file contradicts itself three sentences apart

**Claim.** §3's provenance manifest names the W.L5 3-leg probe's span as **`:294-297`** (*"THREE of these spans are
soft-wrapped … and **the W.L5 3-leg probe (`:294-297`)**"*). The **same paragraph**, three sentences later, rules:
*"**All such cites are now `:295-296`**, the span the words actually occupy."* A6's drift figure and G15 both use `:295-296`.

**Receipt.** ⟨cmd⟩ `sed -n '292,300p' library-band.md`: `:294` is the `### W.L5 — FOURIER…` heading; `:295-296` carry
*"5 × ERR_PACKAGE_PATH_NOT_EXPORTED; `timingFunctions` deleted; 8/22 curves drift, max 0.192"*; `:297` is the
`fourier-vizcolor-oklch.mjs` leg. The manifest's `:294-297` is a receipt range presented as the span.

**Law convicted.** The round-2 masthead's own rule: *"A figure corrected at one site and left standing at another is not
a corrected figure"* — here both sites are inside one paragraph.

### D-6 · MEDIUM · RD-8's law, labelled "binding and verbatim", carries two emphasis spans the bank does not

**Claim.** F1 renders the law as *"…direction **one-way** (value publishes, fourier consumes); completeness
**bidirectional** (no unlisted import, no listed symbol without a consumer)."*

**Receipt.** ⟨cmd⟩ `sed -n '124,128p' library-band.md` returns the clause wholly inside one italic span with **no bold on
either word**: *"…direction one-way (value publishes, fourier consumes); completeness bidirectional (no unlisted import,
no listed symbol without a consumer)."* Same class as D-2/D-8 under R2-1-LAW.2 — and the label here is the strongest in
the file (*"binding and verbatim"*), on the clause that constitutes facility 19's whole law.

### D-7 · MEDIUM · "Sixteen against the real export" — the cited export names ten

**Claim.** §7 row: *"the roster was eleven at the fold seat and is **sixteen** against the real export"*; G11's operand is
*"the **sixteen** P-9 zero-cells subtracted and cited"*, homed at F-W5's export row.

**Receipt.** ⟨cmd⟩ `sed -n '300p' F-W5.md` — the `F.W5 → F.W2` edge row enumerates **ten**: App API-inert ·
MobileFloatingToc · CollapsibleSection · PaperSearch/PaperSearchInput/PaperSearchDropdown · MorphShapePreview ·
CanvasControlsDock/AnimationControls · UserSlugBar FR-USB-38. ⟨cmd⟩ `sed -n '323p' F-W5.md` — P-9's home row quotes the
**same ten** from `F-W4-CARRY.md` by command.

**Assessment.** F-W2 drops **none** of the ten (that half is clean) and adds six of its own measured zero-cells
(Tooltip FR-TT-22 · EquationModeToggle FR-EMT-24 · FunctionInput item 6 · PaperView C-08 · ConvergenceTimeline S-9 ·
AdminUserList FR-AUL-55). Sixteen is therefore a true count of **F-W2's** roster and a false count *"against the real
export"* — six of the sixteen are attributed to a home that does not carry them, in a gate cell that cites that home as
its authority.

### D-8 · LOW · A2's banked-verbatim quotation lower-cases the bank's opening word

**Receipt.** F-W2 A6/A2: *"**the** one unbanked arm, booked as a rider on that F.W1 ticket …"*. ⟨cmd⟩
`sed -n '46p' fr-FourierMorphSvg.md` → *"**The** one unbanked arm, booked as a rider on that F.W1 ticket (reader-2 missed
#5, INFO):"*. Identical one-character class to the three the file itself strikes at round 3 (`execution`,
`One identity…`, `Booking the fix…`).

### D-9 · LOW · A literal-`F.W2` corpus row is neither booked nor excluded

**Receipt.** ⟨cmd⟩ `sed -n '48p' fr-GalleryInfiniteGrid.md` → C-6, ending *"Rides banked FR-GFC-8's F.W2 wave-lock."*
F-W2 opens this record twice (C-5, FR-GIG-17) and never names C-6. §7 row 1 excludes the F.W1-homed **identity**
(fr-BasisCanvas D-1/BC-1/C-1) but not this **id**; under G19 excluded-without-reason ≠ carried. Cheapest cure: one §7
line, *"C-6 — folds by reference to the F.W1 identity; rides B4's wave-lock; no F.W2 booking."*

### D-10 · LOW · D2's quotation of Challenge-C §0 drops a clause without an ellipsis

**Receipt.** F-W2 D2: `not "3 utility classes + 5 theme custom properties"`. ⟨cmd⟩ `sed -n '303p' fr-PaperArticleWindow.md`
→ `"3 utility classes, 0 component imports … + 5 theme custom properties (L182,184,195,196,200)"`. The dropped
`, 0 component imports …` is unmarked — inside the very row whose banked ruling is *"the inventory must be exact."*

---

## 3. Axis verdicts

| axis | verdict | note |
|---|---|---|
| **1 · ID-keyed census** | **DEFECTIVE** | 57 routed / 54 booked / **3 escaped**. Detector spelling-restricted against R2-9's explicit expansion law (D-1). No fabricated id, no double-booking, no export-member drop |
| **2 · Quote reality** | **DEFECTIVE** | 27 of 30 corpus/cross-spec quotations byte-match at their re-run ⟨cmd⟩. Three fail: D-2 (elision + casing under a thrice-repeated "verbatim" label), D-6 (emphasis added to a "binding and verbatim" law), D-8 (one-character casing). D-10 is a fourth, minor |
| **3 · M-25 depth** | **CLEAN** | FR-NP-32 cited by id at its banked bytes and by F-W0's carry row + `G-4`; PAW-44/LAW-3, MPC-31, FR-MSP-6 correctly **not** booked (none routes to F.W2); MPC-2 carried verbatim and contested without pre-emption; CENSUS-MC narrows G10 rather than defending it; same-commit riders sized at the re-measured five/nine; anti-cures all carry their killing authority; the round-3 strike of the fabricated F-W0 quotation is verified correct (`grep -c` → 0) |
| **4 · Gates** | **DEFECTIVE (minor)** | 20 gates, all born RED, every RED state reproduced this seat (G1/G3 probes exist; G5/G6/G13/G16/G17/G20 re-measured RED directly). Closure operands state shapes inline per R2-9 ✓, spellings restricted ✗ (D-1). Two commands unrunnable (D-4); one gate demands writes outside bounds (D-3) |
| **5 · Posture** | **CLEAN** | F.W1's transaction cited whole at `F-W1 §4 step 4` + `§4 cross-edge 1` with the **correct TWELVE**, never restated (R-4b) ✓ · F.W0 pre-gates honoured, G14 stated as opens-after with no GREEN claimed ✓ · SS-4's owner-gated G4 flagged inline at F1/§6b/§7 and not pre-empted ✓ · FN-5 rider travels ✓ · fourier tree READ-ONLY in every witness ✓ · status `planned`, VERIFIED **NO**, zero VERIFIED stamps ✓ · RULINGS-2's four directives applied, R2-4/R2-5 exactly, R2-1-LAW at all but three sites, R2-9 in form only (D-1) · no F.W7 or F.W9/W10 edge is owed from this end (no F.W2-routed corpus row carries either), so their absence is not a defect |

**Local verdict: DEFECTIVE.** Two high defects: one silent-drop pair the wave's own closure law exists to kill, surviving
because a detector reproduced its number and its blind spot together; one "verbatim" preservation clause that does not
match the command printed beside it. Everything else in F-W2 — every figure, every anchor, every gate state, the whole
posture — reproduces at the bytes.
