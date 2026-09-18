claude-opus-5[1m]

# CHALLENGE — `CoefficientsSpectrum.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/shared/CoefficientsSpectrum.vue` (168 LOC)
**Axis** L — code correctness · leaks/teardown · wrong types · duplication · colocation · module size (Goldilocks) · composable contracts · error postures · dead code · the viz render path this component touches · the R5-7 template-loop invisibility class
**Posture** DEFECTIVE-until-proven. Every claim carries severity + `file:line` + its falsifier. Superlatives carry the same (L-18 runs both ways).
**Date** 2026-08-04

---

## §0 · Provenance & method

Read whole, read-only: the subject; both consumers (`visualization/CoefficientsPanel.vue`, `equation/EqCoefficientsPanel.vue`); the `#graph` payload (`equation/FrequencyGraph.vue`); the local Tooltip shim (`web/src/components/ui/tooltip/Tooltip.vue` + `index.ts`); the type module (`web/src/lib/types.ts`); the three sibling `spectrumColor` implementations; the app root (`web/src/App.vue`); the four backend producers of `BasisComponent[]`.

Primitive provenance is **first-party at the installed version**, not upstream HEAD:

| Dep | Resolved | Read from |
|---|---|---|
| `@mkbabb/glass-ui` | **4.0.0** (`web/package-lock.json`) | `web/node_modules/@mkbabb/glass-ui/dist/{tooltip.js, TooltipProvider-B3MkB_8P.js, animated-digit.js, useAnimatedNumber-C_3wZLx4.js}` |
| `reka-ui` | **2.9.10** | `web/node_modules/reka-ui/src/Tooltip/TooltipRoot.vue`, `src/Popper/PopperRoot.vue` |
| `vue` / `@vue/runtime-core` | **3.5.38** | `web/node_modules/@vue/runtime-{dom,core}/dist/*.esm-bundler.js` |
| `@mkbabb/keyframes.js` | **4.3.0** | `/Users/mkbabb/Programming/keyframes.js/src/animation/physics/playback.ts` (source read; dist behavior corroborated by symbol grep) |

Where I read glass-ui *source* (`/Users/mkbabb/Programming/glass-ui/src/...`, currently 7.0.0) I re-verified the same fact against the installed 4.0.0 dist before asserting it. No browser tooling was used; two claims are marked **UNPROVEN-NEEDS-LIVE** for SS-13 and are excluded from the blocker count.

**Corpus folded (not re-invented):** `formation/fourier/lane-frontend.md` (§4 shadow table :428, component inventory :100/:133/:140/:180, §6 canvas paths :562), `formation/fourier/CENSUS-2026-08-03.md` (§3a :80-100, §5 export-map diff, carried-rows table :362), `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R3-7a**, **R3-10**, **R5-7**, **R6-5**.

---

## §1 · Verdict

**20 defects · 2 BLOCKER · 6 MAJOR · 11 MINOR · 1 INFO · 5 superlatives.**

The component is a genuinely good *extraction* (§4 S3) wrapped around a **broken color contract** and a **broken interaction contract**. The two blockers are not stylistic: the first destroys the only channel that links a spectrum row to its epicycle circle and its graph bar; the second makes the per-coefficient physics (phase, relative magnitude, Re/Im) unreachable without a mouse — under a docstring that asserts the opposite.

The file also carries an unusual density of **self-contradiction**: line 146 forbids `transition: all` three lines after line 91 applies it; line 15 declares an a11y gap discharged that lines 80–85 re-open; line 57 guards a division that line 93 performs unguarded; line 102 re-hand-wires the exact font-feature register line 12 adopted `AnimatedDigit` to stop hand-wiring. Each is independently falsifiable and each is cheap to fix.

| id | sev | one-line | anchor |
|---|---|---|---|
| **L-B1** | BLOCKER | Hue is indexed by *position in the current slice*, not by harmonic — four divergent `spectrumColor` laws, three co-rendered, and the list recolors itself on "Show more" | `:47-50`, `:94`, `:107` |
| **L-B2** | BLOCKER | `TooltipTrigger as-child` onto a non-focusable `<div>` — phase / relative / Re-Im are pointer-only, contradicting the file's own §15 discharge claim | `:80-85`, `:15` |
| **L-M1** | MAJOR | `<Tooltip>` as a `TransitionGroup` child is a multi-root fragment ⇒ all four `.coeff-list-*` transitions are dead + a Vue dev warning per row per render | `:79-81`, `:147-163` |
| **L-M2** | MAJOR | `transition-all` on the bar directly contradicts the scoped-style comment forbidding it, and animates the L-B1 recolor | `:91` vs `:146` |
| **L-M3** | MAJOR | `toFixed(2)` floors the whole spectral tail to `0.00`; the same row's tooltip prints `toFixed(4)`; during damping the two disagree even at the head | `:61-63`, `:100`, `:112` |
| **L-M4** | MAJOR | `spectrumColor` is a verbatim 4th fork of an already-exported symbol; the project's palette module is bypassed and the colors do not participate in theming | `:47-50` |
| **L-M5** | MAJOR | `:key` couples row identity to slice position (`-${i}`) ⇒ any head insertion remounts every row and restarts every `AnimatedDigit` from 0 | `:82` |
| **L-M6** | MAJOR | Phantom tooltip: `v-if` sits on the `<Button>` *inside* `<Tooltip>`, so the whole Popper/Tooltip machinery mounts with an empty `as-child` trigger for every `1 ≤ N ≤ 12` | `:124-135` |
| **L-m1** | MINOR | Unguarded `/ maxAmplitude` in the width binding while the sibling helper guards the identical expression ⇒ `width: NaN%` | `:93` vs `:57` |
| **L-m2** | MINOR | Descending-amplitude sort is an undeclared backend precondition that three behaviors depend on | `:37-45` |
| **L-m3** | MINOR | `12` / `40` / `> 12` hardcoded across three sites with a two-site sync invariant and no prop | `:38`, `:126`, `:133` |
| **L-m4** | MINOR | `Show more (N total)` mislabels the action when `N > 40`; the sibling tooltip text is honest | `:133` vs `:124` |
| **L-m5** | MINOR | Redundant `tabular-nums` re-hand-wires what `AnimatedDigit` was adopted to own | `:102` |
| **L-m6** | MINOR | `text-admin-label` — a 10px admin micro-control token — carries a user-facing science readout | `:110` |
| **L-m7** | MINOR | `emptyText` default restated verbatim at a callsite ⇒ two sources for one default | `EqCoefficientsPanel.vue:14` |
| **L-m8** | MINOR | Colocation: `components/shared/` holds exactly one file; the `#graph` payload is filed under `equation/` with zero equation-route consumers | `:70`, `CoefficientsPanel.vue:5` |
| **L-m9** | MINOR | The tooltip body the extraction "unified" still has a third co-rendered copy in `FrequencyGraph` | `:105-120` |
| **L-m10** | MINOR | The `12 / 350` ratio readout is unlabeled and has no accessible name | `:72-76` |
| **L-m11** | MINOR | The `max-h-[300px] overflow-y-auto` region has no `tabindex` ⇒ not keyboard-scrollable | `:78` |
| **L-i1** | INFO | `:132` is one of the two dynamic-`:is` families **R3-10** proved dropped between registries — still live, still uncounted | `:132` |

---

## §2 · BLOCKERS

### L-B1 · BLOCKER · Position-indexed hue: four color laws, three co-rendered, one that mutates on expand

**Claim.** `spectrumColor(i, total)` keys hue to the row's **ordinal within the currently-rendered slice**, so the same harmonic `n` is assigned a different color by (a) this list collapsed, (b) this list expanded, (c) the `#graph` payload, and (d) the epicycle canvas — all of which the visualization route paints at once.

**Provenance.**

```
CoefficientsSpectrum.vue:47-50   hue = (1 - i / max(total-1,1)) * 300          →  hsl(h, 85%, 55%)
CoefficientsSpectrum.vue:94      backgroundColor: spectrumColor(i, topComponents.length)   // total = 12 | 40
CoefficientsSpectrum.vue:107     the tooltip swatch, same call
FrequencyGraph.vue:42-45         byte-identical formula, total = n = min(maxBars, N) = 40  (CoefficientsPanel.vue:19 :max-bars="40")
visualization/lib/canvas-drawing/transforms.ts:3-8   hue = (1 - (i/max(total-1,1))^0.6) * 300   // gamma-curved
visualization/lib/canvas-drawing/epicycles.ts:162    const color = colorOverride ?? spectrumColor(i, nVis)   // nVis ≤ max_circles = 100 (lib/defaults.ts:21)
equation/lib/harmonics.ts:81-88  linear formula again, as hsla(...,alpha) — exported, and functionally identical to the subject's private copy at alpha = 1
```

**Measured divergence** (computed from the shipped constants, not estimated):

| harmonic at slice position | this list, collapsed (`total=12`) | this list, expanded (`total=40`) | `FrequencyGraph` (`n=40`) | epicycle canvas (`nVis=100`, gamma) |
|---|---|---|---|---|
| `i = 1` | **272.727** | 292.308 | **292.308** | **280.957** |
| `i = 5` | **163.636** (green) | 261.538 | **261.538** (blue) | **249.982** (blue) |

At `i = 5` the sixth-largest harmonic is **green** in the list and **blue** in both canvases, simultaneously, in the same viewport.

**Why it is a blocker, not a nit.** Color is the *only* channel binding a spectrum row to its epicycle circle and its graph bar — there is no shared hover state between `CoefficientsSpectrum` and `FrequencyGraph` (the graph emits `hover-harmonic`, `CoefficientsPanel.vue:17-22` binds no listener), no shared selection, no index label on the canvas circles. Break the color correspondence and the panel stops being an instrument and becomes decoration. The census names this exact family the highest-value convergence target (`lane-frontend.md:428-436`: `CoefficientsSpectrum` and `BasisCanvas`+`canvas-drawing/` "same family (spectrum/`BasisComponent`)").

**Second, independent manifestation.** Clicking "Show more" changes `topComponents.length` from 12 to 40, so **every already-visible row changes color** — `i=1` moves 272.727 → 292.308. The user's mental map is invalidated by an action whose stated purpose is "show me more of the same". Compounded by L-M2, the recolor is *animated* over 500 ms, making it maximally salient.

**Falsifier (both manifestations).** If hue were a function of the component's identity — `comp.index`, or `i / props.components.length` — rather than of `topComponents.length`, all four surfaces would agree and expansion would be color-stable. Concretely: the claim dies if any one of the following is true, and none is: (i) some caller normalizes the denominators (grep `spectrumColor` across `web/src` returns the five definitions/callsites listed above and no normalization layer); (ii) `CoefficientsPanel` does not co-render the graph with the list (`CoefficientsPanel.vue:15-24` places `FrequencyGraph` in the `#graph` slot, i.e. `CoefficientsSpectrum.vue:70`, directly above the list); (iii) `maxBars` equals the list cap (`CoefficientsPanel.vue:19` passes 40, the list defaults to 12).

**Not-yet-proven adjunct (UNPROVEN-NEEDS-LIVE, excluded from the count).** Whether `hsl(h, 85%, 55%)` clears AA contrast against `bg-muted/50` at every hue in `[0,300]` in both themes. The tree shows the project *does* police this elsewhere — `web/src/style.css:114-126` darkens `--viz-amber` from 3.54:1 to ≈4.6:1 specifically to clear AA — so the omission here is a real gap in an otherwise-policed surface, but the ratio itself needs a live measurement.

---

### L-B2 · BLOCKER · The per-coefficient physics is pointer-only — under a docstring claiming the opposite

**Claim.** The tooltip is the **sole** surface exposing phase, relative magnitude and the Re/Im pair (`:110-119`). Its trigger is `<Tooltip as-child>` wrapped around a plain `<div class="coeff-row">` (`:80-85`) with `cursor: default` (`:165-167`) and no `tabindex`. `reka-ui` `TooltipTrigger` opens on `pointermove` **or** `focus`; a bare `<div>` is not focusable, so the `focus` path can never fire. The data is unreachable by keyboard, by screen reader, and on touch (`handlePointerMove` returns early for `pointerType === "touch"`).

**Provenance chain, verified at the installed versions.**

1. `CoefficientsSpectrum.vue:80-85` — `<Tooltip … side="bottom">` whose default slot is a single `<div class="coeff-row">`.
2. `web/src/components/ui/tooltip/Tooltip.vue:27` — the shim renders `<TooltipTrigger as-child><slot /></TooltipTrigger>`.
3. `glass-ui@4.0.0` `dist/TooltipProvider-B3MkB_8P.js` (`TooltipTrigger`, symbol `b`) — forwards props verbatim to `reka-ui`'s `TooltipTrigger`.
4. `reka-ui@2.9.10` `TooltipTrigger` — renders `Primitive` with `as: _ctx.as` (default `"button"`) and `toHandlers({click, focus, pointermove, pointerleave, pointerdown, blur})`.
5. `reka-ui@2.9.10` `Primitive.js:24` — `const asTag = props.asChild ? "template" : props.as;` ⇒ **with `asChild` the `as="button"` is discarded** and the handlers are merged onto the consumer's own element via `Slot` (`Slot.js`, `mergeProps(attrs, firstNonCommentChildren.props)`).
6. Result: `focus`/`blur` listeners are attached to a `<div>` that cannot receive focus. Neither `Primitive` nor `Slot` injects `tabindex` or `role` (read in full; no such write exists).

**The contradiction in the file itself.** `CoefficientsSpectrum.vue:13-15`:

> *"the bespoke `:hover` CSS tooltip lifts to the glass-ui `Tooltip` primitive … **discharging the L5 §5 A8 LOW a11y gap**."*

The lift changed the *mechanism* (CSS `:hover` → reka-ui popper) without changing the *trigger's interactivity*, which is the whole content of the gap. A source file asserting a discharge it did not perform is worse than the untouched gap, because the assertion is what a later audit will trust. This is the L-18 inversion: the strongest-worded line in the file is the least true one.

**Falsifier.** The claim dies if any of: (i) the trigger element is focusable — it is a `<div>` with no `tabindex`, `contenteditable`, `href` or native-interactive tag; (ii) `Primitive` honors `as="button"` under `asChild` — `Primitive.js:24` proves it does not; (iii) some ancestor supplies roving focus — `CoefficientsPanel.vue` / `EqCoefficientsPanel.vue` are 26 and 17 lines and contain no focus management; (iv) an alternative non-pointer surface exposes phase/Re-Im — `FrequencyGraph`'s tooltip (`:185-210`) is `hoveredBar`-driven from `mousemove` only, so it is *strictly worse*, and no third surface exists (grep `phase` across `web/src/components` returns these two files plus `lib/`).

**Cheapest correct fix (for the wave, not applied here):** `tabindex="0"` + `role="listitem"` on `.coeff-row` inside a `role="list"` container, or drop `as-child` and let `TooltipTrigger` render its default `<button>`. Either restores the `focus` path that reka-ui already wired.

---

## §3 · MAJOR

### L-M1 · MAJOR · Every `.coeff-list-*` transition is dead code, and each row logs a Vue warning

**Claim.** A `<TransitionGroup>` child must render a **single element root**. `<Tooltip>` renders a *fragment* of two roots, so Vue applies no enter, no leave and no move transition to any row; the 17 lines of scoped transition CSS at `:147-163` are unreachable, and Vue 3.5.38 emits a dev warning per row.

**Provenance chain, verified at the installed versions.**

1. `CoefficientsSpectrum.vue:79-81` — `<TransitionGroup name="coeff-list">` whose children are keyed `<Tooltip v-for>` **components**.
2. `web/src/components/ui/tooltip/Tooltip.vue:26-37` — the shim's `<GlassTooltip>` default slot holds **two** children: `<TooltipTrigger>` and `<TooltipContent>`.
3. `glass-ui@4.0.0` `Tooltip` (symbol `v`) → `createBlock(RekaTooltipRoot, …, { default: renderSlot(slots,'default') })` — renderless pass-through.
4. `reka-ui@2.9.10` `TooltipRoot.vue:186-190` → `<PopperRoot><slot :open="open" /></PopperRoot>`; `PopperRoot` renders `renderSlot(...)` only.
5. Therefore the `<Tooltip>` component's subtree bottoms out in a **Fragment** with two children ⇒ `vnode.el` is the fragment's start **Text** anchor, not an `Element`.
6. `@vue/runtime-dom@3.5.38` `runtime-dom.esm-bundler.js:1462-1464` — the `prevChildren` loop is gated on `child.el && child.el instanceof Element`. Our children fail it ⇒ `positionMap` is never populated ⇒ **`.coeff-list-move` (`:161-163`) never applies.**
7. `@vue/runtime-core@3.5.38` `runtime-core.esm-bundler.js:4672-4678` — `renderComponentRoot` warns `"Component inside <Transition> renders non-element root node that cannot be animated."` when the inherited-transition root is not an element root. `PopperRoot`'s root is the Fragment ⇒ **the warning fires**, at minimum once per rendered row on mount (12 collapsed, 40 expanded), and again whenever a row's tooltip opens or closes (that re-render re-propagates the hooks).
8. Because the hooks land on a Fragment, `mountElement`/`remove` never see them ⇒ **`.coeff-list-enter-*` / `.coeff-list-leave-*` (`:147-160`) are also inert.**

**Falsifier.** The claim dies if the shim rendered a single element root — it does not (two slot children, step 2, byte-verifiable) — or if `TooltipRoot`/`PopperRoot` rendered a wrapper element — they do not (steps 3–4, read from `web/node_modules`). Independently: if the transitions *did* work, `positionMap` would need `child.el instanceof Element` to hold, which step 5 forbids. The cheapest disproof would be a live DOM check that `.coeff-list-move` ever appears on a row; that is the SS-13 confirmation, not the basis of the claim.

**Blast radius.** 17 of 168 lines (10% of the file) are dead. The `A.W3.d` provenance comment at `:146` documents care spent on CSS that has never run.

**Fix shape.** Wrap the row in a plain element and put the key + tooltip inside it: `<div class="coeff-row" :key="comp.index"><Tooltip …>…</Tooltip></div>` — one element root per child, transitions live, and the fix simultaneously removes L-M5's positional key.

---

### L-M2 · MAJOR · `transition-all` — three lines above a comment forbidding it

**Claim.** `:91` applies Tailwind's `transition-all` (`transition-property: all`) to the amplitude bar. `:146` states: *"A.W3.d — named properties + canonical tokens, **no `transition: all`**."* The template violates the invariant its own stylesheet declares, in the same file, 55 lines apart.

**Provenance.** `CoefficientsSpectrum.vue:90-97` — `class="h-full rounded-full transition-all duration-500 ease-out"` with `:style` binding both `width` **and** `backgroundColor`. `CoefficientsSpectrum.vue:146` — the forbidding comment.

**Consequence, not just hygiene.** Because the property list is `all`, the L-B1 hue mutation on "Show more" is animated over 500 ms alongside the width change — the recolor becomes a deliberate-looking 500 ms color sweep across all 12 rows, which reads as *meaning* rather than *artifact*. Narrowing to `transition-[width] duration-500` both honors `:146` and makes the L-B1 defect visible-as-a-glitch rather than plausible-as-a-feature.

**Falsifier.** Dies if Tailwind v4's `transition-all` does not emit `transition-property: all` (it does), or if `backgroundColor` is not animatable (it is), or if `:146` referred only to hand-written CSS and not to utilities — but the utility and the comment govern the same element, and the comment's stated unit is the *property list*, not the authoring syntax.

---

### L-M3 · MAJOR · `toFixed(2)` floors the spectral tail to `0.00`, and disagrees with its own tooltip

**Claim.** The row's numeric column formats through `fmtAmplitude = v => v.toFixed(2)` (`:61-63`, bound at `:101`), while the tooltip for the *same row* prints `comp.amplitude.toFixed(4)` (`:112`). Two failure modes follow.

**(a) The tail is uninformative.** Fourier coefficients decay; for the shipped default expression `x*(pi - x)` (`EquationView.vue:25`) the closed-form coefficients fall like `1/n²`, so by roughly the 10th harmonic `|c_n| < 0.005` and `toFixed(2)` renders **`0.00`** for every remaining row. The user sees a column of `0.00` beside bars of visibly different length and a tooltip that says `0.0012`. The amplitude column — the only textual quantity in the row — carries zero information over most of the list, and *all* of it once expanded to 40.

**(b) Row and tooltip disagree while animating.** `:100` feeds `comp.amplitude` to `AnimatedDigit`, which renders `props.format(animated.current.value)` — the **damped** value (`glass-ui@4.0.0 dist/animated-digit.js`, symbol `p`) — starting from `initial = 0`. `:112` renders the **exact** value. During every damping window the row says `0.00` and its tooltip says `1.6449`. Because `CollapsibleSection`/`ConfiguratorLayer` unmount their content when closed (reka-ui `CollapsibleContent` is `Presence`-gated; `CollapsibleSection.vue:45`, `:default-open="false"` at `CoefficientsPanel.vue:14` and `CollapsibleSection` at `EqCoefficientsPanel.vue:13`), this window recurs on **every** panel open.

**Falsifier.** Dies if `AnimatedDigit` rendered the raw value (`animated-digit.js` proves it renders `format(f.current.value)`); or if `toFixed(2)` retained sub-0.005 magnitude (`(0.0049).toFixed(2) === "0.00"`, computed); or if the panel used `v-show` so the damping ran once per session (it uses reka-ui `Presence`). Also dies if the amplitudes were normalized to `[0,1]` before display — they are not; `:100` passes `comp.amplitude` unmodified, and `formatPercent` (`:56-59`) exists precisely because the raw scale is not normalized.

**Fix shape.** A significant-figures formatter (`v.toPrecision(3)`) or an exponent-aware one; and either damp the tooltip too or stop damping a static readout (see L-M5 note).

---

### L-M4 · MAJOR · The fourth fork of an exported symbol; the palette module bypassed

**Claim.** `spectrumColor` (`:47-50`) is a private re-implementation of a function that already exists **twice as an exported module symbol**, and is byte-identical to a third private copy. Four definitions, two distinct algorithms, no owner.

**Provenance** (`grep -rn "85%, 55%\|spectrumColor" web/src`):

| # | site | law | exported? |
|---|---|---|---|
| A | `visualization/lib/canvas-drawing/transforms.ts:3-8` | gamma `t^0.6` | **yes** — re-exported at `canvas-drawing/index.ts:2` |
| B | `equation/lib/harmonics.ts:81-88` | linear, `hsla(...,α)` | **yes** |
| C | `equation/FrequencyGraph.vue:42-45` | linear, `hsl` | no |
| D | **`shared/CoefficientsSpectrum.vue:47-50`** | linear, `hsl` | no |

**D is redundant with B at α = 1**: `hsla(h, 85%, 55%, 1)` and `hsl(h, 85%, 55%)` are the same computed color. D is also byte-identical to C. So the subject re-declares, privately, a function the codebase already publishes — the precise "fourth fork" shape the census flags for `EasingPicker`/`lib/easings.ts` (`CENSUS-2026-08-03.md:§3a`, *"the producer README's forbidden 'fourth fork'"*). The count here is literally four.

**Second limb — theme non-participation.** The project has a palette module: `web/src/lib/colors.ts` exposes `VIZ_COLORS` (`:77-88`) resolved from CSS custom properties at boot and re-resolved on `.dark` toggle via `MutationObserver` (`App.vue:11`, `resolveVizColors()` at `colors.ts:90-96`; census §3a records the mechanism). `CoefficientsSpectrum` bypasses it entirely: fixed `hsl(h, 85%, 55%)` literals, identical in light and dark, invisible to the `--viz-*` token layer, and invisible to the AA correction `web/src/style.css:114-126` performs on that layer.

**Falsifier.** Dies if A or B were unexported or unreachable — `canvas-drawing/index.ts:2` and `harmonics.ts:81` prove both are exported and already consumed cross-file (`ConvergencePlot.vue:10`, `ConvergenceLegend.vue:3`, `epicycles.ts:3`). Dies if the four laws agreed — §2 L-B1's table proves they do not. Dies if `lib/colors.ts` had no spectral hook — true, it has none *yet*, which is exactly where the single owner belongs (it already owns the `--viz-*` resolution and the AA correction).

**Supporting observation (not counted).** `epicycles.ts:141` declares a `colorOverride?: string | null` parameter that no caller in the tree ever passes (`grep -rn "colorOverride" web/src` → the declaration and its one use, same file). Dead parameter on the sibling; noted because it is the natural seam through which a unified palette would be injected.

---

### L-M5 · MAJOR · Positional key defeats keyed reuse

**Claim.** `:key="\`${comp.index}-${i}\`"` (`:82`) binds row identity to **slice position**. `comp.index` is the harmonic number and is already unique per component (`src/fourier_analysis/epicycles.py:33-43` — one `EpicycleComponent` per `frequency: int`), so `-${i}` adds no uniqueness and only removes stability.

**Consequence.** Any change that shifts positions — raising `n_harmonics` so a larger coefficient enters at the head, switching contour, re-running the equation solve — changes **every** key. Vue then unmounts and remounts all 12 (or 40) rows rather than moving them. Each remount destroys and recreates an `AnimatedDigit`, whose `useAnimatedNumber` starts at `initial = 0` (`glass-ui@4.0.0 dist/useAnimatedNumber-C_3wZLx4.js`, `initial:` present in the smoother options), so every row visibly counts up from `0.00` again. With a stable `:key="comp.index"` the same edit would be a keyed move: values damp *between* old and new, which is what `AnimatedDigit` is for.

**Falsifier.** Dies if `comp.index` were non-unique within a `components` array. Checked at all four producers: `epicycles.py:54` sorts one component per frequency (unique `frequency` ⇒ unique `index`); `integration.py:117,137` appends one term per `n`; `spline.py:108` and `identification.py` likewise. No producer emits duplicate `index`. Dies also if `TransitionGroup` were doing the moving — but L-M1 proves move transitions are already inert here, so the remount is unmasked, not cushioned.

**Interaction.** The L-M1 fix (wrap the row in an element) and this fix are the same edit: put `:key="comp.index"` on the new wrapper.

---

### L-M6 · MAJOR · Phantom tooltip for the common case

**Claim.** `:124-135` places `v-if="totalComponents > 12"` on the `<Button>` **inside** the `<Tooltip>`, not on the `<Tooltip>`. For every `1 ≤ N ≤ 12` — the ordinary case, since 12 is the collapsed cap — the tooltip mounts `TooltipRoot` + `PopperRoot` + `PopperAnchor` + `TooltipTrigger` + a `Presence`-gated portal, with **no trigger element at all**.

**Provenance.** `reka-ui@2.9.10` `Slot.js`: with only a comment vnode in the slot, `firstNonCommentChildrenIndex === -1` and it returns the comment array unchanged — no element to anchor, no error, no warning. `TooltipTrigger`'s `onMounted(() => rootContext.onTriggerChange(triggerElement.value))` then registers an undefined anchor. Silent dead machinery: a `useTimeoutFn` timer pair, a `useVModel`, a provider injection, a Popper context, per render of the panel.

The bound `:text` is also computed unconditionally — `` `Show top 40 of ${totalComponents} coefficients` `` — for a tooltip that can never open.

**Falsifier.** Dies if reka-ui warned or threw on an empty `as-child` slot (read `Slot.js` in full: it returns `children` and does not warn); or if `v-if` on the `<Button>` also elided the `<Tooltip>` (it does not — `v-if` elides only the element it is written on). Dies if `N > 12` always — `CoefficientsPanel` feeds `store.epicycleData?.components` whose length is `n_components`, and `EqCoefficientsPanel` feeds the equation solve whose `n_harmonics` is user-set; both routinely sit at or under 12.

**Fix shape.** Move `v-if="totalComponents > 12"` to the `<Tooltip>` (`:124`) and delete it from the `<Button>`.

---

## §4 · MINOR

**L-m1 · `width: NaN%`.** `:93` computes `${(comp.amplitude / maxAmplitude) * 100}%` with no zero-guard, while `formatPercent` (`:56-59`) guards the *identical* expression with `if (!maxAmplitude.value) return "0%"`. When every amplitude is 0 (a legal input: the equation route accepts `0`, and any function whose coefficients all vanish within the harmonic budget), `maxAmplitude` is 0 and the binding emits the literal string `"NaN%"` (computed: `((0/0)*100)+"%" === "NaN%"`), an invalid declaration that is dropped, leaving only `minWidth: '2px'`. The guard's existence three functions away proves the author knew the case. *Falsifier:* dies if `maxAmplitude` cannot be 0 — `:43-45` returns `topComponents.value[0].amplitude` whenever the slice is non-empty, and nothing floors it.

**L-m2 · Undeclared precondition.** Three behaviors assume `components` arrives sorted by **descending** amplitude: `maxAmplitude` takes `[0]` (`:44`), the hue ramp assumes position ≈ rank (`:47-50`), and `slice(0, 12|40)` assumes truncation keeps the *largest*. Nothing in the prop declaration (`:25-29`) or the type (`lib/types.ts:1-6`) says so. *This is a contract gap, not a live bug* — I checked all four producers and all four sort descending: `epicycles.py:54`, `integration.py:145`, `spline.py:116`, `identification.py:125`. But `BasisDecomposition.components` (`lib/types.ts:8-12`, served by `bases_evaluation.py:94-102`) is the *same type* and is serialized in whatever order the decomposition produced; the census names this the same "spectrum/`BasisComponent`" family (`lane-frontend.md:428`). One JSDoc line on the prop, or a `maxAmplitude` computed as `Math.max(...)`, closes it. *Falsifier:* dies if some producer already violated the order (none does) or if the component were robust to disorder (it is not — `[0]` is not `max`).

**L-m3 · Uncontrolled magic numbers with a two-site invariant.** `12` and `40` at `:38`; `> 12` at `:126`; `12`/`40` restated in prose at `:124` and `:133`. The `:38` collapsed cap and the `:126` threshold must stay equal or the button appears when there is nothing more to show — a silent invariant with no single source. Meanwhile the *trivial* knob, `emptyText`, **is** a prop (`:27-32`). The configurability is inverted: the string a consumer will rarely change is parameterized; the numbers that define the component's behavior are not.

**L-m4 · Mislabeled affordance.** `:133` renders `` `Show more (${totalComponents} total)` `` — but clicking shows 40, not `totalComponents`. Its own sibling tooltip at `:124` is honest: `` `Show top 40 of ${totalComponents} coefficients` ``. For a 350-component contour the button promises 350 and delivers 40, then the ratio readout reads `40 / 350` with no explanation of the gap. *Falsifier:* dies if `expanded` uncapped the slice — `:38` caps at 40.

**L-m5 · Re-hand-wiring what the primitive owns.** `:102` adds `tabular-nums` to `AnimatedDigit`'s class. The installed primitive already emits `cn('animated-digit tabular-nums', $props.class)` plus `font-feature-settings: "ss01","tnum","lnum"` in its scoped style (`glass-ui@4.0.0 dist/animated-digit.js`; source `AnimatedDigit.vue:75,84-89`). The file's own docstring (`:11-13`) states this register is exactly why `AnimatedDigit` was adopted. `tailwind-merge` will dedupe the class harmlessly — this is a MINOR precisely because the cost is comprehension, not output — but it is the adoption's stated benefit re-paid by hand.

**L-m6 · Token-register mismatch.** `:110` applies `text-admin-label` to the tooltip's Amplitude/Phase/Relative/Re-Im grid. That utility is glass-ui's **admin micro-control** label at a fixed 10px (`glass-ui/src/styles/typography/scale.css:86` — *"fixed sub-control micro (NOT fluid)"*; `typography/semantic.css:238`). Every other consumer in this tree uses it inside admin panels (`AdminFlaggedPanel.vue:176,180,189`, `AdminUserList.vue:376,379`). Here it sets the type size for the panel's primary scientific readout, at a size explicitly excluded from the fluid scale.

**L-m7 · Default duplicated at a callsite.** `:31` defaults `emptyText` to `"Compute to see coefficients"`; `EqCoefficientsPanel.vue:14` passes `empty-text="Compute to see coefficients"` — the same string, explicitly. Two sources for one default; changing `:31` silently fails to reach the equation route. *Falsifier:* dies if the strings differed — they are byte-identical.

**L-m8 · Colocation.** (a) `web/src/components/shared/` contains **exactly one file** (`find web/src/components/shared -type f` → the subject alone) — a directory created for a population of one. (b) The `#graph` payload `FrequencyGraph.vue` lives under `components/equation/` but has **zero equation-route consumers**: `grep -rn "FrequencyGraph" web/src` returns only `visualization/CoefficientsPanel.vue:5,17` and two comments in the subject. The subject's own docstring names it *"the **visualization** route's `FrequencyGraph`"* (`:7-8`) — the file is filed in the wrong feature, and `CoefficientsPanel.vue:5` is a cross-feature import (`visualization/` → `equation/`) to reach it.

**L-m9 · The extraction left the third copy standing.** The docstring (`:5-9`) celebrates unifying two ~95%-identical panels. The tooltip body it unified — swatch + `n = …` + the `grid-cols-[auto_1fr]` Amplitude/Phase table — still exists a third time at `FrequencyGraph.vue:193-209`, with the same classes and the same `(phase * 180 / Math.PI).toFixed(1)` inline (versus the subject's `formatPhase`, `:52-54`). The two copies are **co-rendered** in the visualization route, one inside the other's `#graph` slot. The de-duplication stopped one component short of the one that would have mattered most.

**L-m10 · Unlabeled ratio readout.** `:72-76` renders `{{ topComponents.length }} / {{ totalComponents }}` as a bare `<span>` with no label, no `aria-label`, no title. Announced as "12 slash 350". *Falsifier:* dies if a visible label existed — the enclosing panel title is "Coefficients / Fourier spectrum" (`CoefficientsPanel.vue:14`), which does not name the ratio.

**L-m11 · Scroll region not keyboard-operable.** `:78` — `class="space-y-1 max-h-[300px] overflow-y-auto"` with no `tabindex="0"`. A scrollable region that receives no focus cannot be scrolled by keyboard (WCAG 2.1.1). With L-B2, the consequence compounds: a keyboard user can neither scroll to rows 13–40 nor read any row's detail. *Cross-axis note:* this is a D-axis concern too; it is listed here because the omission is a one-attribute code-level defect on a container this file owns.

---

## §5 · INFO

**L-i1 · The R3-10 registry drop is still live at `:132`.** The intake lane (`lane-fourier-r3-r6.md:84`, R3-10, adjudicated **TRUE**) established that `MODULE-RESOLUTION.json.dynamicFamilies` declared six dynamic-`:is` families while `INSTANCE-STATE-REGISTRY.json.dynamicFamilies` carried four, and named the two dropped: **`CoefficientsSpectrum.vue:132`** and `EditorControlsDock.vue:144`. I confirm the site is live and unchanged: `:132` is `<component :is="expanded ? ChevronUp : ChevronDown" class="h-3.5 w-3.5" />`. The carry is booked to **F.W4** (`CENSUS-2026-08-03.md:362`, *"R3-10 (all 6 dynamic-`:is` sites budgeted)"*). No contradiction with the tree; recorded so the per-component audit does not re-drop it.

*Component-local disposition:* the site is a two-icon toggle where a plain `v-if`/`v-else` pair would be both cheaper and registry-visible. That is a suggestion, not a defect — the dynamic form is correct, merely uncounted.

---

## §6 · Superlatives (L-18 both ways)

**S1 · Teardown is correct, and the obvious leak hypothesis is false.** I went looking for 40 orphaned rAF loops behind a `:default-open="false"` collapsible and did not find them. `AnimatedDigit` → `useAnimatedNumber` registers `onScopeDispose(dispose)` under a `getCurrentScope()` guard (`glass-ui/src/composables/motion/number/useAnimatedNumber.ts:145-147`; corroborated in the installed dist by symbol grep — exactly one `getCurrentScope`, one `onScopeDispose`, one `.play(`, one `.stop()`), and the underlying driver is generation-guarded and self-terminating (`keyframes.js/src/animation/physics/playback.ts:87-123` — *"reschedules ONLY when it still matches"*; `smooth.ts:52-57` — *"Auto-stops on settle"*). Unmounting the panel stops every loop; a settled row stops its own. **Zero leaks on this axis.** *Falsifier:* dies if the composable ran outside an effect scope (it runs in `AnimatedDigit`'s `setup`) or if `RAFPlayback` looped past settle (`_run`'s `reschedule(false)` calls `_cleanup`).

**S2 · The tooltip escapes its own clipping container — for free.** `:78` establishes `max-h-[300px] overflow-y-auto`; a naively-inline tooltip would be clipped by it and by `overflow-hidden` on the bar track (`:89`). `glass-ui@4.0.0 TooltipContent` wraps its content in `RekaTooltipPortal` (dist symbol `y` → `createBlock(p /* TooltipPortal */)`), teleporting it out of the scroll region. This is a real hazard that the primitive lift dissolved without the consumer having to think about it — and it is the strongest argument *for* the B.W2.c lift, notwithstanding L-B2.

**S3 · The `#graph` slot is the right seam.** The single structural divergence between the two consumers is expressed as a **named slot** (`:70`), not a `route`/`variant` boolean, not a `v-if` on a prop string, not a second component. `CoefficientsPanel.vue:16-23` fills it; `EqCoefficientsPanel.vue:14` omits it and pays nothing. This is textbook extraction and the reason the component is worth repairing rather than replacing. The docstring (`:5-9`) states the seam and the reason for it — provenance done properly.

**S4 · The transition block names its properties.** `:147-152` enumerate `opacity` and `transform` on `--ease-standard` rather than reaching for `all`, and `:146` records why. The token resolves (`glass-ui/src/styles/transitions.css`, `animations.css`), as do `.fira-code` (`typography/utilities.css:81`) and `text-admin-label` (`typography/semantic.css:238`) — I checked all three for the "dead token" hypothesis and all three are live. The intent here is exactly right; L-M1 (the block never runs) and L-M2 (the template uses `all` anyway) are what betray it, and neither is the stylesheet's fault.

**S5 · Defaults declared, not improvised.** `emptyText` is defaulted through `withDefaults` (`:24-33`) rather than a template `||` or a `?? "…"` at the use site, so the default is typed and appears in the component's public contract. `maxAmplitude` likewise returns a defined fallback of `1` for the empty slice (`:44`) rather than `undefined`. Small, but it is the difference between a prop table and a guessing game.

---

## §7 · Hypotheses raised and refuted (recorded so the wave does not re-run them)

| # | hypothesis | verdict | evidence |
|---|---|---|---|
| RH-1 | Input may be unsorted ⇒ `maxAmplitude` is not the max ⇒ bars exceed 100% and "Relative" exceeds 100% | **REFUTED** | All four producers sort descending: `epicycles.py:54`, `symbolic/integration.py:145`, `symbolic/spline.py:116`, `symbolic/identification.py:125`. Survives only as the *contract* gap L-m2. |
| RH-2 | 12–40 concurrent `SmoothProgress` rAF loops leak behind a collapsed panel | **REFUTED** | S1. Generation-guarded auto-stop + `onScopeDispose`. |
| RH-3 | `TooltipRoot` injects a provider context that is absent ⇒ runtime throw | **REFUTED** | `App.vue:4,23` mounts `<TooltipProvider :delay-duration="400" :skip-delay-duration="200">` above the router view. |
| RH-4 | `--ease-standard` / `.fira-code` / `text-admin-label` are undefined ⇒ the scoped CSS is inert for a *second* reason | **REFUTED** | All three ship from glass-ui styles (S4). The CSS is dead for the L-M1 reason only. |
| RH-5 | **R5-7** (native-element `v-for` invisible to callsite-keyed loop derivation) applies here | **DOES NOT APPLY** | `grep -n "v-for" CoefficientsSpectrum.vue` → **one** site, `:81`, on a **component** (`<Tooltip>`) — precisely the registrable form the intake cites as populated (`lane-fourier-r3-r6.md:125`: `"callsiteId": "callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0"`, the same `Tooltip` component). Zero native-element loops. The R5-7 blind spot is real (R6-5 cures it with `NATIVE_TEMPLATE_LOOP`) but this component is not a victim. **The inverse is worth booking:** the derivation sees *2 `Tooltip` callsites* here (matching **R3-7a**'s "CoefficientsSpectrum 2" of 35), while the rendered instance count is 12 or 40 tooltips plus one phantom (L-M6) — a callsite/instance ratio of 2 : 41. Any per-component *instance* budget built on callsites understates this file by ~20×. |
| RH-6 | Module is over-size / god-module | **REFUTED** | 168 LOC, matching `lane-frontend.md:180`. Goldilocks: one responsibility (spectrum readout), one slot seam, four small pure helpers. Size is not the problem here; ownership of `spectrumColor` (L-M4) is. |

---

## §8 · Corpus crosswalk

| corpus row | this challenge |
|---|---|
| **R3-7a** (`lane-fourier-r3-r6.md:79`) — "35 Tooltip callsites over nine consumers … CoefficientsSpectrum 2" | **CONFIRMED, unchanged.** The two are `:80` and `:124`. Adds: `:124` is the phantom (L-M6), so the F.W3 migration budget should count 2 callsites of which **1 is deletable**. |
| **R3-10** (`:84`) — six dynamic-`:is` families declared, four registered; `CoefficientsSpectrum.vue:132` dropped | **CONFIRMED live and unchanged** (L-i1). |
| **R5-7** (`:125`) / **R6-5** (`:139`) — native-template-loop blindness | **DOES NOT APPLY** to this component (RH-5), with an inverse finding booked: callsite-keyed *instance* budgets understate this file ~20×. |
| `lane-frontend.md:180` — "CoefficientsSpectrum.vue · **168** · Coefficient spectrum bars (`AnimatedDigit`) — **SHADOW candidate, §4**" | **CONFIRMED** (168 LOC, `AnimatedDigit` at `:99-103`). |
| `lane-frontend.md:428-436` — SOFT SHADOW: `CoefficientsSpectrum` "same family (spectrum/`BasisComponent`)" as `BasisCanvas` + `canvas-drawing/`; *"the highest-value convergence target in the lane"* | **SHARPENED.** The shadow is not merely nominal: the two surfaces paint the **same harmonics in different colors** by two different laws (L-B1), one of which (`transforms.ts:3`) is already an exported symbol the other refuses to import (L-M4). Convergence has a concrete first move — one `spectrumColor` in `lib/colors.ts` keyed to harmonic identity — that is far cheaper than the 1 311-LOC `BasisCanvas`↔`FourierField` question. |
| `lane-frontend.md:562` / `CENSUS §3a:83-87` — Path C: `FrequencyGraph.vue:63` `getContext("2d")`, single deep watcher `:157`, **no rAF**; "Canvas2D throughout, WebGL/WebGPU ABSENT" | **CONFIRMED.** Adds two facts the census did not carry: (i) `FrequencyGraph` is reached **only** through this component's `#graph` slot (`:70` ← `CoefficientsPanel.vue:17`) and has zero equation-route consumers despite living in `equation/` (L-m8); (ii) `watch(..., { deep: true })` over `props.components` (`FrequencyGraph.vue:157`) deep-traverses the entire coefficient array on every store tick — a Path-C cost the census's "no rAF" framing understates. Not counted as a defect here (it is `FrequencyGraph`'s line, not the subject's), but it is the subject's render path. |
| `CENSUS §3a` — palette resolved once at boot from CSS custom properties, re-resolved on `.dark` via `MutationObserver` | **CONFIRMED** (`App.vue:11`, `colors.ts:90-96`) and used as the falsifier for L-M4's second limb: this component is outside that mechanism. |
| `CENSUS §3a` — "3 local `components/ui/` files are documented thin adapters, **keep**" | **CONFIRMED as to the adapter's documentation** (`ui/tooltip/Tooltip.vue:2-12`), **CONTESTED as to "keep" being cost-free.** The adapter's two-child default slot (`:27-36`) is the proximate cause of L-M1: it makes every `<Tooltip>` a multi-root component, which is invisible at the callsite and fatal inside any `<Transition>`/`<TransitionGroup>`. If the adapter stays, it should render a single element root, or document that it must never be a transition child. |

---

## §9 · Falsification summary

Every claim above is refutable by one of four moves, and I state which for each: (1) **read a byte** — the `file:line` cited is wrong or says something else; (2) **run the arithmetic** — the hue table in §2, the `toFixed` floor in L-M3, the `NaN%` in L-m1 are computed, not estimated, and a different result kills the claim; (3) **find the missing site** — an alternative non-pointer surface for phase/Re-Im (L-B2), a normalization layer between the four `spectrumColor` laws (L-B1/L-M4), a producer that emits duplicate `index` (L-M5) or unsorted amplitudes (RH-1); (4) **contradict the runtime** — the `instanceof Element` guard, the `renders non-element root node` warning, `Primitive.js:24`'s discard of `as` under `asChild`, and `Slot.js`'s comment-only return were each read from `web/node_modules` at the resolved version, not from upstream HEAD.

Two claims are **UNPROVEN-NEEDS-LIVE** and are excluded from all counts: the AA contrast of `hsl(h, 85%, 55%)` across the hue sweep in both themes (L-B1 adjunct), and the observed count of the L-M1 dev warning per session (the *existence* of the warning path is proven statically; its multiplicity is not).

**Counts: 20 defects · 2 blockers · 5 superlatives.**
