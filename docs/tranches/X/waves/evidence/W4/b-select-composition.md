SERVED MODEL: claude-opus-5[1m]

# X-W4 · X.W4.b — the Select-composition evidence bank (gates B1 · B2 · B3)

**Unit** `X.W4.b` · **Track A · X·V (value.js)** · wave **X-W4** · sitting date of record
**2026-09-17**. Wall clock at this seat `2026-09-19 00:16:35 EDT` → close.
**HEAD at entry** `bda34afa`; the cure landed at **`58371516`**.
Every count below is **double-run**; every browser reading is from a run whose full output is
quoted by its command.

---

## 1. Gate readings — BEFORE → AFTER, at this seat's own clock

⟨cmd⟩ `npx playwright test --project=smoke e2e/smoke/a11y-select-title.spec.ts --reporter=line`

| run | when | `[W4-B1]` | `[W4-B2]` | `[W4-B3]` | exit |
|---|---|---|---|---|---|
| born-RED | spec landed, cure not written | `asserted=7 excluded=1 defects=14` | `asserted=7 defects=14` | `producerSliderVars=15 declaredInternal=3 consumerReads=0` | **1 (2 failed, 1 passed)** |
| after, run 1 | cure landed | `asserted=7 excluded=1 defects=0` | `asserted=7 defects=0` | `…consumerReads=0` | **0 (3 passed)** |
| after, run 2 | double-run | `asserted=7 excluded=1 defects=0` | `asserted=7 defects=0` | `…consumerReads=0` | **0 (3 passed)** |

**B1 GREEN · B2 GREEN · B3 GREEN (fence, unmoved).**

The born-RED defect set was not one class repeated — it was the gate's two named failure directions
firing together, two per trigger:

```text
/#/mix      · still carries a literal aria-label="Color space"        · no aria-labelledby — nothing names it
/#/mix      · still carries a literal aria-label="Hue method"         · no aria-labelledby — nothing names it
/#/generate · still carries a literal aria-label="Generation preset"  · no aria-labelledby — nothing names it
/#/generate · still carries a literal aria-label="Color harmony"      · no aria-labelledby — nothing names it
/#/gradient · still carries a literal aria-label="Gradient type"      · no aria-labelledby — nothing names it
/#/gradient · still carries a literal aria-label="Interpolation space"· no aria-labelledby — nothing names it
/#/gradient · still carries a literal aria-label="Hue interpolation"  · no aria-labelledby — nothing names it
```

and B2's, likewise two per trigger — **the size arm and the LIFT arm**:

```text
/#/… · a hand-pinned h-9 utility survives
/#/… · blockSize=36 != --control-h-sm=54 under the coarse axis — the height does not ride the axis
```

## 2. The composed names, read out of the AFTER census (not out of the source)

`[W4-B1-CENSUS]`, run 2. `IN` = inside the pane the route names; `OUT` = outside this unit's bounds.

| route | scope | computed title | `aria-label` | shares field root | title box inside field | blockSize | `--control-h-sm` |
|---|---|---|---|---|---|---|---|
| `/#/mix` | **OUT** | *(none)* | `"Select color space"` | false | false | 83.19 | 36 |
| `/#/mix` | IN | `"Color space"` | **null** | true | true | 36 | 36 |
| `/#/mix` | IN | `"Hue method"` | **null** | true | true | 36 | 36 |
| `/#/generate` | IN | `"Preset"` | **null** | true | true | 36 | 36 |
| `/#/generate` | IN | `"Harmony"` | **null** | true | true | 36 | 36 |
| `/#/gradient` | IN | `"Type"` | **null** | true | true | 36 | 36 |
| `/#/gradient` | IN | `"Space"` | **null** | true | true | 36 | 36 |
| `/#/gradient` | IN | `"Hue"` | **null** | true | true | 36 | 36 |

Each `IN` row additionally passed `expect(trigger).toHaveAccessibleName(titleText)` — **the browser's
own AX computation**, not this spec's re-implementation of the name rule.

The single `OUT` row is `demo/color-session/ColorSpaceSelector.vue`'s trigger, mounted in the picker
pane that `/#/mix` seats beside the mix pane at 1280×720. It is in **no** open-partition W4 §4 row —
it appears only in §4's trigger-gated `X.W4.g` table, and X-W0.j's census **FAIL (1 of 4 at the
elected 8.0.0)** keeps that unit CLOSED. It is counted and printed by the gate on every run
(`excluded=1`), never filtered silently.

## 3. The coarse lift — measured TWICE, by two independent mechanisms

**(a) In-project, by driving the producer's own axis variables** (the B2 lift arm). The spec installs
exactly what `dist/styles/tokens/light-dark.css` installs under `@media (pointer: coarse)` —
`--ui-scale: 1.5`, `--control-floor: 2.75rem` — and re-measures:

| | token `--control-h-sm` | trigger `blockSize` |
|---|---|---|
| fine | 36 | 36 |
| coarse axis | **54** | **54** |

Before the cure the same probe read token **54** against a blockSize frozen at **36** — the pinned
`h-9` could not move. That is the falsifier biting on its intended arm.

**(b) In a REAL coarse context** — a Pixel 7 browser context, at the artefact-8 capture:

```text
⟨cmd⟩ CAP_PHASE=before … node …   → before/coarse: triggers blockSize 36 · 36 · 36
⟨cmd⟩ CAP_PHASE=after  … node …   → after /coarse: triggers blockSize 54 · 54 · 54
```

**36 → 54 on a real touch device.** The `44px` `--touch-target` floor is cleared with 10px to spare,
and the lift cost no consumer byte — it fell out of the published `size="sm"` rung.

## 4. Source counts — double-run, BEFORE → AFTER

⟨cmd⟩ the six greps, run twice, identical both runs:

| instrument | at wave open (2026-08-03 spec) | measured at entry `bda34afa` | AFTER `58371516` |
|---|---|---|---|
| `grep -rn '<SelectTrigger' demo --include='*.vue' \| wc -l` | 13 | **13** | **13** (count unchanged; **8** re-composed) |
| `grep -rn 'class="[^"]*\bh-9\b' demo --include='*.vue' \| wc -l` | 15 | **15** | **7** |
| `grep -rn 'section-label' demo --include='*.vue' \| wc -l` | 14 (spec) | **17** | **9** |
| …as a class use (`class="…section-label`) | — | **16** | **8** |
| `grep -rn '<label' demo --include='*.vue' \| grep -v 'for=' \| wc -l` | 9 | **9** | **6** |
| `grep -rn '<LabeledField' demo --include='*.vue' \| wc -l` | 0 | **0** | **8** |
| `grep -rn -- '--slider-range-origin' demo src \| wc -l` | 0 | **0** | **0** |

## 5. Divergences from the spec's 2026-08-03 numbers — recorded, no gate moved

| # | spec | measured | disposition |
|---|---|---|---|
| **b-1** | B2: *"**15** `class="…h-9…"` sites, **all Select triggers in mix / generate / gradient**"* | the 15 reproduce, but **only 8 are Select triggers in this unit's three files**. The other seven: `AuroraPane.vue:122,142,156,170` (four Select triggers, `demo/scenes/atmosphere/` — in **no** W4 §4 row, open partition or `.g`); `GenerateControls.vue:165` (a glass `<Button>`, not a trigger) and `:211` (a `w-9 h-9` WatercolorDot swatch — **`X.W4.g`'s** seat, `W4.md:162`); `PaletteSlugBar.vue:2` `min-h-9` (a grep-shape hit: `\bh-9\b` matches inside `min-h-9`) | **the population premise is FALSE and is recorded as such.** B2's assertion is over *triggers*, and the gate asserts over the surfaces the spec's own sentence names — mix / generate / gradient. The four AuroraPane triggers are a real, measured, **out-of-bounds** remainder: see §8 residual 1 |
| **b-2** | B1's cure surface (record **d-3**) | confirmed at the bytes: of the seven files holding `section-label`, three are this unit's. `AdminTagsPanel.vue` + `SearchFilterBar.vue` are **unit a's**, `MixSourceSelector.vue` is **`.g`'s**, `TagEditPopover.vue` is in **no** W4 table | **honoured exactly.** Eight compositions cured; four files untouched. A repo-wide reading would be a §3a escalation, not a widening |
| **b-3** | B1: *"**14** `.section-label` uses"* | **17** hits / **16** class uses at entry (the d-1 counting-shape divergence, re-measured unmoved) | recorded; neither number is an assertion |
| **b-4** | B3: *"zero consumer reads of producer-internal slider variables"*, instrumented as `--slider-range-origin` | the producer declares **three** slider variables, not one: `--slider-range-origin`, `--slider-track-height`, `--slider-thumb-size`. Consumer reads of all three = **0** | the fence was **widened to the measured set**, never narrowed. It reads the producer at run time, so a new producer internal grows the fence with it |

## 6. The visible register change — stated, not buried (artefact 8)

`gradient-select-composition-{fine,coarse}-{before,after}.png`.

The retiring caption was `<span class="section-label">` — a **producer typography class**
(`glass-ui` `@layer components`: `@apply text-mono-caption; color: var(--muted-foreground)`), i.e.
mono, uppercase, tracked, muted. The composed title is the producer's own `Label` inside
`LabeledField` (`.glass-label`: `--font-text`, `--type-small`, weight 500, `var(--foreground)`).

**So the three gradient captions read `TYPE · SPACE · HUE` before and `Type · Space · Hue` after.**
That is a real, visible change and it is the direct consequence of adopting the producer's published
composition — `LabeledField` renders its own `Label` and publishes no seam for a caption class.

**No demo override was written for it, deliberately.** `demo/styles/utils.css` is in this unit's
writable set, and a rule there could have re-skinned the producer's label through its published
`data-slot="label"` stamp. That would be a per-instance costume over a root vocabulary — the exact
move the tranche's standing glass-ui-first law routes to the producer instead (a `LabeledField`
label-register/label-class seam is a **BH-inbox ask**, stated here, not taken: mail paths are not in
this unit's bounds). The honest record is the screenshot pair.

One consequence is recorded rather than smoothed: `GradientVisualizer.vue:232`'s
`<span class="section-label">Direction</span>` **survives**, so the gradient band now carries two
caption voices in one column. `Direction` titles a **`<Slider>`**, not a Select composition, and
`W4.md` §3 Scope 4 scopes this unit's cure to *"each affected **Select**"*. Converting it would be
invention; it is booked in §8.

## 7. Collateral — measured, separated from pre-existing RED, and escalated

The cure retires seven literal `aria-label`s. Three out-of-bounds specs bind Select triggers by name;
each was run after the cure.

⟨cmd⟩ `npx playwright test --project=smoke e2e/smoke/walk.spec.ts e2e/smoke/oracles/o20-generate-plate.spec.ts e2e/smoke/oracles/o14-preview-truth.spec.ts`
→ **4 failed, 6 passed**.

| spec · line | binding | verdict | cause |
|---|---|---|---|
| `e2e/smoke/walk.spec.ts:89` | `getByRole("combobox", { name: "Generation preset" })` | **RED — CAUSED BY THIS CURE** | the composed name is now `"Preset"`, the caption the user reads. Playwright's default substring match cannot reach it |
| `e2e/smoke/oracles/o20-generate-plate.spec.ts:71` | same | **RED — CAUSED BY THIS CURE** | same |
| `e2e/smoke/oracles/o14-preview-truth.spec.ts:405,472` | `{ name: "Color space" \| "Hue method", exact: true }` | **UNAFFECTED** — both names survive verbatim | the mix captions already said what the `aria-label` said |
| `o14` (its two failing tests) | `.add-slot-ghost` `toHaveAttribute("aria-label", /Add current color/)` at `:397-401` | **RED — PRE-EXISTING, NOT THIS CURE** | see the control below |

**The control, run to separate the two causes** ⟨cmd⟩
`npx playwright test --project=smoke e2e/smoke/views/mix.spec.ts` → **1 failed**, at the *identical*
add-slot assertion, quoting the same message:

```text
Error: the add-slot must be an OPERABLE control, not an aria-hidden decoration —
       glass-ui 7.0.0 WatercolorDot drops tag/aria-label/@click (inheritAttrs:false)
locator resolved to <span … aria-hidden="true" … class="add-slot-ghost …">
```

`mix.spec.ts` touches no caption this unit wrote, and ⟨cmd⟩
`git status --porcelain -- demo/workbenches/mix/MixSourceSelector.vue` → *(empty)*: the file is
untouched by this unit. The failure is the X-W1-documented live WatercolorDot blocker (CC-044,
routed to `X.W4.g`, closed by the census). **It is not this unit's, and it is not claimed as green.**

**The two genuine collateral REDs are a §3a FILE-BOUNDS ESCALATION**, carried out exactly as unit a
carried out its `ColorInput.vue` finding: the repair is named to the byte and **not one byte was
written for it**, because neither path is in `W4.md` §4's table for any unit.

> **The escalation, with its repair stated:** `e2e/smoke/walk.spec.ts:89` and
> `e2e/smoke/oracles/o20-generate-plate.spec.ts:71` bind the Generate preset combobox by the
> `aria-label` this wave's own §5 mechanism orders deleted. Both should read
> `{ name: "Preset", exact: true }` — the caption the control now shows and the name the AX tree now
> computes. Padding the visible caption to `"Generation preset"` instead would change shipped product
> copy so a stale selector keeps matching: the masking move this wave forbids. The orchestrator owns
> the two-line repair, or a dated E-3 bounds addendum admitting the two paths.

## 8. Residuals — nothing silently dropped

1. **Four out-of-bounds Select triggers survive with a literal `aria-label` and a pinned `h-9`** —
   `AuroraPane.vue:122,142,156,170` (`/#/atmosphere`). `demo/scenes/atmosphere/AuroraPane.vue` is in
   **no** `W4.md` §4 row, open partition or trigger-gated ⟨cmd⟩
   `grep -c 'AuroraPane' docs/tranches/X/waves/W4.md` → **0**. They are the exact defect this unit
   cured, in a file it may not open. **Recommended home stated, not taken**: the spec's B1/B2 rows
   name the population *"mix / generate / gradient"*, so admitting the atmosphere scene needs a dated
   E-3 bounds addendum from the orchestrator, or a later wave's own row.
2. **`GenerateControls.vue:165`** — a glass `<Button>` with `class="h-9"` and no `size`, so its box is
   re-pinned off the `md` rung (`--control-h-md` = 40 fine / 60 coarse). It is in **this unit's file**
   but outside this unit's named mechanism (`W4.md:248` moves *trigger* height only; the `h-7` family
   was unit a's Scope 3). Booked for the wave's size-axis law, which `W4.md:481` says **X-W7**
   inherits. `:211`'s `w-9 h-9` is a WatercolorDot swatch and is **`X.W4.g`'s** seat — untouched by
   ruling.
3. **A fourth Select trigger exists in the Gradient pane and is PRODUCER-OWNED** —
   `aria-label="Easing preset"`, `blockSize` 40 fine / 60 coarse (the default `md` rung). It comes
   from `@mkbabb/glass-ui/easing`'s `EasingPicker` ⟨cmd⟩
   `grep -rln 'Easing preset' node_modules/@mkbabb/glass-ui/dist/` → `dist/easing.js`; the string
   appears **nowhere** in `demo/`. It is invisible to the gate because the easing accordion is closed
   at rest, and it is correctly out of scope either way: a producer control naming itself is not a
   consumer defect. Recorded so a later seat does not rediscover it as a miss.
4. **`demo/styles/utils.css` took ZERO bytes** — the grant is permission, not obligation. Measured:
   `.section-label` is a **producer** class (`glass-ui` typography utilities), so retiring eight uses
   orphans no demo rule; and the file's one control-bar rule, `.section-subtitle`, already had **0**
   consumers before this unit opened ⟨cmd⟩
   `grep -rn 'section-subtitle' demo --include='*.vue' --include='*.css'` → its own definition only.
   Deleting a rule this unit neither created nor orphaned is not its cure.
5. **`ComponentSliders.vue` took ZERO bytes** — §5's slider clause is conditional (*"express **any**
   direction/inversion need"*), and the need was measured absent at all three in-bounds `<Slider>`
   seats (`a16-retest-receipt.md` §5). Inventing one would be invention. Its three `--slider-*` reads
   are consumer feed seams the producer never declares, and the four `--slider-track-bg` sites are
   **CC-105's**, booked to `X.W4.g` — *"never before, never by shim"*.
6. **`prettier --check demo e2e` is RED over 202 files, pre-existing** — all three touched `.vue`
   files are unclean **at HEAD too**: their HEAD blobs were extracted to a scratch tree and checked
   ⟨cmd⟩ `npx prettier --check <scratch>/demo/**/*.vue` → **3 of 3 warn**. Reformatting them would
   bury this unit's meaning in churn. The one file this unit **created** is prettier-clean, so no new
   format debt is introduced. Recorded for X-W11's hygiene walk (unit a booked the same row).
7. **`X.W4.g` untouched and CLOSED** — ⟨cmd⟩ `grep -rn 'watercolor-dot' demo | wc -l` → **11**, the
   bank intact.

## 9. Method notes that bear on reading the numbers

- **The gate's own instrument was hardened once, mid-unit, and the reason is measured**: the first
  AFTER run failed B1 with `page.evaluate: Execution context was destroyed, most likely because of a
  navigation`. Cause: this unit's new `@mkbabb/glass-ui/labeled-field` import is a dependency the dev
  server had not pre-bundled, so vite's optimizer re-bundled and forced a **full page reload** mid
  poll. The cure was to make every wait navigation-safe (`waitForFunction` re-installs in the new
  context; the view threads as an argument instead of a `<body>` stamp) — `3d548669`. **Not one
  assertion changed**, and the born-RED verdict was taken before the hardening and stands.
- **The census scope is structural, never an allowlist**: the pane card is found from its own title
  (`h3.pane-header-title` whose text is the view label). No element is named to be skipped; the
  excluded count is printed on every run.
- **Artefact 8's capture used a throwaway scratchpad script and a throwaway dev server on :9123**,
  never a repo file (CC-019's structural ban is about the gate FORM, and the gate is the spec). The
  BEFORE frames were taken by writing the pre-cure blobs into the worktree with
  `git show <ref>:<path> > <path>` and writing them back from `HEAD` immediately after — **no
  `git stash`, no `reset`, no index write** ⟨cmd⟩ `git diff --cached --stat -- demo/` → *(empty)*
  throughout, and `git status --porcelain -- demo/` → *(empty)* at close.
