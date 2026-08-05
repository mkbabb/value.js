claude-opus-5[1m]

# CHALLENGE — `EquationModeToggle` · axis C (CONSUMPTION)

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EquationModeToggle.vue` (80 LOC)
**Date** 2026-08-04 · **Mode** static + source-derived, no browser tooling (L-18 both ways; every claim carries its falsifier)
**Read whole:** the target; `web/src/lib/equation/types.ts`; `web/src/lib/equation/api.ts`; `web/src/lib/api.ts` (seam); the sole consumer `web/src/components/equation/EquationView.vue`; `web/src/components/equation/FunctionInput.vue` (notation binding); `web/src/lib/colors.ts`; `web/src/components/equation/composables/useCoeffHover.ts`; `web/src/style.css`; `web/public/fonts.css`; `web/index.html`; `web/vite.config.ts`; `api/routers/equations.py`; and the installed producer bytes `node_modules/@mkbabb/glass-ui@4.0.0` (`dist/button-BNDWhAZb.js`, `dist/components/ui/button/{Button.vue.d.ts,index.d.ts}`, `dist/styles/utilities/base.css`, `dist/styles/utilities/a11y-overrides.css`, `dist/styles/glass/ladder.css`, `dist/styles/tokens/{offsets-sizing.css,scheme-motion.css,scale-paper.css}`, `dist/styles/index.css`, `package.json` exports).

**Corpus folded (not re-invented):** `formation/fourier/lane-frontend.md:137,260`; `formation/fourier/CENSUS-2026-08-03.md:37-38,109,184-187`; `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` **R6-8** (`:142`, the operation↔client leaf non-isolability root cause) and `:187`. Prior fourier-local audits cited by path where this challenge **confirms**, **extends**, or **contradicts** them: `docs/audits/runs/2026-06-16-M-deep-audit/` (D2-02, D4-09, A8-02, `raw-findings.json:1331-1333,2919,3077-3080`) and `docs/audits/runs/2026-06-17-M-critique-audit/` (C4-04, C5-02).

**Tally** — defects **14** (BLOCKER 2 · MAJOR 6 · MINOR 4 · INFO 2) · superlatives **3** · candidates killed by their own falsifier **2** (§5).

**Standing cascade fact used by C-3/C-4/C-5/C-6** (established once, cited thereafter as **[LAYER]**): `web/src/style.css:1` is `@import "tailwindcss"` under `@tailwindcss/postcss` (`vite.config.ts:33-36`; no `postcss.config.*` exists), so Tailwind v4 emits its utilities into `@layer utilities`; glass-ui's own component CSS declares `@layer components` (`dist/styles/utilities/base.css:43`). A Vue SFC `<style scoped>` block is emitted **unlayered** (the vue plugin adds only the `[data-v-*]` attribute; the Tailwind postcss plugin passes a directive-free block through untouched). Per CSS cascade-layer ordering, **unlayered normal declarations beat every layered one regardless of specificity**. Therefore every declaration in this file's `<style scoped>` wins against *all* glass-ui and Tailwind styling on the same element, unconditionally. *Falsifier for [LAYER]:* a `@layer` wrapper around SFC styles in the build config, or glass-ui shipping its button CSS unlayered — neither is in the tree.

---

## 1 · BLOCKERS

### C-1 · BLOCKER · The `sigma` segment selects a branch the server contract cannot keep fresh — the default view silently shows the wrong notation

**Provenance**
- `EquationModeToggle.vue:5` — `const model = defineModel<EquationDisplayMode>({ required: true });` is the **entire** script block. The component's contract is one bidirectional string. It carries no `available`, no `disabled`, no `stale` input, and emits nothing beyond `update:modelValue`.
- `web/src/lib/equation/types.ts:24-34` — `ComputeEquationResponse` has **both** `latex` and `latex_sigma`.
- `web/src/lib/equation/types.ts:42-46` — `SimplifyResponse` has `latex`, `energy_captured`, `term_count`. **No `latex_sigma`.**
- Server confirms the asymmetry: `api/routers/equations.py:110-111,124-125` (compute returns `latex` **and** `latex_sigma`, rendered via `render_latex_sigma` at `:93-96`) vs `api/routers/equations.py:152-160` (simplify returns `{latex, energy_captured, term_count}` only).
- `EquationView.vue:113-114` — after `computeEquation`, both `displayLatex` and `displayLatexSigma` are assigned.
- `EquationView.vue:137-139` — after `simplifyCoefficients`, **only** `displayLatex` and `displayEnergy` are assigned. `displayLatexSigma` retains the previous compute's string.
- `EquationView.vue:43` — `const eqMode = ref<EquationDisplayMode>("sigma");` — **sigma is the default mount state.**
- `EquationView.vue:49-51` — `activeLatex = eqMode === "sigma" && displayLatexSigma ? displayLatexSigma : displayLatex` — sigma is preferred whenever the stale string is non-empty.
- `EquationView.vue:176-180` — `watchDebounced(() => [notation.value, budget.value], () => { if (result.value) doSimplify(); }, {debounce: 200})`.
- `notation` is user-mutable one component away: `FunctionInput.vue:30` `defineModel<NotationMode>("notation", …)` → `FunctionInput.vue:223` `<NotationPills v-model="notation" />`, bound up at `EquationView.vue:204` `v-model:notation="notation"`.

**Failure scenario (reachable in one click from cold mount)**
Load `/equation` → a cached-or-fresh compute lands, `eqMode === "sigma"`, the Σ equation renders. Click the *exponential* notation pill. `doSimplify()` fires, `displayLatex` becomes the exponential expansion and the energy badge updates — but `activeLatex` still returns `displayLatexSigma`, which is **trigonometric**. The user now sees: a notation pill reading "exponential", an energy metric derived from the exponential simplify, and an equation typeset in trig. Identical failure on any budget change: the budget slider appears **dead** while in the default mode. Reload does not clear it — `EquationView.vue:39` rehydrates `displayLatexSigma` from `cachedRes?.result?.latex_sigma` (the *original* compute) while `:38` rehydrates `displayLatex` from the *simplified* cache written at `:141`, so the mismatch is persisted by design.

**Why this is a consumption defect of *this* component, not only of its parent**
The toggle is the sole affordance that can put the pane into the stale branch, and its props/emits contract makes the correct fix impossible from the outside: the parent has no channel to say "sigma is not valid for the currently displayed coefficients". A `defineModel`-only contract is right for a *free* choice; this is a *conditioned* choice. This is **R6-8** (`lane-fourier-r3-r6.md:142`) realized at the UI leaf — the intake established that "an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam"; here the dual holds: **a client leaf that assumes two operations return the same shape cannot detect that one of them didn't.** The compute↔simplify pair is exactly such a non-isolable operation cohort, and the toggle is its client leaf.

**Falsifier** — the claim dies if any one of these is true: (a) `SimplifyResponse` carries `latex_sigma`; (b) `EquationView` clears or invalidates `displayLatexSigma` in `doSimplify`; (c) `activeLatex` guards on freshness; (d) the toggle accepts an availability input. Checked all four against the tree at the line numbers above: **none holds.** Precise rendering (whether the mismatch is visually obvious) is UNPROVEN-NEEDS-LIVE for SS-13; the *state* mismatch is source-exact.

---

### C-2 · BLOCKER · The component's own track destroys the focus ring glass-ui ships on the buttons it imports

**Provenance**
- `EquationModeToggle.vue:35-37` — `.eq-toggle { display: flex; border-radius: 9999px; overflow: hidden; }`.
- glass-ui Button's cva base string composes `focus-ring` (`dist/button-BNDWhAZb.js`, base = `"btn-pill tap-squish focus-ring whitespace-nowrap …"`), so both `<Button>` children carry it (`EquationModeToggle.vue:10-19`, `:20-29`).
- `dist/styles/utilities/base.css:174-178` —
  ```css
  .focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow); }
  ```
  The ring is **box-shadow only**, and `outline` is explicitly zeroed.
- `dist/styles/tokens/scale-paper.css:66` — `--focus-ring-shadow: 0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--ring) 30%, transparent), …` — a non-inset, **outward-spread** ring.
- `dist/styles/utilities/a11y-overrides.css:78-91` — a real `outline: 2px solid Highlight` is restored **only** inside `@media (forced-colors: active)`.

**Failure scenario** Tab to the toggle. Both segments fill the track edge-to-edge (`display: flex`, no gap, no padding on `.eq-toggle`), so the focused segment's outward box-shadow lies entirely outside the track's border-box and is clipped by `overflow: hidden` on the ancestor. Under normal (non-forced-colors) rendering the keyboard focus indicator is **invisible on both segments** — and there is no `.is-active`-independent visual to substitute, because the only per-segment paint left is `color` (see C-5). WCAG 2.4.7 failure on the only control in the equation card's overlay layer.

**Falsifier** — dies if (a) the ring were outline-based (base.css:175 sets `outline: none` — refuted), (b) the buttons were inset from the track so the shadow fell inside the clip (no padding/gap/margin exists on `.eq-toggle` or `.eq-toggle-btn` that would inset them — `:35-41`, `:42-56` — refuted), or (c) `overflow` were `visible`/`clip` with `overflow-clip-margin` (line 37 is bare `hidden` — refuted). Pixel confirmation is UNPROVEN-NEEDS-LIVE for SS-13; the clip relationship is source-exact.

**Extends** the corpus: `2026-06-16-M-deep-audit/raw-findings.json:3077-3080` (D4-09) flagged "no keyboard role, no `aria-pressed`, no ARIA group semantics" but did **not** identify that the container also erases the focus indicator the imported primitive supplies.

---

## 2 · MAJORS

### C-3 · MAJOR · The scoped `transition` clobbers `.tap-squish`'s spring — the exact cascade bug glass-ui documents in the adjacent comment

**Provenance**
- `EquationModeToggle.vue:50-52`:
  ```css
  /* A.W3.d — named properties + canonical token, no `transition: all`. */
  transition: color 0.15s var(--ease-standard), background-color 0.15s var(--ease-standard);
  ```
  Two legs.
- `dist/styles/utilities/base.css:259-269` — `.tap-squish` ships **six**: `background-color`, `border-color`, `box-shadow`, `color`, `opacity` on `var(--ease-standard)`, plus `scale` on `var(--spring-smooth)`, all at `var(--duration-fast)`.
- `dist/styles/utilities/base.css:271-273` — `.tap-squish:active { scale: var(--scale-press); }` — the press *value* is applied by a layered rule that survives; only its transition is lost.
- `dist/styles/utilities/base.css:244-250` — glass-ui's own comment: *"This is load-bearing: `.tap-squish` and `.btn-pill` are co-composed on the button base and this `transition` shorthand would otherwise CLOBBER `.btn-pill`'s surface legs down to a scale-only animation (the cascade bug that left every button transitioning ONLY `scale` — the live-readback RED)."*
- **[LAYER]** — the scoped rule is unlayered, `.tap-squish` is in `@layer components`. The consumer wins.

**Failure scenario** Press either segment. `scale: var(--scale-press)` (0.96) applies instantly and releases instantly — the calibrated iOS squish becomes a hard two-frame jump. The `box-shadow` leg is also gone, so the (already clipped, C-2) focus ring would pop rather than fade. fourier reproduces the mirror image of the very RED glass-ui hardened against, from the consumer side, in a file whose own comment claims motion hygiene.

**Falsifier** — dies if the scoped rule were inside `@layer components` (it is not; the SFC block has no `@layer`), or if it enumerated `scale … var(--spring-smooth)` (it does not; line 52 is the full list). Also dies if `.tap-squish` were absent from the base string — it is present in `dist/button-BNDWhAZb.js`.

---

### C-4 · MAJOR · `height: 2.25rem` hardcodes the *unscaled* value of the very token `size="sm"` was asked to supply — defeating `--ui-scale` and the WCAG-2.5.5 touch floor

**Provenance**
- `EquationModeToggle.vue:12,22` — `size="sm"` requested on both buttons.
- `dist/button-BNDWhAZb.js` cva `size.sm` = `"h-(--control-h-sm) rounded-pill px-3"`.
- `dist/styles/tokens/offsets-sizing.css:150` — `--control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor));`
- `dist/styles/tokens/offsets-sizing.css:138-142` — the `@media (pointer: coarse)` block lifts `:root --ui-scale` to `--ui-coarse-scale: 1.5`, described as the one place touch scaling happens.
- `dist/styles/tokens/offsets-sizing.css:454-461` — `--touch-target: 2.75rem; /* 44px */`, "canonical WCAG 2.5.5 (44px) touch-target floor for the NON-dock coarse-pointer surfaces".
- `EquationModeToggle.vue:39-40` — `padding: 0 0.6rem; height: 2.25rem;` — literals, unlayered, **[LAYER]** ⇒ they beat `h-(--control-h-sm)` and `px-3`.

**Failure scenario** On a coarse pointer the design system intends `2.25rem × 1.5 = 3.375rem` (54px), clamped no lower than 44px. The literal pins both segments at 36px — **below the 44px floor glass-ui names a token for** — on a control that is the sole equation-mode affordance, positioned as an absolute overlay at `top-2 left-2` (`EquationView.vue:426-429`) over a canvas region where mis-taps are costly. The `0.6rem` horizontal padding likewise fixes the hit width against `px-3` (0.75rem) and never scales.

**Falsifier** — dies if `--ui-scale` is not lifted on coarse (refuted at `:138-142`), if the literal lost the cascade (refuted by **[LAYER]**), or if a media query in this file restored the scaled height (the file has **no** `@media` block — `:33-80`). Measured px on a real touch device is UNPROVEN-NEEDS-LIVE for SS-13; the token bypass is source-exact.

---

### C-5 · MAJOR · `variant="ghost"` is requested and then almost entirely neutralized — the hover affordance is deleted, not replaced

**Provenance**
- `EquationModeToggle.vue:11,21` — `variant="ghost"`.
- `dist/button-BNDWhAZb.js` `variant.ghost` = `"bg-transparent text-foreground/70 hover:bg-foreground/8 hover:text-foreground active:bg-foreground/12 aria-pressed:bg-foreground/10 aria-pressed:text-foreground"` — six declarations across four states.
- `EquationModeToggle.vue:46,53` — `color: var(--muted-foreground);` and `background: transparent;` (the shorthand, which also resets `background-color`). **[LAYER]** ⇒ these beat `text-foreground/70` and every `hover:`/`active:`/`aria-pressed:` background utility.
- `EquationModeToggle.vue:58-60` — the *only* scoped hover rule is `.eq-toggle-btn:hover { color: var(--foreground); }`. There is **no** scoped hover background.

**Failure scenario** An inactive segment has: no background at rest (correct), and no background on hover (**incorrect** — the vendor supplies `hover:bg-foreground/8`, the consumer deletes it and supplies no substitute), and no background on `:active` (the vendor's `active:bg-foreground/12` likewise deleted). The net imported value of `variant="ghost"` is one colour the file immediately overrides and one it re-implements by hand. This is `2026-06-17-M-critique-audit` **C5-02** / critique #6 ("no idle paint", `findings-index.txt:302`) — **STILL OPEN at 2026-08-04**, now with the cascade *mechanism* named rather than merely observed.

**Falsifier** — dies on any `.eq-toggle-btn:hover { background… }` or `background-color` declaration in the scoped block. `:33-80` read whole: the only `background` declarations are `:53` (`transparent`) and `:65` (`.is-active`). Refuted.

---

### C-6 · MAJOR · glass-ui 4.0.0 ships an `aria-pressed` selected register on Button; the component hand-rolls `.is-active` instead and emits **no** accessible selected state

**Provenance**
- `dist/button-BNDWhAZb.js` — `aria-pressed:` styling is present on **9 of 12** variants, `ghost` included: `aria-pressed:bg-foreground/10 aria-pressed:text-foreground`. Tailwind's built-in `aria-pressed` variant compiles to `&[aria-pressed="true"]`.
- `EquationModeToggle.vue:14,24` — `:class="{ 'is-active': model === 'sigma' }"` / `… === 'expanded'`, plus `:62-66` `.eq-toggle-btn.is-active { color: var(--viz-amber); background: color-mix(in srgb, var(--foreground) 8%, transparent); }`.
- The file contains **zero** `aria-*` attributes, **zero** `role`, and no `defineOptions`. The container `<div class="eq-toggle glass-wash">` (`:9`) has no `role="group"`/`radiogroup`.
- `title` (`:15,:25`) does **not** supply the accessible name: per accname computation, the button's non-empty content wins, so the names are literally "Σ" and "a + b".

**Failure scenario** A screen-reader user hears two unlabeled buttons ("Σ", "a + b") in no group, with **no indication which mode is currently active** — the only selected-state signal is a colour. Passing `:aria-pressed="model === 'sigma'"` would have both (a) announced the state and (b) recruited the vendor's shipped active plate for free, deleting the bespoke `color-mix` rule.

**Contradicts the corpus (explicitly).** `2026-06-16-M-deep-audit/raw-findings.json:2919` asserts the button family "models only the four-state press/hover/focus contract — **no selected/pressed register**", naming `EquationModeToggle` among the consumers and calling `is-active` "a dead class". For **`Button` at glass-ui 4.0.0 that is false**: the register exists and is variant-wide. The finding is stale for this component; the remaining defect is non-adoption, not a producer gap. *Falsifier:* `grep -c 'aria-pressed' node_modules/@mkbabb/glass-ui/dist/button-BNDWhAZb.js` → non-zero (9 variant strings). Verified.

---

### C-7 · MAJOR · The consumer of `EquationDisplayMode` is not exhaustive over it, and nothing in the toolchain will ever say so

**Provenance**
- `web/src/lib/equation/types.ts:22` — `export type EquationDisplayMode = "expanded" | "sigma";`
- `EquationModeToggle.vue:14,16` and `:24,:26` — both literals are **hardcoded four times** in the template (twice in `:class`, twice in `@click`). There is no options array, no `v-for`, no `satisfies Record<EquationDisplayMode, …>`, no `never`-guard.

**Failure scenario** Add a third member (`"latex-source"`, an obvious next step given `ComputeEquationResponse` already carries two renderings). Every file type-checks — `vue-tsc -b` (`web/package.json` `build`) reports nothing, because a union *widening* breaks no assignment here. The toggle silently cannot select the new mode; worse, if the model is ever set to it externally (e.g. from `useEquationCache` rehydration, `EquationView.vue:38-39`), **both** segments render inactive and the control offers no way back to a valid state.

**Falsifier** — dies if a `Record<EquationDisplayMode, …>` map or an `options` array typed over the union existed anywhere in the render path. `EquationModeToggle.vue` is 80 lines, read whole: neither exists. The sibling `NotationPills.vue` and the parent's `SegmentedTabs` call (`EquationView.vue:188-191`) both use option arrays — so the idiom is available and locally attested, making this a deliberate divergence rather than an unavailable pattern.

---

### C-8 · MAJOR · The parent imports `SegmentedTabs` 175 lines above the mount site and this component still hand-rolls the same primitive — a *same-file* adoption gap, open across three audits

**Provenance**
- `EquationView.vue:13` — `import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";` — used at `:188-191` for the mobile Controls|Canvas pair.
- `EquationView.vue:270` — `<EquationModeToggle v-model="eqMode" />` — 82 lines later, in the same template, the exclusive two-option selection is hand-rolled instead.
- glass-ui 4.0.0 `package.json` exports include **both** `./tabs` (`SegmentedTabs`) and `./toggle-group` (`ToggleGroup`/`ToggleGroupItem`) — verified in the exports map; `lane-frontend.md:250-255` records fourier's adopted subpaths and shows `/toggle-group` **never imported anywhere in the app**.
- The hand-roll costs, all in this one 80-line file: a flex track (`:34-41`), a bespoke active plate (`:62-66`), a duplicated hover colour (`:58-60`), plus the four defects C-2/C-3/C-5/C-6 that a primitive would have made structurally impossible.

**Failure scenario** Any glass-ui motion/geometry recalibration (the `--spring-smooth` reconciliation documented at `base.css:235-241` is precisely such an event) propagates to `SegmentedTabs` at `EquationView.vue:188` and **not** to the toggle 82 lines below it, so two exclusive selectors in one viewport drift apart visually and behaviourally. That is already true today: the SegmentedTabs strip has a gliding indicator on a calibrated spring, the toggle has an instant class swap.

**Corpus status.** Booked three times and **never discharged**: D2-02 (`2026-06-16 findings-index.txt:352`, `raw-findings.json:2787-2789`), D4-09 (`findings-index.txt:394`, `raw-findings.json:3077-3080`), C4-04 (`2026-06-17 findings-index.txt:294`, `raw-findings.json:2831-2835`). This challenge confirms all three against the 2026-08-04 tree and adds the same-file aggravation plus the `/toggle-group` export (which the earlier rows called for but did not confirm as shipped at 4.0.0 — it is: verified in the installed exports map).

**Falsifier** — dies if `SegmentedTabs`/`ToggleGroup` could not express a 2-option exclusive selection with custom glyph content. `SegmentedTabs` exposes an `#option` scoped slot with `{option, active}` (recorded at `raw-findings.json:2835` from `SegmentedTabs.vue.d.ts:66-69`), which carries the Σ / `a + b` glyphs. Not refuted.

---

## 3 · MINORS

### C-9 · MINOR · Motion values contradict the file's own hygiene comment and bypass the shipped duration token
`EquationModeToggle.vue:36-38` — `.eq-toggle { transition: border-color 0.15s ease; }` uses the bare `ease` keyword **two lines above** `:50`'s comment claiming "named properties + canonical token". `:51-52` and `:38` hardcode `0.15s` where glass-ui defines `--duration-fast: 0.2s` (`dist/styles/tokens/scheme-motion.css:67`) and consumes it in both `.tap-squish` (`base.css:262-267`) and `.interactive-item` (`base.css:195-200`). **Falsifier applied and it bit:** I first wrote this as a *dead* transition; `dist/styles/glass/ladder.css:36-42` shows `.glass-wash` sets `border: 1px solid var(--glass-border-wash)`, so the track *does* have a border and the property is real — reachable, however, only on a light↔dark token flip (nothing in this file or `EquationView.vue:426-429` changes `.eq-toggle`'s border-color on any interaction state). Downgraded accordingly; the surviving claim is token/keyword inconsistency, not deadness.

### C-10 · MINOR · The math-serif stack is hardcoded rather than using the app's own `cm-serif` utility
`EquationModeToggle.vue:69-71` — `font-family: "Computer Modern Serif", Georgia, serif;` duplicates `style.css:14` `--font-sans`, while every other math surface in the app uses the `cm-serif` class (`PaperView.vue:354,361`; `MobileFloatingToc.vue:118,140,152,170`; `PaperArticleWindow.vue:111`; `PaperSidebar.vue:53`). Booked at `2026-06-16 raw-findings.json:1331-1333` with the exact remedy ("Delete the inline Georgia-fallback stack in EquationModeToggle and let it inherit the same utility") — **STILL OPEN**. *Falsifier:* if `cm-serif` did not exist or did not resolve to the same face. It exists and is in live use at the 8 sites above.

### C-11 · MINOR · No `type="button"` — latent submit hazard on a forwarded prop the primitive explicitly exposes
`dist/components/ui/button/Button.vue.d.ts` declares `type?: ButtonHTMLAttributes['type']` and `dist/button-BNDWhAZb.js` forwards it verbatim to the `Primitive` (`as` default `"button"`). Neither `<Button>` here (`:10-19`, `:20-29`) passes it, so the rendered element gets the HTML default `type="submit"`. *Falsifier that keeps this MINOR rather than MAJOR:* `grep -rn "<form" web/src/components/` returns **zero** matches app-wide, so no submit is reachable today. It is a latent contract gap, priced accordingly.

### C-12 · MINOR · Zero test coverage — C-1 is entirely unguarded
`web/package.json` `scripts` contains only `test:e2e` / `test:e2e:ui` (no unit runner, no vitest dependency). Across the 8 specs in `web/e2e/`, `grep -rn "sigma\|ModeToggle" web/e2e/*.spec.ts` returns only unrelated `blur_sigma` payload fields (`contour-extraction.spec.ts:67`, `visualization-crud.spec.ts:71`, `workspace-flow.spec.ts:78,118`). No spec exercises Σ↔expanded, and none visits the notation-change path that produces C-1. *Falsifier:* any assertion on the toggle. None exists.

---

## 4 · INFO

### C-13 · INFO · Zero value.js and zero keyframes.js consumption — this component is **not** on the F.W1/F.W2 blast radius
`grep -rn "mkbabb/value" web/src/` → exactly the 5 statements the census records (`CENSUS-2026-08-03.md:37-38`: "5 import statements / 4 files / 6 symbols, easing-only"), namely `ConvergencePlot.vue:5`, `composables/useCurveTransition.ts:8`, `lib/harmonics.ts:5`, `lib/easings.ts:9,16` — **none in this file**. `grep -rn "mkbabb/keyframes"` → `stores/animation.ts:47` (a comment recording a *removed* import) and `composables/useFourierMorph.ts:14` — again none here. The component's motion is two CSS transitions. **Confirms and refines** the census: the equation-mode toggle carries no bare-specifier debt and needs no F.W2 work; its producer exposure is glass-ui-only. A useful negative — the F.W2 surface for `components/equation/` is `useCurveTransition.ts` + `lib/harmonics.ts` + `ConvergencePlot.vue`, and this file must not be swept in with them. *Falsifier:* the two greps above, run against the live tree at 2026-08-04.

### C-14 · INFO · A client-only view enum lives inside the wire-contract module — a small seam smear
`types.ts:22` places `EquationDisplayMode` between `ComputeEquationRequest` (`:12-20`) and `ComputeEquationResponse` (`:24-34`), i.e. inside the DTO module. It appears in **no** request or response body — `api/routers/equations.py` has no `display_mode` field anywhere, and `web/src/lib/equation/api.ts:24-53` never sends it. So `EquationModeToggle.vue:3` imports the API contract module to obtain a purely local view-state union. Consumption of the 45-operation surface by this component is otherwise **zero** (no `apiFetch`, no store, no fetch, no lifecycle hook — the script block is 1 statement). *Falsifier:* a server-side `display_mode`/`notation`-style field would make the placement correct. Grepped `api/routers/equations.py` and `types.ts` whole: it does not exist.

---

## 5 · SUPERLATIVES (L-18 runs both ways)

### S-1 · The v-model contract is exactly right, and it sidesteps a bug class this constellation has been bitten by
`EquationModeToggle.vue:5` is the whole script: `defineModel<EquationDisplayMode>({ required: true })`. No `props`/`emit` pair, **no local mirror `ref`, no `watch`, no `modelValue` shadow**, and `required: true` forbids a silent `undefined` mount. This is a directly-earned avoidance: the value.js project memory records a live `shallowRef` + `defineModel` hazard — *"`defineModel()` returns `WritableComputedRef` with async parent round-trip — reads after writes return stale data"*, which forced `useColorModel` to carry a synchronous cache ref. This component is immune because it never reads the model except in two template equality comparisons and never writes-then-reads within a tick. **Falsifier:** a `const local = ref(props.modelValue)` + `watch` pairing, or any `model.value` read in script. Neither exists in the 80 lines.

### S-2 · The accent is consumed as a live CSS custom property, not through the repo's runtime token-shadow — so it survives a theme flip for free
`EquationModeToggle.vue:63` uses `color: var(--viz-amber)` directly. The alternative path is live in this very directory: `web/src/lib/colors.ts:20-30` `cssVarToHex()` reads `getComputedStyle(document.documentElement)` once into a `reactive` registry, and `composables/useCoeffHover.ts:59-65` is *forced* onto it (KaTeX cannot resolve CSS vars) at the documented cost of a `STATIC.golden` fallback "used when `resolveVizColors` has not yet run (mounted before paint)". By staying in CSS, the toggle's active gold re-resolves on every light↔dark flip with zero JS, needs no resolve-ordering guarantee, and has no first-paint fallback colour to go stale. **Falsifier:** had it read `VIZ_COLORS.amber`, a `DarkModeToggle` flip (`components/layout/DarkModeToggle.vue:18`, `useGlobalDark`) would leave the active segment painted in the previous theme's amber until a re-resolve. It does not.

### S-3 · The `--viz-amber` it consumes is the *adjudicated* local override, not the raw upstream token
`style.css:113-127` documents a deliberate light-mode darken — *"glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)` ≈ 3.54:1 … D.W4.d — light-mode `--viz-amber` darken (axe contrast carry)"* — landing `hsl(35 76% 35%)` light / `hsl(37 73% 67%)` dark. Because the component reads the variable rather than a literal, its active-state colour **inherits an already-adjudicated accessibility carry at zero cost**, and will inherit the fix again when that carry is folded upstream (booked at `2026-06-16 raw-findings.json:1375`). **Falsifier:** hardcoding `#f0b632` — which is sitting right next door as `colors.ts:12` `STATIC.golden` and would have forfeited the correction. It did not.

---

## 6 · Candidates killed by their own falsifier (recorded so the next lane does not re-raise them)

- **K-1 · "`Fira Code` (`:76`) is never loaded; the `letter-spacing: -0.5px` (`:78`) was tuned against a face that is absent."** **FALSIFIED.** `web/public/fonts.css:64-77` declares `@font-face { font-family: "Fira Code"; font-weight: 300 700; src: url("/fonts/fira-code/fira-code-latin.woff2") }`, `web/index.html:19` links `/fonts.css`, and `web/public/fonts/fira-code/` exists. The `600` weight used at `:44` is inside the declared `300 700` range, so no synthetic bolding either. Likewise the italic CM face the Σ glyph needs is real (`public/fonts.css:28-33`, `cmunti.woff`, preloaded at `index.html:14`). Claim withdrawn in full.
- **K-2 · "`.eq-toggle { transition: border-color }` (`:36-38`) is a dead declaration — the track has no border."** **FALSIFIED.** `dist/styles/glass/ladder.css:36-42` gives `.glass-wash` a `1px solid var(--glass-border-wash)` border, which `EquationModeToggle.vue:9` opts into. Downgraded, not withdrawn — the surviving residue is C-9 (bare `ease`, hardcoded `0.15s`).

---

## 7 · Verdict

The component is **DEFECTIVE on the consumption axis**, and the shape of the defect is consistent: it names three producer/API contracts (`variant="ghost"`, `size="sm"`, `EquationDisplayMode`) and then, through an unlayered scoped stylesheet and a one-string model contract, discards the substance of all three. Concretely — the requested ghost variant contributes one colour before being overridden (C-5); the requested `sm` size contributes nothing, its height token replaced by the token's own unscaled constant (C-4); the vendor's press spring and focus ring are clobbered and clipped by the wrapper (C-3, C-2); the shipped `aria-pressed` selected register goes unused while a bespoke `.is-active` re-implements a fraction of it without the accessibility (C-6); and the mode union it exists to switch is neither exhaustively consumed (C-7) nor conditioned on whether the server can actually honour the chosen branch (C-1). The correct discharge is not a patch list but the fold already booked three times and never executed (C-8): retarget onto `SegmentedTabs` (or `ToggleGroup`, both exported at 4.0.0), which structurally dissolves C-2, C-3, C-5, C-6, C-7 and C-8 at once — leaving C-1 as the one defect that must be fixed at the **contract** (either `SimplifyResponse` gains `latex_sigma`, or the mode control gains an availability input). C-1 and C-2 are ship-blocking on their own terms: C-1 renders a materially wrong equation in the pane's default state, and C-2 removes keyboard focus visibility from the pane's only overlay control.

**Carries proposed** — C-1 → F.W5 (the operation↔client seam, alongside R6-8); C-2/C-3/C-4/C-5/C-6/C-7/C-8 → the fourier control-pane composition wave (the M.W8 successor), as **one** SegmentedTabs fold; C-13 → census amendment (this file is off the F.W2 surface — do not sweep).
