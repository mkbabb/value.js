claude-opus-5[1m] (served model id)

# CHALLENGE — `EquationModeToggle.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EquationModeToggle.vue` (80 lines: 6 script · 25 template · 48 style).
**Substrate** fourier HEAD `cd26c65`, tree `9a66411d`, branch `m/w1-bump-migration`, 28 dirty paths — the exact tree adjudicated by R4-9 / census §1. Installed producer: `@mkbabb/glass-ui@4.0.0`. Target producer: **7.0.0** (`/Users/mkbabb/Programming/glass-ui`).
**Mode** static + source-derived, read-only. No browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier, and **two of my own claims died to their falsifiers** (recorded at §5).

**Files read whole (read-only):** the subject · `web/src/lib/equation/types.ts` · `web/src/lib/equation/notation.ts` · `web/src/components/equation/EquationView.vue` (sole consumer) · `web/src/components/equation/NotationPills.vue` (sibling) · `web/src/components/equation/composables/useEquationCache.ts` · `web/src/components/equation/FunctionInput.vue` (notation owner) · `glass-ui@7.0.0` `src/components/button/Button.vue` + `button/index.ts` + `button/styles.css` + `_shared/axes.ts` + `styles/glass/material.css` + `styles/utilities/base.css` + `components/configurator/styles.css` + `components/tabs/SegmentedTabs.vue` + `components/tabs/index.ts` · installed `glass-ui@4.0.0` `dist/components/ui/button/{index,Button.vue}.d.ts` + `dist/button-BNDWhAZb.js` + `dist/styles/{utilities/base.css,tokens/light-dark.css,tokens/offsets-sizing.css,tokens/scale-paper.css,tokens/scheme-motion.css,glass/material.css}` · `api/routers/equations.py` + `api/models/equations.py`.

**Corpus folded (not re-invented):** CENSUS-2026-08-03 §1/§2/§3a + its 2026-08-03 addendum · lane-frontend §0/§3/§4/§5/§6/§8/§9 · lane-crud (no seam here) · intake `lane-fourier-r3-r6.md` rows **R5-7**, **R3-7a**, **X-2**, **X-9**, **R3-3**. Where the tree contradicts the corpus I say so explicitly (§4).

---

## §0 — Verdict

| | count |
|---|---:|
| **BLOCKER** | 2 |
| **MAJOR** | 4 |
| **MINOR** | 8 |
| **defects (B+M+m)** | **14** |
| INFO / observation (not counted as defects) | 3 |
| **SUPERLATIVE** (L-18 runs both ways) | 3 |

The component is a 6-line script wrapped in 48 lines of CSS that **re-derives, by hand, three of the four state arms the pinned producer already ships** — and drops the fourth, which is the one that carries the accessibility semantics. Its two `<Button>` callsites sit inside a **95-site / 34-file** silent break surface that lane-frontend §5 does not enumerate. Its `defineModel` contract cannot express "the mode you selected is not currently renderable", and the consumer's wire types make that state reachable and silent.

---

## §1 — BLOCKERS

### L-B1 · `variant="ghost"` is definition-absent at glass-ui 7.0.0 and will fail **silently**, not loudly — 2 sites here, **95 sites / 34 files fleet-wide**

**Severity BLOCKER.** `EquationModeToggle.vue:11` and `:21`.

At the installed pin the prop is legal — `web/node_modules/@mkbabb/glass-ui/dist/components/ui/button/index.d.ts` declares `variant?: "link" | "default" | "solid" | "primary-audacious" | "gold-audacious" | "destructive" | "outline" | "secondary" | "accent" | "ghost" | "glass" | "glass-wash" | "ai"` and `Button.vue.d.ts` `interface Props { variant?: ButtonVariants["variant"]; size?: …; … }`.

At the target pin the prop **does not exist**. `glass-ui/src/components/button/Button.vue:18-31`:

```ts
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   // "primary" | "secondary" | "quiet" | "text"
    tone?: Tone;
    size?: ButtonSize;           // Extract<Size, "xs"|"sm"|"md"|"lg">
    iconOnly?: boolean;
    loading?: boolean;
    …                            // NO `variant`
}
```

`button/index.ts` exports `ButtonProps`/`ButtonEmphasis`/`ButtonSize` only. `_shared/axes.ts` states the SUB-RANGE LAW that made the rename structural, not cosmetic.

**Why this is a BLOCKER and not a routine rename row.** fourier's `web/tsconfig.json` (whole file read) sets no `vueCompilerOptions` and therefore **no `strictTemplates`** — it defaults off. An unknown prop on a Vue component is not a type error under that default; it becomes a **fallthrough attribute**. So after F.W1 each of these buttons will:

1. emit a literal `variant="ghost"` attribute onto the `<button>` element (glass-ui 7 `Button.vue:96-98` `v-bind="hostAttrs" :class="hostClass"` on `<Primitive>`, `inheritAttrs` default true), and
2. fall back to `emphasis: "secondary"` / `tone: "neutral"` (`Button.vue:33-40`), which sets `glassMaterial = true` (`:46-50`) and therefore applies **`glass-wash glass-capsule glass-capsule-hover`** (`:66-73`) to *each* button —
3. **stacked under this component's own wrapper `glass-wash`** (`EquationModeToggle.vue:9`), i.e. three glass plates in a 2-button control.

**And the local CSS cannot cancel it.** `.eq-toggle-btn { background: transparent }` (`:54`) fights the wrong box: at 7.0.0 the wash's paint is on the pseudo-element (`glass-ui/src/styles/glass/material.css:135-142`, `.glass-wash::before` moving-specular) and the capsule fill is `--glass-capsule-fill`, neither of which a `background` shorthand on the host touches.

**Fleet measurement (mine, this lane).** Python AST-ish scan over every `.vue` that imports `@mkbabb/glass-ui/button`, matching `<Button …>` blocks carrying `variant=` (multiline-aware):

```
35 files import glass-ui/button · 99 `<Button` tags
95 `<Button …variant=…>` sites over 34 files
  12 gallery/AdminUserList.vue · 7 GalleryView.vue · 7 gallery/GalleryCardModal.vue
   6 gallery/AdminFlaggedPanel.vue · 6 gallery/GalleryCard.vue · 5 paper/MobileFloatingToc.vue
   5 gallery/UserSlugBar.vue · 4 paper/PaperSidebar.vue · 4 gallery/GallerySearchBar.vue
   3 FunctionInput.vue · 3 paper/search/PaperSearchModal.vue · 3 visualization/BasisSelector.vue
   2 EquationModeToggle.vue · … (22 more files at 1–2)
```

**FALSIFIER (and why it holds).** (a) *"vue-tsc will catch it, so it's loud not silent"* — falsified: no `strictTemplates` anywhere in `web/tsconfig.json`, and it is the only tsconfig in `web/`. (b) *"lane-frontend §5 already budgeted it"* — falsified by reading §5's break table whole: it enumerates removed **subpaths** (`metric-badge` ×7, `hover-card` ×2, `hover-popover` ×2), removed **dock members** (×3), the removed **type** `ToastVariant`, the lucide rename ×35, and three peer floors. `variant` on `Button` is **absent from that table**; the WT-diff prior-art rows it does show (`variant="glass-scrubber"` → `variant="standard"`, ×9) are a *different* component's variant, which is exactly why the Button rename hid. (c) *"maybe `variant` survives via `class` passthrough"* — falsified: the 4.0.0 paint comes from a `cva()` call (`dist/button-BNDWhAZb.js`, `u("btn-pill tap-squish focus-ring …", { variants: { variant: { … ghost: "bg-transparent text-foreground/70 hover:bg-foreground/8 …" } } })`) that does not exist at 7.0.0.

**Disposition.** Budget **95 sites / 34 files** into F.W1 as a first-class row alongside the 35-site lucide rename — it is the single largest uncounted line item in the uplift, and the only two gates the tree has (`vue-tsc` + 29 single-chromium Playwright tests, lane-frontend §0/§9 carry 11) cannot see it. For *this* component the correct target is `emphasis="quiet"` (`glass-ui/src/components/button/styles.css:69-79` — the transparent, non-glass rung), **not** the mechanical prop-deletion.

---

### L-B2 · The `defineModel` contract cannot express "this mode is not currently renderable" — and the consumer makes that state reachable, silent, and the **default**

**Severity BLOCKER** (user-visible wrong output in the default state).
`EquationModeToggle.vue:5` · `EquationView.vue:39, 43, 49-51, 95-98, 114, 130-147, 177-181` · `lib/equation/types.ts:38-42` · `api/routers/equations.py:90-96`.

The component's entire contract is `const model = defineModel<EquationDisplayMode>({ required: true })` — a two-valued command with no availability, staleness, or disabled input. Trace what the consumer does with it:

```
EquationView.vue:43   const eqMode = ref<EquationDisplayMode>("sigma")        ← DEFAULT is sigma
EquationView.vue:49-51 activeLatex = eqMode==='sigma' && displayLatexSigma ? displayLatexSigma : displayLatex
EquationView.vue:114  displayLatexSigma.value = result.value.latex_sigma      ← the ONLY runtime writer
EquationView.vue:39   displayLatexSigma.value = cachedRes?.result?.latex_sigma ?? ""   ← the only other writer
EquationView.vue:138  displayLatex.value = resp.latex                          ← doSimplify refreshes ONLY the expanded form
EquationView.vue:177-181 watchDebounced([notation, budget]) → doSimplify()     ← notation flip routes HERE
EquationView.vue:95-98 doCompute early-returns into doSimplify when computeKey() is unchanged
EquationView.vue:82-84 computeKey() = expr|domainStart|domainEnd|nHarmonics    ← EXCLUDES notation
```

And the refresh is impossible at the **wire level**, not merely unimplemented — `lib/equation/types.ts:38-42`:

```ts
export interface SimplifyResponse { latex: string; energy_captured: number; term_count: number; }
```

There is **no `latex_sigma` on `SimplifyResponse`**. `doSimplify` structurally *cannot* refresh the Σ form.

⇒ **Flip the notation pills (trig → exponential → polar) while `eqMode === "sigma"` — the default — and the equation card does not change.** The Σ rendering still shows the notation from the last full compute, while the toggle's amber `.is-active` glyph asserts the sigma view is current. The control paints a lie about the surface it governs, and the component has no prop with which to say otherwise.

**FALSIFIER — I hunted for four escapes; all four fail.**
1. *"Changing notation triggers a recompute."* — Falsified. `FunctionInput.vue:223` binds `<NotationPills v-model="notation" />` and emits `compute` from exactly three places: `applyPreset` (`:40`), Enter on the expression field (`:102`), and the explicit Compute button (`:147`). None is a notation change.
2. *"`latex_sigma` is notation-independent, so nothing is stale."* — Falsified at the source: `api/routers/equations.py:96` `latex_sigma = render_latex_sigma(terms, req.notation)` — the notation is a formal parameter. `api/models/equations.py:30` documents it as "sigma-notation form with approximate c_n".
3. *"Some other site writes `displayLatexSigma`."* — Falsified: the identifier occurs at `EquationView.vue:39, 50, 114` only; `:50` is a read.
4. *"The mode resets to expanded on a notation change, so the user never sees stale sigma."* — Falsified: nothing writes `eqMode` except this component (`:270` `v-model="eqMode"`), and `:43` initialises it to `"sigma"`.

**Attribution, stated plainly.** The *symptom* lives in `EquationView.vue` and the API envelope; the *contract hole* is this component's — a mode selector that owns a mutually-exclusive view mode must be able to receive per-mode availability (`:available`, `:disabled`, or a `SelectionOption[]` with `disabled`), and this one deliberately cannot. Cure: add `latex_sigma` to `SimplifyResponse` (the honest fix) **or** widen the model to an option list carrying `disabled` and have the consumer disable Σ while it is stale. Route: **F.W5** (envelope) + **F.W4** (component contract).

**Claim I killed myself:** I first wrote this up as *budget*-staleness (the budget slider is mutated automatically by `EquationView.vue:151-159`, so it fires constantly). Falsified by `api/routers/equations.py:90-96` — `simplify_series(terms, req.budget, …)` feeds `latex`, while `render_latex_sigma(terms, req.notation)` takes **no budget**. Σ is budget-independent by construction. The defect is notation-only. Recorded at §5.

---

## §2 — MAJOR

### L-M1 · `overflow: hidden` on the wrapper clips the producer's OUTSET keyboard focus ring — a hazard the producer documents by name

**Severity MAJOR.** `EquationModeToggle.vue:37` (`overflow: hidden`) over `:10` and `:20`.

Both buttons carry `.focus-ring` — it is baked into the 4.0.0 cva base string (`dist/button-BNDWhAZb.js`: `u("btn-pill tap-squish focus-ring whitespace-nowrap …")`) and into the 7.0.0 `hostClass` (`Button.vue:68` `cn("button tap-squish focus-ring …")`). The utility is an **outset box-shadow**, installed 4.0.0 `dist/styles/utilities/base.css:174-178`:

```css
.focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow); }
```

and `dist/styles/tokens/scale-paper.css:66` `--focus-ring-shadow: 0 0 0 var(--focus-ring-width) color-mix(…), …` — no `inset` keyword. An ancestor `overflow: hidden` clips descendant box-shadow. The producer states the exact hazard, `glass-ui/src/components/configurator/styles.css:104-106`:

> "NO `overflow: hidden` on the card: the section-header trigger's OUTSET `.focus-ring` (box-shadow) must NOT be clipped by the card box (**a keyboard-a11y regression**)"

This is **live at the installed pin**, not a post-uplift risk. The forced-colors arm is clipped too (`dist/styles/utilities/a11y-overrides.css:79-84` lists `.focus-ring:focus-visible` and `.btn-pill:focus-visible` for `outline: 2px solid Highlight`; outlines are likewise subject to ancestor clipping).

**Post-uplift escalation.** At 7.0.0 the cure "just delete `overflow: hidden`" **stops working**: `glass-ui/src/styles/glass/material.css:105-110` adds `.glass-wash, .glass-quiet, .glass-resting, .glass-card { contain: paint; }`, and this component puts `glass-wash` on the clipping wrapper (`:9`). Paint containment clips regardless of `overflow`. I verified this rule is **absent** at the installed 4.0.0 (`dist/styles/glass/material.css` has no `contain: paint`), so the escalation is genuinely new at 7. Cure must move the wash off the button-containing box (or adopt `SegmentedTabs`, L-M4).

**FALSIFIER.** (a) *"the ring is inset, so nothing clips"* — falsified by the token text above. (b) *"the buttons are the wrapper's only children and the ring fits inside"* — falsified by geometry: `.eq-toggle` is `display:flex` with **zero padding** (`:34-40`), so each button's border box is flush with the wrapper's content box; a `0 0 0 <width>` outset ring has nowhere to render. (c) *"scoped CSS doesn't reach the child component's root"* — falsified: Vue scoped styles do attach the parent's `data-v-*` to a child component's root node, which is exactly how `.eq-toggle-btn` (`:13`, `:23`) reaches `<Primitive as="button">` at all.

**UNPROVEN-NEEDS-LIVE (SS-13):** the exact clipped pixel extent. The clipping relation itself is static-provable and needs no browser.

### L-M2 · The producer ships `aria-pressed:` state paint; this component hand-rolls the paint as `.is-active` and ships **no** semantics — against a house pattern documented in its own directory

**Severity MAJOR.** `EquationModeToggle.vue:14, 24, 63-66` (and `:15`, `:25`).

The 4.0.0 `ghost` variant string, read verbatim from `dist/button-BNDWhAZb.js`:

```
ghost: "bg-transparent text-foreground/70 hover:bg-foreground/8 hover:text-foreground
        active:bg-foreground/12 aria-pressed:bg-foreground/10 aria-pressed:text-foreground"
```

Now the local CSS, `:49-66`:

| local rule | producer arm it re-derives |
|---|---|
| `:49  color: var(--muted-foreground)` | `text-foreground/70` |
| `:58-60 :hover { color: var(--foreground) }` | `hover:text-foreground` |
| `:63-66 .is-active { background: color-mix(in srgb, var(--foreground) 8%, transparent) }` | `aria-pressed:bg-foreground/10` (and `hover:bg-foreground/8` — the exact 8% recipe) |
| **(absent)** | **`aria-pressed` — the attribute that makes the state exist for assistive tech** |

Three arms re-derived by hand; the fourth — the one carrying meaning — dropped. Because the active state is expressed **only** as a local class plus `color: var(--viz-amber)`, a screen-reader or switch user gets two unlabelled buttons with no pressed state, and the *only* accessible name is the `title` attribute (`:15`, `:25`) over glyph-only content (`&Sigma;` at `:18`, `a + b` at `:28`).

**This is a deviation from a pattern the tree itself documents, in this very directory.** `web/src/lib/equation/notation.ts:1-8`:

> "Notation pill definitions … **matching the `.basis-toggle` pattern from BasisSelector** (glass-ui `<Button variant="outline" size="sm">` **with `aria-pressed` driving an instance-scoped tint**)."

Three in-tree implementations honour it — `BasisSelector.vue:144` (`:aria-pressed="isBasisActive(...)"` + `.basis-toggle[aria-pressed="true"]` at `:269, :274`), `GallerySearchBar.vue:120` (`:aria-pressed="basisFilter === b.key"` + `[aria-pressed="true"]` at `:218`), `CanvasOverlayButton.vue:20` (with a written rationale at `:6`). The tree's most careful treatment, `EasingPicker.vue:9-15`, even argues *against* `aria-pressed` for a *radio* group — proving the authors know the distinction and chose deliberately elsewhere. `EquationModeToggle` and its sibling `NotationPills.vue:22` are the two files in `equation/` that dropped it.

**FALSIFIER.** (a) *"`title` supplies the name and the accessible-name computation is enough"* — a name is not a **state**; nothing conveys which of two mutually exclusive modes is active. (b) *"reka-ui's `Primitive` adds it"* — falsified by reading `glass-ui/src/components/button/Button.vue:82-108` whole: the only ARIA it emits is `aria-disabled` and `aria-busy`. (c) *"`aria-pressed` would be wrong here — it's a radio group"* — this is the strongest counter and I concede the *shape* argument: two mutually-exclusive modes are radio-shaped, so the fully-correct fix is `role="radiogroup"` + `aria-checked` (or `SegmentedTabs` `semantics="toggle"`, L-M4). It does **not** rescue the current code, which ships *neither*. And it makes the finding sharper, not softer: the producer's ghost variant already paints `aria-pressed`, so the cheapest correct state is one attribute away and would **delete** local CSS lines `:63-66`.

**Axis note.** This row lives on the L axis as a *contract* defect (state not exposed at the component boundary, producer state-machinery bypassed). Expect legitimate overlap with the D/C challenges; do not double-count severity.

### L-M3 · Hardcoded `height` + `padding` bypass `--control-h-sm` / `--ui-scale` / `--control-floor` and defeat the producer's 44 px coarse-pointer law

**Severity MAJOR.** `EquationModeToggle.vue:46-47`:

```css
padding: 0 0.6rem;
height: 2.25rem;
```

`size="sm"` (`:12`, `:22`) is *declared* and then *overridden*. What it should have resolved to, installed 4.0.0 `dist/styles/tokens/offsets-sizing.css:150`:

```css
--control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor));
```

and `dist/styles/tokens/light-dark.css:18-23`:

```css
@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5); --control-floor: var(--touch-target, 2.75rem); } }
```

with the producer's own comment at `:12-16`: *"so every scaled control-height `max(scaled, floor)` clamps at ≥ 44px regardless of the scalar."* `--touch-target: 2.75rem` at `offsets-sizing.css:461`.

The literal `2.25rem` is precisely the `--ui-scale: 1` value of the token with **both** clamps stripped: on a coarse pointer these two buttons stay at 2.25rem while every other glass-ui control on the page grows 1.5× and floors at 44 px. `padding: 0 0.6rem` does the same to the inline axis (producer: `padding-inline: calc(1rem * var(--ui-scale))`, `glass-ui/src/components/button/styles.css:12`).

This lands on a surface the tree *explicitly* ships to touch: `EquationView.vue:44, 187-192` render a mobile `Controls | Canvas` tab bar, and this toggle is anchored over the canvas card (`:269-271`, `.eq-mode-anchor` `:426-429`).

**7.0.0 compounding.** `glass-ui/src/components/button/styles.css:26-27` resolves the stadium corner as `border-radius: calc(var(--button-size) / 2)` where `--button-size` is the *token*. Overriding `height` without re-pointing `--button-size` desynchronises the corner from the box, which is the exact failure mode the 24-line comment at `styles.css:13-25` was written to prevent.

**FALSIFIER.** (a) *"2.25rem is still ≥ the WCAG 2.5.8 24×24 minimum"* — conceded, and that is why this is MAJOR and not BLOCKER: at fourier's mobile root sizing (`style.css:41-51`, 1.125rem → 1rem @ 768px) 2.25rem ≈ 40.5 px, above the AA floor, below the producer's own 44 px law and below AAA 2.5.5. The defect is **token bypass**, which is static-provable; the pixel outcome is **UNPROVEN-NEEDS-LIVE (SS-13)**. (b) *"scoped styles lose to `@layer components`"* — falsified in the wrong direction: unlayered scoped SFC styles beat any `@layer` rule regardless of specificity, so the local literals **do** win — which is what makes this a defect rather than a no-op.

### L-M4 · Undeclared shadow: a hand-rolled 2-option segmented control, in a file whose consumer imports `SegmentedTabs` three lines above it

**Severity MAJOR.** `EquationModeToggle.vue` (whole) vs `EquationView.vue:13` `import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";` and `:188-191`, where the same consumer renders the mobile `Controls | Canvas` segmented control with the producer primitive.

So the consumer file contains **two segmented controls of the same shape**: one producer-backed, one 80-line bespoke. The bespoke one re-implements the track (`:34-40`), the segment paint (`:42-66`), and the selection state (`:14`, `:24`) that `SegmentedTabs` owns — including the roving-focus/indicator engine documented at `glass-ui/src/components/tabs/SegmentedTabs.vue:16-27` ("THE ONE SELECTION ENGINE … `useSelectionGroup` assembles the selection model, the roving machine, and the ONE traveling-indicator writer"), which the hand-rolled version has none of (no arrow-key roving, no `role`, no indicator).

**This row extends the corpus.** lane-frontend §4's candidate-shadow table lists `equation/NotationPills.vue` → `./toggle-chip`/`./chip` and `equation/InfoCard.vue` → `./card`, but **`EquationModeToggle` appears nowhere in §4** — not under HARD, CHARACTERFUL, SOFT, or CANDIDATE. Aggregate shadow surface should read **10 components** (census §2 C-5's summed figures + 80 LOC), not 9.

**FALSIFIER — the one that matters, and it survives.** *"`SegmentedTabs` takes `label: string` only, so the Σ (Computer Modern serif italic, `:68-72`) and `a + b` (Fira Code mono, 11px, `-0.5px` tracking, `:74-79`) glyphs are inexpressible — the fork is justified."* Falsified at 7.0.0: `SegmentedTabs.vue:443` exposes a per-option scoped slot `<slot name="option" :option="option" :active="isActive(option.value)">`, so arbitrary per-option markup is expressible, and `SegmentedTabOption` (`:46-58`) already carries `icon`/`tooltip`/`disabled` — `disabled` being exactly the input L-B2 needs. At the **installed 4.0.0** I found the `"option"` slot name in `dist/tabs.js` but did not read the compiled template, so 4.0.0 availability is **PLAUSIBLE, not CONFIRMED**; route the cure to **F.W3** (post-uplift), not F.W1.

Second falsifier: *"`glass-ui/chip` is the better target, per §4's NotationPills row."* `chip/types.ts:27-34` `SelectableChipProps { mode: "selectable"; modelValue?: boolean | null; … }` is a **per-chip boolean**, not a single-select group — it would push the mutual-exclusion logic back into the consumer. `SegmentedTabs` (`semantics: "toggle"`) is the correct seat for both this component and `NotationPills`.

---

## §3 — MINOR

### L-m1 · Dead transition, and it violates the file's own annotated law eleven lines below
`:38-39` `transition: border-color 0.15s ease;`. `.eq-toggle` (`:34-40`) declares no `border`, no `border-color`, and no state rule anywhere in the file changes one — the property is untransitionable and the declaration is dead. It is also raw `ease` where `:51-52` carries the provenance comment *"A.W3.d — named properties + canonical token, no `transition: all`."* and correctly uses `var(--ease-standard)`. **Falsifier:** *"a border arrives from `glass-wash`"* — falsified: `dist/styles/glass/material.css` puts the wash rim on `box-shadow` layers, not `border` (`material.css:141-158`, "THE RIM TOKENS ARE WHOLE BOX-SHADOW LAYERS, NEVER COLORS"). *"`--ease-standard` is undefined so `ease` is the safe choice"* — falsified: defined at `dist/styles/tokens/scheme-motion.css:216` and `theme/bridges.css:325`.

### L-m2 · Seven of the eleven `.eq-toggle-btn` declarations are duplicates of the producer base or dead
`:43-45` `display:flex; align-items:center; justify-content:center` duplicate `glass-ui/src/components/button/styles.css:5-9` (`display:inline-flex; align-items:center; justify-content:center`) — and the `flex`/`inline-flex` swap is a silent semantic change made without a reason comment. `:50` `cursor: pointer` duplicates `styles.css:35`. `:53` `border: none` duplicates `styles.css:13` (`border: 0`). `:54` `background: transparent` duplicates the ghost arm's `bg-transparent`. `:55` `position: relative` has **no positioned descendant in the file** — dead, and at 7.0.0 it is re-declared by the producer anyway (`material.css:36-48` puts `position: relative` on the whole material group). **Falsifier:** *"defensive redundancy against producer drift"* — no comment claims that, and the file demonstrates it knows how to annotate intent (`:51`, `:62`).

### L-m3 · `EquationDisplayMode` is a view-state type colocated in the API-wire DTO module
`lib/equation/types.ts:38` sits between `ComputeEquationRequest` (`:14-22`) and `ComputeEquationResponse` (`:24-36`). I read the file whole: it is the **only** exported type that appears in no request or response shape — `NotationMode` (`:1`) is a wire field (`ComputeEquationRequest.notation`, `SimplifyRequest.notation`), `EquationTier` is a response field, every interface is a DTO. Pure UI state in a wire module. **Falsifier:** *"the API round-trips it"* — falsified: `grep latex_sigma`/read of `api/models/equations.py` and `api/routers/equations.py:105-130` shows no display-mode field on either envelope. Home: `components/equation/` (beside the component) or a `lib/equation/view-state.ts`.

### L-m4 · `eqMode` is the only user-facing control on the panel that does not survive a reload
`useEquationCache.ts:10-17` `CachedInputState { expression, domainStart, domainEnd, nHarmonics, budget, notation }` — six fields, persisted on every change (`EquationView.vue:161-171`). `eqMode` is in none of them and re-initialises to `"sigma"` at `EquationView.vue:43` on every mount. Asymmetric persistence on the one control that is a pure preference. Compounds L-B2: the non-persisted default is the mode that can go stale. **Falsifier:** *"it is restored from `CachedResult`"* — falsified: `CachedResult` (`:19-23`) is `{ result, latex, energy }`; `EquationView.vue:39` restores the sigma *string*, not the mode.

### L-m5 · Two model idioms for one job, in one directory
This file: `defineModel<EquationDisplayMode>({ required: true })` (`:5`) — 1 line. `NotationPills.vue:7-12`: `defineProps<{ modelValue: NotationMode }>()` + `defineEmits<{ "update:modelValue": [value: NotationMode] }>()` + a manual `emit(...)` at `:26` — 8 lines for identical semantics. Same directory, same commit era, same author-voice. Pick one (this file's is the better half — see S2). **Falsifier:** *"`NotationPills` needs the explicit emit for `v-for` binding"* — falsified: `:26` `@click="emit('update:modelValue', opt.value)"` is exactly what `model = opt.value` on a `defineModel` ref would do.

### L-m6 · Hardcoded twins with no exhaustiveness link to the union they render
`:11-19` and `:20-29` are literal duplicates differing in three tokens (`'sigma'`/`'expanded'`, the title, the glyph). `EquationDisplayMode` (`types.ts:38`) is a closed union; adding a third member compiles clean, typechecks clean, and renders **no control for it** — a silent under-render. The data-driven cure already exists next door and is already imported by a sibling: `notation.ts:9-18` `NOTATION_OPTIONS` typed against `NotationMode`, consumed by `NotationPills.vue:18` `v-for`. **Falsifier:** *"two options never grows"* — the tree's own `EquationTier` (`types.ts:2`) is a three-member sibling union, and `notation.ts` demonstrates the house preference for the table form.

### L-m7 · Raw `px` type metrics inside a deliberately rem-scaled tree
`:69` `font-size: 16px`, `:76` `font-size: 11px`, `:78` `letter-spacing: -0.5px`. `style.css:41-51` sets a mobile-first responsive root (1.125rem → 1rem @ 768px) precisely so type tracks the viewport; three `px` literals opt these glyphs out of it, and 11px sits under the tree's own body floor. **Falsifier:** *"optical sizing of a monospace glyph pair legitimately wants a fixed px"* — plausible as *intent*, but nothing in the file says so, and the neighbouring `NotationPills.vue:28` solves the same optical problem with the relative `text-[1.3em]`.

### L-m8 · Native `title` tooltips sit outside R3-7a's migration budget, so that budget undercounts
`:15` `title="Sigma notation (compact)"`, `:25` `title="Expanded terms"`. The tree's tooltip idiom is the `Tooltip` component — R3-7a (adjudicated **TRUE**, live-summed 2+2+2+4+2+6+6+10+1 = 35) budgets **35 callsites / 9 consumers** for the `ui/tooltip` → `@mkbabb/glass-ui/tooltip` migration at F.W3. My measurement: **42 `title="…"` attribute occurrences across 19 `.vue` files**, and `EquationModeToggle.vue` is in that set but is **not** one of R3-7a's nine `Tooltip` consumers. Native `title` also gives ~1s browser delay, no touch affordance, and no styling — against `App.vue`'s `<TooltipProvider :delay-duration="400">`. **Falsifier:** *"`title` here is the accessible name, not a tooltip, so it must stay"* — partially true and important: because the buttons are glyph-only, deleting `title` without adding `aria-label` would *remove* the accessible name. That does not save the row; it sharpens the F.W3 instruction to *convert* (`Tooltip` + `aria-label`), never to delete. **Extends R3-7a:** its 35/9 counts `<Tooltip` callsites only and is blind to the 42-occurrence native-`title` surface — the same *class* of blindness R5-7 names (evidence keyed to component callsites missing native markup), one axis over.

---

## §4 — Corpus reconciliation: R5-7, the viz path, and where I contradict the census

### C-L1 · **R5-7 does NOT apply here — stated with its falsifier** (INFO)

R5-7 (ADOPT-AS-FACT + CARRY → F.W4): *"template-loop evidence keyed to **component** callsites is blind to native HTML element loops"* — proven on `PaperSidebar.vue`'s three nested `<li v-for>` at lines 65/87/105, whose derived leaf `instance.loop.paper-sidebar` was literally `[]`.

**It does not bite this component.** `grep -rn "v-for" web/src/components/equation/` returns exactly three rows, **none in this file**: `NotationPills.vue:18`, `FunctionInput.vue:157`, `convergence/ConvergenceLegend.vue:30`. `EquationModeToggle.vue` contains zero loops; its two options are static `<Button>` **component** callsites (`:10`, `:20`) — precisely the shape R5-7's deriver *does* see (cf. the populated sibling leaf `instance.loop.presets`, keyed `callsite:…/FunctionInput.vue:157:Tooltip:…`). Honest negative.

**But the mirror blindness does bite, and it is new.** R5-7's cure (R6-5's `NATIVE_TEMPLATE_LOOP` family, 16 native loops) counts *loops*. An option-set census that derives control rows from **data tables** — the shape `NOTATION_OPTIONS` (`notation.ts:9-18`) invites — attributes **3 option rows to `NotationPills` and 0 to `EquationModeToggle`**, because this component's options are hardcoded twins with no backing collection (L-m6). The blind spot is the inverse of R5-7: *option evidence keyed to iterated data is blind to hand-duplicated controls.* Budget it into **F.W4** beside R5-7, X-2 (the 9-record route model) and X-9 (the member-scope law) — all three are the same species of denominator defect, and X-9's instruction ("publish ONE member-scope law before any percentage") applies verbatim to a per-component control census.

### C-L2 · Viz render path: this component does **not** touch a canvas — traced, with one live-only residue (INFO)

lane-frontend §6 names three independent Canvas2D paths (WebGL/WebGPU **ABSENT**, 0 hits): **A** the epicycle instrument (store rAF, off-screen-gated, `stores/animation.ts:48-53`), **B** `ConvergencePlot.vue:93` `getContext("2d")` with its **own ungated rAF** (`:67-69`), **C** `FrequencyGraph.vue` watch-driven.

The full reachability of `model`: `EquationModeToggle:5,16,26` → `EquationView.vue:270 v-model="eqMode"` → `:43 eqMode` → `:49-51 activeLatex` → `:255 <EquationResult :latex="activeLatex" />` → KaTeX. **`eqMode` appears nowhere in `ConvergencePlot`'s prop set** (`:309-316`: `original-points`, `coefficients`, `n-harmonics`, `domain`, `expression`). No canvas is touched. Corrects nothing in §6; confirms its Path-B boundary.

**Residue, UNPROVEN-NEEDS-LIVE (SS-13):** the toggle is anchored inside `.eq-card { height: 10rem; overflow: hidden }` (`EquationView.vue:386-390`) at `.eq-mode-anchor { position:absolute; top:2; left:2 }` (`:426-429`). Switching to `expanded` swaps a compact Σ for an N-term expansion inside a **fixed-height, overflow-hidden** box, so the mode this control exists to reach may render clipped — while the toggle itself keeps floating over the clip. Additionally, KaTeX re-typesets synchronously on the click, and Path B's rAF is ungated, so the interaction can land inside a frame. Both need a live surface; neither is asserted here.

### C-L3 · Where I contradict / extend the corpus (explicit)

| # | corpus row | my finding | resolution |
|---|---|---|---|
| 1 | **lane-frontend §5** break table (subpaths ×11, dock members ×3, `ToastVariant`, lucide ×35, 3 peer floors) | `Button.variant` is definition-absent at 7.0.0: **95 sites / 34 files** | **EXTENDS** — §5 is silent on it and the WT prior-art rows (`variant="glass-scrubber"`→`"standard"` ×9) are a *different* component. Largest uncounted uplift line item. → F.W1 |
| 2 | **lane-frontend §5** "the 3.1→4.0 hop cost 46 lines … budget an order of magnitude above" | ×10 ⇒ ~460 lines. The `variant` sweep alone is 95 lines, and it is **silent** (no `strictTemplates`) | **SHARPENS** — the estimate holds numerically; the *detection* premise does not. §9 carry 11 (no vitest) is the binding constraint, not the line count. |
| 3 | **lane-frontend §4** shadow table + census §2 C-5 aggregate "9 components / 2 079 LOC" | `EquationModeToggle` (80 LOC) is an undeclared CANDIDATE shadow of `./tabs` `SegmentedTabs` | **EXTENDS** — read **10 components**; §4's own `NotationPills` row should re-target `./tabs`, not `./chip` (falsifier in L-M4). → F.W3 |
| 4 | **R3-7a** `ui/tooltip` budget = 35 callsites / 9 consumers | 42 native `title="…"` occurrences across 19 `.vue` files, this file among them, all outside R3-7a's set | **EXTENDS** — the budget is `<Tooltip`-keyed and blind to native `title`. Convert, never delete (glyph-only names). → F.W3 |
| 5 | **R5-7** native-loop blindness → F.W4 | Does **not** apply (0 `v-for` here); the **inverse** blindness does (data-keyed option census misses hardcoded twins) | **NEGATIVE + NEW ROW** → F.W4, beside R5-7 / X-2 / X-9 |
| 6 | **lane-frontend §6** three canvas paths | `eqMode` reaches none of them (full trace in C-L2) | **AGREE — confirmed, boundary tightened** |
| 7 | **census §3a** "Two upstream carries held locally: `cartoon-card` + `--viz-amber` darken" | `:64` consumes `--viz-amber` for the *active* affordance colour; `style.css:113-125` is the WCAG-darken carry | **AGREE** — this component is a live consumer of the held carry; it must be in the relay's regression set when glass-BH rules on it. |

---

## §5 — Claims I killed with my own falsifiers (L-18 discipline)

1. **"Budget changes leave the Σ view stale."** Killed by `api/routers/equations.py:90-96`: `latex_sigma = render_latex_sigma(terms, req.notation)` takes **no budget**, while `latex = simplify_series(terms, req.budget, req.notation)` does. Σ is budget-independent by construction. L-B2 was rewritten to the notation-only defect, which survives four independent falsifiers.
2. **"`variant="ghost"` is a hard `vue-tsc` break like `ToastVariant`."** Killed by reading `web/tsconfig.json` whole: no `vueCompilerOptions`, therefore no `strictTemplates`, therefore fallthrough — **silent**, not loud. This made the finding *worse*, not milder, and is why L-B1 is a BLOCKER.
3. **"`SegmentedTabs` can't render two different type faces, so the fork is justified."** Killed by `glass-ui/src/components/tabs/SegmentedTabs.vue:443` (per-option scoped slot). Scoped honestly: 7.0.0 CONFIRMED, 4.0.0 PLAUSIBLE-only, so L-M4's cure routes to F.W3 rather than F.W1.

---

## §6 — SUPERLATIVES (L-18 runs both ways)

### S1 · Zero teardown surface — a genuinely leak-free leaf in a tree with 20 rAF sites
No lifecycle hook, no listener, no timer, no observer, no manual DOM handle, no `ref` to an element. Verified by reading all 80 lines and by `grep -E "onMounted|onUnmounted|onBeforeUnmount|addEventListener|requestAnimationFrame|setInterval|setTimeout|new (Mutation|Resize|Intersection)Observer"` → **0 hits**. **Falsifier:** *"the imported `Button` leaks."* Checked upstream: `glass-ui/src/components/button/Button.vue:61-64` composes `useLiquidPress`, whose entire surface here is pointer/keyboard handlers bound declaratively in the template (`:100-107`) — no host-level global registration escapes this component. Against a tree carrying **20 `requestAnimationFrame` sites over 8 files** (lane-frontend §0) and two clocks lane-frontend §8 flags as ungated under `prefers-reduced-motion`, a component with a provably empty teardown surface is worth naming.

### S2 · The model contract is the tighter of the directory's two idioms, and it does not re-mint its union
`:5` `const model = defineModel<EquationDisplayMode>({ required: true })` — the union is **imported** (`:3`), not re-declared; `required: true` removes the `undefined` arm so no template branch needs a nullish guard; the parent's `v-model` (`EquationView.vue:270`) is the only writer, so there is no dual source of truth. That is exactly the discipline glass-ui's own `_shared/axes.ts` SUB-RANGE LAW demands ("a component NEVER mints a … string union"), arrived at independently. **Falsifier:** *"`required: true` on a `defineModel` is a no-op if the parent forgets `v-model`."* True in production, but it is a dev-mode warning plus a template type error at the callsite, and the sole callsite binds it. The idiom is right; compare `NotationPills.vue:7-12`'s 8-line manual re-implementation (L-m5).

### S3 · Correct token + named-property transition discipline, with in-file provenance
`:51-52` `/* A.W3.d — named properties + canonical token, no transition: all. */` followed by `transition: color 0.15s var(--ease-standard), background-color 0.15s var(--ease-standard);` — a named-property transition on a real, verified producer token (defined at installed `dist/styles/tokens/scheme-motion.css:216`), carrying the wave coordinate that authored it. This is the exact hygiene lane-frontend §8 banks across the tree ("A.W3.d — bezier→token; `transition:all`→named properties"), and it is here *with its provenance attached*, which is rarer than the practice itself. **Falsifier:** *"the token is undefined at the installed pin, so it silently no-ops."* Falsified — defined twice in the installed dist (`tokens/scheme-motion.css:216`, `theme/bridges.css:325`). The only blemish is that the rule 12 lines above it (`:38-39`) does not follow its own law (L-m1) — which is a MINOR against the file, not against this superlative.

---

## §7 — Routing

| finding | severity | wave |
|---|---|---|
| L-B1 `Button.variant` × 95/34, silent | BLOCKER | **F.W1** (with the lucide ×35 sweep; this component → `emphasis="quiet"`) |
| L-B2 mode contract cannot express unavailability; notation-stale Σ | BLOCKER | **F.W5** (`SimplifyResponse.latex_sigma`) + **F.W4** (component contract) |
| L-M1 focus-ring clipped; escalates via 7.0.0 `contain: paint` | MAJOR | **F.W4**, re-verify after F.W1 |
| L-M2 `aria-pressed` dropped against the tree's own documented pattern | MAJOR | **F.W4** (+ D/C-axis reconciliation, do not double-count) |
| L-M3 hardcoded height/padding bypass `--control-h-sm`/`--ui-scale`/`--control-floor` | MAJOR | **F.W1** (token re-point) |
| L-M4 undeclared `SegmentedTabs` shadow; §4 aggregate → 10 components | MAJOR | **F.W3** |
| L-m1 · L-m2 · L-m6 · L-m7 dead / duplicated / hardcoded CSS + twins | MINOR | **F.W3** (folded into the L-M4 rewrite) |
| L-m3 view-state type in the wire DTO module | MINOR | **F.W4** |
| L-m4 `eqMode` not persisted | MINOR | **F.W4** |
| L-m5 split model idiom (this file vs `NotationPills`) | MINOR | **F.W4** |
| L-m8 native `title` outside the R3-7a 35/9 budget (42 occurrences / 19 files) | MINOR | **F.W3** (convert, never delete) |
| C-L1 inverse-of-R5-7 option-census blindness | INFO / model | **F.W4** (with R5-7, X-2, X-9) |
| C-L2 `.eq-card` clip on `expanded` | INFO / UNPROVEN | **F.W4** live probe (SS-13) |

---

*Read-only lane. The only file written is this one. No product source in `fourier-analysis`, `glass-ui`, or `value.js` was mutated; `scripts/dev/dev.sh` untouched. No browser tooling was used; every livable-only claim is marked UNPROVEN-NEEDS-LIVE (SS-13).*
