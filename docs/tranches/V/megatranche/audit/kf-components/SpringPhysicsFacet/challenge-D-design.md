claude-opus-5[1m]

# Challenge · SpringPhysicsFacet · axis D (DESIGN)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringPhysicsFacet.vue` (242 lines)
**Mount:** `demo/scenes/spring/SpringScene.vue:67` — `h(SpringPhysicsFacet, { demo })` as the spring scene's sole flat control-surface panel (rail-mounted, `--rail-width: clamp(25rem, 33svi, 32rem)`).
**Mode:** static, read-only, source-derived. No installs, no dev server, no browser. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
**Substrate read:** glass-ui **7.0.0** as installed at `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/` — the copy the demo actually resolves (census F-1: declared nowhere, installed anyway).

**Tally: 18 defects — 2 BLOCKER · 6 MAJOR · 6 MINOR · 4 INFO. 3 superlatives.**

Every claim below carries file:line provenance and its own falsifier. Where a
falsifier is cheap to run, it is written as the exact probe.

---

## 0. Headline

| # | Sev | Finding |
|---|---|---|
| **B-1** | BLOCKER | `tooltip=` on both `LabeledSlider`s is a **phantom prop** under glass-ui 7.0.0 — the only explanatory copy for `response` / `damping (ζ)` never renders, and the wired `description`→`aria-describedby` path is bypassed. |
| **B-2** | BLOCKER | The preset row is the **only section in the panel with no label** — sighted or AT. `.preset-grid` has no group role/name; four mutually-exclusive presets are modeled as four independent `aria-pressed` toggles. |
| **M-1** | MAJOR | `label-class=` is a phantom prop too. The declared slider-label typography is inert; the two labels diverge from the three sibling section headers that carry the same string inline. |
| **M-2** | MAJOR | `btn-interactive` (2 sites) is a **phantom class** — undefined in glass-ui 7.0.0 and in the demo, and *documented as retired* in the repo's own lessons ledger. |
| **M-3** | MAJOR | The two `background: … !important` rules are **half the demo's entire `!important` budget**, and as a *shorthand* they null glass-ui's `background-image` fill layer while leaving glass-ui's own `[data-state=on]` accent treatment stacked underneath. |
| **M-4** | MAJOR | The muted mono readout on the **active** preset cell computes to **≈4.46:1** in light mode — at/below the 4.5:1 AA floor — before glass-ui's `plus-lighter` flood lowers it further. |
| **M-5** | MAJOR | Zero `prefers-reduced-motion` consideration for the facet's autoplaying, indefinitely looping 60 Hz ball motion — while the sibling in the *same panel* guards a 160 ms transition and the engine ships an unconsumed PRM gate. |
| **M-6** | MAJOR | **Three of the authored cell-geometry utilities are silently defeated** by the substrate (`gap-1`, `pt-1.5`/`pb-2`, `rounded-pill`). The rendered cell is not the authored cell. |
| m-1…m-6 | MINOR | ragged `tabular-nums` · hover-only blurbs · sub-floor bespoke button · dead `container-type` · active ring lost under focus · missing `aria-hidden` |
| i-1…i-4 | INFO | inherited footer inset · zero forced-colors · 41% changelog prose in the template · dead `--ball-tone` seam |
| **S-1…S-3** | ★ | compositor-only 60 Hz painter · zero-re-authored subgrid consume · `:framed="false"` single-surface refusal |

---

## 1. BLOCKERS

### B-1 · `tooltip=` is a phantom prop — the panel's only explanatory copy never renders

`SpringPhysicsFacet.vue:31` and `:41`:

```
tooltip="Spring response time (s) — higher = slower"
tooltip="Damping fraction (ζ) — <1 overshoots, ≥1 settles"
```

`LabeledSlider`'s complete prop surface, read from the installed bundle
(`node_modules/@mkbabb/glass-ui/dist/labeled-field.js`, the `name: "LabeledSlider"`
component's `props` object):

```
variant, size, marks, invalid, keepDockOpen, motion, defaultValue, disabled,
orientation, dir, inverted, min, max, step, minStepsBetweenThumbs,
thumbAlignment, asChild, as, name, required,
label, description, requirement, layout, errorLive, modelValue
```

There is **no `tooltip`**. Confirmed by type as well —
`dist/components/labeled-field/types.d.ts`:
`LabeledSliderProps = Omit<SliderProps,"class"|"modelValue"> & LabeledFieldCommonProps & { modelValue: number }`,
where `LabeledFieldCommonProps = { label, description, requirement, layout, errorLive }`
and `SliderProps extends SliderRootProps` with `{ class, variant, size, marks, invalid, keepDockOpen, motion }`.
Exhaustive probe: `grep -rn "tooltip" dist/components/labeled-field/ dist/components/label/` → **zero hits**.

`LabeledSlider` does **not** set `inheritAttrs: false`, and its single root is
`LabeledField`, which is also not `inheritAttrs: false` and whose own single root is
`<div class="labeled-field" data-slot="labeled-field" …>`. So `tooltip` falls all the
way through and lands as a **literal, meaningless DOM attribute on a `div`**. There is
no directive to pick it up: `grep -rn "v-tooltip|\[tooltip\]" demo/` → nothing but one
unrelated prose comment (`EasingSidebar.vue:2`).

**Design consequence.** The two controls that drive the entire facet are labelled
`response` and `damping (ζ)`. `ζ` is a control-theory symbol; `response` is a
seconds-valued time constant that most readers will assume is a speed multiplier. The
author wrote correct, concise explanatory copy for both — and it renders nowhere, for
anyone, in any pointing modality. The panel ships two unexplained physics parameters.

**Worse: the correct primitive prop exists and is a11y-wired.** `LabeledField`'s
`description` prop renders `<p id="{id}-description" class="labeled-field-description">`
and folds that id into the `aria-describedby` it hands the slider
(`dist/labeled-field.js`, the `describedBy` computed → `"aria-describedby": o` on the
slider vnode). The fix is `tooltip=` → `description=`, and it upgrades from a
mouse-only affordance to a permanently-visible one with AT wiring.

**Scope note (fold, don't re-invent):** this is not local. The same dead attribute
appears at 13 call-sites — `ChannelOptions.vue:32,51,79,101,125`,
`LayerConfigPanel.vue:15,22,36,52,63`, `EasingSidebar.vue:58`, and these two. It is
glass-ui-7 migration rot on the `LabeledField` prop surface, and it is **not** named by
the frontend census (`lane-frontend.md` S-1..S-8, F-1..F-6) — that lane audited the
*import* boundary and found it clean (F-6), which is true; the **prop** boundary is
where the rot is. This challenge contradicts nothing in the census; it extends it.

**Falsifier.** Any of: (a) a `tooltip` prop appearing on `LabeledSlider`/`LabeledField`/
`Label` in the resolved glass-ui build; (b) a global directive or `[tooltip]` CSS rule
in the demo that materialises it; (c) a rendered `.labeled-field` node exposing a
tooltip in the running app. I probed (a) and (b) exhaustively above and both are empty.
(c) would falsify — **UNPROVEN-NEEDS-LIVE** only in the sense that a live DOM read
would put it beyond argument; the static evidence is already conclusive.

---

### B-2 · The preset row is the only unlabeled section in the panel — and four exclusive presets are modeled as four independent toggles

`SpringPhysicsFacet.vue:66–89`.

Every other section in this Card announces itself, in the panel's own established
grammar:

| section | label | line |
|---|---|---|
| params | per-slider `label` (`response`, `damping (ζ)`) | `:29`, `:39` |
| heatmap | `parameter space — overshoot` | `SpringHeatmap.vue:16` |
| keyframes | `@keyframes (editable)` | `:102` |
| **presets** | **— none —** | `:66` |

`.preset-grid` is a bare `<div class="preset-grid grid grid-cols-2 gap-2">`. A sighted
reader meets four cells carrying a word and two bare decimals (`smooth` `0.5 / 0.86`)
with nothing saying these are presets, and nothing saying which number is which
parameter. An AT user meets four ungrouped buttons announced as
*"smooth 0.5 / 0.86, toggle button, pressed"* — no set membership, no position-in-set,
no explanation of the numerals.

The tree's own convention is the accuser here, twice over, in files this component
directly consumes:

```
KeyframesEditor.vue:66-67   role="toolbar" aria-label="Keyframe actions"
SpringHeatmap.vue:28-32     role="application" aria-label="Spring parameter-space heatmap — click or use
                            the arrow keys to navigate response (horizontal) and damping (vertical); …"
```

Both siblings label their grouped control surfaces. The preset grid does not.

**The semantic modeling is also wrong.** `mode="selectable"` renders reka-ui `Toggle`
(`dist/chip-6ysLmScu.js`, the `e.mode === "selectable"` branch → `Toggle` from
`reka-ui`), i.e. `<button type="button" aria-pressed data-state>`. But the four presets
are **mutually exclusive by construction**: `isActivePreset` (`:165-167`) is an
equality test on the two live params, and `applyPreset` (`:169-172`) only ever *sets*
them. Because `:model-value` is bound to `isActivePreset(t)` the Toggle is fully
controlled — so clicking the already-active cell emits `update:modelValue(false)`, the
handler re-applies the same preset, `isActivePreset` recomputes `true`, and the control
snaps back on. **The active toggle cannot be un-pressed.** AT announced a press that
had no effect. That is radio-group behaviour wearing toggle-button clothes.

**Falsifier.** (a) A `role`/`aria-label`/`aria-labelledby` on `.preset-grid` or an
ancestor that names the set — `grep -n "role=\|aria-label" SpringPhysicsFacet.vue` returns
nothing in the template (the file has zero `role`/`aria-*` attributes). (b) A demonstration
that clicking an active preset produces an observable state change, which would make the
toggle modeling honest. (c) A ruling that a visible section label is not wanted here —
in which case B-2 reduces to its a11y half and drops to MAJOR.

---

## 2. MAJOR

### M-1 · `label-class=` is inert — the slider labels silently leave the panel's typographic register

`:30` and `:40` declare `label-class="text-small font-medium text-muted-foreground"`.

`grep -rn "labelClass\|label-class" node_modules/@mkbabb/glass-ui/dist/` → **zero hits,
anywhere in the package**. Same fallthrough path as B-1: the string lands on the
`.labeled-field` wrapper `div` as an unknown attribute and applies nothing. The label is
rendered by glass-ui's `Label` (`dist/labeled-field.js`, `y(E(t), { id: o, for: a, … })`)
in that primitive's own register.

The design consequence is a *split register inside one card*. That exact class string —
`text-small font-medium text-muted-foreground` — is applied **inline and successfully**
at three sibling section headers:

```
SpringPhysicsFacet.vue:102   <span class="text-small font-medium text-muted-foreground">@keyframes (editable)</span>
SpringHeatmap.vue:16         <span class="text-small font-medium text-muted-foreground">parameter space — overshoot</span>
```

So three of the panel's four section-level labels resolve to `--type-small` /
weight 500 / `--muted-foreground`, and the two slider labels resolve to whatever
`Label` says. The author declared one grammar and got two. The header comment at `:23-25`
("the UNIFORM label-column grammar (the cube's bar)") describes an outcome the tree does
not produce.

Same root cause and same 13-site blast radius as B-1
(`ChannelOptions.vue:31,50,78,100,124`, `EasingSidebar.vue:57`).

**Falsifier.** A `labelClass` prop or a `[label-class]` attribute selector anywhere in
the resolved glass-ui build (probed: none), or a live computed-style read showing the
`.labeled-field` `<label>` at `--type-small` + weight 500 + `--muted-foreground` —
**UNPROVEN-NEEDS-LIVE** for the visual magnitude of the divergence, but the *no-op* is
statically certain.

---

### M-2 · `btn-interactive` is a phantom class — and the repo's own ledger already knows

`:74` (preset cells) and `:105` (re-sample button) both claim `btn-interactive`.

Exhaustive resolution probe:

```
$ grep -rn "btn-interactive" /Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/
  → (no output)
$ grep -rn "btn-interactive" demo/styles/ demo/**/*.css
  → (no output — only .vue call-sites)
$ grep -rn "btn-interactive" --exclude-dir=node_modules .    # repo-wide
  → 8 call-sites (6 files) + 2 documentation lines. Zero definitions.
```

It is not a Tailwind core utility, it has no `@utility` declaration, and it has no rule
in either cascade. It resolves to nothing at all 8 sites.

**This is a known, ledgered regression that was never closed.**
`docs/precepts/instructions/LESSONS-LEARNED.md:603` (entry *"Cleanup Commit Deletes
Load-Bearing Artefact (Q-chron-4)"*):

> substrate `b0debec` (D.W2.D "delete zero-site orphans" — retired `.rainbow-vivid` +
> `.rainbow-pastel` + **`.btn-interactive`** under a false zero-site verdict; keyframes.js
> consumed `.rainbow-*`)

The same entry prescribes the gate: *"invariant 33 … `scripts/proof-phantom-classes.mjs
--pre-deletion` is the mechanical gate"* plus a `.retired-classes.txt` registry appended
on every confirmed retiral, *"so the post-deletion gate keeps catching late-arriving
phantom consumers"*. Neither exists in this repo:

```
$ ls scripts/                     → baselines build capture.mjs color-fidelity-harness.mjs
                                    demo-roster.mjs gates gen-agent-surface.mjs lib observe
                                    pages-deploy.sh probe-webkit-linear-accel.mjs release …
$ ls scripts/gates/               → surface  visual
$ find . -name "proof-phantom-classes*" -not -path "*/node_modules/*"   → (no output)
$ ls .retired-classes.txt          → (no such file)
```

So the invariant that would have caught this was codified and never shipped its gate —
which is precisely the failure mode the *preceding* ledger entry (`:594`, Q-chron-3,
*"Codification Without A Gate Is Necessary-But-Not-Sufficient"*) says must not recur.
The phantom class is the live proof that it did.

**Design consequence, scoped honestly.** The preset cells are *not* left bare: glass-ui's
`glass-chip--interactive` supplies hover/press/focus material
(`dist/chip-6ysLmScu.js`, `_ = "glass-chip--interactive glass-capsule-hover focus-ring cursor-pointer …"`).
The **re-sample button at `:105` is bare** — a raw `<button>` whose only interaction
affordance is `hover:text-foreground`, with no cursor, no lift, no press. It is the one
control in the panel with no material response to the pointer.

**Falsifier.** A definition of `.btn-interactive` in any stylesheet actually loaded by
the demo build (glass-ui `dist/styles/**`, `demo/styles/**`, any SFC `<style>`, or a
Tailwind `@utility`). I probed all four surfaces to exhaustion. A single hit kills M-2.

---

### M-3 · The `!important` pair nulls glass-ui's fill layer and leaves two selected-state treatments stacked

`:216-223`:

```css
.preset-cell:hover {
    background: color-mix(in srgb, var(--color-progress) 8%, var(--background)) !important;
    outline-color: color-mix(in srgb, var(--color-progress) 35%, transparent);
}
.preset-cell[data-state="on"] {
    background: color-mix(in srgb, var(--color-progress) 12%, var(--background)) !important;
    outline-color: color-mix(in srgb, var(--color-progress) 65%, transparent);
}
```

**(a) It is half the demo's entire `!important` budget.**

```
$ grep -rn "!important" --include="*.vue" --include="*.css" demo/ | wc -l    → 4
$ grep -rln "!important" --include="*.vue" --include="*.css" demo/
  demo/scenes/spring/SpringPhysicsFacet.vue      (2)
  demo/styles/design-idioms.css                  (2 — the documented §gesture-in-flight
                                                   user-select suppression, :292-297)
```

Two of the demo's four `!important` declarations are here, and the other two are a
single documented drag-gesture idiom. The G-tranche styling audit recorded
`zero !important` as a *verified-exemplary* property of this demo's styling surface
(`docs/tranches/G/audit/a-styling.md:355`, row 8: *"ONE idiom layer / zero `!important` /
zero SFC `@apply` … verified exemplary"*). **That verdict is now false, and this file is
why.** The same paragraph (`:357`) also asserts *"`btn-interactive` consume glass-ui
idiomatically (correct usage, not gaps)"* — falsified by M-2. Both stale rows should be
struck.

**(b) The `background` shorthand is a bigger hammer than intended.** `background:` resets
every background longhand, including `background-image`. glass-ui's chip material lives
there (`dist/styles/glass/glass-chip.css`):

```css
.glass-chip { … background-image: linear-gradient(var(--glass-fill-tinted), var(--glass-fill-tinted)); }
```

So on hover and on select, the glass fill-tint layer is set to `none`. The "glass" in
`glass-chip` is switched off in exactly the two states where a glass surface is supposed
to respond. `background-color:` would have been the precise instrument.

**(c) glass-ui's own selected treatment is not suppressed — it is stacked under.** Same
file:

```css
.glass-chip[data-mode="selectable"][data-state="on"] {
    --chip-flood-t: 1;  background-color: var(--accent-band);
    border-color: var(--accent-edge);  color: var(--accent-ink);
}
.glass-chip[data-mode="selectable"]::after {
    content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
    background: radial-gradient(120% 140% at 50% 50%,
        color-mix(in oklab, var(--accent-band) 60%, oklch(0.9 0.05 75 / 0)), oklch(0.9 0.05 75 / 0) 72%);
    mix-blend-mode: plus-lighter;  opacity: var(--chip-flood-t);
    transition: opacity var(--duration-normal) var(--ease-out) 60ms;
}
```

The `!important` overrides `background-color` and `border-none` neutralises
`border-color` — but **`--chip-flood-t: 1` is untouched**, so the `::after` radial flood
paints at full opacity, in `plus-lighter`, over the cell centre, in the chip's *own*
`--accent-band` (a `--primary`-derived tone at 25% strength, since
`.glass-chip` raises `--accent-band-strength` to `max(18%, 15% + 10%)`). The component
passes no `tone`, so the flood is the design system's accent, not the scene's
`--color-progress`.

Net: the active cell carries **two** selected-state treatments in two different hues —
the author's violet wash + dashed ring, and glass-ui's primary-tinted additive flood.
The `:200-208` style comment claims the cell "wears the canonical motion-color … as a
DASHED outline"; the tree paints that plus an unowned second layer.

**Falsifier.** (a) A live computed-style read showing `background-image: none` is
*not* the case on `.preset-cell:hover` — kills (b). (b) A live read of the
`.glass-chip[data-mode=selectable]::after` opacity showing `0` on the active cell —
kills (c); the static evidence is that nothing in this file writes `--chip-flood-t`.
Magnitude of the visual doubling is **UNPROVEN-NEEDS-LIVE**; its *existence* is
statically determined by the untouched custom property.

---

### M-4 · Active-cell contrast computes to ≈4.46:1 in light mode — at/below the AA floor

The active preset cell's background is
`color-mix(in srgb, var(--color-progress) 12%, var(--background))` (`:221`), and its
numeric readout is `text-mono-caption text-muted-foreground` (`:79`) — normal-size text
(`--type-caption: clamp(0.75rem, 0.71rem + 0.21vw, 1rem)`, i.e. 12–16 px, never large),
so the 4.5:1 AA threshold applies.

Token chain, all resolved from source (no demo overrides —
`grep -rn "\-\-muted-foreground:|\-\-background:|\-\-foreground:" demo/styles/*.css` → **zero**):

| token | source | light value |
|---|---|---|
| `--color-progress` | `demo/styles/style.css:163` → `var(--accent-kf)` | — |
| `--accent-kf` | `demo/styles/style.css:130` | `oklch(0.56 0.17 295)` → sRGB ≈ `rgb(126, 90, 204)` |
| `--background` | glass-ui `tokens` → `--neutral-0` | `hsl(40 30% 98%)` → `rgb(251, 250, 248)` |
| `--muted-foreground` | glass-ui `tokens` → `--neutral-5` | `hsl(30 22% 40%)` → `rgb(124, 102, 80)` |

Computed (WCAG 2.x relative luminance):

```
rest cell    bg rgb(251,250,248)  Y = 0.9601   fg Y = 0.1439   →  5.21 : 1   PASS
active cell  bg = 0.12·(126,90,204) + 0.88·(251,250,248) = rgb(236,231,243)
                                  Y = 0.8157   fg Y = 0.1439   →  4.46 : 1   FAIL (< 4.50)
dark active  bg = 0.12·(190,149,236) + 0.88·(11,10,9)  = rgb(33,27,37)
                                  Y = 0.0122   fg Y = 0.3588   →  6.58 : 1   PASS
```

So the pinch is **light-mode-only, on the selected cell, on the numerals** — 4.46 against
a 4.50 floor. And it is an **upper bound**: the M-3(c) `::after` flood blends
`plus-lighter` over the cell centre, where these numerals sit. `plus-lighter` is additive
only — it can raise the local background luminance and never lower it — so the delivered
ratio is ≤ 4.46.

The margin is thin (0.9%), and I am reporting it as thin rather than dressing it up. It
matters because the *rest* state already sits at 5.21:1: the 12% wash spends 3/4 of the
available headroom on one state change.

**Falsifier.** A measured contrast ≥ 4.5:1 on the active cell's `.text-mono-caption`
span in light mode. Sources of legitimate divergence: the browser's own
`oklch → sRGB` gamut mapping for `oklch(0.56 0.17 295)`, and `color-mix(in srgb, …)`
rounding. **UNPROVEN-NEEDS-LIVE** for the final digit; the *direction* (rest 5.21 →
active 4.46 → lower still under the flood) is arithmetic.

---

### M-5 · No `prefers-reduced-motion` honesty for the facet's perpetual 60 Hz motion

`:151-162` registers a painter that writes `transform: translateX(<n>cqw)` on four
preset balls every frame, driven by the scene's shared rAF loop
(`useSpringDemo.ts:191-246`), which is **armed unconditionally at composable creation**
(`useSpringDemo.ts:375` — a bare `startLoop()`), sweeps `springLive.phase = ((now - startTime)/1400) % 1`
(`:228` — a modulo, i.e. it never ends), and is gated only on
`machine.status.value !== "playing"` (`:197`).

Exhaustive probe for any PRM gate on that path:

```
$ grep -rn "prefers-reduced-motion|reducedMotion" demo/scenes/spring/ demo/composables/ demo/state/
  demo/scenes/spring/SpringTarget.vue:462        @media  (a CSS pulse in a different subtree)
  demo/scenes/spring/StartingStyleTarget.vue:211 @media  (a CSS transition in a different subtree)
  demo/scenes/spring/SpringHeatmap.vue:333       @media  (the marker's 160 ms transition)
$ grep -rn "honorReducedMotion|prefersReducedMotion" demo/     → (no output)
```

Three CSS blocks, zero JS gates, none of them on the loop.

Two things make this a design defect rather than a shrug:

1. **The panel guards the small motion and not the large one.** `SpringHeatmap.vue:333-337`
   suppresses a *160 ms `transform` transition* under `reduce`. Forty lines away, in the
   same Card, four balls sweep continuously and forever. A user who asked for reduced
   motion gets the 160 ms glide removed and the infinite sweep kept. That is the exact
   inversion of the preference's meaning.
2. **The engine this demo exists to dogfood ships the gate, unconsumed.**
   `src/animation/internal/reduced-motion.ts:2` — *"One shared `prefers-reduced-motion`
   gate for the whole engine"*; `src/animation/constants/types.ts:201` —
   *"When true, snap `play()` to the final frame under `prefers-reduced-motion: reduce`.
   Default false."* The demo never passes `honorReducedMotion` anywhere. The tree's own
   precedent for the raw-rAF case exists too: `useCubeDemo.ts:164` and
   `useSequenceInstrument.ts:31` both branch on
   `window.matchMedia?.("(prefers-reduced-motion: reduce)").matches`. Spring is the
   outlier scene.

**Falsifier — and it is a real one.** The strongest counter is *essential content*: this
is a spring-physics demonstrator, and the moving ball **is** the thing being
demonstrated, so `reduce` arguably should not still it. I accept that argument for the
stage subject (`SpringTarget`). I do **not** accept it for the four cells in this facet:
they are a **preset chooser**, a control surface, and their per-cell balls are decoration
on a picker. A ruling that the preset-cell balls are essential demonstration content
falsifies M-5. So would a PRM gate found in `RAFPlayback` itself — probed:
`grep -rn "prefers-reduced-motion" src/` returns the engine's opt-in facility only
(`group/`, `constants/`, `internal/`, `view-transition/`), never an unconditional loop gate.

WCAG 2.2.2 (Pause, Stop, Hide) is **satisfied** and is not claimed here — the scene's
`PlaybackRibbon` provides a pause. This finding is about `prefers-reduced-motion`
honesty, not about a missing pause control.

---

### M-6 · Three authored cell-geometry utilities are silently defeated — the rendered cell is not the authored cell

`:74`:

```
class="preset-cell rounded-pill border-none bg-background px-3 pt-1.5 pb-2 h-auto
       items-start gap-1 font-medium leading-normal whitespace-nowrap btn-interactive"
```

`shape="cell"` already supplies a complete geometry
(`dist/chip-6ysLmScu.js`: `cell: "glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro"`,
over the base `"glass-chip glass-capsule accent-tone inline-flex items-center justify-center …"`).
The consumer then tries to overwrite most of it. **Chip gives it no reliable channel to
do so**: the variant builder merges by group internally (`x()` calls `e()`, which
de-duplicates via a 30-entry `[group, regex]` table), but the consumer's class is
appended by the *plain concatenator*:

```js
O = r(() => t(x({ interactive: …, shape: g.shape, size: g.size }), g.class))
//              ^ merged variant string          ^^^^^^^^ t = plain join, NOT the merger
```

So both classes of every colliding pair survive into the `class` attribute, and the CSS
cascade decides. Resolved against the actual sheets — glass-ui is imported **unlayered**
(`demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles";`, and
`grep -c "@layer" dist/styles/components.css` → **0**), while the demo's Tailwind output
sits in `@layer utilities` (`@import "tailwindcss"` at `style.css:1`; unlayered normal
declarations outrank every layer):

| authored | competitor | who wins | mechanism | evidence |
|---|---|---|---|---|
| `gap-1` (0.25rem) | `gap-1.5` (0.375rem) | **`gap-1.5`** | same unlayered sheet, later emission | byte offsets in `dist/styles/components.css`: `.gap-1{` @6226, `.gap-1\.5{` @6252 |
| `pt-1.5` / `pb-2` | `py-2.5` (0.625rem) | **`py-2.5`** | **layer precedence** — `.py-2\.5{` is unlayered @11970; `.pt-1\.5{`/`.pb-2{` are absent from glass-ui and therefore demo-generated into `@layer utilities` | same probe |
| `rounded-pill` | `.glass-chip--cell.glass-capsule{border-radius:var(--radius-card)}` | **`--radius-card`** (`= --radius-2xl = 1rem`) | specificity (0,2,0) > (0,1,0), both unlayered | `dist/styles/glass/glass-chip.css` |
| `px-3` | `px-2` | `px-3` ✓ | later emission (@11535 > @11438) | — |
| `items-start` | `items-center` | `items-start` ✓ | later emission (@5950 > @5917) | — |

So the cell that renders has **gap 0.375rem** (not 0.25), **0.625rem symmetric block
padding** (not 0.375 top / 0.5 bottom), and a **1rem card radius** (not a pill). Three of
five override attempts fail; the two that succeed do so by accident of alphabetical /
numeric emission order, not by any mechanism the author controls.

The `rounded-pill` case is also self-contradictory on its face: `shape="cell"` *is* the
request for card radius, and `rounded-pill` is the request for its opposite, on the same
element. The design system wins, which is the right outcome — but the author does not
know it happened.

**Falsifier.** A live computed-style read of `.preset-cell` showing `gap: 0.25rem`,
`padding-block: 0.375rem 0.5rem`, or `border-radius: 9999px`. Any one of those kills the
corresponding row. **UNPROVEN-NEEDS-LIVE** as a set; each row's mechanism is individually
determined by the offsets and selectors cited.

---

## 3. MINOR

### m-1 · `tabular-nums` on ragged, unformatted floats

`:79`:

```html
<span class="text-mono-caption text-muted-foreground tabular-nums">{{ t.preset.response }} / {{ t.preset.dampingFraction }}</span>
```

Raw model values (`springPresets.ts:17-42`) render as:

```
smooth   0.5 / 0.86
snappy   0.35 / 0.65
bouncy   0.5 / 0.45
gentle   0.7 / 1          ← dampingFraction: 1.0 stringifies to "1"
```

`tabular-nums` buys fixed advance width so digits align in a column. These strings have
1, 2, 2 and 0 fractional digits and different integer/separator positions, so **no
column can form** — the feature is paid for and cannot fire. Worse, `gentle`'s
critically-damped ζ reads as the bare integer `1` beside three decimals, which reads as
a different *kind* of quantity.

The correct idiom is in the same panel, 60 lines up — `SpringHeatmap.vue:19-20`:

```
{{ demo.response.value.toFixed(2) }} / {{ demo.dampingFraction.value.toFixed(2) }}
```

So the same two numbers appear twice in one card in two formats. `toFixed(2)` on both
call-sites makes `tabular-nums` do its job and unifies the readout.

**Falsifier.** A demonstration that the four strings do align under `tabular-nums`
(they cannot — the character counts differ), or a ruling that trailing-zero suppression
is the intended presentation.

### m-2 · The four best pieces of copy in the file are mouse-hover-only

`:73` — `:title="t.preset.blurb"`. The blurbs (`springPresets.ts:22,28,34,40`) are
genuinely good, non-trite domain writing: *"iOS default — settles without ringing"*,
*"quick with a touch of overshoot"*, *"pronounced overshoot, playful ring"*,
*"critically damped — slow, no overshoot"*. They are the only prose in the component that
explains what a preset *feels* like.

`title` is not surfaced on keyboard focus by any major browser and is unreliable on
touch. Since the cell's own content supplies the accessible name, `title` degrades to a
description — announced by some AT, shown to no keyboard user, and shown to touch users
only by accident. The demo already imports glass-ui `/tooltip` at six sites
(census §3.1), and the `Chip` slot can simply render the blurb. Four well-written
sentences currently reach roughly one input modality.

**Falsifier.** Evidence that `title` is exposed on focus in the demo's supported
browser set, or a ruling that hover-only discovery is intended for these.

### m-3 · `.reseed-btn` is a bespoke button below both the repo's floor and the design system's

`:103-111` is a raw `<button>` where glass-ui `Button` is available and already consumed
elsewhere in this very scene (`SpringScene.vue:167`, `RibbonBar.vue:135`).

Computed block size: `py-0.5` (0.25rem = 4 px) + content, where content is
`max(text-caption × line-height 1.2, icon 12 px)`. At a 1280 px viewport
`--type-caption` ≈ 14.05 px → 16.9 px line box → **≈ 20.9 px tall**.

Two floors it misses:

- the repo's own declared floor — `design-idioms.css:81-85`,
  `.tap-floor { min-height: 44px; min-width: 44px; }`, commented
  *"the WCAG 2.5.5 44px minimum touch-target floor"*. Not applied here.
- the design system's enforced floor — `dist/styles/glass/glass-chip.css`,
  `.glass-chip--interactive { min-inline-size: var(--touch-target, 2.75rem); min-block-size: var(--touch-target, 2.75rem); }`
  with `--touch-target: 2.75rem` (`dist/styles/tokens/sizing.css`). This is why the
  **preset cells do meet 44 px** despite `h-auto` — `h-auto` sets `height`, not
  `min-block-size`. Every interactive glass primitive in this panel clears the floor;
  the one hand-rolled control does not.

**I am not claiming a WCAG 2.5.8 (AA) failure.** At ~21 px the button is under the
24 px minimum, but SC 2.5.8's *spacing* exception likely rescues it: the nearest targets
are the preset grid ≥ 12 px above (`gap-3`) and the editor's controls ≥ 16 px below
(`gap-2` + the editor's `p-2`), so a 24 px-diameter circle centred on the button
(extending 1.5 px beyond its box) intersects nothing. The claim is conformance with the
two floors this codebase itself declares.

**Falsifier.** A computed height ≥ 44 px on `.reseed-btn`, or a `--type-caption`
resolution large enough to clear it (it clamps at 1rem → 19.2 px line box + 4 px = 23.2 px,
still short).

### m-4 · `container-type: inline-size` on `.keyframes-editor-scroll` is dead

`:237` declares it on the editor's scroll band. Exhaustive consumer probe over the whole
editor subtree:

```
$ grep -rn "cqw\|cqh\|cqi\|cqb\|@container" demo/components/instrument/keyframes/
  → (no output)
```

No container query, no container unit. The declaration is inert, and it is not free:
`container-type: inline-size` computes to `contain: layout style inline-size`, which
makes the element a containing block for absolutely-positioned descendants and a new
stacking context, and fixes its inline size independent of contents.

The contrast is instructive — the *other* two `container-type` declarations in this file
(`:189-191` on `.preset-track`, and `SpringHeatmap.vue:303` on the field) are each paired
with a real `cqw`/`cqh` consumer (`:159`, `SpringHeatmap.vue:197`). Those are exemplary
(see S-1). This third one is copy-forward.

**Falsifier.** Any `cq*` unit or `@container` rule resolving against
`.keyframes-editor-scroll`, in the editor subtree or in glass-ui components mounted
inside it.

### m-5 · The active cell's dashed ring disappears while it is keyboard-focused

`:209-215` paints the selected state as `outline: 1px dashed <color>`. But the chip base
class carries `focus-ring` (`dist/chip-6ysLmScu.js`, the interactive class string), and
the demo's authoritative rule is `design-idioms.css:76-79`:

```css
.focus-ring:focus-visible { box-shadow: var(--focus-ring-shadow); outline: none; }
```

Specificity `.focus-ring:focus-visible` = (0,2,0) beats `.preset-cell` = (0,1,0), and
`outline: none` is a shorthand setting `outline-style: none` — so no outline paints,
whatever `.preset-cell[data-state="on"]` says about `outline-color`. A keyboard user who
tabs onto the *selected* preset loses the selected ring for as long as focus rests there.

Scoped honestly: the state is still conveyed by `aria-pressed` to AT and by the 12%
background wash visually, so this is a redundancy loss, not a state loss.

**Falsifier.** A live focus-state read showing the dashed outline still painted on the
active cell, e.g. if the SFC's scoped rule is injected after `design-idioms.css` *and*
raises specificity (it does not — it is `.preset-cell[data-state="on"]`, still (0,2,0),
and `outline-color` cannot resurrect `outline-style: none`).

### m-6 · `<RefreshCw>` carries no `aria-hidden`, against the file family's own convention

`:109` — `<RefreshCw class="w-3 h-3" />`. `@lucide/vue` v1.17.0 renders a bare `<svg>`:
`node_modules/@lucide/vue/dist/esm/defaultAttributes.mjs` is
`{ xmlns, width, height, viewBox, fill, stroke, stroke-width, stroke-linecap, stroke-linejoin }` —
**no `aria-hidden`, no `role`, no `focusable`**. Chromium maps an unlabelled `<svg>` to
`role=graphics-document`, so it can be announced as a node inside the button.

The consumed sibling does it correctly: `KeyframesEditor.vue:73` —
`<WandSparkles aria-hidden="true" class="shrink-0 opacity-70" />`, commented *"now a pure
indicator (aria-hidden)"*. The button's accessible name is unaffected (it comes from the
"re-sample" text), so this is noise, not a name defect.

**Falsifier.** An AT read showing the svg contributes nothing to the button's
announcement, or a global `svg { aria-hidden }` normalisation (none exists in the demo).

---

## 4. INFO

### i-1 · The editor's sticky footer sits 2 rem in, against the panel's 1 rem

`CardContent` is `px-4` (`:22`), so every section in the panel starts 1 rem from the card
edge. `KeyframesEditor`'s sticky footer is `p-4 pt-4 m-4` (`KeyframesEditor.vue:35`),
authored for the cube's full-height standalone pane. Mounted here via `:framed="false"`
(`:119`) inside a `.keyframes-editor-scroll` that adds no padding of its own, its content
begins **1 rem (margin) + 1 rem (padding) = 2 rem** from the card edge — a visible 1 rem
left-edge break against the sliders, heatmap, preset grid and section labels above it.
(`m-4` also loses 2 rem of usable width inside a 25–32 rem rail.)

The defect is in `KeyframesEditor`, but the *seam* is here: `:framed="false"` correctly
drops the inner `Card` (S-3) while leaving the pane-scale margin behind. Filed as INFO
because the fix belongs upstream or at the consumption seam, not necessarily in this file.

**Falsifier.** A live measurement showing the footer's content box aligned with the
sliders above it.

### i-2 · Zero `forced-colors` coverage; selected/hover ride colour alone

```
$ grep -rn "forced-colors" --include="*.css" --include="*.vue" demo/   → (no output)
```

glass-ui does ship forced-colors handling (`dist/styles/accessibility.css`,
`glass/a11y-fallback.css`, `utilities/a11y-overrides.css`), but those rules target
glass-ui's own selectors — the demo's scoped `.preset-cell` treatment is outside them.
In forced-colors mode the entire rest / hover / selected distinction of this component
is carried by `background` and `outline-color`, both of which the UA forces. `aria-pressed`
still reaches AT.

Filed INFO rather than MAJOR because the precise forced-colors treatment of
`outline-color: transparent` is implementation-divergent and I will not assert a
behaviour I cannot decide statically. **UNPROVEN-NEEDS-LIVE** — the honest form of the
claim is: *this component has no forced-colors story, and the demo has none anywhere.*

**Falsifier.** A forced-colors rendering in which the active cell is distinguishable
from its siblings.

### i-3 · 41% of the template is tranche-changelog prose naming files that no longer exist

Template lines 1–124 contain 51 comment lines (blocks at `:2-20`, `:23-25`, `:49-57`,
`:60-65`, `:91-97`, `:100-101`, `:114-118`) — **41%**. Most is provenance narrative
rather than design documentation: *"the pane drag DIED with `useSpringPaneDrag.ts` (168L
bespoke pane-dragging — panel placement is the shell's concern, not a per-scene drag
toy)"* (`:8-10`).

The names it preserves are gone: `ls demo/scenes/spring/` contains neither
`SpringSidebar.vue` nor `useSpringPaneDrag.ts`. And the deleted name is still
load-bearing *outside* this file — the consumed primitive's own prop documentation reads
*"when the editor is mounted INSIDE another Card (e.g. SpringSidebar's quiet parent Card
— K.W1′)"* at `KeyframesEditor.vue:6` and again at `:136`. A reader following the API doc
for `framed` is sent to a component that does not exist; the real consumer is this file.

**Falsifier.** `SpringSidebar.vue` or `useSpringPaneDrag.ts` existing anywhere in the
tree (`find demo -name "SpringSidebar*" -o -name "useSpringPaneDrag*"` → nothing).

*Explicitly not claimed:* the `proof:easing-sidebar-normalized` / `proof:idioms`
citations (`:118`, `design-idioms.css:3`). The `proof:*` idiom was retired **in value.js**
by owner ruling; keyframes.js still runs it as a live convention, so citing it here is
not a violation. I note only that `proof:easing-sidebar-normalized` has no corresponding
script (`ls scripts/gates/` → `surface`, `visual` only), so the citation is currently
unverifiable — the same shape as M-2's missing gate.

### i-4 · `--ball-tone` never reaches this subtree; the documented seam is fictional (the fallback saves it)

`.progress-rail` / `.progress-ball` are parameterised by `--ball-tone` with a
`var(--ball-tone, var(--color-progress))` fallback (`design-idioms.css:166-187`). The
only setters are `SpringTarget.vue:278`, `EasingTarget.css:7`, `SequenceTarget.css:8` —
all on **stage-subject** elements. This facet mounts in the rail
(`SpringScene.vue:67`), a disjoint subtree, so `--ball-tone` is never inherited and every
consumer here resolves via the fallback.

The values are identical (`--ball-tone: var(--color-progress)`), so nothing renders
wrong. But `SpringHeatmap.vue:291-292` documents the mechanism as *"The field rides the
scene's `--ball-tone` seam (inherited from `.spring-target` → `--color-progress`)"* — an
inheritance that does not occur, and `resolveTone()` (`SpringHeatmap.vue:114-121`) reads
`--ball-tone` first and silently falls through. Correct by fallback, wrong by
description; it will bite the first time a scene re-tints `--ball-tone` and expects the
rail panel to follow.

**Falsifier.** An ancestor of `SpringPhysicsFacet` setting `--ball-tone` —
`grep -rn "\-\-ball-tone:" demo/` returns exactly the three subject-element sites above.

---

## 5. Superlatives (L-18 runs both ways)

### ★ S-1 · The 60 Hz painter is genuinely state-of-the-art compositor discipline

`:151-162` + `:187-198`:

```js
if (el) el.style.transform = `translateX(${clamp(values[i] ?? 0, 0, 1) * 100}cqw)`;
```

```css
.preset-track { container-type: inline-size; }
.preset-ball  { --ball-size: 0.85rem; left: 0; margin-left: calc(var(--ball-size) / -2); will-change: transform; }
```

Four things are right at once, and each is a thing most implementations get wrong:

- **`transform`, never `left`** — compositor-only, no layout on any frame.
- **`cqw` instead of a measured width** — the percentage resolves against the track's own
  inline size, so the painter performs **zero geometry reads**. The usual shape of this
  code caches `el.offsetWidth` and desynchronises on resize; this one cannot.
- **`left: 0` + negative half-size margin** — centring done in the cascade, not in the
  hot path, so the per-frame string is a single interpolation.
- **`clamp(v, 0, 1)`** at the boundary — a spring that overshoots past its target cannot
  push the ball outside the rail, and the parent `Card` carries `overflow-visible`
  (`:21`) so no clip fights it.

This is materially better than the `.progress-ball` idiom's own default and better than
what the timeline cluster does (`TimelineCaret.vue:4`, `left: ${position}%` — census S-3).
It should be the pattern S-3's replacement wave adopts.

### ★ S-2 · The subgrid consume that re-authors nothing

`:26-47` wraps both sliders in a single `.labeled-field-grid`, and the scoped style block
opens by explicitly declining to add anything (`:176-178`):

```css
/* ── §LABEL-subgrid consume ──
   The params ride the shared `.labeled-field-grid` idiom (design-idioms.css —
   the DRY home). Nothing is re-authored here. */
```

The idiom (`design-idioms.css:255-273`) sizes the auto label column once from the widest
label across all participating rows via `grid-template-columns: subgrid`, and handles the
error region and non-field children with `grid-column: 1 / -1`. The component gets a
uniform label column for `response` / `damping (ζ)` for zero CSS, and the *comment
documenting that it wrote nothing* is exactly the right artefact — it prevents the next
author from "fixing" the alignment locally.

(This excellence is what makes M-1 sting: the structure is right, and a dead prop
undoes the typography on top of it.)

### ★ S-3 · `:framed="false"` — refusing card-in-card by consuming the primitive's own contract

`:119` — `<KeyframesEditor :animation="demo.springEditAnim" :framed="false" />`.

The lazy fix for a nested editor is a scoped `:deep(.card) { border: none; padding: 0 }`.
Instead the component uses the prop the primitive exposes for exactly this
(`KeyframesEditor.vue:132-139`), which drops the inner `Card` element entirely rather
than styling it into invisibility — so the per-stop list flows into this facet's single
quiet surface with no dead wrapper, no specificity war, and no `:deep()` reaching into
another component's internals. That is the glass-ui single-surface contract honoured at
the structural level, and the template comment (`:114-118`) records *why* rather than
*what*.

---

## 6. Corpus reconciliation

| corpus id | this challenge |
|---|---|
| `lane-frontend.md` F-1 (glass-ui phantom dependency, RED) | **Consistent — and load-bearing here.** Every substrate claim above is read from the *installed* 7.0.0 that F-1 says is undeclared and unlocked. If `npm ci` ever reconstructs from the lockfile, B-1 / M-1 / M-6 change shape entirely because the prop and cascade surfaces would come from a different (or absent) build. F-1 must land before any fix below is verifiable. |
| `lane-frontend.md` F-6 (glass-ui *import* boundary clean) | **Not contradicted.** This component imports only real subpaths (`@mkbabb/glass-ui`, `/labeled-field`, `/chip`). The rot found here is on the **prop** and **class** boundaries, which F-6 did not audit. B-1 / M-1 / M-2 extend the census rather than dispute it. |
| `lane-frontend.md` S-1 (KfPillTabs fork) | **Corroborated, tangentially.** `SpringPhysicsFacet.vue:7` is one of the two prose-only "the KfPillTabs strip is gone" sites S-1 identifies; correct — this file renders no pill strip. |
| `lane-frontend.md` §6.5 (PRM: "conscientious but inconsistent in mechanism") | **Sharpened, and contradicted in one direction.** §6.5 counts `SpringHeatmap.vue:333` among the 13 enforcement sites, which is true. It does not observe that the spring scene's rAF loop — the largest motion source in the scene — has **no** gate in any mechanism (M-5). The count is right; the coverage inference from it is not. |
| `lane-frontend.md` §6.3 (98 unprefixed demo tokens, no `--kf-*` namespace) | **One concrete instance.** This component reads `--color-progress`, `--duration-fast`, `--radius-md`, `--ball-size`, `--ball-glow`, `--rail-tint`, `--background`, `--foreground` — all flat-namespace, all shared with glass-ui's. `--ball-tone` (i-4) is the case where the flat namespace *plus* a subtree assumption produces a documented mechanism that does not run. |
| `docs/tranches/G/audit/a-styling.md:355,357` (demo has "zero `!important`"; "`btn-interactive` consume glass-ui idiomatically") | **Both falsified by this file** — 2 of the demo's 4 `!important`s are at `:217`/`:221` (M-3), and `btn-interactive` resolves nowhere (M-2). Two stale exemplary rows to strike. |
| `LESSONS-LEARNED.md:603` (Q-chron-4, `.btn-interactive` retired under a false zero-site verdict) + `:594` (Q-chron-3, codification without a gate) | **Live proof of both.** The phantom class survives at 8 sites; the gate prescribed to catch it (`proof-phantom-classes.mjs`, `.retired-classes.txt`) is absent from `scripts/`. |

---

## 7. Fix order (dependency-respecting)

1. **census F-1 first** — declare + lock `@mkbabb/glass-ui@7.0.0`. Nothing below is
   reproducible until the substrate is pinned.
2. **B-1 + M-1** — one edit, 13 sites: `tooltip=` → `description=`, delete `label-class=`
   (or move the register into glass-ui's `Label`). Restores the explanatory copy, the
   `aria-describedby` wiring, and the uniform label register.
3. **B-2** — give `.preset-grid` a visible section label matching its three siblings, and
   `role="radiogroup"` + `aria-labelledby` (or keep the toggles and add
   `role="group"` + name, accepting the un-pressable-active behaviour).
4. **M-2** — decide `btn-interactive`: restore the definition in `design-idioms.css`, or
   delete all 8 call-sites. Ship `proof-phantom-classes.mjs` + `.retired-classes.txt` in
   the same wave, per the lesson its own absence proves.
5. **M-6 + M-3** — stop fighting `shape="cell"`. Either accept the variant geometry and
   delete the overriding utilities, or drop to `shape="pill"`/unshaped and own the
   geometry; then replace both `background: … !important` with `background-color:` and
   set `--chip-flood-t: 0` (or pass `tone="var(--color-progress)"` and let glass-ui own
   the selected treatment outright).
6. **M-4** — falls out of 5: with one selected treatment instead of two, re-measure; if
   still < 4.5:1, drop the numerals to `--foreground` on the active cell or reduce the
   wash from 12%.
7. **M-5** — gate the loop, or the preset painters, on
   `window.matchMedia("(prefers-reduced-motion: reduce)")` following
   `useCubeDemo.ts:164`; or pass the engine's `honorReducedMotion`.
8. **m-1 → m-6, i-1 → i-4** — independently landable.
