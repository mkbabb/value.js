served model id: `claude-opus-5[1m]`

# CHALLENGE · EasingSidebar · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/easing/EasingSidebar.vue` (234 L)
**Posture** assume DEFECTIVE until the tree proves otherwise; every claim carries its own falsifier; a false defect costs more than a missed one.
**Method** static, source-derived only. No browser. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE** and handed to the SS-13 visual audit.

## Read set (whole, read-only)

| File | Why |
|---|---|
| `demo/scenes/easing/EasingSidebar.vue` | target |
| `demo/scenes/easing/easingKeys.ts` | direct import |
| `demo/scenes/easing/useEasingDemo.ts` | the `EasingDemoContext` type + every seam the panel writes |
| `demo/utils/reference-data/animationDescriptions.ts` | `NAMED_EASING_BEZIER` |
| `node_modules/@mkbabb/glass-ui/dist/components/easing/EasingPicker.vue.d.ts`, `constants.d.ts`, `dist/easing.js` | the vendor primitive, **7.0.0**, built source read whole |
| `node_modules/@mkbabb/glass-ui/dist/components/labeled-field/*.d.ts`, `dist/labeled-field.js` | `LabeledSlider` prop surface + markup |
| `node_modules/@mkbabb/glass-ui/dist/components/card/Card.vue.d.ts`, `components/surface/Surface.vue.d.ts` | `cartoon` / `tier` |
| `node_modules/@mkbabb/glass-ui/dist/components/slider/types.d.ts`, `dist/slider-DDia69Fy.js` | `SliderProps`; `data-slot="slider"` / `.slider-track` |
| `node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css` | `@utility text-mono-caption` |
| `node_modules/@mkbabb/glass-ui/dist/glass-ui.css` | `.labeled-field`, `.glass-slider`, `.glass-label` |
| `node_modules/@mkbabb/value.js/dist/subpaths/easing.js` | `bezierPresets` key set |
| `demo/utils/reference-data/easingGroups.ts` | which tiles are reachable |
| `demo/scenes/easing/EasingScene.vue`, `EasingTarget.vue` (partial) | mount context + the competing header literal |
| `demo/styles/style.css`, `design-idioms.css`, `font-roles.json` | rail geometry, the demo-typography layer, the mono contract |
| `demo/components/instrument/transport/channel-controls/TimingFunctionPanel.vue` | the **second** host of the same primitive |
| `demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.css` | rail padding |

**Hitherto corpus folded.** `formation/keyframes/lane-frontend.md` — **F-1** (glass-ui a phantom dependency, 7.0.0 installed, undeclared/unlocked) is the load-bearing premise for D-3 below; §5 **S-1…S-8** shadow census (EasingSidebar contributes **zero** shadow lines — see S-1 superlative); §6.5 reduced-motion (EasingSidebar is **not** among the 13 enforcement sites; §D-10); row `:245` classes this file `G` (glass-conformant) — this challenge **partially contradicts** that grade: the *imports* are conformant, the *props passed to them* are not (D-7).

---

# BLOCKERS

## D-1 · `smooth-step-3`: the panel asserts two contradictory things on the same tick — BLOCKER

Select the `smooth-step-3` tile (Cubic family). Two mutually exclusive statements render simultaneously:

1. `EasingSidebar.vue:42-49` renders the catalogue-gap caption — *"smooth-step-3 is engine-native — editing here authors a custom cubic-bezier"*. It fires because `syncGap` (`:132-137`) tests `!demo.isBezierEditable`, and `isBezierEditable` (`useEasingDemo.ts:73-76`) is `n === "cubic-bezier" || n in NAMED_EASING_BEZIER` — and `NAMED_EASING_BEZIER` (`animationDescriptions.ts:19-49`) has **no** `smooth-step-3` key.
2. On the *same* watch callback (`:159-166`), `seedFor("smooth-step-3")` (`:112-114`) tests `name in bezierPresets` — and value.js's `bezierPresets` **does** carry `"smooth-step-3": [.65, 0, .35, 1]` (`node_modules/@mkbabb/value.js/dist/subpaths/easing.js`, key list: `linear, ease, ease-in, ease-out, ease-in-out, smooth-step-3, ease-in-sine … ease-in-out-back`). So the picker remounts seeded on the exact preset and draws the curve as one cubic-bezier.

The caption says *this curve is not expressible as a cubic-bezier*; eight pixels below it the picker exhibits it as one, by name, from the vendor's own catalogue. The panel's single most-emphasised piece of editorial copy is falsified by the widget directly above it.

Reachability is not hypothetical: `EasingTarget.vue:158` `SPECIMEN_GROUPS = EASING_GROUPS.filter(g => g.family !== "Custom")` renders every non-Custom family, and `easingGroups.ts:60` `item("smooth-step-3", "Hermite interpolation")` sits in Cubic.

The root cause is a **two-catalogue design**: the demo keeps a private `NAMED_EASING_BEZIER` (29 keys) while the vendor ships `bezierPresets` (30 keys) and the tile gallery is driven by a **third** roster (`EASING_GROUPS`). The comment at `:86-89` acknowledges the divergence ("the demo's named map is wider (quart/quint) and differs on some quads (sine)") but reasons about it in one direction only — it never notices the vendor map is *also* wider on `smooth-step-3`, and that the two predicates therefore disagree on exactly one tile.

**Falsifier** — any one of these kills the claim: (a) `bezierPresets` in the installed value.js lacks `smooth-step-3`; (b) `NAMED_EASING_BEZIER` gains it; (c) the `smooth-step-3` tile is not rendered (e.g. `EASING_GROUPS` is filtered further downstream than `:158`). All three were checked at HEAD and none holds.

## D-2 · Steps count and jump term are inert controls whenever `step-start` / `step-end` is selected; two contradictory literals render on one screen — BLOCKER

Select the `step-start` tile (`easingGroups.ts:95`, rendered by `EasingTarget.vue:158`). `seedFor` (`:100-110`) remounts the picker in `steps` mode with `{steps:1, term:"jump-start"}`. Now drag the picker's **Steps (n)** slider to 6.

- The picker's own caption updates live — `"Steps (n) — " + steps` (`glass-ui/dist/easing.js`, the steps-mode block; pretty-printed line 638). Positive visual feedback.
- Its readout literal updates to `steps(6, jump-start)` (`easing.js`, `u = d(() => n.value === "steps" ? \`steps(${s.value}, ${c.value})\` : …)`).
- `onPickerChange` (`:186-193`) writes `demo.stepOptions.value = {steps:6, jumpTerm:"jump-start"}`, then — line `192` — `if (!demo.isSteps.value) demo.selectEasing("steps")`. `isSteps` (`useEasingDemo.ts:68-71`) is **already true** for `"step-start"`, so the name is never promoted.
- `currentEasingName` therefore stays `"step-start"`, and **every** consumer of `stepOptions` in the demo gates on the name being exactly `"steps"`:
  - `currentEasingFn` (`useEasingDemo.ts:78-91`) → falls to `namedEasing("step-start")`.
  - `cssValue` (`:93-104`) → returns the bare `"step-start"`.
  - `svgPath` (`:106-114`) → `generateStepSVGPath(1)`, hard-coded `1`.
  - `EasingTarget.vue:209-219` `literal` → returns the bare name.

So the animation, the CSS twin, the plotted specimen path and the scene header all continue to describe a **1-step** curve while the editing surface displays a **6-step** one. The scene header reads `step-start`; the sidebar readout, forty pixels away, reads `steps(6, jump-start)`. Only the header is true.

This is worse than a no-op: the control moves, the readout changes, and the *copy* affordance (`easing.js` `et()`, the clipboard write of `R.value`) hands the user a literal the application is not using. It defeats the stated thesis of the whole panel — *"the COMPLETE re-parseable readout literal … the F7 truncation class is dead by construction"* (`:7-8`). The literal is complete and re-parseable and **wrong**.

The **Jump term** select is inert by the same path, and admits an incoherent state: `step-start` with `term: "jump-end"`.

**Falsifier** — a consumer of `stepOptions` outside the `name === "steps"` gate would kill this. `grep -rn "stepOptions" demo/scenes/easing/` returns exactly six sites: three in `useEasingDemo.ts` (all name-gated), two seeds and one write in `EasingSidebar.vue`, and `EasingTarget.vue:212` (also `name === "steps"`-gated). None compensates. Equally, if `EASING_GROUPS` did not expose `step-start`/`step-end` the branch would be dead — `easingGroups.ts:95-96` exposes both.

---

# MAJOR

## D-3 · The remount-on-selection is a workaround for a vendor gap that closed three majors ago; it destroys focus, and the keyboard repro is deterministic — MAJOR

`EasingSidebar.vue:18-20` states the governing premise:

> *"glass-ui 4.0.1's modelValue is EMIT-ONLY (no external write-through / points-in prop), so a remount is the only blessed re-seat seam"*

Against the installed tree this is false on both counts. The installed glass-ui is **7.0.0** (`node_modules/@mkbabb/glass-ui/package.json`; corroborated by lane-frontend **F-1**), and:

- `components/easing/EasingPicker.vue.d.ts:19-22` declares `__VLS_ModelProps = { modelValue?: EasingPickerValue }` — a real model prop, not an emit-only channel.
- `dist/easing.js` binds it with `useModel` (`let l = te(e, "modelValue")`) and installs an **inbound** watcher `k(l, We, {deep:!0, immediate:!0})`. `We` applies an external write into internal state: it sets mode, calls `setHandle(0, points[0], points[1])` and `setHandle(1, points[2], points[3])`, clamps and assigns `steps`, and assigns `term`.
- The vendor even ships the echo-suppression the demo re-implements: the structural comparator `q(a,b)` plus the `J` last-emitted latch guard the loop in both directions.

So `pickerSeed` / `seedFor` / `seedCount` / `isSeedEcho` and the `:key` (`:28`, `:85-166`) — roughly 60 of 234 lines, **26 % of the file** — re-implement, in the consumer, machinery the vendor now provides, and pay a design price for it that write-through would not:

**Focus and state are destroyed on every re-seat.** The picker's subtree owns four focusable nodes: two bezier handles (`role="slider" tabindex="0"`, `easing.js` handle block), the Preset `SelectTrigger`, the readout `<code tabindex="0">`, and the Copy `<button>`. A `:key` change unmounts all of them; focus falls to `<body>` (WCAG 2.4.3 Focus Order; 3.2.2 On Input — a change of context the user did not request). The copy state machine (`X ∈ idle|pending|copied|failed`) and its `role="status" aria-live="polite"` region reset with it, so a *"Copied curve literal."* announcement can be torn out mid-utterance.

The remount is reachable **without leaving the sidebar**, deterministically, by keyboard:

1. Focus bezier handle 1 (`tabindex="0"`). `Home` → `x1 = 0`. `ArrowDown` ×10 → `y1 = 0` (the handler steps 0.01, or 0.1 with Shift, and quantises via `+a.toFixed(3)`).
2. Focus handle 2. `End` → `x2 = 1`. `ArrowUp` → `y2 = 1`.
3. Points are now exactly `[0,0,1,1]`. `onPickerChange` (`:205-209`) calls `nameForQuad`, which matches `NAMED_EASING_BEZIER.linear` (`animationDescriptions.ts:48`) within the 5e-4 tolerance, and calls `demo.selectEasing("linear")`.
4. The watch (`:159-166`) runs `seedFor("linear")`; `"linear" in bezierPresets` is **true**; `pickerSeed` changes; **the picker remounts under the user's fingers and focus is lost to `<body>`.**

The same trip is reachable by pointer for any quad within 5e-4 of a named curve — rarer by drag, but the `Home`/`End`/arrow path above needs no luck at all.

The comment at `:23` ("A custom drag (name → \"cubic-bezier\") does NOT remount") is correct but incomplete: it accounts for the *miss* case and never for the *hit* case its own `nameForQuad` manufactures.

Note this premise is **propagated, not local**: `TimingFunctionPanel.vue:26-27` carries the identical "glass-ui 4.0.1's modelValue is emit-only" claim and the identical `:key` workaround. Fixing one without the other leaves the demo with two divergent seat disciplines for one primitive.

**Falsifier** — any of: (a) the installed `EasingPicker` has no `modelValue` prop, or no inbound watcher applying it; (b) the inbound watcher exists but cannot reach points/steps/term; (c) `"linear" ∉ bezierPresets`; (d) `NAMED_EASING_BEZIER` lacks `linear`. All four checked; none holds. Note the claim is about the **installed** tree only — if the intended pin is genuinely 4.0.1, the correct finding is F-1 (the pin does not exist) rather than this one, and this defect converts into "the code is pinned to a version the lockfile cannot produce."

## D-4 · The picker's two-column split is **viewport**-gated inside a 400–512 px rail; the `container-type` cure fixes only half the problem — MAJOR

`EasingSidebar.vue:214-220` is explicit about what it is curing:

> *"the facet body is a container so the picker's `38cqi` canvas sizing resolves off the CONTAINER inline size, not the viewport"*

That half is right and well-judged (see superlative S-2). But the picker's **root** carries a viewport media variant the container cannot touch:

```
class: "grid gap-4 lg:grid-cols-[1fr_18rem]"      // glass-ui/dist/easing.js, render root
```

`lg:` in Tailwind v4 compiles to `@media (width >= 64rem)` — a viewport query. `container-type: inline-size` has no bearing on it. The class *is* compiled into the demo's build: glass-ui's `dist/styles/index.css` ends with `@source "../*.js"`, which scans `dist/easing.js`.

Now the geometry. The panel mounts in the controls rail:

- `demo/styles/design-idioms.css:47` — `--rail-width: clamp(25rem, 33svi, 32rem)` → **400 px … 512 px**.
- `ControlsPaneWrapper.css:127` — `width: var(--rail-width)`; `:133-135` — `padding-left/right: 12px`.
- `EasingSidebar.vue:15` — `CardContent … px-4` → 32 px more.

Picker container ≈ **344 px** (rail at floor) … **456 px** (rail at cap).

At any viewport ≥ 1024 px the grid becomes `1fr 18rem` with `gap-4`. The fixed column plus gap is `288 + 16 = 304 px`, leaving the curve canvas **≈ 40 px** (rail floor) to **≈ 152 px** (rail cap) — against a canvas whose own `block-size: clamp(200px, 38cqi, 320px)` floors its height at 200 px.

The bezier plot is a **unit square** drawn with `preserveAspectRatio="xMidYMid meet"`. A 152 × 200 box letterboxes it to 152 × 152 with 48 px of dead band; a 40 × 200 box is not a curve editor. Either the grid crushes the canvas or the `1fr` track's auto-minimum wins and the grid **overflows** — and `EasingSidebar.vue:14` sets `overflow-visible` on the Card, so nothing clips the spill.

This is the same defect class the scoped comment claims to have retired, surviving in the dimension that matters more: the container query governs the canvas's *height*, the media query governs whether there is any width left to draw in.

**Falsifier** — kills the claim: (a) the demo's Tailwind maps `lg:` to a container variant rather than `@media` (it cannot; `lg:` is a breakpoint variant by construction, and redefining `--breakpoint-lg` moves the threshold, not the mechanism); (b) `lg:grid-cols-[1fr_18rem]` is never emitted (the `@source "../*.js"` line above says otherwise); (c) the panel does not in fact mount in the `--rail-width` rail; (d) some ancestor overrides `grid-template-columns` for this subtree — no such rule exists in `EasingSidebar.vue`'s scoped block or `design-idioms.css`.
**UNPROVEN-NEEDS-LIVE** — which branch occurs (crush vs. overflow) and the exact used canvas width. Hand to SS-13 at 1024 px and 1600 px.

## D-5 · The catalogue-gap caption is English prose poured into an **uppercase mono caption** register — and it uppercases the CSS identifiers — MAJOR

`EasingSidebar.vue:42-49` renders a full sentence in `class="text-mono-caption text-muted-foreground"`. The utility (`glass-ui/dist/styles/typography/utilities.css`) is:

```css
@utility text-mono-caption {
    font-family: var(--font-mono);
    font-size: var(--type-caption);
    letter-spacing: var(--type-tracking-caps);
    text-transform: uppercase;          /* ← */
}
```

`--type-caption: clamp(0.75rem, 0.71rem + 0.21vw, 1rem)` — 12 px at typical widths. So the shipped string is, at 12 px, in Fira Code, letter-spaced, muted:

> `SMOOTH-STEP-3 IS ENGINE-NATIVE — EDITING HERE AUTHORS A CUSTOM CUBIC-BEZIER`

Two distinct defects sit here.

**(a) Register misuse.** `text-mono-caption` is an *eyebrow / section-label* register, not a body register — glass-ui's own `.section-label { @apply text-mono-caption; color: var(--muted-foreground); }` in the same file establishes exactly that. All-caps at caption size destroys word-shape cues and is a long-standing legibility anti-pattern for running prose; it also risks per-letter spell-out in some AT configurations. Ten words of explanatory copy is not an eyebrow.

**(b) The identifiers stop being identifiers.** `smooth-step-3` renders as `SMOOTH-STEP-3` and `cubic-bezier` as `CUBIC-BEZIER`. Both are CSS identifiers; both are presented here as the authoritative name of the user's selection. On a surface whose entire editorial thesis is literal fidelity — *"the COMPLETE re-parseable readout literal"* (`:7-8`), *"the header literal — COMPLETE and re-parseable, never truncated"* (`EasingTarget.vue:208`) — the demo uppercases the one place it names the curve outside the vendor widget. A user cannot copy what they read.

This also strains the repo's own written law. `demo/styles/font-roles.json` `_monoContract` (T.D4, RULED) licenses `data-register="code"` for *"an explicit identifier **chip**… (curve names, CSS keywords, the @mbabb handle, preset names)"* and closes with *"A new demo-authored mono UI label reds the census."* `EasingSidebar.vue:45-46` marks a whole prose sentence `data-register="code"`, so the census's `monoAllowedSelectors` allowlist absorbs it silently — the sentence is laundered through the identifier-chip exemption. The conformant shape is a chip on the **name** and the body register for the **sentence**.

**Falsifier** — a demo-side reset of `text-transform` for this element. `@layer demo-typography` (`style.css:263-294`) contains no `text-transform` declaration at all, and no `[data-register]` CSS rule exists anywhere in `demo/styles/`. Also killed if `text-mono-caption` resolved to a different utility — it is defined exactly once, in the file quoted.

## D-6 · The caption is a `v-if` insert with no live region — silent to assistive tech, on a surface where the vendor announces two lesser messages — MAJOR

`EasingSidebar.vue:42-49` inserts and removes the catalogue-gap paragraph reactively (`v-if="catalogueGap"`). It carries no `role="status"`, no `aria-live`, and is not referenced by `aria-describedby` from any control. A screen-reader user who selects `ease-in-bounce` receives nothing: the tile activates, the editor's meaning silently changes from *"this edits your curve"* to *"this abandons your curve for a custom bezier"*, and the only notice of that change is visual.

The bar is set inside the very component it sits above. `glass-ui/dist/easing.js` gives `role="status" aria-live="polite"` to **two** strictly less consequential messages: the clipboard state (*"Copying curve literal…"* / *"Copied curve literal."*) and the preview playback state (*"Preview idle"*). The demo's own message — the one that tells the user their edit will not do what they think — is the unannounced one.

Cheap and blessed fixes both exist: `role="status" aria-live="polite"` on the `<p>`, or route the text through `LabeledField`'s `description` slot which already wires `aria-describedby` (`labeled-field.js`, `u = f(() => [description ? s : undefined, …])`).

**Falsifier** — an ancestor live region wrapping the panel, or an `aria-describedby` pointing at this node. `EasingSidebar.vue` renders four elements total and none carries either; `EasingScene.vue:57` mounts it via `h(EasingSidebar, { demo })` with no wrapper attributes.

## D-7 · `tooltip` and `label-class` are **not props** of `LabeledSlider`; they land as inert DOM attributes, and the unit `(ms)` exists only inside one of them — MAJOR

`EasingSidebar.vue:53-63`:

```vue
<LabeledSlider
    class="duration-field"
    :model-value="demo.duration.value"
    label="duration"
    label-class="text-small font-medium text-muted-foreground"   ← not a prop
    tooltip="Sweep duration (ms)"                                 ← not a prop
    …
/>
```

The prop surface is closed and enumerable:

- `LabeledSliderProps = Omit<SliderProps,"class"|"modelValue"> & LabeledFieldCommonProps & {modelValue:number}` (`components/labeled-field/types.d.ts`).
- `LabeledFieldCommonProps = { label, description?, requirement?, layout?, errorLive? }` — no `tooltip`, no `labelClass`.
- `SliderProps extends SliderRootProps { class?, variant?, size?, marks?, invalid?, keepDockOpen?, motion? }` (`components/slider/types.d.ts`) — no `tooltip`, no `labelClass`. reka's `SliderRootProps` has neither.
- The built component confirms it: `labeled-field.js` lists `LabeledSlider`'s props explicitly (`variant, size, marks, invalid, keepDockOpen, motion, defaultValue, disabled, orientation, dir, inverted, min, max, step, minStepsBetweenThumbs, thumbAlignment, asChild, as, name, required, label, description, requirement, layout, errorLive, modelValue`). Neither name appears.

`inheritAttrs` is not disabled, and `LabeledSlider` renders a single root (`LabeledField`), so both fall through as **literal DOM attributes** on `div.labeled-field`:

```html
<div class="labeled-field duration-field" label-class="text-small font-medium text-muted-foreground"
     tooltip="Sweep duration (ms)" data-layout="default" …>
```

Consequences:

1. **The unit never reaches anyone.** `tooltip` is not `title`; it has no native behaviour, no AT exposure, no visual affordance. The string `"(ms)"` appears exactly once in the component, inside an attribute the browser ignores. Sighted and AT users alike get a slider labelled `duration` over an unlabelled magnitude.
2. **The blessed seam was available and unused.** `description` is a real prop; `LabeledField` renders it as `<p class="labeled-field-description">` and folds its id into the computed `aria-describedby` handed to the slider thumb (`labeled-field.js`). `description="Sweep duration in milliseconds"` would have solved it for both audiences in one token-styled node.
3. **Invalid markup.** Two non-`data-` unknown attributes on a `<div>`.

One honest mitigation: the *visual* outcome of the dead `label-class` is benign — `.glass-label` already resolves `font-family: var(--font-text); font-size: var(--type-small); font-weight: 500` (`glass-ui.css`), which is the design-system value; the requested `text-muted-foreground` would in fact have been a **deviation** (`.glass-label` uses `color: var(--foreground)`). So the defect is the dead prop and the lost unit, not a visual regression. Stating it the other way would be the false defect.

**Falsifier** — `tooltip`/`labelClass` appearing in `LabeledSliderProps`, `SliderProps`, `SliderRootProps` or the built props list; or `inheritAttrs:false` on `LabeledSlider`. None holds.

## D-8 · The duration slider ships no visible value readout — while the vendor control 12 px above it does — MAJOR

`LabeledField` renders label → optional description → control (`labeled-field.js`); the glass `Slider` renders `SliderTrack` → optional `.slider-mark`s → `SliderRange` → `SliderThumb` (`slider-DDia69Fy.js`). No numeric text anywhere. `marks` is not passed (`EasingSidebar.vue:53-63`), so there are not even decorative checkpoints.

So a sighted user drags `duration` across `[300, 5000]` in 100 ms steps with **no number and no unit** — position on a bar is the entire feedback. AT users fare better: reka's thumb carries `aria-valuenow`, so they at least get an (unitless) integer. An accessibility surface that is *better* for AT than for sighted users is a design inversion, not a win.

The bar is again set in-panel: the picker's steps control renders `"Steps (n) — " + steps` (`easing.js`), a live value welded into the label. Two sliders, adjacent, in one card; one narrates itself, the other does not.

**Falsifier** — a value bubble in the glass `Slider` markup, a `marks` array, or a demo-side `::after` counter. `slider-DDia69Fy.js` renders no text node; `EasingSidebar.vue`'s scoped block (`:214-233`) contains no generated content.

## D-9 · The scoped block halves the design system's label→control gap, producing two rhythms for one relationship in one card — MAJOR

`EasingSidebar.vue:224-229`:

```css
.panel-content :deep(.labeled-field.duration-field) {
    display: flex; flex-direction: column; align-items: stretch; gap: 0.25rem;
}
```

The vendor default (`glass-ui.css`) is `.labeled-field { gap: calc(var(--spacing) * 2); inline-size: 100% }` — with Tailwind v4's `--spacing: 0.25rem`, that is **0.5 rem**. The override writes a hard-coded `0.25rem`, halving it and detaching it from the token.

The proportion cost is visible without a browser. Inside the same `CardContent`, the picker's own label→control groups are `flex flex-col gap-2` — **0.5 rem** (`easing.js`, the Preset and Jump-term blocks). So the panel presents the *same* relationship — a field label sitting above its control — at 8 px inside the picker and 4 px in the duration field, eight pixels apart. The eye reads inconsistent binding strength where the semantics are identical. Aristotelian proportion is about *the same relation reading the same way*; this is the one thing the panel's own hand changed, and it changed it out of step.

The stacking half of the override is, additionally, redundant — see D-11.

**Falsifier** — a `.labeled-field` gap other than `calc(var(--spacing)*2)`, a non-0.25rem `--spacing`, or a picker label group at a gap other than `gap-2`. All three checked at HEAD.

## D-10 · `:playback="false"` strips the only motion preview from the authoring surface, on the reasoning that the gallery supplies it — which fails where the sidebar is a sheet — MAJOR

`EasingSidebar.vue:33` disables the picker's playback affordance. That removes, together: the travel dot, the Play / Cancel buttons, and the `role="status" aria-live="polite"` preview-state region (`easing.js`, the `e.playback ? … : null` block). The picker's entire reduced-motion apparatus — `useReducedMotion`, the sync-flush watcher that snaps `progress` to 1, the one-shot rAF `playTravel` — becomes dead code on this surface.

The stated justification (`:22-26`) is *"the gallery race IS the motion preview, so a second uncoordinated clock stays off this surface."* On desktop, with the rail open beside the stage, that reasoning holds and is good taste. It does not hold on mobile: the controls surface is a **sheet** (`ControlsPaneWrapper.css:12-18` — the drawer/snap-fraction path), so while the user is authoring a curve the gallery is behind it. The panel then offers curve authoring with **no** way to see the curve move — the vendor's built-in single-shot preview having been removed precisely because a preview existed elsewhere.

The reduced-motion ledger is a related, secondary observation: lane-frontend §6.5 enumerates 13 PRM enforcement sites and EasingSidebar is not among them. That is *currently* correct-by-vacuity (this component animates nothing of its own), but it means restoring `:playback` would land motion on a surface with no local PRM discipline — the vendor's `useReducedMotion` would have to be trusted to carry it, which it does (`easing.js` snaps `progress` to 1 and skips the rAF when reduced motion is set). Worth recording so a future fix does not re-derive it.

**Falsifier** — desktop-only mounting (i.e. the sidebar is never a sheet), or a preview affordance elsewhere in the sheet. `EasingScene.vue:38-40` explicitly documents the mobile sheet path ("On mobile the sheet is born at peek by the host mount-reset"), so the sheet case is real.
**UNPROVEN-NEEDS-LIVE** — how much of the gallery the sheet occludes at peek vs. full. Hand to SS-13 at 390 px.

---

# MINOR

## D-11 · Roughly half the scoped stylesheet restates the vendor default — MINOR

`EasingSidebar.vue:222-223` states the goal: *"The duration control is FULL-WIDTH (the J3 posture): label on its own line, the slider track spans the panel inner width."* Every clause of that is already true before the override runs:

| Demo declaration | Vendor default already in force |
|---|---|
| `display:flex; flex-direction:column` (`:225-227`) | `.labeled-field { display: grid }` at `data-layout="default"` — label block above control block (`glass-ui.css`; `labeled-field.js` renders `.labeled-field-copy` then `.labeled-field-control`) |
| `align-items: stretch` | grid default is `stretch` |
| `[data-slot="slider"] { width:100% }` (`:230`) | `.glass-slider { inline-size: 100% }` |
| `.slider-track { width:100% }` (`:231`) | `.slider-track { width: 100% }` |

Only the `gap` is a real change, and that one is a defect (D-9). The block therefore buys one regression and nothing else, at the cost of **three** vendor-internal selectors (`.labeled-field`, `[data-slot="slider"]`, `.slider-track`) pierced with `:deep()` — a private-API coupling that any glass-ui internal rename breaks silently. The vendor even ships the intended knob as a public prop: `layout: "default" | "horizontal"`, defaulted to `"default"`, i.e. exactly the posture being hand-rolled.

**Falsifier** — a `.labeled-field` default of `display:flex`/`inline`, or a `.glass-slider` without `inline-size:100%`. Both quoted from `glass-ui.css` above.

## D-12 · Label case is inconsistent within one card — MINOR

`EasingSidebar.vue:56` sets `label="duration"` (lowercase). The three vendor labels in the same `CardContent` are Title case: `Preset`, `Steps (n)`, `Jump term` (`easing.js`). One demo-authored label against three vendor labels, and the demo's is the odd one. `--type-tracking-caps` is not involved here (`.glass-label` has no transform), so what renders is literally `duration` beneath `Preset`.

**Falsifier** — a demo `text-transform: capitalize` on `.glass-label`. `@layer demo-typography` (`style.css:263-294`) contains no such rule.

## D-13 · `container-name: easing-editor` is inert — MINOR

`EasingSidebar.vue:219`. `container-type: inline-size` (`:218`) is what makes the vendor's `38cqi` resolve — and unnamed `cqi` units resolve against the *nearest* size container regardless of name. Nothing in the demo or in glass-ui writes `@container easing-editor (…)`. The name is a no-op that reads as a contract. Container names are also not scoped by `<style scoped>`, so it enters a flat global namespace for no benefit — a mild instance of the flat-namespace hazard this axis watches for, though the file is otherwise exemplary there (see S-3).

**Falsifier** — any `@container easing-editor` rule in `demo/` or glass-ui `dist/`. None found.

## D-14 · Caption prose: jargon, no terminal punctuation, and it re-states what the scene header already says at display size — MINOR

`EasingSidebar.vue:47-48`: *"{name} is engine-native — editing here authors a custom cubic-bezier"*.

- **"engine-native"** is internal vocabulary. It appears nowhere in the user-facing surface; the user has no concept of *the engine* as distinct from *the library*. It is doing the work of "this curve isn't a bezier."
- **No terminal punctuation** on a complete declarative sentence.
- **Tense/mood**: it is a *warning about a future action* phrased as a *statement of present fact*, so it reads as description ("editing here authors…") rather than caution ("editing here will replace it with…").
- **Redundant naming**: `EasingTarget.vue:25-28` already renders the selected curve name in `text-display` at the top of the stage, and `:31` renders the literal in a `data-register="code"` chip. The caption repeats the name a third time, uppercased (D-5), 12 px tall, muted.

Not trite or cliché — the copy is specific and earnest, which is more than most demo strings manage. It is jargon-leaky and unfinished.

**Falsifier** — the string being vendor-supplied (it is authored here) or "engine-native" appearing in shipped user-facing docs (`grep` across `demo/` finds it only in code comments and this string).

## D-15 · Inherited: the `control-label` font-census role targets a class glass-ui 7.0.0 never emits, so this component's only demo-authored label sits outside the census — MINOR

`demo/styles/font-roles.json:52-57` binds role `control-label` to selector `.labeled-field-label`, and `demo/styles/style.css:276-281` overrides that class, on the stated premise *"glass-ui binds .labeled-field-label to font-family:var(--font-display) at the body rung."*

The installed vendor emits no such class. `Label.vue` renders `class="glass-label"` + `data-slot="label"` (`label-DJA3eNLS.js`), and `grep -c labeled-field-label` returns **0** across `glass-ui.css`, `labeled-field.js` and `label-DJA3eNLS.js`. So the demo override is dead and the census role matches zero elements — `proof:font-census` clause (e) can never red on control labels.

Scope honestly: this is **repo-wide**, not EasingSidebar's doing; the component is simply the instance in front of us (its `duration` label is a control label). Effect is benign — `.glass-label` already resolves `var(--font-text)` / 500, which is precisely what the dead override asked for. The defect is a **vacuous gate**, not a visual regression. Flagged here because a D-axis reader would otherwise assume the label's typography is governed; it is not.

**Falsifier** — `.labeled-field-label` appearing anywhere in the installed glass-ui, or `Label.vue` accepting a class that produces it. Neither holds. (Note this also removes any basis for claiming the label renders in Instrument Serif — it does not; asserting that would have been the false defect here.)

## D-16 · Three glass surfaces stacked, and the demo's two hosts of this primitive disagree about whether to wrap it — MINOR

`EasingSidebar.vue:14` wraps the picker in `<Card cartoon tier="quiet">`. The picker then renders its **own** `glass-card` for the canvas and a **second** `glass-card` for the readout (`easing.js`: `class: "glass-card relative overflow-hidden rounded-card p-3"` and `class: "glass-card flex flex-col gap-2 rounded-card px-3 py-2"`). Three translucent tiers on one axis, plus `cartoon` (a Memphis edge treatment, `Card.vue.d.ts`) on the outermost.

The tell that this is a choice rather than a necessity: the demo's **other** host of the same primitive wraps it in nothing at all — `TimingFunctionPanel.vue:13` uses a plain `<div class="easing-editor grid gap-2 w-full">`. Same vendor component, same `:playback="false"`, same `label`, two different material treatments. One of them is wrong, and the lighter one is the one that lets the picker's own two glass cards read as the hierarchy.

Kept at MINOR because glass depth is a taste judgement and `tier="quiet"` is the correct *choice of tier* if a wrapper is wanted at all.

**Falsifier** — a `tier="quiet"` rule that suppresses the glass material entirely (making the nesting free), or `TimingFunctionPanel` gaining a Card. Neither at HEAD.
**UNPROVEN-NEEDS-LIVE** — whether the compounded backdrop tiers actually muddy legibility. Hand to SS-13.

---

# INFO

## D-17 · Forced-colors: the material hierarchy has nothing to fall back on — INFO

glass-ui ships exactly one `@media (forced-colors: active)` block (`styles/accessibility.css`) and it addresses only selection and invalid state (`[aria-selected="true"]`, `[data-state="checked"]`, `[aria-invalid="true"]` → `Highlight` / `Mark` borders). Nothing forces surfaces. `grep -rn "forced-colors" demo/` returns **zero**.

Under forced colors, the three stacked glass tiers of D-16 all collapse to `Canvas`, and the boundary between the outer Card, the canvas card and the readout card is carried by — nothing. The curve stroke (`stroke-(--easing-curve-accent)` → `var(--motion-accent, var(--viz-legendre))`) is a custom-property stroke on an SVG path; whether it survives forcing is UA-dependent and not decidable here.

Recorded as INFO, not MAJOR: the gap is a vendor-material concern that applies identically to every Card in the app, and EasingSidebar neither causes nor worsens it. **UNPROVEN-NEEDS-LIVE** — hand to SS-13 with Windows HCM or `forced-colors` emulation.

## D-18 · RTL: not decidable, and probably out of scope — INFO

The component's own box properties are logical (Tailwind v4 `px-*` is `padding-inline`), and glass-ui's slider carries `:dir(rtl)` handling (`.glass-slider:dir(rtl) { --slider-range-origin: right center }`). The picker's grid would mirror under RTL, putting the plot on the right; the bezier plot itself must **not** mirror (it is a maths axis), and the `<svg>` correctly has no directional styling.

The one live question is bidi in the caption — a Latin curve identifier opening an RTL sentence (`{{ name }} is engine-native…`) with no `<bdi>` or `dir` isolation. But `grep -rn "dir=" demo/` surfaces no RTL provisioning anywhere in the demo, so there is no RTL mode to be broken. Asserting an RTL defect against an app with no RTL support would be a manufactured finding; recorded as INFO so a future i18n wave inherits the note rather than rediscovering it.

---

# SUPERLATIVES (L-18 runs both ways)

## S-1 · Zero bespoke controls — this file contributes nothing to the shadow census

The template is four elements: `Card` / `CardContent` / `EasingPicker` / one `<p>` / `LabeledSlider`. Every interactive affordance on the surface is a published glass-ui primitive; the file authors no `<button>`, no `<input>`, no hand-drawn `<svg>` control, no local `ui/` copy.

Set against the corpus this is not a low bar cleared, it is the opposite of the prevailing pattern: lane-frontend §5 tallies **1 510 lines** of bespoke-shadowing components across the demo (S-1 `KfPillTabs` 217 L to *replace*, S-3…S-7 1 168 L to *evaluate*). EasingSidebar contributes **zero** to that tally. The header comment (`:2-13`) records why: a hand-rolled 1 082-line `instrument/easing/` cluster (`EasingEditor` + `EasingCurveCanvas` + `DemoControlPoint` + `EasingSelect`) was **deleted** in favour of the vendor primitive. That is the exact motion the shadow census recommends for the other five, executed before the census asked.

**Falsifier** — any control markup authored in this file, or a local re-implementation of a published primitive. Neither exists; the whole template is 52 lines including comments.

## S-2 · The container-query adoption is the right instinct, correctly reasoned

`:214-220` establishes `container-type: inline-size` specifically so the vendor's `block-size: clamp(200px, 38cqi, 320px)` (`easing.js`) resolves against the panel rather than the viewport. This is a genuine, load-bearing container-query adoption: without it a 38 %-of-**viewport** canvas in a 400 px rail is an immediate overflow, and the comment names the mechanism precisely rather than cargo-culting it.

D-4 above is not a retraction of this — it is the observation that the same instinct needed to be carried one step further, to the `lg:` variant the container cannot reach. The half that was done was done correctly.

**Falsifier** — the picker sizing its canvas in `vw`/`%` rather than `cqi`, which would make the container declaration decorative. It uses `38cqi`.

## S-3 · Zero custom properties — the flat-namespace hazard is fully avoided

The named hazard on this axis is a flat `--kf-*` namespace. This file declares **no** custom property at all. The accent reaches the curve through the vendor's own scoped indirection (`--easing-curve-accent: var(--motion-accent, var(--viz-legendre))`, set inline on the picker root in `easing.js`), so the demo neither defines nor overrides a token to get the colour it wants. Every value the component contributes is either a vendor prop or a scoped-class rule.

**Falsifier** — any `--*:` declaration in the `<style scoped>` block or an inline `style` binding. There are none.

## S-4 · The duration bounds are considered, and the lower bound is structurally load-bearing

`min="300" max="5000" step="100"` (`:59-61`) gives 48 discrete stops — one arrow-key press per 100 ms, so the full range is 47 presses rather than the 4 700 a `step="1"` would demand, and the range brackets the useful span of UI motion.

More than taste: `min="300"` structurally excludes zero. `useEasingDemo.ts:185` computes `phase = ((now - startTime) / (duration.value * 2)) % 1` and `:209` computes `startTime = performance.now() - livePhaseValue * duration.value * 2`. A `duration` of 0 divides by zero and yields `NaN` for every painted dot position. The bound is what prevents it, and it is the only thing that does.

**Falsifier** — a clamp elsewhere on the write path. `:62` writes `demo.duration.value = v` raw, unclamped; the slider bound is the sole guard.

---

# Tally

| Severity | Count | Ids |
|---|---|---|
| BLOCKER | 2 | D-1, D-2 |
| MAJOR | 8 | D-3 … D-10 |
| MINOR | 6 | D-11 … D-16 |
| INFO | 2 | D-17, D-18 |
| **Defects total** | **18** | |
| **Superlatives** | **4** | S-1 … S-4 |

**Deferred to SS-13 (live):** D-4 (which failure branch, and the used canvas width at 1024/1600 px), D-10 (sheet occlusion at 390 px), D-16 (compounded backdrop legibility), D-17 (forced-colors rendering). Contrast ratios were **not** computed: `--muted-foreground` resolves through `contrast-color(var(--card))` / `--on-glass-muted` / `--neutral-5` depending on arm and surface, which is a browser-computed value — asserting a ratio from source would have been a manufactured finding.

**Contradiction of the hitherto corpus:** lane-frontend.md `:245` grades this file `G` (glass-conformant). The *import* surface earns that grade (S-1 above is strong). The *prop* surface does not — D-7 shows two of the five attributes passed to `LabeledSlider` are not props of it, and D-11 shows the scoped stylesheet re-implements a public `layout` prop through three `:deep()` piercings of vendor internals. Conformance is a two-sided property and the census measured one side.

**Load-bearing dependency on F-1:** D-3's severity turns on the installed tree being 7.0.0 while the code reasons about 4.0.1. Since lane-frontend F-1 establishes that glass-ui is declared in neither `package.json` nor `package-lock.json`, there is no pin to appeal to — the version the code believes in is unproducible by `npm ci`. Fix F-1 before acting on D-3, or the fix is aimed at a version nothing can install.
