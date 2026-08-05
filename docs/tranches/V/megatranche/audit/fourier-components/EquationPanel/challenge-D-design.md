claude-opus-5[1m] (served model id)

# CHALLENGE — `EquationPanel.vue` · axis **D (DESIGN)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/EquationPanel.vue` (134 lines)
**Substrate.** fourier HEAD `cd26c65` (the tree the intake lane pinned as *not* stale — `lane-fourier-r3-r6.md` §0).
**Method.** Static + source-derived only. No browser. Read whole: the SFC, its 5 first-party imports
(`SliderControl.vue`, `NotationPills.vue`, `lib/equation/api.ts`, `lib/equation/notation.ts`,
`lib/equation/types.ts`), its host (`VisualizationView.vue`), the app entry (`web/src/style.css`),
the **installed** `@mkbabb/glass-ui@4.0.0` dist (components + token CSS), the **producer**
`@mkbabb/glass-ui@7.0.0` source + `CHANGELOG.md`/`MIGRATION.md`, and the Python renderer the panel
displays (`src/fourier_analysis/symbolic/latex_rendering.py`, `.../simplification.py`).
**Posture.** Assumed DEFECTIVE until proved otherwise. Every row carries severity, `file:line`, and
its own falsifier. Superlatives carry falsifiers too (L-18 runs both ways).

**Tally.** 21 defects (3 BLOCKER · 11 MAJOR · 6 MINOR · 1 INFO) · 6 superlatives.

**Corpus fold.** This lane consumes rather than re-derives:
- `formation/fourier/lane-frontend.md:315-316, :472` — the two glass-ui import sites and the
  `./metric-badge` break row. **Corrected** per CENSUS §2 **C-4**: that row's "7 imports / 6 files"
  is **7 files**; `EquationPanel.vue:12` is one of the seven.
- `CENSUS-2026-08-03.md:65` — same C-4 correction; §3a "the deepest, cleanest glass consumer in the
  constellation". This lane **contradicts the generalization for this file**: EquationPanel is the
  place where the glass ladder is overridden by hand (D-4) and where the ladder-conformant sibling
  (`BasisSelector.vue`) is not followed (D-2).
- `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` — **R3-7a** (35 Tooltip callsites / 9
  consumers, CARRY→F.W3) is the reason D-19's "no tooltip on the close X" is *not* filed as a defect:
  the `aria-label` is the better choice and R3-7a's migration budget does not want a 36th callsite.
  **R5-7 / R6-5** (native-element loops are invisible to callsite-keyed derivation) applies to this
  subtree only through `NotationPills.vue:18` — that `v-for` is on a **component** (`<Button>`), so it
  *is* registered and the R5-7 blind spot does not bite here. Recorded so F.W4 need not re-check.

---

## §0 — What the component is

An absolutely-positioned overlay on the Fourier canvas. Header row (title · energy badge · close X),
a control band (notation pills + a "Terms" slider), and a KaTeX display block. Every control edit
re-POSTs `/api/equations/simplify` through a 300 ms debounce and swaps the rendered equation.

Three surfaces are glass-ui: `Button` (×1 here, ×3 via `NotationPills`), `MetricBadge` (×1),
`Slider` (×1 via `SliderControl`). One surface is a hand-rolled dialog (the panel itself).

---

## §1 — BLOCKERS

### D-1 · BLOCKER · The panel is positioned into the dock that opens it — always on touch, and by 4 px even on desktop

`EquationPanel.vue:121` pins `top: 3.5rem`. The dock it must clear is
`VisualizationView.vue:450-453` — `.controls-dock-anchor { position: absolute; top: 0.5rem; … }` —
so the panel has budgeted exactly **3.0rem** of dock height. Resolve that height from tokens:

| token | file:line | fine pointer | coarse pointer |
|---|---|---:|---:|
| `--ui-scale` | `glass-ui/dist/styles/tokens/offsets-sizing.css:136` / `tokens/light-dark.css:17-19` | `1` | `var(--ui-coarse-scale, 1.5)` = **1.5** |
| `--dock-scale` = `calc(--ui-scale × --dock-local-scale)` | `tokens/offsets-sizing.css:264` | 1 | 1.5 |
| `--dock-control-size` = `max(2.5rem × --dock-scale, --dock-control-floor)` (comfortable = **the GlassDock default**, per the comment at `dock/density.css:80-81`) | `dock/density.css:89-95` | **2.5rem** | **3.75rem** |
| shell padding-block, ×2 | `dock/shell.css:116` (`0.375rem × --dock-scale`) | 0.75rem | 1.125rem |
| **dock outer height** | — | **3.25rem** | **4.875rem** |
| **dock bottom edge** (`+0.5rem` anchor) | — | **3.75rem** | **5.375rem** |

The panel's top edge sits at 3.5rem. So it begins **0.25rem (4 px) inside the dock on a fine
pointer** and **1.875rem (30 px) inside it on any coarse pointer** — i.e. on every phone and tablet.
Horizontally the collision is total on mobile: under 1024 px the panel is
`max-width: min(28rem, calc(100% - 1rem))` (`:123`) — effectively full-bleed — while the dock is
either `right: 0.5rem` or, when expanded, `left: 50%; translateX(-50%)`
(`VisualizationView.vue:461-465`), i.e. directly over the panel's span.

And the panel **wins the paint**: both carry `z-index: var(--z-controls)` (= `20`,
`glass-ui/dist/styles/tokens/scheme-motion.css:336`) — `EquationPanel.vue:120` and
`VisualizationView.vue:453` — a tie broken by DOM order, and the panel is declared *after* the dock
(`VisualizationView.vue:231` vs `:210`). The overlay therefore covers the `CanvasControlsDock`
equation toggle that spawned it (`CanvasControlsDock.vue:41` `<GlassDock fit-content start-collapsed>`;
the toggle is a `DockIconButton`), so the user cannot see or reach the control that closes it from
the dock side.

Root cause: `3.5rem` is a magic constant that privately duplicates knowledge of a token chain living
in another package. `--dock-control-size` is `--ui-scale`-responsive by design; the panel's offset is
not, and nothing links them.

> **Falsifier.** (a) A fourier-local override of `--ui-coarse-scale`/`--ui-scale`/`--dock-local-scale`
> below 1 would rescue the coarse arm — `grep -rn "ui-scale\|ui-coarse-scale\|control-floor" web/src/`
> returns **empty**, so no such override exists. (b) `density="compact"` on the dock would drop the
> control to `2rem × 1.5 = 3rem` (still ≥ the 3.0rem budget, so the coarse arm survives anyway) —
> `grep -n "density" web/src/components/visualization/CanvasControlsDock.vue` returns **empty**;
> the dock takes the comfortable default. (c) A live measure of the *collapsed* `<GlassDock>` under
> 3.0rem at `--ui-scale: 1.5` would kill the coarse arm — the control token alone is 3.75rem, so this
> requires the collapsed dock to render no control at all. (d) The **fine-pointer 0.25 rem** arm is
> the weakest link (it assumes height = control + padding with no additional layer/track box) —
> mark that sub-claim **UNPROVEN-NEEDS-LIVE for SS-13**; the coarse arm needs no live measure.

### D-2 · BLOCKER · The active notation is signalled by colour alone, and the component's own docstring names the missing attribute

`NotationPills.vue:23-24` marks the selected pill with a class + a CSS custom property:

```
:class="{ 'notation-active': modelValue === opt.value }"
:style="modelValue === opt.value ? { '--pill-color': opt.color } : {}"
```

`.notation-active` (`:42-46`) then changes only `background`, `border-color`, `color`. There is **no
`aria-pressed`**, no `role="radiogroup"`/`role="group"`, no `aria-current`, no non-colour mark
(weight, glyph, underline). Assistive tech reads three identical unlabelled buttons; a user with a
colour deficit reads three near-identical 12 %-tint pills. WCAG 1.4.1 (Use of Color) and 4.1.2
(Name, Role, Value) both fail.

This is not an oversight the tree tolerates elsewhere — it is a **stated contract violation**. The
options table's own docstring, `lib/equation/notation.ts:3-8`, says:

> "Notation pill definitions … matching the `.basis-toggle` pattern from BasisSelector (glass-ui
> `<Button variant="outline" size="sm">` with **`aria-pressed` driving an instance-scoped tint**)."

And `BasisSelector.vue` actually does it: `:144` `:aria-pressed="isBasisActive(key as string)"`, with
the tint keyed off the attribute at `:269` `.basis-toggle[aria-pressed="true"] { … }` and the
rationale spelled out at `:249-257`. NotationPills copied the pills and dropped the semantics that
made them work.

Compounding it: all three tints are fixed `hsl()` literals with no dark arm
(`notation.ts:15-17`). Computed against the shipped surfaces
(`--background` light = `hsl(40 30% 98%)`, `tokens/color-radius.css:40,57`; dark = `hsl(24 9% 4%)`,
`tokens/dark-arm.css:42`):

| pill | value | light | dark |
|---|---|---:|---:|
| Trig `hsl(6 72% 49%)` | `notation.ts:15` | 4.36:1 ✅ | **4.16:1 ✗** |
| Exp `hsl(224 58% 46%)` | `notation.ts:16` | 6.34:1 ✅ | **2.97:1 ✗** (fails even the 3:1 non-text floor) |
| Polar `hsl(286 46% 47%)` | `notation.ts:17` | 5.47:1 ✅ | **3.44:1 ✗** |

So in dark mode the *only* signal of the current notation is text that fails AA — colour-only
signalling whose colour is also illegible.

> **Falsifier.** A `light-dark()` arm, a `.dark` override, or an `aria-pressed` binding anywhere in
> the chain would kill this: `grep -n "aria-pressed" web/src/components/equation/*.vue` → **empty**;
> `grep -rn "pill-color" web/src/` → only `NotationPills.vue:24,43,44,46`. Contrast figures are
> WCAG-2 relative-luminance against the raw `--background` token; the pill sits on a 12 %-alpha tint
> of its own hue over that background, which moves the ratio by well under 0.2 — not enough to cross
> 4.5:1 for the two dark-mode failures. A live sampler disagreeing by >0.3 would be worth hearing:
> mark the exact ratios **UNPROVEN-NEEDS-LIVE for SS-13**; the *ordering* (all three pass light, blue
> and purple fail dark) is token-decidable and stands.

### D-3 · BLOCKER · The panel's headline readout — the energy badge — fails AA in light mode in all three of its states

`EquationPanel.vue:77-82` paints the energy figure with `:color="eColor"`, and `eColor`
(`:38` → `notation.ts:44-48`) is a three-stop step function of fixed `hsl()` literals with no dark
arm and no token backing. Against the light page surface `--background: hsl(40 30% 98%)`
(`tokens/color-radius.css:40,57`):

| state | colour | `notation.ts` | contrast (light) | AA 4.5:1 |
|---|---|---|---:|---|
| ≥99 % energy — **the default and by far the most common state** | `hsl(142 71% 45%)` | `:45` | **2.19:1** | ✗ |
| ≥95 % | `hsl(38 92% 50%)` | `:46` | **2.03:1** | ✗ |
| <95 % | `hsl(0 84% 60%)` | `:47` | **3.60:1** | ✗ |

The text is small: `MetricBadge size="sm"` resolves the amount to `text-mono-micro`
(`glass-ui/dist/MetricBadge-BpC0R_Ec.js`, the `sm` arm of the amount-class computed) — nowhere near
the 18.66 px/bold threshold that would let 3:1 apply. All three fail, and the *green* one — the state
the panel sits in whenever the series has converged — fails worst but one.

This repo already adjudicated exactly this class of defect and shipped the cure: `web/src/style.css:113-127`
darkens glass-ui's light `--viz-amber` from ≈3.54:1 to ≈4.6:1 with a preserved dark arm, filed as a
"D.W4.d axe contrast carry". The precedent proves the project treats sub-AA viz colour as a defect;
`energyColor` is the same defect, unfixed, on a more prominent element.

> **Falsifier.** A `.dark`/`light-dark()` arm for these three literals, or a token indirection, would
> change the verdict — `grep -n "energyColor" web/src/` → defined `notation.ts:44`, consumed
> `EquationPanel.vue:6,38` and nowhere else; the literals are unconditioned. The badge plate is
> `--glass-bg-quiet` = `color-mix(… var(--card) …, transparent)` (`tokens/glass.css:138`), a
> translucent wash of the *light* card in light mode, so the effective background is at worst a hair
> darker than `--background` — not the ~2× luminance drop that would rescue 2.03:1. Exact ratios
> **UNPROVEN-NEEDS-LIVE for SS-13**; the ✗ column is not in doubt.

---

## §2 — MAJOR

### D-4 · MAJOR · The scoped `box-shadow` deletes the glass material rim it asked for, and the panel is on the wrong ladder rung

`EquationPanel.vue:70` opts into `glass-wash`; `:124` then declares
`box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);` on the **same element**.

`.glass-wash` ships `box-shadow: var(--glass-material-rim), var(--glass-shadow-wash);`
(`glass-ui/dist/styles/glass/ladder.css:36,41`) inside `@layer components` (`:6`). A Vue scoped rule
is emitted **unlayered**, and unlayered origin beats every `@layer` — so `.eq-panel[data-v-…]`
replaces the whole stack. Destroyed: `--glass-material-rim`
(`0 0 0 0.5px color-mix(… --shadow-color 5% …)`, `tokens/shadow.css:82`) — the hairline that makes
the plate read as a material edge — and `--glass-highlight`, carried inside
`--glass-shadow-wash: var(--shadow-sm), var(--glass-highlight)` (`tokens/glass.css:422`), the inset
catch-light that is what distinguishes glass from a translucent rectangle. The component asks for
glass and then removes the two declarations that make it glass.

Worse, the replacement value is a near-copy of `--glass-under-shadow-default`
(`0 4px 16px -2px α0.08`) — a rung `.glass-wash` **deliberately** does not compose. `ladder.css:53`
states the design: "`.glass-wash` is sub-perceptual … neither composes an under-shadow rung." The
author wanted lift; the correct expression is `.glass-quiet` (which composes
`--glass-under-shadow-quiet`, `ladder.css:56-65`) or `.glass-resting`, not `glass-wash` plus a
hand-rolled shadow that clobbers the rim. A raw `rgba(0,0,0,0.08)` is also invisible over the dark
page surface (`hsl(24 9% 4%)`), so dark mode loses the panel's separation from the canvas entirely.

> **Falsifier.** If Vue emitted scoped styles into `@layer components` *after* the glass ladder, both
> rules would still collide with the scoped one winning (2 selectors vs 1) — the outcome is the same
> under either layering assumption, which is why this is filed as proven-by-source rather than
> live-dependent. If `--glass-material-rim` resolved to `none` the loss would be moot: it does not
> (`tokens/shadow.css:82`).

### D-5 · MAJOR · The Escape handler is unreachable, and closing the panel drops focus on the floor

`EquationPanel.vue:71-72` is the hand-rolled dialog half-idiom: `tabindex="-1"` plus
`@keydown.esc="emit('close')"`. Nothing ever focuses the element. The panel is mounted by
`VisualizationView.vue:231` behind a `v-if` with no `ref`, no `nextTick(...focus())`, no autofocus
directive (`grep -n "focus()" web/src/components/visualization/VisualizationView.vue` →
**empty**). A user who opens the panel from the dock button keeps focus on the dock button, so the
`keydown` never reaches the panel and **Escape does nothing**. Symmetrically, `@close` unmounts the
element; if focus *had* been inside it, focus falls to `<body>` with no return to the trigger.

Both halves are solved elsewhere in this repo, with comments that read as the house rule:
- `MobileFloatingToc.vue:43-51` — "**Also move focus into the dropdown on open so the `@keydown.esc`
  handler receives the key event** (A4 MED a11y discharge)", implemented as
  `watch(open, … nextTick(() => dropdownRef.value?.focus()))`; and `:36-40` `dismissDropdown()`
  returning focus to the trigger.
- `GalleryCardModal.vue:31-35` — "`<Dialog>` brings `role="dialog"` + focus-trap + Escape-close +
  return-focus **for free** — the previous hand-rolled Teleport + Transition + Escape listener
  retires." EquationPanel *is* that retired pattern, minus even the focus call.

> **Falsifier.** Any focus call in the chain kills this. `grep -rn "focus()" ` over
> `EquationPanel.vue`, `VisualizationView.vue`, `CanvasControlsDock.vue` → **empty**. A `keydown`
> listener bound at document level would also rescue it: `grep -rn "keydown.esc\|Escape"
> web/src/components/` shows the only handler for this panel is the element-scoped one at
> `EquationPanel.vue:72`.

### D-6 · MAJOR · The panel has no accessible name, no role, and no heading

The root (`:69-73`) is a bare `<div class="eq-panel glass-wash" tabindex="-1">`: no `role="dialog"`,
no `role="region"`, no `aria-label`/`aria-labelledby`, no `aria-modal`. Its title,
`<span class="text-sm font-medium text-foreground">Equation</span>` (`:75`), is a **span** — not
`<h2>`/`<h3>`, and not referenced by anything. So the panel is not addressable by landmark or heading
navigation, and the only element with an accessible name inside the header is the close button.
`GalleryCardModal.vue:31-33` again names the free fix (`role="dialog"` from `<Dialog>`).

Design consequence, not only a11y: the title is styled as a heading (`font-medium`, `text-foreground`
against the muted body) while carrying none of a heading's structure — the typographic promise and
the document promise disagree.

> **Falsifier.** An `aria-*` or `role` attribute anywhere on the root — `grep -n "role=\|aria-"
> web/src/components/visualization/EquationPanel.vue` returns exactly one hit,
> `:87 aria-label="Close equation panel"`, on the button.

### D-7 · MAJOR · The densest element on the panel is unlabelled

`:77-82` renders `(energy * 100).toFixed(1)` with `unit="%"` and nothing else. The user sees
`99.7 %` floating beside the word "Equation" with no indication that it is *energy captured by the
truncated series* — the one number that tells them whether the displayed approximation is any good.
There is no label, no abbreviation, no tooltip, no `title`.

The affordance exists and is unused: the installed `MetricBadge` accepts `label`, `abbreviation`, and
`labelPosition` and renders them in an uppercase muted register
(`glass-ui/dist/MetricBadge-BpC0R_Ec.js`, props block + the `metric-badge__label` spans); the
label-bearing layouts are already styled at
`glass-ui/dist/styles/utilities/components.css:81-95` (`.metric-badge--label-inline` /
`--label-stacked`). `abbreviation="E"` or `label="Energy"` is a one-attribute fix. The sibling
`InfoCard.vue` (lane-frontend §4) reaches for the same component and also hosts it in a bespoke div.

> **Falsifier.** A `title`/`aria-label` on the badge, or an adjacent caption, would supply the
> meaning — neither exists (`:77-82` is the complete element; the only sibling is the close Button).

### D-8 · MAJOR · The loading state destroys the content, collapses the panel, announces nothing, and **freezes** under reduced motion

`:106-112`:

```
<div v-if="loading" class="flex justify-center py-3">
    <div class="h-4 w-4 animate-spin rounded-full border-[1.5px] border-border border-t-primary" />
</div>
<div v-else-if="error" …>
<div v-else v-html="renderedHtml" class="eq-katex" />
```

Four faults in one block:

1. **Content destruction.** `loading` gates the equation out of the DOM, so every debounce cycle —
   every notation tap, every slider step — blanks the equation and re-mounts it. The equation is the
   subject of the panel; it should persist and dim, not vanish.
2. **Height collapse.** The container is `max-h-32` with no `min-h` (`:106`), so the panel's own
   height snaps from the equation's height down to `py-3 + 1rem` ≈ 2.5rem and back, once per fetch.
   Absolute positioning spares the page a reflow; it does not spare the user the flicker.
3. **Silence.** No `role="status"`, no `aria-live`, no `aria-busy` anywhere on the panel. A screen
   reader is told nothing on entry into loading and nothing on exit; the content simply changes.
4. **The reduced-motion failure — the sharp one.** glass-ui's global rule
   (`dist/styles/utilities/a11y-overrides.css:6-9`) sets
   `*:not([data-allow-motion]) { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }`.
   That *is* the correct global policy, and it means `animate-spin` is properly gated — **but here it
   converts the only loading cue into a static three-quarter arc**. Under
   `prefers-reduced-motion: reduce` the panel's entire loading vocabulary is a frozen 16 px circle
   segment, indistinguishable from a decorative dot. A spinner is the one loading affordance that has
   no reduced-motion fallback; text, a skeleton, or `aria-busy` do.

The 7.0.0 uplift hands this over as a solved problem: `Metric` sets
`:aria-busy="reading.loading"` + `data-loading` (`glass-ui/src/components/metric/Metric.vue:23,26`)
and paints a non-animated tinted skeleton over the value
(`metric/styles.css:81-88`) — a reduced-motion-safe busy state, for one prop.

> **Falsifier.** A `[data-allow-motion]` attribute on the spinner would exempt it from the freeze —
> but `a11y-overrides.css:26-30` re-applies the kill to `[data-allow-motion]` explicitly ("accessibility
> is absolute"), so no exemption is reachable. A `min-height` on `:106` would kill fault 2 — the class
> list is `max-h-32 overflow-x-auto overflow-y-auto` with an inline `scrollbar-width`, no min. A
> `role="status"` anywhere would kill fault 3 — `grep -n "role=" EquationPanel.vue` → empty.

### D-9 · MAJOR · ~300 ms of empty void on every open, with no skeleton

`loading` is initialised **false** (`:22`) and the fetch is wrapped in
`watchDebounced(…, { debounce: 300, immediate: true })` (`:61-65`). `watchDebounced` routes the
callback — including the `immediate` invocation — through the debounce filter, so the first
`fetchSimplified()` fires ~300 ms after mount. Between mount and that call, `loading === false`,
`error === null`, `latex === ""` ⇒ `renderedHtml === ""` (`:26`) ⇒ the third branch (`:111`) renders
an **empty div**. The user opens the panel and gets a header, controls, and a blank rectangle for a
third of a second, then a spinner, then content: three states to reach one.

> **Falsifier.** `loading = ref(true)` at `:22`, or `{ immediate: true }` bypassing the filter, would
> kill this. The source reads `const loading = ref(false)`; `watchDebounced` is vueuse's
> `watchWithFilter(debounceFilter)` — the immediate call is filtered. A live capture of the first
> paint would settle the exact duration: mark the **300 ms figure** UNPROVEN-NEEDS-LIVE for SS-13; the
> *existence* of the empty-branch state is proven by `:22`, `:26`, `:111`.

### D-10 · MAJOR · The "Terms" slider spans 2–20; the renderer it drives hard-caps at **4**

`:97-103` gives the budget a range of `min=2 max=20 step=1` — 19 positions. Every position POSTs
`/api/equations/simplify` (`:45-49` → `lib/equation/api.ts:33-55`). But every renderer on the far end
truncates the *display* at four terms:

- trig — `latex_rendering.py:32` `max_terms = 4`, then `:53-55` `if term_count >= max_terms: parts.append(r"\cdots"); break`
- exponential — `:103-106` `if shown >= 4: parts.append(r"\cdots"); break`
- polar — the identical `shown >= 4` break in `render_polar` (same file, following block)

So slider positions 5…20 — **16 of 19** — produce a byte-identical equation ending in `\cdots`. Each
still costs a debounced round-trip and each still runs the D-8 blank-and-restore cycle. The only thing
that keeps moving is the energy badge, which is *not* what the control is labelled.

That mislabelling is the design defect proper: "Terms" (`:98`) names the visible quantity, but the
control governs the **energy budget** (`simplification.py:135-136` — `simplify_series` computes the
energy fraction from `truncate_by_budget`, and `render_latex` receives the same budget only to ignore
it past 4). A control whose name describes an effect it stops having after 20 % of its travel is not
a proportion the reader can learn.

> **Falsifier.** A `compact=False` path, or a `budget`-aware `max_terms`, would rescue it —
> `render_latex` (`:272-282`) passes `compact=True` unconditionally and never forwards `budget` to the
> renderer at all (`renderer(terms, variable, compact=compact)`, `:281`). A different endpoint would
> too: `api.ts:51` posts `/api/equations/simplify`, routed at `api/routers/equations.py:134-162` into
> `simplify_numerical_coefficients` → `simplify_series` → `render_latex`. Chain closed.

### D-11 · MAJOR · The error state is the least legible, least actionable, and most developer-flavoured surface on the panel

`:110` — `<div class="text-sm text-red-400 fira-code">{{ error }}</div>`. Four problems:

1. **Contrast.** Tailwind v4 `red-400` (`oklch(0.704 0.191 22.216)`, `tailwindcss@^4.3.1`,
   `web/package.json:38`) reads ≈**2.75:1** against `--background: hsl(40 30% 98%)` — normal-size text,
   AA needs 4.5:1. The correct token is one word away and passes: `--destructive: hsl(0 72% 50%)`
   (`tokens/color-radius.css:100`) measures **4.65:1**. The error message is the one string the user
   *must* read and it is the hardest to read.
2. **Register.** `fira-code` (`glass-ui/dist/styles/typography/utilities.css:69`) sets the message in
   the monospace face reserved elsewhere in this app for numeric input and code — a user-facing failure
   rendered as console output.
3. **Prose.** `:54` — `error.value = e instanceof Error ? e.message : "Failed"`. The fallback is a
   one-word non-sentence; the primary path surfaces a raw exception string ("Failed to fetch",
   an HTTP status, a JSON parse message) verbatim to an end user.
4. **No recovery.** There is no retry control and no automatic re-attempt: the watcher fires only on
   `[epicycleData, budget, notation]` changes (`:62`), so a transient network failure leaves the panel
   stuck on the error until the user happens to move a control.

> **Falsifier.** `text-destructive` or a `--destructive`-derived class would kill (1) —
> `grep -rn "text-destructive" web/src/` returns **empty**; the whole repo uses raw `red-*`
> (`EquationView.vue:244`, `AdminFlaggedPanel.vue:172,176,191`, `AdminUserList.vue:376,411`), so this
> is an inherited house idiom, which makes it a **wave-level** carry rather than a file-local slip —
> but the admin surfaces are dark-only and this panel is theme-dual, so the light-mode failure is
> specific to it. A retry button anywhere in `:106-112` would kill (4) — the block is three divs.

### D-12 · MAJOR · No empty state, and the guard leaves a stale equation on screen

`:41` — `if (!store.epicycleData?.components.length) return;` — returns **before** touching
`latex`, `error`, or `loading`. Two consequences:

- **Stale content.** `store.epicycleData` is a `shallowRef` reassigned wholesale
  (`stores/workspace.ts:44,171,299,418`), so the watcher fires on identity change. If the new value
  carries `components: []` (a cleared or degenerate contour), the guard returns and the panel keeps
  rendering the **previous shape's equation** and the previous energy figure. The panel then lies
  about which curve it describes.
- **A void, not an empty state.** With `latex === ""`, `renderedHtml` returns `""` (`:26`) and `:111`
  renders `<div class="eq-katex"></div>`. The panel shows a title, a badge reading `100.0 %` (the
  `energy` initial value, `:21`), two live controls, and nothing else. No "no data yet", no dimming,
  no disabled controls.

The initial `energy = ref(1)` (`:21`) makes the second case actively misleading: an empty panel
claims 100 % energy capture before any series has been fetched.

> **Falsifier.** The parent gates on `store.epicycleData` truthiness (`VisualizationView.vue:231`) but
> **not** on `components.length` — so the zero-component case reaches the panel. Whether a live session
> can produce `components: []` while `epicycleData` is non-null is **UNPROVEN-NEEDS-LIVE for SS-13**;
> the guard at `:41` exists precisely because the author expected it, and the stale-state consequence
> is proven by source regardless of frequency. Clearing `latex`/`error` in the guard would kill both.

### D-13 · MAJOR (UPLIFT) · Both `Button` props used here are DEFINITION-ABSENT at glass-ui 7.0.0

Installed 4.0.0 exposes `buttonVariants` with a `variant` axis
(`default|solid|primary-audacious|gold-audacious|destructive|outline|secondary|accent|ghost|glass|glass-wash|ai|link`)
and a `size` axis including `icon`/`icon-sm`
(`glass-ui/dist/components/ui/button/index.d.ts:3-6`). Producer 7.0.0 replaces the axis entirely
(`glass-ui/src/components/button/Button.vue:15-31`):

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis; tone?: Tone; size?: ButtonSize; iconOnly?: boolean; loading?: boolean; …
}
```

`variant` is gone; `ButtonVariants` is a member-level removal
(`glass-ui/CHANGELOG.md:71-72` — "`/button`: `ButtonVariants` → `ButtonProps` / `ButtonEmphasis` /
`ButtonSize`"). Break sites in this subtree:

| site | today | 7.0.0 |
|---|---|---|
| `EquationPanel.vue:84` | `variant="ghost"` | → `emphasis="quiet"` (or `"text"`) |
| `EquationPanel.vue:85` | `size="icon"` | **not in `ButtonSize`** → `iconOnly` + a real `size` |
| `NotationPills.vue:19` | `variant="outline"` | → `emphasis="secondary"` |

Two second-order design effects the F.W1 uplift must plan for, not just typecheck:

- **The coarse-pointer touch floor is keyed to the retired value.** `a11y-overrides.css:116-123`
  floors `[data-size="icon"]` at `--touch-target` (2.75rem) on coarse pointers, and the installed
  Button reflects `data-size` from the prop (`dist/button-BNDWhAZb.js`, `"data-size": r.size`). Once
  `size="icon"` becomes `iconOnly`, `data-size` will read `md` and the panel's close X — explicitly
  shrunk to `h-6 w-6` = 24 px at `:86` — **loses its 44 px coarse-pointer floor** unless the uplift
  re-homes the rule or drops the size override. This is the single highest-risk line in the migration
  for this file.
- `Button` gains `loading` at 7.0.0 (`Button.vue:28`), which is a better home for D-8's in-flight
  state than a bespoke spinner.

> **Falsifier.** A compat alias would void this — `CHANGELOG.md:19-40` states 11 keys removed / 3
> added with "no aliases or compatibility barrels" (echoed for metric at `MIGRATION.md:2481-2483`),
> and the 7.0.0 `button/index.ts` exports only `Button`, `ButtonProps`, `ButtonEmphasis`, `ButtonSize`.

### D-14 · MAJOR (UPLIFT) · `MetricBadge` → `Metric` drops the `color` prop with no successor, and drops the pill plate the header composition depends on

`EquationPanel.vue:12` is one of the seven `./metric-badge` sites (lane-frontend `:472`; CENSUS §2
**C-4** correcting "6 files" → **7 files**). `./metric-badge` is removed at 7.0.0 and consolidated into
`./metric` (`CHANGELOG.md:25`). The successor's prop surface
(`glass-ui/src/components/metric/types.ts:8-24`) is:

```ts
export interface MetricValueProps { value?; unit?; placeholder?; loading?; }
interface MetricTextProps extends MetricValueProps { label?; context?; class?; }
export interface MetricProps extends MetricTextProps { size?; orientation?; }
```

**There is no `color`.** `MIGRATION.md:2489-2493` makes it policy, not oversight: "Consumers keep
phase color, animation, result state, and layout composition locally." So `:81 :color="eColor"` has
no successor prop — the entire energy tricolour must be re-homed into a fourier-local rule (which is
also the moment to fix D-3 rather than port it).

The visual break is larger than the prop break. Installed `MetricBadge` is a **glass pill**:
`components.css:7-40` gives it a border, `--glass-bg-quiet` background, `backdrop-filter`, radius, and
shadow. Producer `Metric` is a bare `inline-grid` with `color: var(--foreground)` and no surface at all
(`glass-ui/src/components/metric/styles.css:1-12`). In this panel the pill is the only thing giving the
energy figure a container inside a `flex items-center justify-between` header (`:74-93`); after the
uplift the number becomes loose text abutting the close button. The F.W1 plan must either compose
`./chip` (added at 5.0.0, `CHANGELOG.md:36`) around it or accept a flatter header — a design decision,
not a rename.

**What the uplift *improves* here** (the census asks for both directions):

- The installed badge bakes `cursor-pointer` into its root class
  (`dist/MetricBadge-BpC0R_Ec.js`, `cn("metric-badge cursor-pointer", …)`), plus a hover lift
  (`components.css:50-56`, `scale: 1.02`) and a press squish (`:59-60`, `scale: 0.96`), plus a
  `focus-visible:outline-2` ring on an element with no `tabindex`. The energy badge is a **static
  readout**: it advertises a pointer cursor, animates under hover, animates under press, and carries a
  focus ring that can never be shown. That is a false affordance today — a MAJOR in its own right —
  and 7.0.0's `Metric` cures it by construction (no cursor, no hover, no press, no ring).
- `Metric` adds `loading` → `aria-busy` + a static skeleton (`Metric.vue:23,26`,
  `styles.css:81-88`), which is the reduced-motion-safe answer to D-8.

> **Falsifier.** A `color` prop or a documented colour token on `/metric` would void the first half —
> `types.ts` is quoted in full above and `styles.css:45-53` hard-sets `.metric__value` typography with
> `color` inherited from `:where(.metric, …) { color: var(--foreground) }` (`:1-5`), overridable only
> by consumer CSS. A surface variant on `Metric` would void the second — `MetricProps` has `size` and
> `orientation` only.

---

## §3 — MINOR

### D-15 · MINOR · Hard-coded geometry, and a padding:gap ratio too small to read as an enclosure

`:119` — `@apply … gap-2 p-2.5 rounded-xl` — gives 10 px padding, 8 px band gaps, 12 px radius, with
`gap-1.5` (6 px) inside the control band (`:95`). The outer padding exceeds the largest inner gap by
only **1.25×**, so the panel's frame reads as one more gap in the stack rather than as the boundary
containing it; the classical figure would put the enclosing margin at ≥1.5× the internal rhythm.
Separately, `rounded-xl` and the raw `rgba()` shadow (`:124`) bypass the shipped
`--radius-*` / `--glass-*` token families the rest of the surface consumes — the panel is the only
element in its own composition not expressed in the system's units.

> **Falsifier.** This is the one row in the file that is partly a judgement of proportion rather than a
> measurement, and it is filed MINOR for that reason. The *token bypass* half is objective (`:119`
> `rounded-xl`, `:124` literal rgba, vs `--radius-panel`/`--glass-shadow-*`); the *ratio* half is
> falsified by any house rule setting padding ≈ gap deliberately — none is stated in
> `web/src/style.css` or the glass-ui idiom docs I can reach.

### D-16 · MINOR · Two typographic scales in one header

`:75` sets the title in Tailwind's absolute `text-sm` (0.875 rem). The badge beside it resolves to
glass-ui's semantic `text-mono-micro` / `text-micro` register
(`dist/MetricBadge-BpC0R_Ec.js`, the size→class computed maps `sm → text-mono-micro`), and
`SliderControl.vue:106` uses `@apply text-sm` again. So the panel mixes an absolute Tailwind step with
the design system's relative semantic steps in adjacent elements. It bites hardest on mobile: the app
sets `html { font-size: 1.125rem }` below 768 px (`web/src/style.css:40-50`), so the title lands at
**0.78×** body text while the glass-relative badge scales with the root — the intended hierarchy
inverts as the viewport narrows.

> **Falsifier.** If `text-sm` were remapped in the fourier `@theme` block it would scale too —
> `style.css:13-15` remaps only `--font-sans`. If glass-ui's `--type-*` were absolute the mismatch
> would vanish — `metric/styles.css:26,47,59` read `--type-micro`/`--type-prose`/`--type-caption`,
> the relative semantic family.

### D-17 · MINOR · Inline `scrollbar-width` where the system ships a scroll primitive

`:106` — `style="scrollbar-width: thin;"` — a raw inline style on a component that otherwise composes
entirely through classes and glass tokens. Installed 4.0.0 ships `FadingScroll`
(`glass-ui/dist/FadingScroll-DwNnvKMs.js`) precisely for a bounded scrolling content region with a
managed edge treatment; the panel hand-rolls a thin native scrollbar instead, which is also the one
declaration in the file that no theme, token, or reduced-transparency fallback can reach.

> **Falsifier.** If `FadingScroll` were not exported at 4.0.0 the alternative would not exist — it is
> in the installed dist chunk list. Whether it is the *right* primitive for a KaTeX overflow box is a
> wave decision; the objection to the inline style stands independently.

### D-18 · MINOR · Two horizontal scroll containers for one equation

`:106` sets `overflow-x-auto` on the wrapper. Its only child in the success branch is `.eq-katex`
containing KaTeX's `.katex-display`, which the app entry already makes a horizontal scroller:
`web/src/style.css:64-69` — `.katex-display { overflow-x: auto; overflow-y: visible; … }`. A wide
equation therefore scrolls in the inner box while the outer box also offers an x-scrollbar — nested
scroll affordances for a single object, and on platforms with persistent scrollbars, two of them
stacked.

> **Falsifier.** If the scoped override at `:127-129` reset the inner overflow it would collapse to
> one — it sets `@apply my-1 py-1` only. If `.katex-display` never overflows, neither scroller ever
> appears (D-10 makes the equation short, ≤4 terms + `\cdots`), which would make this cosmetic rather
> than active: mark the *observable* double-scrollbar **UNPROVEN-NEEDS-LIVE for SS-13**; the nested
> declaration is proven.

### D-19 · MINOR · Icon-to-box ratio, and a 24 px target that is exactly at the floor

`:86,:90` — a `h-6 w-6` (24 px) button carrying an `h-3.5 w-3.5` (14 px) glyph: ratio **0.58**, against
the dock idiom's 20 px glyph in a 40 px control = 0.50
(`CanvasControlsDock.vue:55,60` `<ImageIcon :size="20" />` inside `DockIconButton`, whose box is
`--dock-control-size` 2.5rem). The glyph reads proportionally larger and more crowded than every other
icon command in the view. The 24 px box also sits **exactly** on WCAG 2.2 SC 2.5.8's minimum with no
margin — it passes, but any future shrink fails, and the coarse-pointer rescue it currently relies on
is the one D-13 shows the uplift will remove.

> **Falsifier.** 24×24 meets SC 2.5.8 (24 CSS px) — this is explicitly **not** filed as a target-size
> failure, and the coarse floor at `a11y-overrides.css:116-123` raises it to 44 px today
> (`min-block-size` outranks `height`). The ratio claim falls if the dock buttons use a 14 px glyph
> too: `CanvasControlsDock.vue:47` uses `h-4.5 w-4.5` (18 px) in the same 40 px box = 0.45. Both dock
> ratios are below 0.5; the panel's 0.58 is the outlier.

### D-20 · MINOR · A spurious decimal, permanently

`:78` — `(energy * 100).toFixed(1)` — renders `100.0` for a fully-captured series and `98.7` for a
partial one. The trailing `.0` on the converged case adds a digit that carries no information and
widens the badge for the most common state; the design register elsewhere on the panel is terse
(`Terms`, a bare integer in `SliderControl`'s inline number field). A conditional or a
`placeholder`-aware format would read cleaner. Compounded by `energy = ref(1)` (`:21`) making
`100.0 %` also the *pre-fetch* display — see D-12.

> **Falsifier.** If the badge width were fixed by `--metric-badge-max-width` (8 rem,
> `components.css:15`) the extra glyph would cost nothing visually — it does not, the badge is
> `inline-flex` and sizes to content below that cap.

---

## §4 — INFO

### D-21 · INFO (cross-axis: security/correctness, filed here because it governs what the panel renders)

`:28-32` calls `katex.renderToString(latex, { displayMode: true, throwOnError: false, trust: true })`
and `:111` injects the result with `v-html`. `trust: true` enables KaTeX's privileged commands
(`\href`, `\url`, `\includegraphics`, `\htmlData`, …) on a string that arrives from
`/api/equations/simplify` (`api.ts:51`). The renderer in this tree emits none of them
(`latex_rendering.py` builds only `\frac`, `\cos`, `\sin`, `e^{…}`, `\cdots`, `\approx`), so the
present risk is bounded by the API's trustworthiness — but `trust: true` is an opt-*in* that nothing
in this component requires.

Second-order, and the reason it is filed on the design axis: the `try/catch` fallback at `:33-35` —
`return \`<span class="text-red-400">${latex.value}</span>\`` — is **unreachable for parse errors**,
because `throwOnError: false` makes KaTeX render an inline error instead of throwing. So the authored
"malformed LaTeX" state never shows; malformed input silently renders as KaTeX's own internal
`\color{#cc0000}` markup — a third, undesigned red, in a third register, that the component does not
know it has. (And `${latex.value}` is interpolated unescaped into that dead branch.)

> **Falsifier.** If KaTeX ≥0.17 threw under `throwOnError: false` the branch would be live —
> `throwOnError: false` is documented as the render-error-inline mode, and `katex@^0.17.0`
> (`web/package.json:20`) has not changed it. A `\href` in any server-side renderer path would raise
> the first half from INFO — none exists in `latex_rendering.py`.

---

## §5 — SUPERLATIVES (L-18 runs both ways)

**S-1 · The mount transition is exactly right, including under reduced motion.**
`VisualizationView.vue:230-232` wraps the panel in `<Transition name="fade">`, defined at `:439-440`
as `transition: opacity 0.2s var(--ease-standard)` — opacity-only, tokened easing, no transform. That
is precisely the property glass-ui's reduced-motion policy **preserves**:
`a11y-overrides.css:13-15` keeps `transition-property: opacity, color, background-color, border-color, box-shadow`
while killing spatial motion. The panel therefore animates identically for every user and degrades to
a 0.1 s fade rather than a jump. Four sibling transitions in the same stylesheet (`:425-437`) use
transforms and are correctly *not* used here.
> *Falsifier:* a transform in the fade class would demote this — `:439-440` has none.

**S-2 · The close button is named, and named specifically.**
`:87` — `aria-label="Close equation panel"`, not "Close". In a view where the dock already carries 6+
icon commands, "Close" alone would be ambiguous in a rotor listing. Note this is a *better* choice
than the app's dominant `<Tooltip>` idiom (35 callsites over 9 consumers — intake **R3-7a**), which
supplies a visual affordance but **not** an accessible name; using the label here also keeps the F.W3
tooltip-migration budget at 35.
> *Falsifier:* a `title` attribute would have been equivalent — there is none; the `aria-label` is
> load-bearing.

**S-3 · Both slider controls are named, without redundancy.**
`SliderControl.vue:66-80` wraps the caption *and* the numeric input in one `<label>` (implicit
association, no `for`/`id` pair to drift), and `:87` gives the reka-ui `<Slider>` an explicit
`:aria-label="label"`. Two interactive elements, two names, one source string, zero duplicate
announcements. This is the pattern the panel's own pills (D-2) failed to reach.
> *Falsifier:* if the `<label>` did not contain the input the implicit association would break —
> `:71-79` is nested inside `:66-80`.

**S-4 · The responsive width clamp is correct.**
`:123` — `max-width: min(28rem, calc(100% - 1rem))` paired with `left: 0.5rem` (`:122`) — holds an
exact 0.5 rem gutter on **both** sides at every viewport, and caps the measure of a display equation
at 28 rem. This is the one piece of the panel's geometry expressed as a relationship rather than a
constant, and it is the piece that does not break. (Contrast `top: 3.5rem` on the very next line —
D-1.)
> *Falsifier:* an asymmetric result requires `left ≠ (100% − max-width)/1` — the arithmetic is exact:
> left gutter 0.5 rem, right gutter `100% − 0.5rem − (100% − 1rem)` = 0.5 rem.

**S-5 · The abort guard is load-bearing and correctly placed.**
`:52-56` — `catch (e) { if (!isAbortError(e)) { error.value = … } }` with `isAbortError` re-exported
from the canonical fetch core (`lib/equation/api.ts:57` → `lib/api.ts`, the E.W5 consolidation that
retired the local `eqFetch` and its private AbortController registry, `api.ts:1-12`). Because the
300 ms debounce guarantees in-flight cancellation on every slider drag, omitting this guard would
paint D-11's red monospace error on **every drag**. The guard is what keeps a debounced control from
being a flashing error surface.
> *Falsifier:* if `apiFetch` did not abort superseded requests the guard would be inert — the
> single-registry abort behaviour is the documented purpose of the E.W5 core (`api.ts:5-8`).

**S-6 · Feature colour has exactly one authority, and the panel imports it.**
`lib/equation/notation.ts` colocates `NOTATION_OPTIONS` (`:9-18`), `TIER_INFO` (`:20-42`) and
`energyColor` (`:44-48`) as the equation feature's single colour source; `EquationPanel.vue:6` and
`NotationPills.vue:3` both consume it rather than re-deriving literals inline. The values are wrong
(D-2, D-3) — but they are wrong in **one place**, which is why both fixes are a few lines rather than
a sweep. Good structure carrying bad content is still good structure, and it is what makes those two
BLOCKERs cheap to discharge.
> *Falsifier:* a duplicated literal would void this — `grep -rn "hsl(142, 71%, 45%)\|hsl(6, 72%, 49%)"
> web/src/` returns only `notation.ts:15,45`.

---

## §6 — Carry to the wave board

| id | severity | disposition |
|---|---|---|
| D-1 | BLOCKER | **F.W1/F.W4** — replace `top: 3.5rem` with a shared offset token or an anchor/`ResizeObserver` binding to the dock; the fix is co-owned with the dock geometry, so it lands with the uplift. |
| D-2, D-3 | BLOCKER | **F.W4** — `aria-pressed` + a non-colour mark on the pills (port `BasisSelector.vue:144,269` verbatim); `light-dark()` arms for the 6 literals in `notation.ts`, sized to clear 4.5:1 on both grounds. Follows the existing `--viz-amber` carry precedent (`style.css:113-127`). Relay to the glass-ui BH inbox is **not** required — both are fourier-local literals, not producer tokens. |
| D-4 | MAJOR | **F.W4** — drop the local `box-shadow`, move to `.glass-quiet`. Pure deletion + one class. |
| D-5, D-6 | MAJOR | **F.W4** — the panel is the hand-rolled dialog `GalleryCardModal.vue:31-35` already retired once; re-point onto the glass-ui `<Dialog>`/floating-panel surface, or port the `MobileFloatingToc.vue:36-51` focus pair. |
| D-7, D-8, D-14 | MAJOR | **F.W1 (uplift)** — `MetricBadge` → `Metric` carries `label`/`abbreviation` (D-7) and `loading`+`aria-busy`+static skeleton (D-8) as part of the same edit; `:color` must be re-homed locally, which is the moment to fix D-3. One of the 7 `./metric-badge` files (CENSUS §2 **C-4**). |
| D-13 | MAJOR | **F.W1 (uplift)** — `variant`/`size="icon"` → `emphasis`/`iconOnly`; **budget the coarse-pointer touch-floor regression** (`[data-size="icon"]` stops matching). Also hits `NotationPills.vue:19` and, by the same axis change, the wider 95-import surface. |
| D-9, D-10, D-11, D-12 | MAJOR | **F.W4** — state-coverage set: initial skeleton, honest slider range (cap at the renderer's 4, or teach `render_latex` the budget — the latter crosses into the Python lane), `--destructive` + retry + human copy, and a real empty/stale branch. |
| D-15 … D-20 | MINOR | **F.W4** — polish batch; D-16/D-17 fold naturally into the uplift's class sweep. |
| D-21 | INFO | **F.W5** — `trust: true` belongs in the API-contract conversation (the shared-provenance seam decides what a stored/derived LaTeX payload is allowed to contain); the dead `catch` branch is a one-line delete. |
