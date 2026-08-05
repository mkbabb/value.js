claude-opus-5[1m] (served model id)

# CHALLENGE — `EquationModeToggle` · axis **C · CONSUMPTION**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/EquationModeToggle.vue` (80 LOC)
**Substrate** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16` — the tree intake row **R4-9** proved byte-identical
to the Codex-audited scope. This file is one of the **24 in-scope dirty paths** (` M` in `git status --porcelain`); the
working delta is a single line and it matters (§S-3). Audited AS WORKING TREE, with the HEAD arm called out.
**Mode** static + source-derived. No browser tooling. Livable-only claims marked `UNPROVEN-NEEDS-LIVE` for SS-13.
L-18 runs both ways — the superlatives carry falsifiers too, and §6 records three candidates their own falsifiers killed.

**Read whole (read-only).** The target; `web/src/lib/equation/types.ts`; the sole consumer `EquationView.vue`;
`NotationPills.vue`; `FunctionInput.vue`; `web/src/style.css`; `web/src/main.ts`; `web/index.html`;
`web/public/fonts.css`; `web/package.json`; `web/e2e/visual-baseline.spec.ts`; `api/routers/equations.py`;
`api/models/equations.py`. Producer bytes at the pinned version, `node_modules/@mkbabb/glass-ui@4.0.0/dist/`:
`package.json` exports, `button-BNDWhAZb.js`, `button.d.ts`, `tabs.js`, `toggle-group.d.ts`, `styles/index.css`,
`styles/utilities/{base,a11y-overrides}.css`, `styles/glass/{ladder,surfaces,material}.css`,
`styles/typography/utilities.css`, `styles/fonts.css`,
`styles/tokens/{offsets-sizing,light-dark,color-radius,dark-arm,scale-paper,scheme-motion}.css`.

**Corpus folded, not re-invented.** `formation/fourier/lane-frontend.md:137-138, 236-283, §4`;
`audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R6-8** (`:142`), **R3-7a** (`:79`), **R3-7c** (`:81`),
**X-3** (`:154`), **R4-9** (`:107`). **A prior C-axis pass on this same component exists at this path** (dated
2026-08-04, 14 defects / 2 BLOCKER / 3 superlatives); this pass supersedes it, **confirming 12 of its rows against the
tree, contradicting one of its superlatives with arithmetic (C-7), and adding six findings** — each marked
`[CONFIRMS]`, `[CONTRADICTS]`, or `[NEW]`. Its two killed candidates (K-1, K-2) are re-verified and **stand killed**;
one of them (K-1) killed a claim this pass independently reached, and that is recorded in §6 rather than buried.

**Tally — 19 defects (BLOCKER 2 · MAJOR 8 · MINOR 6 · INFO 3) · 5 superlatives · 3 candidates killed by falsifier.**

---

## §0 — Standing facts, established once and cited thereafter

**[LAYER]** — every declaration in this file's `<style scoped>` beats *all* glass-ui and Tailwind styling on the same
element, unconditionally. `web/src/style.css:1` is `@import "tailwindcss"` under `@tailwindcss/postcss`, so Tailwind v4
emits utilities into `@layer utilities`; glass-ui's component CSS declares `@layer components`
(`dist/styles/utilities/base.css`). A Vue SFC `<style scoped>` block is emitted **unlayered** — the plugin adds only the
`[data-v-*]` attribute. Unlayered normal declarations win over every layered one regardless of specificity. *Falsifier:*
a `@layer` wrapper on SFC styles in the build config, or glass-ui shipping button CSS unlayered — neither exists.

**[SURFACE]** — the consumption surface, enumerated:

| dependency | pinned → installed | this file's consumption | verdict |
|---|---|---|---|
| `@mkbabb/glass-ui` | `^4.0.0` → **4.0.0** | `Button` via subpath `:2`; raw class `glass-wash` `:9`; tokens `--muted-foreground` `:49`, `--foreground` `:65`, `--viz-amber` `:64`, `--ease-standard` `:52` | **the whole defect surface** |
| `@mkbabb/keyframes.js` | `^4.3.0` | **zero** | correct abstention (S-4) |
| `@mkbabb/value.js` | `^0.13.0` | **zero** — one static `color-mix()` `:65` | correct abstention (S-4); **off the F.W2 surface** |
| fourier API (45 ops, X-3) | — | **zero direct**; one *type* whose two members are exactly the `latex` / `latex_sigma` arms of one operation's response | **the seam defect** (C-1, C-18) |
| props / emits | — | `defineModel<EquationDisplayMode>({ required: true })` `:5` — the entire script block | **S-1** for form; **C-1** for arity |

**[SHAPE]** — this is a hand-rolled binary segmented control. glass-ui 4.0.0 exports `./tabs` (`SegmentedTabs`),
`./toggle-group`, `./toggle-chip`, and ships `dist/styles/segmented-tabs.css`. **Its own parent file already imports
`SegmentedTabs`** (`EquationView.vue:13`) and uses it for a binary switch 82 lines above the site where it mounts this
child (`:188-191` vs `:270`).

---

## §1 — BLOCKERS

### C-1 · BLOCKER · `/equations/simplify` cannot refresh the sigma arm, so the pane's **default** view can show a different notation than the one selected — and this component's contract makes that ungateable from outside `[CONFIRMS]`

Every link verified against the tree:

| # | fact | file:line |
|---|---|---|
| 1 | The mode's two members select between two server-rendered LaTeX strings | `lib/equation/types.ts:22` vs `:27-28` |
| 2 | `POST /equations/compute` returns **both** arms | `api/models/equations.py:29-30`; `api/routers/equations.py:96`, `:110-111`, `:124-125` |
| 3 | `POST /equations/simplify` returns **only** `latex` — the response model has three fields, none sigma | `api/models/equations.py:42-45`; `api/routers/equations.py:155-160` |
| 4 | The sigma arm is written on compute only | `EquationView.vue:114`; cache rehydrate `:39`. `grep displayLatexSigma web/src` → exactly 3 hits: `:39`, `:50`, `:114` |
| 5 | `doSimplify` refreshes only the expanded arm | `EquationView.vue:138` |
| 6 | A **notation** change routes to `doSimplify`, never `doCompute` | `EquationView.vue:177-181`. `doCompute` has exactly two call sites — `:174` (mount), `:210` (`@compute`) — and `FunctionInput` emits `compute` only at `:39` (preset), `:102` (Enter), `:147` (button); **never on notation change** |
| 7 | The server bakes notation into the sigma render | `api/routers/equations.py:96` — `render_latex_sigma(terms, req.notation)` |
| 8 | **`sigma` is the mount default** | `EquationView.vue:43` |
| 9 | The mismatch survives reload by construction | `:39` rehydrates sigma from the *original* compute while `:38` rehydrates the expanded string from the *simplified* cache written at `:141` |

**Failure scenario — two interactions from cold mount.** Load `/equation`; mode is `sigma`; the Σ equation renders.
Click the **exponential** notation pill (`NotationPills.vue:25` → `FunctionInput.vue:30,223` → `EquationView.vue:204`).
After the 200 ms debounce `doSimplify` lands: the expanded string and the energy badge become exponential; the sigma
string stays **trigonometric**. The user is in the default mode, so the pane displays a trig series under a pill reading
"exponential" and an energy figure derived from the exponential simplify. The same for `budget`: in the default mode the
budget slider appears **dead**.

**Aggravator.** `EquationView.vue:49-51` — `eqMode === "sigma" && displayLatexSigma ? displayLatexSigma : displayLatex`
— silently falls back to the *expanded* string when sigma is empty, while the Σ segment stays lit. The control's
visual state is not a claim about what is rendered. Note this guard masks *emptiness* only: a **stale non-empty** string
is truthy and wins, so it does not rescue the scenario above.

**The component's own share.** `:5` exposes one writable model and nothing else — no `disabled`, no per-option
`disabled`, no `available`, no `stale`. The parent therefore has **no channel** to say "sigma is not valid for the
coefficients currently displayed"; the only fix reachable without editing this file is to stop mounting it. A
`defineModel`-only contract is right for a *free* choice; this is a *conditioned* one. (`SegmentedTabs` takes
`options: [{label, value, disabled?, tooltip?}]` — `tabs.js:104-112`, `:229-231`, `:249-251` — and carries exactly this.)

**Falsifier — all four checked, none holds.** (a) `SimplifyResponse` carries `latex_sigma` → `api/models/equations.py:42-45`,
three fields, refuted. (b) `doSimplify` invalidates the sigma arm → `EquationView.vue:130-147`, refuted. (c) `activeLatex`
guards freshness → `:49-51` guards emptiness only, refuted. (d) the toggle accepts an availability input → `:5`, refuted.
Whether the mismatch is *visually obvious* is UNPROVEN-NEEDS-LIVE; the **state** mismatch is source-exact.

**Carry → F.W5, with R6-8.** Intake R6-8 established that *an API-operation record embedding derived client
back-references cannot attribute a defect to one side of the seam*. This is its dual, at a second seam and a second
operation pair: **an operation returning a *partial projection* of a sibling operation's response shape cannot keep a
client that joins both arms coherent.** `/equations/simplify` is a partial refresh of `/equations/compute`; this toggle
is the client leaf that joins them. Two independent instances of one law is the argument for writing it into the
shared-provenance contract rather than patching either site.

---

### C-2 · BLOCKER · `overflow: hidden` on the track clips away the focus indicator glass-ui ships on the buttons this file imports `[CONFIRMS]`

- `EquationModeToggle.vue:34-40` — `.eq-toggle { display: flex; border-radius: 9999px; overflow: hidden; }` — **no padding, no gap**.
- `button-BNDWhAZb.js:47` — the cva base string opens `"btn-pill tap-squish focus-ring …"`; both children carry it (`:10-19`, `:20-29`).
- `dist/styles/utilities/base.css:174-178` — `.focus-ring:focus-visible { outline: none; border-radius: var(--radius-pill); box-shadow: var(--focus-ring-shadow); }` — the ring is **box-shadow only**, and `outline` is explicitly zeroed.
- `dist/styles/tokens/scale-paper.css:65-67` — `--focus-ring-shadow: 0 0 0 2px color-mix(…), 0 0 8px color-mix(…)` — **neither layer is `inset`**; both paint entirely outside the border box.
- `dist/styles/utilities/a11y-overrides.css:78-92` — the forced-colors restoration is `outline: 2px solid Highlight; outline-offset: 2px` — **also** outside the border box.

`overflow: hidden` clips the entire descendant subtree's painted output, box-shadows and outlines included. `:47`'s
`height: 2.25rem` on a flex child of a padding-less track means the buttons fill the content box exactly, so the ring
lies wholly outside the clip. With `outline: none` already suppressing the UA default, **no indicator survives** — in
the default arm *and* in forced-colors. WCAG 2.4.7 (Focus Visible) and 2.4.11 (Focus Not Obscured, Minimum), on the only
control in the equation card's overlay layer.

**Falsifier.** Dies if the ring were inset (`scale-paper.css:66` — neither layer carries `inset`, refuted); if the
buttons were inset from the track so the shadow fell inside the clip (`:34-40`, `:42-56` — no padding, gap, or margin,
refuted); if `overflow` were `clip` with an `overflow-clip-margin` (`:37` is bare `hidden`, refuted); or if a later rule
removed it (`:33-79` read whole — `overflow` appears once). Pixel extent UNPROVEN-NEEDS-LIVE; the clip is source-exact.

**Consumption framing.** glass-ui hands every `Button` a working indicator for free. One property on the wrapper took a
control that arrived accessible and made it inaccessible. `SegmentedTabs` solves the same rounded-group geometry with a
positioned indicator element (`tabs.js:207-213`), not a clip — so the fold at C-9 dissolves this defect structurally.

---

## §2 — MAJORS

### C-3 · MAJOR · the scoped `transition` shorthand clobbers `.tap-squish`'s six-leg list down to two — reproducing, from the consumer side, the exact cascade RED glass-ui hardened against `[CONFIRMS]`

- `EquationModeToggle.vue:51-52` — `/* A.W3.d — named properties + canonical token, no transition: all. */`
  `transition: color 0.15s var(--ease-standard), background-color 0.15s var(--ease-standard);` — **two legs**.
- `dist/styles/utilities/base.css:259-269` — `.tap-squish` ships **six**: `background-color`, `border-color`,
  `box-shadow`, `color`, `opacity` on `var(--ease-standard)`, plus **`scale var(--duration-fast) var(--spring-smooth)`**.
- `dist/styles/utilities/base.css:271-273` — `.tap-squish:active { scale: var(--scale-press); }` — the press *value* is
  a separate layered rule that survives; only its transition is destroyed.
- `dist/styles/utilities/base.css:244-254` — glass-ui's own comment: *"This is load-bearing: `.tap-squish` and
  `.btn-pill` are co-composed on the button base and this `transition` shorthand would otherwise CLOBBER `.btn-pill`'s
  surface legs down to a scale-only animation (the cascade bug that left every button transitioning ONLY `scale` — the
  live-readback RED)."*
- **[LAYER]** — the producer's mitigation is "both classes carry the full set, so whichever wins the cross-fade
  survives". An **unlayered** consumer rule beats *both*. The mitigation does not reach this case.

Press either segment: `scale: var(--scale-press)` applies and releases instantly — the calibrated spring becomes a
two-frame jump. The `box-shadow` leg is gone too, so the (already clipped, C-2) ring would pop rather than fade. All of
it in a rule whose own comment claims motion hygiene.

**Falsifier.** Dies if the scoped rule were layered (**[LAYER]**, refuted); if it enumerated the `scale` leg (`:52` is
the complete list, refuted); or if `.tap-squish` were absent from the base string (`button-BNDWhAZb.js:47`, present).

### C-4 · MAJOR · `height: 2.25rem` hardcodes the **unscaled constant of the very token** `size="sm"` was asked to supply, defeating `--ui-scale` and the 44 px WCAG floor `[CONFIRMS]`

- `EquationModeToggle.vue:12`, `:22` — `size="sm"` requested; `:46-47` — `padding: 0 0.6rem; height: 2.25rem;` (literals, unlayered ⇒ **[LAYER]**, they beat `h-(--control-h-sm)` and `px-3`).
- `button-BNDWhAZb.js:75` — `sm: "h-(--control-h-sm) rounded-pill px-3"`.
- `dist/styles/tokens/offsets-sizing.css:136` `--ui-scale: 1` · `:142` `--ui-coarse-scale: 1.5` · `:148` `--control-floor: 0px` · `:150` `--control-h-sm: max(calc(2.25rem * var(--ui-scale)), var(--control-floor));`
- `dist/styles/tokens/light-dark.css:18-22` — the global coarse block: `@media (pointer: coarse) { :root { --ui-scale: var(--ui-coarse-scale, 1.5); --control-floor: var(--touch-target, 2.75rem); } }`, documented at `:11-16` as enforcing the 44 px floor *"regardless of the scalar"*.

On a coarse pointer the system intends `max(2.25 × 1.5, 2.75rem)` = **3.375rem (54 px)**. The literal pins both segments
at **36 px — below the 44 px floor glass-ui mints a token for** — on the sole equation-mode affordance, positioned as an
absolute overlay at `top-2 left-2` (`EquationView.vue:426-429`) over a canvas region where mis-taps are costly. The
`0.6rem` padding fixes hit width against `px-3` and likewise never scales: the Σ target is roughly 35 px wide. WCAG 2.5.5
and 2.5.8.

**Falsifier.** Dies if fourier re-pins the scalars (`grep -rn -- "--ui-coarse-scale\|--control-floor" web/src` → 0 hits);
if the literal lost the cascade (**[LAYER]**); or if a media query restored the scaled height (the file has **no**
`@media` block, `:33-79`). Measured device px UNPROVEN-NEEDS-LIVE; the token bypass is source-exact.

### C-5 · MAJOR · `variant="ghost"` is requested and then neutralized — the hover and active affordances are deleted, not replaced `[CONFIRMS]`

- `:11`, `:21` — `variant="ghost"`.
- `button-BNDWhAZb.js:60` — `ghost: "bg-transparent text-foreground/70 hover:bg-foreground/8 hover:text-foreground active:bg-foreground/12 aria-pressed:bg-foreground/10 aria-pressed:text-foreground"` — six declarations over four states.
- `:49` `color: var(--muted-foreground);` and `:54` `background: transparent;` (the shorthand also resets `background-color`) ⇒ **[LAYER]** beats `text-foreground/70` and every `hover:`/`active:`/`aria-pressed:` background utility.
- `:58-60` — the only scoped hover rule is `color: var(--foreground)`. There is **no** scoped hover or active background.

Net imported value of `variant="ghost"`: one colour the file immediately overrides, and one it re-implements by hand.
An inactive segment has no hover background and no press background — the vendor supplied both, the consumer deleted
both and substituted nothing.

**Falsifier.** Dies on any `background`/`background-color` in a `:hover` or `:active` scoped rule. `:33-79` read whole —
`background` appears twice, at `:54` (`transparent`) and `:65` (`.is-active`). Refuted.

### C-6 · MAJOR · glass-ui ships an `aria-pressed` selected register on `ghost`; the component hand-rolls `.is-active` and exposes **no** accessible selected state `[CONFIRMS]`

- `button-BNDWhAZb.js:60` — `aria-pressed:bg-foreground/10 aria-pressed:text-foreground` (present on 9 of 12 variants; Tailwind compiles the variant to `&[aria-pressed="true"]`).
- `:14`, `:24` — `:class="{ 'is-active': … }"`; `:63-66` — `.eq-toggle-btn.is-active { color: var(--viz-amber); background: color-mix(in srgb, var(--foreground) 8%, transparent); }`.
- The file contains **zero** `aria-*`, **zero** `role`. The container `:9` has no `role="group"`/`radiogroup`; there is no arrow-key handling.
- `title` (`:15`, `:25`) does **not** supply the accessible name — per accname, non-empty content wins, so the names are literally "Σ" and "a + b", the second indistinguishable from equation content.

A screen-reader user hears two near-unlabeled buttons in no group with **no indication which mode is active**; the only
selected signal is colour (WCAG 1.4.1, 4.1.2). Binding `:aria-pressed="model === 'sigma'"` would have both announced the
state *and* recruited the vendor's shipped plate for free, deleting the bespoke `color-mix` rule — and, per C-7, the
contrast defect with it. Compare `tabs.js:225-231`, `:245-251`: `SegmentedTabs` emits per-option `aria-pressed` plus
`role="group"` + `aria-orientation` on the container (`:203-204`).

**Falsifier.** `grep -c aria-pressed dist/button-BNDWhAZb.js` → non-zero (9 variant strings). Verified.

### C-7 · MAJOR · the active amber measures **≈3.94:1** in light mode — under AA — because the component paints an 8 % tint *underneath* the very token whose contrast carry it inherits `[NEW]` · **CONTRADICTS the prior pass's superlative S-3**

- `:64-65` — `color: var(--viz-amber); background: color-mix(in srgb, var(--foreground) 8%, transparent);`
- `web/src/style.css:113-122` — the D.W4.d carry: *"glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)` ≈ 3.54:1 against `--background` … The override darkens to `hsl(35 76% 35%)` ≈ 4.6:1 (clears AA)."*
- `EquationView.vue:251` mounts the toggle inside `.cartoon-card`; `style.css:107-111` — `.cartoon-card { … background: var(--card); }`
- `dist/styles/tokens/color-radius.css:72` `--card: hsl(36 48% 97%)` · `:58` `--foreground: hsl(24 10% 10%)` · `:40` `--neutral-0: hsl(40 30% 98%)` (= `--background`, `:57`)

**Derivation.** `--card` → sRGB (251.0, 248.1, 243.7); `--foreground` → (28.1, 25.0, 23.0). `color-mix(…8%, transparent)`
is an α=0.08 layer of foreground composited over the card ⇒ **(233.2, 230.3, 226.0)**, relative luminance **0.796**.
`--viz-amber` `hsl(35 76% 35%)` → (157.1, 100.5, 21.4), relative luminance **0.1645**.
Contrast = (0.796 + 0.05) / (0.1645 + 0.05) = **3.94 : 1**.

**Method calibration (so the figure is refutable, not assertable).** The identical arithmetic against bare
`--background` yields **4.71 : 1**, reproducing the project's own certified "≈4.6:1" to rounding. The method is therefore
calibrated against a figure the repo already adjudicated; the 3.94 result stands on the same footing.

**Why the prior superlative is wrong.** The prior pass celebrated `var(--viz-amber)` as *"inheriting an
already-adjudicated accessibility carry at zero cost"* (its S-3). The inheritance is real; the **carry does not survive
this component**. D.W4.d computed against `--background`. This file paints its active label on a `--card` surface
(already a point darker) with a further 8 % foreground tint on top — costing ≈0.77 of the ratio and landing the active
label under 4.5:1. Reading the adjudicated token and then darkening its backdrop by hand forfeits exactly what the token
was adjudicated for. Both glyph arms are normal text: 16 px (`:69`) and 11 px (`:76`), neither near the 18.66 px
large-text threshold.

Dark mode is unaffected — `--viz-amber: hsl(37 73% 67%)` on `--card: hsl(24 8% 16%)` with an 8 % tint of a *light*
`--foreground` (`dark-arm.css:60,64`) moves the ratio the safe way. The defect is light-mode-only, which is also why an
axe sweep run in one scheme could have missed it.

**Falsifier.** Dies if the toggle does not sit on `--card` (`EquationView.vue:251` + `:269-271`, refuted); if
`color-mix(…, transparent)` composited other than by α-blending; or if the D.W4.d sweep measured the *tinted active*
state — `style.css:114-115` cites only "against `--background`", so it did not. Live axe-core readback is
UNPROVEN-NEEDS-LIVE; the arithmetic is source-exact and reproducible from the four token values cited.

### C-8 · MAJOR · `title=` is the tooltip mechanism while glass-ui's `TooltipProvider` is already mounted app-wide `[NEW]`

- `:15` `title="Sigma notation (compact)"` · `:25` `title="Expanded terms"`
- `src/App.vue:4` — `import { TooltipProvider } from "@mkbabb/glass-ui/tooltip";` (lane-frontend.md:236), mounted at the root shell, so it is an ancestor of `/equation`.
- `tabs.js:216-238` — `SegmentedTabs` wraps any option carrying `tooltip` in the glass-ui `Tooltip` primitive.

Native `title` tooltips do not appear on keyboard focus in any major engine, never appear on touch, cannot be styled or
positioned, and — because the buttons have content — are not even the accessible name (C-6). The app already pays for
the provider context at the root; this is the one control in the equation view that opts out of it. Corpus
cross-reference: intake **R3-7a** budgets 35 `<Tooltip` callsites over 9 consumers for F.W3 — these two attributes are
two more sites that lane will not find by grepping `<Tooltip`, so the migration budget is understated by at least this
component.

**Falsifier.** Dies if `TooltipProvider` were not an ancestor (it is mounted in `App.vue`, the root shell); or if
`title` were the intended accessible-name mechanism (it is not — content wins).

### C-9 · MAJOR · SHADOW — hand-rolled segmented control while `SegmentedTabs` is imported and in use 82 lines away in its own parent `[CONFIRMS]` · **and the corpus grading is inverted — amendment filed**

**[SHAPE]** plus: glass-ui 4.0.0's exports map lists **both** `./tabs` and `./toggle-group`; `lane-frontend.md:236-283`
records fourier's 44 glass-ui import lines and `/toggle-group` appears in **none** of them.

What `SegmentedTabs` supplies that this file re-implements badly or not at all: `role="group"` + `aria-orientation`
(`tabs.js:203-204`); per-option `aria-pressed` (`:229`, `:249`) — C-6; per-option `disabled` → `is-disabled` (`:230`,
`:250`) — **the exact affordance C-1 needs**; per-option `tooltip` through the real primitive (`:216-238`) — C-8; a
positioned sliding indicator instead of an overflow clip — C-2; an explicit `prefers-reduced-motion` guard on the press
animation (`tabs.js:158`) — C-3; and a responsive collapse-to-`Select` arm (`:175-199`) — C-4. The hand-roll costs a
flex track (`:34-40`), a bespoke active plate (`:63-66`), a duplicated hover colour (`:58-60`), and six defects a
primitive would have made structurally impossible.

**Drift is already live, not hypothetical.** The `SegmentedTabs` strip at `EquationView.vue:188` has a gliding indicator
on a calibrated spring; the toggle 82 lines below has an instant class swap. Two exclusive selectors, one viewport, two
motion languages — and any glass-ui recalibration (`base.css:235-241` documents precisely such an event) reaches one and
not the other.

**Corpus amendment — CONTRADICTS `lane-frontend.md`.** Line 137 records this file as
`| EquationModeToggle.vue | 80 | Mode toggle (Button group) |` with **no SHADOW flag**, while **line 138** flags its
47-LOC sibling `NotationPills.vue` as a "**SHADOW candidate, §4**", routed in §4's 🟡 table to `./toggle-chip`. The
grading is inverted: `NotationPills` shadows a subpath imported **nowhere**; `EquationModeToggle` shadows one imported
**and in active use in the file that mounts it**. §4's own stated signal is zero-import
(*"Name-identical, zero-import: the strongest shadow signal in the tree"*); *imported-and-used-adjacently-yet-reforked*
is strictly stronger. **Amend `lane-frontend.md:137` to `— SHADOW candidate, §4`, and add to §4's 🟡 table:
`equation/EquationModeToggle.vue | 80 | ./tabs (SegmentedTabs) — already imported at EquationView.vue:13`.** The §4
aggregate moves from *9 components / ~1 990 LOC* to **10 / ~2 070**.

**Falsifier.** Dies if `SegmentedTabs` could not express a 2-option exclusive selection with custom glyph content —
`tabs.js:105` defaults `variant` to `"pill"`, options are an arbitrary-length array, and the `#option` scoped slot
exposes `{option, active}` (`tabs.js:232-236`, `:252-256`), which carries the Σ / `a + b` glyphs. Not refuted.

### C-10 · MAJOR · the consumer is not exhaustive over `EquationDisplayMode`, and nothing in the toolchain will ever say so `[CONFIRMS]`

`lib/equation/types.ts:22` — `"expanded" | "sigma"`. `:14`, `:16`, `:24`, `:26` — both literals are hardcoded **four
times** in the template (twice in `:class`, twice in `@click`). No options array, no `v-for`, no
`satisfies Record<EquationDisplayMode, …>`, no `never` guard. Add a third member — `"latex-source"` is the obvious next
one, since `ComputeEquationResponse` already carries two renderings — and `vue-tsc -b` (`package.json` `build`) reports
nothing, because widening a union breaks no assignment here. The toggle silently cannot select it; and if the model
arrives at it via rehydration (`EquationView.vue:38-39`), **both** segments render inactive with no way back.

**Falsifier.** Dies if a `Record<EquationDisplayMode, …>` map or a union-typed options array existed in the render path.
80 lines read whole: neither. The idiom is locally attested — `NotationPills.vue:22` iterates `NOTATION_OPTIONS`, and
the parent's `SegmentedTabs` call passes an options array (`EquationView.vue:189`) — so this is divergence, not
unavailability.

---

## §3 — MINORS

### C-11 · MINOR · motion values contradict the file's own hygiene comment and bypass the shipped duration token `[CONFIRMS]`
`:38-39` — `.eq-toggle { transition: border-color 0.15s ease; }` uses the bare `ease` keyword **thirteen lines above**
`:51`'s comment claiming *"named properties + canonical token"*. `:39` and `:52` hardcode `0.15s` where
`dist/styles/tokens/scheme-motion.css:67` defines `--duration-fast: 0.2s`, consumed by `.tap-squish` (`base.css:262-268`)
and `.interactive-item` (`base.css:195-200`). Commit `59f270a` ("refactor(A.W3.d): … excise cubic-bezier and
transition:all") reached `:52` and missed `:39`. **Falsifier applied, and it bit** — see **K-2** in §6: the property is
*not* dead, because `.glass-wash` really does set a border. The surviving claim is token/keyword inconsistency only.

### C-12 · MINOR · both hardcoded font stacks are **drifted partial copies** of the project's own stacks `[NEW severity, K-1-corrected]`
- `:70` `font-family: "Computer Modern Serif", Georgia, serif;` — `style.css:14` defines
  `--font-sans: "Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif`. The literal **drops two
  fallbacks**. On a machine carrying CMU Serif but no face literally named "Computer Modern Serif", the whole app
  renders CM-family and this one Σ falls to **Georgia**.
- `:75` `font-family: "Fira Code", monospace;` — `dist/styles/tokens/scheme-motion.css:46` defines
  `--font-stack-mono: "Fira Code", "Fira Code Fallback", "Fira Mono", monospace` (bridged to `--font-mono`,
  `theme/bridges.css:70`). The literal **drops two fallbacks**, including the metric-compatible face; `letter-spacing:
  -0.5px` (`:78`) is tuned against Fira Code advances and mis-tracks under a generic fallback.
- The utilities exist and are in live use **in the same view**: `typography/utilities.css:65-72` (`@utility cm-serif`,
  `@utility fira-code`), used at `EquationView.vue:224,232,241,245` (`fira-code`) and `:322` (`cm-serif`),
  `NotationPills.vue:26` (`cm-serif`).

**This is the *drift* claim only.** The stronger claim — that the faces are never loaded — is **FALSE**; see **K-1**.
Recorded at MINOR accordingly. *Second-order note, booked not claimed:* `grep -rn -- "--font-serif-math" web/src` → 0,
so `.cm-serif` currently resolves to bare `serif` in fourier (`typography/utilities.css:66`) and is **not** a drop-in
substitute here — the correct target is `var(--font-sans)`. That mismatch is a fourier↔glass-ui token-wiring gap worth
its own row in a T-axis pass.

### C-13 · MINOR · `font-size: 16px` / `11px` literals defeat the app's own root ramp and the token scale `[NEW]`
`:69` and `:76`. `web/src/style.css:40-50` installs a mobile-first root ramp (`html { font-size: 1.125rem }` →
`1rem` at `min-width: 768px`); `button-BNDWhAZb.js:47` sets `text-[length:var(--control-text)]` and `size="sm"` keeps
it; `typography/utilities.css:50-55` mints `@utility text-mono-micro { font-size: var(--type-micro) }` for exactly this
register. Absolute px is immune to the ramp *and* to `--ui-scale`, so the labels stay 16/11 px while the surrounding UI
grows 1.5× on touch (C-4). 11 px is the smallest type in the equation view. *Falsifier:* dies if `--control-text` /
`--type-micro` did not exist at 4.0.0 (both resolve), or if px were required for optical alignment with KaTeX — nothing
says so, and the sibling `EquationResult.vue` does not do it.

### C-14 · MINOR · the pressed tint is 8 % where the design system's pressed register is 10 % `[NEW]`
`:65` `color-mix(in srgb, var(--foreground) 8%, transparent)` vs `button-BNDWhAZb.js:60`
`aria-pressed:bg-foreground/10`. Two pressed registers in one application, two points apart, with the local one also
being the arm that fails contrast (C-7 — note moving *to* 10 % makes the ratio marginally worse, so the discharge is
adopting `aria-pressed` **and** re-deriving the carry, not tuning the number). *Falsifier:* dies if a fourier-local
pressed token specified 8 % — `grep -rn "8%" web/src/style.css` → none; the only other 8 % in the view is a shadow alpha
(`EquationView.vue:400`).

### C-15 · MINOR · no `type="button"` — latent submit hazard on a prop the primitive explicitly exposes `[CONFIRMS]`
`button.d.ts` → `dist/components/ui/button` declares `type?: ButtonHTMLAttributes['type']`, and
`button-BNDWhAZb.js:26-29` forwards it verbatim to the `Primitive` (`as` default `"button"`, `:21`). Neither `<Button>`
passes it (`:10-19`, `:20-29`), so the element takes the HTML default `type="submit"`. *Falsifier that keeps this MINOR:*
`grep -rn "<form" web/src/components/` → **zero** app-wide, so no submit is reachable today. Latent contract gap, priced
accordingly.

### C-16 · MINOR · zero behavioural coverage — C-1, C-2 and C-6 are entirely unguarded `[CONFIRMS, sharpened]`
`package.json` `scripts` carries only `test:e2e` / `test:e2e:ui` — no unit runner, no vitest dependency. Across the 8
specs in `web/e2e/`, `grep -rn "sigma\|ModeToggle\|eq-toggle"` returns only unrelated `blur_sigma` payload fields
(`contour-extraction.spec.ts:67`, `visualization-crud.spec.ts:71`, `workspace-flow.spec.ts:78,118`). `/equation` appears
in **exactly one** spec — `e2e/visual-baseline.spec.ts:34` — as a **full-page screenshot capture** (`:48-58`) with
`animations: "disabled"`, no click and no assertion. The suite ships `@axe-core/playwright` (devDeps) and never points it
at this control. *Falsifier:* any assertion on the toggle. None exists.

---

## §4 — INFO

- **C-17 · INFO · zero value.js and zero keyframes.js consumption — this file is *off* the F.W2 blast radius.**
  `grep -rn "mkbabb/value" web/src` → the 5 statements the census records (CENSUS-2026-08-03.md:37-38, "easing-only"):
  `ConvergencePlot.vue:5`, `composables/useCurveTransition.ts:8`, `lib/harmonics.ts:5`, `lib/easings.ts:9,16` —
  **none here**. `grep -rn "mkbabb/keyframes"` → `stores/animation.ts:47` (a comment recording a removed import) and
  `composables/useFourierMorph.ts:14` — **none here**. A useful negative that **refines** the census: the F.W2 surface
  for `components/equation/` is those three files, and this one must not be swept in with them. See also S-4.
- **C-18 · INFO · a client-only view enum inside the wire-contract module.** `types.ts:22` places
  `EquationDisplayMode` between `ComputeEquationRequest` (`:14-22`) and `ComputeEquationResponse` (`:25-35`). It appears
  in no request or response body (`api/models/equations.py` read whole — 5 models, no display mode;
  `grep -rn "display_mode\|displayMode"` across `api/` and `web/src` → 0). So `:3` imports the API contract module to
  obtain purely local view state. This is the type-layer half of **R6-8**'s lesson: the leaf that decides *which arm to
  show* should not live inside the record that *carries both arms*.
- **C-19 · INFO · redundant emit on re-click.** `@click="model = 'sigma'"` (`:16`) fires unconditionally, so clicking
  the already-active segment re-emits `update:modelValue` with an identical value. Inert against the parent's plain
  `ref` (`EquationView.vue:43`), but the component cannot be relied on to emit only on change.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

### S-1 · the v-model contract is exactly right in form, and dodges a bug class this constellation has been bitten by `[CONFIRMS]`
`:5` is the whole script: `defineModel<EquationDisplayMode>({ required: true })`. No `props`/`emit` pair, **no local
mirror `ref`, no `watch`, no `modelValue` shadow**, and `required: true` forbids a silent `undefined` mount. Typed
against the shared union rather than a local `string`, so the parent's `ref<EquationDisplayMode>("sigma")`
(`EquationView.vue:43`) is the single compiler-checked source of truth. This is a directly-earned avoidance: value.js
project memory records a live hazard — *"`defineModel()` returns `WritableComputedRef` with async parent round-trip —
reads after writes return stale data"* — which forced `useColorModel` onto a synchronous cache ref. This component is
immune because it never reads the model except in two template equality comparisons and never writes-then-reads within a
tick. It also beats its own flagged sibling: `NotationPills.vue:7-12` hand-rolls `defineProps` + `defineEmits` + a manual
`emit` (`:26`) for the identical shape — 6 lines and a by-convention contract where this is 1 line and a checked one.
*(The **sufficiency** of that contract is C-1; form and arity are separate axes and both verdicts stand.)*
**Falsifier:** a `const local = ref(props.modelValue)` + `watch` pairing, or any `model.value` read in script. Neither
exists in the 80 lines.

### S-2 · the accent is consumed as a live CSS custom property, not through the repo's runtime token-shadow `[CONFIRMS]`
`:64` uses `color: var(--viz-amber)` directly. The alternative path is live in this very directory:
`web/src/lib/colors.ts` `cssVarToHex()` reads `getComputedStyle(document.documentElement)` once into a reactive
registry, and `composables/useCoeffHover.ts:59-65` is *forced* onto it (KaTeX cannot resolve CSS vars) at the documented
cost of a `STATIC.golden` fallback used "before paint". By staying in CSS, the toggle's active gold re-resolves on every
light↔dark flip with zero JS, needs no resolve-ordering guarantee, and has no first-paint fallback to go stale.
**Falsifier:** had it read `VIZ_COLORS.amber`, a `DarkModeToggle` flip (`layout/DarkModeToggle.vue:18`, `useGlobalDark`)
would strand the active segment in the previous theme's amber until re-resolve. It does not. *(Note the scope: this
praises the **mechanism**. The **value** it resolves to fails AA in the tinted active state — C-7. The prior pass fused
these two into one superlative; they separate.)*

### S-3 · the uncommitted one-line diff cures a class that does not exist — onto the *correct* rung `[NEW]`
`git diff` on this file is exactly one line: `class="eq-toggle glass-subtle"` → `class="eq-toggle glass-wash"`.
**`glass-subtle` exists nowhere**: `grep -rn "glass-subtle" node_modules/@mkbabb/glass-ui/dist/` → 0 hits;
`grep -rn "glass-subtle" web/src` → 0 hits. So at HEAD `cd26c653` the track carried a **dead class** and had *no glass
material at all* — no background, no backdrop-filter, no border, just a radius, a clip, and the (then genuinely dead)
border-color transition of C-11. The working-tree edit lands it on a real ladder rung (`ladder.css:36-42`) — and on the
**right** one: glass-ui's own note at `surfaces.css:168-172` describes `--glass-blur-wash` as *"a sub-perceptual
diffusion authored for a small detail TILE, not a button the user reads as glass"*, which is exactly what a 36 px pill
in a card corner is. The quieter rung was chosen over the louder one. **Land this diff.** *(It also retro-validates K-2:
the border-color transition became non-dead only because of this line.)*
**Falsifier:** dies if `glass-subtle` resolves anywhere in the app graph — both greps above are exhaustive over dist and
src — or if the wash rung were the wrong tier for a detail tile (`surfaces.css:168-172` says it is the right one).

### S-4 · a disciplined **abstention** from value.js and keyframes.js `[NEW framing of C-17]`
The component performs exactly one colour operation — `color-mix(in srgb, …)` at `:65` — in CSS, at zero runtime cost,
rather than importing anything from the pinned `@mkbabb/value.js@^0.13.0` migration surface; and its motion is two CSS
transitions rather than a keyframes engine. Both are the right call: value.js earns its place in this repo where there
is real runtime math (the four easing importers at C-17), and a static two-stop tint is not that. On the F.W2 axis this
is the cheapest component in the directory — **nothing to migrate.** Recorded explicitly because "consumes zero of the
pinned dependency" is a *finding*, and the wrong reading of an F.W2 sweep would be to add value.js here.
**Falsifier:** dies if the tint were dynamic, theme-derived, or interpolated. It is a literal 8 % of a token in a static
rule.

### S-5 · subpath import discipline, on the right side of the F.W2 target `[NEW]`
`:2` — `import { Button } from "@mkbabb/glass-ui/button";` — a bare specifier on a **tree-shakable subpath**, not the
package barrel. Of the 44 glass-ui import lines the corpus enumerates (`lane-frontend.md:236-283`), only two go through
the barrel (`ui/CollapsibleSection.vue:2`, `equation/EquationResult.vue:4`); this file is in the conforming 42. Small,
but it is the exact axis F.W2 measures, and it is clean. **Falsifier:** dies if `./button` were not a real export
subpath at 4.0.0 — the installed exports map lists
`"./button": { "types": "./dist/button.d.ts", "import": "./dist/button.js" }`.

---

## §6 — Candidates killed by their own falsifier (recorded so no lane re-raises them)

- **K-1 · "The hardcoded `"Fira Code"` and `"Computer Modern Serif"` families have no loaded `@font-face` — the app
  imports `@mkbabb/glass-ui/styles` (`style.css:3`) but never the separate `@mkbabb/glass-ui/styles/fonts` subpath where
  the OFL corpus lives (`dist/styles/index.css:5-8,24`), so both resolve by `local()` only, exactly the pathology
  `style.css:52-58` documents for KaTeX."** **FALSIFIED — and this pass reached it independently before checking.**
  fourier self-hosts its own faces outside the producer path: `web/public/fonts.css:14-40` declares four real
  url()-backed `@font-face` rules for `"Computer Modern Serif"` (including the **italic** face `cmunti.woff` that the Σ
  glyph at `:71` needs) and `:65-77` declares `"Fira Code"` (woff2, latin subset); `web/index.html:19` links
  `/fonts.css` and `:12-14` preloads the CM faces. The `600` weight at `:48` sits inside the declared range, so no
  synthetic bolding either. **Claim withdrawn in full.** The glass-ui `styles/fonts` subpath is genuinely unimported,
  but it is *redundant* here, not missing — which is a T-axis packaging observation, not a C-axis defect. What survives
  is the *drift* claim only, filed at MINOR as **C-12**.
- **K-2 · "`.eq-toggle { transition: border-color }` (`:38-39`) is dead — the track has no border."** **FALSIFIED.**
  `dist/styles/glass/ladder.css:36-42` gives `.glass-wash` `border: 1px solid var(--glass-border-wash)`, and `:9` opts
  in. Downgraded, not withdrawn: nothing in this file or in `EquationView.vue:426-429` changes `.eq-toggle`'s
  border-color on any interaction state, so the property is reachable only across a light↔dark token flip. Residue
  survives as **C-11** (bare `ease`, hardcoded `0.15s`). *Note:* this falsifier depends on the **uncommitted** line —
  at HEAD the class was `glass-subtle`, which does not exist (S-3), so the declaration **was** dead there.
- **K-3 · "`SegmentedTabs` cannot carry the Σ / `a + b` glyphs, so C-9's fold is not actionable."** **FALSIFIED.**
  `tabs.js:232-236` and `:252-256` render an `#option` scoped slot with `{ option, active }`, falling back to
  `option.label` only when the slot is unused. Custom glyph content is first-class. The fold is actionable at 4.0.0
  without an uplift.

---

## §7 — Verdict and carries

**DEFECTIVE on the consumption axis**, and the defect has one shape: the component **names three producer/API contracts
and then discards the substance of all three.** `variant="ghost"` contributes one colour before being overridden (C-5);
`size="sm"` contributes nothing, its height token replaced by that token's own unscaled constant (C-4); the vendor's
press spring is clobbered (C-3) and its focus ring clipped away (C-2) by the wrapper; the shipped `aria-pressed`
register goes unused while a bespoke `.is-active` re-implements a fraction of it *without* the accessibility (C-6) and
*below* the contrast the adjudicated token was darkened to guarantee (C-7); the tooltip primitive already mounted at the
root is bypassed for `title` (C-8); and the union it exists to switch is neither exhaustively consumed (C-10) nor
conditioned on whether the server can honour the chosen branch (C-1). The instrument of all of it is **[LAYER]** — 47
lines of unlayered scoped CSS that outrank everything the design system ships.

The right discharge is not a patch list. **C-9's fold onto `SegmentedTabs` structurally dissolves C-2, C-3, C-4, C-5,
C-6, C-8, C-10, C-11, C-13, C-14 and C-15 at once** — every one of them exists because a track and two buttons were
hand-assembled where a primitive was already imported 82 lines above. That leaves exactly two rows that a fold does not
touch, and they are the two blockers' true owners: **C-1**, which must be fixed at the *contract* (`SimplifyResponse`
gains `latex_sigma`, or the mode control gains an availability input — and per C-9 the primitive already accepts the
latter), and **C-7**, which must be fixed at the *token* (re-derive the D.W4.d carry against the tinted active surface,
or drop the tint and let `aria-pressed` supply the plate).

Both blockers are ship-blocking on their own terms: C-1 renders a materially wrong equation in the pane's **default**
state, and C-2 removes keyboard focus visibility from the pane's only overlay control.

**Carries proposed.**

| rows | target | note |
|---|---|---|
| **C-1**, C-18 | **F.W5** | the operation↔client seam, filed alongside **R6-8** as its second independent instance — a *partial-projection* operation cohort |
| **C-7** | **F.W3** (a11y) + a token amendment to `style.css:113-122` | the D.W4.d carry is mis-based for any tinted surface; ≈3.94:1 derived |
| C-2, C-4, C-6, C-8, C-16 | **F.W3** (a11y) | C-8 also **+2** to R3-7a's 35-callsite Tooltip budget |
| C-3, C-5, C-9, C-10, C-11, C-12, C-13, C-14, C-15 | the fourier control-pane composition wave (M.W8 successor) | discharge as **one** `SegmentedTabs` fold, not eleven patches |
| **C-9 corpus amendment** | `formation/fourier/lane-frontend.md:137` + §4 🟡 table | SHADOW grading inverted against `NotationPills`; §4 aggregate → 10 / ~2 070 |
| **S-3** | immediate | land the uncommitted `glass-subtle` → `glass-wash` line; it cures a dead class at HEAD |
| C-17 / S-4 | census amendment | this file is **off** the F.W2 surface — do not sweep it with the four easing importers |
