SERVED MODEL: claude-opus-5[1m]

# X.F.W4 unit `.a` — dated addenda-beside, 2026-09-18

**What this file is.** Every artefact this unit falsified is **IMMUTABLE** (E-3: dated specs,
the adjudicated registry, conformance artifacts and prior evidence are never edited). The
corrections live here, dated, beside them — never as a patch to the record. Each entry names
the artefact by a **path-qualified** address, quotes the falsified bytes, states the
measurement that falsifies them, and names the commit that carries the cure.

**Scope.** `.a` = the shell, the morph chain and the global sheet. Spec of record
`docs/tranches/X/fourier/waves/F-W4.md` §2.F · §2.0 SP-3/4/5/6/7/9/10/11/15/19 · §2.K's
`FSE-*` rows · §3 D7 + D10's two legs · §4 `G-F4-CENSUS-CELLS` · §5.1(3) ·
COHESION §0j.D `G-15(b)`/`G-15(c)`.

**Standing.** These are **measurements against the live tree at the adopted pin** (glass-ui
**8.0.0** @ `17a11bc5`, COHESION §0i.3), taken after F.W0/F.W1/F.W2 landed. Where a banked
mechanism died because a predecessor wave moved the substrate, that is recorded as a
**witness-moved disclosure**, not smoothed away and not used to retire the row's grade.

---

## §1 · `G-F4-CENSUS-CELLS` — the cells this unit falsifies

### A-a-1 — `DarkModeToggle` is named PRM-compliant, and was not

- **Artefact** (path-qualified, immutable):
  `<fourier>/docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1393`
  — the `evidence` line of finding **`B5-01`**. ⊘ The fourier tree holds **two**
  `raw-findings.json`; this is the **06-16** run, and the 06-17 M-critique run is a different
  file. Anchor re-resolved at the true bytes this seat: `:1390` = `"id": "B5-01"`, `:1391` =
  `"title"`, `:1392` = `"severity"`, `:1393` = `"evidence"`.
- **The falsified bytes**: *"…meanwhile 10 components do honour it (PaperView, ContourSettings,
  AnimationControls, GalleryMarquee, GalleryCard, CollapsibleSection, ConvergencePlot,
  **DarkModeToggle**, VisualizationView, style.css)."*
- **The measurement.** `DarkModeToggle.vue` carried a `@media (prefers-reduced-motion: reduce)`
  block that nulled **`transition` alone**, leaving `:hover`'s `transform: scale(1.12)` intact —
  so a reduced-motion user received an *instantaneous 12% snap*: motion reduction inverted into
  motion **sharpening** (`DMT N-8`). And the component's actual clock is
  `useFourierMorph.morphTo()`, which it drives on every click and which consulted the preference
  **nowhere**. Presence of the at-rule was read as compliance; the at-rule was the defect.
- **The correction.** `DarkModeToggle` **does not** belong in that list at the bytes the run
  measured. The list is nine, not ten, for this run; the count word is the artefact's and is not
  edited here.
- **Consequence for the registry.** `FR-AH-31` was graded **MINOR (demoted)** partly against this
  cell. The demotion **stands** — the cure is a short-circuit, not a redesign — but it now rests
  on the cure's size, not on a false compliance claim. ⊘ This is the discharge the spec's
  same-commit lock demands (*"FMD-22's PRM edit WITH FR-AH-31's path-qualified census
  correction … else the MAJOR regrade REOPENS"*).
- **Cure**: fourier `e022edf` — `morphTo()` short-circuits under PRM and seeds the **TERMINAL**
  frame (`setShape(to)`, `morphProgress = 1`), which is SP-4's M-D1 clause and the cell's own
  `proposed` arm verbatim. ⊘ **Cross-repo disclosure**: the lock says *"same commit"*, and the
  cure and this correction live in **two repositories**, so one commit cannot hold both. They are
  one act, landed adjacently, and each names the other — the fourier commit message cites this
  file and this entry cites that hash.

### A-a-2 — the same cell's superlative, discharged

- Same artefact, same finding `B5-01`, the `title` line at `:1391`: *"Morph pane has ZERO
  prefers-reduced-motion handling — **the motion pane is the only one that ignores motion
  preference**"*.
- **True when measured; false at `e022edf`.** Recorded so a later sweep does not re-file it, and
  so the superlative's retirement is traceable to an act rather than to an opinion.

---

## §2 · Witness-moved disclosures — banked mechanisms that died at the adopted pin

None of these retire a row's grade. Each is a mechanism the record measured at glass-ui **4.0.0**
that no longer reproduces at **8.0.0**, recorded because a gate re-reported RED on a cured witness
is a false receipt (the wave record's own standard, seat 0's `vue-tsc` disclosure).

| id | banked mechanism | measured at 8.0.0 | what survives |
|---|---|---|---|
| **FMD-N3** | the scoped `:hover` `box-shadow` replaces `cartoon-surface`'s **hover** stamp (`--shadow-cartoon-lg`, cards.css:33-49) | the whole recipe is `@utility cartoon-surface{position:relative;border-width:2px;box-shadow:var(--shadow-cartoon-md)}` — **no hover arm** | the single-property replacement is real against the **base** stamp: the signature offset shadow vanished for the whole hover. Grade unmoved; cured by COMPOSING (`e4599ec`) |
| **FMD-27** | the shorthand omits `translate`, so *"the cartoon lift snaps"* | there is **no producer lift** at 8.0.0 to snap | the row folds into FMD-N3's one cure; the transition is tokenised in the same edit |
| **FMD-16 / HLG-2** | `.grid-cell` keeps the recipe's **fixed** `h-(--control-h-md)` while ~2× stacks inside ⇒ symmetric overflow | `.button` declares `min-block-size: var(--button-size)` — a **floor**; a fixed `block-size` only under `[data-icon-only]`, which these cells are not | no overflow to cure. The `--ui-scale` coarse-growth residue is real and is **routed, not booked** |
| **HLG-7** | the `.active`/`.is-bound` `box-shadow`s replace `.focus-ring:focus-visible`'s **entire** focus paint (base.css:174-178, `outline:none` + shadow) | the paint is `outline: var(--focus-ring-width) solid …; outline-offset: 2px` — a **different property** | the ring survives both states; the state shadows were nonetheless unlayered and are now layered (`e4599ec`) |
| **HLG-18** | the `fira-code` class has *"0 hits in dist/glass-ui.css"* | `@utility fira-code{font-family:var(--font-mono);font-feature-settings:"liga","calt"}` **ships** at 8.0.0 | the class resolves. The `tabular-nums` rider is a separate, live row and is **routed** |
| **HLG-41** | delete the two dead `:style` bindings **before/with** the `cssVarToHex` colour cure | the bindings are **already absent** from `HarmonicLevelGrid.vue`, and `cssVarToHex` no longer exists — `lib/colors.ts` resolves through a token cache with **no `#888888` return** (F.W2 `0106a85`/`f7fa1e3`) | the ORDERING EDICT is **discharged by predecessor**. What remained was deader than banked: the four `--slider-scrub-*` declarations fed `var(--track-color)`, which this file no longer writes — invalid at computed-value time. Deleted (`e4599ec`) |
| **FMD-3 / HLG-3** | 8 `--slider-scrub-*` declarations across two files, *"0 hits in the installed 4.0.0 dist"* | still **∅** at 8.0.0 (`grep -roh -- '--slider-scrub[a-z-]*' dist \| sort -u`) | the premise is **stronger** at the new pin. `.a` deleted its two; the `MorphPhaseConfig.vue` and `SliderControl.vue` copies are **`.c`'s rows on `.a`'s / `.c`'s files** — see §4 |

---

## §3 · A finding this unit made that no banked row carries

### A-a-3 — `--ring` and `--color-ring` are not tokens at the adopted pin, and six focus rings were not painting

- **Measured**: ⟨cmd⟩ (from `fourier-analysis/web`)
  `grep -roh -- '--[a-z-]*ring[a-z-]*: *[^;}]*' node_modules/@mkbabb/glass-ui/dist --include='*.css' | sort -u`
  → `--control-edge-ring` · `--dock-ring` · `--dot-ring-*` · `--focus-ring-color` ·
  `--focus-ring-shadow` · `--focus-ring-width` · … and **no `--ring`, no `--color-ring`**.
  ⟨cmd⟩ `grep -rn -- '--ring *:\|--color-ring *:' src public` → **∅**.
- **Consequence**: `outline: 2px solid var(--ring)` is invalid at computed-value time and is
  **dropped**. Six read sites across five files — exactly the extent `FM-2` banked for the ring
  register — were painting **no focus ring at all** at HEAD.
- `FM-2`'s F.W4 rider is *"six sites → `--focus-ring-color`, one edit"*. Three sites are inside
  this unit's bounds and are cured at `2e41c00`. **Three are not, and are named rather than
  written** (a write outside the writable set is an ESCALATION):
  `web/src/components/visualization/ImageUpload.vue:200` → **`.c`** ·
  `web/src/components/visualization/gallery/GalleryCard.vue:222` and `:223` → **`.d`**.
  ⊘ `GalleryCard.vue:222` is `border-color: var(--ring)` and `:223` a `color-mix` over it — the
  same undeclared token in a second property, so the card's focus affordance is doubly absent.

### A-a-4 — a bare `@layer` statement in `style.css` seats the layer UPSIDE DOWN

- `FR-AH-30` rules the `@layer components` remedy dead because it **reverses** the outcome. The
  same reversal is reachable by a second route this unit hit and measured: Vite emits SFC
  `<style>` output **before** the entry stylesheet (`main.ts` imports `App.vue` above
  `./style.css`), so the first `@layer glass-overrides { … }` block in a **component** registers
  the layer first — i.e. at the **bottom** of the order, beneath `components`.
- **Measured at the emitted bundle before the fix**: `glass-overrides` at byte **4193**,
  `properties` **33911**, `theme` **36806**, `base` **41501**, `components` **45523**,
  `utilities` **235579**.
- **Cure** (`e4599ec`): one `@layer theme, base, components, utilities, glass-overrides;`
  statement in the document head — first in document order in **both** modes, because the build
  appends its `<link>` at the end of `<head>` and the dev server injects `<style>` elements at the
  end too.
- **Browser-verified at the built bytes**, `.nav-dropdown-item` after the cure:
  `min-block-size: 44px` (the producer's coarse-pointer floor, restored),
  `transition-property: background-color, color, border-color, box-shadow, translate, scale`
  (the six-leg list, restored — `MISS-3`'s truncation to two legs is gone, so the
  `--menu-row-lift: -1px` springs instead of snapping), and `gap: 10px` (the layered consumer
  divergence, surviving). ⊘ Any later seat that moves the order statement out of the head
  re-inverts the cascade silently.

---

## §4 · Bounds findings — rows whose FILE and whose SECTION are owned by different units

Recorded because neither unit can discharge them alone and neither should widen its own bounds.

| rows | file | file owner (unit plan §Disjointness) | section owner (unit plan §Sections) |
|---|---|---|---|
| `MPC-7` · `MPC-8` · `MPC-9` · `MPC-24..27` · `MPC-30` · `MPC-32` · the `MPC-31` ONE-CUT | `web/src/components/morph/MorphPhaseConfig.vue` | **`.a`** | **`.c`** (§2.K) |
| `FR-MSP-1..3` · `FR-MSP-7..10` · `MSP-D-15..D-24` · `MSP L-07/L-17/C-11` · MSP PRM-residue | `web/src/components/morph/MorphShapePreview.vue` | **`.a`** | **`.c`** (§2.K) |
| `FMD-3`'s sibling half (`--slider-scrub-*` + its `--track-color` writer) | `MorphPhaseConfig.vue` · `web/src/components/ui/SliderControl.vue` | **`.a`** · **`.c`** | **`.a`** (FMD) · **`.c`** (SliderControl) |

`.a` wrote **only** the rows in its own sections, and only on files in its own writable set. The
`MPC-*` and `FR-MSP-*`/`MSP-*` rows are **NOT landed** and are **not** silently dropped: they need
either a dated bounds addendum moving the two files into `.c`'s writable set, or a dispatch that
gives `.a` those sections. ⊘ `MPC-31` is declared a **ONE CUT** that *"spans F.W1+F.W4"* — it
cannot be half-landed across a bounds seam, which is exactly why this is raised before either seat
touches it.

---

## §5 · §3 D7 and D10 — POSED, never answered

The spec's §3 opens *"Each is ruled in `DECISIONS-F.W4.md`"*, and unit `.i` ruled the docket at
`aacf5f28`. `.a` consumes those rulings and authors none. Restated here only so the posture is
legible from this unit's own record:

- **D7 · `HLG-35`** — the two rails share no scale, so fill can invert against the true band while
  `low < high` holds. `.i` ruled **DEFERRED-WITH-DEFAULT**, posed to SS-3/SS-4, and §3 forecloses
  a rename in terms. `.a` **did not** rename, did not collapse the two rails onto one domain, and
  did not adopt the reka two-thumb range. What `.a` did do is orthogonal and does not pre-empt
  either branch: it raised the rails' boundary contrast (`HLG-37`) and ordered the state classes
  (`FMD-18`). Both survive whichever way D7 lands.
- **D10 · `FR-AH-2`'s font leg** — *"ONE decision, stated"*. **STATED** at `a3f1fc2`: commit to the
  CM identity rather than import glass-ui's font corpus, on the measurement that the corpus is
  132,840 B for two families, one of which has zero application sites in this app. The decision is
  this unit's to state and it is stated with its arithmetic, not its taste.
- **D10 · `FR-AH-16`(+`-29`) ⊕ `FM-21`'s scaling-system owner** — **POSED, NOT ANSWERED.** `FM-21`
  *retires every absolute-px figure*, which makes the cure a design decision about which system
  owns the app's pixel ladder (F.W0-adjacent). `G-15(b)` removed the ladder's worst symptom — the
  non-monotonic 45 → 49.5 → 44 px arm, which was the 1.125rem band — but it decides nothing about
  the owner. The witness at 768×1024 coarse is SS-13's.
- **`fr-ContourPreview D:m-6`**-class posture for `HLG-44`: **blocked, by ruling.** `FM-19` is
  **FROZEN-FOREVER with a golden-file diff** (COHESION §0j.D `G-15(c)`), and `HLG-44`'s
  `--minimal` regeneration (75.3 KB of dead fields) is blocked behind `FSE-L-B1`'s provenance
  decision, which is the F.W5–W8 union's. ⊘ `FSE-L-B1` is **DO-NOT-REGENERATE** and `moon.json`
  is **never regenerated** (`G-F4-NEG-ROSTER`); `.a` regenerated nothing.
