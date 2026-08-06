claude-opus-5[1m] (served model id)

# CHALLENGE — `NotationPills` · axis **D · DESIGN**

**Subject.** `fourier-analysis/web/src/components/equation/NotationPills.vue` (47 lines), at fourier
HEAD `cd26c65` (clean for this path and for `web/src/lib/equation/notation.ts` — `git status
--porcelain` on both → empty, so nothing below is a working-tree artifact).

**Read whole (read-only), the complete import closure:**

| file | why |
|---|---|
| `web/src/components/equation/NotationPills.vue` | subject |
| `web/src/lib/equation/notation.ts` | `NOTATION_OPTIONS` — the label/icon/color table |
| `web/src/lib/equation/types.ts` | `NotationMode` |
| `node_modules/@mkbabb/glass-ui/dist/button.d.ts` + `button-BNDWhAZb.js` | the **installed 4.0.0** `Button` + its full CVA |
| `…/glass-ui/dist/styles/glass/surfaces.css` · `utilities/base.css` · `typography/utilities.css` · `tokens/offsets-sizing.css` · `tokens/light-dark.css` · `tokens/color-radius.css` · `tokens/dark-arm.css` · `typography/scale.css` · `index.css` | `.btn-pill` / `.tap-squish` / `.focus-ring` / `.cm-serif` / the control + type + colour tokens + the layer order |
| `web/src/style.css`, `web/index.html`, `web/public/fonts.css` | the app's token overrides, the pre-paint dark boot, the font corpus |
| `web/src/components/equation/FunctionInput.vue` · `web/src/components/visualization/EquationPanel.vue` | **both** hosts |
| `web/src/components/visualization/BasisSelector.vue` | the archetype `notation.ts:5-7` explicitly names |
| `web/e2e/visualization-ux.spec.ts` | the axe keystones (coverage question) |
| `glass-ui@7.0.0` (producer, `/Users/mkbabb/Programming/glass-ui`): `src/components/button/Button.vue`, `chip/{Chip.vue,chipVariants.ts,index.ts}`, `toggle-group/`, `styles/utilities/base.css`, `package.json` | the F.W1 uplift delta |

**Hitherto corpus folded, not re-invented:** `formation/fourier/lane-frontend.md` (§4 shadow table row
for this file, §5 uplift break surface), `CENSUS-2026-08-03.md`, and the adjudicated
`audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (rows **R3-7a**, **R5-7** cited below; **X-9**
noted). One explicit contradiction of lane-frontend is filed at **I-3**.

**Posture.** Assumed defective until the tree proved otherwise. It did not, twice over: the component
is a *degraded copy of an archetype living 200 lines away in the same repo*, and it is one of the
files the F.W1 uplift will break in a way **the census break surface does not list**.

**Verdict: 19 defects — 2 BLOCKER · 8 MAJOR · 6 MINOR · 3 INFO — and 3 genuine superlatives.**

---

## §0 · The one-paragraph reading

`notation.ts:3-8` states the design intent in prose: *"matching the `.basis-toggle` pattern from
BasisSelector (glass-ui `<Button variant="outline" size="sm">` with **`aria-pressed` driving an
instance-scoped tint**)."* The tree does not match that prose. `BasisSelector.vue:144` binds
`:aria-pressed` and tints from `[aria-pressed="true"]` (`:269`); `NotationPills.vue:16-30` binds **no
ARIA at all** and tints from a bespoke `.notation-active` class. Everything downstream — the dead
hover, the inverted contrast hierarchy, the missing mobile compaction, the invisibility to assistive
tech — falls out of that single divergence. This is not a component with a bug; it is a component
that *documents* the correct pattern and then implements a lossy paraphrase of it.

---

## §1 · BLOCKERS

### B-1 · The selection state does not exist for anything but a sighted eye — BLOCKER

**Provenance.** `NotationPills.vue:16-30` — the whole `<Button>` element. There is no `aria-pressed`,
no `role="radiogroup"`/`role="radio"`, no `aria-label`/`aria-labelledby` on the wrapper
(`NotationPills.vue:15`), no `aria-current`. The wrapper `<div class="flex flex-wrap justify-center
gap-1.5">` is a bare presentational box; the three children are three unrelated generic buttons.
`grep -n "aria\|role=" NotationPills.vue` → **0 hits.**

The active pill is distinguished by exactly three properties, all colour
(`NotationPills.vue:36-40`): `background`, `border-color`, `color`. No weight change, no icon, no
underline, no shape delta, no text delta.

**Why it is a BLOCKER and not a MAJOR.** Three independent WCAG failures compound on one control:

1. **4.1.2 Name, Role, Value** — a toggle with no programmatic state. A screen-reader user hears
   "Trig, button / Exp, button / Polar, button" and can never learn which notation is rendering the
   equation they are being read.
2. **1.4.1 Use of Colour** — colour is the *sole* carrier of the selection.
3. **2.4.3/1.3.1 grouping** — three mutually-exclusive options with no group semantics and no
   accessible group name; keyboard users tab through three peers with no arrow-key roving and no
   signal that they are one control.

And the repo *already knows how*: `BasisSelector.vue:144` (`:aria-pressed="isBasisActive(...)"`) is
the same author's same idiom on the same `<Button variant="outline" size="sm">`, and it is what
`notation.ts:5-7` says this file does.

**Falsifier.** Show `aria-pressed`, `role`, `aria-current`, or any non-colour differentiator on the
active pill anywhere in the closure — the SFC, the `Button` CVA (`button-BNDWhAZb.js`: the `outline`
variant string carries `aria-pressed:bg-accent aria-pressed:text-accent-foreground`, i.e. glass-ui
*offers* the hook and the consumer never sets the attribute that fires it), or a global rule. Any one
of those refutes B-1. I found none. *(Note the sharp corollary: because `aria-pressed` is never bound,
the `aria-pressed:*` legs glass-ui ships on `outline` are **dead code at this callsite** — the vendor
built the state affordance and the consumer routed around it.)*

**Not covered by any gate.** `web/e2e/visualization-ux.spec.ts:27-42` is the only axe harness
(`wcag2a/2aa/21a/21aa`, serious+critical). Its four keystones open the workspace `/w` surface. This
component renders in exactly two places, **neither of them scanned**: `EquationPanel.vue:96`, which is
behind `v-if="showEquation && store.epicycleData && !isEditing"` (`VisualizationView.vue:231`) and is
never opened by any keystone; and `FunctionInput.vue:223`, on the `/equation` route, for which no axe
spec exists (`grep -rn "notation\|Trig\|Polar" e2e/` → 0 hits). Keystones 1 and 2 are additionally
`test.fixme`. **NotationPills has zero a11y coverage of any kind.**

---

### B-2 · Every active pill fails WCAG AA contrast in dark mode — BLOCKER

**Provenance.** `notation.ts:16-18` (three hardcoded `hsl()` literals, no light/dark arm) consumed at
`NotationPills.vue:23` → `--pill-color` → `NotationPills.vue:39` `color: var(--pill-color)`.

Dark `--background` = `--neutral-0` = `hsl(24 9% 4%)`
(`glass-ui/dist/styles/tokens/dark-arm.css:42`; `color-radius.css:57` binds `--background:
var(--neutral-0)`). Relative luminance ≈ **0.0031**. Light `--background` = `hsl(40 30% 98%)`
(`color-radius.css:40`), L ≈ **0.9598**.

| option | `notation.ts` | sRGB | L | vs **light** bg | vs **dark** bg |
|---|---|---|---|---:|---:|
| Trig | `hsl(6, 72%, 49%)` :16 | 215, 53, 35 | 0.1710 | **4.57:1** (bare pass) | **4.16:1 ✗** |
| Exp | `hsl(224, 58%, 46%)` :17 | 49, 86, 185 | 0.1082 | 6.38:1 ✓ | **2.98:1 ✗✗** |
| Polar | `hsl(286, 46%, 47%)` :18 | 149, 65, 175 | 0.1327 | 5.53:1 ✓ | **3.44:1 ✗** |

The label is normal-size text (`--control-text` = `calc(var(--type-small) * var(--ui-scale))`,
`offsets-sizing.css:170`; `--type-small` floor 0.875rem, `typography/scale.css:105`), so the bar is
**4.5:1**. All three fail; `Exp` fails even the 3:1 large-text floor. These are *conservative* numbers —
the real substrate is `color-mix(in srgb, var(--pill-color) 12%, transparent)` over the card
(`NotationPills.vue:37`), which in dark mode lifts the backing luminance toward the text colour and
lowers each ratio further.

**Dark mode is not hypothetical.** `web/index.html:22-29` runs a pre-paint script that adds `.dark`
from `localStorage` *or* `prefers-color-scheme: dark`. A first-time visitor on a dark-set OS lands in
dark mode before first paint.

**The repo has already fixed exactly this defect once, three files away.** `web/src/style.css:113-127`
(`D.W4.d`): *"glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)` ≈ 3.54:1 against `--background`
— fails WCAG AA for normal text. The override darkens to `hsl(35 76% 35%)` ≈ 4.6:1 (clears AA).
Dark-mode value stays put."* — a `:root` / `.dark` split, with the ratio computed in the comment. The
same team, the same axis, the same arithmetic. `NOTATION_OPTIONS` never got the treatment because it
never got scanned (see B-1's coverage note), and because the axe harness runs at Playwright's default
`colorScheme: 'light'` — **the light arm is the only one any gate has ever seen.**

**Falsifier.** Recompute the three ratios (any WCAG contrast calculator) against `hsl(24 9% 4%)`; or
demonstrate that `.dark` re-binds `--pill-color`, or that a `.dark` arm of `NOTATION_OPTIONS` exists —
`grep -rn "dark" web/src/lib/equation/notation.ts` → 0 hits; `grep -rn "pill-color"
web/src/components/equation/` → the two lines in this SFC only. Exact composited ratios over the real
`--card` plate are **UNPROVEN-NEEDS-LIVE (SS-13)**; the direction of the error is not — the 12% tint
moves every dark-mode ratio *down*.

---

## §2 · MAJOR

### M-1 · The selection cue *lowers* contrast — the chosen item reads weaker than the rejected ones — MAJOR

Resting pills take `variant="outline"`, whose CVA string (`button-BNDWhAZb.js`, `outline`) sets
`border border-input bg-background` and **no text colour** — so they inherit `--foreground` =
`hsl(24 10% 10%)` on `hsl(40 30% 98%)` ≈ **16:1**. The *selected* pill is overridden to
`var(--pill-color)` (`NotationPills.vue:39`) at **4.6–6.4:1** (§B-2 table). The act of choosing an
option makes its label roughly **three times lower-contrast than the two options you rejected.**

The archetype does not have this problem because it sinks the resting state first:
`BasisSelector.vue:262` — `color: var(--muted-foreground)` on `.basis-toggle`, so
`[aria-pressed="true"]`'s tint is a genuine *step up* in salience. `NotationPills` copied the pressed
half of the pattern and dropped the resting half.

**Falsifier.** Show a resting-state colour declaration for `.notation-pill`
(`NotationPills.vue:31-35` sets only `border-radius`, `min-width`, `justify-content`), or show that
`--foreground` does not apply. Neither holds. Perceptual "reads weaker" is
**UNPROVEN-NEEDS-LIVE**; the ratio inversion is arithmetic.

### M-2 · The selected pill has no hover and no press feedback — a cascade-layer defect, MAJOR

`.notation-active` (`NotationPills.vue:36-40`) is a **Vue SFC scoped rule**, therefore **unlayered**.
Its competition is entirely *layered*:

- Tailwind v4 declares `@layer theme, base, components, utilities;` (`node_modules/tailwindcss/index.css:1`,
  pulled by `web/src/style.css:1`).
- The `outline` variant's `hover:bg-accent hover:text-accent-foreground active:bg-accent/80`
  (`button-BNDWhAZb.js`) compile into **`@layer utilities`**.
- glass-ui's `.btn-pill` surface rules live in **`@layer components`**
  (`glass/surfaces.css:6` `@layer components {` … `:119 .btn-pill {`).

Unlayered declarations beat *every* layered declaration regardless of specificity or source order. So
`.notation-active`'s `background` / `border-color` / `color` win unconditionally, and **the active
pill's hover and `:active` states are dead**: pointing at the currently-selected notation and pressing
it produces no surface change whatsoever. The only surviving press signal is the scale squish — which
is itself broken under PRM (M-8).

Again the archetype is correct and explicit: `BasisSelector.vue:274-277` ships a dedicated
`.basis-toggle[aria-pressed="true"]:hover { background: color-mix(… 16% …) }` — a 12%→16% step
authored *precisely* to solve this. And `FunctionInput.vue:257-261` shows the author hitting the same
cascade wall a third time and reaching for `!important` on `.is-auto-active`. Three sites, three
different remedies, one of which (this one) is simply absent.

**Falsifier.** Delete `.notation-active`'s `background` and observe whether `hover:bg-accent` paints;
or DevTools the computed `background-color` of an active pill under `:hover` (**UNPROVEN-NEEDS-LIVE**
for the pixel, statically decidable for the cascade). Refuted if fourier moves scoped styles into a
layer — `grep -rn "@layer" web/src/components/equation/NotationPills.vue` → 0 hits.

### M-3 · The F.W1 uplift **hard-breaks this file**, and the census break surface does not list the reason — MAJOR

`lane-frontend.md:102-105` / `CENSUS §…` enumerate the 4.0.0→7.0.0 break surface as: `metric-badge`
×7 files, `hover-card` ×2, `hover-popover` ×2, dock members (`DockIconButton` ×2,
`DockDropdownTrigger` ×1), and `ToastVariant` definition-absent. **`Button` is not on that list.** It
should be:

| | installed 4.0.0 (`button-BNDWhAZb.js`) | producer 7.0.0 (`glass-ui/src/components/button/Button.vue:15-40`) |
|---|---|---|
| props | `variant`, `size`, `class`, `type`, `disabled`, `asChild`, `as` | `emphasis`, `tone`, `size`, `iconOnly`, `loading`, `type`, `disabled`, `class` + `PrimitiveProps` |
| `variant` | 13 values incl. **`outline`** | **DOES NOT EXIST** |
| `size` | `default·xs·sm·lg·icon·icon-sm` | `xs·sm·md·lg` (**`default`/`icon`/`icon-sm` gone**) |
| base class | `btn-pill tap-squish focus-ring …` + a big CVA | `"button tap-squish focus-ring"` + glass classes (`:68-72`) |
| `type` default | **none** → implicit `submit` | `props.type ?? "button"` (`:55`) |

`NotationPills.vue:19` passes `variant="outline"`. At 7.0.0 that is an undeclared prop on a
`defineProps`-typed component → **`vue-tsc` TS2322**, exactly the class of hard typecheck break the
census books for `ToastVariant` — and `lane-frontend.md:260-322` lists **22 `@mkbabb/glass-ui/button`
import sites**, so the real blast radius is an order larger than the five surfaces currently booked.
`size="sm"` survives; `variant` does not.

Second, quieter break: **`.btn-pill` no longer exists at 7.0.0** (`grep -rn "btn-pill"
glass-ui/src/styles/` → 0 hits; the base class is `.button`). Today `NotationPills.vue:32-34`'s
`border-radius: 9999px` and `justify-content: center` are *redundant* with `.btn-pill` (see m-2);
after the uplift they silently become load-bearing, and `min-width: 4.5rem` starts composing against a
different geometry.

**Falsifier.** `grep -n "variant" glass-ui/src/components/button/Button.vue` → 0 hits (only `emphasis`
and `tone`). Refuted if 7.0.0 ships a compat shim accepting `variant` — the repo's own standing law
forbids exactly that (`feedback_no_backwards_compat`), and none is present.

**The uplift also IMPROVES this file, and that belongs in the same row** (the axis asks for both):
7.0.0 exports **`./chip`** — `Chip.vue` with `mode="selectable"` over reka-ui's `Toggle` (native
`aria-pressed` + `data-state`), a `tone` prop that resolves to `--glass-fill-tint` at
`--chip-glass-strength, 12%` (`chip/Chip.vue:56-67`, `chipVariants.ts:3-7`) — *literally the 12%
colour-mix idiom this file hand-rolls* — plus `./toggle-group` (`ToggleGroup.vue:27,71-96`,
`type="single"` with a validated selection model). B-1, M-1 and M-2 all evaporate on that migration.
lane-frontend §4 already flags this file as a **CANDIDATE SHADOW** (`./toggle-chip` at 4.0.0 →
`./chip` at 5.0.0+); this challenge upgrades the flag: `./toggle-chip` **exists at the pinned 4.0.0
today** (`dist/toggle-chip.js`, `dist/components/custom/toggle-chip/ToggleChip.vue.d.ts`), so the
shadow is not merely a post-uplift opportunity — it is a **glass-ui-first precept violation at the
current pin.**

### M-4 · No coarse-pointer / mobile compaction — the archetype needed it, this file omits it — MAJOR

At `@media (pointer: coarse)` glass-ui sets `--ui-scale: var(--ui-coarse-scale, 1.5)` and
`--control-floor: var(--touch-target, 2.75rem)` (`tokens/light-dark.css:17-22`); fourier never
overrides either (`grep -rn -- "--ui-scale\|--ui-coarse-scale" web/src/` → 0 hits). So on a phone:
`--control-text` ≈ 1.5× (`offsets-sizing.css:170`), `.btn-pill` gap 0.375rem→9px
(`glass/surfaces.css:131`), height `max(2.25rem×1.5, 2.75rem)` = 54px (`offsets-sizing.css:150`) —
but the horizontal padding is Tailwind's fixed `px-3` from the `sm` size recipe (utilities layer beats
`.btn-pill`'s scaled padding), and `min-width: 4.5rem` is a fixed 72px. Rough arithmetic at a 390px
viewport puts the three pills plus gaps at **~350px** against an inner panel width of roughly
`390 − chrome − 2×10px` — i.e. right at or over the wrap threshold.

`BasisSelector.vue:279-287` carries the cure the archetype needed for the identical three-pill row:

```
/* Compact pills on mobile so all three fit on one line */
@media (max-width: 639px) { .basis-toggle { @apply px-2 gap-0.5; border-width: 1.5px; } … }
```

`NotationPills` has no media query at all. When it wraps, `justify-center` (`:15`) centres the orphan
— a widow pill on its own row under a left-aligned label.

**Falsifier.** Measure the rendered row width at 390×844 with `pointer: coarse`; if the three pills
fit on one line the wrap half of this claim is refuted (**UNPROVEN-NEEDS-LIVE, SS-13**). The
*structural* half — that the archetype it names required a compaction rule this file omits — is
static and stands regardless.

### M-5 · Zero state coverage: no loading, no error, no disabled — MAJOR

`NotationPills.vue:5-7` declares exactly one prop, `modelValue`. There is no `disabled`, no `loading`,
no `busy`. Its host `EquationPanel.vue` owns `loading` (`:22`) and `error` (`:23`), renders a spinner
at `:102-104` and an error line at `:105`, and drives a **300 ms `watchDebounced`** on
`notation.value` (`:60-64`) into an aborting network call (`:40-58`). The pills sit *above* that
region (`:96`) and reflect none of it:

- during an in-flight `simplifyCoefficients` the pills stay fully interactive and fully un-marked;
- on `error`, the pill that caused the failure still paints as successfully selected — the failure is
  reported 40px below, in a different visual register, with no association to the control;
- rapid switching fires 300 ms-debounced aborts with no affordance-level acknowledgement.

The 7.0.0 `Button` ships `loading` with `aria-busy` and activation suppression
(`glass-ui/src/components/button/Button.vue:28,41-43,56-58,94`) — the capability exists upstream and
is unconsumed. The *empty* state is genuinely not a risk (`NOTATION_OPTIONS` is a 3-entry module
const, `notation.ts:14-19`) and I do not flag it.

**Falsifier.** Show a `disabled`/`loading`/`aria-busy` binding in `NotationPills.vue` or at either
callsite (`EquationPanel.vue:96`, `FunctionInput.vue:223` — both are bare `<NotationPills
v-model="notation" />`). None exists.

### M-6 · The leaf hardcodes its container's alignment, and is therefore wrong in one of its two hosts — MAJOR

`NotationPills.vue:15` bakes `justify-center` into the component. In `EquationPanel` that is
consistent. In `FunctionInput` it is not:

| | `FunctionInput.vue` |
|---|---|
| Presets label | `:154` `<label class="text-sm font-medium text-muted-foreground mb-1.5 block">Presets</label>` |
| Presets row | `:155` `<div class="flex flex-wrap gap-1.5">` — **left-aligned** |
| Notation label | `:222` — the *byte-identical* label class, `>Notation<` |
| Notation row | `:223` `<NotationPills />` — **centre-aligned** |

Two chip rows, stacked, under two identical labels, in one panel column, on **two different
alignment axes**. That is a plain Aristotelian proportion failure — the eye is given a left rail by the
labels and both input rows, then one row abandons it. Layout belongs to the host; a 47-line leaf
should not be able to be wrong about it.

**Falsifier.** Read `FunctionInput.vue:154-155` and `:222-223` — identical labels, divergent
justification. Refuted only if a global rule re-justifies one of them; `grep -rn "justify"
FunctionInput.vue` shows `justify-end` used deliberately elsewhere (`:157` region, BasisSelector
`:123`), confirming the author does control this per-row and simply cannot here.

### M-7 · `.cm-serif` is a phantom: the math voice the icons are sized for never loads — MAJOR

`NotationPills.vue:26` puts the icon glyph in `cm-serif` at `text-[1.3em] font-semibold`. glass-ui
defines that utility as **`font-family: var(--font-serif-math, serif)`**
(`glass-ui/dist/styles/typography/utilities.css:60-67`, unchanged at 7.0.0 `src/styles/typography/utilities.css:78`).

**`--font-serif-math` is never defined.** `grep -rn "font-serif-math"` over `web/src/`, `web/index.html`,
`web/public/fonts.css`, and the entire shipped `@mkbabb/glass-ui/dist/styles/**` + `glass-ui.css` returns
**exactly one hit — the consumption site above.** fourier remaps `--font-sans` to Computer Modern
(`style.css:13-15`) and self-hosts the faces (`index.html:12-19`, `public/fonts.css:15-36`), but never
binds the token `.cm-serif` actually reads. So every `.cm-serif` glyph — this one and ~20 more sites
(`PaperSidebar`, `GalleryCard`, `BasisSelector.vue:148`, …) — falls back to the **generic `serif`**.

The consequence is specific to this component: `text-[1.3em]` and `min-w-[1.2em] h-[1em]`
(`NotationPills.vue:26-27`) are optical compensations sized for Computer Modern's small x-height and
narrow math italics. Applied to the system serif they are simply a 30%-oversized Times fragment
sitting next to a UI-font label.

**Falsifier.** `getComputedStyle(iconSpan).fontFamily` in the running app — if it returns
`"Computer Modern Serif"` this is refuted (**UNPROVEN-NEEDS-LIVE** for the rendered face; the token
gap is static and total). Also refuted by any `--font-serif-math` declaration I missed — I searched
all four plausible roots.

### M-8 · `prefers-reduced-motion` leak: the press squish still fires under PRM — MAJOR

glass-ui 4.0.0 retires the press transform under PRM in **`@layer components`**
(`utilities/base.css:258-280`):

```
.tap-squish:active { scale: var(--scale-press); }
@media (prefers-reduced-motion: reduce) { .tap-squish:active { scale: 1; } }
```

But the 4.0.0 `Button` CVA base *also* carries the Tailwind utility
**`active:scale-(--scale-press-btn)`** (`button-BNDWhAZb.js`, base string), which compiles into
**`@layer utilities`** — a strictly higher layer. The utilities-layer rule wins inside the PRM media
query too, so **every glass-ui 4.0.0 `Button` — including all three pills — still scales on press for a
user who has asked for reduced motion.** `NotationPills` adds no PRM handling of its own
(`grep -n "reduced-motion" NotationPills.vue` → 0 hits) and, because M-2 kills the surface cross-fade
on the active pill, the squish is the *only* press feedback that pill has — so PRM users get the one
signal they opted out of, and nothing else.

**Falsifier.** Emulate `prefers-reduced-motion: reduce` and read the `:active` computed `scale` — `0.97`
confirms, `1` refutes (**UNPROVEN-NEEDS-LIVE** for the readback; the layer arithmetic is static).

**Uplift note (an IMPROVE row for F.W1):** at 7.0.0 the Button class list is just `"button tap-squish
focus-ring"` (`glass-ui/src/components/button/Button.vue:68`) with **no `active:scale-*` utility**, and
the PRM reset is re-cut as `.tap-squish:not([data-press-armed]):active { scale: 1 }`
(`src/styles/utilities/base.css:289-297`) with the press moved to the JS `useLiquidPress`
(`:60-63`). The uplift **fixes M-8 for free.**

---

## §3 · MINOR

### m-1 · `min-width: 4.5rem` is inert, undocumented, and disagrees with the archetype it copies — MINOR

`NotationPills.vue:33`. The archetype's is `min-w-[5.5rem]`, and `BasisSelector.vue:249-257` documents
*why*: *"the 5.5 rem min-width that keeps all three pills uniform-width."* At 4.5rem the floor never
binds here: at a 1440px desktop `--control-text` ≈ 16.4px, so one pill ≈ `px-3` 24px + icon
`min-w-[1.2em]`×1.3em ≈ 25.6px + `.btn-pill` gap 6px + "Trig" ≈ 30px = **~85px > 72px**; "Polar" is
wider still. The floor cannot equalise widths it never reaches, so the row stays ragged (~85/~85/~95)
— the stated purpose of the declaration is unmet at every viewport where the arithmetic holds. It is
also the **only** geometry on the pill that does not ride `--ui-scale` (height, font, gap and padding
all do, via `offsets-sizing.css:150,170` and `glass/surfaces.css:131-135`), so it decays further at
coarse pointer.

**Falsifier.** Measure the three computed widths; if any is exactly 72px the floor binds and this is
refuted (**UNPROVEN-NEEDS-LIVE**). If none is 72px and they differ, both halves stand.

### m-2 · Two of the three scoped declarations are dead against the pin, and become live after the uplift — MINOR

`NotationPills.vue:32` `border-radius: 9999px` duplicates the `sm` recipe's `rounded-pill` **and**
`.btn-pill { border-radius: var(--radius-pill) }` (`glass/surfaces.css:120`). `:34`
`justify-content: center` duplicates `.btn-pill`'s `@apply … justify-center` (`:121`). Both are inert
today and both quietly become load-bearing when 7.0.0 deletes `.btn-pill` (M-3) — the worst kind of
dead code: invisible now, structural later, reviewed never.

**Falsifier.** Delete both lines against the 4.0.0 pin and diff a screenshot — no change refutes their
current necessity (**UNPROVEN-NEEDS-LIVE**); the duplication itself is static.

### m-3 · The glyph and its label are not typeset as one unit — MINOR

The icon/label pair inherits `.btn-pill`'s `gap: calc(0.375rem * var(--ui-scale))` = 6px
(`glass/surfaces.css:131`). The archetype tightens deliberately: `BasisSelector.vue:259` `@apply
gap-1 …` (4px) and `:282` `@apply px-2 gap-0.5` (2px) on mobile. At 6px, "sin" + "Trig" reads as two
words rather than a glyph-plus-name — and the mismatch is amplified by the 1.3em serif/1.0em UI-font
size step (`NotationPills.vue:26`) and by M-7's wrong face.

**Falsifier.** Compare the rendered tracking against a `BasisSelector` pill side by side
(**UNPROVEN-NEEDS-LIVE**); the token divergence is static (6px vs 4px vs 2px, three cited lines).

### m-4 · No tooltip, no description — the one place in this family that explains nothing — MINOR

Every archetype pill is wrapped: `BasisSelector.vue:140` `<Tooltip v-for … :text="getBasisTooltip(…)">`;
every preset chip in the sibling row likewise (`FunctionInput.vue:154-158`). `NotationPills` wraps
nothing. And the very module that defines its options *proves the codebase has a description register*
— `TIER_INFO` (`notation.ts:22-42`) gives each equation tier a full sentence
(*"Coefficients computed symbolically — the closed-form is exact."*). The three notations, which are
the harder concept, get three words: "Trig", "Exp", "Polar". A user who does not already know what
"polar Fourier notation" means learns nothing from this control.

Consequence for the corpus: this component contributes **0** of the 35 Tooltip callsites over 9
consumers adjudicated **TRUE** at intake row **R3-7a** (`lane-fourier-r3-r6.md:79`) — so the F.W3
`ui/tooltip` → `@mkbabb/glass-ui/tooltip` migration budget will not touch it, and adding tooltips here
*after* F.W3 lands is a second migration. Book it into F.W3, not after.

**Falsifier.** `grep -n "Tooltip\|title=\|aria-describedby" NotationPills.vue` → 0 hits.

### m-5 · The glyph set is typographically brittle and semantically uneven — MINOR

`notation.ts:16-18`: `"sin"`, `"eⁱ"`, `"Ae"`.

- `"eⁱ"` uses **U+2071 SUPERSCRIPT LATIN SMALL LETTER I** — a Unicode Phonetic-Extensions codepoint
  with thin coverage. Combined with M-7 (the family resolves to generic `serif`, not the vendored CM
  faces), the fallback chain is not one this repo controls: tofu or a synthesised superscript are both
  live outcomes.
- `"Ae"` is a truncation of *Ae^{iθ}*; standing alone next to a complete `"sin"` it names nothing.
  The three glyphs are not drawn from one register (a function name, a partial exponential, a
  truncated amplitude-phase form).
- The app already owns a real math typesetter for exactly this — KaTeX (`EquationPanel.vue:14,26-34`;
  `style.css:60-76`) — and these three glyphs decline it.

**Falsifier.** Render `"eⁱ"` in the actual resolved family and inspect for a fallback/notdef box
(**UNPROVEN-NEEDS-LIVE**); the codepoint identity and the register unevenness are static.

### m-6 · Implicit `type="submit"` — latent today, cured by the uplift — MINOR

glass-ui 4.0.0 forwards `type` with **no default** (`button-BNDWhAZb.js`: `props: { type: {} }`;
`computed(() => ({ type: u.type, disabled: u.disabled }))`) and `NotationPills.vue:16-30` never passes
one, so each pill renders a `<button>` with the HTML-implicit `type="submit"`.

**Honest scope:** `grep -rn "<form" web/src/` → **0 hits**. There is no form ancestor anywhere in the
app, so nothing submits today. This is a latent defect that becomes live the moment either host is
wrapped in a `<form>` — and it is cured for free at 7.0.0 (`type: nativeButton ? (props.type ??
"button") : undefined`, `glass-ui/src/components/button/Button.vue:55`). Filed MINOR, not MAJOR,
precisely because the falsifier holds.

---

## §4 · INFO

**I-1 · Unconditional re-emit.** `NotationPills.vue:24` emits `update:modelValue` even when the clicked
pill is already active. Harmless in both hosts (Vue refs do not trigger on identical writes, so
`EquationPanel.vue:60-64`'s `watchDebounced` does not re-fire), but it means the component cannot
distinguish "selected" from "re-affirmed" — which is what a `ToggleGroup type="single"` would give it
for free.

**I-2 · Inherited proportion break at coarse pointer.** The `sm` size recipe's `px-3`
(`button-BNDWhAZb.js`, `size.sm`) is a fixed Tailwind utility in `@layer utilities`, so it overrides
`.btn-pill`'s `padding: calc(0.5rem * var(--ui-scale)) calc(1rem * var(--ui-scale))`
(`glass/surfaces.css:135`). On a coarse pointer the pill's height grows 1.5× while its horizontal
padding does not — the capsule stretches vertically out of its authored proportion. This is a
**glass-ui 4.0.0** defect inherited by all 22 Button consumers, not a NotationPills defect; recorded
here because 7.0.0 restructures the base (`.btn-pill` deleted) and F.W1 should verify the new
composition rather than assume it.

**I-3 · Contradiction of `lane-frontend.md:138` / §4 — "currently 6× `Button`".** The tree says
**3**: `NOTATION_OPTIONS` is a 3-entry const (`notation.ts:14-19`) driving one `v-for`
(`NotationPills.vue:17-18`). The lane's "6×" is reconcilable only as a *mounted-instance* count across
the two hosts (`EquationPanel.vue:96` + `FunctionInput.vue:223` = 3+3), which would be correct under
that denominator and is worth stating as such — it is a live instance of intake **X-9**'s unresolved
"the formation must pick and publish one scope law before any per-component census claims a number"
(`lane-fourier-r3-r6.md:160`). **Per-render count: 3.** Everything else in that lane row (the
`./toggle-chip` → `./chip` shadow) reproduced exactly and is upgraded at M-3.

---

## §5 · SUPERLATIVES (L-18 runs both ways)

### S-1 · A genuinely, correctly minimal projection — 47 lines with zero local state

`NotationPills.vue:1-12` is one `defineProps`, one `defineEmits`, one import of a data table, and
nothing else. No `ref`, no `computed`, no `watch`, no lifecycle hook, no store access, no formatting
logic. The option table lives in `lib/equation/notation.ts` where `EquationPanel` also reads
`energyColor` (`:6`) — so the presentation data has exactly one home and the SFC is a pure function of
it. Both hosts consume it identically (`<NotationPills v-model="notation" />`, `EquationPanel.vue:96`
and `FunctionInput.vue:223`) with no per-host configuration. This is the correct shape; the defects
above are all *omissions from* a clean skeleton, not tangles within a messy one — which is why the
`Chip`/`ToggleGroup` migration at M-3 is cheap rather than a rewrite.

**Falsifier.** Any hidden state, side effect, or host-specific branch in the SFC — `grep -n
"ref(\|computed(\|watch\|onMounted\|useStore" NotationPills.vue` → 0 hits.

### S-2 · It inherits the WCAG-2.5.5 touch floor for free, by consuming the token instead of a number

`size="sm"` (`NotationPills.vue:20`) resolves to `h-(--control-h-sm)` =
`max(calc(2.25rem * var(--ui-scale)), var(--control-floor))` (`offsets-sizing.css:150`), and at
`@media (pointer: coarse)` `--control-floor` lifts to `var(--touch-target, 2.75rem)`
(`light-dark.css:17-22`). So the pills clamp at ≥44px tall on touch **without this file containing a
single height declaration** — the one dimension it did *not* hand-roll is the one that carries an a11y
requirement. Contrast its own `min-width: 4.5rem` (m-1), the hand-rolled number, which is the one that
fails. The lesson is legible in a 47-line diff.

**Falsifier.** Measure a pill's height on a coarse-pointer device; below 44px refutes
(**UNPROVEN-NEEDS-LIVE**; the token chain is static and complete).

### S-3 · The `--pill-color` contract is airtight by construction

`NotationPills.vue:23` binds `--pill-color` **only** in the active branch, and `:36-40` is the **only**
consumer of that variable — so the invariant *"the custom property exists if and only if the rule that
reads it applies"* holds structurally, not by convention. That is why `var(--pill-color)` correctly
needs **no fallback**: there is no reachable state in which the rule matches and the property is
absent. Vue clears the inline style on deselect (the `: {}` branch), so no stale tint can leak between
options, and the class and the style are driven by the *same* predicate expression on adjacent lines
— they cannot desynchronise. `BasisSelector.vue:145` uses the identical construction, which is
evidence the idiom is a considered house pattern rather than an accident.

**Falsifier.** Find a second writer or a second reader of `--pill-color` in this scope, or a code path
that adds `.notation-active` without the style binding — `grep -rn "pill-color"
web/src/components/equation/` → the two lines of this SFC only. *(Note this superlative is scoped
strictly to the variable's plumbing: the **values** it carries are B-2's defect, and the **cascade
weight** of the rule that reads it is M-2's. A sound mechanism can still deliver an unsound payload,
and here it does.)*

---

## §6 · Tally

| severity | ids | n |
|---|---|---:|
| **BLOCKER** | B-1 (no ARIA / colour-only selection, zero a11y coverage), B-2 (dark-mode AA failure ×3) | **2** |
| **MAJOR** | M-1 … M-8 | **8** |
| **MINOR** | m-1 … m-6 | **6** |
| **INFO** | I-1, I-2, I-3 | **3** |
| **defects total** | | **19** |
| **SUPERLATIVE** | S-1, S-2, S-3 | **3** |

**The single highest-value action** is not a patch to this file. B-1, M-1, M-2, M-3 and M-5 all close
together by migrating to `glass-ui@7`'s `ToggleGroup type="single"` + `Chip mode="selectable" :tone`
— reka-ui supplies the ARIA and the roving focus, `--chip-glass-strength` supplies the 12% tint this
file hand-rolls, and `Button`'s `loading` supplies the in-flight state. That migration is *mandatory
anyway* (M-3: `variant="outline"` does not compile at 7.0.0), so the correct disposition is **F.W1
uplift + F.W3 shadow retirement in one transaction**, with B-2's colour re-basing (a `.dark` arm for
`NOTATION_OPTIONS`, modelled on `style.css:113-127`) as the one repair that must happen regardless of
which component renders it.

**Method and limits.** Read-only throughout; `fourier-analysis` and `glass-ui` were never written.
This file is this lane's only write. No browser tooling was used — every claim is static or
source-derived, and each of the eight claims with a rendered-pixel component is marked
**UNPROVEN-NEEDS-LIVE (SS-13)** at its own falsifier: B-2 (composited ratio over `--card`), M-1
(perceptual), M-2 (hover readback), M-4 (wrap point), M-7 (resolved face), m-1 (computed widths), m-2
(screenshot diff), m-3 (tracking), m-5 (glyph fallback), M-8 (PRM `:active` readback). Contrast
figures are computed from the WCAG 2.x relative-luminance definition over the token values cited; the
sRGB conversions are mine and are reproducible from the `hsl()` literals at `notation.ts:16-18`.
