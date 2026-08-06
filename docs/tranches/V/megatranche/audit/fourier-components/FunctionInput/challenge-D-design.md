claude-opus-5[1m] (served model id)

# CHALLENGE — `FunctionInput.vue` · axis **D (DESIGN)**

**Subject.** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/equation/FunctionInput.vue` (261 lines)
**Substrate.** fourier HEAD `cd26c65` / tree `9a66411d` — the tree the intake lane re-verified as *not*
stale at fold (`lane-fourier-r3-r6.md` ADDENDUM fact 1); working tree on `m/w1-bump-migration` with the
in-flight 3.1→4.0 bump applied to `web/package.json` and installed (`node_modules/@mkbabb/glass-ui@4.0.0`).
**Method.** Static + source-derived only. No browser, no dev server, no install. Read whole: the SFC; its
five first-party imports (`lib/equation/presets.ts`, `lib/equation/types.ts`, `lib/equation/notation.ts` via
`NotationPills`, `ui/CollapsibleSection.vue`, `ui/SliderControl.vue`, `ui/tooltip/Tooltip.vue` +
`ui/tooltip/index.ts`, `equation/NotationPills.vue`); its host `EquationView.vue`; the app cascade
`web/src/style.css` + `web/public/fonts.css` + `web/DESIGN.md`; the **installed** `@mkbabb/glass-ui@4.0.0`
dist (component typings, CVA recipe source, the whole `dist/styles` token + utility cascade); the
**producer** `@mkbabb/glass-ui` at tag **`v7.0.0`** (`git show v7.0.0:…`) plus `CHANGELOG.md` /
`MIGRATION.md`; the `web/e2e/` suite; and `web/dist` (stale — see D-13's falsifier).
**Posture.** Assumed DEFECTIVE until the tree proves otherwise. Every row carries severity, `file:line`
provenance, and its own falsifier. Superlatives carry falsifiers too (L-18 runs both ways).

**Tally.** **24 defects** (4 BLOCKER · 10 MAJOR · 8 MINOR · 2 INFO) · **7 superlatives**.

**Corpus fold** (consumed, not re-derived):

- `formation/fourier/lane-frontend.md:132` (this file, 261 LOC, "Expression entry + presets"), `:267`
  (its single glass-ui import), `:441` (`NotationPills` → `./toggle-chip` → `./chip` candidate-shadow row),
  `:612-624` (the reduced-motion census), `:70` (dead CVA/clsx/tailwind-merge devDeps), `:602` (the
  `--viz-amber` darken + `:focus-visible` ring block in `style.css`).
- `formation/fourier/CENSUS-2026-08-03.md` §3a — "the deepest, cleanest glass consumer in the
  constellation". **This lane CONTRADICTS that generalization for the form band** (D-1): `grep -rn
  "glass-ui/forms\|{ Input }" web/src/` → **0 hits**, against **18 raw `<input>` elements over 13 files**,
  three of them here. Adoption is deep for *buttons/sliders/overlays* and **nil for inputs**.
- `formation/fourier/CENSUS-2026-08-03.md` §5 risk 10 + §3a — the enumerated 4→7 break surface
  (`metric-badge` ×7 · `hover-card` ×2 · `hover-popover` ×2 · 3 dock members · `ToastVariant`). **None of
  those five rows touches this file — and yet this file breaks harder than any of them** (D-12). The
  census's break list is INCOMPLETE; so is glass-ui's own `CHANGELOG.md`/`MIGRATION.md`.
- `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` **R3-7 / R3-7a** (35 Tooltip callsites over 9
  consumers; "FunctionInput 2"; CARRY→F.W3) — cited at D-11 and refined: 2 *physical* callsites here mount
  **9 instances** at runtime.
- Same file **R5-7** — its own re-derivation quotes `"callsiteId":
  "callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0"` as the *populated*
  contrast case (`instance.loop.presets`) against `PaperSidebar`'s empty native-loop leaf. **Recorded so
  F.W4 need not re-check: this subtree's only `v-for` (`:157`) is on a COMPONENT, so the native-loop blind
  spot does not bite here.** The `v-for` in the child `NotationPills.vue:17` is likewise on `<Button>`.

---

## §0 — What the component is

The left rail of `/equation`. Two `cartoon-card` panels, each a `CollapsibleSection`:

1. **Function** — a free-text expression field, a two-field domain range with π-aware parse/format, a
   full-width **Compute** button, and eight preset pills.
2. **Controls** — a *Harmonics* slider paired with a wand toggle for Parseval auto-N, a *Display terms*
   slider, and the three notation pills (delegated to `NotationPills.vue`).

Six `defineModel`s out, two emits (`update:autoHarmonics`, `compute`), four read-only props in. It owns
**no** async state; the host `EquationView.vue` owns `computing` / `simplifying` / `error` and renders all
three in the *other* pane.

Glass-ui surface: **`Button` only** (`:3`) — 10 runtime instances in this file (1 Compute + 8 presets +
1 wand), 13 counting `NotationPills`. `Slider` and `Collapsible` arrive indirectly through the two
`components/ui/` adapters. Everything else — three text inputs, three labels, the layout — is hand-rolled.

---

## §1 — BLOCKERS

### D-1 · BLOCKER · The three text inputs are not perceivable as controls, and the design system ships the recipe that would fix it

`FunctionInput.vue:103-107`, `:122-125`, `:134-137` paint all three fields identically:

```
class="… bg-muted/40 border-[1.5px] border-border/50 … outline-none
       transition-colors focus:border-primary/50"
```

Resolve those tokens (glass-ui 4.0.0 `dist/styles/tokens/color-radius.css:41,44,72` ·
`tokens/dark-arm.css:43,46,64`) and composite the alpha:

| measure | light | dark | required |
|---|---:|---:|---|
| field fill (`--muted` @40 %) **vs** the `cartoon-card` it sits on (`--card`) | **1.02:1** | **1.07:1** | — |
| field border (`--border` @50 %) **vs** the field fill | **1.34:1** | **1.46:1** | **3:1** (WCAG 1.4.11) |
| focus border (`--primary` @50 %) **vs** the field fill | 3.29:1 | **2.64:1** | **3:1** (1.4.11) |
| focus border **vs** rest border (the state *change*) | 2.45:1 | 1.80:1 | 3:1 (2.4.13, AAA) |

So: the fill is invisible (1.02:1), the border is invisible (1.34:1), and there is no third cue — the
label is a sibling `<div>`, not a box. **Nothing on screen says "this is a text field."** In dark mode the
*focused* state also misses 1.4.11 at 2.64:1, and `outline-none` (`:105`, `:124`, `:136`) has already
deleted the UA focus ring that would have carried it.

The tree knows better in two independent places:

- **glass-ui ships the recipe.** `@mkbabb/glass-ui/forms` exports `Input`
  (`dist/forms.d.ts:1`), whose class list is literally `"input-pill text-sm …"`
  (`dist/Input-DVG_J0ne.js`). `.input-pill` (`dist/styles/glass/surfaces.css:187-217`) brings
  `height: var(--control-h-md)` (the 44 px coarse clamp), `font-size: var(--control-text)`,
  `border: 1.5px solid var(--control-surface-border)` (the *same* 1.5 px the author hand-typed —
  the mimicry is deliberate), a real `:focus-visible` ring (`:257-261`,
  `box-shadow: 0 0 0 2px var(--color-accent…)`), an `[aria-invalid="true"]` destructive ring
  (`:273-276` — precisely the affordance D-3 needs), a token placeholder colour (`:229-231`), and
  forced-colors survival (`dist/styles/utilities/a11y-overrides.css:88-89` lists `.input-pill:focus`
  in the `outline: 2px solid Highlight` set). **`grep -rn "glass-ui/forms" web/src/` → 0 hits.**
- **The app knows the focus-ring pattern.** `web/src/style.css:129-143` declares a global
  `:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px }` for exactly four
  scoped-styled classes, with a written rationale ("D.W4.d … Mirrors the canonical pattern at
  `AppHeader.vue:174-177`"). `#fn-expression` and the two domain fields are in none of the four.

> **Falsifier.** (a) A higher-contrast `--muted`/`--border` in a fourier override would rescue it —
> `grep -rn -- "--muted:\|--border:" web/src/` returns **empty**; `style.css` overrides only
> `--viz-amber` and `--section-color-5` (`:119-127`). (b) A `@layer`-level `input` base rule painting a
> boundary — `style.css`'s `@layer base` block (`:17-36`) sets only `html/body` and `::selection`.
> (c) The numbers assume simple alpha compositing of `bg-muted/40` over `--card`; a `backdrop-filter`
> beneath would change the backdrop — there is none on `cartoon-card` (`style.css:107-111` composes
> `cartoon-surface`, which is border + shadow + translate only, `glass-ui/dist/styles/cards.css:33-48`).
> (d) The dark focus row is the weakest link (`--primary` dark is `oklch(0.739 0.134 318.1)`,
> `tokens/dark-arm.css:82`, converted through the OKLab matrix) — recompute at F.W1 if the dark primary
> is retuned. Everything else is arithmetic on shipped literals.

### D-2 · BLOCKER · The primary action is silently inert on an empty expression, and has no local outcome affordance at all

`FunctionInput.vue:143-151` renders Compute unconditionally: no `:disabled`, no `required`, no
`aria-describedby`, no in-flight state. The host's handler opens

```
EquationView.vue:91-93   async function doCompute(force = false) {
                             const expr = expression.value.trim();
                             if (!expr) return;
```

— a silent early return. With the field empty (reachable: `expression` is a `defineModel` with
`default: ""` at `:25`, and the user can clear it), **clicking Compute does nothing and says nothing.**
No message, no invalid mark, no disabled state to explain the refusal. The one control that names the
component's purpose is a dead button.

The non-empty path is barely better. The host owns the whole result vocabulary — a spinner + "Computing…"
(`EquationView.vue:221-226`), "Computation failed" (`:229-234`), a "Recomputing…" banner (`:239-242`), an
error banner (`:243-246`) — and renders **every one of them in the right-hand pane**. Under 1024 px that
pane is deleted:

```
EquationView.vue:196   :class="{ 'panel-inactive': mobileView !== 'controls' && !isDesktop }"
EquationView.vue:219   :class="{ 'panel-inactive': mobileView !== 'canvas'   && !isDesktop }"
EquationView.vue:436-441   @media (max-width: 1023px) { .panel-inactive { display: none } }
EquationView.vue:44    const mobileView = ref<"controls" | "canvas">("controls")   ← the default
```

`grep -n "mobileView" EquationView.vue` → four hits (`:44`, `:190`, `:191`, `:196`, `:219`); **nothing
ever assigns it programmatically.** So on every phone: the user is on *Controls* by default, presses
Compute, and the spinner, the error, and the result all render into a `display: none` subtree. There is no
auto-switch and no local echo.

The host even computes the state this component needs — `EquationView.vue:57 const loading = computed(() =>
computing.value || simplifying.value)` — and **never passes it**: the prop list at `:198-211` carries
`effectiveN`, `energyCaptured`, `autoHarmonics`, `vizHarmonics` and no loading/error. `loading` has,
by inspection of `:57` and its call sites, **no consumer at all**.

> **Falsifier.** (a) A `<Toaster>`-routed error would give a global echo — `useToast` exists
> (`src/composables/useToast.ts`) but `grep -n "toast" EquationView.vue FunctionInput.vue` → empty.
> (b) A native `required` + form submit would surface the browser bubble — there is no `<form>` in the
> file (`grep -n "<form" FunctionInput.vue` → empty); `@keydown.enter` at `:102` emits the same
> already-guarded `compute`. (c) A test asserting the empty case would prove intent — see D-24: the
> `/equation` route appears in `e2e/` exactly once, as a screenshot slug (`visual-baseline.spec.ts:34`).
> (d) The mobile arm assumes `isDesktop` is false below 1024 px: `useMediaQuery("(min-width: 1024px)")`
> at `:45` matches the CSS breakpoint at `:437` exactly.

### D-3 · BLOCKER · Domain input swallows invalid text: no error state, and the field silently diverges from the model

The two domain fields are one-way bound to a formatter and commit through a parser that can refuse:

```
FunctionInput.vue:120-121   :value="formatDomain(domainStart)"
                            @change="onDomainInput($event, (v) => domainStart = v)"
FunctionInput.vue:57-60     function onDomainInput(e, setter) {
                                const val = parseDomainValue((e.target as HTMLInputElement).value);
                                if (val !== null) setter(val);        ← the refusal
                            }
FunctionInput.vue:44-55     parseDomainValue → null on anything not matching /^([+-]?\d*\.?\d*)\*?pi(?:\/(\d+))?$/
                                               and not `Number.isFinite(parseFloat(s))`
```

Type `tau`, `2pi/`, `e`, or `1..5` and: `parseDomainValue` returns `null`; the setter never fires; the
bound `:value` expression is therefore **unchanged**, so Vue's patcher sees no diff and does not rewrite
the DOM value. The field keeps displaying the user's rejected text while the model keeps the old number.
**The visible state and the real state disagree, permanently, with no signal.** There is no
`aria-invalid`, no `:invalid` styling, no message, no revert-on-blur, no `pattern`, no `inputmode`.

This is the one place `.input-pill`'s `[aria-invalid="true"]` ring (`glass/surfaces.css:273-276`) — and its
sibling `useUserInvalidAria` composable, exported right beside `Input` at `dist/forms.d.ts:4` — was built
for. Neither is used.

> **Falsifier.** (a) If Vue re-rendered the input on *any* unrelated tick the field would snap back —
> it would not: the `:value` binding's dependency set is `domainStart` alone, and a patch only writes
> `el.value` when the new expression differs from the old vnode's. (b) A `@blur` reset would cure it —
> `grep -n "@blur\|@input" FunctionInput.vue` → empty (the only handlers are `@change` ×2,
> `@keydown.enter`, `@click` ×3, `@update:model-value` ×2). (c) `type="text"` is deliberate (the field
> must accept `π/2`), so no native constraint fires — correct choice, but it makes the app-driven
> `aria-invalid` arm mandatory, not optional. (d) The *silent-divergence* half is DOM-patch semantics,
> not a live measurement; if F.W1 wants belt-and-braces, mark it **UNPROVEN-NEEDS-LIVE for SS-13** — the
> *missing-error-affordance* half needs no live probe (there is no error surface in the file to find).

### D-4 · BLOCKER · The wand toggle has no accessible name, and its only state signal is colour forced through three `!important`s

```
FunctionInput.vue:188-197
   <Tooltip side="bottom">
       <Button variant="glass" size="icon"
               :class="{ 'is-auto-active': autoHarmonics }"
               :disabled="!effectiveN" @click="toggleAuto">
           <Wand2 class="h-4.5 w-4.5" />
       </Button>
```

Three failures stacked on one 44 px square:

1. **No accessible name.** No `aria-label`, no `title`, no text child, no `aria-labelledby` — only an SVG
   glyph, and lucide-vue-next emits `aria-hidden`-free but *unlabelled* `<svg>`. The wrapping
   `TooltipTrigger` (`ui/tooltip/Tooltip.vue:28-30`) contributes `aria-describedby` when open, which is a
   *description*, never a name. WCAG 4.1.2 fails outright: assistive tech announces "button".
   Contrast the sibling fields, which the same author *did* name (`:119`, `:131`).
2. **No `aria-pressed`.** This is a binary mode toggle (`toggleAuto`, `:32-34`) whose entire state signal
   is `.is-auto-active` (`:250-254`) changing `color` / `border-color` / `background`. WCAG 1.4.1 (Use of
   Color) and 4.1.2 (Name, **Role, Value**) both fail. And it violates the project's own written law —
   `web/DESIGN.md:25`: *"`.basis-pill` (interactive toggle) → `<Button variant="outline" size="sm">` +
   scoped … retint hook **+ `aria-pressed` for the active state**."* `BasisSelector.vue:144` honours it;
   this file does not. The waste is doubled because glass-ui's `glass` variant already ships the state
   paint keyed off the attribute: `aria-pressed:bg-[color-mix(in_srgb,var(--foreground)_10%,…)]`
   (`dist/button-BNDWhAZb.js`, the `glass` variant string). Adding `:aria-pressed="autoHarmonics"` would
   fix the semantics *and* light up the design-system state for free.
3. **The `!important` triple** (`:251-253`) is unnecessary and will outlive its cause — see D-17.

> **Falsifier.** (a) A `TooltipTrigger` that promoted its content to `aria-label` would supply the name —
> `ui/tooltip/Tooltip.vue:26-34` forwards nothing of the sort, and reka-ui's trigger wires
> `aria-describedby` only. (b) An `aria-label` inherited through `as-child` from a parent — the parent is
> a bare `<Tooltip>` with no attrs (`:188`). (c) A global `[data-variant=glass]` state rule would make the
> tint redundant rather than sole-cue — the aria-pressed hook exists but is never triggered because the
> attribute is never set. (d) `grep -n "aria-" FunctionInput.vue` → exactly **two** hits, both the domain
> `aria-label`s at `:119` / `:131`.

---

## §2 — MAJOR

### D-5 · MAJOR · Preset selection is signalled by colour alone, below AA, and against the same house rule

`:162` `:class="{ 'is-active': activePreset?.name === preset.name }"` → `:244-248` changes only
`background` / `border-color` / `color`. No `aria-pressed`, no `aria-current`, no `role="group"`/
`radiogroup`, no weight or glyph change. Eight identically-named buttons; the selected one differs only in
hue. Same `DESIGN.md:25` violation as D-4, on eight controls instead of one.

The tint is also under-contrast for its own text. `--viz-fourier` light is `oklch(0.579 0.201 30.4)`
(`tokens/color-radius.css:263`), dark `oklch(0.693 0.151 28.1)` (`tokens/dark-arm.css:113`):

| measure | light | dark | required |
|---|---:|---:|---|
| `.is-active` label (`color: var(--viz-fourier)`) on its own 12 % tint | **3.77:1** | **4.17:1** | 4.5:1 (1.4.3, normal text) |
| the 12 % tint vs the card (the "is it selected" cue) | 1.19:1 | 1.19:1 | 3:1 (1.4.11) |
| the 40 % border vs the card | 1.83:1 | 1.91:1 | 3:1 (1.4.11) |

The text is `size="sm"` → `text-[length:var(--control-text)]` → `--type-small` (`dist/button-BNDWhAZb.js`
base string; `tokens/offsets-sizing.css:170`), i.e. the *normal-text* register, so 4.5:1 applies, not 3:1.

> **Falsifier.** (a) If `--control-text` resolved ≥18.66 px bold / ≥24 px the large-text 3:1 bar would
> apply — `--type-small` is the `text-sm` rung (`typography` §scale) and `font-medium` (500) is not bold.
> (b) `size="sm"` is confirmed at `:160`. (c) The tint composites over `--card`, not `--background`,
> because the pill sits inside `cartoon-card` (`:93`); the two differ by 1.02:1 so the verdict is
> insensitive to that choice. (d) Recompute if F.W1 retunes `--viz-fourier`.

### D-6 · MAJOR · The placeholder is the component's only syntax documentation, and it is at 2.02:1

`:107` `placeholder:text-muted-foreground/50` over `bg-muted/40`:

| | light | dark | required |
|---|---:|---:|---|
| placeholder text | **2.02:1** | **2.58:1** | 4.5:1 (WCAG 1.4.3) |

The string it renders (`:108`) — `e.g. x*(pi - x)  or  sin(2*x) + cos(3*x)` — is the *only* place in the
UI that discloses the expression grammar (that `pi` is a literal, that `*` is required, that `**` is
exponentiation, that SymPy `Piecewise`/`Heaviside` are legal — the last two appear only inside
`lib/equation/presets.ts:6,42`). Placeholders also vanish on first keystroke, so the grammar disappears
exactly when the user starts typing it. glass-ui's own placeholder token is `--surface-tint-35`
(`glass/surfaces.css:229-231`), *and* it applies to a field that is itself perceivable (D-1).

> **Falsifier.** (a) Some AG guidance exempts placeholder text — WCAG 1.4.3 does not; the SC applies to
> "text and images of text", and the WCAG 2.2 understanding document names placeholder text explicitly.
> (b) A help/hint element elsewhere would demote this to MINOR — `grep -n "aria-describedby\|hint\|help"
> FunctionInput.vue` → empty; the presets' descriptions live only in hover tooltips (D-11).
> (c) The 50 % alpha composites over the 40 % field fill over `--card`; both underlying layers are
> measured above.

### D-7 · MAJOR · The Compute button's hover state is its only tinted state and it misses AA in both arms

`:232-239`:

```
.compute-btn:hover { border-color: color-mix(… --viz-fourier 50% …);
                     background:   color-mix(… --viz-fourier  8% …);
                     color:        var(--viz-fourier); }
```

| | light | dark | required |
|---|---:|---:|---|
| hover label on its own 8 % background | **4.00:1** | **4.44:1** | 4.5:1 |

Both arms fail, and the rest state has no tint at all (`variant="default"` = the neutral glass wash), so
hover is the *only* moment the primary action is branded — and it is the moment it becomes least legible.
There is also no `:focus-visible` twin of this rule, so keyboard users never see the brand state at all
(the glass `focus-ring` paints a ring, not the tint).

> **Falsifier.** (a) `color-mix(in srgb, X 8%, transparent)` over the card is standard alpha compositing;
> the card is measured. (b) If the button ever sat on `--background` instead of `--card` the numbers move
> by <1 % (the two differ by 1.02:1). (c) Scoped-style specificity: `.compute-btn:hover[data-v-…]` is
> unlayered and therefore beats Tailwind's `@layer utilities` `hover:bg-(--glass-bg-resting)`
> unconditionally — so the rule does win; see D-17.

### D-8 · MAJOR · The form band opts out of the `--ui-scale` comfort axis the rest of the panel rides

glass-ui 4.0.0 threads one comfort scalar through every control:
`--ui-scale: 1`, lifted to `--ui-coarse-scale: 1.5` under `@media (pointer: coarse)`, feeding
`--control-h-{xs,sm,md,lg}` with a `max(scaled, --control-floor)` clamp whose floor rises to
`--touch-target: 2.75rem` (44 px) on touch, plus `--control-text` for the font and `--ui-glyph` for the
icon (`tokens/offsets-sizing.css:136-178, 454-461`; the coarse `[data-size="icon"]` floor at
`utilities/a11y-overrides.css:115-122`).

The three `<Button>`s in this file inherit all of it. The three `<input>`s inherit **none** of it — they
are pinned to literals:

| control | geometry | height @ fine | height @ coarse |
|---|---|---:|---:|
| Compute `<Button size="sm">` | `h-(--control-h-sm)` | 36 px | **54 px** |
| wand `<Button size="icon">` | `h-(--control-h-md)` + coarse floor | 40 px | **44 px** |
| `#fn-expression` (`:103` `px-2.5 py-2 text-sm`) | 8 px + 8 px + line-box | ≈ 36 px | **≈ 36 px** |
| domain fields (`:122` / `:134` `w-20 px-1.5 py-1 text-sm`) | 4 px + 4 px + line-box | ≈ **28 px** | ≈ **28 px** |

So on any touch device the Compute button is 54 px tall with 1.5×-scaled text while the field above it
stays 36 px with unscaled text, and the two domain fields stay at **28 px — 16 px under the library's own
declared WCAG-2.5.5 floor**, in the row where the finger targets are smallest. (They clear the WCAG 2.2
**2.5.8** AA minimum of 24×24 CSS px at 28×80 — this is a deviation from the design system's stated 44 px
comfort law, not an AA failure. Stated precisely so F.W1 can price it honestly.)

> **Falsifier.** (a) A fourier-side `--ui-scale` override would change the arithmetic —
> `grep -rn "ui-scale\|ui-coarse-scale\|control-floor\|touch-target" web/src/` → **empty**.
> (b) The heights are line-box estimates (`text-sm` at fourier's root sizing, `style.css:40-50`, is
> 0.875rem over a 1.25rem line box); the *padding* halves are exact, and the coarse/fine divergence — the
> actual claim — does not depend on the line box. Mark the absolute pixel heights
> **UNPROVEN-NEEDS-LIVE for SS-13**; the divergence is token-decidable.
> (c) `.input-pill` would have supplied all of it (D-1) — that is the point.

### D-9 · MAJOR · "Display terms" degenerates to a zero-range slider whose displayed value is below its own minimum

```
FunctionInput.vue:216-217
   :model-value="Math.min(budget, vizHarmonics ?? nHarmonics)"
   :min="2" :max="Math.max(2, vizHarmonics ?? nHarmonics)" :step="1"
```

The Harmonics slider directly above declares `:min="1"` (`:184`). Drive it to 1 and the host's
`vizHarmonics` follows (`EquationView.vue:53-55` — `Math.min(effectiveN, nHarmonics)` in auto, `nHarmonics`
otherwise). Then:

- `:max` = `Math.max(2, 1)` = **2**, `:min` = **2** → a slider with **zero travel**: the thumb cannot move,
  and `SliderControl.vue:53-56`'s scalar↔array adapter clamps every set back to 2.
- `:model-value` = `Math.min(budget, 1)` = **1** → *below* the declared minimum. `SliderControl.vue:71-79`
  forwards that straight to the inline `<input type="number" :min="2" :max="2">` as `:value="1"`, so the
  numeric field renders "1" in a permanently `:invalid` state — with no invalid styling anywhere in the
  chassis (`SliderControl.vue:117-138` styles hover/focus only).

The row also shows a control the user cannot use, sitting under a subtitle that promises they can
("shown in expanded (a+b) view", `:215`).

> **Falsifier.** (a) If Harmonics could not reach 1, the state would be unreachable — `:184` is
> `:min="1"` verbatim. (b) If `budget` were clamped upstream — `EquationView.vue:29` seeds it from cache
> with a default of 10 and never clamps. (c) reka-ui might reject `min === max` and log — either way the
> control is inert; the *rendered* symptom (dead thumb, "1" in a min=2 field) is derivable from the
> bindings alone. (d) A `v-if` guarding the second slider would cure it — `:213` is unconditional.

### D-10 · MAJOR · Clearing a slider's inline number field snaps the model to `min` — and, for Harmonics, silently cancels auto mode

`SliderControl.vue:44-49` fires on **`@input`**, i.e. every keystroke:

```
function onInput(e) {
    emit("update:modelValue",
         clamp(parseFloat((e.target as HTMLInputElement).value), props.min, props.max));
}
function clamp(v, lo, hi) { return Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : lo; }
```

`parseFloat("")` is `NaN` → `clamp` returns **`lo`**. So selecting-all and deleting (the normal way to
retype a number) commits `min` before the first new digit arrives. On the Harmonics row that is worse than
a value change, because `FunctionInput.vue:186` attaches a side effect:

```
@update:model-value="(v: number) => { nHarmonics = v; emit('update:autoHarmonics', false); }"
```

— so clearing the field sets N to 1 **and** turns off Parseval auto-mode, permanently and silently. The
wand's amber tint drops, which is the only trace, and per D-4 that trace is colour-only. Typing "50" also
commits the intermediate 5.

> **Falsifier.** (a) `@change` instead of `@input` would confine it to blur — `SliderControl.vue:78` is
> `@input="onInput"` verbatim. (b) A `NaN → keep-current` branch would cure it — `clamp`'s falsy arm
> returns `lo`, not the previous value (`:41`). (c) The auto-cancel is intended for *drags*; the defect is
> that the numeric field routes through the same emit, which the wrapper cannot distinguish. (d) Owned by
> `SliderControl.vue`; filed here because both of this file's sliders mount it and the auto-cancel
> side-effect is authored *here*, at `:186`.

### D-11 · MAJOR · Hover tooltips are the sole carrier of the preset semantics and of the auto-mode explanation — and the auto tooltip is unreachable exactly when it is needed

Two `<Tooltip>` callsites (`:157`, `:188`) mount **nine** instances (eight presets + the wand). This is the
same pair the intake lane counted as "FunctionInput 2" (`lane-fourier-r3-r6.md` **R3-7a**); the
instance/callsite gap is recorded here so F.W3's "35 callsites / 9 consumers" budget is not mistaken for a
mounted-instance budget in this subtree.

- **Presets.** `presets.ts:8,14,20,26,32,38,44,50` carry the eight descriptions ("Classic square wave with
  1/n decay", "Triangle wave — 1/n² decay", "Unit step — Gibbs phenomenon", …) — the pedagogic payload of
  an *educational* tool. They surface **only** through `:text="preset.description"` on hover
  (`:157`). On touch there is no hover; the pills reduce to eight bare names.
- **Auto mode.** The Parseval explanation, the ≥99.99 %-energy rule, and the live `N_eff` / `% energy`
  readout all live in the wand's `#content` slot (`:198-210`). But the trigger carries
  `:disabled="!effectiveN"` (`:193`), and glass-ui's Button base string sets
  `disabled:pointer-events-none` (`dist/button-BNDWhAZb.js`). A disabled `<button>` is also not
  focusable. **So while auto is unavailable, the tooltip that explains what it is and why it is
  unavailable cannot be opened by pointer or keyboard.** The disabled state is exactly the state a user
  would interrogate.

> **Falsifier.** (a) Long-press tooltips on touch — reka-ui's Tooltip is pointer/focus driven; the local
> shim (`ui/tooltip/Tooltip.vue:26-34`) adds no touch path, and `TooltipProvider` is configured
> hover-only at `App.vue:4`. (b) A duplicate description elsewhere in the UI would demote this —
> `grep -rn "preset.description" web/src/` → the single site at `:157`. (c) Wrapping the disabled button
> in a focusable span would restore reachability — the tree does not; the trigger is `as-child` onto the
> Button itself (`ui/tooltip/Tooltip.vue:28`). (d) `effectiveN` is seeded to 20 from cache
> (`EquationView.vue:41`), so the disabled arm needs a cold, cache-less first load — reachable, not
> constant. Mark the *frequency* UNPROVEN-NEEDS-LIVE; the mechanism is static.

### D-12 · MAJOR · Every `<Button>` in this subtree is definition-absent at glass-ui 7.0.0 — a break the census and the producer's own migration docs both miss

Measured against the tag, not the branch:

```
$ git -C /Users/mkbabb/Programming/glass-ui show v7.0.0:src/components/button/Button.vue | grep -c variant
0
$ git -C … show v7.0.0:src/components/button/Button.vue | sed -n '15,31p'
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;   tone?: Tone;   size?: ButtonSize;
    iconOnly?: boolean;          loading?: boolean;   …
```

`variant` is gone; `size` lost `"default"` and `"icon"` (the silhouette word is banned from size unions by
`_shared/axes.ts`'s SUB-RANGE LAW). Every call site in this subtree therefore breaks:

| site | today | 7.0.0 |
|---|---|---|
| `FunctionInput.vue:144-145` Compute | `variant="default" size="sm"` | `emphasis` + `size="sm"` |
| `FunctionInput.vue:159-160` presets ×8 | `variant="outline" size="sm"` | `emphasis="secondary"` — or `Chip mode="selectable"` |
| `FunctionInput.vue:190-191` wand | `variant="glass" size="icon"` | `emphasis` + **`iconOnly`** |
| `NotationPills.vue:20-21` ×3 | `variant="outline" size="sm"` | same |

**13 runtime instances in this subtree; 35 `@mkbabb/glass-ui/button` import occurrences tree-wide**
(`lane-frontend.md:213`) — larger than every enumerated break row combined. Yet:

- `CENSUS-2026-08-03.md` §3a's break list is *metric-badge ×7 · hover-card ×2 · hover-popover ×2 · 3 dock
  members · `ToastVariant`*. **Button is absent.**
- glass-ui's own `CHANGELOG.md:63-64` records only the *type* rename (`ButtonVariants` → `ButtonProps` /
  `ButtonEmphasis` / `ButtonSize`), and `MIGRATION.md:167` / `:445` repeat it. `grep -n "emphasis"
  CHANGELOG.md MIGRATION.md` → **zero hits in either file.** The prop re-axing that breaks every consumer
  template has **no migration row**. (`MIGRATION.md:1183-1204`'s `BI.W-BUTTON-TONE` documents
  `variant="destructive"` → `tone="destructive"` *within* a surviving `variant` axis — it predates and
  does not describe the 7.0.0 shape.)

Two improvements arrive with the same break, and F.W1 should bank both rather than port mechanically:
`loading` (`Button.vue:27`, `aria-busy` + activation suppression) is the exact affordance D-2 needs; and
`@mkbabb/glass-ui/chip` `mode="selectable"` (`chip/types.ts:28-36`; `chipVariants.ts` composes
`glass-chip glass-capsule accent-tone` + `focus-ring`, `Chip.vue:33,43` manages `aria-pressed`/`data-state`
itself) is the exact shape of the eight preset pills and the three notation pills — retiring both D-5's
missing `aria-pressed` and D-18's duplicated radius. This is `lane-frontend.md:441`'s
`NotationPills → ./toggle-chip → ./chip` row, extended: **the preset pills belong to it too.**

> **Falsifier.** (a) The producer checkout is post-7.0.0 (HEAD `51cfdfaf`, accruing 8.0.0), so branch
> source is not evidence — every claim above is read from **`git show v7.0.0:…`**. (b) A compat shim
> accepting `variant` would soften it — `git show v7.0.0:src/components/button/Button.vue | grep -c
> variant` → `0`; and `MIGRATION.md`'s posture is clean-break ("no aliases", `:931-932`, `:1348-1356`).
> (c) `Chip` presence at the tag is confirmed in `git show v7.0.0:package.json` exports (`./chip`).
> (d) `Slider variant="standard"` — used by `SliderControl.vue:83` — **survives** (`v7.0.0`
> `src/components/slider/Slider.vue:27` default); do not sweep it in.

### D-13 · MAJOR · The two icon-size classes are inert today and come *alive* at 7.0.0 — an unbudgeted visual delta

`:149` `<Play class="h-3.5 w-3.5" />` and `:196` `<Wand2 class="h-4.5 w-4.5" />` ask for 14 px and 18 px.

**At 4.0.0** glass-ui's CVA base string carries
`[&_svg:not([class*=size-])]:size-(--ui-glyph)` (`dist/button-BNDWhAZb.js`). It compiles to
`… svg:not([class*="size-"])` — specificity **(0,2,1)** — while `.h-3\.5` is **(0,1,0)**, and both land in
Tailwind's `@layer utilities` (glass-ui reaches the consumer's scanner through
`@source "../*.js"`, documented as the deliberate backstop at `dist/styles/index.css:203-222`). Higher
specificity wins, so the rendered glyph is `--ui-glyph` = `calc(1rem × --ui-scale)` =
**16 px fine / 24 px coarse** — not 14/18. The escape hatch is spelled out in the token comment
(`tokens/offsets-sizing.css:174-177`: *"KEEPING the `:not([class*=size-])` host-sized-icon escape intact
(an explicit `size-9` still wins)"*) — and `h-3.5 w-3.5` does not contain `size-`, so it does not take it.
**Both classes are dead code that looks live.**

**At 7.0.0** the same rule moves into colocated CSS: `git show v7.0.0:src/components/button/styles.css`
opens `@layer components {` and declares `.button > svg:not([class*="size-"])` (`:35-37`), imported at
`src/styles/index.css:204`. Tailwind's `utilities` layer sorts *after* `components`, and **layer order
beats specificity** — so post-uplift the consumer's `h-3.5` wins and the glyphs shrink to 14 px / 18 px,
inside buttons that are 36–54 px tall. A silent icon-shrink on two controls, in a wave whose budget
mentions neither.

> **Falsifier.** (a) The decisive artefact is a *built* stylesheet. `web/dist/assets/index-57FkGzlZ.css`
> is dated **Jun 12** and returns `grep -c control-h-md` → **0**, i.e. it predates the 4.0.0 bump — it
> **cannot** settle this, and I do not cite it as if it could. Grep the F.W1 build output for
> `size-\(--ui-glyph\)` and for `\.h-3\\.5` to confirm both halves; mark the *direction of the 7.0.0 flip*
> **UNPROVEN-NEEDS-LIVE for SS-13**. (b) If Tailwind's scanner never reaches `dist/*.js`, the glass rule is
> never emitted and `h-3.5` wins today too — then the 4.0.0 half dies and the 7.0.0 half is a no-op; the
> `@source` directive at `dist/styles/index.css:222` plus fourier's `style.css:3` `@import
> "@mkbabb/glass-ui/styles"` are the mechanism that makes it reach. (c) lucide's `width`/`height`
> presentation attributes lose to any CSS rule, so they never decide it. (d) The clean cure is
> `size-3.5` / `size-4.5`, which wins in *both* worlds.

### D-14 · MAJOR · The panel contributes no document structure — two "section titles" that are `<span>`s

`CollapsibleSection.vue:38-41` renders the title as
`<span class="cm-serif text-sm font-semibold tracking-tight">{{ title }}</span>` inside a
`<CollapsibleTrigger>` — no `<h2>`/`<h3>`, no `role="heading"`, no `aria-level`. FunctionInput mounts two
(`:94`, `:176`), so the entire left rail of `/equation` exposes **zero headings**. Screen-reader heading
navigation (the primary skim idiom) finds nothing; the visual hierarchy — semibold CM Serif, an em-dashed
subtitle, a rotating chevron — is purely presentational.

The subtitles compound it: `subtitle` renders as `— f(x)` and `— harmonics & display` (`:40`), i.e. the
accessible name of the disclosure trigger becomes `"Function — f(x)"` and `"Controls — harmonics &
display"`. Serviceable, but it is a *button* name, not a section name; nothing associates the disclosed
content with it (`CollapsibleContent` at `:45` carries no `aria-labelledby`).

> **Falsifier.** (a) reka-ui's `CollapsibleTrigger` might inject heading semantics — it does not; the
> WAI-ARIA disclosure pattern deliberately leaves the wrapping heading to the author. (b) A host-level
> heading would soften it — `grep -n "<h[1-6]" EquationView.vue` → the route shell has none in the left
> column. (c) Owned by `CollapsibleSection.vue`; cross-filed to that sibling lane, counted here because
> both instances are authored at `:94` / `:176` and the fix is a prop this component would pass.

---

## §3 — MINOR

### D-15 · MINOR · π cannot render in the font the domain fields declare

The two domain fields are `fira-code` (`:123`, `:135`) and their whole reason to exist is π-formatted
values — `formatDomain` (`:62-78`) emits `π`, `-π`, `2π`, `π/2`, `3π/4`, and the placeholder is `2π`
(`:138`). But the served face excludes Greek:

```
web/public/fonts.css:69-78   @font-face { font-family: "Fira Code"; …
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
                   U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122,
                   U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
$ grep -c "03C0\|0370-03FF" web/public/fonts.css   →  0
```

U+03C0 is in no served range, so π falls down `--font-mono: "Fira Code", "Fira Code Fallback", "Fira Mono",
monospace` (`glass-ui dist/styles/tokens/scheme-motion.css:46`) — neither middle family is self-hosted —
to the platform monospace. The field renders **digits and slashes in Fira Code beside a π in
Menlo/Consolas/Courier**: different width, different weight, different x-height, inside an 80 px box.

> **Falsifier.** (a) A "Fira Code Fallback" face with a Greek range — `grep -n "font-family"
> web/public/fonts.css` lists exactly three families (CM Serif, Fraunces, Fira Code) and no fallback face.
> (b) A platform Fira Code installation would mask it locally — that is the point: it renders differently
> per machine. (c) The exact substituted face is per-OS, hence **UNPROVEN-NEEDS-LIVE for SS-13**; the
> *substitution itself* is decided by the shipped `unicode-range`.

### D-16 · MINOR · Container padding is smaller than the rhythm it contains (proportion inversion)

`:93` and `:175` — `class="cartoon-card px-3 py-2"` → 12 px inline, **8 px block**. Inside, the content
gap is `space-y-3` = **12 px** (`:95`, `:177`), the section gap is `space-y-3` = 12 px (`:91`), and the
presets divider adds `pt-3` = 12 px (`:154`). So every internal gap (12 px) exceeds the container's own
block padding (8 px): the panel's contents are closer to its top and bottom edges than to each other —
the classical inversion (a frame must not be tighter than the intervals it frames). The inline/block
asymmetry (12/8) has no compensating reason: `cartoon-surface` contributes border + shadow + translate
only, no padding (`glass-ui dist/styles/cards.css:33-48`; the fourier shim `style.css:107-111` adds only
`border-color` + `background`).

The mismatch is visible in one more place: `CollapsibleSection` adds `py-1.5` on the trigger and `pb-1`
on the content (`CollapsibleSection.vue:36,46`), so the *measured* space above the title is 8 + 6 = 14 px
while the space between the fields is a flat 12 px — three different vertical intervals (6/8/12) doing
one job.

> **Falsifier.** (a) A `cartoon-card` padding declaration would settle it — the shim (`style.css:107-111`)
> declares none, and the upstream `@utility cartoon-surface` declares none. (b) Root font-size scaling
> (`style.css:40-50`, 1.125rem → 1rem at 768 px) scales *rem* text, not these `px`-fixed spacing utilities
> (Tailwind v4 `--spacing` is a fixed 0.25rem rung — it does scale with root size, but *uniformly*, so the
> 8 < 12 relation is invariant). (c) Aesthetic judgement is contestable by construction; the *arithmetic*
> (8 px frame vs 12 px interval) is not.

### D-17 · MINOR · Three `!important`s that were never needed

`:250-254` forces `color` / `border-color` / `background` with `!important`. They are unnecessary: Vue SFC
scoped styles are injected **unlayered**, while every Tailwind/CVA utility they could collide with lives in
`@layer utilities` (fourier's cascade opens `@import "tailwindcss"` at `style.css:1`, which declares
`@layer theme, base, components, utilities`). Unlayered declarations beat *any* layered declaration
regardless of specificity, so `.is-auto-active[data-v-…]` already wins outright — as `.compute-btn:hover`
(`:235-239`) and `.preset-pill.is-active` (`:244-248`) demonstrate in the same file **without**
`!important`. The inconsistency is the tell: three sibling rules, one arbitrarily escalated.

The cost is deferred: `!important` will also override glass-ui 7.0.0's `emphasis`/`tone` paint after
D-12's migration, silently defeating whichever `tone` the port chooses.

> **Falsifier.** (a) If the SFC style block were compiled into a layer the ordering flips — Vite's Vue
> plugin injects scoped `<style>` as a plain stylesheet; the file declares no `@layer` (`:231`). (b) The
> block does carry `@reference "tailwindcss"` in the *sibling* `SliderControl.vue:95` but not here, so no
> `@apply`-layer subtlety applies. (c) If the tint genuinely lost without `!important`, the two
> unescalated sibling rules in the same file would lose too — they do not.

### D-18 · MINOR · `border-radius: 9999px` re-declares what `size="sm"` already applied

`:242` `.preset-pill { border-radius: 9999px }` and `NotationPills.vue:38` `.notation-pill { … }` both
re-state a radius the variant already sets: `size: { sm: "h-(--control-h-sm) rounded-pill px-3" }`
(`dist/button-BNDWhAZb.js`), and `--radius-pill: 9999px` (`dist/styles/theme/radius.css:25`). Two hard
literals shadowing one token, in a file that otherwise reads tokens correctly.

> **Falsifier.** (a) If `rounded-pill` were not emitted (scanner reach, D-13) the local rule would be
> load-bearing — it is emitted by the same `@source` path that emits the rest of the variant. (b) The
> values are numerically identical, so nothing renders differently today; the defect is a token bypass
> that will silently survive a `--radius-pill` retune. (c) Retired for free by `Chip` (D-12), whose base
> composes `glass-capsule`.

### D-19 · MINOR · Non-interactive containers advertise interactivity with a hover lift

Both panels are `cartoon-card` (`:93`, `:175`), which composes `cartoon-surface`
(`style.css:107-111` → `glass-ui dist/styles/cards.css:33-48`):

```
&:hover:not(:disabled) { translate: var(--lift-sm) var(--lift-sm);   /* -1px, -1px */
                         box-shadow: var(--shadow-cartoon-lg); }
```

Neither panel is clickable, focusable, or a link — the hover response is a promise the container cannot
keep, and it fires for the whole panel whenever the pointer crosses *any* of its children (including while
the user is aiming at a 28 px domain field). `cards.css` carries **no** `prefers-reduced-motion` block
(`grep -c prefers-reduced-motion cards.css` → 0) and neither does `style.css`'s cartoon shim — though at
`--lift-sm: -1px` over `--duration-normal: 0.3s` (`tokens/offsets-sizing.css:10`,
`tokens/scheme-motion.css:68`) the PRM exposure is genuinely sub-threshold; **the affordance lie is the
defect, not the motion.** Stated that way deliberately: the lane-frontend PRM census (`:612-624`) should
not inherit a fourth false positive here.

> **Falsifier.** (a) A global PRM transition-reset in glass-ui would gate it — the 18 PRM blocks in
> `dist/styles/` are all selector-scoped (drawer, view-transition, segmented-tabs, paper, specular-track,
> icon-chip, animations ×3, instrument-chassis, transitions, scroll-driven); none is a universal reset.
> (b) `:hover:not(:disabled)` matches a `<div>` (a div is never `:disabled`). (c) If a future wave makes
> the panels clickable the lift becomes correct — then the fix is the opposite one (add the role), which
> is why this is MINOR and not MAJOR.

### D-20 · MINOR · The domain range is three unrelated controls, not a labelled pair

`:114-140`. The visible label `Domain` is `for="fn-domain-start"` (`:115`) — it names the *first* field
only. The second field (`:129-139`) has **no `id`** at all, so no `<label>` can ever point at it; it
survives on `aria-label="Domain end"` alone (which, being an `aria-label`, also *suppresses* the visible
"Domain" text from the first field's name — that field announces "Domain start", not "Domain"). The `to`
separator is a bare `<span class="text-sm text-muted-foreground">` (`:128`) with no programmatic relation
to either field. There is no `<fieldset>`/`<legend>`, no `role="group"` + `aria-label="Domain"`, so the
three elements form a visual triple and a semantic scatter.

> **Falsifier.** (a) WCAG 2.5.3 (Label in Name) still passes — the accessible name "Domain start"
> *contains* the visible "Domain". (b) `aria-label` legitimately overrides `<label>`; the defect is the
> asymmetry (one field `id`-anchored, one not) and the absent group, not the labels themselves.
> (c) `grep -n "id=" FunctionInput.vue` → two hits (`:99`, `:117`), for three inputs.

### D-21 · MINOR · Prose: a collapsing placeholder, two registers, and one piece of unmatched jargon

- `:108` `placeholder='e.g. x*(pi - x)  or  sin(2*x) + cos(3*x)'` — the deliberate double-spaces around
  `or` are HTML attribute whitespace and collapse at render; the intended visual separation is lost.
- Register drift across two sibling headers: `subtitle="f(x)"` (`:94`) is a formula, `subtitle="harmonics
  & display"` (`:176`) is lowercase prose with an ampersand. `CollapsibleSection` renders both through the
  same em-dashed slot (`:40`), so they read as one list with two voices.
- `:215` `subtitle="shown in expanded (a+b) view"` names a view that **no visible control in this
  component or its host offers**. The mode toggle is `EquationModeToggle` (`EquationView.vue:270`) whose
  states are `expanded`/`sigma` (`lib/equation/types.ts:22`); the notation pills next to this very slider
  are labelled `Trig` / `Exp` / `Polar` (`notation.ts:15-17`). "(a+b)" appears nowhere else in the tree.
- `:200` "Auto (Parseval's theorem)" then `:203` "≥99.99% of total energy ‖f‖²" — good, precise, and
  entirely locked inside a hover surface (D-11).

> **Falsifier.** (a) `white-space: pre` on the placeholder would preserve the spacing — no such rule
> (`:103-107`). (b) The `(a+b)` gloss might be shorthand for the trig `aₙcos + bₙsin` pair, which is
> plausible and still unmatched by any label the user can see. (c) `grep -rn "(a+b)" web/src/` → the
> single site at `:215`.

### D-22 · MINOR · Enter submits from one field of three

`:102` `@keydown.enter="emit('compute')"` is on the expression field only. Pressing Enter in either domain
field does nothing (there is no `<form>`, so there is no implicit submission), even though those fields
`@change`-commit and are the other half of the same request. Two adjacent text inputs, two different
keyboard contracts.

> **Falsifier.** (a) A `<form @submit.prevent>` wrapper would unify it — `grep -n "<form"` → empty.
> (b) Whether Enter fires `change` on a bare text input before any handler is engine-dependent; the claim
> here is only that **no Enter handler exists** on `:116-127` / `:129-139`, which is textual.

---

## §4 — INFO

### D-23 · INFO · `:default-open="true"` is the prop's own default

`:94` passes `:default-open="true"`; `CollapsibleSection.vue:10-12` already declares
`withDefaults(…, { defaultOpen: true })`. `:176` omits it and gets the same behaviour — so the two sibling
call sites disagree about whether to state it. Harmless; noted because it is the kind of drift the F.W4
per-component pass should normalise rather than re-audit.

### D-24 · INFO · No behavioural test touches this component, and the idiomatic `#actions` seat is unused

`grep -rn "equation" web/e2e/*.spec.ts` returns one hit: `visual-baseline.spec.ts:34
{ slug: "equation", path: "/equation" }` — a screenshot slug. No spec exercises the expression field, the
domain parser, the presets, the wand, or either slider; `vitest` is absent tree-wide
(`lane-frontend.md:48`). Every defect above is therefore un-regressed by construction — which is also why
`CENSUS-2026-08-03.md` §5 risk 10 ("uplift lands with no unit-test net") lands hardest on exactly this kind
of file.

Separately, `CollapsibleSection` exposes an `<slot name="actions" />` in the header row
(`CollapsibleSection.vue:43`) that this file never uses — the idiomatic seat for Compute (or the wand),
which would also cure the "primary action buried under two fields" ordering.

---

## §5 — Superlatives (L-18: each carries its own falsifier)

**S-1 · `formatDomain` is genuinely excellent typography-of-data.** `:62-78` renders a float as the
mathematician's own notation: `0`, `π`, `-π`, `2π`, then a rational sweep over denominators `[2,3,4,6]`
emitting `π/2`, `3π/4`, `-π/6`, falling back to `toFixed(4)` with trailing-zero strip. Most UIs would show
`3.1416`. *Falsifier:* the `1e-10` epsilon is absolute, not relative, so it degrades for very large
multiples (`r = 1e9 + 0.5` mis-rounds) — irrelevant inside a Fourier domain, and the fallback is correct
anyway. The trailing-strip regex `/\.?0+$/` also mangles a legitimate integer like `100` → `1`; reachable
only for a domain endpoint that is an exact multiple of 10 with no fractional part and no π relation —
worth a one-line fix, not enough to retract the praise.

**S-2 · The parser accepts the notation it prints, in both alphabets.** `:45` normalises `π` → `pi` and
strips whitespace before matching, so a user can type `pi/2`, `π/2`, `2*pi`, `-pi`, or `3.14` and all
land. Round-tripping print↔parse in a formula field is the rare correct choice. *Falsifier:* it does
**not** accept what it prints in one case — `formatDomain` emits `3π/4` and the regex's coefficient group
`([+-]?\d*\.?\d*)` does accept `3`, so the round trip holds; but `2π/3` printed as `2π/3` re-parses via
the same arm, and `-π` (U+2212-free hyphen) parses. The genuine hole is `tau`/`e`, which is D-3's
territory — a missing *error* path, not a missing parse.

**S-3 · `SliderControl` names both of its controls, correctly and differently.** `SliderControl.vue:66-80`
wraps the visible text and the numeric input in one `<label>` (implicit association → the number field is
named "Harmonics — terms in the Fourier sum") while passing `:aria-label="label"` to the `Slider`
(`:87`) so the range gets the short name. Two controls, one visible label, two correct accessible names —
this is the pattern most wrappers get wrong. *Falsifier:* the doubled name means a screen-reader user
hears "Harmonics" twice while tabbing the row; correct, if verbose. And it does not rescue D-9/D-10, which
are value-domain defects, not naming ones.

**S-4 · The fourier-local `--viz-amber` darken is load-bearing for this component.**
`style.css:113-122` overrides light `--viz-amber` from glass-ui's `hsl(35 70% 42%)` to `hsl(35 76% 35%)`.
That override is exactly what puts the wand's active glyph at **4.62:1 vs the card** (and 4.19:1 against
its own 8 % tint) — clearing 1.4.11's 3:1 for a graphical control with room to spare. The upstream value
would not have. A carry that is doing real work in the file under audit. *Falsifier:* the glyph is
non-text, so the applicable bar is 3:1, which the upstream token also clears (≈3.5:1) — the darken buys
margin, not a pass. It *is* a pass-maker for any `--viz-amber` **text**, which is what
`lane-frontend.md:602` books it for.

**S-5 · The two domain fields are named.** `:119` / `:131` carry `aria-label="Domain start"` /
`"Domain end"` — the author demonstrably knew that a field without a `<label for>` needs one, which is
what makes the wand's missing name (D-4) an omission rather than an ignorance. *Falsifier:* naming two of
three unlabelled controls is not a system; the third (`#fn-expression`) is properly `<label for>`-bound at
`:97`, so the coverage is real — it is the *button* that was missed.

**S-6 · `spellcheck="false"` + `autocomplete="off"` on the formula field.** `:109-110` — precisely right
for a code-shaped input, and rarer in the wild than it should be. *Falsifier:* `autocorrect`/
`autocapitalize` are absent, so iOS Safari may still capitalise the first character of an expression;
`inputmode` is also unset, so the numeric-adjacent domain fields raise the full alphabetic keyboard on
mobile. A near-miss, not a miss.

**S-7 · `CollapsibleSection` gates its disclosure animation on reduced motion, with a written provenance
note.** `CollapsibleSection.vue:66-71` retires `collapsible-open`/`collapsible-close` under PRM, and
`:57-59` records *why* the consumer-side shadow rules were excised ("A.W3.d — canonical glass-ui
animations … the consumer-side shadow rules have been excised"). This is the discipline
`lane-frontend.md:612-624` credits the tree with. *Falsifier — and it is a real one:* the same file's
`watch(open, …)` at `:17-30` fires `el.scrollIntoView({ behavior: 'smooth' })` after a 250 ms timer with
**no** PRM guard, so opening a section still smooth-scrolls the rail under `prefers-reduced-motion:
reduce`. The CSS half is exemplary; the JS half is not. Cross-filed to the `CollapsibleSection` sibling
lane — counted there, not in this file's tally, since both instances here mount `default-open` and the
watcher does not fire on first paint.

---

## §6 — What F.W1 must budget for this file

1. **D-12 first, or nothing else can land.** All 13 Button instances in this subtree re-axe
   (`variant` → `emphasis` + `tone`; `size="icon"` → `iconOnly`). This break is in **neither** the census
   list **nor** glass-ui's `CHANGELOG.md`/`MIGRATION.md`. Relay the doc gap to the glass BH inbox per the
   standing formation invariant (`feedback-glassui-bhbi-relay`).
2. **Take the two gifts that come with the break**: `Button loading` cures half of D-2; `Chip
   mode="selectable"` cures D-5's missing `aria-pressed` **and** D-18 for eleven pills (eight here, three
   in `NotationPills`) — the extension of `lane-frontend.md:441`.
3. **Adopt `@mkbabb/glass-ui/forms`** for the three inputs (D-1, D-3, D-6, D-8 in one move: perceivable
   boundary, `[aria-invalid]` ring, token placeholder, `--ui-scale`/44 px floor). Tree-wide this is 18 raw
   `<input>` over 13 files — the census's "cleanest glass consumer" claim has exactly one hole and this is
   it.
4. **Re-verify the glyph rule direction** (D-13) against the F.W1 build, not against `web/dist` (stale,
   Jun 12), and convert `h-3.5`/`h-4.5` → `size-3.5`/`size-4.5` so the answer stops depending on layer
   order.
5. **Wire the host's already-computed `loading`** (`EquationView.vue:57`, currently consumer-less) and give
   the mobile arm a local outcome echo or an auto tab-switch (D-2).
6. **Nine mounted tooltips, two callsites** — F.W3's `ui/tooltip` disposition (R3-7a) must re-verify
   instances here, and must not migrate the *content* strategy unchanged: D-11 says the preset semantics
   need a non-hover home first.
