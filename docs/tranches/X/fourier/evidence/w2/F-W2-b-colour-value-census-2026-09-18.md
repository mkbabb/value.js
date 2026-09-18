SERVED MODEL: claude-opus-5[1m]

# X.F.W2 unit `.b` — G11: THE COLOUR-VALUE CENSUS, 2026-09-18

**Authority**: the owner's begin-word 2026-09-17 (`docs/tranches/X/COHESION.md` §0j).
**Standing**: this file is **G11's artefact**, not an amendment. `docs/tranches/X/fourier/waves/F-W2.md`
(dated 2026-08-28, repair rounds 1–12), `docs/tranches/X/fourier/RULINGS-F.W2.md` and every adjudicated
record are **IMMUTABLE and are not edited here**. Where a figure below diverges from a dated spec, the
spec's bytes stand and the divergence is recorded **beside** them (E-3).

**Substrate.** fourier `f7fa1e3` on `m/w1-bump-migration`, worktree clean; value.js `tranche-u`; fourier
installs `@mkbabb/value.js` **4.0.0**, `@mkbabb/glass-ui` **8.0.0**, `@mkbabb/keyframes.js` `^6.0.0`.
Every figure here was measured **after** this unit's two fourier commits had landed
(WRITE-THEN-MEASURE) and **reproduced byte-identically on a second run** — ⟨cmd⟩
`node docs/tranches/X/fourier/evidence/w2/colour-value-census-2026-09-18.mjs > a; node … > b; diff -q a b`
→ *(no output)*.

**The instrument is published with the census** at
`docs/tranches/X/fourier/evidence/w2/colour-value-census-2026-09-18.mjs`, so every number below is
re-derivable by one command and none of them is typed from memory.

---

## §1 — Why the denominator is colour-VALUE-keyed and not import-keyed

**G11's claim is that an import-specifier census is blind, and the blindness is not theoretical.**
All three banked instances are re-measured live at this seat, and a fourth is added by measurement:

| # | instance | measured at `f7fa1e3` | what an import-keyed census sees |
|---|---|---|---|
| 1 | `fr-ImageUpload` row 13 — six palette hexes duplicated in an SFC with **zero `@mkbabb` imports** | **8 brand values** at `components/visualization/ImageUpload.vue:150,151,152,153,154,155,156,181` | nothing — the file imports no library at all |
| 2 | `fr-ContourPreview` row 22 — brand amber as inline SVG presentation attributes with **zero declarations** | **9 brand values before this unit's cut**, `0` after (§3) | nothing — an SVG attribute is not an import and not a CSS declaration |
| 3 | `fr-CanvasControlsDock` C-25 — **zero imports** beside two `--viz-amber` reads | **0 brand values · 2 `var(--viz-amber)` reads** | nothing, and correctly so — a token read is the target posture, not a defect |
| 4 | **measured here**: `fr-NotationPills` FR-NP-9's triad and `energyColor`'s three literals share one file that imports **no `@mkbabb` package** | **9 brand values** at `lib/equation/notation.ts:15,16,17,26,32,38,45,46,47` | nothing — and this is the single densest colour authority in the tree after `colors.ts` |

**The converse blindness is the one nobody counts**: `components/equation/FunctionInput.vue` reads
`var(--viz-*)` **eleven** times and authors **zero** colour values. An import-keyed census that scored
"files touching colour" would book it; the colour-value census scores it **zero**, which is what
`fr-FunctionInput` item 6's banked *"already at the F.W2 target posture"* means in numbers.

---

## §2 — The roster: every file authoring a brand colour value

⟨cmd⟩ `node docs/tranches/X/fourier/evidence/w2/colour-value-census-2026-09-18.mjs`, §"THE ROSTER".
**130 files scanned · 16 author brand colour · 65 brand values · 7 files (27 values) invisible to an
import-keyed census.** Occurrences by class: **BRAND 65 · NEUTRAL 39 · COMPOSE 2 · in comments
(excluded) 9.**

| keyed | brand | file | sites | the authority it belongs to |
|---|---|---|---|---|
| IMP | **13** | `lib/colors.ts` | 26,28,29,31,32,115,116,117,118 | `STATIC` (golden · 6 rainbow · pink · emerald) ⊕ the four authored `VIZ_COLORS` fallbacks. **W.L5-ACT2's own file** |
| IMP | **10** | `components/visualization/AnimationControls.vue` | 153,163,181 | `fr-AnimationControls` **C-18** — a **P-9 zero-cell** that nonetheless authors ten values (§4) |
| BLIND | **9** | `lib/equation/notation.ts` | 15,16,17,26,32,38,45,46,47 | the NotationPills triad (**FR-NP-9**, roster 4) ⊕ `TIER_INFO` ⊕ `energyColor` (**D-3+C-5**, roster 2) — R-i §1.3's seventh-authority question, at its bytes |
| BLIND | **8** | `components/visualization/ImageUpload.vue` | 150–156,181 | `fr-ImageUpload` row 13 (roster 5) — six distinct hexes over seven coordinates ⊕ one further |
| BLIND | **5** | `components/paper/PaperSearch.vue` | 159,160,164,165,186 | a **P-9 zero-cell** that authors five values (§4) |
| IMP | **4** | `components/morph/HarmonicLevelGrid.vue` | 197,198,251,252 | `fr-HarmonicLevelGrid` **HLG-4**'s own file — the record that ratified the remedy hierarchy |
| IMP | **4** | `src/style.css` | 120,121,125,126 | fourier's own `--viz-amber` / `--section-color-5` AA override (D.W4.d), both arms. **A declaration, not a paint site** — it is the cascade's own text |
| BLIND | **2** | `components/equation/FrequencyGraph.vue` | 44,108 | `spectrumColor` declaration 3 of 4 (roster 3, `M-β1`) |
| IMP | **2** | `components/morph/FourierShapeExtractor.vue` | 15,78 | demo-route extractor |
| IMP | **2** | `components/visualization/gallery/GalleryAdminBanner.vue` | 57,65 | admin banner |
| IMP | **1** | `components/equation/lib/harmonics.ts` | 87 | `spectrumColor` declaration 2 of 4 — **LOCKED, never edited here** (F.W3 `.d` collapse · F.W4 execution) |
| IMP | **1** | `components/shared/CoefficientsSpectrum.vue` | 57 | `spectrumColor` declaration 4 of 4 — F.W3 `.d`'s |
| BLIND | **1** | `components/visualization/EasingCurvePreview.vue` | 12 | the easing cluster's preview |
| IMP | **1** | `components/visualization/EasingPicker.vue` | 49 | the easing cluster's picker |
| BLIND | **1** | `components/visualization/lib/canvas-drawing/epicycles.ts` | 289 | the solid tip dot `#ff3b3b` — **NOT** one of the two `hexToRgba` sites this unit cured (those were `:258`/`:283` and are now token-fed through the residual) |
| BLIND | **1** | `components/visualization/lib/canvas-drawing/transforms.ts` | 7 | `spectrumColor` declaration 1 of 4 — the `pow(t,0.6)` gamma fork |

**The four `spectrumColor` ramps are visible to this census and to no import-keyed one**: two of their
four files (`transforms.ts`, `FrequencyGraph.vue`) import no `@mkbabb` package, and the colour they
author is an interpolation — `hsl(${h}, 85%, 55%)` — whose frozen saturation and lightness are the
authored value. **This unit edits none of them** (anti-rename, B5: ONE ramp identity `M-β1`, execution
F.W4's, the fork collapse F.W3 `.d`'s).

---

## §3 — What this unit's own cut did to the denominator

**Both readings are MEASURED, never derived by subtraction.** The "before" column is the same
instrument run over the wave-open bytes — the six files this unit may write, restored from their
`0106a85^` blobs into a scratch tree with the other 124 files untouched, the scanner re-pointed at it
and nothing else changed.

| | before (`0cc9b00`, wave open) | after (`f7fa1e3`) | receipt |
|---|---|---|---|
| brand values in `ContourPreview.vue` | **1** | **0** | ⟨cmd⟩ `git -C /Users/mkbabb/Programming/fourier-analysis show 0106a85^:web/src/components/visualization/ContourPreview.vue \| /usr/bin/grep -c 'hsl(40'` → `1`; live → `0` |
| brand values in `ContourEditorCanvas.vue` | **8** | **0** | ⟨cmd⟩ same against `…ContourEditorCanvas.vue` → `8`; live → `0` |
| roster size | **18 files · 74 values** | **16 files · 65 values** | both read off the scanner's own summary line, not by arithmetic |
| invisible to an import-keyed census | **9 files · 36 values** | **7 files · 27 values** | same line |

**Both files leave the roster because the colour left the file, not because the census stopped looking.**
The nine paint sites now read one declared token, `--contour-stroke: var(--viz-amber)`, and a token read
is not a colour value (§1's converse case).

---

## §4 — The sixteen measured zero-cells, subtracted and cited

⟨cmd⟩ the same command, §"THE SIXTEEN ZERO-CELLS". The **TEN** the inbound export enumerates
(**F-W5 §4's `F.W5 → F.W2` edge row**, home **F-W5 §5's `P-9` row**) ⊕ the **SIX** F.W2 measured itself
(§5's G11 cell: `FR-EMT-24` · `C-08` · `S-9` · `FR-AUL-55` · `C·S-2` ⊕ `fr-FunctionInput` item 6).
**F.W2 drops none of the ten and re-books none of the sixteen** — they are evidence, never a denominator
(D3), and this census subtracts them from the **consumption** denominator with their ids attached.

| record · id | value.js/keyframes imports | brand colour values | `var(--viz-*)` reads |
|---|---|---|---|
| `fr-App` C-12 | 0 | 0 | 0 |
| `fr-Tooltip` FR-TT-22 | 0 | 0 | 0 |
| `fr-UserSlugBar` FR-USB-38 | 0 | 0 | 0 |
| `fr-EquationModeToggle` FR-EMT-24 | 0 | 0 | 1 |
| `fr-FunctionInput` item 6 | 0 | 0 | **11** |
| `fr-CanvasControlsDock` C-25 | 0 | 0 | 2 |
| `fr-MobileFloatingToc` item 9 | 0 | 0 | 0 |
| `fr-PaperView` C-08 | 0 | 0 | 0 |
| `fr-ConvergenceTimeline` S-9 | 0 | 0 | 0 |
| `fr-MorphShapePreview` C·S-2 | 0 | 0 | 0 |
| `fr-AdminUserList` FR-AUL-55 | 0 | 0 | 0 |
| `fr-AnimationControls` C-18 | 0 | **10** | 0 |
| `fr-CollapsibleSection` (P-9) | 0 | 0 | 0 |
| `fr-PaperSearch` (P-9) | 0 | **5** | 0 |
| `fr-PaperSearchInput` (P-9) | 0 | 0 | 0 |
| `fr-PaperSearchDropdown` (P-9) | 0 | 0 | 0 |
| **16 cells** | **0** | **15** | **14** |

**The zero-cell claim reproduces exactly**: all sixteen consume zero value.js and zero keyframes at
`f7fa1e3`, so all sixteen cost this migration nothing and are subtracted from its denominator. **Two of
them nonetheless author fifteen brand colour values between them**, and that is the finding this census
exists to surface — `fr-CanvasControlsDock` C-25's banked shape (*"zero import cost, non-zero colour
cost"*) is **not** unique to C-25: `fr-AnimationControls` C-18 carries ten and `fr-PaperSearch` five.

**Neither is re-booked as a defect, and neither is counted in the migration denominator** — G11's RED
input forbids both (*"Re-book any P-9 zero-cell as a defect, or count one in the denominator"*). They are
recorded here as colour-roster members with their zero-cell status intact, which is exactly the
distinction an import-keyed instrument cannot express.

---

## §5 — What this census does NOT do

- It **books no row**. The canonical census of record is
  `docs/tranches/X/fourier/conformance/CENSUS-CANONICAL.md` §2's F.W2 roster, verbatim and nothing else
  (R4-10); G19's closure is unit `.d`'s and reads that operand alone. **This file is a colour
  denominator, not a census of records**, and no id here is minted, re-homed or excused.
- It **claims no gate but G11**. `fr-ImageUpload` row 13's cure dies with roster 5's (F.W4);
  `fr-NotationPills` FR-NP-9's cure is F.W3's under K-8's NEVER-clause; the four `spectrumColor` ramps
  are F.W3 `.d` + F.W4's. **F.W2 books the obligation and none of the cures.**
- It **grades nothing down**. Where the measured count differs from a banked one, the banked figure
  stands and the divergence is recorded beside it (`fr-ContourPreview` row 22's *ten* against the tree's
  **nine**, already minuted at R-i §1.4.2 and at F-6 in the wave record).
